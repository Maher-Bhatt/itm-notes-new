import React from 'react';
import { Plus, Check, Users, Cpu, Mic, Camera, Code2, Palette, Dumbbell, BookOpen } from 'lucide-react';

export interface CampusClubCardProps {
  id: string;
  name: string;
  category?: string;
  memberCount: number;
  iconName?: string;
  isMember?: boolean;
  onToggleJoin?: (clubId: string) => void;
  onClick?: () => void;
  className?: string;
}

export const CampusClubCard: React.FC<CampusClubCardProps> = ({
  id,
  name,
  category,
  memberCount,
  iconName,
  isMember = false,
  onToggleJoin,
  onClick,
  className = '',
}) => {
  const getIcon = () => {
    const lower = (iconName || name || '').toLowerCase();
    if (lower.includes('robot') || lower.includes('iot')) return <Cpu className="w-5 h-5 text-emerald-600" />;
    if (lower.includes('debate') || lower.includes('speak')) return <Mic className="w-5 h-5 text-purple-600" />;
    if (lower.includes('photo') || lower.includes('film')) return <Camera className="w-5 h-5 text-pink-600" />;
    if (lower.includes('code') || lower.includes('hack') || lower.includes('dev')) return <Code2 className="w-5 h-5 text-blue-600" />;
    if (lower.includes('design') || lower.includes('art')) return <Palette className="w-5 h-5 text-amber-600" />;
    if (lower.includes('sport') || lower.includes('gym')) return <Dumbbell className="w-5 h-5 text-red-600" />;
    return <BookOpen className="w-5 h-5 text-indigo-600" />;
  };

  return (
    <div
      onClick={onClick}
      className={`min-w-[190px] max-w-[220px] rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-4.5 flex flex-col justify-between shrink-0 transition-all select-none ${
        onClick ? 'cursor-pointer hover:border-[#2B4EFF]/40 hover:shadow-xs' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="w-11 h-11 rounded-2xl bg-[#F6F3EC] dark:bg-neutral-800 flex items-center justify-center shrink-0">
          {getIcon()}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleJoin?.(id);
          }}
          title={isMember ? 'Joined' : 'Join Club'}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
            isMember
              ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111]'
              : 'bg-[#E6EAFD] text-[#2B4EFF] hover:bg-[#D8E0FC] dark:bg-neutral-800 dark:text-neutral-200'
          }`}
        >
          {isMember ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[3]" />}
        </button>
      </div>

      <div>
        <h3 className="font-bold text-base text-[#111111] dark:text-white leading-tight line-clamp-1 mb-1">
          {name}
        </h3>
        <p className="text-xs text-[#6B7280] dark:text-neutral-400 font-medium">
          {memberCount} {memberCount === 1 ? 'member' : 'members'}
        </p>
      </div>
    </div>
  );
};
