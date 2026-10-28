import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';

export type CampusAvatarSize = 24 | 32 | 40 | 56 | 88;

export interface CampusAvatarProps {
  src?: string | null;
  name?: string;
  size?: CampusAvatarSize;
  limeRing?: boolean;
  status?: 'online' | 'add' | 'verified';
  className?: string;
  onClick?: () => void;
}

const PASTEL_PALETTE = [
  { bg: 'bg-[#E6EAFD]', text: 'text-[#2B4EFF]' }, // Blue
  { bg: 'bg-[#FDE8E0]', text: 'text-[#B91C1C]' }, // Pink
  { bg: 'bg-[#EAF6B0]', text: 'text-[#3E5200]' }, // Lime
  { bg: 'bg-[#FEF9C3]', text: 'text-[#713F12]' }, // Yellow
  { bg: 'bg-[#EDE9FE]', text: 'text-[#5B21B6]' }, // Purple
  { bg: 'bg-[#E2E8F0]', text: 'text-[#1E293B]' }, // Slate
];

function getInitials(name?: string): string {
  if (!name) return 'U';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getPastelForName(name?: string) {
  if (!name) return PASTEL_PALETTE[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % PASTEL_PALETTE.length;
  return PASTEL_PALETTE[index];
}

export const CampusAvatar: React.FC<CampusAvatarProps> = ({
  src,
  name = 'User',
  size = 40,
  limeRing = false,
  status,
  className = '',
  onClick,
}) => {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(name);
  const pastel = getPastelForName(name);

  // Sizing definitions
  const sizeMap: Record<CampusAvatarSize, { box: string; text: string; badge: string }> = {
    24: { box: 'w-6 h-6', text: 'text-[10px] font-bold', badge: 'w-2 h-2' },
    32: { box: 'w-8 h-8', text: 'text-xs font-bold', badge: 'w-2.5 h-2.5' },
    40: { box: 'w-10 h-10', text: 'text-sm font-bold', badge: 'w-3.5 h-3.5' },
    56: { box: 'w-14 h-14', text: 'text-lg font-bold', badge: 'w-4 h-4' },
    88: { box: 'w-[88px] h-[88px]', text: 'text-2xl font-black', badge: 'w-5 h-5' },
  };

  const { box, text: textStyle, badge: badgeSize } = sizeMap[size] || sizeMap[40];

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${
        onClick ? 'cursor-pointer hover:opacity-90 active:scale-95 transition-transform' : ''
      } ${className}`}
    >
      <div
        className={`${box} rounded-full overflow-hidden flex items-center justify-center ${
          limeRing ? 'border-[3px] md:border-4 border-[#D7F75B] p-[2px] bg-white dark:bg-[#111111]' : ''
        } ${src && !imageError ? 'bg-neutral-100' : `${pastel.bg} ${pastel.text}`}`}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover rounded-full"
            loading="lazy"
          />
        ) : (
          <span className={`${textStyle} tracking-tight`}>{initials}</span>
        )}
      </div>

      {/* Status Badges */}
      {status === 'online' && (
        <span
          className={`absolute bottom-0 right-0 ${badgeSize} rounded-full bg-emerald-500 border-2 border-white dark:border-[#1C1C1E]`}
        />
      )}

      {status === 'add' && (
        <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#2B4EFF] text-white flex items-center justify-center border-2 border-white dark:border-[#1C1C1E] shadow-xs">
          <Plus className="w-3 h-3 stroke-[3]" />
        </span>
      )}

      {status === 'verified' && (
        <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#2B4EFF] text-white flex items-center justify-center border-2 border-white dark:border-[#1C1C1E] shadow-xs">
          <Check className="w-3 h-3 stroke-[3]" />
        </span>
      )}
    </div>
  );
};
