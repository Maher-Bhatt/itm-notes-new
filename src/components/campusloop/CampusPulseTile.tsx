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
      container: 'bg-foreground text-white border border-stone-800',
      tag: 'bg-accent text-foreground',
      title: 'text-white',
      sub: 'text-stone-300',
      iconBg: 'bg-stone-800 text-primary',
    },
    lime: {
      container: 'bg-accent text-foreground border border-primary',
      tag: 'bg-foreground text-white',
      title: 'text-foreground',
      sub: 'text-stone-800',
      iconBg: 'bg-accent text-foreground',
    },
    blue: {
      container: 'bg-primary text-white border border-primary',
      tag: 'bg-white text-primary',
      title: 'text-white',
      sub: 'text-primary',
      iconBg: 'bg-primary text-white',
    },
    white: {
      container: 'bg-white dark:bg-card text-foreground dark:text-white border border-border dark:border-stone-800',
      tag: 'bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary',
      title: 'text-foreground dark:text-white',
      sub: 'text-muted-foreground dark:text-stone-400',
      iconBg: 'bg-stone-100 dark:bg-stone-800 text-primary',
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
      className={`min-w-[270px] max-w-[320px] sm:min-w-[300px] rounded-2xl p-4 flex flex-col justify-between shrink-0 transition-all select-none ${
        onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''
      } ${currentTone.container} ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {tag && (
            <span
              className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${currentTone.tag}`}
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
