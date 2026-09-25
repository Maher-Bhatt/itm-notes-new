import { useNavigate } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { ArrowRight, ChevronRight, Bookmark, BookOpen, TrendingUp, Search, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useAcademic } from "@/contexts/AcademicContext";
import { useSubjects } from "@/hooks/useAcademicData";
import { subjects } from "@/data/subjects";

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

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const { semesterId } = useAcademic();
  const { data: dbSubjects, isLoading } = useSubjects(undefined);
  const { progress } = useProgress();
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterSem, setFilterSem] = useState<number | 'all'>('all');
  const navigate = useNavigate();

  // Combine database subjects with local static subjects so NO SUBJECT is ever missing!
  const allSubjectsToRender = useMemo(() => {
    const list: any[] = [];
    const seen = new Set<string>();

    // 1. Add DB subjects first
    if (dbSubjects && dbSubjects.length > 0) {
      for (const s of dbSubjects) {
        list.push(s);
        seen.add(s.id.toLowerCase());
        if (s.code) seen.add(s.code.toLowerCase());
        if (s.name) seen.add(s.name.toLowerCase());
      }
    }

    // 2. Add static subjects that are not in DB
    for (const s of subjects) {
      const isKnown =
        seen.has(s.id.toLowerCase()) ||
        (s.code && seen.has(s.code.toLowerCase())) ||
        seen.has(s.name.toLowerCase());

      if (!isKnown) {
        list.push(s);
        seen.add(s.id.toLowerCase());
        if (s.code) seen.add(s.code.toLowerCase());
        seen.add(s.name.toLowerCase());
      }
    }

    // Sort Semester 3 subjects first, then alphabetically
    return list.sort((a, b) => {
      const semA = a.semester === 3 ? 0 : 1;
      const semB = b.semester === 3 ? 0 : 1;
      if (semA !== semB) return semA - semB;
      return (a.name || "").localeCompare(b.name || "");
    });
  }, [dbSubjects]);

  const filteredSubjects = useMemo(() => {
    if (filterSem === 'all') return allSubjectsToRender;
    return allSubjectsToRender.filter((s) => s.semester === filterSem);
  }, [allSubjectsToRender, filterSem]);

  // Calculate dynamic stats
  const totalTopics = allSubjectsToRender.reduce(
    (sum, s) => sum + (s.units?.reduce((uSum: number, u: any) => uSum + (u.topics?.length || 0), 0) || 0),
    0
  ) || 1;
  const completedCount = progress.completedTopics.length;
  const overallProgress = Math.min(100, Math.round((completedCount / totalTopics) * 100));

  const bookmarkedCount = progress.bookmarkedTopics.length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <Header onSearchOpen={() => setSearchOpen(true)} />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-8 w-full animate-fade-in">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Welcome back, {profile?.display_name || user?.email?.split('@')[0]}
          </h1>
          <p className="text-muted-foreground">
            Continue where you left off or explore new subjects.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="surface-elevated p-4 rounded-xl flex items-center gap-3 hover:bg-secondary transition-colors apple-press text-left"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Quick Search</h3>
                  <p className="text-xs text-muted-foreground">Find notes & topics</p>
                </div>
              </button>
              <button
                onClick={() => navigate('/quiz')}
                className="surface-elevated p-4 rounded-xl flex items-center gap-3 hover:bg-secondary transition-colors apple-press text-left"
              >
                <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Practice Quiz</h3>
                  <p className="text-xs text-muted-foreground">Test your knowledge</p>
                </div>
              </button>
              <button
                onClick={() => navigate('/coding-lab')}
                className="surface-elevated p-4 rounded-xl flex items-center gap-3 hover:bg-secondary transition-colors apple-press text-left"
              >
                <div className="h-10 w-10 rounded-full bg-warning/10 flex items-center justify-center text-warning">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Coding Lab</h3>
                  <p className="text-xs text-muted-foreground">Interactive practice</p>
                </div>
              </button>
            </div>

            {/* Current Subjects */}
            <section>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Your Subjects</h2>
                  <p className="text-xs text-muted-foreground">
                    {filteredSubjects.length} subjects available
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex gap-1.5 bg-secondary/50 p-1 rounded-lg self-start sm:self-auto">
                  <button
                    onClick={() => setFilterSem('all')}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      filterSem === 'all'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    All ({allSubjectsToRender.length})
                  </button>
                  <button
                    onClick={() => setFilterSem(3)}
                    className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                      filterSem === 3
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Semester 3 ⭐
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {isLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-20 bg-secondary/50 rounded-xl w-full"></div>
                    <div className="h-20 bg-secondary/50 rounded-xl w-full"></div>
                  </div>
                ) : filteredSubjects.length === 0 ? (
                  <div className="text-center p-8 border border-dashed rounded-xl border-border">
                    <p className="text-muted-foreground">No subjects found for this selection.</p>
                  </div>
                ) : (
                  filteredSubjects.map((subject) => {
                    const matchingStatic = subjects.find(
                      (s) =>
                        s.id.toLowerCase() === subject.id.toLowerCase() ||
                        (subject.code && s.code?.toLowerCase() === subject.code.toLowerCase()) ||
                        (subject.name && s.name.toLowerCase() === subject.name.toLowerCase())
                    );
                    const targetId = matchingStatic ? matchingStatic.id : subject.id;
                    const semNumber = subject.semester || matchingStatic?.semester || 3;

                    return (
                      <button
                        key={subject.id}
                        onClick={() => navigate(`/subject/${targetId}`)}
                        className="group w-full surface-elevated rounded-xl p-4 flex items-center gap-4 text-left hover:bg-secondary transition-all duration-150 apple-press"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2 truncate pr-2">
                              <h3 className="font-semibold text-base truncate">{subject.name}</h3>
                              {semNumber === 3 && (
                                <span className="bg-primary/10 text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">
                                  Sem 3
                                </span>
                              )}
                            </div>
                            {subject.code && (
                              <span className="text-xs text-muted-foreground font-mono shrink-0">
                                {subject.code}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {subject.description || 'Deep research notes, diagrams & practice quizzes'}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground/80 transition-colors shrink-0" />
                      </button>
                    );
                  })
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="surface-elevated rounded-xl p-5">
              <h3 className="font-semibold mb-4">Overall Progress</h3>
              <OverallProgressBar progress={overallProgress} />
              <div className="mt-4 pt-4 border-t text-sm flex justify-between text-muted-foreground">
                <span>Completed Topics</span>
                <span className="font-medium text-foreground">{completedCount}</span>
              </div>
            </div>

            {bookmarkedCount > 0 && (
              <div className="surface-elevated rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Bookmark className="h-4 w-4 text-warning fill-warning" />
                    <h3 className="font-semibold">Bookmarks ({bookmarkedCount})</h3>
                  </div>
                </div>
                <button onClick={() => navigate("/bookmarks")} className="text-sm text-primary font-medium hover:underline pt-2 block w-full text-left">
                  View all your bookmarks &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
