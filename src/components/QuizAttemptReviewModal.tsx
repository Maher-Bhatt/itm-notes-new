import { useState } from "react";
import { X, CheckCircle2, XCircle, RotateCcw, Award, HelpCircle } from "lucide-react";

export interface ReviewQuestionItem {
  questionNumber: number;
  questionText: string;
  options: string[];
  userSelectedIndex: number;
  correctIndex: number;
  explanation: string;
}

export interface QuizAttemptReviewData {
  quizTitle: string;
  subjectCode?: string;
  score: number;
  totalQuestions: number;
  dateAttempted: string;
  questions: ReviewQuestionItem[];
}

interface QuizAttemptReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: QuizAttemptReviewData | null;
  onRetryMistakes?: (incorrectQuestions: ReviewQuestionItem[]) => void;
}

export function QuizAttemptReviewModal({
  isOpen,
  onClose,
  data,
  onRetryMistakes,
}: QuizAttemptReviewModalProps) {
  const [filterMode, setFilterMode] = useState<"all" | "incorrect" | "correct">("all");

  if (!isOpen || !data) return null;

  const percent = Math.round((data.score / Math.max(1, data.totalQuestions)) * 100);
  const incorrectList = data.questions.filter((q) => q.userSelectedIndex !== q.correctIndex);

  const displayedQuestions = data.questions.filter((q) => {
    const isCorrect = q.userSelectedIndex === q.correctIndex;
    if (filterMode === "correct") return isCorrect;
    if (filterMode === "incorrect") return !isCorrect;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#183F36] via-[#1D4A3F] to-[#12332C] text-white flex items-center justify-between border-b border-[#D6E85D]/30 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#D6E85D] text-[#183F36]">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-black uppercase px-2 py-0.2 rounded bg-[#D6E85D] text-[#183F36]">
                  Quiz Review
                </span>
                <span className="text-xs text-[#D6E85D] font-bold font-mono">
                  Score: {data.score}/{data.totalQuestions} ({percent}%)
                </span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white font-display">
                {data.quizTitle}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter Tabs & Quick Action */}
        <div className="p-3 bg-secondary/30 border-b border-border flex items-center justify-between gap-2 text-xs shrink-0">
          <div className="flex rounded-lg bg-secondary p-0.5 font-semibold text-[11px]">
            <button
              onClick={() => setFilterMode("all")}
              className={`px-2.5 py-1 rounded-md transition-all ${
                filterMode === "all" ? "bg-background text-foreground font-bold shadow-2xs" : "text-muted-foreground"
              }`}
            >
              All ({data.totalQuestions})
            </button>
            <button
              onClick={() => setFilterMode("incorrect")}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                filterMode === "incorrect" ? "bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold shadow-2xs" : "text-muted-foreground"
              }`}
            >
              Mistakes ({incorrectList.length})
            </button>
            <button
              onClick={() => setFilterMode("correct")}
              className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
                filterMode === "correct" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold shadow-2xs" : "text-muted-foreground"
              }`}
            >
              Correct ({data.score})
            </button>
          </div>

          {incorrectList.length > 0 && onRetryMistakes && (
            <button
              onClick={() => {
                onRetryMistakes(incorrectList);
                onClose();
              }}
              className="h-8 px-3 rounded-lg bg-primary text-primary-foreground font-bold text-xs flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-all cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Retry Mistakes ({incorrectList.length})</span>
            </button>
          )}
        </div>

        {/* Question List */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {displayedQuestions.map((q, idx) => {
            const isCorrect = q.userSelectedIndex === q.correctIndex;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl border space-y-3 ${
                  isCorrect
                    ? "border-emerald-500/30 bg-emerald-500/5"
                    : "border-rose-500/30 bg-rose-500/5"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                    )}
                    <h4 className="font-bold text-xs sm:text-sm text-foreground">
                      Q{q.questionNumber}: {q.questionText}
                    </h4>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold shrink-0 ${
                      isCorrect
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        : "bg-rose-500/20 text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {isCorrect ? "+1 Mark" : "0 Marks"}
                  </span>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, optIdx) => {
                    const isUserPick = q.userSelectedIndex === optIdx;
                    const isAnswer = q.correctIndex === optIdx;

                    let optClass = "border-border/60 bg-secondary/30 text-muted-foreground";
                    if (isAnswer) {
                      optClass = "border-emerald-500/60 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold";
                    } else if (isUserPick && !isCorrect) {
                      optClass = "border-rose-500/60 bg-rose-500/15 text-rose-700 dark:text-rose-300 line-through font-medium";
                    }

                    return (
                      <div key={optIdx} className={`p-2 rounded-xl border flex items-center justify-between text-[11px] ${optClass}`}>
                        <span>{opt}</span>
                        {isAnswer && <span className="text-[9px] font-mono uppercase bg-emerald-500 text-white px-1.5 py-0.2 rounded font-black">Correct</span>}
                        {isUserPick && !isCorrect && <span className="text-[9px] font-mono uppercase bg-rose-500 text-white px-1.5 py-0.2 rounded font-black">Your Choice</span>}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation */}
                {q.explanation && (
                  <div className="p-3 rounded-xl bg-card border border-border/80 text-xs leading-relaxed text-foreground/80 space-y-1">
                    <strong className="text-[10px] uppercase font-bold text-primary block">
                      Explanation & University Concept:
                    </strong>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
