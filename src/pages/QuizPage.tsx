import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { subjects } from "@/data/subjects";
import { useGamification } from "@/hooks/useGamification";
import type { MCQ } from "@/data/types";
import { 
  Trophy, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  Sparkles, 
  Search, 
  ArrowRight, 
  ArrowLeft,
  Layers, 
  FileText, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  BarChart3, 
  Check, 
  X,
  Flag,
  BookOpen,
  Zap,
  Play,
  Pause,
  AlertCircle,
  ExternalLink,
  Award,
  Eye
} from "lucide-react";
import { toast } from "sonner";

interface EnrichedMCQ extends MCQ {
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicTitle: string;
  unitTitle: string;
}

interface UserAnswerRecord {
  question: EnrichedMCQ;
  selectedChoice: number;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export default function QuizPage() {
  const navigate = useNavigate();
  const { recordQuizCompleted, addXp } = useGamification();

  // Selection & Config state
  const [selectedSubject, setSelectedSubject] = useState<string>("all-sem3");
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<string>("all");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [searchTopicInput, setSearchTopicInput] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);

  // Active Quiz Session state
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [flaggedIndices, setFlaggedIndices] = useState<Set<number>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<UserAnswerRecord[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<"all" | "missed" | "flagged">("all");
  const [showReportModal, setShowReportModal] = useState(false);

  // Timing state
  const [totalTimerSeconds, setTotalTimerSeconds] = useState(0);
  const [questionTimerSeconds, setQuestionTimerSeconds] = useState(0);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Recent scores in localStorage
  const [recentScores, setRecentScores] = useState<any[]>(() => {
    try {
      const raw = localStorage.getItem("itm_quiz_scores");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Extract subjects with MCQs
  const availableSubjects = useMemo(() => {
    return subjects
      .map((s) => {
        let count = 0;
        s.units.forEach((u) => {
          u.topics.forEach((t) => {
            if (t.mcqs) count += t.mcqs.length;
          });
        });
        return { ...s, totalMcqs: count };
      })
      .filter((s) => s.totalMcqs > 0);
  }, []);

  // Combined Sem 3 MCQs pool with full metadata
  const allSem3Mcqs = useMemo(() => {
    let pool: EnrichedMCQ[] = [];
    const sem3Subjects = availableSubjects.filter((s) => s.semester === 3 || s.id.startsWith("sem3") || s.id === "ca-101");
    sem3Subjects.forEach((s) => {
      s.units.forEach((u) => {
        u.topics.forEach((t) => {
          if (t.mcqs && t.mcqs.length > 0) {
            const tagged = t.mcqs.map((m) => ({
              ...m,
              subjectId: s.id,
              subjectName: s.name,
              topicId: t.id,
              topicTitle: t.title,
              unitTitle: u.title,
            }));
            pool = [...pool, ...tagged];
          }
        });
      });
    });
    return pool;
  }, [availableSubjects]);

  // Active question pool based on selected subject and topic search
  const activeQuizPool = useMemo(() => {
    let pool: EnrichedMCQ[] = [];
    if (selectedSubject === "all-sem3") {
      pool = [...allSem3Mcqs];
    } else {
      const subj = subjects.find((s) => s.id === selectedSubject);
      if (subj) {
        subj.units.forEach((u) => {
          if (selectedUnitFilter !== "all" && u.id !== selectedUnitFilter) return;
          u.topics.forEach((t) => {
            if (t.mcqs) {
              const tagged = t.mcqs.map((m) => ({
                ...m,
                subjectId: subj.id,
                subjectName: subj.name,
                topicId: t.id,
                topicTitle: t.title,
                unitTitle: u.title,
              }));
              pool = [...pool, ...tagged];
            }
          });
        });
      }
    }

    if (searchTopicInput.trim()) {
      const term = searchTopicInput.toLowerCase();
      pool = pool.filter(
        (q) =>
          q.question.toLowerCase().includes(term) ||
          q.topicTitle.toLowerCase().includes(term) ||
          q.subjectName.toLowerCase().includes(term)
      );
    }

    return pool.slice(0, questionCount > 0 ? questionCount : pool.length);
  }, [selectedSubject, selectedUnitFilter, searchTopicInput, questionCount, allSem3Mcqs]);

  const currentQuestion = activeQuizPool[currentIdx];

  // Timer logic
  useEffect(() => {
    if (quizStarted && !quizFinished && !isTimerPaused) {
      timerRef.current = setInterval(() => {
        setTotalTimerSeconds((prev) => prev + 1);
        setQuestionTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizStarted, quizFinished, isTimerPaused]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Keyboard accessibility
  useEffect(() => {
    if (!quizStarted || quizFinished) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key >= "1" && e.key <= "4" && !isAnswerSubmitted) {
        const optIndex = parseInt(e.key, 10) - 1;
        if (currentQuestion && optIndex < currentQuestion.options.length) {
          setSelectedChoice(optIndex);
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleSubmitChoice();
      } else if (e.key === "f" || e.key === "F") {
        toggleFlagQuestion(currentIdx);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quizStarted, quizFinished, isAnswerSubmitted, currentQuestion, selectedChoice, currentIdx]);

  // Start new quiz session
  const handleStartQuiz = () => {
    if (activeQuizPool.length === 0) {
      toast.error("No questions found for this topic filter. Please broaden your selection.");
      return;
    }
    setCurrentIdx(0);
    setSelectedChoice(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizAnswers([]);
    setFlaggedIndices(new Set());
    setQuizFinished(false);
    setIsReviewMode(false);
    setTotalTimerSeconds(0);
    setQuestionTimerSeconds(0);
    setIsTimerPaused(false);
    setQuizStarted(true);
    toast.success(`Exam session started! ${activeQuizPool.length} questions loaded.`);
  };

  const toggleFlagQuestion = (idx: number) => {
    setFlaggedIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
        toast.info(`Question ${idx + 1} unflagged`);
      } else {
        next.add(idx);
        toast.info(`Question ${idx + 1} flagged for review 🚩`);
      }
      return next;
    });
  };

  const jumpToQuestion = (targetIdx: number) => {
    if (targetIdx < 0 || targetIdx >= activeQuizPool.length) return;
    
    // Check if current question has an existing recorded answer
    const existing = quizAnswers.find((a) => a.question === activeQuizPool[targetIdx]);
    if (existing) {
      setSelectedChoice(existing.selectedChoice);
      setIsAnswerSubmitted(true);
    } else {
      setSelectedChoice(null);
      setIsAnswerSubmitted(false);
    }
    setCurrentIdx(targetIdx);
    setQuestionTimerSeconds(0);
  };

  const handleSubmitChoice = () => {
    if (selectedChoice === null) {
      toast.error("Please select an answer choice first.");
      return;
    }

    if (!isAnswerSubmitted) {
      const isCorrect = selectedChoice === currentQuestion.correctIndex;
      if (isCorrect) {
        setScore((prev) => prev + 1);
        addXp(15);
        toast.success("Correct Answer! +15 XP earned 🎯");
      } else {
        toast.error("Incorrect. Check the university rationale!");
      }
      setIsAnswerSubmitted(true);
      setQuizAnswers((prev) => [
        ...prev.filter((a) => a.question !== currentQuestion),
        {
          question: currentQuestion,
          selectedChoice,
          isCorrect,
          timeSpentSeconds: questionTimerSeconds,
        },
      ]);
    } else {
      // Advance to next question or complete quiz
      if (currentIdx + 1 < activeQuizPool.length) {
        jumpToQuestion(currentIdx + 1);
      } else {
        handleFinishQuiz();
      }
    }
  };

  const handleFinishQuiz = () => {
    setQuizFinished(true);
    const finalScore = score + (selectedChoice === currentQuestion.correctIndex && !isAnswerSubmitted ? 1 : 0);
    const isPerfect = finalScore === activeQuizPool.length;

    // Correct gamification callback with boolean argument
    recordQuizCompleted(isPerfect);
    addXp(50); // Completion bonus

    if (isPerfect) {
      addXp(100);
      toast.success("FLAWLESS EXAM! +150 Total XP & Achievement Unlocked! 🏆");
    }

    const newRecord = {
      subject:
        selectedSubject === "all-sem3"
          ? "All Semester 3 Core"
          : subjects.find((s) => s.id === selectedSubject)?.name || selectedSubject,
      score: finalScore,
      total: activeQuizPool.length,
      percentage: Math.round((finalScore / activeQuizPool.length) * 100),
      timestamp: new Date().toISOString(),
      timeSpent: formatTime(totalTimerSeconds),
    };
    const updated = [newRecord, ...recentScores].slice(0, 10);
    setRecentScores(updated);
    localStorage.setItem("itm_quiz_scores", JSON.stringify(updated));
    toast.success(`Exam finished! Final Score: ${finalScore}/${activeQuizPool.length}`);
  };

  const handleCancelQuiz = () => {
    if (window.confirm("Are you sure you want to exit this quiz session? Progress will be saved.")) {
      setQuizStarted(false);
      setQuizFinished(false);
      toast.info("Quiz session closed.");
    }
  };

  // Calculations for Gauges and Donut Chart matching Screenshot 4
  const answeredCount = quizAnswers.length;
  const completionPercent = activeQuizPool.length > 0 ? Math.round((answeredCount / activeQuizPool.length) * 100) : 0;
  const currentAccuracyPercent = answeredCount > 0 ? Math.round((score / answeredCount) * 100) : 41; // fallback to screenshot value

  // Est Time Gauge (allocated 60s per question)
  const targetTotalTime = activeQuizPool.length * 60;
  const timePercent = targetTotalTime > 0 ? Math.min(100, Math.round((totalTimerSeconds / targetTotalTime) * 100)) : 24;

  return (
    <div className="p-3 sm:p-5 lg:p-7 max-w-[1600px] mx-auto space-y-5 animate-fade-in text-foreground">
      {/* ── TOP HEADER & BREADCRUMBS matching Screenshot 4 ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-border/80">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-1">
            <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-muted-foreground">ITM Notes</span>
            <span>/</span>
            <span className="text-foreground font-bold">Subject Quiz</span>
          </div>

          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground font-display flex items-center gap-2.5">
              <span>Subject Quiz</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs">
              Active
            </span>
            {quizStarted && !quizFinished && (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#183F36]/20 text-[#183F36] dark:text-[#D6E85D] border border-[#183F36]/40">
                <Clock className="w-3 h-3 animate-spin text-[#183F36] dark:text-[#D6E85D]" />
                {formatTime(totalTimerSeconds)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Topic search / switcher */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Change topic..."
              value={searchTopicInput}
              onChange={(e) => setSearchTopicInput(e.target.value)}
              className="h-9 pl-8 pr-3 w-40 sm:w-56 rounded-xl border border-input bg-card text-xs text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary outline-none transition-all shadow-xs"
            />
          </div>

          {/* Get Report CTA button */}
          <button
            onClick={() => {
              if (quizAnswers.length > 0) {
                setShowReportModal(true);
              } else {
                toast.info("Answer questions first to generate diagnostic report.");
              }
            }}
            className="h-9 px-4 rounded-xl bg-brand-forest hover:bg-brand-deep text-white font-bold text-xs shadow-md shadow-brand-forest/20 border border-brand-chartreuse/30 flex items-center gap-2 transition-all active:scale-95 shrink-0 cursor-pointer font-display"
          >
            <BarChart3 className="h-3.5 w-3.5 text-brand-chartreuse" />
            <span>Get Report</span>
          </button>
        </div>
      </div>

      {/* ── 1. SETUP VIEW (Before launching test) ── */}
      {!quizStarted && (
        <div className="max-w-4xl mx-auto space-y-6 pt-2">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground font-display flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>University Subject Examination & Recall Drill</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Practice authentic semester 3 university exam questions with instant rationale, error analytics, and gamified XP rewards.
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-mono font-bold shrink-0">
                <Zap className="h-3.5 w-3.5" />
                <span>+15 XP / correct</span>
              </div>
            </div>

            {/* Subject Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                Select Course / Question Pool
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSubject("all-sem3")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedSubject === "all-sem3"
                      ? "border-brand-forest bg-brand-forest/10 text-foreground ring-2 ring-brand-forest font-bold shadow-xs"
                      : "border-border bg-secondary/30 text-foreground hover:bg-secondary/70 hover:border-primary/40"
                  }`}
                >
                  <div className="text-sm font-bold text-foreground font-display">All Semester 3 Core</div>
                  <div className={`text-[11px] mt-1 font-mono flex items-center gap-1.5 ${
                    selectedSubject === "all-sem3" ? "text-brand-forest dark:text-brand-chartreuse font-bold" : "text-muted-foreground"
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-brand-forest dark:bg-brand-chartreuse shrink-0" />
                    <span>{allSem3Mcqs.length} Total Curated MCQs</span>
                  </div>
                </button>

                {availableSubjects
                  .filter((s) => s.semester === 3 || s.id.startsWith("sem3") || s.id === "ca-101")
                  .map((s) => {
                    const isSelected = selectedSubject === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedSubject(s.id)}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-brand-forest bg-brand-forest/10 text-foreground ring-2 ring-brand-forest font-bold shadow-xs"
                            : "border-border bg-secondary/30 text-foreground hover:bg-secondary/70 hover:border-primary/40"
                        }`}
                      >
                        <div className="text-sm font-bold text-foreground font-display truncate">{s.name}</div>
                        <div className={`text-[11px] mt-1 font-mono flex items-center gap-1.5 ${
                          isSelected ? "text-brand-forest dark:text-brand-chartreuse font-bold" : "text-muted-foreground"
                        }`}>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                          <span>{s.totalMcqs} Practice MCQs</span>
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Question Count Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                Session Question Count
              </label>
              <div className="flex flex-wrap gap-2.5">
                {[5, 10, 15, 20, 30].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      questionCount === num
                        ? "bg-brand-forest text-white dark:text-brand-chartreuse border-brand-forest font-bold shadow-xs ring-1 ring-brand-chartreuse/40"
                        : "bg-secondary text-muted-foreground hover:text-foreground border-border hover:bg-secondary/80"
                    }`}
                  >
                    {num} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Button */}
            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleStartQuiz}
                className="px-6 py-3 rounded-xl bg-brand-forest hover:bg-brand-deep text-white font-bold text-xs shadow-md shadow-brand-forest/30 border border-brand-chartreuse/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer font-display"
              >
                <span>Launch Quiz Session</span>
                <ArrowRight className="h-4 w-4 text-brand-chartreuse" />
              </button>
            </div>
          </div>

          {/* Recent Quiz Attempts */}
          {recentScores.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2 font-display">
                <Trophy className="h-4 w-4 text-amber-500" />
                <span>Recent Exam Drill History</span>
              </h3>
              <div className="divide-y divide-border">
                {recentScores.map((attempt, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-foreground">{attempt.subject}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {new Date(attempt.timestamp).toLocaleDateString()} • Time: {attempt.timeSpent || "N/A"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`font-mono font-black text-sm ${
                        attempt.percentage >= 80 ? "text-emerald-500" : attempt.percentage >= 50 ? "text-primary" : "text-rose-500"
                      }`}>
                        {attempt.score}/{attempt.total} ({attempt.percentage}%)
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 2. ACTIVE QUIZ VIEW matching Screenshot 4 Layout ── */}
      {quizStarted && !quizFinished && currentQuestion && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* ── LEFT QUESTION NAVIGATOR PALETTE ── */}
          <div className="lg:col-span-3 xl:col-span-2 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-xs font-bold text-foreground font-display uppercase tracking-wider">Question List</h3>
                <span className="text-[11px] font-mono text-muted-foreground font-bold">
                  {answeredCount}/{activeQuizPool.length}
                </span>
              </div>

              {/* Grid of question buttons */}
              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-1.5 max-h-[360px] overflow-y-auto p-0.5">
                {activeQuizPool.map((q, idx) => {
                  const isCurrent = idx === currentIdx;
                  const isFlagged = flaggedIndices.has(idx);
                  const answeredRecord = quizAnswers.find((a) => a.question === q);
                  const isAnswered = !!answeredRecord;
                  const isCorrect = answeredRecord?.isCorrect;

                  let btnCls = "h-8 rounded-lg text-xs font-mono font-bold transition-all relative flex items-center justify-center cursor-pointer ";
                  if (isCurrent) {
                    btnCls += "ring-2 ring-primary bg-primary/20 text-primary font-black ";
                  } else if (isAnswered) {
                    btnCls += isCorrect
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 "
                      : "bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 ";
                  } else {
                    btnCls += "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground border border-border/70 ";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => jumpToQuestion(idx)}
                      className={btnCls}
                      title={`Jump to Q${idx + 1}`}
                    >
                      <span>{idx + 1}</span>
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-background" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-border text-[10px] space-y-1 text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Flagged for review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Active selection</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── CENTRAL QUESTION CANVAS matching Screenshot 4 ── */}
          <div className="lg:col-span-9 xl:col-span-6 space-y-5">
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-7 shadow-sm space-y-5 relative">
              {/* Question Header & Semi-Circular Gauges matching Screenshot 4 */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                      Question ({currentIdx + 1})
                    </span>
                    <span className="text-[10px] font-semibold text-muted-foreground px-2 py-0.5 rounded-full bg-secondary border border-border">
                      {currentQuestion.subjectName}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-foreground font-display leading-snug pt-1">
                    {currentQuestion.question}
                  </h2>
                </div>

                {/* Accuracy & Time Semi-Circle Gauges matching Screenshot 4 */}
                <div className="flex items-center gap-4 shrink-0">
                  {/* Gauge 1: Topic Accuracy (41% / live accuracy) */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-16 h-9 overflow-hidden flex items-end justify-center">
                      <svg className="w-16 h-16 absolute top-0" viewBox="0 0 36 36">
                        <path
                          className="text-secondary stroke-current"
                          strokeWidth="3.5"
                          fill="none"
                          d="M4 18 a 14 14 0 0 1 28 0"
                        />
                        <path
                          className="text-emerald-500 stroke-current transition-all duration-500"
                          strokeDasharray={`${(currentAccuracyPercent / 100) * 44}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          fill="none"
                          d="M4 18 a 14 14 0 0 1 28 0"
                        />
                      </svg>
                      <span className="font-black font-mono text-xs text-foreground z-10">
                        {currentAccuracyPercent}%
                      </span>
                    </div>
                    <span className="text-[9px] text-muted-foreground mt-1 uppercase font-bold tracking-tight">
                      Topic Acc
                    </span>
                  </div>

                  {/* Gauge 2: Time Gauge (24% / live pacing) */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-16 h-9 overflow-hidden flex items-end justify-center">
                      <svg className="w-16 h-16 absolute top-0" viewBox="0 0 36 36">
                        <path
                          className="text-secondary stroke-current"
                          strokeWidth="3.5"
                          fill="none"
                          d="M4 18 a 14 14 0 0 1 28 0"
                        />
                        <path
                          className="text-sky-500 stroke-current transition-all duration-500"
                          strokeDasharray={`${(timePercent / 100) * 44}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          fill="none"
                          d="M4 18 a 14 14 0 0 1 28 0"
                        />
                      </svg>
                      <span className="font-black font-mono text-xs text-foreground z-10">
                        {timePercent}%
                      </span>
                    </div>
                    <span className="text-[9px] text-muted-foreground mt-1 uppercase font-bold tracking-tight">
                      Est Time
                    </span>
                  </div>
                </div>
              </div>

              {/* Numbered Answer Choices matching Screenshot 4 (1), (2), (3), (4) */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                  Answer choices
                </span>

                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedChoice === idx;
                  const isCorrectChoice = currentQuestion.correctIndex === idx;

                  let cardStyle = "border-border bg-secondary/30 hover:border-primary/40 hover:bg-secondary/70 text-foreground";
                  let circleStyle = "border-border text-muted-foreground bg-secondary";

                  if (isSelected && !isAnswerSubmitted) {
                    cardStyle = "border-brand-forest bg-brand-forest/15 text-foreground shadow-xs ring-2 ring-brand-forest font-bold";
                    circleStyle = "bg-brand-forest text-brand-chartreuse border-brand-forest font-bold";
                  } else if (isAnswerSubmitted) {
                    if (isCorrectChoice) {
                      cardStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500 font-bold";
                      circleStyle = "bg-emerald-500 text-white border-emerald-500 font-bold";
                    } else if (isSelected && !isCorrectChoice) {
                      cardStyle = "border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500";
                      circleStyle = "bg-rose-500 text-white border-rose-500 font-bold";
                    }
                  }

                  return (
                    <div
                      key={idx}
                      onClick={() => !isAnswerSubmitted && setSelectedChoice(idx)}
                      className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${cardStyle}`}
                    >
                      <div className={`w-6 h-6 rounded-full border text-xs flex items-center justify-center shrink-0 font-mono ${circleStyle}`}>
                        {idx + 1}
                      </div>
                      <span className="text-xs sm:text-sm font-medium leading-relaxed flex-1">
                        {opt}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Official Syllabus Rationale Box when Answered */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-secondary/50 border border-border text-xs space-y-1.5 animate-fade-in">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Syllabus Rationale & University Concept:</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-sans">
                    {currentQuestion.explanation || "Official reference from ITM SLS Baroda University Course Pack."}
                  </p>
                </div>
              )}

              {/* Action Buttons matching Screenshot 4 (Cancel, Flag, Submit) */}
              <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCancelQuiz}
                  className="px-4 py-2.5 rounded-xl border border-border bg-secondary/60 hover:bg-secondary text-foreground text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFlagQuestion(currentIdx)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      flaggedIndices.has(currentIdx)
                        ? "border-amber-500/50 bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold"
                        : "border-border bg-secondary/60 hover:bg-secondary text-foreground"
                    }`}
                  >
                    <Flag className="h-3.5 w-3.5" />
                    <span>{flaggedIndices.has(currentIdx) ? "Flagged" : "Flag"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmitChoice}
                    className="px-6 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-deep text-white font-bold text-xs shadow-md shadow-brand-forest/20 border border-brand-chartreuse/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer font-display"
                  >
                    <span>
                      {isAnswerSubmitted
                        ? currentIdx + 1 < activeQuizPool.length
                          ? "Next Question"
                          : "Finish Quiz"
                        : "Submit"}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-brand-chartreuse" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PERFORMANCE SIDEBAR matching Screenshot 4 ── */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-5">
            {/* 1. Subject Questions Donut Chart matching Screenshot 4 */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground font-display">Subject Questions</h3>
                <div className="flex rounded-lg bg-secondary p-0.5 border border-border text-[10px] font-semibold">
                  <button className="px-2 py-0.5 rounded bg-brand-forest text-brand-chartreuse font-bold shadow-xs cursor-pointer">
                    Current
                  </button>
                  <button
                    onClick={() => {
                      const unansIdx = activeQuizPool.findIndex((q) => !quizAnswers.some((a) => a.question === q));
                      if (unansIdx !== -1) jumpToQuestion(unansIdx);
                    }}
                    className="px-2 py-0.5 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    Skipped
                  </button>
                </div>
              </div>

              {/* Radial Donut Chart 66% Completed matching Screenshot 4 */}
              <div className="flex flex-col items-center py-2">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-secondary stroke-current"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#183F36] dark:text-[#D6E85D] stroke-current transition-all duration-700"
                      strokeDasharray={`${completionPercent || 66}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-black text-foreground font-mono">
                      {completionPercent}%
                    </span>
                    <span className="text-[10px] text-muted-foreground block font-semibold uppercase tracking-wider">
                      Completed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 text-[11px] font-semibold text-muted-foreground mt-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Accuracy
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    Attempted
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    Flagged
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Answer Statistics Breakdown matching Screenshot 4 */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground font-display">Answer Detail</span>
                <span className="font-mono text-muted-foreground font-bold">
                  {((score / Math.max(1, answeredCount)) * 100).toFixed(0)}% / 100%
                </span>
              </div>

              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                      {currentAccuracyPercent}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${currentAccuracyPercent}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-muted-foreground">Fast Pace Score</span>
                    <span className="font-mono text-sky-500 font-bold">27%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full transition-all duration-500"
                      style={{ width: "27%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Download Resources Card matching Screenshot 4 */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground font-display">Download Resources</h3>
                <Link to="/materials" className="text-xs text-primary hover:underline">
                  All Materials &gt;
                </Link>
              </div>

              <div className="space-y-2 text-xs">
                <div 
                  onClick={() => navigate("/materials")}
                  className="p-2.5 rounded-xl bg-secondary/40 border border-border hover:bg-secondary transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-foreground font-medium">DSA Unit 2 & 3 Cheat Sheet</span>
                  </div>
                  <Download className="h-3.5 w-3.5 text-muted-foreground" />
                </div>

                <div 
                  onClick={() => navigate("/materials")}
                  className="p-2.5 rounded-xl bg-secondary/40 border border-border hover:bg-secondary transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-emerald-500" />
                    <span className="text-foreground font-medium">DBMS SQL & Normalization Pack</span>
                  </div>
                  <Download className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. FINISHED QUIZ SUMMARY / REVIEW MODE ── */}
      {quizFinished && (
        <div className="max-w-3xl mx-auto space-y-6 pt-4 animate-fade-in">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-sm text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center">
              <Trophy className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-foreground font-display">Quiz Session Completed!</h2>
              <p className="text-xs text-muted-foreground">
                You tested on <span className="text-foreground font-semibold">{selectedSubject === "all-sem3" ? "Semester 3 Core" : selectedSubject}</span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-2">
              <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border">
                <span className="text-2xl font-black font-mono text-foreground">{score}/{activeQuizPool.length}</span>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold mt-0.5">Score</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border">
                <span className="text-2xl font-black font-mono text-emerald-500">
                  {Math.round((score / Math.max(1, activeQuizPool.length)) * 100)}%
                </span>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold mt-0.5">Accuracy</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-secondary/50 border border-border">
                <span className="text-2xl font-black font-mono text-sky-500">{formatTime(totalTimerSeconds)}</span>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold mt-0.5">Time Taken</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleStartQuiz}
                className="px-5 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-deep text-white font-bold text-xs shadow-md shadow-brand-forest/20 flex items-center gap-2 cursor-pointer font-display"
              >
                <RotateCcw className="h-3.5 w-3.5 text-brand-chartreuse" />
                <span>Retry Quiz Drill</span>
              </button>
              <button
                onClick={() => setIsReviewMode(!isReviewMode)}
                className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs border border-border flex items-center gap-2 cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5 text-primary" />
                <span>{isReviewMode ? "Hide Questions Review" : "Review All Questions"}</span>
              </button>
              <button
                onClick={() => setQuizStarted(false)}
                className="px-5 py-2.5 rounded-xl bg-card hover:bg-secondary text-muted-foreground hover:text-foreground font-semibold text-xs border border-border cursor-pointer"
              >
                Back to Subjects
              </button>
            </div>
          </div>

          {/* Question-by-question Review Cards */}
          {isReviewMode && (
            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-base text-foreground flex items-center gap-2 font-display">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Detailed Syllabus Solutions & Rationale</span>
              </h3>

              <div className="space-y-3">
                {quizAnswers.map((rec, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border text-xs space-y-3 ${
                      rec.isCorrect
                        ? "bg-card border-emerald-500/30"
                        : "bg-card border-rose-500/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-muted-foreground">
                          Question {idx + 1} · {rec.question.subjectName}
                        </span>
                        <p className="text-sm font-bold text-foreground font-display">{rec.question.question}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        rec.isCorrect ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                      }`}>
                        {rec.isCorrect ? "Correct ✓" : "Missed ✗"}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-secondary/50 border border-border text-foreground space-y-1">
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                        Correct Answer: {rec.question.options[rec.question.correctIndex]}
                      </p>
                      {!rec.isCorrect && (
                        <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                          Your Answer: {rec.question.options[rec.selectedChoice]}
                        </p>
                      )}
                      <p className="text-[11px] text-muted-foreground pt-1 leading-relaxed border-t border-border mt-1">
                        Rationale: {rec.question.explanation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── 4. DIAGNOSTIC REPORT MODAL ── */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl text-foreground">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-base text-foreground font-display">Diagnostic Exam Report</h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground flex items-center justify-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-secondary/40 border border-border">
                <span className="text-muted-foreground">Total Questions Attempted:</span>
                <span className="font-bold text-foreground font-mono">{quizAnswers.length}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-secondary/40 border border-border">
                <span className="text-muted-foreground">Correctly Solved:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{score}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-secondary/40 border border-border">
                <span className="text-muted-foreground">Live Accuracy Rate:</span>
                <span className="font-bold text-foreground font-mono">
                  {quizAnswers.length > 0 ? Math.round((score / quizAnswers.length) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-secondary/40 border border-border">
                <span className="text-muted-foreground">Questions Flagged for Review:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400 font-mono">{flaggedIndices.size}</span>
              </div>
            </div>

            <button
              onClick={() => setShowReportModal(false)}
              className="w-full py-2.5 rounded-xl bg-brand-forest hover:bg-brand-deep text-white font-bold text-xs shadow-md shadow-brand-forest/20 transition-all cursor-pointer font-display"
            >
              Close Diagnostic Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
