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
  Eye,
  EyeOff,
  Clock,
  FileText,
  ChevronRight,
  Terminal,
  Award,
  Zap,
  Download,
  Layers,
  Globe,
  Loader2,
  GraduationCap,
  Building2,
  Trophy,
  Play,
  RotateCcw,
  Sliders,
  ExternalLink,
  Search,
  CheckCircle,
  Star,
  Copy,
  ChevronDown,
  Compass,
  MessageCircle,
  FolderDown,
  AlertCircle
} from "lucide-react";
import { CampusLoopLogo } from "@/components/campusloop/CampusLoopLogo";
import { CampusAvatar } from "@/components/campusloop/CampusAvatar";
import { CampusTag } from "@/components/campusloop/CampusTag";

// Multi-University Support Registry
export interface UniversityOption {
  id: string;
  name: string;
  shortName: string;
  status: 'active' | 'beta' | 'planned';
  location: string;
  practicalsCount: number;
  badge: string;
}

export const UNIVERSITIES: UniversityOption[] = [
  {
    id: "itm-baroda",
    name: "ITM (SLS) Baroda University",
    shortName: "ITM SLS Baroda",
    status: "active",
    location: "Vadodara, Gujarat",
    practicalsCount: 154,
    badge: "Official Campus Hub",
  },
  {
    id: "gtu",
    name: "Gujarat Technological University",
    shortName: "GTU Gujarat",
    status: "beta",
    location: "Ahmedabad, Gujarat",
    practicalsCount: 140,
    badge: "AICTE Mapped",
  },
  {
    id: "parul",
    name: "Parul University (PIET / PIT)",
    shortName: "Parul University",
    status: "beta",
    location: "Vadodara, Gujarat",
    practicalsCount: 120,
    badge: "Engineering Cohort",
  },
  {
    id: "charusat",
    name: "CHARUSAT (CSPIT & DEPSTAR)",
    shortName: "CHARUSAT",
    status: "beta",
    location: "Changa, Gujarat",
    practicalsCount: 110,
    badge: "Syllabus Aligned",
  },
  {
    id: "pdeu",
    name: "Pandit Deendayal Energy University (PDEU)",
    shortName: "PDEU Gandhinagar",
    status: "planned",
    location: "Gandhinagar, Gujarat",
    practicalsCount: 95,
    badge: "Expansion Cohort",
  },
  {
    id: "svnit",
    name: "SVNIT Surat (NIT)",
    shortName: "SVNIT Surat",
    status: "planned",
    location: "Surat, Gujarat",
    practicalsCount: 130,
    badge: "National Core",
  },
];

const TYPEWRITER_PHRASES = [
  "10-Year University Exam Question Banks & Solutions",
  "LeetCode & HackerRank-Grade Coding Lab (154+ Practicals)",
  "Remedial & Backlog Special: Guaranteed Pass Prep",
  "Real-Time 75% Attendance & Safe Bunk Radar",
  "CampusLoop Social Hub: Clubs, Events & Tech Fests",
  "Curated Faculty Notes & Formula Cheat Sheets",
];

