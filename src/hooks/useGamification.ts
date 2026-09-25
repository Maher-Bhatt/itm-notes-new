import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'legendary';
  category: 'learning' | 'streak' | 'quiz' | 'time' | 'coding';
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

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  // ─── LEARNING & SYLLABUS ───
  {
    id: 'first-step',
    title: 'First Step',
    description: 'Complete your first syllabus topic notes.',
    icon: '🎯',
    tier: 'bronze',
    category: 'learning',
    unlockedAt: null,
    xpReward: 50,
  },
  {
    id: 'scholar-5',
    title: 'Curriculum Explorer',
    description: 'Complete 5 different academic topics.',
    icon: '📚',
    tier: 'bronze',
    category: 'learning',
    unlockedAt: null,
    xpReward: 75,
  },
  {
    id: 'subject-specialist',
    title: 'Subject Specialist',
    description: 'Complete 15 syllabus topics across any subject.',
    icon: '🔬',
    tier: 'silver',
    category: 'learning',
    unlockedAt: null,
    xpReward: 150,
  },
  {
    id: 'century-scholar',
    title: 'Century Scholar',
    description: 'Master 50 in-depth topics and diagrams.',
    icon: '🏛️',
    tier: 'gold',
    category: 'learning',
    unlockedAt: null,
    xpReward: 300,
  },
  {
    id: 'syllabus-conqueror',
    title: 'Syllabus Conqueror',
    description: 'Master 100 curriculum topics across all engineering semesters.',
    icon: '👑',
    tier: 'legendary',
    category: 'learning',
    unlockedAt: null,
    xpReward: 500,
  },
  {
    id: 'mst-survivor',
    title: 'MST Survival Champion',
    description: 'Review the Computer Architecture Survival Guide & Cheat Sheet.',
    icon: '🛡️',
    tier: 'silver',
    category: 'learning',
    unlockedAt: null,
    xpReward: 100,
  },

  // ─── STREAKS & HABITS ───
  {
    id: 'streak-2',
    title: 'Spark Ignite',
    description: 'Maintain a 2-day consecutive study streak.',
    icon: '⚡',
    tier: 'bronze',
    category: 'streak',
    unlockedAt: null,
    xpReward: 50,
  },
  {
    id: 'streak-5',
    title: 'On Fire',
    description: 'Maintain a 5-day consecutive study streak.',
    icon: '🔥',
    tier: 'silver',
    category: 'streak',
    unlockedAt: null,
    xpReward: 120,
  },
  {
    id: 'streak-14',
    title: 'Unstoppable Force',
    description: 'Maintain a 14-day continuous study habit.',
    icon: '🌟',
    tier: 'gold',
    category: 'streak',
    unlockedAt: null,
    xpReward: 250,
  },
  {
    id: 'streak-30',
    title: 'Exam Immortal',
    description: 'Maintain an elite 30-day non-stop study streak.',
    icon: '💎',
    tier: 'legendary',
    category: 'streak',
    unlockedAt: null,
    xpReward: 500,
  },

  // ─── QUIZZES & ACTIVE RECALL ───
  {
    id: 'quiz-initiate',
    title: 'Quiz Initiate',
    description: 'Complete your first practice topic quiz.',
    icon: '💡',
    tier: 'bronze',
    category: 'quiz',
    unlockedAt: null,
    xpReward: 50,
  },
  {
    id: 'quiz-master',
    title: 'Quiz Wizard',
    description: 'Score 100% on any topic practice quiz.',
    icon: '🧠',
    tier: 'silver',
    category: 'quiz',
    unlockedAt: null,
    xpReward: 100,
  },
  {
    id: 'quiz-veteran',
    title: 'Quiz Master',
    description: 'Score 100% on 5 different practice quizzes.',
    icon: '🎖️',
    tier: 'gold',
    category: 'quiz',
    unlockedAt: null,
    xpReward: 250,
  },
  {
    id: 'recall-grandmaster',
    title: 'Recall Grandmaster',
    description: 'Score 100% on 15 topic practice quizzes.',
    icon: '🔮',
    tier: 'legendary',
    category: 'quiz',
    unlockedAt: null,
    xpReward: 500,
  },
  {
    id: 'flashcard-pro',
    title: 'Active Recall Ace',
    description: 'Master 10 topic flashcards in 3D study mode.',
    icon: '🃏',
    tier: 'silver',
    category: 'quiz',
    unlockedAt: null,
    xpReward: 100,
  },

  // ─── POMODORO & FOCUS ───
  {
    id: 'focus-hero',
    title: 'Deep Focus',
    description: 'Complete a full 25-minute Pomodoro study session.',
    icon: '⏱️',
    tier: 'bronze',
    category: 'time',
    unlockedAt: null,
    xpReward: 75,
  },
  {
    id: 'deep-focus-3',
    title: 'Triple Sprint',
    description: 'Complete 3 Pomodoro study sessions in a single day.',
    icon: '⏳',
    tier: 'silver',
    category: 'time',
    unlockedAt: null,
    xpReward: 150,
  },
  {
    id: 'focus-monk',
    title: 'Focus Monk',
    description: 'Complete 10 Pomodoro sessions (250+ minutes of deep work).',
    icon: '🧘',
    tier: 'gold',
    category: 'time',
    unlockedAt: null,
    xpReward: 300,
  },
  {
    id: 'hyperfocus-titan',
    title: 'Hyperfocus Titan',
    description: 'Log over 1000 minutes of pure Pomodoro focus time.',
    icon: '🌌',
    tier: 'legendary',
    category: 'time',
    unlockedAt: null,
    xpReward: 500,
  },
  {
    id: 'night-owl',
    title: 'Night Owl Scholar',
    description: 'Finish a study session late at night past 10:00 PM.',
    icon: '🦉',
    tier: 'silver',
    category: 'time',
    unlockedAt: null,
    xpReward: 100,
  },

  // ─── CODING LAB ───
  {
    id: 'code-apprentice',
    title: 'Code Apprentice',
    description: 'Run and compile code in the University Coding Lab.',
    icon: '🖥️',
    tier: 'bronze',
    category: 'coding',
    unlockedAt: null,
    xpReward: 60,
  },
  {
    id: 'code-ninja',
    title: 'Code Ninja',
    description: 'Solve and verify 1 University Practical with passing tests.',
    icon: '💻',
    tier: 'silver',
    category: 'coding',
    unlockedAt: null,
    xpReward: 120,
  },
  {
    id: 'algorithm-architect',
    title: 'Algorithm Architect',
    description: 'Solve 5 University Practicals in DSA, Java, and Python.',
    icon: '⚙️',
    tier: 'gold',
    category: 'coding',
    unlockedAt: null,
    xpReward: 300,
  },
  {
    id: 'level-5',
    title: 'Semester Elite',
    description: 'Reach Student Level 5 and earn 2,500+ XP.',
    icon: '🏅',
    tier: 'legendary',
    category: 'learning',
    unlockedAt: null,
    xpReward: 500,
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

        // Merge missing achievements from INITIAL_ACHIEVEMENTS
        if (parsed.achievements) {
          const existingMap = new Map(parsed.achievements.map((a: Achievement) => [a.id, a]));
          parsed.achievements = INITIAL_ACHIEVEMENTS.map((initAch) => {
            const existing = existingMap.get(initAch.id);
            if (existing) {
              return { ...initAch, unlockedAt: existing.unlockedAt };
            }
            return initAch;
          });
        } else {
          parsed.achievements = INITIAL_ACHIEVEMENTS;
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

  // Unlock an achievement
  const unlockAchievement = useCallback((achievementId: string) => {
    setState((prev) => {
      const ach = prev.achievements.find((a) => a.id === achievementId);
      if (!ach || ach.unlockedAt) return prev;

      const updatedAch = { ...ach, unlockedAt: new Date().toISOString() };
      const updated = prev.achievements.map((a) =>
        a.id === achievementId ? updatedAch : a
      );

      // Trigger global event for celebration modal
      try {
        window.dispatchEvent(new CustomEvent('itm_achievement_unlocked', {
          detail: { 
            achievement: updatedAch,
            xp: prev.xp + ach.xpReward,
            totalXp: prev.xp + ach.xpReward,
            streakDays: prev.streakDays,
            level: prev.level,
            levelTitle: LEVEL_TITLES.find(l => l.level === prev.level)?.title || 'Scholar'
          }
        }));
      } catch (err) {
        console.error('Failed to dispatch achievement celebration:', err);
      }

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

      if (newStreak >= 2) unlockAchievement('streak-2');
      if (newStreak >= 5) unlockAchievement('streak-5');
      if (newStreak >= 14) unlockAchievement('streak-14');
      if (newStreak >= 30) unlockAchievement('streak-30');

      return {
        ...prev,
        streakDays: newStreak,
        lastActiveDate: today,
        xp: prev.xp + 20,
      };
    });
  }, [unlockAchievement]);

  // Add XP with toast feedback and level-up check
  const addXp = useCallback((amount: number, reason: string) => {
    setState((prev) => {
      const newXp = prev.xp + amount;
      let newLevel = prev.level;

      for (const lvl of LEVEL_TITLES) {
        if (newXp >= lvl.minXp) newLevel = lvl.level;
      }

      if (newLevel >= 5) {
        unlockAchievement('level-5');
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
  }, [unlockAchievement]);

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

      if (count >= 1) unlockAchievement('first-step');
      if (count >= 5) unlockAchievement('scholar-5');
      if (count >= 15) unlockAchievement('subject-specialist');
      if (count >= 50) unlockAchievement('century-scholar');
      if (count >= 100) unlockAchievement('syllabus-conqueror');

      return {
        ...prev,
        topicsReadCount: count,
        dailyQuests: updatedQuests,
        activityHistory: history,
      };
    });

    addXp(30, 'Topic Notes Read');
  }, [addXp, unlockAchievement]);

  // Record quiz completed
  const recordQuizCompleted = useCallback(
    (score: number, total: number) => {
      const isPerfect = score === total && total > 0;
      setState((prev) => {
        const updatedQuests = prev.dailyQuests.map((q) =>
          q.id === 'quest-quiz-1' ? { ...q, current: Math.min(q.target, q.current + 1) } : q
        );
        const newQuizCount = prev.quizzesCompletedCount + 1;
        const newPerfectCount = isPerfect ? prev.perfectQuizzesCount + 1 : prev.perfectQuizzesCount;

        if (newQuizCount >= 1) unlockAchievement('quiz-initiate');
        if (isPerfect) unlockAchievement('quiz-master');
        if (newPerfectCount >= 5) unlockAchievement('quiz-veteran');
        if (newPerfectCount >= 15) unlockAchievement('recall-grandmaster');

        return {
          ...prev,
          quizzesCompletedCount: newQuizCount,
          perfectQuizzesCount: newPerfectCount,
          dailyQuests: updatedQuests,
        };
      });

      const xpEarned = Math.round((score / total) * 40) + (isPerfect ? 20 : 0);
      addXp(xpEarned, `Quiz Score ${score}/${total}`);
    },
    [addXp, unlockAchievement]
  );

  // Record study time (minutes)
  const recordStudyTime = useCallback(
    (minutes: number) => {
      const today = getTodayString();
      const currentHour = new Date().getHours();
      if (currentHour >= 22 || currentHour < 5) {
        unlockAchievement('night-owl');
      }

      setState((prev) => {
        const history = { ...prev.activityHistory };
        history[today] = (history[today] || 0) + minutes;

        const updatedQuests = prev.dailyQuests.map((q) =>
          q.id === 'quest-study-15m' ? { ...q, current: Math.min(q.target, q.current + minutes) } : q
        );

        const newTotalMins = prev.totalStudyMinutes + minutes;
        const newPomodoroCount = prev.pomodoroSessionsCount + 1;

        if (newPomodoroCount >= 1) unlockAchievement('focus-hero');
        if (newPomodoroCount >= 3) unlockAchievement('deep-focus-3');
        if (newPomodoroCount >= 10) unlockAchievement('focus-monk');
        if (newTotalMins >= 1000) unlockAchievement('hyperfocus-titan');

        return {
          ...prev,
          totalStudyMinutes: newTotalMins,
          pomodoroSessionsCount: newPomodoroCount,
          dailyQuests: updatedQuests,
          activityHistory: history,
        };
      });

      const xp = Math.round(minutes * 2);
      addXp(xp, `${minutes} mins Focus Study`);
    },
    [addXp, unlockAchievement]
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
