import { useState, useEffect } from 'react';
import { AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export interface Announcement {
  id: string;
  title: string;
  body: string;
  severity: 'info' | 'warning' | 'critical';
  active: boolean;
  createdAt: string;
}

export const DEFAULT_ANNOUNCEMENT: Announcement = {
  id: 'ann-welcome-exam-prep',
  title: 'ITM SLS Baroda Semester 3 MST & Final Exam Prep',
  body: 'Comprehensive lecture notes, solved IMP question banks, and MCQ mock quizzes are live for all CSE subjects!',
  severity: 'info',
  active: true,
  createdAt: new Date().toISOString(),
};

export function AnnouncementBanner() {
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
    } catch {
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
    } catch {}
    setAnnouncement(null);
  };

  if (!announcement || !announcement.active) return null;

  const severityStyles = {
    info: {
      wrapper: 'bg-primary/10 border-primary/30 text-primary-foreground',
      badge: 'bg-primary/20 text-primary border-primary/30',
      icon: <Info className="h-4 w-4 text-primary shrink-0" />,
      text: 'text-foreground',
    },
    warning: {
      wrapper: 'bg-amber-500/15 border-amber-500/30 text-amber-950 dark:text-amber-100',
      badge: 'bg-amber-500/25 text-amber-600 dark:text-amber-400 border-amber-500/40',
      icon: <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />,
      text: 'text-amber-950 dark:text-amber-100',
    },
    critical: {
      wrapper: 'bg-rose-500/15 border-rose-500/30 text-rose-950 dark:text-rose-100',
      badge: 'bg-rose-500/25 text-rose-600 dark:text-rose-400 border-rose-500/40',
      icon: <AlertCircle className="h-4 w-4 text-rose-500 shrink-0" />,
      text: 'text-rose-950 dark:text-rose-100',
    },
  };

  const style = severityStyles[announcement.severity] || severityStyles.info;

  return (
    <div className={`relative z-40 border-b px-4 py-2.5 transition-all text-xs ${style.wrapper}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {style.icon}
          <div className="flex flex-wrap items-center gap-2 min-w-0">
            <span className={`font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full border ${style.badge}`}>
              {announcement.severity}
            </span>
            <span className="font-bold text-foreground text-[11px] sm:text-xs">{announcement.title}:</span>
            <span className={`${style.text} font-medium text-[11px] sm:text-xs line-clamp-2 sm:line-clamp-1`}>{announcement.body}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="p-2.5 -mr-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
          title="Dismiss announcement"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
