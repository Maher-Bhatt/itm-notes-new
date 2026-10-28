import React from 'react';
import { Zap, Calendar, Clock, Sparkles } from 'lucide-react';

export type CampusPulseTone = 'black' | 'lime' | 'blue' | 'white';

export interface CampusPulseTileProps {
  id?: string;
  tone?: CampusPulseTone;
  tag?: string;
  title: string;
  subtitle?: string;
  icon?: 'zap' | 'calendar' | 'clock' | 'sparkles';
  onClick?: () => void;
  className?: string;
}

export const CampusPulseTile: React.FC<CampusPulseTileProps> = ({
  tone = 'black',
  tag,
  title,
  subtitle,
  icon = 'zap',
  onClick,
  className = '',
}) => {
  const toneClasses: Record<CampusPulseTone, { container: string; tag: string; title: string; sub: string; iconBg: string }> = {
    black: {
      container: 'bg-[#111111] text-white border border-neutral-800',
      tag: 'bg-[#D7F75B] text-[#111111]',
      title: 'text-white',
      sub: 'text-neutral-300',
      iconBg: 'bg-neutral-800 text-[#D7F75B]',
    },
    lime: {
      container: 'bg-[#D7F75B] text-[#111111] border border-[#C6E84A]',
      tag: 'bg-[#111111] text-white',
      title: 'text-[#111111]',
      sub: 'text-neutral-800',
      iconBg: 'bg-[#C6E84A] text-[#111111]',
    },
    blue: {
      container: 'bg-[#2B4EFF] text-white border border-[#1E3EDB]',
      tag: 'bg-white text-[#2B4EFF]',
      title: 'text-white',
      sub: 'text-blue-100',
      iconBg: 'bg-[#1E3EDB] text-white',
    },
    white: {
      container: 'bg-white dark:bg-[#1C1C1E] text-[#111111] dark:text-white border border-[#E8E4DA] dark:border-neutral-800',
      tag: 'bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300',
      title: 'text-[#111111] dark:text-white',
      sub: 'text-[#6B7280] dark:text-neutral-400',
      iconBg: 'bg-neutral-100 dark:bg-neutral-800 text-[#2B4EFF]',
    },
  };

  const currentTone = toneClasses[tone];

  const renderIcon = () => {
    switch (icon) {
      case 'calendar':
        return <Calendar className="w-3.5 h-3.5" />;
      case 'clock':
        return <Clock className="w-3.5 h-3.5" />;
      case 'sparkles':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'zap':
      default:
        return <Zap className="w-3.5 h-3.5 fill-current" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`min-w-[270px] max-w-[320px] sm:min-w-[300px] rounded-[20px] p-4 flex flex-col justify-between shrink-0 transition-all select-none ${
        onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''
      } ${currentTone.container} ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {tag && (
            <span
              className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${currentTone.tag}`}
            >
              {renderIcon()}
              {tag}
            </span>
          )}
        </div>

        <h3 className={`font-bold text-base leading-snug line-clamp-2 ${currentTone.title}`}>
          {title}
        </h3>
      </div>

      {subtitle && (
        <p className={`text-xs mt-2 line-clamp-2 font-medium ${currentTone.sub}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
