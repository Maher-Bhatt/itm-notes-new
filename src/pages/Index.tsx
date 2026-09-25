import { useNavigate, Link } from "react-router-dom";
import { subjects, getAllTopicIds } from "@/data/subjects";
import { useProgress } from "@/hooks/useProgress";
import { useGamification } from "@/hooks/useGamification";
import { useAuth } from "@/contexts/AuthContext";
import {
  ArrowRight,
  ChevronRight,
  Bookmark,
  BookOpen,
  TrendingUp,
  Code,
  Calculator,
  MessageSquare,
  Volume2,
  Trophy,
  Flame,
  Shield,
  Sparkles,
  Award,
  GraduationCap,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Layers,
  Zap,
} from "lucide-react";
import { useState, useMemo } from "react";
import { SearchDialog } from "@/components/SearchDialog";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

function OverallProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">Curriculum Completion</span>
        <span className="text-xs sm:text-sm font-bold text-primary tabular-nums">{progress}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-700 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function ReadingTimeEstimate({ topicCount }: { topicCount: number }) {
  const minutes = topicCount * 8;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return (
    <span className="text-xs text-muted-foreground font-mono">
      ~{hours > 0 ? `${hours}h ${remaining}m` : `${remaining}m`} study content
    </span>
  );
}

export default function Index() {
  const { getSubjectProgress, isBookmarked, progress } = useProgress();
  const { state: game, levelInfo } = useGamification();
  const { user, profile } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const totalTopics = subjects.reduce((sum, s) => sum + getAllTopicIds(s.id).length, 0);
  const allTopicIds = subjects.flatMap((s) => getAllTopicIds(s.id));
  const overallProgress = getSubjectProgress(allTopicIds);

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
  const studentName = profile?.display_name || user?.email?.split('@')[0] || 'Engineer';

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <Header onSearchOpen={() => setSearchOpen(true)} />

      {/* ── Top Hero Section ── */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 px-4 sm:px-6 border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="max-w-5xl mx-auto text-center relative z-10 animate-slide-up">
          
          {/* University Department Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-border/80 text-foreground text-xs font-semibold mb-6 shadow-sm">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span>ITM SLS Baroda University</span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-primary font-bold">B.Tech CSE Semester 3</span>
          </div>

          {/* Logged in vs Guest Hero */}
          {user ? (
            <>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-foreground leading-[1.1]">
                Welcome back, <span className="text-primary">{studentName}</span>! 👋
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Ready to crush your next study session? Your streak is safe at{' '}
                <strong className="text-amber-500 font-bold">{game.streakDays} days</strong> with{' '}
                <strong className="text-primary font-bold">{game.xp} XP</strong> (Level {levelInfo.level} · {levelInfo.title}).
              </p>

              {/* Logged-In Progress Bar & Fast Action Dashboard */}
              <div className="w-full max-w-lg mx-auto p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-border shadow-sm text-left mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-primary" /> Study Progress
                  </span>
                  <span className="text-xs font-bold text-foreground">
                    {completedCount} / {totalTopics} topics mastered
                  </span>
                </div>
                <OverallProgressBar progress={overallProgress} />

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-center transition-colors apple-press"
                  >
                    <BookOpen className="h-4 w-4 text-primary mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-foreground block">Dashboard</span>
                  </button>
                  <button
                    onClick={() => navigate("/coding-lab")}
                    className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-center transition-colors apple-press"
                  >
                    <Code className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-foreground block">94 Practicals</span>
                  </button>
                  <button
                    onClick={() => navigate("/calculator")}
                    className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-center transition-colors apple-press"
                  >
                    <Calculator className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-foreground block">75% Attendance</span>
                  </button>
                  <button
                    onClick={() => navigate("/community")}
                    className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-center transition-colors apple-press"
                  >
                    <MessageSquare className="h-4 w-4 text-purple-500 mx-auto mb-1" />
                    <span className="text-[11px] font-bold text-foreground block">Campus Feed</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => document.getElementById("subjects")?.scrollIntoView({ behavior: "smooth" })}
                  className="pill-button apple-press bg-primary text-primary-foreground h-11 px-7 text-sm sm:text-base font-bold inline-flex items-center gap-2 shadow-sm hover:opacity-90"
                >
                  Browse Semester 3 Subjects <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate("/community")}
                  className="pill-button apple-press bg-secondary text-foreground h-11 px-6 text-sm sm:text-base font-bold inline-flex items-center gap-2 border border-border hover:bg-secondary/80"
                >
                  <MessageSquare className="h-4 w-4 text-purple-500" />
                  <span>Campus Social & Mask</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 text-foreground leading-[1.1]">
                Master Your Semester 3 <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-amber-500">
                  Engineering Examinations.
                </span>
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Comprehensive university notes, <strong className="text-foreground">94 practical coding labs</strong>,{' '}
                <strong className="text-foreground">75% attendance calculator</strong>, AI audio lectures, and active recall
                flashcards — designed to maximize your SGPA.
              </p>

              {/* Call-to-actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-10">
                <button
                  onClick={() => navigate("/auth")}
                  className="w-full sm:w-auto pill-button apple-press bg-primary text-primary-foreground h-12 px-8 text-sm sm:text-base font-bold inline-flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:opacity-90 transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Sign In Free (+50 XP)</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => document.getElementById("subjects")?.scrollIntoView({ behavior: "smooth" })}
                  className="w-full sm:w-auto pill-button apple-press bg-secondary hover:bg-secondary/80 text-foreground h-12 px-6 text-sm sm:text-base font-bold inline-flex items-center justify-center gap-2 border border-border transition-colors"
                >
                  <span>Explore Subjects</span>
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </button>
              </div>

              {/* Live Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-6 border-t border-border/50 text-left">
                <div className="p-3 rounded-2xl bg-card border border-border/70 shadow-xs">
                  <div className="flex items-center gap-2 text-primary font-bold text-base sm:text-lg">
                    <BookOpen className="h-4 w-4" />
                    <span>5 Subjects</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Full Semester 3 Syllabus</p>
                </div>

                <div className="p-3 rounded-2xl bg-card border border-border/70 shadow-xs">
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-base sm:text-lg">
                    <Code className="h-4 w-4" />
                    <span>94 Practicals</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">DSA, Java OOP & Python</p>
                </div>

                <div className="p-3 rounded-2xl bg-card border border-border/70 shadow-xs">
                  <div className="flex items-center gap-2 text-amber-500 font-bold text-base sm:text-lg">
                    <Calculator className="h-4 w-4" />
                    <span>75% Attendance</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Safe Bunk & Risk Modeler</p>
                </div>

                <div className="p-3 rounded-2xl bg-card border border-border/70 shadow-xs">
                  <div className="flex items-center gap-2 text-purple-600 font-bold text-base sm:text-lg">
                    <Shield className="h-4 w-4" />
                    <span>Campus Mask</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Fearless Student Feedback</p>
                </div>
              </div>
            </>
          )}

        </div>
      </section>

      {/* ── Key Feature Showcase Grid ── */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-secondary/15 border-b border-border/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Engineered For Top Grades</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground mt-1 tracking-tight">
              Everything You Need To Top B.Tech CSE
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
              Built directly from official ITM SLS Baroda course plans and previous university exam question banks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Feature 1: Practical Coding Lab */}
            <div
              onClick={() => navigate("/coding-lab")}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-border/80 hover:border-emerald-500/50 transition-all cursor-pointer shadow-sm hover:shadow-md group apple-press flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold mb-4">
                  <Code className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-emerald-600 transition-colors">
                  94 Practical Coding Lab
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  32 DSA in C, 31 Java OOP, and 31 Python COANMP practical programs with live code copy, expected output, and Big-O complexity analysis.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-bold text-emerald-600">
                <span>Open Coding Lab</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 2: 75% Attendance Modeler */}
            <div
              onClick={() => navigate("/calculator")}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-border/80 hover:border-blue-500/50 transition-all cursor-pointer shadow-sm hover:shadow-md group apple-press flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold mb-4">
                  <Calculator className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-blue-600 transition-colors">
                  75% Attendance & SGPA
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Never get detained! Calculate exact safe bunks remaining, required consecutive lectures, and project your semester SGPA & CGPA.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-bold text-blue-600">
                <span>Check My Attendance Buffer</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 3: Campus Social & Mask */}
            <div
              onClick={() => navigate("/community")}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-border/80 hover:border-purple-500/50 transition-all cursor-pointer shadow-sm hover:shadow-md group apple-press flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold mb-4">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-purple-600 transition-colors">
                  Campus Social & Mask 🎭
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Share academic doubts, exam survival rants, or post honest feedback on canteen/labs anonymously with our student mask shield.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-bold text-purple-600">
                <span>Join Campus Feed</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 4: Audio Lecture Player */}
            <div
              onClick={() => navigate("/subject/ca-101/topic/instruction-cycle-flowchart")}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-border/80 hover:border-amber-500/50 transition-all cursor-pointer shadow-sm hover:shadow-md group apple-press flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold mb-4">
                  <Volume2 className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-amber-600 transition-colors">
                  Continuous AI Audio Notes
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Listen to in-depth lecture explanations and formulas hands-free on the college bus. Sequential auto-play with speed controls.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-bold text-amber-600">
                <span>Listen to a Topic</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 5: Question Banks & Flashcards */}
            <div
              onClick={() => navigate("/quiz")}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-border/80 hover:border-pink-500/50 transition-all cursor-pointer shadow-sm hover:shadow-md group apple-press flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 flex items-center justify-center font-bold mb-4">
                  <HelpCircle className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-pink-600 transition-colors">
                  Custom Quizzes & Flashcards
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Grand mock exams, custom question count picker (5 to All), and active recall flashcards mapped directly to university patterns.
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-bold text-pink-600">
                <span>Start Practice Quiz</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Feature 6: Gamification & Ranks */}
            <div
              onClick={() => navigate("/profile")}
              className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-border/80 hover:border-primary/50 transition-all cursor-pointer shadow-sm hover:shadow-md group apple-press flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-4">
                  <Trophy className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">
                  Study Streaks & XP Ranks
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  Earn XP for reading notes, maintain your daily study streak, unlock prestigious badges, and benchmark side-by-side with classmates!
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-border/50 flex items-center justify-between text-xs font-bold text-primary">
                <span>View My Profile & Badges</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bookmarked Topics (If Any) ── */}
      {bookmarkedTopics.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-4 w-full">
          <div className="flex items-center gap-2 mb-3">
            <Bookmark className="h-4 w-4 text-amber-500 fill-amber-500" />
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Bookmarked For Quick Revision</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {bookmarkedTopics.slice(0, 4).map((item) => (
              <button
                key={item.topicId}
                onClick={() => navigate(`/subject/${item.subjectId}/topic/${item.topicId}`)}
                className="p-3.5 rounded-2xl bg-card border border-border text-left hover:border-primary transition-colors apple-press flex items-center gap-3 shadow-xs"
              >
                <BookOpen className="h-4 w-4 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{item.topicTitle}</p>
                  <p className="text-xs text-muted-foreground">{item.subjectName}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Semester 3 Subjects Section ── */}
      <section id="subjects" className="max-w-5xl mx-auto px-4 sm:px-6 py-12 flex-1 w-full">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">Semester 3 Curricula</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Select a course module to begin reading comprehensive lecture notes.</p>
          </div>
          <ReadingTimeEstimate topicCount={totalTopics} />
        </div>

        <div className="space-y-3">
          {subjects.map((subject) => {
            const topicIds = getAllTopicIds(subject.id);
            const subProgress = getSubjectProgress(topicIds);
            const completedInSub = Math.round((subProgress / 100) * topicIds.length);

            return (
              <div
                key={subject.id}
                className="group w-full rounded-2xl bg-card border border-border/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/50 transition-all duration-150 shadow-xs"
              >
                <div
                  onClick={() => navigate(`/subject/${subject.id}`)}
                  className="flex-1 min-w-0 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {subject.code || "CSE"}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
                      {subject.name}
                    </h3>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {subject.units.length} Units · {topicIds.length} Core Topics · Semester {subject.semester}
                    {subProgress > 0 && ` · ${completedInSub} completed (${subProgress}%)`}
                  </p>

                  {/* Progress bar inside subject */}
                  {subProgress > 0 && (
                    <div className="mt-2.5 h-1.5 w-full max-w-md rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 rounded-full"
                        style={{ width: `${subProgress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Subject Actions */}
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
                    <span>Read Notes</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── High-Converting Sign-In Callout Banner ── */}
      {!user && (
        <section className="px-4 sm:px-6 pb-16 max-w-5xl mx-auto w-full">
          <div className="rounded-3xl p-6 sm:p-10 bg-gradient-to-r from-primary via-purple-700 to-indigo-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold mb-3 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                <span>Join 500+ ITM SLS Baroda Students</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Don't Study In The Dark. Track Your Progress.
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-2 leading-relaxed">
                Create a student profile in 10 seconds to sync your 75% attendance data, maintain daily study streaks,
                and earn XP across all your devices.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => navigate("/auth")}
                className="pill-button apple-press bg-white text-black font-extrabold text-sm sm:text-base h-12 px-8 hover:bg-white/90 transition-all shadow-lg text-center"
              >
                Sign In Now (+50 XP)
              </button>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <BackToTop />
    </div>
  );
}
