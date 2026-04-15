import { Link, useNavigate } from "react-router-dom";
import { subjects, getAllTopicIds } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import { ArrowRight, BookOpen, GraduationCap, Zap, Target, Code, Cpu, BarChart3, DollarSign, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SupportFlow, useSupportFlow } from "@/components/SupportFlow";

const subjectIcons: Record<string, React.ReactNode> = {
  "python": <Code className="h-5 w-5" />,
  "c-lang": <span className="font-mono font-bold text-base">C</span>,
  "digital-electronics": <Cpu className="h-5 w-5" />,
  "prob-stats": <BarChart3 className="h-5 w-5" />,
  "financial-accounting": <DollarSign className="h-5 w-5" />,
};

export default function Index() {
  const { getSubjectProgress } = useProgress();
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { shouldShow, dismiss } = useSupportFlow();

  const totalTopics = subjects.reduce((sum, s) => sum + getAllTopicIds(s.id).length, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <SupportFlow open={shouldShow} onDismiss={dismiss} />
      <Header onSearchOpen={() => setSearchOpen(true)} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center animate-slide-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.05]">
            Learn smarter,<br />
            <span className="text-primary">not harder.</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
            Clear explanations, real examples, and interactive quizzes.
            Built for ITM engineering students.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => document.getElementById("subjects")?.scrollIntoView({ behavior: "smooth" })}
              className="pill-button apple-press bg-primary text-primary-foreground h-12 px-8 text-base inline-flex items-center gap-2"
            >
              Start Learning <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="pill-button apple-press surface-elevated-hover h-12 px-8 text-base text-foreground inline-flex items-center gap-2"
            >
              <GraduationCap className="h-4 w-4" /> Sign In
            </button>
          </div>
        </div>

        {/* iOS Widget-style stats */}
        <div className="grid grid-cols-3 gap-3 mt-16 max-w-sm mx-auto">
          {[
            { icon: BookOpen, label: "Subjects", value: subjects.length },
            { icon: Target, label: "Topics", value: totalTopics },
            { icon: Zap, label: "MCQs", value: "100+" },
          ].map((stat) => (
            <div key={stat.label} className="surface-elevated rounded-2xl p-4 text-center">
              <stat.icon className="h-4 w-4 text-primary mx-auto mb-2 opacity-80" />
              <div className="font-bold text-xl tabular-nums">{stat.value}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Subjects */}
      <section id="subjects" className="max-w-3xl mx-auto px-6 py-16 flex-1 w-full">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-1">Subjects</h2>
        <div className="inset-group">
          {subjects.map((subject) => {
            const topicIds = getAllTopicIds(subject.id);
            const progress = getSubjectProgress(topicIds);
            const icon = subjectIcons[subject.id];
            return (
              <button
                key={subject.id}
                onClick={() => navigate(`/subject/${subject.id}`)}
                className="inset-group-item apple-press w-full flex items-center gap-3.5 text-left"
              >
                <div className="w-9 h-9 rounded-xl bg-primary/12 flex items-center justify-center text-primary shrink-0">
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[15px]">{subject.name}</h3>
                  <p className="text-[13px] text-muted-foreground truncate">{topicIds.length} topics · Sem {subject.semester}</p>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  {progress > 0 && (
                    <span className="text-xs font-medium text-primary tabular-nums">{progress}%</span>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
