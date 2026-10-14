import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { subjects } from "@/data/subjects";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  Users,
  Wrench,
  Megaphone,
  BarChart3,
  MessageSquare,
  Shield,
  CheckCircle,
  XCircle,
  Search,
  RefreshCw,
  Trash2,
  Flag,
  ChevronLeft,
  ChevronRight,
  Download,
  BookOpen,
  Layers,
  Hash,
  FileText,
  Activity,
  Zap,
  AlertTriangle,
  Info,
  Bell,
  CheckCheck,
  Clock,
  Users2,
  ThumbsUp,
  Eye,
  Database,
  Power,
  Lock,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface UserRow {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  xp: number;
  joined: string;
  avatarUrl?: string;
}

interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success" | "error";
  audience: "all" | "students" | "admins";
  active: boolean;
  createdAt: string;
}

interface CommunityPost {
  id: string;
  content: string;
  authorName: string;
  upvotes: number;
  createdAt: string;
  isFlagged?: boolean;
}

type TabId =
  | "overview"
  | "users"
  | "maintenance"
  | "announcements"
  | "platform"
  | "moderation";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "platform", label: "Platform Data", icon: BarChart3 },
  { id: "moderation", label: "Moderation", icon: MessageSquare },
];

const TYPE_COLORS = {
  info: "#3b82f6",
  warning: "#f59e0b",
  success: "#22c55e",
  error: "#ef4444",
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.FC<{ className?: string }>;
  label: string;
  value: string | number;
  accent?: string;
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex items-center gap-4 shadow-sm">
      <div
        className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: accent ? `${accent}22` : "#D6E85D22" }}
      >
        <Icon
          className="h-5 w-5"
          style={{ color: accent ?? "#D6E85D" }}
        />
      </div>
      <div>
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-extrabold text-white leading-tight">{value}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { role, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  // Redirect non-admins
  useEffect(() => {
    if (role !== null && role !== "admin") {
      navigate("/");
    }
  }, [role, navigate]);

  // ── Platform stats ──────────────────────────────────────────────────────────
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalPosts, setTotalPosts] = useState<number | null>(null);
  const [supabaseOk, setSupabaseOk] = useState<boolean | null>(null);
  const [recentActivity, setRecentActivity] = useState<CommunityPost[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

  // Curriculum stats (computed from local data)
  const totalSubjects = subjects.length;
  const totalUnits = subjects.reduce((a, s) => a + (s.units?.length ?? 0), 0);
  const totalTopics = subjects.reduce(
    (a, s) =>
      a + (s.units?.reduce((ua, u) => ua + (u.topics?.length ?? 0), 0) ?? 0),
    0
  );
  const totalMcqs = subjects.reduce(
    (a, s) =>
      a +
      (s.units?.reduce(
        (ua, u) =>
          ua + (u.topics?.reduce((ta, t) => ta + (t.mcqs?.length ?? 0), 0) ?? 0),
        0
      ) ?? 0),
    0
  );
  const totalPracticals = subjects.reduce(
    (a, s) =>
      a +
      (s.units?.reduce(
        (ua, u) =>
          ua +
          (u.topics?.reduce(
            (ta, t) => ta + (t.examples?.length ?? 0),
            0
          ) ?? 0),
        0
      ) ?? 0),
    0
  );

  // Chart data: MCQ count per subject (top 10)
  const mcqChartData = useMemo(
    () =>
      subjects
        .map((s) => ({
          name: s.code ?? s.name.slice(0, 6),
          mcqs: s.units?.reduce(
            (ua, u) =>
              ua + (u.topics?.reduce((ta, t) => ta + (t.mcqs?.length ?? 0), 0) ?? 0),
            0
          ) ?? 0,
        }))
        .filter((d) => d.mcqs > 0)
        .sort((a, b) => b.mcqs - a.mcqs)
        .slice(0, 10),
    []
  );

  const loadOverviewStats = async () => {
    setStatsLoading(true);
    try {
      const start = performance.now();
      const [usersRes, postsRes, activityRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("community_posts").select("id", { count: "exact", head: true }),
        supabase
          .from("community_posts")
          .select("id, content, created_at, upvotes_count")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);
      const latency = Math.round(performance.now() - start);
      setSupabaseOk(latency < 5000 && !usersRes.error);
      setTotalUsers(usersRes.count ?? 0);
      setTotalPosts(postsRes.count ?? 0);
      if (activityRes.data) {
        setRecentActivity(
          activityRes.data.map((p: any) => ({
            id: p.id,
            content: p.content ?? "",
            authorName: "Community User",
            upvotes: p.upvotes_count ?? 0,
            createdAt: p.created_at,
          }))
        );
      }
    } catch {
      setSupabaseOk(false);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    loadOverviewStats();
  }, []);

  // ── User Management ─────────────────────────────────────────────────────────
  const [users, setUsers] = useState<UserRow[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(1);
  const USERS_PER_PAGE = 10;

  const loadUsers = async () => {
    setUsersLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, user_id, display_name, email, role, xp, created_at, avatar_url")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) {
        setUsers(
          data.map((p: any) => ({
            id: p.id,
            userId: p.user_id,
            name: p.display_name ?? p.email?.split("@")[0] ?? "Student",
            email: p.email ?? "—",
            role: p.role ?? "student",
            xp: p.xp ?? 0,
            joined: p.created_at
              ? new Date(p.created_at).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "—",
            avatarUrl: p.avatar_url,
          }))
        );
      }
    } catch (err) {
      console.error("Failed to load users:", err);
      toast.error("Could not fetch users from Supabase.");
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "users") loadUsers();
  }, [activeTab]);

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (u) =>
          u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
          u.email.toLowerCase().includes(userSearch.toLowerCase())
      ),
    [users, userSearch]
  );
  const pagedUsers = filteredUsers.slice(
    (userPage - 1) * USERS_PER_PAGE,
    userPage * USERS_PER_PAGE
  );
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const handleRoleChange = async (profileId: string, userId: string, newRole: string) => {
    setUsers((prev) => prev.map((u) => (u.id === profileId ? { ...u, role: newRole } : u)));
    try {
      await supabase.from("profiles").update({ role: newRole }).eq("id", profileId);
      const appRole = newRole === "admin" ? "admin" : "user";
      await supabase.from("user_roles").upsert({ user_id: userId, role: appRole as any });
      toast.success(`Role updated to ${newRole.toUpperCase()}`);
    } catch {
      toast.error("Failed to update role.");
      loadUsers();
    }
  };

  const exportUsersCSV = () => {
    const headers = ["Name", "Email", "Role", "XP", "Joined"];
    const rows = filteredUsers.map((u) =>
      [`"${u.name}"`, `"${u.email}"`, u.role, u.xp, `"${u.joined}"`].join(",")
    );
    const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `itm_users_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${filteredUsers.length} user records`);
  };

  // ── Maintenance Mode ────────────────────────────────────────────────────────
  const [maintenanceOn, setMaintenanceOn] = useState(() => {
    try {
      return localStorage.getItem("itm_maintenance_mode") === "true";
    } catch {
      return false;
    }
  });
  const [maintenanceMsg, setMaintenanceMsg] = useState(() => {
    try {
      const stored = localStorage.getItem("itm_maintenance_config");
      if (stored) {
        const cfg = JSON.parse(stored);
        return cfg.message ?? "";
      }
    } catch {}
    return "ITM Notes is currently undergoing a scheduled infrastructure upgrade. We will be back shortly.";
  });
  const [maintenanceCountdown, setMaintenanceCountdown] = useState(30);

  const toggleMaintenance = () => {
    const next = !maintenanceOn;
    setMaintenanceOn(next);
    localStorage.setItem("itm_maintenance_mode", String(next));
    // Also save full config so MaintenanceBanner picks it up
    const cfg = {
      active: next,
      title: "We are building something incredible.",
      message: maintenanceMsg,
      endTime: next
        ? new Date(Date.now() + maintenanceCountdown * 60 * 1000).toISOString()
        : null,
    };
    localStorage.setItem("itm_maintenance_config", JSON.stringify(cfg));
    window.dispatchEvent(new Event("itm_maintenance_updated"));
    try {
      const bc = new BroadcastChannel("itm_maintenance_channel");
      bc.postMessage(cfg);
      bc.close();
    } catch {}

    // Synchronize globally via Supabase profiles for instant multi-device sync
    supabase
      .from("profiles")
      .update({ status: next ? `MAINTENANCE:${JSON.stringify(cfg)}` : "Active" })
      .eq("email", "maherbhatt01@gmail.com")
      .then(() => {});

    toast[next ? "warning" : "success"](
      next ? "Maintenance mode is now ACTIVE globally — students are blocked." : "Maintenance mode is OFF — site is live globally."
    );
  };

  const saveMaintenanceMessage = () => {
    const stored = localStorage.getItem("itm_maintenance_config");
    const existing = stored ? JSON.parse(stored) : {};
    const updated = { ...existing, message: maintenanceMsg };
    localStorage.setItem(
      "itm_maintenance_config",
      JSON.stringify(updated)
    );
    window.dispatchEvent(new Event("itm_maintenance_updated"));

    if (maintenanceOn) {
      supabase
        .from("profiles")
        .update({ status: `MAINTENANCE:${JSON.stringify(updated)}` })
        .eq("email", "maherbhatt01@gmail.com")
        .then(() => {});
    }
    toast.success("Maintenance message saved and synced.");
  };

  const launchStudentPreview = () => {
    sessionStorage.setItem("itm_preview_maintenance", "true");
    window.dispatchEvent(new Event("itm_preview_maintenance"));
    toast.info("Launching student maintenance lock screen...");
  };

  const testFullLockout = () => {
    sessionStorage.removeItem("itm_admin_bypassed");
    localStorage.removeItem("itm_admin_god_mode");
    sessionStorage.setItem("itm_preview_maintenance", "true");
    window.dispatchEvent(new Event("itm_preview_maintenance"));
    toast.warning("Full Lockout active! Unlock using Master PIN (2026).");
  };

  // ── Announcements ───────────────────────────────────────────────────────────
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const raw = localStorage.getItem("itm_announcements");
      if (raw) return JSON.parse(raw);
    } catch {}
    return [];
  });
  const [annTitle, setAnnTitle] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [annType, setAnnType] = useState<Announcement["type"]>("info");
  const [annAudience, setAnnAudience] = useState<Announcement["audience"]>("all");

  const saveAnnouncements = (list: Announcement[]) => {
    setAnnouncements(list);
    localStorage.setItem("itm_announcements", JSON.stringify(list));
    window.dispatchEvent(new Event("itm_announcement_updated"));
  };

  const createAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) {
      toast.error("Title and message are required.");
      return;
    }
    const entry: Announcement = {
      id: `ann-${Date.now()}`,
      title: annTitle.trim(),
      message: annMessage.trim(),
      type: annType,
      audience: annAudience,
      active: true,
      createdAt: new Date().toISOString(),
    };
    saveAnnouncements([entry, ...announcements]);
    setAnnTitle("");
    setAnnMessage("");
    toast.success(`Announcement "${entry.title}" published!`);
  };

  const deleteAnnouncement = (id: string) => {
    saveAnnouncements(announcements.filter((a) => a.id !== id));
    toast.info("Announcement deleted.");
  };

  const toggleAnnouncement = (id: string) => {
    saveAnnouncements(announcements.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  // ── Community Moderation ─────────────────────────────────────────────────────
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>([]);
  const [moderationLoading, setModerationLoading] = useState(false);
  const [flagged, setFlagged] = useState<Set<string>>(new Set());

  const loadCommunityPosts = async () => {
    setModerationLoading(true);
    try {
      const { data, error } = await supabase
        .from("community_posts")
        .select("id, content, created_at, upvotes_count")
        .order("created_at", { ascending: false })
        .limit(30);
      if (error) throw error;
      if (data) {
        setCommunityPosts(
          data.map((p: any) => ({
            id: p.id,
            content: p.content ?? "",
            authorName: "Community User",
            upvotes: p.upvotes_count ?? 0,
            createdAt: p.created_at,
          }))
        );
      }
    } catch {
      toast.error("Could not load community posts.");
    } finally {
      setModerationLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "moderation") loadCommunityPosts();
  }, [activeTab]);

  const deletePost = async (id: string) => {
    try {
      await supabase.from("community_posts").delete().eq("id", id);
      setCommunityPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Post deleted.");
    } catch {
      toast.error("Failed to delete post.");
    }
  };

  const toggleFlag = (id: string) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/90 sticky top-0 z-30 backdrop-blur">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-[#D6E85D]/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-[#D6E85D]" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-extrabold text-white leading-none">
                ITM Notes Admin
              </h1>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                🛡️ Platform Admin &middot; {user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Maintenance quick badge */}
            <span
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                maintenanceOn
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${maintenanceOn ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
              {maintenanceOn ? "Maintenance ON" : "Site Live"}
            </span>
            <button
              onClick={() => navigate("/admin/seed")}
              className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-xl text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Database className="h-3.5 w-3.5" />
              Seed DB
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex gap-0.5 overflow-x-auto pb-px">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-t-lg border-b-2 transition-all whitespace-nowrap ${
                  active
                    ? "border-[#D6E85D] text-[#D6E85D] bg-slate-800/60"
                    : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ── TAB: OVERVIEW ─────────────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon={Users2}
                label="Total Users"
                value={statsLoading ? "…" : (totalUsers ?? "—")}
                accent="#D6E85D"
              />
              <StatCard
                icon={MessageSquare}
                label="Community Posts"
                value={statsLoading ? "…" : (totalPosts ?? "—")}
                accent="#60a5fa"
              />
              <StatCard
                icon={BookOpen}
                label="Total Subjects"
                value={totalSubjects}
                accent="#a78bfa"
              />
              <StatCard
                icon={Hash}
                label="Total MCQs"
                value={totalMcqs.toLocaleString()}
                accent="#f472b6"
              />
            </div>

            {/* System health + recent activity */}
            <div className="grid lg:grid-cols-2 gap-4">
              {/* System health */}
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-base text-white flex items-center gap-2">
                    <Activity className="h-4 w-4 text-[#D6E85D]" />
                    System Health
                  </h2>
                  <button
                    onClick={loadOverviewStats}
                    disabled={statsLoading}
                    className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 text-slate-300 ${statsLoading ? "animate-spin" : ""}`} />
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-700/50 border border-slate-600">
                    <span className="text-sm text-slate-300 font-medium">Supabase Connection</span>
                    <span className="flex items-center gap-1.5 text-xs font-bold">
                      {supabaseOk === null ? (
                        <span className="text-slate-500">Checking…</span>
                      ) : supabaseOk ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-emerald-400">Connected</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                          <span className="text-red-400">Error</span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-700/50 border border-slate-600">
                    <span className="text-sm text-slate-300 font-medium">Maintenance Mode</span>
                    <span className={`flex items-center gap-1.5 text-xs font-bold ${maintenanceOn ? "text-amber-400" : "text-emerald-400"}`}>
                      <span className={`w-2 h-2 rounded-full ${maintenanceOn ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`} />
                      {maintenanceOn ? "ON" : "OFF"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-700/50 border border-slate-600">
                    <span className="text-sm text-slate-300 font-medium">Active Announcements</span>
                    <span className="text-xs font-bold text-[#D6E85D]">
                      {announcements.filter((a) => a.active).length}
                    </span>
                  </div>
                </div>

                {/* Quick actions */}
                <div className="pt-2 border-t border-slate-700">
                  <p className="text-[11px] text-slate-500 font-semibold uppercase mb-2">Quick Actions</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveTab("users")}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-xs font-semibold text-slate-200 transition-colors"
                    >
                      View Users
                    </button>
                    <button
                      onClick={() => setActiveTab("announcements")}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-xs font-semibold text-slate-200 transition-colors"
                    >
                      Post Announcement
                    </button>
                    <button
                      onClick={() => {
                        toggleMaintenance();
                        setActiveTab("maintenance");
                      }}
                      className={`px-3 py-1.5 border rounded-lg text-xs font-semibold transition-colors ${
                        maintenanceOn
                          ? "bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20"
                          : "bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                      }`}
                    >
                      {maintenanceOn ? "Disable Maintenance" : "Toggle Maintenance"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent activity feed */}
              <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-3">
                <h2 className="font-bold text-base text-white flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#D6E85D]" />
                  Recent Community Posts
                </h2>
                {statsLoading ? (
                  <div className="flex items-center justify-center h-32 text-slate-500 text-sm">
                    Loading…
                  </div>
                ) : recentActivity.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-8">No recent posts.</p>
                ) : (
                  <div className="space-y-2">
                    {recentActivity.map((post) => (
                      <div
                        key={post.id}
                        className="p-3 rounded-xl bg-slate-700/50 border border-slate-600 text-sm"
                      >
                        <p className="text-slate-200 line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" /> {post.upvotes}
                          </span>
                          <span>{new Date(post.createdAt).toLocaleDateString("en-IN")}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: USERS ────────────────────────────────────────────────────────── */}
        {activeTab === "users" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  value={userSearch}
                  onChange={(e) => { setUserSearch(e.target.value); setUserPage(1); }}
                  placeholder="Search by name or email…"
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]/60"
                />
              </div>
              <button
                onClick={loadUsers}
                className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${usersLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
              <button
                onClick={exportUsersCSV}
                className="flex items-center gap-1.5 px-3 py-2.5 bg-[#D6E85D]/10 border border-[#D6E85D]/30 rounded-xl text-xs font-semibold text-[#D6E85D] hover:bg-[#D6E85D]/20 transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                Export CSV
              </button>
            </div>

            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
              {usersLoading ? (
                <div className="flex items-center justify-center py-16 text-slate-500">Loading users…</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-700/60 text-slate-400 uppercase text-[11px] font-bold border-b border-slate-700">
                      <tr>
                        <th className="px-4 py-3">User</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">XP</th>
                        <th className="px-4 py-3">Joined</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50">
                      {pagedUsers.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-500">
                            No users found.
                          </td>
                        </tr>
                      ) : (
                        pagedUsers.map((u) => (
                          <tr key={u.id} className="hover:bg-slate-700/30 transition-colors">
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2.5">
                                <div className="h-8 w-8 rounded-full bg-[#183F36] flex items-center justify-center text-[#D6E85D] text-xs font-bold shrink-0 overflow-hidden">
                                  {u.avatarUrl ? (
                                    <img src={u.avatarUrl} alt={u.name} className="h-full w-full object-cover" />
                                  ) : (
                                    u.name.charAt(0).toUpperCase()
                                  )}
                                </div>
                                <span className="font-semibold text-white">{u.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-slate-400 font-mono text-xs">{u.email}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${
                                u.role === "admin"
                                  ? "bg-[#D6E85D]/10 text-[#D6E85D] border-[#D6E85D]/30"
                                  : "bg-slate-700 text-slate-300 border-slate-600"
                              }`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-300 font-mono text-xs">{u.xp.toLocaleString()}</td>
                            <td className="px-4 py-3 text-slate-400 text-xs">{u.joined}</td>
                            <td className="px-4 py-3">
                              <select
                                value={u.role}
                                onChange={(e) => handleRoleChange(u.id, u.userId, e.target.value)}
                                className="bg-slate-700 border border-slate-600 rounded-lg text-xs text-slate-200 px-2 py-1 focus:outline-none focus:border-[#D6E85D]/60 cursor-pointer"
                              >
                                <option value="student">Student</option>
                                <option value="admin">Admin</option>
                                <option value="guest">Guest</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">
                  {filteredUsers.length} users &middot; Page {userPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <button
                    disabled={userPage === 1}
                    onClick={() => setUserPage((p) => p - 1)}
                    className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-40 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    disabled={userPage === totalPages}
                    onClick={() => setUserPage((p) => p + 1)}
                    className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 disabled:opacity-40 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: MAINTENANCE ──────────────────────────────────────────────────── */}
        {activeTab === "maintenance" && (
          <div className="space-y-6 animate-fade-in max-w-2xl">
            {/* Big toggle */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-base text-white flex items-center gap-2">
                  <Power className="h-4 w-4 text-[#D6E85D]" />
                  Global Maintenance Protocol
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  maintenanceOn
                    ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                    : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                }`}>
                  {maintenanceOn ? "SYSTEM LOCKED" : "ONLINE LIVE"}
                </span>
              </div>

              <div className="flex items-center justify-between p-5 bg-slate-700/50 rounded-xl border border-slate-600">
                <div>
                  <p className="font-bold text-white text-lg flex items-center gap-2">
                    <span>{maintenanceOn ? "🔴 Maintenance is ON" : "🟢 Site is Live"}</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    {maintenanceOn
                      ? "All students and visitors are blocked globally. Admins have bypass access."
                      : "All courses, coding labs, and materials are fully accessible to everyone."}
                  </p>
                </div>
                <button
                  onClick={toggleMaintenance}
                  className={`relative w-14 h-7 rounded-full transition-colors focus:outline-none border-2 shrink-0 cursor-pointer ${
                    maintenanceOn
                      ? "bg-amber-500 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                      : "bg-slate-600 border-slate-500"
                  }`}
                  title={maintenanceOn ? "Deactivate Maintenance" : "Activate Maintenance"}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      maintenanceOn ? "translate-x-7" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Action Buttons: Live Preview & Full Lockout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={launchStudentPreview}
                  className="px-4 py-3 bg-[#D6E85D] hover:bg-[#c2d54e] text-[#183F36] rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer group"
                >
                  <Eye className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Launch 3D Student Preview</span>
                </button>

                <button
                  type="button"
                  onClick={testFullLockout}
                  className="px-4 py-3 bg-red-600/90 hover:bg-red-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer border border-red-500/40"
                  title="Locks your screen too so you can test unlock with PIN 2026"
                >
                  <Lock className="h-4 w-4" />
                  <span>Test Lockout (PIN: 2026)</span>
                </button>
              </div>

              {/* Countdown timer */}
              <div className="pt-2 border-t border-slate-700/80">
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>Estimated Duration (Minutes)</span>
                  <span className="text-[#D6E85D] font-mono font-bold">{maintenanceCountdown} mins</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={480}
                  value={maintenanceCountdown}
                  onChange={(e) => setMaintenanceCountdown(Number(e.target.value))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D6E85D]/60"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Sets the live countdown timer displayed to students on the lock screen.
                </p>
              </div>
            </div>

            {/* Message editor */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#D6E85D]" />
                Public Maintenance Message
              </h2>
              <textarea
                value={maintenanceMsg}
                onChange={(e) => setMaintenanceMsg(e.target.value)}
                rows={3}
                className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]/60 resize-none"
                placeholder="Enter the message students will see during maintenance…"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">
                  Broadcasts in real-time to all connected devices.
                </p>
                <button
                  onClick={saveMaintenanceMessage}
                  className="px-4 py-2 bg-[#D6E85D] text-[#183F36] rounded-xl text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-xs"
                >
                  Save & Broadcast
                </button>
              </div>
            </div>

            {/* Quick Status Notice */}
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1.5">
              <p className="font-bold text-white flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[#D6E85D]" />
                Administrator Access Notes:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-slate-400">
                <li>Admins can continue navigating the dashboard while maintenance mode is active.</li>
                <li>Emergency unlock PIN for any blocked device: <strong className="text-white">2026</strong> or <strong className="text-white">velocity</strong>.</li>
                <li>Turning maintenance OFF restores instant access globally across all sessions.</li>
              </ul>
            </div>
          </div>
        )}

        {/* ── TAB: ANNOUNCEMENTS ────────────────────────────────────────────────── */}
        {activeTab === "announcements" && (
          <div className="space-y-6 animate-fade-in">
            {/* Create form */}
            <form
              onSubmit={createAnnouncement}
              className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4"
            >
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                <Bell className="h-4 w-4 text-[#D6E85D]" />
                New Announcement
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
                  <input
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    placeholder="Announcement title…"
                    className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]/60"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Type</label>
                    <select
                      value={annType}
                      onChange={(e) => setAnnType(e.target.value as Announcement["type"])}
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-[#D6E85D]/60"
                    >
                      <option value="info">Info</option>
                      <option value="warning">Warning</option>
                      <option value="success">Success</option>
                      <option value="error">Error</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Audience</label>
                    <select
                      value={annAudience}
                      onChange={(e) => setAnnAudience(e.target.value as Announcement["audience"])}
                      className="w-full bg-slate-700 border border-slate-600 rounded-xl px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-[#D6E85D]/60"
                    >
                      <option value="all">All</option>
                      <option value="students">Students</option>
                      <option value="admins">Admins</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Message</label>
                <textarea
                  value={annMessage}
                  onChange={(e) => setAnnMessage(e.target.value)}
                  rows={3}
                  placeholder="Write your announcement message…"
                  className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]/60 resize-none"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#D6E85D] text-[#183F36] rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Publish Announcement
              </button>
            </form>

            {/* List */}
            <div className="space-y-3">
              {announcements.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-10">No announcements yet.</p>
              ) : (
                announcements.map((ann) => {
                  const color = TYPE_COLORS[ann.type];
                  return (
                    <div
                      key={ann.id}
                      className={`bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-start justify-between gap-3 ${
                        !ann.active ? "opacity-50" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span
                          className="mt-0.5 flex-shrink-0 h-2.5 w-2.5 rounded-full"
                          style={{ background: color }}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-white text-sm">{ann.title}</p>
                            <span
                              className="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase"
                              style={{ background: `${color}22`, color }}
                            >
                              {ann.type}
                            </span>
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-700 text-slate-400 uppercase">
                              {ann.audience}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{ann.message}</p>
                          <p className="text-[11px] text-slate-600 mt-1">
                            {new Date(ann.createdAt).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => toggleAnnouncement(ann.id)}
                          title={ann.active ? "Deactivate" : "Activate"}
                          className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
                        >
                          {ann.active ? (
                            <Eye className="h-3.5 w-3.5 text-[#D6E85D]" />
                          ) : (
                            <CheckCheck className="h-3.5 w-3.5 text-slate-500" />
                          )}
                        </button>
                        <button
                          onClick={() => deleteAnnouncement(ann.id)}
                          className="p-1.5 rounded-lg bg-slate-700 hover:bg-red-900/40 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5 text-red-400" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ── TAB: PLATFORM DATA ────────────────────────────────────────────────── */}
        {activeTab === "platform" && (
          <div className="space-y-6 animate-fade-in">
            {/* Curriculum stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: "Subjects", value: totalSubjects, icon: BookOpen, accent: "#D6E85D" },
                { label: "Units", value: totalUnits, icon: Layers, accent: "#60a5fa" },
                { label: "Topics", value: totalTopics, icon: FileText, accent: "#a78bfa" },
                { label: "MCQs", value: totalMcqs, icon: Hash, accent: "#f472b6" },
                { label: "Examples", value: totalPracticals, icon: Zap, accent: "#34d399" },
              ].map((s) => (
                <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value.toLocaleString()} accent={s.accent} />
              ))}
            </div>

            {/* Bar chart */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#D6E85D]" />
                MCQ Count per Subject
              </h2>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={mcqChartData} margin={{ top: 4, right: 8, left: 0, bottom: 40 }}>
                  <XAxis
                    dataKey="name"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    angle={-35}
                    textAnchor="end"
                    interval={0}
                    height={60}
                  />
                  <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#fff" }}
                    cursor={{ fill: "#ffffff10" }}
                  />
                  <Bar dataKey="mcqs" radius={[6, 6, 0, 0]}>
                    {mcqChartData.map((_, i) => (
                      <Cell
                        key={i}
                        fill={i % 2 === 0 ? "#D6E85D" : "#183F36"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Subject breakdown table */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-700">
                <h2 className="font-bold text-base text-white">Subject Breakdown</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-700/60 text-slate-400 uppercase text-[11px] font-bold border-b border-slate-700">
                    <tr>
                      <th className="px-4 py-3">Subject</th>
                      <th className="px-4 py-3">Code</th>
                      <th className="px-4 py-3">Semester</th>
                      <th className="px-4 py-3">Units</th>
                      <th className="px-4 py-3">Topics</th>
                      <th className="px-4 py-3">MCQs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {subjects.map((s) => {
                      const sTopics = s.units?.reduce((a, u) => a + (u.topics?.length ?? 0), 0) ?? 0;
                      const sMcqs = s.units?.reduce(
                        (a, u) => a + (u.topics?.reduce((ta, t) => ta + (t.mcqs?.length ?? 0), 0) ?? 0),
                        0
                      ) ?? 0;
                      return (
                        <tr key={s.id} className="hover:bg-slate-700/30 transition-colors">
                          <td className="px-4 py-3 font-semibold text-white">{s.name}</td>
                          <td className="px-4 py-3 text-slate-400 font-mono text-xs">{s.code}</td>
                          <td className="px-4 py-3 text-slate-400">Sem {s.semester}</td>
                          <td className="px-4 py-3 text-slate-300">{s.units?.length ?? 0}</td>
                          <td className="px-4 py-3 text-slate-300">{sTopics}</td>
                          <td className="px-4 py-3">
                            <span className="text-[#D6E85D] font-bold">{sMcqs}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: COMMUNITY MODERATION ─────────────────────────────────────────── */}
        {activeTab === "moderation" && (
          <div className="space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-base text-white flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-[#D6E85D]" />
                Community Posts
              </h2>
              <button
                onClick={loadCommunityPosts}
                className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-700 transition-colors"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${moderationLoading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            {moderationLoading ? (
              <div className="flex items-center justify-center py-16 text-slate-500">Loading posts…</div>
            ) : communityPosts.length === 0 ? (
              <p className="text-slate-500 text-sm text-center py-12">No community posts found.</p>
            ) : (
              <div className="space-y-3">
                {communityPosts.map((post) => {
                  const isFl = flagged.has(post.id);
                  return (
                    <div
                      key={post.id}
                      className={`bg-slate-800 border rounded-xl p-4 flex items-start justify-between gap-3 ${
                        isFl ? "border-amber-500/40 bg-amber-900/10" : "border-slate-700"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-200 line-clamp-3">{post.content}</p>
                        <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" /> {post.upvotes}
                          </span>
                          <span>{new Date(post.createdAt).toLocaleString("en-IN")}</span>
                          {isFl && (
                            <span className="flex items-center gap-1 text-amber-400 font-semibold">
                              <AlertTriangle className="h-3 w-3" /> Flagged
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => toggleFlag(post.id)}
                          title={isFl ? "Unflag" : "Flag post"}
                          className={`p-1.5 rounded-lg transition-colors ${
                            isFl
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-slate-700 hover:bg-amber-500/20 text-slate-400 hover:text-amber-400"
                          }`}
                        >
                          <Flag className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="p-1.5 rounded-lg bg-slate-700 hover:bg-red-900/40 text-red-400 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
