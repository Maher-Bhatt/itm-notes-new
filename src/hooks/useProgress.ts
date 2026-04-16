import { useState, useCallback, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress>(loadLocal);

  // Load from Supabase when signed in
  useEffect(() => {
    if (!user) {
      setProgress(loadLocal());
      return;
    }

    (async () => {
      const [{ data: prog }, { data: bm }] = await Promise.all([
        supabase.from("progress").select("topic_id").eq("user_id", user.id).eq("completed", true),
        supabase.from("bookmarks").select("topic_id").eq("user_id", user.id),
      ]);
      setProgress({
        completedTopics: prog?.map((r) => r.topic_id) ?? [],
        bookmarkedTopics: bm?.map((r) => r.topic_id) ?? [],
        mcqScores: loadLocal().mcqScores,
      });
    })();
  }, [user]);

  // Persist to localStorage for guests
  useEffect(() => {
    if (!user) localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress, user]);

  // Use functional updates to avoid stale closure bugs
  const toggleComplete = useCallback(async (topicId: string) => {
    let isNowCompleted = false;
    setProgress((prev) => {
      isNowCompleted = !prev.completedTopics.includes(topicId);
      return {
        ...prev,
        completedTopics: isNowCompleted
          ? [...prev.completedTopics, topicId]
          : prev.completedTopics.filter((id) => id !== topicId),
      };
    });

    // Defer the Supabase call — isNowCompleted is set by the time this runs
    if (user) {
      // Re-check from latest state
      const wasCompleted = progress.completedTopics.includes(topicId);
      const willComplete = !wasCompleted;
      if (willComplete) {
        await supabase.from("progress").upsert({ user_id: user.id, topic_id: topicId, completed: true });
      } else {
        await supabase.from("progress").delete().eq("user_id", user.id).eq("topic_id", topicId);
      }
    }
  }, [user, progress.completedTopics]);

  const toggleBookmark = useCallback(async (topicId: string) => {
    const wasBookmarked = progress.bookmarkedTopics.includes(topicId);
    const willBookmark = !wasBookmarked;
    setProgress((prev) => ({
      ...prev,
      bookmarkedTopics: willBookmark
        ? [...prev.bookmarkedTopics, topicId]
        : prev.bookmarkedTopics.filter((id) => id !== topicId),
    }));

    if (user) {
      if (willBookmark) {
        await supabase.from("bookmarks").upsert({ user_id: user.id, topic_id: topicId });
      } else {
        await supabase.from("bookmarks").delete().eq("user_id", user.id).eq("topic_id", topicId);
      }
    }
  }, [user, progress.bookmarkedTopics]);

  const saveMcqScore = useCallback(async (topicId: string, score: number, totalQuestions: number) => {
    setProgress((prev) => ({
      ...prev,
      mcqScores: { ...prev.mcqScores, [topicId]: score },
    }));
    if (user) {
      await supabase.from("test_results").insert({
        user_id: user.id,
        topic_id: topicId,
        score,
        total_questions: totalQuestions,
      });
    }
  }, [user]);

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
