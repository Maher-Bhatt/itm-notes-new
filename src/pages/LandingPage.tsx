import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { 
  BookOpen, 
  Code2, 
  CheckCircle2, 
  HelpCircle, 
  Flame, 
  Sparkles, 
  Shield, 
  Calculator, 
  Users, 
  ArrowRight, 
  Check, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff, 
  Clock, 
  FileText, 
  ChevronRight, 
  Terminal, 
  Award, 
  AlertTriangle, 
  Zap, 
  Download, 
  Layers, 
  Globe,
  Loader2,
  GraduationCap
} from "lucide-react";
import logo from "@/assets/logo.png";

function getFeatureName(path?: string) {
  if (!path) return "the Student Portal";
  if (path.includes("material")) return "the Academic Materials Library";
  if (path.includes("quiz")) return "Subject Practice Quizzes";
  if (path.includes("calculator") || path.includes("gpa")) return "the Attendance & SGPA Calculator";
  if (path.includes("coding")) return "the Practical Coding Lab";
  if (path.includes("community") || path.includes("social")) return "Campus Social & Confessions";
  if (path.includes("imp-questions")) return "University Exam IMP Questions";
  if (path.includes("profile")) return "Student Profile & Passport";
  return "the Student Portal";
}

export default function LandingPage({ focusAuth = false }: { focusAuth?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, isLoading } = useAuth();

  // Auth Card State
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Interactive Attendance Demo State
  const [demoTotalClasses, setDemoTotalClasses] = useState(48);
  const [demoAttendedClasses, setDemoAttendedClasses] = useState(41);

  // Interactive Code Demo Language State
  const [demoCodeLang, setDemoCodeLang] = useState<"c" | "java">("c");

  const fromState = (location.state as { from?: string | { pathname?: string; search?: string; hash?: string } } | null)?.from;
  const fromLocation = fromState
    ? (typeof fromState === 'string' ? fromState : `${fromState.pathname || "/"}${fromState.search || ""}${fromState.hash || ""}`)
    : "/dashboard";

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (!isLoading && user) {
      const dest = fromLocation === "/auth" || fromLocation === "/" ? "/dashboard" : fromLocation;
      navigate(dest, { replace: true });
    }
  }, [user, isLoading, navigate, fromLocation]);

  // Scroll to Auth card if focusAuth is true
  useEffect(() => {
    if (focusAuth) {
      const el = document.getElementById("auth-portal-card");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [focusAuth]);

  // Auth Submission
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;

        toast.success("Welcome back! Signing into student portal...");
        
        // Check onboarding status
        let needsOnboarding = false;
        if (data?.user?.id) {
          const { data: existingProfile } = await supabase
            .from("profiles")
            .select("onboarding_completed, semester")
            .eq("user_id", data.user.id)
            .maybeSingle();

          if (!existingProfile || (existingProfile.onboarding_completed !== true && !existingProfile.semester)) {
            needsOnboarding = true;
          }
        }

        if (needsOnboarding) {
          navigate("/onboarding", { replace: true });
        } else {
          const dest = fromLocation === "/auth" || fromLocation === "/" ? "/dashboard" : fromLocation;
          navigate(dest, { replace: true });
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              display_name: displayName.trim() || email.split("@")[0],
            },
          },
        });
        if (error) throw error;

        if (data?.user?.id) {
          try {
            await supabase.from("profiles").upsert({
              user_id: data.user.id,
              email: email.trim(),
              display_name: displayName.trim() || email.split("@")[0],
              role: "student",
              onboarding_completed: false,
            }, { onConflict: "user_id" });
          } catch {}
        }

        if (data?.session) {
          toast.success("Account created! Let's set up your semester profile.");
          navigate("/onboarding", { replace: true });
          return;
        }

        toast.success("Account created successfully! Please sign in.");
        setIsLogin(true);
      }
    } catch (err: any) {
      toast.error(err?.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Demo Attendance Calculations
  const demoPercentage = Math.round((demoAttendedClasses / Math.max(1, demoTotalClasses)) * 100);
  const demoSafeToBunk = Math.max(0, Math.floor((demoAttendedClasses - 0.75 * demoTotalClasses) / 0.75));
  const demoNeedToAttend = Math.max(0, Math.ceil((0.75 * demoTotalClasses - demoAttendedClasses) / 0.25));

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white antialiased">
      {/* ── TOP MODERN NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-[#070b14]/85 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 border border-indigo-400/30">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-white">ITM Notes</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  SLS Baroda University
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-medium">By Velocity Web</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#curriculum" className="hover:text-white transition-colors">Curriculum</a>
            <a href="#coding-lab" className="hover:text-white transition-colors">Coding Lab</a>
            <a href="#attendance" className="hover:text-white transition-colors">75% Safeguard</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById("auth-portal-card");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/25 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>Student Sign In</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO MARKETING SECTION WITH EMBEDDED AUTH CARD ── */}
      <section className="relative overflow-hidden py-12 lg:py-20 border-b border-slate-800/80">
        {/* Ambient Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Pitch (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold animate-pulse">
                <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                <span>2026 Academic Edition · Official SLS Baroda University Portal</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Master Your Semester Exams. <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  In One Unified Study Portal.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Say goodbye to scattered WhatsApp PDFs and broken code files. ITM Notes equips you with verified university syllabus notes, interactive practical coding labs (DSA in C & Java), past exam question banks with step-by-step marking schemes, and the 75% attendance safeguard calculator.
              </p>

              {/* High Impact Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-center">
                  <div className="text-xl sm:text-2xl font-black font-mono text-indigo-400">100%</div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Syllabus Aligned</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-center">
                  <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">150+</div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Coding Practicals</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-center">
                  <div className="text-xl sm:text-2xl font-black font-mono text-sky-400">480+</div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Exam Practice MCQs</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800/80 text-center">
                  <div className="text-xl sm:text-2xl font-black font-mono text-amber-400">75%</div>
                  <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Attendance Guard</div>
                </div>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-400" /> Free for all ITM students</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-400" /> C & Java Compiler</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-400" /> MST-1 & MST-2 Question Banks</span>
              </div>
            </div>

            {/* Right Modern Glassmorphic Auth Card (lg:col-span-5) */}
            <div id="auth-portal-card" className="lg:col-span-5">
              <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Redirect notice if student was routed here from a protected page */}
                {fromState && (
                  <div className="mb-5 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4 text-indigo-400 shrink-0" />
                    <span>
                      <strong className="text-white">Student Login Required:</strong> Sign in below to access {getFeatureName((fromState as any)?.pathname)}.
                    </span>
                  </div>
                )}

                {/* Tab Switcher: Sign In vs Create Account */}
                <div className="flex p-1 rounded-xl bg-slate-800/80 border border-slate-700/60 mb-6 text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                      isLogin
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Student Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${
                      !isLogin
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                <div className="mb-5">
                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {isLogin ? "Welcome to ITM Notes" : "Join Your Campus Platform"}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    {isLogin 
                      ? "Sign in to access your personal semester dashboard, coding practicals, and question banks." 
                      : "Create your student account with your email to unlock all semester tools."}
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-300 block">
                        Full Name / Display Name
                      </label>
                      <input
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. Maher Bhatt"
                        className="w-full h-11 px-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                      />
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      University or Personal Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@itm.ac.in or name@gmail.com"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-300">
                        Password
                      </label>
                      {isLogin && (
                        <button
                          type="button"
                          onClick={() => toast.info("Password reset link will be sent to your email.")}
                          className="text-[11px] text-indigo-400 hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full h-11 pl-3.5 pr-10 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <span>{isLogin ? "Sign In to Student Portal" : "Create My Student Account"}</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="pt-4 mt-4 border-t border-slate-800 text-center">
                  <p className="text-[11px] text-slate-400">
                    🔒 <strong className="text-slate-300">Privacy Guaranteed:</strong> No personal student data is exposed to public or search engines.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 6 CORE VALUE PILLARS: HOW ITM NOTES HELPS YOU ── */}
      <section id="features" className="py-16 sm:py-24 border-b border-slate-800/80 bg-[#090e1a]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Built Specifically For University Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              How ITM Notes Helps You Score Top Grades
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Every tool on this platform was crafted after analyzing university test patterns, MST question sets, lab evaluations, and syllabus rubrics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-sm hover:shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">1. Verified Academic Materials & Reader</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unit 1 to Unit 5 course summaries, lecture slides, and high-yield formula sheets. Includes our distraction-free 4-tab interactive Document Reader with clean Markdown and PDF export.
              </p>
              <div className="text-[11px] text-blue-400 font-semibold flex items-center gap-1">
                <span>Units 1–5 Covered</span> <ChevronRight className="h-3 w-3" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-sm hover:shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">2. Practical Coding Lab (C & Java)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Execute and test practical assignments directly in your browser. Features 150+ solved problems with instant hot-swapping between C99 and Java OOP (including Railway Queue, Linked Lists, Trees).
              </p>
              <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span>C99 & Java OOP Hot-Swap</span> <ChevronRight className="h-3 w-3" />
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-sm hover:shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calculator className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">3. 75% Attendance Safeguard</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Baroda University enforces strict 75% attendance for exam hall tickets. Our calculator predicts exact bunk allowances and tells you how many continuous classes you must attend to stay safe.
              </p>
              <div className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                <span>Never Get Debarred</span> <ChevronRight className="h-3 w-3" />
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-sm hover:shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">4. Solved Question Banks (MST-1 & MST-2)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-yield exam questions categorized by 2-mark, 5-mark, and 7-mark questions with step-by-step solutions, code diagrams, and university grading rubrics.
              </p>
              <div className="text-[11px] text-purple-400 font-semibold flex items-center gap-1">
                <span>MST-1 & MST-2 Ready</span> <ChevronRight className="h-3 w-3" />
              </div>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-sm hover:shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">5. Subject Quizzes & Accuracy Gauges</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                480+ university practice questions with real-time topic accuracy gauges, pacing timers, and instant syllabus explanations. Earn XP and unlock achievements as you practice.
              </p>
              <div className="text-[11px] text-sky-400 font-semibold flex items-center gap-1">
                <span>Live Pacing Gauges</span> <ChevronRight className="h-3 w-3" />
              </div>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-sm hover:shadow-xl group">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white">6. Campus Pulse & Study Buddies</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Exchange study notes, connect with classmates preparing for the same subjects, and share anonymous feedback or campus confessions in a positive community space.
              </p>
              <div className="text-[11px] text-rose-400 font-semibold flex items-center gap-1">
                <span>Verified Peer Network</span> <ChevronRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE DEMO SHOWCASE (CODING LAB & ATTENDANCE) ── */}
      <section id="coding-lab" className="py-16 sm:py-24 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              Live Interactive Feature Demos
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Try the Coding Lab & Attendance Tool
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Experience the power of in-browser compilation and attendance prediction before signing in.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Coding Lab Preview (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <Terminal className="h-5 w-5 text-emerald-400" />
                  <div>
                    <h4 className="text-sm font-bold text-white">Practical 3: Railway Waiting List (Queue)</h4>
                    <p className="text-[10px] text-slate-400">Data Structures Sem 3 · Enqueue, Dequeue, Peek, Count</p>
                  </div>
                </div>

                <div className="flex p-0.5 rounded-lg bg-slate-800 border border-slate-700 text-[11px] font-mono">
                  <button
                    onClick={() => setDemoCodeLang("c")}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      demoCodeLang === "c" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400"
                    }`}
                  >
                    C99
                  </button>
                  <button
                    onClick={() => setDemoCodeLang("java")}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                      demoCodeLang === "java" ? "bg-emerald-500 text-slate-950 font-bold" : "text-slate-400"
                    }`}
                  >
                    Java OOP
                  </button>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="bg-slate-950 rounded-2xl p-4 font-mono text-xs text-slate-300 overflow-x-auto border border-slate-850 max-h-60 leading-relaxed">
                {demoCodeLang === "c" ? (
                  <pre>
{`#include <stdio.h>
#define MAX 6
int waitQ[MAX], front = -1, rear = -1;

void addPassenger(int token) {
    if (rear == MAX - 1) { printf("Queue Overflow!\\n"); return; }
    if (front == -1) front = 0;
    waitQ[++rear] = token;
    printf("Passenger token %d added to waiting list.\\n", token);
}

void allocateSeat() {
    if (front == -1 || front > rear) { printf("Queue Underflow!\\n"); return; }
    printf("Seat allocated to Passenger: %d\\n", waitQ[front++]);
}`}
                  </pre>
                ) : (
                  <pre>
{`public class RailwayWaitingList {
    private int[] queue = new int[6];
    private int front = -1, rear = -1;

    public void addPassenger(int token) {
        if (rear == queue.length - 1) throw new IllegalStateException("Overflow");
        if (front == -1) front = 0;
        queue[++rear] = token;
    }
}`}
                  </pre>
                )}
              </div>

              {/* Simulated Terminal Output */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1">
                <span className="text-emerald-400 font-bold block">Terminal Output:</span>
                <p className="text-slate-300">✓ Passenger token 101 added to waiting list.</p>
                <p className="text-slate-300">✓ Passenger token 102 added to waiting list.</p>
                <p className="text-sky-400">✓ Seat allocated to Passenger: 101 (Front advanced)</p>
              </div>
            </div>

            {/* Interactive Attendance Safe Simulator (lg:col-span-5) */}
            <div id="attendance" className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">75% Attendance Safeguard</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Live Calculator
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1.5">
                    <span>Total Held Classes:</span>
                    <span className="font-mono font-bold text-white">{demoTotalClasses}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={demoTotalClasses}
                    onChange={(e) => setDemoTotalClasses(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 font-semibold mb-1.5">
                    <span>Attended Classes:</span>
                    <span className="font-mono font-bold text-white">{demoAttendedClasses}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={demoTotalClasses}
                    value={demoAttendedClasses}
                    onChange={(e) => setDemoAttendedClasses(parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

              {/* Status Outcome Card */}
              <div className={`p-4 rounded-2xl border text-center space-y-2 ${
                demoPercentage >= 75 
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-300"
              }`}>
                <div className="text-3xl font-black font-mono">
                  {demoPercentage}%
                </div>
                <p className="text-xs font-bold">
                  {demoPercentage >= 75 
                    ? `SAFE · You can safely bunk ${demoSafeToBunk} more classes!`
                    : `CRITICAL · You must attend ${demoNeedToAttend} consecutive classes!`}
                </p>
              </div>

              <button
                onClick={() => {
                  const el = document.getElementById("auth-portal-card");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Track Full Semester Subjects in Portal</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ── CURRICULUM OVERVIEW SECTION ── */}
      <section id="curriculum" className="py-16 sm:py-24 border-b border-slate-800/80 bg-[#090e1a]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
              Curriculum Roadmap
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Complete Semesters 1 to 4 Coverage
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Tailored for ITM SLS Baroda University programs (Computer Science, BCA, MCA).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Semester 1
              </span>
              <h4 className="font-bold text-white text-sm">Foundational Engineering</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                C Programming, Basic Electronics, Engineering Mathematics, and Professional Communication.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Semester 2
              </span>
              <h4 className="font-bold text-white text-sm">Object Oriented Core</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Object Oriented Programming with C++, Discrete Mathematics, Digital Logic, and Web Essentials.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 ring-2 ring-indigo-500/40">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                Semester 3 (Active)
              </span>
              <h4 className="font-bold text-white text-sm">Advanced Algorithms & Architecture</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Data Structures (DSA in C & Java), DBMS Normalization, Computer Architecture, and Numerical Methods.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                Semester 4
              </span>
              <h4 className="font-bold text-white text-sm">Systems & Networks</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Operating Systems, Computer Networks, Advanced Java Enterprise, and Software Engineering.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS (FAQ) ── */}
      <section id="faq" className="py-16 sm:py-24 border-b border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Everything you need to know about accessing ITM Notes.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">Why is student sign-in required to view materials?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Signing in creates your personal student workspace: it enables your attendance safe-calculator, bookmarks, saved coding solutions, quiz accuracy records, and custom semester filtering. It also guarantees university academic materials remain private to university students.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">Is ITM Notes completely free?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yes! ITM Notes is 100% free for all ITM SLS Baroda University students. There are no paywalls or hidden subscriptions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">Can I do DSA practicals in both C and Java?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Yes! Every Semester 3 DSA practical (including Practical 3 Railway Reservation Queue, Stacks, Linked Lists, Trees) provides both standard C99 implementation and Java OOP object-oriented code with instant hot-swapping.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">How does the 75% Attendance Safeguard work?</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The safeguard implements the official ITM SLS Baroda University attendance policy. It computes your exact attendance ratio across held lectures and gives you a safety margin for how many classes you can afford to miss before your hall ticket is flagged.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CALL TO ACTION ── */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#090e1a] to-[#070b14] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-xl shadow-indigo-600/30">
            <Zap className="h-7 w-7" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Ready to Ace Your Semester?
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Join hundreds of classmates using ITM Notes for daily revision, coding lab preparation, and MST exam readiness.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                const el = document.getElementById("auth-portal-card");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Get Started Now — It's Free</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ── MODERN AESTHETIC FOOTER ── */}
      <footer className="border-t border-slate-800/80 bg-[#05080f] py-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
              ITM
            </div>
            <div>
              <p className="font-bold text-slate-200">ITM Notes · Study Portal</p>
              <p className="text-[11px] text-slate-500">Crafted by Velocity Web for ITM (SLS) Baroda University students.</p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <a href="#features" className="hover:text-slate-200 transition-colors">Features</a>
            <a href="#coding-lab" className="hover:text-slate-200 transition-colors">Coding Lab</a>
            <a href="#attendance" className="hover:text-slate-200 transition-colors">75% Safeguard</a>
            <a href="https://itmuniversity.org" target="_blank" rel="noreferrer" className="hover:text-slate-200 transition-colors flex items-center gap-1">
              <span>University Portal</span>
              <Globe className="h-3 w-3" />
            </a>
          </div>

          <p className="text-[11px] text-slate-500">
            © 2026 ITM Notes. Independent educational platform.
          </p>
        </div>
      </footer>
    </div>
  );
}
