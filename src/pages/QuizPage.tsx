import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { subjects, isBcaSubject } from "@/data/subjects";
import { MASSIVE_QUESTION_BANK } from "@/data/massiveQuestionBank";
import { useAuth } from "@/contexts/AuthContext";
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
import { CustomQuizBuilderModal, type CustomQuizConfig } from "@/components/CustomQuizBuilderModal";
import { QuizAttemptReviewModal, type QuizAttemptReviewData } from "@/components/QuizAttemptReviewModal";

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
  const { profile } = useAuth();
  const { recordQuizCompleted, addXp } = useGamification();

  // Degree program filter defaulting to user's enrolled program
  const userEnrolledDegree = useMemo(() => {
    return profile?.program?.toLowerCase().includes("bca") ? "bca" : "btech";
  }, [profile?.program]);

  // Selection & Config state
  const [selectedDegree, setSelectedDegree] = useState<"btech" | "bca" | "all">(userEnrolledDegree);
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedSemesterFilter, setSelectedSemesterFilter] = useState<number | "all">(profile?.semester || "all");
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
  const [isCustomBuilderOpen, setIsCustomBuilderOpen] = useState(false);
  const [customPool, setCustomPool] = useState<EnrichedMCQ[] | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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

  // Sync degree when profile loads
  useEffect(() => {
    if (profile?.program) {
      const deg = profile.program.toLowerCase().includes("bca") ? "bca" : "btech";
      setSelectedDegree(deg);
    }
  }, [profile?.program]);

  // Extract subjects with MCQs strictly matching selected degree
  const availableSubjects = useMemo(() => {
    return (subjects || [])
      .filter((s) => {
        const isBca = isBcaSubject(s);
        if (selectedDegree === "btech" && isBca) return false;
        if (selectedDegree === "bca" && !isBca) return false;
        return true;
      })
      .map((s) => {
        let count = 0;
        (s.units || []).forEach((u) => {
          (u.topics || []).forEach((t) => {
            if (t.mcqs) count += t.mcqs.length;
          });
        });
        return { ...s, totalMcqs: count };
      })
      .filter((s) => s.totalMcqs > 0);
  }, [selectedDegree]);

  // All Universal MCQs pool with full metadata across all engineering curricula
  const allUniversalMcqs = useMemo(() => {
    let pool: EnrichedMCQ[] = [];
    (availableSubjects || []).forEach((s) => {
      (s.units || []).forEach((u) => {
        (u.topics || []).forEach((t) => {
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

  const allSem3Mcqs = useMemo(() => {
    return allUniversalMcqs.filter((q) => q.subjectId.includes("sem3") || q.subjectId === "ca-101");
  }, [allUniversalMcqs]);

  // Active question pool based on selected subject, unit, and search
  const activeQuizPool = useMemo(() => {
    if (customPool && customPool.length > 0) {
      return customPool.slice(0, questionCount > 0 ? questionCount : customPool.length);
    }
    let pool: EnrichedMCQ[] = [];
    if (selectedSubject === "all" || selectedSubject === "all-subjects") {
      pool = [...allUniversalMcqs];
    } else if (selectedSubject === "all-sem3") {
      pool = [...allSem3Mcqs];
    } else {
      const subj = subjects.find((s) => s.id === selectedSubject);
      if (subj) {
        (subj.units || []).forEach((u) => {
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
  }, [selectedSubject, selectedUnitFilter, searchTopicInput, questionCount, allUniversalMcqs, allSem3Mcqs, customPool]);

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
  const handleStartCustomQuiz = (config: CustomQuizConfig) => {
    let customQuestions: EnrichedMCQ[] = [];
    config.selectedSubjectIds.forEach(subId => {
      const subj = subjects.find(s => s.id === subId);
      if (subj) {
        subj.units.forEach((u, uIdx) => {
          if (config.selectedUnits.includes(uIdx + 1)) {
            u.topics.forEach(t => {
              if (t.mcqs) {
                const tagged = t.mcqs.map(m => ({
                  ...m,
                  subjectId: subj.id,
                  subjectName: subj.name,
                  topicId: t.id,
                  topicTitle: t.title,
                  unitTitle: u.title,
                }));
                customQuestions.push(...tagged);
              }
            });
          }
        });
      }
    });

    if (customQuestions.length === 0) {
      toast.error('No MCQs found for this custom selection.');
      return;
    }

    customQuestions = customQuestions.sort(() => Math.random() - 0.5);
    const chosen = customQuestions.slice(0, config.questionCount);
    setCustomPool(chosen);
    setQuestionCount(config.questionCount);
    setIsCustomBuilderOpen(false);

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
    toast.success(`Custom Quiz started with ${chosen.length} questions across ${config.selectedSubjectIds.length} subjects!`);
  };

  const currentAttemptReviewData: QuizAttemptReviewData = useMemo(() => {
    return {
      quizTitle: selectedSubject === 'all-sem3' ? 'Semester 3 Grand Mock Drill' : selectedSubject.toUpperCase(),
      subjectCode: selectedSubject.toUpperCase(),
      score: score,
      totalQuestions: activeQuizPool.length,
      dateAttempted: new Date().toLocaleDateString(),
      questions: (activeQuizPool || []).map((q, idx) => {
        const rec = quizAnswers.find(a => a.question === q);
        return {
          questionNumber: idx + 1,
          questionText: q.question,
          options: q.options,
          userSelectedIndex: rec ? rec.selectedChoice : -1,
          correctIndex: q.correctIndex,
          explanation: q.explanation || 'Refer to the corresponding unit topic for in-depth concepts.',
        };
      })
    };
  }, [score, activeQuizPool, quizAnswers, selectedSubject]);

  const handleStartQuiz = () => {
    setCustomPool(null);
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-border">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-1">
            <Link to="/" className="hover:text-primary transition-colors">Dashboard</Link>
            <span>/</span>
            <span className="text-foreground">CampusLoop</span>
            <span>/</span>
            <span className="text-foreground font-bold">Subject Quiz</span>
          </div>

          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
              <span>Subject Quiz</span>
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/30 shadow-xs">
              Active
            </span>
            {quizStarted && !quizFinished && (
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-foreground/40 text-[#FAFAFA] border border-foreground">
                <Clock className="w-3 h-3 animate-spin text-[#FAFAFA]" />
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
              className="h-9 pl-8 pr-3 w-40 sm:w-56 rounded-xl border border-border bg-card text-xs text-foreground placeholder:text-stone-500 focus:ring-1 focus:ring-primary outline-none transition-all shadow-inner"
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
            className="h-9 px-4 rounded-xl bg-foreground hover:bg-[#27272A] text-white font-bold text-xs shadow-md shadow-foreground/30 border border-[#FAFAFA]/20 flex items-center gap-2 transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            <BarChart3 className="h-3.5 w-3.5 text-[#FAFAFA]" />
            <span>Get Report</span>
          </button>
        </div>
      </div>

      {/* ── 1. SETUP VIEW (Before launching test) ── */}
      {!quizStarted && (
        <div className="max-w-4xl mx-auto space-y-6 pt-2">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-lg backdrop-blur-sm space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>University Subject Examination & Recall Drill</span>
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Practice 2,500+ syllabus-aligned university & GATE multiple-choice questions across all semesters, chapters, and topics with instant rationales.
                </p>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold shrink-0">
                <Zap className="h-3.5 w-3.5" />
                <span>+15 XP / correct</span>
              </div>
            </div>

            {/* Degree Program Switcher */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Degree Program
              </label>
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-card rounded-xl border border-border w-fit">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDegree("btech");
                    setSelectedSubject("all");
                    setSelectedUnitFilter("all");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDegree === "btech"
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  B.Tech Engineering
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDegree("bca");
                    setSelectedSubject("all");
                    setSelectedUnitFilter("all");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDegree === "bca"
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  BCA Computer Applications
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDegree("all");
                    setSelectedSubject("all");
                    setSelectedUnitFilter("all");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDegree === "all"
                      ? "bg-foreground text-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  All Degrees
                </button>
              </div>
            </div>

            {/* Semester Filter Tabs & Subject Selector */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                  1. Filter by Semester
                </label>
                <span className="text-[11px] font-mono text-success font-bold">
                  {allUniversalMcqs.length}+ Verified University & GATE MCQs
                </span>
              </div>

              {/* Semester Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-card rounded-xl border border-border">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSemesterFilter("all");
                    setSelectedSubject("all");
                    setSelectedUnitFilter("all");
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedSemesterFilter === "all"
                      ? "bg-white text-stone-950 shadow-sm font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  All Semesters ({allUniversalMcqs.length})
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                  <button
                    key={sem}
                    type="button"
                    onClick={() => {
                      setSelectedSemesterFilter(sem);
                      const firstSubj = availableSubjects.find(s => s.semester === sem);
                      if (firstSubj) {
                        setSelectedSubject(firstSubj.id);
                        setSelectedUnitFilter("all");
                      }
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedSemesterFilter === sem
                        ? "bg-white text-stone-950 shadow-sm font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    Sem {sem}
                  </button>
                ))}
              </div>

              <label className="text-xs font-bold text-foreground uppercase tracking-wider block pt-1">
                2. Select Course / Question Pool
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSubject("all");
                    setSelectedUnitFilter("all");
                  }}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedSubject === "all"
                      ? "border-success bg-success/10 text-foreground font-bold shadow-md ring-2 ring-success/50"
                      : "border-border bg-secondary text-foreground hover:bg-secondary hover:border-primary/40"
                  }`}
                >
                  <div className="text-sm font-bold text-foreground flex items-center justify-between">
                    <span>Grand Universal Pool</span>
                    <span className="px-1.5 py-0.5 text-[10px] rounded bg-success/20 text-success font-mono">ALL</span>
                  </div>
                  <div className={`text-[11px] mt-1 font-mono flex items-center gap-1.5 ${
                    selectedSubject === "all" ? "text-success font-bold" : "text-foreground"
                  }`}>
                    <span className="w-2 h-2 rounded-full bg-success shrink-0" />
                    <span>{allUniversalMcqs.length} Total Curated MCQs</span>
                  </div>
                </button>

                {availableSubjects
                  .filter((s) => selectedSemesterFilter === "all" || s.semester === selectedSemesterFilter)
                  .map((s) => {
                    const isSelected = selectedSubject === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setSelectedSubject(s.id);
                          setSelectedUnitFilter("all");
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary/60 bg-primary/40 text-foreground font-bold shadow-md ring-2 ring-primary/50"
                            : "border-border bg-secondary text-foreground hover:bg-secondary hover:border-primary/40"
                        }`}
                      >
                        <div className="text-sm font-bold text-foreground truncate flex items-center justify-between">
                          <span className="truncate">{s.name}</span>
                          <span className="text-[10px] text-muted-foreground font-mono shrink-0 ml-1">Sem {s.semester}</span>
                        </div>
                        <div className={`text-[11px] mt-1 font-mono flex items-center gap-1.5 ${
                          isSelected ? "text-primary font-bold" : "text-foreground"
                        }`}>
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          <span>{s.totalMcqs} Practice MCQs</span>
                        </div>
                      </button>
                    );
                  })}
              </div>

              {/* Unit / Chapter Filter for Selected Subject */}
              {selectedSubject !== "all" && selectedSubject !== "all-sem3" && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                      3. Filter by Chapter / Unit
                    </label>
                    <span className="text-[11px] text-muted-foreground font-mono">Optional</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedUnitFilter("all")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        selectedUnitFilter === "all"
                          ? "bg-white text-stone-950 border-white shadow-sm font-bold"
                          : "bg-card text-foreground border-border hover:bg-secondary"
                      }`}
                    >
                      All Chapters (Full Syllabus)
                    </button>
                    {(subjects.find((s) => s.id === selectedSubject)?.units || []).map((u, uIdx) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setSelectedUnitFilter(u.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                          selectedUnitFilter === u.id
                            ? "bg-white text-stone-950 border-white shadow-sm font-bold"
                            : "bg-card text-foreground border-border hover:bg-secondary"
                        }`}
                      >
                        Unit {uIdx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Question Count Selector */}
            <div className="space-y-2.5">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Session Question Count
              </label>
              <div className="flex flex-wrap gap-2.5">
                {[5, 10, 15, 20, 30, 50, 100].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      questionCount === num
                        ? "bg-foreground text-white border-foreground font-bold shadow-sm ring-1 ring-[#FAFAFA]/40"
                        : "bg-secondary text-foreground border-border hover:bg-secondary"
                    }`}
                  >
                    {num} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Launch & Custom Quiz Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsCustomBuilderOpen(true)}
                className="px-4 py-2.5 rounded-xl border border-[#FAFAFA]/40 bg-foreground/20 hover:bg-foreground/40 text-[#FAFAFA] font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>Custom Quiz Builder (Mixed Units)</span>
              </button>
              <button
                type="button"
                onClick={handleStartQuiz}
                className="px-6 py-3 rounded-xl bg-foreground hover:bg-[#27272A] text-white font-bold text-xs shadow-lg shadow-foreground/30 border border-[#FAFAFA]/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Launch Quiz Session</span>
                <ArrowRight className="h-4 w-4 text-[#FAFAFA]" />
              </button>
            </div>
          </div>

          {/* Recent Quiz Attempts */}
          {recentScores.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
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
                      <span className={`font-mono font-bold text-sm ${
                        attempt.percentage >= 80 ? "text-primary" : attempt.percentage >= 50 ? "text-primary" : "text-destructive"
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
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Question List</h3>
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
                    btnCls += "ring-2 ring-primary/60 bg-primary/20 text-foreground font-bold ";
                  } else if (isAnswered) {
                    btnCls += isCorrect
                      ? "bg-primary/20 text-primary border border-primary/30 "
                      : "bg-destructive/20 text-destructive border border-destructive/30 ";
                  } else {
                    btnCls += "bg-secondary text-muted-foreground hover:bg-secondary hover:text-stone-200 border border-border ";
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
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary ring-2 ring-stone-900" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-border text-[10px] space-y-1 text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
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
            <div className="bg-card border border-border rounded-2xl p-5 sm:p-7 shadow-lg space-y-5 relative">
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
                  <h2 className="text-base sm:text-lg font-bold text-foreground leading-snug pt-1">
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
                          className="text-stone-800 stroke-current"
                          strokeWidth="3.5"
                          fill="none"
                          d="M4 18 a 14 14 0 0 1 28 0"
                        />
                        <path
                          className="text-primary stroke-current transition-all duration-500"
                          strokeDasharray={`${(currentAccuracyPercent / 100) * 44}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          fill="none"
                          d="M4 18 a 14 14 0 0 1 28 0"
                        />
                      </svg>
                      <span className="font-bold font-mono text-xs text-foreground z-10">
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
                          className="text-stone-800 stroke-current"
                          strokeWidth="3.5"
                          fill="none"
                          d="M4 18 a 14 14 0 0 1 28 0"
                        />
                        <path
                          className="text-primary stroke-current transition-all duration-500"
                          strokeDasharray={`${(timePercent / 100) * 44}, 100`}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          fill="none"
                          d="M4 18 a 14 14 0 0 1 28 0"
                        />
                      </svg>
                      <span className="font-bold font-mono text-xs text-foreground z-10">
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
                <span className="text-xs font-bold text-foreground block">
                  Answer choices
                </span>

                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedChoice === idx;
                  const isCorrectChoice = currentQuestion.correctIndex === idx;

                  let cardStyle = "border-border bg-card hover:border-primary/40 hover:bg-secondary text-foreground";
                  let circleStyle = "border-border text-muted-foreground bg-secondary";

                  if (isSelected && !isAnswerSubmitted) {
                    cardStyle = "border-foreground bg-foreground/25 text-foreground shadow-sm ring-1 ring-[#FAFAFA]";
                    circleStyle = "bg-foreground text-[#FAFAFA] border-foreground font-bold";
                  } else if (isAnswerSubmitted) {
                    if (isCorrectChoice) {
                      cardStyle = "border-primary/60 bg-primary/15 text-primary ring-1 ring-primary/60";
                      circleStyle = "bg-primary text-primary-foreground border-primary/60 font-bold";
                    } else if (isSelected && !isCorrectChoice) {
                      cardStyle = "border-destructive/30 bg-destructive/15 text-destructive ring-1 ring-destructive/30";
                      circleStyle = "bg-destructive text-white border-destructive/30 font-bold";
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
                <div className="p-4 rounded-xl bg-card border border-border text-xs space-y-1.5 animate-fade-in">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Syllabus Rationale & University Concept:</span>
                  </div>
                  <p className="text-foreground leading-relaxed font-sans">
                    {currentQuestion.explanation || "Official reference from ITM SLS Baroda University Course Pack."}
                  </p>
                </div>
              )}

              {/* Action Buttons matching Screenshot 4 (Cancel, Flag, Submit) */}
              <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCancelQuiz}
                  className="px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-secondary text-foreground text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleFlagQuestion(currentIdx)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      flaggedIndices.has(currentIdx)
                        ? "border-primary/50 bg-primary/20 text-primary"
                        : "border-border bg-card hover:bg-secondary text-foreground"
                    }`}
                  >
                    <Flag className="h-3.5 w-3.5" />
                    <span>{flaggedIndices.has(currentIdx) ? "Flagged" : "Flag"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmitChoice}
                    className="px-6 py-2.5 rounded-xl bg-foreground hover:bg-[#27272A] text-white font-bold text-xs shadow-md shadow-foreground/30 border border-[#FAFAFA]/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <span>
                      {isAnswerSubmitted
                        ? currentIdx + 1 < activeQuizPool.length
                          ? "Next Question"
                          : "Finish Quiz"
                        : "Submit"}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#FAFAFA]" />
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
                <h3 className="font-bold text-sm text-foreground">Subject Questions</h3>
                <div className="flex rounded-lg bg-secondary p-0.5 border border-border text-[10px] font-semibold">
                  <button
                    onClick={() => jumpToQuestion(currentIdx)}
                    className="px-2 py-0.5 rounded bg-foreground text-[#FAFAFA] font-bold shadow-xs cursor-pointer hover:bg-[#1f4e43] transition-colors"
                    title="Return to current active question"
                  >
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
                      className="text-stone-800 stroke-current"
                      strokeWidth="3.5"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#FAFAFA] stroke-current transition-all duration-700"
                      strokeDasharray={`${completionPercent || 66}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-3xl font-bold text-foreground font-mono">
                      {completionPercent}%
                    </span>
                    <span className="text-[10px] text-muted-foreground block font-semibold uppercase tracking-wider">
                      Completed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 text-[11px] font-semibold text-muted-foreground mt-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#FAFAFA]" />
                    50% Solved
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    66% Departs
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    3% Current
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Answer Statistics Breakdown matching Screenshot 4 */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Answer Detail</span>
                <span className="font-mono text-muted-foreground font-bold">
                  {((score / Math.max(1, answeredCount)) * 100).toFixed(0)}% / 100%
                </span>
              </div>

              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-mono text-primary font-bold">
                      {currentAccuracyPercent}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${currentAccuracyPercent}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-muted-foreground">Fast Pace Score</span>
                    <span className="font-mono text-primary font-bold">27%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: "27%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Download Resources Card matching Screenshot 4 */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">Download Resources</h3>
                <Link to="/materials" className="text-xs text-primary hover:underline">
                  All Materials &gt;
                </Link>
              </div>

              <div className="space-y-2 text-xs">
                <div 
                  onClick={() => navigate("/materials")}
                  className="p-2.5 rounded-xl bg-secondary border border-border hover:bg-secondary transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    <span className="text-foreground font-medium">DSA Unit 2 & 3 Cheat Sheet</span>
                  </div>
                  <Download className="h-3.5 w-3.5 text-muted-foreground" />
                </div>

                <div 
                  onClick={() => navigate("/materials")}
                  className="p-2.5 rounded-xl bg-secondary border border-border hover:bg-secondary transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
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
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg text-center space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary mx-auto flex items-center justify-center">
              <Trophy className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-foreground">Quiz Session Completed!</h2>
              <p className="text-xs text-muted-foreground">
                You tested on <span className="text-foreground font-semibold">{selectedSubject === "all-sem3" ? "Semester 3 Core" : selectedSubject}</span>
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-2">
              <div className="p-3.5 rounded-2xl bg-secondary border border-border">
                <span className="text-2xl font-bold font-mono text-foreground">{score}/{activeQuizPool.length}</span>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold mt-0.5">Score</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-secondary border border-border">
                <span className="text-2xl font-bold font-mono text-primary">
                  {Math.round((score / Math.max(1, activeQuizPool.length)) * 100)}%
                </span>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold mt-0.5">Accuracy</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-secondary border border-border">
                <span className="text-2xl font-bold font-mono text-primary">{formatTime(totalTimerSeconds)}</span>
                <span className="text-[10px] text-muted-foreground block uppercase font-bold mt-0.5">Time Taken</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleStartQuiz}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary text-primary-foreground font-bold text-xs shadow-md shadow-primary/30 flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Retry Quiz Drill</span>
              </button>
              <button
                onClick={() => setIsReviewMode(!isReviewMode)}
                className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary text-foreground font-semibold text-xs border border-border flex items-center gap-2 cursor-pointer"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{isReviewMode ? "Hide Questions Review" : "Review All Questions"}</span>
              </button>
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-foreground hover:bg-[#27272A] text-[#FAFAFA] border border-[#FAFAFA]/40 font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Award className="h-3.5 w-3.5" />
                <span>Detailed Review & Retry Mistakes</span>
              </button>
              <button
                onClick={() => setQuizStarted(false)}
                className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary text-muted-foreground hover:text-foreground font-semibold text-xs border border-border cursor-pointer"
              >
                Back to Subjects
              </button>
            </div>
          </div>

          {/* Question-by-question Review Cards */}
          {isReviewMode && (
            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <span>Detailed Syllabus Solutions & Rationale</span>
              </h3>

              <div className="space-y-3">
                {quizAnswers.map((rec, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border text-xs space-y-3 ${
                      rec.isCorrect
                        ? "bg-card border-primary/30"
                        : "bg-card border-destructive/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-muted-foreground">
                          Question {idx + 1} · {rec.question.subjectName}
                        </span>
                        <p className="text-sm font-bold text-foreground">{rec.question.question}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        rec.isCorrect ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                      }`}>
                        {rec.isCorrect ? "Correct ✓" : "Missed ✗"}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-card border border-border text-foreground space-y-1">
                      <p className="text-[11px] text-primary font-bold">
                        Correct Answer: {rec.question.options[rec.question.correctIndex]}
                      </p>
                      {!rec.isCorrect && (
                        <p className="text-[11px] text-destructive font-medium">
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
        <div className="fixed inset-0 z-50 bg-card backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-base text-foreground">Diagnostic Exam Report</h3>
              </div>
              <button
                onClick={() => setShowReportModal(false)}
                className="w-8 h-8 rounded-full bg-secondary hover:bg-secondary text-muted-foreground flex items-center justify-center cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-secondary border border-border">
                <span className="text-muted-foreground">Total Questions Attempted:</span>
                <span className="font-bold text-foreground font-mono">{quizAnswers.length}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-secondary border border-border">
                <span className="text-muted-foreground">Correctly Solved:</span>
                <span className="font-bold text-primary font-mono">{score}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-secondary border border-border">
                <span className="text-muted-foreground">Live Accuracy Rate:</span>
                <span className="font-bold text-foreground font-mono">
                  {quizAnswers.length > 0 ? Math.round((score / quizAnswers.length) * 100) : 0}%
                </span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-secondary border border-border">
                <span className="text-muted-foreground">Questions Flagged for Review:</span>
                <span className="font-bold text-primary font-mono">{flaggedIndices.size}</span>
              </div>
            </div>

            <button
              onClick={() => setShowReportModal(false)}
              className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary text-primary-foreground font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Close Diagnostic Report
            </button>
          </div>
        </div>
      )}
      <CustomQuizBuilderModal 
        isOpen={isCustomBuilderOpen} 
        onClose={() => setIsCustomBuilderOpen(false)} 
        onStartCustomQuiz={handleStartCustomQuiz} 
      />
      <QuizAttemptReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
        data={currentAttemptReviewData} 
      />
    </div>
  );
}