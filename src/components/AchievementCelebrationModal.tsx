import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification, Achievement } from '@/hooks/useGamification';
import { generateAchievementStoryCard } from '@/utils/achievementCardGenerator';
import { UserAvatar, resolveAvatarUrl, MAHER_CANONICAL_AVATAR } from '@/components/UserAvatar';
import { 
  X, Download, Share2, Sparkles, Check, 
  Instagram, MessageCircle, Copy, Award, Flame, ExternalLink, Loader2,
  Trophy, ShieldCheck, Smartphone, Eye, Volume2, VolumeX, RotateCw,
  FileCheck2, CheckCircle2, Star, Ribbon, Compass
} from 'lucide-react';
import { toast } from 'sonner';

interface UnlockedEventDetail {
  achievement: Achievement;
  xp?: number;
  totalXp?: number;
  streakDays?: number;
  level?: number;
  levelTitle?: string;
  isReplay?: boolean;
}

export function AchievementCelebrationModal() {
  const { profile, user } = useAuth();
  const { state: game, levelInfo } = useGamification();
  const [activeAchievement, setActiveAchievement] = useState<Achievement | null>(null);
  const [eventData, setEventData] = useState<UnlockedEventDetail | null>(null);
  
  // View mode: 'trophy' (3D card) | 'certificate' (formal diploma back) | 'story' (9:16 mobile canvas)
  const [activeView, setActiveView] = useState<'trophy' | 'certificate' | 'story'>('trophy');
  const [isFlipped, setIsFlipped] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [storyTheme, setStoryTheme] = useState<'obsidian' | 'gold' | 'cyber'>('obsidian');

  const [isGenerating, setIsGenerating] = useState(false);
  const [storyPreviewUrl, setStoryPreviewUrl] = useState<string | null>(null);
  const [storyBlob, setStoryBlob] = useState<Blob | null>(null);
  const [copied, setCopied] = useState(false);

  // 3D Tilt interactive state
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiAnimRef = useRef<number | null>(null);

  // Play triumph fanfare sound using Web Audio API
  const playVictoryFanfare = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const notes = [
        { f: 523.25, t: 0.0, d: 0.15 }, // C5
        { f: 659.25, t: 0.12, d: 0.15 }, // E5
        { f: 783.99, t: 0.24, d: 0.18 }, // G5
        { f: 1046.50, t: 0.38, d: 0.55 }, // C6
      ];

      notes.forEach(({ f, t, d }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime + t);
        gain.gain.setValueAtTime(0.2, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + d);
      });
    } catch {
      // AudioContext not allowed or unsupported
    }
  };

  // Run native Canvas Confetti particles
  const startConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#D6E85D', '#183F36', '#F59E0B', '#10B981', '#3B82F6', '#C084FC', '#FFFFFF'];
    const particles = Array.from({ length: 90 }).map(() => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 260,
      y: canvas.height * 0.38,
      vx: (Math.random() - 0.5) * 18,
      vy: (Math.random() - 0.85) * 20,
      size: Math.random() * 9 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      gravity: 0.38,
      friction: 0.98,
      alpha: 1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach((p) => {
        p.vx *= p.friction;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha -= 0.007;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
          ctx.restore();
        }
      });

      if (alive) {
        confettiAnimRef.current = requestAnimationFrame(render);
      }
    };

    render();
  };

  // Listen for global unlock event
  useEffect(() => {
    const handleUnlock = (e: Event) => {
      const detail = (e as CustomEvent<UnlockedEventDetail>).detail;
      if (detail && detail.achievement) {
        setActiveAchievement(detail.achievement);
        setEventData(detail);
        setActiveView('trophy');
        setIsFlipped(false);
        if (!detail.isReplay) {
          playVictoryFanfare();
          setTimeout(() => startConfetti(), 100);
        }
      }
    };

    window.addEventListener('itm_achievement_unlocked', handleUnlock);
    return () => {
      window.removeEventListener('itm_achievement_unlocked', handleUnlock);
      if (confettiAnimRef.current) cancelAnimationFrame(confettiAnimRef.current);
    };
  }, [soundEnabled]);

  // Pre-generate the 1080x1920 Story Card when modal opens
  useEffect(() => {
    if (!activeAchievement) {
      setStoryPreviewUrl(null);
      setStoryBlob(null);
      return;
    }

    let isMounted = true;
    setIsGenerating(true);

    const studentName = profile?.display_name || user?.email?.split('@')[0] || 'Maher Bhatt';
    const avatarUrl = resolveAvatarUrl(profile, user) || MAHER_CANONICAL_AVATAR;

    generateAchievementStoryCard({
      studentName,
      avatarUrl,
      level: eventData?.level || levelInfo.level,
      levelTitle: eventData?.levelTitle || levelInfo.title,
      achievementTitle: activeAchievement.title,
      achievementDescription: activeAchievement.description,
      achievementIcon: activeAchievement.icon,
      tier: activeAchievement.tier,
      xpReward: activeAchievement.xpReward,
      totalXp: eventData?.totalXp || game.xp,
      streakDays: eventData?.streakDays || game.streakDays,
      theme: storyTheme,
    })
      .then(({ dataUrl, blob }) => {
        if (isMounted) {
          setStoryPreviewUrl(dataUrl);
          setStoryBlob(blob);
          setIsGenerating(false);
        }
      })
      .catch((err) => {
        console.error('Failed to generate story card:', err);
        if (isMounted) setIsGenerating(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeAchievement, profile, user, levelInfo, game, eventData, storyTheme]);

  if (!activeAchievement) return null;

  const studentName = profile?.display_name || user?.email?.split('@')[0] || 'Maher Bhatt';
  const effectiveAvatar = resolveAvatarUrl(profile, user) || MAHER_CANONICAL_AVATAR;
  const shareText = `🎓 I just unlocked "${activeAchievement.title}" (+${activeAchievement.xpReward} XP) on ITM Notes! Check out our verified Semester 3 Computer Engineering Notes: https://itm-notes-new.vercel.app`;

  // Compute a deterministic accreditation serial number based on student name and achievement ID
  const certSerial = `ITM-ENG-2026-${(activeAchievement.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 1000) * 7).toString(16).toUpperCase()}`;

  // Handle 3D mouse tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -12;
    const rotY = ((x - centerX) / centerX) * 12;

    setTilt({
      x: rotX,
      y: rotY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  // Tier specific luxury styling
  const tierConfig = {
    bronze: {
      border: 'border-[#E07A5F]/70',
      glow: 'shadow-[0_0_60px_rgba(224,122,95,0.45)]',
      pill: 'bg-gradient-to-r from-[#C25E38] via-[#E07A5F] to-[#8C3B1E] text-white',
      badge: '★ BRONZE SCHOLAR · TIER I ★',
      rarity: 'COMMON ACADEMIC HONORS',
      percentile: 'TOP 45% OF COHORT',
      ringColor: '#E07A5F',
      accentText: 'text-[#E07A5F]',
      metalBg: 'from-[#C25E38]/30 via-[#E07A5F]/20 to-[#8C3B1E]/40',
      foilGlare: 'rgba(224, 122, 95, 0.4)',
    },
    silver: {
      border: 'border-slate-300/80',
      glow: 'shadow-[0_0_60px_rgba(226,232,240,0.45)]',
      pill: 'bg-gradient-to-r from-slate-300 via-white to-slate-400 text-slate-900',
      badge: '★ SILVER VIRTUOSO · TIER II ★',
      rarity: 'RARE ENGINEERING DISTINCTION',
      percentile: 'TOP 15% OF COHORT',
      ringColor: '#E2E8F0',
      accentText: 'text-slate-200',
      metalBg: 'from-slate-400/30 via-slate-200/20 to-slate-600/40',
      foilGlare: 'rgba(226, 232, 240, 0.5)',
    },
    gold: {
      border: 'border-[#D6E85D]',
      glow: 'shadow-[0_0_70px_rgba(214,232,93,0.5)]',
      pill: 'bg-gradient-to-r from-[#D6E85D] via-[#FEF08A] to-[#F59E0B] text-[#183F36]',
      badge: '★ 24K GOLD MASTER · TIER III ★',
      rarity: 'EPIC SCHOLASTIC MERIT',
      percentile: 'TOP 5% OF COHORT',
      ringColor: '#D6E85D',
      accentText: 'text-[#D6E85D]',
      metalBg: 'from-[#F59E0B]/30 via-[#D6E85D]/20 to-[#D97706]/40',
      foilGlare: 'rgba(214, 232, 93, 0.6)',
    },
    legendary: {
      border: 'border-purple-400',
      glow: 'shadow-[0_0_70px_rgba(168,85,247,0.5)]',
      pill: 'bg-gradient-to-r from-purple-500 via-fuchsia-400 to-indigo-600 text-white',
      badge: '★ LEGENDARY HONORS · TIER IV ★',
      rarity: 'MYTHIC PEER EXCELLENCE',
      percentile: 'TOP 1% OF STUDENTS',
      ringColor: '#C084FC',
      accentText: 'text-purple-300',
      metalBg: 'from-purple-600/30 via-fuchsia-400/20 to-indigo-900/40',
      foilGlare: 'rgba(192, 132, 252, 0.6)',
    },
    mythic: {
      border: 'border-[#D6E85D]',
      glow: 'shadow-[0_0_80px_rgba(214,232,93,0.65)]',
      pill: 'bg-gradient-to-r from-[#D6E85D] via-emerald-400 to-[#183F36] text-[#183F36]',
      badge: '★ MYTHIC ARCHITECT · APEX TIER ★',
      rarity: 'FOUNDER & ARCHITECT MASTER',
      percentile: 'UNIQUE VALEDICTORIAN',
      ringColor: '#D6E85D',
      accentText: 'text-[#D6E85D]',
      metalBg: 'from-[#D6E85D]/30 via-emerald-400/20 to-[#183F36]/50',
      foilGlare: 'rgba(214, 232, 93, 0.75)',
    },
  }[activeAchievement.tier] || {
    border: 'border-[#D6E85D]/70',
    glow: 'shadow-[0_0_60px_rgba(214,232,93,0.4)]',
    pill: 'bg-[#D6E85D] text-[#183F36]',
    badge: '★ ACADEMIC HONORS ★',
    rarity: 'ACADEMIC ACHIEVEMENT',
    percentile: 'VERIFIED MILESTONE',
    ringColor: '#D6E85D',
    accentText: 'text-[#D6E85D]',
    metalBg: 'from-[#183F36]/40 to-black/40',
    foilGlare: 'rgba(214, 232, 93, 0.4)',
  };

  // 1-Click Share to Instagram Stories
  const handleShareInstagram = async () => {
    if (!storyBlob) {
      toast.error('Story card is still rendering. Please try again in a second.');
      return;
    }

    const file = new File([storyBlob], `ITM_Achievement_${activeAchievement.id}.png`, {
      type: 'image/png',
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `ITM Honors: ${activeAchievement.title}`,
          text: shareText,
        });
        toast.success('Select Instagram Stories from your share sheet!');
        return;
      } catch (err: unknown) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Web share failed:', err);
        }
      }
    }

    handleDownloadStory();
    toast.info('Story image saved! Select it in Instagram Story camera.', {
      description: 'Image saved to your device in 1080x1920 HD quality.',
    });
    window.location.href = 'instagram://story';
    setTimeout(() => {
      window.open('https://instagram.com', '_blank');
    }, 1500);
  };

  // 1-Click Share to WhatsApp Status
  const handleShareWhatsApp = async () => {
    if (!storyBlob) {
      toast.error('Card is still generating, please wait a moment.');
      return;
    }

    const file = new File([storyBlob], `ITM_Achievement_${activeAchievement.id}.png`, {
      type: 'image/png',
    });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `ITM Honors: ${activeAchievement.title}`,
          text: shareText,
        });
        toast.success('Select WhatsApp -> "My Status" to share!');
        return;
      } catch (err: unknown) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Web share failed:', err);
        }
      }
    }

    handleDownloadStory();
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Card downloaded! Opening WhatsApp...');
  };

  // Direct High-Res Card Download
  const handleDownloadStory = () => {
    if (!storyPreviewUrl) return;
    const a = document.createElement('a');
    a.href = storyPreviewUrl;
    a.download = `ITM_Notes_${activeAchievement.id}_Story.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('HD Instagram & WhatsApp Story Card (1080x1920) downloaded!');
  };

  const handleCopyCardImage = async () => {
    if (!storyBlob) {
      toast.error('Card is still generating, please wait a moment.');
      return;
    }
    try {
      if (navigator.clipboard && (window as any).ClipboardItem) {
        await navigator.clipboard.write([
          new (window as any).ClipboardItem({ 'image/png': storyBlob })
        ]);
        toast.success('HD Story Card copied to clipboard! Paste directly into WhatsApp, Discord, or Instagram.');
        return;
      }
    } catch (e) {
      console.warn('Clipboard write image failed, downloading instead:', e);
    }
    handleDownloadStory();
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    toast.success('Achievement showcase link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      {/* Full-screen Confetti Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10 w-full h-full" />

      {/* Main Luxury Modal Container */}
      <div className="relative z-20 w-full max-w-2xl bg-gradient-to-b from-[#12332C]/95 via-[#081814]/98 to-black border border-[#23584C] rounded-3xl p-5 sm:p-7 shadow-[0_0_90px_rgba(24,63,54,0.7)] flex flex-col gap-4 text-center my-auto backdrop-blur-3xl">
        
        {/* Top Controls: Sound Fanfare & Close Button */}
        <div className="absolute right-4 top-4 flex items-center gap-2 z-30">
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) playVictoryFanfare();
            }}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E8EDE4] transition-all cursor-pointer shadow-md"
            title={soundEnabled ? "Mute Fanfare Sound" : "Enable Fanfare Sound"}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4 text-[#D6E85D]" /> : <VolumeX className="h-4 w-4 text-slate-400" />}
          </button>

          <button
            onClick={() => setActiveAchievement(null)}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E8EDE4] transition-all cursor-pointer shadow-md"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Top Header */}
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6E85D]/15 border border-[#D6E85D]/30 text-[#D6E85D] text-[11px] font-black uppercase tracking-widest mb-1.5 font-display">
            <Sparkles className="h-3.5 w-3.5 text-[#D6E85D] animate-spin [animation-duration:10s]" />
            <span>{eventData?.isReplay ? 'OFFICIAL ACADEMIC DISTINCTION' : 'NEW MILESTONE UNLOCKED'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display bg-gradient-to-r from-white via-slate-100 to-[#D6E85D] bg-clip-text text-transparent">
            {eventData?.isReplay ? 'Your Academic Triumph' : 'Academic Triumph!'}
          </h2>
          <p className="text-xs text-[#A2BAAF] flex items-center gap-1.5 mt-0.5 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-[#D6E85D]" />
            <span>ITM SLS Baroda University • Department of Computer Science</span>
          </p>

          {/* View Mode Switcher: 3D Trophy Medal vs Certificate of Excellence vs 9:16 Social Story */}
          <div className="inline-flex p-1 rounded-2xl bg-black/50 border border-white/10 mt-3 gap-1">
            <button
              onClick={() => {
                setActiveView('trophy');
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'trophy' && !isFlipped
                  ? 'bg-[#183F36] text-[#D6E85D] shadow-md border border-[#D6E85D]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="h-3.5 w-3.5" />
              <span>3D Trophy Medal</span>
            </button>

            <button
              onClick={() => {
                setActiveView('certificate');
                setIsFlipped(true);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'certificate' || isFlipped
                  ? 'bg-[#183F36] text-[#D6E85D] shadow-md border border-[#D6E85D]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCheck2 className="h-3.5 w-3.5" />
              <span>University Certificate</span>
            </button>

            <button
              onClick={() => {
                setActiveView('story');
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'story'
                  ? 'bg-[#183F36] text-[#D6E85D] shadow-md border border-[#D6E85D]/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Story Card (9:16)</span>
            </button>
          </div>
        </div>

        {/* ── CARD DISPLAY VIEWPORT ── */}
        {activeView !== 'story' ? (
          /* 1 & 2. 3D Interactive Flippable Card: Front (Trophy) and Back (Certificate) */
          <div 
            className="[perspective:1200px] flex items-center justify-center my-1 select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
                transformStyle: 'preserve-3d',
                transition: tilt.x === 0 ? 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)' : 'transform 0.08s ease-out',
              }}
              className={`relative mx-auto w-full max-w-[340px] sm:max-w-[380px] rounded-3xl aspect-[9/13.5] shadow-2xl cursor-pointer group`}
              onClick={toggleFlip}
              title="Click card to flip between 3D Trophy Medal and University Certificate"
            >
              {/* ──────────────── FRONT FACE: 3D HOLOGRAPHIC TROPHY CARD ──────────────── */}
              <div 
                style={{ backfaceVisibility: 'hidden' }}
                className={`absolute inset-0 rounded-3xl overflow-hidden border-2 ${tierConfig.border} ${tierConfig.glow} bg-gradient-to-br from-[#12332C]/95 via-[#0A1A16]/98 to-[#050E0C] p-5 sm:p-6 text-white flex flex-col justify-between backdrop-blur-xl`}
              >
                {/* Dynamic Holographic Foil Glare that shimmers with mouse movement */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-30 mix-blend-color-dodge transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.9) 0%, ${tierConfig.foilGlare} 35%, transparent 75%)`
                  }}
                />

                {/* Iridescent Rainbow Sheen Waves */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-15 mix-blend-overlay"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, rgba(255,0,128,0.3) 0%, rgba(0,255,255,0.3) 25%, rgba(214,232,93,0.3) 50%, rgba(168,85,247,0.3) 75%, rgba(255,0,128,0.3) 100%)',
                    backgroundSize: '200% 200%',
                    transform: `translateX(${(tilt.glareX - 50) * 0.5}%) translateY(${(tilt.glareY - 50) * 0.5}%)`,
                  }}
                />

                {/* Ambient Corner Flare Orbs */}
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-[#D6E85D]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Card Top: Student & University Engineering Passport */}
                <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 z-10">
                  <div className="flex items-center gap-2.5 text-left">
                    <div className="relative">
                      <UserAvatar
                        avatarUrl={effectiveAvatar}
                        displayName={studentName}
                        email={user?.email}
                        className="w-11 h-11 text-xs ring-2 ring-[#D6E85D] shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-amber-500 text-white rounded-full p-0.5 shadow-md">
                        <Flame className="h-3 w-3" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-white leading-tight font-display">{studentName}</h4>
                        <span className="w-3.5 h-3.5 rounded-full bg-[#D6E85D] text-[#183F36] flex items-center justify-center text-[9px] font-black">✓</span>
                      </div>
                      <p className="text-[11px] text-[#D6E85D] font-semibold mt-0.5">
                        Level {eventData?.level || levelInfo.level} · {eventData?.levelTitle || levelInfo.title}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] font-black text-[#D6E85D] tracking-wider block font-display">ITM SLS BARODA</span>
                    <span className="text-[8px] text-[#A2BAAF] font-mono">B.TECH CSE '26</span>
                  </div>
                </div>

                {/* Card Center: Sculpted 3D Minted Medallion Emblem */}
                <div className="flex flex-col items-center my-auto py-2 z-10">
                  {/* Embossed Tier Banner */}
                  <span className={`text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-lg border border-white/20 font-display ${tierConfig.pill}`}>
                    {tierConfig.badge}
                  </span>

                  {/* 3D Concentric Sculpted Medallion */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center my-1">
                    {/* Outer Rotating Dash & Celestial Stars Ring */}
                    <div 
                      className="absolute inset-0 rounded-full border-2 border-dashed animate-spin [animation-duration:26s] opacity-75"
                      style={{ borderColor: tierConfig.ringColor }}
                    />
                    
                    {/* Outer Laurel Wreath Ring */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 animate-pulse [animation-duration:4s]" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="44" fill="none" stroke={tierConfig.ringColor} strokeWidth="1" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="41" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                    </svg>

                    {/* Middle Sculpted Metallic Dish */}
                    <div 
                      className={`absolute inset-2 rounded-full border-2 bg-gradient-to-tr ${tierConfig.metalBg} shadow-[0_0_35px_rgba(214,232,93,0.35)] flex items-center justify-center backdrop-blur-md`}
                      style={{ borderColor: tierConfig.ringColor }}
                    >
                      {/* Inner Polished Bevel Core */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 border border-white/20 flex items-center justify-center shadow-inner">
                        {/* 3D Floating Icon with specular drop shadow */}
                        <div className="text-4xl sm:text-5xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)] animate-bounce [animation-duration:3.2s]">
                          {activeAchievement.icon || '🏆'}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rarity & Percentile Badge */}
                  <div className="flex items-center gap-1.5 mt-2 mb-1">
                    <span className="text-[9px] font-black uppercase tracking-wider text-slate-300 bg-white/10 px-2 py-0.5 rounded-md border border-white/15">
                      {tierConfig.rarity}
                    </span>
                    <span className="text-[9px] font-bold text-[#D6E85D] bg-[#183F36]/80 px-2 py-0.5 rounded-md border border-[#D6E85D]/30 font-mono">
                      {tierConfig.percentile}
                    </span>
                  </div>

                  {/* Achievement Title */}
                  <h3 className="text-lg sm:text-xl font-black text-white leading-tight mb-1 font-display tracking-tight drop-shadow-sm">
                    {activeAchievement.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-200 max-w-[280px] leading-relaxed line-clamp-2">
                    {activeAchievement.description}
                  </p>

                  {/* XP Reward Capsule */}
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D6E85D]/20 border border-[#D6E85D]/60 text-[#D6E85D] font-black text-xs shadow-inner animate-pulse">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>+{activeAchievement.xpReward} XP CREDITED</span>
                  </div>
                </div>

                {/* Card Footer: Verified Watermark & Flip Hint */}
                <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-[#A2BAAF] z-10 font-mono">
                  <span className="flex items-center gap-1 font-bold text-white">
                    🔥 {eventData?.streakDays || game.streakDays} Day Streak
                  </span>
                  <span className="text-[#D6E85D] font-bold flex items-center gap-1">
                    <RotateCw className="h-3 w-3" /> Flip for Certificate ↗
                  </span>
                </div>
              </div>

              {/* ──────────────── BACK FACE: OFFICIAL UNIVERSITY CERTIFICATE ──────────────── */}
              <div 
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
                className="absolute inset-0 rounded-3xl overflow-hidden border-2 border-[#D6E85D]/70 bg-gradient-to-b from-[#0F2D25] via-[#091C17] to-black p-5 sm:p-6 text-white flex flex-col justify-between shadow-2xl backdrop-blur-xl"
              >
                {/* Guilloche Certificate Outer Frame */}
                <div className="absolute inset-2 border border-[#D6E85D]/30 rounded-2xl pointer-events-none" />
                <div className="absolute inset-3 border border-white/10 rounded-xl pointer-events-none" />

                {/* Certificate Header */}
                <div className="text-center pt-2 z-10">
                  <div className="w-9 h-9 rounded-full bg-[#D6E85D]/20 border border-[#D6E85D]/50 flex items-center justify-center mx-auto mb-1 text-[#D6E85D]">
                    <Ribbon className="h-5 w-5" />
                  </div>
                  <h4 className="text-[10px] font-black tracking-widest text-[#D6E85D] uppercase font-display">
                    ITM SLS BARODA UNIVERSITY
                  </h4>
                  <p className="text-[8px] text-[#A2BAAF] uppercase tracking-wider font-semibold">
                    Department of Computer Science & Engineering
                  </p>
                  <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D6E85D]/50 to-transparent mx-auto mt-1" />
                </div>

                {/* Certificate Body Text */}
                <div className="text-center my-auto py-2 px-2 z-10 space-y-1.5">
                  <span className="text-[9px] uppercase tracking-wider text-slate-300 font-bold block">
                    Certificate of Academic Mastery
                  </span>
                  
                  <p className="text-[11px] text-[#A2BAAF]">This is to certify that</p>
                  
                  <h3 className="text-lg sm:text-xl font-black text-white font-display text-[#D6E85D] tracking-tight">
                    {studentName}
                  </h3>

                  <p className="text-[10px] text-slate-300 leading-snug max-w-[280px] mx-auto">
                    has officially satisfied curriculum requirements and demonstrated verifiable practical skill in:
                  </p>

                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/15 my-2">
                    <span className="text-xs font-black text-white block font-display">
                      {activeAchievement.title}
                    </span>
                    <span className="text-[9px] text-[#A2BAAF] mt-0.5 block">
                      {tierConfig.badge} · {activeAchievement.category.toUpperCase()}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 text-[10px] text-emerald-400 font-mono font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>+{activeAchievement.xpReward} XP Formally Endorsed</span>
                  </div>
                </div>

                {/* Certificate Footer: Serial, Signature, and Stamp */}
                <div className="pt-2 border-t border-white/10 z-10 flex items-end justify-between text-left">
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-mono">
                      Accreditation ID
                    </span>
                    <span className="text-[9px] font-mono text-[#D6E85D] font-bold block">
                      {certSerial}
                    </span>
                    <span className="text-[8px] text-slate-400 font-mono">
                      Issued: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  <div className="text-right">
                    <div className="text-[11px] font-serif italic text-slate-200 border-b border-white/30 pb-0.5">
                      Dean & Faculty Council
                    </div>
                    <span className="text-[8px] text-[#A2BAAF] block mt-0.5">
                      CSE Department • ITM SLS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 3. Real High-Res 9:16 Social Story Preview */
          <div className="flex flex-col items-center justify-center my-1 gap-3">
            {/* Theme Selector Pills */}
            <div className="flex items-center justify-center gap-1.5 p-1 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] text-[#A2BAAF] font-bold uppercase tracking-wider px-2">Theme:</span>
              {(['obsidian', 'gold', 'cyber'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setStoryTheme(t)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    storyTheme === t
                      ? 'bg-[#D6E85D] text-[#183F36] border-[#D6E85D] shadow-sm scale-105'
                      : 'bg-transparent text-slate-400 border-transparent hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t === 'obsidian' ? '🌌 Emerald' : t === 'gold' ? '👑 24K Gold' : '⚡ Cyber'}
                </button>
              ))}
            </div>

            {/* High-Resolution Preview Frame */}
            <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] rounded-3xl overflow-hidden border border-[#D6E85D]/60 shadow-[0_0_60px_rgba(24,63,54,0.7)] bg-[#030E0B] aspect-[9/16] flex items-center justify-center group">
              {isGenerating || !storyPreviewUrl ? (
                <div className="p-8 text-center space-y-3">
                  <Loader2 className="h-9 w-9 animate-spin text-[#D6E85D] mx-auto" />
                  <p className="text-xs text-[#A2BAAF] font-bold">Rendering 1080x1920 HD Story Card...</p>
                  <p className="text-[11px] text-slate-500">Applying 3D metallic medal, foil light beams & university watermark</p>
                </div>
              ) : (
                <img
                  src={storyPreviewUrl}
                  alt="Story Card Preview"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                />
              )}
            </div>
          </div>
        )}

        {/* ── ACTION BAR ── */}
        <div className="flex flex-col gap-2.5 pt-1">
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-bold text-[#A2BAAF] uppercase tracking-wider flex items-center gap-1.5 font-display">
              <Share2 className="h-3.5 w-3.5 text-[#D6E85D]" />
              <span>Share Achievement with Classmates</span>
            </p>

            {activeView !== 'story' && (
              <button
                type="button"
                onClick={toggleFlip}
                className="text-xs text-[#D6E85D] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCw className="h-3.5 w-3.5" />
                <span>{isFlipped ? "View 3D Trophy" : "View Certificate"}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Instagram Stories Button */}
            <button
              onClick={handleShareInstagram}
              disabled={isGenerating}
              className="h-11 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-extrabold text-xs flex items-center justify-center gap-2 rounded-2xl shadow-lg border-0 transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Instagram className="h-4 w-4" />
              )}
              <span>Share to Instagram Story</span>
            </button>

            {/* WhatsApp Status Button */}
            <button
              onClick={handleShareWhatsApp}
              disabled={isGenerating}
              className="h-11 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-95 text-white font-extrabold text-xs flex items-center justify-center gap-2 rounded-2xl shadow-lg border-0 transition-transform hover:scale-[1.02] cursor-pointer disabled:opacity-50"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MessageCircle className="h-4 w-4" />
              )}
              <span>Share to WhatsApp Status</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Download HD Card */}
            <button
              onClick={handleDownloadStory}
              disabled={isGenerating || !storyPreviewUrl}
              className="h-10 border border-[#23584C] bg-[#12332C]/80 hover:bg-[#183F36] text-[#E8EDE4] text-xs font-semibold flex items-center justify-center gap-1.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-xs"
            >
              <Download className="h-3.5 w-3.5 text-[#D6E85D]" />
              <span>Download HD</span>
            </button>

            {/* Copy Card Image to Clipboard */}
            <button
              onClick={handleCopyCardImage}
              disabled={isGenerating || !storyBlob}
              className="h-10 border border-[#23584C] bg-[#12332C]/80 hover:bg-[#183F36] text-[#E8EDE4] text-xs font-semibold flex items-center justify-center gap-1.5 rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-xs"
              title="Copy card image directly to paste in WhatsApp, Discord, etc."
            >
              <Eye className="h-3.5 w-3.5 text-[#D6E85D]" />
              <span>Copy Image</span>
            </button>

            {/* Copy Shareable Link */}
            <button
              onClick={handleCopyText}
              className="h-10 border border-[#23584C] bg-[#12332C]/80 hover:bg-[#183F36] text-[#E8EDE4] text-xs font-semibold flex items-center justify-center gap-1.5 rounded-xl transition-all cursor-pointer shadow-xs"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#D6E85D]" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
