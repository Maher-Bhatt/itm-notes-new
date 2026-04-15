import { useState, useEffect, useCallback } from "react";
import type { MCQ } from "@/data/types";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface TestMeProps {
  mcqs: MCQ[];
  topicId: string;
  topicTitle: string;
}

export function TestMe({ mcqs, topicId, topicTitle }: TestMeProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const startTest = () => {
    const shuffled = [...mcqs].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, Math.min(5, shuffled.length));
    setQuestions(picked);
    setAnswers(new Array(picked.length).fill(null));
    setSubmitted(false);
    setTimeLeft(picked.length * 60);
    setOpen(true);
  };

  useEffect(() => {
    if (!open || submitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleSubmit();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [open, submitted, timeLeft]);

  const handleSubmit = useCallback(async () => {
    setSubmitted(true);
    const score = questions.reduce((s, q, i) => s + (answers[i] === q.correctIndex ? 1 : 0), 0);
    if (user) {
      await supabase.from("test_results").insert({
        user_id: user.id,
        topic_id: topicId,
        score,
        total_questions: questions.length,
      });
    }
  }, [questions, answers, user, topicId]);

  const score = submitted ? questions.reduce((s, q, i) => s + (answers[i] === q.correctIndex ? 1 : 0), 0) : 0;
  const pct = submitted ? Math.round((score / questions.length) * 100) : 0;

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  if (mcqs.length < 2) return null;

  return (
    <>
      <button onClick={startTest} className="apple-press pill-button bg-primary text-primary-foreground h-8 px-3.5 text-[13px] font-semibold inline-flex items-center gap-1.5">
        <Trophy className="h-3.5 w-3.5" /> Test Me
      </button>

      <Dialog open={open} onOpenChange={(v) => { if (!v && !submitted) return; setOpen(v); }}>
        <DialogContent className="sm:max-w-2xl surface-elevated border border-white/5 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-semibold flex items-center justify-between">
              <span>Test: {topicTitle}</span>
              {!submitted && (
                <span className={`flex items-center gap-1 text-sm font-mono ${timeLeft < 30 ? "text-destructive" : "text-muted-foreground"}`}>
                  <Clock className="h-4 w-4" /> {formatTime(timeLeft)}
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          {submitted ? (
            <div className="text-center py-6 animate-scale-in">
              <div className={`text-5xl font-bold mb-2 ${pct >= 80 ? "text-success" : pct >= 50 ? "text-warning" : "text-destructive"}`}>{pct}%</div>
              <p className="text-muted-foreground text-sm mb-1">You scored {score} out of {questions.length}</p>
              <p className="text-[13px] text-muted-foreground mb-6">
                {pct >= 80 ? "Excellent! 🎉" : pct >= 50 ? "Good job! Keep practicing 💪" : "Keep learning! 📚"}
              </p>

              <div className="text-left space-y-3 mt-6">
                {questions.map((q, qi) => (
                  <div key={qi} className="surface-elevated rounded-xl p-4">
                    <p className="text-[14px] font-medium mb-2">{qi + 1}. {q.question}</p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, oi) => (
                        <div key={oi} className={`text-[13px] px-3 py-2 rounded-lg flex items-center gap-2 ${
                          oi === q.correctIndex ? "bg-success/8 text-success" :
                          oi === answers[qi] ? "bg-destructive/8 text-destructive" :
                          "text-muted-foreground"
                        }`}>
                          {oi === q.correctIndex && <CheckCircle className="h-3.5 w-3.5 shrink-0" />}
                          {oi === answers[qi] && oi !== q.correctIndex && <XCircle className="h-3.5 w-3.5 shrink-0" />}
                          {opt}
                        </div>
                      ))}
                    </div>
                    <p className="text-[12px] text-muted-foreground mt-2">{q.explanation}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-6 justify-center">
                <Button onClick={startTest} variant="outline" className="gap-2 rounded-full apple-press"><RotateCcw className="h-4 w-4" /> Retry</Button>
                <button onClick={() => setOpen(false)} className="pill-button apple-press bg-primary text-primary-foreground h-10 px-5 text-sm">Done</button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {questions.map((q, qi) => (
                <div key={qi} className="surface-elevated rounded-xl p-4">
                  <p className="text-[14px] font-medium mb-3">{qi + 1}. {q.question}</p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, oi) => (
                      <button
                        key={oi}
                        onClick={() => {
                          const next = [...answers];
                          next[qi] = oi;
                          setAnswers(next);
                        }}
                        className={`apple-press w-full text-left text-[13px] px-4 py-2.5 rounded-xl border transition-colors ${
                          answers[qi] === oi
                            ? "border-primary bg-primary/8 text-foreground"
                            : "border-white/5 hover:bg-white/3"
                        }`}
                      >
                        <span className="font-medium mr-2">{String.fromCharCode(65 + oi)}.</span> {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button onClick={handleSubmit} className="pill-button apple-press bg-primary text-primary-foreground w-full h-11 text-sm font-semibold" disabled={answers.some((a) => a === null)}>
                Submit Test
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
