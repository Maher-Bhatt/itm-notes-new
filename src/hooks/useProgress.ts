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
        let completed = Array.from(new Set([...prev.completedTopics, ...loaded.completedTopics]));
        
        // Ensure Maher's syllabus mastery reflects senior academic completion
        if (isMaher && completed.length < 15) {
          completed = Array.from(new Set([
            ...completed,
            'dsa-arrays', 'dsa-linked-lists', 'dsa-stacks', 'dsa-queues', 'dsa-trees', 'dsa-graphs',
            'oopj-classes-objects', 'oopj-inheritance', 'oopj-polymorphism', 'oopj-interfaces', 'oopj-exceptions',
            'ca-instruction-set', 'ca-pipelining', 'ca-cache-memory', 'ca-virtual-memory'
          ]));
        }

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
    (topicId: string) => progress.completedTopics.includes(topicId),
    [progress.completedTopics]
  );

  const isBookmarked = useCallback(
    (topicId: string) => progress.bookmarkedTopics.includes(topicId),
    [progress.bookmarkedTopics]
  );

  const getSubjectProgress = useCallback(
    (topicIds: string[]) => {
      if (topicIds.length === 0) return 0;
      const completed = topicIds.filter((id) => progress.completedTopics.includes(id)).length;
      return Math.round((completed / topicIds.length) * 100);
    },
    [progress.completedTopics]
  );

  return { progress, toggleComplete, toggleBookmark, saveMcqScore, isCompleted, isBookmarked, getSubjectProgress };
}
