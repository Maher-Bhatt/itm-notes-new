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
  AlertCircle,
  Share2,
  Heart,
  Calendar,
  Send
} from "lucide-react";
import { CampusLoopLogo } from "@/components/campusloop/CampusLoopLogo";
import { CampusAvatar } from "@/components/campusloop/CampusAvatar";
import { CampusTag } from "@/components/campusloop/CampusTag";
import { UNIVERSITIES_REGISTRY } from "@/data/universitiesData";

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
    id: "nirma",
    name: "Nirma University",
    shortName: "Nirma Ahmedabad",
    status: "beta",
    location: "Ahmedabad, Gujarat",
    practicalsCount: 135,
    badge: "Tier-1 Autonomous",
  },
  {
    id: "msu-baroda",
    name: "Maharaja Sayajirao University (FTE)",
    shortName: "MSU Baroda",
    status: "beta",
    location: "Vadodara, Gujarat",
    practicalsCount: 125,
    badge: "State Premier",
  },
  {
    id: "iit-bombay",
    name: "IIT Bombay",
    shortName: "IIT Bombay",
    status: "planned",
    location: "Mumbai, Maharashtra",
    practicalsCount: 180,
    badge: "National Premier",
  },
  {
    id: "bits-pilani",
    name: "BITS Pilani",
    shortName: "BITS Pilani",
    status: "planned",
    location: "Pilani, Rajasthan",
    practicalsCount: 165,
    badge: "National Core",
  },
];

const TYPEWRITER_PHRASES = [
  "Multi-University Combined Campus Feed & Live Pulse",
  "51+ Academic Subjects (21 B.Tech + 30 BCA) with Full Notes",
  "LeetCode & HackerRank-Grade Coding Lab (154+ Practicals)",
  "Safe 75% Attendance Buffer & Bunk Calculator",
  "Clubs, Hackathons & Tech Events in One Loop",
  "10-Year Solved University Exam Question Banks",
];

