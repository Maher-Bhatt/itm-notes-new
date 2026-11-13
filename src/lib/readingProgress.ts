/**
 * Local reading progress for the Library reader.
 * Stored per document as a 0–1 fraction so it survives font-size changes.
 */
const KEY = "cl_reading_progress_v1";
const LAST_KEY = "cl_reading_last_v1";

export interface DocProgress {
  pct: number;
  updatedAt: string;
  done?: boolean;
}

type ProgressMap = Record<string, DocProgress>;

function read(): ProgressMap {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") as ProgressMap;
  } catch {
    return {};
  }
}

export function docKey(subject: string, doc: string) {
  return `${subject}/${doc}`;
}

export function getProgress(subject: string, doc: string): DocProgress | undefined {
  return read()[docKey(subject, doc)];
}

export function getAllProgress(): ProgressMap {
  return read();
}

export function saveProgress(subject: string, doc: string, pct: number, done?: boolean) {
  try {
    const map = read();
    const prev = map[docKey(subject, doc)];
    const clamped = Math.max(0, Math.min(1, pct));
    map[docKey(subject, doc)] = {
      pct: clamped,
      updatedAt: new Date().toISOString(),
      done: done ?? (prev?.done || clamped > 0.97),
    };
    localStorage.setItem(KEY, JSON.stringify(map));
    localStorage.setItem(LAST_KEY, docKey(subject, doc));
  } catch {
    /* storage full or unavailable */
  }
}

export function getLastRead(): { subject: string; doc: string } | null {
  try {
    const v = localStorage.getItem(LAST_KEY);
    if (!v) return null;
    const [subject, doc] = v.split("/");
    return subject && doc ? { subject, doc } : null;
  } catch {
    return null;
  }
}

/** Average adult reading speed for technical text */
export const WORDS_PER_MINUTE = 200;

export function minutesFor(words: number) {
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export const FINALS_START = new Date("2026-11-25T09:00:00+05:30");

export function daysUntilFinals(now = new Date()) {
  const ms = FINALS_START.getTime() - now.getTime();
  return Math.ceil(ms / 86_400_000);
}
