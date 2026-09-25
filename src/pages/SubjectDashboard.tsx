import { useParams, Link, useNavigate } from "react-router-dom";
import { getSubject, getAllTopicIds } from "@/data/subjects";
import { Subject } from "@/data/types";
import { useProgress } from "@/hooks/useProgress";
import { useSubject } from "@/hooks/useAcademicData";
import { CheckCircle, BookOpen, Bookmark, ChevronRight, ChevronDown, Loader2, HelpCircle, FolderDown } from "lucide-react";
import { SUBJECT_IMP_DATA } from "@/data/impQuestionsData";
import { useState, useMemo } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

function ProgressRing({ progress, size = 44, strokeWidth = 3 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="progress-ring">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--secondary))" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="progress-ring-circle"
      />
    </svg>
  );
}

export default function SubjectDashboard() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [collapsedUnits, setCollapsedUnits] = useState<string[]>([]);

  // 1. Check if it's already a static subject ID (e.g. "ca-101", "python")
  const staticSubject = useMemo(() => getSubject(subjectId || ""), [subjectId]);

  // 2. If not found statically (e.g. it's a Supabase UUID), fetch from database
  const isLikelyUuid = subjectId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(subjectId);
  const { data: dbSubject, isLoading: isDbLoading } = useSubject(!staticSubject && isLikelyUuid ? subjectId : undefined);

  // 3. Resolve the subject
  const subject: Subject | undefined = useMemo(() => {
    if (staticSubject) return staticSubject;
    if (!dbSubject) return undefined;
    const dbSub = dbSubject as any;

    // Check if the DB subject matches any static subject by code or name
    const match = getSubject(dbSub.code) || getSubject(dbSub.name);
    if (match) return match;

    // Otherwise, construct from database record
    return {
      id: dbSub.id,
      name: dbSub.name,
      code: dbSub.code || "",
      color: dbSub.color || "bg-primary",
      icon: dbSub.icon || "book-open",
      description: dbSub.description || "",
      semester: 3,
      units: (dbSub.units || []).map((u: any) => ({
        id: u.id,
        title: u.title,
        description: u.description || "",
        topics: (u.topics || []).map((t: any) => ({
          id: t.id,
          title: t.title,
          simpleExplanation: "",
          detailedExplanation: "",
          keyPoints: [],
          examples: [],
          mcqs: [],
        })),
      })),
    };
  }, [staticSubject, dbSubject]);

  const { isCompleted, isBookmarked, getSubjectProgress } = useProgress();

  if (isDbLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading subject...</p>
        </div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in">
          <h2 className="text-xl font-bold mb-2">Subject not found</h2>
          <p className="text-sm text-muted-foreground mb-4">We couldn't find the requested subject notes.</p>
          <Link to="/" className="text-primary hover:underline text-sm font-medium">← Back to home</Link>
        </div>
      </div>
    );
  }

  const topicIds = getAllTopicIds(subject.id);
  const progress = getSubjectProgress(topicIds);

  const toggleUnit = (unitId: string) => {
    setCollapsedUnits((prev) =>
      prev.includes(unitId) ? prev.filter((id) => id !== unitId) : [...prev, unitId]
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

        {/* Quick Exam Resources Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {SUBJECT_IMP_DATA[subject.id] && (
            <button
              onClick={() => navigate(`/imp-questions/${subject.id}`)}
              className="p-3.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors flex items-center justify-between text-left apple-press group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">Exam IMP Questions</h4>
                  <p className="text-xs text-muted-foreground">3, 5, 7 Marks with Solutions</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
            </button>
          )}

          <button
            onClick={() => navigate(`/materials?subject=${subject.id}`)}
            className="p-3.5 rounded-xl border border-border bg-card hover:bg-secondary/50 transition-colors flex items-center justify-between text-left apple-press group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-500 flex items-center justify-center shrink-0">
                <FolderDown className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground">College Materials</h4>
                <p className="text-xs text-muted-foreground">PDFs, Syllabus & Lab Manuals</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
          </button>
        </div>

        {/* Units — iOS inset grouped list */}
        <div className="space-y-6">
          {subject.units.map((unit, unitIdx) => {
            const isCollapsed = collapsedUnits.includes(unit.id);
            const completedCount = unit.topics.filter((t) => isCompleted(t.id)).length;

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
                      const mcqCount = topic.mcqs?.length ?? 0;
                      return (
                        <button
                          key={topic.id}
                          onClick={() => navigate(`/subject/${subject.id}/topic/${topic.id}`)}
                          className="inset-group-item apple-press w-full flex items-center gap-3 text-left"
                        >
                          <div className={`w-7 h-7 rounded flex items-center justify-center shrink-0 ${completed ? "bg-success/12 text-success" : "bg-secondary text-muted-foreground"}`}>
                            {completed ? <CheckCircle className="h-3.5 w-3.5" /> : <BookOpen className="h-3.5 w-3.5" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-[15px]">{topic.title}</h3>
                            <p className="text-[13px] text-muted-foreground truncate">
                              {mcqCount > 0 ? `${mcqCount} MCQs` : "Lecture Notes & Explanations"}
                            </p>
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
