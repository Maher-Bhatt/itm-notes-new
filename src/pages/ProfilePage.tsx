// @ts-nocheck
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification, Achievement } from '@/hooks/useGamification';
import { useProgress } from '@/hooks/useProgress';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { 
  Award, 
  Flame, 
  Clock, 
  BookOpen, 
  Sparkles, 
  CheckCircle, 
  Bookmark, 
  Edit3, 
  GraduationCap, 
  Trophy, 
  Target, 
  ChevronRight, 
  Camera, 
  X,
  Share2,
  Upload,
  Copy,
  Check,
  Zap,
  HelpCircle,
  Loader2,
  FileCheck2,
  IdCard
} from 'lucide-react';
import { toast } from 'sonner';

export interface GradientAvatar {
  id: string;
  label: string;
  bgClass: string;
}

export const GRADIENT_AVATARS: GradientAvatar[] = [
  { id: 'grad-indigo', label: 'Cosmic Indigo', bgClass: 'from-indigo-600 via-purple-600 to-pink-500' },
  { id: 'grad-emerald', label: 'Matrix Emerald', bgClass: 'from-emerald-500 via-teal-600 to-cyan-700' },
  { id: 'grad-solar', label: 'Solar Flare', bgClass: 'from-amber-500 via-orange-600 to-rose-600' },
  { id: 'grad-cyber', label: 'Cyber Violet', bgClass: 'from-fuchsia-600 via-purple-700 to-indigo-900' },
  { id: 'grad-ocean', label: 'Deep Ocean', bgClass: 'from-blue-600 via-cyan-600 to-teal-500' },
  { id: 'grad-midnight', label: 'Midnight Slate', bgClass: 'from-zinc-800 via-slate-800 to-neutral-900' },
];

export const renderAvatarBox = (url: string | null | undefined, name: string, sizeClass = "w-20 h-20 text-3xl") => {
  if (url && (url.startsWith('data:image') || url.startsWith('http'))) {
    return (
      <img
        src={url}
        alt={name}
        className={`${sizeClass} rounded-2xl object-cover shadow-md border-2 border-primary/50 bg-secondary`}
      />
    );
  }
  const matched = GRADIENT_AVATARS.find(g => g.id === url || url?.includes(g.id));
  const gradientClass = matched ? matched.bgClass : 'from-indigo-600 via-purple-600 to-pink-500';
  const initial = name?.trim() ? name.trim().charAt(0).toUpperCase() : 'S';

  return (
    <div className={`${sizeClass} rounded-2xl bg-gradient-to-tr ${gradientClass} text-white flex items-center justify-center font-black shadow-md border-2 border-background/60 select-none`}>
      {initial}
    </div>
  );
};

