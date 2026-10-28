import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUniversity } from "@/contexts/UniversityContext";
import { useGamification } from "@/hooks/useGamification";
import { useProgress } from "@/hooks/useProgress";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Layers, 
  BookOpen, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Bell, 
  BellOff, 
  Check, 
  RotateCcw, 
  Zap, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  MapPin,
  UserCheck
} from "lucide-react";
import { toast } from "sonner";
import { getDueCards, getSrsStatistics } from "@/utils/srsEngine";
import { getActiveStudyPlan, togglePlanTask, StudyPlan } from "@/utils/studyPlannerEngine";
import { DAILY_LECTURE_SCHEDULE, TIMETABLE_DATA } from "@/data/timetableData";
import { FlashcardsModal, Flashcard } from "@/components/FlashcardsModal";

export default function TodayPage() {
  const navigate = useNavigate();
  const { user, profile, updateProfile } = useAuth();
  const { currentUniversity, activeTimetable, activeExamSchedule } = useUniversity();
  const { streak, xp, levelInfo, weeklyGoalDays, weeklyStudyDaysCount, weeklyGoalPercent } = useGamification();
  const { isCompleted, toggleComplete } = useProgress();

  // Division selection (A6): Div A (1), Div B (2), Div C (3), Div D (4), Div E (5)
  const [selectedDivision, setSelectedDivision] = useState<number>(() => {
    if (profile?.division) {
      const match = profile.division.match(/\d/);
      if (match) return parseInt(match[0], 10);
      if (profile.division.toUpperCase() === 'B') return 2;
      if (profile.division.toUpperCase() === 'C') return 3;
      if (profile.division.toUpperCase() === 'D') return 4;
      if (profile.division.toUpperCase() === 'E') return 5;
    }
    return 1;
  });

  const [classReminderEnabled, setClassReminderEnabled] = useState(true);
  const [isFlashcardsOpen, setIsFlashcardsOpen] = useState(false);
  const [activePlan, setActivePlan] = useState<StudyPlan | null>(() => getActiveStudyPlan());
  const [refreshKey, setRefreshKey] = useState(0);

  // Sync profile division if changed
  const handleSelectDivision = async (divNum: number) => {
    setSelectedDivision(divNum);
    const divLabel = `Div ${String.fromCharCode(64 + divNum)}`;
    try {
      await updateProfile({ division: divLabel });
      toast.success(`Personal Timetable set to ${divLabel} (Group ${divNum})`);
    } catch {
      toast.info(`Timetable set to ${divLabel}`);
    }
  };

  // 1. Next Exam Countdown Calculation
  const examCountdown = useMemo(() => {
    const today = new Date();
    // Use first upcoming exam from TIMETABLE_DATA
    for (const batch of TIMETABLE_DATA) {
      for (const exam of batch.exams) {
        // Date format: DD-MM-YYYY or YYYY-MM-DD
        const parts = exam.date.includes('-') ? exam.date.split('-') : [];
        let examDate: Date | null = null;
        if (parts.length === 3) {
          if (parts[0].length === 4) {
            examDate = new Date(`${parts[0]}-${parts[1]}-${parts[2]}`);
          } else {
            examDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
          }
        }
        if (examDate && examDate.getTime() >= today.getTime() - 86400000) {
          const diffDays = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
          return {
            courseName: exam.courseName,
            courseCode: exam.courseCode,
            examDateStr: exam.date,
            daysLeft: Math.max(0, diffDays),
            milestoneText: diffDays <= 1 ? "🚨 Final 24h Review" : diffDays <= 3 ? "⚡ Final 3 Days Sprint" : diffDays <= 7 ? "📅 7 Days Remaining" : "🎯 Scheduled Exam",
          };
        }
      }
    }
    if (activeExamSchedule && activeExamSchedule.items && activeExamSchedule.items.length > 0) {
      const firstExam = activeExamSchedule.items[0];
      return {
        courseName: firstExam.courseName,
        courseCode: firstExam.courseCode,
        examDateStr: firstExam.date,
        daysLeft: 3,
        milestoneText: `🎯 ${currentUniversity.shortName} ${activeExamSchedule.examType}`,
      };
    }
    return {
      courseName: "Object Oriented Programming Java (OOPJ)",
      courseCode: "JAVA303",
      examDateStr: "28-10-2026",
      daysLeft: 3,
      milestoneText: "⚡ Final 3 Days Sprint",
    };
  }, []);

  // 2. Classes for selected division (A6)
  const divisionClasses = useMemo(() => {
    if (activeTimetable && activeTimetable.length > 0) {
      return activeTimetable.map((item, idx) => ({
        id: item.id || `per-${idx}`,
        classGroup: selectedDivision as 1 | 2 | 3 | 4 | 5,
        className: item.division,
        date: 'Today',
        timeSlot: item.timeSlot,
        subjectCode: item.subjectCode,
        subjectName: item.subjectName,
        facultyName: item.facultyName,
        location: item.location,
        roomType: item.roomType,
        fileSubmissionRequired: false,
        notes: item.notes,
      }));
    }
    const matched = DAILY_LECTURE_SCHEDULE.filter((item) => item.classGroup === selectedDivision);
    return matched.length > 0 ? matched : DAILY_LECTURE_SCHEDULE.slice(0, 4);
  }, [activeTimetable, selectedDivision]);

  // Next class calculation
  const nextClass = divisionClasses[0] || null;

  // 3. SRS Due Cards
  const dueCards = useMemo(() => {
    return getDueCards();
  }, [refreshKey]);

  const srsStats = useMemo(() => {
    return getSrsStatistics();
  }, [refreshKey]);

  const flashcardDeck: Flashcard[] = useMemo(() => {
    return (dueCards || []).map((c) => ({
      id: c.cardId,
      front: c.question,
      back: c.answer,
      category: c.subjectId,
    }));
  }, [dueCards]);

  // 4. Today's study plan items
  const todayPlanItems = useMemo(() => {
    if (!activePlan || !activePlan.days) return [];
    // Return items for Day 1 or current day
    return activePlan.days[0]?.tasks || [];
  }, [activePlan, refreshKey]);

  const handleToggleTask = (taskId: string) => {
    togglePlanTask(taskId);
    setActivePlan(getActiveStudyPlan());
    setRefreshKey((k) => k + 1);
    toast.success("Study task updated!");
  };

  const handleToggleClassReminder = () => {
    setClassReminderEnabled((prev) => {
      const next = !prev;
      toast.info(next ? "🔔 Class reminder alerts enabled" : "🔕 Class reminder alerts muted");
      return next;
    });
  };

  const todayDateFormatted = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6 route-transition-enter pb-24 text-foreground">
      {/* ── HEADER: TODAY MISSION CONTROL ── */}
      <div className="bg-gradient-to-r from-[#060709] via-[#1D4A3F] to-[#12332C] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#f59e0b]/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-56 h-56 bg-[#f59e0b]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#f59e0b] text-[#060709] text-[10px] font-black uppercase tracking-wider font-mono">
                {currentUniversity.shortName} Daily Focus
              </span>
              <span className="text-xs text-white/80 font-medium">
                {todayDateFormatted}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white">
              Today's Academic Mission
            </h1>
            <p className="text-xs text-white/70 max-w-xl mt-1 leading-relaxed">
              One unified dashboard for your scheduled classes, active recall flashcards, daily study goals, and exam countdown.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-20">
              <div className="flex items-center justify-center gap-1 text-[#f59e0b]">
                <Flame className="h-4 w-4 fill-current flame-pulse-anim" />
                <span className="text-lg font-black font-mono">{streak}d</span>
              </div>
              <span className="text-[10px] text-white/75 block uppercase font-bold">Streak</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center min-w-20">
              <div className="flex items-center justify-center gap-1 text-[#f59e0b]">
                <Zap className="h-4 w-4 fill-current" />
                <span className="text-lg font-black font-mono">{xp}</span>
              </div>
              <span className="text-[10px] text-white/75 block uppercase font-bold">XP</span>
            </div>
          </div>
        </div>

        {/* Weekly Goal Progress Bar (A4) */}
        <div className="mt-6 pt-5 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-white/80 font-medium">Weekly Goal:</span>
            <strong className="text-[#f59e0b]">{weeklyStudyDaysCount} / {weeklyGoalDays} Study Days</strong>
            <span className="text-white/60">({weeklyGoalPercent}%)</span>
          </div>
          <div className="w-full sm:w-48 h-2 rounded-full bg-white/20 overflow-hidden">
            <div 
              className="h-full bg-[#f59e0b] rounded-full transition-all duration-500"
              style={{ width: `${weeklyGoalPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── SECTION 1: EXAM COUNTDOWN TICKER & MILESTONE ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-hover-lift">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
            <Clock className="h-6 w-6 stroke-[2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono">
                {examCountdown.milestoneText}
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                {examCountdown.courseCode}
              </span>
            </div>
            <h3 className="font-bold text-sm text-foreground mt-0.5">
              {examCountdown.courseName}
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Official University Timetable • Exam Date: {examCountdown.examDateStr}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
          <div className="text-right">
            <span className="text-2xl font-black font-mono text-foreground">{examCountdown.daysLeft}</span>
            <span className="text-[10px] text-muted-foreground block uppercase font-bold">Days Left</span>
          </div>
          <Link
            to="/rapid-revision"
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-90 apple-press flex items-center gap-1.5"
          >
            <span>Revise in 30m</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* ── SECTION 2: PERSONAL CLASS TIMETABLE (A6) ── */}
      <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-foreground font-display">
                Today's Class Timetable
              </h2>
              <p className="text-[11px] text-muted-foreground">
                Showing scheduled lectures and practicals for Div {String.fromCharCode(64 + selectedDivision)}
              </p>
            </div>
          </div>

          {/* Division Selector Tabs (Div A to E) */}
          <div className="flex items-center gap-1 bg-secondary/60 p-1 rounded-xl self-start">
            {[1, 2, 3, 4, 5].map((divNum) => (
              <button
                key={divNum}
                onClick={() => handleSelectDivision(divNum)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  selectedDivision === divNum
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Div {String.fromCharCode(64 + divNum)}
              </button>
            ))}
          </div>
        </div>

        {/* Next Class Highlight Card */}
        {nextClass && (
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary text-primary-foreground">
                  Next Upcoming Class
                </span>
                <span className="font-mono text-xs font-bold text-foreground">
                  {nextClass.timeSlot}
                </span>
              </div>
              <h4 className="font-bold text-sm text-foreground">
                {nextClass.subjectName} ({nextClass.subjectCode})
              </h4>
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground pt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-primary" /> {nextClass.location} ({nextClass.roomType})
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <UserCheck className="h-3 w-3 text-primary" /> {nextClass.facultyName}
                </span>
              </div>
            </div>

            <button
              onClick={handleToggleClassReminder}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all self-start sm:self-auto flex items-center gap-1.5 cursor-pointer ${
                classReminderEnabled 
                  ? "bg-primary text-primary-foreground border-primary" 
                  : "bg-secondary text-muted-foreground border-border"
              }`}
            >
              {classReminderEnabled ? <Bell className="h-3.5 w-3.5" /> : <BellOff className="h-3.5 w-3.5" />}
              <span>{classReminderEnabled ? "Reminder Set" : "Notify Me"}</span>
            </button>
          </div>
        )}

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {divisionClasses.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-3.5 rounded-2xl bg-secondary/30 border border-border/80 flex items-start justify-between gap-2 hover:bg-secondary/50 transition-colors"
            >
              <div className="space-y-0.5 min-w-0">
                <span className="text-[10px] font-mono font-bold text-primary block">
                  {item.timeSlot}
                </span>
                <p className="font-bold text-xs text-foreground truncate">
                  {item.subjectName}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {item.location} • {item.facultyName}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-secondary text-foreground shrink-0 border border-border">
                {item.roomType}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 3: SRS FLASHCARDS DUE TODAY (A5) ── */}
      <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-foreground font-display">
                Active Recall Deck (SRS Due Today)
              </h2>
              <p className="text-[11px] text-muted-foreground">
                SuperMemo SM-2 interval spaced repetition memory queue
              </p>
            </div>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-bold font-mono">
            {srsStats.dueTodayCount} Cards Due
          </span>
        </div>

        {srsStats.dueTodayCount > 0 ? (
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Optimal Memory Window Active</span>
              </h4>
              <p className="text-xs text-muted-foreground">
                Reviewing these {srsStats.dueTodayCount} cards today prevents memory decay according to your forgetting curve.
              </p>
            </div>

            <button
              onClick={() => setIsFlashcardsOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all apple-press self-start sm:self-auto cursor-pointer"
            >
              Start SRS Review Deck →
            </button>
          </div>
        ) : (
          <div className="p-6 text-center rounded-2xl bg-secondary/30 border border-dashed border-border text-xs text-muted-foreground space-y-2">
            <CheckCircle2 className="h-8 w-8 text-primary mx-auto" />
            <p className="font-bold text-foreground">All Caught Up for Today!</p>
            <p>You have reviewed all active recall flashcards due for this session. Great job!</p>
          </div>
        )}
      </div>

      {/* ── SECTION 4: TODAY'S STUDY PLAN TASKS CHECKLIST (A5) ── */}
      <div className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-base text-foreground font-display">
                Today's Study Plan Tasks
              </h2>
              <p className="text-[11px] text-muted-foreground">
                Interactive daily revision syllabus checklist
              </p>
            </div>
          </div>

          <Link
            to="/study-planner"
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
          >
            <span>Edit Full Plan</span>
            <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {todayPlanItems.length > 0 ? (
          <div className="space-y-2.5">
            {todayPlanItems.map((task) => {
              const completed = task.completed || isCompleted(task.topicId);
              return (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    completed
                      ? "bg-primary/10 border-amber-500/30 text-foreground"
                      : "bg-secondary/30 border-border hover:border-primary/40 text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleTask(task.id);
                      }}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        completed
                          ? "bg-primary text-white"
                          : "border border-border hover:border-primary text-transparent"
                      }`}
                    >
                      <Check className="h-4 w-4 stroke-[3]" />
                    </button>
                    <div className="min-w-0">
                      <p className={`font-bold text-xs sm:text-sm truncate ${completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {task.topicTitle}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {task.subjectName} • Unit {task.unitNumber} ({task.estimatedMinutes} mins)
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/subject/${task.subjectId}/topic/${task.topicId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0"
                    title="Open Topic Notes"
                  >
                    <BookOpen className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center rounded-2xl bg-secondary/30 border border-dashed border-border text-xs text-muted-foreground space-y-3">
            <BookOpen className="h-8 w-8 text-primary/40 mx-auto" />
            <div>
              <p className="font-bold text-foreground">No Active Study Plan Configured</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Generate an auto-balanced revision schedule by entering your exam target date.
              </p>
            </div>
            <Link
              to="/study-planner"
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:opacity-90 inline-block apple-press"
            >
              Generate Study Plan →
            </Link>
          </div>
        )}
      </div>

      <FlashcardsModal
        isOpen={isFlashcardsOpen}
        onClose={() => setIsFlashcardsOpen(false)}
        topicTitle="Daily Active Recall SRS Queue"
        cards={flashcardDeck}
      />
    </div>
  );
}
