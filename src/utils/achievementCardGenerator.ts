/**
 * achievementCardGenerator.ts
 * Generates high-resolution (1080x1920) luxury Instagram Story & WhatsApp Status cards
 * directly in the browser using HTML5 Canvas with the official ITM Notes brand aesthetic.
 */

export interface AchievementCardData {
  studentName: string;
  avatarUrl: string | null;
  level: number;
  levelTitle: string;
  achievementTitle: string;
  achievementDescription: string;
  achievementIcon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'legendary' | 'mythic';
  xpReward: number;
  totalXp: number;
  streakDays: number;
  theme?: 'obsidian' | 'gold' | 'cyber';
}

const TIER_CONFIG = {
  bronze: { 
    primary: '#E07A5F', 
    secondary: '#9A3412', 
    glow: 'rgba(224, 122, 95, 0.45)', 
    label: '★ BRONZE SCHOLAR ★', 
    ring: '#C25E38',
    medalGrad: ['#E07A5F', '#C25E38', '#7C2D12'],
    accentText: '#FDBA74',
  },
  silver: { 
    primary: '#E2E8F0', 
    secondary: '#64748B', 
    glow: 'rgba(226, 232, 240, 0.45)', 
    label: '★ SILVER VIRTUOSO ★', 
    ring: '#94A3B8',
    medalGrad: ['#FFFFFF', '#CBD5E1', '#475569'],
    accentText: '#F8FAFC',
  },
  gold: { 
    primary: '#D6E85D', 
    secondary: '#F59E0B', 
    glow: 'rgba(214, 232, 93, 0.65)', 
    label: '★ 24K GOLD MASTER ★', 
    ring: '#EAB308',
    medalGrad: ['#FEF08A', '#F59E0B', '#B45309'],
    accentText: '#D6E85D',
  },
  legendary: { 
    primary: '#C084FC', 
    secondary: '#7C3AED', 
    glow: 'rgba(192, 132, 252, 0.65)', 
    label: '★ LEGENDARY HONORS ★', 
    ring: '#A855F7',
    medalGrad: ['#F0ABFC', '#A855F7', '#581C87'],
    accentText: '#E879F9',
  },
  mythic: { 
    primary: '#D6E85D', 
    secondary: '#10B981', 
    glow: 'rgba(214, 232, 93, 0.85)', 
    label: '★ MYTHIC ARCHITECT ★', 
    ring: '#10B981',
    medalGrad: ['#D6E85D', '#10B981', '#064E3B'],
    accentText: '#D6E85D',
  },
};

/**
 * Creates a high-impact, full-bleed 1080x1920 Canvas element and draws a viral story card.
 */
