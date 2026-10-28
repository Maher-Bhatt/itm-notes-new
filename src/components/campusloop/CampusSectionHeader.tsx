import React from 'react';
import { Link } from 'react-router-dom';

export interface CampusSectionHeaderProps {
  title: string;
  seeAllLink?: string;
  onSeeAllClick?: () => void;
  seeAllText?: string;
  className?: string;
  action?: React.ReactNode;
}

export const CampusSectionHeader: React.FC<CampusSectionHeaderProps> = ({
  title,
  seeAllLink,
  onSeeAllClick,
  seeAllText = 'See all',
  className = '',
  action,
}) => {
  return (
    <div className={`flex items-center justify-between gap-2 mb-3.5 ${className}`}>
      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#111111] dark:text-white">
        {title}
      </h2>

      {action ? (
        action
      ) : seeAllLink ? (
        <Link
          to={seeAllLink}
          className="text-sm font-semibold text-[#2B4EFF] hover:underline transition-all shrink-0 cursor-pointer"
        >
          {seeAllText}
        </Link>
      ) : onSeeAllClick ? (
        <button
          type="button"
          onClick={onSeeAllClick}
          className="text-sm font-semibold text-[#2B4EFF] hover:underline transition-all shrink-0 cursor-pointer bg-transparent border-0 p-0"
        >
          {seeAllText}
        </button>
      ) : null}
    </div>
  );
};
