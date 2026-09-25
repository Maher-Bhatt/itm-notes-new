import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'streak' | 'quiz' | 'time';
  unlockedAt: string | null;
  xpReward: number;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  xpReward: number;
  claimed: boolean;
}

export interface GamificationState {
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalStudyMinutes: number;
  topicsReadCount: number;
  quizzesCompletedCount: number;
  perfectQuizzesCount: number;
  pomodoroSessionsCount: number;
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  questDate: string;
  activityHistory: Record<string, number>; // date string -> minutes studied or topics read
}

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Complete your first topic notes.',
    icon: '🎯',
    category: 'learning',
    unlockedAt: null,
    xpReward: 50,
  },
  {
    id: 'streak-3',
    title: 'On Fire',
    description: 'Maintain a 3-day consecutive study streak.',
    icon: '🔥',
    category: 'streak',
    unlockedAt: null,
    xpReward: 100,
  },
  {
    id: 'quiz-master',
    title: 'Quiz Wizard',
    description: 'Score 100% on any topic practice quiz.',
    icon: '🧠',
    category: 'quiz',
    unlockedAt: null,
    xpReward: 80,
  },
  {
    id: 'focus-hero',
    title: 'Deep Focus',
    description: 'Complete a full 25-minute Pomodoro study session.',
    icon: '⏱️',
    category: 'time',
    unlockedAt: null,
    xpReward: 75,
  },
  {
    id: 'scholar-5',
    title: 'Curriculum Explorer',
    description: 'Complete 5 different academic topics.',
    icon: '📚',
    category: 'learning',
    unlockedAt: null,
    xpReward: 120,
  },
  {
    id: 'mst-survivor',
    title: 'MST Survival Champion',
    description: 'Review the Computer Architecture Survival Guide.',
    icon: '🏆',
    category: 'learning',
    unlockedAt: null,
    xpReward: 100,
  },
  {
    id: 'code-ninja',
    title: 'Code Ninja',
    description: 'Practice interactive code in the Coding Lab.',
    icon: '💻',
    category: 'learning',
    unlockedAt: null,
    xpReward: 60,
  },
  {
    id: 'level-5',
    title: 'Semester Elite',
    description: 'Reach Student Level 5.',
    icon: '👑',
    category: 'learning',
    unlockedAt: null,
    xpReward: 200,
  },
];

const INITIAL_QUESTS: DailyQuest[] = [
  {
    id: 'quest-read-2',
    title: 'Daily Scholar',
    description: 'Read 2 syllabus topics today',
    target: 2,
    current: 0,
    xpReward: 40,
    claimed: false,
  },
  {
    id: 'quest-quiz-1',
    title: 'Knowledge Check',
    description: 'Test yourself with 1 practice quiz',
    target: 1,
    current: 0,
    xpReward: 30,
    claimed: false,
  },
  {
    id: 'quest-study-15m',
    title: 'Focus Hour',
    description: 'Study for at least 15 minutes',
    target: 15,
    current: 0,
    xpReward: 50,
    claimed: false,
  },
];

export const LEVEL_TITLES = [
  { level: 1, title: 'Fresher Novice', minXp: 0, maxXp: 150 },
  { level: 2, title: 'Code Apprentice', minXp: 150, maxXp: 400 },
  { level: 3, title: 'Silicon Explorer', minXp: 400, maxXp: 800 },
  { level: 4, title: 'Algorithm Artisan', minXp: 800, maxXp: 1500 },
  { level: 5, title: 'Architecture Ace', minXp: 1500, maxXp: 2500 },
  { level: 6, title: 'Semester Master', minXp: 2500, maxXp: 4000 },
  { level: 7, title: 'Dean’s Scholar', minXp: 4000, maxXp: 6500 },
  { level: 8, title: 'University Legend', minXp: 6500, maxXp: 10000 },
];

const STORAGE_KEY = 'itm_notes_gamification_v2';

function getTodayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function useGamification() {
  const [state, setState] = useState<GamificationState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const today = getTodayString();
        // Reset quests if new day
        if (parsed.questDate !== today) {
          parsed.questDate = today;
          parsed.dailyQuests = INITIAL_QUESTS;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load gamification state:', e);
    }

    return {
      xp: 120, // Starting bonus
      level: 1,
      streakDays: 1,
      lastActiveDate: getTodayString(),
      totalStudyMinutes: 25,
      topicsReadCount: 2,
      quizzesCompletedCount: 1,
      perfectQuizzesCount: 1,
      pomodoroSessionsCount: 1,
      achievements: INITIAL_ACHIEVEMENTS,
      dailyQuests: INITIAL_QUESTS,
      questDate: getTodayString(),
      activityHistory: { [getTodayString()]: 25 },
    };
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save gamification state:', e);
    }
  }, [state]);

  // Compute Current Level details
  const levelInfo = useMemo(() => {
    let current = LEVEL_TITLES[0];
    for (const lvl of LEVEL_TITLES) {
      if (state.xp >= lvl.minXp) {
        current = lvl;
      }
    }
    const xpIntoLevel = state.xp - current.minXp;
    const levelRange = current.maxXp - current.minXp;
    const progressPercent = Math.min(100, Math.round((xpIntoLevel / levelRange) * 100));

    return {
      ...current,
      xpIntoLevel,
      levelRange,
      progressPercent,
      nextLevelXp: current.maxXp,
    };
  }, [state.xp]);

  // Check and update daily streak
  const checkDailyStreak = useCallback(() => {
    const today = getTodayString();
    setState((prev) => {
      if (prev.lastActiveDate === today) return prev;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

      let newStreak = prev.streakDays;
      if (prev.lastActiveDate === yesterdayStr) {
        newStreak += 1;
        toast.success(`🔥 Streak Maintained!`, {
          description: `You are on a ${newStreak}-day learning streak! +20 XP awarded.`,
        });
      } else {
        newStreak = 1;
      }

      return {
        ...prev,
        streakDays: newStreak,
        lastActiveDate: today,
        xp: prev.xp + 20,
      };
    });
  }, []);

  // Add XP with toast feedback and level-up check
  const addXp = useCallback((amount: number, reason: string) => {
    setState((prev) => {
      const newXp = prev.xp + amount;
      let newLevel = prev.level;

      for (const lvl of LEVEL_TITLES) {
        if (newXp >= lvl.minXp) newLevel = lvl.level;
      }

      if (newLevel > prev.level) {
        toast.success(`🎉 Level Up! You reached Level ${newLevel}!`, {
          description: `New Rank: ${LEVEL_TITLES.find((l) => l.level === newLevel)?.title || 'Scholar'}`,
        });
      } else {
        toast(`+${amount} XP: ${reason}`, {
          icon: '✨',
        });
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
      };
    });
  }, []);

  // Unlock an achievement
  const unlockAchievement = useCallback((achievementId: string) => {
    setState((prev) => {
      const ach = prev.achievements.find((a) => a.id === achievementId);
      if (!ach || ach.unlockedAt) return prev;

      const updated = prev.achievements.map((a) =>
        a.id === achievementId ? { ...a, unlockedAt: new Date().toISOString() } : a
      );

      toast.success(`🏆 Achievement Unlocked: ${ach.title}!`, {
        description: `${ach.description} (+${ach.xpReward} XP)`,
      });

      return {
        ...prev,
        achievements: updated,
        xp: prev.xp + ach.xpReward,
      };
    });
  }, []);

  // Record completed topic
  const recordTopicCompleted = useCallback(() => {
    const today = getTodayString();
    setState((prev) => {
      const count = prev.topicsReadCount + 1;
      const history = { ...prev.activityHistory };
      history[today] = (history[today] || 0) + 10;

      // Update quests
      const updatedQuests = prev.dailyQuests.map((q) =>
        q.id === 'quest-read-2' ? { ...q, current: Math.min(q.target, q.current + 1) } : q
      );

      return {
        ...prev,
        topicsReadCount: count,
        dailyQuests: updatedQuests,
        activityHistory: history,
      };
    });

    addXp(30, 'Topic Notes Read');
    unlockAchievement('first-step');
  }, [addXp, unlockAchievement]);

  // Record quiz completed
  const recordQuizCompleted = useCallback(
    (score: number, total: number) => {
      const isPerfect = score === total && total > 0;
      setState((prev) => {
        const updatedQuests = prev.dailyQuests.map((q) =>
          q.id === 'quest-quiz-1' ? { ...q, current: Math.min(q.target, q.current + 1) } : q
        );
        return {
          ...prev,
          quizzesCompletedCount: prev.quizzesCompletedCount + 1,
          perfectQuizzesCount: isPerfect ? prev.perfectQuizzesCount + 1 : prev.perfectQuizzesCount,
          dailyQuests: updatedQuests,
        };
      });

      const xpEarned = Math.round((score / total) * 40) + (isPerfect ? 20 : 0);
      addXp(xpEarned, `Quiz Score ${score}/${total}`);

      if (isPerfect) {
        unlockAchievement('quiz-master');
      }
    },
    [addXp, unlockAchievement]
  );

  // Record study time (minutes)
  const recordStudyTime = useCallback(
    (minutes: number) => {
      const today = getTodayString();
      setState((prev) => {
        const history = { ...prev.activityHistory };
        history[today] = (history[today] || 0) + minutes;

        const updatedQuests = prev.dailyQuests.map((q) =>
          q.id === 'quest-study-15m' ? { ...q, current: Math.min(q.target, q.current + minutes) } : q
        );

        return {
          ...prev,
          totalStudyMinutes: prev.totalStudyMinutes + minutes,
          dailyQuests: updatedQuests,
          activityHistory: history,
        };
      });

      const xp = Math.round(minutes * 2);
      addXp(xp, `${minutes} mins Focus Study`);
    },
    [addXp]
  );

  // Claim Daily Quest
  const claimQuest = useCallback(
    (questId: string) => {
      setState((prev) => {
        const quest = prev.dailyQuests.find((q) => q.id === questId);
        if (!quest || quest.claimed || quest.current < quest.target) return prev;

        const updated = prev.dailyQuests.map((q) => (q.id === questId ? { ...q, claimed: true } : q));

        toast.success(`🎁 Quest Completed: ${quest.title}!`, {
          description: `Claimed +${quest.xpReward} XP reward!`,
        });

        return {
          ...prev,
          dailyQuests: updated,
          xp: prev.xp + quest.xpReward,
        };
      });
    },
    []
  );

  return {
    state,
    levelInfo,
    checkDailyStreak,
    addXp,
    recordTopicCompleted,
    recordQuizCompleted,
    recordStudyTime,
    unlockAchievement,
    claimQuest,
  };
}
