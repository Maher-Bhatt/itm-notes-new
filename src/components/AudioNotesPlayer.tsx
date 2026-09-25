import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, SkipForward, SkipBack, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface AudioNotesPlayerProps {
  title: string;
  textToRead: string;
}

export function AudioNotesPlayer({ title, textToRead }: AudioNotesPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(1);
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  const [isSupported, setIsSupported] = useState(true);

  // Keep references to prevent garbage collection and closure stale state
  const isPlayingRef = useRef(false);
  const isPausedRef = useRef(false);
  const currentChunkIndexRef = useRef(0);
  const chunksRef = useRef<string[]>([]);
  const keepAliveIntervalRef = useRef<any>(null);

  // Clean raw text into natural, spoken English
  const cleanSpeechText = useCallback((text: string) => {
    return text
      .replace(/```[\s\S]*?```/g, ' [Code example omitted for audio] ')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '')
      .replace(/[#*_~>]/g, ' ')
      .replace(/\\\[[\s\S]*?\\\]/g, ' [Formula] ')
      .replace(/\\\([\s\S]*?\\\)/g, ' [Formula] ')
      .replace(/\$\$[\s\S]*?\$\$/g, ' [Formula] ')
      .replace(/\$([^$]+)\$/g, '$1')
      .replace(/\|[^|\n]+\|/g, ' ')
      .replace(/[-]{3,}/g, ' ')
      .replace(/O\(([a-zA-Z0-9^ +*]+)\)/g, 'Big O of $1')
      .replace(/->/g, ' leads to ')
      .replace(/<-/g, ' is assigned ')
      .replace(/!=/g, ' not equal to ')
      .replace(/==/g, ' equals ')
      .replace(/<=/g, ' less than or equal to ')
      .replace(/>=/g, ' greater than or equal to ')
      .replace(/\s+/g, ' ')
      .trim();
  }, []);

  // Split into manageable sentence chunks (avoiding the 200-char browser cutoff limit)
  const chunks = useMemo(() => {
    const cleaned = cleanSpeechText(textToRead);
    if (!cleaned) return [];

    // Split on sentence boundaries (. ! ?) while keeping the punctuation
    const rawSentences = cleaned.match(/[^.!?]+[.!?]+(\s+|$)|[^.!?]+$/g) || [cleaned];
    const groupedChunks: string[] = [];
    let currentBuffer = '';

    for (const sentence of rawSentences) {
      const trimmed = sentence.trim();
      if (!trimmed) continue;

      if ((currentBuffer + ' ' + trimmed).length < 220) {
        currentBuffer = currentBuffer ? `${currentBuffer} ${trimmed}` : trimmed;
      } else {
        if (currentBuffer) groupedChunks.push(currentBuffer);
        currentBuffer = trimmed;
      }
    }

    if (currentBuffer) {
      groupedChunks.push(currentBuffer);
    }

    return groupedChunks;
  }, [textToRead, cleanSpeechText]);

  useEffect(() => {
    chunksRef.current = chunks;
    currentChunkIndexRef.current = 0;
    setCurrentChunkIndex(0);
  }, [chunks]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      stopPlayback();
    };
  }, []);

  // Chrome TTS Keep-Alive Workaround (prevents speech from cutting off after 15 seconds)
  const startKeepAlive = () => {
    if (keepAliveIntervalRef.current) clearInterval(keepAliveIntervalRef.current);
    keepAliveIntervalRef.current = setInterval(() => {
      if (window.speechSynthesis && isPlayingRef.current && !isPausedRef.current) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      }
    }, 9000);
  };

  const stopKeepAlive = () => {
    if (keepAliveIntervalRef.current) {
      clearInterval(keepAliveIntervalRef.current);
      keepAliveIntervalRef.current = null;
    }
  };

  const stopPlayback = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    stopKeepAlive();
    isPlayingRef.current = false;
    isPausedRef.current = false;
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  // Plays a specific chunk index sequentially
  const speakChunk = useCallback((index: number) => {
    if (!('speechSynthesis' in window)) return;
    const allChunks = chunksRef.current;
    if (index >= allChunks.length) {
      // Reached the very end of notes
      stopPlayback();
      currentChunkIndexRef.current = 0;
      setCurrentChunkIndex(0);
      toast.success(`Completed audio notes for "${title}"!`);
      return;
    }

    window.speechSynthesis.cancel();

    currentChunkIndexRef.current = index;
    setCurrentChunkIndex(index);
    isPlayingRef.current = true;
    isPausedRef.current = false;
    setIsPlaying(true);
    setIsPaused(false);

    const chunkText = allChunks[index];
    const utterance = new SpeechSynthesisUtterance(chunkText);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Pick best natural sounding English voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice =
      voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Siri'))) ||
      voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      if (isPlayingRef.current && !isPausedRef.current) {
        speakChunk(index + 1);
      }
    };

    utterance.onerror = (e) => {
      // Ignore user-initiated cancellation errors
      if (e.error === 'interrupted' || e.error === 'canceled') return;
      if (isPlayingRef.current && index + 1 < allChunks.length) {
        speakChunk(index + 1);
      } else {
        stopPlayback();
      }
    };

    startKeepAlive();
    window.speechSynthesis.speak(utterance);
  }, [rate, title, stopPlayback]);

  const handlePlay = () => {
    if (!isSupported) {
      toast.error('Text-to-Speech is not supported in this browser.');
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      isPausedRef.current = false;
      isPlayingRef.current = true;
      setIsPaused(false);
      setIsPlaying(true);
      startKeepAlive();
      return;
    }

    if (chunks.length === 0) {
      toast.error('No readable text available for this topic.');
      return;
    }

    speakChunk(currentChunkIndexRef.current);
    toast.success(`Reading full audio notes for "${title}"`, {
      description: `${chunks.length} sections · Listen hands-free with auto-progression.`,
    });
  };

  const handlePause = () => {
    if ('speechSynthesis' in window && isPlaying) {
      window.speechSynthesis.pause();
      stopKeepAlive();
      isPausedRef.current = true;
      isPlayingRef.current = false;
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleNextChunk = () => {
    if (currentChunkIndex + 1 < chunks.length) {
      speakChunk(currentChunkIndex + 1);
    }
  };

  const handlePrevChunk = () => {
    if (currentChunkIndex > 0) {
      speakChunk(currentChunkIndex - 1);
    } else {
      speakChunk(0);
    }
  };

  const toggleRate = () => {
    const nextRate = rate === 1 ? 1.25 : rate === 1.25 ? 1.5 : rate === 1.5 ? 2 : rate === 2 ? 0.8 : 1;
    setRate(nextRate);
    if (isPlaying) {
      speakChunk(currentChunkIndexRef.current);
    }
  };

  if (!isSupported) return null;

  const progressPercent = chunks.length > 0 ? Math.round(((currentChunkIndex + 1) / chunks.length) * 100) : 0;

  return (
    <div className="print-hidden flex flex-col gap-2 p-3 sm:p-3.5 rounded-2xl bg-secondary/35 border border-border/80 my-5 shadow-sm hover:border-border transition-all">
      <div className="flex items-center justify-between gap-3">
        {/* Left Info & Icon */}
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
              isPlaying
                ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20 animate-pulse'
                : 'bg-secondary text-muted-foreground'
            }`}
          >
            {isPlaying ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs sm:text-sm font-bold text-foreground">Continuous Audio Lecture</span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-primary/10 text-primary flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5" /> Full Topic
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground truncate">
              {isPlaying
                ? `Reading section ${currentChunkIndex + 1} of ${chunks.length}...`
                : isPaused
                ? `Paused at section ${currentChunkIndex + 1}`
                : `Complete audio narration (${chunks.length} sections · ~${Math.max(1, Math.round(chunks.length * 0.3))} min)`}
            </p>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Skip Back */}
          {(isPlaying || isPaused) && (
            <button
              onClick={handlePrevChunk}
              disabled={currentChunkIndex === 0}
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
            {rate}x
          </button>

          {/* Play / Pause Toggle */}
          {isPlaying ? (
            <button
              onClick={handlePause}
              className="p-2 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-colors apple-press shadow-sm"
              title="Pause Reading"
            >
              <Pause className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handlePlay}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity apple-press shadow-sm"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>{isPaused ? 'Resume' : 'Listen All'}</span>
            </button>
          )}

          {/* Skip Forward */}
          {(isPlaying || isPaused) && (
            <button
              onClick={handleNextChunk}
              disabled={currentChunkIndex + 1 >= chunks.length}
              className="p-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors apple-press"
              title="Next Sentence"
            >
              <SkipForward className="h-3.5 w-3.5" />
            </button>
          )}

          {/* Reset / Stop */}
          {(isPlaying || isPaused) && (
            <button
              onClick={stopPlayback}
              className="p-1.5 rounded-lg bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors apple-press"
              title="Stop & Reset"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Subtle Progress Bar when active */}
      {(isPlaying || isPaused) && chunks.length > 0 && (
        <div className="w-full mt-1">
          <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-muted-foreground mt-1 font-mono">
            <span>Section {currentChunkIndex + 1}/{chunks.length}</span>
            <span>{progressPercent}% completed</span>
          </div>
        </div>
      )}
    </div>
  );
}
