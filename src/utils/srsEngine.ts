/**
 * ITM Notes - Spaced Repetition System (SRS)
 * Based on the SuperMemo SM-2 Algorithm.
 * Computes optimal review intervals (Again, Hard, Good, Easy)
 * and tracks due cards persistently.
 */

export interface SrsCardState {
  cardId: string;
  subjectId: string;
  unitNumber?: number;
  question: string;
  answer: string;
  ease: number; // Default 2.5
  interval: number; // In days
  repetitions: number;
  dueAt: string; // ISO Date String
  lastReviewedAt?: string;
  lastQuality?: number;
}

export type SrsRating = 0 | 3 | 4 | 5; // 0 = Again, 3 = Hard, 4 = Good, 5 = Easy
export type SRSGrade = SrsRating;

const STORAGE_KEY = 'itm_srs_flashcards';

/**
 * SM-2 Algorithm Implementation
 */
export function calculateNextReview(
  currentState: Partial<SrsCardState>,
  quality: SrsRating
): { ease: number; interval: number; repetitions: number; dueAt: string } {
  let ease = currentState.ease ?? 2.5;
  let repetitions = currentState.repetitions ?? 0;
  let interval = currentState.interval ?? 0;

  if (quality < 3) {
    // Again / Failed: Reset repetitions and interval
    repetitions = 0;
    interval = 1;
  } else {
    // Quality >= 3 (Hard, Good, Easy)
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = quality === 3 ? 3 : 6;
    } else {
      if (quality === 3) {
        // Hard: 1.2x multiplier
        interval = Math.round(interval * 1.2);
      } else if (quality === 5) {
        // Easy: ease bonus
        interval = Math.round(interval * ease * 1.3);
      } else {
        // Good: standard ease factor
        interval = Math.round(interval * ease);
      }
    }
    repetitions += 1;
  }

  // Update ease factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  ease = ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ease < 1.3) ease = 1.3; // Hard minimum

  // Calculate next due date
  const now = new Date();
  const dueDate = new Date(now.getTime() + interval * 24 * 60 * 60 * 1000);

  return {
    ease: Math.round(ease * 100) / 100,
    interval,
    repetitions,
    dueAt: dueDate.toISOString(),
  };
}

/**
 * Storage & Retrieval Helper Functions
 */
export function getSavedSrsCards(): Record<string, SrsCardState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.warn('Failed to load SRS flashcard states:', e);
    return {};
  }
}

export function saveSrsCards(cards: Record<string, SrsCardState>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch (e) {
    console.warn('Failed to persist SRS flashcard states:', e);
  }
}

export function getCardProgress(cardId: string): SrsCardState | null {
  const cards = getSavedSrsCards();
  return cards[cardId] || null;
}

export function isCardDue(cardId: string): boolean {
  const card = getCardProgress(cardId);
  if (!card) return true; // New cards are due immediately
  return new Date(card.dueAt) <= new Date();
}

export function recordSrsReview(cardId: string, grade: SRSGrade): SrsCardState {
  const cards = getSavedSrsCards();
  const current = cards[cardId] || {
    cardId,
    subjectId: 'global',
    question: '',
    answer: '',
    ease: 2.5,
    interval: 0,
    repetitions: 0,
    dueAt: new Date().toISOString(),
  };

  const next = calculateNextReview(current, grade);
  const updated: SrsCardState = {
    ...current,
    ...next,
    lastReviewedAt: new Date().toISOString(),
    lastQuality: grade,
  };

  cards[cardId] = updated;
  saveSrsCards(cards);
  return updated;
}

export function recordCardReview(
  cardId: string,
  subjectId: string,
  question: string,
  answer: string,
  quality: SrsRating,
  unitNumber?: number
): SrsCardState {
  const cards = getSavedSrsCards();
  const current = cards[cardId] || {
    cardId,
    subjectId,
    unitNumber,
    question,
    answer,
    ease: 2.5,
    interval: 0,
    repetitions: 0,
    dueAt: new Date().toISOString(),
  };

  const next = calculateNextReview(current, quality);
  const updated: SrsCardState = {
    ...current,
    ...next,
    question,
    answer,
    subjectId,
    unitNumber,
    lastReviewedAt: new Date().toISOString(),
    lastQuality: quality,
  };

  cards[cardId] = updated;
  saveSrsCards(cards);
  return updated;
}

export function getDueSrsCards(subjectId?: string): SrsCardState[] {
  const cards = Object.values(getSavedSrsCards());
  const now = new Date();

  return cards.filter((card) => {
    if (subjectId && card.subjectId !== subjectId) return false;
    const due = new Date(card.dueAt);
    return due <= now;
  });
}

export const getDueCards = getDueSrsCards;

export function getDeckStats(cardIds: string[]): {
  totalCount: number;
  dueCount: number;
  matureCount: number;
  retentionRate: number;
} {
  const cards = getSavedSrsCards();
  let dueCount = 0;
  let matureCount = 0;
  let reviewCount = 0;
  let successfulReviews = 0;

  cardIds.forEach(id => {
    const card = cards[id];
    if (!card) {
      dueCount++;
    } else {
      if (new Date(card.dueAt) <= new Date()) {
        dueCount++;
      }
      if (card.interval >= 21) {
        matureCount++;
      }
      if (card.lastQuality !== undefined) {
        reviewCount++;
        if (card.lastQuality >= 3) successfulReviews++;
      }
    }
  });

  const retentionRate = reviewCount > 0 ? Math.round((successfulReviews / reviewCount) * 100) : 85;

  return {
    totalCount: cardIds.length,
    dueCount,
    matureCount,
    retentionRate,
  };
}

export function getSrsStatistics(): {
  totalCards: number;
  dueTodayCount: number;
  masteredCount: number; // Interval >= 21 days
  learningCount: number;
} {
  const cards = Object.values(getSavedSrsCards());
  const now = new Date();

  let dueTodayCount = 0;
  let masteredCount = 0;
  let learningCount = 0;

  for (const card of cards) {
    const due = new Date(card.dueAt);
    if (due <= now) {
      dueTodayCount++;
    }
    if (card.interval >= 21) {
      masteredCount++;
    } else {
      learningCount++;
    }
  }

  return {
    totalCards: cards.length,
    dueTodayCount,
    masteredCount,
    learningCount,
  };
}
