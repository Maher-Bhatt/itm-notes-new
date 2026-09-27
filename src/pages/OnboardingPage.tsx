// @ts-nocheck
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useAcademic } from "@/contexts/AcademicContext";
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
  Loader2
} from "lucide-react";
import { toast } from "sonner";
import { GRADIENT_AVATARS, renderAvatarBox } from "@/pages/ProfilePage";

const STUDY_PRIORITIES = [
  { id: "qb", label: "Exam Question Banks & Formats", icon: "📑", desc: "MST & CET-2 question papers" },
  { id: "notes", label: "Curriculum Syllabus Notes", icon: "📚", desc: "Detailed unit concepts & formulas" },
  { id: "coding", label: "University Coding Practicals", icon: "💻", desc: "Tested DSA, Java & Python code" },
  { id: "calc", label: "75% Attendance & SGPA Calculator", icon: "🧮", desc: "Track buffer days & grades" },
  { id: "achievements", label: "Student Streaks & Badges", icon: "🏆", desc: "Gamified focus timer & XP" },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { user, profile, updateProfile, uploadAvatar } = useAuth();
  const { setAcademicContext } = useAcademic();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // Form State
  const [displayName, setDisplayName] = useState(profile?.display_name || user?.email?.split('@')[0] || "");
  const [program, setProgram] = useState(profile?.program || "B.Tech");
  const [branch, setBranch] = useState(profile?.branch || "Computer Science & Engineering");
  const [semester, setSemester] = useState(profile?.semester || 3);
  const [enrollmentNo, setEnrollmentNo] = useState(profile?.enrollment_no || "");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile?.avatar_url || null);
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(["qb", "notes", "calc"]);
  const [academicGoal, setAcademicGoal] = useState("Score 8.5+ SGPA and clear upcoming MST exams with confidence");

  // Keep in sync with user profile if already loaded
  useEffect(() => {
    if (profile) {
      if (profile.display_name && !displayName) setDisplayName(profile.display_name);
      if (profile.program) setProgram(profile.program);
      if (profile.branch) setBranch(profile.branch);
      if (profile.semester) setSemester(profile.semester);
      if (profile.enrollment_no) setEnrollmentNo(profile.enrollment_no);
      if (profile.avatar_url) setAvatarUrl(profile.avatar_url);
    }
  }, [profile]);

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const url = await uploadAvatar(file);
      setAvatarUrl(url);
      toast.success("Profile photo uploaded!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload photo.");
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleComplete = async () => {
    setIsSubmitting(true);
    try {
      await updateProfile({
        display_name: displayName.trim() || user?.email?.split('@')[0] || "Student",
        program,
        branch,
        semester,
        enrollment_no: enrollmentNo.trim() || null,
        avatar_url: avatarUrl,
        goal: academicGoal,
        onboarding_completed: true,
      });

      // Also set academic context for semester selector
      setAcademicContext({
        semesterId: `sem-${semester}`,
      });

      toast.success("Welcome aboard! Your student profile is set up.");
      navigate("/dashboard");
    } catch (err) {
      console.error("Failed to complete onboarding:", err);
      toast.error("Could not save your preferences. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    try {
      await updateProfile({
        onboarding_completed: true,
      });
    } catch {}
    navigate("/dashboard");
  };

  const togglePriority = (id: string) => {
    setSelectedPriorities((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      <Header />

      <main className="flex-1 max-w-xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-center">
        {/* Progress Bar & Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-2">
            <span>Step {step} of 4</span>
            <button
              onClick={handleSkip}
              className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
            >
              Skip to Dashboard
            </button>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Welcome to ITM Notes */}
        {step === 1 && (
          <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl">
              🎓
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Welcome to ITM Notes
              </h1>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                The centralized study portal for students of <strong className="text-foreground">ITM (SLS) Baroda University</strong>. Access verified question banks, semester notes, practical coding labs, and grade predictors.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/60">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-foreground">Verified University Notes & Syllabi</span>
                  <p className="text-muted-foreground mt-0.5">Aligned with your exact branch & semester syllabus.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/60">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-foreground">MST & CET-2 Question Banks</span>
                  <p className="text-muted-foreground mt-0.5">High-yield question banks, paper patterns, and timetables.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/60">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-bold text-foreground">Academic Tools & 75% Attendance Buffer</span>
                  <p className="text-muted-foreground mt-0.5">Calculate your safe attendance margin and predict your SGPA.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 apple-press"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* STEP 2: Academic Setup */}
        {step === 2 && (
          <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-1">
                <GraduationCap className="h-4 w-4" /> Academic Setup
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                Your Course & Semester
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                This personalizes your dashboard with relevant subjects and exam schedules.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  University
                </label>
                <input
                  type="text"
                  disabled
                  value="ITM (SLS) Baroda University"
                  className="w-full h-10 px-3 rounded-xl border border-input bg-secondary/50 text-xs font-semibold text-foreground cursor-not-allowed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Program / Degree
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl border border-input bg-background text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="B.Tech">B.Tech Engineering</option>
                    <option value="BCA">BCA (Computer Applications)</option>
                    <option value="MCA">MCA (Master of Computer Apps)</option>
                    <option value="Diploma">Diploma Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl border border-input bg-background text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Branch / Department
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                  <option value="Information Technology">Information Technology (IT)</option>
                  <option value="Artificial Intelligence & ML">Artificial Intelligence & ML</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Electrical Engineering">Electrical Engineering</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  University Enrollment Number (Optional)
                </label>
                <input
                  type="text"
                  value={enrollmentNo}
                  onChange={(e) => setEnrollmentNo(e.target.value)}
                  placeholder="e.g. 23010101001"
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <span className="text-[10px] text-muted-foreground mt-1 block">
                  Enables a "Verified Student" badge on your campus profile.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-secondary transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="py-2.5 px-5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm hover:opacity-90 transition-opacity flex items-center gap-1.5 apple-press"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Study Priorities */}
        {step === 3 && (
          <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-500 uppercase tracking-wider mb-1">
                <Sparkles className="h-4 w-4" /> Personalization
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                What are your study priorities?
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Select the modules you want fast-tracked on your daily dashboard.
              </p>
            </div>

            <div className="space-y-2.5">
              {STUDY_PRIORITIES.map((pri) => {
                const isSelected = selectedPriorities.includes(pri.id);
                return (
                  <button
                    type="button"
                    key={pri.id}
                    onClick={() => togglePriority(pri.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all ${
                      isSelected
                        ? "border-primary bg-primary/5 shadow-2xs"
                        : "border-border/70 hover:border-border hover:bg-secondary/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl shrink-0">{pri.icon}</span>
                      <div>
                        <h4 className="text-xs font-bold text-foreground">{pri.label}</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{pri.desc}</p>
                      </div>
                    </div>
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border"
                    }`}>
                      {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-secondary transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="py-2.5 px-5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm hover:opacity-90 transition-opacity flex items-center gap-1.5 apple-press"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Profile & Finish */}
        {step === 4 && (
          <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fade-in">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-500 uppercase tracking-wider mb-1">
                <User className="h-4 w-4" /> Profile & Passport
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">
                Set up your student identity
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Your name and avatar appear on your dashboard and study streak badges.
              </p>
            </div>

            <div className="space-y-4">
              {/* Avatar Selector */}
              <div className="flex items-center gap-4">
                {renderAvatarBox(avatarUrl, displayName || "S", "w-16 h-16 text-2xl")}
                <div className="flex flex-col gap-1.5">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold cursor-pointer hover:opacity-90 shadow-2xs">
                    {isUploadingPhoto ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-3 w-3" />
                        <span>Upload Photo</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarFile}
                      disabled={isUploadingPhoto}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[10px] text-muted-foreground">PNG, JPG, WebP up to 5MB</span>
                </div>
              </div>

              {/* Gradient Options */}
              <div>
                <span className="text-[11px] font-semibold text-muted-foreground block mb-1.5">
                  Or select a student avatar style:
                </span>
                <div className="grid grid-cols-6 gap-2">
                  {GRADIENT_AVATARS.map((av) => (
                    <button
                      type="button"
                      key={av.id}
                      onClick={() => setAvatarUrl(av.id)}
                      className={`h-10 rounded-xl bg-gradient-to-tr ${av.bgClass} text-white font-bold text-xs flex items-center justify-center border-2 transition-transform ${
                        avatarUrl === av.id ? "border-primary scale-105" : "border-transparent"
                      }`}
                    >
                      {displayName ? displayName.charAt(0).toUpperCase() : "S"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Maher Bhatt"
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                  required
                />
              </div>

              {/* Academic Goal */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Current Semester Goal
                </label>
                <input
                  type="text"
                  value={academicGoal}
                  onChange={(e) => setAcademicGoal(e.target.value)}
                  placeholder="e.g. Ace Computer Architecture and clear MST with 90%+"
                  className="w-full h-10 px-3 rounded-xl border border-input bg-background text-xs font-medium focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="py-2.5 px-4 rounded-xl text-xs font-semibold text-muted-foreground hover:bg-secondary transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleComplete}
                disabled={isSubmitting}
                className="py-2.5 px-6 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2 apple-press"
              >
                {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                <span>Launch Dashboard</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
