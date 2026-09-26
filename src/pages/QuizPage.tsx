import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { subjects } from "@/data/subjects";
import { MCQQuiz } from "@/components/MCQQuiz";
import { Button } from "@/components/ui/button";
import { useGamification } from "@/hooks/useGamification";
import { 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Layers, 
  Award,
  ChevronRight,
  Flame,
  Zap
} from "lucide-react";
import { toast } from "sonner";

export default function QuizPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("all-sem3");
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [quizStarted, setQuizStarted] = useState(false);
  const { recordQuizCompleted, addXp } = useGamification();

  // Get subjects that have MCQs
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

  // Total MCQs across all Semester 3 subjects
  const allSem3Mcqs = useMemo(() => {
    let pool: any[] = [];
    availableSubjects.forEach((s) => {
      s.units.forEach((u) => {
        u.topics.forEach((t) => {
          if (t.mcqs && t.mcqs.length > 0) {
            const tagged = t.mcqs.map((m: any) => ({
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

  // Selected MCQs pool based on subject and count
  const mcqs = useMemo(() => {
    let pool: any[] = [];

    if (selectedSubject === "all-sem3") {
      pool = [...allSem3Mcqs];
    } else {
      const subj = subjects.find((s) => s.id === selectedSubject);
      if (subj) {
        subj.units.forEach((u) => {
          u.topics.forEach((t) => {
            if (t.mcqs) {
              const tagged = t.mcqs.map((m: any) => ({
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

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());

    // Slice according to selected question count (or all if questionCount is greater)
    if (questionCount === 0 || questionCount >= shuffled.length) {
      return shuffled;
    }
    return shuffled.slice(0, questionCount);
  }, [selectedSubject, questionCount, allSem3Mcqs]);

  // Current pool size for the selected subject
  const currentPoolSize = useMemo(() => {
    if (selectedSubject === "all-sem3") return allSem3Mcqs.length;
    const found = availableSubjects.find((s) => s.id === selectedSubject);
    return found ? found.totalMcqs : 0;
  }, [selectedSubject, allSem3Mcqs, availableSubjects]);

  const handleQuizComplete = (score: number, total: number) => {
    recordQuizCompleted(score, total);
    try {
      const raw = localStorage.getItem('itm_quiz_scores');
      const list = raw ? JSON.parse(raw) : [];
      list.unshift({
        id: `quiz-${Date.now()}`,
        subjectId: selectedSubject,
        subjectName: selectedSubject === 'all-sem3' ? 'All Subjects Mock' : (selectedSubjectObj?.name || selectedSubject),
        score,
        total,
        percentage: Math.round((score / total) * 100),
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('itm_quiz_scores', JSON.stringify(list.slice(0, 30)));
    } catch {}
    toast.success(`Quiz Completed! You scored ${score} / ${total}`, {
      description: score === total ? "Perfect Score! 🌟 +100 Bonus XP" : "+50 XP awarded to your profile.",
    });
  };

  const selectedSubjectObj = subjects.find((s) => s.id === selectedSubject);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 animate-fade-in">
        {/* Banner */}
        <div className="bg-gradient-to-r from-primary/10 via-secondary/40 to-background border border-border/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/30">
              Exam Practice & Recall
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
              <Zap className="h-3 w-3" /> Earn Up to 100 XP
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-2 tracking-tight">
            Interactive Subject Quiz
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
            Reinforce your concepts with university multiple-choice questions. Select your target subject and customize the number of questions.
          </p>
        </div>

        {!quizStarted ? (
          <div className="space-y-8">
            {/* Step 1: Choose Subject */}
            <div className="surface-elevated rounded-2xl p-6 border border-border">
              <h2 className="text-base font-bold text-foreground mb-1 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Step 1: Choose Subject or Grand Mock Exam
              </h2>
              <p className="text-xs text-muted-foreground mb-4">
                Select a single subject or test yourself with an integrated multi-subject examination.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Grand Mock Option */}
                <button
                  onClick={() => setSelectedSubject("all-sem3")}
                  className={`p-4 rounded-xl border text-left transition-all apple-press relative ${
                    selectedSubject === "all-sem3"
                      ? "border-primary bg-primary/10 ring-1 ring-primary shadow-sm"
                      : "border-border hover:bg-secondary/60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-foreground flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      All Subjects (Grand Mock Exam)
                    </span>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-primary">
                      {allSem3Mcqs.length} MCQs
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    Integrated questions from DSA, DBMS, Java, Computer Architecture & COANMP
                  </p>
                </button>

                {/* Individual Subjects */}
                {availableSubjects.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSubject(s.id)}
                    className={`p-4 rounded-xl border text-left transition-all apple-press ${
                      selectedSubject === s.id
                        ? "border-primary bg-primary/10 ring-1 ring-primary shadow-sm"
                        : "border-border hover:bg-secondary/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-foreground truncate pr-2">
                        {s.name}
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground shrink-0 font-mono">
                        {s.totalMcqs} MCQs
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {s.code} · Semester {s.semester || 3}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Question Count */}
            <div className="surface-elevated rounded-2xl p-6 border border-border">
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Layers className="h-4 w-4 text-primary" />
                  Step 2: Choose Number of Questions
                </h2>
                <span className="text-xs font-semibold text-muted-foreground">
                  Available in Bank: <strong className="text-foreground">{currentPoolSize}</strong>
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Pick your preferred quiz length based on your study schedule.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-6 gap-2.5">
                {[
                  { count: 5, label: "5 Quick" },
                  { count: 10, label: "10 Standard" },
                  { count: 15, label: "15 Sprint" },
                  { count: 20, label: "20 Deep" },
                  { count: 25, label: "25 Exam" },
                  { count: 0, label: `All (${currentPoolSize})` },
                ].map((opt) => (
                  <button
                    key={opt.count}
                    onClick={() => setQuestionCount(opt.count)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border text-center ${
                      questionCount === opt.count
                        ? "bg-primary text-primary-foreground border-primary shadow-sm ring-1 ring-primary"
                        : "bg-secondary/40 text-muted-foreground hover:text-foreground border-border/80 hover:bg-secondary"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Start CTA */}
            <div className="p-6 rounded-2xl bg-secondary/30 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-sm text-foreground">
                  Ready to test your knowledge?
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Starting quiz with <strong>{mcqs.length} questions</strong> from{" "}
                  <strong>{selectedSubject === "all-sem3" ? "All Semester 3 Subjects" : selectedSubjectObj?.name}</strong>.
                </p>
              </div>

              <Button
                size="lg"
                className="w-full sm:w-auto px-8 font-bold shadow-md apple-press"
                onClick={() => setQuizStarted(true)}
                disabled={mcqs.length === 0}
              >
                Start Practice Quiz ({mcqs.length} Questions)
              </Button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in space-y-6">
            <div className="surface-elevated rounded-2xl p-4 sm:p-5 border border-border flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary block mb-0.5">
                  Active Practice Session
                </span>
                <h2 className="font-bold text-base sm:text-lg text-foreground">
                  {selectedSubject === "all-sem3" ? "All Subjects Grand Mock Exam" : selectedSubjectObj?.name}
                </h2>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuizStarted(false)}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground"
              >
                Quit Quiz
              </Button>
            </div>

            <div className="surface-elevated rounded-2xl p-6 sm:p-8 border border-border">
              <MCQQuiz
                mcqs={mcqs}
                topicId={`quiz-${selectedSubject}-${questionCount}`}
                onComplete={handleQuizComplete}
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
