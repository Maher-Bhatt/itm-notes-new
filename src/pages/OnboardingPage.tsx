import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { useAcademic } from "@/contexts/AcademicContext";
import { useUniversity } from "@/contexts/UniversityContext";
import { 
  getAllUniversities, 
  ALL_BTECH_BRANCHES, 
  UniversityData 
} from "@/data/universitiesData";
import { 
  GraduationCap, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Flame, 
  Code, 
  Calculator, 
  Upload, 
  User, 
  IdCard, 
  Award,
  Loader2,
  Building2,
  Search,
  Check,
  Cpu,
  Layers,
  MapPin,
  Trophy,
  Users
} from "lucide-react";
import { toast } from "sonner";
import { GRADIENT_AVATARS, renderAvatarBox } from "@/pages/ProfilePage";

const STUDY_PRIORITIES = [
  { id: "qb", label: "Exam Question Banks & Formats", icon: "📑", desc: "Previous years' university exam questions & paper formats" },
  { id: "notes", label: "Curriculum Syllabus Notes", icon: "📚", desc: "Unit notes, algorithms, proofs & formula banks" },
  { id: "coding", label: "Interactive Coding Lab", icon: "💻", desc: "LeetCode & HackerRank style practical harness" },
  { id: "calc", label: "75% Attendance & SGPA Calculator", icon: "🧮", desc: "Track attendance threshold and semester SGPA" },
  { id: "community", label: "Campus Community & Friends", icon: "🤝", desc: "Connect with classmates, share posts & notes" },
  { id: "achievements", label: "Streaks, Badges & Leaderboard", icon: "🏆", desc: "Gamified focus timer, daily quests and XP" },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user, profile, updateProfile, uploadAvatar } = useAuth();
  const { setAcademicContext } = useAcademic();
  const { setUniversity, setActiveDivision } = useUniversity();

  const allUniversities = useMemo(() => getAllUniversities(), []);

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Scanned Google Metadata
  const googleName = useMemo(() => {
    return (user?.user_metadata?.full_name as string) ||
      (user?.user_metadata?.name as string) ||
      (user?.user_metadata?.display_name as string) ||
      "";
  }, [user]);

  const googleAvatar = useMemo(() => {
    return (user?.user_metadata?.avatar_url as string) ||
      (user?.user_metadata?.picture as string) ||
      null;
  }, [user]);

  const isGoogleUser = Boolean(user?.app_metadata?.provider === "google" || googleName || googleAvatar);

  // Form State - Prepopulated from Google or Supabase profile
  const [displayName, setDisplayName] = useState(
    profile?.display_name || googleName || user?.email?.split('@')[0] || ""
  );
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>(profile?.university || "itm-baroda");
  const [universitySearch, setUniversitySearch] = useState("");
  const [program, setProgram] = useState(profile?.program || "B.Tech");
  const [branch, setBranch] = useState(profile?.branch || "Computer Science & Engineering");
  const [semester, setSemester] = useState<number>(profile?.semester || 3);
  const [division, setDivision] = useState(profile?.division || "Div A");
  const [enrollmentNo, setEnrollmentNo] = useState(profile?.enrollment_no || "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    (profile?.avatar_url && !profile.avatar_url.startsWith('grad-') && !profile.avatar_url.includes('placeholder'))
      ? profile.avatar_url
      : (googleAvatar || profile?.avatar_url || "grad-blue")
  );
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(["qb", "notes", "coding", "calc"]);
  const [academicGoal, setAcademicGoal] = useState("Score 8.5+ SGPA and excel in technical campus placements");
  const [ageConsent, setAgeConsent] = useState(true);
  const [legalConsent, setLegalConsent] = useState(true);

  // Redirect if already completed
  useEffect(() => {
    const isDone = typeof window !== 'undefined' && (
      localStorage.getItem('campusloop_onboarding_done') === 'true' ||
      localStorage.getItem('itm_student_onboarding_completed') === 'true'
    );
    if (profile?.onboarding_completed === true || isDone) {
      navigate('/dashboard', { replace: true });
    }
  }, [profile?.onboarding_completed, navigate]);

  // Keep in sync with user profile & scanned Google details
  useEffect(() => {
    const bestName = profile?.display_name || googleName || (user?.email ? user.email.split('@')[0] : "");
    if (bestName && (!displayName || displayName === "Student" || displayName === user?.email?.split('@')[0])) {
      setDisplayName(bestName);
    }
    const bestAvatar = (profile?.avatar_url && !profile.avatar_url.startsWith('grad-') && !profile.avatar_url.includes('placeholder'))
      ? profile.avatar_url
      : (googleAvatar || profile?.avatar_url);
    if (bestAvatar && (!avatarUrl || avatarUrl === "grad-blue")) {
      setAvatarUrl(bestAvatar);
    }
    if (profile) {
      if (profile.university) setSelectedUniversityId(profile.university);
      if (profile.program) setProgram(profile.program);
      if (profile.branch) setBranch(profile.branch);
      if (profile.semester) setSemester(profile.semester);
      if (profile.division) setDivision(profile.division);
      if (profile.enrollment_no) setEnrollmentNo(profile.enrollment_no);
    }
  }, [profile, user, googleName, googleAvatar]);

  const activeUniversity = useMemo(() => {
    return allUniversities.find(u => u.id === selectedUniversityId) || allUniversities[0];
  }, [allUniversities, selectedUniversityId]);

  const filteredUniversities = useMemo(() => {
    if (!universitySearch.trim()) return allUniversities;
    const q = universitySearch.toLowerCase().trim();
    return allUniversities.filter(u => 
      u.name.toLowerCase().includes(q) ||
      u.shortName.toLowerCase().includes(q) ||
      u.location.toLowerCase().includes(q) ||
      u.accreditation.toLowerCase().includes(q)
    );
  }, [allUniversities, universitySearch]);

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const url = await uploadAvatar(file);
      setAvatarUrl(url);
      toast.success("Profile photo uploaded!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to upload photo.";
      toast.error(msg);
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      localStorage.setItem('campusloop_onboarding_done', 'true');
      localStorage.setItem('itm_student_onboarding_completed', 'true');
      const semNumber = Number(semester) || 3;
      await updateProfile({
        display_name: displayName.trim() || user?.email?.split('@')[0] || "Student",
        program: program || "B.Tech",
        branch: branch || "Computer Science & Engineering",
        semester: semNumber,
        division: division || "Div A",
        enrollment_no: enrollmentNo.trim() || null,
        avatar_url: avatarUrl,
        goal: academicGoal,
        onboarding_completed: true,
      });

      // Synchronize university context & division
      await setUniversity(selectedUniversityId);
      await setActiveDivision(division);

      // Set academic context
      setAcademicContext({
        semesterId: `sem-${semNumber}`,
      });

      toast.success(`Welcome to CampusLoop! Onboarding complete for ${activeUniversity.shortName}.`);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Failed to complete onboarding:", err);
      // Ensure user is never trapped even if network failed
      localStorage.setItem('campusloop_onboarding_done', 'true');
      navigate("/dashboard", { replace: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    try {
      localStorage.setItem('campusloop_onboarding_done', 'true');
      localStorage.setItem('itm_onboarding_skipped', 'true');
      localStorage.setItem('itm_student_onboarding_completed', 'true');
      const semNumber = Number(semester) || 3;
      await updateProfile({
        program: program || "B.Tech",
        branch: branch || "Computer Science & Engineering",
        semester: semNumber,
        division: division || "Div A",
        onboarding_completed: true,
      });
      await setUniversity(selectedUniversityId || "itm-baroda");
      setAcademicContext({
        semesterId: `sem-${semNumber}`,
      });
    } catch (err) {
      console.warn('Failed to save onboarding skip data:', err);
    }
    navigate("/dashboard", { replace: true });
  };

  const togglePriority = (id: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#121214] text-foreground dark:text-white flex flex-col justify-between selection:bg-primary/20">
      
      {/* Top Branding Navigation */}
      <header className="border-b border-border dark:border-stone-800 bg-white/80 dark:bg-card/80 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <img src={logo} alt="CampusLoop" className="w-7 h-7 object-contain rounded-lg" />
          <div>
            <h1 className="font-semibold text-sm text-foreground dark:text-white tracking-tight flex items-center gap-1.5">
              <span>CampusLoop</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary font-bold uppercase tracking-wider">
                India Multi-University
              </span>
            </h1>
            <p className="text-[10px] text-stone-500 font-mono">Student Onboarding · Academic Personalization</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500">
            <span>Step {step} of 4</span>
            <span>·</span>
            <span className="font-semibold text-foreground dark:text-white">
              {step === 1 && "Identity & Avatar"}
              {step === 2 && "University & Campus"}
              {step === 3 && "Degree & Branch"}
              {step === 4 && "Goals & Priorities"}
            </span>
          </div>

          <button
            onClick={handleSkip}
            className="text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 underline transition-colors cursor-pointer"
          >
            Skip for now
          </button>
        </div>
      </header>

      {/* Main Wizard Area */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 flex flex-col justify-center">
        
        {/* Step Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500 mb-2">
            <span>Step {step} of 4</span>
            <span className="text-primary font-bold">{Math.round((step / 4) * 100)}% Completed</span>
          </div>
          <div className="h-2 w-full bg-muted dark:bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* =========================================================================
            STEP 1: IDENTITY & AVATAR
        ========================================================================= */}
        {step === 1 && (
          <div className="rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary text-xs font-bold">
                <User className="h-3.5 w-3.5" />
                <span>Step 1: Your Student Identity</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground dark:text-white">
                How should classmates find you?
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Set up your profile identity for campus friend requests, study groups, and notes sharing.
              </p>
            </div>

            {/* Google Sync Badge & Alert */}
            {isGoogleUser && (
              <div className="p-3.5 rounded-2xl bg-primary/10 dark:bg-primary/15 border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-fade-in">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-xl bg-white dark:bg-stone-800 flex items-center justify-center shrink-0 shadow-xs">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-foreground dark:text-white">Google Profile Auto-Scanned</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-success/20 text-success font-semibold">Verified</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">
                      Scanned profile photo and name from <span className="font-semibold text-foreground">{user?.email}</span>.
                    </p>
                  </div>
                </div>

                {googleAvatar && avatarUrl !== googleAvatar && (
                  <button
                    type="button"
                    onClick={() => setAvatarUrl(googleAvatar)}
                    className="text-xs font-bold text-primary hover:underline shrink-0 cursor-pointer text-left sm:text-right"
                  >
                    Restore Google Photo
                  </button>
                )}
              </div>
            )}

            {/* Avatar Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Choose Your Avatar or Upload Photo
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-background dark:bg-stone-800/60 border border-border dark:border-stone-700">
                <div className="shrink-0">
                  {renderAvatarBox(avatarUrl, displayName, "h-20 w-20 text-2xl")}
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                    {GRADIENT_AVATARS.map((grad) => (
                      <button
                        key={grad.id}
                        type="button"
                        onClick={() => setAvatarUrl(grad.id)}
                        className={`h-8 w-8 rounded-full bg-linear-to-tr ${grad.bgClass} flex items-center justify-center transition-all ${
                          avatarUrl === grad.id ? "ring-2 ring-offset-2 ring-primary scale-110" : "opacity-80 hover:opacity-100"
                        }`}
                      >
                        {avatarUrl === grad.id && <Check className="h-4 w-4 text-white stroke-[3]" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-1">
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-stone-700 text-stone-700 dark:text-stone-200 border border-border dark:border-stone-600 hover:bg-stone-50 transition-colors cursor-pointer">
                      {isUploadingPhoto ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5 text-primary" />}
                      <span>Upload Custom Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarFile}
                        disabled={isUploadingPhoto}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Display Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Full Name / Preferred Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Maher Bhatt"
                className="w-full h-11 px-4 rounded-xl border border-border dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!displayName.trim()}
                className="h-11 px-6 rounded-full bg-primary hover:bg-primary text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>Continue to University</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 2: UNIVERSITY & CAMPUS SELECTION
        ========================================================================= */}
        {step === 2 && (
          <div className="rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary text-xs font-bold">
                <Building2 className="h-3.5 w-3.5" />
                <span>Step 2: Choose Your University</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground dark:text-white">
                Which Indian campus are you studying at?
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Connects your personal dashboard, daily timetables, syllabi, and campus community feed.
              </p>
            </div>

            {/* University Search Box */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input
                type="text"
                value={universitySearch}
                onChange={(e) => setUniversitySearch(e.target.value)}
                placeholder="Search across IITs, BITS, DTU, GTU, ITM, Parul, Anna Univ..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border dark:border-stone-700 bg-background dark:bg-stone-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            {/* Universities Radio List */}
            <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
              {filteredUniversities.map((uni) => {
                const isSelected = selectedUniversityId === uni.id;
                return (
                  <div
                    key={uni.id}
                    onClick={() => setSelectedUniversityId(uni.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? "border-primary bg-primary/10 dark:bg-primary/20 shadow-xs ring-1 ring-primary"
                        : "border-border dark:border-stone-800 hover:border-stone-400 bg-white dark:bg-stone-900/60"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? "bg-primary text-white" : "bg-background dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                      }`}>
                        {uni.code.slice(0, 4)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-foreground dark:text-white truncate">
                            {uni.name}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-background dark:bg-stone-800 text-stone-600 dark:text-stone-400 shrink-0">
                            {uni.affiliationType}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 truncate flex items-center gap-1.5 mt-0.5">
                          <MapPin className="h-3 w-3 text-stone-400" />
                          <span>{uni.location}</span>
                          <span>·</span>
                          <span>{uni.accreditation.split('·')[0].trim()}</span>
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? "border-primary bg-primary text-white" : "border-stone-300 dark:border-stone-700"
                      }`}>
                        {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-11 px-5 rounded-full border border-border dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="h-11 px-6 rounded-full bg-primary hover:bg-primary text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Continue to Branch</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 3: DEGREE, BRANCH & SECTION
        ========================================================================= */}
        {step === 3 && (
          <div className="rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary text-xs font-bold">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Step 3: Academic Details</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground dark:text-white">
                Select your engineering program & branch
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Personalizes your curriculum subjects, lab manuals, and division timetables for {activeUniversity.shortName}.
              </p>
            </div>

            {/* Program Pills */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Degree Program
              </label>
              <div className="flex flex-wrap gap-2">
                {["B.Tech", "B.E.", "BCA", "M.Tech"].map((prog) => (
                  <button
                    key={prog}
                    type="button"
                    onClick={() => setProgram(prog)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      program === prog
                        ? "bg-primary text-white shadow-xs"
                        : "bg-background dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-primary/10"
                    }`}
                  >
                    {prog}
                  </button>
                ))}
              </div>
            </div>

            {/* Branch Cards */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Engineering Branch / Field
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                {ALL_BTECH_BRANCHES.map((b) => {
                  const isSelected = branch.toLowerCase().includes(b.shortCode.toLowerCase()) || branch.toLowerCase().includes(b.name.toLowerCase());
                  return (
                    <div
                      key={b.id}
                      onClick={() => setBranch(b.name)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                        isSelected
                          ? "border-primary bg-primary/10 dark:bg-primary/15 ring-1 ring-primary"
                          : "border-border dark:border-stone-800 hover:border-stone-400 bg-white dark:bg-stone-900/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-foreground dark:text-white truncate">
                          {b.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-primary/10 text-primary">
                          {b.shortCode}
                        </span>
                      </div>
                      <p className="text-[10px] text-stone-500 line-clamp-1">
                        {b.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Semester & Division Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {/* Semester Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  Current Semester
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <button
                      key={sem}
                      type="button"
                      onClick={() => setSemester(sem)}
                      className={`h-9 w-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        semester === sem
                          ? "bg-primary text-white shadow-xs"
                          : "bg-background dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-primary/10"
                      }`}
                    >
                      S{sem}
                    </button>
                  ))}
                </div>
              </div>

              {/* Division / Section */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                  Section / Division
                </label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-border dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
                >
                  {(activeUniversity.divisions || ['Div A', 'Div B', 'Div C']).map((divName) => (
                    <option key={divName} value={divName}>
                      {divName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Optional Enrollment Number */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Enrollment / Roll Number (Optional)
              </label>
              <input
                type="text"
                value={enrollmentNo}
                onChange={(e) => setEnrollmentNo(e.target.value)}
                placeholder="e.g. 23010101001 or CS23B042"
                className="w-full h-10 px-4 rounded-xl border border-border dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="h-11 px-5 rounded-full border border-border dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="h-11 px-6 rounded-full bg-primary hover:bg-primary text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <span>Continue to Goals</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STEP 4: GOALS & STUDY PRIORITIES
        ========================================================================= */}
        {step === 4 && (
          <div className="rounded-2xl border border-border dark:border-stone-800 bg-white dark:bg-card p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary text-xs font-bold">
                <Trophy className="h-3.5 w-3.5" />
                <span>Step 4: Goals & Priorities</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground dark:text-white">
                Customize your academic focus
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Choose what tools matter most to you for exam preparation and campus engagement.
              </p>
            </div>

            {/* Academic Goal Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Primary Target Goal for this Semester
              </label>
              <input
                type="text"
                value={academicGoal}
                onChange={(e) => setAcademicGoal(e.target.value)}
                placeholder="e.g. Score 9.0+ SGPA, maintain 85% attendance, master DSA"
                className="w-full h-11 px-4 rounded-xl border border-border dark:border-stone-700 bg-white dark:bg-stone-900 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            {/* Study Priorities Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                Select Your CampusLoop Priorities (Pick all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STUDY_PRIORITIES.map((p) => {
                  const isChecked = selectedPriorities.includes(p.id);
                  return (
                    <div
                      key={p.id}
                      onClick={() => togglePriority(p.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? "border-primary bg-primary/10 dark:bg-primary/20 ring-1 ring-primary"
                          : "border-border dark:border-stone-800 hover:border-stone-400 bg-white dark:bg-stone-900/60"
                      }`}
                    >
                      <span className="text-xl shrink-0">{p.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-foreground dark:text-white truncate">
                            {p.label}
                          </span>
                          {isChecked && <Check className="h-3.5 w-3.5 text-primary stroke-[3]" />}
                        </div>
                        <p className="text-[10px] text-stone-500 leading-tight mt-0.5">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Statutory DPDP Act & Legal Consent */}
            <div className="p-4 rounded-2xl bg-background dark:bg-stone-900 border border-border dark:border-stone-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-foreground dark:text-white">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Statutory Consent & Age Verification (DPDP Act 2023)</span>
              </div>

              <label className="flex items-start gap-2.5 text-xs text-stone-600 dark:text-stone-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={ageConsent}
                  onChange={(e) => setAgeConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-primary border-border cursor-pointer"
                />
                <span>
                  I confirm that I am <strong>18 years of age or older</strong> (or have obtained consent from my parent/legal guardian as mandated under Section 9 of the Digital Personal Data Protection Act, 2023).
                </span>
              </label>

              <label className="flex items-start gap-2.5 text-xs text-stone-600 dark:text-stone-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={legalConsent}
                  onChange={(e) => setLegalConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded accent-primary border-border cursor-pointer"
                />
                <span>
                  I agree to CampusLoop's{" "}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium">Terms of Service</a>,{" "}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium">Privacy Policy</a>, and{" "}
                  <a href="/refund" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium">Refund Policy</a>.
                </span>
              </label>
            </div>

            {/* Summary Preview Box */}
            <div className="p-4 rounded-2xl bg-primary/10 dark:bg-primary/20 border border-primary/20 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-primary dark:text-primary">
                <Sparkles className="h-4 w-4" />
                <span>Ready to Launch Your Experience</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300">
                Configured for <strong>{displayName || "Student"}</strong> at <strong>{activeUniversity.name}</strong> ({branch}, Semester {semester}, {division}).
              </p>
            </div>

            {/* Final Action Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="h-11 px-5 rounded-full border border-border dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleComplete}
                disabled={isSubmitting || !ageConsent || !legalConsent}
                className="h-11 px-8 rounded-full bg-primary hover:bg-primary text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Configuring Workspace...</span>
                  </>
                ) : (
                  <>
                    <span>Launch My Campus Hub</span>
                    <Sparkles className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-stone-500 border-t border-border dark:border-stone-800 bg-white/60 dark:bg-card/60">
        CampusLoop Student Network · Pan-India Universities & Engineering Curriculums
      </footer>
    </div>
  );
}
