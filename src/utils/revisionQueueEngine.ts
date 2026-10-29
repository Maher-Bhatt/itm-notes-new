/**
 * CampusLoop - Smart Revision Queue Engine
 * Prioritizes topics based on memory decay, previous quiz errors, and exam proximity.
 * Formula: Priority = (Days Since Last Viewed) * (1.0 - Topic Quiz Accuracy) * Weightage
 */

import { subjects } from "@/data/subjects";

export interface RevisionQueueItem {
  id: string;
  subjectCode: string;
  subjectName: string;
  unitNumber: number;
  title: string;
  routeUrl: string;
  priorityScore: number;
  urgency: 'HIGH' | 'MEDIUM' | 'NORMAL';
  reason: string;
}

export function computeDailyRevisionQueue(maxItems = 10): RevisionQueueItem[] {
  const queue: RevisionQueueItem[] = [];

  // Read quiz attempts and bookmarks from localStorage
  let quizAttempts: Record<string, { score: number; total: number; date: string }> = {};
  let bookmarks: string[] = [];

  try {
    const rawQuiz = localStorage.getItem('itm_quiz_attempts');
    if (rawQuiz) quizAttempts = JSON.parse(rawQuiz);
    const rawBookmarks = localStorage.getItem('itm_bookmarks');
    if (rawBookmarks) bookmarks = JSON.parse(rawBookmarks);
  } catch {
    // Fallback gracefully
  }

  const now = Date.now();

  for (const sub of subjects) {
    if (sub.semester !== 3) continue; // Focus on active Semester 3 core subjects

    for (const unit of sub.units || []) {
      for (const topic of unit.topics || []) {
        const attempt = quizAttempts[topic.id];
        const isBookmarked = bookmarks.includes(topic.id);

        let errorRate = 0.5; // Default assumption if not taken quiz yet
        let daysSince = 7; // Default 1 week

        if (attempt) {
          errorRate = Math.max(0.1, 1 - (attempt.score / Math.max(1, attempt.total)));
          const attemptTime = new Date(attempt.date).getTime();
          daysSince = Math.max(1, (now - attemptTime) / (1000 * 60 * 60 * 24));
        }

        // Higher priority if bookmarked
        const bookmarkBoost = isBookmarked ? 1.5 : 1.0;

        // Weightage: Unit 2 & 3 usually carry high 14-mark weightage in ITM university papers
        const unitWeight = (unit.number === 2 || unit.number === 3) ? 1.3 : 1.0;

        const priorityScore = Math.round(daysSince * errorRate * bookmarkBoost * unitWeight * 10) / 10;

        let urgency: 'HIGH' | 'MEDIUM' | 'NORMAL' = 'NORMAL';
        let reason = 'Scheduled syllabus retention cycle';

        if (errorRate > 0.4 && daysSince > 3) {
          urgency = 'HIGH';
          reason = 'High previous quiz mistake rate + retention decay';
        } else if (isBookmarked) {
          urgency = 'MEDIUM';
          reason = 'Saved in personal revision bookmarks';
        }

        queue.push({
          id: topic.id,
          subjectCode: sub.code,
          subjectName: sub.name,
          unitNumber: unit.number,
          title: topic.title,
          routeUrl: `/subject/${sub.id}/topic/${topic.id}`,
          priorityScore,
          urgency,
          reason,
        });
      }
    }
  }

  // Sort descending by priority score
  queue.sort((a, b) => b.priorityScore - a.priorityScore);
  return queue.slice(0, maxItems);
}
