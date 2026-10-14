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
  GraduationCap,
  Building2
} from "lucide-react";
import { ItmMoocsLogo } from "@/components/brand/ItmMoocsLogo";

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

        toast.success("Welcome back! Signing into ITM MOOCs...");
        
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

        toast.success("Account created successfully! Welcome to ITM MOOCs.");
        navigate("/onboarding", { replace: true });
      }
    } catch (err: any) {
      toast.error(err?.message || "Authentication error. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  // 75% Attendance calculation
  const demoPercentage = demoTotalClasses > 0 ? (demoAttendedClasses / demoTotalClasses) * 100 : 0;
  const isDemoSafe = demoPercentage >= 75;
  const safeBunks = isDemoSafe ? Math.floor((demoAttendedClasses - 0.75 * demoTotalClasses) / 0.75) : 0;
  const neededClasses = !isDemoSafe ? Math.ceil((0.75 * demoTotalClasses - demoAttendedClasses) / 0.25) : 0;

  return (
    <div className="min-h-screen bg-[#F5F1E8] dark:bg-[#12221E] text-[#202522] dark:text-[#F5F1E8] selection:bg-[#D6E85D] selection:text-[#183F36] font-sans antialiased">
      {/* ── TOP MARKETING NAVBAR ── */}
      <header className="sticky top-0 z-50 bg-[#FFFEFA]/90 dark:bg-[#182E29]/90 backdrop-blur-md border-b border-[#E0E2D9] dark:border-[#264941] px-4 sm:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <ItmMoocsLogo variant="live" size="md" showTagline={true} />
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#68716B] dark:text-[#A2BAAF] font-display">
            <a href="#features" className="hover:text-[#183F36] dark:hover:text-[#D6E85D] transition-colors">Pillars</a>
            <a href="#universities" className="hover:text-[#183F36] dark:hover:text-[#D6E85D] transition-colors">Universities</a>
            <a href="#coding-lab" className="hover:text-[#183F36] dark:hover:text-[#D6E85D] transition-colors">Coding Lab</a>
            <a href="#attendance" className="hover:text-[#183F36] dark:hover:text-[#D6E85D] transition-colors">75% Safeguard</a>
            <a href="#faq" className="hover:text-[#183F36] dark:hover:text-[#D6E85D] transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const el = document.getElementById("auth-portal-card");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#183F36] hover:bg-[#12332C] text-white text-xs font-bold shadow-md shadow-[#183F36]/20 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-2 font-display"
            >
              <span>Student Sign In</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#D6E85D]" />
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO MARKETING SECTION WITH EMBEDDED AUTH CARD ── */}
      <section className="relative overflow-hidden py-12 lg:py-20 border-b border-[#E0E2D9] dark:border-[#264941]">
        {/* Subtle Brand Background Accents */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D6E85D]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-[#183F36]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Pitch (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8EDE4] dark:bg-[#1D3B34] border border-[#E0E2D9] dark:border-[#264941] text-[#183F36] dark:text-[#D6E85D] text-xs font-bold font-display">
                <Sparkles className="h-3.5 w-3.5 text-[#D6E85D]" />
                <span>Multi-University Learning Hub · Learn Beyond Borders</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#183F36] dark:text-[#F5F1E8] leading-[1.1] font-display">
                Master Your Semester Exams. <br />
                <span className="text-[#315B4F] dark:text-[#D6E85D]">
                  Quietly Confident. Truly Complete.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#68716B] dark:text-[#A2BAAF] max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Say goodbye to scattered WhatsApp PDFs and broken code files. ITM MOOCs equips you with verified university syllabus notes, interactive practical coding labs (DSA in C & Java), past exam question banks with step-by-step marking schemes, and the 75% attendance safeguard calculator.
              </p>

              {/* High Impact Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-[#FFFEFA] dark:bg-[#182E29] border border-[#E0E2D9] dark:border-[#264941] text-center shadow-xs">
                  <div className="text-2xl font-black font-mono text-[#183F36] dark:text-[#D6E85D]">100%</div>
                  <div className="text-[10px] text-[#68716B] dark:text-[#A2BAAF] font-bold uppercase tracking-wider mt-0.5">Syllabus Mapped</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFEFA] dark:bg-[#182E29] border border-[#E0E2D9] dark:border-[#264941] text-center shadow-xs">
                  <div className="text-2xl font-black font-mono text-[#267653] dark:text-[#D6E85D]">150+</div>
                  <div className="text-[10px] text-[#68716B] dark:text-[#A2BAAF] font-bold uppercase tracking-wider mt-0.5">Coding Practicals</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFEFA] dark:bg-[#182E29] border border-[#E0E2D9] dark:border-[#264941] text-center shadow-xs">
                  <div className="text-2xl font-black font-mono text-[#183F36] dark:text-[#D6E85D]">480+</div>
                  <div className="text-[10px] text-[#68716B] dark:text-[#A2BAAF] font-bold uppercase tracking-wider mt-0.5">Practice MCQs</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFEFA] dark:bg-[#182E29] border border-[#E0E2D9] dark:border-[#264941] text-center shadow-xs">
                  <div className="text-2xl font-black font-mono text-[#A66A1D] dark:text-[#D6E85D]">75%</div>
                  <div className="text-[10px] text-[#68716B] dark:text-[#A2BAAF] font-bold uppercase tracking-wider mt-0.5">Attendance Guard</div>
                </div>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs text-[#68716B] dark:text-[#A2BAAF]">
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#267653] dark:text-[#D6E85D]" /> Open to all engineering students</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#267653] dark:text-[#D6E85D]" /> C & Java Compiler</span>
                <span className="flex items-center gap-1.5"><Check className="h-4 w-4 text-[#267653] dark:text-[#D6E85D]" /> MST-1 & MST-2 Question Banks</span>
              </div>
            </div>

            {/* Right Modern Paper Auth Card (lg:col-span-5) */}
            <div id="auth-portal-card" className="lg:col-span-5">
              <div className="bg-[#FFFEFA] dark:bg-[#182E29] border border-[#E0E2D9] dark:border-[#264941] rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D6E85D]/10 rounded-full blur-2xl pointer-events-none" />

                {/* Redirect notice if student was routed here from a protected page */}
                {fromState && (
                  <div className="mb-5 p-3 rounded-xl bg-[#E8EDE4] dark:bg-[#1D3B34] border border-[#E0E2D9] dark:border-[#264941] text-xs text-[#183F36] dark:text-[#D6E85D] font-medium flex items-center gap-2">
                    <Lock className="h-4 w-4 text-[#183F36] dark:text-[#D6E85D] shrink-0" />
                    <span>
                      <strong className="text-[#183F36] dark:text-[#F5F1E8]">Student Login Required:</strong> Sign in below to access {getFeatureName((fromState as any)?.pathname)}.
                    </span>
                  </div>
                )}

                {/* Auth Mode Toggle Tabs */}
                <div className="flex p-1 rounded-2xl bg-[#F5F1E8] dark:bg-[#12221E] border border-[#E0E2D9] dark:border-[#264941] mb-6 font-display">
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isLogin
                        ? "bg-[#183F36] text-white shadow-sm"
                        : "text-[#68716B] dark:text-[#A2BAAF] hover:text-[#183F36] dark:hover:text-[#F5F1E8]"
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      !isLogin
                        ? "bg-[#183F36] text-white shadow-sm"
                        : "text-[#68716B] dark:text-[#A2BAAF] hover:text-[#183F36] dark:hover:text-[#F5F1E8]"
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* Header text */}
                <div className="mb-5 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#183F36] dark:text-[#F5F1E8] tracking-tight font-display">
                    {isLogin ? "Welcome to ITM MOOCs" : "Join the Learning Hub"}
                  </h3>
                  <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] mt-1">
                    {isLogin
                      ? "Access your courses, practical codes, and exam models."
                      : "Create your student passport. Access verified semester resources."}
                  </p>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleAuth} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <label className="block text-xs font-semibold text-[#202522] dark:text-[#E8EDE4] mb-1.5">
                        Full Name
                      </label>
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
                    <label className="block text-xs font-semibold text-[#202522] dark:text-[#E8EDE4] mb-1.5">
                      Student Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@itmbu.ac.in or personal email"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E8] dark:bg-[#12221E] border border-[#E0E2D9] dark:border-[#264941] text-[#202522] dark:text-[#F5F1E8] text-xs placeholder:text-[#68716B]/60 focus:outline-none focus:ring-2 focus:ring-[#D6E85D]"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-semibold text-[#202522] dark:text-[#E8EDE4]">
                        Password
                      </label>
                      {isLogin && (
                        <button
                          type="button"
                          onClick={() => toast.info("Password reset available via Supabase email link.")}
                          className="text-[11px] text-[#68716B] hover:text-[#183F36] dark:hover:text-[#D6E85D]"
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
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E8] dark:bg-[#12221E] border border-[#E0E2D9] dark:border-[#264941] text-[#202522] dark:text-[#F5F1E8] text-xs placeholder:text-[#68716B]/60 focus:outline-none focus:ring-2 focus:ring-[#D6E85D] pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68716B] hover:text-[#202522] p-1"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-[#183F36] hover:bg-[#12332C] text-white text-xs font-bold shadow-md shadow-[#183F36]/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 font-display mt-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-[#D6E85D]" />
                        <span>Verifying credentials...</span>
                      </>
                    ) : (
                      <>
                        <span>{isLogin ? "Sign In to Learning Hub" : "Create My Student Account"}</span>
                        <ArrowRight className="h-4 w-4 text-[#D6E85D]" />
                      </>
                    )}
                  </button>
                </form>

                {/* Footer security note */}
                <div className="mt-5 pt-4 border-t border-[#E0E2D9] dark:border-[#264941] flex items-center justify-between text-[11px] text-[#68716B] dark:text-[#A2BAAF]">
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-[#267653] dark:text-[#D6E85D]" />
                    256-bit Encrypted
                  </span>
                  <span>Free & Open Source</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MULTI-UNIVERSITY NETWORK SHOWCASE ── */}
      <section id="universities" className="py-16 bg-[#FFFEFA] dark:bg-[#182E29] border-b border-[#E0E2D9] dark:border-[#264941]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#68716B] dark:text-[#D6E85D] block mb-2 font-display">
              Multi-University Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#183F36] dark:text-[#F5F1E8] tracking-tight font-display">
              Learn Beyond Borders Across Institutions
            </h2>
            <p className="text-xs sm:text-sm text-[#68716B] dark:text-[#A2BAAF] mt-2">
              ITM MOOCs supports curriculum mapping and resource sharing across universities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#F5F1E8] dark:bg-[#12221E] border border-[#E0E2D9] dark:border-[#264941] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#183F36] text-[#D6E85D] flex items-center justify-center font-bold">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#267653] dark:text-[#D6E85D] tracking-wider">
                  Active & Primary
                </span>
                <h3 className="font-bold text-base text-[#183F36] dark:text-[#F5F1E8] font-display">
                  ITM (SLS) Baroda University
                </h3>
                <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] mt-1">
                  100% verified B.Tech CSE & BCA semester notes, lab practicals, past MST exam question banks, and CET syllabi.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-[11px] font-semibold text-[#183F36] dark:text-[#D6E85D]">
                <CheckCircle2 className="h-4 w-4" /> 16 Modules · 4 Semesters Active
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5F1E8] dark:bg-[#12221E] border border-[#E0E2D9] dark:border-[#264941] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#224E43] text-white flex items-center justify-center font-bold">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#A66A1D] dark:text-[#D6E85D] tracking-wider">
                  Syllabus Mapped
                </span>
                <h3 className="font-bold text-base text-[#183F36] dark:text-[#F5F1E8] font-display">
                  Gujarat Technological University
                </h3>
                <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] mt-1">
                  Cross-compatible engineering mathematics, DSA in C/C++, database systems, and computer architecture notes.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-[11px] font-semibold text-[#68716B] dark:text-[#A2BAAF]">
                <Layers className="h-4 w-4" /> Common Core Units Mapped
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#F5F1E8] dark:bg-[#12221E] border border-[#E0E2D9] dark:border-[#264941] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#315B4F] text-white flex items-center justify-center font-bold">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#68716B] dark:text-[#A2BAAF] tracking-wider">
                  Resource Repository
                </span>
                <h3 className="font-bold text-base text-[#183F36] dark:text-[#F5F1E8] font-display">
                  National University Hub
                </h3>
                <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] mt-1">
                  Standardized university coding labs, competitive algorithms, test cases, and academic planning calculators.
                </p>
              </div>
              <div className="pt-2 flex items-center gap-2 text-[11px] font-semibold text-[#68716B] dark:text-[#A2BAAF]">
                <Sparkles className="h-4 w-4 text-[#D6E85D]" /> Open to all university learners
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6 CORE VALUE PILLARS ── */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#68716B] dark:text-[#D6E85D] block mb-2 font-display">
            The Learning System
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#183F36] dark:text-[#F5F1E8] tracking-tight font-display">
            Engineered For Calm, High-Performance Study
          </h2>
          <p className="text-xs sm:text-sm text-[#68716B] dark:text-[#A2BAAF] mt-2">
            Every feature is purposefully designed around actual university requirements—from attendance criteria to exam algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#182E29] border border-[#E0E2D9] dark:border-[#264941] space-y-4 hover:border-[#183F36] dark:hover:border-[#D6E85D] transition-colors shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] dark:bg-[#1D3B34] text-[#183F36] dark:text-[#D6E85D] flex items-center justify-center">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-[#183F36] dark:text-[#F5F1E8] font-display">
              Distraction-Free Course Reader
            </h3>
            <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] leading-relaxed">
              Markdown-rendered syllabus topics with KaTeX math rendering, syntax-highlighted code blocks, auto table-of-contents, and dark mode reading.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#182E29] border border-[#E0E2D9] dark:border-[#264941] space-y-4 hover:border-[#183F36] dark:hover:border-[#D6E85D] transition-colors shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] dark:bg-[#1D3B34] text-[#267653] dark:text-[#D6E85D] flex items-center justify-center">
              <Code2 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-[#183F36] dark:text-[#F5F1E8] font-display">
              Practical Coding Lab (C & Java)
            </h3>
            <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] leading-relaxed">
              Toggle between C99 pointers and Java OOP implementations for every practical. Includes simulated terminal with stdin, test cases, and time complexity.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#182E29] border border-[#E0E2D9] dark:border-[#264941] space-y-4 hover:border-[#183F36] dark:hover:border-[#D6E85D] transition-colors shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] dark:bg-[#1D3B34] text-[#A66A1D] dark:text-[#D6E85D] flex items-center justify-center">
              <Calculator className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-[#183F36] dark:text-[#F5F1E8] font-display">
              75% Attendance Guard
            </h3>
            <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] leading-relaxed">
              Real-time buffer calculation telling you exactly how many lectures you can safely miss, or how many consecutive classes you must attend to avoid exam debarment.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#182E29] border border-[#E0E2D9] dark:border-[#264941] space-y-4 hover:border-[#183F36] dark:hover:border-[#D6E85D] transition-colors shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] dark:bg-[#1D3B34] text-[#183F36] dark:text-[#D6E85D] flex items-center justify-center">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-[#183F36] dark:text-[#F5F1E8] font-display">
              Past Exam Question Banks
            </h3>
            <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] leading-relaxed">
              Complete archives of previous MST-1, MST-2, and final examination questions tagged with 3-mark short answers, 5-mark long explanations, and marking criteria.
            </p>
          </div>

          {/* Card 5 */}
          <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#182E29] border border-[#E0E2D9] dark:border-[#264941] space-y-4 hover:border-[#183F36] dark:hover:border-[#D6E85D] transition-colors shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] dark:bg-[#1D3B34] text-[#267653] dark:text-[#D6E85D] flex items-center justify-center">
              <Award className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-[#183F36] dark:text-[#F5F1E8] font-display">
              Practice Quizzes & Gauges
            </h3>
            <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] leading-relaxed">
              Subject-wise MCQs matching university CET formats. Interactive progress gauges track your topic accuracy and average time per question with detailed explanations.
            </p>
          </div>

          {/* Card 6 */}
          <div className="p-6 rounded-2xl bg-[#FFFEFA] dark:bg-[#182E29] border border-[#E0E2D9] dark:border-[#264941] space-y-4 hover:border-[#183F36] dark:hover:border-[#D6E85D] transition-colors shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E8EDE4] dark:bg-[#1D3B34] text-[#183F36] dark:text-[#D6E85D] flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-[#183F36] dark:text-[#F5F1E8] font-display">
              Campus Pulse & Social
            </h3>
            <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] leading-relaxed">
              Real-time student discussions, anonymous campus confessions, study group formation, and exam prep tips directly connected to Supabase real-time backend.
            </p>
          </div>
        </div>
      </section>

      {/* ── LIVE INTERACTIVE ATTENDANCE DEMO ── */}
      <section id="attendance" className="py-16 bg-[#FFFEFA] dark:bg-[#182E29] border-y border-[#E0E2D9] dark:border-[#264941]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-5 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#A66A1D] dark:text-[#D6E85D] font-display">
                Try the Calculator
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#183F36] dark:text-[#F5F1E8] tracking-tight font-display">
                Will you be allowed to sit for the Semester Exam?
              </h2>
              <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] leading-relaxed">
                Test our 75% attendance criteria algorithm right now. Drag the sliders to see how your buffer is calculated automatically.
              </p>
            </div>

            <div className="md:col-span-7 bg-[#F5F1E8] dark:bg-[#12221E] p-6 rounded-3xl border border-[#E0E2D9] dark:border-[#264941] space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-[#202522] dark:text-[#E8EDE4]">
                  <span>Total Classes Delivered</span>
                  <span className="font-mono text-[#183F36] dark:text-[#D6E85D] font-bold">{demoTotalClasses} lectures</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  value={demoTotalClasses}
                  onChange={(e) => {
                    const total = Number(e.target.value);
                    setDemoTotalClasses(total);
                    if (demoAttendedClasses > total) setDemoAttendedClasses(total);
                  }}
                  className="w-full accent-[#183F36] dark:accent-[#D6E85D]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1 text-[#202522] dark:text-[#E8EDE4]">
                  <span>Classes You Attended</span>
                  <span className="font-mono text-[#183F36] dark:text-[#D6E85D] font-bold">{demoAttendedClasses} lectures</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={demoTotalClasses}
                  value={demoAttendedClasses}
                  onChange={(e) => setDemoAttendedClasses(Number(e.target.value))}
                  className="w-full accent-[#183F36] dark:accent-[#D6E85D]"
                />
              </div>

              {/* Status Output Box */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                isDemoSafe
                  ? "bg-[#E8EDE4] dark:bg-[#183F36]/40 border-[#183F36]/30 text-[#183F36] dark:text-[#D6E85D]"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-400"
              }`}>
                <div>
                  <div className="text-xl font-black font-mono">
                    {demoPercentage.toFixed(1)}%
                  </div>
                  <div className="text-xs font-semibold mt-0.5">
                    {isDemoSafe ? "✅ Exam Hall Ticket Guaranteed" : "⚠️ Exam Debarment Risk"}
                  </div>
                </div>

                <div className="text-right text-xs">
                  {isDemoSafe ? (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#68716B] dark:text-[#A2BAAF] block">Safe to Bunk</span>
                      <span className="font-black font-mono text-sm text-[#183F36] dark:text-[#D6E85D]">{safeBunks} more classes</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-rose-500 block">Must Attend</span>
                      <span className="font-black font-mono text-sm text-rose-600 dark:text-rose-400">{neededClasses} consecutive</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── LIVE INTERACTIVE CODING LAB DEMO ── */}
      <section id="coding-lab" className="py-20 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#267653] dark:text-[#D6E85D] block mb-2 font-display">
            Interactive Practical Lab
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#183F36] dark:text-[#F5F1E8] tracking-tight font-display">
            Practical 3: Railway Reservation Waiting List Queue
          </h2>
          <p className="text-xs sm:text-sm text-[#68716B] dark:text-[#A2BAAF] mt-2">
            Switch between C and Java OOP solutions seamlessly. Both implementations handle multiple test cases and dry runs.
          </p>
        </div>

        <div className="bg-[#12332C] rounded-3xl border border-[#1D4A3F] overflow-hidden shadow-2xl">
          {/* Editor Header Bar */}
          <div className="p-4 border-b border-[#1D4A3F] flex items-center justify-between bg-[#0E2822]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 font-mono text-xs text-[#A2BAAF]">
                {demoCodeLang === "c" ? "railway_reservation_queue.c" : "RailwayReservationQueue.java"}
              </span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-[#183F36] p-1 rounded-xl border border-[#1D4A3F] text-xs font-bold">
              <button
                type="button"
                onClick={() => setDemoCodeLang("c")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  demoCodeLang === "c"
                    ? "bg-[#D6E85D] text-[#183F36]"
                    : "text-[#A2BAAF] hover:text-white"
                }`}
              >
                C (C99)
              </button>
              <button
                type="button"
                onClick={() => setDemoCodeLang("java")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  demoCodeLang === "java"
                    ? "bg-[#D6E85D] text-[#183F36]"
                    : "text-[#A2BAAF] hover:text-white"
                }`}
              >
                Java (OOP)
              </button>
            </div>
          </div>

          {/* Editor Code View */}
          <div className="p-5 font-mono text-xs text-[#E8EDE4] overflow-x-auto leading-relaxed max-h-96">
            <pre>
              {demoCodeLang === "c"
                ? `/* Practical 3: Railway Reservation Waiting List Queue in C99 */
