import { useState, useCallback, useEffect } from "react";

interface Progress {
  completedTopics: string[];
  bookmarkedTopics: string[];
  mcqScores: Record<string, number>;
}

const STORAGE_KEY = "itm_notes_progress";

function loadLocal(): Progress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return { completedTopics: [], bookmarkedTopics: [], mcqScores: {} };
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadLocal);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const toggleComplete = useCallback((topicId: string) => {
    setProgress((prev) => {
      const isNowCompleted = !prev.completedTopics.includes(topicId);
      return {
        ...prev,
        completedTopics: isNowCompleted
          ? [...prev.completedTopics, topicId]
          : prev.completedTopics.filter((id) => id !== topicId),
      };
    });
  }, []);

  const toggleBookmark = useCallback((topicId: string) => {
    setProgress((prev) => {
      const willBookmark = !prev.bookmarkedTopics.includes(topicId);
      return {
        ...prev,
        bookmarkedTopics: willBookmark
          ? [...prev.bookmarkedTopics, topicId]
          : prev.bookmarkedTopics.filter((id) => id !== topicId),
      };
    });
  }, []);

  const saveMcqScore = useCallback((topicId: string, score: number, totalQuestions: number) => {
    setProgress((prev) => ({
      ...prev,
      mcqScores: { ...prev.mcqScores, [topicId]: score },
    }));
  }, []);

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
