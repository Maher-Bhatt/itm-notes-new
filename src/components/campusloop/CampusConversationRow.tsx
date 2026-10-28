import React from 'react';
import { CampusAvatar } from './CampusAvatar';
import { CampusCountBadge } from './CampusCountBadge';

export interface CampusConversationRowProps {
  id: string;
  name: string;
  avatarUrl?: string | null;
  lastMessage: string;
  timestamp: string; // e.g. "2m", "12m", "1h", "Yesterday"
  unreadCount?: number;
  isOnline?: boolean;
  isClubOrGroup?: boolean;
  onClick?: () => void;
  className?: string;
}

export const CampusConversationRow: React.FC<CampusConversationRowProps> = ({
  id,
  name,
  avatarUrl,
  lastMessage,
  timestamp,
  unreadCount = 0,
  isOnline = false,
  isClubOrGroup = false,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl hover:bg-neutral-100/70 dark:hover:bg-neutral-800/50 transition-colors select-none cursor-pointer ${className}`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <CampusAvatar
          src={avatarUrl}
          name={name}
          size={40}
          status={isOnline ? 'online' : undefined}
        />

        <div className="min-w-0">
          <h4 className="font-bold text-sm sm:text-base text-[#111111] dark:text-white truncate">
            {name}
          </h4>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-neutral-400 font-medium truncate mt-0.5">
            {lastMessage}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5 shrink-0 pl-2">
        <span className="text-[11px] sm:text-xs font-semibold text-[#6B7280] dark:text-neutral-400">
          {timestamp}
        </span>
        {unreadCount > 0 && <CampusCountBadge count={unreadCount} variant="blue" />}
      </div>
    </div>
  );
};
