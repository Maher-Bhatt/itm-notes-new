import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";
import { useAcademic } from "@/contexts/AcademicContext";
import { useUniversity } from "@/contexts/UniversityContext";
import { subjects, getAllTopicIds, isBcaSubject, isBtechSubject } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import { LibraryHighlights } from "@/components/LibraryHighlights";
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
  const { currentUniversity, activeTimetable } = useUniversity();
  const {
    state: game,
    weeklyGoalDays,
    weeklyStudyDaysCount,
    weeklyGoalPercent,
    streakFreezeCount,
  } = useGamification();
  const { progress } = useProgress();

  const studentDisplayName = profile?.display_name || user?.email?.split("@")[0] || null;
  const activeSemester = profile?.semester || semesterNumber || 3;
  const completedTopicsCount = progress?.completedTopics?.length || 0;

  // Degree Program Filter: defaults strictly to user's enrolled degree (B.Tech or BCA)
  const userEnrolledDegree = useMemo(() => {
    return profile?.program?.toLowerCase().includes("bca") ? "bca" : "btech";
  }, [profile?.program]);

  const [selectedDegreeFilter, setSelectedDegreeFilter] = useState<"btech" | "bca" | "all">(userEnrolledDegree);
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("all");
  const [subjectSemFilter, setSubjectSemFilter] = useState<number | "all">(profile?.semester || 3);
  const [aiDoubtOpen, setAiDoubtOpen] = useState(false);
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);

  // Sync degree when profile loads
  useEffect(() => {
    if (profile?.program) {
      const deg = profile.program.toLowerCase().includes("bca") ? "bca" : "btech";
      setSelectedDegreeFilter(deg);
    }
  }, [profile?.program]);

  // Sync semester when profile loads
  useEffect(() => {
    if (profile?.semester) {
      setSubjectSemFilter(profile.semester);
    }
  }, [profile?.semester]);

  // Available subjects matching selected degree and semester for the subject dropdown filter
  const availableSubjectsForFilter = useMemo(() => {
    return subjects.filter((s) => {
      const isBca = isBcaSubject(s);
      if (selectedDegreeFilter === "btech" && isBca) return false;
      if (selectedDegreeFilter === "bca" && !isBca) return false;
      if (subjectSemFilter !== "all" && s.semester !== subjectSemFilter) return false;
      return true;
    });
  }, [selectedDegreeFilter, subjectSemFilter]);

  // Final displayed subjects list strictly filtering out unauthorized degrees
  const displayedSubjects = useMemo(() => {
    return subjects.filter((s) => {
      const isBca = isBcaSubject(s);
      if (selectedDegreeFilter === "btech" && isBca) return false;
      if (selectedDegreeFilter === "bca" && !isBca) return false;
      if (subjectSemFilter !== "all" && s.semester !== subjectSemFilter) return false;

      if (selectedCourseFilter !== "all") {
        if (s.id !== selectedCourseFilter) return false;
      }
      return true;
    });
  }, [selectedDegreeFilter, subjectSemFilter, selectedCourseFilter]);

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-[1400px] mx-auto space-y-8 fade-in">
      {/* ── HERO: continue learning, search, exam stats, subjects ── */}
      <LibraryHighlights name={user ? studentDisplayName || undefined : undefined} streakDays={user ? game.streakDays : 0} />

      {/* ── ONBOARDING BANNER (If incomplete) ── */}
      {user && profile && !profile.onboarding_completed && (
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-accent/15 to-transparent p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground dark:text-white">
                Complete your CampusLoop student onboarding
              </h3>
              <p className="text-xs text-stone-500">
                Select your Indian university, engineering branch, and section to get personalized timetables and notes.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/onboarding")}
            className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary text-white text-xs font-bold shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Complete Setup</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ── STREAMLINED LIVE EXAM & VIVA NOTICE (CAMPUSLOOP) ── */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 dark:bg-primary/20 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent text-foreground flex items-center gap-1.5 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
                Live Notice
              </span>
              <span className="text-xs text-primary dark:text-primary font-mono font-bold">
                Odd Sem 2026-2027 · Oct 26 – Nov 03
              </span>
              <span className="text-xs text-muted-foreground/50 hidden sm:inline">·</span>
              <span className="text-xs text-muted-foreground dark:text-stone-400 hidden sm:inline">
                Venues: NL-2, JAVA LAB, NL-6, EB-39, EB-25
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-foreground dark:text-white font-display">
              B.Tech Sem 3 Submission Viva & Remedial Exam Schedules
            </h2>
            <p className="text-xs text-muted-foreground dark:text-stone-400 leading-relaxed">
              Submissions begin at <strong className="text-foreground">10:00 AM daily</strong>. Check your assigned laboratory venue, faculty evaluator, and prepare the 38 OOPJ remedial solved questions.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => openTimetable("viva")}
              className="px-4 py-2.5 rounded-full bg-primary hover:bg-primary text-white font-bold text-xs shadow-xs press flex items-center gap-2 cursor-pointer font-display"
            >
              <Calendar className="h-4 w-4" />
              <span>View Timetables & Venues</span>
            </button>
            <button
              onClick={() => navigate("/imp-questions/oopj")}
              className="px-3.5 py-2.5 rounded-full bg-white dark:bg-card hover:bg-stone-100 text-foreground dark:text-white font-bold text-xs border border-border dark:border-stone-800 press flex items-center gap-1.5 cursor-pointer"
              title="Open OOPJ Solved Master Question Bank"
            >
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              <span>OOPJ Solved Bank</span>
            </button>
          </div>
        </div>

        {/* Minimal Class Quick Venue Jump Pills */}
        <div className="mt-4 pt-3 border-t border-primary/15 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-muted-foreground dark:text-stone-400 uppercase tracking-wider shrink-0">
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
              className="px-3 py-1 rounded-full bg-white dark:bg-card hover:bg-background text-foreground dark:text-white font-semibold text-xs border border-border dark:border-stone-800 transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Class {item.cls}</span>
              <span className="text-[10px] font-mono text-stone-500 bg-stone-100 dark:bg-stone-800 px-1 rounded">
                {item.room}
              </span>
            </button>
          ))}
          <button
            onClick={() => openTimetable("faculty")}
            className="px-3 py-1 rounded-full text-primary dark:text-primary hover:underline text-xs font-bold transition-colors ml-auto shrink-0 flex items-center gap-1 cursor-pointer"
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
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary dark:text-primary border border-primary/20 inline-flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Academic Mission
                </span>
                <span className="text-[11px] text-muted-foreground font-medium">
                  Complete your semester syllabus with verified notes
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display">
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
                  <Zap className="h-3.5 w-3.5 text-primary" />
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
                onClick: () => navigate("/papers"),
                accent: "text-primary bg-primary/10 border-primary/20",
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
                accent: "text-primary bg-primary/10 border-primary/20",
              },
              {
                label: "Doubt Finder",
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
                  <h4 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
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

              {/* Minimal Clean Filter Controls: Degree, Semester, and Subject */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Degree Switcher */}
                <div className="flex items-center gap-1 bg-secondary/60 p-1 rounded-xl border border-border">
                  {[
                    { label: "B.Tech", val: "btech" },
                    { label: "BCA", val: "bca" },
                    { label: "All Degrees", val: "all" },
                  ].map((deg) => {
                    const isActive = selectedDegreeFilter === deg.val;
                    return (
                      <button
                        key={deg.val}
                        type="button"
                        onClick={() => {
                          setSelectedDegreeFilter(deg.val as any);
                          setSelectedCourseFilter("all");
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? "bg-primary text-primary-foreground font-bold shadow-xs"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                      >
                        {deg.label}
                      </button>
                    );
                  })}
                </div>

                {/* Semester Switcher */}
                <div className="flex items-center gap-1 bg-secondary/60 p-1 rounded-xl border border-border">
                  {[
                    { label: "Sem 3", val: 3 },
                    { label: "Sem 1", val: 1 },
                    { label: "Sem 2", val: 2 },
                    { label: "Sem 4", val: 4 },
                    { label: "All Sem", val: "all" },
                  ].map((item) => {
                    const isActive = subjectSemFilter === item.val;
                    return (
                      <button
                        key={String(item.val)}
                        type="button"
                        onClick={() => {
                          setSubjectSemFilter(item.val as any);
                          setSelectedCourseFilter("all");
                        }}
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

                {/* Dynamic Subject Filter Dropdown */}
                <select
                  value={selectedCourseFilter}
                  onChange={(e) => setSelectedCourseFilter(e.target.value)}
                  className="h-8 px-2.5 rounded-xl border border-border bg-background text-xs font-semibold text-foreground outline-none cursor-pointer max-w-[190px]"
                >
                  <option value="all">All Subjects ({availableSubjectsForFilter.length})</option>
                  {availableSubjectsForFilter.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code ? `[${s.code}] ` : ""}{s.name.length > 25 ? s.name.slice(0, 25) + "..." : s.name}
                    </option>
                  ))}
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
                    className="group rounded-xl border border-border bg-card hover:bg-secondary/40 hover:border-primary/40 transition-all p-5 flex flex-col justify-between gap-4 card-lift press cursor-pointer shadow-xs"
                  >
                    <div>
                      {/* Top Row: Code & Counts */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-primary/10 text-primary dark:text-primary border border-primary/20">
                            {sub.code || "SUB"}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border">
                            {isBcaSubject(sub) ? "BCA" : "B.Tech"} · Sem {sub.semester}
                          </span>
                        </div>
                        <span className="text-[11px] font-medium text-muted-foreground flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {totalUnits} Units · {totalTopics} Topics
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-snug">
                        {sub.name}
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                        {sub.description || "Detailed syllabus notes, algorithmic proofs, diagrams, and exam review questions."}
                      </p>

                      {/* Units Snapshot */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {sub.units?.slice(0, 3).map((u, uIdx) => (
                          <span
                            key={u.id}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-foreground/80 font-medium truncate max-w-[170px]"
                            title={u.title}
                          >
                            U{uIdx + 1}: {u.title}
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
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${progressPct}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground">{progressPct}%</span>
                      </div>

                      <span className="text-xs font-bold text-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex items-center gap-1 font-display">
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
                <span className="text-base font-bold font-mono text-primary">
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
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.0} />
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
                    stroke="hsl(var(--primary))"
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
                <Clock className="h-4 w-4 text-primary" />
                <h3 className="font-bold text-sm text-foreground font-display">Today's Class Schedule</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-foreground border border-border">
                {profile?.division || "Div A"}
              </span>
            </div>

            {(() => {
              const nextClass = activeTimetable[0] || {
                timeSlot: '10:30 AM · LECTURE',
                subjectName: 'Database Management Systems',
                subjectCode: 'DBMS',
                location: 'EB-15',
                facultyName: 'Prof. Raju Nakum',
              };
              return (
                <div className="p-3.5 rounded-xl bg-secondary/50 border border-border flex items-start gap-3">
                  <div className="p-2.5 rounded-lg bg-card text-foreground border border-border shrink-0 mt-0.5 shadow-xs">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono font-bold text-primary dark:text-primary">{nextClass.timeSlot}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-card text-foreground font-semibold border border-border">
                        {nextClass.location}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-foreground truncate mt-0.5">
                      {nextClass.subjectName} ({nextClass.subjectCode})
                    </h4>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Room {nextClass.location} · {nextClass.facultyName}
                    </p>
                  </div>
                </div>
              );
            })()}

            <div className="flex items-center justify-between pt-1">
              <Link
                to="/today"
                className="text-xs text-primary dark:text-primary font-bold hover:underline flex items-center gap-1 press"
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
                <Target className="h-4 w-4 text-primary" />
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

            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="font-semibold text-foreground">Streak Freezes</span>
              </div>
              <span className="font-mono font-bold text-primary dark:text-primary">
                {streakFreezeCount} Available
              </span>
            </div>
          </div>

          {/* Tile 3: Academic Safeguards (Clean Dual Radial Gauges) */}
          <div className="glass-card border border-border rounded-2xl p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground font-display">Academic Safeguards</h3>
              <Link to="/calculator" className="text-xs text-primary dark:text-primary font-semibold hover:underline press">
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
                    <span className="text-base font-bold text-foreground font-mono">30%</span>
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
                      className="text-primary stroke-current transition-all duration-1000"
                      strokeDasharray="91, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-base font-bold text-foreground font-mono">91%</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-foreground mt-2">Attendance</span>
                <span className="text-[10px] text-primary dark:text-primary font-semibold">Above 75% cutoff</span>
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
                      <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors truncate">
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
