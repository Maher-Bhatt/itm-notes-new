import { useState, useEffect } from 'react';
import { AlertTriangle, Wrench, X, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function MaintenanceBanner() {
  const { role } = useAuth();
  const isAdmin = role === 'admin';

  const [isActive, setIsActive] = useState<boolean>(() => {
    try {
      return localStorage.getItem('itm_maintenance_mode') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const checkState = () => {
      try {
        setIsActive(localStorage.getItem('itm_maintenance_mode') === 'true');
      } catch (e) {
        console.warn('Failed to read maintenance mode state:', e);
      }
    };

    window.addEventListener('storage', checkState);
    window.addEventListener('itm_maintenance_updated', checkState);

    // Realtime broadcast synchronization with Supabase
    const channel = supabase.channel('platform_maintenance')
      .on('broadcast', { event: 'status_change' }, (payload) => {
        if (payload?.payload && typeof payload.payload.active === 'boolean') {
          setIsActive(payload.payload.active);
          try {
            localStorage.setItem('itm_maintenance_mode', String(payload.payload.active));
          } catch {}
        }
      })
      .subscribe();

    return () => {
      window.removeEventListener('storage', checkState);
      window.removeEventListener('itm_maintenance_updated', checkState);
      supabase.removeChannel(channel);
    };
  }, []);

  const handleDeactivate = () => {
    setIsActive(false);
    try {
      localStorage.setItem('itm_maintenance_mode', 'false');
      window.dispatchEvent(new Event('itm_maintenance_updated'));
      supabase.channel('platform_maintenance').send({
        type: 'broadcast',
        event: 'status_change',
        payload: { active: false },
      });
      toast.success('Maintenance mode deactivated for all users.');
    } catch (e) {
      console.warn('Failed to deactivate maintenance mode:', e);
    }
  };

  if (!isActive) return null;

  return (
    <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-amber-700 text-white px-4 py-2.5 shadow-md relative z-[70] border-b border-black/10 animate-fade-in">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm font-medium">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="p-1 rounded-md bg-white/20 text-white shrink-0">
            <AlertTriangle className="h-4 w-4 animate-pulse" />
          </span>
          <div className="truncate">
            <span className="font-bold uppercase tracking-wider text-[11px] bg-black/25 px-2 py-0.5 rounded mr-2">
              Maintenance Mode
            </span>
            <span>
              Scheduled platform updates are actively underway. Some interactive features may experience brief interruptions.
            </span>
          </div>
        </div>

        {isAdmin && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden md:inline text-[11px] opacity-90 font-mono">
              [Admin View]
            </span>
            <button
              onClick={handleDeactivate}
              className="px-2.5 py-1 rounded bg-white text-rose-700 hover:bg-white/90 text-xs font-bold transition-all shadow-sm apple-press"
            >
              Turn Off
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
