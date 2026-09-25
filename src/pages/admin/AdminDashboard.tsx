import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { subjects } from "@/data/subjects";
import { 
  Database, 
  Users, 
  BookOpen, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
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
  Unlock
} from "lucide-react";
import { toast } from "sonner";

export default function AdminDashboard() {
  const { role, user, profile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "content" | "users" | "settings">("overview");
  const [searchSubject, setSearchSubject] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [gamificationEnabled, setGamificationEnabled] = useState(true);
  const [publicRegEnabled, setPublicRegEnabled] = useState(true);

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

  // Mock registered students list for User Manager
  const [students, setStudents] = useState([
    {
      id: "usr-1",
      name: profile?.display_name || user?.email?.split("@")[0] || "Maher Bhatt",
      email: user?.email || "maher@itm.edu",
      role: "admin",
      level: 4,
      xp: 1250,
      streak: 3,
      status: "Active",
      joined: "Sept 2026",
    },
    {
      id: "usr-2",
      name: "Aarav Sharma",
      email: "aarav.sharma@itm.edu",
      role: "student",
      level: 3,
      xp: 680,
      streak: 2,
      status: "Active",
      joined: "Sept 2026",
    },
    {
      id: "usr-3",
      name: "Priya Patel",
      email: "priya.patel@itm.edu",
      role: "student",
      level: 2,
      xp: 340,
      streak: 1,
      status: "Active",
      joined: "Aug 2026",
    },
    {
      id: "usr-4",
      name: "Rohan Verma",
      email: "rohan.v@itm.edu",
      role: "contributor",
      level: 5,
      xp: 2400,
      streak: 7,
      status: "Active",
      joined: "Aug 2026",
    },
  ]);

  if (role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6 bg-background">
        <div className="max-w-md w-full bg-card border border-border p-8 rounded-2xl shadow-lg">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-3" />
          <h2 className="text-xl font-bold text-foreground mb-2">Admin Access Required</h2>
          <p className="text-sm text-muted-foreground mb-6">
            You must be signed in with an administrative account to access the platform management console.
          </p>
          <button
            onClick={() => navigate("/")}
            className="w-full py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg text-sm"
          >
            Return to Learning Home
          </button>
        </div>
      </div>
    );
  }

  const handleRoleChange = (userId: string, newRole: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === userId ? { ...s, role: newRole } : s))
    );
    toast.success(`User role updated to ${newRole.toUpperCase()}!`);
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
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-foreground">Registered Student Directory</h3>
                <p className="text-xs text-muted-foreground">
                  View engagement metrics, learning streaks, and manage authorization roles.
                </p>
              </div>
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
                  {students.map((student) => (
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
                          onChange={(e) => handleRoleChange(student.id, e.target.value)}
                          className="px-2.5 py-1 rounded border border-input bg-background text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="student">Student</option>
                          <option value="contributor">Contributor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                    </tr>
                  ))}
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
      </main>

      <Footer />
    </div>
  );
}
