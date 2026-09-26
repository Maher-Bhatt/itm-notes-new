import { useState, useEffect } from 'react';
import { Keyboard, X, Search, Bookmark, Eye, HelpCircle } from 'lucide-react';

export function KeyboardShortcutsModal({ 
  open, 
  onOpenChange 
}: { 
  open?: boolean; 
  onOpenChange?: (open: boolean) => void 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const activeOpen = open !== undefined ? open : isOpen;
  const setOpen = (val: boolean) => {
    if (onOpenChange) onOpenChange(val);
    setIsOpen(val);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === 'Escape' && activeOpen) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeOpen]);

  if (!activeOpen) return null;

  const shortcuts = [
    {
      keys: ['⌘', 'K'],
      altKeys: ['Ctrl', 'K'],
      label: 'Global Search',
      description: 'Search all subjects, topics, question banks, and notes across the portal.',
      icon: <Search className="h-4 w-4 text-primary" />,
    },
    {
      keys: ['B'],
      label: 'Toggle Bookmark',
      description: 'Quickly bookmark or unbookmark the active topic while reading.',
      icon: <Bookmark className="h-4 w-4 text-amber-500" />,
    },
    {
      keys: ['F'],
      label: 'Toggle Focus Mode',
      description: 'Hide sidebars and distraction elements on TopicPage for deep study.',
      icon: <Eye className="h-4 w-4 text-emerald-500" />,
    },
    {
      keys: ['?'],
      label: 'Keyboard Shortcuts',
      description: 'Open this cheat sheet modal anywhere on ITM Notes.',
      icon: <HelpCircle className="h-4 w-4 text-indigo-500" />,
    },
    {
      keys: ['Esc'],
      label: 'Close Overlays',
      description: 'Close modals, drawers, and search dialogs.',
      icon: <X className="h-4 w-4 text-rose-500" />,
    },
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div 
        className="w-full max-w-md bg-card border border-border rounded-3xl p-6 shadow-2xl relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Keyboard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-foreground">Keyboard Shortcuts</h3>
              <p className="text-xs text-muted-foreground">Power-user keybindings for faster study navigation</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          {shortcuts.map((s) => (
            <div key={s.label} className="p-3 rounded-2xl border border-border/60 bg-secondary/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-foreground">{s.label}</h4>
                  <p className="text-[11px] text-muted-foreground">{s.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {s.keys.map((k) => (
                  <kbd
                    key={k}
                    className="px-2 py-1 text-[11px] font-mono font-bold rounded-lg bg-background border border-border text-foreground shadow-xs"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-border/40 text-center">
          <p className="text-[11px] text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 rounded bg-secondary text-[10px] font-mono border">?</kbd> at any time to open this cheat sheet.
          </p>
        </div>
      </div>
    </div>
  );
}
