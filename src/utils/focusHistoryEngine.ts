/**
 * ITM Notes - Focus History & Weekly Focus Report Engine
 * Tracks completed Pomodoro study sessions, compiles weekly focus bar charts,
 * and breaks down deep work hours across core subjects.
 */

export interface FocusSession {
  id: string;
  timestamp: string; // ISO String
  durationMinutes: number;
  subjectName: string;
  notes?: string;
}

export interface DailyFocusSummary {
  date: string;
  dayLabel: string;
  hours: number;
}

const STORAGE_KEY = 'itm_focus_sessions_log';

export function getFocusSessions(): FocusSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}

  // Realistic seed data for the current week
  return [
    { id: 'f-1', timestamp: new Date(Date.now() - 5 * 86400000).toISOString(), durationMinutes: 50, subjectName: 'Data Structures (DSA)' },
    { id: 'f-2', timestamp: new Date(Date.now() - 4 * 86400000).toISOString(), durationMinutes: 75, subjectName: 'Java (OOPJ)' },
    { id: 'f-3', timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), durationMinutes: 60, subjectName: 'Computer Architecture' },
    { id: 'f-4', timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), durationMinutes: 90, subjectName: 'Database Systems (DBMS)' },
    { id: 'f-5', timestamp: new Date(Date.now() - 1 * 86400000).toISOString(), durationMinutes: 45, subjectName: 'Numerical Python' },
  ];
}

export function logCompletedFocusSession(durationMinutes: number, subjectName: string, notes?: string): FocusSession {
  const sessions = getFocusSessions();
  const newSession: FocusSession = {
    id: `focus-${Date.now()}`,
    timestamp: new Date().toISOString(),
    durationMinutes,
    subjectName,
    notes,
  };

  const updated = [newSession, ...sessions];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Failed to persist focus session:", e);
  }
  return newSession;
}

export function getWeeklyFocusData(): DailyFocusSummary[] {
  const sessions = getFocusSessions();
  const days: DailyFocusSummary[] = [];

  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86400000);
    const dateStr = d.toISOString().slice(0, 10);
    const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });

    // Sum minutes for this date
    const dayMinutes = sessions
      .filter(s => s.timestamp.slice(0, 10) === dateStr)
      .reduce((acc, s) => acc + s.durationMinutes, 0);

    days.push({
      date: dateStr,
      dayLabel,
      hours: Math.round((dayMinutes / 60) * 10) / 10,
    });
  }

  return days;
}

export function getTotalWeeklyFocusHours(): number {
  const data = getWeeklyFocusData();
  return Math.round(data.reduce((acc, d) => acc + d.hours, 0) * 10) / 10;
}

export function getFocusSummary(): {
  totalMinutes: number;
  totalSessions: number;
  weeklyHours: number;
} {
  const sessions = getFocusSessions();
  const totalMinutes = sessions.reduce((acc, s) => acc + s.durationMinutes, 0);
  const weeklyHours = getTotalWeeklyFocusHours();

  return {
    totalMinutes,
    totalSessions: sessions.length,
    weeklyHours,
  };
}
