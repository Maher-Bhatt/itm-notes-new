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
  X
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

  const [adminBypass, setAdminBypass] = useState<boolean>(() => {
    try { 
      return sessionStorage.getItem('itm_admin_bypassed') === 'true' || 
             localStorage.getItem('itm_admin_god_mode') === 'true'; 
    } catch { 
      return false; 
    }
  });

  const [isPreviewingAsStudent, setIsPreviewingAsStudent] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('itm_preview_maintenance') === 'true';
    } catch {
      return false;
    }
  });

  const [masterKey, setMasterKey] = useState('');
  const [showKeyPrompt, setShowKeyPrompt] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  // 1. Fetch Cloud Config & Listen for Real-Time Sync across devices
  useEffect(() => {
    const fetchCloudSettings = async () => {
      try {
        // Query the owner admin profile status for global persistence
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
      } catch {
        // Fallback to local storage if network fails
      }
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

    // BroadcastChannel across tabs
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

    // Realtime Supabase Channel on profiles table
    const channel = supabase
      .channel('platform_maintenance_profiles_v3')
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
  const isBlocking = (config.active && (!adminBypass && !isAdmin)) || isPreviewingAsStudent;

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

  const handleMasterKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = masterKey.trim().toLowerCase();
    if (cleanKey === '2026' || cleanKey === 'velocity' || cleanKey === 'itm2026') {
      setAdminBypass(true);
      sessionStorage.setItem('itm_admin_bypassed', 'true');
      localStorage.setItem('itm_admin_god_mode', 'true');
      setIsPreviewingAsStudent(false);
      sessionStorage.removeItem('itm_preview_maintenance');
      toast.success('Admin Bypass Granted.');
      setShowKeyPrompt(false);
    } else {
      toast.error('Invalid Master Override PIN (Default: 2026)');
      setMasterKey('');
    }
  };

  const exitPreview = () => {
    setIsPreviewingAsStudent(false);
    sessionStorage.removeItem('itm_preview_maintenance');
  };

  // Admin Floating Ribbon (When Maintenance is ON and Admin is reviewing the portal)
  if (config.active && (isAdmin || adminBypass) && !isPreviewingAsStudent) {
    return (
      <aside aria-label="System Maintenance Notification" className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-amber-950 px-4 py-2 shadow-lg flex flex-wrap items-center justify-between gap-2 text-xs font-bold border-b border-amber-600/40">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping inline-block" />
          <span>🔴 System Locked for Students (Admin Bypass Active)</span>
          {timeLeft && (
            <span className="bg-amber-600/30 px-2.5 py-0.5 rounded font-mono text-amber-950">
              Ends in: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsPreviewingAsStudent(true);
              sessionStorage.setItem('itm_preview_maintenance', 'true');
            }}
            className="px-3 py-1 bg-amber-600/30 hover:bg-amber-600/50 text-amber-950 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs font-bold"
          >
            <Eye className="h-3.5 w-3.5" /> Preview Student Lockout
          </button>
          <button
            onClick={() => {
              setAdminBypass(false);
              sessionStorage.removeItem('itm_admin_bypassed');
              localStorage.removeItem('itm_admin_god_mode');
              setIsPreviewingAsStudent(true);
            }}
            className="px-3 py-1 bg-red-600 text-white hover:bg-red-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs font-bold"
          >
            <Lock className="h-3.5 w-3.5" /> Lock My Screen
          </button>
          <button
            onClick={handleDeactivate}
            className="px-3 py-1 bg-amber-950 text-amber-100 hover:bg-black rounded-lg transition-colors cursor-pointer font-bold"
          >
            Turn OFF
          </button>
        </div>
      </aside>
    );
  }

  // If not blocking, do not render full takeover
  if (!isBlocking) return null;

  // ── 3D MAXIMUM ANIMATION FULLSCREEN TAKEOVER ──
  return (
    <div className="fixed inset-0 z-[99999] bg-[#0A1A16] text-[#F5F1E8] flex flex-col overflow-hidden font-sans select-none">
      {/* Background Animated Cyber Mesh & Glow Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Glowing Chartreuse Ambient Orb */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D6E85D]/15 rounded-full blur-[120px] animate-pulse [animation-duration:6s]" />
        {/* Emerald Deep Glow Orb */}
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#183F36]/60 rounded-full blur-[140px] animate-pulse [animation-duration:8s]" />
        {/* Cyberpunk Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(rgba(214, 232, 93, 0.25) 1px, transparent 1px), radial-gradient(rgba(24, 63, 54, 0.4) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0, 18px 18px',
          }}
        />
      </div>

      {/* Top Header Bar */}
      <nav className="relative z-20 h-16 sm:h-20 border-b border-[#23584C]/60 flex items-center justify-between px-6 sm:px-10 shrink-0 bg-[#0A1A16]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-[#D6E85D]/10 flex items-center justify-center border border-[#D6E85D]/30 shadow-[0_0_15px_rgba(214,232,93,0.2)]">
            <Lock className="h-5 w-5 text-[#D6E85D] animate-pulse" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white font-display">
              ITM Notes <span className="text-[#D6E85D]">· Infrastructure Upgrade</span>
            </h1>
            <p className="text-[11px] text-[#A6C4BC] flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-[#D6E85D]" /> Scheduled Maintenance Protocol
            </p>
          </div>
        </div>

        {/* Right Nav Action */}
        <div className="flex items-center gap-2">
          {isPreviewingAsStudent ? (
            <button
              onClick={exitPreview}
              className="px-4 py-2 bg-[#D6E85D] text-[#183F36] hover:bg-[#c2d54e] rounded-xl text-xs font-extrabold flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <EyeOff className="h-4 w-4" />
              <span>Exit Live Preview</span>
            </button>
          ) : (
            <button 
              onClick={() => setShowKeyPrompt(!showKeyPrompt)}
              className="px-3 py-1.5 rounded-xl border border-white/10 hover:border-[#D6E85D]/40 bg-white/5 text-xs font-semibold text-[#A6C4BC] hover:text-[#D6E85D] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <KeyRound className="h-3.5 w-3.5" />
              <span>Admin Bypass</span>
            </button>
          )}
        </div>
      </nav>

      {/* Main Hero & 3D Showcase */}
      <main className="relative z-10 flex-1 overflow-y-auto custom-scrollbar flex items-center py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full">
          
          {/* Left Column: Mission Status & Countdown */}
          <div className="flex-1 space-y-6 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D6E85D]/15 text-[#D6E85D] text-xs font-bold border border-[#D6E85D]/30 backdrop-blur-md shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-[#D6E85D] animate-spin [animation-duration:8s]" />
              <span>System Modernization In Progress</span>
              <span className="text-white/30">·</span>
              <span>B.Tech CSE & IT Hub</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white font-display leading-[1.1]">
              We are building <br className="hidden sm:block"/>
              something <span className="text-[#D6E85D] drop-shadow-[0_0_20px_rgba(214,232,93,0.4)]">incredible.</span>
            </h2>
            
            <p className="text-sm sm:text-base text-[#C2D6CF] leading-relaxed">
              {config.message || DEFAULT_CONFIG.message}
            </p>

            {/* High-Tech Countdown Timer */}
            {timeLeft ? (
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#12332C]/90 to-[#0A1A16]/90 border border-[#23584C] shadow-2xl max-w-md mx-auto lg:mx-0 backdrop-blur-md">
                <span className="text-[11px] font-bold text-[#D6E85D] uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Estimated Service Restoration In
                </span>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-2xl bg-[#183F36]/60 border border-white/10 shadow-inner">
                    <span className="font-mono text-3xl font-black text-white font-display">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-[#A6C4BC] block uppercase font-bold mt-0.5">Hours</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#183F36]/60 border border-white/10 shadow-inner">
                    <span className="font-mono text-3xl font-black text-[#D6E85D] font-display">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-[#A6C4BC] block uppercase font-bold mt-0.5">Minutes</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-[#183F36]/60 border border-white/10 shadow-inner">
                    <span className="font-mono text-3xl font-black text-white font-display">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-[#A6C4BC] block uppercase font-bold mt-0.5">Seconds</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#12332C]/80 border border-[#23584C] max-w-md mx-auto lg:mx-0 text-xs text-[#A6C4BC] flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#D6E85D] animate-ping shrink-0" />
                <span>Our engineering team is actively upgrading the server cluster. Stand by for instant restoration.</span>
              </div>
            )}

            {/* Secret Master Override Input */}
            {showKeyPrompt && (
              <form onSubmit={handleMasterKeySubmit} className="flex max-w-sm mx-auto lg:mx-0 gap-2 p-2 bg-[#12332C] rounded-2xl border border-[#D6E85D]/40 shadow-xl animate-fade-in">
                <input
                  type="password"
                  value={masterKey}
                  onChange={(e) => setMasterKey(e.target.value)}
                  placeholder="Enter Master PIN (Default: 2026)"
                  className="flex-1 bg-transparent px-3 text-xs sm:text-sm text-white placeholder-white/40 outline-none"
                  autoFocus
                />
                <button type="submit" className="px-4 py-2 bg-[#D6E85D] text-[#183F36] rounded-xl text-xs font-bold shadow hover:bg-[#c2d54e] transition-colors cursor-pointer">
                  Unlock
                </button>
              </form>
            )}
          </div>

          {/* Right Column: 3D Animated Orbital Core + Telemetry */}
          <div className="flex-1 flex flex-col items-center gap-8 w-full max-w-lg">
            
            {/* 3D Animated Gyroscope Orbital Core */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center [perspective:1000px]">
              {/* Outer Orbit Ring 1 (Yaw Axis) */}
              <div 
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#D6E85D]/40 animate-spin [animation-duration:22s]" 
                style={{ transform: 'rotateX(65deg) rotateY(15deg)' }}
              />
              {/* Outer Orbit Ring 2 (Pitch Axis) */}
              <div 
                className="absolute inset-4 rounded-full border-2 border-dotted border-emerald-400/50 animate-spin [animation-duration:16s] [animation-direction:reverse]" 
                style={{ transform: 'rotateX(-60deg) rotateY(40deg)' }}
              />
              {/* Middle Glowing Neon Ring 3 */}
              <div 
                className="absolute inset-10 rounded-full border-2 border-[#D6E85D]/60 animate-pulse [animation-duration:3s]" 
                style={{ transform: 'rotateX(45deg) rotateZ(30deg)', boxShadow: '0 0 35px rgba(214, 232, 93, 0.3)' }}
              />
              
              {/* Central 3D Glowing Cube Core */}
              <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-[#183F36] via-[#12332C] to-[#0D2620] border-2 border-[#D6E85D] shadow-[0_0_50px_rgba(214,232,93,0.4)] flex flex-col items-center justify-center gap-1.5 animate-bounce [animation-duration:4s]">
                <div className="w-12 h-12 rounded-2xl bg-[#D6E85D]/20 border border-[#D6E85D]/40 flex items-center justify-center shadow-inner">
                  <Lock className="h-6 w-6 text-[#D6E85D] animate-pulse" />
                </div>
                <span className="text-[10px] font-mono font-black text-[#D6E85D] tracking-widest uppercase">ITM NOTES</span>
              </div>

              {/* Floating Satellite Glowing Particles */}
              <div className="absolute top-2 left-6 w-3 h-3 rounded-full bg-[#D6E85D] shadow-[0_0_14px_#D6E85D] animate-ping [animation-duration:2.5s]" />
              <div className="absolute bottom-4 right-8 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse" />
            </div>

            {/* Live Infrastructure Telemetry Cards */}
            <div className="w-full bg-[#12332C]/70 border border-[#23584C] rounded-3xl p-5 shadow-xl backdrop-blur-md space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6E85D] flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5" /> Live Upgrade Telemetry
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                  <Cpu className="h-4 w-4 text-[#D6E85D] shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-white text-[11px] truncate">Edge CDN Hydration</p>
                    <span className="text-[10px] text-emerald-400 font-mono">99.8% Cached</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                  <Database className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-white text-[11px] truncate">Database Indexing</p>
                    <span className="text-[10px] text-[#D6E85D] font-mono">60+ Courses Synced</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-[#D6E85D] shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-white text-[11px] truncate">RLS & Zero-Trust</p>
                    <span className="text-[10px] text-emerald-400 font-mono">Encrypted Active</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2.5">
                  <Rocket className="h-4 w-4 text-emerald-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-white text-[11px] truncate">Coding Lab Runtime</p>
                    <span className="text-[10px] text-[#D6E85D] font-mono">Calibrated v2.4</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
