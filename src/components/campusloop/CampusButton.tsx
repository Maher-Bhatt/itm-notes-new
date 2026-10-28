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
        'bg-[#2B4EFF] hover:bg-[#1E3EDB] text-white shadow-sm hover:shadow-md active:scale-[0.98]',
      dark:
        'bg-[#111111] hover:bg-[#222222] text-white active:scale-[0.98] dark:bg-white dark:text-[#111111] dark:hover:bg-neutral-200',
      outline:
        'bg-white dark:bg-[#1C1C1E] text-[#111111] dark:text-white border border-[#E8E4DA] dark:border-neutral-700 hover:bg-[#F6F3EC] dark:hover:bg-neutral-800 active:scale-[0.98]',
      lime:
        'bg-[#D7F75B] hover:bg-[#C6E84A] text-[#111111] shadow-sm active:scale-[0.98]',
      lightBlue:
        'bg-[#E6EAFD] hover:bg-[#D8E0FC] text-[#2B4EFF] active:scale-[0.98]',
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
