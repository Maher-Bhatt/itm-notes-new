import { useNavigate, Link } from "react-router-dom";
import { subjects, getAllTopicIds } from "@/data/subjects";
import { REAL_STUDY_MATERIALS } from "@/data/materialsData";
import { useProgress } from "@/hooks/useProgress";
import { useGamification } from "@/hooks/useGamification";
import { useAuth } from "@/contexts/AuthContext";
import { useAcademic } from "@/contexts/AcademicContext";
import {
  ArrowRight,
  ChevronRight,
  Bookmark,
  BookOpen,
  TrendingUp,
  Code,
  Calculator,
  MessageSquare,
  Trophy,
  Flame,
  Shield,
  Sparkles,
  Award,
  GraduationCap,
  CheckCircle2,
  FileText,
  Clock,
  ExternalLink,
  Layers,
  Search,
  Check,
  Image as ImageIcon
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
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
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-700 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function Index() {
  const { getSubjectProgress, isBookmarked, progress } = useProgress();
  const { state: game, levelInfo } = useGamification();
  const { user, profile, isLoading } = useAuth();
  const { semesterNumber } = useAcademic();
  const [searchOpen, setSearchOpen] = useState(false);
  const [semesterFilter, setSemesterFilter] = useState<number | 'all'>(profile?.semester || semesterNumber || 1);
  const navigate = useNavigate();

  // If authenticated user hasn't completed onboarding, direct to /onboarding
  useEffect(() => {
    if (!isLoading && user && profile) {
      const hasCompleted = profile.onboarding_completed === true || (profile.onboarding_completed === null && Boolean(profile.semester));
      if (!hasCompleted) {
        navigate("/onboarding", { replace: true });
      }
    }
  }, [user, profile, isLoading, navigate]);

  // Sync with user's academic context when changed
  useEffect(() => {
    const targetSem = profile?.semester || semesterNumber;
    if (targetSem && semesterFilter !== targetSem && semesterFilter !== 'all') {
      setSemesterFilter(targetSem);
    }
  }, [semesterNumber, profile?.semester]);

  // Clean list of verified subjects with actual topics
  const validSubjects = useMemo(() => {
    return subjects
      .filter((s) => s.units && s.units.some((u) => u.topics && u.topics.length > 0))
      .sort((a, b) => {
        if (a.semester !== b.semester) return a.semester - b.semester;
        return a.name.localeCompare(b.name);
      });
  }, []);

  const totalTopics = validSubjects.reduce((sum, s) => sum + getAllTopicIds(s.id).length, 0);
  const allTopicIds = validSubjects.flatMap((s) => getAllTopicIds(s.id));
  const overallProgress = getSubjectProgress(allTopicIds);

  const completedCount = progress.completedTopics.length;
  const studentName = profile?.display_name || user?.email?.split('@')[0] || 'Student';

  // Verified high-yield exam resources for immediate display
  const highYieldMaterials = useMemo(() => {
    const priorityIds = [
      'mat-timetable-2026',
      'mat-dbms-qb-2025',
      'mat-ca-qb-mst',
      'mat-dsa-qb-cet2'
    ];
    const picked = priorityIds
      .map((id) => REAL_STUDY_MATERIALS.find((m) => m.id === id))
      .filter((m) => Boolean(m));
    if (picked.length === 4) return picked;
    return REAL_STUDY_MATERIALS.slice(0, 4);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <Header onSearchOpen={() => setSearchOpen(true)} />

      {/* ── 1. Hero Section ── */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 px-4 sm:px-6 border-b border-border bg-gradient-to-b from-card/80 via-background to-background">
        <div className="max-w-5xl mx-auto text-center relative z-10 animate-slide-up">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-foreground text-xs font-semibold mb-5 border border-border shadow-2xs">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span>ITM (SLS) Baroda University</span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-primary font-bold">Independent Student Study Platform</span>
          </div>

          {user ? (
            /* Logged-In Student Experience */
            <>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-foreground leading-[1.15]">
                Welcome back, {studentName}.
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-7 leading-relaxed max-w-2xl mx-auto">
                Keep your momentum going. You are on a{' '}
                <strong className="text-amber-500 font-bold">{game.streakDays} day study streak</strong> with{' '}
                <strong className="text-foreground font-bold">{game.xp} XP</strong> (Level {levelInfo.level} • {levelInfo.title}).
              </p>

              {/* Progress Summary Card */}
              <div className="w-full max-w-lg mx-auto p-5 sm:p-6 rounded-2xl bg-card border border-border shadow-sm text-left mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-primary" /> Syllabus Progress
                  </span>
                  <span className="text-xs font-bold text-foreground">
                    {completedCount} / {totalTopics} topics mastered
                  </span>
                </div>
                <OverallProgressBar progress={overallProgress} />

                {/* Quick Navigation Tiles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-border/60">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary text-center text-xs font-bold text-foreground transition-colors apple-press"
                  >
                    <BookOpen className="h-4 w-4 mx-auto mb-1 text-primary" />
                    Dashboard
                  </button>
                  <button
                    onClick={() => navigate('/coding-lab')}
                    className="p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary text-center text-xs font-bold text-foreground transition-colors apple-press"
                  >
                    <Code className="h-4 w-4 mx-auto mb-1 text-emerald-500" />
                    Coding Lab
                  </button>
                  <button
                    onClick={() => navigate('/calculator')}
                    className="p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary text-center text-xs font-bold text-foreground transition-colors apple-press"
                  >
                    <Calculator className="h-4 w-4 mx-auto mb-1 text-blue-500" />
                    Attendance
                  </button>
                  <button
                    onClick={() => navigate('/community')}
                    className="p-2.5 rounded-xl bg-secondary/50 hover:bg-secondary text-center text-xs font-bold text-foreground transition-colors apple-press"
                  >
                    <MessageSquare className="h-4 w-4 mx-auto mb-1 text-purple-500" />
                    Campus Feed
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById("subjects");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-90 transition-opacity flex items-center gap-2 apple-press"
                >
                  <span>Browse All Subjects</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate("/materials")}
                  className="px-6 py-3 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 font-bold text-sm border border-border transition-colors flex items-center gap-2 apple-press"
                >
                  <FileText className="h-4 w-4 text-amber-500" />
                  <span>Exam Question Banks</span>
                </button>
              </div>
            </>
          ) : (
            /* First-Time Guest Hero */
            <>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-foreground leading-[1.15]">
                Everything ITM students need, in one place.
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Comprehensive semester study notes, official MST question banks, interactive practical coding labs, and a 75% attendance buffer calculator — built specifically for students of <strong className="text-foreground">ITM (SLS) Baroda University</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                <button
                  onClick={() => navigate("/auth?mode=signup")}
                  className="px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-90 transition-opacity flex items-center gap-2 apple-press"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById("subjects");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-7 py-3.5 rounded-xl bg-secondary text-foreground hover:bg-secondary/80 font-bold text-sm border border-border transition-colors flex items-center gap-2 apple-press"
                >
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Explore Course Modules</span>
                </button>
              </div>

              {/* 3 Core Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
                <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
                  <div className="p-2 w-fit rounded-lg bg-primary/10 text-primary mb-3">
                    <FileText className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">Verified Question Banks</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    MST & CET-2 question banks, paper patterns, and timetables.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
                  <div className="p-2 w-fit rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3">
                    <Code className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">Practical Coding Lab</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Tested C, Java OOP, and Python programs with live outputs and test cases.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-card border border-border/80 shadow-xs">
                  <div className="p-2 w-fit rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-3">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <h3 className="font-bold text-sm text-foreground">75% Attendance Predictor</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Calculate safe bunk margins and forecast your semester SGPA accurately.
                  </p>
                </div>
              </div>
            </>
          )}

        </div>
      </section>

      {/* ── 2. Real Exam Season Spotlight (MST / CET-2) ── */}
      <section className="py-12 px-4 sm:px-6 border-b border-border bg-card/40">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
                <Flame className="h-3.5 w-3.5" /> High-Yield Exam Resources
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground">
                Upcoming MST & CET-2 Exam Materials
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Official question banks, syllabi, and timetables for B.Tech CSE Semester 3.
              </p>
            </div>
            <Link
              to="/materials"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline shrink-0"
            >
              <span>View All Study Materials</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highYieldMaterials.map((mat) => (
              <div
                key={mat.id}
                className="p-4 rounded-2xl border border-border/70 bg-card hover:border-primary/50 transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground uppercase">
                      {mat.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">{mat.fileSize}</span>
                  </div>
                  <h4 className="font-bold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {mat.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground mt-1 truncate">
                    {mat.subject}
                  </p>
                </div>

                <a
                  href={mat.downloadUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full py-2 px-3 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  {mat.fileType === "JPEG" || mat.fileType === "PNG" ? (
                    <>
                      <ImageIcon className="h-3.5 w-3.5" />
                      <span>View Image</span>
                    </>
                  ) : mat.fileType === "DOCX" ? (
                    <>
                      <FileText className="h-3.5 w-3.5" />
                      <span>Download DOCX</span>
                    </>
                  ) : (
                    <>
                      <FileText className="h-3.5 w-3.5" />
                      <span>Download PDF</span>
                    </>
                  )}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. How It Works (Simple 3-Step Flow) ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 border-b border-border bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">
              Designed For Academic Success
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              How ITM Notes Works
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Three streamlined steps to master your engineering curriculum without stress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-border/80 bg-card shadow-xs relative">
              <span className="text-3xl font-black text-primary/20 absolute top-6 right-6 font-mono">
                01
              </span>
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold mb-4">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-foreground mb-1.5">Pick Your Semester</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Filter by Semester 1, 2, or 3. All subjects are strictly mapped to the official ITM (SLS) Baroda University syllabus units.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-border/80 bg-card shadow-xs relative">
              <span className="text-3xl font-black text-emerald-500/20 absolute top-6 right-6 font-mono">
                02
              </span>
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold mb-4">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-foreground mb-1.5">Study & Test Knowledge</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Read concise topic notes, test yourself with instant practice quizzes, and run working code examples in the interactive Coding Lab.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-border/80 bg-card shadow-xs relative">
              <span className="text-3xl font-black text-amber-500/20 absolute top-6 right-6 font-mono">
                03
              </span>
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-4">
                <Calculator className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-base text-foreground mb-1.5">Protect Your 75% Buffer</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Use the Attendance Buffer Calculator to ensure you never get debarred, and predict your SGPA before entering the exam hall.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Course Curricula & Subjects Grid ── */}
      <section id="subjects" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">Course Curricula</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              Select your semester to access subjects, unit notes, and question banks.
            </p>
          </div>

          {/* Semester Selector Tabs */}
          <div className="inline-flex p-1 bg-secondary rounded-xl border border-border">
            <button
              onClick={() => setSemesterFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                semesterFilter === 'all'
                  ? 'bg-card text-foreground shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {[1, 2, 3].map((sem) => (
              <button
                key={sem}
                onClick={() => setSemesterFilter(sem)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  semesterFilter === sem
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sem {sem}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {validSubjects
            .filter((s) => semesterFilter === 'all' || s.semester === semesterFilter)
            .map((subject) => {
              const topicCount = getAllTopicIds(subject.id).length;
              const subProgress = getSubjectProgress(getAllTopicIds(subject.id));

              return (
                <div
                  key={subject.id}
                  onClick={() => navigate(`/subject/${subject.id}`)}
                  className="p-5 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all cursor-pointer flex flex-col justify-between group shadow-xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-secondary text-muted-foreground font-mono">
                        {subject.code}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                        Semester {subject.semester}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {subject.name}
                    </h3>

                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {subject.description || "Comprehensive syllabus notes, key diagrams, and revision flashcards."}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/50">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>{topicCount} Syllabus Topics</span>
                      <span className="font-bold text-foreground">{subProgress}% Complete</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${subProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </section>

      {/* ── 5. Campus Social & Student Voice Callout ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-secondary/20 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-3">
              <Shield className="h-3.5 w-3.5" />
              <span>Campus Pulse & Student Community</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
              Connect with your classmates.
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
              Ask tough academic doubts, compare study streaks, or post honest feedback on college facilities with privacy protection.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => navigate("/community")}
              className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:opacity-90 transition-opacity shadow-sm flex items-center gap-2 apple-press"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Open Campus Social</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
}
