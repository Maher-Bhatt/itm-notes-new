import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchDialog } from "@/components/SearchDialog";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { subjects } from "@/data/subjects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MaterialUploadForm } from "@/components/admin/MaterialUploadForm";
import { MaterialsManager } from "@/components/admin/MaterialsManager";
import { UserDetailsDialog } from "@/components/admin/UserDetailsDialog";
import {
  Download, Search, Users, TrendingUp, Activity, Star, FileDown, Shield, ShieldCheck,
  ShieldOff, Loader2, Eye,
} from "lucide-react";
import { toast } from "sonner";

const AdminCharts = lazy(() => import("@/components/admin/AdminCharts"));

interface AdminUser {
  user_id: string;
  email: string;
  display_name: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  topics_completed: number;
  quizzes_taken: number;
  downloads: number;
  is_admin: boolean;
  total_count: number;
}

interface Stats {
  total_users: number;
  new_this_month: number;
  active_30d: number;
  total_downloads: number;
  total_reviews: number;
  avg_rating: number;
  retention_pct: number;
}

const PAGE_SIZE = 25;
const RANGES = [
  { value: "7",   label: "Last 7 days" },
  { value: "30",  label: "Last 30 days" },
  { value: "90",  label: "Last 90 days" },
  { value: "365", label: "Last year" },
  { value: "all", label: "All time" },
] as const;

