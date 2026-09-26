import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification, Achievement } from '@/hooks/useGamification';
import { generateAchievementStoryCard } from '@/utils/achievementCardGenerator';
import { 
  X, Download, Share2, Sparkles, Check, 
  Instagram, MessageCircle, Copy, Award, Flame, ExternalLink, Loader2
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
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyPreviewUrl, setStoryPreviewUrl] = useState<string | null>(null);
  const [storyBlob, setStoryBlob] = useState<Blob | null>(null);
  const [copied, setCopied] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiAnimRef = useRef<number | null>(null);

  // Play triumph fanfare sound
  const playVictoryFanfare = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
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

    const colors = ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#F43F5E', '#FFFFFF'];
    const particles = Array.from({ length: 80 }).map(() => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.4,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      gravity: 0.35,
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
        p.alpha -= 0.008;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
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
    const avatarUrl = profile?.avatar_url || null;

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
  const shareText = `🎓 I just unlocked "${activeAchievement.title}" (+${activeAchievement.xpReward} XP) on ITM Notes! Check out our Semester 3 Exam Notes: https://itm-notes.vercel.app`;

  // 1-Click Share to Instagram Stories
  const handleShareInstagram = async () => {
    if (!storyBlob) {
      toast.error('Card is still generating, please wait a moment.');
      return;
    }

    const file = new File([storyBlob], `ITM_Achievement_${activeAchievement.id}.png`, {
      type: 'image/png',
    });

    // Check if Web Share API with files is supported (iOS Safari / Android Chrome)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `ITM Achievement: ${activeAchievement.title}`,
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

    // Fallback: Download card and open Instagram app / web
    handleDownloadStory();
    toast.info('Story card downloaded! Opening Instagram...', {
      description: 'You can now select the saved image directly in your Instagram Story camera!',
    });

    // Attempt to open native Instagram on mobile
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
          title: `ITM Achievement: ${activeAchievement.title}`,
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

    // Fallback: Download the image and launch WhatsApp directly
    handleDownloadStory();
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
    toast.success('Story card saved to your photos! Opening WhatsApp...');
  };

  // Direct High-Res Card Download
  const handleDownloadStory = () => {
    if (!storyPreviewUrl) return;
    const a = document.createElement('a');
    a.href = storyPreviewUrl;
    a.download = `ITM_Achievement_${activeAchievement.id}_Story.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('HD Instagram Story card downloaded to your device!');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    toast.success('Share link and text copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Full-screen Confetti Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10 w-full h-full" />

      {/* Main Luxury Modal Card */}
      <div className="relative z-20 w-full max-w-[calc(100vw-1rem)] sm:max-w-xl bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-amber-500/40 rounded-3xl p-4 sm:p-6 lg:p-7 shadow-[0_0_60px_rgba(245,158,11,0.25)] flex flex-col gap-5 text-center my-auto">
        {/* Close Button */}
        <button
          onClick={() => setActiveAchievement(null)}
          className="absolute right-4 top-4 p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 transition-colors z-30"
          title="Close celebration"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Celebration Header */}
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{eventData?.isReplay ? 'Achievement Viewer' : 'Achievement Unlocked'}</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
            {eventData?.isReplay ? 'Your Academic Triumph' : 'Academic Triumph!'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            ITM SLS Baroda University • Department of CSE
          </p>
        </div>

        {/* The "Most Beautiful Card" Showcase Preview */}
        <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[360px] rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-2xl bg-zinc-900 aspect-[9/14] flex flex-col items-center justify-between p-3 sm:p-5 text-white">
          {/* Ambient Card Background Glows */}
          <div className="absolute -top-16 -left-16 w-44 h-44 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top: User Info & University */}
          <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 z-10">
            <div className="flex items-center gap-2.5 text-left">
              {/* Profile Photo / Avatar */}
              <div className="relative">
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={studentName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-amber-400 shadow-md"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-600 flex items-center justify-center font-bold text-white text-sm border-2 border-amber-400 shadow-md">
                    {studentName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5 shadow">
                  <Flame className="h-3 w-3 text-white" />
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs text-white leading-tight">{studentName}</h4>
                <p className="text-[10px] text-amber-400 font-semibold">
                  Level {eventData?.level || levelInfo.level} · {eventData?.levelTitle || levelInfo.title}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-bold text-zinc-400 block tracking-wider">ITM SLS BARODA</span>
              <span className="text-[8px] text-zinc-500 font-mono">B.TECH CSE</span>
            </div>
          </div>

          {/* Card Center: Animated Achievement Badge */}
          <div className="flex flex-col items-center my-auto py-2 z-10">
            {/* Tier Banner */}
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 shadow-sm ${
              activeAchievement.tier === 'legendary'
                ? 'bg-purple-600 text-white'
                : activeAchievement.tier === 'gold'
                ? 'bg-amber-500 text-black'
                : activeAchievement.tier === 'silver'
                ? 'bg-zinc-200 text-zinc-900'
                : 'bg-amber-700 text-white'
            }`}>
              ★ {activeAchievement.tier} Achievement ★
            </span>

            {/* Giant Icon */}
            <div className="text-5xl sm:text-6xl lg:text-7xl mb-2 animate-bounce drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
              {activeAchievement.icon}
            </div>

            <h3 className="text-base sm:text-lg lg:text-xl font-black text-white leading-tight mb-1">
              {activeAchievement.title}
            </h3>

            <p className="text-xs text-zinc-300 max-w-[260px] leading-relaxed">
              {activeAchievement.description}
            </p>

            {/* XP Pill */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black text-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>+{activeAchievement.xpReward} XP AWARDED</span>
            </div>
          </div>

          {/* Card Footer: University Watermark & Stats */}
          <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-400 z-10 font-mono">
            <span>🔥 {eventData?.streakDays || game.streakDays} Day Streak</span>
            <span className="text-amber-400 font-bold">✨ itm-notes.vercel.app</span>
          </div>
        </div>

        {/* Share & Download Actions */}
        <div className="flex flex-col gap-2.5">
          <p className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center justify-center gap-1">
            <Share2 className="h-3.5 w-3.5 text-amber-400" /> Share with Friends & Classmates
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Instagram Stories Button */}
            <Button
              onClick={handleShareInstagram}
              disabled={isGenerating}
              className="h-11 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:opacity-90 text-white font-bold text-xs gap-2 rounded-xl shadow-lg border-0"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Instagram className="h-4 w-4" />
              )}
              <span>Share to Instagram Story</span>
            </Button>

            {/* WhatsApp Status Button */}
            <Button
              onClick={handleShareWhatsApp}
              disabled={isGenerating}
              className="h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs gap-2 rounded-xl shadow-lg"
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MessageCircle className="h-4 w-4" />
              )}
              <span>Share to WhatsApp Status</span>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Download HD Card */}
            <Button
              variant="outline"
              onClick={handleDownloadStory}
              disabled={isGenerating || !storyPreviewUrl}
              className="h-9 border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold gap-1.5 rounded-xl"
            >
              <Download className="h-3.5 w-3.5 text-amber-400" />
              <span>Download Card (HD)</span>
            </Button>

            {/* Copy Shareable Link */}
            <Button
              variant="outline"
              onClick={handleCopyText}
              className="h-9 border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold gap-1.5 rounded-xl"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Copied Link!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Share Text</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
