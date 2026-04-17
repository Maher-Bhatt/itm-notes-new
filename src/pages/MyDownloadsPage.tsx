import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchDialog } from "@/components/SearchDialog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { downloadMaterial, formatFileSize, type Material } from "@/lib/materials";
import { Download, Inbox, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSubject, subjects } from "@/data/subjects";
import { toast } from "sonner";

interface Row {
  downloaded_at: string;
  material: Material;
}

type SortKey = "latest" | "oldest" | "most-downloaded";

export default function MyDownloadsPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [redownloadingId, setRedownloadingId] = useState<string | null>(null);

  // Filters
  const [query, setQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("latest");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/auth");
      return;
    }
    (supabase as any)
      .from("download_history")
      .select("downloaded_at, material:materials(*)")
      .eq("user_id", user.id)
      .order("downloaded_at", { ascending: false })
      .then(({ data, error }: { data: Row[] | null; error: unknown }) => {
        if (error) toast.error("Couldn't load your downloads");
        setRows((data ?? []).filter((r) => r.material));
        setLoading(false);
      });
  }, [user, authLoading, navigate]);

  // Subjects represented in the user's history
  const availableSubjects = useMemo(() => {
    const ids = new Set(rows.map((r) => r.material.subject_id));
    return subjects.filter((s) => ids.has(s.id));
  }, [rows]);

  const filteredSorted = useMemo(() => {
    const q = query.toLowerCase().trim();
    let list = rows.filter((r) => {
      if (subjectFilter !== "all" && r.material.subject_id !== subjectFilter) return false;
      if (q && !r.material.file_name.toLowerCase().includes(q)) return false;
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "latest") return +new Date(b.downloaded_at) - +new Date(a.downloaded_at);
      if (sort === "oldest") return +new Date(a.downloaded_at) - +new Date(b.downloaded_at);
      return (b.material.download_count ?? 0) - (a.material.download_count ?? 0);
    });
    return list;
  }, [rows, query, subjectFilter, sort]);

  const grouped = useMemo(() => {
    const map = new Map<string, Row[]>();
    for (const r of filteredSorted) {
      const arr = map.get(r.material.subject_id) ?? [];
      arr.push(r);
      map.set(r.material.subject_id, arr);
    }
    return Array.from(map.entries());
  }, [filteredSorted]);

  const handleRedownload = async (m: Material) => {
    if (!user) return;
    setRedownloadingId(m.id);
    const toastId = toast.loading(`Downloading ${m.file_name}…`);
    try {
      await downloadMaterial(m, user.id);
      toast.success("Download started", { id: toastId });
    } catch (err) {
      toast.error("Download failed", {
        id: toastId,
        description: (err as Error).message,
        action: { label: "Retry", onClick: () => handleRedownload(m) },
      });
    } finally {
      setRedownloadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <Header onSearchOpen={() => setSearchOpen(true)} showBack backTo="/" />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10 animate-fade-in">
        <div className="flex items-end justify-between mb-1 gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">My Downloads</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {loading ? "Loading…" : `${rows.length} total download${rows.length === 1 ? "" : "s"}`}
            </p>
          </div>
        </div>

        {/* Filters */}
        {!loading && rows.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-2 mt-6 mb-6">
            <div className="relative flex-1">
              <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search files…"
                className="pl-9 h-9"
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="h-9 sm:w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All subjects</SelectItem>
                {availableSubjects.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger className="h-9 sm:w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="most-downloaded">Most downloaded</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {loading ? (
          <div className="space-y-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-20 rounded bg-secondary animate-pulse" />
            ))}
          </div>
        ) : rows.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground surface-elevated rounded">
            <Inbox className="h-10 w-10 mx-auto mb-4 opacity-40" />
            <p className="text-sm mb-3">You haven't downloaded any materials yet.</p>
            <Link to="/" className="text-primary text-sm hover:underline">Browse subjects →</Link>
          </div>
        ) : filteredSorted.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground surface-elevated rounded">
            <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No downloads match your filters.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {grouped.map(([subjectId, items]) => {
              const subject = getSubject(subjectId);
              return (
                <section key={subjectId}>
                  <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">
                    {subject?.name ?? subjectId} · {items.length}
                  </h2>
                  <div className="space-y-2">
                    {items.map((r) => (
                      <div
                        key={`${r.material.id}-${r.downloaded_at}`}
                        className="surface-elevated rounded p-3 flex items-center gap-3"
                      >
                        <div className="w-9 h-9 rounded bg-primary/10 text-primary flex items-center justify-center text-[10px] font-bold shrink-0">
                          {r.material.file_type.toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium truncate">{r.material.file_name}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {formatFileSize(r.material.file_size)} · downloaded{" "}
                            {new Date(r.downloaded_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={redownloadingId === r.material.id}
                          onClick={() => handleRedownload(r.material)}
                          className="rounded-full apple-press shrink-0"
                          aria-label={`Re-download ${r.material.file_name}`}
                        >
                          {redownloadingId === r.material.id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Download className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
