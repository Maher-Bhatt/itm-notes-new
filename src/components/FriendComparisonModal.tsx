import { useMemo } from 'react';
import { X, Trophy, Flame, Zap, Shield, CheckCircle2, Award, Share2, Sparkles, User, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { ClassmateProfile } from '@/data/communityData';
import { useGamification } from '@/hooks/useGamification';
import { useAuth } from '@/contexts/AuthContext';

interface FriendComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  friend: ClassmateProfile | null;
  isFriend?: boolean;
  onToggleFriend?: (friendId: string) => void;
}

export function FriendComparisonModal({
  isOpen,
  onClose,
  friend,
  isFriend = false,
  onToggleFriend,
}: FriendComparisonModalProps) {
  const { user, profile } = useAuth();
  const { state: game, levelInfo } = useGamification();

  // Calculate current user's attendance percentage from local storage if available
  const userAttendancePercent = useMemo(() => {
    try {
      const raw = localStorage.getItem('itm_attendance_records');
      if (raw) {
        const records = JSON.parse(raw);
        if (Array.isArray(records) && records.length > 0) {
          const totalAttended = records.reduce((acc: number, r: any) => acc + (Number(r.attended) || 0), 0);
          const totalConducted = records.reduce((acc: number, r: any) => acc + (Number(r.total) || 0), 0);
          if (totalConducted > 0) {
            return Math.round((totalAttended / totalConducted) * 100);
          }
        }
      }
    } catch {
      // fallback
    }
    return 85;
  }, []);

  const userStats = useMemo(() => {
    const unlockedBadges = game.achievements.filter((a) => a.unlockedAt !== null).length;
    return {
      name: profile?.display_name || user?.email?.split('@')[0] || (user ? 'You' : 'Guest Student'),
      avatar: profile?.avatar_url,
      branch: "B.Tech CSE '26",
      level: levelInfo.level,
      levelTitle: levelInfo.title,
      xp: game.xp,
      streakDays: game.streakDays,
      attendancePercent: userAttendancePercent,
      badgesCount: unlockedBadges,
      topicsCompleted: game.topicsReadCount,
    };
  }, [profile, user, game, levelInfo, userAttendancePercent]);

  if (!isOpen || !friend) return null;

  const handleShareComparison = () => {
    const shareUrl = `${window.location.origin}/community`;
    const text = `🎓 Campus Study Rivalry on ITM Notes!\n${userStats.name} (Lvl ${userStats.level} · ${userStats.xp} XP) vs ${friend.name} (Lvl ${friend.level} · ${friend.xp} XP).\nWho has the best 75% attendance and study streak? Check it out: ${shareUrl}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      toast.success('Comparison summary copied to clipboard!', {
        description: 'Paste it on WhatsApp or Instagram to challenge your classmate.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-card border border-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="relative p-5 sm:p-6 bg-secondary/40 border-b border-border">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors apple-press"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-primary/20 text-primary">
              <Trophy className="h-4 w-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Head-to-Head Study Comparison</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 mt-1">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground">Classmate Rivalry & Stats</h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Compare your curriculum progress, attendance buffer, and XP rank side-by-side.
              </p>
            </div>
            {onToggleFriend && user && (
              <button
                type="button"
                onClick={() => onToggleFriend(friend.id)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all apple-press shadow-2xs ${
                  isFriend
                    ? 'bg-secondary text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-border'
                    : 'bg-primary text-primary-foreground hover:opacity-90'
                }`}
              >
                {isFriend ? '✓ In Friends List' : '+ Add Study Friend'}
              </button>
            )}
          </div>
        </div>

        {/* Comparison Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 custom-scrollbar">
          {/* Profiles Row */}
          <div className="grid grid-cols-2 gap-3 sm:gap-6 text-center">
            {/* User Column */}
            <div className="p-3 sm:p-4 rounded-2xl bg-primary/5 border border-primary/20 flex flex-col items-center">
              <div className="relative mb-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl border-2 border-primary overflow-hidden shadow-inner">
                  {userStats.avatar ? (
                    <img src={userStats.avatar} alt="You" className="w-full h-full object-cover" />
                  ) : (
                    userStats.name.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground shadow">
                  You
                </span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-foreground truncate max-w-full">{userStats.name}</h3>
              <p className="text-[11px] text-muted-foreground">{userStats.branch}</p>
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <span>Lvl {userStats.level}</span> · <span className="truncate max-w-[100px]">{userStats.levelTitle}</span>
              </div>
            </div>

            {/* Friend Column */}
            <div className="p-3 sm:p-4 rounded-2xl bg-secondary/40 border border-border flex flex-col items-center">
              <div className="relative mb-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-xl border-2 border-border overflow-hidden shadow-inner">
                  {friend.avatar ? (
                    <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                  ) : (
                    friend.name.charAt(0).toUpperCase()
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary text-muted-foreground border shadow">
                  Peer
                </span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-foreground truncate max-w-full">{friend.name}</h3>
              <p className="text-[11px] text-muted-foreground">{friend.branch}</p>
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary text-foreground text-xs font-semibold">
                <span>Lvl {friend.level}</span> · <span className="truncate max-w-[100px]">{friend.levelTitle}</span>
              </div>
            </div>
          </div>

          {/* Metric Comparisons */}
          <div className="space-y-4">
            {/* Metric 1: Total XP */}
            <div className="p-3.5 rounded-xl bg-secondary/20 border border-border/70 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-foreground">
                <span className="flex items-center gap-1.5 text-primary">
                  <Zap className="h-4 w-4 fill-primary" /> Total Experience Points (XP)
                </span>
                <span className="font-mono">{userStats.xp} vs {friend.xp}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (userStats.xp / Math.max(userStats.xp, friend.xp, 1)) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] font-mono text-muted-foreground mt-1">{userStats.xp} XP</p>
                </div>
                <div>
                  <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-purple-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (friend.xp / Math.max(userStats.xp, friend.xp, 1)) * 100)}%` }}
                    />
                  </div>
                  <p className="text-[11px] font-mono text-muted-foreground mt-1 text-right">{friend.xp} XP</p>
                </div>
              </div>
            </div>

            {/* Metric 2: Attendance % (Crucial 75% rule!) */}
            <div className="p-3.5 rounded-xl bg-secondary/20 border border-border/70 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-foreground">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <Shield className="h-4 w-4" /> 75% Attendance Requirement Buffer
                </span>
                <span className="font-mono">{userStats.attendancePercent}% vs {friend.attendancePercent}%</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className={`p-2.5 rounded-lg border text-center ${userStats.attendancePercent >= 75 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-600'}`}>
                  <p className="text-base sm:text-lg font-black">{userStats.attendancePercent}%</p>
                  <p className="text-[10px] font-medium">{userStats.attendancePercent >= 75 ? '✅ Safe from Detain' : '⚠️ Below 75% Threshold'}</p>
                </div>
                <div className={`p-2.5 rounded-lg border text-center ${friend.attendancePercent >= 75 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-600'}`}>
                  <p className="text-base sm:text-lg font-black">{friend.attendancePercent}%</p>
                  <p className="text-[10px] font-medium">{friend.attendancePercent >= 75 ? '✅ Safe from Detain' : '⚠️ Below 75% Threshold'}</p>
                </div>
              </div>
            </div>

            {/* Metric 3: Study Streak */}
            <div className="p-3.5 rounded-xl bg-secondary/20 border border-border/70 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-foreground">
                <span className="flex items-center gap-1.5 text-amber-500">
                  <Flame className="h-4 w-4 fill-amber-500" /> Daily Study Consistency Streak
                </span>
                <span className="font-mono">{userStats.streakDays}d vs {friend.streakDays}d</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-2 rounded-lg bg-secondary/40 font-mono font-bold text-sm text-foreground">
                  🔥 {userStats.streakDays} Days Active
                </div>
                <div className="p-2 rounded-lg bg-secondary/40 font-mono font-bold text-sm text-foreground">
                  🔥 {friend.streakDays} Days Active
                </div>
              </div>
            </div>

            {/* Metric 4: Badges & Syllabus Mastery */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-secondary/30 border border-border/70 text-center">
                <Award className="h-4 w-4 text-primary mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Badges Earned</p>
                <p className="text-base font-bold text-foreground mt-0.5">{userStats.badgesCount} vs {friend.badgesCount}</p>
              </div>
              <div className="p-3 rounded-xl bg-secondary/30 border border-border/70 text-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mx-auto mb-1" />
                <p className="text-[10px] text-muted-foreground uppercase font-bold">Topics Finished</p>
                <p className="text-base font-bold text-foreground mt-0.5">{userStats.topicsCompleted} vs {friend.topicsCompleted}</p>
              </div>
            </div>
          </div>

          {/* Friend's Personal Status */}
          <div className="p-3.5 rounded-xl bg-secondary/30 border border-border text-xs text-muted-foreground italic">
            <span className="font-bold not-italic text-foreground">{friend.name}'s Note:</span> "{friend.statusQuote}"
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-secondary/20 border-t border-border flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs apple-press transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleShareComparison}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 apple-press transition-opacity shadow-sm"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Challenge on WhatsApp / Social</span>
          </button>
        </div>
      </div>
    </div>
  );
}
