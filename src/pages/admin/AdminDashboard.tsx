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
  Activity,
  AlertTriangle,
  FileText,
  Layers,
  Clock,
  Bell,
  Zap,
  Users2,
  Hash,
  BookOpen,
  RefreshCw,
  Database,
} from "lucide-react";
import { generateUniqueMaintenanceKey } from "@/components/MaintenanceBanner";
import { toast } from "sonner";

import { AdminUsersTab, AdminUser } from "./components/AdminUsersTab";
import { AdminErrorsTab } from "./components/AdminErrorsTab";
import { AdminModerationTab } from "./components/AdminModerationTab";
import { AdminContentAnalyticsTab } from "./components/AdminContentAnalyticsTab";
import { AdminAnnouncementsTab, ScheduledAnnouncement } from "./components/AdminAnnouncementsTab";
import { AdminMaintenanceTab } from "./components/AdminMaintenanceTab";
import { AdminDraftsTab } from "./components/AdminDraftsTab";
import { AdminBulkToolsTab } from "./components/AdminBulkToolsTab";
import { AdminAuditLogsTab } from "./components/AdminAuditLogsTab";
import { AdminSupportTab } from "./components/AdminSupportTab";
import { AdminFlagsTab } from "./components/AdminFlagsTab";
import { AdminPlatformTab } from "./components/AdminPlatformTab";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CommunityPost {
  id: string;
  content: string;
  authorName: string;
  upvotes: number;
  createdAt: string;
}

type TabId =
  | "overview"
  | "users"
  | "errors"
  | "moderation"
  | "content_analytics"
  | "announcements"
  | "maintenance"
  | "drafts"
  | "bulk_tools"
  | "audit_logs"
  | "support"
  | "flags"
  | "platform";

// ─── Tabs Configuration ──────────────────────────────────────────────────────

const TABS: { id: TabId; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "users", label: "Users", icon: Users },
  { id: "errors", label: "Client Errors", icon: AlertTriangle },
  { id: "moderation", label: "Moderation Queue", icon: MessageSquare },
  { id: "content_analytics", label: "Content Analytics", icon: Activity },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "drafts", label: "Drafts & Versions", icon: FileText },
  { id: "bulk_tools", label: "Bulk Content Tools", icon: Layers },
  { id: "audit_logs", label: "Audit Logs", icon: Clock },
  { id: "support", label: "Support Desk", icon: Bell },
  { id: "flags", label: "Feature Flags", icon: Zap },
  { id: "platform", label: "Platform Data", icon: BarChart3 },
];

// ─── Stat Card Component ──────────────────────────────────────────────────────

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
    <div className="paper rounded-lg border border-border p-4 sm:p-5 shadow-sm">
      <div
        className="h-11 w-11 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: accent ? `hsl(var(${accent}))/20` : "hsl(var(--itm-chartreuse))/20" }}
      >
        <Icon className="h-5 w-5" style={{ color: accent ?? "hsl(var(--itm-chartreuse))" }} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{label}</p>
        <p className="text-xl sm:text-2xl font-extrabold text-foreground leading-tight">{value}</p>
      </div>
    </div>
  );
}

// ─── Main Admin Dashboard Component ──────────────────────────────────────────

