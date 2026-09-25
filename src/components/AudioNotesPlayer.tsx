import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, FastForward, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface AudioNotesPlayerProps {
  title: string;
  textToRead: string;
}

export function AudioNotesPlayer({ title, textToRead }: AudioNotesPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(1);
  const [isSupported, setIsSupported] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Clean text from markdown characters for natural speech
  const cleanSpeechText = useCallback((text: string) => {
    return text
      .replace(/```[\s\S]*?```/g, ' [Code omitted for listening] ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/[#*_~>]/g, ' ')
      .replace(/\$\$[\s\S]*?\$\$/g, ' [Mathematical equation] ')
      .replace(/\$([^$]+)\$/g, '$1')
      .replace(/\s+/g, ' ')
      .trim();
  }, []);

  const handlePlay = () => {
    if (!isSupported) {
      toast.error('Text-to-Speech is not supported in this browser.');
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const cleaned = cleanSpeechText(textToRead);
    const speech = new SpeechSynthesisUtterance(cleaned);
    speech.rate = rate;
    speech.pitch = 1.0;

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Siri'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      speech.voice = preferredVoice;
    }

    speech.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    speech.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = speech;
    window.speechSynthesis.speak(speech);
    setIsPlaying(true);
    setIsPaused(false);
    toast.success(`Playing audio notes for "${title}"`, {
      description: `Speed: ${rate}x · Listen while commuting or taking a break.`,
    });
  };

  const handlePause = () => {
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const toggleRate = () => {
    const nextRate = rate === 1 ? 1.25 : rate === 1.25 ? 1.5 : rate === 1.5 ? 2 : 1;
    setRate(nextRate);
    if (isPlaying) {
      handleStop();
      setTimeout(handlePlay, 100);
    }
  };

  if (!isSupported) return null;

  return (
    <div className="print-hidden flex items-center justify-between gap-3 p-3 rounded-xl bg-secondary/40 border border-border/80 my-4 shadow-sm">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
          isPlaying ? 'bg-primary text-primary-foreground animate-pulse' : 'bg-secondary text-muted-foreground'
        }`}>
          {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-foreground">Audio Notes</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-primary/10 text-primary">
              AI Voice
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground truncate">
            {isPlaying ? 'Reading topic aloud...' : isPaused ? 'Paused' : 'Listen to this topic'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={toggleRate}
          className="text-xs font-mono font-bold px-2 py-1 rounded bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
          title="Change Playback Speed"
        >
          {rate}x
        </button>

        {isPlaying ? (
          <button
            onClick={handlePause}
            className="p-1.5 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition-colors apple-press"
            title="Pause Reading"
          >
            <Pause className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handlePlay}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity apple-press shadow-sm"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            {isPaused ? 'Resume' : 'Listen'}
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors"
            title="Stop Reading"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
