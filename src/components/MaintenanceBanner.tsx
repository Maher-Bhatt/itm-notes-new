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
  EyeOff,
  Cpu,
  ShieldCheck,
  Database,
  Terminal,
  KeyRound,
  CheckCircle2,
  X,
  RefreshCw,
  Activity
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
  passkey?: string;
}

export function generateUniqueMaintenanceKey(): string {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const randomChars = Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
  const randomDigits = Math.floor(100 + Math.random() * 900);
  return `ITM-${randomChars}-${randomDigits}`;
}

const DEFAULT_CONFIG: MaintenanceConfig = {
  active: false,
  title: "Scheduled Infrastructure Maintenance",
  message: "ITM Notes is currently deploying an upgraded multi-university syllabus engine and sandboxed LeetCode-grade coding lab. All user study logs and notes remain 100% safe. We will be back online momentarily.",
  endTime: null,
  passkey: "",
};

export function MaintenanceBanner() {
  const { role, user } = useAuth();
  const isAdmin = role === 'admin' || user?.email?.toLowerCase() === 'maherbhatt01@gmail.com';
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

  const [isPreviewingAsStudent, setIsPreviewingAsStudent] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('itm_preview_maintenance') === 'true';
    } catch {
      return false;
    }
  });

  const [visitorAccessKey, setVisitorAccessKey] = useState<string>(() => {
    try {
      return sessionStorage.getItem('itm_maintenance_access_key') || '';
    } catch {
      return '';
    }
  });
  const [inputKey, setInputKey] = useState('');
  const [showKeyPrompt, setShowKeyPrompt] = useState(false);
  const [keyError, setKeyError] = useState(false);

  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  // Purge any legacy unauthorized god mode tokens from browser storage
  useEffect(() => {
    try {
      localStorage.removeItem('itm_admin_god_mode');
      sessionStorage.removeItem('itm_admin_bypassed');
    } catch {}
  }, []);

  // 1. Fetch Cloud Config & Listen for Real-Time Sync across devices
  useEffect(() => {
    const fetchCloudSettings = async () => {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('status')
          .eq('email', 'maherbhatt01@gmail.com')
          .maybeSingle();

        if (data && data.status) {
          if (data.status.startsWith('MAINTENANCE:')) {
            try {
              const parsed = JSON.parse(data.status.replace('MAINTENANCE:', ''));
              setConfig(parsed);
              localStorage.setItem('itm_maintenance_config', JSON.stringify(parsed));
              localStorage.setItem('itm_maintenance_mode', String(parsed.active));
              return;
            } catch {}
          } else if (data.status === 'MAINTENANCE_ON') {
            setConfig(prev => ({ ...prev, active: true }));
            localStorage.setItem('itm_maintenance_mode', 'true');
            return;
          } else if (data.status === 'Active' || data.status === 'MAINTENANCE_OFF') {
            setConfig(prev => ({ ...prev, active: false }));
            localStorage.setItem('itm_maintenance_mode', 'false');
            return;
          }
        }
      } catch {}
    };

    fetchCloudSettings();

    // Listen to local sync events
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

    const handlePreviewTrigger = () => {
      setIsPreviewingAsStudent(true);
      sessionStorage.setItem('itm_preview_maintenance', 'true');
    };

    window.addEventListener('storage', handleLocalSync);
    window.addEventListener('itm_maintenance_updated', handleLocalSync);
    window.addEventListener('itm_preview_maintenance', handlePreviewTrigger);

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

    const channel = supabase
      .channel('platform_maintenance_profiles_v4')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'profiles',
          filter: 'email=eq.maherbhatt01@gmail.com',
        },
        (payload: any) => {
          const newStatus = payload?.new?.status;
          if (newStatus && typeof newStatus === 'string') {
            if (newStatus.startsWith('MAINTENANCE:')) {
              try {
                const parsed = JSON.parse(newStatus.replace('MAINTENANCE:', ''));
                setConfig(parsed);
                localStorage.setItem('itm_maintenance_config', JSON.stringify(parsed));
                localStorage.setItem('itm_maintenance_mode', String(parsed.active));
              } catch {}
            } else if (newStatus === 'Active' || newStatus === 'MAINTENANCE_OFF') {
              setConfig(prev => ({ ...prev, active: false }));
              localStorage.setItem('itm_maintenance_mode', 'false');
            }
          }
        }
      )
      .subscribe();

    return () => {
      window.removeEventListener('storage', handleLocalSync);
      window.removeEventListener('itm_maintenance_updated', handleLocalSync);
      window.removeEventListener('itm_preview_maintenance', handlePreviewTrigger);
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

  // 3. Overflow Management & Locking Decision
  const isKeyValid = Boolean(
    config.passkey &&
    visitorAccessKey &&
    visitorAccessKey.trim().toUpperCase() === config.passkey.trim().toUpperCase()
  );

  const isBlocking = (config.active && !isAdmin && !isKeyValid) || (isAdmin && isPreviewingAsStudent);

  useEffect(() => {
    if (isBlocking) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isBlocking]);

  const handleUnlockWithKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.passkey) {
      toast.error('No emergency access key has been configured by the administrator.');
      return;
    }
    if (inputKey.trim().toUpperCase() === config.passkey.trim().toUpperCase()) {
      sessionStorage.setItem('itm_maintenance_access_key', config.passkey);
      setVisitorAccessKey(config.passkey);
      setKeyError(false);
      setShowKeyPrompt(false);
      toast.success('Access key verified! Entering preview session.');
    } else {
      setKeyError(true);
      toast.error('Invalid or expired maintenance access key.');
    }
  };

  const handleDeactivate = async () => {
    const updated = { ...config, active: false, endTime: null };
    setConfig(updated);
    setIsPreviewingAsStudent(false);
    sessionStorage.removeItem('itm_preview_maintenance');
    try {
      localStorage.setItem('itm_maintenance_config', JSON.stringify(updated));
      localStorage.setItem('itm_maintenance_mode', 'false');
      window.dispatchEvent(new Event('itm_maintenance_updated'));
      
      try {
        const bc = new BroadcastChannel('itm_maintenance_channel');
        bc.postMessage(updated);
        bc.close();
      } catch {}

      await supabase
        .from('profiles')
        .update({ status: 'Active' })
        .eq('email', 'maherbhatt01@gmail.com');

      toast.success('Maintenance mode deactivated globally.');
    } catch {
      toast.info('Deactivated locally.');
    }
  };

  const exitPreview = () => {
    setIsPreviewingAsStudent(false);
    sessionStorage.removeItem('itm_preview_maintenance');
  };

  // Admin Floating Ribbon (When Maintenance is ON and Founder/Admin is reviewing the portal)
  if (config.active && isAdmin && !isPreviewingAsStudent) {
    return (
      <aside aria-label="System Maintenance Notification" className="fixed top-0 left-0 right-0 z-[100] bg-zinc-900 text-zinc-100 px-4 py-2.5 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs font-mono border-b border-zinc-800">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="font-semibold text-zinc-200">MAINTENANCE_LOCK: Active for Students</span>
          {timeLeft && (
            <span className="bg-zinc-800 border border-zinc-700/80 px-2 py-0.5 rounded text-[11px] text-zinc-300">
              ETA: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsPreviewingAsStudent(true);
              sessionStorage.setItem('itm_preview_maintenance', 'true');
            }}
            className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-zinc-700 text-xs font-sans font-medium"
          >
            <Eye className="h-3.5 w-3.5" /> Preview Lockout Screen
          </button>
          <button
            onClick={handleDeactivate}
            className="px-3 py-1 bg-white text-zinc-950 hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer text-xs font-sans font-bold"
          >
            Turn OFF Globally
          </button>
        </div>
      </aside>
    );
  }

  // Visitor Preview Active Ribbon (When visitor entered a valid dynamic key)
  if (config.active && !isAdmin && isKeyValid) {
    return (
      <div className="fixed bottom-4 right-4 z-[9999] bg-zinc-900/95 border border-zinc-700 text-zinc-100 px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-medium backdrop-blur-md animate-fade-in font-sans">
        <KeyRound className="h-4 w-4 text-amber-400" />
        <span>Tester Preview Session Active</span>
        <button
          onClick={() => {
            sessionStorage.removeItem('itm_maintenance_access_key');
            setVisitorAccessKey('');
            toast.info('Session ended. Locked back to maintenance screen.');
          }}
          className="ml-2 text-[10px] font-bold px-2.5 py-1 rounded-lg bg-zinc-100 text-zinc-900 hover:bg-white transition-colors cursor-pointer"
        >
          Relock Screen
        </button>
      </div>
    );
  }

  if (!isBlocking) return null;

  // ── ARCHITECTURAL HIGH-TECH STATUS LOCKOUT SCREEN ──
  return (
    <div className="fixed inset-0 z-[99999] bg-zinc-950 text-zinc-100 flex flex-col overflow-hidden font-sans select-none antialiased">
      {/* Background Subtle Architectural Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Top Status Navigation */}
      <nav className="relative z-20 h-16 border-b border-zinc-800/80 flex items-center justify-between px-6 sm:px-10 shrink-0 bg-zinc-950/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-zinc-100">ITM Notes Infrastructure</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                STATUS: UPGRADE_ACTIVE
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isPreviewingAsStudent ? (
            <button
              onClick={exitPreview}
              className="px-3 py-1.5 bg-white text-zinc-950 hover:bg-zinc-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <EyeOff className="h-3.5 w-3.5" />
              <span>Exit Live Preview</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span>All Data Protected</span>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 overflow-y-auto custom-scrollbar flex items-center py-8">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Mission Description & Countdown */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono">
              <Activity className="h-3.5 w-3.5 text-zinc-400 animate-pulse" />
              <span>Release Deployment v2.4 • Multi-University Engine</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-100 leading-[1.15]">
              System Upgrade In Progress.
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
              {config.message || DEFAULT_CONFIG.message}
            </p>

            {/* Countdown / Status Box */}
            {timeLeft ? (
              <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 max-w-md mx-auto lg:mx-0 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono mb-3">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-zinc-400" /> Estimated Resumption
                  </span>
                  <span className="text-[11px] text-zinc-500">Auto-refreshing</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                    <span className="font-mono text-2xl font-black text-zinc-100">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-zinc-500 block uppercase font-bold mt-0.5">Hours</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                    <span className="font-mono text-2xl font-black text-zinc-100">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-zinc-500 block uppercase font-bold mt-0.5">Minutes</span>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                    <span className="font-mono text-2xl font-black text-amber-400">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-zinc-500 block uppercase font-bold mt-0.5">Seconds</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 max-w-md mx-auto lg:mx-0 text-xs text-zinc-400 flex items-center gap-3">
                <RefreshCw className="h-4 w-4 text-zinc-400 animate-spin shrink-0" />
                <span>Engineers are finishing deployment calibrations. The portal will automatically become accessible once verification checks pass.</span>
              </div>
            )}

            {/* Access Key Prompt */}
            <div className="max-w-md mx-auto lg:mx-0 pt-2">
              {!showKeyPrompt ? (
                <button
                  type="button"
                  onClick={() => setShowKeyPrompt(true)}
                  className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5 mx-auto lg:mx-0 font-medium cursor-pointer"
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  <span>Faculty or Tester Access Key? Unlock preview</span>
                </button>
              ) : (
                <form
                  onSubmit={handleUnlockWithKey}
                  className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2.5 animate-fade-in text-left shadow-2xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-zinc-300 flex items-center gap-1.5">
                      <KeyRound className="h-3.5 w-3.5 text-zinc-400" />
                      Enter Emergency Access Key
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowKeyPrompt(false)}
                      className="text-zinc-500 hover:text-zinc-300 p-0.5 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputKey}
                      onChange={(e) => {
                        setInputKey(e.target.value);
                        setKeyError(false);
                      }}
                      placeholder="e.g. ITM-XXXX-123"
                      className={`flex-1 h-9 px-3 rounded-lg bg-zinc-950 border text-xs font-mono text-zinc-100 placeholder:text-zinc-600 focus:outline-none ${
                        keyError ? "border-rose-500 focus:border-rose-500" : "border-zinc-700 focus:border-zinc-500"
                      }`}
                    />
                    <button
                      type="submit"
                      className="h-9 px-4 rounded-lg bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
                    >
                      Unlock
                    </button>
                  </div>
                  {keyError && (
                    <p className="text-[11px] text-rose-400 font-medium">
                      Invalid or expired access key. Check with administrator.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Live Infrastructure Cluster Diagnostics */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                <span className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-zinc-400" /> Subsystem Diagnostics
                </span>
                <span className="text-[10px] font-mono text-zinc-400">All Nodes Secure</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Database className="h-4 w-4 text-zinc-400" />
                    <span className="font-medium text-zinc-200">PostgreSQL Shards</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 font-semibold">100% HEALTHY</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Layers className="h-4 w-4 text-zinc-400" />
                    <span className="font-medium text-zinc-200">Multi-University Engine</span>
                  </div>
                  <span className="font-mono text-[10px] text-amber-400 font-semibold animate-pulse">DEPLOYING v2.4</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Cpu className="h-4 w-4 text-zinc-400" />
                    <span className="font-medium text-zinc-200">Coding Lab Sandboxes</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 font-semibold">CALIBRATED</span>
                </div>

                <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-zinc-400" />
                    <span className="font-medium text-zinc-200">Row Level Security</span>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 font-semibold">ZERO-TRUST ACTIVE</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-500 font-mono flex items-center justify-between">
                <span>Cluster Node: bom-blr-01</span>
                <span>Region: Asia-South1</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
