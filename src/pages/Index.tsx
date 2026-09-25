import { useNavigate } from "react-router-dom";
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
  Clock,
  EyeOff,
  UserCheck,
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
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-700 ease-out rounded-full"
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
  const [semesterFilter, setSemesterFilter] = useState<number | 'all'>('all');
  const navigate = useNavigate();

  // Import semester context for dynamic filtering
  let currentSemester = 3;
  try {
    const stored = localStorage.getItem("academic_context");
    if (stored) {
      const parsed = JSON.parse(stored);
      const sid = parsed.semesterId;
      if (sid?.startsWith("sem-")) {
        const num = parseInt(sid.replace("sem-", ""), 10);
        if (!isNaN(num)) currentSemester = num;
      } else if (sid && !isNaN(parseInt(sid, 10))) {
        const num = parseInt(sid, 10);
        if (num >= 1 && num <= 8) currentSemester = num;
      }
    }
  } catch { /* ignore */ }

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

      {/* ── 1. Clean Apple-Style Hero ── */}
      <section className="relative overflow-hidden pt-8 pb-14 sm:pt-14 sm:pb-20 px-4 sm:px-6 border-b border-border bg-gradient-to-b from-card/80 via-background to-background">
        <div className="max-w-5xl mx-auto text-center relative z-10 animate-slide-up">
          
          {/* Clean University Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary text-foreground text-xs font-semibold mb-5 border border-border shadow-2xs">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span>ITM SLS Baroda University</span>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-primary font-bold">B.Tech CSE Semester {currentSemester}</span>
          </div>

          {user ? (
            /* Logged-In Student Hero */
            <>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 text-foreground leading-[1.15]">
                Welcome back, {studentName}.
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-7 leading-relaxed max-w-2xl mx-auto">
                Keep your momentum going. You are on a{' '}
                <strong className="text-amber-500 font-bold">{game.streakDays} day study streak</strong> with{' '}
                <strong className="text-foreground font-bold">{game.xp} XP</strong> (Level {levelInfo.level} · {levelInfo.title}).
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

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
                  <button
                    onClick={() => navigate("/dashboard")}
                    className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 text-center transition-colors apple-press border border-border/50"
                  >
                    <BookOpen className="h-4 w-4 text-primary mx-auto mb-1" />
                    <span className="text-xs font-bold text-foreground block">Dashboard</span>
                  </button>
                  <button
                    onClick={() => navigate("/coding-lab")}
                    className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 text-center transition-colors apple-press border border-border/50"
                  >
                    <Code className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
                    <span className="text-xs font-bold text-foreground block">Coding Lab</span>
                  </button>
                  <button
                    onClick={() => navigate("/calculator")}
                    className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 text-center transition-colors apple-press border border-border/50"
                  >
                    <Calculator className="h-4 w-4 text-blue-500 mx-auto mb-1" />
                    <span className="text-xs font-bold text-foreground block">Attendance</span>
                  </button>
                  <button
                    onClick={() => navigate("/community")}
                    className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 text-center transition-colors apple-press border border-border/50"
                  >
                    <MessageSquare className="h-4 w-4 text-primary mx-auto mb-1" />
                    <span className="text-xs font-bold text-foreground block">Campus Feed</span>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => document.getElementById("subjects")?.scrollIntoView({ behavior: "smooth" })}
                  className="pill-button apple-press bg-primary text-primary-foreground h-11 px-7 text-sm sm:text-base font-bold inline-flex items-center gap-2 shadow-sm hover:opacity-90"
                >
                  Browse All Subjects <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate("/community")}
                  className="pill-button apple-press bg-secondary text-foreground h-11 px-6 text-sm sm:text-base font-bold inline-flex items-center gap-2 border border-border hover:bg-secondary/80"
                >
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>Campus Social & Mask</span>
                </button>
              </div>
            </>
          ) : (
            /* Visitor / Guest Student Hero */
            <>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-foreground leading-[1.15]">
                The Engineering Student <br className="hidden sm:inline" />
                Super-Platform.
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto">
                Everything for your semester in one place: <strong className="text-foreground">Anonymous campus social discussions</strong>,{' '}
                <strong className="text-foreground">75% attendance calculator</strong>, <strong className="text-foreground">94 coding practicals</strong>, and complete university exam notes.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-10">
                <button
                  onClick={() => navigate("/auth")}
                  className="w-full sm:w-auto pill-button apple-press bg-primary text-primary-foreground h-12 px-8 text-sm sm:text-base font-bold inline-flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-all"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Sign In / Create Profile</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => navigate("/community")}
                  className="w-full sm:w-auto pill-button apple-press bg-secondary hover:bg-secondary/80 text-foreground h-12 px-6 text-sm sm:text-base font-bold inline-flex items-center justify-center gap-2 border border-border transition-colors"
                >
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>Campus Social</span>
                </button>
              </div>

              {/* Key Platform Pillars Bento Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-4xl mx-auto pt-6 border-t border-border text-left">
                <div
                  onClick={() => navigate("/community")}
                  className="p-4 rounded-2xl bg-card border border-border hover:border-primary/60 transition-all cursor-pointer apple-press shadow-2xs group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      Mask 🎭
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    Campus Pulse Social
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    Anonymous mask option for feedback & confessions.
                  </p>
                </div>

                <div
                  onClick={() => navigate("/calculator")}
                  className="p-4 rounded-2xl bg-card border border-border hover:border-blue-500/60 transition-all cursor-pointer apple-press shadow-2xs group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <Calculator className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      75% Rule
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-blue-500 transition-colors">
                    Attendance & SGPA
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    Safe bunk calculator & 10-point SGPA forecaster.
                  </p>
                </div>

                <div
                  onClick={() => navigate("/coding-lab")}
                  className="p-4 rounded-2xl bg-card border border-border hover:border-emerald-500/60 transition-all cursor-pointer apple-press shadow-2xs group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <Code className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      94 Codes
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-emerald-500 transition-colors">
                    Coding Practicals
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    DSA in C, Java OOP & Python with outputs & viva notes.
                  </p>
                </div>

                <div
                  onClick={() => document.getElementById("subjects")?.scrollIntoView({ behavior: "smooth" })}
                  className="p-4 rounded-2xl bg-card border border-border hover:border-primary/60 transition-all cursor-pointer apple-press shadow-2xs group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-secondary text-primary flex items-center justify-center border border-border">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-foreground border border-border">
                      Sem 3
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    5 Master Subjects
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    Syllabus notes, audio lectures & quick cheat sheets.
                  </p>
                </div>
              </div>
            </>
          )}

        </div>
      </section>

      {/* ── 2. PROMOTE: Campus Social & Anonymous Mask Shield ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-secondary/20 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-3">
                <Shield className="h-3.5 w-3.5" />
                <span>Anti-Retaliation Student Voice</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
                Campus Pulse & Anonymous Social
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                Connect with B.Tech classmates, ask tough academic doubts, or post honest feedback on college labs,
                faculty, and the canteen using the <strong className="text-foreground">Campus Mask Shield</strong>.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => navigate("/community")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity apple-press shadow-sm"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Open Campus Social Feed</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Interactive Sample Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => navigate("/community")}
              className="p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all cursor-pointer shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎭</span>
                    <span className="font-bold text-xs text-foreground">Anonymous Student</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                    College Feedback
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-foreground/90 leading-relaxed">
                  "The AC in Lab 3 has been leaking water near power sockets and Wi-Fi drops to zero during practical hours. Administration please look into this before exams!"
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="font-mono">🔒 Mask Shield Active</span>
                <span className="text-primary font-semibold">38 Upvotes</span>
              </div>
            </div>

            <div
              onClick={() => navigate("/community")}
              className="p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all cursor-pointer shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 text-primary font-bold text-[10px] flex items-center justify-center">
                      P
                    </div>
                    <span className="font-bold text-xs text-foreground">Priya Sharma</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                    Exam Tips
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-foreground/90 leading-relaxed">
                  "For Computer Architecture Unit 2: definitely practice the Master Instruction Cycle flowchart (T0 to T6). That is an almost guaranteed 7-mark question in MST!"
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>B.Tech CSE '26</span>
                <span className="text-primary font-semibold">47 Upvotes</span>
              </div>
            </div>

            <div
              onClick={() => navigate("/community")}
              className="p-5 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all cursor-pointer shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🎭</span>
                    <span className="font-bold text-xs text-foreground">Anonymous Student</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                    Confession
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-foreground/90 leading-relaxed">
                  "Confession: I skipped Friday 8:30 AM lecture just to finish my assignment, but thanks to the 75% attendance calculator I checked first and still have 3 safe bunks left 😎"
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="font-mono">🔒 Mask Shield Active</span>
                <span className="text-primary font-semibold">62 Upvotes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PROMOTE: 75% Attendance & SGPA / CGPA Predictor ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold">
                <Calculator className="h-3.5 w-3.5" />
                <span>Attendance Protection</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
                Never Get Detained. <br />
                75% Attendance & SGPA Suite.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                ITM SLS Baroda University strictly requires <strong className="text-foreground">75% minimum attendance</strong> to appear in final exams. Our dynamic calculator tells you the exact number of classes you can safely miss, or how many consecutive lectures you must attend to cross the threshold.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Real-time Safe Bunks Simulator (Never guess attendance again)</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Subject-wise Semester 3 Attendance Tracker</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>Credit-weighted SGPA & Cumulative CGPA Forecaster</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => navigate("/calculator")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity apple-press shadow-sm"
                >
                  <Calculator className="h-4 w-4" />
                  <span>Calculate Safe Bunks & SGPA</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Attendance Simulator Card Preview */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    75%
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-foreground">University 75% Requirement Buffer</h4>
                    <p className="text-[11px] text-muted-foreground">Sample Student Simulation</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">
                  Eligible
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-foreground">
                  <span>Current Attendance</span>
                  <span className="text-emerald-600 font-bold">84% (42 / 50 Conducted)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84%' }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center pt-2">
                <div className="p-3 rounded-xl bg-secondary/50 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Safe Bunks Left</p>
                  <p className="text-xl font-black text-emerald-600 mt-0.5">6 Classes</p>
                  <p className="text-[10px] text-muted-foreground">Without dropping below 75%</p>
                </div>

                <div className="p-3 rounded-xl bg-secondary/50 border border-border">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Target SGPA</p>
                  <p className="text-xl font-black text-primary mt-0.5">8.85 / 10</p>
                  <p className="text-[10px] text-muted-foreground">Based on 21 Credits</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4. PROMOTE: Practical Coding Lab (94 Programs) ── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 bg-secondary/20 border-b border-border">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-3">
                <Code className="h-3.5 w-3.5" />
                <span>Lab Exam Ready</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight">
                94 Practical Coding Lab
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-xl">
                Every lab assignment in C, Java OOP, and Python with one-click copy, verified terminal output, and viva explanations.
              </p>
            </div>

            <button
              onClick={() => navigate("/coding-lab")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors apple-press shadow-sm self-start md:self-auto"
            >
              <Code className="h-4 w-4" />
              <span>Explore All 94 Programs</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => navigate("/coding-lab")}
              className="p-5 rounded-2xl bg-card border border-border hover:border-emerald-500/50 transition-all cursor-pointer shadow-xs apple-press"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs mb-3">
                C
              </div>
              <h3 className="font-bold text-base text-foreground">32 DSA in C Practicals</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Pointers, Singly & Doubly Linked Lists, BST, Stacks, Queues, Graphs, and Quick/Merge Sort with Big-O memory traces.
              </p>
              <p className="text-[11px] font-bold text-emerald-600 mt-4">Browse C Programs →</p>
            </div>

            <div
              onClick={() => navigate("/coding-lab")}
              className="p-5 rounded-2xl bg-card border border-border hover:border-emerald-500/50 transition-all cursor-pointer shadow-xs apple-press"
            >
              <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 flex items-center justify-center font-bold text-xs mb-3">
                Java
              </div>
              <h3 className="font-bold text-base text-foreground">31 Java OOP Practicals</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Inheritance, Polymorphism dispatch, Custom Exceptions, Multithreading synchronization, and Collections Framework.
              </p>
              <p className="text-[11px] font-bold text-red-500 mt-4">Browse Java Programs →</p>
            </div>

            <div
              onClick={() => navigate("/coding-lab")}
              className="p-5 rounded-2xl bg-card border border-border hover:border-emerald-500/50 transition-all cursor-pointer shadow-xs apple-press"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold text-xs mb-3">
                Py
              </div>
              <h3 className="font-bold text-base text-foreground">31 Python COANMP Practicals</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Bisection, Newton-Raphson, Simpson's 1/3rd, Gauss Elimination, and Runge-Kutta differential equations.
              </p>
              <p className="text-[11px] font-bold text-blue-500 mt-4">Browse Python Programs →</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PROMOTE: Bookmarked Topics (If Any) ── */}
      {bookmarkedTopics.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-2 w-full">
          <div className="flex items-center gap-2 mb-3">
            <Bookmark className="h-4 w-4 text-amber-500 fill-amber-500" />
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Bookmarked For Quick Revision</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {bookmarkedTopics.slice(0, 4).map((item) => (
              <button
                key={item.topicId}
                onClick={() => navigate(`/subject/${item.subjectId}/topic/${item.topicId}`)}
                className="p-3.5 rounded-xl bg-card border border-border text-left hover:border-primary transition-colors apple-press flex items-center gap-3 shadow-xs"
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

      {/* ── 6. PROMOTE: Multi-Semester Curricula & Audio Notes ── */}
      <section id="subjects" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 flex-1 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-2 border-b border-border gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">Course Curricula</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Select a course module to start studying notes and listening to audio lectures.</p>
          </div>
          <ReadingTimeEstimate topicCount={totalTopics} />
        </div>

        {/* Semester Filter Tabs */}
        <div className="flex items-center gap-1.5 mb-5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { label: 'All Semesters', value: 'all' as const },
            { label: `Semester 1`, value: 1 as const },
            { label: `Semester 2`, value: 2 as const },
            { label: `Semester 3`, value: 3 as const },
          ].map((tab) => (
            <button
              key={String(tab.value)}
              onClick={() => setSemesterFilter(tab.value)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                semesterFilter === tab.value
                  ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                  : 'bg-card text-muted-foreground hover:text-foreground border-border hover:bg-secondary'
              }`}
            >
              {tab.label}
              {tab.value !== 'all' && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({subjects.filter(s => s.semester === tab.value).length})
                </span>
              )}
              {tab.value === currentSemester && tab.value !== 'all' && (
                <span className="ml-1 text-[10px]">⭐</span>
              )}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {subjects
            .filter(s => semesterFilter === 'all' || s.semester === semesterFilter)
            .map((subject) => {
            const topicIds = getAllTopicIds(subject.id);
            const subProgress = getSubjectProgress(topicIds);
            const completedInSub = Math.round((subProgress / 100) * topicIds.length);

            return (
              <div
                key={subject.id}
                className="group w-full rounded-2xl bg-card border border-border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/60 transition-all duration-150 shadow-xs"
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
                    {user && subProgress > 0 && ` · ${completedInSub} completed (${subProgress}%)`}
                  </p>

                  {/* Subject Progress bar - Authenticated Only */}
                  {user && subProgress > 0 && (
                    <div className="mt-2.5 h-1.5 w-full max-w-md rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-500 rounded-full"
                        style={{ width: `${subProgress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Quick actions */}
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

          {subjects.filter(s => semesterFilter === 'all' || s.semester === semesterFilter).length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="h-8 w-8 mx-auto mb-3 opacity-50" />
              <p className="font-semibold text-sm">No subjects available for this semester yet.</p>
              <p className="text-xs mt-1">Content is being prepared — check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* ── 7. Clean High-Converting Sign-In Section ── */}
      {!user && (
        <section className="px-4 sm:px-6 pb-16 max-w-5xl mx-auto w-full">
          <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-10 bg-card border border-border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Join B.Tech CSE Classmates</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
                Don't Study In The Dark. Sync Your Progress.
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                Sign in with your student account to sync 75% attendance logs, save your daily study streaks,
                unlock badges, and benchmark side-by-side with classmates.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={() => navigate("/auth")}
                className="pill-button apple-press bg-primary text-primary-foreground font-extrabold text-sm sm:text-base h-12 px-8 hover:opacity-90 transition-all shadow-sm text-center"
              >
                Sign In Free (+50 XP)
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
