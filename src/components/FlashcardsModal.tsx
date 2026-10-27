import { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  X, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  Shuffle, 
  Award,
  Layers,
  Calendar,
  Clock,
  Flame,
  Brain
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { toast } from 'sonner';
import { 
  getCardProgress, 
  recordSrsReview, 
  isCardDue, 
  getDeckStats, 
  SRSGrade 
} from '@/utils/srsEngine';

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  hint?: string;
  category?: string;
}

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicTitle?: string;
  cards?: Flashcard[];
}

export function FlashcardsModal({
  isOpen,
  onClose,
  topicTitle = "Active Recall Flashcards",
  cards = [],
}: FlashcardsModalProps) {
  const safeCards = cards || [];
  const [deck, setDeck] = useState<Flashcard[]>(safeCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showDueOnly, setShowDueOnly] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { addXp, unlockAchievement } = useGamification();

  // Filter deck based on due cards if requested
  const activeDeck = useMemo(() => {
    if (!deck || deck.length === 0) return [];
    if (!showDueOnly) return deck;
    const dueCards = deck.filter((c) => isCardDue(c.id));
    return dueCards.length > 0 ? dueCards : deck;
  }, [deck, showDueOnly, refreshTrigger]);

  const deckStats = useMemo(() => {
    return getDeckStats((cards || []).map((c) => c.id));
  }, [cards, refreshTrigger]);

  useEffect(() => {
    setDeck(cards || []);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [cards, isOpen]);

  const currentCard = activeDeck[currentIndex] || activeDeck[0];

  const currentProgress = useMemo(() => {
    if (!currentCard) return null;
    return getCardProgress(currentCard.id);
  }, [currentCard, refreshTrigger]);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1 < activeDeck.length ? prev + 1 : 0));
  }, [activeDeck.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : activeDeck.length - 1));
  }, [activeDeck.length]);

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...activeDeck].sort(() => 0.5 - Math.random());
    setDeck(shuffled);
    setCurrentIndex(0);
    toast.info('Deck shuffled!');
  };

  const handleSrsRating = (grade: SRSGrade, gradeLabel: string) => {
    if (!currentCard) return;
    const updated = recordSrsReview(currentCard.id, grade);
    setRefreshTrigger(prev => prev + 1);

    const xpReward = grade >= 4 ? 15 : 5;
    addXp(xpReward, `SRS Review: ${gradeLabel}`);

    if (grade >= 4 && updated.repetitions >= 3) {
      unlockAchievement('scholar-5');
    }

    const intervalText = updated.interval === 0 
      ? 'in 10 minutes' 
      : updated.interval === 1 
        ? 'tomorrow' 
        : `in ${updated.interval} days`;

    toast.success(`${gradeLabel} recorded!`, {
      description: `Next review scheduled ${intervalText}. (+${xpReward} XP)`,
      duration: 2000
    });

    handleNext();
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        handleFlip();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === '1' && isFlipped) {
        handleSrsRating(0, 'Again');
      } else if (e.key === '2' && isFlipped) {
        handleSrsRating(3, 'Hard');
      } else if (e.key === '3' && isFlipped) {
        handleSrsRating(4, 'Good');
      } else if (e.key === '4' && isFlipped) {
        handleSrsRating(5, 'Easy');
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isFlipped, handleNext, handlePrev, onClose, currentCard]);

  if (!isOpen || !currentCard) return null;

  const progressPercent = Math.round(((currentIndex + 1) / activeDeck.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-scale-in">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-400/10 text-indigo-500 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
              <Brain className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-bold text-sm text-foreground truncate max-w-[240px] sm:max-w-[320px]">
                {topicTitle}
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span>SM-2 Spaced Repetition</span>
                <span>•</span>
                <span className="text-indigo-500 dark:text-indigo-300 font-semibold">
                  {deckStats.dueCount} due today
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowDueOnly(!showDueOnly);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                showDueOnly 
                  ? 'bg-indigo-400/15 border-indigo-400 text-indigo-500 dark:text-indigo-300' 
                  : 'bg-secondary border-border text-muted-foreground hover:text-foreground'
              }`}
              title="Toggle Due Only Filter"
            >
              {showDueOnly ? 'Due Only' : 'All Cards'}
            </button>
            <button
              onClick={handleShuffle}
              className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
              title="Shuffle Cards"
            >
              <Shuffle className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Progress & SRS Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 font-medium">
          <span>Card {currentIndex + 1} of {activeDeck.length}</span>
          <div className="flex items-center gap-2 text-[11px]">
            {currentProgress && currentProgress.repetitions > 0 ? (
              <span className="text-indigo-500 dark:text-indigo-300 font-medium flex items-center gap-1">
                <Flame className="h-3 w-3" /> Streak {currentProgress.repetitions} (Interval: {currentProgress.interval}d)
              </span>
            ) : (
              <span className="text-amber-500 font-medium">New Card</span>
            )}
          </div>
        </div>
        <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden mb-6">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* 3D Flip Card Container */}
        <div 
          onClick={handleFlip}
          className="perspective-1000 w-full min-h-[17rem] sm:min-h-[19rem] cursor-pointer select-none mb-4"
        >
          <div className={`relative w-full h-full min-h-[17rem] sm:min-h-[19rem] transition-transform duration-500 transform-style-3d rounded-2xl border ${
            isFlipped 
              ? 'rotate-y-180 border-primary/40 bg-gradient-to-br from-primary/5 via-card to-background shadow-lg' 
              : 'border-border/80 bg-card hover:border-primary/30 shadow-md'
          }`}>
            {/* FRONT of card */}
            <div className={`absolute inset-0 backface-hidden p-6 flex flex-col justify-between ${isFlipped ? 'pointer-events-none' : ''}`}>
              <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                <span className="uppercase tracking-wider px-2 py-0.5 rounded bg-secondary">
                  {currentCard.category || 'Question / Concept'}
                </span>
                <span className="flex items-center gap-1 text-primary">
                  <RotateCw className="h-3 w-3" /> Click or Space to Flip
                </span>
              </div>

              <div className="my-auto text-center py-4">
                <p className="text-lg sm:text-xl font-bold text-foreground leading-relaxed px-2">
                  {currentCard.front}
                </p>
                {currentCard.hint && (
                  <p className="text-xs text-muted-foreground/80 mt-3 italic">
                    Hint: {currentCard.hint}
                  </p>
                )}
              </div>

              <div className="text-center text-[11px] text-muted-foreground flex items-center justify-center gap-1">
                <span>Tap card to see answer and rate difficulty</span>
              </div>
            </div>

            {/* BACK of card */}
            <div className={`absolute inset-0 backface-hidden rotate-y-180 p-6 flex flex-col justify-between ${!isFlipped ? 'pointer-events-none' : ''}`}>
              <div className="flex items-center justify-between text-[11px] font-semibold text-primary">
                <span className="uppercase tracking-wider px-2 py-0.5 rounded bg-primary/10">
                  Model Answer & Explanation
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <RotateCw className="h-3 w-3" /> Flip back
                </span>
              </div>

              <div className="my-auto text-center overflow-y-auto max-h-40 custom-scrollbar px-2 py-2">
                <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed">
                  {currentCard.back}
                </p>
              </div>

              {/* SM-2 Rating Buttons */}
              <div 
                className="pt-2 border-t border-border/50" 
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-[10px] text-center text-muted-foreground mb-2 font-medium">
                  Rate how well you knew this (computes next review):
                </p>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    onClick={() => handleSrsRating(0, 'Again')}
                    className="flex flex-col items-center py-2 px-1 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-bold transition-all apple-press"
                  >
                    <span>Again</span>
                    <span className="text-[10px] opacity-75 font-normal">10m</span>
                  </button>
                  <button
                    onClick={() => handleSrsRating(3, 'Hard')}
                    className="flex flex-col items-center py-2 px-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-bold transition-all apple-press"
                  >
                    <span>Hard</span>
                    <span className="text-[10px] opacity-75 font-normal">1d</span>
                  </button>
                  <button
                    onClick={() => handleSrsRating(4, 'Good')}
                    className="flex flex-col items-center py-2 px-1 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold transition-all apple-press"
                  >
                    <span>Good</span>
                    <span className="text-[10px] opacity-75 font-normal">3d</span>
                  </button>
                  <button
                    onClick={() => handleSrsRating(5, 'Easy')}
                    className="flex flex-col items-center py-2 px-1 rounded-xl bg-indigo-400/10 hover:bg-indigo-400/20 text-indigo-500 dark:text-indigo-300 border border-indigo-400/20 text-xs font-bold transition-all apple-press"
                  >
                    <span>Easy</span>
                    <span className="text-[10px] opacity-75 font-normal">6d</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-2 border-t border-border/60">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground transition-colors apple-press flex items-center gap-1 text-xs font-semibold"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>

          <span className="text-[11px] text-muted-foreground hidden sm:inline">
            Press keys <strong>1-4</strong> to rate answer after flipping
          </span>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity apple-press flex items-center gap-1 text-xs"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
