import React, { useState, useEffect } from 'react';
import { 
  Rocket, 
  ArrowRight, 
  Lock, 
  Clock, 
  Sparkles, 
  Layers, 
  Globe, 
  Eye, 
  EyeOff
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useLocation } from 'react-router-dom';

export interface MaintenanceConfig {
  active: boolean;
  title: string;
  message: string;
  endTime: string | null;
}

const DEFAULT_CONFIG: MaintenanceConfig = {
  active: false,
  title: "We are building something incredible.",
  message: "ITM Notes is currently undergoing a scheduled infrastructure upgrade to bring you a faster, more intelligent learning experience. We will be back online shortly.",
  endTime: null,
};

export function MaintenanceBanner() {
  const { role } = useAuth();
  const isAdmin = role === 'admin';
  const location = useLocation();

  const [config, setConfig] = useState<MaintenanceConfig>(() => {
    try {
      const stored = localStorage.getItem('itm_maintenance_config');
      if (stored) return JSON.parse(stored);
      const simple = localStorage.getItem('itm_maintenance_mode');
      return { ...DEFAULT_CONFIG, active: simple === 'true' };
    } catch {
      return DEFAULT_CONFIG;
    }
  });

  const [adminBypass, setAdminBypass] = useState<boolean>(() => {
    try { 
      return sessionStorage.getItem('itm_admin_bypassed') === 'true' || 
             localStorage.getItem('itm_admin_god_mode') === 'true'; 
    } catch { 
      return false; 
    }
  });

  const [isPreviewingAsStudent, setIsPreviewingAsStudent] = useState(false);
  const [masterKey, setMasterKey] = useState('');
  const [showKeyPrompt, setShowKeyPrompt] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  // 1. Fetch Cloud Config on Mount + Realtime synchronization
  useEffect(() => {
    const fetchCloudSettings = async () => {
      try {
        const { data } = await supabase
          .from('app_settings' as any)
          .select('value')
          .eq('key', 'maintenance_mode')
          .maybeSingle();

        if (data && (data as any).value) {
          const cloudConfig = (data as any).value as MaintenanceConfig;
          setConfig(cloudConfig);
          localStorage.setItem('itm_maintenance_config', JSON.stringify(cloudConfig));
          localStorage.setItem('itm_maintenance_mode', String(cloudConfig.active));
        }
      } catch {
        // Fallback to local storage
      }
    };

    fetchCloudSettings();

    // Listen to local storage & custom events
    const handleLocalSync = () => {
      try {
        const stored = localStorage.getItem('itm_maintenance_config');
        if (stored) setConfig(JSON.parse(stored));
        else {
          const simple = localStorage.getItem('itm_maintenance_mode');
          setConfig(prev => ({ ...prev, active: simple === 'true' }));
        }
      } catch {}
    };

    window.addEventListener('storage', handleLocalSync);
    window.addEventListener('itm_maintenance_updated', handleLocalSync);

    // Multi-tab broadcast channel
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel('itm_maintenance_channel');
      bc.onmessage = (event) => {
        if (event.data) {
          setConfig(event.data);
          localStorage.setItem('itm_maintenance_config', JSON.stringify(event.data));
          localStorage.setItem('itm_maintenance_mode', String(event.data.active));
        }
      };
    } catch {}

    // Realtime Supabase Channel
    const channel = supabase.channel('platform_maintenance_v2')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'app_settings' }, (payload: any) => {
        if (payload?.new?.key === 'maintenance_mode' && payload?.new?.value) {
          const updated = payload.new.value as MaintenanceConfig;
          setConfig(updated);
          localStorage.setItem('itm_maintenance_config', JSON.stringify(updated));
          localStorage.setItem('itm_maintenance_mode', String(updated.active));
        }
      })
      .on('broadcast', { event: 'status_change' }, (payload: any) => {
        if (payload?.payload) {
          const updated = payload.payload as MaintenanceConfig;
          setConfig(updated);
          localStorage.setItem('itm_maintenance_config', JSON.stringify(updated));
          localStorage.setItem('itm_maintenance_mode', String(updated.active));
        }
      })
      .subscribe();

    return () => {
      window.removeEventListener('storage', handleLocalSync);
      window.removeEventListener('itm_maintenance_updated', handleLocalSync);
      if (bc) bc.close();
      supabase.removeChannel(channel);
    };
  }, []);

  // 2. Countdown Timer Logic
  useEffect(() => {
    if (!config.endTime || !config.active) {
      setTimeLeft(null);
      return;
    }

    const interval = setInterval(() => {
      const diff = new Date(config.endTime!).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft(null);
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [config.endTime, config.active]);

  // 3. Overflow Management
  const isBlocking = config.active && ((!adminBypass && !isAdmin) || isPreviewingAsStudent) && location.pathname !== '/auth';

  useEffect(() => {
    if (isBlocking) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isBlocking]);

  const handleDeactivate = async () => {
    const updated = { ...config, active: false, endTime: null };
    setConfig(updated);
    try {
      localStorage.setItem('itm_maintenance_config', JSON.stringify(updated));
      localStorage.setItem('itm_maintenance_mode', 'false');
      window.dispatchEvent(new Event('itm_maintenance_updated'));
      
      try {
        const bc = new BroadcastChannel('itm_maintenance_channel');
        bc.postMessage(updated);
        bc.close();
      } catch {}

      await supabase.from('app_settings' as any).upsert({
        key: 'maintenance_mode',
        value: updated,
        updated_at: new Date().toISOString(),
      });
      toast.success('Maintenance mode deactivated globally.');
    } catch {
      toast.info('Deactivated locally.');
    }
  };

  const handleMasterKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = masterKey.trim().toLowerCase();
    if (cleanKey === '2026' || cleanKey === 'velocity' || cleanKey === 'itm2026') {
      setAdminBypass(true);
      sessionStorage.setItem('itm_admin_bypassed', 'true');
      localStorage.setItem('itm_admin_god_mode', 'true');
      toast.success('Admin Bypass Granted.');
      setShowKeyPrompt(false);
    } else {
      toast.error('Invalid Master Override Key');
      setMasterKey('');
    }
  };

  if (location.pathname === '/auth') return null;

  // Admin / Bypass Mode Floating Ribbon
  if (config.active && (isAdmin || adminBypass) && !isPreviewingAsStudent) {
    return (
      <aside aria-label="System Maintenance Notification" className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-amber-950 px-4 py-2 shadow-md flex items-center justify-between text-xs font-bold border-b border-amber-600/30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
          <span>System Locked for Students (Admin Bypass Active)</span>
          {timeLeft && (
            <span className="bg-amber-600/20 px-2 py-0.5 rounded font-mono">
              Window ends in: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPreviewingAsStudent(true)}
            className="px-2.5 py-1 bg-amber-600/30 hover:bg-amber-600/50 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Eye className="h-3.5 w-3.5" /> Preview Student View
          </button>
          <button
            onClick={handleDeactivate}
            className="px-2.5 py-1 bg-amber-950 text-white rounded-lg hover:bg-black transition-colors cursor-pointer"
          >
            Turn Off Globally
          </button>
        </div>
      </aside>
    );
  }

  if (!isBlocking) return null;

  // Fullscreen Takeover
  return (
    <div className="fixed inset-0 z-[99999] bg-background flex flex-col overflow-hidden font-sans select-none">
      <nav className="h-20 border-b flex items-center justify-between px-6 sm:px-10 shrink-0 bg-card/60 backdrop-blur-md">
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

        {isPreviewingAsStudent ? (
          <button
            onClick={() => setIsPreviewingAsStudent(false)}
            className="px-3.5 py-1.5 bg-primary text-primary-foreground rounded-xl text-xs font-bold flex items-center gap-1.5 shadow cursor-pointer"
          >
            <EyeOff className="h-4 w-4" /> Exit Live Preview
          </button>
        ) : (
          <button 
            onDoubleClick={() => setShowKeyPrompt(true)}
            className="px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            {showKeyPrompt ? 'Admin Override' : 'ITM Notes'}
          </button>
        )}
      </nav>

      <main className="flex-1 overflow-y-auto flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-16 w-full">
          {/* Left Hero Message */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold animate-pulse">
              <Sparkles className="h-4 w-4" /> Platform Upgrading
            </div>
            
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              We are building <br className="hidden lg:block"/>
              something <span className="text-primary">incredible.</span>
            </h2>
            
            <p className="text-base text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {config.message || DEFAULT_CONFIG.message}
            </p>

            {/* Live Countdown Timer */}
            {timeLeft && (
              <div className="p-4 rounded-2xl bg-card border shadow-sm max-w-md mx-auto lg:mx-0">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                  Estimated Service Restoration In
                </span>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-secondary/50 border">
                    <span className="font-mono text-2xl font-black text-foreground">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="text-[10px] text-muted-foreground block uppercase font-bold">Hours</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-secondary/50 border">
                    <span className="font-mono text-2xl font-black text-foreground">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="text-[10px] text-muted-foreground block uppercase font-bold">Minutes</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-secondary/50 border">
                    <span className="font-mono text-2xl font-black text-foreground">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="text-[10px] text-muted-foreground block uppercase font-bold">Seconds</span>
                  </div>
                </div>
              </div>
            )}

            {showKeyPrompt && (
              <form onSubmit={handleMasterKeySubmit} className="flex max-w-sm mx-auto lg:mx-0 gap-2 p-2 bg-card rounded-2xl border shadow-sm">
                <input
                  type="password"
                  value={masterKey}
                  onChange={(e) => setMasterKey(e.target.value)}
                  placeholder="Master Key or PIN..."
                  className="flex-1 bg-transparent px-4 outline-none text-sm"
                  autoFocus
                />
                <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-xs font-semibold shadow cursor-pointer">
                  Unlock
                </button>
              </form>
            )}
          </div>

          {/* Right Showcase Card */}
          <div className="flex-1 w-full max-w-lg">
            <div className="relative rounded-3xl overflow-hidden bg-card border shadow-xl p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-foreground flex items-center justify-center">
                  <Rocket className="h-6 w-6 text-background" />
                </div>
                <div>
                  <h3 className="text-lg font-bold tracking-tight">Built by Velocity Web</h3>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider">Premium Digital Agency</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                We craft high-performance web applications, striking UI/UX designs, and scalable digital solutions for modern businesses.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-secondary/50 flex flex-col gap-2 border">
                  <Layers className="h-5 w-5 text-primary" />
                  <span className="text-xs font-bold">UI/UX Design</span>
                </div>
                <div className="p-3 rounded-2xl bg-secondary/50 flex flex-col gap-2 border">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-xs font-bold">Web Apps</span>
                </div>
              </div>

              <a 
                href="https://www.velocityweb.in" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-12 flex items-center justify-center gap-2 bg-foreground text-background rounded-xl font-semibold shadow hover:scale-[1.02] transition-transform"
              >
                Visit Velocity Web <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
