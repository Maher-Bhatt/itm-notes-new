import React, { useState, useEffect, useRef } from "react";
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
  GraduationCap,
  Building2,
  Trophy,
} from "lucide-react";
import { ItmMoocsLogo } from "@/components/brand/ItmMoocsLogo";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Particle {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
  size: string;
  opacity: number;
}

// ── Helper ─────────────────────────────────────────────────────────────────────
function getFeatureName(path?: string) {
  if (!path) return "the Academic Hub";
  if (path.includes("material")) return "the Academic Materials Library";
  if (path.includes("quiz")) return "Subject Practice Quizzes";
  if (path.includes("calculator") || path.includes("gpa")) return "the Attendance & SGPA Calculator";
  if (path.includes("coding")) return "the Practical Coding Lab";
  if (path.includes("community") || path.includes("social")) return "Campus Social & Confessions";
  if (path.includes("imp-questions")) return "University Exam IMP Questions";
  if (path.includes("profile")) return "Student Profile & Passport";
  return "the Academic Hub";
}

// ── Inline global keyframe styles ─────────────────────────────────────────────
const globalStyles = `
@keyframes float-up {
  0%   { opacity: 0; transform: translateY(100vh) scale(0.5); }
  10%  { opacity: 0.7; }
  90%  { opacity: 0.5; }
  100% { opacity: 0; transform: translateY(-10vh) scale(1); }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
@keyframes gentle-float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}
`;

// ── Typewriter words ───────────────────────────────────────────────────────────
const TYPEWRITER_WORDS = ["DSA Notes", "DBMS SQL", "Java OOP", "COA Pipelines", "MCQ Practice"];