#include <stdio.h>
#include <stdlib.h>
#define MAX 6

int waitQ[MAX];
int front = -1, rear = -1;

int isFull()  { return rear == MAX - 1; }
int isEmpty() { return front == -1 || front > rear; }

void addPassenger(int tokenNumber) {
    if (isFull()) {
        printf("\\nThe Waiting List Queue is Full..");
    } else {
        if (front == -1) front = 0;
        waitQ[++rear] = tokenNumber;
        printf("\\n%d is added to wait Queue", tokenNumber);
    }
}

void allocateSeat() {
    if (isEmpty()) {
        printf("\\nThe Waiting List Queue is Empty..");
    } else {
        printf("\\nSeat allocated to Passenger: %d", waitQ[front++]);
        if (front > rear) { front = -1; rear = -1; }
    }
}`
                : `/* Practical 3: Railway Reservation Waiting List Queue in Java */
import java.util.Scanner;

public class RailwayReservationQueue {
    private static final int MAX = 6;
    private int[] waitQ = new int[MAX];
    private int front = -1, rear = -1;

    public boolean isFull()  { return rear == MAX - 1; }
    public boolean isEmpty() { return front == -1 || front > rear; }

    public void addPassenger(int tokenNumber) {
        if (isFull()) {
            System.out.println("The Waiting List Queue is Full..");
        } else {
            if (front == -1) front = 0;
            waitQ[++rear] = tokenNumber;
            System.out.println(tokenNumber + " is added to wait Queue");
        }
    }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS (FAQ) ── */}
      <section id="faq" className="py-20 bg-[#FFFEFA] dark:bg-[#182E29] border-t border-[#E0E2D9] dark:border-[#264941]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#68716B] dark:text-[#D6E85D] block mb-2 font-display">
              Student FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#183F36] dark:text-[#F5F1E8] tracking-tight font-display">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-[#F5F1E8] dark:bg-[#12221E] border border-[#E0E2D9] dark:border-[#264941]">
              <h4 className="font-bold text-sm text-[#183F36] dark:text-[#F5F1E8] font-display">
                Is ITM MOOCs free for all university students?
              </h4>
              <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] mt-2 leading-relaxed">
                Yes. ITM MOOCs is 100% free for all students. There are no subscriptions, paywalls, or hidden charges.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F5F1E8] dark:bg-[#12221E] border border-[#E0E2D9] dark:border-[#264941]">
              <h4 className="font-bold text-sm text-[#183F36] dark:text-[#F5F1E8] font-display">
                How accurate is the 75% attendance safeguard calculator?
              </h4>
              <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] mt-2 leading-relaxed">
                The algorithm adheres strictly to statutory university examination guidelines: Attended / Delivered ≥ 0.75. It precisely rounds up needed lectures and rounds down safe bunks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#F5F1E8] dark:bg-[#12221E] border border-[#E0E2D9] dark:border-[#264941]">
              <h4 className="font-bold text-sm text-[#183F36] dark:text-[#F5F1E8] font-display">
                Can students from other universities use ITM MOOCs?
              </h4>
              <p className="text-xs text-[#68716B] dark:text-[#A2BAAF] mt-2 leading-relaxed">
                Yes! ITM MOOCs is designed as a multi-university platform. Common core engineering courses (DSA, DBMS, Computer Architecture, Math) are cross-compatible across GTU, Parul, and other institutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#12332C] text-[#E8EDE4] py-12 border-t border-[#1D4A3F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ItmMoocsLogo variant="live" size="sm" inverted={true} showTagline={true} />
          </div>

          <p className="text-xs text-[#A2BAAF] text-center sm:text-right">
            ITM MOOCs • Multi-University Academic Platform • Developed with Velocity Web
          </p>
        </div>
      </footer>
    </div>
  );
}
