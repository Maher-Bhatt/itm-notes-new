import React, { useState } from 'react';
import { useUniversity } from '@/contexts/UniversityContext';
import {
  GraduationCap,
  ChevronDown,
  Check,
  MapPin,
  Award,
  Sparkles,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface UniversityDropdownProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export const UniversityDropdown: React.FC<UniversityDropdownProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const { currentUniversity, allUniversities, setUniversity } = useUniversity();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-2xs select-none cursor-pointer outline-none bg-card dark:bg-stone-800 hover:bg-background dark:hover:bg-stone-700 border-border dark:border-stone-700 text-foreground dark:text-white ${className}`}
          title="Switch Active University (Gujarat Engineering Campuses)"
        >
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: currentUniversity.accentColor || 'hsl(var(--primary))' }}
          />
          <GraduationCap className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="truncate max-w-[120px] sm:max-w-[150px] md:max-w-[180px]">
            {variant === 'compact' ? currentUniversity.shortName : currentUniversity.name}
          </span>
          <ChevronDown className="h-3 w-3 text-stone-400 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-80 p-2 rounded-2xl bg-card dark:bg-background border border-border dark:border-stone-800 shadow-lg z-[9999]"
      >
        <div className="px-3 py-2">
          <DropdownMenuLabel className="p-0 text-xs font-bold uppercase tracking-wider text-muted-foreground dark:text-stone-400 flex items-center justify-between">
            <span>Select Gujarat Campus</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary dark:text-primary font-bold">
              6 Verified
            </span>
          </DropdownMenuLabel>
          <p className="text-[11px] text-muted-foreground dark:text-stone-400 mt-1 leading-snug">
            Curriculum, course codes, timetable slots, and campus feed will personalize automatically.
          </p>
        </div>

        <DropdownMenuSeparator className="bg-muted dark:bg-stone-800 my-1" />

        <div className="space-y-1 max-h-80 overflow-y-auto scrollbar-thin p-1">
          {allUniversities.map((univ) => {
            const isSelected = univ.id === currentUniversity.id;
            return (
              <DropdownMenuItem
                key={univ.id}
                onClick={() => {
                  setUniversity(univ.id);
                  setIsOpen(false);
                }}
                className={`flex items-start justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-primary/10 dark:bg-primary/15 text-primary dark:text-primary font-bold'
                    : 'hover:bg-background dark:hover:bg-stone-800 text-foreground dark:text-stone-200'
                }`}
              >
                <div className="space-y-0.5 min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: univ.accentColor }}
                    />
                    <span className="font-bold text-xs truncate">{univ.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground dark:text-stone-400">
                    <span className="flex items-center gap-0.5 truncate">
                      <MapPin className="h-2.5 w-2.5 shrink-0" />
                      {univ.location}
                    </span>
                    <span>•</span>
                    <span className="truncate">{univ.badge}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                )}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UniversityDropdown;
