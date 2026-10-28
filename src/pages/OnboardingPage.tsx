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

  // Form State
  const [displayName, setDisplayName] = useState(profile?.display_name || user?.email?.split('@')[0] || "");
  const [selectedUniversityId, setSelectedUniversityId] = useState<string>(profile?.university || "itm-baroda");
  const [universitySearch, setUniversitySearch] = useState("");
  const [program, setProgram] = useState(profile?.program || "B.Tech");
  const [branch, setBranch] = useState(profile?.branch || "Computer Science & Engineering");
  const [semester, setSemester] = useState<number>(profile?.semester || 3);
  const [division, setDivision] = useState(profile?.division || "Div A");
  const [enrollmentNo, setEnrollmentNo] = useState(profile?.enrollment_no || "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile?.avatar_url || "grad-blue");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(["qb", "notes", "coding", "calc"]);
  const [academicGoal, setAcademicGoal] = useState("Score 8.5+ SGPA and excel in technical campus placements");

  // Keep in sync with user profile if already loaded
  useEffect(() => {
    if (profile) {
      if (profile.display_name && !displayName) setDisplayName(profile.display_name);
      if (profile.university) setSelectedUniversityId(profile.university);
      if (profile.program) setProgram(profile.program);
      if (profile.branch) setBranch(profile.branch);
      if (profile.semester) setSemester(profile.semester);
      if (profile.division) setDivision(profile.division);
      if (profile.enrollment_no) setEnrollmentNo(profile.enrollment_no);
      if (profile.avatar_url) setAvatarUrl(profile.avatar_url);
    }
  }, [profile]);

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
      const semNumber = Number(semester) || 3;
      await updateProfile({
        display_name: displayName.trim() || user?.email?.split('@')[0] || "Student",
        university: selectedUniversityId,
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
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to complete onboarding:", err);
      toast.error("Could not save preferences. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    try {
      const semNumber = Number(semester) || 3;
      await updateProfile({
        university: selectedUniversityId || "itm-baroda",
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
    navigate("/dashboard");
  };

  const togglePriority = (id: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#F6F3EC] dark:bg-[#121214] text-[#111111] dark:text-white flex flex-col justify-between selection:bg-[#2B4EFF]/20">
      
      {/* Top Branding Navigation */}
      <header className="border-b border-[#E8E4DA] dark:border-neutral-800 bg-white/80 dark:bg-[#1C1C1E]/80 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <img src={logo} alt="CampusLoop" className="w-7 h-7 object-contain rounded-lg" />
          <div>
            <h1 className="font-extrabold text-sm text-[#111111] dark:text-white tracking-tight flex items-center gap-1.5">
              <span>CampusLoop</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300 font-bold uppercase tracking-wider">
                India Multi-University
              </span>
            </h1>
            <p className="text-[10px] text-neutral-500 font-mono">Student Onboarding · Academic Personalization</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500">
            <span>Step {step} of 4</span>
            <span>·</span>
            <span className="font-semibold text-[#111111] dark:text-white">
              {step === 1 && "Identity & Avatar"}
              {step === 2 && "University & Campus"}
              {step === 3 && "Degree & Branch"}
              {step === 4 && "Goals & Priorities"}
            </span>
          </div>

          <button
            onClick={handleSkip}
            className="text-xs text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 underline transition-colors cursor-pointer"
          >
            Skip for now
          </button>
        </div>
      </header>

      {/* Main Wizard Area */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 flex flex-col justify-center">
        
        {/* Step Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-500 mb-2">
            <span>Step {step} of 4</span>
            <span className="text-[#2B4EFF] font-bold">{Math.round((step / 4) * 100)}% Completed</span>
          </div>
          <div className="h-2 w-full bg-[#E8E4DA] dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2B4EFF] transition-all duration-300 rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* =========================================================================
            STEP 1: IDENTITY & AVATAR
        ========================================================================= */}
        {step === 1 && (
          <div className="rounded-[24px] border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300 text-xs font-bold">
                <User className="h-3.5 w-3.5" />
                <span>Step 1: Your Student Identity</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] dark:text-white">
                How should classmates find you?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Set up your profile identity for campus friend requests, study groups, and notes sharing.
              </p>
            </div>

            {/* Avatar Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Choose Your Avatar or Upload Photo
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-[20px] bg-[#F6F3EC] dark:bg-neutral-800/60 border border-[#E8E4DA] dark:border-neutral-700">
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
                          avatarUrl === grad.id ? "ring-2 ring-offset-2 ring-[#2B4EFF] scale-110" : "opacity-80 hover:opacity-100"
                        }`}
                      >
                        {avatarUrl === grad.id && <Check className="h-4 w-4 text-white stroke-[3]" />}
                      </button>
                    ))}
                  </div>

                  <div className="pt-1">
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border border-[#E8E4DA] dark:border-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer">
                      {isUploadingPhoto ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5 text-[#2B4EFF]" />}
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
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Full Name / Preferred Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="e.g. Maher Bhatt"
                className="w-full h-11 px-4 rounded-xl border border-[#E8E4DA] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#2B4EFF]/30 focus:border-[#2B4EFF] transition-all"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!displayName.trim()}
                className="h-11 px-6 rounded-full bg-[#2B4EFF] hover:bg-[#1E3ECC] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="rounded-[24px] border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300 text-xs font-bold">
                <Building2 className="h-3.5 w-3.5" />
                <span>Step 2: Choose Your University</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] dark:text-white">
                Which Indian campus are you studying at?
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Connects your personal dashboard, daily timetables, syllabi, and campus community feed.
              </p>
            </div>

            {/* University Search Box */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                value={universitySearch}
                onChange={(e) => setUniversitySearch(e.target.value)}
                placeholder="Search across IITs, BITS, DTU, GTU, ITM, Parul, Anna Univ..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#E8E4DA] dark:border-neutral-700 bg-[#F6F3EC] dark:bg-neutral-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#2B4EFF]/30 focus:border-[#2B4EFF] transition-all"
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
                        ? "border-[#2B4EFF] bg-[#E6EAFD]/40 dark:bg-blue-950/20 shadow-xs ring-1 ring-[#2B4EFF]"
                        : "border-[#E8E4DA] dark:border-neutral-800 hover:border-neutral-400 bg-white dark:bg-neutral-900/60"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected ? "bg-[#2B4EFF] text-white" : "bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                      }`}>
                        {uni.code.slice(0, 4)}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-[#111111] dark:text-white truncate">
                            {uni.name}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 shrink-0">
                            {uni.affiliationType}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-500 truncate flex items-center gap-1.5 mt-0.5">
                          <MapPin className="h-3 w-3 text-neutral-400" />
                          <span>{uni.location}</span>
                          <span>·</span>
                          <span>{uni.accreditation.split('·')[0].trim()}</span>
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0">
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected ? "border-[#2B4EFF] bg-[#2B4EFF] text-white" : "border-neutral-300 dark:border-neutral-700"
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
                className="h-11 px-5 rounded-full border border-[#E8E4DA] dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="h-11 px-6 rounded-full bg-[#2B4EFF] hover:bg-[#1E3ECC] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
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
          <div className="rounded-[24px] border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300 text-xs font-bold">
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Step 3: Academic Details</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] dark:text-white">
                Select your engineering program & branch
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Personalizes your curriculum subjects, lab manuals, and division timetables for {activeUniversity.shortName}.
              </p>
            </div>

            {/* Program Pills */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
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
                        ? "bg-[#2B4EFF] text-white shadow-xs"
                        : "bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#E6EAFD]"
                    }`}
                  >
                    {prog}
                  </button>
                ))}
              </div>
            </div>

            {/* Branch Cards */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
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
                          ? "border-[#2B4EFF] bg-[#E6EAFD]/50 dark:bg-blue-950/30 ring-1 ring-[#2B4EFF]"
                          : "border-[#E8E4DA] dark:border-neutral-800 hover:border-neutral-400 bg-white dark:bg-neutral-900/60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-[#111111] dark:text-white truncate">
                          {b.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-[#2B4EFF]/10 text-[#2B4EFF]">
                          {b.shortCode}
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-500 line-clamp-1">
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
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
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
                          ? "bg-[#2B4EFF] text-white shadow-xs"
                          : "bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#E6EAFD]"
                      }`}
                    >
                      S{sem}
                    </button>
                  ))}
                </div>
              </div>

              {/* Division / Section */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Section / Division
                </label>
                <select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-[#E8E4DA] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#2B4EFF]/30 focus:border-[#2B4EFF] transition-all cursor-pointer"
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
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Enrollment / Roll Number (Optional)
              </label>
              <input
                type="text"
                value={enrollmentNo}
                onChange={(e) => setEnrollmentNo(e.target.value)}
                placeholder="e.g. 23010101001 or CS23B042"
                className="w-full h-10 px-4 rounded-xl border border-[#E8E4DA] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#2B4EFF]/30 focus:border-[#2B4EFF] transition-all"
              />
            </div>

            {/* Navigation Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="h-11 px-5 rounded-full border border-[#E8E4DA] dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(4)}
                className="h-11 px-6 rounded-full bg-[#2B4EFF] hover:bg-[#1E3ECC] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-xs"
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
          <div className="rounded-[24px] border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300 text-xs font-bold">
                <Trophy className="h-3.5 w-3.5" />
                <span>Step 4: Goals & Priorities</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#111111] dark:text-white">
                Customize your academic focus
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                Choose what tools matter most to you for exam preparation and campus engagement.
              </p>
            </div>

            {/* Academic Goal Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                Primary Target Goal for this Semester
              </label>
              <input
                type="text"
                value={academicGoal}
                onChange={(e) => setAcademicGoal(e.target.value)}
                placeholder="e.g. Score 9.0+ SGPA, maintain 85% attendance, master DSA"
                className="w-full h-11 px-4 rounded-xl border border-[#E8E4DA] dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#2B4EFF]/30 focus:border-[#2B4EFF] transition-all"
              />
            </div>

            {/* Study Priorities Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
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
                          ? "border-[#2B4EFF] bg-[#E6EAFD]/40 dark:bg-blue-950/20 ring-1 ring-[#2B4EFF]"
                          : "border-[#E8E4DA] dark:border-neutral-800 hover:border-neutral-400 bg-white dark:bg-neutral-900/60"
                      }`}
                    >
                      <span className="text-xl shrink-0">{p.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#111111] dark:text-white truncate">
                            {p.label}
                          </span>
                          {isChecked && <Check className="h-3.5 w-3.5 text-[#2B4EFF] stroke-[3]" />}
                        </div>
                        <p className="text-[10px] text-neutral-500 leading-tight mt-0.5">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Summary Preview Box */}
            <div className="p-4 rounded-2xl bg-[#E6EAFD]/50 dark:bg-blue-950/20 border border-[#2B4EFF]/20 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-[#2B4EFF] dark:text-blue-300">
                <Sparkles className="h-4 w-4" />
                <span>Ready to Launch Your Experience</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-300">
                Configured for <strong>{displayName || "Student"}</strong> at <strong>{activeUniversity.name}</strong> ({branch}, Semester {semester}, {division}).
              </p>
            </div>

            {/* Final Action Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="h-11 px-5 rounded-full border border-[#E8E4DA] dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all cursor-pointer"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleComplete}
                disabled={isSubmitting}
                className="h-11 px-8 rounded-full bg-[#2B4EFF] hover:bg-[#1E3ECC] text-white text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
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
      <footer className="py-4 text-center text-xs text-neutral-500 border-t border-[#E8E4DA] dark:border-neutral-800 bg-white/60 dark:bg-[#1C1C1E]/60">
        CampusLoop Student Network · Pan-India Universities & Engineering Curriculums
      </footer>
    </div>
  );
}
