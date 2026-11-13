/**
 * Notifications derived from real app state (exam date, reading progress, library content),
 * plus any events other parts of the app push via pushNotification().
 * Read state is stored per notification id.
 */
import { LIBRARY } from "@/data/libraryIndex";
import { daysUntilFinals, docKey, getAllProgress, getLastRead, FINALS_START } from "@/lib/readingProgress";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  href?: string;
}

const READ_KEY = "cl_notifications_read_v1";
const PUSHED_KEY = "itm_notifications";
export const NOTIFICATIONS_EVENT = "itm_notifications_updated";

function readIds(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(READ_KEY) || "[]") as string[]);
  } catch {
    return new Set();
  }
}

function pushed(): AppNotification[] {
  try {
    const list = JSON.parse(localStorage.getItem(PUSHED_KEY) || "[]") as AppNotification[];
    // drop the old hard-coded placeholder that used to be seeded here
    return Array.isArray(list) ? list.filter((n) => n && n.id && n.id !== "notif-mst") : [];
  } catch {
    return [];
  }
}

export function buildNotifications(now = new Date()): AppNotification[] {
  const read = readIds();
  const out: AppNotification[] = [];
  const days = daysUntilFinals(now);
  const today = now.toISOString().slice(0, 10);

  if (days > 0 && days <= 30) {
    out.push({
      id: `finals-countdown-${today}`,
      title: days === 1 ? "Finals start tomorrow" : `Finals start in ${days} days`,
      message: `First paper on ${FINALS_START.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}. Plan today's reading in the Library.`,
      timestamp: now.toISOString(),
      read: false,
      href: "/library",
    });
  }

  const last = getLastRead();
  if (last) {
    const s = LIBRARY.find((x) => x.slug === last.subject);
    const d = s?.docs.find((x) => x.slug === last.doc);
    const p = d ? getAllProgress()[docKey(last.subject, last.doc)] : undefined;
    if (s && d && p && !p.done) {
      out.push({
        id: `continue-${last.subject}-${last.doc}-${today}`,
        title: `Continue ${s.short}: ${d.title}`,
        message: `You're ${Math.round(p.pct * 100)}% through. About ${Math.max(1, Math.round((d.words / 200) * (1 - p.pct)))} min left.`,
        timestamp: p.updatedAt,
        read: false,
        href: `/library/${s.slug}/${d.slug}`,
      });
    }
  }

  const docCount = LIBRARY.reduce((n, s) => n + s.docs.length, 0);
  out.push({
    id: "library-sem3-launch",
    title: "Semester 3 Library is live",
    message: `${docCount} documents across ${LIBRARY.map((s) => s.short).join(", ")}: study guides, lecture notes, slides and handwritten notes.`,
    timestamp: "2026-11-13T09:00:00+05:30",
    read: false,
    href: "/library",
  });

  return [...out, ...pushed()]
    .map((n) => ({ ...n, read: n.read || read.has(n.id) }))
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp));
}

export function markNotificationsRead(ids: string[]) {
  try {
    const read = readIds();
    ids.forEach((id) => read.add(id));
    localStorage.setItem(READ_KEY, JSON.stringify([...read].slice(-200)));
    window.dispatchEvent(new Event(NOTIFICATIONS_EVENT));
  } catch {
    /* ignore */
  }
}

/** Let any feature raise a notification (e.g. a support reply, an achievement). */
export function pushNotification(n: Omit<AppNotification, "read" | "timestamp"> & { timestamp?: string }) {
  try {
    const list = pushed().filter((x) => x.id !== n.id);
    list.unshift({ ...n, timestamp: n.timestamp ?? new Date().toISOString(), read: false });
    localStorage.setItem(PUSHED_KEY, JSON.stringify(list.slice(0, 30)));
    window.dispatchEvent(new Event(NOTIFICATIONS_EVENT));
  } catch {
    /* ignore */
  }
}