// ── Component ──────────────────────────────────────────────────────────────────
export default function LandingPage({ focusAuth = false }: { focusAuth?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, isLoading } = useAuth();

  // ── Auth Card State ──────────────────────────────────────────────────────────
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Interactive Attendance Demo State ────────────────────────────────────────
  const [demoTotalClasses, setDemoTotalClasses] = useState(48);
  const [demoAttendedClasses, setDemoAttendedClasses] = useState(41);

  // ── Interactive Code Demo Language State ─────────────────────────────────────
  const [demoCodeLang, setDemoCodeLang] = useState<"c" | "java">("c");

  // ── Typewriter State ─────────────────────────────────────────────────────────
  const [twWordIndex, setTwWordIndex] = useState(0);
  const [twDisplayed, setTwDisplayed] = useState("");
  const [twDeleting, setTwDeleting] = useState(false);

  // ── Particles ────────────────────────────────────────────────────────────────
  const [particles, setParticles] = useState<Particle[]>([]);

  // ── Counter Animation ────────────────────────────────────────────────────────
  const statsRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [mcqCount, setMcqCount] = useState(0);
  const [pdfCount, setPdfCount] = useState(0);
  const [labCount, setLabCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  // ── Logged-in redirect banner ────────────────────────────────────────────────
  const [redirectCountdown, setRedirectCountdown] = useState(2);

  const fromState = (location.state as { from?: string | { pathname?: string; search?: string; hash?: string } } | null)?.from;
  const fromLocation = fromState
    ? (typeof fromState === "string" ? fromState : `${fromState.pathname || "/"}${fromState.search || ""}${fromState.hash || ""}`)
    : "/dashboard";

  // ── If user is logged in, show welcome + auto-redirect after 2s ──────────────
  useEffect(() => {
    if (!isLoading && user) {
      const dest = fromLocation === "/auth" || fromLocation === "/" ? "/dashboard" : fromLocation;
      const timer = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate(dest, { replace: true });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [user, isLoading, navigate, fromLocation]);

  // ── Scroll to auth card if focusAuth prop is set ─────────────────────────────
  useEffect(() => {
    if (focusAuth) {
      const el = document.getElementById("auth-portal-card");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [focusAuth]);

  // ── Generate particles on mount ──────────────────────────────────────────────
  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${8 + Math.random() * 12}s`,
      animationDelay: `${Math.random() * 10}s`,
      size: `${3 + Math.random() * 5}px`,
      opacity: 0.3 + Math.random() * 0.5,
    }));
    setParticles(generated);
  }, []);

  // ── Typewriter effect ────────────────────────────────────────────────────────
  useEffect(() => {
    const currentWord = TYPEWRITER_WORDS[twWordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!twDeleting && twDisplayed.length < currentWord.length) {
      timeout = setTimeout(() => setTwDisplayed(currentWord.slice(0, twDisplayed.length + 1)), 80);
    } else if (!twDeleting && twDisplayed.length === currentWord.length) {
      timeout = setTimeout(() => setTwDeleting(true), 1800);
    } else if (twDeleting && twDisplayed.length > 0) {
      timeout = setTimeout(() => setTwDisplayed(twDisplayed.slice(0, -1)), 45);
    } else if (twDeleting && twDisplayed.length === 0) {
      setTwDeleting(false);
      setTwWordIndex((prev) => (prev + 1) % TYPEWRITER_WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [twDisplayed, twDeleting, twWordIndex]);

  // ── Counter animation (IntersectionObserver) ─────────────────────────────────
  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersStarted) {
          setCountersStarted(true);
          animateCounter(setMcqCount, 500, 1800);
          animateCounter(setPdfCount, 60, 1400);
          animateCounter(setLabCount, 15, 1200);
          animateCounter(setStudentCount, 100, 1600);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  function animateCounter(setter: React.Dispatch<React.SetStateAction<number>>, target: number, duration: number) {
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setter(Math.round((target * step) / steps));
      if (step >= steps) clearInterval(timer);
    }, interval);
  }

  // ── Auth Submission ──────────────────────────────────────────────────────────
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

        toast.success("Welcome back! Signing into ITM Notes...");

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
            await supabase.from("profiles").upsert(
              {
                user_id: data.user.id,
                email: email.trim(),
                display_name: displayName.trim() || email.split("@")[0],
                role: "student",
                onboarding_completed: false,
              },
              { onConflict: "user_id" }
            );
          } catch {}
        }

        toast.success("Account created successfully! Welcome to ITM Notes.");
        navigate("/onboarding", { replace: true });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication error. Please check your credentials.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // ── 75% Attendance calculation ───────────────────────────────────────────────
  const demoPercentage = demoTotalClasses > 0 ? (demoAttendedClasses / demoTotalClasses) * 100 : 0;
  const isDemoSafe = demoPercentage >= 75;
  const safeBunks = isDemoSafe ? Math.floor((demoAttendedClasses - 0.75 * demoTotalClasses) / 0.75) : 0;
  const neededClasses = !isDemoSafe ? Math.ceil((0.75 * demoTotalClasses - demoAttendedClasses) / 0.25) : 0;

  // ── Feature cards data ───────────────────────────────────────────────────────
  const features = [
    {
      icon: <BookOpen className="h-6 w-6" />,
      emoji: "📚",
      title: "Study Materials",
      desc: "Verified notes, PDFs, and formula sheets for every topic — mapped 100% to your university syllabus.",
      color: "text-[#183F36] dark:text-[#D6E85D]",
    },
    {
      icon: <HelpCircle className="h-6 w-6" />,
      emoji: "🧠",
      title: "Practice Quizzes",
      desc: "500+ MCQs with step-by-step explanations, topic accuracy gauges, and XP rewards for every correct answer.",
      color: "text-[#267653] dark:text-[#D6E85D]",
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      emoji: "💻",
      title: "Coding Lab",
      desc: "Hands-on practicals in C, Java, and Python with simulated terminal output and dual-language toggle.",
      color: "text-[#315B4F] dark:text-[#D6E85D]",
    },
    {
      icon: <Calculator className="h-6 w-6" />,
      emoji: "📊",
      title: "SGPA Calculator",
      desc: "GPA tracker with real-time 75% attendance protection — know exactly how many classes you can safely skip.",
      color: "text-[#A66A1D] dark:text-[#D6E85D]",
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      emoji: "🏆",
      title: "Gamification",
      desc: "Earn XP, level up your student rank, maintain daily study streaks, and compete on the leaderboard.",
      color: "text-[#267653] dark:text-[#D6E85D]",
    },
    {
      icon: <Users className="h-6 w-6" />,
      emoji: "👥",
      title: "Community",
      desc: "Campus Pulse real-time discussions, anonymous confessions wall, and study group formation — all in one place.",
      color: "text-[#183F36] dark:text-[#D6E85D]",
    },
  ];

  // ── How it works steps ───────────────────────────────────────────────────────
  const steps = [
    { step: "01", title: "Create your account", desc: "Sign up free in under 30 seconds — no credit card, no paywall." },
    { step: "02", title: "Choose semester & subjects", desc: "Select your university, semester, and subjects to get a personalised study hub." },
    { step: "03", title: "Study, practice & track", desc: "Read notes, attempt MCQs, run practicals, and watch your progress grow." },
  ];

  // ══════════════════════════════════════════════════════════════════════════════
  return (
    <>
      {/* Inject global CSS keyframes */}
      <style>{globalStyles}</style>

      <div className="min-h-screen bg-[#F5F1E8] dark:bg-[#12221E] text-[#202522] dark:text-[#F5F1E8] selection:bg-[#D6E85D] selection:text-[#183F36] font-sans antialiased">

        {/* ── TOP NAVBAR ─────────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-50 bg-[#183F36]/95 backdrop-blur-md border-b border-[#1D4A3F] px-4 sm:px-8 py-3.5 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <ItmMoocsLogo variant="live" size="md" showTagline={false} inverted={true} />
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#A2BAAF]">
              <a href="#features" className="hover:text-[#D6E85D] transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-[#D6E85D] transition-colors">How It Works</a>
              <a href="#stats" className="hover:text-[#D6E85D] transition-colors">Stats</a>
              <a href="#auth-portal-card" className="hover:text-[#D6E85D] transition-colors">Sign In</a>
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#D6E85D] hover:bg-[#c8da4e] text-[#183F36] text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsLogin(true);
                      document.getElementById("auth-portal-card")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-4 py-2 rounded-xl border border-[#D6E85D]/40 text-[#D6E85D] text-xs font-bold hover:bg-[#D6E85D]/10 transition-all cursor-pointer hidden sm:block"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      document.getElementById("auth-portal-card")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#D6E85D] hover:bg-[#c8da4e] text-[#183F36] text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <span>Register Free</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ── SECTION 1: HERO ─────────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "linear-gradient(160deg, #183F36 0%, #0D2B23 60%, #091A15 100%)" }}>
          {/* Floating particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: p.left,
                bottom: "-10px",
                width: p.size,
                height: p.size,
                background: "#D6E85D",
                boxShadow: `0 0 6px 2px rgba(214,232,93,0.4)`,
                animation: `float-up ${p.animationDuration} ${p.animationDelay} infinite linear`,
                opacity: p.opacity,
              }}
            />
          ))}

          {/* Glow blobs */}
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#D6E85D]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#183F36]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
            {/* Logged-in welcome banner */}
            {!isLoading && user && (
              <div
                className="mb-8 mx-auto max-w-xl p-4 rounded-2xl text-center border border-[#D6E85D]/30 bg-[#D6E85D]/10"
                style={{ animation: "scale-in 0.4s ease both" }}
              >
                <p className="text-[#D6E85D] font-bold text-sm">
                  Welcome back, {profile?.display_name || user.email?.split("@")[0]}! 👋
                </p>
                <p className="text-[#A2BAAF] text-xs mt-1">
                  Redirecting to your dashboard in {redirectCountdown}s…
                </p>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="mt-3 px-5 py-2 rounded-xl bg-[#D6E85D] text-[#183F36] text-xs font-bold hover:bg-[#c8da4e] transition-all"
                >
                  Continue studying →
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left hero content */}
              <div className="lg:col-span-7 space-y-7 text-center lg:text-left" style={{ animation: "fade-in-up 0.7s ease both" }}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D6E85D]/10 border border-[#D6E85D]/30 text-[#D6E85D] text-xs font-bold">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>ITM Notes · Free for all ITM SLS Baroda University Students</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                  Study Smarter.<br />
                  <span className="text-[#D6E85D]">Score Higher.</span>
                </h1>

                {/* Typewriter */}
                <div className="text-xl sm:text-2xl font-bold text-[#A2BAAF] flex items-center gap-2 justify-center lg:justify-start min-h-[2rem]">
                  <span>Master</span>
                  <span className="text-[#D6E85D] font-black min-w-[180px] text-left">
                    {twDisplayed}
                    <span
                      className="ml-0.5 inline-block w-0.5 h-6 bg-[#D6E85D] align-middle"
                      style={{ animation: "blink 1s step-end infinite" }}
                    />
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#A2BAAF] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  ITM Notes gives you everything you need to ace Semester exams — verified notes, MCQ practice, coding labs, SGPA calculator, and more. All in one place. All free.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button
                    onClick={() => {
                      setIsLogin(false);
                      document.getElementById("auth-portal-card")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-7 py-3.5 rounded-xl bg-[#D6E85D] hover:bg-[#c8da4e] text-[#183F36] font-bold text-sm shadow-lg shadow-[#D6E85D]/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 justify-center cursor-pointer"
                  >
                    Get Started Free →
                  </button>
                  <a
                    href="#features"
                    className="px-7 py-3.5 rounded-xl border-2 border-[#D6E85D]/40 text-[#D6E85D] font-bold text-sm hover:bg-[#D6E85D]/10 transition-all flex items-center gap-2 justify-center"
                  >
                    Explore Materials
                  </a>
                </div>

                {/* Floating stat cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {[
                    { value: "500+", label: "MCQs" },
                    { value: "60+", label: "PDFs" },
                    { value: "15+", label: "Practicals" },
                    { value: "4", label: "Subjects" },
                  ].map((stat, i) => (
                    <div
                      key={stat.label}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center backdrop-blur-sm"
                      style={{
                        animation: `fade-in-up 0.6s ease ${0.2 + i * 0.1}s both`,
                        animationName: "gentle-float",
                        animationDuration: `${3 + i * 0.5}s`,
                        animationTimingFunction: "ease-in-out",
                        animationIterationCount: "infinite",
                        animationDelay: `${i * 0.3}s`,
                      }}
                    >
                      <div className="text-2xl font-black font-mono text-[#D6E85D]">{stat.value}</div>
                      <div className="text-[10px] text-[#A2BAAF] font-bold uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Auth card */}
              <div id="auth-portal-card" className="lg:col-span-5" style={{ animation: "fade-in-up 0.7s ease 0.15s both" }}>
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#D6E85D]/10 rounded-full blur-2xl pointer-events-none" />

                  {fromState && (
                    <div className="mb-5 p-3 rounded-xl bg-[#D6E85D]/10 border border-[#D6E85D]/30 text-xs text-[#D6E85D] font-medium flex items-center gap-2">
                      <Lock className="h-4 w-4 shrink-0" />
                      <span>
                        <strong className="text-white">Login Required:</strong> Sign in to access{" "}
                        {getFeatureName((fromState as { pathname?: string })?.pathname)}.
                      </span>
                    </div>
                  )}

                  {/* Tab toggle */}
                  <div className="flex p-1 rounded-2xl bg-black/20 border border-white/10 mb-6">
                    <button
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${isLogin ? "bg-[#D6E85D] text-[#183F36]" : "text-[#A2BAAF] hover:text-white"}`}
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsLogin(false)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${!isLogin ? "bg-[#D6E85D] text-[#183F36]" : "text-[#A2BAAF] hover:text-white"}`}
                    >
                      Create Account
                    </button>
                  </div>

                  <div className="mb-5 text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                      {isLogin ? "Welcome to ITM Notes" : "Join ITM Notes"}
                    </h3>
                    <p className="text-xs text-[#A2BAAF] mt-1">
                      {isLogin
                        ? "Access your notes, practicals, quizzes and more."
                        : "Create your student account. 100% free, forever."}
                    </p>
                  </div>

                  <form onSubmit={handleAuth} className="space-y-4">
                    {!isLogin && (
                      <div>
                        <label className="block text-xs font-semibold text-white mb-1.5">Full Name</label>
                        <input
                          type="text"
                          required
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="e.g. Maher Bhatt"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D6E85D]"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-white mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@itmbu.ac.in"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D6E85D]"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-white">Password</label>
                        {isLogin && (
                          <button
                            type="button"
                            onClick={() => toast.info("Password reset available via Supabase email link.")}
                            className="text-[11px] text-[#A2BAAF] hover:text-[#D6E85D]"
                          >
                            Forgot?
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
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white text-xs placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#D6E85D] pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-1"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl bg-[#D6E85D] hover:bg-[#c8da4e] text-[#183F36] text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Verifying…</span>
                        </>
                      ) : (
                        <>
                          <span>{isLogin ? "Sign In to ITM Notes" : "Create My Account"}</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-[#A2BAAF]">
                    <span className="flex items-center gap-1.5">
                      <Shield className="h-3.5 w-3.5 text-[#D6E85D]" />
                      256-bit Encrypted
                    </span>
                    <span>Free & Open Source</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: FEATURE HIGHLIGHTS ──────────────────────────────────── */}
        <section id="features" className="py-20 bg-[#F5F1E8] dark:bg-[#12221E]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#267653] dark:text-[#D6E85D] block mb-2">
                Everything You Need
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#183F36] dark:text-[#F5F1E8] tracking-tight">
                Engineered for High-Performance Study
              </h2>
              <p className="text-sm text-[#68716B] dark:text-[#A2BAAF] mt-3">
                Every feature is built around what ITM SLS Baroda University students actually need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feat, i) => (
                <div
                  key={feat.title}
                  className="group p-6 rounded-2xl bg-white dark:bg-[#182E29] border border-[#E0E2D9] dark:border-[#264941] space-y-4 hover:border-[#183F36] dark:hover:border-[#D6E85D] hover:scale-[1.03] hover:shadow-lg transition-all duration-200 cursor-default shadow-xs"
                  style={{ animation: `fade-in-up 0.5s ease ${0.1 * i}s both` }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#D6E85D] flex items-center justify-center text-2xl shadow-sm">
                    {feat.emoji}
                  </div>
                  <h3 className="font-bold text-base text-[#183F36] dark:text-[#F5F1E8]">{feat.title}</h3>
                  <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: HOW IT WORKS ─────────────────────────────────────────── */}
        <section id="how-it-works" className="py-20 bg-white dark:bg-[#182E29] border-y border-[#E0E2D9] dark:border-[#264941]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#267653] dark:text-[#D6E85D] block mb-2">Simple Onboarding</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#183F36] dark:text-[#F5F1E8] tracking-tight">
                Up and studying in 60 seconds
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((s, i) => (
                <div key={s.step} className="relative flex flex-col items-center text-center gap-4" style={{ animation: `fade-in-up 0.5s ease ${0.15 * i}s both` }}>
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] h-0.5 bg-gradient-to-r from-[#183F36] to-[#D6E85D] opacity-30" />
                  )}
                  <div className="w-16 h-16 rounded-2xl bg-[#183F36] text-[#D6E85D] flex items-center justify-center text-xl font-black shadow-lg">
                    {s.step}
                  </div>
                  <h3 className="font-bold text-[#183F36] dark:text-[#F5F1E8]">{s.title}</h3>
                  <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 4: ANIMATED STATS ──────────────────────────────────────── */}
        <section id="stats" ref={statsRef} className="py-20" style={{ background: "linear-gradient(135deg, #183F36 0%, #0D2B23 100%)" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D6E85D] block mb-2">By the Numbers</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                A growing library of resources
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: mcqCount, suffix: "+", label: "Practice MCQs", icon: "🧠" },
                { value: pdfCount, suffix: "+", label: "PDF Study Guides", icon: "📄" },
                { value: labCount, suffix: "+", label: "Lab Practicals", icon: "💻" },
                { value: studentCount, suffix: "+", label: "Students Studying", icon: "🎓" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm" style={{ animation: "gentle-float 4s ease-in-out infinite" }}>
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-4xl font-black font-mono text-[#D6E85D]">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-xs text-[#A2BAAF] font-semibold uppercase tracking-wider mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 5: SIGN IN / SIGN UP CARD (standalone) ─────────────────── */}
        <section className="py-20 bg-[#F5F1E8] dark:bg-[#12221E]">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#267653] dark:text-[#D6E85D] block mb-2">Start Now</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#183F36] dark:text-[#F5F1E8] tracking-tight">
                Ready to ace your semester?
              </h2>
              <p className="text-sm text-[#68716B] dark:text-[#A2BAAF] mt-3">
                Join ITM Notes and get instant access to verified notes, MCQs, and coding practicals.
              </p>
            </div>

            <div className="bg-white dark:bg-[#182E29] rounded-3xl shadow-2xl border border-[#E0E2D9] dark:border-[#264941] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#D6E85D]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Tab toggle */}
              <div className="flex p-1 rounded-2xl bg-[#F5F1E8] dark:bg-[#12221E] border border-[#E0E2D9] dark:border-[#264941] mb-6">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${isLogin ? "bg-[#183F36] text-white shadow-sm" : "text-[#68716B] dark:text-[#A2BAAF] hover:text-[#183F36] dark:hover:text-white"}`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${!isLogin ? "bg-[#183F36] text-white shadow-sm" : "text-[#68716B] dark:text-[#A2BAAF] hover:text-[#183F36] dark:hover:text-white"}`}
                >
                  Create Account
                </button>
              </div>

              <div className="mb-5">
                <h3 className="text-lg font-extrabold text-[#183F36] dark:text-[#F5F1E8]">
                  {isLogin ? "Welcome back to ITM Notes" : "Create your free account"}
                </h3>
                <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] mt-1">
                  {isLogin ? "Sign in to continue your study session." : "Free forever. No credit card needed."}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-semibold text-[#202522] dark:text-[#E8EDE4] mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Maher Bhatt"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E8] dark:bg-[#12221E] border border-[#E0E2D9] dark:border-[#264941] text-[#202522] dark:text-[#F5F1E8] text-xs placeholder:text-[#68716B]/60 focus:outline-none focus:ring-2 focus:ring-[#D6E85D]"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-[#202522] dark:text-[#E8EDE4] mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@itmbu.ac.in"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E8] dark:bg-[#12221E] border border-[#E0E2D9] dark:border-[#264941] text-[#202522] dark:text-[#F5F1E8] text-xs placeholder:text-[#68716B]/60 focus:outline-none focus:ring-2 focus:ring-[#D6E85D]"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-[#202522] dark:text-[#E8EDE4]">Password</label>
                    {isLogin && (
                      <button type="button" onClick={() => toast.info("Password reset available via Supabase email link.")} className="text-[11px] text-[#68716B] hover:text-[#183F36] dark:hover:text-[#D6E85D]">
                        Forgot?
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E8] dark:bg-[#12221E] border border-[#E0E2D9] dark:border-[#264941] text-[#202522] dark:text-[#F5F1E8] text-xs placeholder:text-[#68716B]/60 focus:outline-none focus:ring-2 focus:ring-[#D6E85D] pr-10"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68716B] hover:text-[#202522] p-1">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#183F36] hover:bg-[#12332C] text-white text-xs font-bold shadow-md shadow-[#183F36]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
                >
                  {loading ? (
                    <><Loader2 className="h-4 w-4 animate-spin text-[#D6E85D]" /><span>Verifying…</span></>
                  ) : (
                    <><span>{isLogin ? "Sign In to ITM Notes" : "Create My Free Account"}</span><ArrowRight className="h-4 w-4 text-[#D6E85D]" /></>
                  )}
                </button>
              </form>

              <div className="mt-5 pt-4 border-t border-[#E0E2D9] dark:border-[#264941] flex items-center justify-between text-[11px] text-[#68716B] dark:text-[#A2BAAF]">
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-[#267653] dark:text-[#D6E85D]" />
                  256-bit Encrypted
                </span>
                <span>Free & Open Source</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SECTION 6: FOOTER ──────────────────────────────────────────────── */}
        <footer className="bg-[#12332C] text-[#E8EDE4] py-10 border-t border-[#1D4A3F]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ItmMoocsLogo variant="live" size="sm" inverted={true} showTagline={false} />
            </div>
            <p className="text-xs text-[#A2BAAF] text-center sm:text-right">
              ITM Notes © 2025 · Made with ❤️ for ITM SLS Baroda University students
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}
