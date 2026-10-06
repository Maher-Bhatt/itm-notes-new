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
  Activity, 
  Server, 
  Clock,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Layers,
  Globe
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

interface VelocityProject {
  id: string;
  name: string;
  badge: string;
  metric: string;
  desc: string;
  url: string;
  caseStudyUrl: string;
  tags: string[];
}

const VELOCITY_PROJECTS: VelocityProject[] = [
  {
    id: 'ztees',
    name: 'Ztees',
    badge: 'Streetwear / E-Commerce',
    metric: '~2 Days Brief to Launch',
    desc: 'Mobile-first streetwear brand storefront with high-conversion visual discovery and direct 1-tap WhatsApp order checkout funnel.',
    url: 'https://ztees.store',
    caseStudyUrl: 'https://www.velocityweb.in/case-studies/ztees',
    tags: ['Next.js', 'WhatsApp Direct', 'Mobile-First', 'SEO 100'],
  },
  {
    id: 'itm-notes',
    name: 'ITM Notes',
    badge: 'Education Platform / PWA',
    metric: '10,000+ Student Sessions',
    desc: 'Full-stack academic study ecosystem with 6 semesters of notes, offline PWA, 75% attendance buffer calculator, and live coding playground.',
    url: 'https://itm-notes-new.vercel.app',
    caseStudyUrl: 'https://www.velocityweb.in/case-studies/itm-notes',
    tags: ['React + Vite', 'Supabase', 'PWA Offline', 'Tailwind'],
  },
  {
    id: 'kalki',
    name: 'K.A.L.K.I.',
    badge: 'Desktop AI Assistant / HUD',
    metric: 'Local-First Runtime',
    desc: 'Voice-capable desktop cyber HUD assistant combining modular AI models, persistent system memory, and automated OS actions.',
    url: 'https://github.com/Maher-Bhatt/KALKI',
    caseStudyUrl: 'https://www.velocityweb.in/case-studies/kalki',
    tags: ['Python', 'Local AI', 'Speech-to-Text', 'Desktop HUD'],
  },
  {
    id: 'codedroid',
    name: 'CodeDroid',
    badge: 'Mobile IDE & Runtime',
    metric: '18 Languages Supported',
    desc: 'Pocket Android development environment with syntax highlighting, on-device terminal, and zero-latency local code execution.',
    url: 'https://github.com/Maher-Bhatt/CodeDroid',
    caseStudyUrl: 'https://www.velocityweb.in/case-studies/codedroid',
    tags: ['Android Native', 'Compiler Tools', 'Offline Dev', '18 Languages'],
  },
  {
    id: 'civic-sathi',
    name: 'Civic Sathi',
    badge: 'Civic Governance Portal',
    metric: '4-Role Public Workflow',
    desc: 'Citizen reporting and municipal workflow system with live geo-evidence collection, ticket routing, and administrative audit trails.',
    url: 'https://janmind-public.vercel.app',
    caseStudyUrl: 'https://www.velocityweb.in/case-studies/civic-sathi',
    tags: ['Civic Tech', 'Realtime GIS', 'Public Flow', 'Role Auth'],
  },
];

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

  const [selectedProjectId, setSelectedProjectId] = useState<string>('ztees');
  const [showPasscodePrompt, setShowPasscodePrompt] = useState(false);
  const [passcodeInput, setPasscodeInput] = useState('');
  const [currentPing, setCurrentPing] = useState(14);
  const [timeString, setTimeString] = useState('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Lock body scroll when maintenance takeover is active for non-admins
  useEffect(() => {
    if (isActive && !adminBypass && !isAdmin) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isActive, adminBypass, isAdmin]);

  // Live time ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toTimeString().split(' ')[0] +
        '.' +
        String(now.getMilliseconds()).padStart(3, '0').slice(0, 2)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 100);
    return () => clearInterval(interval);
  }, []);

  // Ping jitter (12ms - 19ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPing(Math.floor(12 + Math.random() * 8));
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Sync maintenance state across tabs and Supabase broadcast
  useEffect(() => {
    const checkState = () => {
      setIsActive(checkMaintenanceActive());
    };

    window.addEventListener('storage', checkState);
    window.addEventListener('itm_maintenance_updated', checkState);

    const channel = supabase
      .channel('platform_maintenance')
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

  // 60fps Cyber Radar & Particle Grid Canvas (Strictly Obsidian + Titanium White + Acid Green)
  useEffect(() => {
    if (!isActive || adminBypass || isAdmin) return;

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
    const particleCount = Math.min(90, Math.floor((width * height) / 16000));
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      radius: Math.random() * 1.8 + 0.8,
      pulse: Math.random() * Math.PI,
    }));

    let radarAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Radar Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
      ctx.lineWidth = 1;
      const gridSize = 64;
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

      // 2. Rotating Radar Scanner Beam
      radarAngle += 0.015;
      const centerX = width / 2;
      const centerY = height / 2;
      const radarRadius = Math.max(width, height) * 0.75;

      const grad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radarRadius);
      grad.addColorStop(0, 'rgba(0, 255, 136, 0.04)');
      grad.addColorStop(1, 'transparent');

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radarRadius, radarAngle - 0.35, radarAngle);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Scanner Leading Edge Line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(radarAngle) * radarRadius,
        centerY + Math.sin(radarAngle) * radarRadius
      );
      ctx.strokeStyle = 'rgba(0, 255, 136, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.restore();

      // 3. Update & render connected particle nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.03;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle node (Electric Acid Green / Crisp White)
        const alpha = 0.35 + Math.sin(p.pulse) * 0.25;
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

          if (dist < 135) {
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.14 * (1 - dist / 135)})`;
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
  }, [isActive, adminBypass, isAdmin]);

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

  // Exemption: Allow admin to visit /auth to log in
  if (location.pathname === '/auth') {
    return null;
  }

  // Not in maintenance mode
  if (!isActive) return null;

  // ─────────────────────────────────────────────────────────────
  // ADMIN ACCESS MODE (Authenticated Admin or Master Key Bypass)
  // Outer visitors / students never see this; they remain locked out.
  // ─────────────────────────────────────────────────────────────
  if (isAdmin || adminBypass) {
    return (
      <div className="bg-[#08120c] border-b border-[#00ff88]/40 text-[#00ff88] px-4 py-2.5 text-xs font-mono font-bold flex flex-wrap items-center justify-between gap-3 sticky top-0 z-[100000] shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 animate-pulse text-[#00ff88]" />
          <span>
            [SYS_OVERRIDE_ACTIVE] Non-admin traffic restricted. Browsing with authorized Admin privileges.
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              sessionStorage.removeItem('itm_admin_bypassed');
              setAdminBypass(false);
            }}
            className="px-3 py-1 rounded border border-[#00ff88]/30 hover:bg-[#00ff88]/10 text-[#00ff88] text-[11px] transition-colors"
          >
            Preview Student Screen
          </button>
          <button
            onClick={handleDeactivate}
            className="px-3.5 py-1 rounded bg-[#00ff88] hover:bg-[#12ea7d] text-black font-black text-xs transition-transform active:scale-95 shadow-md shadow-[#00ff88]/20"
          >
            Turn Off Maintenance For All
          </button>
        </div>
      </div>
    );
  }

  const activeProject =
    VELOCITY_PROJECTS.find((p) => p.id === selectedProjectId) || VELOCITY_PROJECTS[0];

  // ─────────────────────────────────────────────────────────────
  // OUTER / PUBLIC VIEW: 100% AIRTIGHT MAINTENANCE & AGENCY TAKEOVER
  // ─────────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 z-[99999] overflow-y-auto bg-[#050608] text-[#f4f4f5] flex flex-col justify-between selection:bg-[#00ff88] selection:text-black font-sans">
      {/* 60fps Animated Cyber Radar & Particle Grid Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* CRT Scanline Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.8) 50%)',
          backgroundSize: '100% 4px',
        }}
      />

      {/* ── TOP TELEMETRY HUD ── */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 py-5 sm:py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center font-mono font-black text-[#00ff88] text-sm shadow-inner tracking-wider">
            ITM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black tracking-wider text-sm sm:text-base text-white">
                ITM NOTES
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-white/10">
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
            <span>
              PING: <strong className="text-white">{currentPing}ms</strong>
            </span>
          </div>
          <div className="text-zinc-600">|</div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Clock className="h-3.5 w-3.5 text-zinc-400" />
            <span>
              CLOCK: <strong className="text-white">{timeString}</strong>
            </span>
          </div>
          <div className="text-zinc-600">|</div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
            <span>SYSTEM LOCKED</span>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 py-8 flex flex-col items-center text-center my-auto">
        {/* Terminal Status Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950 border border-white/10 text-[11px] font-mono text-zinc-300 mb-6 shadow-2xl backdrop-blur-md">
          <Terminal className="h-3.5 w-3.5 text-[#00ff88] animate-pulse" />
          <span>STATUS: // CORE_ENGINE_DEPLOYMENT_ACTIVE</span>
        </div>

        {/* Big Monospace Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-4 uppercase leading-[1.05]">
          Under Active <br />
          <span className="text-[#00ff88] drop-shadow-[0_0_40px_rgba(0,255,136,0.45)]">
            Maintenance
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8 font-normal">
          ITM Notes is undergoing scheduled infrastructure upgrades, database performance optimizations, and notes synchronization. The study portal is temporarily paused for all students.
        </p>

        {/* Live Cluster Synchronization Bars */}
        <div className="w-full max-w-xl bg-zinc-950/90 border border-white/10 rounded-2xl p-5 mb-10 text-left font-mono text-xs shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between text-zinc-400 mb-3 pb-2 border-b border-white/5">
            <span className="flex items-center gap-2 text-white font-bold text-[11px]">
              <Server className="h-4 w-4 text-[#00ff88]" />
              CLUSTER SYNCHRONIZATION
            </span>
            <span className="text-[#00ff88] font-bold text-[11px]">IN PROGRESS</span>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                <span>Database Indexing &amp; Materials</span>
                <span className="text-white font-bold">96%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-[#00ff88] rounded-full transition-all duration-500"
                  style={{ width: '96%' }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                <span>Edge Cache &amp; Speed Optimizations</span>
                <span className="text-white font-bold">88%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full bg-white rounded-full transition-all duration-500"
                  style={{ width: '88%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────────────────── */}
        {/* VELOCITY WEB SHOWCASE — BRUTALIST & EDITORIAL               */}
        {/* ────────────────────────────────────────────────────────── */}
        <div className="w-full bg-[#090c0a] border border-white/15 hover:border-[#00ff88]/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl text-left relative overflow-hidden transition-all duration-300">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ff88]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Agency Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-[10px] tracking-wider text-zinc-400 uppercase">
                <span className="px-2.5 py-0.5 rounded bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 font-bold">
                  FOUNDER-LED STUDIO
                </span>
                <span>VADODARA · GUJARAT</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-400">GLOBAL REACH</span>
              </div>

              <div className="flex items-baseline gap-3">
                <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                  Velocity Web
                </h2>
                <a
                  href="https://www.velocityweb.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs sm:text-sm text-[#00ff88] hover:underline flex items-center gap-1"
                >
                  <span>velocityweb.in</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 mt-2 max-w-2xl leading-relaxed">
                A founder-led custom website &amp; SaaS development agency for B2B startups, professional services, and ambitious teams. We build clear, conversion-focused, search-ready digital experiences.
              </p>
            </div>

            {/* High-Converting CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="https://www.velocityweb.in/#contact"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#00ff88] hover:bg-[#12ea7d] text-black font-black text-xs sm:text-sm tracking-wide uppercase transition-all shadow-xl shadow-[#00ff88]/20 flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Get a Quote</span>
                <ArrowRight className="h-4 w-4 stroke-[3]" />
              </a>
              <a
                href="https://www.velocityweb.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white font-mono text-xs sm:text-sm border border-white/20 transition-colors flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Explore Site</span>
                <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* Agency Advantage Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-6 border-b border-white/10 font-mono text-xs">
            <div className="bg-zinc-950/60 p-3 rounded-xl border border-white/5">
              <span className="text-[#00ff88] block font-bold text-sm">~2–10 Days</span>
              <span className="text-[11px] text-zinc-400 font-sans">MVP Sprint to Launch</span>
            </div>
            <div className="bg-zinc-950/60 p-3 rounded-xl border border-white/5">
              <span className="text-white block font-bold text-sm">100 / 100</span>
              <span className="text-[11px] text-zinc-400 font-sans">Core Web Vitals Speed</span>
            </div>
            <div className="bg-zinc-950/60 p-3 rounded-xl border border-white/5">
              <span className="text-[#00ff88] block font-bold text-sm">1-on-1 Direct</span>
              <span className="text-[11px] text-zinc-400 font-sans">Founder Partnership</span>
            </div>
            <div className="bg-zinc-950/60 p-3 rounded-xl border border-white/5">
              <span className="text-white block font-bold text-sm">SEO Built-in</span>
              <span className="text-[11px] text-zinc-400 font-sans">Technical Search Ready</span>
            </div>
          </div>

          {/* Interactive Project Showcase / Work Portfolio */}
          <div className="pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="font-mono text-[11px] text-[#00ff88] uppercase tracking-wider block">
                  SELECTED PUBLIC WORK // PROVEN BUILDS
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Real Products Built &amp; Deployed by Velocity Web
                </h3>
              </div>
              <a
                href="https://www.velocityweb.in/work"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-400 hover:text-white transition-colors flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View all case studies</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Project Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-mono text-xs mb-4">
              {VELOCITY_PROJECTS.map((proj) => {
                const isSelected = proj.id === selectedProjectId;
                return (
                  <button
                    key={proj.id}
                    onClick={() => setSelectedProjectId(proj.id)}
                    className={`px-3.5 py-1.5 rounded-lg border transition-all whitespace-nowrap ${
                      isSelected
                        ? 'bg-[#00ff88] text-black font-black border-[#00ff88]'
                        : 'bg-zinc-950 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {proj.name}
                  </button>
                );
              })}
            </div>

            {/* Selected Project Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-zinc-950 border border-white/10 relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 font-mono text-[11px] mb-1">
                    <span className="text-[#00ff88] font-bold">{activeProject.badge}</span>
                    <span className="text-zinc-600">·</span>
                    <span className="text-zinc-400">{activeProject.metric}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-tight">
                    {activeProject.name}
                  </h4>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={activeProject.caseStudyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-xs border border-white/10 transition-colors flex items-center gap-1.5"
                  >
                    <span>Read Case Study</span>
                    <ExternalLink className="h-3 w-3 text-zinc-400" />
                  </a>
                  <a
                    href={activeProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-[#00ff88]/10 hover:bg-[#00ff88]/20 text-[#00ff88] font-mono font-bold text-xs border border-[#00ff88]/30 transition-colors flex items-center gap-1.5"
                  >
                    <span>Visit Live</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 font-sans leading-relaxed mb-4">
                {activeProject.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-300 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 3 Core Services */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 font-mono">
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-white/20 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 text-[#00ff88] flex items-center justify-center mb-3">
                <Code2 className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-xs text-white uppercase mb-1">
                01 // Custom Web Apps
              </h4>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                B2B platforms, marketing sites, and full-stack web applications built fast with React &amp; Next.js.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-white/20 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 text-white flex items-center justify-center mb-3">
                <Rocket className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-xs text-white uppercase mb-1">
                02 // Startup MVP Sprints
              </h4>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                Take your product idea from concept to production-ready launch in days, not months.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-zinc-950/70 border border-white/5 hover:border-white/20 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 text-[#00ff88] flex items-center justify-center mb-3">
                <Cpu className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-xs text-white uppercase mb-1">
                03 // Product Ecosystems
              </h4>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                High-scale digital systems including ITM Notes, Ztees, K.A.L.K.I., and CodeDroid.
              </p>
            </div>
          </div>
        </div>

        {/* Discreet Admin Entrance for Founder / Administrator */}
        <div className="text-center pt-8">
          <button
            onClick={() => setShowPasscodePrompt(true)}
            className="text-[10px] font-mono text-zinc-700 hover:text-zinc-400 transition-colors inline-flex items-center gap-1.5 opacity-60 hover:opacity-100"
            title="Administrator Sign In"
          >
            <Lock className="h-3 w-3" />
            <span>[ADMIN_AUTH]</span>
          </button>
        </div>

        {/* Master Key Bypass Modal for Admin */}
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
                Enter your admin master key or sign in via email to bypass the maintenance lock.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const key = passcodeInput.trim().toLowerCase();
                  if (
                    key === 'velocity' ||
                    key === 'itm2026' ||
                    key === 'maher' ||
                    key === 'admin'
                  ) {
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
                <div className="flex items-center gap-2 mb-3">
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

              <div className="text-center pt-2 border-t border-white/10">
                <Link
                  to="/auth"
                  className="text-[11px] font-mono text-zinc-500 hover:text-[#00ff88] transition-colors"
                >
                  Go to Email Sign In &rarr;
                </Link>
              </div>
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
