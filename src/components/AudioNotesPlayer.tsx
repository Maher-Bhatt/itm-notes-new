import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, SkipForward, SkipBack, Sparkles, Mic } from 'lucide-react';
import { toast } from 'sonner';
import { aiVoice, VoicePlaybackState } from '@/utils/aiVoiceEngine';

interface AudioNotesPlayerProps {
  title: string;
  textToRead: string;
  className?: string;
}

export function AudioNotesPlayer({ title, textToRead, className = '' }: AudioNotesPlayerProps) {
  const [voiceState, setVoiceState] = useState<VoicePlaybackState>(() => aiVoice.getState());
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
      return;
    }

    const unsubscribe = aiVoice.subscribe((state) => {
      setVoiceState(state);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handlePlay = () => {
    if (!isSupported) {
      toast.error('Text-to-Speech is not supported in this browser.');
      return;
    }

    if (voiceState.isPaused) {
      aiVoice.resume();
      toast.info('Resuming audio lecture');
      return;
    }

    if (!textToRead || textToRead.trim().length === 0) {
      toast.error('No readable text available for this topic.');
      return;
    }

    aiVoice.speak(textToRead, () => {
      toast.success(`Completed audio notes for "${title}"!`);
    });

    toast.success(`Reading full audio notes for "${title}"`, {
      description: `Studio AI Voice · Listen hands-free with auto-progression.`,
    });
  };

  const handlePause = () => {
    aiVoice.pause();
  };

  const handleStop = () => {
    aiVoice.stop();
  };

  const handleNext = () => {
    aiVoice.next();
  };

  const handlePrev = () => {
    aiVoice.previous();
  };

  const toggleRate = () => {
    const nextRate = voiceState.rate === 1 ? 1.25 : voiceState.rate === 1.25 ? 1.5 : voiceState.rate === 1.5 ? 0.8 : 1;
    aiVoice.setRate(nextRate);
  };

  if (!isSupported) return null;

  const progressPercent = voiceState.totalSentences > 0 
    ? Math.min(100, Math.round(((voiceState.currentIndex + 1) / voiceState.totalSentences) * 100)) 
    : 0;

  return (
    <div className={`print-hidden flex flex-col gap-2 p-3 sm:p-3.5 rounded-2xl bg-secondary/35 border border-border/80 my-5 shadow-xs hover:border-border transition-all ${className}`}>
      <div className="flex items-center justify-between gap-3">
        {/* Left Info & Voice Indicator */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
              voiceState.isPlaying && !voiceState.isPaused
                ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20 animate-pulse'
                : 'bg-secondary text-muted-foreground'
            }`}
          >
            {voiceState.isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-foreground">Continuous Audio Lecture</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-1 border border-emerald-500/20">
                <Mic className="h-2.5 w-2.5" /> Studio AI Narrator
              </span>
              <span className="text-[10px] font-mono text-muted-foreground hidden sm:inline">
                ({voiceState.voiceName})
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground truncate">
              {voiceState.isPlaying && !voiceState.isPaused
                ? `Reading sentence ${voiceState.currentIndex + 1} of ${voiceState.totalSentences}: "${voiceState.currentSentence.slice(0, 50)}..."`
                : voiceState.isPaused
                ? `Paused at sentence ${voiceState.currentIndex + 1} of ${voiceState.totalSentences}`
                : `Complete audio narration · Single natural AI voice · Hands-free`}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Skip Back */}
          {(voiceState.isPlaying || voiceState.isPaused) && (
            <button
              onClick={handlePrev}
              disabled={voiceState.currentIndex === 0}
              className="p-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors apple-press"
              title="Previous Sentence"
            >
              <SkipBack className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Speed Toggle */}
          <button
            onClick={toggleRate}
            className="text-xs font-mono font-bold px-2 py-1 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors apple-press"
            title="Change Playback Speed"
          >
            {voiceState.rate}x
          </button>

          {/* Play / Pause Toggle */}
          {voiceState.isPlaying && !voiceState.isPaused ? (
            <button
              onClick={handlePause}
              className="p-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors apple-press shadow-xs"
              title="Pause Reading"
            >
              <Pause className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity apple-press shadow-xs"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{voiceState.isPaused ? 'Resume' : 'Listen All'}</span>
            </button>
          )}

          {/* Skip Forward */}
          {(voiceState.isPlaying || voiceState.isPaused) && (
            <button
              onClick={handleNext}
              disabled={voiceState.currentIndex + 1 >= voiceState.totalSentences}
              className="p-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors apple-press"
              title="Next Sentence"
            >
              <SkipForward className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Reset / Stop */}
          {(voiceState.isPlaying || voiceState.isPaused) && (
            <button
              onClick={handleStop}
              className="p-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors apple-press"
              title="Stop & Reset"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar when active */}
      {(voiceState.isPlaying || voiceState.isPaused) && voiceState.totalSentences > 0 && (
        <div className="w-full mt-1">
          <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-1 font-mono">
            <span>Sentence {voiceState.currentIndex + 1} of {voiceState.totalSentences}</span>
            <span>{progressPercent}% completed</span>
          </div>
        </div>
      )}
    </div>
  );
}
