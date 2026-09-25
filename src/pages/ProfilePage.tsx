import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/hooks/useGamification';
import { useProgress } from '@/hooks/useProgress';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { 
  User, 
  Award, 
  Flame, 
  Clock, 
  BookOpen, 
  Sparkles, 
  CheckCircle, 
  Bookmark, 
  Edit3, 
  Calendar, 
  GraduationCap, 
  Trophy, 
  Target, 
  ShieldCheck,
  ChevronRight,
  Zap,
  Save,
  X
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { state: game, levelInfo, claimQuest } = useGamification();
  const { progress } = useProgress();

  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(profile?.display_name || user?.email?.split('@')[0] || 'Maher Bhatt');
  const [bio, setBio] = useState('Passionate engineering student preparing for Semester 3 University Exams at ITM SLS Baroda.');
  const [targetCgpa, setTargetCgpa] = useState('8.5+');
  const [goal, setGoal] = useState('Ace Computer Architecture MST & master DSA Trees');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success('Profile details updated successfully!');
  };

  const unlockedCount = game.achievements.filter((a) => a.unlockedAt).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-10 animate-fade-in">
        {/* ── Top Hero Profile Card ── */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/40 to-background border border-border/80 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar */}
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-primary to-blue-600 text-primary-foreground flex items-center justify-center font-black text-3xl sm:text-4xl shadow-md border-2 border-background">
                  {displayName.charAt(0).toUpperCase()}
                </div>
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
                <Edit3 className="h-4 w-4" /> Edit Profile
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
                <p className="text-2xl font-black text-foreground">{Math.round(game.totalStudyMinutes / 60 * 10) / 10}h</p>
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
          {/* Left Column: Daily Quests & Pomodoro Timer */}
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

            {/* Achievements Showcase */}
            <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  <h2 className="text-lg font-bold text-foreground">Badges & Achievements</h2>
                </div>
                <span className="text-xs font-semibold text-primary">
                  {unlockedCount} Unlocked
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {game.achievements.map((ach) => {
                  const isUnlocked = !!ach.unlockedAt;
                  return (
                    <div
                      key={ach.id}
                      className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                        isUnlocked
                          ? 'border-amber-500/40 bg-amber-500/5 shadow-sm'
                          : 'border-border/40 bg-secondary/10 opacity-60'
                      }`}
                    >
                      <span className="text-2xl shrink-0 mt-0.5">{ach.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <h4 className="font-bold text-sm text-foreground truncate">{ach.title}</h4>
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">
                            +{ach.xpReward} XP
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-snug">{ach.description}</p>
                        {isUnlocked && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 block">
                            ✓ Unlocked
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
            </div>
          </div>
        </div>
      </main>

      {/* ── Edit Profile Modal ── */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsEditing(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-secondary text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-lg font-bold text-foreground mb-4">Edit Student Profile</h2>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Bio / Status
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={2}
                  className="w-full p-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Target CGPA
                </label>
                <input
                  type="text"
                  value={targetCgpa}
                  onChange={(e) => setTargetCgpa(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">
                  Current Academic Goal
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg bg-secondary text-foreground text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow"
                >
                  Save Profile
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
