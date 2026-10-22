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
  KeyRound,
  Copy,
  Sparkles,
  Award,
  Pin,
  PinOff,
  UserCheck,
  ExternalLink,
  Plus,
  Send,
  X,
  SlidersHorizontal,
  FileCheck,
  Compass,
} from "lucide-react";
import { generateUniqueMaintenanceKey } from "@/components/MaintenanceBanner";
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
import { UserAvatar } from "@/components/UserAvatar";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface UserRow {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  xp: number;
  level: number;
  streakDays: number;
  branch: string;
  semester: number;
  enrollmentNo: string;
  targetCgpa: string;
  bio: string;
  joined: string;
  status: string;
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

interface CommunityPostItem {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorEmail?: string;
  authorAvatar?: string;
  authorBranch?: string;
  likes: number;
  pinned: boolean;
  createdAt: string;
  category?: string;
  isFlagged?: boolean;
}

interface AuditLog {
  id: string;
  action: string;
  detail: string;
  timestamp: string;
  type: "security" | "user" | "content" | "announcement";
}

type TabId =
  | "overview"
  | "users"
  | "maintenance"
  | "announcements"
  | "moderation"
  | "platform"
  | "audit";

const TABS: { id: TabId; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
  { id: "users", label: "Student Registry", icon: Users },
  { id: "maintenance", label: "Maintenance & OTP", icon: Wrench },
  { id: "announcements", label: "Campus Broadcasts", icon: Megaphone },
  { id: "moderation", label: "Community Moderation", icon: MessageSquare },
  { id: "platform", label: "Curriculum & Notes", icon: BarChart3 },
  { id: "audit", label: "Audit & Security", icon: Shield },
];

const TYPE_COLORS = {
  info: "#38BDF8",
  warning: "#F59E0B",
  success: "#10B981",
  error: "#EF4444",
};

// ─── Stat Card Component ──────────────────────────────────────────────────────

function ExecutiveStatCard({
  icon: Icon,
  label,
  value,
  subtext,
  accent = "#D6E85D",
}: {
  icon: React.FC<{ className?: string }>;
  label: string;
  value: string | number;
  subtext?: string;
  accent?: string;
}) {
  return (
    <div className="bg-[#0B201A] border border-[#1A4237] hover:border-[#D6E85D]/40 rounded-2xl p-5 flex items-start justify-between shadow-lg transition-all hover:scale-[1.01]">
      <div className="space-y-1">
        <p className="text-[11px] text-[#A2BAAF] font-bold uppercase tracking-wider">{label}</p>
        <p className="text-2xl sm:text-3xl font-black text-white leading-tight font-display">{value}</p>
        {subtext && <p className="text-[11px] text-[#D6E85D] font-medium pt-0.5">{subtext}</p>}
      </div>
      <div
        className="h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-inner"
        style={{ background: `${accent}18` }}
      >
        <Icon className="h-6 w-6" style={{ color: accent }} />
      </div>
    </div>
  );
}

// ─── Main Admin Component ─────────────────────────────────────────────────────

export default function AdminDashboard() {
  const { role, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  // Redirect unauthorized visitors
  useEffect(() => {
    if (role !== null && role !== "admin") {
      navigate("/");
    }
  }, [role, navigate]);

  // ── Global State & Telemetry ────────────────────────────────────────────────
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [totalPosts, setTotalPosts] = useState<number | null>(null);
  const [dbLatency, setDbLatency] = useState<number | null>(null);
  const [supabaseOk, setSupabaseOk] = useState<boolean | null>(null);
  const [recentActivity, setRecentActivity] = useState<CommunityPostItem[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);

  // Audit Log State
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const stored = localStorage.getItem("itm_admin_audit_logs");
      if (stored) return JSON.parse(stored);
    } catch {}
    return [
      {
        id: "log-init",
        action: "Admin Session Authenticated",
        detail: `Root Administrator ${user?.email || "Founder"} accessed Command Center`,
        timestamp: new Date().toISOString(),
        type: "security",
      },
    ];
  });

  const recordAudit = (action: string, detail: string, type: AuditLog["type"] = "security") => {
    const entry: AuditLog = {
      id: `log-${Date.now()}`,
      action,
      detail,
      timestamp: new Date().toISOString(),
      type,
    };
    setAuditLogs((prev) => {
      const next = [entry, ...prev].slice(0, 50);
      try {
        localStorage.setItem("itm_admin_audit_logs", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  // ── Campus 2x XP Booster Controller ─────────────────────────────────────────
  const [isCampusBoostActive, setIsCampusBoostActive] = useState(() => {
    try {
      const exp = localStorage.getItem("itm_xp_boost_expires");
      return exp && Number(exp) > Date.now();
    } catch {
      return false;
    }
  });

  const triggerCampusBoost = (minutes: number = 60) => {
    const expiresAt = Date.now() + minutes * 60 * 1000;
    try {
      localStorage.setItem("itm_xp_boost_expires", String(expiresAt));
      localStorage.setItem("itm_campus_boost_active", "true");
      window.dispatchEvent(new Event("itm_boost_updated"));
    } catch {}
    setIsCampusBoostActive(true);
    recordAudit("Campus 2x Boost Activated", `Campus-wide XP multiplier activated for ${minutes} minutes`, "user");
    toast.success(`⚡ University-wide 2x XP Boost activated for ${minutes} minutes!`);
  };

  // ── Curriculum Stats (Local master data) ─────────────────────────────────────
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

  const mcqChartData = useMemo(
    () =>
      subjects
        .map((s) => ({
          name: s.code ?? s.name.slice(0, 6),
          fullName: s.name,
          mcqs:
            s.units?.reduce(
              (ua, u) => ua + (u.topics?.reduce((ta, t) => ta + (t.mcqs?.length ?? 0), 0) ?? 0),
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
          .select("id, author_id, author_name, author_branch, content, likes, pinned, created_at")
          .order("created_at", { ascending: false })
          .limit(5),
      ]);
      const latency = Math.round(performance.now() - start);
      setDbLatency(latency);
      setSupabaseOk(latency < 5000 && !usersRes.error);
      setTotalUsers(usersRes.count ?? 0);
      setTotalPosts(postsRes.count ?? 0);

      if (activityRes.data) {
        setRecentActivity(
          activityRes.data.map((p: any) => ({
            id: p.id,
            authorId: p.author_id,
            authorName: p.author_name || "Verified Student",
            authorBranch: p.author_branch || "Computer Science",
            content: p.content ?? "",
            likes: p.likes ?? 0,
            pinned: p.pinned ?? false,
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

  // ── User Management State & Actions ─────────────────────────────────────────
  const [users, setUsers] = useState<UserRow[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState<string>("all");
  const [userSemesterFilter, setUserSemesterFilter] = useState<string>("all");
  const [userPage, setUserPage] = useState(1);
  const USERS_PER_PAGE = 10;

  // Modals for User Management
  const [inspectUser, setInspectUser] = useState<UserRow | null>(null);
  const [awardXpTarget, setAwardXpTarget] = useState<UserRow | null>(null);
  const [awardXpAmount, setAwardXpAmount] = useState<number>(100);
  const [awardXpReason, setAwardXpReason] = useState<string>("Academic Excellence Recognition");

  const loadUsers = async () => {
    setUsersLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id, user_id, display_name, email, role, xp, level, streak_days, branch, semester, enrollment_no, target_cgpa, bio, status, created_at, avatar_url"
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) {
        setUsers(
          data.map((p: any) => ({
            id: p.id,
            userId: p.user_id,
            name: p.display_name || p.email?.split("@")[0] || "Student",
            email: p.email || "—",
            role: p.role || "student",
            xp: p.xp || 0,
            level: p.level || 1,
            streakDays: p.streak_days || 0,
            branch: p.branch || "Computer Science & Engineering",
            semester: p.semester || 1,
            enrollmentNo: p.enrollment_no || "—",
            targetCgpa: p.target_cgpa || "8.5+",
            bio: p.bio || "ITM SLS Baroda University Student",
            status: p.status || "Active",
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
      toast.error("Could not fetch user records.");
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "users") loadUsers();
  }, [activeTab]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchQuery =
        u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
        u.enrollmentNo.toLowerCase().includes(userSearch.toLowerCase());
      const matchRole = userRoleFilter === "all" || u.role.toLowerCase() === userRoleFilter.toLowerCase();
      const matchSemester = userSemesterFilter === "all" || String(u.semester) === userSemesterFilter;
      return matchQuery && matchRole && matchSemester;
    });
  }, [users, userSearch, userRoleFilter, userSemesterFilter]);

  const pagedUsers = filteredUsers.slice((userPage - 1) * USERS_PER_PAGE, userPage * USERS_PER_PAGE);
  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);

  const handleRoleChange = async (profileId: string, userId: string, newRole: string) => {
    setUsers((prev) => prev.map((u) => (u.id === profileId ? { ...u, role: newRole } : u)));
    try {
      await supabase.from("profiles").update({ role: newRole }).eq("id", profileId);
      await supabase.from("user_roles").upsert({ user_id: userId, role: newRole as any });
      recordAudit("User Role Updated", `Updated ${profileId} role to ${newRole.toUpperCase()}`, "user");
      toast.success(`Role updated to ${newRole.toUpperCase()}`);
    } catch {
      toast.error("Failed to update role in Supabase.");
      loadUsers();
    }
  };

  const submitAwardXp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!awardXpTarget) return;
    const newXp = (awardXpTarget.xp || 0) + Number(awardXpAmount);

    try {
      const { error } = await supabase.from("profiles").update({ xp: newXp }).eq("id", awardXpTarget.id);
      if (error) throw error;

      setUsers((prev) => prev.map((u) => (u.id === awardXpTarget.id ? { ...u, xp: newXp } : u)));
      recordAudit("XP Awarded", `Awarded +${awardXpAmount} XP to ${awardXpTarget.name} (${awardXpReason})`, "user");
      toast.success(`Successfully awarded +${awardXpAmount} XP to ${awardXpTarget.name}!`);
      setAwardXpTarget(null);
    } catch {
      toast.error("Failed to update student XP.");
    }
  };

  const exportUsersCSV = () => {
    const headers = ["Name", "Email", "Enrollment", "Branch", "Semester", "Role", "XP", "Streak", "Joined"];
    const rows = filteredUsers.map((u) =>
      [
        `"${u.name}"`,
        `"${u.email}"`,
        `"${u.enrollmentNo}"`,
        `"${u.branch}"`,
        u.semester,
        u.role,
        u.xp,
        u.streakDays,
        `"${u.joined}"`,
      ].join(",")
    );
    const csv = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = `itm_notes_students_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    recordAudit("Registry Exported", `Exported CSV of ${filteredUsers.length} student records`, "user");
    toast.success(`Exported ${filteredUsers.length} student records`);
  };

  // ── Maintenance Mode State & Actions ────────────────────────────────────────
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
        return cfg.message || "";
      }
    } catch {}
    return "ITM Notes is currently undergoing a scheduled infrastructure upgrade. We will be back online shortly.";
  });

  const [maintenanceCountdown, setMaintenanceCountdown] = useState(30);
  const [maintenancePasskey, setMaintenancePasskey] = useState<string>(() => {
    try {
      const stored = localStorage.getItem("itm_maintenance_config");
      if (stored) {
        const cfg = JSON.parse(stored);
        return cfg.passkey || "";
      }
    } catch {}
    return "";
  });
  const [customKeyInput, setCustomKeyInput] = useState("");

  const toggleMaintenance = () => {
    const next = !maintenanceOn;
    setMaintenanceOn(next);
    localStorage.setItem("itm_maintenance_mode", String(next));

    const key = next ? maintenancePasskey || generateUniqueMaintenanceKey() : "";
    if (next) {
      setMaintenancePasskey(key);
    }

    const cfg = {
      active: next,
      title: "We are building something incredible.",
      message: maintenanceMsg,
      endTime: next ? new Date(Date.now() + maintenanceCountdown * 60 * 1000).toISOString() : null,
      passkey: key,
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
      .update({ status: next ? `MAINTENANCE:${JSON.stringify(cfg)}` : "Active" })
      .eq("email", "maherbhatt01@gmail.com")
      .then(() => {});

    recordAudit(
      next ? "Maintenance Activated" : "Maintenance Deactivated",
      next ? `System locked globally with OTP: ${key}` : "Site restored to active public access",
      "security"
    );

    toast[next ? "warning" : "success"](
      next ? `Maintenance mode ACTIVE! Dynamic Access Key: ${key}` : "Maintenance mode is OFF — site is live globally."
    );
  };

  const regenerateKey = () => {
    const newKey = generateUniqueMaintenanceKey();
    setMaintenancePasskey(newKey);
    const stored = localStorage.getItem("itm_maintenance_config");
    const existing = stored ? JSON.parse(stored) : {};
    const updated = { ...existing, passkey: newKey };
    localStorage.setItem("itm_maintenance_config", JSON.stringify(updated));
    window.dispatchEvent(new Event("itm_maintenance_updated"));

    try {
      const bc = new BroadcastChannel("itm_maintenance_channel");
      bc.postMessage(updated);
      bc.close();
    } catch {}

    if (maintenanceOn) {
      supabase
        .from("profiles")
        .update({ status: `MAINTENANCE:${JSON.stringify(updated)}` })
        .eq("email", "maherbhatt01@gmail.com")
        .then(() => {});
    }

    recordAudit("Maintenance Key Regenerated", `Invalidated prior key; new OTP: ${newKey}`, "security");
    toast.success(`Generated new dynamic maintenance key: ${newKey}`);
  };

  const setCustomKey = (key: string) => {
    if (!key.trim()) return;
    const cleanKey = key.trim().toUpperCase();
    setMaintenancePasskey(cleanKey);
    const stored = localStorage.getItem("itm_maintenance_config");
    const existing = stored ? JSON.parse(stored) : {};
    const updated = { ...existing, passkey: cleanKey };
    localStorage.setItem("itm_maintenance_config", JSON.stringify(updated));
    window.dispatchEvent(new Event("itm_maintenance_updated"));

    try {
      const bc = new BroadcastChannel("itm_maintenance_channel");
      bc.postMessage(updated);
      bc.close();
    } catch {}

    if (maintenanceOn) {
      supabase
        .from("profiles")
        .update({ status: `MAINTENANCE:${JSON.stringify(updated)}` })
        .eq("email", "maherbhatt01@gmail.com")
        .then(() => {});
    }
    setCustomKeyInput("");
    recordAudit("Custom Key Set", `Custom passkey applied: ${cleanKey}`, "security");
    toast.success(`Custom maintenance access key applied: ${cleanKey}`);
  };

  const saveMaintenanceMessage = () => {
    const stored = localStorage.getItem("itm_maintenance_config");
    const existing = stored ? JSON.parse(stored) : {};
    const updated = { ...existing, message: maintenanceMsg };
    localStorage.setItem("itm_maintenance_config", JSON.stringify(updated));
    window.dispatchEvent(new Event("itm_maintenance_updated"));

    if (maintenanceOn) {
      supabase
        .from("profiles")
        .update({ status: `MAINTENANCE:${JSON.stringify(updated)}` })
        .eq("email", "maherbhatt01@gmail.com")
        .then(() => {});
    }
    toast.success("Maintenance message saved and broadcast globally.");
  };

  const launchStudentPreview = () => {
    sessionStorage.setItem("itm_preview_maintenance", "true");
    window.dispatchEvent(new Event("itm_preview_maintenance"));
    toast.info("Launching student maintenance lock screen...");
  };

  // ── Announcements State & Global Sync ───────────────────────────────────────
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const raw = localStorage.getItem("itm_announcements");
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      {
        id: "ann-mst-prep",
        title: "Semester 3 MST & Final Exam Prep Live",
        message: "Comprehensive lecture notes, solved IMP question banks, and MCQ mock quizzes are fully verified for all CSE subjects!",
        type: "info",
        audience: "all",
        active: true,
        createdAt: new Date().toISOString(),
      },
    ];
  });

  const [annTitle, setAnnTitle] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [annType, setAnnType] = useState<Announcement["type"]>("info");
  const [annAudience, setAnnAudience] = useState<Announcement["audience"]>("all");

  const saveAnnouncements = (list: Announcement[]) => {
    setAnnouncements(list);
    localStorage.setItem("itm_announcements", JSON.stringify(list));
    window.dispatchEvent(new Event("itm_announcement_updated"));
    try {
      const bc = new BroadcastChannel("itm_announcements_channel");
      bc.postMessage(list);
      bc.close();
    } catch {}
  };

  const createAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) {
      toast.error("Announcement title and message are required.");
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
    recordAudit("Announcement Published", `Published announcement: "${entry.title}"`, "announcement");
    toast.success(`Announcement "${entry.title}" broadcast to all students!`);
  };

  const applyAnnouncementPreset = (preset: { title: string; message: string; type: Announcement["type"] }) => {
    setAnnTitle(preset.title);
    setAnnMessage(preset.message);
    setAnnType(preset.type);
    toast.info("Loaded preset announcement template.");
  };

  const deleteAnnouncement = (id: string) => {
    saveAnnouncements(announcements.filter((a) => a.id !== id));
    toast.info("Announcement deleted.");
  };

  const toggleAnnouncement = (id: string) => {
    saveAnnouncements(announcements.map((a) => (a.id === id ? { ...a, active: !a.active } : a)));
  };

  // ── Community Moderation State & Real DB Actions ─────────────────────────────
  const [communityPosts, setCommunityPosts] = useState<CommunityPostItem[]>([]);
  const [moderationLoading, setModerationLoading] = useState(false);
  const [modFilter, setModFilter] = useState<"all" | "pinned" | "flagged">("all");
  const [flaggedPosts, setFlaggedPosts] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem("itm_flagged_posts");
      if (stored) return new Set(JSON.parse(stored));
    } catch {}
    return new Set();
  });

  const loadCommunityPosts = async () => {
    setModerationLoading(true);
    try {
      const { data, error } = await supabase
        .from("community_posts")
        .select("id, author_id, author_name, author_email, author_avatar, author_branch, content, likes, pinned, created_at, category")
        .order("created_at", { ascending: false })
        .limit(40);

      if (error) throw error;
      if (data) {
        setCommunityPosts(
          data.map((p: any) => ({
            id: p.id,
            authorId: p.author_id,
            authorName: p.author_name || "Verified Student",
            authorEmail: p.author_email,
            authorAvatar: p.author_avatar,
            authorBranch: p.author_branch || "Computer Science",
            content: p.content ?? "",
            likes: p.likes ?? 0,
            pinned: p.pinned ?? false,
            createdAt: p.created_at,
            category: p.category || "Campus Life",
            isFlagged: flaggedPosts.has(p.id),
          }))
        );
      }
    } catch {
      toast.error("Could not load community discussions.");
    } finally {
      setModerationLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "moderation") loadCommunityPosts();
  }, [activeTab]);

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase.from("community_posts").delete().eq("id", id);
      if (error) throw error;
      setCommunityPosts((prev) => prev.filter((p) => p.id !== id));
      recordAudit("Community Post Deleted", `Deleted post ID: ${id}`, "content");
      toast.success("Community post permanently deleted from database.");
    } catch {
      toast.error("Failed to delete post from Supabase.");
    }
  };

  const togglePinPost = async (id: string, currentPin: boolean) => {
    try {
      const { error } = await supabase.from("community_posts").update({ pinned: !currentPin }).eq("id", id);
      if (error) throw error;
      setCommunityPosts((prev) => prev.map((p) => (p.id === id ? { ...p, pinned: !currentPin } : p)));
      recordAudit("Post Pin Toggled", `Post ${id} pinned status: ${!currentPin}`, "content");
      toast.success(!currentPin ? "Post pinned to top of campus feed!" : "Post unpinned.");
    } catch {
      toast.error("Failed to update post pin status.");
    }
  };

  const toggleFlagPost = (id: string) => {
    setFlaggedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem("itm_flagged_posts", JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });
  };

  const filteredCommunityPosts = useMemo(() => {
    return communityPosts.filter((p) => {
      if (modFilter === "pinned") return p.pinned;
      if (modFilter === "flagged") return flaggedPosts.has(p.id);
      return true;
    });
  }, [communityPosts, modFilter, flaggedPosts]);

  // ── Curriculum & Notes Explorer State ────────────────────────────────────────
  const [topicSearchQuery, setTopicSearchQuery] = useState("");
  const allCurriculumTopics = useMemo(() => {
    const list: { subjectName: string; subjectCode: string; semester: number; unitTitle: string; topicTitle: string; mcqsCount: number }[] = [];
    subjects.forEach((s) => {
      s.units?.forEach((u) => {
        u.topics?.forEach((t) => {
          list.push({
            subjectName: s.name,
            subjectCode: s.code || "",
            semester: s.semester || 1,
            unitTitle: u.title,
            topicTitle: t.title,
            mcqsCount: t.mcqs?.length || 0,
          });
        });
      });
    });
    return list;
  }, []);

  const filteredTopics = useMemo(() => {
    if (!topicSearchQuery.trim()) return allCurriculumTopics.slice(0, 15);
    const q = topicSearchQuery.toLowerCase();
    return allCurriculumTopics.filter(
      (t) =>
        t.topicTitle.toLowerCase().includes(q) ||
        t.subjectName.toLowerCase().includes(q) ||
        t.subjectCode.toLowerCase().includes(q) ||
        t.unitTitle.toLowerCase().includes(q)
    );
  }, [allCurriculumTopics, topicSearchQuery]);

  return (
    <div className="min-h-screen bg-[#051410] text-[#F5F1E8] font-sans">
      {/* ── TOP EXECUTIVE COMMAND BAR ── */}
      <div className="border-b border-[#1A4237] bg-[#071914]/95 sticky top-0 z-40 backdrop-blur-xl shadow-xl">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-10 w-10 rounded-2xl bg-[#D6E85D]/20 border border-[#D6E85D]/40 flex items-center justify-center shadow-inner">
              <Shield className="h-5 w-5 text-[#D6E85D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black text-white leading-none font-display">
                  ITM Notes Command Center
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#D6E85D]/15 text-[#D6E85D] border border-[#D6E85D]/30 uppercase font-mono">
                  v3.2 Executive
                </span>
              </div>
              <p className="text-xs text-[#A2BAAF] font-medium mt-0.5 flex items-center gap-1.5">
                <span>Maher Bhatt &middot; {user?.email}</span>
                <span className="text-emerald-400 font-bold font-mono">
                  {dbLatency ? `(${dbLatency}ms latency)` : "(DB Connected)"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Campus 2x Boost Quick Trigger */}
            <button
              onClick={() => triggerCampusBoost(60)}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                isCampusBoostActive
                  ? "bg-[#D6E85D] text-[#183F36] border-[#D6E85D] shadow-md shadow-[#D6E85D]/20"
                  : "bg-[#0B201A] text-slate-300 border-[#1A4237] hover:border-[#D6E85D]/50 hover:text-white"
              }`}
              title="Trigger a campus-wide 2x study sprint boost"
            >
              <Zap className="h-3.5 w-3.5 fill-current" />
              <span>{isCampusBoostActive ? "⚡ 2x Boost Active" : "Ignite 2x Boost"}</span>
            </button>

            {/* Maintenance Status Quick Badge */}
            <button
              onClick={() => {
                toggleMaintenance();
                setActiveTab("maintenance");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                maintenanceOn
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                  : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${maintenanceOn ? "bg-amber-400 animate-ping" : "bg-emerald-400"}`} />
              <span>{maintenanceOn ? "Lockdown Active" : "Site Live Globally"}</span>
            </button>

            <button
              onClick={() => navigate("/admin/seed")}
              className="px-3 py-1.5 bg-[#0B201A] hover:bg-[#12332A] border border-[#1A4237] rounded-xl text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Database className="h-3.5 w-3.5 text-[#D6E85D]" />
              <span>Seed Database</span>
            </button>
          </div>
        </div>

        {/* Executive Tab Switcher */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto pb-px scrollbar-none font-display">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  active
                    ? "border-[#D6E85D] text-[#D6E85D] bg-[#0B201A]"
                    : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ════════════════════ TAB 1: EXECUTIVE OVERVIEW ════════════════════ */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* Stat Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <ExecutiveStatCard
                icon={Users2}
                label="Registered Students"
                value={statsLoading ? "…" : (totalUsers ?? 0)}
                subtext="Verified ITM SLS Profiles"
                accent="#D6E85D"
              />
              <ExecutiveStatCard
                icon={MessageSquare}
                label="Community Discussions"
                value={statsLoading ? "…" : (totalPosts ?? 0)}
                subtext="Campus Pulse Threads"
                accent="#38BDF8"
              />
              <ExecutiveStatCard
                icon={BookOpen}
                label="Engineering Subjects"
                value={totalSubjects}
                subtext="Across Semesters 1 to 4"
                accent="#A855F7"
              />
              <ExecutiveStatCard
                icon={Hash}
                label="Verified Practice MCQs"
                value={totalMcqs.toLocaleString()}
                subtext="Curated for MST & End-Sem"
                accent="#10B981"
              />
            </div>

            {/* Middle Row: System Health + Quick Actions */}
            <div className="grid lg:grid-cols-2 gap-5">
              {/* System Health Card */}
              <div className="bg-[#0B201A] border border-[#1A4237] rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h2 className="font-bold text-base text-white flex items-center gap-2 font-display">
                    <Activity className="h-4 w-4 text-[#D6E85D]" />
                    Live System Health & Infrastructure
                  </h2>
                  <button
                    onClick={loadOverviewStats}
                    disabled={statsLoading}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${statsLoading ? "animate-spin" : ""}`} />
                  </button>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-[#1A4237]">
                    <div className="flex items-center gap-2.5">
                      <Database className="h-4 w-4 text-[#D6E85D]" />
                      <span className="text-xs font-semibold text-slate-200">Supabase Cloud Database</span>
                    </div>
                    <span className="flex items-center gap-1.5 text-xs font-bold font-mono">
                      {supabaseOk ? (
                        <>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-emerald-400">Optimal ({dbLatency}ms)</span>
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full bg-red-400" />
                          <span className="text-red-400">Connecting...</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-[#1A4237]">
                    <div className="flex items-center gap-2.5">
                      <Power className="h-4 w-4 text-amber-400" />
                      <span className="text-xs font-semibold text-slate-200">Global Maintenance Status</span>
                    </div>
                    <span className={`text-xs font-bold font-mono ${maintenanceOn ? "text-amber-400" : "text-emerald-400"}`}>
                      {maintenanceOn ? "SYSTEM LOCKED (OTP ACTIVE)" : "SITE ONLINE (NORMAL)"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-[#1A4237]">
                    <div className="flex items-center gap-2.5">
                      <Zap className="h-4 w-4 text-[#D6E85D]" />
                      <span className="text-xs font-semibold text-slate-200">2x Knowledge Boost Multiplier</span>
                    </div>
                    <span className="text-xs font-bold text-[#D6E85D] font-mono">
                      {isCampusBoostActive ? "⚡ ACTIVE (DOUBLE XP)" : "READY TO IGNITE"}
                    </span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="pt-3 border-t border-[#1A4237]/80">
                  <p className="text-[11px] text-[#A2BAAF] font-bold uppercase tracking-wider mb-2.5">
                    Executive Quick Actions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveTab("users")}
                      className="px-3.5 py-2 bg-[#12332C] hover:bg-[#183F36] border border-[#23584C] rounded-xl text-xs font-bold text-slate-200 transition-all cursor-pointer shadow-xs"
                    >
                      Inspect Students
                    </button>
                    <button
                      onClick={() => setActiveTab("announcements")}
                      className="px-3.5 py-2 bg-[#12332C] hover:bg-[#183F36] border border-[#23584C] rounded-xl text-xs font-bold text-slate-200 transition-all cursor-pointer shadow-xs"
                    >
                      Broadcast Announcement
                    </button>
                    <button
                      onClick={() => triggerCampusBoost(60)}
                      className="px-3.5 py-2 bg-[#D6E85D] hover:bg-[#C8DC47] text-[#183F36] rounded-xl text-xs font-extrabold transition-all cursor-pointer shadow-md"
                    >
                      ⚡ Ignite Campus 2x Sprint
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Community Feed Card */}
              <div className="bg-[#0B201A] border border-[#1A4237] rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-bold text-base text-white flex items-center gap-2 font-display">
                      <MessageSquare className="h-4 w-4 text-[#D6E85D]" />
                      Live Campus Discussions
                    </h2>
                    <button
                      onClick={() => setActiveTab("moderation")}
                      className="text-xs text-[#D6E85D] hover:underline font-bold"
                    >
                      Moderate All ↗
                    </button>
                  </div>

                  {statsLoading ? (
                    <div className="py-12 text-center text-slate-500 text-sm">Loading discussions…</div>
                  ) : recentActivity.length === 0 ? (
                    <p className="text-slate-500 text-sm text-center py-8">No community posts yet.</p>
                  ) : (
                    <div className="space-y-2.5">
                      {recentActivity.slice(0, 3).map((post) => (
                        <div key={post.id} className="p-3.5 rounded-2xl bg-black/40 border border-[#1A4237] text-xs space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] text-[#A2BAAF]">
                            <span className="font-bold text-white font-display">{post.authorName}</span>
                            <span>{new Date(post.createdAt).toLocaleDateString("en-IN")}</span>
                          </div>
                          <p className="text-slate-300 line-clamp-2">{post.content}</p>
                          <div className="flex items-center gap-2 text-[10px] text-[#D6E85D] font-mono">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{post.likes} Upvotes</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#1A4237]/80 text-[11px] text-[#A2BAAF] flex items-center justify-between font-mono">
                  <span>Audit Logs Count: {auditLogs.length}</span>
                  <button onClick={() => setActiveTab("audit")} className="text-[#D6E85D] hover:underline font-bold">
                    View Security Trail ↗
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════ TAB 2: STUDENT REGISTRY ════════════════════ */}
        {activeTab === "users" && (
          <div className="space-y-4 animate-fade-in">
            {/* Filter and Action Bar */}
            <div className="bg-[#0B201A] border border-[#1A4237] rounded-3xl p-4 sm:p-5 shadow-xl space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    value={userSearch}
                    onChange={(e) => {
                      setUserSearch(e.target.value);
                      setUserPage(1);
                    }}
                    placeholder="Search students by name, email, or enrollment number…"
                    className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-[#1A4237] rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D]"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Role Filter */}
                  <select
                    value={userRoleFilter}
                    onChange={(e) => {
                      setUserRoleFilter(e.target.value);
                      setUserPage(1);
                    }}
                    className="bg-black/40 border border-[#1A4237] rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#D6E85D] cursor-pointer"
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Students</option>
                    <option value="admin">Admins</option>
                    <option value="guest">Guests</option>
                  </select>

                  {/* Semester Filter */}
                  <select
                    value={userSemesterFilter}
                    onChange={(e) => {
                      setUserSemesterFilter(e.target.value);
                      setUserPage(1);
                    }}
                    className="bg-black/40 border border-[#1A4237] rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-[#D6E85D] cursor-pointer"
                  >
                    <option value="all">All Semesters</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                  </select>

                  <button
                    onClick={loadUsers}
                    className="p-2.5 bg-black/40 border border-[#1A4237] rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Refresh student records"
                  >
                    <RefreshCw className={`h-4 w-4 ${usersLoading ? "animate-spin" : ""}`} />
                  </button>

                  <button
                    onClick={exportUsersCSV}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-[#D6E85D] text-[#183F36] rounded-xl text-xs font-extrabold hover:bg-[#C8DC47] transition-all cursor-pointer shadow-md"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="bg-[#0B201A] border border-[#1A4237] rounded-3xl overflow-hidden shadow-2xl">
              {usersLoading ? (
                <div className="flex items-center justify-center py-20 text-slate-400 text-xs font-bold">
                  Loading verified student records from Supabase…
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-black/50 text-[#A2BAAF] uppercase text-[10px] font-bold border-b border-[#1A4237] tracking-wider font-display">
                      <tr>
                        <th className="px-5 py-3.5">Student</th>
                        <th className="px-4 py-3.5">Enrollment No</th>
                        <th className="px-4 py-3.5">Branch & Sem</th>
                        <th className="px-4 py-3.5">Role</th>
                        <th className="px-4 py-3.5">Experience (XP)</th>
                        <th className="px-4 py-3.5">Joined Date</th>
                        <th className="px-4 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A4237]/60">
                      {pagedUsers.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-16 text-center text-slate-400">
                            No students match your filter criteria.
                          </td>
                        </tr>
                      ) : (
                        pagedUsers.map((u) => (
                          <tr key={u.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <UserAvatar
                                  avatarUrl={u.avatarUrl}
                                  displayName={u.name}
                                  email={u.email}
                                  className="h-8 w-8 text-xs shrink-0 ring-1 ring-[#D6E85D]/40"
                                />
                                <div>
                                  <span className="font-bold text-white block">{u.name}</span>
                                  <span className="text-[11px] text-slate-400 font-mono">{u.email}</span>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3.5 font-mono text-slate-300">{u.enrollmentNo}</td>
                            <td className="px-4 py-3.5 text-slate-300">
                              <span className="block font-semibold">{u.branch}</span>
                              <span className="text-[10px] text-[#D6E85D] font-mono">Semester {u.semester}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono ${
                                  u.role === "admin"
                                    ? "bg-[#D6E85D]/15 text-[#D6E85D] border-[#D6E85D]/40"
                                    : "bg-white/5 text-slate-300 border-white/10"
                                }`}
                              >
                                {u.role.toUpperCase()}
                              </span>
                            </td>
                            <td className="px-4 py-3.5 font-mono text-[#D6E85D] font-bold">
                              ✨ {u.xp.toLocaleString()} XP
                            </td>
                            <td className="px-4 py-3.5 text-slate-400 font-mono">{u.joined}</td>
                            <td className="px-4 py-3.5 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                {/* Award XP Button */}
                                <button
                                  onClick={() => setAwardXpTarget(u)}
                                  className="px-2.5 py-1 rounded-lg bg-[#D6E85D]/15 hover:bg-[#D6E85D]/30 text-[#D6E85D] border border-[#D6E85D]/30 font-bold text-[10px] transition-colors cursor-pointer"
                                  title="Award custom bonus XP"
                                >
                                  +XP
                                </button>

                                {/* Inspect Button */}
                                <button
                                  onClick={() => setInspectUser(u)}
                                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                                  title="View complete student passport"
                                >
                                  <Eye className="h-3.5 w-3.5" />
                                </button>

                                {/* Role Selector */}
                                <select
                                  value={u.role}
                                  onChange={(e) => handleRoleChange(u.id, u.userId, e.target.value)}
                                  className="bg-black/40 border border-[#1A4237] rounded-lg text-[10px] text-slate-200 px-2 py-1 focus:outline-none focus:border-[#D6E85D] cursor-pointer"
                                >
                                  <option value="student">Student</option>
                                  <option value="admin">Admin</option>
                                  <option value="guest">Guest</option>
                                </select>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Table Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-[#1A4237]/80 bg-black/30">
                  <p className="text-xs text-[#A2BAAF] font-mono">
                    Showing {pagedUsers.length} of {filteredUsers.length} students &middot; Page {userPage} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <button
                      disabled={userPage === 1}
                      onClick={() => setUserPage((p) => p - 1)}
                      className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      disabled={userPage === totalPages}
                      onClick={() => setUserPage((p) => p + 1)}
                      className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── MODAL: INSPECT USER PROFILE ── */}
            {inspectUser && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
                <div className="bg-[#0B201A] border border-[#23584C] rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative">
                  <button
                    onClick={() => setInspectUser(null)}
                    className="absolute right-4 top-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="flex items-center gap-4">
                    <UserAvatar
                      avatarUrl={inspectUser.avatarUrl}
                      displayName={inspectUser.name}
                      email={inspectUser.email}
                      className="w-16 h-16 text-xl ring-2 ring-[#D6E85D]"
                    />
                    <div>
                      <h3 className="text-xl font-black text-white font-display">{inspectUser.name}</h3>
                      <p className="text-xs text-[#D6E85D] font-mono font-bold">
                        Level {inspectUser.level} &middot; {inspectUser.role.toUpperCase()}
                      </p>
                      <p className="text-xs text-slate-400 font-mono">{inspectUser.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-4 bg-black/40 rounded-2xl border border-[#1A4237] text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Enrollment No</span>
                      <span className="font-bold text-white font-mono">{inspectUser.enrollmentNo}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Branch</span>
                      <span className="font-bold text-white">{inspectUser.branch}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Current Semester</span>
                      <span className="font-bold text-[#D6E85D] font-mono">Sem {inspectUser.semester}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Target CGPA</span>
                      <span className="font-bold text-emerald-400 font-mono">{inspectUser.targetCgpa}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Total Experience</span>
                      <span className="font-bold text-[#D6E85D] font-mono">{inspectUser.xp} XP</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Active Streak</span>
                      <span className="font-bold text-amber-400 font-mono">🔥 {inspectUser.streakDays} Days</span>
                    </div>
                  </div>

                  {inspectUser.bio && (
                    <div className="p-3 bg-black/30 rounded-xl border border-white/5 text-xs text-slate-300">
                      <span className="text-[10px] text-slate-400 uppercase block mb-0.5">Bio</span>
                      <p>{inspectUser.bio}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const target = inspectUser;
                        setInspectUser(null);
                        setAwardXpTarget(target);
                      }}
                      className="flex-1 py-2.5 bg-[#D6E85D] text-[#183F36] rounded-xl text-xs font-bold hover:bg-[#C8DC47] transition-all cursor-pointer"
                    >
                      Award Custom Bonus XP
                    </button>
                    <button
                      onClick={() => setInspectUser(null)}
                      className="px-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-xl text-xs font-bold hover:bg-white/10"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── MODAL: AWARD XP TO USER ── */}
            {awardXpTarget && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
                <form
                  onSubmit={submitAwardXp}
                  className="bg-[#0B201A] border border-[#23584C] rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative"
                >
                  <button
                    type="button"
                    onClick={() => setAwardXpTarget(null)}
                    className="absolute right-4 top-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <h3 className="text-lg font-black text-white flex items-center gap-2 font-display">
                    <Sparkles className="h-5 w-5 text-[#D6E85D]" />
                    Award Bonus Academic XP
                  </h3>
                  <p className="text-xs text-slate-300">
                    Granting verified XP directly to <strong className="text-white">{awardXpTarget.name}</strong> ({awardXpTarget.email}).
                  </p>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">XP Amount</label>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {[50, 100, 250, 500].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setAwardXpAmount(amt)}
                          className={`py-1.5 rounded-xl text-xs font-bold border cursor-pointer ${
                            awardXpAmount === amt
                              ? "bg-[#D6E85D] text-[#183F36] border-[#D6E85D]"
                              : "bg-black/30 text-slate-300 border-white/10"
                          }`}
                        >
                          +{amt}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      min={10}
                      max={10000}
                      value={awardXpAmount}
                      onChange={(e) => setAwardXpAmount(Number(e.target.value))}
                      className="w-full bg-black/40 border border-[#1A4237] rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Reason / Citation</label>
                    <input
                      type="text"
                      value={awardXpReason}
                      onChange={(e) => setAwardXpReason(e.target.value)}
                      placeholder="e.g. Hackathon Winner, Class Ambassador..."
                      className="w-full bg-black/40 border border-[#1A4237] rounded-xl px-4 py-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-[#D6E85D] text-[#183F36] rounded-xl text-xs font-bold hover:bg-[#C8DC47] transition-all cursor-pointer shadow-md"
                    >
                      Confirm & Credit XP
                    </button>
                    <button
                      type="button"
                      onClick={() => setAwardXpTarget(null)}
                      className="px-4 py-2.5 bg-white/5 border border-white/10 text-slate-300 rounded-xl text-xs font-bold hover:bg-white/10 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ════════════════════ TAB 3: MAINTENANCE & OTP ════════════════════ */}
        {activeTab === "maintenance" && (
          <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
            <div className="bg-[#0B201A] border border-[#1A4237] rounded-3xl p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-base text-white flex items-center gap-2 font-display">
                  <Power className="h-5 w-5 text-[#D6E85D]" />
                  Global Maintenance Protocol
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border font-mono ${
                    maintenanceOn
                      ? "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse"
                      : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                  }`}
                >
                  {maintenanceOn ? "SYSTEM LOCKED" : "ONLINE LIVE"}
                </span>
              </div>

              <div className="flex items-center justify-between p-5 bg-black/40 rounded-2xl border border-[#1A4237]">
                <div>
                  <p className="font-bold text-white text-lg">
                    {maintenanceOn ? "🔴 Maintenance Mode is Active" : "🟢 Portal is Online Globally"}
                  </p>
                  <p className="text-xs text-slate-300 mt-1 max-w-md leading-relaxed">
                    {maintenanceOn
                      ? "All non-admin students and guests are blocked with a full-screen 3D lockout countdown. Admins retain full bypass access."
                      : "All curriculum topics, PDF notes, and Coding Labs are fully accessible to students."}
                  </p>
                </div>
                <button
                  onClick={toggleMaintenance}
                  className={`relative w-14 h-7 rounded-full transition-colors focus:outline-none border-2 shrink-0 cursor-pointer ${
                    maintenanceOn
                      ? "bg-amber-500 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                      : "bg-slate-700 border-slate-600"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={launchStudentPreview}
                  className="px-4 py-3 bg-[#D6E85D] hover:bg-[#C8DC47] text-[#183F36] rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer w-full"
                >
                  <Eye className="h-4 w-4" />
                  <span>Launch 3D Student Lockout Preview</span>
                </button>
              </div>

              {/* Countdown Timer */}
              <div className="pt-2 border-t border-[#1A4237]">
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                  <span>Estimated Downtime Duration</span>
                  <span className="text-[#D6E85D] font-mono font-bold">{maintenanceCountdown} minutes</span>
                </label>
                <input
                  type="number"
                  min={1}
                  max={480}
                  value={maintenanceCountdown}
                  onChange={(e) => setMaintenanceCountdown(Number(e.target.value))}
                  className="w-full bg-black/40 border border-[#1A4237] rounded-xl px-4 py-2.5 text-xs text-white font-mono"
                />
              </div>
            </div>

            {/* Dynamic Access Key (OTP) Management */}
            <div className="bg-[#0B201A] border border-[#1A4237] rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-base text-white flex items-center gap-2 font-display">
                  <KeyRound className="h-5 w-5 text-[#D6E85D]" />
                  Dynamic Maintenance Access Key (OTP)
                </h2>
                <span className="text-[11px] px-2.5 py-0.5 rounded-md font-mono bg-black/40 text-slate-300 border border-white/10">
                  Zero-Trust Key
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                When maintenance is active, this key allows authorized faculty or test cohort members to preview the student portal. <strong className="text-amber-300">It never grants access to this Admin Panel.</strong>
              </p>

              <div className="p-4 bg-black/50 rounded-2xl border border-[#1A4237] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#A2BAAF] font-bold block mb-1">
                    Live Active Passkey
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xl sm:text-2xl font-black text-[#D6E85D] tracking-widest bg-[#0A1C16] px-3.5 py-1.5 rounded-xl border border-[#1A4237]">
                      {maintenancePasskey || (maintenanceOn ? "GENERATING..." : "NO KEY ACTIVE")}
                    </span>
                    {maintenancePasskey && (
                      <span className="text-xs px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-md font-medium">
                        Active
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {maintenancePasskey && (
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(maintenancePasskey);
                        toast.success("Maintenance passkey copied to clipboard!");
                      }}
                      className="flex-1 sm:flex-none px-3.5 py-2 bg-white/5 hover:bg-white/10 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-white/10 cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={regenerateKey}
                    className="flex-1 sm:flex-none px-3.5 py-2 bg-[#D6E85D] hover:bg-[#C8DC47] text-[#183F36] rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>

              {/* Custom Key Setter */}
              <div className="pt-2 border-t border-[#1A4237] flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Set custom key (e.g. ITM-FACULTY-2026)..."
                  value={customKeyInput}
                  onChange={(e) => setCustomKeyInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setCustomKey(customKeyInput);
                  }}
                  className="flex-1 bg-black/40 border border-[#1A4237] rounded-xl px-4 py-2.5 text-xs text-white uppercase font-mono tracking-wider focus:outline-none focus:border-[#D6E85D]"
                />
                <button
                  type="button"
                  onClick={() => setCustomKey(customKeyInput)}
                  disabled={!customKeyInput.trim()}
                  className="px-4 py-2.5 bg-white/5 hover:bg-white/10 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors border border-white/10 shrink-0 cursor-pointer"
                >
                  Apply Key
                </button>
              </div>
            </div>

            {/* Public Message Editor */}
            <div className="bg-[#0B201A] border border-[#1A4237] rounded-3xl p-6 space-y-4 shadow-2xl">
              <h2 className="font-bold text-base text-white flex items-center gap-2 font-display">
                <FileText className="h-4 w-4 text-[#D6E85D]" />
                Public Lockout Message
              </h2>
              <textarea
                value={maintenanceMsg}
                onChange={(e) => setMaintenanceMsg(e.target.value)}
                rows={3}
                className="w-full bg-black/40 border border-[#1A4237] rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D] resize-none"
                placeholder="Enter the broadcast message displayed to students on the lock screen…"
              />
              <div className="flex items-center justify-between">
                <p className="text-[11px] text-[#A2BAAF]">Broadcasts across all tabs in real-time.</p>
                <button
                  onClick={saveMaintenanceMessage}
                  className="px-4 py-2 bg-[#D6E85D] text-[#183F36] rounded-xl text-xs font-bold hover:bg-[#C8DC47] transition-all cursor-pointer"
                >
                  Save & Broadcast
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════ TAB 4: CAMPUS BROADCASTS ════════════════════ */}
        {activeTab === "announcements" && (
          <div className="space-y-6 animate-fade-in max-w-3xl mx-auto">
            {/* Create Announcement Form */}
            <form
              onSubmit={createAnnouncement}
              className="bg-[#0B201A] border border-[#1A4237] rounded-3xl p-6 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-base text-white flex items-center gap-2 font-display">
                  <Megaphone className="h-5 w-5 text-[#D6E85D]" />
                  Broadcast New Campus Alert
                </h2>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#A2BAAF] font-bold">Presets:</span>
                  <button
                    type="button"
                    onClick={() =>
                      applyAnnouncementPreset({
                        title: "Semester 3 MST Exam Dates Released",
                        message: "The official timetable for Mid-Semester Exam 1 is now published in Materials & Study Schedule.",
                        type: "warning",
                      })
                    }
                    className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-amber-300 font-bold border border-white/10 cursor-pointer"
                  >
                    MST Exam
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      applyAnnouncementPreset({
                        title: "New Practical Problems Live in Coding Lab",
                        message: "Queues and Dynamic Linked List practicals for Semester 3 DSA have been uploaded with test cases.",
                        type: "success",
                      })
                    }
                    className="px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] text-emerald-300 font-bold border border-white/10 cursor-pointer"
                  >
                    Coding Lab
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
                  <input
                    value={annTitle}
                    onChange={(e) => setAnnTitle(e.target.value)}
                    placeholder="Alert headline…"
                    className="w-full bg-black/40 border border-[#1A4237] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#D6E85D]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Severity</label>
                    <select
                      value={annType}
                      onChange={(e) => setAnnType(e.target.value as Announcement["type"])}
                      className="w-full bg-black/40 border border-[#1A4237] rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#D6E85D] cursor-pointer"
                    >
                      <option value="info">Info (Blue)</option>
                      <option value="warning">Warning (Amber)</option>
                      <option value="success">Success (Emerald)</option>
                      <option value="error">Critical (Red)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Audience</label>
                    <select
                      value={annAudience}
                      onChange={(e) => setAnnAudience(e.target.value as Announcement["audience"])}
                      className="w-full bg-black/40 border border-[#1A4237] rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#D6E85D] cursor-pointer"
                    >
                      <option value="all">All Students</option>
                      <option value="students">Students Only</option>
                      <option value="admins">Admins Only</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Message</label>
                <textarea
                  value={annMessage}
                  onChange={(e) => setAnnMessage(e.target.value)}
                  rows={3}
                  placeholder="Compose your alert message…"
                  className="w-full bg-black/40 border border-[#1A4237] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#D6E85D] resize-none"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#D6E85D] text-[#183F36] rounded-xl text-xs font-extrabold hover:bg-[#C8DC47] transition-all cursor-pointer shadow-md flex items-center gap-2"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Publish Alert Broadcast</span>
              </button>
            </form>

            {/* List of Published Announcements */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#A2BAAF] uppercase tracking-wider px-1">
                Active Broadcast Queue ({announcements.length})
              </h3>
              {announcements.map((ann) => (
                <div
                  key={ann.id}
                  className={`bg-[#0B201A] border border-[#1A4237] rounded-2xl p-4 flex items-start justify-between gap-3 shadow-lg ${
                    !ann.active ? "opacity-45" : ""
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span
                      className="mt-1 flex-shrink-0 h-3 w-3 rounded-full shadow-sm"
                      style={{ background: TYPE_COLORS[ann.type] }}
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-white text-sm font-display">{ann.title}</p>
                        <span
                          className="text-[9px] font-black px-2 py-0.5 rounded-full uppercase font-mono"
                          style={{ background: `${TYPE_COLORS[ann.type]}22`, color: TYPE_COLORS[ann.type] }}
                        >
                          {ann.type}
                        </span>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-white/5 text-slate-300 uppercase font-mono">
                          {ann.audience}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{ann.message}</p>
                      <p className="text-[10px] text-slate-500 mt-1.5 font-mono">
                        Published: {new Date(ann.createdAt).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => toggleAnnouncement(ann.id)}
                      title={ann.active ? "Deactivate" : "Activate"}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors cursor-pointer"
                    >
                      {ann.active ? <Eye className="h-4 w-4 text-[#D6E85D]" /> : <CheckCheck className="h-4 w-4 text-slate-500" />}
                    </button>
                    <button
                      onClick={() => deleteAnnouncement(ann.id)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════ TAB 5: COMMUNITY MODERATION ════════════════════ */}
        {activeTab === "moderation" && (
          <div className="space-y-4 animate-fade-in max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0B201A] border border-[#1A4237] rounded-3xl p-4 sm:p-5 shadow-xl">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#D6E85D]" />
                <h2 className="font-bold text-base text-white font-display">Campus Community Moderation Hub</h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
                  <button
                    onClick={() => setModFilter("all")}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      modFilter === "all" ? "bg-[#D6E85D] text-[#183F36]" : "text-slate-400"
                    }`}
                  >
                    All ({communityPosts.length})
                  </button>
                  <button
                    onClick={() => setModFilter("pinned")}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      modFilter === "pinned" ? "bg-[#D6E85D] text-[#183F36]" : "text-slate-400"
                    }`}
                  >
                    Pinned ({communityPosts.filter((p) => p.pinned).length})
                  </button>
                  <button
                    onClick={() => setModFilter("flagged")}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      modFilter === "flagged" ? "bg-[#D6E85D] text-[#183F36]" : "text-slate-400"
                    }`}
                  >
                    Flagged ({flaggedPosts.size})
                  </button>
                </div>
                <button
                  onClick={loadCommunityPosts}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition-colors"
                >
                  <RefreshCw className={`h-4 w-4 ${moderationLoading ? "animate-spin" : ""}`} />
                </button>
              </div>
            </div>

            {/* Posts Feed */}
            {moderationLoading ? (
              <div className="py-20 text-center text-slate-400 text-xs font-bold">
                Loading campus discussion threads from Supabase…
              </div>
            ) : filteredCommunityPosts.length === 0 ? (
              <div className="py-20 text-center text-slate-400 text-xs">
                No discussion posts match the current filter.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredCommunityPosts.map((post) => {
                  const isFl = flaggedPosts.has(post.id);
                  return (
                    <div
                      key={post.id}
                      className={`bg-[#0B201A] border rounded-2xl p-4 sm:p-5 flex items-start justify-between gap-4 shadow-lg transition-all ${
                        post.pinned
                          ? "border-[#D6E85D]/60 bg-gradient-to-r from-[#12332C] to-[#0B201A]"
                          : isFl
                          ? "border-amber-500/50 bg-amber-950/20"
                          : "border-[#1A4237]"
                      }`}
                    >
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-white text-xs font-display">{post.authorName}</span>
                          <span className="text-[10px] text-[#A2BAAF] font-mono">{post.authorBranch}</span>
                          {post.pinned && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#D6E85D]/20 text-[#D6E85D] font-bold border border-[#D6E85D]/40 font-mono">
                              PINNED
                            </span>
                          )}
                          {isFl && (
                            <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40 font-mono">
                              FLAGGED FOR REVIEW
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{post.content}</p>

                        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
                          <span className="flex items-center gap-1 text-[#D6E85D]">
                            <ThumbsUp className="h-3 w-3" /> {post.likes} Upvotes
                          </span>
                          <span>{new Date(post.createdAt).toLocaleDateString("en-IN")}</span>
                          <span className="text-slate-500">ID: {post.id.slice(0, 8)}...</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Pin / Unpin */}
                        <button
                          onClick={() => togglePinPost(post.id, post.pinned)}
                          title={post.pinned ? "Unpin Post" : "Pin Post to Top"}
                          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                            post.pinned
                              ? "bg-[#D6E85D] text-[#183F36] border-[#D6E85D]"
                              : "bg-white/5 text-slate-400 hover:text-white border-white/10"
                          }`}
                        >
                          <Pin className="h-4 w-4" />
                        </button>

                        {/* Flag / Unflag */}
                        <button
                          onClick={() => toggleFlagPost(post.id)}
                          title={isFl ? "Remove Flag" : "Flag Post"}
                          className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                            isFl
                              ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                              : "bg-white/5 text-slate-400 hover:text-amber-300 border-white/10"
                          }`}
                        >
                          <Flag className="h-4 w-4" />
                        </button>

                        {/* Delete Post */}
                        <button
                          onClick={() => deletePost(post.id)}
                          title="Delete Post permanently"
                          className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-red-400 border border-white/10 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ════════════════════ TAB 6: CURRICULUM & NOTES ════════════════════ */}
        {activeTab === "platform" && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ExecutiveStatCard icon={BookOpen} label="Core Subjects" value={totalSubjects} accent="#D6E85D" />
              <ExecutiveStatCard icon={Layers} label="Syllabus Units" value={totalUnits} accent="#38BDF8" />
              <ExecutiveStatCard icon={FileText} label="Detailed Topics" value={totalTopics} accent="#A855F7" />
              <ExecutiveStatCard icon={Hash} label="Verified MCQs" value={totalMcqs.toLocaleString()} accent="#10B981" />
            </div>

            {/* MCQ Breakdown Chart */}
            <div className="bg-[#0B201A] border border-[#1A4237] rounded-3xl p-6 space-y-4 shadow-xl">
              <h2 className="font-bold text-base text-white flex items-center gap-2 font-display">
                <BarChart3 className="h-4 w-4 text-[#D6E85D]" />
                MCQ Question Bank Distribution
              </h2>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={mcqChartData} margin={{ top: 10, right: 10, left: -10, bottom: 40 }}>
                  <XAxis dataKey="name" tick={{ fill: "#A2BAAF", fontSize: 11 }} angle={-30} textAnchor="end" interval={0} height={50} />
                  <YAxis tick={{ fill: "#A2BAAF", fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ background: "#0B201A", border: "1px solid #1A4237", borderRadius: 12, color: "#fff" }}
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                  />
                  <Bar dataKey="mcqs" radius={[8, 8, 0, 0]}>
                    {mcqChartData.map((_, i) => (
                      <Cell key={i} fill={i % 2 === 0 ? "#D6E85D" : "#10B981"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Topic & Notes Search Explorer */}
            <div className="bg-[#0B201A] border border-[#1A4237] rounded-3xl p-6 space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-bold text-base text-white flex items-center gap-2 font-display">
                  <Search className="h-4 w-4 text-[#D6E85D]" />
                  Curriculum Topic & Notes Inspector
                </h3>
                <input
                  value={topicSearchQuery}
                  onChange={(e) => setTopicSearchQuery(e.target.value)}
                  placeholder="Search 350+ topics across DSA, DBMS, Java, COA..."
                  className="bg-black/40 border border-[#1A4237] rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#D6E85D] w-full sm:w-80"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/50 text-[#A2BAAF] uppercase text-[10px] font-bold border-b border-[#1A4237] font-display">
                    <tr>
                      <th className="px-4 py-3">Subject</th>
                      <th className="px-4 py-3">Unit</th>
                      <th className="px-4 py-3">Topic Title</th>
                      <th className="px-4 py-3 text-right">MCQs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1A4237]/60">
                    {filteredTopics.map((t, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 font-semibold text-white">
                          <span>{t.subjectName}</span>
                          <span className="text-[10px] text-[#A2BAAF] font-mono block">Sem {t.semester} &middot; {t.subjectCode}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-300">{t.unitTitle}</td>
                        <td className="px-4 py-3 text-slate-200 font-medium">{t.topicTitle}</td>
                        <td className="px-4 py-3 text-right font-mono text-[#D6E85D] font-bold">
                          {t.mcqsCount} MCQs
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════ TAB 7: AUDIT & SECURITY TRAIL ════════════════════ */}
        {activeTab === "audit" && (
          <div className="space-y-4 animate-fade-in max-w-4xl mx-auto">
            <div className="bg-[#0B201A] border border-[#1A4237] rounded-3xl p-5 shadow-xl flex items-center justify-between">
              <div>
                <h2 className="font-bold text-base text-white flex items-center gap-2 font-display">
                  <Shield className="h-5 w-5 text-[#D6E85D]" />
                  Executive Audit & Security Trail
                </h2>
                <p className="text-xs text-[#A2BAAF] mt-0.5">
                  Chronological tamper-resistant record of administrative operations on ITM Notes.
                </p>
              </div>
              <button
                onClick={() => {
                  setAuditLogs([]);
                  localStorage.removeItem("itm_admin_audit_logs");
                  toast.info("Audit log history cleared.");
                }}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-red-500/20 text-red-300 text-xs font-bold border border-white/10 transition-colors"
              >
                Clear History
              </button>
            </div>

            <div className="space-y-2.5">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="bg-[#0B201A] border border-[#1A4237] rounded-2xl p-4 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white font-display">{log.action}</span>
                      <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-mono bg-white/5 text-[#D6E85D] border border-white/10">
                        {log.type}
                      </span>
                    </div>
                    <p className="text-slate-300">{log.detail}</p>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
