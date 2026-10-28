import React from 'react';
import { CampusAvatar } from './CampusAvatar';
import { Check, Plus } from 'lucide-react';

export interface CampusPersonTileProps {
  id: string;
  name: string;
  department?: string;
  year?: string | number;
  avatarUrl?: string | null;
  isFollowing?: boolean;
  onToggleFollow?: (userId: string) => void;
  onClick?: () => void;
  className?: string;
}

export const CampusPersonTile: React.FC<CampusPersonTileProps> = ({
  id,
  name,
  department = 'CSE',
  year = 'Y2',
  avatarUrl,
  isFollowing = false,
  onToggleFollow,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center p-3 rounded-2xl min-w-[100px] max-w-[120px] shrink-0 transition-all select-none ${
        onClick ? 'cursor-pointer hover:bg-neutral-100/60 dark:hover:bg-neutral-800/40' : ''
      } ${className}`}
    >
      <div className="relative mb-2">
        <CampusAvatar
          src={avatarUrl}
          name={name}
          size={56}
          status={isFollowing ? 'verified' : 'add'}
          onClick={(e) => {
            e?.stopPropagation();
            onToggleFollow?.(id);
          }}
        />
      </div>

      <h4 className="font-bold text-sm text-[#111111] dark:text-white text-center leading-tight truncate w-full">
        {name.split(' ')[0]}
      </h4>
      <p className="text-xs text-[#6B7280] dark:text-neutral-400 font-medium text-center truncate w-full mt-0.5">
        {department} · {year}
      </p>
    </div>
  );
};
