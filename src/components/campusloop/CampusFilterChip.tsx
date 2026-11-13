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
            ? 'bg-foreground text-white shadow-sm dark:bg-white dark:text-foreground'
            : 'bg-white dark:bg-card text-foreground dark:text-stone-200 border border-border dark:border-stone-800 hover:border-stone-400 active:scale-[0.98]'
        } ${className}`}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
        {count !== undefined && (
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              active
                ? 'bg-stone-800 text-stone-300 dark:bg-stone-200 dark:text-stone-800'
                : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300'
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
