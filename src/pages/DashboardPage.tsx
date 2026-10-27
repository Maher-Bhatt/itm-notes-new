import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";
import { useAcademic } from "@/contexts/AcademicContext";
import { subjects, getAllTopicIds } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import {
  BookOpen,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  ChevronLeft,
  ExternalLink,
  FileText,
  Search,
  Plus,
  ChevronRight,
  TrendingUp,
  Award,
  Trophy,
  Layers,
  Flame,
  CheckCircle2,
  Users,
  LogIn,
  Code2,
  Zap,
  Bookmark,
  Target,
  Shield,
  MapPin,
  Bot,
  Sparkles,
} from "lucide-react";
import { AiDoubtSolverModal } from "@/components/AiDoubtSolverModal";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { toast } from "sonner";
import { openTimetable } from "@/components/GlobalTimetableModal";
import { FACULTY_DIRECTORY } from "@/data/timetableData";
import { StudentContributionModal } from "@/components/StudentContributionModal";

// Actionable Study Advice Carousel Tips
const STUDY_ADVICE_TIPS = [
  {
    icon: BookOpen,
    text: "Feed your student notes to help improve your grading for mid-exam preparation.",
    linkText: "Learn more >",
    linkTo: "/materials",
  },
  {
    icon: Flame,
    text: "Review the OOPJ Remedial Question Bank — all 38 solved questions with output traces.",
    linkText: "Open Solved Bank >",
    linkTo: "/imp-questions/oopj",
  },
  {
    icon: Target,
    text: "Keep attendance safely above 75% to avoid exam debarment — check your buffer count.",
    linkText: "Check Attendance >",
    linkTo: "/calculator",
  },
  {
    icon: Zap,
    text: "Practice 10 daily MCQs to build your streak, earn XP, and unlock rank badges.",
    linkText: "Start Quiz >",
    linkTo: "/quiz",
  },
];

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
  const {
    state: game,
    levelInfo,
    weeklyGoalDays,
    weeklyStudyDaysCount,
    weeklyGoalPercent,
    streakFreezeCount,
  } = useGamification();
  const { progress } = useProgress();

  const [activeShortcutTab, setActiveShortcutTab] = useState<"overview" | "tools">("overview");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("all");
  const [subjectSemFilter, setSubjectSemFilter] = useState<number | "all">(profile?.semester || 3);
  const [aiDoubtOpen, setAiDoubtOpen] = useState(false);
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const [adviceIndex, setAdviceIndex] = useState(0);

  const studentDisplayName = profile?.display_name || user?.email?.split("@")[0] || null;
  const activeSemester = profile?.semester || semesterNumber || 3;
  const completedTopicsCount = progress?.completedTopics?.length || 0;
  const totalModulesCount = 8;
  const completedModulesCount = user ? Math.min(totalModulesCount, Math.round(completedTopicsCount / 2)) : 0;

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
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 fade-in">
      {/* ── TOP HEADER SECTION ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border/60">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
            {user ? `Welcome back, ${studentDisplayName || "Student"}` : "ITM Notes Student Dashboard"}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium truncate">
            {user
              ? `Student Dashboard · Active Enrollment (Semester ${activeSemester} · ${profile?.branch ? profile.branch.split(" ")[0] : "CS"})`
              : "Open Knowledge Repository · Semester 1 to 4 Course Packs & Practicals"}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap shrink-0">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search topics..."
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', ctrlKey: true });
                window.dispatchEvent(event);
              }}
              readOnly
              className="h-9 pl-8 pr-3 w-full sm:w-56 rounded-lg border border-input bg-card text-xs focus:outline-none cursor-pointer"
            />
          </div>

          {!user ? (
            <button
              onClick={() => navigate("/auth")}
              className="h-9 px-4 rounded-lg bg-primary text-primary-foreground font-bold text-xs shadow-sm shadow-primary/20 press"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          ) : (
            <button
              onClick={() => setIsContributionModalOpen(true)}
              className="h-9 px-4 rounded-lg bg-accent text-accent-foreground font-bold text-xs shadow-sm shadow-accent/20 press chartreuse"
              title="Contribute student note or cheat sheet (+50 XP)"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Sheet</span>
            </button>
          )}
        </div>
      </div>

      {/* ── OFFICIAL EXAM & VIVA ALERT BANNER ── */}
      <div className="relative overflow-hidden rounded-xl border border-forest/30 bg-forest text-ivory p-5 sm:p-6 shadow-card">
        <div className="absolute right-0 top-0 w-72 h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--itm-chartreuse)]/20 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-chartreuse text-forest shadow-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-forest animate-ping" />
                Notice Live
              </span>
              <span className="text-xs text-chartreuse-foreground font-mono font-bold">
                Odd Sem 2026-2027 · Oct 26 – Nov 03
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-black text-white font-display">
              B.Tech Sem 3 Submission Viva & Remedial Examinations
            </h2>
            <p className="text-xs text-[var(--itm-surface-green)] leading-relaxed max-w-2xl">
              Practical file submissions & viva start <strong className="text-white">10:00 AM onwards</strong>. Check your assigned location (NL-2, JAVA LAB, NL-6, EB-39, EB-25) and subject faculty.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openTimetable("viva")}
              className="px-4 py-2.5 rounded-lg bg-chartreuse text-forest font-black text-xs shadow-sm shadow-accent/20 press flex items-center gap-2 cursor-pointer font-display"
            >
              <Calendar className="h-4 w-4" />
              <span>Open Timetables</span>
            </button>
            <button
              onClick={() => openTimetable("remedial")}
              className="px-3.5 py-2.5 rounded-lg bg-secondary/60 hover:bg-secondary text-forest font-bold text-xs border border-border/80 press flex items-center gap-1.5 cursor-pointer font-display"
            >
              <span>Remedials</span>
            </button>
            <button
              onClick={() => navigate("/imp-questions/oopj")}
              className="px-3.5 py-2.5 rounded-lg bg-chartreuse/20 hover:bg-chartreuse hover:text-forest text-forest font-bold text-xs border border-chartreuse/30 press flex items-center gap-1.5 cursor-pointer font-display"
              title="Open OOPJ (C2311C1) Solved Master Question Bank"
            >
              <BookOpen className="h-3.5 w-3.5 text-forest" />
              <span className="hidden sm:inline">OOPJ Solved Bank</span>
              <span className="sm:hidden">OOPJ</span>
            </button>
          </div>
        </div>

        {/* Quick Cohort Class Jump Pills */}
        <div className="mt-4 pt-3 border-t border-white/15 flex items-center gap-2 overflow-x-auto no-scrollbar relative z-10">
          <span className="text-[11px] font-bold text-[var(--itm-surface-green)] uppercase tracking-wider shrink-0">
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
              className="px-2.5 py-1 rounded-lg bg-secondary/60 hover:bg-secondary text-forest font-semibold border border-border/80 transition-all shrink-0 flex items-center gap-1.5 cursor-pointer press"
            >
              <span>Class {item.cls}</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-border font-mono text-muted-foreground/80">
                {item.room}
              </span>
            </button>
          ))}
          <button
            onClick={() => openTimetable("faculty")}
            className="px-2.5 py-1 rounded-lg bg-accent text-accent-foreground font-bold text-xs shadow-sm shadow-accent/20 press flex items-center gap-1 cursor-pointer font-display ml-auto"
          >
            <Users className="h-3 w-3 text-accent-foreground" />
            <span>View Faculty Venues</span>
          </button>
        </div>
      </div>

      {/* ── 2-COLUMN MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── LEFT / MAIN CONTENT ── */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Hero Academic Overview Card */}
          <div className="relative overflow-hidden rounded-xl border border-forest/30 bg-forest text-ivory p-6 sm:p-8 shadow-card">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--itm-chartreuse)]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-chartreuse/20 text-chartreuse-foreground border border-chartreuse/30 inline-flex items-center gap-1.5 font-display">
                  <Sparkles className="h-3 w-3" />
                  {user ? `Semester ${activeSemester} Active Term` : "Guest / Explorer Mode"}
                </span>
                <span className="text-[10px] text-[var(--itm-surface-green)] font-medium hidden sm:inline">
                  ITM (SLS) Baroda University Hub
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ivory font-display">
                {user ? "Academic Overview" : "Explore University Curriculum"}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--itm-surface-green)]/90 leading-relaxed font-normal">
                {user
                  ? "Access verified syllabus topics, high-yield question banks, and practical codes across B.Tech CSE & BCA. Quietly confident and exam-ready."
                  : "Welcome to ITM Notes! Access verified university notes, solved practical codes (DSA in C & Java), past exam questions, and study calculators across universities."}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate("/materials")}
                  className="px-5 py-2.5 rounded-lg bg-chartreuse text-forest font-bold text-xs shadow-sm shadow-accent/20 transition-all hover:bg-[var(--itm-chartreuse-hover)] press flex items-center gap-2 cursor-pointer font-display"
                >
                  <span>{user ? "Explore Course Materials" : "Browse Syllabus Notes"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                {!user && (
                  <button
                    onClick={() => navigate("/auth")}
                    className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 press flex items-center gap-2 cursor-pointer font-display"
                  >
                    <LogIn className="h-3.5 w-3.5 text-chartreuse-foreground" />
                    <span>Sign In / Create Account</span>
                  </button>
                )}
              </div>
            </div>

            <div className="absolute right-4 -bottom-6 sm:bottom-0 opacity-40 pointer-events-none hidden sm:block">
              <svg width="200" height="160" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40 160V80C40 45 70 20 100 20C130 20 160 45 160 80V160" stroke="var(--itm-chartreuse)" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8" opacity="0.6" />
                <path d="M65 160V90C65 65 80 50 100 50C120 50 135 65 135 90V160" stroke="#FFFFFF" strokeWidth="3" opacity="0.4" />
                <circle cx="100" cy="90" r="12" fill="var(--itm-chartreuse)" opacity="0.8" />
              </svg>
            </div>
          </div>

          {/* Quick Academic Power Tools Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {[
              {
                label: "AI Doubt Solver",
                desc: "Ask 2 AM exam queries",
                icon: Bot,
                badge: "24/7",
                badgeColor: "bg-success/15 text-success-foreground",
                iconBg: "bg-primary/10 text-primary",
                onClick: () => setAiDoubtOpen(true),
              },
              {
                label: "PYQ Papers",
                desc: "Real GTU/ITM papers",
                icon: FileText,
                badge: "SOLVED",
                badgeColor: "bg-warning/15 text-warning-foreground",
                iconBg: "bg-warning/10 text-warning-foreground",
                onClick: () => navigate("/pyq-papers"),
              },
              {
                label: "Mock Exams",
                desc: "90-min test simulator",
                icon: Trophy,
                badge: "TIMED",
                badgeColor: "bg-primary/15 text-primary-foreground",
                iconBg: "bg-primary/10 text-primary",
                onClick: () => navigate("/mock-exam"),
              },
              {
                label: "Study Planner",
                desc: "Exam target roadmap",
                icon: Calendar,
                badge: "AUTO",
                badgeColor: "bg-primary/15 text-primary-foreground",
                iconBg: "bg-primary/10 text-primary",
                onClick: () => navigate("/study-planner"),
              },
              {
                label: "Rapid Revision",
                desc: "High-yield cram cards",
                icon: Zap,
                badge: "30 MIN",
                badgeColor: "bg-primary/15 text-primary-foreground",
                iconBg: "bg-primary/10 text-primary",
                onClick: () => navigate("/rapid-revision"),
              },
              {
                label: "Formula Bank",
                desc: "Searchable definitions",
                icon: BookOpen,
                badge: "KaTeX",
                badgeColor: "bg-success/15 text-success-foreground",
                iconBg: "bg-success/10 text-success-foreground",
                onClick: () => navigate("/formulas"),
              },
            ].map((tool, idx) => (
              <button
                key={tool.label}
                onClick={tool.onClick}
                className="p-3 rounded-xl paper-hover flex flex-col justify-between card-lift group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${tool.iconBg}`}>
                    <tool.icon className="h-4 w-4" />
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${tool.badgeColor}`}>
                    {tool.badge}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                    {tool.label}
                  </h4>
                  <p className="text-[10px] text-muted-foreground">{tool.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* 2. Core Academic Subjects & Interactive Notes Grid */}
          <div className="paper rounded-xl p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-foreground font-display">
                    Core Academic Subjects & Detailed Notes
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-chartreuse/20 text-forest text-[10px] font-bold border border-chartreuse/30">
                    Syllabus 2026
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select any course to read comprehensive unit theory, code implementations, diagrams, and cheat sheets.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-secondary/60 p-1 rounded-lg border border-border/60">
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
                            ? "bg-forest text-chartreuse-foreground font-bold shadow-xs"
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
                  className="px-2.5 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-xs text-primary font-semibold flex items-center gap-1 transition-colors press"
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
                    className="group relative rounded-lg border border-border bg-card hover:bg-secondary/20 hover:border-primary/30 transition-all p-4.5 flex flex-col justify-between gap-3.5 shadow-sm card-lift press"
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
                          <BookOpen className="h-3 w-3 text-chartreuse-foreground" />
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
                          className="px-3 py-1.5 rounded-lg bg-forest hover:bg-forest-deep text-ivory font-bold text-xs shadow-xs press flex items-center gap-1.5 cursor-pointer font-display"
                        >
                          <BookOpen className="h-3.5 w-3.5 text-chartreuse-foreground" />
                          <span>View Detailed Notes</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => navigate(`/subject/${sub.id}/cheat-sheet`)}
                          className="px-2.5 py-1.5 rounded-lg border border-border text-foreground hover:bg-secondary text-xs font-semibold transition-colors cursor-pointer press"
                          title="Quick Formulas & Cheat Sheet"
                        >
                          <span>Cheat Sheet</span>
                        </button>
                      </div>

                      {firstTopicId && (
                        <button
                          type="button"
                          onClick={() => navigate(`/subject/${sub.id}/topic/${firstTopicId}`)}
                          className="text-primary hover:underline font-semibold text-[11px] flex items-center gap-0.5 cursor-pointer press"
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
            {/* Left Card: Shortcuts */}
            <div className="paper rounded-xl p-5 flex flex-col justify-between">
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
                  {[
                    {
                      title: "Alternative Tree Tracker Maps Notes",
                      desc: "Current ITM 2026 - 4 submissions · 18 files updated",
                      icon: FileText,
                      color: "bg-warning/10 text-warning-foreground",
                      onClick: () => navigate("/imp-questions"),
                    },
                    {
                      title: "Submission Viva & Remedial Timetable",
                      desc: "Oct 26 – Nov 03, 2026 · Classes 1–5 & Remedials",
                      icon: Calendar,
                      color: "bg-success/10 text-success-foreground",
                      badge: "Live Now",
                      badgeColor: "bg-success/20 text-success-foreground border border-success/30",
                      onClick: () => openTimetable("viva"),
                    },
                    {
                      title: "Curriculum Tree Regulations & Attendance",
                      desc: "SLS Baroda University 75% Criteria Calculator",
                      icon: CheckCircle2,
                      color: "bg-success/10 text-success-foreground",
                      onClick: () => navigate("/calculator"),
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      onClick={item.onClick}
                      className="p-3 rounded-lg border border-border/80 bg-secondary/20 hover:bg-secondary/50 cursor-pointer transition-all flex items-start gap-3 press"
                    >
                      <div className={`p-2 rounded-lg ${item.color} shrink-0 mt-0.5`}>
                        <item.icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-foreground truncate">{item.title}</h4>
                          {item.badge && (
                            <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${item.badgeColor}`}>
                              ✓ {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>3 Shortcuts configured</span>
                <button onClick={() => navigate("/materials")} className="text-primary hover:underline font-semibold text-[11px] press">
                  Manage shortcuts
                </button>
              </div>
            </div>

            {/* Right Card: Study Progress with Area Chart */}
            <div className="paper rounded-xl p-5 space-y-4">
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
                      className="h-full bg-chartreuse rounded-full transition-all duration-500"
                      style={{ width: user ? `${Math.min(100, Math.max(12, completedTopicsCount * 8))}%` : "15%" }} />
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
                    <div className="h-full bg-forest dark:bg-chartreuse rounded-full" style={{ width: "85%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1 font-semibold text-muted-foreground">
                    <span>Attendance Safeguard</span>
                    <span className="text-foreground font-mono">75% Mandatory</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-success dark:bg-chartreuse rounded-full" style={{ width: "88%" }} />
                  </div>
                </div>
              </div>

              {/* Area Chart */}
              <div className="h-28 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={STUDY_ACTIVITY_DATA}>
                    <defs>
                      <linearGradient id="forestGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--itm-forest)" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="var(--itm-chartreuse)" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" stroke="var(--itm-muted)" fontSize={9} tickLine={false} axisLine={false} />
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
                      stroke="var(--itm-forest)"
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

        {/* ── RIGHT COLUMN ── */}
        <div className="lg:col-span-4 space-y-6">
          {/* Today's Schedule & Next Class Card */}
          <div className="paper rounded-xl p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <h3 className="font-bold text-sm text-foreground">Today's Schedule</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {profile?.division || "Div A"}
              </span>
            </div>

            <div className="p-3.5 rounded-lg bg-secondary/40 border border-border/80 flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-primary/15 text-primary shrink-0 mt-0.5">
                <Clock className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono font-bold text-primary">10:30 AM · LECTURE</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-black/20 text-muted-foreground">
                    {profile?.division?.includes('D') ? 'EB-39' : profile?.division?.includes('E') ? 'EB-25' : profile?.division?.includes('B') ? 'EB-16' : profile?.division?.includes('C') ? 'EB-20' : 'EB-15'}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-foreground truncate mt-0.5">
                  Database Management Systems
                </h4>
                <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="h-3 w-3" />
                  <span>Room {profile?.division?.includes('D') ? 'EB-39' : profile?.division?.includes('E') ? 'EB-25' : profile?.division?.includes('B') ? 'EB-16' : profile?.division?.includes('C') ? 'EB-20' : 'EB-15'} · Prof. Hardik Vyas</span>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <Link
                to="/today"
                className="text-xs text-primary font-bold hover:underline flex items-center gap-1 press"
              >
                <span>Open Today's Mission & Schedule</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <button
                type="button"
                onClick={() => openTimetable("viva")}
                className="text-[11px] text-muted-foreground hover:text-foreground press"
              >
                All Timetables
              </button>
            </div>
          </div>

          {/* Weekly Study Goal & Streak Freeze Card */}
          <div className="paper rounded-xl p-5 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                <h3 className="font-bold text-sm text-foreground">Weekly Target</h3>
              </div>
              <span className="text-[10px] font-mono font-bold text-muted-foreground">
                {weeklyStudyDaysCount} / {weeklyGoalDays} days
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-medium text-muted-foreground">
                <span>Progress: {weeklyGoalPercent}%</span>
                <span>{weeklyStudyDaysCount >= weeklyGoalDays ? "Goal Met! 🎯" : `${weeklyGoalDays - weeklyStudyDaysCount} days left`}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${weeklyGoalPercent}%` }} />
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="font-semibold text-foreground">Streak Freezes</span>
              </div>
              <span className="font-mono font-bold text-primary">
                {streakFreezeCount} Available
              </span>
            </div>
          </div>

          {/* Study Progress Advice Carousel Widget */}
          {(() => {
            const currentTip = STUDY_ADVICE_TIPS[adviceIndex % STUDY_ADVICE_TIPS.length];
            const TipIcon = currentTip.icon;
            return (
              <div className="paper rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-foreground">Study Progress</h3>
                    <div className="flex items-center gap-1">
                      {STUDY_ADVICE_TIPS.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          type="button"
                          onClick={() => setAdviceIndex(dotIdx)}
                          className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                            dotIdx === adviceIndex ? "bg-primary w-3" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                          }`}
                          aria-label={`Go to tip ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => setAdviceIndex((prev) => (prev > 0 ? prev - 1 : STUDY_ADVICE_TIPS.length - 1))}
                      className="p-1 rounded hover:bg-secondary cursor-pointer transition-colors press"
                      title="Previous Study Tip"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setAdviceIndex((prev) => (prev + 1) % STUDY_ADVICE_TIPS.length)}
                      className="p-1 rounded hover:bg-secondary cursor-pointer transition-colors press"
                      title="Next Study Tip"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[var(--itm-surface-green)] dark:bg-forest/30 border border-[var(--itm-border)] dark:border-[var(--itm-surface-green)]/30 flex items-start gap-3 transition-all">
                  <div className={`p-2.5 rounded-lg bg-forest text-chartreuse-foreground shrink-0`}>
                    <TipIcon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-foreground leading-relaxed">
                      {currentTip.text}
                    </p>
                    <Link to={currentTip.linkTo} className="text-xs text-forest dark:text-sidebar-primary font-bold hover:underline inline-block pt-1 press">
                      {currentTip.linkText}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Radial Donut Dual Gauges */}
          <div className="paper rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground">Study Progress</h3>
              <Link to="/calculator" className="text-xs text-primary font-semibold hover:underline press">
                View All &gt;
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center py-2">
              {/* Gauge 1: Syllabus */}
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
                      className="text-forest dark:text-chartreuse stroke-current transition-all duration-1000"
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

              {/* Gauge 2: Attendance */}
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
                      className="text-success dark:text-chartreuse stroke-current transition-all duration-1000"
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
                <span className="text-[10px] text-success-foreground font-semibold">Above 75% cutoff</span>
              </div>
            </div>
          </div>

          {/* Faculty & Subject Mentors Card */}
          <div className="paper rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-foreground">Faculty & Subject Mentors</h3>
                <span className="text-[11px] text-muted-foreground">School of CSET · Active Viva Panel</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-success/10 text-success-foreground border border-success/20">
                12 Faculty Mentors
              </span>
            </div>

            <div className="space-y-2.5">
              {FACULTY_DIRECTORY.slice(0, 4).map((f) => (
                <div
                  key={f.id}
                  onClick={() => openTimetable("faculty")}
                  className="p-3 rounded-lg border border-border/80 bg-secondary/30 hover:bg-secondary/70 transition-all cursor-pointer flex items-center justify-between gap-3 group press"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-forest text-chartreuse-foreground flex items-center justify-center font-bold text-[11px] shrink-0">
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
                className="px-3 py-1.5 rounded-lg bg-forest hover:bg-forest-deep text-white font-bold text-[10px] shadow-sm shadow-forest/20 press flex items-center gap-1 cursor-pointer font-display"
              >
                <span>All Mentors</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Syllabus Doubt Solver Modal */}
      <AiDoubtSolverModal
        isOpen={aiDoubtOpen}
        onClose={() => setAiDoubtOpen(false)}
      />

      {/* Student Note & Sheet Contribution Modal */}
      <StudentContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => setIsContributionModalOpen(false)}
      />
    </div>
  );
}
