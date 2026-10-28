import React from 'react';

export type CampusTagVariant = 'blue' | 'lime' | 'pink' | 'slate' | 'live' | 'dark';

export interface CampusTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: CampusTagVariant;
  icon?: React.ReactNode;
}

export const CampusTag: React.FC<CampusTagProps> = ({
  variant = 'blue',
  icon,
  children,
  className = '',
  ...props
}) => {
  const variantClasses: Record<CampusTagVariant, string> = {
    blue: 'bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300',
    lime: 'bg-[#EAF6B0] text-[#283800] dark:bg-[#D7F75B]/20 dark:text-[#D7F75B]',
    pink: 'bg-[#FDE8E0] text-[#991B1B] dark:bg-rose-950/40 dark:text-rose-300',
    slate: 'bg-[#F3F4F6] text-[#374151] dark:bg-neutral-800 dark:text-neutral-300',
    live: 'bg-[#D7F75B] text-[#111111] font-black tracking-wider uppercase shadow-xs',
    dark: 'bg-[#111111] text-white dark:bg-white dark:text-[#111111]',
  };

  return (
    <span
      className={`h-6 px-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 select-none shrink-0 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {variant === 'live' && !icon && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
