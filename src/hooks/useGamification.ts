// @ts-nocheck
import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'legendary' | 'mythic';
  category: 'learning' | 'streak' | 'quiz' | 'time' | 'coding' | 'admin';
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
  activityHistory: Record<string, number>;
}

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  // ── LEARNING & SYLLABUS ──
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
    icon: '⭐',
    tier: 'silver',
    category: 'learning',
    unlockedAt: null,
    xpReward: 150,
  },
  {
    id: 'century-scholar',
    title: 'Century Scholar',
    description: 'Master 50 in-depth topics and diagrams.',
    icon: '🏆',
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

  // ── STREAKS & HABITS ──
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
    icon: '👑',
    tier: 'legendary',
    category: 'streak',
    unlockedAt: null,
    xpReward: 500,
  },

  // ── QUIZZES & ACTIVE RECALL ──
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
    icon: '🎓',
    tier: 'gold',
    category: 'quiz',
    unlockedAt: null,
    xpReward: 250,
  },
  {
    id: 'recall-grandmaster',
    title: 'Recall Grandmaster',
    description: 'Score 100% on 15 topic practice quizzes.',
    icon: '🎖️',
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

  // ── POMODORO & FOCUS ──
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
    icon: '🏃',
    tier: 'silver',
    category: 'time',
    unlockedAt: null,
    xpReward: 150,
  },
  {
    id: 'focus-monk',
    title: 'Focus Monk',
    description: 'Complete 10 Pomodoro sessions of deep work.',
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
    icon: '⚡',
    tier: 'legendary',
    category: 'time',
    unlockedAt: null,
    xpReward: 500,
  },
  {
    id: 'night-owl',
    title: 'Night Owl Scholar',
    description: 'Finish a study session late at night past 10:00 PM.',
    icon: '🌙',
    tier: 'silver',
    category: 'time',
    unlockedAt: null,
    xpReward: 100,
  },

  // ── CODING LAB ──
  {
    id: 'code-apprentice',
    title: 'Code Apprentice',
    description: 'Run and compile code in the University Coding Lab.',
    icon: '💻',
    tier: 'bronze',
    category: 'coding',
    unlockedAt: null,
    xpReward: 60,
  },
  {
    id: 'code-ninja',
    title: 'Code Ninja',
    description: 'Solve and verify 1 University Practical with passing tests.',
    icon: '🥷',
    tier: 'silver',
    category: 'coding',
    unlockedAt: null,
    xpReward: 120,
  },
  {
    id: 'algorithm-architect',
    title: 'Algorithm Architect',
    description: 'Solve 5 University Practicals in DSA, Java, and Python.',
    icon: '📐',
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
  // ── ADMIN ONLY ──
  {
    id: 'admin-god-mode',
    title: 'The Architect',
    description: 'Platform Creator & Lead Developer. Full administrative capabilities.',
    icon: '⚡',
    tier: 'mythic',
    category: 'admin',
    unlockedAt: null,
    xpReward: 9999,
  }
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
  { level: 7, title: "Dean's Scholar", minXp: 4000, maxXp: 6500 },
  { level: 8, title: 'University Legend', minXp: 6500, maxXp: 10000 },
  { level: 9, title: 'The Architect', minXp: 10000, maxXp: 25000 },
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
        if (parsed.questDate !== today) {
          parsed.questDate = today;
          parsed.dailyQuests = INITIAL_QUESTS;
        }

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

        let correctLevel = 1;
        for (const lvl of LEVEL_TITLES) {
          if ((parsed.xp || 0) >= lvl.minXp) correctLevel = lvl.level;
        }
        parsed.level = correctLevel;

        return parsed;
      }
    } catch (e) {
      console.error('Failed to load gamification state from cache:', e);
    }

    return {
      xp: 0,
      level: 1,
      streakDays: 1,
      lastActiveDate: getTodayString(),
      totalStudyMinutes: 0,
      topicsReadCount: 0,
      quizzesCompletedCount: 0,
      perfectQuizzesCount: 0,
      pomodoroSessionsCount: 0,
      achievements: INITIAL_ACHIEVEMENTS,
      dailyQuests: INITIAL_QUESTS,
      questDate: getTodayString(),
      activityHistory: {},
    };
  });

  // Sync with Supabase on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const userId = session?.user?.id;
      if (!userId) return;

      // 1. Fetch user_achievements from database
      supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', userId)
        .then(({ data: achRows, error: achErr }) => {
          if (!achErr && achRows && achRows.length > 0) {
            const remoteMap = new Map(achRows.map((r: any) => [r.achievement_id, r.unlocked_at]));
            setState((prev) => {
              const updatedAchievements = prev.achievements.map((a) => {
                const remoteUnlocked = remoteMap.get(a.id);
                if (remoteUnlocked) {
                  return { ...a, unlockedAt: remoteUnlocked };
                }
                return a;
              });
              return { ...prev, achievements: updatedAchievements };
            });
          }
        });

      // 2. Fetch real XP & Level & Streak from profiles
      supabase
        .from('profiles')
        .select('xp, level, streak_days')
        .eq('user_id', userId)
        .maybeSingle()
        .then(({ data: pData, error: pErr }) => {
          if (!pErr && pData) {
            setState((prev) => {
              const realXp = pData.xp !== null && pData.xp !== undefined ? pData.xp : prev.xp;
              let realLevel = pData.level || prev.level;
              for (const lvl of LEVEL_TITLES) {
                if (realXp >= lvl.minXp) realLevel = lvl.level;
              }
              return {
                ...prev,
                xp: realXp,
                level: realLevel,
                streakDays: pData.streak_days !== null && pData.streak_days !== undefined ? pData.streak_days : prev.streakDays,
              };
            });
          }
        });
    });
  }, []);

  // Save to localStorage as offline cache
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
      nextLevel: LEVEL_TITLES.find((l) => l.level === current.level + 1) || null,
    };
  }, [state.xp]);

  // Add XP with automatic Level-Up calculation and Supabase synchronization
  const addXp = useCallback((amount: number, reason?: string) => {
    if (amount <= 0) return;

    setState((prev) => {
      const newXp = prev.xp + amount;
      let newLevel = prev.level;

      for (const lvl of LEVEL_TITLES) {
        if (newXp >= lvl.minXp) {
          newLevel = lvl.level;
        }
      }

      if (newLevel > prev.level) {
        const title = LEVEL_TITLES.find((l) => l.level === newLevel)?.title || 'Scholar';
        toast.success(`🎉 Level Up! You are now Level ${newLevel}: ${title}!`, {
          description: `Great job on your academic consistency. Keep climbing the ranks!`,
        });
        if (newLevel >= 5) {
          setTimeout(() => unlockAchievement('level-5'), 500);
        }
      }

      // Sync XP and Level to Supabase
      supabase.auth.getSession().then(({ data: { session } }) => {
        const userId = session?.user?.id;
        if (userId) {
          supabase
            .from('profiles')
            .update({
              xp: newXp,
              level: newLevel,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId)
            .then(({ error }) => {
              if (error) console.error('Failed to sync XP to profile:', error);
            });
        }
      });

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
      };
    });

    if (reason) {
      toast(`+${amount} XP: ${reason}`, { icon: '✨' });
    }
  }, []);

  // Unlock an Achievement with celebration and database persistence
  const unlockAchievement = useCallback((id: string) => {
    setState((prev) => {
      const ach = prev.achievements.find((a) => a.id === id);
      if (!ach || ach.unlockedAt) return prev;

      const now = new Date().toISOString();
      const updatedAch = { ...ach, unlockedAt: now };
      const updated = prev.achievements.map((a) => (a.id === id ? updatedAch : a));

      // Trigger global event for celebration modal
      try {
        window.dispatchEvent(
          new CustomEvent('itm_achievement_unlocked', {
            detail: {
              achievement: updatedAch,
              xp: prev.xp + ach.xpReward,
              totalXp: prev.xp + ach.xpReward,
              streakDays: prev.streakDays,
              level: prev.level,
              levelTitle: LEVEL_TITLES.find((l) => l.level === prev.level)?.title || 'Scholar',
            },
          })
        );
      } catch (err) {
        console.error('Failed to dispatch achievement celebration:', err);
      }

      toast.success(`🏆 Achievement Unlocked: ${ach.title}!`, {
        description: `${ach.description} (+${ach.xpReward} XP)`,
      });

      const newXp = prev.xp + ach.xpReward;
      let newLevel = prev.level;
      for (const lvl of LEVEL_TITLES) {
        if (newXp >= lvl.minXp) newLevel = lvl.level;
      }

      // Persist achievement and XP to Supabase
      supabase.auth.getSession().then(({ data: { session } }) => {
        const userId = session?.user?.id;
        if (userId) {
          supabase
            .from('user_achievements')
            .upsert({
              user_id: userId,
              achievement_id: ach.id,
              title: ach.title,
              description: ach.description,
              icon: ach.icon,
              tier: ach.tier,
              xp_reward: ach.xpReward,
              unlocked_at: now,
            })
            .then(({ error }) => {
              if (error) console.error('Failed to persist achievement to Supabase:', error);
            });

          supabase
            .from('profiles')
            .update({
              xp: newXp,
              level: newLevel,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId)
            .then(({ error }) => {
              if (error) console.error('Failed to update profile XP:', error);
            });
        }
      });

      return {
        ...prev,
        achievements: updated,
        xp: newXp,
        level: newLevel,
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

      // Sync streak to Supabase
      supabase.auth.getSession().then(({ data: { session } }) => {
        const userId = session?.user?.id;
        if (userId) {
          supabase
            .from('profiles')
            .update({
              streak_days: newStreak,
              updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId)
            .then(({ error }) => {
              if (error) console.error('Failed to sync streak to profile:', error);
            });
        }
      });

      return {
        ...prev,
        streakDays: newStreak,
        lastActiveDate: today,
      };
    });
  }, [unlockAchievement]);

  // Log study time in minutes
  const addStudyMinutes = useCallback(
    (minutes: number) => {
      if (minutes <= 0) return;
      const today = getTodayString();
      const currentHour = new Date().getHours();

      setState((prev) => {
        const newTotal = prev.totalStudyMinutes + minutes;
        const currentToday = prev.activityHistory[today] || 0;
        const newHistory = { ...prev.activityHistory, [today]: currentToday + minutes };

        if (newTotal >= 25) unlockAchievement('focus-hero');
        if (newTotal >= 250) unlockAchievement('focus-monk');
        if (newTotal >= 1000) unlockAchievement('hyperfocus-titan');
        if (currentHour >= 22) unlockAchievement('night-owl');

        return {
          ...prev,
          totalStudyMinutes: newTotal,
          activityHistory: newHistory,
        };
      });

      addXp(Math.round(minutes * 2), `${minutes}m Focus Session`);
    },
    [addXp, unlockAchievement]
  );

  // Record a topic read
  const recordTopicRead = useCallback(
    (topicId: string) => {
      setState((prev) => {
        const newCount = prev.topicsReadCount + 1;
        if (newCount >= 1) unlockAchievement('first-step');
        if (newCount >= 5) unlockAchievement('scholar-5');
        if (newCount >= 15) unlockAchievement('subject-specialist');
        if (newCount >= 50) unlockAchievement('century-scholar');
        if (newCount >= 100) unlockAchievement('syllabus-conqueror');

        return { ...prev, topicsReadCount: newCount };
      });
      addXp(15, 'Read Topic Notes');
    },
    [addXp, unlockAchievement]
  );

  // Record a completed quiz
  const recordQuizCompleted = useCallback(
    (isPerfect: boolean) => {
      setState((prev) => {
        const newQuizzes = prev.quizzesCompletedCount + 1;
        const newPerfect = isPerfect ? prev.perfectQuizzesCount + 1 : prev.perfectQuizzesCount;

        if (newQuizzes >= 1) unlockAchievement('quiz-initiate');
        if (newPerfect >= 1) unlockAchievement('quiz-master');
        if (newPerfect >= 5) unlockAchievement('quiz-veteran');
        if (newPerfect >= 15) unlockAchievement('recall-grandmaster');

        return {
          ...prev,
          quizzesCompletedCount: newQuizzes,
          perfectQuizzesCount: newPerfect,
        };
      });

      addXp(isPerfect ? 50 : 25, isPerfect ? 'Perfect Quiz Score! 🎯' : 'Quiz Completed');
    },
    [addXp, unlockAchievement]
  );

  // Claim a quest reward
  const claimQuest = useCallback(
    (questId: string) => {
      setState((prev) => {
        const quest = prev.dailyQuests.find((q) => q.id === questId);
        if (!quest || quest.claimed || quest.current < quest.target) return prev;

        const updatedQuests = prev.dailyQuests.map((q) => (q.id === questId ? { ...q, claimed: true } : q));

        addXp(quest.xpReward, `Completed Quest: ${quest.title}`);

        return {
          ...prev,
          dailyQuests: updatedQuests,
        };
      });
    },
    [addXp]
  );

  return {
    state,
    levelInfo,
    addXp,
    unlockAchievement,
    checkDailyStreak,
    addStudyMinutes,
    recordTopicRead,
    recordQuizCompleted,
    claimQuest,
  };
}