export default function AdminDashboard() {
  const { role, user, profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  // Redirect non-admins
  useEffect(() => {
    if (role !== null && role !== "admin") {
      navigate("/");
    }
  }, [role, navigate]);

  // ── Overview telemetry ─────────────────────────────────────────────────────
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalPosts, setTotalPosts] = useState<number | null>(null);
  const [supabaseOk, setSupabaseOk] = useState<boolean | null>(null);
  const [recentActivity, setRecentActivity] = useState<CommunityPost[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

  // Curriculum stats
  const totalSubjects = subjects.length;
  const totalUnits = subjects.reduce((a, s) => a + (s.units?.length ?? 0), 0);
  const totalTopics = subjects.reduce(
    (a, s) => a + (s.units?.reduce((ua, u) => ua + (u.topics?.length ?? 0), 0) ?? 0),
    0
  );
  const totalMcqs = subjects.reduce(
    (a, s) =>
      a +
      (s.units?.reduce(
        (ua, u) => ua + (u.topics?.reduce((ta, t) => ta + (t.mcqs?.length ?? 0), 0) ?? 0),
        0
      ) ?? 0),
    0
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

  // ── User Management State (Glitch 2 & Feature 4) ─────────────────────────────
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const mapAndSetUsers = (data: any[]) => {
    setUsers(
      data.map((p: any) => ({
        id: p.id,
        userId: p.user_id || p.id,
        name: p.display_name ?? (p.email ? p.email.split("@")[0] : "Student"),
        email: p.email ?? "—",
        role: p.role ?? "student",
        xp: p.xp ?? p.total_xp ?? 0,
        joined: p.created_at
          ? new Date(p.created_at).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—",
        avatarUrl: p.avatar_url,
        is_suspended: Boolean(p.is_suspended || p.status === "Suspended"),
        semester: p.semester ?? 3,
        branch: p.branch ?? "CSE",
        streak: p.streak_days ?? p.current_streak ?? 1,
      }))
    );
  };

  const loadUsers = async () => {
    setUsersLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("Ordered profiles query failed, retrying without order:", error);
        const { data: fallbackData, error: fallbackError } = await supabase
          .from("profiles")
          .select("*");

        if (fallbackError) throw fallbackError;
        if (fallbackData && fallbackData.length > 0) {
          mapAndSetUsers(fallbackData);
          return;
        }
      }

      if (data && data.length > 0) {
        mapAndSetUsers(data);
      } else if (user) {
        // Fallback: If no records returned, show current authenticated user
        setUsers([
          {
            id: user.id,
            userId: user.id,
            name: user.user_metadata?.display_name || user.email?.split("@")[0] || "Admin",
            email: user.email || "—",
            role: (role as string) || "admin",
            xp: 15000,
            joined: new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            avatarUrl: user.user_metadata?.avatar_url,
            is_suspended: false,
            semester: 3,
            branch: "CSE",
            streak: 5,
          },
        ]);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
      if (user) {
        setUsers([
          {
            id: user.id,
            userId: user.id,
            name: user.user_metadata?.display_name || user.email?.split("@")[0] || "Admin",
            email: user.email || "—",
            role: (role as string) || "admin",
            xp: 15000,
            joined: new Date().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }),
            avatarUrl: user.user_metadata?.avatar_url,
            is_suspended: false,
            semester: 3,
            branch: "CSE",
            streak: 5,
          },
        ]);
        toast.info("Showing current active session user.");
      } else {
        toast.error("Could not fetch users from Supabase.");
      }
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "users" || activeTab === "overview") loadUsers();
  }, [activeTab]);

  const handleRoleChange = async (profileId: string, userId: string, newRole: string) => {
    setUsers((prev) => prev.map((u) => (u.id === profileId ? { ...u, role: newRole } : u)));
    try {
      await supabase.from("profiles").update({ role: newRole }).eq("id", profileId);
      const appRole = newRole === "admin" ? "admin" : "user";
      await supabase.from("user_roles").upsert({ user_id: userId, role: appRole as any });
      toast.success("User role updated successfully.");
    } catch (err) {
      toast.error("Failed to update user role.");
    }
  };

  const exportUsersCSV = () => {
    const headers = ["ID", "Name", "Email", "Role", "XP", "Joined", "Suspended"];
    const rows = users.map((u) => [
      u.userId,
      `"${u.name}"`,
      u.email,
      u.role,
      u.xp,
      u.joined,
      u.is_suspended ? "YES" : "NO",
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `itm_users_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${users.length} user records`);
  };

  // ── Maintenance Mode State (Feature 6) ──────────────────────────────────────
  const [maintenanceOn, setMaintenanceOn] = useState(() => {
    try {
      return localStorage.getItem("itm_maintenance_mode") === "true";
    } catch {
      return false;
    }
  });

  const [maintenancePasskey, setMaintenancePasskey] = useState<string>(() => {
    try {
      const stored = localStorage.getItem("itm_maintenance_config");
      if (stored) {
        const cfg = JSON.parse(stored);
        return cfg.passkey || "";
      }
    } catch {}
    return generateUniqueMaintenanceKey();
  });

  const handleToggleMaintenance = async (on: boolean, msg: string, key: string) => {
    setMaintenanceOn(on);
    localStorage.setItem("itm_maintenance_mode", String(on));

    const effectiveKey = on ? (key || maintenancePasskey || generateUniqueMaintenanceKey()) : "";
    if (on) setMaintenancePasskey(effectiveKey);

    const cfg = {
      active: on,
      title: "We are building something incredible.",
      message: msg,
      endTime: on ? new Date(Date.now() + 60 * 60 * 1000).toISOString() : null,
      passkey: effectiveKey,
    };
    localStorage.setItem("itm_maintenance_config", JSON.stringify(cfg));
    window.dispatchEvent(new Event("itm_maintenance_updated"));

    try {
      const bc = new BroadcastChannel("itm_maintenance_channel");
      bc.postMessage(cfg);
      bc.close();
    } catch {}

    supabase
      .from("profiles")
      .update({ status: on ? `MAINTENANCE:${JSON.stringify(cfg)}` : "Active" })
      .eq("email", "maherbhatt01@gmail.com")
      .then(() => {});
  };

  // ── Announcements State (Feature 5) ─────────────────────────────────────────
  const [announcements, setAnnouncements] = useState<ScheduledAnnouncement[]>(() => {
    try {
      const raw = localStorage.getItem("itm_announcements");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const handleAddAnnouncement = async (
    ann: Omit<ScheduledAnnouncement, "id" | "createdAt">
  ) => {
    const newEntry: ScheduledAnnouncement = {
      ...ann,
      id: `ann-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    const nextList = [newEntry, ...announcements];
    setAnnouncements(nextList);
    localStorage.setItem("itm_announcements", JSON.stringify(nextList));
    window.dispatchEvent(new Event("itm_announcement_updated"));
  };

  const handleDeleteAnnouncement = async (id: string) => {
    const nextList = announcements.filter((a) => a.id !== id);
    setAnnouncements(nextList);
    localStorage.setItem("itm_announcements", JSON.stringify(nextList));
    window.dispatchEvent(new Event("itm_announcement_updated"));
  };

  const handleToggleAnnouncementActive = async (id: string, active: boolean) => {
    const nextList = announcements.map((a) => (a.id === id ? { ...a, active } : a));
    setAnnouncements(nextList);
    localStorage.setItem("itm_announcements", JSON.stringify(nextList));
    window.dispatchEvent(new Event("itm_announcement_updated"));
  };

  // ── Content Analytics Telemetry State (Feature 3) ───────────────────────────
  const [zeroResultSearches, setZeroResultSearches] = useState<any[]>(() => {
    try {
      const raw = localStorage.getItem("itm_zero_result_searches");
      return raw
        ? JSON.parse(raw)
        : [
            { query: "B-Tree balance factor derivation", count: 14, lastSeen: new Date().toISOString() },
            { query: "Booth multiplication step-by-step example", count: 11, lastSeen: new Date().toISOString() },
            { query: "Runge-Kutta 4th order formulas", count: 8, lastSeen: new Date().toISOString() },
            { query: "2-3 Tree insertion algorithm", count: 6, lastSeen: new Date().toISOString() },
          ];
    } catch {
      return [];
    }
  });

  const loadSearchAnalytics = async () => {
    try {
      const { data } = await supabase
        .from("search_analytics")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (data && data.length > 0) {
        const grouped: Record<string, { query: string; count: number; lastSeen: string }> = {};
        data.forEach((row: any) => {
          const q = row.query.trim().toLowerCase();
          if (!grouped[q]) {
            grouped[q] = { query: row.query, count: 0, lastSeen: row.created_at };
          }
          grouped[q].count += 1;
        });
        setZeroResultSearches(Object.values(grouped).sort((a, b) => b.count - a.count));
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* 1. Header (Responsive with no text clipping at 360px & 768px) */}
      <header className="border-b border-border bg-card/90 sticky top-0 z-30 backdrop-blur">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-extrabold text-foreground leading-none truncate">
                ITM Notes Admin
              </h1>
              <p className="text-[11px] text-muted-foreground font-medium mt-0.5 truncate max-w-[200px] sm:max-w-none">
                🛡️ Platform Admin &middot; {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                maintenanceOn
                  ? "bg-accent/20 text-accent-foreground border-accent/30"
                  : "bg-secondary/10 text-muted-foreground border-border/80"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  maintenanceOn ? "bg-accent animate-pulse" : "bg-muted-foreground/30"
                }`}
              />
              {maintenanceOn ? "Maintenance ON" : "Site Live"}
            </span>

            <button
              onClick={() => navigate("/admin/seed")}
              className="px-3 py-1.5 rounded-lg border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Database className="h-3.5 w-3.5" />
              <span>Seed DB</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Horizontal Scroll Tabs Navigation */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-t-lg border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                active
                  ? "border-primary text-primary bg-card/80"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/40"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Main Body Viewport */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* ── TAB: OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <StatCard
                icon={Users2}
                label="Total Users"
                value={statsLoading ? "…" : (totalUsers ?? "—")}
                accent="#FAFAFA"
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

            {/* System health & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="paper rounded-xl border border-border p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Activity className="h-4 w-4 text-primary" />
                    Live System Health
                  </h2>
                  <button
                    onClick={loadOverviewStats}
                    disabled={statsLoading}
                    className="p-1.5 rounded-lg border border-border hover:bg-secondary transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 text-muted-foreground ${statsLoading ? "animate-spin" : ""}`} />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/60">
                    <span className="text-muted-foreground font-medium">Supabase Cloud Connection</span>
                    <span className="flex items-center gap-1.5 font-bold">
                      {supabaseOk === null ? (
                        <span className="text-muted-foreground/60">Checking…</span>
                      ) : supabaseOk ? (
                        <>
                          <span className="w-2 h-2 rounded-full text-primary" />
                          <span className="text-primary">Connected</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full text-destructive animate-pulse" />
                          <span className="text-destructive">Offline</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/60">
                    <span className="text-muted-foreground font-medium">Site Maintenance Status</span>
                    <span
                      className={`flex items-center gap-1.5 font-bold ${
                        maintenanceOn ? "text-accent" : "text-primary"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          maintenanceOn ? "text-accent animate-pulse" : "text-primary"
                        }`}
                      />
                      {maintenanceOn ? "Active Lock" : "Site Live"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border border-border/60">
                    <span className="text-muted-foreground font-medium">Active Announcements</span>
                    <span className="font-bold text-primary">
                      {announcements.filter((a) => a.active).length} broadcasting
                    </span>
                  </div>
                </div>
              </div>

              <div className="paper rounded-xl border border-border p-5 space-y-4 shadow-sm">
                <h2 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Recent Community Posts
                </h2>

                <div className="space-y-2">
                  {recentActivity.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground text-xs">No recent posts.</div>
                  ) : (
                    recentActivity.map((post) => (
                      <div
                        key={post.id}
                        className="paper/60 rounded-xl p-3 border border-border/60 text-xs flex items-center justify-between gap-3"
                      >
                        <p className="text-foreground truncate flex-1">{post.content}</p>
                        <span className="text-[11px] text-muted-foreground/60 shrink-0 font-mono">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: USERS (Glitch 2 & Feature 4) ── */}
        {activeTab === "users" && (
          <AdminUsersTab
            users={users}
            loading={usersLoading}
            onRefresh={loadUsers}
            onRoleChange={handleRoleChange}
            exportUsersCSV={exportUsersCSV}
          />
        )}

        {/* ── TAB: CLIENT ERRORS (Feature 1) ── */}
        {activeTab === "errors" && <AdminErrorsTab />}

        {/* ── TAB: UNIFIED MODERATION QUEUE (Feature 2) ── */}
        {activeTab === "moderation" && <AdminModerationTab />}

        {/* ── TAB: CONTENT ANALYTICS (Feature 3) ── */}
        {activeTab === "content_analytics" && (
          <AdminContentAnalyticsTab
            zeroResultSearches={zeroResultSearches}
            onRefreshTelemetry={loadSearchAnalytics}
          />
        )}

        {/* ── TAB: ANNOUNCEMENTS (Feature 5) ── */}
        {activeTab === "announcements" && (
          <AdminAnnouncementsTab
            announcements={announcements}
            onAdd={handleAddAnnouncement}
            onDelete={handleDeleteAnnouncement}
            onToggleActive={handleToggleAnnouncementActive}
          />
        )}

        {/* ── TAB: MAINTENANCE SCHEDULER (Feature 6) ── */}
        {activeTab === "maintenance" && (
          <AdminMaintenanceTab
            maintenanceOn={maintenanceOn}
            maintenanceMessage="ITM Notes is undergoing scheduled maintenance."
            maintenanceKey={maintenancePasskey}
            onToggleMaintenance={handleToggleMaintenance}
          />
        )}

        {/* ── TAB: DRAFTS & VERSIONS (Feature 7) ── */}
        {activeTab === "drafts" && <AdminDraftsTab />}

        {/* ── TAB: BULK CONTENT TOOLS (Feature 8) ── */}
        {activeTab === "bulk_tools" && <AdminBulkToolsTab />}

        {/* ── TAB: AUDIT LOGS (Feature 9) ── */}
        {activeTab === "audit_logs" && <AdminAuditLogsTab />}

        {/* ── TAB: SUPPORT DESK (Feature 11) ── */}
        {activeTab === "support" && <AdminSupportTab />}

        {/* ── TAB: FEATURE FLAGS (Feature 12) ── */}
        {activeTab === "flags" && <AdminFlagsTab />}

        {/* ── TAB: PLATFORM DATA (Feature 10) ── */}
        {activeTab === "platform" && <AdminPlatformTab />}
      </main>
    </div>
  );
}