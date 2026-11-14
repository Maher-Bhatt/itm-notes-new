import { useState, useEffect } from 'react';
import { AlertCircle, AlertTriangle, Info, X, Calendar } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { openTimetable } from './GlobalTimetableModal';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  severity: 'info' | 'warning' | 'critical';
  active: boolean;
  createdAt: string;
}

export const DEFAULT_ANNOUNCEMENT: Announcement = {
  id: 'ann-viva-remedial-schedule-2026',
  title: 'ITM SLS Baroda Submission Viva & Remedial Timetable Live',
  body: 'B.Tech Sem 3 practical viva (Classes 1–5 in NL-2, JAVA LAB, NL-6, EB-39, EB-25) & Sem 5 Remedials start Oct 26.',
  severity: 'warning',
  active: true,
  createdAt: new Date().toISOString(),
};

export function AnnouncementBanner() {
  const { pathname } = useLocation();
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  const loadAnnouncement = () => {
    try {
      const raw = localStorage.getItem('itm_announcements');
      let current: Announcement | null = null;
      if (raw) {
        const list = JSON.parse(raw);
        if (Array.isArray(list) && list.length > 0) {
          const activeOnes = list.filter((a: Announcement) => a.active);
          current = activeOnes[0] || null;
        }
      }
      if (!current) {
        current = DEFAULT_ANNOUNCEMENT;
      }

      if (current) {
        const dismissedRaw = localStorage.getItem('itm_dismissed_announcements');
        const dismissed: string[] = dismissedRaw ? JSON.parse(dismissedRaw) : [];
        if (dismissed.includes(current.id)) {
          setAnnouncement(null);
          return;
        }
      }

      setAnnouncement(current);
    } catch (e) {
      console.warn('Failed to load announcement:', e);
      setAnnouncement(null);
    }
  };

  useEffect(() => {
    loadAnnouncement();

    const handleStorageChange = () => loadAnnouncement();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('itm_announcement_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('itm_announcement_updated', handleStorageChange);
    };
  }, []);

  const handleDismiss = () => {
    if (!announcement) return;
    try {
      const dismissedRaw = localStorage.getItem('itm_dismissed_announcements');
      const dismissed: string[] = dismissedRaw ? JSON.parse(dismissedRaw) : [];
      if (!dismissed.includes(announcement.id)) {
        dismissed.push(announcement.id);
        localStorage.setItem('itm_dismissed_announcements', JSON.stringify(dismissed));
      }
    } catch (e) {
      console.warn('Failed to save dismissed announcement to localStorage:', e);
    }
    setAnnouncement(null);
  };

  const isMaintenanceActive = (() => {
    try {
      const stored = localStorage.getItem('itm_maintenance_mode');
      return stored === 'true';
    } catch {
      return false;
    }
  })();

  // The reader is a focused, full-screen view: keep banners out of it.
  const isReader = /^\/library\/[^/]+\/[^/]+/.test(pathname) || pathname.includes('/topic/');
  if (isReader || isMaintenanceActive || !announcement || !announcement.active) return null;

  return (
    <div className="relative z-40 border-b border-border bg-accent/70 text-foreground px-4 py-2 transition-all text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className="font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground">
              {announcement.severity === 'critical' ? 'Alert' : 'Campus Update'}
            </span>
            <span className="font-bold text-foreground text-[11px] sm:text-xs">{announcement.title}:</span>
            <span className="text-muted-foreground font-normal text-[11px] sm:text-xs line-clamp-2 sm:line-clamp-1">
              {announcement.body}
            </span>
            <button
              type="button"
              onClick={() => openTimetable('viva')}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-card border border-border hover:border-primary/40 text-foreground font-bold text-[10px] cursor-pointer transition-all ml-1 shadow-2xs"
            >
              <Calendar className="h-3 w-3" />
              <span>View Timetables</span>
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="p-1.5 -mr-1 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors shrink-0 flex items-center justify-center cursor-pointer"
          title="Dismiss announcement"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
