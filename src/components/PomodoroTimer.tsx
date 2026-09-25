import { usePomodoro } from '@/contexts/PomodoroContext';
import { Play, Pause, RotateCcw, Sparkles, Clock, Coffee, Flame } from 'lucide-react';

export function PomodoroTimer() {
  const {
    timeLeft,
    isRunning,
    mode,
    sessionCount,
    totalDuration,
    toggleTimer,
    resetTimer,
    setMode,
    setDurationMinutes,
  } = usePomodoro();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = Math.min(100, Math.round(((totalDuration - timeLeft) / totalDuration) * 100));

  return (
    <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className="font-bold text-sm text-foreground">
            {mode === 'study' ? 'Pomodoro Study Focus' : 'Short Break Time'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setMode('study')}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
              mode === 'study'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            Study (25m)
          </button>
          <button
            onClick={() => setMode('break')}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all ${
              mode === 'break'
                ? 'bg-emerald-600 text-white'
                : 'bg-secondary text-muted-foreground hover:text-foreground'
            }`}
          >
            Break (5m)
          </button>
        </div>
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
                <Play className="h-4 w-4 fill-current" /> Start Focus
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
        <span>
          {isRunning ? 'Timer active' : 'Paused'} · {sessionCount} completed
        </span>
      </div>
    </div>
  );
}