export default function AdminDashboard() {
  const { isAdmin, loading: roleLoading } = useIsAdmin();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [growth, setGrowth] = useState<{ day: string; count: number }[]>([]);
  const [subjectPop, setSubjectPop] = useState<{ name: string; users: number }[]>([]);
  const [quizScores, setQuizScores] = useState<{ date: string; avg: number }[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);

  const [range, setRange] = useState<string>("30");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  const [detailUser, setDetailUser] = useState<{ id: string; email: string } | null>(null);
  const [roleBusyId, setRoleBusyId] = useState<string | null>(null);
  const [materialsKey, setMaterialsKey] = useState(0);

  // Redirect non-admins
  useEffect(() => {
    if (!roleLoading && !isAdmin) {
      toast.error("Admin access required");
      navigate("/");
    }
  }, [isAdmin, roleLoading, navigate]);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const dateRange = useMemo(() => {
    if (range === "all") return { from: null as Date | null, to: null as Date | null };
    const days = Number(range);
    const to = new Date();
    const from = new Date(Date.now() - days * 86400000);
    return { from, to };
  }, [range]);

  const loadStatsAndCharts = useCallback(async () => {
    const sb = supabase as any;
    setStatsError(null);
    const [statsRes, growthRes, popRes, scoresRes] = await Promise.all([
      sb.rpc("admin_stats"),
      sb.rpc("admin_user_growth",
        dateRange.from && dateRange.to
          ? { _from: dateRange.from.toISOString(), _to: dateRange.to.toISOString() }
          : {},
      ),
      sb.from("progress").select("topic_id, user_id").eq("completed", true),
      sb.from("test_results")
        .select("score, total_questions, taken_at")
        .gte("taken_at", dateRange.from ? dateRange.from.toISOString() : "1970-01-01")
        .order("taken_at"),
    ]);

    if (statsRes.error) setStatsError(statsRes.error.message ?? "Couldn't load stats");
    if (statsRes.data) setStats(statsRes.data as unknown as Stats);

    if (growthRes.data) {
      setGrowth(
        (growthRes.data as { day: string; count: number }[]).map((r) => ({
          day: new Date(r.day).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
          count: Number(r.count),
        })),
      );
    } else {
      setGrowth([]);
    }

    if (popRes.data) {
      const topicToSubject = new Map<string, string>();
      for (const subj of subjects) for (const u of subj.units) for (const t of u.topics) topicToSubject.set(t.id, subj.id);
      const counter = new Map<string, Set<string>>();
      for (const row of popRes.data as { topic_id: string; user_id: string }[]) {
        const sid = topicToSubject.get(row.topic_id);
        if (!sid) continue;
        const set = counter.get(sid) ?? new Set();
        set.add(row.user_id);
        counter.set(sid, set);
      }
      setSubjectPop(subjects.map((s) => ({ name: s.name.split(" ")[0], users: counter.get(s.id)?.size ?? 0 })));
    }

    if (scoresRes.data) {
      const byDay = new Map<string, { sum: number; n: number }>();
      for (const r of scoresRes.data as { score: number; total_questions: number; taken_at: string }[]) {
        const day = new Date(r.taken_at).toLocaleDateString(undefined, { month: "short", day: "numeric" });
        const pct = (r.score / Math.max(r.total_questions, 1)) * 100;
        const cur = byDay.get(day) ?? { sum: 0, n: 0 };
        cur.sum += pct; cur.n += 1;
        byDay.set(day, cur);
      }
      setQuizScores(Array.from(byDay.entries()).map(([date, v]) => ({ date, avg: Math.round(v.sum / v.n) })));
    }
  }, [dateRange.from, dateRange.to]);

  const loadUsers = useCallback(async () => {
    const sb = supabase as any;
    const { data, error } = await sb.rpc("admin_list_users", {
      _search: debouncedSearch || null,
      _from:   dateRange.from ? dateRange.from.toISOString() : null,
      _to:     dateRange.to   ? dateRange.to.toISOString()   : null,
      _limit:  PAGE_SIZE,
      _offset: (page - 1) * PAGE_SIZE,
    });
    if (error) {
      toast.error("Couldn't load users", { description: error.message });
      setUsers([]); setTotalUsers(0);
      return;
    }
    const list = (data ?? []) as AdminUser[];
    setUsers(list);
    setTotalUsers(list.length > 0 ? Number(list[0].total_count) : 0);
  }, [debouncedSearch, dateRange.from, dateRange.to, page]);

  const loadAll = useCallback(async () => {
    setLoadingData(true);
    await Promise.all([loadStatsAndCharts(), loadUsers()]);
    setLoadingData(false);
  }, [loadStatsAndCharts, loadUsers]);

  useEffect(() => { if (isAdmin) loadAll(); }, [isAdmin, loadAll]);

  const totalPages = Math.max(1, Math.ceil(totalUsers / PAGE_SIZE));

  const exportCSV = () => {
    const headers = ["Display Name", "Email", "Sign Up Date", "Last Login", "Topics Completed", "Quizzes Taken", "Downloads", "Admin"];
    const rows = users.map((u) => [
      u.display_name ?? "", u.email,
      new Date(u.created_at).toISOString(),
      u.last_sign_in_at ? new Date(u.last_sign_in_at).toISOString() : "",
      u.topics_completed, u.quizzes_taken, u.downloads, u.is_admin ? "yes" : "no",
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  const toggleAdmin = async (u: AdminUser) => {
    if (currentUser?.id === u.user_id) {
      toast.error("You can't change your own admin status");
      return;
    }
    setRoleBusyId(u.user_id);
    const grant = !u.is_admin;
    const toastId = toast.loading(grant ? "Promoting…" : "Demoting…");
    try {
      const { error } = await (supabase as any).rpc("admin_set_role", {
        _target_user: u.user_id, _role: "admin", _grant: grant,
      });
      if (error) throw error;
      toast.success(grant ? "User promoted to admin" : "Admin role removed", { id: toastId });
      setUsers((prev) => prev.map((p) => p.user_id === u.user_id ? { ...p, is_admin: grant } : p));
    } catch (err) {
      toast.error("Action failed", { id: toastId, description: (err as Error).message });
    } finally {
      setRoleBusyId(null);
    }
  };

  const retention = stats?.retention_pct ?? (
    stats && stats.total_users ? Math.round((stats.active_30d / stats.total_users) * 100) : 0
  );

  if (roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground text-sm">Verifying admin access…</div>
      </div>
    );
  }
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <Header onSearchOpen={() => setSearchOpen(true)} showBack backTo="/" />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-5 w-5 text-primary" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-sm text-muted-foreground">User analytics, content management, and platform stats.</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={range} onValueChange={setRange}>
              <SelectTrigger className="h-9 w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                {RANGES.map((r) => <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard icon={Users}       label="Total Users"      value={stats?.total_users ?? "—"}      loading={loadingData} />
          <StatCard icon={TrendingUp}  label="New This Month"   value={stats?.new_this_month ?? "—"}   loading={loadingData} />
          <StatCard icon={Activity}    label="Active (30d)"     value={stats?.active_30d ?? "—"}       loading={loadingData} />
          <StatCard icon={Star}        label="Retention"        value={stats ? `${retention}%` : "—"}  loading={loadingData} />
        </div>

        {statsError && (
          <div className="surface-elevated rounded p-4 mb-6 text-sm text-destructive">
            {statsError}. Make sure the database migration has been applied.
          </div>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="materials">Materials</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <Suspense fallback={<div className="surface-elevated rounded h-[500px] animate-pulse" />}>
              <AdminCharts
                growth={growth}
                subjectPop={subjectPop}
                quizScores={quizScores}
                metrics={{
                  total_downloads: stats?.total_downloads ?? 0,
                  total_reviews:   stats?.total_reviews ?? 0,
                  avg_rating:      stats?.avg_rating ?? 0,
                  retention,
                }}
              />
            </Suspense>
          </TabsContent>

          {/* Users */}
          <TabsContent value="users" className="space-y-4">
            <div className="surface-elevated rounded p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 className="font-semibold text-sm">Users ({totalUsers})</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="h-3.5 w-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search email or name…"
                      className="pl-9 h-9 w-full sm:w-64"
                    />
                  </div>
                  <Button onClick={exportCSV} size="sm" variant="outline" className="rounded-full apple-press">
                    <FileDown className="h-3.5 w-3.5 mr-1.5" /> CSV
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last login</TableHead>
                      <TableHead className="text-right">Topics</TableHead>
                      <TableHead className="text-right">Quizzes</TableHead>
                      <TableHead className="text-right">DLs</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[120px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loadingData ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell colSpan={9}><div className="h-6 bg-secondary animate-pulse rounded" /></TableCell>
                        </TableRow>
                      ))
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center text-muted-foreground py-8 text-sm">
                          No users found
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((u) => {
                        const active = u.last_sign_in_at && new Date(u.last_sign_in_at) > new Date(Date.now() - 30 * 86400000);
                        const isSelf = currentUser?.id === u.user_id;
                        return (
                          <TableRow key={u.user_id}>
                            <TableCell className="font-medium">{u.display_name ?? "—"}</TableCell>
                            <TableCell className="text-muted-foreground max-w-[220px] truncate" title={u.email}>{u.email}</TableCell>
                            <TableCell className="text-muted-foreground text-xs">{new Date(u.created_at).toLocaleDateString()}</TableCell>
                            <TableCell className="text-muted-foreground text-xs">
                              {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString() : "Never"}
                            </TableCell>
                            <TableCell className="tabular-nums text-right">{u.topics_completed}</TableCell>
                            <TableCell className="tabular-nums text-right">{u.quizzes_taken}</TableCell>
                            <TableCell className="tabular-nums text-right">{u.downloads}</TableCell>
                            <TableCell>
                              {u.is_admin ? <Badge>Admin</Badge>
                                : active ? <Badge variant="secondary">Active</Badge>
                                : <Badge variant="outline">Inactive</Badge>}
                            </TableCell>
                            <TableCell>
                              <div className="flex justify-end gap-1">
                                <Button
                                  size="sm" variant="ghost"
                                  onClick={() => setDetailUser({ id: u.user_id, email: u.email })}
                                  className="h-7 w-7 p-0"
                                  aria-label="View details"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  size="sm" variant="ghost"
                                  onClick={() => toggleAdmin(u)}
                                  disabled={roleBusyId === u.user_id || isSelf}
                                  title={isSelf ? "You can't change your own admin status" : (u.is_admin ? "Remove admin" : "Make admin")}
                                  className="h-7 w-7 p-0"
                                  aria-label={u.is_admin ? "Demote" : "Promote"}
                                >
                                  {roleBusyId === u.user_id
                                    ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    : u.is_admin
                                      ? <ShieldOff className="h-3.5 w-3.5 text-destructive" />
                                      : <ShieldCheck className="h-3.5 w-3.5 text-primary" />}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
                <span>Page {page} of {totalPages}</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" disabled={page === 1 || loadingData} onClick={() => setPage(page - 1)} className="rounded-full h-7 px-3">Prev</Button>
                  <Button size="sm" variant="outline" disabled={page >= totalPages || loadingData} onClick={() => setPage(page + 1)} className="rounded-full h-7 px-3">Next</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Materials */}
          <TabsContent value="materials" className="space-y-6">
            <MaterialUploadForm onUploaded={() => setMaterialsKey((k) => k + 1)} />
            <MaterialsManager refreshKey={materialsKey} />
          </TabsContent>
        </Tabs>

        <UserDetailsDialog
          userId={detailUser?.id ?? null}
          email={detailUser?.email ?? null}
          onOpenChange={(open) => { if (!open) setDetailUser(null); }}
        />
      </main>
      <Footer />
    </div>
  );
}

function StatCard({ icon: Icon, label, value, loading }: { icon: typeof Users; label: string; value: string | number; loading: boolean }) {
  return (
    <div className="surface-elevated rounded p-4">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      {loading
        ? <div className="h-7 w-16 bg-secondary animate-pulse rounded" />
        : <div className="text-2xl font-bold tabular-nums">{value}</div>}
    </div>
  );
}
