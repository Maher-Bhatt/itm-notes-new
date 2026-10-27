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
  ChevronUp,
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

  const isMaintenanceActive = (() => {
    try {
      const stored = localStorage.getItem('itm_maintenance_mode');
      return stored === 'true';
    } catch {
      return false;
    }
  })();

  if (isMaintenanceActive) return null;

  return (
    <>
      {/* ── Persistent Floating Pill ── */}
      {isRunning && !isModalOpen && (
        <div className="fixed bottom-5 left-4 sm:left-auto sm:right-6 z-40 slide-up" style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}>
          <div className="bg-card/90 backdrop-blur-md border border-primary/30 shadow-lg rounded-full px-4 py-2 flex items-center gap-3 text-xs select-none glass-strong">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors press"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-foreground opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success-foreground"></span>
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
              className="p-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 press"
              title={isRunning ? 'Pause' : 'Resume'}
            >
              {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="p-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground press"
              title="Expand Focus Studio"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ── Focus Studio Modal Dialog ── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-card border border-border rounded-xl max-w-md w-full p-6 sm:p-8 shadow-xl relative animate-scale-in glass-strong">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground press"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header info */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2 border border-primary/20">
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
            <div className="flex rounded-lg bg-secondary/60 p-1 mb-6 border border-border/50">
              <button
                onClick={() => setMode('study')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'study'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Flame className="h-3.5 w-3.5" /> Study (25m)
              </button>
              <button
                onClick={() => setMode('break')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'break'
                    ? 'bg-success text-success-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Coffee className="h-3.5 w-3.5" /> Break (5m)
              </button>
            </div>

            {/* Big Timer Display */}
            <div className="flex flex-col items-center justify-center py-4 mb-4">
              <div className="text-5xl sm:text-6xl font-black font-mono tracking-tighter text-foreground mb-4">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-secondary overflow-hidden mb-2">
                <div
                  className={`h-full transition-all duration-1000 ${
                    mode === 'study' ? 'bg-primary' : 'bg-success'
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
                  className="px-3 py-1 rounded-lg text-[11px] font-semibold bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border press"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={resetTimer}
                className="p-3.5 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors press"
                title="Reset Session"
              >
                <RotateCcw className="h-5 w-5" />
              </button>

              <button
                onClick={toggleTimer}
                className={`flex-1 py-3.5 rounded-lg font-bold text-base inline-flex items-center justify-center gap-2 shadow-sm transition-all press ${
                  isRunning
                    ? 'bg-warning text-warning-foreground hover:bg-warning/90'
                    : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20'
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
              <span className="flex items-center gap-1.5 text-warning-foreground dark:text-warning-foreground font-semibold">
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
