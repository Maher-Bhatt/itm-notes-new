import React from 'react';
import { MapPin, Clock, Check } from 'lucide-react';

export interface CampusEventRowProps {
  id: string;
  title: string;
  dateStr: string; // e.g. "2026-10-12" or ISO or date
  monthText?: string; // e.g. "OCT"
  dayText?: string; // e.g. "12"
  locationText?: string; // e.g. "Innovation Lab"
  timeText?: string; // e.g. "6:30 PM"
  attendeeCount?: number;
  hasRsvp?: boolean;
  onToggleRsvp?: (eventId: string) => void;
  onClick?: () => void;
  className?: string;
}

export const CampusEventRow: React.FC<CampusEventRowProps> = ({
  id,
  title,
  dateStr,
  monthText,
  dayText,
  locationText = 'Campus Center',
  timeText = '5:00 PM',
  attendeeCount,
  hasRsvp = false,
  onToggleRsvp,
  onClick,
  className = '',
}) => {
  // Format date if monthText/dayText not directly passed
  const parseDate = () => {
    if (monthText && dayText) return { month: monthText, day: dayText };
    try {
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
        const day = d.getDate().toString();
        return { month, day };
      }
    } catch {}
    return { month: 'OCT', day: '28' };
  };

  const { month, day } = parseDate();

  return (
    <div
      onClick={onClick}
      className={`rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-3 sm:p-4 flex items-center justify-between gap-3 transition-all select-none ${
        onClick ? 'cursor-pointer hover:border-[#2B4EFF]/40' : ''
      } ${className}`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* Lime Date Block */}
        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#EAF6B0] text-[#111111] flex flex-col items-center justify-center shrink-0 shadow-2xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-neutral-800">
            {month}
          </span>
          <span className="text-xl sm:text-2xl font-black leading-tight text-[#111111]">
            {day}
          </span>
        </div>

        {/* Content */}
        <div className="min-w-0">
          <h3 className="font-bold text-sm sm:text-base text-[#111111] dark:text-white leading-snug truncate">
            {title}
          </h3>
          <p className="text-xs text-[#6B7280] dark:text-neutral-400 font-medium flex items-center gap-1.5 mt-0.5 truncate">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              {locationText}
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              {timeText}
            </span>
          </p>
        </div>
      </div>

      {/* RSVP Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleRsvp?.(id);
        }}
        className={`px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm shrink-0 transition-all cursor-pointer ${
          hasRsvp
            ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111]'
            : 'bg-[#E6EAFD] text-[#2B4EFF] hover:bg-[#2B4EFF] hover:text-white dark:bg-blue-950/40 dark:text-blue-300'
        }`}
      >
        {hasRsvp ? (
          <span className="inline-flex items-center gap-1">
            <Check className="w-3.5 h-3.5" />
            Going
          </span>
        ) : (
          'RSVP'
        )}
      </button>
    </div>
  );
};