export default function LandingPage({ focusAuth = false }: { focusAuth?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, isLoading } = useAuth();

  // Multi-University Selection State
  const [selectedUniversity, setSelectedUniversity] = useState<UniversityOption>(UNIVERSITIES[0]);
  const [isUnivDropdownOpen, setIsUnivDropdownOpen] = useState(false);
  const [isRequestUnivModalOpen, setIsRequestUnivModalOpen] = useState(false);
  const [requestedUnivName, setRequestedUnivName] = useState("");
  const [requestedUnivEmail, setRequestedUnivEmail] = useState("");

  // Auth Card State
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Interactive Hero Preview Sandbox Tabs
  const [heroSandboxTab, setHeroSandboxTab] = useState<'attendance' | 'code' | 'questions' | 'flashcards'>('attendance');

  // Interactive Attendance Demo State
  const [demoAttended, setDemoAttended] = useState(39);
  const [demoTotal, setDemoTotal] = useState(48);

  // Interactive Code Demo State
  const [demoLang, setDemoLang] = useState<'java' | 'c' | 'python' | 'sql'>('java');
  const [demoCodeOutput, setDemoCodeOutput] = useState<string | null>(null);
  const [demoCodeRunning, setDemoCodeRunning] = useState(false);

  // Interactive Flashcard State
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);

  // Typewriter State
  const [twIndex, setTwIndex] = useState(0);
  const [twText, setTwText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Counter Animation
  const statsRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const [mcqCount, setMcqCount] = useState(0);
  const [pdfCount, setPdfCount] = useState(0);
  const [labCount, setLabCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  // Redirect for authenticated users
  const [redirectCountdown, setRedirectCountdown] = useState(2);

  const fromState = (location.state as { from?: string | { pathname?: string; search?: string; hash?: string } } | null)?.from;
  const fromLocation = fromState
    ? (typeof fromState === "string" ? fromState : `${fromState.pathname || "/"}${fromState.search || ""}${fromState.hash || ""}`)
    : "/dashboard";

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

  useEffect(() => {
    if (focusAuth) {
      const el = document.getElementById("auth-portal-card");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [focusAuth]);

  // Typewriter Loop
  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[twIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && twText.length < currentPhrase.length) {
      timeout = setTimeout(() => setTwText(currentPhrase.slice(0, twText.length + 1)), 55);
    } else if (!isDeleting && twText.length === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && twText.length > 0) {
      timeout = setTimeout(() => setTwText(twText.slice(0, -1)), 30);
    } else if (isDeleting && twText.length === 0) {
      setIsDeleting(false);
      setTwIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [twText, isDeleting, twIndex]);

  // Stats Counters
  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersStarted) {
          setCountersStarted(true);
          animateCounter(setMcqCount, 520, 1600);
          animateCounter(setPdfCount, 84, 1400);
          animateCounter(setLabCount, 154, 1500);
          animateCounter(setStudentCount, 1850, 1800);
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [countersStarted]);

  function animateCounter(setter: React.Dispatch<React.SetStateAction<number>>, target: number, duration: number) {
    const steps = 35;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setter(Math.round((target * step) / steps));
      if (step >= steps) clearInterval(timer);
    }, interval);
  }

  // Attendance Calculations
  const demoPercentage = demoTotal > 0 ? (demoAttended / demoTotal) * 100 : 0;
  const isSafe = demoPercentage >= 75;
  const bunksRemaining = isSafe ? Math.floor((demoAttended - 0.75 * demoTotal) / 0.75) : 0;
  const classesNeeded = !isSafe ? Math.ceil((0.75 * demoTotal - demoAttended) / 0.25) : 0;

  // Run Code in Hero Preview
  const handleRunDemoCode = () => {
    setDemoCodeRunning(true);
    setDemoCodeOutput(null);
    setTimeout(() => {
      setDemoCodeRunning(false);
      if (demoLang === 'java') {
        setDemoCodeOutput("Passenger token #104 allocated seat: Confirmed.\nPassenger token #105 added to Waiting Queue.\nQueue Status: [Tokens: 105, 106, 107] (Size: 3/6)\nExecution completed with 0 errors. (Runtime: 1.4ms)\nAll 3 testcases PASSED.");
      } else if (demoLang === 'c') {
        setDemoCodeOutput("Initialized circular queue of capacity 6.\nEnqueue token 104 -> SUCCESS.\nFront=0, Rear=1 | Head passenger: 104\nExit code: 0 (Runtime: 0.8ms)\nTestcase 1 [Normal]: PASSED\nTestcase 2 [Wrap-around]: PASSED");
      } else if (demoLang === 'python') {
        setDemoCodeOutput("Solving root via Newton-Raphson method...\nIteration 1: x = 2.0541 | f(x) = 0.0124\nIteration 2: x = 2.0945 | Root converged at tolerance 1e-4.\nRoot found: x = 2.09455\nExit code: 0 (Runtime: 1.1ms)");
      } else {
        setDemoCodeOutput("SELECT student_id, name, sgpa FROM students WHERE sgpa >= 8.5 ORDER BY sgpa DESC;\nQuery executed in 0.04ms. Returned 14 records.\nTop Ranker: Maher Bhatt (SGPA: 9.62)");
      }
    }, 600);
  };

  // Auth Handler
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

        toast.success("Welcome back! Signing you in...");

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

        toast.success("Account created successfully! Welcome to the academic portal.");
        navigate("/onboarding", { replace: true });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Authentication error. Please check your credentials.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email address first, then click 'Forgot?' to receive a reset link.");
      return;
    }
    try {
      setLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth?mode=reset`,
      });
      if (error) throw error;
      toast.success(`Password reset link sent to ${email.trim()}! Please check your inbox.`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to send reset link.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestUniversity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestedUnivName.trim()) {
      toast.error("Please enter your university or college name.");
      return;
    }
    toast.success(`Request registered for ${requestedUnivName}! Our academic team will map your curriculum.`);
    setIsRequestUnivModalOpen(false);
    setRequestedUnivName("");
    setRequestedUnivEmail("");
  };

  return (
    <div className="min-h-screen bg-[#F6F3EC] dark:bg-[#111111] text-[#111111] dark:text-[#F6F3EC] font-sans antialiased selection:bg-[#2B4EFF] selection:text-white transition-colors duration-200">

      {/* ── TOP CAMPUSLOOP HEADER ────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#F6F3EC]/90 dark:bg-[#111111]/90 backdrop-blur-md border-b border-[#E8E4DA] dark:border-neutral-800 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <CampusLoopLogo size={32} />
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-bold text-base leading-tight">
                  <span className="text-[#111111] dark:text-white">Campus</span>
                  <span className="text-[#2B4EFF]">Loop</span>
                  <span className="text-[10px] font-mono uppercase bg-[#2B4EFF]/10 text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300 px-1.5 py-0.2 rounded-full ml-1">
                    ITM
                  </span>
                </div>
                <span className="text-[10px] font-medium text-[#6B7280] dark:text-neutral-400">
                  Engineering Academic Suite
                </span>
              </div>
            </Link>

            {/* University Switcher Pill */}
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsUnivDropdownOpen(!isUnivDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] text-xs font-semibold text-[#111111] dark:text-white hover:border-[#2B4EFF]/50 shadow-2xs transition-all cursor-pointer"
              >
                <GraduationCap className="h-3.5 w-3.5 text-[#2B4EFF]" />
                <span className="truncate max-w-[150px] font-medium">{selectedUniversity.shortName}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/60 dark:text-blue-300 font-mono font-bold">
                  {selectedUniversity.status.toUpperCase()}
                </span>
                <ChevronDown className="h-3 w-3 text-[#6B7280]" />
              </button>

              {isUnivDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-80 rounded-[20px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 shadow-xl p-2 z-50 animate-scale-in">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-neutral-400 border-b border-[#E8E4DA] dark:border-neutral-800">
                    Select University Cohort
                  </div>
                  <div className="py-1 space-y-1">
                    {UNIVERSITIES.map((univ) => (
                      <button
                        key={univ.id}
                        onClick={() => {
                          setSelectedUniversity(univ);
                          setIsUnivDropdownOpen(false);
                          toast.success(`Switched view to ${univ.name}`);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-between ${
                          selectedUniversity.id === univ.id
                            ? "bg-[#E6EAFD] dark:bg-blue-950/40 font-bold text-[#2B4EFF]"
                            : "hover:bg-[#F6F3EC] dark:hover:bg-neutral-800 text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white"
                        }`}
                      >
                        <div>
                          <div className="font-semibold text-[#111111] dark:text-white">{univ.name}</div>
                          <div className="text-[10px] text-[#6B7280] dark:text-neutral-400">{univ.location} • {univ.practicalsCount} Practicals</div>
                        </div>
                        {selectedUniversity.id === univ.id && <Check className="h-4 w-4 text-[#2B4EFF]" />}
                      </button>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-[#E8E4DA] dark:border-neutral-800">
                    <button
                      onClick={() => {
                        setIsUnivDropdownOpen(false);
                        setIsRequestUnivModalOpen(true);
                      }}
                      className="w-full text-center py-2 text-xs font-bold text-[#2B4EFF] hover:underline"
                    >
                      + Request Your University / College
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-[#6B7280] dark:text-neutral-400">
            <a href="#what-you-get" className="hover:text-[#111111] dark:hover:text-white transition-colors">Curriculum Features</a>
            <a href="#coding-lab-preview" className="hover:text-[#111111] dark:hover:text-white transition-colors">Coding Lab</a>
            <a href="#remedial-special" className="hover:text-[#111111] dark:hover:text-white transition-colors">Remedial Savior Pack</a>
            <a href="#comparison" className="hover:text-[#111111] dark:hover:text-white transition-colors">Why ITM Notes</a>
            <a href="#stats" className="hover:text-[#111111] dark:hover:text-white transition-colors">Platform Numbers</a>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="px-5 py-2 rounded-full bg-[#111111] text-white dark:bg-white dark:text-[#111111] text-xs font-bold shadow-xs hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
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
                  className="px-4 py-2 rounded-full text-xs font-semibold text-[#6B7280] dark:text-neutral-300 hover:text-[#111111] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    document.getElementById("auth-portal-card")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-2 rounded-full bg-[#2B4EFF] text-white text-xs font-bold hover:bg-[#2340d9] transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── SECTION 1: HERO & LIVE INTERACTIVE PREVIEW ───────────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#E8E4DA] dark:border-neutral-800">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Multi-University Live Banner */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#1C1C1E] text-xs font-semibold border border-[#E8E4DA] dark:border-neutral-800 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D7F75B] opacity-90" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D7F75B]" />
              </span>
              <span className="text-[#111111] dark:text-white font-bold">{selectedUniversity.name}</span>
              <span className="text-[#6B7280] dark:text-neutral-500">·</span>
              <span className="text-[#2B4EFF] font-semibold text-[11px]">{selectedUniversity.badge}</span>
            </div>
            <button
              onClick={() => setIsRequestUnivModalOpen(true)}
              className="text-xs text-[#6B7280] dark:text-neutral-400 hover:text-[#2B4EFF] underline underline-offset-4 font-medium"
            >
              Not your campus? Add yours →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Hero Column: High-Impact Typography & Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6EAFD] dark:bg-blue-950/40 text-[#2B4EFF] dark:text-blue-300 text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The Engineering Super-App for University Students</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] dark:text-white leading-[1.08]">
                Study Smarter.<br />
                <span className="text-[#2B4EFF]">
                  Score in the 99th Percentile.
                </span>
              </h1>

              {/* Typewriter Line */}
              <div className="text-sm sm:text-base font-mono font-medium text-[#6B7280] dark:text-neutral-400 flex items-center gap-2 justify-center lg:justify-start min-h-[2.5rem]">
                <span className="text-[#111111] dark:text-white font-bold shrink-0">Includes:</span>
                <span className="text-[#111111] dark:text-white border-b border-[#2B4EFF] pb-0.5 font-semibold">
                  {twText}
                  <span className="ml-0.5 inline-block w-0.5 h-4 bg-[#2B4EFF] animate-pulse" />
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#6B7280] dark:text-neutral-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                The centralized academic portal for technical students. 100% verified syllabus notes, solved 10-year question banks, LeetCode-grade coding lab, and real-time 75% attendance buffer tracking — completely free.
              </p>

              {/* CTA Row */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1">
                <button
                  onClick={() => {
                    setIsLogin(false);
                    document.getElementById("auth-portal-card")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-6 py-3.5 rounded-full bg-[#111111] text-white dark:bg-white dark:text-[#111111] font-bold text-xs sm:text-sm shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Create Free Account</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    sessionStorage.setItem('itm_guest_mode', 'true');
                    navigate("/subjects");
                  }}
                  className="px-6 py-3.5 rounded-full border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] text-[#111111] dark:text-white font-semibold text-xs sm:text-sm hover:border-[#2B4EFF]/50 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="h-4 w-4 text-[#2B4EFF]" />
                  <span>Explore All Syllabi as Guest →</span>
                </button>
              </div>

              {/* Verified Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                {[
                  { val: "100%", label: "Syllabus Mapped" },
                  { val: "154+", label: "Coding Practicals" },
                  { val: "520+", label: "Exam Questions" },
                  { val: "0 ₹", label: "Free Forever" },
                ].map((item) => (
                  <div key={item.label} className="p-3.5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 text-center shadow-2xs">
                    <div className="text-xl sm:text-2xl font-black font-mono text-[#111111] dark:text-white">{item.val}</div>
                    <div className="text-[10px] text-[#6B7280] dark:text-neutral-400 uppercase font-bold tracking-wider mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Column: Auth Form Card (CampusLoop Style) */}
            <div id="auth-portal-card" className="lg:col-span-5 animate-scale-in">
              <div className="bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 rounded-[24px] p-6 sm:p-8 shadow-xl relative overflow-hidden">
                
                {/* Mode Selector */}
                <div className="flex p-1 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 border border-[#E8E4DA] dark:border-neutral-700 mb-6">
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isLogin ? "bg-white dark:bg-[#111111] text-[#111111] dark:text-white shadow-xs font-black" : "text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      !isLogin ? "bg-white dark:bg-[#111111] text-[#111111] dark:text-white shadow-xs font-black" : "text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white"
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                <div className="mb-5 text-left">
                  <h3 className="text-xl font-black text-[#111111] dark:text-white tracking-tight">
                    {isLogin ? "Welcome Back to ITM Notes" : "Join Your Campus Cohort"}
                  </h3>
                  <p className="text-xs text-[#6B7280] dark:text-neutral-400 mt-1">
                    {isLogin
                      ? "Sign in to access your notes, coding lab, and study streak."
                      : `Free registration for all ${selectedUniversity.shortName} students.`}
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4 text-left">
                  {!isLogin && (
                    <div>
                      <label className="block text-xs font-bold text-[#111111] dark:text-white mb-1.5">Full Name</label>
                      <input
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. Maher Bhatt"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DA] dark:border-neutral-700 bg-[#F6F3EC] dark:bg-neutral-800 text-xs text-[#111111] dark:text-white placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#2B4EFF]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#111111] dark:text-white mb-1.5">University / College Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@itmbu.ac.in"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DA] dark:border-neutral-700 bg-[#F6F3EC] dark:bg-neutral-800 text-xs text-[#111111] dark:text-white placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#2B4EFF]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-[#111111] dark:text-white">Password</label>
                      {isLogin && (
                        <button
                          type="button"
                          onClick={handleForgotPassword}
                          className="text-[11px] text-[#2B4EFF] hover:underline font-medium"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DA] dark:border-neutral-700 bg-[#F6F3EC] dark:bg-neutral-800 text-xs text-[#111111] dark:text-white placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#2B4EFF] pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111111] dark:hover:text-white p-1 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-full bg-[#2B4EFF] text-white text-xs font-bold shadow-xs hover:bg-[#2340d9] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Verifying Credentials…</span>
                      </>
                    ) : (
                      <>
                        <span>{isLogin ? "Sign In to ITM Notes" : "Create My Student Account"}</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                {/* 1-Click Guest Bypass */}
                <div className="mt-4 pt-3.5 border-t border-[#E8E4DA] dark:border-neutral-800 flex items-center justify-between text-xs">
                  <span className="text-[#6B7280] dark:text-neutral-400 text-[11px]">Just browsing?</span>
                  <button
                    onClick={() => {
                      sessionStorage.setItem('itm_guest_mode', 'true');
                      navigate("/dashboard");
                    }}
                    className="font-bold text-[#2B4EFF] hover:underline text-[11px] cursor-pointer flex items-center gap-1"
                  >
                    <span>Continue as Guest</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* ── INTERACTIVE LIVE SANDBOX TABS (ATTENDANCE, CODE RUNNER, QUESTIONS, FLASHCARDS) ── */}
          <div className="mt-16 rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E4DA] dark:border-neutral-800 pb-5 mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2B4EFF]">
                  Interactive Demo Sandbox
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#111111] dark:text-white tracking-tight mt-0.5">
                  Test-Drive the Core Features Right Now
                </h3>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 border border-[#E8E4DA] dark:border-neutral-700 overflow-x-auto scrollbar-none">
                <button
                  onClick={() => setHeroSandboxTab('attendance')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    heroSandboxTab === 'attendance'
                      ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-xs'
                      : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
                  }`}
                >
                  75% Attendance Radar
                </button>
                <button
                  onClick={() => setHeroSandboxTab('code')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    heroSandboxTab === 'code'
                      ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-xs'
                      : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
                  }`}
                >
                  Live Code IDE
                </button>
                <button
                  onClick={() => setHeroSandboxTab('questions')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    heroSandboxTab === 'questions'
                      ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-xs'
                      : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
                  }`}
                >
                  Exam IMP Bank
                </button>
                <button
                  onClick={() => setHeroSandboxTab('flashcards')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    heroSandboxTab === 'flashcards'
                      ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-xs'
                      : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
                  }`}
                >
                  Active Recall Flip
                </button>
              </div>
            </div>

            {/* TAB 1: ATTENDANCE & SAFE BUNK CALCULATOR */}
            {heroSandboxTab === 'attendance' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#111111] dark:text-white">Classes Attended: {demoAttended}</span>
                      <span className="text-[#6B7280] dark:text-neutral-400 font-mono">{Math.round((demoAttended / demoTotal) * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max={demoTotal}
                      value={demoAttended}
                      onChange={(e) => setDemoAttended(Number(e.target.value))}
                      className="w-full accent-[#2B4EFF] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#111111] dark:text-white">Total Classes Scheduled: {demoTotal}</span>
                      <span className="text-[#6B7280] dark:text-neutral-400 font-mono">100% Basis</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="80"
                      value={demoTotal}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setDemoTotal(val);
                        if (demoAttended > val) setDemoAttended(val);
                      }}
                      className="w-full accent-[#2B4EFF] cursor-pointer"
                    />
                  </div>

                  <p className="text-xs text-[#6B7280] dark:text-neutral-400 leading-relaxed">
                    Under university guidelines, falling below 75% attendance leads to debasement from end-semester examination hall tickets. Use our radar to plan leaves safely without risking detention.
                  </p>
                </div>

                <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F6F3EC] dark:bg-neutral-800 border border-[#E8E4DA] dark:border-neutral-700 text-center space-y-3">
                  <div className="text-4xl font-black font-mono text-[#111111] dark:text-white">
                    {demoPercentage.toFixed(1)}%
                  </div>
                  <div className="text-xs font-bold">
                    {isSafe ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-black flex items-center justify-center gap-1.5">
                        <CheckCircle className="h-4 w-4" /> Eligible for Hall Ticket
                      </span>
                    ) : (
                      <span className="text-rose-500 font-black flex items-center justify-center gap-1.5">
                        <AlertCircle className="h-4 w-4" /> Critical Shortage Risk
                      </span>
                    )}
                  </div>
                  <div className="p-3 rounded-xl bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-700 text-xs font-medium text-[#111111] dark:text-white">
                    {isSafe ? (
                      <span>You can safely bunk <strong>{bunksRemaining} more class{bunksRemaining !== 1 ? 'es' : ''}</strong> while remaining above 75%.</span>
                    ) : (
                      <span>You must attend <strong>{classesNeeded} consecutive class{classesNeeded !== 1 ? 'es' : ''}</strong> without missing to restore 75%.</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: LIVE CODE IDE PREVIEW */}
            {heroSandboxTab === 'code' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between bg-neutral-950 px-4 py-2.5 rounded-t-2xl border border-neutral-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-neutral-300 font-semibold">Practical 3: Circular Queue</span>
                    <div className="flex gap-1 ml-3">
                      {(['java', 'c', 'python', 'sql'] as const).map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            setDemoLang(lang);
                            setDemoCodeOutput(null);
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] uppercase font-mono font-bold transition-all cursor-pointer ${
                            demoLang === lang ? 'bg-[#2B4EFF] text-white' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleRunDemoCode}
                    disabled={demoCodeRunning}
                    className="px-3.5 py-1 rounded-full bg-[#D7F75B] text-[#111111] font-bold text-xs flex items-center gap-1.5 hover:bg-[#c9eb4d] transition-all cursor-pointer"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>{demoCodeRunning ? "Running..." : "Run Test Harness"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <pre className="p-4 rounded-b-2xl lg:rounded-bl-2xl lg:rounded-br-none bg-neutral-950 text-neutral-200 font-mono text-xs overflow-x-auto border border-neutral-800 leading-relaxed min-h-[150px]">
                    {demoLang === 'java' && `public class RailwayReservationQueue {\n    private int[] queue = new int[6];\n    private int front = -1, rear = -1;\n    \n    public boolean enqueue(int token) {\n        if ((rear + 1) % 6 == front) return false;\n        if (front == -1) front = 0;\n        rear = (rear + 1) % 6;\n        queue[rear] = token;\n        return true;\n    }\n}`}
                    {demoLang === 'c' && `#include <stdio.h>\n#define MAX 6\nint queue[MAX], front = -1, rear = -1;\n\nint enqueue(int token) {\n    if ((rear + 1) % MAX == front) return 0;\n    if (front == -1) front = 0;\n    rear = (rear + 1) % MAX;\n    queue[rear] = token;\n    return 1;\n}`}
                    {demoLang === 'python' && `def newton_raphson(f, df, x0, tol=1e-4):\n    x = x0\n    for i in range(100):\n        diff = f(x) / df(x)\n        x = x - diff\n        if abs(diff) < tol: return x\n    return x`}
                    {demoLang === 'sql' && `-- University Merit Query\nSELECT student_id, name, sgpa\nFROM semester_results\nWHERE sgpa >= 8.5\nORDER BY sgpa DESC;`}
                  </pre>

                  <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-neutral-300 font-mono text-xs space-y-2">
                    <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Terminal className="h-3.5 w-3.5" /> Simulated Console Output
                    </div>
                    {demoCodeOutput ? (
                      <pre className="text-neutral-200 whitespace-pre-line leading-relaxed">
                        {demoCodeOutput}
                      </pre>
                    ) : (
                      <p className="text-neutral-500 italic">Click "Run Test Harness" above to compile and execute testcases in real time.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: EXAM IMP QUESTION BANK PREVIEW */}
            {heroSandboxTab === 'questions' && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#F6F3EC] dark:bg-neutral-800 border border-[#E8E4DA] dark:border-neutral-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/60 dark:text-blue-300">
                        7 Marks · Mid-Sem Priority
                      </span>
                      <span className="text-[11px] font-mono text-[#6B7280]">Probability: 95%</span>
                    </div>
                    <h4 className="font-bold text-sm text-[#111111] dark:text-white">
                      Q1: Explain Java Polymorphism with Dynamic Method Dispatch and Bytecode Flow
                    </h4>
                    <p className="text-xs text-[#6B7280] dark:text-neutral-400 leading-relaxed">
                      Includes complete method overriding diagram, invocation bytecode (`invokevirtual`), and sample code with 100% full-credit answers.
                    </p>
                    <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-[#2B4EFF]">
                      <CheckCircle2 className="h-4 w-4" /> Solved Step-by-Step with Code
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#F6F3EC] dark:bg-neutral-800 border border-[#E8E4DA] dark:border-neutral-700 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#D7F75B]/20 text-[#111111] dark:text-[#D7F75B]">
                        5 Marks · Remedial Core
                      </span>
                      <span className="text-[11px] font-mono text-[#6B7280]">Probability: 92%</span>
                    </div>
                    <h4 className="font-bold text-sm text-[#111111] dark:text-white">
                      Q2: Differentiate between B-Tree and B+ Tree with Disk Block Pointers
                    </h4>
                    <p className="text-xs text-[#6B7280] dark:text-neutral-400 leading-relaxed">
                      Comparison matrix covering redundant leaf pointers, range query performance, and indexing height calculation.
                    </p>
                    <div className="pt-1 flex items-center gap-2 text-xs font-semibold text-[#2B4EFF]">
                      <CheckCircle2 className="h-4 w-4" /> Full-Score Comparison Matrix
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: FLASHCARD ACTIVE RECALL PREVIEW */}
            {heroSandboxTab === 'flashcards' && (
              <div className="flex flex-col items-center justify-center py-6 animate-fade-in">
                <div
                  onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                  className="w-full max-w-md h-52 rounded-2xl bg-[#F6F3EC] dark:bg-neutral-800 border-2 border-[#2B4EFF]/40 p-6 flex flex-col justify-between cursor-pointer shadow-sm hover:border-[#2B4EFF] transition-all select-none"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#2B4EFF]">
                      {flashcardFlipped ? "ANSWER & MNEMONIC" : "ACTIVE RECALL QUESTION"}
                    </span>
                    <span className="text-[11px] text-[#6B7280]">Click card to flip ↻</span>
                  </div>

                  <div className="text-center my-auto">
                    {flashcardFlipped ? (
                      <p className="text-sm font-semibold text-[#111111] dark:text-white leading-relaxed">
                        <strong>ACID Properties:</strong><br />
                        <span className="text-[#2B4EFF]">A</span>tomicity (All or None)<br />
                        <span className="text-[#2B4EFF]">C</span>onsistency (State Invariant)<br />
                        <span className="text-[#2B4EFF]">I</span>solation (Concurrent Independence)<br />
                        <span className="text-[#2B4EFF]">D</span>urability (Non-Volatile Commit)
                      </p>
                    ) : (
                      <h4 className="text-base font-black text-[#111111] dark:text-white">
                        What are the 4 fundamental ACID properties of a relational database transaction?
                      </h4>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#6B7280]">
                    <span>Topic: Database Systems</span>
                    <span className="font-mono">Card 1 of 42</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ── SECTION 2: WHAT YOU GET (COMPREHENSIVE BENTO GRID) ────────────── */}
      <section id="what-you-get" className="py-20 border-b border-[#E8E4DA] dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2B4EFF] block mb-2">
              Curriculum Mastery
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111111] dark:text-white tracking-tight">
              Everything Needed to Ace University Exams
            </h2>
            <p className="text-sm text-[#6B7280] dark:text-neutral-400 mt-3">
              Engineered with feedback from university toppers, alumni, and faculty evaluators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Bento Card 1: Remedial & IMP Question Banks */}
            <div id="remedial-special" className="p-7 rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 shadow-xs hover:border-[#2B4EFF]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E6EAFD] dark:bg-blue-950/40 text-[#2B4EFF] flex items-center justify-center font-bold">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-[#111111] dark:text-white">Remedial Special & Question Banks</h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-neutral-400 leading-relaxed">
                100% solved question banks with probability ratings. If you're preparing in the final 48 hours, every question includes clear theory, step-by-step algorithms, and mark distribution.
              </p>
              <div className="pt-2 text-[11px] font-mono font-bold text-[#2B4EFF] flex items-center gap-1">
                <span>OOPJ, DSA, DBMS, CA & Math</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            </div>

            {/* Bento Card 2: LeetCode & HackerRank IDE */}
            <div id="coding-lab-preview" className="p-7 rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 shadow-xs hover:border-[#2B4EFF]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D7F75B]/20 text-[#111111] dark:text-[#D7F75B] flex items-center justify-center font-bold">
                <Code2 className="h-6 w-6 text-[#2B4EFF]" />
              </div>
              <h3 className="text-lg font-black text-[#111111] dark:text-white">LeetCode-Grade Coding Lab</h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-neutral-400 leading-relaxed">
                154+ university practicals in C99, Java OOP, Python, and SQL. Multi-case test runner, expected vs actual diff viewer, and instant lab manual print formatting.
              </p>
              <div className="pt-2 text-[11px] font-mono font-bold text-[#2B4EFF] flex items-center gap-1">
                <span>Integrated Monaco Compiler</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            </div>

            {/* Bento Card 3: 75% Attendance & SGPA Shield */}
            <div className="p-7 rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 shadow-xs hover:border-[#2B4EFF]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E6EAFD] dark:bg-blue-950/40 text-[#2B4EFF] flex items-center justify-center font-bold">
                <Calculator className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-[#111111] dark:text-white">SGPA & Attendance Radar</h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-neutral-400 leading-relaxed">
                Never lose your examination hall ticket. Real-time class bunk tracker calculates exactly how many lectures you can miss while keeping attendance strictly above 75%.
              </p>
              <div className="pt-2 text-[11px] font-mono font-bold text-[#2B4EFF] flex items-center gap-1">
                <span>CGPA Goal Predictor</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            </div>

            {/* Bento Card 4: Multi-University Architecture */}
            <div className="p-7 rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 shadow-xs hover:border-[#2B4EFF]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FDE8E0] dark:bg-rose-950/40 text-[#111111] dark:text-rose-300 flex items-center justify-center font-bold">
                <Building2 className="h-6 w-6 text-[#2B4EFF]" />
              </div>
              <h3 className="text-lg font-black text-[#111111] dark:text-white">Multi-University Curriculum</h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-neutral-400 leading-relaxed">
                Engineered for scalability across Gujarat and national technical universities. Mapped to AICTE guidelines for ITM SLS Baroda, GTU, Parul, CHARUSAT, and PDEU.
              </p>
              <div className="pt-2 text-[11px] font-mono font-bold text-[#2B4EFF] flex items-center gap-1">
                <span>Universal Engineering Mappings</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            </div>

            {/* Bento Card 5: Flashcards & Spaced Repetition */}
            <div className="p-7 rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 shadow-xs hover:border-[#2B4EFF]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E6EAFD] dark:bg-blue-950/40 text-[#2B4EFF] flex items-center justify-center font-bold">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-black text-[#111111] dark:text-white">Rapid Flashcard Engine</h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-neutral-400 leading-relaxed">
                SM-2 spaced repetition flashcards for rapid exam revision. Master complex definitions, acronyms, and formulas 3x faster than reading dense textbooks.
              </p>
              <div className="pt-2 text-[11px] font-mono font-bold text-[#2B4EFF] flex items-center gap-1">
                <span>Active Recall Tested</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            </div>

            {/* Bento Card 6: Peer Community & Viva Oral Prep */}
            <div className="p-7 rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 shadow-xs hover:border-[#2B4EFF]/40 transition-all space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D7F75B]/20 text-[#111111] dark:text-[#D7F75B] flex items-center justify-center font-bold">
                <Users className="h-6 w-6 text-[#2B4EFF]" />
              </div>
              <h3 className="text-lg font-black text-[#111111] dark:text-white">CampusLoop Community & Clubs</h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-neutral-400 leading-relaxed">
                Campus discussions, student clubs, hackathons, event RSVPs, faculty directory, and viva exam question banks with verified examiner answers.
              </p>
              <div className="pt-2 text-[11px] font-mono font-bold text-[#2B4EFF] flex items-center gap-1">
                <span>Connect with Verified Peers</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3: COMPARISON (ITM NOTES VS MESSY WHATSAPP GROUPS) ─── */}
      <section id="comparison" className="py-20 border-b border-[#E8E4DA] dark:border-neutral-800 bg-[#EFECE4] dark:bg-[#161618]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2B4EFF] block mb-2">
              The Engineering Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#111111] dark:text-white tracking-tight">
              Why Students Stop Scrambling on WhatsApp
            </h2>
          </div>

          <div className="rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#E8E4DA] dark:border-neutral-800 font-bold text-xs p-4 bg-[#F6F3EC] dark:bg-neutral-800">
              <div className="text-[#6B7280] dark:text-neutral-400">Study Factor</div>
              <div className="text-rose-500 mt-2 md:mt-0">Chaotic WhatsApp / Telegram Groups</div>
              <div className="text-[#2B4EFF] font-black mt-2 md:mt-0">ITM Notes Platform</div>
            </div>

            {[
              {
                feature: "Exam Question Banks",
                bad: "Scattered unreadable phone photos of past papers without answers",
                good: "100% typed, solved answers with step-by-step logic and code",
              },
              {
                feature: "Remedial Special Prep",
                bad: "Zero guidance; students panic 24 hours before the exam",
                good: "High-yield pass-guarantee pack covering core 40 marks reliably",
              },
              {
                feature: "Coding Lab Practicals",
                bad: "Copying broken screenshots with syntax errors into Notepad",
                good: "Live in-browser compiler with testcases and 1-click lab record export",
              },
              {
                feature: "Attendance Tracking",
                bad: "Manual excel sheets; discovering you're debarred on exam day",
                good: "Automatic 75% attendance radar with safe bunk alert warnings",
              },
              {
                feature: "Multi-University Portability",
                bad: "Specific to one batch; incompatible with other colleges",
                good: "Modular syllabus mapping across universities and semesters",
              },
            ].map((row, i) => (
              <div key={row.feature} className={`grid grid-cols-1 md:grid-cols-3 p-4 sm:p-5 text-xs border-b border-[#E8E4DA] dark:border-neutral-800/60 ${i % 2 === 1 ? 'bg-[#F6F3EC]/50 dark:bg-neutral-800/30' : ''}`}>
                <div className="font-bold text-[#111111] dark:text-white mb-1 md:mb-0">{row.feature}</div>
                <div className="text-[#6B7280] line-through opacity-80 mb-2 md:mb-0">{row.bad}</div>
                <div className="font-semibold text-[#111111] dark:text-white flex items-start gap-1.5">
                  <Check className="h-4 w-4 shrink-0 text-[#2B4EFF]" />
                  <span>{row.good}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: PLATFORM BY THE NUMBERS ───────────────────────────── */}
      <section id="stats" ref={statsRef} className="py-20 border-b border-[#E8E4DA] dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2B4EFF] block mb-2">
              Verified Metrics
            </span>
            <h2 className="text-3xl font-black text-[#111111] dark:text-white tracking-tight">
              A Scalable Academic Repository
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { val: mcqCount, suf: "+", label: "Solved Practice MCQs", icon: HelpCircle },
              { val: pdfCount, suf: "+", label: "Curated Study Guides", icon: FileText },
              { val: labCount, suf: "+", label: "Live Coding Practicals", icon: Code2 },
              { val: studentCount, suf: "+", label: "Students Preparing", icon: Users },
            ].map((stat) => (
              <div key={stat.label} className="p-6 rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 text-center shadow-2xs">
                <stat.icon className="h-5 w-5 mx-auto text-[#2B4EFF] mb-3" />
                <div className="text-3xl sm:text-4xl font-black font-mono text-[#111111] dark:text-white">
                  {stat.val}{stat.suf}
                </div>
                <div className="text-[11px] text-[#6B7280] dark:text-neutral-400 uppercase font-bold tracking-wider mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-12 bg-[#F6F3EC] dark:bg-[#111111] border-t border-[#E8E4DA] dark:border-neutral-800 text-xs text-[#6B7280] dark:text-neutral-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CampusLoopLogo size={24} />
            <span className="font-semibold text-[#111111] dark:text-white">CampusLoop · ITM Notes</span>
            <span>— Open-Source Engineering Academic Suite</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Supported Campuses: ITM SLS Baroda • GTU • Parul • CHARUSAT</span>
            <button
              onClick={() => setIsRequestUnivModalOpen(true)}
              className="text-[#2B4EFF] hover:underline font-semibold"
            >
              Add Your University
            </button>
          </div>
        </div>
      </footer>

      {/* ── MODAL: REQUEST YOUR UNIVERSITY / SYLLABUS ─────────────────────── */}
      {isRequestUnivModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-[#1C1C1E] text-[#111111] dark:text-white border border-[#E8E4DA] dark:border-neutral-800 rounded-[24px] p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black text-[#111111] dark:text-white">Request Your University</h3>
              <button
                onClick={() => setIsRequestUnivModalOpen(false)}
                className="text-[#6B7280] hover:text-[#111111] dark:hover:text-white p-1"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-[#6B7280] dark:text-neutral-400 mb-5 leading-relaxed">
              We are actively expanding ITM Notes to engineering campuses across Gujarat and India. Enter your details to prioritize your curriculum mapping.
            </p>

            <form onSubmit={handleRequestUniversity} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold text-[#111111] dark:text-white mb-1">University / Institute Name</label>
                <input
                  type="text"
                  required
                  value={requestedUnivName}
                  onChange={(e) => setRequestedUnivName(e.target.value)}
                  placeholder="e.g. GTU, Nirma University, PDEU"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DA] dark:border-neutral-700 bg-[#F6F3EC] dark:bg-neutral-800 text-xs text-[#111111] dark:text-white placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#2B4EFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#111111] dark:text-white mb-1">Your Student Email (For Notification)</label>
                <input
                  type="email"
                  value={requestedUnivEmail}
                  onChange={(e) => setRequestedUnivEmail(e.target.value)}
                  placeholder="name@college.edu"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E4DA] dark:border-neutral-700 bg-[#F6F3EC] dark:bg-neutral-800 text-xs text-[#111111] dark:text-white placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#2B4EFF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#2B4EFF] text-white font-bold text-xs hover:bg-[#2340d9] transition-all cursor-pointer shadow-xs"
              >
                Submit University Request
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