export async function generateAchievementStoryCard(data: AchievementCardData): Promise<{ dataUrl: string; blob: Blob }> {
  const width = 1080;
  const height = 1920;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  const tierStyle = TIER_CONFIG[data.tier] || TIER_CONFIG.gold;
  const theme = data.theme || 'obsidian';

  // 1. Deep Luxury Obsidian & Emerald Background with Multi-stop Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  if (theme === 'gold') {
    bgGrad.addColorStop(0, '#0F172A');
    bgGrad.addColorStop(0.3, '#1E293B');
    bgGrad.addColorStop(0.7, '#0F172A');
    bgGrad.addColorStop(1, '#020617');
  } else if (theme === 'cyber') {
    bgGrad.addColorStop(0, '#050B14');
    bgGrad.addColorStop(0.3, '#0A1828');
    bgGrad.addColorStop(0.7, '#091522');
    bgGrad.addColorStop(1, '#03070E');
  } else {
    // Obsidian Emerald (Official ITM Signature)
    bgGrad.addColorStop(0, '#030E0B');
    bgGrad.addColorStop(0.25, '#0A251E');
    bgGrad.addColorStop(0.6, '#0E3027');
    bgGrad.addColorStop(0.85, '#081D17');
    bgGrad.addColorStop(1, '#020806');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Ambient Volumetric Glow Orbs
  const drawGlow = (cx: number, cy: number, r: number, color: string) => {
    const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    radial.addColorStop(0, color);
    radial.addColorStop(1, 'transparent');
    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  };

  // Center top glow
  drawGlow(width * 0.5, 380, 520, 'rgba(214, 232, 93, 0.12)');
  // Center medal glow (intense)
  drawGlow(width * 0.5, 940, 600, tierStyle.glow);
  // Bottom sides
  drawGlow(width * 0.15, 1550, 480, 'rgba(16, 185, 129, 0.14)');
  drawGlow(width * 0.85, 1550, 480, 'rgba(214, 232, 93, 0.14)');

  // 3. Subtle Geometric Guilloche / Constellation Watermark
  ctx.save();
  ctx.strokeStyle = 'rgba(214, 232, 93, 0.05)';
  ctx.lineWidth = 1;
  for (let r = 200; r <= 800; r += 120) {
    ctx.beginPath();
    ctx.arc(width / 2, 940, r, 0, Math.PI * 2);
    ctx.stroke();
  }
  // Subtle diagonal watermark grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
  for (let x = -width; x < width * 2; x += 90) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + height, height);
    ctx.stroke();
  }
  ctx.restore();

  // 4. Elegant Outer Double Frame & Ornate Corner Brackets
  ctx.save();
  // Outer fine frame
  ctx.strokeStyle = 'rgba(214, 232, 93, 0.25)';
  ctx.lineWidth = 2;
  roundRect(ctx, 36, 36, width - 72, height - 72, 32);
  ctx.stroke();

  // Inner metallic border
  ctx.strokeStyle = tierStyle.primary;
  ctx.lineWidth = 3.5;
  roundRect(ctx, 48, 48, width - 96, height - 96, 26);
  ctx.stroke();

  // Ornate Luxury Corner Brackets
  const cornerSize = 56;
  ctx.fillStyle = tierStyle.primary;
  // Top-left
  ctx.fillRect(40, 40, cornerSize, 5);
  ctx.fillRect(40, 40, 5, cornerSize);
  // Top-right
  ctx.fillRect(width - 40 - cornerSize, 40, cornerSize, 5);
  ctx.fillRect(width - 45, 40, 5, cornerSize);
  // Bottom-left
  ctx.fillRect(40, height - 45, cornerSize, 5);
  ctx.fillRect(40, height - 40 - cornerSize, 5, cornerSize);
  // Bottom-right
  ctx.fillRect(width - 40 - cornerSize, height - 45, cornerSize, 5);
  ctx.fillRect(width - 45, height - 40 - cornerSize, 5, cornerSize);
  ctx.restore();

  // 5. University & CSE Header
  ctx.textAlign = 'center';
  ctx.fillStyle = '#D6E85D';
  ctx.font = '900 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('ITM SLS BARODA UNIVERSITY', width / 2, 120);

  ctx.fillStyle = '#C4DAD2';
  ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '3px';
  ctx.fillText('DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING', width / 2, 155);
  ctx.letterSpacing = '0px';

  // Divider Line with Center Diamond
  ctx.strokeStyle = 'rgba(214, 232, 93, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 260, 185);
  ctx.lineTo(width / 2 + 260, 185);
  ctx.stroke();

  ctx.fillStyle = tierStyle.primary;
  ctx.beginPath();
  ctx.moveTo(width / 2, 178);
  ctx.lineTo(width / 2 + 7, 185);
  ctx.lineTo(width / 2, 192);
  ctx.lineTo(width / 2 - 7, 185);
  ctx.closePath();
  ctx.fill();

  // 6. Student Profile Hero Section
  const avatarY = 320;
  const avatarRadius = 92;

  let avatarLoaded = false;
  if (data.avatarUrl) {
    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = data.avatarUrl;
      await new Promise((resolve, reject) => {
        img.onload = () => resolve(true);
        img.onerror = () => reject(false);
      });

      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, avatarY, avatarRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, width / 2 - avatarRadius, avatarY - avatarRadius, avatarRadius * 2, avatarRadius * 2);
      ctx.restore();
      avatarLoaded = true;
    } catch {
      avatarLoaded = false;
    }
  }

  if (!avatarLoaded) {
    const avatarGrad = ctx.createLinearGradient(width / 2 - avatarRadius, avatarY - avatarRadius, width / 2 + avatarRadius, avatarY + avatarRadius);
    avatarGrad.addColorStop(0, '#183F36');
    avatarGrad.addColorStop(1, '#091C17');
    ctx.fillStyle = avatarGrad;
    ctx.beginPath();
    ctx.arc(width / 2, avatarY, avatarRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#D6E85D';
    ctx.font = '900 84px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((data.studentName || 'M').charAt(0).toUpperCase(), width / 2, avatarY + 4);
    ctx.textBaseline = 'alphabetic';
  }

  // Avatar Double Metallic Ring
  ctx.save();
  ctx.strokeStyle = tierStyle.primary;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(width / 2, avatarY, avatarRadius + 4, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(width / 2, avatarY, avatarRadius + 11, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Student Name
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 56px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.studentName || 'Student Scholar', width / 2, 470);

  // Level & Program Badge Pill
  const levelText = `Level ${data.level} · ${data.levelTitle}  •  B.Tech CSE '26`;
  ctx.font = '800 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  const levelMetrics = ctx.measureText(levelText);
  const pillW = levelMetrics.width + 50;
  const pillH = 46;
  const pillX = width / 2 - pillW / 2;
  const pillY = 495;

  ctx.fillStyle = 'rgba(214, 232, 93, 0.15)';
  roundRect(ctx, pillX, pillY, pillW, pillH, 23);
  ctx.fill();

  ctx.strokeStyle = 'rgba(214, 232, 93, 0.45)';
  ctx.lineWidth = 1.5;
  roundRect(ctx, pillX, pillY, pillW, pillH, 23);
  ctx.stroke();

  ctx.fillStyle = '#D6E85D';
  ctx.fillText(levelText, width / 2, pillY + 31);

  // 7. Radiant Centerpiece 3D Medallion (MASSIVE HERO MEDAL)
  const medalCenterY = 880;
  const medalRadius = 165; // 330px diameter!

  // Volumetric Sunburst Light Rays behind Medal
  ctx.save();
  ctx.strokeStyle = 'rgba(214, 232, 93, 0.12)';
  ctx.lineWidth = 4;
  for (let i = 0; i < 24; i++) {
    const angle = (i * Math.PI) / 12;
    ctx.beginPath();
    ctx.moveTo(width / 2 + Math.cos(angle) * (medalRadius + 20), medalCenterY + Math.sin(angle) * (medalRadius + 20));
    ctx.lineTo(width / 2 + Math.cos(angle) * (medalRadius + 150), medalCenterY + Math.sin(angle) * (medalRadius + 150));
    ctx.stroke();
  }
  ctx.restore();

  // Outer Dashed Orbit Ring
  ctx.save();
  ctx.strokeStyle = tierStyle.primary;
  ctx.lineWidth = 4;
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.arc(width / 2, medalCenterY, medalRadius + 18, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Outer Laurel Ring / Sculpted Rim
  ctx.save();
  const outerRimGrad = ctx.createLinearGradient(width / 2 - medalRadius, medalCenterY - medalRadius, width / 2 + medalRadius, medalCenterY + medalRadius);
  outerRimGrad.addColorStop(0, tierStyle.medalGrad[0]);
  outerRimGrad.addColorStop(0.5, tierStyle.medalGrad[1]);
  outerRimGrad.addColorStop(1, tierStyle.medalGrad[2]);
  ctx.fillStyle = outerRimGrad;
  ctx.beginPath();
  ctx.arc(width / 2, medalCenterY, medalRadius, 0, Math.PI * 2);
  ctx.fill();

  // Inner Bevel Groove
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(width / 2, medalCenterY, medalRadius - 8, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(width / 2, medalCenterY, medalRadius - 12, 0, Math.PI * 2);
  ctx.stroke();

  // Inner Deep Enamel Dish
  const dishGrad = ctx.createRadialGradient(width / 2 - 40, medalCenterY - 40, 10, width / 2, medalCenterY, medalRadius - 16);
  dishGrad.addColorStop(0, '#12332C');
  dishGrad.addColorStop(0.7, '#071813');
  dishGrad.addColorStop(1, '#020705');
  ctx.fillStyle = dishGrad;
  ctx.beginPath();
  ctx.arc(width / 2, medalCenterY, medalRadius - 16, 0, Math.PI * 2);
  ctx.fill();

  // Specular Reflection Crescent
  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.beginPath();
  ctx.arc(width / 2, medalCenterY - 30, medalRadius - 26, Math.PI * 0.9, Math.PI * 2.1);
  ctx.fill();
  ctx.restore();

  // Large 3D Icon / Glyph inside Medallion
  ctx.save();
  ctx.font = '165px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 12;
  ctx.fillText(data.achievementIcon || '🏆', width / 2, medalCenterY + 4);
  ctx.restore();

  // Tier Ribbon Banner Draped across the Medal Base
  const ribbonW = 380;
  const ribbonH = 54;
  const ribbonX = width / 2 - ribbonW / 2;
  const ribbonY = medalCenterY + medalRadius - 26;

  ctx.save();
  ctx.fillStyle = outerRimGrad;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 8;
  roundRect(ctx, ribbonX, ribbonY, ribbonW, ribbonH, 27);
  ctx.fill();

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 1.5;
  roundRect(ctx, ribbonX + 2, ribbonY + 2, ribbonW - 4, ribbonH - 4, 25);
  ctx.stroke();

  ctx.fillStyle = '#061713';
  ctx.font = '900 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '2px';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(tierStyle.label, width / 2, ribbonY + ribbonH / 2 + 1);
  ctx.restore();

  // 8. Achievement Title & Description
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 62px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowBlur = 14;
  ctx.fillText(data.achievementTitle, width / 2, 1160);
  ctx.shadowBlur = 0;

  // Description
  ctx.fillStyle = '#D1E3DC';
  ctx.font = '500 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  wrapText(ctx, data.achievementDescription, width / 2, 1215, 860, 42);

  // 9. High-Impact XP Award Capsule
  const xpPillW = 520;
  const xpPillH = 70;
  const xpPillX = width / 2 - xpPillW / 2;
  const xpPillY = 1320;

  ctx.save();
  ctx.fillStyle = 'rgba(214, 232, 93, 0.18)';
  ctx.shadowColor = 'rgba(214, 232, 93, 0.35)';
  ctx.shadowBlur = 20;
  roundRect(ctx, xpPillX, xpPillY, xpPillW, xpPillH, 35);
  ctx.fill();

  ctx.strokeStyle = '#D6E85D';
  ctx.lineWidth = 2.5;
  roundRect(ctx, xpPillX, xpPillY, xpPillW, xpPillH, 35);
  ctx.stroke();

  ctx.fillStyle = '#D6E85D';
  ctx.font = '900 32px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`✨ +${data.xpReward} XP AWARDED TO PASSPORT`, width / 2, xpPillY + xpPillH / 2 + 2);
  ctx.restore();

  // 10. Three Rich Glassmorphic Stat Cards (Well proportioned across the bottom)
  const statCardY = 1440;
  const statCardW = 286;
  const statCardH = 160;
  const statGap = 26;
  const statStartX = (width - (statCardW * 3 + statGap * 2)) / 2;

  const stats = [
    { label: 'STUDY STREAK', val: `🔥 ${data.streakDays} Days`, sub: 'Consecutive Study' },
    { label: 'TOTAL EXP', val: `✨ ${data.totalXp.toLocaleString()}`, sub: 'Academic XP' },
    { label: 'COHORT RANK', val: `🏆 Top 5%`, sub: 'CSE Department' },
  ];

  stats.forEach((s, idx) => {
    const x = statStartX + idx * (statCardW + statGap);
    ctx.save();
    // Glassmorphic card fill
    ctx.fillStyle = 'rgba(12, 38, 31, 0.85)';
    roundRect(ctx, x, statCardY, statCardW, statCardH, 24);
    ctx.fill();

    ctx.strokeStyle = 'rgba(214, 232, 93, 0.3)';
    ctx.lineWidth = 2;
    roundRect(ctx, x, statCardY, statCardW, statCardH, 24);
    ctx.stroke();

    // Micro-label
    ctx.fillStyle = '#94B4A7';
    ctx.font = '800 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '1.5px';
    ctx.fillText(s.label, x + statCardW / 2, statCardY + 44);

    // Value
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.letterSpacing = '0px';
    ctx.fillText(s.val, x + statCardW / 2, statCardY + 96);

    // Subtitle
    ctx.fillStyle = '#D6E85D';
    ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(s.sub, x + statCardW / 2, statCardY + 130);
    ctx.restore();
  });

  // 11. Official Verification Seal & Serial Hash
  const hash = (data.achievementTitle.length * 77 + data.level * 19 + data.xpReward * 3).toString(16).toUpperCase();
  const serialText = `ACCREDITATION ID: ITM-CSE-2026-${hash}`;

  ctx.save();
  // Center wax seal stamp
  const stampY = 1680;
  const stampR = 48;
  ctx.fillStyle = 'rgba(214, 232, 93, 0.1)';
  ctx.beginPath();
  ctx.arc(width / 2, stampY, stampR, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#D6E85D';
  ctx.lineWidth = 2.5;
  ctx.setLineDash([5, 4]);
  ctx.beginPath();
  ctx.arc(width / 2, stampY, stampR, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#D6E85D';
  ctx.font = '900 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '2px';
  ctx.textAlign = 'center';
  ctx.fillText('VERIFIED', width / 2, stampY - 6);
  ctx.fillText('HONORS', width / 2, stampY + 14);
  ctx.restore();

  // Serial Text
  ctx.fillStyle = '#A2BAAF';
  ctx.font = '700 16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(serialText, width / 2, 1765);

  // 12. App Branding & Live URL Watermark
  ctx.fillStyle = '#D6E85D';
  ctx.font = '900 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('🎓 ITM Notes • Study Smarter, Score Higher', width / 2, 1820);

  ctx.fillStyle = '#94B4A7';
  ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('https://itm-notes-new.vercel.app', width / 2, 1855);

  const dataUrl = canvas.toDataURL('image/png');
  const blob = await new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b!), 'image/png'));

  return { dataUrl, blob };
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}
