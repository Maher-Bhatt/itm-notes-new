import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchDialog } from "@/components/SearchDialog";
import { BookOpen, ChevronRight, HelpCircle } from "lucide-react";

const IMP_SUBJECTS = [
  {
    id: "c-programming",
    name: "Programming in C",
    description: "Units 4–8 · Pointers, Structures, I/O, UNIX, Standard Library",
    units: "5 Units",
    questions: "15 MCQs · 15 Important Questions · 6 Programs",
    badge: "CET Exam",
  },
];

export default function ImpQuestionsSubjectsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/auth");
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <Header onSearchOpen={() => setSearchOpen(true)} showBack backTo="/" />

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-10 animate-fade-in">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h1 className="text-2xl font-bold">IMP Questions</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Curated MCQs, important theory questions, and programs for your CET exam.
          </p>
        </div>

        <div className="space-y-3">
          {IMP_SUBJECTS.map((subject) => (
            <button
              key={subject.id}
              onClick={() => navigate(`/imp-questions/${subject.id}`)}
              className="group w-full surface-elevated rounded p-4 flex items-center gap-4 text-left hover:bg-secondary transition-all duration-150 apple-press"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h3 className="font-semibold text-base">{subject.name}</h3>
                  <span className="text-[10px] font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full shrink-0">
                    {subject.badge}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-1">{subject.description}</p>
                <p className="text-[11px] text-muted-foreground/70">{subject.questions}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors shrink-0" />
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground/50 mt-8 text-center">
          More subjects coming soon
        </p>
      </main>

      <Footer />
    </div>
  );
}
