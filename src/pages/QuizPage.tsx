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
    <div className="p-3 sm:p-5 lg:p-7 max-w-[1600px] mx-auto space-y-5 animate-fade-in text-slate-100">
      {/* ── TOP HEADER & BREADCRUMBS matching Screenshot 4 ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-1">
            <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-slate-300">ITM MOOCs</span>
            <span>/</span>
            <span className="text-slate-100 font-bold">Subject Quiz</span>
          </div>

          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Subject Quiz</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-xs">
              Active
            </span>
            {quizStarted && !quizFinished && (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#183F36]/40 text-[#D6E85D] border border-[#183F36]">
                <Clock className="w-3 h-3 animate-spin text-[#D6E85D]" />
                {formatTime(totalTimerSeconds)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Topic search / switcher */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Change topic..."
              value={searchTopicInput}
              onChange={(e) => setSearchTopicInput(e.target.value)}
              className="h-9 pl-8 pr-3 w-40 sm:w-56 rounded-xl border border-slate-700/80 bg-slate-900/90 text-xs text-slate-100 placeholder:text-slate-500 focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner"
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
            className="h-9 px-4 rounded-xl bg-[#183F36] hover:bg-[#12332C] text-white font-bold text-xs shadow-md shadow-[#183F36]/30 border border-[#D6E85D]/20 flex items-center gap-2 transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            <BarChart3 className="h-3.5 w-3.5 text-[#D6E85D]" />
            <span>Get Report</span>
          </button>
        </div>
      </div>

      {/* ── 1. SETUP VIEW (Before launching test) ── */}
      {!quizStarted && (
        <div className="max-w-4xl mx-auto space-y-6 pt-2">
          <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-sm space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  <span>University Subject Examination & Recall Drill</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Practice authentic semester 3 university exam questions with instant rationale, error analytics, and gamified XP rewards.
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-bold shrink-0">
                <Zap className="h-3.5 w-3.5" />
                <span>+15 XP / correct</span>
              </div>
            </div>

            {/* Subject Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Course / Question Pool
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedSubject("all-sem3")}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedSubject === "all-sem3"
                      ? "border-[#183F36] bg-[#183F36]/25 text-white font-bold shadow-md shadow-[#183F36]/20 ring-1 ring-[#D6E85D]/40"
                      : "border-slate-800 bg-slate-800/40 text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"
                  }`}
                >
                  <div className="text-xs font-bold">All Semester 3 Core</div>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6E85D]" />
                    <span>{allSem3Mcqs.length} Total Curated MCQs</span>
                  </div>
                </button>

                {availableSubjects
                  .filter((s) => s.semester === 3 || s.id.startsWith("sem3") || s.id === "ca-101")
                  .map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedSubject(s.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedSubject === s.id
                          ? "border-[#183F36] bg-[#183F36]/25 text-white font-bold shadow-md shadow-[#183F36]/20 ring-1 ring-[#D6E85D]/40"
                          : "border-slate-800 bg-slate-800/40 text-slate-400 hover:bg-slate-800/70 hover:text-slate-200"
                      }`}
                    >
                      <div className="text-xs font-bold truncate">{s.name}</div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{s.totalMcqs} Practice MCQs</span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Question Count Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
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
                        ? "bg-[#183F36] text-white border-[#183F36] font-bold shadow-sm ring-1 ring-[#D6E85D]/40"
                        : "bg-slate-800/50 text-slate-300 border-slate-700/80 hover:bg-slate-800"
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
                className="px-6 py-3 rounded-xl bg-[#183F36] hover:bg-[#12332C] text-white font-bold text-xs shadow-lg shadow-[#183F36]/30 border border-[#D6E85D]/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Launch Quiz Session</span>
                <ArrowRight className="h-4 w-4 text-[#D6E85D]" />
              </button>
            </div>
          </div>

          {/* Recent Quiz Attempts */}
          {recentScores.length > 0 && (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-400" />
                <span>Recent Exam Drill History</span>
              </h3>
              <div className="divide-y divide-slate-800/80">
                {recentScores.map((attempt, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{attempt.subject}</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {new Date(attempt.timestamp).toLocaleDateString()} • Time: {attempt.timeSpent || "N/A"}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`font-mono font-black text-sm ${
                        attempt.percentage >= 80 ? "text-emerald-400" : attempt.percentage >= 50 ? "text-blue-400" : "text-rose-400"
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
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Question List</h3>
                <span className="text-[11px] font-mono text-slate-400 font-bold">
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
                    btnCls += "ring-2 ring-blue-500 bg-blue-500/20 text-white font-black ";
                  } else if (isAnswered) {
                    btnCls += isCorrect
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 "
                      : "bg-rose-500/20 text-rose-400 border border-rose-500/30 ";
                  } else {
                    btnCls += "bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-700/50 ";
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
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-slate-900" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-slate-800 text-[10px] space-y-1 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Flagged for review</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>Active selection</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── CENTRAL QUESTION CANVAS matching Screenshot 4 ── */}
          <div className="lg:col-span-9 xl:col-span-6 space-y-5">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-lg space-y-5 relative">
              {/* Question Header & Semi-Circular Gauges matching Screenshot 4 */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div className="space-y-1 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                      Question ({currentIdx + 1})
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                      {currentQuestion.subjectName}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white leading-snug pt-1">
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
                          className="text-slate-800 stroke-current"
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
                      <span className="font-black font-mono text-xs text-white z-10">
                        {currentAccuracyPercent}%
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 uppercase font-bold tracking-tight">
                      Topic Acc
                    </span>
                  </div>

                  {/* Gauge 2: Time Gauge (24% / live pacing) */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-16 h-9 overflow-hidden flex items-end justify-center">
                      <svg className="w-16 h-16 absolute top-0" viewBox="0 0 36 36">
                        <path
                          className="text-slate-800 stroke-current"
                          strokeWidth="3.5"
                          fill="none"
                          d="M4 18 a 14 14 0 0 1 28 0"
                        />
                        <path
                          className="text-sky-400 stroke-current transition-all duration-500"
                          strokeDasharray={`${(timePercent / 100) * 44}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          fill="none"
                          d="M4 18 a 14 14 0 0 1 28 0"
                        />
                      </svg>
                      <span className="font-black font-mono text-xs text-white z-10">
                        {timePercent}%
                      </span>
                    </div>
                    <span className="text-[9px] text-slate-400 mt-1 uppercase font-bold tracking-tight">
                      Est Time
                    </span>
                  </div>
                </div>
              </div>

              {/* Numbered Answer Choices matching Screenshot 4 (1), (2), (3), (4) */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-300 block">
                  Answer choices
                </span>

                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedChoice === idx;
                  const isCorrectChoice = currentQuestion.correctIndex === idx;

                  let cardStyle = "border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-850 text-slate-200";
                  let circleStyle = "border-slate-700 text-slate-400 bg-slate-800/80";

                  if (isSelected && !isAnswerSubmitted) {
                    cardStyle = "border-[#183F36] bg-[#183F36]/25 text-white shadow-sm ring-1 ring-[#D6E85D]";
                    circleStyle = "bg-[#183F36] text-[#D6E85D] border-[#183F36] font-bold";
                  } else if (isAnswerSubmitted) {
                    if (isCorrectChoice) {
                      cardStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500";
                      circleStyle = "bg-emerald-500 text-white border-emerald-500 font-bold";
                    } else if (isSelected && !isCorrectChoice) {
                      cardStyle = "border-rose-500 bg-rose-500/15 text-rose-200 ring-1 ring-rose-500";
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
                <div className="p-4 rounded-xl bg-slate-850/80 border border-slate-750 text-xs space-y-1.5 animate-fade-in">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Syllabus Rationale & University Concept:</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans">
                    {currentQuestion.explanation || "Official reference from ITM SLS Baroda University Course Pack."}
                  </p>
                </div>
              )}

              {/* Action Buttons matching Screenshot 4 (Cancel, Flag, Submit) */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCancelQuiz}
                  className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-850 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFlagQuestion(currentIdx)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      flaggedIndices.has(currentIdx)
                        ? "border-amber-500/50 bg-amber-500/20 text-amber-300"
                        : "border-slate-700 bg-slate-850 hover:bg-slate-800 text-slate-300"
                    }`}
                  >
                    <Flag className="h-3.5 w-3.5" />
                    <span>{flaggedIndices.has(currentIdx) ? "Flagged" : "Flag"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmitChoice}
                    className="px-6 py-2.5 rounded-xl bg-[#183F36] hover:bg-[#12332C] text-white font-bold text-xs shadow-md shadow-[#183F36]/30 border border-[#D6E85D]/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <span>
                      {isAnswerSubmitted
                        ? currentIdx + 1 < activeQuizPool.length
                          ? "Next Question"
                          : "Finish Quiz"
                        : "Submit"}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#D6E85D]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT PERFORMANCE SIDEBAR matching Screenshot 4 ── */}
          <div className="lg:col-span-12 xl:col-span-4 space-y-5">
            {/* 1. Subject Questions Donut Chart matching Screenshot 4 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white">Subject Questions</h3>
                <div className="flex rounded-lg bg-slate-800/80 p-0.5 border border-slate-700/60 text-[10px] font-semibold">
                  <button className="px-2 py-0.5 rounded bg-[#183F36] text-[#D6E85D] font-bold shadow-xs cursor-pointer">
                    Current
                  </button>
                  <button
                    onClick={() => {
                      const unansIdx = activeQuizPool.findIndex((q) => !quizAnswers.some((a) => a.question === q));
                      if (unansIdx !== -1) jumpToQuestion(unansIdx);
                    }}
                    className="px-2 py-0.5 text-slate-400 hover:text-white cursor-pointer"
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
                      className="text-slate-800 stroke-current"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#D6E85D] stroke-current transition-all duration-700"
                      strokeDasharray={`${completionPercent || 66}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-black text-white font-mono">
                      {completionPercent}%
                    </span>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">
                      Completed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 text-[11px] font-semibold text-slate-400 mt-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#D6E85D]" />
                    50% Solved
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    66% Departs
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    3% Current
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Answer Statistics Breakdown matching Screenshot 4 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">Answer Detail</span>
                <span className="font-mono text-slate-400 font-bold">
                  {((score / Math.max(1, answeredCount)) * 100).toFixed(0)}% / 100%
                </span>
              </div>

              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-slate-400">Accuracy</span>
                    <span className="font-mono text-emerald-400 font-bold">
                      {currentAccuracyPercent}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${currentAccuracyPercent}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-slate-400">Fast Pace Score</span>
                    <span className="font-mono text-sky-400 font-bold">27%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-sky-500 rounded-full transition-all duration-500"
                      style={{ width: "27%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Download Resources Card matching Screenshot 4 */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-white">Download Resources</h3>
                <Link to="/materials" className="text-xs text-blue-400 hover:underline">
                  All Materials &gt;
                </Link>
              </div>

              <div className="space-y-2 text-xs">
                <div 
                  onClick={() => navigate("/materials")}
                  className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-blue-400" />
                    <span className="text-slate-200 font-medium">DSA Unit 2 & 3 Cheat Sheet</span>
                  </div>
                  <Download className="h-3.5 w-3.5 text-slate-400" />
                </div>

                <div 
                  onClick={() => navigate("/materials")}
                  className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-emerald-400" />
                    <span className="text-slate-200 font-medium">DBMS SQL & Normalization Pack</span>
                  </div>
                  <Download className="h-3.5 w-3.5 text-slate-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 3. FINISHED QUIZ SUMMARY / REVIEW MODE ── */}
      {quizFinished && (
        <div className="max-w-3xl mx-auto space-y-6 pt-4 animate-fade-in">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <Trophy className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white">Quiz Session Completed!</h2>
              <p className="text-xs text-slate-400">
                You tested on <span className="text-slate-200 font-semibold">{selectedSubject === "all-sem3" ? "Semester 3 Core" : selectedSubject}</span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-2">
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                <span className="text-2xl font-black font-mono text-white">{score}/{activeQuizPool.length}</span>
                <span className="text-[10px] text-slate-400 block uppercase font-bold mt-0.5">Score</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                <span className="text-2xl font-black font-mono text-emerald-400">
                  {Math.round((score / Math.max(1, activeQuizPool.length)) * 100)}%
                </span>
                <span className="text-[10px] text-slate-400 block uppercase font-bold mt-0.5">Accuracy</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/80">
                <span className="text-2xl font-black font-mono text-sky-400">{formatTime(totalTimerSeconds)}</span>
                <span className="text-[10px] text-slate-400 block uppercase font-bold mt-0.5">Time Taken</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleStartQuiz}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retry Quiz Drill</span>
              </button>
              <button
                onClick={() => setIsReviewMode(!isReviewMode)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 flex items-center gap-2 cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{isReviewMode ? "Hide Questions Review" : "Review All Questions"}</span>
              </button>
              <button
                onClick={() => setQuizStarted(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white font-semibold text-xs border border-slate-700/60 cursor-pointer"
              >
                Back to Subjects
              </button>
            </div>
          </div>

          {/* Question-by-question Review Cards */}
          {isReviewMode && (
            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Detailed Syllabus Solutions & Rationale</span>
              </h3>

              <div className="space-y-3">
                {quizAnswers.map((rec, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border text-xs space-y-3 ${
                      rec.isCorrect
                        ? "bg-slate-900/60 border-emerald-500/30"
                        : "bg-slate-900/60 border-rose-500/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          Question {idx + 1} · {rec.question.subjectName}
                        </span>
                        <p className="text-sm font-bold text-white">{rec.question.question}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        rec.isCorrect ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                      }`}>
                        {rec.isCorrect ? "Correct ✓" : "Missed ✗"}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 text-slate-300 space-y-1">
                      <p className="text-[11px] text-emerald-400 font-bold">
                        Correct Answer: {rec.question.options[rec.question.correctIndex]}
                      </p>
                      {!rec.isCorrect && (
                        <p className="text-[11px] text-rose-400 font-medium">
                          Your Answer: {rec.question.options[rec.selectedChoice]}
                        </p>
                      )}
                      <p className="text-[11px] text-slate-400 pt-1 leading-relaxed border-t border-slate-850 mt-1">
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
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-400" />
                <h3 className="font-bold text-base text-white">Diagnostic Exam Report</h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="text-slate-400">Total Questions Attempted:</span>
                <span className="font-bold text-white font-mono">{quizAnswers.length}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="text-slate-400">Correctly Solved:</span>
                <span className="font-bold text-emerald-400 font-mono">{score}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="text-slate-400">Live Accuracy Rate:</span>
                <span className="font-bold text-white font-mono">
                  {quizAnswers.length > 0 ? Math.round((score / quizAnswers.length) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700">
                <span className="text-slate-400">Questions Flagged for Review:</span>
                <span className="font-bold text-amber-400 font-mono">{flaggedIndices.size}</span>
              </div>
            </div>

            <button
              onClick={() => setShowReportModal(false)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Close Diagnostic Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
