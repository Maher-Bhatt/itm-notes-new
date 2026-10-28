import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

export interface CampusSearchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onFilterClick?: () => void;
  hasFilterButton?: boolean;
  filterActive?: boolean;
}

export const CampusSearchField = React.forwardRef<HTMLInputElement, CampusSearchFieldProps>(
  (
    {
      onFilterClick,
      hasFilterButton = false,
      filterActive = false,
      value,
      onChange,
      placeholder = 'Search clubs, events, people...',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`relative flex items-center gap-2 w-full ${className}`}>
        <div className="relative flex-1 flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-neutral-400 pointer-events-none" />
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="h-12 w-full rounded-full bg-white dark:bg-[#1C1C1E] text-[#111111] dark:text-white placeholder:text-neutral-400 border border-[#E8E4DA] dark:border-neutral-800 pl-11 pr-10 text-sm font-medium transition-all focus:outline-none focus:border-[#2B4EFF] focus:ring-2 focus:ring-[#2B4EFF]/20 shadow-xs"
            {...props}
          />
          {value && (
            <button
              type="button"
              onClick={(e) => {
                if (onChange) {
                  const event = {
                    target: { value: '' },
                  } as React.ChangeEvent<HTMLInputElement>;
                  onChange(event);
                }
              }}
              className="absolute right-3.5 p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {hasFilterButton && (
          <button
            type="button"
            onClick={onFilterClick}
            title="Filters"
            className={`h-12 w-12 shrink-0 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              filterActive
                ? 'bg-[#2B4EFF] text-white shadow-sm'
                : 'bg-[#E6EAFD] text-[#2B4EFF] hover:bg-[#D8E0FC] dark:bg-neutral-800 dark:text-neutral-200'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        )}
      </div>
    );
  }
);

CampusSearchField.displayName = 'CampusSearchField';
