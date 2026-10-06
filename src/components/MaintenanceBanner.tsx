import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Wrench, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Code2, 
  Rocket, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Lock,
  Unlock,
  Radio
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

export function MaintenanceBanner() {
  const { role, user } = useAuth();
  const isAdmin = role === 'admin' || user?.email === 'maherbhatt01@gmail.com';

  const [isActive, setIsActive] = useState<boolean>(() => {
    try {
      return localStorage.getItem('itm_maintenance_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [adminBypass, setAdminBypass] = useState(false);

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
      toast.success('Maintenance mode deactivated. All students have full access now.');
    } catch (e) {
      console.warn('Failed to deactivate maintenance mode:', e);
    }
  };

  // If maintenance mode is not active, render nothing
  if (!isActive) return null;

  // If the admin has chosen to bypass the overlay to manage things
  if (isAdmin && adminBypass) {
    return (
      <div className="bg-amber-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between sticky top-0 z-[100] shadow-md">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 animate-pulse" />
          <span>
            <strong>MAINTENANCE ACTIVE:</strong> Regular students are currently seeing the full-screen upgrade banner. You are in Admin Bypass mode.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAdminBypass(false)}
            className="px-2 py-0.5 rounded bg-black/20 hover:bg-black/30 text-white text-[11px] font-bold"
          >
            Preview Banner
          </button>
          <button
            onClick={handleDeactivate}
            className="px-2.5 py-1 rounded bg-white text-amber-700 hover:bg-white/90 text-xs font-bold transition-all shadow-sm"
          >
            Turn Off Maintenance
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto bg-[#07090e] text-white flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Background Glow & Grid */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-15%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-600/15 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[15%] w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[140px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] right-[30%] w-[350px] h-[350px] rounded-full bg-cyan-500/10 blur-[100px]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-cyan-500/20">
            ITM
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-sm sm:text-base text-white block">
              ITM Notes
            </span>
            <span className="text-[11px] text-zinc-400 font-medium">
              SLS Baroda University
            </span>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-zinc-300 font-mono text-[11px] tracking-wide uppercase">
            Scheduled Upgrade Active
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 flex flex-col items-center text-center my-auto">
        {/* Animated Icon */}
        <div className="relative mb-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-zinc-800/80 to-zinc-900/90 border border-zinc-700/60 flex items-center justify-center shadow-2xl backdrop-blur-xl relative z-10 group">
            <Wrench className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-400 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div className="absolute inset-0 rounded-3xl bg-cyan-500/20 blur-xl animate-pulse" />
        </div>

        {/* Status Headings */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-4 tracking-wide uppercase">
          <Radio className="h-3.5 w-3.5 animate-pulse" />
          <span>Core Optimization in Progress</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight">
          We&apos;ll Be Right Back <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Faster &amp; Better Than Ever.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
          ITM Notes is undergoing scheduled infrastructure upgrades, database performance optimizations, and notes synchronization. The study portal is temporarily paused for all students.
        </p>

        {/* ────────────────────────────────────────────────────────── */}
        {/* VELOCITY WEB SPONSOR & PROMO CARD                          */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="w-full bg-gradient-to-b from-zinc-900/90 to-zinc-950/95 border border-zinc-800/80 hover:border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 relative overflow-hidden text-left mb-8 group">
          {/* Subtle card glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-[10px] font-bold tracking-wider uppercase">
                  Engineered &amp; Maintained By
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">
                  Vadodara · Gujarat
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                Velocity Web
                <span className="text-xs font-normal text-zinc-400 px-2 py-0.5 rounded bg-zinc-800/80 border border-zinc-700/50">
                  velocityweb.in
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
                A founder-led custom web &amp; SaaS studio crafting high-speed, search-ready digital experiences and startup MVPs for ambitious businesses worldwide.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://www.velocityweb.in/#contact"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 apple-press shrink-0"
              >
                <span>Get a Quote</span>
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://www.velocityweb.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700/80 text-white font-semibold text-xs sm:text-sm border border-zinc-700/60 transition-colors flex items-center gap-1.5 apple-press shrink-0"
              >
                <span>Visit Site</span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-2">
                <Code2 className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-xs text-white mb-1">
                Custom Web Development
              </h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                B2B platforms, landing pages, and responsive portals built fast with modern React &amp; Next.js.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-2">
                <Rocket className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-xs text-white mb-1">
                Startup MVP Builds
              </h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Take your product idea from concept to production-ready launch in days, not months.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/60">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-2">
                <Layers className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-xs text-white mb-1">
                EdTech &amp; Portal Ecosystems
              </h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Architecting high-scale educational applications, quizzes, and study portals like ITM Notes.
              </p>
            </div>
          </div>
        </div>

        {/* Admin Controls Area */}
        {isAdmin ? (
          <div className="w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="text-zinc-300">
                Logged in as <strong>Administrator</strong>. You can bypass this screen to test or disable maintenance.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setAdminBypass(true)}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-semibold transition-colors flex items-center gap-1.5"
              >
                <Unlock className="h-3.5 w-3.5" />
                <span>Bypass Screen</span>
              </button>
              <button
                onClick={handleDeactivate}
                className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>Turn Off for All</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center pt-2">
            <Link
              to="/auth"
              className="text-[11px] text-zinc-500 hover:text-zinc-400 transition-colors inline-flex items-center gap-1"
            >
              <Lock className="h-3 w-3" />
              <span>Admin Access</span>
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
        <div>
          © {new Date().getFullYear()} ITM Notes · Built with ❤️ for ITM SLS Baroda University
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.velocityweb.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-400 transition-colors font-medium flex items-center gap-1"
          >
            <span>velocityweb.in</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <span className="text-zinc-700">·</span>
          <span>Local Roots · Global Reach</span>
        </div>
      </footer>
    </div>
  );
}
