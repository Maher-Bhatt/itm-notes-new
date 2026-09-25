import { useState, useEffect, useCallback } from 'react';
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
  Layers
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { toast } from 'sonner';

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
  topicTitle: string;
  cards: Flashcard[];
}

export function FlashcardsModal({ isOpen, onClose, topicTitle, cards }: FlashcardsModalProps) {
  const [deck, setDeck] = useState<Flashcard[]>(cards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const { addXp, unlockAchievement } = useGamification();

  useEffect(() => {
    setDeck(cards);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds(new Set());
  }, [cards, isOpen]);

  const currentCard = deck[currentIndex];

  const handleFlip = () => setIsFlipped((prev) => !prev);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1 < deck.length ? prev + 1 : 0));
  }, [deck.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : deck.length - 1));
  }, [deck.length]);

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => 0.5 - Math.random());
    setDeck(shuffled);
    setCurrentIndex(0);
    toast.info('Deck shuffled!');
  };

  const handleMastered = () => {
    if (!currentCard) return;
    const newMastered = new Set(masteredIds);
    newMastered.add(currentCard.id);
    setMasteredIds(newMastered);

    if (newMastered.size === deck.length) {
      addXp(30, 'All Topic Flashcards Mastered!');
      unlockAchievement('scholar-5');
      toast.success('🏆 Mastery Complete!', {
        description: 'You memorized every flashcard in this topic. +30 XP awarded!',
      });
    } else {
      toast.success('Card marked as mastered! 🎯');
    }

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
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !currentCard) return null;

  const progressPercent = Math.round(((currentIndex + 1) / deck.length) * 100);
  const masteryPercent = Math.round((masteredIds.size / deck.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-card border border-border rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-scale-in">
        {/* Header Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs">
              <Layers className="h-4 w-4" />
            </span>
            <div>
              <h3 className="font-bold text-sm text-foreground truncate max-w-[280px]">
                {topicTitle}
              </h3>
              <p className="text-[11px] text-muted-foreground">Active Recall Flashcards</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
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

        {/* Progress bar */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 font-medium">
          <span>Card {currentIndex + 1} of {deck.length}</span>
          <span className="text-amber-600 dark:text-amber-400 font-semibold">{masteryPercent}% Mastered</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden mb-6">
          <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progressPercent}%` }} />
        </div>

        {/* 3D Flip Card Container */}
        <div 
          onClick={handleFlip}
          className="perspective-1000 w-full h-64 sm:h-72 cursor-pointer select-none mb-6"
        >
          <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d rounded-2xl border ${
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

              <div className="my-auto text-center">
                <p className="text-lg sm:text-xl font-bold text-foreground leading-relaxed px-2">
                  {currentCard.front}
                </p>
                {currentCard.hint && (
                  <p className="text-xs text-muted-foreground/80 mt-3 italic">
                    Hint: {currentCard.hint}
                  </p>
                )}
              </div>

              <div className="text-center text-[11px] text-muted-foreground">
                Tap anywhere to reveal answer
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

              <div className="my-auto text-center overflow-y-auto max-h-44 custom-scrollbar px-2">
                <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed">
                  {currentCard.back}
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMastered();
                  }}
                  className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm transition-all apple-press"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> I Know This! (+XP)
                </button>
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
            Use <strong>←</strong> <strong>→</strong> keys to navigate, <strong>Space</strong> to flip
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