export default function LandingPage({ focusAuth = false }: { focusAuth?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, isLoading } = useAuth();

  // Multi-University State
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

  // Interactive Sandboxes Tab
  const [sandboxTab, setSandboxTab] = useState<'feed' | 'code' | 'attendance' | 'curriculum'>('feed');

  // Interactive Feed Demo State
  const [feedLiked, setFeedLiked] = useState(false);
  const [feedLikeCount, setFeedLikeCount] = useState(84);

  // Interactive Code Demo State
  const [demoLang, setDemoLang] = useState<'java' | 'c' | 'python' | 'sql'>('java');
  const [demoCodeOutput, setDemoCodeOutput] = useState<string | null>(null);
  const [demoCodeRunning, setDemoCodeRunning] = useState(false);

  // Interactive Attendance Demo State
  const [demoAttended, setDemoAttended] = useState(38);
  const [demoTotal, setDemoTotal] = useState(48);

  // Typewriter Loop
  const [twIndex, setTwIndex] = useState(0);
  const [twText, setTwText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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

  // Typewriter Effect
  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[twIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && twText.length < currentPhrase.length) {
      timeout = setTimeout(() => setTwText(currentPhrase.slice(0, twText.length + 1)), 50);
    } else if (!isDeleting && twText.length === currentPhrase.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && twText.length > 0) {
      timeout = setTimeout(() => setTwText(twText.slice(0, -1)), 25);
    } else if (isDeleting && twText.length === 0) {
      setIsDeleting(false);
      setTwIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
    }

    return () => clearTimeout(timeout);
  }, [twText, isDeleting, twIndex]);

  // Attendance Calculations
  const demoPercentage = demoTotal > 0 ? (demoAttended / demoTotal) * 100 : 0;
  const isSafe = demoPercentage >= 75;
  const bunksRemaining = isSafe ? Math.floor((demoAttended - 0.75 * demoTotal) / 0.75) : 0;
  const classesNeeded = !isSafe ? Math.ceil((0.75 * demoTotal - demoAttended) / 0.25) : 0;

  // Run Code in Sandbox
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

        toast.success("Account created successfully! Welcome to CampusLoop.");
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

  return (
    <div className="min-h-screen bg-[#F6F4EE] dark:bg-[#0E0E10] text-[#12141C] dark:text-[#F6F4EE] font-sans antialiased selection:bg-[#2F4BFF] selection:text-white transition-colors duration-200">
      
      {/* ── TOP STICKY CAMPUSLOOP NAVBAR ─────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#F6F4EE]/90 dark:bg-[#0E0E10]/90 backdrop-blur-md border-b border-[#E8E4DA] dark:border-neutral-800 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <CampusLoopLogo size={32} />
              <div className="flex flex-col">
                <div className="flex items-center gap-1 font-extrabold text-base leading-tight">
                  <span className="text-[#12141C] dark:text-white">Campus</span>
                  <span className="text-[#2F4BFF]">Loop</span>
                  <span className="text-[10px] font-mono uppercase bg-[#2F4BFF]/10 text-[#2F4BFF] dark:bg-blue-950/40 dark:text-blue-300 px-1.5 py-0.2 rounded-full ml-1">
                    PAN-INDIA
                  </span>
                </div>
                <span className="text-[10px] font-medium text-[#5A6072] dark:text-neutral-400">
                  Campus Community & Academic Suite
                </span>
              </div>
            </Link>

            {/* All-India University Selector Pill */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setIsUnivDropdownOpen(!isUnivDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] text-xs font-bold text-[#12141C] dark:text-white hover:border-[#2F4BFF]/50 shadow-2xs transition-all cursor-pointer"
              >
                <GraduationCap className="h-3.5 w-3.5 text-[#2F4BFF]" />
                <span className="truncate max-w-[150px] font-semibold">{selectedUniversity.shortName}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#E7EBFF] text-[#2F4BFF] dark:bg-blue-950/60 dark:text-blue-300 font-mono font-bold">
                  {selectedUniversity.status.toUpperCase()}
                </span>
                <ChevronDown className="h-3 w-3 text-[#5A6072]" />
              </button>

              {isUnivDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-80 rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 shadow-xl p-2.5 z-50 animate-scale-in">
                  <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#5A6072] dark:text-neutral-400 border-b border-[#E8E4DA] dark:border-neutral-800">
                    Select University Cohort
                  </div>
                  <div className="py-1 space-y-1">
                    {UNIVERSITIES.map((univ) => (
                      <button
                        key={univ.id}
                        type="button"
                        onClick={() => {
                          setSelectedUniversity(univ);
                          setIsUnivDropdownOpen(false);
                          toast.success(`Switched view to ${univ.name}`);
                        }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors flex items-center justify-between cursor-pointer ${
                          selectedUniversity.id === univ.id
                            ? "bg-[#E7EBFF] dark:bg-blue-950/40 font-bold text-[#2F4BFF]"
                            : "hover:bg-[#F6F4EE] dark:hover:bg-neutral-800 text-[#5A6072] dark:text-neutral-400 hover:text-[#12141C] dark:hover:text-white"
                        }`}
                      >
                        <div>
                          <div className="font-bold text-[#12141C] dark:text-white">{univ.name}</div>
                          <div className="text-[10px] text-[#5A6072] dark:text-neutral-400">{univ.location} • {univ.practicalsCount} Practicals</div>
                        </div>
                        {selectedUniversity.id === univ.id && <Check className="h-4 w-4 text-[#2F4BFF]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-[#5A6072] dark:text-neutral-400">
            <a href="#five-screens" className="hover:text-[#12141C] dark:hover:text-white transition-colors">Campus Features</a>
            <a href="#interactive-sandbox" className="hover:text-[#12141C] dark:hover:text-white transition-colors">Live Preview</a>
            <a href="#academic-suite" className="hover:text-[#12141C] dark:hover:text-white transition-colors">B.Tech & BCA Notes</a>
            <a href="#auth-portal-card" className="hover:text-[#12141C] dark:hover:text-white transition-colors">Sign In</a>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-5 py-2 rounded-full bg-[#12141C] text-white dark:bg-white dark:text-[#12141C] text-xs font-bold shadow-xs hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Go to Campus Hub</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(true);
                    document.getElementById("auth-portal-card")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-4 py-2 rounded-full text-xs font-bold text-[#5A6072] dark:text-neutral-300 hover:text-[#12141C] dark:hover:text-white transition-all cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    document.getElementById("auth-portal-card")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-2 rounded-full bg-[#2F4BFF] text-white text-xs font-bold hover:bg-[#1E3EDB] transition-all cursor-pointer shadow-xs flex items-center gap-1.5"
                >
                  <span>Create Account</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO SECTION: "CAMPUS INFORMATION IS SCATTERED" ──────────────── */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#E8E4DA] dark:border-neutral-800">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Live Campus Pulse Status Pill */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-[#1C1C1E] text-xs font-semibold border border-[#E8E4DA] dark:border-neutral-800 shadow-2xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D6F24B] opacity-90" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D6F24B]" />
              </span>
              <span className="text-[#12141C] dark:text-white font-bold">{selectedUniversity.name}</span>
              <span className="text-[#5A6072]">·</span>
              <span className="text-[#2F4BFF] font-bold text-[11px]">{selectedUniversity.badge}</span>
            </div>
            <span className="text-xs text-[#5A6072]">Over 12,000+ students across India connected</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E7EBFF] dark:bg-blue-950/40 text-[#2F4BFF] dark:text-blue-300 text-xs font-bold">
                <Sparkles className="h-3.5 w-3.5" />
                <span>One Loop. Five Screens. One Design System.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#12141C] dark:text-white leading-[1.08]">
                Campus information is scattered.<br />
                <span className="text-[#2F4BFF]">
                  CampusLoop closes the loop.
                </span>
              </h1>

              {/* Dynamic Typewriter Line */}
              <div className="text-sm sm:text-base font-mono font-medium text-[#5A6072] dark:text-neutral-400 flex items-center gap-2 justify-center lg:justify-start min-h-[2.5rem]">
                <span className="text-[#12141C] dark:text-white font-bold shrink-0">Included:</span>
                <span className="text-[#12141C] dark:text-white border-b-2 border-[#2F4BFF] pb-0.5 font-semibold">
                  {twText}
                  <span className="ml-0.5 inline-block w-0.5 h-4 bg-[#2F4BFF] animate-pulse" />
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#5A6072] dark:text-neutral-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                A mobile-first campus community application that gathers news, club announcements,
                placement talks, timetable updates, verified semester notes, and student conversations into
                one seamless, easy-to-use loop.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(false);
                    document.getElementById("auth-portal-card")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-7 py-3.5 rounded-full bg-[#12141C] text-white dark:bg-white dark:text-[#12141C] font-bold text-xs sm:text-sm shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Join CampusLoop Free</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    sessionStorage.setItem('itm_guest_mode', 'true');
                    navigate("/subjects");
                  }}
                  className="px-6 py-3.5 rounded-full border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] text-[#12141C] dark:text-white font-bold text-xs sm:text-sm hover:border-[#2F4BFF]/50 shadow-2xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="h-4 w-4 text-[#2F4BFF]" />
                  <span>Browse 51+ Course Syllabi →</span>
                </button>
              </div>

              {/* Four Verified Feature Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                {[
                  { val: "51+", label: "Academic Subjects" },
                  { val: "154+", label: "Coding Practicals" },
                  { val: "100%", label: "Syllabus Covered" },
                  { val: "0 ₹", label: "Free Forever" },
                ].map((item) => (
                  <div key={item.label} className="p-3.5 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 text-center shadow-2xs">
                    <div className="text-xl sm:text-2xl font-black font-mono text-[#12141C] dark:text-white">{item.val}</div>
                    <div className="text-[10px] text-[#5A6072] dark:text-neutral-400 uppercase font-bold tracking-wider mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Column: Campus Pulse & Live Mobile Frame */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[360px] rounded-[36px] bg-[#12141C] p-3 shadow-2xl border-4 border-neutral-900">
                <div className="rounded-[28px] bg-[#F6F4EE] dark:bg-[#0E0E10] overflow-hidden p-4 space-y-4">
                  {/* Top Bar inside Phone */}
                  <div className="flex items-center justify-between text-xs font-bold text-[#12141C] dark:text-white pt-1">
                    <div className="flex items-center gap-1.5">
                      <CampusLoopLogo size={20} />
                      <span className="font-extrabold text-sm">CampusLoop</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#D6F24B] text-[#12141C] text-[10px] font-extrabold">
                      LIVE
                    </span>
                  </div>

                  {/* Campus Pulse Strip */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#5A6072]">Campus Pulse</div>
                    <div className="rounded-[20px] bg-[#12141C] text-white p-3.5 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-[#D6F24B] font-bold">
                        <span>● LIVE · Central Library</span>
                        <span>78% full right now</span>
                      </div>
                      <div className="text-sm font-bold">Study Space Available</div>
                      <div className="text-[11px] text-neutral-400">Quiet study rooms open until 9:00 PM today</div>
                    </div>

                    <div className="rounded-[20px] bg-[#D6F24B] text-[#12141C] p-3.5 space-y-1">
                      <div className="text-[10px] font-extrabold uppercase">TODAY, 4:00 PM</div>
                      <div className="text-sm font-bold">Placement & Internship Talk</div>
                      <div className="text-[11px] font-semibold text-neutral-800">Seminar Hall 2 · Industry Readiness</div>
                    </div>
                  </div>

                  {/* Post Preview inside Phone */}
                  <div className="rounded-[20px] bg-white dark:bg-[#1C1C1E] p-3.5 border border-[#E8E4DA] dark:border-neutral-800 space-y-2 shadow-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#E7EBFF] text-[#2F4BFF] font-bold text-xs flex items-center justify-center">
                        DS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#12141C] dark:text-white">Diya Shah</div>
                        <div className="text-[10px] text-[#5A6072]">Design Club · 2h ago</div>
                      </div>
                    </div>
                    <p className="text-xs text-[#12141C] dark:text-neutral-200 leading-snug">
                      Portfolio review night this Friday! Bring one project and get live senior feedback. 30 seats.
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#5A6072] pt-1 border-t border-[#EFECE6] dark:border-neutral-800">
                      <span className="flex items-center gap-1 font-bold text-[#2F4BFF]">
                        <Heart className="w-3.5 h-3.5 fill-[#2F4BFF]" /> 84
                      </span>
                      <span>12 replies</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#2F4BFF] text-white text-[10px] font-bold">RSVP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE FIVE CORE SCREENS SHOWCASE (DIRECTLY FROM THE PDF) ────────── */}
      <section id="five-screens" className="py-20 border-b border-[#E8E4DA] dark:border-neutral-800 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7EBFF] text-[#2F4BFF] text-xs font-bold">
            08 · Screens of the User Interface
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#12141C] dark:text-white">
            One Loop. Five Connected Screens.
          </h2>
          <p className="text-sm text-[#5A6072] dark:text-neutral-400">
            Every screen shares the same warm canvas, Plus Jakarta Sans typography, 22-24px rounded radius, and clean token palette.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              num: "8.1",
              title: "Home Feed & Campus Pulse",
              desc: "Multi-campus feed tabs (All Campuses, My Campus, Following, My Clubs) topped by live updates like library occupancy and placement briefings.",
              tag: "Pulse First",
              color: "border-[#2F4BFF]/40",
            },
            {
              num: "8.2",
              title: "Explore Campus & Clubs",
              desc: "Campus search field, category chips (Clubs, Events, Study, Sports), trending hashtags (#HackNight), and one-tap event RSVPs.",
              tag: "Easy Discovery",
              color: "border-purple-500/40",
            },
            {
              num: "8.3",
              title: "Create Post & Reach Preview",
              desc: "Focused composer with live character counter (105 / 280), image uploads, audience targeting, and reach preview estimates.",
              tag: "Post in Seconds",
              color: "border-rose-500/40",
            },
            {
              num: "8.4",
              title: "Clean Inbox & Requests",
              desc: "Direct and group chats, study squad channels, filter chips (All, Unread, Clubs, Groups), and message requests.",
              tag: "Clean Inbox",
              color: "border-emerald-500/40",
            },
            {
              num: "8.5",
              title: "Student Profile & Badges",
              desc: "Verified identity, lime-ringed avatar, student bio, club memberships, earned academic badges, and saved note collections.",
              tag: "Your Identity",
              color: "border-cyan-500/40",
            },
            {
              num: "8.6",
              title: "Academic Suite & IDE",
              desc: "51+ verified semester subjects for B.Tech & BCA across India, LeetCode Coding Lab, and real-time attendance radar.",
              tag: "Academic Suite",
              color: "border-[#D6F24B]",
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-[24px] bg-white dark:bg-[#1C1C1E] border p-6 shadow-xs space-y-3 ${card.color}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#5A6072]">{card.num}</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#F6F4EE] dark:bg-neutral-800 text-[#12141C] dark:text-neutral-200">
                  {card.tag}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#12141C] dark:text-white">{card.title}</h3>
              <p className="text-xs sm:text-sm text-[#5A6072] dark:text-neutral-400 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE LIVE SANDBOX PREVIEW ─────────────────────────────── */}
      <section id="interactive-sandbox" className="py-20 border-b border-[#E8E4DA] dark:border-neutral-800 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6F24B] text-[#12141C] text-xs font-extrabold">
            Interactive Test Drive
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#12141C] dark:text-white">
            Experience CampusLoop Right Now
          </h2>
          <p className="text-sm text-[#5A6072] dark:text-neutral-400">
            No account required to test our multi-campus feed, coding IDE, and attendance radar.
          </p>
        </div>

        {/* Sandbox Tabs */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {[
            { id: 'feed', label: 'Multi-Campus Feed', icon: MessageCircle },
            { id: 'code', label: 'Coding Lab (IDE)', icon: Terminal },
            { id: 'attendance', label: '75% Attendance Radar', icon: Calculator },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = sandboxTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSandboxTab(tab.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer border ${
                  isActive
                    ? "bg-[#2F4BFF] text-white border-[#2F4BFF] shadow-xs"
                    : "bg-white dark:bg-[#1C1C1E] text-[#5A6072] dark:text-neutral-300 border-[#E8E4DA] dark:border-neutral-800 hover:text-[#12141C] dark:hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Multi-Campus Feed Interactive Preview */}
        {sandboxTab === 'feed' && (
          <div className="max-w-2xl mx-auto rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFECE6] dark:border-neutral-800 pb-3">
              <div className="flex items-center gap-3">
                <CampusAvatar name="Diya Shah" size={40} />
                <div>
                  <h4 className="font-bold text-sm text-[#12141C] dark:text-white">Diya Shah</h4>
                  <p className="text-[11px] text-[#5A6072]">Design Club · ITM SLS Baroda · 2h ago</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#E7EBFF] text-[#2F4BFF]">
                Projects & Tech
              </span>
            </div>

            <p className="text-sm text-[#12141C] dark:text-neutral-200 leading-relaxed">
              Portfolio review night this Friday at Innovation Lab! Bring one project and get live design feedback from three graduating seniors. 30 seats available.
            </p>

            <div className="pt-3 border-t border-[#EFECE6] dark:border-neutral-800 flex items-center justify-between text-xs font-bold text-[#5A6072]">
              <button
                type="button"
                onClick={() => {
                  setFeedLiked(!feedLiked);
                  setFeedLikeCount((prev) => prev + (feedLiked ? -1 : 1));
                  toast.success(feedLiked ? "Unliked post" : "Liked post! (+5 XP)");
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors cursor-pointer ${
                  feedLiked ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40" : "hover:bg-[#F6F4EE]"
                }`}
              >
                <Heart className={`w-4 h-4 ${feedLiked ? "fill-rose-600 text-rose-600" : ""}`} />
                <span>{feedLikeCount} Likes</span>
              </button>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" /> 12 Comments
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Post link copied to clipboard!");
                }}
                className="flex items-center gap-1 hover:text-[#2F4BFF] cursor-pointer"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: LeetCode Coding Lab Sandbox */}
        {sandboxTab === 'code' && (
          <div className="max-w-3xl mx-auto rounded-[24px] bg-[#12141C] text-white p-5 sm:p-6 shadow-xl border border-neutral-800 space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-mono text-xs text-neutral-400 ml-2">CircularQueueSimulation.{demoLang}</span>
              </div>
              <div className="flex items-center gap-2">
                {(['java', 'c', 'python', 'sql'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setDemoLang(lang);
                      setDemoCodeOutput(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
                      demoLang === lang ? "bg-[#2F4BFF] text-white" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleRunDemoCode}
                  disabled={demoCodeRunning}
                  className="px-4 py-1.5 rounded-full bg-[#D6F24B] text-[#12141C] text-xs font-extrabold flex items-center gap-1.5 hover:bg-[#C6E84A] transition-all cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-[#12141C]" />
                  <span>{demoCodeRunning ? "Running..." : "Run (Ctrl+Enter)"}</span>
                </button>
              </div>
            </div>

            <div className="bg-[#18181B] rounded-xl p-4 font-mono text-xs sm:text-sm text-neutral-300 overflow-x-auto leading-relaxed">
              {demoLang === 'java' && (
                <pre>{`// BCA & B.Tech Practical: Circular Queue Ticket Allocation
public class CircularQueue {
    private int[] queue = new int[6];
    private int front = 0, rear = 0, count = 0;

    public boolean enqueue(int passengerToken) {
        if (count == queue.length) return false; // Overflow
        queue[rear] = passengerToken;
        rear = (rear + 1) % queue.length;
        count++;
        return true;
    }
}`}</pre>
              )}
              {demoLang === 'c' && (
                <pre>{`#include <stdio.h>
#define SIZE 6

int queue[SIZE], front = -1, rear = -1;

void enqueue(int token) {
    if ((front == 0 && rear == SIZE - 1) || (rear == (front - 1) % (SIZE - 1))) {
        printf("Queue Overflow\\n");
        return;
    }
    // Circular increment
    rear = (rear + 1) % SIZE;
    queue[rear] = token;
}`}</pre>
              )}
              {demoLang === 'python' && (
                <pre>{`# Numerical Methods: Newton-Raphson Root Finding
def f(x): return x**3 - 2*x - 5
def df(x): return 3*x**2 - 2

x0 = 2.0
for iteration in range(5):
    x1 = x0 - f(x0)/df(x0)
    print(f"Iter {iteration+1}: x = {x1:.4f}")
    if abs(x1 - x0) < 1e-4: break
    x0 = x1`}</pre>
              )}
              {demoLang === 'sql' && (
                <pre>{`-- University Placement Eligibility Query
SELECT student_id, name, branch, sgpa, attendance_pct 
FROM campus_students 
WHERE sgpa >= 8.5 AND attendance_pct >= 75.0
ORDER BY sgpa DESC;`}</pre>
              )}
            </div>

            {demoCodeOutput && (
              <div className="p-3.5 rounded-xl bg-black/60 border border-emerald-500/30 text-emerald-400 font-mono text-xs space-y-1">
                <div className="text-[10px] text-neutral-400 uppercase font-bold">Terminal Output:</div>
                <div className="whitespace-pre-wrap">{demoCodeOutput}</div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Attendance Radar Interactive Simulator */}
        {sandboxTab === 'attendance' && (
          <div className="max-w-xl mx-auto rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#12141C] dark:text-white">75% Attendance & Bunk Radar</h3>
                <p className="text-xs text-[#5A6072]">Drag the sliders to see your safe bunk cushion</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                isSafe ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
              }`}>
                {demoPercentage.toFixed(1)}% {isSafe ? "SAFE" : "DETAINED RISK"}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#12141C] dark:text-white mb-1">
                  <span>Attended Lectures: {demoAttended}</span>
                  <span>Total Lectures: {demoTotal}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={demoTotal}
                  value={demoAttended}
                  onChange={(e) => setDemoAttended(Number(e.target.value))}
                  className="w-full accent-[#2F4BFF] cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-2xl bg-[#F6F4EE] dark:bg-neutral-800/60 border border-[#E8E4DA] dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#5A6072]">Calculation Status:</div>
                  <div className="text-lg font-black text-[#12141C] dark:text-white mt-0.5">
                    {isSafe
                      ? `You can safely bunk ${bunksRemaining} more lectures`
                      : `Must attend ${classesNeeded} consecutive lectures`}
                  </div>
                </div>
                <Calculator className={`w-8 h-8 ${isSafe ? "text-emerald-600" : "text-rose-600"}`} />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ── ACADEMIC SUITE: B.TECH & BCA DIRECTORY PREVIEW ───────────────── */}
      <section id="academic-suite" className="py-20 border-b border-[#E8E4DA] dark:border-neutral-800 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7EBFF] text-[#2F4BFF] text-xs font-bold">
            Curriculum Registry · 51+ Complete Subjects
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#12141C] dark:text-white">
            Engineering & BCA Academic Suite
          </h2>
          <p className="text-sm text-[#5A6072] dark:text-neutral-400">
            Handwritten notes, KaTeX proofs, runnable code examples, and solved 10-year question banks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* B.Tech Column */}
          <div className="rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6] dark:border-neutral-800">
              <div>
                <h3 className="font-extrabold text-lg text-[#12141C] dark:text-white">B.Tech Engineering Suite</h3>
                <p className="text-xs text-[#5A6072]">21 Core Semester Subjects Mapped</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#E7EBFF] text-[#2F4BFF] text-xs font-bold">
                Semesters 1 - 5
              </span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                "Operating Systems (OS401) — Dual Mode, CPU Scheduling, Banker's Algorithm",
                "Computer Networks (CN402) — OSI vs TCP/IP, CRC-32, CIDR Subnetting",
                "Design & Analysis of Algorithms (DAA403) — Master Theorem, DP, Greedy",
                "Artificial Intelligence & ML (AIML502) — A* Search, Minimax, Neural Nets",
                "Software Engineering & Agile (SE501) — Scrum Sprints, Cyclomatic Complexity",
                "Theory of Computation (TOC503) — DFA/NFA, Pumping Lemma, Turing Machines",
                "Object Oriented Programming Java (CS301) — JVM, Bytecode, Interfaces, Multithreading",
                "Database Management Systems (CS303) — Relational Algebra, BCNF, ACID"
              ].map((subj) => (
                <div key={subj} className="flex items-start gap-2 p-2 rounded-xl bg-[#F6F4EE] dark:bg-neutral-800/40">
                  <CheckCircle className="w-4 h-4 text-[#2F4BFF] shrink-0 mt-0.5" />
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{subj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BCA Column */}
          <div className="rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6] dark:border-neutral-800">
              <div>
                <h3 className="font-extrabold text-lg text-[#12141C] dark:text-white">BCA Computer Applications</h3>
                <p className="text-xs text-[#5A6072]">30 Complete Semester Subjects</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#D6F24B] text-[#12141C] text-xs font-extrabold">
                Semesters 1 - 6
              </span>
            </div>
            <div className="space-y-2 text-xs">
              {[
                "BCA101: Fundamentals of Computers & Von Neumann Architecture",
                "BCA102: Problem Solving with C & Pointer Arithmetic",
                "BCA201: Data Structures using C (Linked Lists, BST, Queues)",
                "BCA203: Web Technologies (Semantic HTML5, CSS3 Grid, ES6 JS)",
                "BCA301: Object Oriented Programming with C++ & STL",
                "BCA401: Core Java Programming & JDBC Database Connectivity",
                "BCA501: Server-Side Web Development with PHP & MySQL",
                "BCA604: Full Stack MERN Development (React, Node, Express, MongoDB)"
              ].map((subj) => (
                <div key={subj} className="flex items-start gap-2 p-2 rounded-xl bg-[#F6F4EE] dark:bg-neutral-800/40">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">{subj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AUTHENTICATION PORTAL CARD ──────────────────────────────────── */}
      <section id="auth-portal-card" className="py-20 max-w-xl mx-auto px-4 sm:px-6">
        <div className="rounded-[28px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-7 sm:p-9 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#E7EBFF] text-[#2F4BFF] flex items-center justify-center mx-auto mb-3">
              <CampusLoopLogo size={28} />
            </div>
            <h3 className="text-2xl font-black text-[#12141C] dark:text-white">
              {isLogin ? "Sign In to CampusLoop" : "Create Your Student Account"}
            </h3>
            <p className="text-xs text-[#5A6072] dark:text-neutral-400">
              {isLogin
                ? "Enter your credentials to access your campus feed, notes, and code lab."
                : "Join thousands of technical students across India. 100% free forever."}
            </p>
          </div>

          {/* Toggle Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-full bg-[#F6F4EE] dark:bg-neutral-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`py-2 rounded-full transition-all cursor-pointer ${
                isLogin
                  ? "bg-white dark:bg-[#1C1C1E] text-[#12141C] dark:text-white shadow-xs"
                  : "text-[#5A6072] hover:text-[#12141C] dark:hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`py-2 rounded-full transition-all cursor-pointer ${
                !isLogin
                  ? "bg-white dark:bg-[#1C1C1E] text-[#12141C] dark:text-white shadow-xs"
                  : "text-[#5A6072] hover:text-[#12141C] dark:hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4 text-xs">
            {!isLogin && (
              <div>
                <label className="block font-bold text-[#12141C] dark:text-white mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Maher Bhatt"
                  className="w-full h-11 px-4 rounded-xl border border-[#E8E4DA] dark:border-neutral-800 bg-[#F6F4EE] dark:bg-neutral-900 text-xs font-medium text-[#12141C] dark:text-white placeholder-[#5A6072] outline-none focus:border-[#2F4BFF]"
                />
              </div>
            )}

            <div>
              <label className="block font-bold text-[#12141C] dark:text-white mb-1.5">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu.in or personal email"
                className="w-full h-11 px-4 rounded-xl border border-[#E8E4DA] dark:border-neutral-800 bg-[#F6F4EE] dark:bg-neutral-900 text-xs font-medium text-[#12141C] dark:text-white placeholder-[#5A6072] outline-none focus:border-[#2F4BFF]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-bold text-[#12141C] dark:text-white">Password</label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-[11px] font-bold text-[#2F4BFF] hover:underline cursor-pointer"
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
                  placeholder="••••••••••••"
                  className="w-full h-11 px-4 pr-10 rounded-xl border border-[#E8E4DA] dark:border-neutral-800 bg-[#F6F4EE] dark:bg-neutral-900 text-xs font-medium text-[#12141C] dark:text-white placeholder-[#5A6072] outline-none focus:border-[#2F4BFF]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A6072] hover:text-[#12141C] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full bg-[#2F4BFF] text-white font-bold text-sm hover:bg-[#1E3EDB] transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>{isLogin ? "Sign In to CampusLoop" : "Create Free Account"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Guest Access Alternative */}
          <div className="pt-2 text-center border-t border-[#EFECE6] dark:border-neutral-800">
            <button
              type="button"
              onClick={() => {
                sessionStorage.setItem('itm_guest_mode', 'true');
                navigate("/dashboard");
              }}
              className="text-xs font-bold text-[#5A6072] hover:text-[#2F4BFF] transition-colors cursor-pointer"
            >
              Continue as Guest (Read-Only Preview) →
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-12 border-t border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] px-4 sm:px-8 text-xs text-[#5A6072]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-[#12141C] dark:text-white">
            <CampusLoopLogo size={20} />
            <span>CampusLoop</span>
            <span className="font-normal text-[#5A6072]">· Multi-University Academic Platform</span>
          </div>
          <div>
            Designed by <span className="font-bold text-[#12141C] dark:text-white">Maher Bhatt</span> (Enrollment No. 25C21007)
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <Link to="/subjects" className="hover:text-[#2F4BFF]">Subjects</Link>
            <Link to="/coding-lab" className="hover:text-[#2F4BFF]">Coding Lab</Link>
            <Link to="/calculator" className="hover:text-[#2F4BFF]">Calculator</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
