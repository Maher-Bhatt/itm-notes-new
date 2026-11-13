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
    blue: 'bg-primary/10 text-primary dark:bg-primary/15 dark:text-primary',
    lime: 'bg-accent text-[#283800] dark:bg-accent/20 dark:text-primary',
    pink: 'bg-accent text-[#991B1B] dark:bg-destructive/10 dark:text-destructive',
    slate: 'bg-[#F3F4F6] text-[#374151] dark:bg-stone-800 dark:text-stone-300',
    live: 'bg-accent text-foreground font-bold tracking-wider uppercase shadow-xs',
    dark: 'bg-foreground text-white dark:bg-white dark:text-foreground',
  };

  return (
    <span
      className={`h-6 px-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 select-none shrink-0 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {variant === 'live' && !icon && (
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
