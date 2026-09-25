import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { subjects, getAllTopicIds, getTopic } from "@/data/subjects";
import { MCQQuiz } from "@/components/MCQQuiz";
import { Button } from "@/components/ui/button";

export default function QuizPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [quizStarted, setQuizStarted] = useState(false);

  const availableSubjects = subjects.filter(s => {
    return s.units.some(u => u.topics.some(t => t.mcqs && t.mcqs.length > 0));
  });

  const mcqs = useMemo(() => {
    if (!selectedSubject) return [];
    const subj = subjects.find(s => s.id === selectedSubject);
    if (!subj) return [];
    
    // Gather all MCQs
    let allMcqs: any[] = [];
    subj.units.forEach(u => {
      u.topics.forEach(t => {
        if (t.mcqs) {
          allMcqs = [...allMcqs, ...t.mcqs];
        }
      });
    });

    // Shuffle and pick top 10
    return allMcqs.sort(() => 0.5 - Math.random()).slice(0, 10);
  }, [selectedSubject]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10 animate-fade-in">
        <h1 className="text-3xl font-bold mb-2">Practice Quiz</h1>
        <p className="text-muted-foreground mb-8">Test your knowledge across an entire subject.</p>

        {!quizStarted ? (
          <div className="surface-elevated rounded-xl p-8 max-w-md mx-auto">
            <h2 className="text-lg font-semibold mb-4">Select Subject</h2>
            <div className="space-y-4">
              {availableSubjects.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubject(s.id)}
                  className={`w-full text-left px-4 py-3 rounded-md border transition-all apple-press ${selectedSubject === s.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:bg-secondary"}`}
                >
                  <span className="font-medium">{s.name}</span>
                </button>
              ))}
            </div>
            
            <Button 
              className="w-full mt-8" 
              disabled={!selectedSubject}
              onClick={() => setQuizStarted(true)}
            >
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-semibold text-lg">{subjects.find(s => s.id === selectedSubject)?.name} - Mixed Quiz</h2>
              <button onClick={() => setQuizStarted(false)} className="text-sm text-muted-foreground hover:text-foreground">Quit</button>
            </div>
            <MCQQuiz mcqs={mcqs} topicId={`mixed-${selectedSubject}`} onComplete={() => {}} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
