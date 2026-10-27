import { usePomodoro } from '@/contexts/PomodoroContext';
import {
  Play,
  Pause,
  RotateCcw,
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
          <div className="bg-card/90 backdrop-blur-md border border-border shadow-lg text-foreground rounded-full px-4 py-2 flex items-center gap-3 text-xs select-none">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 text-foreground font-bold hover:text-amber-500 transition-colors press"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <Clock className="h-3.5 w-3.5 text-amber-500" />
              <span className="font-mono text-sm tracking-tight font-extrabold">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-muted-foreground uppercase font-semibold hidden sm:inline">
                {mode === 'study' ? 'Focus' : 'Break'}
              </span>
            </button>

            <button
              onClick={toggleTimer}
              className="p-1.5 rounded-full bg-amber-500 text-white hover:bg-primary/90 press"
              title={isRunning ? 'Pause' : 'Resume'}
            >
              {isRunning ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="p-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-white press"
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
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-scale-in">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-white press"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header info */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-amber-500 text-xs font-bold uppercase tracking-wider mb-2 border border-primary/20">
                <Clock className="h-3.5 w-3.5" />
                {mode === 'study' ? 'Deep Study Session' : 'Rest & Recharge'}
              </div>
              <h3 className="text-2xl font-black text-white">
                {mode === 'study' ? 'Pomodoro Focus Timer' : 'Short Break Time'}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {mode === 'study'
                  ? 'Eliminate distractions and master your academic topics.'
                  : 'Step away from the screen, stretch, and hydrate.'}
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex rounded-lg bg-white/5 p-1 mb-6 border border-white/10">
              <button
                onClick={() => setMode('study')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'study'
                    ? 'bg-gradient-electric text-white shadow-lg shadow-primary/40'
                    : 'text-muted-foreground hover:text-white'
                }`}
              >
                <Flame className="h-3.5 w-3.5" /> Study (25m)
              </button>
              <button
                onClick={() => setMode('break')}
                className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 ${
                  mode === 'break'
                    ? 'bg-accent/20 text-amber-500 shadow-lg shadow-accent/30'
                    : 'text-muted-foreground hover:text-white'
                }`}
              >
                <Coffee className="h-3.5 w-3.5" /> Break (5m)
              </button>
            </div>

            {/* Big Timer Display */}
            <div className="flex flex-col items-center justify-center py-4 mb-4">
              <div className="text-5xl sm:text-6xl font-black font-mono tracking-tighter text-white mb-4">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden mb-2">
                <div
                  className={`h-full transition-all duration-1000 ${
                    mode === 'study' ? 'bg-gradient-electric' : 'bg-gradient-pink-purple'
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="w-full flex justify-between text-[11px] text-white/50 font-medium">
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
                  className="px-3 py-1 rounded-lg text-[11px] font-semibold bg-white/10 hover:bg-white/20 text-muted-foreground hover:text-white border border-white/10 press"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={resetTimer}
                className="p-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-muted-foreground hover:text-white transition-colors border border-white/10 press"
                title="Reset Session"
              >
                <RotateCcw className="h-5 w-5" />
              </button>

              <button
                onClick={toggleTimer}
                className={`flex-1 py-3.5 rounded-lg font-bold text-base inline-flex items-center justify-center gap-2 shadow-lg transition-all press ${
                  isRunning
                    ? 'bg-gradient-pink-purple text-white hover:bg-primary/90 shadow-lg shadow-accent/30'
                    : 'bg-gradient-electric text-white shadow-lg shadow-primary/30'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="h-5 w-5" /> Pause Focus
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" /> Start Focus Sprint
                  </>
                )}
              </button>
            </div>

            {/* Footer XP Details */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
              <span className="flex items-center gap-1.5 text-amber-500 font-semibold">
                <Clock className="h-4 w-4" /> +50 XP on completion
              </span>
              <span>
                Sessions: <strong className="text-white">{sessionCount}</strong> completed
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}