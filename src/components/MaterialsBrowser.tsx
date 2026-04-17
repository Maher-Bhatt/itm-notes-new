import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft, ChevronRight, Download, FileText, FileType,
  Loader2, Inbox, AlertCircle, RefreshCw, Lock, BookOpen,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { subjects } from "@/data/subjects";
import { downloadMaterial, formatFileSize, type Material } from "@/lib/materials";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  /** Optional initial subject — when set, opens straight on that subject's materials */
  initialSubjectId?: string;
}

const ICONS: Record<Material["file_type"], typeof FileText> = {
  pdf: FileText,
  pptx: FileType,
  docx: FileText,
};

export function MaterialsBrowser({ open, onOpenChange, initialSubjectId }: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(initialSubjectId ?? null);
  const [allMaterials, setAllMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setLoadError(null);
    const { data, error } = await (supabase as any)
      .from("materials")
      .select("*")
      .order("uploaded_at", { ascending: false });
    if (error) {
      setLoadError(error.message ?? "Couldn't load materials");
      setAllMaterials([]);
    } else {
      setAllMaterials((data as Material[]) ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open) {
      setSelectedSubjectId(initialSubjectId ?? null);
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialSubjectId]);

  // Count materials per subject (for the picker)
  const countsBySubject = useMemo(() => {
    const map = new Map<string, number>();
    for (const m of allMaterials) map.set(m.subject_id, (map.get(m.subject_id) ?? 0) + 1);
    return map;
  }, [allMaterials]);

  const filteredMaterials = useMemo(
    () => (selectedSubjectId ? allMaterials.filter((m) => m.subject_id === selectedSubjectId) : []),
    [allMaterials, selectedSubjectId],
  );

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId) ?? null;

  const handleDownload = async (m: Material) => {
    if (!user) {
      toast.info("Please sign in to download materials", {
        action: { label: "Sign in", onClick: () => { onOpenChange(false); navigate("/auth"); } },
      });
      return;
    }
    setDownloadingId(m.id);
    const toastId = toast.loading(`Downloading ${m.file_name}…`);
    try {
      await downloadMaterial(m, user.id);
      toast.success("Download started", { id: toastId });
      setAllMaterials((prev) =>
        prev.map((p) => (p.id === m.id ? { ...p, download_count: (p.download_count ?? 0) + 1 } : p)),
      );
    } catch (err) {
      toast.error("Download failed", {
        id: toastId,
        description: (err as Error).message,
        action: { label: "Retry", onClick: () => handleDownload(m) },
      });
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl surface-elevated border max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="font-semibold flex items-center gap-2">
            {selectedSubject && (
              <button
                onClick={() => setSelectedSubjectId(null)}
                className="apple-press p-1 -ml-1 rounded hover:bg-secondary"
                aria-label="Back to subjects"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}
            {selectedSubject ? `Materials — ${selectedSubject.name}` : "Study Materials"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {selectedSubject
              ? "PDFs, slides, and notes uploaded by your instructors."
              : "Pick a subject to see available study materials."}
          </DialogDescription>
        </DialogHeader>

        {!user && (
          <div className="flex items-start gap-2 rounded border border-border bg-secondary/50 p-2.5 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span>
              You can browse all materials freely. <button
                className="text-primary font-medium hover:underline"
                onClick={() => { onOpenChange(false); navigate("/auth"); }}
              >Sign in</button> to download files.
            </span>
          </div>
        )}

        <div className="overflow-y-auto -mx-1 px-1">
          {/* === Subject picker === */}
          {!selectedSubjectId && (
            loading ? (
              <div className="space-y-2 mt-2" aria-busy="true">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="h-14 rounded bg-secondary animate-pulse" />
                ))}
              </div>
            ) : loadError ? (
              <ErrorState onRetry={load} />
            ) : (
              <div className="space-y-2 mt-2">
                {subjects.map((s) => {
                  const count = countsBySubject.get(s.id) ?? 0;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedSubjectId(s.id)}
                      className="w-full surface-elevated rounded p-3 flex items-center gap-3 hover:bg-secondary transition-colors apple-press text-left"
                    >
                      <div className="w-9 h-9 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <BookOpen className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{s.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          Semester {s.semester} · {count} material{count === 1 ? "" : "s"}
                        </p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                    </button>
                  );
                })}
              </div>
            )
          )}

          {/* === Materials list === */}
          {selectedSubjectId && (
            loading ? (
              <div className="space-y-2 mt-2" aria-busy="true">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-16 rounded bg-secondary animate-pulse" />
                ))}
              </div>
            ) : loadError ? (
              <ErrorState onRetry={load} />
            ) : filteredMaterials.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Inbox className="h-8 w-8 mx-auto mb-3 opacity-40" />
                <p className="text-sm">No materials uploaded yet for this subject.</p>
                <p className="text-xs mt-1 opacity-70">Check back soon — your instructor hasn't uploaded any files.</p>
              </div>
            ) : (
              <div className="space-y-2 mt-2">
                {filteredMaterials.map((m) => {
                  const Icon = ICONS[m.file_type] ?? FileText;
                  const isDownloading = downloadingId === m.id;
                  return (
                    <div
                      key={m.id}
                      className="surface-elevated rounded p-3 flex items-center gap-3 hover:bg-secondary transition-colors"
                    >
                      <div className="w-9 h-9 rounded bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{m.file_name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {m.file_type.toUpperCase()} · {formatFileSize(m.file_size)} ·{" "}
                          {new Date(m.uploaded_at).toLocaleDateString()}
                          {typeof m.download_count === "number" && m.download_count > 0 && (
                            <> · {m.download_count} download{m.download_count === 1 ? "" : "s"}</>
                          )}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant={user ? "outline" : "secondary"}
                        disabled={isDownloading}
                        onClick={() => handleDownload(m)}
                        className="rounded-full apple-press shrink-0"
                        aria-label={user ? `Download ${m.file_name}` : `Sign in to download ${m.file_name}`}
                        title={user ? "Download" : "Sign in to download"}
                      >
                        {isDownloading ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : user ? (
                          <Download className="h-3.5 w-3.5" />
                        ) : (
                          <Lock className="h-3.5 w-3.5" />
                        )}
                        <span className="ml-1.5 hidden sm:inline">
                          {isDownloading ? "…" : user ? "Download" : "Sign in"}
                        </span>
                      </Button>
                    </div>
                  );
                })}
              </div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="text-center py-12 text-muted-foreground">
      <AlertCircle className="h-8 w-8 mx-auto mb-3 text-destructive opacity-70" />
      <p className="text-sm mb-3">Couldn't load materials.</p>
      <Button size="sm" variant="outline" onClick={onRetry} className="rounded-full">
        <RefreshCw className="h-3.5 w-3.5 mr-1.5" /> Try again
      </Button>
    </div>
  );
}
