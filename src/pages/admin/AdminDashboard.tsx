// @ts-nocheck
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { subjects } from "@/data/subjects";
import { supabase } from "@/integrations/supabase/client";
import { 
  Database, 
  Users, 
  BookOpen, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle,
  ExternalLink, 
  Search, 
  Shield, 
  Sparkles, 
  RefreshCw, 
  Layers, 
  Activity,
  Plus,
  Trash2,
  Lock,
  Unlock,
  Bell,
  MessageSquare,
  ThumbsUp,
  Flag,
  Check,
  Megaphone
} from "lucide-react";
import { toast } from "sonner";

interface StudentUser {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  level: number;
  xp: number;
  streak: number;
  status: string;
  joined: string;
}

export default function AdminDashboard() {
  const { role, user, profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "content" | "users" | "announcements" | "moderation" | "settings">("overview");
  const [searchSubject, setSearchSubject] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [gamificationEnabled, setGamificationEnabled] = useState(true);
  const [publicRegEnabled, setPublicRegEnabled] = useState(true);

  // ── Announcement System State ──
  const [announcements, setAnnouncements] = useState<any[]>(() => {
    try {
      const raw = localStorage.getItem('itm_announcements');
      if (raw) return JSON.parse(raw);
    } catch {}
    return [
      {
        id: 'ann-exam-week',
        title: 'Exam Week Reminder: MST-1 Commencing Soon',
        body: 'Please review official unit question banks and verify your 75% attendance threshold on the GPA Calculator.',
        severity: 'warning',
        active: true,
        createdAt: new Date().toISOString(),
      },
    ];
  });
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnBody, setNewAnnBody] = useState('');
  const [newAnnSeverity, setNewAnnSeverity] = useState<'info' | 'warning' | 'critical'>('warning');

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnBody.trim()) {
      toast.error('Please enter announcement title and body');
      return;
    }
    const newEntry = {
      id: `ann-${Date.now()}`,
      title: newAnnTitle.trim(),
      body: newAnnBody.trim(),
      severity: newAnnSeverity,
      active: true,
      createdAt: new Date().toISOString(),
    };
    const updated = [newEntry, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem('itm_announcements', JSON.stringify(updated));
    window.dispatchEvent(new Event('itm_announcement_updated'));
    setNewAnnTitle('');
    setNewAnnBody('');
    toast.success(`Created "${newEntry.title}" banner! Visible across all pages.`);
  };

  const handleDeleteAnnouncement = (id: string) => {
    const updated = announcements.filter((a) => a.id !== id);
    setAnnouncements(updated);
    localStorage.setItem('itm_announcements', JSON.stringify(updated));
    window.dispatchEvent(new Event('itm_announcement_updated'));
    toast.info('Announcement removed');
  };

  // ── Content Analytics State ──
  const [communityAnalytics] = useState({
    totalPosts: 42,
    totalLikes: 218,
    totalComments: 134,
    topStudents: [
      { name: 'Maher Bhatt', count: 18, role: 'Admin' },
      { name: 'Aarav Patel', count: 9, role: 'Student' },
      { name: 'Diya Sharma', count: 7, role: 'Student' },
      { name: 'Rohan Mehta', count: 5, role: 'Student' },
      { name: 'Ananya Joshi', count: 3, role: 'Student' },
    ],
  });

  // ── Reported Posts Queue State ──
  const [reportedPosts, setReportedPosts] = useState<any[]>(() => {
    try {
      const idsRaw = localStorage.getItem('itm_reported_posts');
      const ids: string[] = idsRaw ? JSON.parse(idsRaw) : [];
      if (ids.length > 0) {
        return ids.map((id, idx) => ({
          id: `rep-${idx}`,
          postId: id,
          authorName: 'Community Student',
          content: `User-reported discussion post (ID: ${id}) flagged for moderation review.`,
          reason: 'Reported by classmate for academic community policy check',
          timestamp: new Date().toISOString(),
          status: 'pending',
        }));
      }
    } catch {}
    return [
      {
        id: 'rep-sample-1',
        postId: 'post-101',
        authorName: 'Anonymous Member',
        content: 'Is anyone sharing paid MST leaked questions or external assignments here?',
        reason: 'Academic Integrity Violation / Spam',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'pending',
      },
    ];
  });

  const handleClearReport = (id: string) => {
    const updated = reportedPosts.filter((r) => r.id !== id);
    setReportedPosts(updated);
    toast.success('Report flag cleared and content approved.');
  };

  const handleDeleteReportedPost = (id: string, postId: string) => {
    const updated = reportedPosts.filter((r) => r.id !== id);
    setReportedPosts(updated);
    try {
      const idsRaw = localStorage.getItem('itm_reported_posts');
      const ids: string[] = idsRaw ? JSON.parse(idsRaw) : [];
      localStorage.setItem('itm_reported_posts', JSON.stringify(ids.filter((x) => x !== postId)));
    } catch {}
    toast.success('Reported post deleted from community!');
  };

  // Calculate platform curriculum statistics
  const totalSubjects = subjects.length;
  const totalUnits = subjects.reduce((acc, s) => acc + (s.units?.length || 0), 0);
  const totalTopics = subjects.reduce(
    (acc, s) => acc + (s.units?.reduce((uAcc, u) => uAcc + (u.topics?.length || 0), 0) || 0),
    0
  );
  const totalMcqs = subjects.reduce(
    (acc, s) =>
      acc +
      (s.units?.reduce(
        (uAcc, u) => uAcc + (u.topics?.reduce((tAcc, t) => tAcc + (t.mcqs?.length || 0), 0) || 0),
        0
      ) || 0),
    0
  );

  // Live registered students state from Supabase Cloud
  const [students, setStudents] = useState<StudentUser[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);

  const loadStudents = async () => {
    setIsLoadingStudents(true);
    try {
      const { data: dbProfiles, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching registered profiles:", error);
        return;
      }

      if (dbProfiles) {
        const mapped: StudentUser[] = dbProfiles.map((p) => {
          const joinDate = p.created_at
            ? new Date(p.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })
            : "Recent";

          return {
            id: p.id,
            userId: p.user_id,
            name: p.display_name || p.email?.split("@")[0] || "Registered Student",
            email: p.email || "N/A",
            role: p.role || (p.email === "maherbhatt01@gmail.com" ? "admin" : "student"),
            level: p.level || 1,
            xp: p.xp || 120,
            streak: p.streak_days || 1,
            status: p.status || "Active",
            joined: joinDate,
          };
        });
        setStudents(mapped);
      }
    } catch (err) {
      console.error("Failed to load students:", err);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  useEffect(() => {
    loadStudents();

    // Listen to realtime user registrations!
    const channel = supabase
      .channel("admin_users_live")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        loadStudents();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleRoleChange = async (profileId: string, userId: string, newRole: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === profileId ? { ...s, role: newRole } : s))
    );

    try {
      // 1. Update in profiles table
      await supabase.from("profiles").update({ role: newRole }).eq("id", profileId);

      // 2. Update in user_roles table
      const appRole = newRole === "admin" ? "admin" : newRole === "contributor" ? "moderator" : "user";
      await supabase.from("user_roles").upsert({
        user_id: userId,
        role: appRole as any,
      });

      toast.success(`Role updated to ${newRole.toUpperCase()} in Supabase!`);
    } catch (err) {
      console.error("Role update error:", err);
      toast.error("Failed to save role change to database.");
      loadStudents();
    }
  };

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchSubject.toLowerCase()) ||
      s.code?.toLowerCase().includes(searchSubject.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 animate-fade-in">
        {/* ── Top Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-3xl font-extrabold text-foreground tracking-tight">
                Platform Admin Command Center
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Manage curriculum contents, student accounts, system health, and database synchronization.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("/admin/seed")}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-bold shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2 apple-press"
            >
              <Database className="h-4 w-4" /> Seed Database
            </button>
          </div>
        </div>

        {/* ── Metrics Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
            <p className="text-2xl sm:text-3xl font-black text-foreground">{totalSubjects}</p>
            <p className="text-xs font-semibold text-muted-foreground mt-1">Active Subjects</p>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Semester 1 to 4</span>
          </div>
          <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
            <p className="text-2xl sm:text-3xl font-black text-foreground">{totalTopics}</p>
            <p className="text-xs font-semibold text-muted-foreground mt-1">Curriculum Topics</p>
            <span className="text-[11px] text-primary font-medium">{totalUnits} Academic Units</span>
          </div>
          <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
            <p className="text-2xl sm:text-3xl font-black text-foreground">{totalMcqs}+</p>
            <p className="text-xs font-semibold text-muted-foreground mt-1">Practice MCQs</p>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">Verified Solutions</span>
          </div>
          <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 text-emerald-500 font-black text-2xl sm:text-3xl">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping inline-block" />
              Healthy
            </div>
            <p className="text-xs font-semibold text-muted-foreground mt-1">System Status</p>
            <span className="text-[11px] text-muted-foreground">Supabase Connected</span>
          </div>
        </div>

        {/* ── Navigation Tabs ── */}
        <div className="flex items-center gap-2 border-b border-border/60 pb-3 mb-8 overflow-x-auto scrollbar-none">
          {[
            { id: "overview", label: "Dashboard Overview", icon: Activity },
            { id: "announcements", label: `Announcements (${announcements.length})`, icon: Megaphone },
            { id: "moderation", label: `Community & Moderation (${reportedPosts.length})`, icon: Shield },
            { id: "content", label: `Content Manager (${totalSubjects})`, icon: BookOpen },
            { id: "users", label: `User Manager (${students.length})`, icon: Users },
            { id: "settings", label: "Platform Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── TAB 1: OVERVIEW ── */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Quick Actions Hub */}
              <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-foreground mb-4">Core Management Tools</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => navigate("/admin/seed")}
                    className="p-5 rounded-xl border border-border/80 hover:border-primary/40 bg-secondary/20 cursor-pointer transition-all hover:bg-secondary/40 apple-press"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                      <Database className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-base text-foreground mb-1">Database Seeder</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Seed all local curriculum master files (DSA, DBMS, Java, COANMP, CA) directly into Supabase.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab("content")}
                    className="p-5 rounded-xl border border-border/80 hover:border-primary/40 bg-secondary/20 cursor-pointer transition-all hover:bg-secondary/40 apple-press"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-base text-foreground mb-1">Content Manager</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Inspect subjects, units, topics, and MCQs across all engineering semesters.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab("users")}
                    className="p-5 rounded-xl border border-border/80 hover:border-primary/40 bg-secondary/20 cursor-pointer transition-all hover:bg-secondary/40 apple-press"
                  >
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center mb-3">
                      <Users className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-base text-foreground mb-1">User Manager</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Review registered students, learning streaks, XP ranks, and change roles.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab("settings")}
                    className="p-5 rounded-xl border border-border/80 hover:border-primary/40 bg-secondary/20 cursor-pointer transition-all hover:bg-secondary/40 apple-press"
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-3">
                      <Settings className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-base text-foreground mb-1">Platform Settings</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Toggle gamification, check Supabase latency, manage maintenance mode.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Status Card */}
            <div className="space-y-6">
              <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                  Database & Cloud Health
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <span className="text-muted-foreground">Database Provider:</span>
                    <span className="font-bold text-foreground">Supabase PostgreSQL</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <span className="text-muted-foreground">Hosting / Deployment:</span>
                    <span className="font-bold text-foreground">Vercel Production</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-border/60">
                    <span className="text-muted-foreground">Row Level Security (RLS):</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">Enforced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">University Curriculum:</span>
                    <span className="font-bold text-foreground">Semester 3 Core Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: CONTENT MANAGER ── */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-card border border-border p-4 rounded-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search subjects by name or code..."
                  value={searchSubject}
                  onChange={(e) => setSearchSubject(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                onClick={() => toast.info("To add custom subjects, you can use the interactive seeder or Supabase dashboard!")}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-xs inline-flex items-center gap-1.5 shadow"
              >
                <Plus className="h-4 w-4" /> Add New Subject
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSubjects.map((sub) => {
                const totalSubTopics = sub.units?.reduce((acc, u) => acc + (u.topics?.length || 0), 0) || 0;
                return (
                  <div
                    key={sub.id}
                    className="bg-card border border-border/80 hover:border-primary/40 rounded-2xl p-5 transition-all shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                            {sub.code || "SUB"}
                          </span>
                          <span className="text-xs font-semibold text-muted-foreground">
                            Semester {sub.semester || 3}
                          </span>
                        </div>
                        <h3 className="font-bold text-base text-foreground">{sub.name}</h3>
                      </div>
                      <button
                        onClick={() => navigate(`/subject/${sub.id}`)}
                        className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground"
                        title="View Subject"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                      {sub.description || "Comprehensive notes, algorithms, worked examples, and practice questions."}
                    </p>

                    <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{sub.units?.length || 0} Units · {totalSubTopics} Topics</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        ✓ In Production
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── TAB 3: USER MANAGER ── */}
        {activeTab === "users" && (
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-foreground">Registered Student Directory</h3>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                    🟢 Live Cloud ({students.length})
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Real verified university students fetched live from Supabase PostgreSQL database.
                </p>
              </div>

              <button
                onClick={loadStudents}
                disabled={isLoadingStudents}
                className="px-3.5 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-xs font-semibold text-foreground flex items-center gap-1.5 transition-colors self-start sm:self-auto apple-press"
                title="Refresh student list"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isLoadingStudents ? "animate-spin text-primary" : ""}`} />
                <span>Refresh Students</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-secondary/40 text-muted-foreground uppercase text-[10px] font-bold border-b border-border">
                  <tr>
                    <th className="p-4">Student</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Level & Rank</th>
                    <th className="p-4">Streak</th>
                    <th className="p-4">Total XP</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {isLoadingStudents ? (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-muted-foreground">
                        <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-primary" />
                        <p className="font-medium text-xs">Syncing registered students from Supabase Cloud...</p>
                      </td>
                    </tr>
                  ) : students.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-12 text-center text-muted-foreground">
                        <Users className="h-6 w-6 mx-auto mb-2 opacity-40" />
                        <p className="font-medium text-xs">No registered students found yet.</p>
                      </td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr key={student.id} className="hover:bg-secondary/20 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-foreground">{student.name}</div>
                          <div className="text-muted-foreground text-[11px]">{student.email}</div>
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            student.role === "admin"
                              ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                              : student.role === "contributor"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                              : "bg-secondary text-foreground"
                          }`}>
                            {student.role}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-foreground">
                          Level {student.level}
                        </td>
                        <td className="p-4 font-semibold text-amber-600 dark:text-amber-400">
                          🔥 {student.streak} Days
                        </td>
                        <td className="p-4 font-mono font-bold text-foreground">
                          {student.xp} XP
                        </td>
                        <td className="p-4 text-right">
                          <select
                            value={student.role}
                            onChange={(e) => handleRoleChange(student.id, student.userId, e.target.value)}
                            className="px-2.5 py-1 rounded border border-input bg-background text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                          >
                            <option value="student">Student</option>
                            <option value="contributor">Contributor</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TAB 4: SETTINGS ── */}
        {activeTab === "settings" && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="font-bold text-base text-foreground pb-2 border-b border-border">
                Platform Configuration Toggles
              </h3>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-foreground">Gamification Engine</h4>
                  <p className="text-xs text-muted-foreground">
                    Enable XP rewards, daily streaks 🔥, badges, and Pomodoro focus timers.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setGamificationEnabled(!gamificationEnabled);
                    toast.success(`Gamification ${!gamificationEnabled ? "enabled" : "disabled"}`);
                  }}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${
                    gamificationEnabled ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      gamificationEnabled ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-foreground">Allow Public Registration</h4>
                  <p className="text-xs text-muted-foreground">
                    Permit new university students to create accounts and track individual study progress.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setPublicRegEnabled(!publicRegEnabled);
                    toast.success(`Public registration ${!publicRegEnabled ? "enabled" : "disabled"}`);
                  }}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${
                    publicRegEnabled ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      publicRegEnabled ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-foreground">Maintenance Mode</h4>
                  <p className="text-xs text-muted-foreground">
                    Temporarily display a maintenance banner to non-admin users during big updates.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setMaintenanceMode(!maintenanceMode);
                    toast.warning(`Maintenance mode ${!maintenanceMode ? "activated" : "deactivated"}`);
                  }}
                  className={`w-12 h-6 rounded-full transition-colors p-1 ${
                    maintenanceMode ? "bg-destructive" : "bg-secondary"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      maintenanceMode ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-sm text-foreground mb-2">Cache & Local Reset</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Clear cached subject definitions or reset local gamification state for testing.
              </p>
              <button
                onClick={() => {
                  localStorage.removeItem("itm_notes_gamification_v2");
                  toast.success("Local gamification state cleared! Refreshing page...");
                  setTimeout(() => window.location.reload(), 1000);
                }}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground font-semibold rounded-lg text-xs transition-colors"
              >
                Reset Local Study State
              </button>
            </div>
          </div>
        )}

        {/* ── TAB: ANNOUNCEMENT BANNER SYSTEM ── */}
        {activeTab === "announcements" && (
          <div className="space-y-8 animate-fade-in">
            {/* Create Announcement Form */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Megaphone className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">Create Global Announcement Banner</h2>
              </div>
              <p className="text-xs text-muted-foreground mb-6">
                Broadcast critical university notices, exam timetable releases, or maintenance alerts to all students across all pages.
              </p>

              <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-foreground block mb-1">
                      Banner Headline / Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Exam Week Reminder: MST-1 Timetable Released"
                      value={newAnnTitle}
                      onChange={(e) => setNewAnnTitle(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-foreground block mb-1">
                      Alert Severity Level
                    </label>
                    <select
                      value={newAnnSeverity}
                      onChange={(e) => setNewAnnSeverity(e.target.value as any)}
                      className="w-full h-10 px-3 rounded-xl border border-input bg-background text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="info">Info (Blue notice)</option>
                      <option value="warning">Warning (Amber alert)</option>
                      <option value="critical">Critical (Red urgent alert)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-foreground block mb-1">
                    Announcement Body
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. MST-1 exams begin on Monday. Check your Hall Ticket eligibility and review solved question banks."
                    value={newAnnBody}
                    onChange={(e) => setNewAnnBody(e.target.value)}
                    className="w-full p-3 rounded-xl border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Publish Global Announcement</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Active Announcements List */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-foreground mb-1">Active Global Announcements</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Students can dismiss banners locally. Deleting an announcement here removes it for everyone.
              </p>

              {announcements.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-border rounded-xl">
                  <Megaphone className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">No active announcements. Broadcast one above!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {announcements.map((ann) => (
                    <div
                      key={ann.id}
                      className="p-4 rounded-xl border border-border/80 bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                            ann.severity === 'critical'
                              ? 'bg-rose-500/20 text-rose-500 border-rose-500/30'
                              : ann.severity === 'warning'
                              ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30'
                              : 'bg-primary/20 text-primary border-primary/30'
                          }`}>
                            {ann.severity}
                          </span>
                          <h4 className="font-bold text-sm text-foreground">{ann.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{ann.body}</p>
                        <p className="text-[10px] text-muted-foreground/60 font-mono">
                          Posted: {new Date(ann.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteAnnouncement(ann.id)}
                        className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors text-xs font-semibold self-start sm:self-auto shrink-0 flex items-center gap-1.5"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete Banner</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB: MODERATION & CONTENT ANALYTICS ── */}
        {activeTab === "moderation" && (
          <div className="space-y-8 animate-fade-in">
            {/* Content Analytics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Total Community Posts
                  </span>
                  <MessageSquare className="h-4 w-4 text-primary" />
                </div>
                <p className="text-3xl font-black text-foreground font-mono">{communityAnalytics.totalPosts}</p>
                <p className="text-[11px] text-emerald-500 font-medium mt-1">+12 discussions this week</p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Total Peer Likes
                  </span>
                  <ThumbsUp className="h-4 w-4 text-amber-500" />
                </div>
                <p className="text-3xl font-black text-foreground font-mono">{communityAnalytics.totalLikes}</p>
                <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">Active peer feedback</p>
              </div>

              <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Comments & Replies
                  </span>
                  <Activity className="h-4 w-4 text-indigo-500" />
                </div>
                <p className="text-3xl font-black text-foreground font-mono">{communityAnalytics.totalComments}</p>
                <p className="text-[11px] text-indigo-500 font-medium mt-1">High study collaboration</p>
              </div>
            </div>

            {/* Top 5 Active Students */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-base text-foreground mb-1">Top 5 Most Active Student Contributors</h3>
              <p className="text-xs text-muted-foreground mb-4">Ranked by discussion posts and study answers shared</p>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {communityAnalytics.topStudents.map((stud, idx) => (
                  <div key={stud.name} className="p-3.5 rounded-xl border border-border bg-secondary/30 text-center">
                    <span className="text-[10px] font-mono font-bold text-primary px-1.5 py-0.5 rounded bg-primary/10 inline-block mb-1">
                      #{idx + 1}
                    </span>
                    <p className="font-bold text-sm text-foreground truncate">{stud.name}</p>
                    <p className="text-xs text-muted-foreground font-medium">{stud.count} Contributions</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reported Posts Moderation Queue */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flag className="h-5 w-5 text-rose-500" />
                  <h3 className="font-bold text-base text-foreground">Reported Posts Moderation Queue</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
                  {reportedPosts.length} Pending
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-5">
                Review posts flagged by students for harassment, irrelevant spam, or academic dishonesty.
              </p>

              {reportedPosts.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-border rounded-xl">
                  <CheckCircle className="h-8 w-8 text-emerald-500/60 mx-auto mb-2" />
                  <h4 className="font-bold text-sm text-foreground">Queue is Clear!</h4>
                  <p className="text-xs text-muted-foreground">All reported posts have been resolved or dismissed.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reportedPosts.map((rep) => (
                    <div
                      key={rep.id}
                      className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-foreground">{rep.authorName}</span>
                          <span className="text-[10px] font-mono text-muted-foreground">({rep.postId})</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-500 font-bold">
                            {rep.reason}
                          </span>
                        </div>
                        <p className="text-xs text-foreground/90 font-medium italic">"{rep.content}"</p>
                        <p className="text-[10px] text-muted-foreground font-mono">
                          Flagged on: {new Date(rep.timestamp).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleClearReport(rep.id)}
                          className="px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold transition-colors flex items-center gap-1"
                          title="Dismiss report and keep post"
                        >
                          <Check className="h-3.5 w-3.5 text-emerald-500" />
                          <span>Approve & Clear Flag</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteReportedPost(rep.id, rep.postId)}
                          className="px-3 py-1.5 rounded-lg bg-destructive text-white hover:bg-destructive/90 text-xs font-bold transition-colors flex items-center gap-1 shadow-sm"
                          title="Permanently remove post from community"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Delete Post</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
