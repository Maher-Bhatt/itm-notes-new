import React, { useState } from "react";
import type { MCQ } from "@/data/types";
import { CheckCircle, XCircle, RotateCcw, HelpCircle, ChevronDown, ChevronUp, AlertCircle, Sparkles } from "lucide-react";

interface MCQQuizProps {
  mcqs: MCQ[];
  topicId: string;
  onComplete?: (score: number, total: number) => void;
}

interface AnswerRecord {
  question: MCQ;
  selectedIdx: number;
  isCorrect: boolean;
}

export function MCQQuiz({ mcqs, topicId, onComplete }: MCQQuizProps) {
  const [activePool, setActivePool] = useState<MCQ[]>(mcqs);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const scoreRef = React.useRef(0);
  const [finished, setFinished] = useState(false);
  const [answersRecord, setAnswersRecord] = useState<AnswerRecord[]>([]);
  const [showReview, setShowReview] = useState(false);

  // Sync if mcqs prop changes
  React.useEffect(() => {
    setActivePool(mcqs);
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    scoreRef.current = 0;
    setFinished(false);
    setAnswersRecord([]);
  }, [mcqs]);

  if (activePool.length === 0) {
    return <p className="text-sm text-muted-foreground text-center py-4">No questions available in this set.</p>;
  }

  const mcq = activePool[current];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    const isCorrect = idx === mcq.correctIndex;
    if (isCorrect) {
      setScore((s) => s + 1);
      scoreRef.current += 1;
    }
    setAnswersRecord((prev) => [
      ...prev,
      {
        question: mcq,
        selectedIdx: idx,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (current < activePool.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
      onComplete?.(scoreRef.current, activePool.length);
    }
  };

  const handleRetryFull = () => {
    setActivePool(mcqs);
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    scoreRef.current = 0;
    setFinished(false);
    setAnswersRecord([]);
    setShowReview(false);
  };

  const handleRetryMissedOnly = () => {
    const missed = answersRecord.filter((a) => !a.isCorrect).map((a) => a.question);
    if (missed.length === 0) return;
    setActivePool(missed);
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    scoreRef.current = 0;
    setFinished(false);
    setAnswersRecord([]);
    setShowReview(false);
  };

  if (finished) {
    const pct = Math.round((score / activePool.length) * 100);
    const missedCount = answersRecord.filter((a) => !a.isCorrect).length;

    return (
      <div className="py-6 animate-scale-in">
        <div className="text-center max-w-md mx-auto mb-6">
          <div
            className={`text-5xl sm:text-6xl font-black mb-2 font-mono ${
              pct >= 80 ? "text-amber-500" : pct >= 60 ? "text-amber-500" : "text-rose-500"
            }`}
          >
            {pct}%
          </div>
          <p className="text-foreground font-bold text-base mb-1">
            You scored {score} out of {activePool.length}
          </p>
          <p className="text-xs text-muted-foreground mb-4">
            {pct >= 80
              ? "Outstanding performance! 🎉 Your syllabus mastery is high."
              : pct >= 60
              ? "Good effort! Review the missed questions below to solidify your concepts 💪"
              : "Review the answers below and try retrying the missed questions! 📚"}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleRetryFull}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm hover:opacity-90 flex items-center gap-1.5 apple-press"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retry Entire Quiz</span>
            </button>

            {missedCount > 0 && (
              <button
                onClick={handleRetryMissedOnly}
                className="px-4 py-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 font-bold text-xs flex items-center gap-1.5 transition-colors apple-press"
              >
                <AlertCircle className="h-3.5 w-3.5" />
                <span>Retry {missedCount} Missed Only</span>
              </button>
            )}

            <button
              onClick={() => setShowReview(!showReview)}
              className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs border border-border flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="h-3.5 w-3.5 text-primary" />
              <span>{showReview ? "Hide Mistake Breakdown" : `Review All Answers (${answersRecord.length})`}</span>
              {showReview ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Detailed Mistake Breakdown Accordion */}
        {showReview && (
          <div className="mt-8 border-t border-border pt-6 space-y-4 max-w-2xl mx-auto animate-fade-in">
            <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Question-by-Question Mistake Breakdown & Explanations</span>
            </h4>

            <div className="space-y-4">
              {answersRecord.map((ans, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-xs space-y-2.5 ${
                    ans.isCorrect
                      ? "bg-amber-500/5 border-amber-500/30"
                      : "bg-rose-500/5 border-rose-500/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-bold text-foreground">
                      Q{idx + 1}. {ans.question.question}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase shrink-0 ${
                        ans.isCorrect
                          ? "bg-amber-500/20 text-amber-500 dark:text-amber-500"
                          : "bg-rose-500/20 text-rose-600 dark:text-rose-400"
                      }`}
                    >
                      {ans.isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  {/* Options state */}
                  <div className="space-y-1">
                    {(ans.question.options || []).map((opt, optIdx) => {
                      const isUserPick = optIdx === ans.selectedIdx;
                      const isCorrect = optIdx === ans.question.correctIndex;
                      let badgeCls = "p-2 rounded-lg flex items-center justify-between text-xs ";

                      if (isCorrect) {
                        badgeCls += "bg-amber-500/20 text-amber-500 dark:text-amber-500 font-bold border border-amber-500/40";
                      } else if (isUserPick && !ans.isCorrect) {
                        badgeCls += "bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold border border-rose-500/40";
                      } else {
                        badgeCls += "bg-secondary/40 text-muted-foreground";
                      }

                      return (
                        <div key={optIdx} className={badgeCls}>
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-background/60 flex items-center justify-center font-mono font-bold text-[10px]">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </span>
                          {isCorrect && <CheckCircle className="h-4 w-4 text-amber-500 dark:text-amber-500 shrink-0" />}
                          {isUserPick && !ans.isCorrect && <XCircle className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Official Explanation */}
                  {ans.question.explanation && (
                    <div className="p-2.5 rounded-lg bg-secondary/60 text-foreground border border-border/60 text-[11px] leading-relaxed">
                      <strong className="text-primary font-bold">University Explanation:</strong> {ans.question.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs sm:text-[13px] font-semibold text-muted-foreground">
          Question <strong className="text-foreground">{current + 1}</strong> of{" "}
          <strong className="text-foreground">{activePool.length}</strong>
        </span>
        <span className="text-xs sm:text-[13px] font-bold text-primary tabular-nums">
          Score: {score}
        </span>
      </div>

      <div className="w-full bg-secondary rounded-full h-1.5 mb-6 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300"
          style={{ width: `${((current + 1) / activePool.length) * 100}%` }}
        />
      </div>

      <h4 className="text-base sm:text-lg font-bold mb-4 text-foreground leading-snug">
        {mcq.question}
      </h4>

      <div className="space-y-2.5 mb-6">
        {(mcq?.options || []).map((opt, i) => {
          let cls = "apple-press w-full text-left py-3 px-4 rounded-xl border transition-all text-xs sm:text-sm font-medium ";
          if (showResult) {
            if (i === mcq.correctIndex) cls += "border-amber-500/40 bg-amber-500/10 text-amber-500 dark:text-amber-500 font-bold ";
            else if (i === selected) cls += "border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300 font-bold ";
            else cls += "border-border opacity-40 ";
          } else {
            cls += "border-border/80 hover:bg-secondary/60 hover:border-primary/40 cursor-pointer ";
          }

          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={showResult}>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{opt}</span>
                {showResult && i === mcq.correctIndex && <CheckCircle className="ml-auto h-4 w-4 text-amber-500 shrink-0" />}
                {showResult && i === selected && i !== mcq.correctIndex && <XCircle className="ml-auto h-4 w-4 text-rose-500 shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="surface-elevated rounded-xl p-4 mb-4 border border-border animate-fade-in text-xs leading-relaxed">
          <p className="text-muted-foreground">
            <strong className="text-foreground font-bold">University Concept Explanation:</strong>{" "}
            {mcq.explanation}
          </p>
        </div>
      )}

      {showResult && (
        <button
          onClick={handleNext}
          className="pill-button apple-press bg-primary text-primary-foreground w-full h-11 text-xs sm:text-sm font-bold shadow-sm hover:opacity-90 transition-opacity"
        >
          {current < activePool.length - 1 ? "Next Question →" : "Finish & View Results →"}
        </button>
      )}
    </div>
  );
}
