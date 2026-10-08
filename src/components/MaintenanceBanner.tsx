import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  ArrowRight, 
  Lock, 
  Clock,
  Sparkles,
  Layers,
  Globe
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';

const GLOBAL_MAINTENANCE_ENABLED = true;

const checkMaintenanceActive = (): boolean => {
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('maintenance') === 'false' || params.get('bypass') === 'true' || params.get('bypass') === 'admin') {
      localStorage.setItem('itm_maintenance_mode', 'false');
      return false;
    }
    if (params.get('maintenance') === 'true') {
      localStorage.setItem('itm_maintenance_mode', 'true');
      return true;
    }

    const stored = localStorage.getItem('itm_maintenance_mode');
    if (stored === 'false') return false;
    if (stored === 'true') return true;
    return GLOBAL_MAINTENANCE_ENABLED;
  } catch {
    return GLOBAL_MAINTENANCE_ENABLED;
  }
};

export function MaintenanceBanner() {
  const { role } = useAuth();
  const isAdmin = role === 'admin';
  const location = useLocation();

  const [isActive, setIsActive] = useState<boolean>(checkMaintenanceActive());
  const [adminBypass, setAdminBypass] = useState<boolean>(() => {
    try { return sessionStorage.getItem('itm_admin_bypassed') === 'true'; } 
    catch { return false; }
  });

  const [masterKey, setMasterKey] = useState('');
  const [showKeyPrompt, setShowKeyPrompt] = useState(false);

  useEffect(() => {
    const checkState = () => setIsActive(checkMaintenanceActive());
    window.addEventListener('storage', checkState);
    window.addEventListener('itm_maintenance_updated', checkState);

    const channel = supabase.channel('platform_maintenance')
      .on('broadcast', { event: 'status_change' }, (payload) => {
        if (payload?.payload && typeof payload.payload.active === 'boolean') {
          setIsActive(payload.payload.active);
          try { localStorage.setItem('itm_maintenance_mode', String(payload.payload.active)); } catch {}
        }
      })
      .subscribe();

    return () => {
      window.removeEventListener('storage', checkState);
      window.removeEventListener('itm_maintenance_updated', checkState);
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (isActive && !adminBypass && !isAdmin && location.pathname !== '/auth') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isActive, adminBypass, isAdmin, location.pathname]);

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
      toast.success('Maintenance mode deactivated. Full system restored for all students.');
    } catch (e) {
      console.warn('Failed to deactivate maintenance mode:', e);
    }
  };

  const handleMasterKeySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Quick crypto hash comparison to prevent plain-text keys in bundle
    try {
      const msgBuffer = new TextEncoder().encode(masterKey.toLowerCase());
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // Hashes for 'velocity' and 'itm2026'
      if (
        hashHex === '7181fecba68c5b967ec7db698308ce015886d91d1e4ed422208e983416dddf8e' || 
        hashHex === 'b3db97fec2d5e2d6b38c353c070c7cb9d9196b010f3c5f4b50c058c42dbfa96b'
      ) {
        setAdminBypass(true);
        sessionStorage.setItem('itm_admin_bypassed', 'true');
        toast.success('Admin Bypass Granted. Welcome back.');
        setShowKeyPrompt(false);
      } else {
        toast.error('Invalid Master Override Key');
        setMasterKey('');
      }
    } catch {
      // Fallback
      toast.error('Cryptography module unavailable.');
      setMasterKey('');
    }
  };

  // Allow admin to login via /auth
  if (location.pathname === '/auth') {
    return null;
  }

  // If maintenance is OFF, or user is an Admin, or bypass is active -> Show nothing or small banner
  if (!isActive || isAdmin || adminBypass) {
    if (!isActive) return null;
    return (
      <div className="bg-primary text-primary-foreground px-4 py-2 shadow-sm relative z-[70] border-b animate-fade-in flex items-center justify-between">
        <span className="text-sm font-semibold flex items-center gap-2">
          <Lock className="h-4 w-4" /> System Locked (You are bypassing)
        </span>
        <button onClick={handleDeactivate} className="text-xs px-3 py-1 rounded bg-background text-foreground font-semibold">
          Turn Off Global Lock
        </button>
      </div>
    );
  }

  // Full Screen Takeover for outer visitors
  return (
    <div className="fixed inset-0 z-[99999] bg-background flex flex-col overflow-hidden font-sans">
      
      {/* Sleek Top Navigation */}
      <nav className="h-20 border-b flex items-center justify-between px-6 sm:px-10 shrink-0 bg-card/50 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">System Update</h1>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> Scheduled Maintenance
            </p>
          </div>
        </div>
        
        <button 
          onDoubleClick={() => setShowKeyPrompt(true)}
          className="px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          {showKeyPrompt ? 'Admin Override' : 'ITM Notes'}
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-12 sm:py-24 flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Status Message */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold animate-pulse">
              <Sparkles className="h-4 w-4" /> Platform Upgrading
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              We are building <br className="hidden lg:block"/>
              something <span className="text-primary">incredible.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              ITM Notes is currently undergoing a scheduled infrastructure upgrade to bring you a faster, more intelligent learning experience. We will be back online shortly.
            </p>

            {showKeyPrompt && (
              <form onSubmit={handleMasterKeySubmit} className="flex max-w-sm mx-auto lg:mx-0 gap-2 animate-scale-in p-2 bg-card rounded-2xl border shadow-sm">
                <input
                  type="password"
                  value={masterKey}
                  onChange={(e) => setMasterKey(e.target.value)}
                  placeholder="Master Key..."
                  className="flex-1 bg-transparent px-4 outline-none text-sm"
                  autoFocus
                />
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold shadow-sm">
                  Unlock
                </button>
              </form>
            )}
          </div>

          {/* Right Side: Velocity Web Promo Showcase */}
          <div className="flex-1 w-full max-w-lg">
            <div className="relative rounded-3xl overflow-hidden bg-card border shadow-xl p-8 space-y-8 apple-press">
              
              {/* Background abstract gradient */}
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-foreground flex items-center justify-center">
                      <Rocket className="h-6 w-6 text-background" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold tracking-tight">Built by Velocity Web</h3>
                      <p className="text-xs font-semibold text-primary uppercase tracking-wider">Premium Digital Agency</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We craft high-performance web applications, striking UI/UX designs, and scalable digital solutions for modern businesses.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-2xl bg-secondary/50 flex flex-col gap-2 border border-transparent hover:border-border transition-colors">
                      <Layers className="h-5 w-5 text-primary" />
                      <span className="text-xs font-bold">UI/UX Design</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-secondary/50 flex flex-col gap-2 border border-transparent hover:border-border transition-colors">
                      <Globe className="h-5 w-5 text-primary" />
                      <span className="text-xs font-bold">Web Apps</span>
                    </div>
                  </div>
                </div>

                <a 
                  href="https://www.velocityweb.in" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-12 flex items-center justify-center gap-2 bg-foreground text-background rounded-xl font-semibold shadow-md hover:scale-[1.02] transition-transform"
                >
                  Visit Velocity Web <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
