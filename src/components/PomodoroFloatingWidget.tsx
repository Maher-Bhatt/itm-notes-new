import { usePomodoro } from '@/contexts/PomodoroContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  Clock, 
  X, 
  Maximize2, 
  Coffee, 
  Flame,
  ChevronUp
} from 'lucide-react';

export function PomodoroFloatingWidget() {
  const {
    timeLeft,
    isRunning,
    mode,
    sessionCount,
    totalDuration,
    isModalOpen,
    setIsModalOpen,
    toggleTimer,
    resetTimer,
    setMode,
    setDurationMinutes,
  } = usePomodoro();

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = Math.min(100, Math.round(((totalDuration - timeLeft) / totalDuration) * 100));

  return (
    <>
      {/* ── Persistent Floating Pill (Visible when running or toggled) ── */}
      {isRunning && !isModalOpen && (
        <div className="fixed bottom-6 right-6 z-40 animate-slide-up">
          <div className="bg-card/95 backdrop-blur-md border border-primary/30 shadow-xl rounded-full px-4 py-2 flex items-center gap-3 text-xs select-none">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span className="font-mono text-sm tracking-tight font-extrabold">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold hidden sm:inline">
                {mode === 'study' ? 'Focus' : 'Break'}
              </span>
            </button>

            <button
              onClick={toggleTimer}
              className="p-1.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 apple-press"
              title={isRunning ? 'Pause' : 'Resume'}
            >
              {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="p-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground"
              title="Expand Focus Studio"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ── Focus Studio Modal Dialog ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header info */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                <Clock className="h-3.5 w-3.5" />
                {mode === 'study' ? 'Deep Study Session' : 'Rest & Recharge'}
              </div>
              <h3 className="text-2xl font-black text-foreground">
                {mode === 'study' ? 'Pomodoro Focus Timer' : 'Short Break Time'}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {mode === 'study'
                  ? 'Eliminate distractions and master your academic topics.'
                  : 'Step away from the screen, stretch, and hydrate.'}
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex rounded-xl bg-secondary/60 p-1 mb-6">
              <button
                onClick={() => setMode('study')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'study'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Flame className="h-3.5 w-3.5" /> Study (25m)
              </button>
              <button
                onClick={() => setMode('break')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'break'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Coffee className="h-3.5 w-3.5" /> Break (5m)
              </button>
            </div>

            {/* Big Timer Display */}
            <div className="flex flex-col items-center justify-center py-4 mb-4">
              <div className="text-6xl sm:text-7xl font-black font-mono tracking-tighter text-foreground mb-4">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-3 rounded-full bg-secondary overflow-hidden mb-2">
                <div
                  className={`h-full transition-all duration-1000 ${
                    mode === 'study' ? 'bg-primary' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="w-full flex justify-between text-[11px] text-muted-foreground font-medium">
                <span>0:00</span>
                <span>{progressPercent}% Complete</span>
                <span>{Math.floor(totalDuration / 60)}:00</span>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[
                { label: '15m Quick', mins: 15, m: 'study' as const },
                { label: '25m Standard', mins: 25, m: 'study' as const },
                { label: '50m Deep', mins: 50, m: 'study' as const },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setMode(preset.m);
                    setDurationMinutes(preset.mins);
                  }}
                  className="px-3 py-1 rounded-lg text-[11px] font-semibold bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={resetTimer}
                className="p-3.5 rounded-2xl bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors apple-press"
                title="Reset Session"
              >
                <RotateCcw className="h-5 w-5" />
              </button>

              <button
                onClick={toggleTimer}
                className={`flex-1 py-3.5 rounded-2xl font-black text-base inline-flex items-center justify-center gap-2 shadow-lg transition-all apple-press ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                    : 'bg-primary hover:opacity-90 text-primary-foreground shadow-primary/20'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-5 w-5" /> Pause Focus
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 fill-current" /> Start Focus Sprint
                  </>
                )}
              </button>
            </div>

            {/* Footer XP Details */}
            <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-semibold">
                <Sparkles className="h-4 w-4" /> +50 XP on completion
              </span>
              <span>
                Sessions: <strong>{sessionCount}</strong> completed
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