export default function ProfilePage() {
  const { user, profile, role, updateProfile, uploadAvatar } = useAuth();
  const navigate = useNavigate();
  const { state: game, levelInfo, unlockAchievement } = useGamification();
  const { progress } = useProgress();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [activeTierFilter, setActiveTierFilter] = useState<'all' | 'unlocked' | 'bronze' | 'silver' | 'gold' | 'legendary' | 'mythic'>('all');

  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [program, setProgram] = useState('B.Tech');
  const [branch, setBranch] = useState("B.Tech CSE '26");
  const [semester, setSemester] = useState(3);
  const [enrollmentNo, setEnrollmentNo] = useState('');
  const [targetCgpa, setTargetCgpa] = useState('8.5+');
  const [goal, setGoal] = useState('');

  // Keep state in sync when profile updates
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || user?.email?.split('@')[0] || 'Student');
      setAvatarUrl(profile.avatar_url || null);
      setBio(profile.bio || 'ITM SLS Baroda University student');
      setProgram(profile.program || 'B.Tech');
      setBranch(profile.branch || "Computer Science & Engineering");
      setSemester(profile.semester || 3);
      setEnrollmentNo(profile.enrollment_no || '');
      setTargetCgpa(profile.target_cgpa || '8.5+');
      setGoal(profile.goal || 'Master University curriculum and excel in semester exams');
    } else if (user) {
      setDisplayName(user.email?.split('@')[0] || 'Student');
    }
  }, [profile, user]);

  // Genuine Subject Quiz Scores from localStorage (no fake defaults!)
  const [quizScores] = useState<{ id: string; subjectId: string; subjectName: string; score: number; total: number; percentage: number; timestamp: string }[]>(() => {
    try {
      const raw = localStorage.getItem('itm_quiz_scores');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  const handleCopyStudyStats = () => {
    const text = `🎓 ITM Notes Student Passport\n👤 Student: ${displayName}\n🏆 Rank: Level ${levelInfo.level} (${levelInfo.title})\n✨ Total XP: ${game.xp} XP\n🔥 Study Streak: ${game.streakDays} Days\n⏱️ Focus Time: ${Math.round((game.totalStudyMinutes / 60) * 10) / 10} Hours\n🎯 Target CGPA: ${targetCgpa}\n📚 Completed Topics: ${progress.completedTopics.length}\n🌐 Portal: https://itm-notes-new.vercel.app`;
    navigator.clipboard.writeText(text);
    toast.success('Study Stats summary copied to clipboard! Ready to share.');
  };

  // Admin God Mode Unlocker
  useEffect(() => {
    if (role === 'admin') {
      const adminAch = game.achievements.find(a => a.id === 'admin-god-mode');
      if (adminAch && !adminAch.unlockedAt) {
        unlockAchievement('admin-god-mode');
      }
    }
  }, [role, game.achievements, unlockAchievement]);

  // Handle direct image file upload to Supabase Storage
  const handleAvatarFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const uploadedUrl = await uploadAvatar(file);
      setAvatarUrl(uploadedUrl);
      toast.success('Profile photo uploaded and saved successfully to database!');
    } catch (err: any) {
      console.error('Failed to upload avatar:', err);
      toast.error(err.message || 'Could not upload photo. Please try a different image.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        display_name: displayName,
        avatar_url: avatarUrl,
        bio,
        program,
        branch,
        semester,
        enrollment_no: enrollmentNo,
        target_cgpa: targetCgpa,
        goal,
      });
      setIsEditing(false);
      toast.success('Profile details saved to database successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error('Could not save profile changes to database.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAchievementStory = (ach: Achievement) => {
    window.dispatchEvent(
      new CustomEvent('itm_achievement_unlocked', {
        detail: {
          achievement: ach,
          xp: game.xp,
          totalXp: game.xp,
          streakDays: game.streakDays,
          level: levelInfo.level,
          levelTitle: levelInfo.title,
          isReplay: true,
        },
      })
    );
  };

  const unlockedCount = game.achievements.filter((a) => a.unlockedAt).length;

  const filteredAchievements = game.achievements.filter((ach) => {
    if (activeTierFilter === 'unlocked') return !!ach.unlockedAt;
    if (activeTierFilter === 'bronze') return ach.tier === 'bronze';
    if (activeTierFilter === 'silver') return ach.tier === 'silver';
    if (activeTierFilter === 'gold') return ach.tier === 'gold';
    if (activeTierFilter === 'legendary') return ach.tier === 'legendary';
    if (activeTierFilter === 'mythic') return ach.tier === 'mythic';
    return true;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
        {/* Top Hero Profile Card */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/40 to-background border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar Photo with Change Camera overlay */}
              <div className="relative group">
                {renderAvatarBox(profile?.avatar_url || avatarUrl, displayName, "w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-2xl sm:text-3xl lg:text-4xl")}
                
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute inset-0 bg-black/40 text-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Change Profile Photo"
                >
                  <Camera className="h-6 w-6" />
                </button>

                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white rounded-full p-1.5 shadow" title="Rank Badge">
                  <Flame className="h-4 w-4" />
                </div>
              </div>

              {/* Student Details */}
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-foreground">
                    {displayName}
                  </h1>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                    Level {levelInfo.level} • {levelInfo.title}
                  </span>
                  {enrollmentNo && (
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border">
                      ID: {enrollmentNo}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground flex flex-wrap items-center gap-1.5 mb-2 font-medium">
                  <GraduationCap className="h-4 w-4 text-primary shrink-0" />
                  <span>ITM (SLS) Baroda University</span>
                  <span>•</span>
                  <span>{program} {branch}</span>
                  <span>•</span>
                  <span className="font-bold text-primary">Semester {semester}</span>
                </p>

                <p className="text-xs text-muted-foreground max-w-lg leading-relaxed">
                  {bio}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs transition-colors apple-press"
              >
                <Edit3 className="h-4 w-4" /> Edit Profile & Photo
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-sm hover:opacity-90 transition-opacity apple-press"
              >
                <BookOpen className="h-4 w-4" /> My Dashboard
              </button>
            </div>
          </div>

          {/* Level Progress Bar */}
          <div className="mt-8 pt-6 border-t border-border/60">
            <div className="flex items-center justify-between text-xs font-semibold mb-2">
              <span className="text-foreground flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-amber-500" />
                Rank Progress: <span className="text-primary font-bold">{levelInfo.title}</span>
              </span>
              <span className="text-muted-foreground">
                <strong className="text-foreground">{game.xp} XP</strong> / {levelInfo.maxXp} XP ({levelInfo.progressPercent}%)
              </span>
            </div>
            <div className="h-2.5 w-full bg-secondary/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-amber-500 transition-all duration-700 ease-out rounded-full"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* 2-Column Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Achievements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Real Stats Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-xs">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Flame className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Streak</span>
                </div>
                <p className="text-2xl font-black text-foreground font-mono">{game.streakDays}d</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Consecutive active</p>
              </div>

              <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-xs">
                <div className="flex items-center gap-2 text-amber-500 mb-1">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total XP</span>
                </div>
                <p className="text-2xl font-black text-foreground font-mono">{game.xp}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Earned from study</p>
              </div>

              <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-xs">
                <div className="flex items-center gap-2 text-blue-500 mb-1">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mastered</span>
                </div>
                <p className="text-2xl font-black text-foreground font-mono">{progress.completedTopics.length}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Syllabus topics</p>
              </div>

              <div className="bg-card border border-border/80 rounded-2xl p-4 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-500 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Focus</span>
                </div>
                <p className="text-2xl font-black text-foreground font-mono">
                  {Math.round((game.totalStudyMinutes / 60) * 10) / 10}h
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">Pomodoro logged</p>
              </div>
            </div>

            {/* Pomodoro Focus Station */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Deep Focus Workstation</h2>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  Official 25/5 Pomodoro Cycle
                </span>
              </div>
              <PomodoroTimer />
            </div>

            {/* Real Subject Quiz Breakdown */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Subject Quiz Performance</h2>
                </div>
                <Link to="/quiz" className="text-xs text-primary font-semibold hover:underline">
                  Take a Quiz →
                </Link>
              </div>

              {quizScores.length === 0 ? (
                <div className="text-center py-8 rounded-xl border border-dashed border-border/70 p-6 bg-secondary/10">
                  <Award className="h-10 w-10 mx-auto mb-2 text-muted-foreground/40" />
                  <p className="text-sm font-semibold text-foreground">No practice quizzes completed yet</p>
                  <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                    Take practice quizzes on syllabus topics to track your subject-by-subject accuracy scores here.
                  </p>
                  <Link
                    to="/quiz"
                    className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity"
                  >
                    Start Practice Quiz <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {quizScores.map((q) => (
                    <div key={q.id} className="p-3.5 rounded-xl border border-border/60 bg-secondary/20 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm text-foreground truncate">{q.subjectName}</h4>
                        <p className="text-xs text-muted-foreground">
                          Score: <strong className="text-foreground">{q.score}</strong> / {q.total} questions
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <div className="w-24 sm:w-32 h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              q.percentage >= 80 ? 'bg-emerald-500' : q.percentage >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${q.percentage}%` }}
                          />
                        </div>
                        <span className={`text-xs font-mono font-bold ${
                          q.percentage >= 80 ? 'text-emerald-500' : q.percentage >= 60 ? 'text-amber-500' : 'text-rose-500'
                        }`}>
                          {q.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Badges & Achievements */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <h2 className="text-lg font-bold text-foreground">Badges & Hall of Fame</h2>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Real persistent achievements synced with your university student profile.
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 self-start sm:self-auto">
                  {unlockedCount} / {game.achievements.length} Unlocked
                </span>
              </div>

              {/* Tier Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 text-xs font-semibold -mx-4 px-4 sm:mx-0 sm:px-0">
                {[
                  { id: 'all', label: `All (${game.achievements.length})` },
                  { id: 'unlocked', label: `Unlocked (${unlockedCount})` },
                  { id: 'bronze', label: 'Bronze' },
                  { id: 'silver', label: 'Silver' },
                  { id: 'gold', label: 'Gold' },
                  { id: 'legendary', label: 'Legendary' },
                  { id: 'mythic', label: 'Mythic' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTierFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all border ${
                      activeTierFilter === tab.id
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-secondary/40 text-muted-foreground hover:text-foreground border-border/60 hover:bg-secondary'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Achievement Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredAchievements.map((ach) => {
                  const isUnlocked = !!ach.unlockedAt;
                  return (
                    <div
                      key={ach.id}
                      onClick={() => isUnlocked && handleOpenAchievementStory(ach)}
                      className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 relative ${
                        isUnlocked
                          ? 'border-amber-500/50 bg-gradient-to-br from-amber-500/5 to-card shadow-sm hover:border-amber-500 hover:shadow-md cursor-pointer group'
                          : 'border-border/40 bg-secondary/10 opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl shrink-0 mt-0.5">{ach.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <h4 className="font-bold text-sm text-foreground truncate">{ach.title}</h4>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              ach.tier === 'mythic'
                                ? 'bg-rose-500/20 text-rose-500 border border-rose-500/30'
                                : ach.tier === 'legendary'
                                ? 'bg-purple-600/20 text-purple-600 border border-purple-500/30'
                                : ach.tier === 'gold'
                                ? 'bg-amber-500/20 text-amber-600 border border-amber-500/30'
                                : ach.tier === 'silver'
                                ? 'bg-zinc-400/20 text-zinc-600 dark:text-zinc-300 border border-zinc-400/30'
                                : 'bg-amber-700/20 text-amber-700 border border-amber-700/30'
                            }`}>
                              {ach.tier}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-snug">{ach.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px]">
                        <span className="font-bold text-amber-500 font-mono">+{ach.xpReward} XP</span>
                        {isUnlocked ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle className="h-3 w-3" /> Unlocked
                          </span>
                        ) : (
                          <span className="text-muted-foreground flex items-center gap-1">
                            Locked
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Academic Goals & Bookmarks */}
          <div className="space-y-6">
            {/* Study Stats Share Card */}
            <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-indigo-950 border border-primary/40 rounded-2xl p-6 shadow-xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest font-black text-primary px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                  ITM Academic Passport
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">{program} {branch}</span>
              </div>

              <div className="flex items-center gap-3.5 mb-5">
                {renderAvatarBox(profile?.avatar_url || avatarUrl, displayName, "w-14 h-14 text-2xl")}
                <div className="min-w-0">
                  <h4 className="font-extrabold text-base text-white truncate">{displayName}</h4>
                  <p className="text-xs text-indigo-300 font-medium">Level {levelInfo.level} • {levelInfo.title}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 mb-4 text-xs">
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">Total XP</span>
                  <span className="font-black text-amber-400 font-mono text-sm">{game.xp} XP</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">Streak</span>
                  <span className="font-black text-rose-400 font-mono text-sm">🔥 {game.streakDays} Days</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">Target CGPA</span>
                  <span className="font-black text-emerald-400 font-mono text-sm">{targetCgpa}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">Completed</span>
                  <span className="font-black text-cyan-400 font-mono text-sm">{progress.completedTopics.length} Topics</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyStudyStats}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md apple-press"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Share Study Stats</span>
              </button>
            </div>

            {/* Student Targets */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">
                Academic Targets
              </h3>
              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-muted-foreground block mb-1">Target Semester GPA:</span>
                  <span className="font-bold text-base text-foreground">{targetCgpa}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block mb-1">Current Major Exam Goal:</span>
                  <p className="font-semibold text-foreground leading-relaxed">{goal}</p>
                </div>
                <div className="pt-3 border-t border-border/60">
                  <span className="text-muted-foreground block mb-1">Program & University:</span>
                  <span className="font-medium text-foreground">
                    {program} ({branch})<br />
                    ITM (SLS) Baroda University
                  </span>
                </div>
              </div>
            </div>

            {/* Bookmarked Topics */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <h3 className="font-bold text-sm text-foreground">
                    Saved Topics ({progress.bookmarkedTopics.length})
                  </h3>
                </div>
                <Link to="/bookmarks" className="text-xs text-primary font-semibold hover:underline">
                  View All
                </Link>
              </div>

              {progress.bookmarkedTopics.length > 0 ? (
                <div className="space-y-2">
                  {progress.bookmarkedTopics.slice(0, 4).map((topicId) => (
                    <div
                      key={topicId}
                      className="p-2.5 rounded-lg bg-secondary/40 text-xs font-medium text-foreground truncate flex items-center justify-between"
                    >
                      <span className="truncate">{topicId}</span>
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-2" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground py-2">
                  No bookmarks yet. Bookmark key topics while studying for quick exam revision.
                </p>
              )}
            </div>

            {/* Academic Tools Quick Links */}
            <div className="space-y-2 text-xs">
              <Link
                to="/materials"
                className="flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors font-medium text-foreground"
              >
                <span>Browse Exam Question Banks & Notes</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
              <Link
                to="/calculator"
                className="flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors font-medium text-foreground"
              >
                <span>ITM Attendance & SGPA Calculator</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Profile & Photo Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-card border border-border rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-auto">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-secondary text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-lg font-bold text-foreground mb-1">Edit Student Profile & Photo</h2>
            <p className="text-xs text-muted-foreground mb-5">
              Customize your profile details. Changes are saved directly to your university account.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Profile Photo / Avatar Selector */}
              <div>
                <label className="text-xs font-bold text-foreground block mb-2">
                  Profile Photo / Avatar
                </label>

                <div className="flex items-center gap-4 mb-3">
                  {renderAvatarBox(avatarUrl, displayName, "w-16 h-16 text-2xl")}

                  <div className="flex flex-col gap-1.5">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold cursor-pointer hover:opacity-90 shadow-xs">
                      {isUploadingPhoto ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Uploading...</span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-3.5 w-3.5" />
                          <span>Upload Photo to Cloud</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileUpload}
                        disabled={isUploadingPhoto}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[10px] text-muted-foreground">PNG, JPG, WebP up to 5MB (stored securely in database)</span>
                  </div>
                </div>

                {/* Preset Gradient Avatars */}
                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground block mb-2">
                    Or choose a gradient avatar:
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {GRADIENT_AVATARS.map((av) => (
                      <button
                        type="button"
                        key={av.id}
                        onClick={() => setAvatarUrl(av.id)}
                        title={av.label}
                        className={`h-11 rounded-xl bg-gradient-to-tr ${av.bgClass} text-white font-black text-sm flex items-center justify-center border-2 transition-transform ${
                          avatarUrl === av.id ? 'border-primary ring-2 ring-primary/40 scale-105' : 'border-transparent hover:scale-102'
                        }`}
                      >
                        {displayName ? displayName.charAt(0).toUpperCase() : 'S'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your full name"
                  required
                />
              </div>

              {/* Academic Details: Program, Branch, Semester, Enrollment No */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Program / Degree
                  </label>
                  <select
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="B.Tech">B.Tech</option>
                    <option value="BCA">BCA</option>
                    <option value="MCA">MCA</option>
                    <option value="Diploma">Diploma Engineering</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Branch / Specialization
                  </label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. Computer Science & Engineering"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Current Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>Semester {s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    University Enrollment No (Optional)
                  </label>
                  <input
                    type="text"
                    value={enrollmentNo}
                    onChange={(e) => setEnrollmentNo(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. 23010101001"
                  />
                </div>
              </div>

              {/* Bio / Status */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Bio / Student Status
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  className="w-full p-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell peers what you are preparing for..."
                />
              </div>

              {/* Target CGPA & Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Target CGPA
                  </label>
                  <input
                    type="text"
                    value={targetCgpa}
                    onChange={(e) => setTargetCgpa(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. 9.0+"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">
                    Exam / Career Goal
                  </label>
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g. Score 90%+ in MST"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg bg-secondary text-foreground text-xs font-semibold hover:bg-secondary/80"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:opacity-90 disabled:opacity-50"
                >
                  {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
