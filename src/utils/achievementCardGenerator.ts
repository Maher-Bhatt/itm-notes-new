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
}

const TIER_COLORS = {
  bronze: { 
    primary: '#E07A5F', 
    secondary: '#9A3412', 
    glow: 'rgba(224, 122, 95, 0.45)', 
    label: '★ BRONZE SCHOLAR ★', 
    ring: '#C25E38',
    medalGrad: ['#C25E38', '#E07A5F', '#8C3B1E']
  },
  silver: { 
    primary: '#E2E8F0', 
    secondary: '#64748B', 
    glow: 'rgba(226, 232, 240, 0.45)', 
    label: '★ SILVER VIRTUOSO ★', 
    ring: '#94A3B8',
    medalGrad: ['#94A3B8', '#F1F5F9', '#64748B']
  },
  gold: { 
    primary: '#F59E0B', 
    secondary: '#F59E0B', 
    glow: 'rgba(245, 158, 11, 0.55)', 
    label: '★ 24K GOLD MASTER ★', 
    ring: '#EAB308',
    medalGrad: ['#F59E0B', '#FEF08A', '#D97706']
  },
  legendary: { 
    primary: '#C084FC', 
    secondary: '#7C3AED', 
    glow: 'rgba(192, 132, 252, 0.55)', 
    label: '★ LEGENDARY HONORS ★', 
    ring: '#A855F7',
    medalGrad: ['#7C3AED', '#E879F9', '#4C1D95']
  },
  mythic: { 
    primary: '#F59E0B', 
    secondary: '#F59E0B', 
    glow: 'rgba(245, 158, 11, 0.75)', 
    label: '★ MYTHIC ARCHITECT ★', 
    ring: '#F59E0B',
    medalGrad: ['#F59E0B', '#FBBF24', '#18181B']
  },
};

/**
 * Creates a 1080x1920 Canvas element and draws the luxury story card.
 */
