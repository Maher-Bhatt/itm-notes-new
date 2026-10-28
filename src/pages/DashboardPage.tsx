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
  Clock,
  ChevronRight,
  FileText,
  Search,
  Plus,
  Trophy,
  Users,
  LogIn,
  Zap,
  Target,
  Shield,
  MapPin,
  Bot,
  Sparkles,
  Calculator,
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
import { openTimetable } from "@/components/GlobalTimetableModal";
import { FACULTY_DIRECTORY } from "@/data/timetableData";
import { StudentContributionModal } from "@/components/StudentContributionModal";

const STUDY_ACTIVITY_DATA = [
  { time: "Mon", hours: 2.5 },
  { time: "Tue", hours: 4.2 },
  { time: "Wed", hours: 3.8 },
  { time: "Thu", hours: 6.0 },
  { time: "Fri", hours: 5.1 },
  { time: "Sat", hours: 7.4 },
  { time: "Sun", hours: 4.8 },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const { semesterNumber } = useAcademic();
  const {
    state: game,
    weeklyGoalDays,
    weeklyStudyDaysCount,
    weeklyGoalPercent,
    streakFreezeCount,
  } = useGamification();
  const { progress } = useProgress();

  const [selectedCourseFilter, setSelectedCourseFilter] = useState("all");
  const [subjectSemFilter, setSubjectSemFilter] = useState<number | "all">(profile?.semester || 3);
  const [aiDoubtOpen, setAiDoubtOpen] = useState(false);
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);

  const studentDisplayName = profile?.display_name || user?.email?.split("@")[0] || null;
  const activeSemester = profile?.semester || semesterNumber || 3;
  const completedTopicsCount = progress?.completedTopics?.length || 0;

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
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1500px] mx-auto space-y-6 fade-in select-none">
      {/* ── TOP STREAMLINED APP BAR ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              {user ? `Semester ${activeSemester} Active Term` : "Guest Preview"}
            </span>
            <span className="text-xs text-muted-foreground/40">·</span>
            <span className="text-xs text-muted-foreground font-medium">ITM SLS Baroda University</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-display">
            {user ? `Welcome back, ${studentDisplayName || "Student"}` : "ITM Student Hub"}
          </h1>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {/* Global Search Shortcut Pill */}
          <button
            type="button"
            onClick={() => {
              const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });
              window.dispatchEvent(event);
            }}
            className="h-10 px-3.5 rounded-xl border border-border bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground text-xs flex items-center gap-2 transition-all press cursor-pointer"
          >
            <Search className="h-3.5 w-3.5 text-muted-foreground" />
            <span>Search topics & codes...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-background text-[10px] font-mono text-muted-foreground border border-border">
              ⌘K
            </kbd>
          </button>

          {!user ? (
            <button
              onClick={() => navigate("/auth")}
              className="h-10 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm press flex items-center gap-2 cursor-pointer"
            >
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </button>
          ) : (
            <button
              onClick={() => setIsContributionModalOpen(true)}
              className="h-10 px-4 rounded-xl bg-secondary/80 hover:bg-secondary border border-border text-foreground font-bold text-xs transition-all press flex items-center gap-2 cursor-pointer"
              title="Contribute student note or cheat sheet (+50 XP)"
            >
              <Plus className="h-4 w-4 text-amber-500" />
              <span>Contribute Sheet</span>
            </button>
          )}
        </div>
      </div>

      {/* ── STREAMLINED LIVE EXAM & VIVA NOTICE (CAMPUSLOOP) ── */}
      <div className="relative overflow-hidden rounded-[22px] border border-[#2B4EFF]/20 bg-[#E6EAFD]/35 dark:bg-blue-950/20 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D7F75B] text-[#111111] flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                Live Notice
              </span>
              <span className="text-xs text-[#2B4EFF] dark:text-blue-300 font-mono font-bold">
                Odd Sem 2026-2027 · Oct 26 – Nov 03
              </span>
              <span className="text-xs text-muted-foreground/50 hidden sm:inline">·</span>
              <span className="text-xs text-[#6B7280] dark:text-neutral-400 hidden sm:inline">
                Venues: NL-2, JAVA LAB, NL-6, EB-39, EB-25
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[#111111] dark:text-white font-display">
              B.Tech Sem 3 Submission Viva & Remedial Exam Schedules
            </h2>
            <p className="text-xs text-[#6B7280] dark:text-neutral-400 leading-relaxed">
              Submissions begin at <strong className="text-foreground">10:00 AM daily</strong>. Check your assigned laboratory venue, faculty evaluator, and prepare the 38 OOPJ remedial solved questions.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => openTimetable("viva")}
              className="px-4 py-2.5 rounded-full bg-[#2B4EFF] hover:bg-[#1E3EDB] text-white font-bold text-xs shadow-xs press flex items-center gap-2 cursor-pointer font-display"
            >
              <Calendar className="h-4 w-4" />
              <span>View Timetables & Venues</span>
            </button>
            <button
              onClick={() => navigate("/imp-questions/oopj")}
              className="px-3.5 py-2.5 rounded-full bg-white dark:bg-[#1C1C1E] hover:bg-neutral-100 text-[#111111] dark:text-white font-bold text-xs border border-[#E8E4DA] dark:border-neutral-800 press flex items-center gap-1.5 cursor-pointer"
              title="Open OOPJ Solved Master Question Bank"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#2B4EFF]" />
              <span>OOPJ Solved Bank</span>
            </button>
          </div>
        </div>

        {/* Minimal Class Quick Venue Jump Pills */}
        <div className="mt-4 pt-3 border-t border-[#2B4EFF]/15 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-[#6B7280] dark:text-neutral-400 uppercase tracking-wider shrink-0">
            Class Venues:
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
              className="px-3 py-1 rounded-full bg-white dark:bg-[#1C1C1E] hover:bg-[#F6F3EC] text-[#111111] dark:text-white font-semibold text-xs border border-[#E8E4DA] dark:border-neutral-800 transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Class {item.cls}</span>
              <span className="text-[10px] font-mono text-neutral-500 bg-neutral-100 dark:bg-neutral-800 px-1 rounded">
                {item.room}
              </span>
            </button>
          ))}
          <button
            onClick={() => openTimetable("faculty")}
            className="px-3 py-1 rounded-full text-[#2B4EFF] dark:text-blue-300 hover:underline text-xs font-bold transition-colors ml-auto shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <Users className="h-3 w-3" />
            <span>Faculty Directory</span>
          </button>
        </div>
      </div>

      {/* ── 2-COLUMN BENTO GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── LEFT / MAIN CONTENT (8 COLS) ── */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Bento Hero Card */}
          <div className="relative overflow-hidden rounded-2xl glass-card border border-border p-6 sm:p-7 shadow-xs">
            <div className="relative z-10 max-w-xl space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 inline-flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Academic Mission
                </span>
                <span className="text-[11px] text-muted-foreground font-medium">
                  Complete your semester syllabus with verified notes
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-foreground font-display">
                Master B.Tech Semester {activeSemester} Curriculum
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {user
                  ? `You have covered ${completedTopicsCount} syllabus topics so far. Review units, practice algorithms, and solve high-yield question banks.`
                  : "Access university course packs, exam question banks, runnable C & Java programs, and attendance calculators."}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => navigate("/subjects")}
                  className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm press flex items-center gap-2 cursor-pointer font-display"
                >
                  <span>Explore Subjects & Units</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => navigate("/imp-questions")}
                  className="px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border press flex items-center gap-2 cursor-pointer"
                >
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  <span>Exam Question Banks</span>
                </button>
              </div>
            </div>
          </div>

          {/* 2. Bento 4-Pill Power Hub (Clean, Zero Blue, Zero Green) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                label: "PYQ Papers",
                desc: "Solved 2024–2026",
                icon: FileText,
                onClick: () => navigate("/pyq-papers"),
                accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
              },
              {
                label: "Mock Exams",
                desc: "90-Min Simulator",
                icon: Trophy,
                onClick: () => navigate("/mock-exam"),
                accent: "text-foreground bg-secondary border-border",
              },
              {
                label: "SGPA Calculator",
                desc: "75% Attendance Guard",
                icon: Calculator,
                onClick: () => navigate("/calculator"),
                accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
              },
              {
                label: "AI Doubt Solver",
                desc: "Instant Answers",
                icon: Bot,
                onClick: () => setAiDoubtOpen(true),
                accent: "text-foreground bg-secondary border-border",
              },
            ].map((tool) => (
              <button
                key={tool.label}
                onClick={tool.onClick}
                className="p-3.5 rounded-xl glass-card-hover flex flex-col justify-between text-left press cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center border ${tool.accent}`}>
                    <tool.icon className="h-4 w-4" />
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-foreground group-hover:text-amber-500 transition-colors">
                    {tool.label}
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{tool.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* 3. Core Academic Subjects & Detailed Notes Bento */}
          <div className="glass-card border border-border rounded-2xl p-6 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-foreground font-display">
                    Course Packs & Detailed Notes
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-muted-foreground text-[10px] font-bold border border-border">
                    Syllabus 2026
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select any subject to read unit theory, runnable practical programs, and exam questions.
                </p>
              </div>

              {/* Minimal Clean Filter Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 bg-secondary/60 p-1 rounded-xl border border-border">
                  {[
                    { label: "Sem 3", val: 3 },
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
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "bg-primary text-primary-foreground font-bold shadow-xs"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
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
                  className="h-8 px-2.5 rounded-xl border border-border bg-background text-xs font-semibold text-foreground outline-none cursor-pointer"
                >
                  <option value="all">All Topics</option>
                  <option value="dsa">Data Structures</option>
                  <option value="dbms">DBMS</option>
                  <option value="ca">Computer Arch</option>
                  <option value="java">Java OOP</option>
                </select>
              </div>
            </div>

            {/* Grid of Subject Bento Cards (Clickable, Adaptive Light/Dark) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedSubjects.map((sub) => {
                const totalUnits = sub.units?.length || 0;
                const totalTopics = sub.units?.reduce((acc, u) => acc + (u.topics?.length || 0), 0) || 0;
                const allTopicIds = getAllTopicIds(sub.id);
                const userCompletedInSub = progress?.completedTopics?.filter((tid) => allTopicIds.includes(tid))?.length || 0;
                const progressPct = totalTopics > 0 ? Math.round((userCompletedInSub / totalTopics) * 100) : 0;

                return (
                  <div
                    key={sub.id}
                    onClick={() => navigate(`/subject/${sub.id}`)}
                    className="group rounded-xl border border-border bg-card hover:bg-secondary/40 hover:border-amber-500/40 transition-all p-5 flex flex-col justify-between gap-4 card-lift press cursor-pointer shadow-xs"
                  >
                    <div>
                      {/* Top Row: Code & Counts */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            {sub.code || "SUB"}
                          </span>
                          <span className="text-[10px] font-semibold text-muted-foreground">
                            Sem {sub.semester}
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {totalUnits} Units · {totalTopics} Topics
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-foreground group-hover:text-amber-500 transition-colors leading-snug">
                        {sub.name}
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                        {sub.description || "Detailed syllabus notes, algorithmic proofs, diagrams, and exam review questions."}
                      </p>

                      {/* Units Snapshot */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {sub.units?.slice(0, 3).map((u) => (
                          <span
                            key={u.id}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-foreground/80 font-medium truncate max-w-[170px]"
                            title={u.title}
                          >
                            U{u.number}: {u.title}
                          </span>
                        ))}
                        {totalUnits > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded text-muted-foreground font-semibold">
                            +{totalUnits - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Footer: Progress & 1 Clean Action */}
                    <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-1 max-w-[140px]">
                        <div className="h-1.5 flex-1 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground">{progressPct}%</span>
                      </div>

                      <span className="text-xs font-bold text-foreground group-hover:text-amber-500 group-hover:translate-x-1 transition-all flex items-center gap-1 font-display">
                        <span>Open Course</span>
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Weekly Study Momentum & Hours (Clean Area Chart in Warm Amber) */}
          <div className="glass-card border border-border rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-foreground font-display">Study Momentum & Hours</h3>
                <span className="text-[11px] text-muted-foreground">Weekly study activity across topics & quizzes</span>
              </div>
              <div className="text-right">
                <span className="text-base font-black font-mono text-amber-500">
                  {user ? `${game.xp} XP` : "0 XP"}
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  {user ? `🔥 ${game.streakDays} Day Streak` : "Sign In to Track"}
                </span>
              </div>
            </div>

            <div className="h-32 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={STUDY_ACTIVITY_DATA}>
                  <defs>
                    <linearGradient id="amberGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis hide domain={[0, 10]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.75rem",
                      fontSize: "11px",
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="hours"
                    stroke="#f59e0b"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#amberGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (4 COLS) ── */}
        <div className="lg:col-span-4 space-y-6">
          {/* Tile 1: Next Up (Today's Class & Venue) */}
          <div className="glass-card border border-border rounded-2xl p-6 space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500" />
                <h3 className="font-bold text-sm text-foreground font-display">Today's Class Schedule</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-foreground border border-border">
                {profile?.division || "Div A"}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-secondary/50 border border-border flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-card text-foreground border border-border shrink-0 mt-0.5 shadow-xs">
                <MapPin className="h-4 w-4 text-amber-500" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">10:30 AM · LECTURE</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-card text-foreground font-semibold border border-border">
                    {profile?.division?.includes("D") ? "EB-39" : profile?.division?.includes("E") ? "EB-25" : profile?.division?.includes("B") ? "EB-16" : profile?.division?.includes("C") ? "EB-20" : "EB-15"}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-foreground truncate mt-0.5">
                  Database Management Systems
                </h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Room {profile?.division?.includes("D") ? "EB-39" : profile?.division?.includes("E") ? "EB-25" : profile?.division?.includes("B") ? "EB-16" : profile?.division?.includes("C") ? "EB-20" : "EB-15"} · Prof. Raju Nakum
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <Link
                to="/today"
                className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline flex items-center gap-1 press"
              >
                <span>Full Daily Mission</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <button
                type="button"
                onClick={() => openTimetable("viva")}
                className="text-[11px] text-muted-foreground hover:text-foreground press cursor-pointer"
              >
                All Timetables
              </button>
            </div>
          </div>

          {/* Tile 2: Weekly Target & Streak Momentum */}
          <div className="glass-card border border-border rounded-2xl p-6 space-y-3.5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-amber-500" />
                <h3 className="font-bold text-sm text-foreground font-display">Weekly Study Target</h3>
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
                <div
                  className="h-full bg-gradient-amber rounded-full transition-all duration-500"
                  style={{ width: `${weeklyGoalPercent}%` }}
                />
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-amber-500" />
                <span className="font-semibold text-foreground">Streak Freezes</span>
              </div>
              <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                {streakFreezeCount} Available
              </span>
            </div>
          </div>

          {/* Tile 3: Academic Safeguards (Clean Dual Radial Gauges) */}
          <div className="glass-card border border-border rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground font-display">Academic Safeguards</h3>
              <Link to="/calculator" className="text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline press">
                Calculator &gt;
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center py-2">
              {/* Gauge 1: Syllabus */}
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-secondary stroke-current"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-foreground stroke-current transition-all duration-1000"
                      strokeDasharray="30, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-base font-black text-foreground font-mono">30%</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-foreground mt-2">Syllabus Covered</span>
                <span className="text-[10px] text-muted-foreground font-semibold">Units 1–2 done</span>
              </div>

              {/* Gauge 2: Attendance */}
              <div className="flex flex-col items-center">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-secondary stroke-current"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-amber-500 stroke-current transition-all duration-1000"
                      strokeDasharray="91, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-base font-black text-foreground font-mono">91%</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-foreground mt-2">Attendance</span>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">Above 75% cutoff</span>
              </div>
            </div>
          </div>

          {/* Tile 4: Faculty & Subject Mentors */}
          <div className="glass-card border border-border rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-foreground font-display">Faculty Mentors</h3>
                <span className="text-[11px] text-muted-foreground">Active Viva Panel & Lab Venues</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-secondary text-foreground border border-border">
                12 Faculty
              </span>
            </div>

            <div className="space-y-2">
              {FACULTY_DIRECTORY.slice(0, 3).map((f) => (
                <div
                  key={f.id}
                  onClick={() => openTimetable("faculty")}
                  className="p-3 rounded-xl border border-border bg-card hover:bg-secondary transition-all cursor-pointer flex items-center justify-between gap-3 group press"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-[10px] shrink-0 font-display">
                      {f.name.split(" ").slice(1).map((n) => n[0]).join("")}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs text-foreground group-hover:text-amber-500 transition-colors truncate">
                        {f.name}
                      </h4>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {f.subjects[0]}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-secondary border border-border font-mono font-bold text-foreground shrink-0">
                    {f.vivaRooms[0]}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openTimetable("faculty")}
              className="w-full py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-foreground font-bold text-xs flex items-center justify-center gap-1.5 transition-all press cursor-pointer"
            >
              <span>View All 12 Mentors & Venues</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            </button>
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
