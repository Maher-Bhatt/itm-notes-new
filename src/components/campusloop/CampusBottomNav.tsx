import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Home, Compass, Plus, MessageSquare, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export interface CampusBottomNavProps {
  unreadMessagesCount?: number;
  onCreateClick?: () => void;
}

export function openCampusCreateModal() {
  window.dispatchEvent(new CustomEvent('campus_open_create_post'));
}

export const CampusBottomNav: React.FC<CampusBottomNavProps> = ({
  unreadMessagesCount = 0,
  onCreateClick,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Hide on topic reading page or coding lab full screen
  if (location.pathname.includes('/topic/')) {
    return null;
  }

  const handleNavClick = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch {
      // Ignore
    }
  };

  const handleCenterCreate = async () => {
    await handleNavClick();
    if (onCreateClick) {
      onCreateClick();
    } else {
      openCampusCreateModal();
    }
  };

  const isHomeActive =
    location.pathname === '/' ||
    location.pathname === '/community' ||
    location.pathname === '/social' ||
    location.pathname === '/dashboard';

  const isExploreActive = location.pathname.startsWith('/explore');
  const isInboxActive = location.pathname.startsWith('/inbox') || location.pathname.startsWith('/messages');
  const isProfileActive = location.pathname.startsWith('/profile') || location.pathname === '/auth';

  return (
    <nav
      aria-label="Campus Navigation"
      className="md:hidden fixed bottom-3 left-4 right-4 z-40 bg-white/95 dark:bg-[#1C1C1E]/95 backdrop-blur-xl border border-[#E8E4DA] dark:border-neutral-800 rounded-full shadow-lg shadow-black/10 transition-all select-none px-2 py-1.5"
      style={{ bottom: 'calc(env(safe-area-inset-bottom, 8px) + 8px)' }}
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* 1. Home */}
        <Link
          to="/community"
          onClick={handleNavClick}
          className={`flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-full transition-all duration-200 min-h-[44px] ${
            isHomeActive
              ? 'bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/60 dark:text-blue-300 font-bold'
              : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white font-medium'
          }`}
        >
          <Home className="w-5 h-5 shrink-0" />
          {isHomeActive && <span className="text-xs">Home</span>}
        </Link>

        {/* 2. Explore */}
        <Link
          to="/explore"
          onClick={handleNavClick}
          className={`flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-full transition-all duration-200 min-h-[44px] ${
            isExploreActive
              ? 'bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/60 dark:text-blue-300 font-bold'
              : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white font-medium'
          }`}
        >
          <Compass className="w-5 h-5 shrink-0" />
          {isExploreActive && <span className="text-xs">Explore</span>}
        </Link>

        {/* 3. Central Raised Black Create Button with Lime + */}
        <button
          type="button"
          onClick={handleCenterCreate}
          aria-label="Create Post"
          className="relative -top-2 w-12 h-12 rounded-full bg-[#111111] dark:bg-white text-[#D7F75B] dark:text-[#111111] flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer border-2 border-[#F6F3EC] dark:border-[#1C1C1E] shrink-0"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
        </button>

        {/* 4. Inbox */}
        <Link
          to="/inbox"
          onClick={handleNavClick}
          className={`relative flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-full transition-all duration-200 min-h-[44px] ${
            isInboxActive
              ? 'bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/60 dark:text-blue-300 font-bold'
              : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white font-medium'
          }`}
        >
          <MessageSquare className="w-5 h-5 shrink-0" />
          {isInboxActive && <span className="text-xs">Inbox</span>}
          {unreadMessagesCount > 0 && !isInboxActive && (
            <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-[#2B4EFF] text-white text-[10px] font-bold flex items-center justify-center leading-none">
              {unreadMessagesCount}
            </span>
          )}
        </Link>

        {/* 5. Profile */}
        <Link
          to={user ? '/profile' : '/auth'}
          onClick={handleNavClick}
          className={`flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-full transition-all duration-200 min-h-[44px] ${
            isProfileActive
              ? 'bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/60 dark:text-blue-300 font-bold'
              : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white font-medium'
          }`}
        >
          <User className="w-5 h-5 shrink-0" />
          {isProfileActive && <span className="text-xs">Profile</span>}
        </Link>
      </div>
    </nav>
  );
};
