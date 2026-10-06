import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  ExternalLink, 
  Code2, 
  Rocket, 
  Cpu, 
  ShieldCheck, 
  ArrowRight,
  Lock,
  Unlock,
  Radio,
  Activity,
  Zap,
  Server,
  Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Link, useLocation } from 'react-router-dom';

// Master flag: When true, every new visitor/student is locked out and shown the Velocity Web maintenance experience.
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
  const { role, user } = useAuth();
  const location = useLocation();
  const isAdmin = role === 'admin' || user?.email === 'maherbhatt01@gmail.com';

  const [isActive, setIsActive] = useState<boolean>(checkMaintenanceActive);
  const [adminBypass, setAdminBypass] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('itm_admin_bypassed') === 'true';
    } catch {
      return false;
    }
  });
  const [showPasscodePrompt, setShowPasscodePrompt] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [currentPing, setCurrentPing] = useState(14);
  const [timeString, setTimeString] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Time ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0').slice(0, 2));
    };
    updateTime();
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  // Ping jitter
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPing(Math.floor(12 + Math.random() * 8));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Sync maintenance state
  useEffect(() => {
    const checkState = () => {
      setIsActive(checkMaintenanceActive());
    };

    window.addEventListener('storage', checkState);
    window.addEventListener('itm_maintenance_updated', checkState);

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

  // Interactive 60fps Cyber Particle Grid Canvas (Monochrome + Acid Green)
  useEffect(() => {
    if (!isActive || (isAdmin && adminBypass)) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(80, Math.floor((width * height) / 18000));
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 1.8 + 0.8,
      pulse: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render subtle radar grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle node (Acid Green / White)
        const alpha = 0.3 + Math.sin(p.pulse) * 0.2;
        ctx.fillStyle = `rgba(0, 255, 136, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive, isAdmin, adminBypass]);

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
      toast.success('Maintenance mode deactivated. System restored for all students.');
    } catch (e) {
      console.warn('Failed to deactivate maintenance mode:', e);
    }
  };

  // Allow access to auth page so admin can log in without obstruction
  if (location.pathname === '/auth') {
    return null;
  }

  if (!isActive) return null;

  // Admin bypass mode
  if (adminBypass) {
    return (
      <div className="bg-[#0b1410] border-b border-[#00ff88]/40 text-[#00ff88] px-4 py-2 text-xs font-mono font-bold flex items-center justify-between sticky top-0 z-[100] shadow-2xl">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 animate-pulse" />
          <span>
            [SYS_OVERRIDE_ACTIVE] Non-admin traffic restricted. Admin bypass session authorized.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sessionStorage.removeItem('itm_admin_bypassed');
              setAdminBypass(false);
            }}
            className="px-2.5 py-1 rounded border border-[#00ff88]/30 hover:bg-[#00ff88]/10 text-[#00ff88] text-[11px] transition-colors"
          >
            Preview Screen
          </button>
          <button
            onClick={handleDeactivate}
            className="px-3 py-1 rounded bg-[#00ff88] text-black font-extrabold text-xs transition-transform active:scale-95 shadow-md shadow-[#00ff88]/20"
          >
            Deactivate for All
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto bg-[#050608] text-[#f4f4f5] flex flex-col justify-between selection:bg-[#00ff88] selection:text-black font-sans">
      {/* 60fps Animated Cyber Particle Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-0" 
      />

      {/* CRT Scanline Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.75) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* ── TOP TELEMETRY HUD ── */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center font-mono font-black text-[#00ff88] text-sm shadow-inner">
            ITM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black tracking-wider text-sm text-white">
                ITM NOTES
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-900 text-zinc-400 border border-white/10">
                v2.6.4
              </span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 block leading-tight">
              SLS BARODA UNIVERSITY
            </span>
          </div>
        </div>

        {/* Live System Diagnostics */}
        <div className="hidden sm:flex items-center gap-4 font-mono text-[11px]">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Activity className="h-3.5 w-3.5 text-[#00ff88] animate-pulse" />
            <span>PING: <strong className="text-white">{currentPing}ms</strong></span>
          </div>
          <div className="text-zinc-600">|</div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Clock className="h-3.5 w-3.5 text-zinc-400" />
            <span>TIME: <strong className="text-white">{timeString}</strong></span>
          </div>
          <div className="text-zinc-600">|</div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-ping" />
            <span>SYSTEM LOCKED</span>
          </div>
        </div>
      </header>

      {/* ── MAIN DIAGNOSTIC OVERVIEW ── */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 flex flex-col items-center text-center my-auto">
        {/* Terminal Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 mb-6 shadow-2xl">
          <Terminal className="h-3.5 w-3.5 text-[#00ff88]" />
          <span>STATUS: // CORE_ENGINE_DEPLOYMENT_ACTIVE</span>
        </div>

        {/* Big Monospace Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4 uppercase leading-[1.05]">
          Under Active <br />
          <span className="text-[#00ff88] drop-shadow-[0_0_35px_rgba(0,255,136,0.4)]">
            Maintenance
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          ITM Notes is undergoing scheduled infrastructure upgrades, database performance optimizations, and notes synchronization. The study portal is temporarily paused for all students.
        </p>

        {/* Live Deployment Progress Bars */}
        <div className="w-full max-w-xl bg-zinc-950/80 border border-white/10 rounded-2xl p-5 mb-10 text-left font-mono text-xs shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between text-zinc-400 mb-3 pb-2 border-b border-white/5">
            <span className="flex items-center gap-2 text-white font-bold">
              <Server className="h-4 w-4 text-[#00ff88]" />
              CLUSTER SYNCHRONIZATION
            </span>
            <span className="text-[#00ff88] font-bold">IN PROGRESS</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                <span>Database Indexing &amp; Materials</span>
                <span className="text-white font-bold">96%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-[#00ff88] rounded-full transition-all duration-500" style={{ width: '96%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                <span>Edge Cache &amp; Speed Optimizations</span>
                <span className="text-white font-bold">88%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <div className="h-full bg-white rounded-full transition-all duration-500" style={{ width: '88%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* VELOCITY WEB SHOWCASE — BRUTALIST & EDITORIAL               */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="w-full bg-[#0a0c0e] border border-white/15 hover:border-[#00ff88]/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-left relative overflow-hidden transition-all duration-300 group">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#00ff88]/10 transition-colors" />

          {/* Card Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-2 font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
                <span className="px-2 py-0.5 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-bold">
                  ENGINEERED &amp; MAINTAINED BY
                </span>
                <span>VADODARA · GUJARAT</span>
              </div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                  Velocity Web
                </h2>
                <span className="font-mono text-xs text-[#00ff88]">
                  velocityweb.in
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl leading-relaxed">
                A founder-led custom website &amp; SaaS studio crafting high-speed, conversion-focused digital experiences and startup MVPs for international clients.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="https://www.velocityweb.in/#contact"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-xl bg-[#00ff88] hover:bg-[#15e683] text-black font-extrabold text-xs sm:text-sm tracking-wide uppercase transition-all shadow-lg shadow-[#00ff88]/20 flex items-center gap-2 active:scale-95"
              >
                <span>Get a Quote</span>
                <ArrowRight className="h-4 w-4 stroke-[3]" />
              </a>
              <a
                href="https://www.velocityweb.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs sm:text-sm border border-white/15 transition-colors flex items-center gap-2 active:scale-95"
              >
                <span>Explore Site</span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* 3 Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 font-mono">
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-white/20 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 text-[#00ff88] flex items-center justify-center mb-3">
                <Code2 className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-xs text-white uppercase mb-1">
                01 // Custom Web Apps
              </h3>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                B2B platforms, marketing sites, and full-stack web applications built fast with React &amp; Next.js.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-white/20 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 text-white flex items-center justify-center mb-3">
                <Rocket className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-xs text-white uppercase mb-1">
                02 // Startup MVP Sprints
              </h3>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                Take your product idea from concept to production-ready launch in days, not months.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-white/20 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/10 text-[#00ff88] flex items-center justify-center mb-3">
                <Cpu className="h-4 w-4" />
              </div>
              <h3 className="font-bold text-xs text-white uppercase mb-1">
                03 // Product Ecosystems
              </h3>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                High-scale digital systems including ITM Notes, Ztees, K.A.L.K.I., and CodeDroid.
              </p>
            </div>
          </div>
        </div>

        {/* ── ADMIN OVERRIDE CONTROLS ── */}
        {isAdmin ? (
          <div className="w-full mt-6 bg-[#08100c] border border-[#00ff88]/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#00ff88]">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>
                AUTHENTICATED AS <strong>MAHER BHATT [ADMIN]</strong>.
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setAdminBypass(true)}
                className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 transition-colors flex items-center gap-1.5"
              >
                <Unlock className="h-3.5 w-3.5" />
                <span>Bypass Screen</span>
              </button>
              <button
                onClick={handleDeactivate}
                className="px-3.5 py-1.5 rounded bg-[#00ff88] hover:bg-[#15e683] text-black font-extrabold transition-colors shadow-sm flex items-center gap-1.5"
              >
                <span>Turn Off Maintenance</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center pt-6 flex flex-col items-center gap-2.5">
            <button
              onClick={() => setShowPasscodePrompt(true)}
              className="text-[11px] font-mono text-zinc-500 hover:text-[#00ff88] transition-colors inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#00ff88]/40 bg-zinc-950/70"
            >
              <Lock className="h-3 w-3 text-[#00ff88]" />
              <span>[ADMIN MASTER OVERRIDE]</span>
            </button>
            <Link
              to="/auth"
              className="text-[10px] font-mono text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              Admin Email Sign In &rarr;
            </Link>
          </div>
        )}

        {/* Master Key Bypass Modal */}
        {showPasscodePrompt && (
          <div className="fixed inset-0 z-[100000] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <div className="w-full max-w-sm bg-[#0a0c0e] border border-[#00ff88]/40 rounded-2xl p-6 shadow-2xl font-mono text-left relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-[#00ff88] text-xs font-bold uppercase">
                  <Terminal className="h-4 w-4" />
                  <span>Admin Session Override</span>
                </div>
                <button
                  onClick={() => setShowPasscodePrompt(false)}
                  className="text-zinc-500 hover:text-white text-xs px-2 py-1"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-zinc-400 mb-4 font-sans leading-relaxed">
                Enter your admin master key to bypass the maintenance lock for this browser session.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const key = passcodeInput.trim().toLowerCase();
                  if (key === 'velocity' || key === 'itm2026' || key === 'maher' || key === 'admin') {
                    sessionStorage.setItem('itm_admin_bypassed', 'true');
                    setAdminBypass(true);
                    setShowPasscodePrompt(false);
                    toast.success('Admin authorized. Maintenance screen bypassed.');
                  } else {
                    toast.error('Invalid master key.');
                  }
                }}
              >
                <input
                  type="password"
                  placeholder="Master key..."
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-white/20 rounded-lg text-white font-mono text-xs focus:outline-none focus:border-[#00ff88] mb-4"
                  autoFocus
                />
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 rounded-lg bg-[#00ff88] text-black font-extrabold text-xs uppercase transition-transform active:scale-95"
                  >
                    Authorize
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPasscodePrompt(false)}
                    className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-300 text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* ── FOOTER HUD ── */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
        <div>
          © {new Date().getFullYear()} ITM NOTES · BUILT FOR ITM SLS BARODA UNIVERSITY
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.velocityweb.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-[#00ff88] transition-colors flex items-center gap-1 font-bold"
          >
            <span>VELOCITYWEB.IN</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <span className="text-zinc-800">·</span>
          <span>LOCAL ROOTS · GLOBAL REACH</span>
        </div>
      </footer>
    </div>
  );
}
