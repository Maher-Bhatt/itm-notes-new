import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useGamification } from '@/hooks/useGamification';
import { toast } from 'sonner';

export type PomodoroMode = 'study' | 'break';

interface PomodoroContextType {
  timeLeft: number;
  isRunning: boolean;
  mode: PomodoroMode;
  sessionCount: number;
  totalDuration: number;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  toggleTimer: () => void;
  resetTimer: () => void;
  setMode: (mode: PomodoroMode) => void;
  setDurationMinutes: (minutes: number) => void;
}

const STORAGE_KEY = 'itm_pomodoro_state';

// Web Audio API chime generator for pleasant study bells
function playChime(isBreak: boolean) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';

    if (isBreak) {
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.setValueAtTime(659.25, now + 0.15); // E5
    } else {
      osc1.frequency.setValueAtTime(587.33, now); // D5
      osc1.frequency.setValueAtTime(880.00, now + 0.15); // A5
    }

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.2);
    osc2.stop(now + 1.2);
  } catch {
    // Audio context restricted by autoplay
  }
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(undefined);

export function PomodoroProvider({ children }: { children: React.ReactNode }) {
  const [studyMinutes, setStudyMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [mode, setModeState] = useState<PomodoroMode>('study');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { recordStudyTime, unlockAchievement } = useGamification();
  const endTimeRef = useRef<number | null>(null);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setModeState(parsed.mode || 'study');
        setSessionCount(parsed.sessionCount || 0);

        if (parsed.isRunning && parsed.targetTimestamp) {
          const remaining = Math.max(0, Math.round((parsed.targetTimestamp - Date.now()) / 1000));
          if (remaining > 0) {
            setTimeLeft(remaining);
            setIsRunning(true);
            endTimeRef.current = parsed.targetTimestamp;
          } else {
            setTimeLeft(0);
            setIsRunning(false);
          }
        } else {
          setTimeLeft(parsed.timeLeft || (parsed.mode === 'break' ? 5 * 60 : 25 * 60));
          setIsRunning(false);
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          timeLeft,
          isRunning,
          mode,
          sessionCount,
          targetTimestamp: isRunning && endTimeRef.current ? endTimeRef.current : null,
        })
      );
    } catch {
      // Ignore
    }
  }, [timeLeft, isRunning, mode, sessionCount]);

  // Main countdown ticker using real timestamp math
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning) {
      if (!endTimeRef.current) {
        endTimeRef.current = Date.now() + timeLeft * 1000;
      }

      interval = setInterval(() => {
        const remaining = Math.max(0, Math.round((endTimeRef.current! - Date.now()) / 1000));
        setTimeLeft(remaining);

        if (remaining <= 0) {
          clearInterval(interval!);
          setIsRunning(false);
          endTimeRef.current = null;

          if (mode === 'study') {
            playChime(false);
            recordStudyTime(studyMinutes);
            unlockAchievement('focus-hero');
            setSessionCount((prev) => prev + 1);

            toast.success('🎉 Pomodoro Focus Sprint Completed!', {
              description: `You focused for ${studyMinutes} minutes! +50 XP awarded. Take a 5-minute breather.`,
              duration: 6000,
            });

            setModeState('break');
            setTimeLeft(breakMinutes * 60);
          } else {
            playChime(true);
            toast.info('☕ Break finished! Ready for another study sprint?', {
              description: 'Click Start Focus to keep up your momentum.',
              duration: 5000,
            });

            setModeState('study');
            setTimeLeft(studyMinutes * 60);
          }
        }
      }, 1000);
    } else {
      endTimeRef.current = null;
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, mode, studyMinutes, breakMinutes, recordStudyTime, unlockAchievement]);

  const startTimer = useCallback(() => {
    endTimeRef.current = Date.now() + timeLeft * 1000;
    setIsRunning(true);
    toast.success(mode === 'study' ? '🎯 Focus timer started (25m)' : '☕ Break timer started');
  }, [timeLeft, mode]);

  const pauseTimer = useCallback(() => {
    setIsRunning(false);
    endTimeRef.current = null;
    toast.info('Timer paused');
  }, []);

  const toggleTimer = useCallback(() => {
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  }, [isRunning, pauseTimer, startTimer]);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    endTimeRef.current = null;
    const duration = mode === 'study' ? studyMinutes * 60 : breakMinutes * 60;
    setTimeLeft(duration);
    toast.info('Timer reset');
  }, [mode, studyMinutes, breakMinutes]);

  const setMode = useCallback(
    (newMode: PomodoroMode) => {
      setIsRunning(false);
      endTimeRef.current = null;
      setModeState(newMode);
      setTimeLeft(newMode === 'study' ? studyMinutes * 60 : breakMinutes * 60);
    },
    [studyMinutes, breakMinutes]
  );

  const setDurationMinutes = useCallback(
    (mins: number) => {
      setIsRunning(false);
      endTimeRef.current = null;
      if (mode === 'study') {
        setStudyMinutes(mins);
        setTimeLeft(mins * 60);
      } else {
        setBreakMinutes(mins);
        setTimeLeft(mins * 60);
      }
    },
    [mode]
  );

  const totalDuration = mode === 'study' ? studyMinutes * 60 : breakMinutes * 60;

  return (
    <PomodoroContext.Provider
      value={{
        timeLeft,
        isRunning,
        mode,
        sessionCount,
        totalDuration,
        isModalOpen,
        setIsModalOpen,
        startTimer,
        pauseTimer,
        toggleTimer,
        resetTimer,
        setMode,
        setDurationMinutes,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error('usePomodoro must be used within a PomodoroProvider');
  }
  return context;
}
