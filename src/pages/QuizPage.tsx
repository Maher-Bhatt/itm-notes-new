import { useState, useMemo, useEffect } from "react";
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
  Layers, 
  FileText, 
  ChevronRight, 
  ChevronLeft, 
  Download, 
  BarChart3, 
  Check, 
  X,
  Maximize2
} from "lucide-react";
import { toast } from "sonner";

export default function QuizPage() {
  const navigate = useNavigate();
  const { recordQuizCompleted, addXp } = useGamification();

  const [selectedSubject, setSelectedSubject] = useState<string>("all-sem3");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [quizStarted, setQuizStarted] = useState(false);
  
  // Active Quiz State matching Screenshot 4
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Array<{ q: MCQ; choice: number; isCorrect: boolean }>>([]);
  const [quizFinished, setQuizFinished] = useState(false);
  const [searchTopicInput, setSearchTopicInput] = useState("");

  // Recent scores in localStorage
  const [recentScores, setRecentScores] = useState<any[]>(() => {
    try {
      const raw = localStorage.getItem('itm_quiz_scores');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // Extract subjects with MCQs
  const availableSubjects = useMemo(() => {
    return subjects.map((s) => {
      let count = 0;
      s.units.forEach((u) => {
        u.topics.forEach((t) => {
          if (t.mcqs) count += t.mcqs.length;
        });
      });
      return { ...s, totalMcqs: count };
    }).filter((s) => s.totalMcqs > 0);
  }, []);

  // Combined MCQs pool
  const allSem3Mcqs = useMemo(() => {
    let pool: MCQ[] = [];
    availableSubjects.forEach((s) => {
      s.units.forEach((u) => {
        u.topics.forEach((t) => {
          if (t.mcqs && t.mcqs.length > 0) {
            const tagged = t.mcqs.map((m) => ({
              ...m,
              subjectName: s.name,
              topicTitle: t.title,
            }));
            pool = [...pool, ...tagged];
          }
        });
      });
    });
    return pool;
  }, [availableSubjects]);

  // Active MCQs list for the quiz session
  const activeQuizPool = useMemo(() => {
    let pool: MCQ[] = [];
    if (selectedSubject === "all-sem3") {
      pool = [...allSem3Mcqs];
    } else {
      const subj = subjects.find((s) => s.id === selectedSubject);
      if (subj) {
        subj.units.forEach((u) => {
          u.topics.forEach((t) => {
            if (t.mcqs) {
              const tagged = t.mcqs.map((m) => ({
                ...m,
                subjectName: subj.name,
                topicTitle: t.title,
              }));
              pool = [...pool, ...tagged];
            }
          });
        });
      }
    }
    return pool.slice(0, questionCount > 0 ? questionCount : pool.length);
  }, [selectedSubject, questionCount, allSem3Mcqs]);

  const currentQuestion = activeQuizPool[currentIdx];

  const handleStartQuiz = () => {
    if (activeQuizPool.length === 0) {
      toast.error("No questions found for this subject selection.");
      return;
    }
    setCurrentIdx(0);
    setSelectedChoice(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizAnswers([]);
    setQuizFinished(false);
    setQuizStarted(true);
    toast.success("Quiz session started! Good luck!");
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
        toast.success("Correct Answer! +15 XP earned! 🎯");
      } else {
        toast.error("Incorrect. Review the syllabus reference on the right!");
      }
      setIsAnswerSubmitted(true);
      setQuizAnswers((prev) => [
        ...prev,
        { q: currentQuestion, choice: selectedChoice, isCorrect },
      ]);
    } else {
      // Advance to next question or complete quiz
      if (currentIdx + 1 < activeQuizPool.length) {
        setCurrentIdx((prev) => prev + 1);
        setSelectedChoice(null);
        setIsAnswerSubmitted(false);
      } else {
        // Quiz completed
        setQuizFinished(true);
        const finalScore = score + (selectedChoice === currentQuestion.correctIndex ? 1 : 0);
        recordQuizCompleted(selectedSubject, finalScore, activeQuizPool.length);
        
        const newRecord = {
          subject: selectedSubject === "all-sem3" ? "All Subjects (Sem 3)" : subjects.find(s => s.id === selectedSubject)?.name || selectedSubject,
          score: finalScore,
          total: activeQuizPool.length,
          percentage: Math.round((finalScore / activeQuizPool.length) * 100),
          timestamp: new Date().toISOString(),
        };
        const updated = [newRecord, ...recentScores].slice(0, 10);
        setRecentScores(updated);
        localStorage.setItem("itm_quiz_scores", JSON.stringify(updated));
        toast.success(`Quiz completed! You scored ${finalScore}/${activeQuizPool.length}! 🏆`);
      }
    }
  };

  const handleCancelQuiz = () => {
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentIdx(0);
    setSelectedChoice(null);
    setIsAnswerSubmitted(false);
    toast.info("Quiz session cancelled.");
  };

  // Completion calculation for Donut Chart
  const completionPercent = activeQuizPool.length > 0 
    ? Math.round(((currentIdx + (isAnswerSubmitted ? 1 : 0)) / activeQuizPool.length) * 100)
    : 0;
  const accuracyPercent = quizAnswers.length > 0 
    ? Math.round((score / quizAnswers.length) * 100) 
    : 41; // Default fallback to screenshot 4 value

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 animate-fade-in">
      {/* ── TOP BREADCRUMBS & HEADER matching Screenshot 4 ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium mb-1">
            <span>Dashboard (1)</span>
            <span>/</span>
            <span>ITM Notes</span>
            <span>/</span>
            <span className="text-foreground font-bold">Quiz</span>
          </div>

          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-black tracking-tight text-foreground">
              Subject Quiz
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Active
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Change topic..."
              value={searchTopicInput}
              onChange={(e) => setSearchTopicInput(e.target.value)}
              className="h-9 pl-8 pr-3 w-40 sm:w-52 rounded-xl border border-input bg-card text-xs focus:ring-1 focus:ring-primary outline-none"
            />
          </div>

          <button
            onClick={() => {
              if (quizAnswers.length > 0) {
                toast.success(`Score Report: ${score}/${quizAnswers.length} correct (${accuracyPercent}%)`);
              } else {
                toast.info("Complete quiz questions to generate report.");
              }
            }}
            className="h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all active:scale-95 shrink-0"
          >
            <BarChart3 className="h-3.5 w-3.5" />
            <span>Get Report</span>
          </button>
        </div>
      </div>

      {/* ── QUIZ SETUP VIEW (When not in an active session) ── */}
      {!quizStarted && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">Start Active Recall Practice</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Challenge yourself on official university curriculum questions with instant feedback and accuracy tracking.
              </p>
            </div>

            {/* Subject Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">
                Select Subject / Question Pool
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedSubject("all-sem3")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedSubject === "all-sem3"
                      ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                      : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  <div className="text-xs font-bold">All Semester 3 Core</div>
                  <div className="text-[10px] opacity-80 mt-0.5 font-mono">{allSem3Mcqs.length} Total MCQs</div>
                </button>

                {availableSubjects.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSubject(s.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedSubject === s.id
                        ? "border-primary bg-primary/10 text-primary font-bold shadow-xs"
                        : "border-border bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{s.name}</div>
                    <div className="text-[10px] opacity-80 mt-0.5 font-mono">{s.totalMcqs} Practice MCQs</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-foreground block">
                Session Question Count
              </label>
              <div className="flex flex-wrap gap-2">
                {[5, 10, 15, 20].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setQuestionCount(num)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                      questionCount === num
                        ? "bg-primary text-primary-foreground border-primary font-bold shadow-xs"
                        : "bg-secondary text-foreground border-border hover:bg-secondary/80"
                    }`}
                  >
                    {num} Questions
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={handleStartQuiz}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Launch Quiz Session</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Recent Quiz Attempts */}
          {recentScores.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-sm text-foreground">Recent Practice Attempts</h3>
              <div className="divide-y divide-border/60">
                {recentScores.map((attempt, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-foreground">{attempt.subject}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {new Date(attempt.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-black text-primary text-sm">
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

      {/* ── ACTIVE QUIZ VIEW matching Screenshot 4 ── */}
      {quizStarted && !quizFinished && currentQuestion && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* ── CENTRAL QUIZ CANVAS (~65% width -> lg:col-span-8) ── */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 relative">
              {/* Question Header & Gauges Row matching Screenshot 4 */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-border/60">
                <div className="space-y-1 max-w-md">
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                    Question ({currentIdx + 1} of {activeQuizPool.length})
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                    {currentQuestion.question}
                  </h2>
                </div>

                {/* Accuracy & Time Semi-Circle Gauges matching Screenshot 4 */}
                <div className="flex items-center gap-4 shrink-0">
                  {/* Gauge 1: 41% Topic Accuracy */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-16 h-10 overflow-hidden flex items-end justify-center">
                      <div className="w-16 h-16 rounded-full border-4 border-secondary border-t-emerald-500 border-r-emerald-500 transform -rotate-45" />
                      <span className="absolute bottom-0 font-black font-mono text-sm text-foreground">
                        41%
                      </span>
                    </div>
                    <span className="text-[9px] text-muted-foreground mt-1 uppercase font-semibold">
                      Topic Acc
                    </span>
                  </div>

                  {/* Gauge 2: 24% Time Elapsed */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative w-16 h-10 overflow-hidden flex items-end justify-center">
                      <div className="w-16 h-16 rounded-full border-4 border-secondary border-t-sky-500 border-r-sky-500 transform -rotate-12" />
                      <span className="absolute bottom-0 font-black font-mono text-sm text-foreground">
                        24%
                      </span>
                    </div>
                    <span className="text-[9px] text-muted-foreground mt-1 uppercase font-semibold">
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

                  let cardStyle = "border-border bg-card hover:border-primary/50 text-foreground";
                  let circleStyle = "border-muted-foreground/40 text-muted-foreground";

                  if (isSelected && !isAnswerSubmitted) {
                    cardStyle = "border-blue-600 bg-blue-50/50 dark:bg-blue-950/20 text-foreground shadow-sm ring-1 ring-blue-600";
                    circleStyle = "bg-blue-600 text-white border-blue-600 font-bold";
                  } else if (isAnswerSubmitted) {
                    if (isCorrectChoice) {
                      cardStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 ring-1 ring-emerald-500";
                      circleStyle = "bg-emerald-500 text-white border-emerald-500 font-bold";
                    } else if (isSelected && !isCorrectChoice) {
                      cardStyle = "border-rose-500 bg-rose-500/10 text-rose-900 dark:text-rose-200 ring-1 ring-rose-500";
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

              {/* Explanation Note when Answered */}
              {isAnswerSubmitted && (
                <div className="p-3.5 rounded-xl bg-secondary/50 border border-border text-xs space-y-1">
                  <span className="font-bold text-foreground">Syllabus Rationale:</span>
                  <p className="text-muted-foreground leading-relaxed">
                    {currentQuestion.explanation || "Official reference from ITM SLS Baroda University Course Pack."}
                  </p>
                </div>
              )}

              {/* Action Buttons matching Screenshot 4 (Cancel & Submit) */}
              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleCancelQuiz}
                  className="px-5 py-2.5 rounded-xl border border-input bg-background hover:bg-secondary text-foreground text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSubmitChoice}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/30 transition-all flex items-center gap-2 active:scale-95"
                >
                  <span>{isAnswerSubmitted ? (currentIdx + 1 < activeQuizPool.length ? "Next Question" : "Finish Quiz") : "Submit"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT PERFORMANCE SIDEBAR (~35% width -> lg:col-span-4) matching Screenshot 4 ── */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. Subject Questions Donut Chart matching Screenshot 4 */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">Subject Questions</h3>
                <div className="flex rounded-lg bg-secondary p-0.5 border border-border text-[10px] font-semibold">
                  <button className="px-2 py-0.5 rounded bg-background text-foreground font-bold shadow-xs">Current</button>
                  <button className="px-2 py-0.5 text-muted-foreground">Skipped</button>
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
                      className="text-blue-600 stroke-current transition-all duration-700"
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
                    <span className="text-[10px] text-muted-foreground block font-semibold uppercase">
                      Completed
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4 text-[11px] font-semibold text-muted-foreground mt-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    50% Solved
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    66% Departs
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-orange-500" />
                    3% Current
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Answer Statistics Breakdown matching Screenshot 4 */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">Answer Detail</span>
                <span className="font-mono text-muted-foreground font-bold">2,50% / 100%</span>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-muted-foreground">Accuracy</span>
                    <span className="font-mono text-foreground font-bold">45%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "45%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-semibold mb-1">
                    <span className="text-muted-foreground">Fast Pace Score</span>
                    <span className="font-mono text-foreground font-bold">27%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: "27%" }} />
                  </div>
                </div>
              </div>

              <div className="pt-2 text-[10px] text-muted-foreground/80 font-mono">
                Total bonus: +{score * 15} XP accrued
              </div>
            </div>

            {/* 3. Downloadable Resources & Cheat Drives Box matching Screenshot 4 */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-foreground">Download Resources</h3>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <button className="p-0.5 rounded hover:bg-secondary"><ChevronLeft className="h-3.5 w-3.5" /></button>
                  <button className="p-0.5 rounded hover:bg-secondary"><ChevronRight className="h-3.5 w-3.5" /></button>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-muted-foreground">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                  Location: Cheat Drives
                </span>
                <p className="hover:text-foreground cursor-pointer transition-colors">
                  • Direct link to: Chapter 1: PDF
                </p>
                <p className="hover:text-foreground cursor-pointer transition-colors">
                  • Reference: Slide 1 Topics
                </p>
                <p className="hover:text-foreground cursor-pointer transition-colors">
                  • Dialog Notes: Quick Ref TOP 5
                </p>
                <p className="hover:text-foreground cursor-pointer transition-colors">
                  • Exploratory Notes 3. List 14 2. Test in questions
                </p>
              </div>

              <Link to="/materials" className="text-xs text-primary font-semibold hover:underline block pt-1">
                Show more &gt;
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── QUIZ FINISHED CELEBRATION VIEW ── */}
      {quizFinished && (
        <div className="max-w-xl mx-auto bg-card border border-border rounded-2xl p-8 text-center shadow-xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center">
            <Trophy className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-black text-foreground">Quiz Session Complete!</h2>
            <p className="text-xs text-muted-foreground">
              Great job practicing active recall for {selectedSubject}.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-secondary/50 border border-border max-w-sm mx-auto">
            <span className="text-4xl font-black font-mono text-primary block">
              {score}/{activeQuizPool.length}
            </span>
            <span className="text-xs font-bold text-muted-foreground">
              {accuracyPercent}% Final Accuracy Score
            </span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handleStartQuiz}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm hover:opacity-90 flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retry Quiz</span>
            </button>
            <button
              onClick={() => setQuizStarted(false)}
              className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs"
            >
              Back to Overview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
