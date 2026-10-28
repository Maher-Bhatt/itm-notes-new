import React from 'react';

export interface CampusFilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  count?: number | string;
  icon?: React.ReactNode;
}

export const CampusFilterChip = React.forwardRef<HTMLButtonElement, CampusFilterChipProps>(
  ({ active = false, count, icon, children, className = '', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={`h-10 px-5 rounded-full text-sm font-semibold inline-flex items-center gap-2 transition-all duration-150 select-none cursor-pointer shrink-0 ${
          active
            ? 'bg-[#111111] text-white shadow-sm dark:bg-white dark:text-[#111111]'
            : 'bg-white dark:bg-[#1C1C1E] text-[#111111] dark:text-neutral-200 border border-[#E8E4DA] dark:border-neutral-800 hover:border-neutral-400 active:scale-[0.98]'
        } ${className}`}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {count !== undefined && (
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              active
                ? 'bg-neutral-800 text-neutral-300 dark:bg-neutral-200 dark:text-neutral-800'
                : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            {count}
          </span>
        )}
      </button>
    );
  }
);

CampusFilterChip.displayName = 'CampusFilterChip';
