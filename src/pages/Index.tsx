import { Link, useNavigate } from "react-router-dom";
import { subjects, getAllTopicIds } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, ChevronRight, Bookmark, BookOpen, TrendingUp } from "lucide-react";
import { useState, useMemo } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

function OverallProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">Overall progress</span>
        <span className="text-sm font-semibold text-primary tabular-nums">{progress}%</span>
      </div>
      <div className="h-2 rounded bg-secondary overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function ReadingTimeEstimate({ topicCount }: { topicCount: number }) {
  const minutes = topicCount * 8; // ~8 min per topic average
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return (
    <span className="text-xs text-muted-foreground">
      ~{hours > 0 ? `${hours}h ${remaining}m` : `${remaining}m`} reading time
    </span>
  );
}

export default function Index() {
  const { getSubjectProgress, isBookmarked, progress } = useProgress();
  const { user, loading } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const totalTopics = subjects.reduce((sum, s) => sum + getAllTopicIds(s.id).length, 0);
  const allTopicIds = subjects.flatMap((s) => getAllTopicIds(s.id));
  const overallProgress = getSubjectProgress(allTopicIds);

  const displayName = user?.user_metadata?.display_name || user?.email?.split("@")[0] || "there";

  // Bookmarked topics for quick access
  const bookmarkedTopics = useMemo(() => {
    const items: Array<{ subjectId: string; subjectName: string; topicId: string; topicTitle: string }> = [];
    for (const subject of subjects) {
      for (const unit of subject.units) {
        for (const topic of unit.topics) {
          if (isBookmarked(topic.id)) {
            items.push({ subjectId: subject.id, subjectName: subject.name, topicId: topic.id, topicTitle: topic.title });
          }
        }
      }
    }
    return items;
  }, [isBookmarked, progress.bookmarkedTopics]);

  const completedCount = progress.completedTopics.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <Header onSearchOpen={() => setSearchOpen(true)} />

      {/* Hero */}
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <div className="max-w-3xl mx-auto text-center animate-slide-up">

          {/* Loading skeleton */}
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-12 w-2/3 bg-secondary rounded mx-auto" />
              <div className="h-5 w-1/2 bg-secondary rounded mx-auto" />
              <div className="h-11 w-40 bg-secondary rounded-full mx-auto mt-8" />
            </div>
          ) : user ? (
            /* ── Logged-in hero ── */
            <>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-[1.1] text-foreground">
                Welcome back, <span className="text-primary">{displayName.split(" ")[0]}</span>.
              </h1>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Ready to crush your next session? Let's get back into the core concepts.
              </p>

              {/* Progress card */}
              <div className="max-w-sm mx-auto surface-elevated rounded p-6 mb-8 text-left">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold">Your Progress</span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3" />
                    <span>{completedCount}/{totalTopics} topics</span>
                  </div>
                </div>
                <OverallProgressBar progress={overallProgress} />
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {subjects.slice(0, 3).map((s) => {
                    const ids = getAllTopicIds(s.id);
                    const p = getSubjectProgress(ids);
                    return (
                      <button
                        key={s.id}
                        onClick={() => navigate(`/subject/${s.id}`)}
                        className="text-left rounded bg-secondary hover:bg-secondary/80 transition-colors p-3 apple-press"
                      >
                        <div className="text-xs text-muted-foreground truncate mb-1">{s.name.split(" ")[0]}</div>
                        <div className="text-sm font-bold text-foreground">{p}%</div>
                        <div className="mt-2 h-1 rounded bg-background overflow-hidden">
                          <div className="h-full bg-primary transition-all" style={{ width: `${p}%` }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => document.getElementById("subjects")?.scrollIntoView({ behavior: "smooth" })}
                  className="pill-button apple-press bg-primary text-primary-foreground h-11 px-8 text-base inline-flex items-center gap-2 transition-all duration-200 hover:opacity-90"
                >
                  Resume Studying <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            /* ── Guest hero ── */
            <>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-[1.1] text-foreground">
                Learn the fundamentals.
              </h1>
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl mx-auto">
                Clear explanations, real examples, and practice quizzes for ITM engineering students.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => document.getElementById("subjects")?.scrollIntoView({ behavior: "smooth" })}
                  className="pill-button apple-press bg-primary text-primary-foreground h-11 px-8 text-base inline-flex items-center gap-2 transition-all duration-200 hover:opacity-90"
                >
                  Start Learning <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="pill-button apple-press h-11 px-8 text-base text-foreground inline-flex items-center gap-2 bg-background border border-border transition-all duration-200 hover:bg-secondary"
                >
                  Sign In
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Bookmarked Topics - Quick Access */}
      {bookmarkedTopics.length > 0 && (
        <section className="max-w-3xl mx-auto px-6 pb-8 w-full">
          <div className="flex items-center gap-2 mb-3 px-1">
            <Bookmark className="h-4 w-4 text-warning fill-warning" />
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Bookmarked</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {bookmarkedTopics.slice(0, 4).map((item) => (
              <button
                key={item.topicId}
                onClick={() => navigate(`/subject/${item.subjectId}/topic/${item.topicId}`)}
                className="surface-elevated rounded p-3 text-left hover:bg-secondary transition-colors apple-press flex items-center gap-3"
              >
                <BookOpen className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{item.topicTitle}</p>
                  <p className="text-xs text-muted-foreground">{item.subjectName}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Subjects */}
      <section id="subjects" className="max-w-3xl mx-auto px-6 pb-16 flex-1 w-full">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{subjects.length} Subjects</h2>
          <ReadingTimeEstimate topicCount={totalTopics} />
        </div>
        <div className="space-y-2">
          {subjects.map((subject) => {
            const topicIds = getAllTopicIds(subject.id);
            const subProgress = getSubjectProgress(topicIds);
            const completedCount = Math.round((subProgress / 100) * topicIds.length);

            return (
              <button
                key={subject.id}
                onClick={() => navigate(`/subject/${subject.id}`)}
                className="group w-full surface-elevated rounded p-4 flex items-center gap-4 text-left hover:bg-secondary transition-all duration-150 apple-press"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-base truncate pr-2">{subject.name}</h3>
                    {subProgress > 0 && (
                      <span className="text-xs font-semibold text-primary tabular-nums shrink-0">{subProgress}%</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {topicIds.length} topics · Semester {subject.semester}
                    {subProgress > 0 && ` · ${completedCount} completed`}
                  </p>
                  <div className="h-1 rounded bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${subProgress}%` }}
                    />
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors shrink-0" />
              </button>
            );
          })}
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}
