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
  Instagram,
  Upload
} from 'lucide-react';
import { toast } from 'sonner';

const PRESET_AVATARS = [
  { id: 'av-1', label: 'Cyber Scholar', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
  { id: 'av-2', label: 'Code Ninja', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
  { id: 'av-3', label: 'AI Engineer', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
  { id: 'av-4', label: 'Quantum Dev', url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
  { id: 'av-5', label: 'University Grad', url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
  { id: 'av-6', label: 'Silicon Architect', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
];

export default function ProfilePage() {
  const { user, profile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { state: game, levelInfo, claimQuest } = useGamification();
  const { progress } = useProgress();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTierFilter, setActiveTierFilter] = useState<'all' | 'unlocked' | 'bronze' | 'silver' | 'gold' | 'legendary'>('all');

  const [displayName, setDisplayName] = useState(profile?.display_name || user?.email?.split('@')[0] || 'Maher Bhatt');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(profile?.avatar_url || null);
  const [bio, setBio] = useState(profile?.bio || 'Passionate engineering student preparing for Semester 3 University Exams at ITM SLS Baroda.');
  const [targetCgpa, setTargetCgpa] = useState(profile?.target_cgpa || '8.5+');
  const [goal, setGoal] = useState(profile?.goal || 'Ace Computer Architecture MST & master DSA Trees');

  // Keep state in sync when profile updates
  useEffect(() => {
    if (profile) {
      if (profile.display_name) setDisplayName(profile.display_name);
      if (profile.avatar_url) setAvatarUrl(profile.avatar_url);
      if (profile.bio) setBio(profile.bio);
      if (profile.target_cgpa) setTargetCgpa(profile.target_cgpa);
      if (profile.goal) setGoal(profile.goal);
    }
  }, [profile]);

  // Handle image upload from file picker
  const handleAvatarFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size must be less than 2MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setAvatarUrl(dataUrl);
      toast.success('Photo chosen! Click "Save Profile" to apply.');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        display_name: displayName,
        avatar_url: avatarUrl,
        bio,
        target_cgpa: targetCgpa,
        goal,
      });
      setIsEditing(false);
      toast.success('Profile details and photo updated successfully!');
    } catch (err) {
      console.error('Failed to update profile:', err);
      toast.error('Could not save profile changes.');
    } finally {
      setIsSaving(false);
    }
  };

  // Open the celebration modal for any unlocked achievement
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
    return true;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 animate-fade-in">
        {/* ── Top Hero Profile Card ── */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/40 to-background border border-border/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar Photo with Change Camera overlay */}
              <div className="relative group">
                {profile?.avatar_url || avatarUrl ? (
                  <img
                    src={profile?.avatar_url || avatarUrl || ''}
                    alt={displayName}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-md border-2 border-primary/50"
                  />
                ) : (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-primary to-blue-600 text-primary-foreground flex items-center justify-center font-black text-3xl sm:text-4xl shadow-md border-2 border-background">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                
                {/* Camera icon button to edit avatar directly */}
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
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
                    {displayName}
                  </h1>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                    Level {levelInfo.level} · {levelInfo.title}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5 mb-2 font-medium">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  ITM SLS Baroda University · B.Tech CSE · Semester 3
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
                <strong className="text-foreground">{game.xp} XP</strong> / {levelInfo.nextLevelXp} XP ({levelInfo.progressPercent}%)
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary via-indigo-500 to-amber-500 transition-all duration-700 ease-out"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Gamification Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Flame className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">{game.streakDays} Days</p>
                <p className="text-xs text-muted-foreground font-medium">Daily Study Streak</p>
              </div>
            </div>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">Active today 🔥</p>
          </div>

          <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">{Math.round((game.totalStudyMinutes / 60) * 10) / 10}h</p>
                <p className="text-xs text-muted-foreground font-medium">Total Focus Time</p>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground">{game.totalStudyMinutes} minutes spent</p>
          </div>

          <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">{progress.completedTopics.length}</p>
                <p className="text-xs text-muted-foreground font-medium">Completed Topics</p>
              </div>
            </div>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Syllabus mastering</p>
          </div>

          <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-black text-foreground">{unlockedCount} / {game.achievements.length}</p>
                <p className="text-xs text-muted-foreground font-medium">Badges Unlocked</p>
              </div>
            </div>
            <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">Academic achievements</p>
          </div>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Daily Quests, Pomodoro Timer & Expanded Badges */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Quests Widget */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold text-foreground">Today's Study Quests</h2>
                </div>
                <span className="text-xs text-muted-foreground font-medium">Resets at midnight</span>
              </div>

              <div className="space-y-3">
                {game.dailyQuests.map((quest) => {
                  const isDone = quest.current >= quest.target;
                  return (
                    <div
                      key={quest.id}
                      className="p-4 rounded-xl border border-border/60 bg-secondary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-sm text-foreground">{quest.title}</h4>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            +{quest.xpReward} XP
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{quest.description}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden max-w-[200px]">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${Math.min(100, Math.round((quest.current / quest.target) * 100))}%` }}
                            />
                          </div>
                          <span>
                            {quest.current} / {quest.target}
                          </span>
                        </div>
                      </div>

                      {quest.claimed ? (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" /> Claimed
                        </span>
                      ) : isDone ? (
                        <button
                          onClick={() => claimQuest(quest.id)}
                          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold shadow-sm transition-all animate-pulse"
                        >
                          Claim +{quest.xpReward} XP!
                        </button>
                      ) : (
                        <span className="text-xs font-medium text-muted-foreground">In Progress</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Pomodoro Focus Timer */}
            <PomodoroTimer />

            {/* ── Badges & Achievements (Expanded 24 Badges + 1-Click Story Sharing) ── */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    <h2 className="text-lg font-bold text-foreground">Badges & Hall of Fame</h2>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Click any unlocked badge to open the 1080x1920 Story Card & share to Instagram / WhatsApp!
                  </p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 self-start sm:self-auto">
                  {unlockedCount} / {game.achievements.length} Unlocked
                </span>
              </div>

              {/* Tier Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4 text-xs font-semibold">
                {[
                  { id: 'all', label: `All (${game.achievements.length})` },
                  { id: 'unlocked', label: `Unlocked (${unlockedCount})` },
                  { id: 'bronze', label: 'Bronze' },
                  { id: 'silver', label: 'Silver' },
                  { id: 'gold', label: 'Gold' },
                  { id: 'legendary', label: 'Legendary' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTierFilter(tab.id as typeof activeTierFilter)}
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
                              ach.tier === 'legendary'
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

                      {/* Card Footer: XP & Share Action */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs">
                        <span className="font-bold text-amber-600 dark:text-amber-400 text-[11px]">
                          +{ach.xpReward} XP
                        </span>

                        {isUnlocked ? (
                          <div className="flex items-center gap-1.5 text-primary font-bold text-[11px] group-hover:underline">
                            <Share2 className="h-3 w-3" />
                            <span>Share Story Card</span>
                          </div>
                        ) : (
                          <span className="text-[10px] text-muted-foreground italic">
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
                    Bachelor of Technology (CSE)<br />
                    ITM SLS Baroda University
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
                      <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0 ml-1" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground py-4 text-center">
                  No topics bookmarked yet. Click the bookmark icon on any topic page!
                </p>
              )}
            </div>

            {/* Quick Links */}
            <div className="bg-secondary/20 border border-border/60 rounded-2xl p-5 text-xs space-y-2">
              <p className="font-bold text-foreground mb-2">Need Exam Materials?</p>
              <Link
                to="/materials"
                className="flex items-center justify-between p-2 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors font-medium text-foreground"
              >
                <span>Browse Materials Library</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
              <Link
                to="/imp-questions"
                className="flex items-center justify-between p-2 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors font-medium text-foreground"
              >
                <span>Solved IMP Question Banks</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
              <Link
                to="/calculator"
                className="flex items-center justify-between p-2 rounded-lg bg-card border border-border hover:border-primary/40 transition-colors font-medium text-foreground"
              >
                <span>ITM SGPA & CGPA Predictor</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* ── Comprehensive Edit Profile & Photo Modal ── */}
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
              Customize your profile details. Changes will reflect on your account, header, and Instagram/WhatsApp achievement story cards.
            </p>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Profile Photo / Avatar Selector */}
              <div>
                <label className="text-xs font-bold text-foreground block mb-2">
                  Profile Photo / Avatar
                </label>

                <div className="flex items-center gap-4 mb-3">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar Preview"
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-primary shadow"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center font-bold text-white text-2xl border-2 border-primary/50 shadow">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold cursor-pointer hover:opacity-90 shadow-xs">
                      <Upload className="h-3.5 w-3.5" />
                      <span>Upload from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[10px] text-muted-foreground">PNG, JPG, WebP up to 2MB</span>
                  </div>
                </div>

                {/* Preset Avatars */}
                <div>
                  <span className="text-[11px] font-semibold text-muted-foreground block mb-2">
                    Or choose a preset student avatar:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {PRESET_AVATARS.map((av) => (
                      <button
                        type="button"
                        key={av.id}
                        onClick={() => setAvatarUrl(av.url)}
                        title={av.label}
                        className={`w-11 h-11 rounded-xl overflow-hidden border-2 shrink-0 transition-transform ${
                          avatarUrl === av.url ? 'border-primary ring-2 ring-primary/40 scale-105' : 'border-border/60 hover:border-primary/60'
                        }`}
                      >
                        <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Display Name */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Student Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Maher Bhatt"
                  required
                />
              </div>

              {/* Bio / Status */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Bio / Academic Status
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  className="w-full p-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your learning status..."
                />
              </div>

              {/* Target CGPA */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Target CGPA
                </label>
                <input
                  type="text"
                  value={targetCgpa}
                  onChange={(e) => setTargetCgpa(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. 8.5+ or 9.0"
                />
              </div>

              {/* Academic Goal */}
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Current Major Exam Goal
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="e.g. Ace Computer Architecture MST"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
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
                  className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow hover:opacity-90 disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Profile'}
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
