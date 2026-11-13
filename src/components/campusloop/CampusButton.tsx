import React from 'react';

export type CampusButtonVariant = 'primary' | 'dark' | 'outline' | 'lime' | 'lightBlue';
export type CampusButtonSize = 'sm' | 'lg';

export interface CampusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CampusButtonVariant;
  size?: CampusButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const CampusButton = React.forwardRef<HTMLButtonElement, CampusButtonProps>(
  (
    {
      variant = 'primary',
      size = 'lg',
      icon,
      iconPosition = 'left',
      fullWidth = false,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Sizing
    const sizeClasses =
      size === 'sm'
        ? 'h-10 px-4 text-sm font-semibold'
        : 'h-12 px-6 text-base font-semibold';

    // Variant classes
    const variantClasses: Record<CampusButtonVariant, string> = {
      primary:
        'bg-primary hover:bg-primary text-white shadow-sm hover:shadow-md active:scale-[0.98]',
      dark:
        'bg-foreground hover:bg-[#222222] text-white active:scale-[0.98] dark:bg-white dark:text-foreground dark:hover:bg-stone-200',
      outline:
        'bg-white dark:bg-card text-foreground dark:text-white border border-border dark:border-stone-700 hover:bg-background dark:hover:bg-stone-800 active:scale-[0.98]',
      lime:
        'bg-accent hover:bg-accent text-foreground shadow-sm active:scale-[0.98]',
      lightBlue:
        'bg-primary/10 hover:bg-primary/10 text-primary active:scale-[0.98]',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`inline-flex items-center justify-center gap-2 rounded-full transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none ${sizeClasses} ${variantClasses[variant]} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        {...props}
      >
        {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
      </button>
    );
  }
);

CampusButton.displayName = 'CampusButton';
