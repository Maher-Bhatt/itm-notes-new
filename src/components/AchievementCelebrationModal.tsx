import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification, Achievement } from '@/hooks/useGamification';
import { generateAchievementStoryCard } from '@/utils/achievementCardGenerator';
import { UserAvatar, resolveAvatarUrl, MAHER_CANONICAL_AVATAR } from '@/components/UserAvatar';
import { 
  X, Download, Share2, Sparkles, Check, 
  Instagram, MessageCircle, Copy, Award, Flame, ExternalLink, Loader2,
  Trophy, ShieldCheck, Smartphone, Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  const [activeView, setActiveView] = useState<'trophy' | 'story'>('trophy');
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
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const notes = [
        { f: 523.25, t: 0.0, d: 0.15 }, // C5
        { f: 659.25, t: 0.12, d: 0.15 }, // E5
        { f: 783.99, t: 0.24, d: 0.15 }, // G5
        { f: 1046.50, t: 0.38, d: 0.45 }, // C6
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
  }, []);

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
  }, [activeAchievement, profile, user, levelInfo, game, eventData]);

  if (!activeAchievement) return null;

  const studentName = profile?.display_name || user?.email?.split('@')[0] || 'Maher Bhatt';
  const effectiveAvatar = resolveAvatarUrl(profile, user) || MAHER_CANONICAL_AVATAR;
  const shareText = `🎓 I just unlocked "${activeAchievement.title}" (+${activeAchievement.xpReward} XP) on ITM Notes! Check out our verified Semester 3 Computer Engineering Notes: https://itm-notes-new.vercel.app`;

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
      border: 'border-[#E07A5F]/60',
      glow: 'shadow-[0_0_50px_rgba(224,122,95,0.35)]',
      pill: 'bg-gradient-to-r from-[#C25E38] to-[#E07A5F] text-white',
      badge: '★ BRONZE SCHOLAR ★',
      ringColor: '#E07A5F',
      accentText: 'text-[#E07A5F]',
    },
    silver: {
      border: 'border-slate-300/60',
      glow: 'shadow-[0_0_50px_rgba(226,232,240,0.35)]',
      pill: 'bg-gradient-to-r from-slate-300 to-slate-100 text-slate-900',
      badge: '★ SILVER VIRTUOSO ★',
      ringColor: '#E2E8F0',
      accentText: 'text-slate-200',
    },
    gold: {
      border: 'border-[#D6E85D]/70',
      glow: 'shadow-[0_0_60px_rgba(214,232,93,0.4)]',
      pill: 'bg-gradient-to-r from-[#D6E85D] to-[#F59E0B] text-[#183F36]',
      badge: '★ 24K GOLD MASTER ★',
      ringColor: '#D6E85D',
      accentText: 'text-[#D6E85D]',
    },
    legendary: {
      border: 'border-purple-500/70',
      glow: 'shadow-[0_0_60px_rgba(168,85,247,0.4)]',
      pill: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white',
      badge: '★ LEGENDARY TRIUMPH ★',
      ringColor: '#C084FC',
      accentText: 'text-purple-300',
    },
    mythic: {
      border: 'border-[#D6E85D]',
      glow: 'shadow-[0_0_70px_rgba(214,232,93,0.5)]',
      pill: 'bg-gradient-to-r from-[#D6E85D] via-emerald-400 to-[#183F36] text-[#183F36]',
      badge: '★ MYTHIC ARCHITECT ★',
      ringColor: '#D6E85D',
      accentText: 'text-[#D6E85D]',
    },
  }[activeAchievement.tier] || {
    border: 'border-[#D6E85D]/60',
    glow: 'shadow-[0_0_50px_rgba(214,232,93,0.3)]',
    pill: 'bg-[#D6E85D] text-[#183F36]',
    badge: '★ ACADEMIC HONORS ★',
    ringColor: '#D6E85D',
    accentText: 'text-[#D6E85D]',
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
      description: 'Image saved to your camera roll in 1080x1920 HD quality.',
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

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    toast.success('Achievement showcase link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      {/* Full-screen Confetti Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10 w-full h-full" />

      {/* Main Luxury Modal Container */}
      <div className="relative z-20 w-full max-w-2xl bg-gradient-to-b from-[#12332C]/95 via-[#0A1A16]/95 to-black border border-[#23584C] rounded-3xl p-5 sm:p-7 shadow-[0_0_80px_rgba(24,63,54,0.6)] flex flex-col gap-5 text-center my-auto backdrop-blur-2xl">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveAchievement(null)}
          className="absolute right-4 top-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E8EDE4] transition-all z-30 cursor-pointer shadow-md"
          title="Close"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Modal Top Header */}
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D6E85D]/15 border border-[#D6E85D]/30 text-[#D6E85D] text-[11px] font-bold uppercase tracking-wider mb-1.5">
            <Sparkles className="h-3.5 w-3.5 animate-spin [animation-duration:10s]" />
            <span>{eventData?.isReplay ? 'Honors Gallery • Achievement Story' : 'New Milestone Unlocked!'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-display">
            {eventData?.isReplay ? 'Your Academic Triumph' : 'Academic Triumph!'}
          </h2>
          <p className="text-xs text-[#A2BAAF] flex items-center gap-1.5 mt-0.5 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-[#D6E85D]" />
            <span>ITM SLS Baroda University • Department of Computer Science</span>
          </p>

          {/* View Mode Switcher: 3D Trophy vs 9:16 Social Story */}
          <div className="inline-flex p-1 rounded-2xl bg-black/40 border border-white/10 mt-3 gap-1">
            <button
              onClick={() => setActiveView('trophy')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'trophy'
                  ? 'bg-[#183F36] text-[#D6E85D] shadow-md border border-[#D6E85D]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Trophy className="h-3.5 w-3.5" />
              <span>3D Trophy Medal</span>
            </button>
            <button
              onClick={() => setActiveView('story')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeView === 'story'
                  ? 'bg-[#183F36] text-[#D6E85D] shadow-md border border-[#D6E85D]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span>Story Card (9:16)</span>
            </button>
          </div>
        </div>

        {/* ── CARD DISPLAY VIEWPORT ── */}
        {activeView === 'trophy' ? (
          /* 1. 3D Interactive Holographic Trophy Card */
          <div 
            className="[perspective:1000px] flex items-center justify-center my-1 select-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: tilt.x === 0 ? 'transform 0.5s ease-out' : 'none',
              }}
              className={`relative mx-auto w-full max-w-[340px] sm:max-w-[380px] rounded-3xl overflow-hidden border-2 ${tierConfig.border} ${tierConfig.glow} bg-gradient-to-br from-[#183F36]/90 via-[#0F2B24]/95 to-[#081714] p-5 sm:p-6 text-white flex flex-col justify-between aspect-[9/13.5] shadow-2xl backdrop-blur-md`}
            >
              {/* Dynamic Glare Shimmer across the surface */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-25 mix-blend-overlay transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.8) 0%, rgba(214,232,93,0.3) 35%, transparent 70%)`
                }}
              />

              {/* Ambient Background Glows */}
              <div className="absolute -top-16 -left-16 w-44 h-44 bg-[#D6E85D]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Card Header: Student & University Branding */}
              <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 z-10">
                <div className="flex items-center gap-2.5 text-left">
                  <div className="relative">
                    <UserAvatar
                      avatarUrl={effectiveAvatar}
                      displayName={studentName}
                      email={user?.email}
                      className="w-11 h-11 text-xs ring-2 ring-[#D6E85D]"
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
                  <span className="text-[9px] font-black text-[#D6E85D] tracking-wider block">ITM SLS BARODA</span>
                  <span className="text-[8px] text-[#A2BAAF] font-mono">B.TECH CSE '26</span>
                </div>
              </div>

              {/* Card Center: Sculpted 3D Medallion Emblem */}
              <div className="flex flex-col items-center my-auto py-2 z-10">
                {/* Embossed Tier Banner */}
                <span className={`text-[10px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-3 shadow-md border border-white/20 ${tierConfig.pill}`}>
                  {tierConfig.badge}
                </span>

                {/* 3D Concentric Medal Rings */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center my-2">
                  {/* Outer Orbit Dash Ring */}
                  <div 
                    className="absolute inset-0 rounded-full border-2 border-dashed animate-spin [animation-duration:24s]"
                    style={{ borderColor: tierConfig.ringColor }}
                  />
                  {/* Middle Glowing Metallic Ring */}
                  <div 
                    className="absolute inset-2 rounded-full border-2 bg-gradient-to-tr from-black/80 to-[#183F36]/80 shadow-[0_0_30px_rgba(214,232,93,0.3)] flex items-center justify-center"
                    style={{ borderColor: tierConfig.ringColor }}
                  >
                    {/* Inner Centerpiece Icon with floating drop shadow */}
                    <div className="text-5xl sm:text-6xl drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] animate-bounce [animation-duration:3s]">
                      {activeAchievement.icon || '🏆'}
                    </div>
                  </div>
                </div>

                {/* Achievement Title */}
                <h3 className="text-lg sm:text-xl font-black text-white leading-tight mb-1 font-display mt-2 tracking-tight">
                  {activeAchievement.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#C2D6CF] max-w-[280px] leading-relaxed line-clamp-2">
                  {activeAchievement.description}
                </p>

                {/* XP Reward Capsule */}
                <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D6E85D]/20 border border-[#D6E85D]/50 text-[#D6E85D] font-black text-xs shadow-inner animate-pulse">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>+{activeAchievement.xpReward} XP CREDITED</span>
                </div>
              </div>

              {/* Card Footer: Verified Watermark */}
              <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-[#A2BAAF] z-10 font-mono">
                <span className="flex items-center gap-1 font-bold text-white">
                  🔥 {eventData?.streakDays || game.streakDays} Day Streak
                </span>
                <span className="text-[#D6E85D] font-bold">✨ itm-notes-new.vercel.app</span>
              </div>
            </div>
          </div>
        ) : (
          /* 2. Real High-Res 9:16 Social Story Preview */
          <div className="flex items-center justify-center my-1">
            <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] rounded-3xl overflow-hidden border-2 border-[#D6E85D]/60 shadow-2xl bg-black aspect-[9/16] flex items-center justify-center">
              {isGenerating || !storyPreviewUrl ? (
                <div className="p-6 text-center space-y-3">
                  <Loader2 className="h-8 w-8 animate-spin text-[#D6E85D] mx-auto" />
                  <p className="text-xs text-[#A2BAAF] font-medium">Generating 1080x1920 HD Story Card...</p>
                </div>
              ) : (
                <img
                  src={storyPreviewUrl}
                  alt="Story Card Preview"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        )}

        {/* ── ACTION BAR ── */}
        <div className="flex flex-col gap-2.5 pt-1">
          <p className="text-xs font-bold text-[#A2BAAF] uppercase tracking-wider flex items-center justify-center gap-1.5">
            <Share2 className="h-3.5 w-3.5 text-[#D6E85D]" />
            <span>Share Achievement with Classmates</span>
          </p>

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

          <div className="grid grid-cols-2 gap-2.5">
            {/* Download HD Card */}
            <button
              onClick={handleDownloadStory}
              disabled={isGenerating || !storyPreviewUrl}
              className="h-9 border border-[#23584C] bg-[#12332C]/80 hover:bg-[#183F36] text-[#E8EDE4] text-xs font-semibold flex items-center justify-center gap-1.5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5 text-[#D6E85D]" />
              <span>Download HD Story</span>
            </button>

            {/* Copy Shareable Link */}
            <button
              onClick={handleCopyText}
              className="h-9 border border-[#23584C] bg-[#12332C]/80 hover:bg-[#183F36] text-[#E8EDE4] text-xs font-semibold flex items-center justify-center gap-1.5 rounded-xl transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[#D6E85D]" />
                  <span>Copy Share Text</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
