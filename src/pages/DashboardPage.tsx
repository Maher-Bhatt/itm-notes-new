import { useNavigate } from "react-router-dom";
import { useProgress } from "@/hooks/useProgress";
import { useGamification } from "@/hooks/useGamification";
import { ArrowRight, ChevronRight, Bookmark, BookOpen, TrendingUp, Search, Sparkles } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
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
  const { semesterNumber } = useAcademic();
  const { progress, getSubjectProgress } = useProgress();
  const gamification = useGamification();
  const [searchOpen, setSearchOpen] = useState(false);
  const [lastVisitedTopic, setLastVisitedTopic] = useState<{topicId: string, topicTitle: string, subjectId: string, subjectName: string} | null>(null);
  
  useEffect(() => {
    const saved = localStorage.getItem('itm_last_visited_topic');
    if (saved) {
      try {
        setLastVisitedTopic(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);
  const [filterSem, setFilterSem] = useState<number | 'all'>(semesterNumber || 3);
  const navigate = useNavigate();

  // Keep filterSem in sync with semesterNumber when user updates their semester
  useEffect(() => {
    if (semesterNumber && filterSem !== semesterNumber && filterSem !== 'all') {
      setFilterSem(semesterNumber);
    }
  }, [semesterNumber]);

  // Clean verified list of subjects that contain actual topics
  const allSubjectsToRender = useMemo(() => {
    return subjects
      .filter((s) => s.units && s.units.some((u) => u.topics && u.topics.length > 0))
      .sort((a, b) => {
        if (a.semester !== b.semester) return a.semester - b.semester;
        return a.name.localeCompare(b.name);
      });
  }, []);

  const filteredSubjects = useMemo(() => {
    if (filterSem === 'all') return allSubjectsToRender;
    return allSubjectsToRender.filter((s) => Number(s.semester) === Number(filterSem));
  }, [allSubjectsToRender, filterSem]);

  // Calculate dynamic stats
  const totalTopics = useMemo(() => {
    const sum = allSubjectsToRender.reduce(
      (acc, s) => acc + (s.units?.reduce((uSum: number, u: any) => uSum + (u.topics?.length || 0), 0) || 0),
      0
    );
    return sum > 0 ? sum : 85;
  }, [allSubjectsToRender]);

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

            
            {/* Continue Learning & Heatmap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Continue Learning */}
              <div className="surface-elevated p-5 rounded-2xl border border-border/80 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">Continue Learning</h3>
                  {lastVisitedTopic ? (
                    <>
                      <h4 className="font-semibold text-lg line-clamp-2">{lastVisitedTopic.topicTitle}</h4>
                      <p className="text-sm text-primary font-medium mt-1">{lastVisitedTopic.subjectName}</p>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground">You haven't started reading any topics yet.</p>
                  )}
                </div>
                {lastVisitedTopic && (
                  <button 
                    onClick={() => navigate(`/subject/${lastVisitedTopic.subjectId}/topic/${lastVisitedTopic.topicId}`)}
                    className="mt-4 w-full py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    Resume <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              {/* Activity Heatmap Widget */}
              <div className="surface-elevated p-5 rounded-2xl border border-border/80 flex flex-col justify-center">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Study Heatmap (Last 4 Weeks)</h3>
                <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none items-end h-[80px]">
                  {Array.from({ length: 28 }).map((_, i) => {
                    const d = new Date();
                    d.setDate(d.getDate() - (27 - i));
                    const dateStr = d.toISOString().split('T')[0];
                    const active = gamification.state.activityHistory?.[dateStr] || 0;
                    
                    let colorClass = "bg-secondary";
                    if (active > 0 && active <= 2) colorClass = "bg-primary/30";
                    else if (active > 2 && active <= 5) colorClass = "bg-primary/60";
                    else if (active > 5) colorClass = "bg-primary";
                    
                    return (
                      <div 
                        key={i} 
                        className={`w-4 rounded-sm ${colorClass} transition-all duration-300 hover:scale-110`}
                        style={{ height: active > 0 ? `${Math.min(100, 30 + active * 10)}%` : '30%' }}
                        title={`${active} topics read on ${dateStr}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Current Subjects */}
            <section>
              {/* ── 1. SEMESTER-FIRST SELECTOR ── */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-foreground">Select Your Semester</h2>
                    <p className="text-xs text-muted-foreground">Choose a semester to view its official curriculum and study materials.</p>
                  </div>
                  <button
                    onClick={() => setFilterSem('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                      filterSem === 'all'
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-card text-muted-foreground hover:text-foreground border-border hover:bg-secondary'
                    }`}
                  >
                    View All ({allSubjectsToRender.length})
                  </button>
                </div>

                {/* 3 Prominent Semester Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      sem: 1,
                      title: 'Semester 1',
                      tagline: 'Engineering Foundations',
                      subjects: 'Python 1, Physics, CLA, TCS, Web Tech',
                      color: 'emerald',
                      count: allSubjectsToRender.filter((s) => s.semester === 1).length,
                    },
                    {
                      sem: 2,
                      title: 'Semester 2',
                      tagline: 'Core Systems & Math',
                      subjects: 'Python 2, C Lang, Digital Electronics, Stats, Accounts',
                      color: 'blue',
                      count: allSubjectsToRender.filter((s) => s.semester === 2).length,
                    },
                    {
                      sem: 3,
                      title: 'Semester 3',
                      tagline: 'Advanced Computer Science',
                      subjects: 'Comp Architecture, DSA, DBMS, Java, COANMP',
                      color: 'amber',
                      count: allSubjectsToRender.filter((s) => s.semester === 3).length,
                    },
                  ].map((card) => {
                    const isSelected = filterSem === card.sem;
                    const isUserCurrent = semesterNumber === card.sem;

                    return (
                      <button
                        key={card.sem}
                        onClick={() => setFilterSem(card.sem)}
                        className={`p-4 rounded-2xl text-left transition-all duration-200 apple-press border relative ${
                          isSelected
                            ? 'bg-card border-primary shadow-md ring-2 ring-primary/20'
                            : 'bg-card/60 border-border hover:border-primary/40 hover:bg-secondary/40'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                            card.sem === 1
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : card.sem === 2
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                              : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                          }`}>
                            {card.title}
                          </span>
                          <div className="flex items-center gap-1">
                            {isUserCurrent && (
                              <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full" title="Your Enrolled Semester">
                                ⭐ Your Sem
                              </span>
                            )}
                            <span className="text-xs font-mono font-bold text-muted-foreground">
                              {card.count} Sub
                            </span>
                          </div>
                        </div>

                        <p className="font-bold text-sm text-foreground mb-1">{card.tagline}</p>
                        <p className="text-[11px] text-muted-foreground line-clamp-1 leading-snug">{card.subjects}</p>

                        <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-primary">
                          <span>{isSelected ? 'Viewing subjects below' : 'Click to view subjects'}</span>
                          <ChevronRight className="h-3 w-3" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── 2. SUBJECTS LIST FOR SELECTED SEMESTER ── */}
              <div className="flex items-center justify-between gap-3 mb-3.5 pb-2 border-b border-border">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-foreground">
                    {filterSem === 'all' ? 'All University Subjects' : `Semester ${filterSem} Subjects`}
                  </h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {filteredSubjects.length} courses
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">Select a course to read complete notes</span>
              </div>

              <div className="space-y-3">
                {filteredSubjects.length === 0 ? (
                  <div className="text-center p-8 border border-dashed rounded-xl border-border">
                    <p className="text-muted-foreground font-semibold">No subjects found for this selection.</p>
                  </div>
                ) : (
                  filteredSubjects.map((subject) => {
                    const topicIds = subject.units?.flatMap((u: any) => u.topics?.map((t: any) => t.id) || []) || [];
                    const subProgress = getSubjectProgress(topicIds);
                    const completedInSub = Math.round((subProgress / 100) * topicIds.length);
                    const semNumber = Number(subject.semester || 1);

                    return (
                      <div
                        key={subject.id}
                        className="group w-full bg-card border border-border hover:border-primary/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-150 shadow-xs"
                      >
                        <div
                          onClick={() => navigate(`/subject/${subject.id}`)}
                          className="flex-1 min-w-0 cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                              {subject.code || "CSE"}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              semNumber === 1
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                : semNumber === 2
                                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                            }`}>
                              Sem {semNumber}
                            </span>
                            <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
                              {subject.name}
                            </h3>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-1 mb-1.5">
                            {subject.description || 'Deep research notes, diagrams & practice quizzes'}
                          </p>

                          <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-medium">
                            <span>{subject.units?.length || 0} Units</span>
                            <span>•</span>
                            <span>{topicIds.length} Core Topics</span>
                            {subProgress > 0 && (
                              <>
                                <span>•</span>
                                <span className="text-primary font-bold">{completedInSub} completed ({subProgress}%)</span>
                              </>
                            )}
                          </div>

                          {/* Progress bar */}
                          {subProgress > 0 && (
                            <div className="mt-2.5 h-1.5 w-full max-w-sm rounded-full bg-secondary overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all duration-500 rounded-full"
                                style={{ width: `${subProgress}%` }}
                              />
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => navigate(`/subject/${subject.id}/cheat-sheet`)}
                            className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs apple-press transition-colors"
                            title="Quick Exam Cheat Sheet"
                          >
                            Cheat Sheet
                          </button>
                          <button
                            onClick={() => navigate(`/subject/${subject.id}`)}
                            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 apple-press transition-opacity shadow-sm"
                          >
                            <span>Study Notes</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Gamification Rank & Streak Widget */}
            <div className="surface-elevated rounded-xl p-5 border border-primary/20 bg-gradient-to-br from-primary/5 via-card to-background shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-xl shadow-inner">
                    ⚡
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground leading-tight">{gamification.levelInfo.title}</h3>
                    <p className="text-xs text-muted-foreground">Level {gamification.state.level} • {gamification.state.xp} XP</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                  🔥 {gamification.state.streakDays}d
                </span>
              </div>
              
              <div className="space-y-1.5 mb-3.5">
                <div className="flex justify-between text-[11px] text-muted-foreground font-medium">
                  <span>Level Progress</span>
                  <span>{gamification.levelInfo.progressPercent}%</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-700 ease-out" 
                    style={{ width: `${gamification.levelInfo.progressPercent}%` }} 
                  />
                </div>
              </div>

              <button 
                onClick={() => navigate('/profile')}
                className="w-full text-xs font-semibold text-primary hover:text-primary/80 transition-colors flex items-center justify-between pt-2 border-t border-border/60"
              >
                <span>View Daily Quests & Focus Timer</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

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
