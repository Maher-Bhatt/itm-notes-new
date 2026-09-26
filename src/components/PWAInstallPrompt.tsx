import { useState, useEffect } from 'react';
import { Download, X, Sparkles } from 'lucide-react';

export function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Track visit count
    try {
      const isDismissed = localStorage.getItem('itm_pwa_install_dismissed') === 'true';
      if (isDismissed) return;

      const visits = Number(localStorage.getItem('itm_visit_count') || '0') + 1;
      localStorage.setItem('itm_visit_count', String(visits));

      if (visits >= 3) {
        setShowPrompt(true);
      }
    } catch {}

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else {
      // Browser doesn't support automatic prompt trigger or already installed
      setShowPrompt(false);
      try {
        localStorage.setItem('itm_pwa_install_dismissed', 'true');
      } catch {}
      alert('To install ITM Notes, tap your browser menu (⋮ or Share) and select "Add to Home Screen" or "Install App".');
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    try {
      localStorage.setItem('itm_pwa_install_dismissed', 'true');
    } catch {}
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-card border border-primary/40 rounded-2xl p-4 shadow-2xl animate-fade-in text-foreground backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md shrink-0">
            ITM
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-foreground">Install ITM Notes</h4>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-primary/20 text-primary flex items-center gap-0.5">
                <Sparkles className="h-2.5 w-2.5" /> PWA
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Install for instant offline reading and 1-tap notes access from your home screen.
            </p>
          </div>
        </div>

        <button
          onClick={handleDismiss}
          className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-border/60">
        <button
          onClick={handleDismiss}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:bg-secondary transition-colors"
        >
          Maybe Later
        </button>
        <button
          onClick={handleInstall}
          className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm apple-press"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Install Now</span>
        </button>
      </div>
    </div>
  );
}
