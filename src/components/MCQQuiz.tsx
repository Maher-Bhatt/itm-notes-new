import { useState } from "react";
import type { MCQ } from "@/data/types";
import { CheckCircle, XCircle } from "lucide-react";

interface MCQQuizProps {
  mcqs: MCQ[];
  topicId: string;
  onComplete?: (score: number, total: number) => void;
}

export function MCQQuiz({ mcqs, topicId, onComplete }: MCQQuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const mcq = mcqs[current];

  const handleSelect = (idx: number) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === mcq.correctIndex) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (current < mcqs.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      // Score already updated in handleSelect — just finish
      setFinished(true);
      onComplete?.(score + (selected === mcq.correctIndex ? 1 : 0), mcqs.length);
    }
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setFinished(false);
  };

  if (mcqs.length === 0) {
    return <p className="text-sm text-muted-foreground text-center py-4">No questions available yet.</p>;
  }

  if (finished) {
    const pct = Math.round((score / mcqs.length) * 100);
    return (
      <div className="text-center py-8 animate-scale-in">
        <div className={`text-5xl font-bold mb-2 ${pct >= 80 ? "text-success" : pct >= 60 ? "text-warning" : "text-destructive"}`}>
          {pct}%
        </div>
        <p className="text-muted-foreground text-sm mb-1">You scored {score} out of {mcqs.length}</p>
        <p className="text-[13px] text-muted-foreground mb-6">
          {pct >= 80 ? "Excellent! 🎉" : pct >= 60 ? "Good job! Keep practicing 💪" : "Keep learning, you'll get there! 📚"}
        </p>
        <button
          onClick={handleRetry}
          className="pill-button apple-press surface-elevated-hover h-9 px-5 text-[13px] font-medium inline-flex items-center"
        >
          Retry Quiz
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[13px] font-medium text-muted-foreground">Question {current + 1} of {mcqs.length}</span>
        <span className="text-[13px] font-medium text-primary tabular-nums">Score: {score}</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-1 mb-6">
        <div
          className="bg-primary h-1 rounded-full transition-all duration-300"
          style={{ width: `${((current + 1) / mcqs.length) * 100}%` }}
        />
      </div>
      <h4 className="text-[16px] font-semibold mb-4">{mcq.question}</h4>
      <div className="space-y-2 mb-6">
        {mcq.options.map((opt, i) => {
          let cls = "apple-press w-full text-left py-3 px-4 rounded border transition-colors text-[14px] ";
          if (showResult) {
            if (i === mcq.correctIndex) cls += "border-success/30 bg-success/6 ";
            else if (i === selected) cls += "border-destructive/30 bg-destructive/6 ";
            else cls += "border opacity-40 ";
          } else {
            cls += "border hover:bg-secondary cursor-pointer ";
          }
          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={showResult}>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-md border border flex items-center justify-center text-[12px] font-medium shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span>{opt}</span>
                {showResult && i === mcq.correctIndex && <CheckCircle className="ml-auto h-4 w-4 text-success shrink-0" />}
                {showResult && i === selected && i !== mcq.correctIndex && <XCircle className="ml-auto h-4 w-4 text-destructive shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>
      {showResult && (
        <div className="surface-elevated rounded p-4 mb-4 animate-fade-in">
          <p className="text-[13px] text-muted-foreground">
            <strong className="text-foreground">Explanation:</strong> {mcq.explanation}
          </p>
        </div>
      )}
      {showResult && (
        <button onClick={handleNext} className="pill-button apple-press bg-primary text-primary-foreground w-full h-11 text-[14px] font-semibold">
          {current < mcqs.length - 1 ? "Next Question" : "See Results"}
        </button>
      )}
    </div>
  );
}
