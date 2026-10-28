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
          className={`flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all shadow-2xs select-none cursor-pointer outline-none bg-white dark:bg-neutral-800 hover:bg-[#F6F3EC] dark:hover:bg-neutral-700 border-[#E8E4DA] dark:border-neutral-700 text-[#111111] dark:text-white ${className}`}
          title="Switch Active University (Gujarat Engineering Campuses)"
        >
          <div
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: currentUniversity.accentColor || '#2B4EFF' }}
          />
          <GraduationCap className="h-3.5 w-3.5 text-[#2B4EFF] shrink-0" />
          <span className="truncate max-w-[120px] sm:max-w-[150px] md:max-w-[180px]">
            {variant === 'compact' ? currentUniversity.shortName : currentUniversity.name}
          </span>
          <ChevronDown className="h-3 w-3 text-neutral-400 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-80 p-2 rounded-[22px] bg-white dark:bg-[#18181B] border border-[#E8E4DA] dark:border-neutral-800 shadow-2xl z-[9999]"
      >
        <div className="px-3 py-2">
          <DropdownMenuLabel className="p-0 text-xs font-black uppercase tracking-wider text-[#6B7280] dark:text-neutral-400 flex items-center justify-between">
            <span>Select Gujarat Campus</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
              6 Verified
            </span>
          </DropdownMenuLabel>
          <p className="text-[11px] text-[#6B7280] dark:text-neutral-400 mt-1 leading-snug">
            Curriculum, course codes, timetable slots, and campus feed will personalize automatically.
          </p>
        </div>

        <DropdownMenuSeparator className="bg-[#EFECE6] dark:bg-neutral-800 my-1" />

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
                    ? 'bg-[#E6EAFD] dark:bg-blue-950/40 text-[#2B4EFF] dark:text-blue-300 font-bold'
                    : 'hover:bg-[#F6F3EC] dark:hover:bg-neutral-800 text-[#111111] dark:text-neutral-200'
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
                  <div className="flex items-center gap-2 text-[10px] text-[#6B7280] dark:text-neutral-400">
                    <span className="flex items-center gap-0.5 truncate">
                      <MapPin className="h-2.5 w-2.5 shrink-0" />
                      {univ.location}
                    </span>
                    <span>•</span>
                    <span className="truncate">{univ.badge}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#2B4EFF] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
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
