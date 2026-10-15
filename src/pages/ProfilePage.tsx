import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  IdCard,
  Rocket,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  BarChart2
} from 'lucide-react';
import { toast } from 'sonner';
import { subjects, getAllTopicIds } from '@/data/subjects';
import { MAHER_CANONICAL_AVATAR, resolveAvatarUrl } from '@/components/UserAvatar';

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

export const renderAvatarBox = (url: string | null | undefined, name: string, sizeClass = "w-20 h-20 text-3xl", email?: string | null) => {
  let effectiveUrl = url;
  const isMaher = 
    email?.toLowerCase() === 'maherbhatt01@gmail.com' || 
    email?.toLowerCase() === 'maher@gmail.com' ||
    name?.toLowerCase().includes('maher');
  if (effectiveUrl && effectiveUrl.includes('photo-1535713875002-d1d0cf377fde')) {
    effectiveUrl = MAHER_CANONICAL_AVATAR;
  }
  if (isMaher && (!effectiveUrl || effectiveUrl.startsWith('grad-'))) {
    effectiveUrl = MAHER_CANONICAL_AVATAR;
  }

  if (effectiveUrl && (effectiveUrl.startsWith('data:image') || effectiveUrl.startsWith('http'))) {
    return (
      <img
        src={effectiveUrl}
        alt={name}
        className={`${sizeClass} rounded-2xl object-cover shadow-md border-2 border-primary/50 bg-secondary`}
      />
    );
  }
  const matched = GRADIENT_AVATARS.find(g => g.id === effectiveUrl || effectiveUrl?.includes(g.id));
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
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'coding' | 'quiz' | 'streak' | 'time' | 'learning'>('all');
  const [activeProfileTab, setActiveProfileTab] = useState<'achievements' | 'academic' | 'focus' | 'bookmarks'>('achievements');
  const [isBoostActive, setIsBoostActive] = useState(() => {
    try {
      const exp = localStorage.getItem('itm_xp_boost_expires');
      if (exp && Number(exp) > Date.now()) return true;
    } catch {}
    return true;
  });
  const [boostTimeLeft, setBoostTimeLeft] = useState<{ minutes: number; seconds: number } | null>(null);

  // Live countdown timer for 2x Knowledge Boost
  useEffect(() => {
    const checkBoostTimer = () => {
      try {
        const exp = localStorage.getItem('itm_xp_boost_expires');
        if (exp) {
          const diff = Number(exp) - Date.now();
          if (diff > 0) {
            setIsBoostActive(true);
            const m = Math.floor(diff / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            setBoostTimeLeft({ minutes: m, seconds: s });
            return;
          }
        }
      } catch {}
      setIsBoostActive(false);
      setBoostTimeLeft(null);
    };

    checkBoostTimer();
    const interval = setInterval(checkBoostTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleActivateBoost = () => {
    const expiresAt = Date.now() + 30 * 60 * 1000;
    try {
      localStorage.setItem('itm_xp_boost_expires', String(expiresAt));
    } catch {}
    setIsBoostActive(true);
    setBoostTimeLeft({ minutes: 30, seconds: 0 });
    unlockAchievement('boost-ignited');
    toast.success('⚡ 2x Knowledge Boost Activated! (+100% bonus XP for 30 minutes)');
  };

  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [program, setProgram] = useState('B.Tech');
  const [branch, setBranch] = useState("Computer Science & Engineering");
  const [semester, setSemester] = useState(1);
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
      setSemester(profile.semester || 1);
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
    } catch (e) {
      console.warn('Failed to load quiz history from localStorage:', e);
    }
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
    } catch (err: unknown) {
      console.error('Failed to upload avatar:', err);
      const msg = err instanceof Error ? err.message : 'Could not upload photo. Please try a different image.';
      toast.error(msg);
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
    if (activeTierFilter === 'unlocked' && !ach.unlockedAt) return false;
    if (activeTierFilter !== 'all' && activeTierFilter !== 'unlocked' && ach.tier !== activeTierFilter) return false;
    if (activeCategoryFilter !== 'all' && ach.category !== activeCategoryFilter) return false;
    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full animate-fade-in text-foreground">
        {/* Top Hero Profile Card */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/40 to-background border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar Photo with Change Camera overlay */}
              <div className="relative group">
                {renderAvatarBox(
                  resolveAvatarUrl(profile, user) || profile?.avatar_url || avatarUrl, 
                  displayName, 
                  "w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-2xl sm:text-3xl lg:text-4xl",
                  user?.email
                )}
                
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

        {/* Real Stats Metric Cards — Single Source of Truth */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
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

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-border/70 pb-3 mb-6 overflow-x-auto scrollbar-none font-display">
          {[
            { id: 'achievements', label: '🏆 Badges & Study Boost', count: `${unlockedCount}/${game.achievements.length}` },
            { id: 'academic', label: '📊 Academic Progress & CGPA', badge: '75% SAFE' },
            { id: 'focus', label: '⏱️ Deep Focus & Quizzes', count: `${quizScores.length} Quizzes` },
            { id: 'bookmarks', label: '🔖 Bookmarked Notes', count: `${progress.bookmarkedTopics.length}` },
          ].map((tab) => {
            const isActive = activeProfileTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveProfileTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#183F36] text-[#D6E85D] shadow-sm shadow-[#183F36]/30'
                    : 'bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                    isActive ? 'bg-[#D6E85D]/20 text-[#D6E85D]' : 'bg-background/80 text-muted-foreground'
                  }`}>
                    {tab.count}
                  </span>
                )}
                {tab.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: ACHIEVEMENTS & KNOWLEDGE BOOST */}
        {activeProfileTab === 'achievements' && (
          <div className="space-y-6 animate-fade-in">
            {/* ⚡ Active Knowledge Booster Hero Card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#183F36] via-[#12332C] to-[#0A1A16] border border-[#D6E85D]/50 p-5 sm:p-7 text-[#F5F1E8] shadow-2xl">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#D6E85D]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-[#D6E85D]/20 border border-[#D6E85D]/40 flex items-center justify-center text-[#D6E85D] shrink-0 shadow-inner">
                      <Rocket className="h-7 w-7 animate-pulse" />
                    </div>
                    {isBoostActive && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-[#183F36] animate-ping" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full font-display border ${
                        isBoostActive
                          ? 'bg-[#D6E85D] text-[#183F36] border-[#D6E85D] shadow-sm'
                          : 'bg-white/10 text-white border-white/20'
                      }`}>
                        {isBoostActive ? '⚡ 2.0x Boost Active' : '⚡ 2.0x Boost Ready'}
                      </span>
                      {boostTimeLeft ? (
                        <span className="text-xs text-[#D6E85D] font-mono font-bold bg-black/40 px-2 py-0.5 rounded-md border border-[#D6E85D]/30">
                          ⏱️ {boostTimeLeft.minutes}m {String(boostTimeLeft.seconds).padStart(2, '0')}s remaining
                        </span>
                      ) : (
                        <span className="text-xs text-[#A2BAAF] font-semibold">
                          Mid-Sem Sprint Mode
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-black text-[#F5F1E8] font-display">
                      Knowledge Booster & Academic XP Multiplier
                    </h3>
                    <p className="text-xs text-[#E8EDE4]/80 max-w-xl leading-relaxed">
                      Double XP (+100% bonus) is awarded across all curriculum unit notes, topic practice quizzes, and verified practicals in the University Coding Lab.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={handleActivateBoost}
                    className="px-5 py-3 rounded-2xl bg-[#D6E85D] hover:bg-[#C8DC47] text-[#183F36] font-extrabold text-xs shadow-lg shadow-[#D6E85D]/25 transition-all hover:scale-102 active:scale-98 flex items-center gap-2 cursor-pointer font-display"
                  >
                    <Zap className="h-4 w-4 fill-current" />
                    <span>{isBoostActive ? 'Extend 2x Boost (+30m)' : 'Activate 2x Boost (30m)'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyStudyStats}
                    className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-[#F5F1E8] border border-white/20 transition-all cursor-pointer shadow-md"
                    title="Share Academic Passport"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Badges & Achievements Grid */}
            <div className="bg-card border border-border/80 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <h2 className="text-xl font-bold text-foreground font-display">Badges & Hall of Fame</h2>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Click any unlocked badge to view and inspect your 3D Holographic Trophy & University Certificate.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-mono">
                    {unlockedCount} / {game.achievements.length} Unlocked
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono">
                    {game.achievements.filter(a => a.unlockedAt).reduce((acc, a) => acc + a.xpReward, 0)} XP Earned
                  </span>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-semibold scrollbar-none">
                {[
                  { id: 'all', label: 'All Categories', count: game.achievements.length },
                  { id: 'coding', label: '💻 Coding Lab', count: game.achievements.filter(a => a.category === 'coding').length },
                  { id: 'quiz', label: '🧠 Quizzes', count: game.achievements.filter(a => a.category === 'quiz').length },
                  { id: 'streak', label: '🔥 Streaks', count: game.achievements.filter(a => a.category === 'streak').length },
                  { id: 'time', label: '⏱️ Deep Focus', count: game.achievements.filter(a => a.category === 'time').length },
                  { id: 'learning', label: '📚 Curriculum', count: game.achievements.filter(a => a.category === 'learning').length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategoryFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all border cursor-pointer flex items-center gap-1.5 ${
                      activeCategoryFilter === tab.id
                        ? 'bg-[#183F36] text-[#D6E85D] border-[#D6E85D]/50 shadow-sm font-bold'
                        : 'bg-secondary/40 text-muted-foreground hover:text-foreground border-border/60 hover:bg-secondary'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className="text-[10px] opacity-75 font-mono">({tab.count})</span>
                  </button>
                ))}
              </div>

              {/* Tier Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs font-semibold scrollbar-none border-b border-border/60">
                {[
                  { id: 'all', label: `All Tiers (${game.achievements.length})` },
                  { id: 'unlocked', label: `Unlocked Only (${unlockedCount})` },
                  { id: 'bronze', label: 'Bronze' },
                  { id: 'silver', label: 'Silver' },
                  { id: 'gold', label: 'Gold' },
                  { id: 'legendary', label: 'Legendary' },
                  { id: 'mythic', label: 'Mythic' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTierFilter(tab.id as any)}
                    className={`px-3 py-1 rounded-lg whitespace-nowrap transition-all border cursor-pointer ${
                      activeTierFilter === tab.id
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs font-bold'
                        : 'bg-secondary/30 text-muted-foreground hover:text-foreground border-transparent hover:bg-secondary/60'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Achievement Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                {filteredAchievements.map((ach) => {
                  const isUnlocked = !!ach.unlockedAt;
                  const tierColors = {
                    mythic: 'border-[#D6E85D] bg-gradient-to-br from-[#183F36]/60 via-card to-card shadow-[0_0_25px_rgba(214,232,93,0.2)] ring-1 ring-[#D6E85D]/50',
                    legendary: 'border-purple-400 bg-gradient-to-br from-purple-500/20 via-card to-card shadow-[0_0_25px_rgba(168,85,247,0.2)] ring-1 ring-purple-500/40',
                    gold: 'border-[#D6E85D]/80 bg-gradient-to-br from-amber-500/20 via-card to-card shadow-[0_0_25px_rgba(245,158,11,0.2)] ring-1 ring-amber-500/40',
                    silver: 'border-slate-300 bg-gradient-to-br from-slate-300/15 via-card to-card ring-1 ring-slate-300/30',
                    bronze: 'border-[#E07A5F] bg-gradient-to-br from-[#E07A5F]/15 via-card to-card ring-1 ring-[#E07A5F]/30',
                  };

                  const tierBadges = {
                    mythic: 'bg-[#D6E85D]/20 text-[#D6E85D] border-[#D6E85D]/50 font-black',
                    legendary: 'bg-purple-600/20 text-purple-400 border-purple-500/50 font-black',
                    gold: 'bg-amber-500/20 text-amber-400 border-amber-500/50 font-black',
                    silver: 'bg-slate-400/20 text-slate-300 border-slate-400/50 font-black',
                    bronze: 'bg-[#E07A5F]/20 text-[#E07A5F] border-[#E07A5F]/50 font-black',
                  };

                  // Navigation target helper for locked achievements
                  const getUnlockTarget = () => {
                    switch (ach.category) {
                      case 'coding': return { label: 'Go to Coding Lab →', path: '/coding-lab' };
                      case 'quiz': return { label: 'Take Topic Quiz →', path: '/quiz' };
                      case 'learning': return { label: 'Explore Notes →', path: '/subjects' };
                      default: return null;
                    }
                  };

                  const targetAction = getUnlockTarget();

                  return (
                    <div
                      key={ach.id}
                      onClick={() => isUnlocked && handleOpenAchievementStory(ach)}
                      className={`p-5 rounded-3xl border transition-all flex flex-col justify-between gap-3.5 relative overflow-hidden ${
                        isUnlocked
                          ? `${tierColors[ach.tier]} hover:scale-[1.02] hover:-translate-y-1 cursor-pointer group shadow-xl`
                          : 'border-border/50 bg-secondary/20 opacity-70 hover:opacity-90'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        {/* 3D Medallion Emblem Thumbnail */}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-md relative ${
                          isUnlocked 
                            ? 'bg-black/40 border-2 border-white/20 group-hover:scale-110 transition-transform' 
                            : 'bg-secondary/40 grayscale border border-border/40'
                        }`}>
                          {ach.icon}
                          {isUnlocked && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#D6E85D] rounded-full border border-black animate-pulse" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <h4 className="font-bold text-sm text-foreground truncate group-hover:text-primary transition-colors font-display">
                              {ach.title}
                            </h4>
                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border font-display ${tierBadges[ach.tier]}`}>
                              {ach.tier}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-snug line-clamp-2">{ach.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border/40 text-[11px]">
                        <span className="font-black text-[#D6E85D] font-mono bg-[#183F36] px-2.5 py-1 rounded-lg border border-[#D6E85D]/30 shadow-xs">
                          +{ach.xpReward} XP
                        </span>

                        {isUnlocked ? (
                          <span className="text-[#D6E85D] font-black flex items-center gap-1 group-hover:underline font-display">
                            <Sparkles className="h-3.5 w-3.5" /> View 3D Trophy ↗
                          </span>
                        ) : targetAction ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(targetAction.path);
                            }}
                            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                          >
                            <span>{targetAction.label}</span>
                          </button>
                        ) : (
                          <span className="text-muted-foreground flex items-center gap-1 text-[11px] font-mono">
                            🔒 Locked
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACADEMIC PROGRESS & CGPA */}
        {activeProfileTab === 'academic' && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Row: Attendance Safeguard & CGPA Targets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 75% Attendance Safeguard */}
              <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                    <h3 className="font-bold text-sm text-foreground font-display">75% Attendance Safeguard</h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold border border-emerald-500/20 font-mono">
                    Criteria Met
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4">
                  <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    91%
                  </div>
                  <div className="space-y-0.5 min-w-0 flex-1">
                    <p className="text-xs font-bold text-foreground">Safe Attendance Margin</p>
                    <p className="text-[11px] text-muted-foreground">
                      You can safely miss up to <strong>8 more lectures</strong> without breaching the 75% university eligibility requirement.
                    </p>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Conducted: 48 classes</span>
                  <span>Attended: 44 classes</span>
                  <Link to="/calculator" className="text-primary hover:underline font-semibold">
                    Open Calculator →
                  </Link>
                </div>
              </div>

              {/* Target Academic CGPA */}
              <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <h3 className="font-bold text-sm text-foreground font-display">Academic Targets & Goals</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="text-xs text-primary hover:underline font-semibold cursor-pointer"
                  >
                    Edit Targets
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-secondary/30 border border-border/60 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Target SGPA:</span>
                    <span className="font-extrabold text-foreground text-sm font-mono">{targetCgpa}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Major Exam Focus:</span>
                    <span className="font-semibold text-foreground truncate max-w-[200px]">{goal}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-border/40">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="font-semibold text-foreground">{program} {branch}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span>SLS Baroda University</span>
                  <span className="font-mono">Semester {semester}</span>
                </div>
              </div>
            </div>

            {/* Semester 3 Core Syllabus Coverage Breakdown */}
            <div className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-foreground font-display">
                    Semester {semester} Core Syllabus Coverage
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Track your verified topic notes completion across all courses.
                  </p>
                </div>
                <Link to="/materials" className="text-xs text-primary font-semibold hover:underline">
                  All Materials →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {subjects.filter((s) => s.semester === semester).map((sub) => {
                  const allTopicIds = getAllTopicIds(sub.id);
                  const completedInSub = progress.completedTopics.filter((id) => allTopicIds.includes(id)).length;
                  const totalInSub = allTopicIds.length;
                  const pct = totalInSub > 0 ? Math.round((completedInSub / totalInSub) * 100) : 0;

                  return (
                    <div
                      key={sub.id}
                      className="p-4 rounded-xl border border-border/80 bg-secondary/20 hover:bg-secondary/40 transition-all flex flex-col justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                            {sub.code || "SUB"}
                          </span>
                          <span className="text-xs font-mono font-bold text-foreground">
                            {completedInSub} / {totalInSub} Topics
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-foreground">{sub.name}</h4>
                        <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                          {sub.units.length} Units · {sub.description || "Detailed syllabus notes"}
                        </p>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-[#D6E85D] rounded-full transition-all duration-500"
                            style={{ width: `${Math.max(5, pct)}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-muted-foreground">{pct}% Completed</span>
                          <Link to={`/subject/${sub.id}`} className="text-primary hover:underline font-bold">
                            View Units →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DEEP FOCUS WORKSTATION & QUIZZES */}
        {activeProfileTab === 'focus' && (
          <div className="space-y-6 animate-fade-in">
            {/* Pomodoro Focus Station */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground font-display">Deep Focus Workstation</h2>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">
                  Official 25/5 Pomodoro Cycle
                </span>
              </div>
              <PomodoroTimer />
            </div>

            {/* Subject Quiz Performance Breakdown */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground font-display">Subject Quiz Accuracy Scores</h2>
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
          </div>
        )}

        {/* TAB 4: SAVED BOOKMARKS */}
        {activeProfileTab === 'bookmarks' && (
          <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm space-y-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="h-5 w-5 text-amber-500 fill-amber-500" />
                <h3 className="font-bold text-base text-foreground font-display">
                  Saved Bookmarks ({progress.bookmarkedTopics.length})
                </h3>
              </div>
              <Link to="/bookmarks" className="text-xs text-primary font-semibold hover:underline">
                Manage All Bookmarks →
              </Link>
            </div>

            {progress.bookmarkedTopics.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {progress.bookmarkedTopics.map((topicId) => (
                  <div
                    key={topicId}
                    className="p-3 rounded-xl border border-border/70 bg-secondary/20 hover:bg-secondary/50 transition-colors flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Bookmark className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
                      <span className="font-semibold text-foreground truncate">{topicId}</span>
                    </div>
                    <Link
                      to="/imp-questions"
                      className="text-primary hover:underline font-bold text-[11px] shrink-0"
                    >
                      Review
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 rounded-xl border border-dashed border-border/70 bg-secondary/10">
                <Bookmark className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
                <p className="text-sm font-semibold text-foreground">No bookmarked topics yet</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                  Click the bookmark icon while reading syllabus topics or reviewing question banks to save them here.
                </p>
              </div>
            )}
          </div>
        )}

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
                  {renderAvatarBox(avatarUrl || resolveAvatarUrl(profile, user), displayName, "w-16 h-16 text-2xl", user?.email)}

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
    </div>
  );
}
