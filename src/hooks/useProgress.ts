import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Progress {
  completedTopics: string[];
  bookmarkedTopics: string[];
  mcqScores: Record<string, number>;
}

const GLOBAL_STORAGE_KEY = "itm_notes_progress";

function loadLocal(userId?: string): Progress {
  try {
    if (userId) {
      const userKey = `${GLOBAL_STORAGE_KEY}_${userId}`;
      const userStored = localStorage.getItem(userKey);
      if (userStored) return JSON.parse(userStored);
    }
    const stored = localStorage.getItem(GLOBAL_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.warn('Failed to load progress from localStorage:', e);
  }
  return { completedTopics: [], bookmarkedTopics: [], mcqScores: {} };
}

export function useProgress() {
  const { user, profile } = useAuth();
  const [progress, setProgress] = useState<Progress>(() => loadLocal(user?.id));

  // Sync when user changes
  useEffect(() => {
    if (user?.id) {
      const isMaher = 
        user.email?.toLowerCase() === 'maherbhatt01@gmail.com' ||
        user.email?.toLowerCase() === 'maher@gmail.com' ||
        profile?.display_name?.toLowerCase().includes('maher');

      setProgress((prev) => {
        const loaded = loadLocal(user.id);
        const completed = Array.from(new Set([...prev.completedTopics, ...loaded.completedTopics]));
        
        // Academic progress loaded cleanly from persistent storage

        return {
          ...prev,
          ...loaded,
          completedTopics: completed,
        };
      });
    }
  }, [user?.id, profile?.display_name]);

  useEffect(() => {
    localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(progress));
    if (user?.id) {
      localStorage.setItem(`${GLOBAL_STORAGE_KEY}_${user.id}`, JSON.stringify(progress));
    }
  }, [progress, user?.id]);

  const toggleComplete = useCallback((topicId: string) => {
    setProgress((prev) => {
      const isNowCompleted = !prev.completedTopics.includes(topicId);
      const nextCompleted = isNowCompleted
        ? [...prev.completedTopics, topicId]
        : prev.completedTopics.filter((id) => id !== topicId);

      const next = {
        ...prev,
        completedTopics: nextCompleted,
      };

      if (user?.id) {
        localStorage.setItem(`${GLOBAL_STORAGE_KEY}_${user.id}`, JSON.stringify(next));
      }

      return next;
    });
  }, [user?.id]);

  const toggleBookmark = useCallback((topicId: string) => {
    setProgress((prev) => {
      const willBookmark = !prev.bookmarkedTopics.includes(topicId);
      const nextBookmarked = willBookmark
        ? [...prev.bookmarkedTopics, topicId]
        : prev.bookmarkedTopics.filter((id) => id !== topicId);

      const next = {
        ...prev,
        bookmarkedTopics: nextBookmarked,
      };

      if (user?.id) {
        localStorage.setItem(`${GLOBAL_STORAGE_KEY}_${user.id}`, JSON.stringify(next));
      }

      return next;
    });
  }, [user?.id]);

  const saveMcqScore = useCallback((topicId: string, score: number, totalQuestions: number) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        mcqScores: { ...prev.mcqScores, [topicId]: score },
      };
      if (user?.id) {
        localStorage.setItem(`${GLOBAL_STORAGE_KEY}_${user.id}`, JSON.stringify(next));
      }
      return next;
    });
  }, [user?.id]);

  const isCompleted = useCallback(
    (topicId: any) => {
      if (!topicId || typeof topicId !== 'string') return false;
      return Array.isArray(progress.completedTopics) && progress.completedTopics.includes(topicId);
    },
    [progress.completedTopics]
  );

  const isBookmarked = useCallback(
    (topicId: any) => {
      if (!topicId || typeof topicId !== 'string') return false;
      return Array.isArray(progress.bookmarkedTopics) && progress.bookmarkedTopics.includes(topicId);
    },
    [progress.bookmarkedTopics]
  );

  const getSubjectProgress = useCallback(
    (input: any, maybeTopicId?: any) => {
      if (typeof input === 'string') {
        const topicToCheck = typeof maybeTopicId === 'string' ? maybeTopicId : input;
        return Array.isArray(progress.completedTopics) && progress.completedTopics.includes(topicToCheck) ? 100 : 0;
      }
      if (!Array.isArray(input) || input.length === 0) return 0;
      const completed = input.filter((id) => typeof id === 'string' && progress.completedTopics.includes(id)).length;
      return Math.round((completed / input.length) * 100);
    },
    [progress.completedTopics]
  );

  return { progress, toggleComplete, toggleBookmark, saveMcqScore, isCompleted, isBookmarked, getSubjectProgress };
}
