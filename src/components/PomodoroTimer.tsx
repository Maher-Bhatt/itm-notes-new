import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Sparkles, Clock, CheckCircle } from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { toast } from 'sonner';

export function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const { recordStudyTime, unlockAchievement } = useGamification();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'study') {
        recordStudyTime(25);
        unlockAchievement('focus-hero');
        toast.success('🎉 Pomodoro Completed!', {
          description: 'You focused for 25 minutes. +50 XP awarded! Take a 5-minute break.',
        });
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        toast.info('Break finished! Ready for the next study sprint?');
        setMode('study');
        setTimeLeft(25 * 60);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, recordStudyTime, unlockAchievement]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'study' ? 25 * 60 : 5 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = mode === 'study'
    ? Math.round(((25 * 60 - timeLeft) / (25 * 60)) * 100)
    : Math.round(((5 * 60 - timeLeft) / (5 * 60)) * 100);

  return (
    <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className="font-bold text-sm text-foreground">
            {mode === 'study' ? 'Pomodoro Study Focus' : 'Short Break Time'}
          </span>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
          {mode === 'study' ? '25 Min Session' : '5 Min Break'}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center py-4">
        <div className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-foreground mb-3">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 rounded-full bg-secondary overflow-hidden mb-5">
          <div
            className={`h-full transition-all duration-1000 ${
              mode === 'study' ? 'bg-primary' : 'bg-emerald-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTimer}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm inline-flex items-center gap-2 shadow-sm transition-all apple-press ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-primary hover:opacity-90 text-primary-foreground'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4" /> Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" /> Start Focus
              </>
            )}
          </button>
          <button
            onClick={resetTimer}
            className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors apple-press"
            title="Reset Timer"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
          <Sparkles className="h-3.5 w-3.5" /> +50 XP reward upon completion
        </span>
        <span>{isRunning ? 'Timer active' : 'Paused'}</span>
      </div>
    </div>
  );
}