export async function generateAchievementStoryCard(data: AchievementCardData): Promise<{ dataUrl: string; blob: Blob }> {
  const width = 1080;
  const height = 1920;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get 2D canvas context');

  const tierStyle = TIER_COLORS[data.tier] || TIER_COLORS.gold;

  // 1. Deep Forest Obsidian Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  if (data.tier === 'mythic') {
    bgGrad.addColorStop(0, '#09090B');
    bgGrad.addColorStop(0.3, '#121215');
    bgGrad.addColorStop(0.65, '#18181B');
    bgGrad.addColorStop(1, '#09090B');
  } else {
    bgGrad.addColorStop(0, '#09090B');
    bgGrad.addColorStop(0.35, '#18181B');
    bgGrad.addColorStop(0.7, '#121215');
    bgGrad.addColorStop(1, '#09090B');
  }
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Ambient Glowing Orbs
  const drawGlow = (cx: number, cy: number, r: number, color: string) => {
    const radial = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    radial.addColorStop(0, color);
    radial.addColorStop(1, 'transparent');
    ctx.fillStyle = radial;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  };

  drawGlow(width * 0.5, 420, 540, tierStyle.glow);
  drawGlow(width * 0.15, 1250, 440, 'rgba(245, 158, 11, 0.15)');
  drawGlow(width * 0.85, 1450, 440, 'rgba(245, 158, 11, 0.15)');

  // 3. Elegant Outer Border Frame & Corner Flares
  ctx.save();
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.2)';
  ctx.lineWidth = 2;
  ctx.strokeRect(36, 36, width - 72, height - 72);

  // Inner Metallic Accent Border
  ctx.strokeStyle = tierStyle.primary;
  ctx.lineWidth = 3;
  ctx.strokeRect(48, 48, width - 96, height - 96);

  // Luxury Corner Brackets
  const cornerSize = 46;
  ctx.fillStyle = tierStyle.primary;
  // Top-left
  ctx.fillRect(40, 40, cornerSize, 4);
  ctx.fillRect(40, 40, 4, cornerSize);
  // Top-right
  ctx.fillRect(width - 40 - cornerSize, 40, cornerSize, 4);
  ctx.fillRect(width - 44, 40, 4, cornerSize);
  // Bottom-left
  ctx.fillRect(40, height - 44, cornerSize, 4);
  ctx.fillRect(40, height - 40 - cornerSize, 4, cornerSize);
  // Bottom-right
  ctx.fillRect(width - 40 - cornerSize, height - 44, cornerSize, 4);
  ctx.fillRect(width - 44, height - 40 - cornerSize, 4, cornerSize);
  ctx.restore();

  // 4. University Header
  ctx.textAlign = 'center';
  ctx.fillStyle = '#F59E0B';
  ctx.font = '800 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('ITM SLS BARODA UNIVERSITY', width / 2, 125);

  ctx.fillStyle = '#A1A1AA';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING', width / 2, 160);

  // 5. Divider Line with Center Diamond
  ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 220, 195);
  ctx.lineTo(width / 2 + 220, 195);
  ctx.stroke();

  // Center Diamond
  ctx.fillStyle = tierStyle.primary;
  ctx.beginPath();
  ctx.moveTo(width / 2, 190);
  ctx.lineTo(width / 2 + 6, 195);
  ctx.lineTo(width / 2, 200);
  ctx.lineTo(width / 2 - 6, 195);
  ctx.closePath();
  ctx.fill();

  // 6. User Profile Section
  const avatarY = 315;
  const avatarRadius = 76;

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
    avatarGrad.addColorStop(0, '#18181B');
    avatarGrad.addColorStop(1, '#121215');
    ctx.fillStyle = avatarGrad;
    ctx.beginPath();
    ctx.arc(width / 2, avatarY, avatarRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#F59E0B';
    ctx.font = '900 68px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((data.studentName || 'M').charAt(0).toUpperCase(), width / 2, avatarY + 2);
    ctx.textBaseline = 'alphabetic';
  }

  // Avatar Double Metallic Ring
  ctx.save();
  ctx.strokeStyle = tierStyle.primary;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(width / 2, avatarY, avatarRadius + 4, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(width / 2, avatarY, avatarRadius + 9, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Student Name & Rank
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 46px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.studentName || 'Student Scholar', width / 2, 445);

  ctx.fillStyle = '#F59E0B';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`Level ${data.level} · ${data.levelTitle}`, width / 2, 485);

  // 7. Achievement Centerpiece Shield Box
  const boxX = 90;
  const boxY = 540;
  const boxWidth = width - 180;
  const boxHeight = 670;

  // Glassmorphic Shield Box
  const cardBoxGrad = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxHeight);
  cardBoxGrad.addColorStop(0, 'rgba(18, 51, 44, 0.85)');
  cardBoxGrad.addColorStop(1, 'rgba(8, 22, 19, 0.95)');
  ctx.fillStyle = cardBoxGrad;
  roundRect(ctx, boxX, boxY, boxWidth, boxHeight, 36);
  ctx.fill();

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
  ctx.lineWidth = 2;
  roundRect(ctx, boxX, boxY, boxWidth, boxHeight, 36);
  ctx.stroke();

  // Tier Pill
  const pillWidth = 300;
  const pillHeight = 48;
  const pillX = width / 2 - pillWidth / 2;
  const pillY = boxY + 42;

  ctx.fillStyle = tierStyle.primary;
  roundRect(ctx, pillX, pillY, pillWidth, pillHeight, 24);
  ctx.fill();

  ctx.fillStyle = '#18181B';
  ctx.font = '900 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(tierStyle.label, width / 2, pillY + 31);

  // 3D Orbital Emblem Ring for the Icon
  const emblemY = boxY + 230;
  const emblemRadius = 100;

  ctx.save();
  // Ambient radial glow behind emblem
  const medalGrad = ctx.createRadialGradient(width / 2, emblemY, 10, width / 2, emblemY, emblemRadius);
  medalGrad.addColorStop(0, tierStyle.medalGrad[1]);
  medalGrad.addColorStop(0.7, tierStyle.medalGrad[0]);
  medalGrad.addColorStop(1, tierStyle.medalGrad[2] || '#000000');
  
  ctx.fillStyle = medalGrad;
  ctx.beginPath();
  ctx.arc(width / 2, emblemY, emblemRadius, 0, Math.PI * 2);
  ctx.fill();

  // Outer dashed orbit
  ctx.strokeStyle = tierStyle.primary;
  ctx.lineWidth = 3.5;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.arc(width / 2, emblemY, emblemRadius + 10, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Inner metallic rim
  ctx.save();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(width / 2, emblemY, emblemRadius - 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Achievement Icon in Center
  ctx.font = '115px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  ctx.fillText(data.achievementIcon || '🏆', width / 2, emblemY + 40);

  // Achievement Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.achievementTitle, width / 2, boxY + 400);

  // Description
  ctx.fillStyle = '#E4E4E7';
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  wrapText(ctx, data.achievementDescription, width / 2, boxY + 455, boxWidth - 100, 36);

  // XP Reward Badge inside Box
  const xpPillY = boxY + 560;
  const xpPillW = 360;
  const xpPillH = 64;
  const xpPillX = width / 2 - xpPillW / 2;

  ctx.fillStyle = 'rgba(245, 158, 11, 0.18)';
  roundRect(ctx, xpPillX, xpPillY, xpPillW, xpPillH, 32);
  ctx.fill();

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.6)';
  ctx.lineWidth = 2;
  roundRect(ctx, xpPillX, xpPillY, xpPillW, xpPillH, 32);
  ctx.stroke();

  ctx.fillStyle = '#F59E0B';
  ctx.font = '900 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`✨ +${data.xpReward} XP AWARDED`, width / 2, xpPillY + 42);

  // 8. Bottom Stats Row (3 Badges)
  const statsY = 1260;
  const statBoxW = 270;
  const statBoxH = 135;
  const gap = 30;
  const startStatX = (width - (statBoxW * 3 + gap * 2)) / 2;

  const stats = [
    { label: 'STUDY STREAK', val: `🔥 ${data.streakDays} Days` },
    { label: 'TOTAL EXP', val: `✨ ${data.totalXp} XP` },
    { label: 'DEPARTMENT', val: `B.Tech CSE '26` },
  ];

  stats.forEach((s, idx) => {
    const x = startStatX + idx * (statBoxW + gap);
    ctx.fillStyle = 'rgba(18, 51, 44, 0.75)';
    roundRect(ctx, x, statsY, statBoxW, statBoxH, 20);
    ctx.fill();

    ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, x, statsY, statBoxW, statBoxH, 20);
    ctx.stroke();

    ctx.fillStyle = '#A1A1AA';
    ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(s.label, x + statBoxW / 2, statsY + 45);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(s.val, x + statBoxW / 2, statsY + 95);
  });

  // 9. Call to action & App Watermark
  ctx.fillStyle = '#F59E0B';
  ctx.font = '700 23px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('🎓 ITM Notes • Your Academic Companion', width / 2, 1590);

  ctx.fillStyle = '#A1A1AA';
  ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('https://itm-notes-new.vercel.app', width / 2, 1630);

  // 10. Stamp of Verification
  ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
  ctx.beginPath();
  ctx.arc(width / 2, 1750, 56, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(width / 2, 1750, 56, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#F59E0B';
  ctx.font = '900 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('VERIFIED', width / 2, 1745);
  ctx.fillText('HONORS', width / 2, 1763);

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
