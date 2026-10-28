import React from 'react';

export interface CampusCountBadgeProps {
  count?: number | string;
  variant?: 'blue' | 'lime' | 'red' | 'dark';
  className?: string;
}

export const CampusCountBadge: React.FC<CampusCountBadgeProps> = ({
  count,
  variant = 'blue',
  className = '',
}) => {
  if (count === undefined || count === null || count === 0 || count === '0') {
    return null;
  }

  const variantMap = {
    blue: 'bg-[#2B4EFF] text-white',
    lime: 'bg-[#D7F75B] text-[#111111]',
    red: 'bg-[#EF4444] text-white',
    dark: 'bg-[#111111] text-white dark:bg-white dark:text-[#111111]',
  };

  return (
    <span
      className={`min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold flex items-center justify-center leading-none ${variantMap[variant]} ${className}`}
    >
      {count}
    </span>
  );
};
