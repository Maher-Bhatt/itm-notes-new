/**
 * achievementCardGenerator.ts
 * Generates high-resolution (1080x1920) Instagram Story & WhatsApp Status cards
 * directly in the browser using HTML5 Canvas with zero external dependencies.
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
  bronze: { primary: '#CD7F32', glow: 'rgba(205, 127, 50, 0.4)', label: 'BRONZE TIER' },
  silver: { primary: '#E2E8F0', glow: 'rgba(226, 232, 240, 0.4)', label: 'SILVER TIER' },
  gold: { primary: '#F59E0B', glow: 'rgba(245, 158, 11, 0.5)', label: 'GOLD TIER' },
  legendary: { primary: '#A855F7', glow: 'rgba(168, 85, 247, 0.5)', label: 'LEGENDARY TIER' },
  mythic: { primary: '#FF0055', glow: 'rgba(255, 0, 85, 0.8)', label: 'MYTHIC ADMIN TIER' },
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

  // 1. Deep Midnight Gradient Background (or Crazy Mythic)
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  if (data.tier === 'mythic') {
    bgGrad.addColorStop(0, '#1A0000');
    bgGrad.addColorStop(0.2, '#33001a');
    bgGrad.addColorStop(0.5, '#660000');
    bgGrad.addColorStop(0.8, '#ff0055');
    bgGrad.addColorStop(1, '#000000');
  } else {
    bgGrad.addColorStop(0, '#090D16');
    bgGrad.addColorStop(0.35, '#0F172A');
    bgGrad.addColorStop(0.7, '#1E1B4B');
    bgGrad.addColorStop(1, '#0B0A1A');
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

  drawGlow(width * 0.5, 450, 480, tierStyle.glow);
  drawGlow(width * 0.2, 1300, 380, 'rgba(59, 130, 246, 0.15)');
  drawGlow(width * 0.8, 1500, 380, 'rgba(168, 85, 247, 0.15)');

  // 3. Elegant Outer Border Frame
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Inner Golden Accent Border
  ctx.strokeStyle = tierStyle.primary;
  ctx.lineWidth = 3;
  ctx.strokeRect(52, 52, width - 104, height - 104);

  // Corner Accents
  const cornerSize = 40;
  ctx.fillStyle = tierStyle.primary;
  // Top-left
  ctx.fillRect(44, 44, cornerSize, 4);
  ctx.fillRect(44, 44, 4, cornerSize);
  // Top-right
  ctx.fillRect(width - 44 - cornerSize, 44, cornerSize, 4);
  ctx.fillRect(width - 48, 44, 4, cornerSize);
  // Bottom-left
  ctx.fillRect(44, height - 48, cornerSize, 4);
  ctx.fillRect(44, height - 44 - cornerSize, 4, cornerSize);
  // Bottom-right
  ctx.fillRect(width - 44 - cornerSize, height - 48, cornerSize, 4);
  ctx.fillRect(width - 48, height - 44 - cornerSize, 4, cornerSize);
  ctx.restore();

  // 4. University Header
  ctx.textAlign = 'center';
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '8px';
  ctx.fillText('ITM SLS BARODA UNIVERSITY', width / 2, 130);

  ctx.fillStyle = '#64748B';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING', width / 2, 165);

  ctx.letterSpacing = '0px';

  // 5. Divider Line with Diamond
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 200, 200);
  ctx.lineTo(width / 2 + 200, 200);
  ctx.stroke();

  // 6. User Profile Card
  const avatarY = 320;
  const avatarRadius = 75;

  // Try to load user avatar image or draw initial fallback
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
    // Initial monogram circle
    const avatarGrad = ctx.createLinearGradient(width / 2 - avatarRadius, avatarY - avatarRadius, width / 2 + avatarRadius, avatarY + avatarRadius);
    avatarGrad.addColorStop(0, '#3B82F6');
    avatarGrad.addColorStop(1, '#1D4ED8');
    ctx.fillStyle = avatarGrad;
    ctx.beginPath();
    ctx.arc(width / 2, avatarY, avatarRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 68px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText((data.studentName || 'M').charAt(0).toUpperCase(), width / 2, avatarY + 2);
    ctx.textBaseline = 'alphabetic';
  }

  // Avatar Border Ring
  ctx.save();
  ctx.strokeStyle = tierStyle.primary;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(width / 2, avatarY, avatarRadius + 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Student Name & Rank
  ctx.textAlign = 'center';
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 46px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.studentName || 'Student Scholar', width / 2, 455);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`Level ${data.level} · ${data.levelTitle}`, width / 2, 495);

  // 7. Achievement Centerpiece Shield Box
  const boxX = 100;
  const boxY = 560;
  const boxWidth = width - 200;
  const boxHeight = 650;

  // Box Background
  const cardBoxGrad = ctx.createLinearGradient(boxX, boxY, boxX, boxY + boxHeight);
  cardBoxGrad.addColorStop(0, 'rgba(30, 41, 59, 0.7)');
  cardBoxGrad.addColorStop(1, 'rgba(15, 23, 42, 0.85)');
  ctx.fillStyle = cardBoxGrad;
  roundRect(ctx, boxX, boxY, boxWidth, boxHeight, 36);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  roundRect(ctx, boxX, boxY, boxWidth, boxHeight, 36);
  ctx.stroke();

  // Tier Pill
  const pillWidth = 240;
  const pillHeight = 44;
  const pillX = width / 2 - pillWidth / 2;
  const pillY = boxY + 45;

  ctx.fillStyle = tierStyle.primary;
  roundRect(ctx, pillX, pillY, pillWidth, pillHeight, 22);
  ctx.fill();

  ctx.fillStyle = '#0F172A';
  ctx.font = '900 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(tierStyle.label, width / 2, pillY + 28);

  // Big Achievement Icon Emoji
  ctx.font = '130px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
  ctx.fillText(data.achievementIcon || '🏆', width / 2, boxY + 240);

  // Achievement Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(data.achievementTitle, width / 2, boxY + 330);

  // Description (Wrapped text)
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  wrapText(ctx, data.achievementDescription, width / 2, boxY + 390, boxWidth - 100, 36);

  // XP Reward Badge inside Box
  const xpPillY = boxY + 520;
  const xpPillW = 320;
  const xpPillH = 64;
  const xpPillX = width / 2 - xpPillW / 2;

  ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
  roundRect(ctx, xpPillX, xpPillY, xpPillW, xpPillH, 32);
  ctx.fill();

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
  ctx.lineWidth = 2;
  roundRect(ctx, xpPillX, xpPillY, xpPillW, xpPillH, 32);
  ctx.stroke();

  ctx.fillStyle = '#FBBF24';
  ctx.font = '900 28px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText(`+${data.xpReward} XP UNLOCKED`, width / 2, xpPillY + 42);

  // 8. Bottom Stats Row (3 Badges)
  const statsY = 1270;
  const statBoxW = 260;
  const statBoxH = 140;
  const gap = 30;
  const startStatX = (width - (statBoxW * 3 + gap * 2)) / 2;

  const stats = [
    { label: 'STUDY STREAK', val: `🔥 ${data.streakDays} Days` },
    { label: 'TOTAL EXP', val: `✨ ${data.totalXp} XP` },
    { label: 'STUDENT RANK', val: `#1 Top 5%` },
  ];

  stats.forEach((s, idx) => {
    const x = startStatX + idx * (statBoxW + gap);
    ctx.fillStyle = 'rgba(30, 41, 59, 0.5)';
    roundRect(ctx, x, statsY, statBoxW, statBoxH, 20);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    roundRect(ctx, x, statsY, statBoxW, statBoxH, 20);
    ctx.stroke();

    ctx.fillStyle = '#94A3B8';
    ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(s.label, x + statBoxW / 2, statsY + 45);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 26px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(s.val, x + statBoxW / 2, statsY + 95);
  });

  // 9. Call to action & App Watermark
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('🎓 Study with Velocity Web • itm-notes.vercel.app', width / 2, 1600);

  ctx.fillStyle = '#64748B';
  ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Semester 3 Computer Engineering Notes & Practical Lab', width / 2, 1640);

  // 10. Stamp of Verification
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.beginPath();
  ctx.arc(width / 2, 1750, 55, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(width / 2, 1750, 55, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = '#F59E0B';
  ctx.font = '900 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.letterSpacing = '2px';
  ctx.fillText('VERIFIED', width / 2, 1745);
  ctx.fillText('ACADEMIC', width / 2, 1762);
  ctx.letterSpacing = '0px';

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
