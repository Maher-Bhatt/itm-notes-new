import { useParams, Link, useNavigate } from "react-router-dom";
import { getSubject, getAllTopicIds } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import { CheckCircle, BookOpen, Bookmark, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function ProgressRing({ progress, size = 44, strokeWidth = 3 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="progress-ring">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(211, 100%, 50%)" strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} className="progress-ring-circle" />
    </svg>
  );
}

export default function SubjectDashboard() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const subject = getSubject(subjectId || "");
  const { isCompleted, isBookmarked, getSubjectProgress } = useProgress();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [collapsedUnits, setCollapsedUnits] = useState<string[]>([]);

  if (!subject) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <h2 className="text-xl font-bold mb-2">Subject not found</h2>
        <Link to="/" className="text-primary hover:underline text-sm">← Back to home</Link>
      </div>
    </div>
  );

  const topicIds = getAllTopicIds(subject.id);
  const progress = getSubjectProgress(topicIds);

  const toggleUnit = (unitId: string) => {
    setCollapsedUnits(prev =>
      prev.includes(unitId) ? prev.filter(id => id !== unitId) : [...prev, unitId]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <Header onSearchOpen={() => setSearchOpen(true)} showBack backTo="/" />

      <div className="max-w-3xl mx-auto px-6 py-8 flex-1 w-full">
        {/* Subject header */}
        <div className="mb-8 animate-slide-up">
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{subject.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">{subject.description}</p>
            </div>
            <div className="relative shrink-0">
              <ProgressRing progress={progress} size={48} strokeWidth={3.5} />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Units — iOS inset grouped list */}
        <div className="space-y-6">
          {subject.units.map((unit, unitIdx) => {
            const isCollapsed = collapsedUnits.includes(unit.id);
            const completedCount = unit.topics.filter(t => isCompleted(t.id)).length;

            return (
              <div key={unit.id} className="animate-fade-in" style={{ animationDelay: `${unitIdx * 60}ms` }}>
                <button
                  onClick={() => toggleUnit(unit.id)}
                  className="flex items-center gap-2 w-full text-left mb-2 px-1 apple-press"
                >
                  <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${isCollapsed ? "-rotate-90" : ""}`} />
                  <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex-1">{unit.title}</h2>
                  <span className="text-xs text-muted-foreground tabular-nums">{completedCount}/{unit.topics.length}</span>
                </button>

                {!isCollapsed && (
                  <div className="inset-group">
                    {unit.topics.map((topic) => {
                      const completed = isCompleted(topic.id);
                      const bookmarked = isBookmarked(topic.id);
                      return (
                        <button
                          key={topic.id}
                          onClick={() => navigate(`/subject/${subject.id}/topic/${topic.id}`)}
                          className="inset-group-item apple-press w-full flex items-center gap-3 text-left"
                        >
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${completed ? "bg-success/12 text-success" : "bg-secondary text-muted-foreground"}`}>
                            {completed ? <CheckCircle className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-[15px]">{topic.title}</h3>
                            <p className="text-[13px] text-muted-foreground truncate">{topic.mcqs.length} MCQs</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {bookmarked && <Bookmark className="h-3.5 w-3.5 text-warning fill-warning" />}
                            <ChevronRight className="h-4 w-4 text-muted-foreground/40" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}
