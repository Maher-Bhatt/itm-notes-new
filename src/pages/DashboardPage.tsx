import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";
import { useAcademic } from "@/contexts/AcademicContext";
import { subjects, getAllTopicIds } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import { 
  Sparkles, 
  BookOpen, 
  Calendar, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  FileText, 
  Search, 
  Plus, 
  ChevronRight, 
  TrendingUp, 
  ChevronLeft,
  Award,
  Layers,
  Flame,
  CheckCircle2,
  Users,
  LogIn,
  Code2,
  Zap,
  Bookmark
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip 
} from "recharts";
import { toast } from "sonner";
import { openTimetable } from "@/components/GlobalTimetableModal";
import { FACULTY_DIRECTORY } from "@/data/timetableData";

// Chart Activity Data matching Screenshot 1 spline curve
const STUDY_ACTIVITY_DATA = [
  { time: "0h", hours: 12 },
  { time: "02", hours: 28 },
  { time: "06", hours: 45 },
  { time: "12:00", hours: 82 },
  { time: "Jun 20", hours: 64 },
  { time: "24:00", hours: 96 },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { semesterNumber } = useAcademic();
  const { state: game, levelInfo } = useGamification();
  const { progress } = useProgress();

  const [activeShortcutTab, setActiveShortcutTab] = useState<"overview" | "tools">("overview");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("all");
  const [subjectSemFilter, setSubjectSemFilter] = useState<number | "all">(profile?.semester || 3);

  const studentDisplayName = profile?.display_name || user?.email?.split("@")[0] || null;
  const activeSemester = profile?.semester || semesterNumber || 3;
  const completedTopicsCount = progress?.completedTopics?.length || 0;
  const totalModulesCount = 8;
  const completedModulesCount = user ? Math.min(totalModulesCount, Math.round(completedTopicsCount / 2)) : 0;

  // Filter core subjects based on selected semester and subject filter
  const displayedSubjects = useMemo(() => {
    return subjects.filter((s) => {
      if (subjectSemFilter !== "all" && s.semester !== subjectSemFilter) return false;
      if (selectedCourseFilter !== "all") {
        if (selectedCourseFilter === "dsa" && !s.id.includes("dsa")) return false;
        if (selectedCourseFilter === "dbms" && !s.id.includes("dbms")) return false;
        if (selectedCourseFilter === "ca" && !s.id.includes("coanmp") && !s.id.includes("architecture")) return false;
        if (selectedCourseFilter === "java" && !s.id.includes("java")) return false;
      }
      return true;
    });
  }, [subjectSemFilter, selectedCourseFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 animate-fade-in">
      {/* ── TOP HEADER SECTION matching Screenshot 1 ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            {user ? `Welcome back, ${studentDisplayName || "Student"}` : "ITM Notes Student Dashboard"}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">
            {user 
              ? `Student Dashboard · Active Enrollment (Semester ${activeSemester} · ${profile?.branch ? profile.branch.split(" ")[0] : "CS"})`
              : "Open Knowledge Repository · Semester 1 to 4 Course Packs & Practicals"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for topics..."
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                window.dispatchEvent(event);
              }}
              readOnly
              className="h-9 pl-8 pr-3 w-44 sm:w-56 rounded-xl border border-input bg-card text-xs focus:outline-none cursor-pointer"
            />
          </div>

          {!user ? (
            <button
              onClick={() => navigate("/auth")}
              className="h-9 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 flex items-center gap-1.5 transition-all active:scale-95 shrink-0"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/materials");
                toast.info("Navigating to Academic Materials repository");
              }}
              className="h-9 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all active:scale-95 shrink-0"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Sheet</span>
            </button>
          )}
        </div>
      </div>

      {/* ── OFFICIAL EXAM & VIVA ALERT BANNER ── */}
      <div className="bg-gradient-to-r from-[#183F36] via-[#1F4E43] to-[#12332C] text-white p-4 sm:p-5 rounded-3xl border border-[#D6E85D]/30 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D6E85D]/15 via-transparent to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D6E85D] text-[#183F36] shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#183F36] animate-ping" />
                Notice Live
              </span>
              <span className="text-xs text-[#D6E85D] font-mono font-bold">
                Odd Sem 2026-2027 · Oct 26 – Nov 03
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white font-display">
              B.Tech Sem 3 Submission Viva & Remedial Examinations
            </h2>
            <p className="text-xs text-[#A2BAAF] leading-relaxed max-w-2xl">
              Practical file submissions & viva start <strong className="text-white">10:00 AM onwards</strong>. Check your assigned location (NL-2, JAVA LAB, NL-6, EB-39, EB-25) and subject faculty.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openTimetable("viva")}
              className="px-4 py-2.5 rounded-xl bg-[#D6E85D] hover:bg-[#c8dc4e] text-[#183F36] font-black text-xs shadow-md shadow-[#D6E85D]/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer font-display"
            >
              <Calendar className="h-4 w-4" />
              <span>Open Timetables</span>
            </button>
            <button
              onClick={() => openTimetable("remedial")}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <span>Remedials</span>
            </button>
            <button
              onClick={() => navigate("/imp-questions/oopj")}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-[#D6E85D] hover:text-[#183F36] text-white font-bold text-xs border border-white/20 flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer font-display"
              title="Open OOPJ (C2311C1) Solved Master Question Bank"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">OOPJ Solved Bank</span>
              <span className="sm:hidden">OOPJ</span>
            </button>
          </div>
        </div>

        {/* Quick Cohort Class Jump Pills */}
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2 overflow-x-auto no-scrollbar relative z-10">
          <span className="text-[11px] font-bold text-[#A2BAAF] uppercase tracking-wider shrink-0">
            Quick Jump:
          </span>
          {[
            { cls: 1 as const, room: "NL-2" },
            { cls: 2 as const, room: "JAVA LAB" },
            { cls: 3 as const, room: "NL-6" },
            { cls: 4 as const, room: "EB-39" },
            { cls: 5 as const, room: "EB-25" },
          ].map((item) => (
            <button
              key={item.cls}
              onClick={() => openTimetable("viva", item.cls)}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#D6E85D] hover:text-[#183F36] text-white/90 text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer border border-white/10"
            >
              <span>Class {item.cls}</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-black/30 font-mono text-[#D6E85D]">
                {item.room}
              </span>
            </button>
          ))}
          <button
            onClick={() => openTimetable("faculty")}
            className="px-2.5 py-1 rounded-lg bg-[#D6E85D]/20 hover:bg-[#D6E85D] hover:text-[#183F36] text-[#D6E85D] text-xs font-bold transition-all shrink-0 flex items-center gap-1 cursor-pointer border border-[#D6E85D]/30 ml-auto"
          >
            <Users className="h-3 w-3" />
            <span>View Faculty Venues</span>
          </button>
        </div>
      </div>

      {/* ── 2-COLUMN MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── LEFT / MAIN CONTENT (~68% width -> lg:col-span-8) ── */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Hero Academic Overview Card — Forest Green & Chartreuse */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#183F36] via-[#12332C] to-[#183F36] text-[#F5F1E8] p-6 sm:p-8 shadow-xl border border-[#1D4A3F]">
            {/* Subtle brand arch pattern accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D6E85D]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#D6E85D]/20 text-[#D6E85D] border border-[#D6E85D]/30 inline-flex items-center gap-1.5 font-display">
                  <Sparkles className="h-3 w-3" />
                  {user ? `Semester ${activeSemester} Active Term` : "Guest / Explorer Mode"}
                </span>
                <span className="text-[10px] text-[#A2BAAF] font-medium hidden sm:inline">
                  ITM (SLS) Baroda University Hub
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F5F1E8] font-display">
                {user ? "Academic Overview" : "Explore University Curriculum"}
              </h2>
              <p className="text-xs sm:text-sm text-[#E8EDE4]/90 leading-relaxed font-normal">
                {user 
                  ? "Access verified syllabus topics, high-yield question banks, or practical codes across B.Tech CSE & BCA. Quietly confident and exam-ready."
                  : "Welcome to ITM Notes! Access verified university notes, solved practical codes (DSA in C & Java), past exam questions, and study calculators across universities."}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate("/materials")}
                  className="px-5 py-2.5 rounded-xl bg-[#D6E85D] hover:bg-[#C8DC47] text-[#183F36] font-bold text-xs shadow-md shadow-[#D6E85D]/20 transition-all hover:scale-102 active:scale-98 flex items-center gap-2 cursor-pointer font-display"
                >
                  <span>{user ? "Explore Course Materials" : "Browse Syllabus Notes"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                {!user && (
                  <button
                    onClick={() => navigate("/auth")}
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-2 cursor-pointer font-display"
                  >
                    <LogIn className="h-3.5 w-3.5 text-[#D6E85D]" />
                    <span>Sign In / Create Account</span>
                  </button>
                )}
              </div>
            </div>

            {/* Subtle Abstract Arch Graphic */}
            <div className="absolute right-4 -bottom-6 sm:bottom-0 opacity-40 pointer-events-none hidden sm:block">
              <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 160V80C40 45 70 20 100 20C130 20 160 45 160 80V160" stroke="#D6E85D" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8" opacity="0.6" />
                <path d="M65 160V90C65 65 80 50 100 50C120 50 135 65 135 90V160" stroke="#FFFFFF" strokeWidth="3" opacity="0.4" />
                <circle cx="100" cy="90" r="12" fill="#D6E85D" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* 2. Core Academic Subjects & Interactive Notes Grid */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-foreground font-display">
                    Core Academic Subjects & Detailed Notes
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#D6E85D]/20 text-[#183F36] dark:text-[#D6E85D] text-[10px] font-bold border border-[#D6E85D]/30">
                    Syllabus 2026
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select any course to read comprehensive unit theory, code implementations, diagrams, and cheat sheets.
                </p>
              </div>

              {/* Semester Filter Tabs & Course Dropdown */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-secondary/60 p-1 rounded-xl border border-border/60">
                  {[
                    { label: "Sem 3 (Core)", val: 3 },
                    { label: "Sem 1", val: 1 },
                    { label: "Sem 2", val: 2 },
                    { label: "All", val: "all" },
                  ].map((item) => {
                    const isActive = subjectSemFilter === item.val;
                    return (
                      <button
                        key={String(item.val)}
                        type="button"
                        onClick={() => setSubjectSemFilter(item.val as any)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                          isActive
                            ? "bg-[#183F36] text-[#D6E85D] font-bold shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                <select 
                  value={selectedCourseFilter}
                  onChange={(e) => setSelectedCourseFilter(e.target.value)}
                  className="h-8 px-2.5 rounded-lg border border-input bg-background text-xs font-semibold text-foreground outline-none cursor-pointer"
                >
                  <option value="all">All Courses</option>
                  <option value="dsa">DSA</option>
                  <option value="dbms">DBMS</option>
                  <option value="ca">Computer Arch</option>
                  <option value="java">Java</option>
                </select>

                <button 
                  onClick={() => navigate("/subjects")}
                  className="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-xs text-primary font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <BookOpen className="h-3 w-3" />
                  <span>All Subjects</span>
                  <ArrowRight className="h-3 w-3" />
                </button>

                <button 
                  onClick={() => navigate("/materials")}
                  className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Materials & PDFs</span>
                  <ExternalLink className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Grid of Subject Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedSubjects.map((sub) => {
                const totalUnits = sub.units?.length || 0;
                const totalTopics = sub.units?.reduce((acc, u) => acc + (u.topics?.length || 0), 0) || 0;
                const allTopicIds = getAllTopicIds(sub.id);
                const userCompletedInSub = progress?.completedTopics?.filter((tid) => allTopicIds.includes(tid))?.length || 0;
                const progressPct = totalTopics > 0 ? Math.round((userCompletedInSub / totalTopics) * 100) : 0;
                const firstTopicId = sub.units?.[0]?.topics?.[0]?.id;

                return (
                  <div
                    key={sub.id}
                    className="group relative rounded-xl border border-border/80 bg-card hover:bg-secondary/20 hover:border-primary/40 transition-all p-4.5 flex flex-col justify-between gap-3.5 shadow-xs"
                  >
                    <div>
                      {/* Top Header Row */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                            {sub.code || "SUB"}
                          </span>
                          <span className="text-[10px] font-semibold text-muted-foreground">
                            Semester {sub.semester}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground flex items-center gap-1">
                          <BookOpen className="h-3 w-3 text-[#D6E85D]" />
                          {totalUnits} Units · {totalTopics} Topics
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                        {sub.name}
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                        {sub.description || "Detailed syllabus notes, algorithmic proofs, diagrams, and exam review questions."}
                      </p>

                      {/* Units Snapshot */}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {sub.units?.slice(0, 3).map((u) => (
                          <span
                            key={u.id}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-foreground/80 font-medium truncate max-w-[180px]"
                            title={u.title}
                          >
                            U{u.number}: {u.title}
                          </span>
                        ))}
                        {totalUnits > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded text-muted-foreground font-semibold">
                            +{totalUnits - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => navigate(`/subject/${sub.id}`)}
                          className="px-3 py-1.5 rounded-lg bg-[#183F36] hover:bg-[#12332C] text-[#F5F1E8] font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer font-display"
                        >
                          <BookOpen className="h-3.5 w-3.5 text-[#D6E85D]" />
                          <span>View Detailed Notes</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => navigate(`/subject/${sub.id}/cheat-sheet`)}
                          className="px-2.5 py-1.5 rounded-lg border border-border text-foreground hover:bg-secondary text-xs font-semibold transition-colors cursor-pointer"
                          title="Quick Formulas & Cheat Sheet"
                        >
                          <span>Cheat Sheet</span>
                        </button>
                      </div>

                      {firstTopicId && (
                        <button
                          type="button"
                          onClick={() => navigate(`/subject/${sub.id}/topic/${firstTopicId}`)}
                          className="text-primary hover:underline font-semibold text-[11px] flex items-center gap-0.5 cursor-pointer"
                          title="Start Topic 1"
                        >
                          <span>Start Unit 1</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Dual Split Row: Shortcuts & Study Progress Activity Curve */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Card: Shortcuts matching Screenshot 1 */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-foreground">Shortcuts</h3>
                  <div className="flex rounded-lg bg-secondary p-0.5 border border-border text-[11px] font-semibold">
                    <button
                      onClick={() => setActiveShortcutTab("overview")}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        activeShortcutTab === "overview" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
                      }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveShortcutTab("tools")}
                      className={`px-2.5 py-1 rounded-md transition-all ${
                        activeShortcutTab === "tools" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
                      }`}
                    >
                      Tools & Docs
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Shortcut 1 */}
                  <div 
                    onClick={() => navigate("/imp-questions")}
                    className="p-3 rounded-xl border border-border/80 bg-secondary/20 hover:bg-secondary/50 cursor-pointer transition-all flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500 shrink-0 mt-0.5">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-foreground truncate">
                        Alternative Tree Tracker Maps Notes...
                      </h4>
                      <p className="text-[11px] text-muted-foreground truncate">
                        Current ITM 2026 - 4 submissions · 18 files updated
                      </p>
                    </div>
                  </div>

                  {/* Shortcut 2 */}
                  <div 
                    onClick={() => openTimetable("viva")}
                    className="p-3 rounded-xl border border-border/80 bg-secondary/20 hover:bg-secondary/50 cursor-pointer transition-all flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 shrink-0 mt-0.5">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-xs text-foreground truncate">
                          Submission Viva & Remedial Timetable
                        </h4>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 font-bold border border-emerald-500/20">
                          ✓ Live Now
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">
                        Oct 26 – Nov 03, 2026 · Classes 1–5 & Remedials
                      </p>
                    </div>
                  </div>

                  {/* Shortcut 3 */}
                  <div 
                    onClick={() => navigate("/calculator")}
                    className="p-3 rounded-xl border border-border/80 bg-secondary/20 hover:bg-secondary/50 cursor-pointer transition-all flex items-start gap-3"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-xs text-foreground truncate">
                        Curriculum Tree Regulations & Attendance
                      </h4>
                      <p className="text-[11px] text-muted-foreground truncate">
                        SLS Baroda University 75% Criteria Calculator
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>3 Shortcuts configured</span>
                <button onClick={() => navigate("/materials")} className="text-primary hover:underline font-semibold text-[11px]">
                  Manage shortcuts
                </button>
              </div>
            </div>

            {/* Right Card: Study Progress with Spline Area Chart matching Screenshot 1 */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-foreground">Study Progress</h3>
                  <span className="text-[11px] text-muted-foreground">
                    {user ? `Level ${levelInfo.level} · ${levelInfo.title}` : "Guest Mode · Level 1"}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black font-mono text-primary">
                    {user ? `${game.xp} XP` : "0 XP"}
                  </span>
                  <span className="text-[10px] text-muted-foreground block">
                    {user ? `🔥 ${game.streakDays}d Streak` : "Sign In to Earn"}
                  </span>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold text-muted-foreground">
                    <span>Syllabus Topics Completed</span>
                    <span className="text-foreground font-mono">
                      {user ? `${completedTopicsCount} Topics` : "Sign in to track"}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full bg-[#D6E85D] rounded-full transition-all duration-500" 
                      style={{ width: user ? `${Math.min(100, Math.max(12, completedTopicsCount * 8))}%` : "15%" }} 
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold text-muted-foreground">
                    <span>Target Academic CGPA</span>
                    <span className="text-foreground font-mono">
                      {profile?.target_cgpa || "8.5+ Target"}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-[#183F36] dark:bg-[#D6E85D] rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold text-muted-foreground">
                    <span>Attendance Safeguard</span>
                    <span className="text-foreground font-mono">75% Mandatory</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-[#267653] dark:bg-[#D6E85D] rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>
              </div>

              {/* Spline Area Chart with Forest Green & Chartreuse */}
              <div className="h-28 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={STUDY_ACTIVITY_DATA}>
                    <defs>
                      <linearGradient id="forestGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#183F36" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#D6E85D" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="#68716B" fontSize={9} tickLine={false} axisLine={false} />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "hsl(var(--card))", 
                        borderColor: "hsl(var(--border))",
                        borderRadius: "0.75rem",
                        fontSize: "11px",
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="hours" 
                      stroke="#183F36" 
                      strokeWidth={2.5}
                      fillOpacity={1} 
                      fill="url(#forestGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (~32% width -> lg:col-span-4) ── */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Study Progress Advice Widget matching Screenshot 1 */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground">Study Progress</h3>
              <div className="flex items-center gap-1 text-muted-foreground">
                <button className="p-1 rounded hover:bg-secondary"><ChevronLeft className="h-4 w-4" /></button>
                <button className="p-1 rounded hover:bg-secondary"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#E8EDE4] dark:bg-[#183F36]/30 border border-[#E0E2D9] dark:border-[#1D4A3F] flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-[#183F36] text-[#D6E85D] shrink-0">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium text-foreground leading-relaxed">
                  Feed your student notes to help improve your grading for mid exams preparation.
                </p>
                <Link to="/materials" className="text-xs text-[#183F36] dark:text-[#D6E85D] font-bold hover:underline inline-block pt-1">
                  Learn more &gt;
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Radial Donut Dual Gauges with Forest Green & Chartreuse */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground">Study Progress</h3>
              <Link to="/calculator" className="text-xs text-primary font-semibold hover:underline">
                View All &gt;
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center py-2">
              {/* Gauge 1: 30% Syllabus */}
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-secondary stroke-current"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#183F36] dark:text-[#D6E85D] stroke-current transition-all duration-1000"
                      strokeDasharray="30, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-xl font-black text-foreground font-mono">30%</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-foreground mt-2">Syllabus Covered</span>
                <span className="text-[10px] text-muted-foreground">Units 1–2 done</span>
              </div>

              {/* Gauge 2: 91% Attendance */}
              <div className="flex flex-col items-center">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-secondary stroke-current"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#267653] dark:text-[#D6E85D] stroke-current transition-all duration-1000"
                      strokeDasharray="91, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-xl font-black text-foreground font-mono">91%</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-foreground mt-2">Attendance</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Above 75% cutoff</span>
              </div>
            </div>
          </div>

          {/* 3. Faculty / Subject Mentors Card — LIVE Verified Mentors */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-foreground">Faculty & Subject Mentors</h3>
                <span className="text-[11px] text-muted-foreground">School of CSET · Active Viva Panel</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                12 Faculty Mentors
              </span>
            </div>

            <div className="space-y-2.5">
              {FACULTY_DIRECTORY.slice(0, 4).map((f) => (
                <div
                  key={f.id}
                  onClick={() => openTimetable("faculty")}
                  className="p-3 rounded-xl border border-border/80 bg-secondary/30 hover:bg-secondary/70 transition-all cursor-pointer flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-[#183F36] text-[#D6E85D] flex items-center justify-center font-bold text-[11px] shrink-0">
                      {f.name.split(" ").slice(1).map((n) => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors truncate">
                        {f.name}
                      </h4>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {f.subjects[0]}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-background border border-border font-mono font-bold text-foreground">
                      {f.vivaRooms[0]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-border/50 flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground font-medium">Venues: NL-2, JAVA LAB, NL-6, EB-39, EB-25</span>
              <button
                type="button"
                onClick={() => openTimetable("faculty")}
                className="px-3 py-1.5 rounded-lg bg-[#183F36] hover:bg-[#12332C] text-white font-bold text-[10px] shadow-sm shadow-[#183F36]/20 transition-all active:scale-95 cursor-pointer font-display flex items-center gap-1"
              >
                <span>All Mentors</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
