import React from 'react';

export interface CampusLoopLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
}

export const CampusLoopLogo: React.FC<CampusLoopLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7 rounded-lg text-sm',
    md: 'w-8 h-8 rounded-xl text-base',
    lg: 'w-10 h-10 rounded-2xl text-lg',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg md:text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Blue Rounded Square with Loop Mark */}
      <div
        className={`${iconSizes[size]} bg-[#2B4EFF] flex items-center justify-center text-white font-black shadow-xs shrink-0`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <div className={`font-black tracking-tight ${textSizes[size]} flex items-baseline gap-0.5`}>
          <span className="text-[#111111] dark:text-white">Campus</span>
          <span className="text-[#2B4EFF]">Loop</span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] font-semibold text-[#6B7280] dark:text-neutral-400 tracking-wider uppercase mt-0.5">
            ITM SLS Baroda
          </span>
        )}
      </div>
    </div>
  );
};
