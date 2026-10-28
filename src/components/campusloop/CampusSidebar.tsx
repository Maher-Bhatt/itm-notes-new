import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Compass,
  PlusCircle,
  MessageSquare,
  User,
  BookOpen,
  Code2,
  HelpCircle,
  Calculator,
  Calendar,
  FileText,
  Zap,
  Bookmark,
  Shield,
  Sparkles,
  ChevronDown,
  ChevronRight,
  LogOut,
  X,
} from 'lucide-react';
import { CampusLoopLogo } from './CampusLoopLogo';
import { CampusAvatar } from './CampusAvatar';
import { CampusCountBadge } from './CampusCountBadge';
import { useAuth } from '@/contexts/AuthContext';
import { openCampusCreateModal } from './CampusBottomNav';
import { UniversityDropdown } from './UniversityDropdown';

export interface CampusSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  unreadMessagesCount?: number;
}

export const CampusSidebar: React.FC<CampusSidebarProps> = ({
  isOpen = false,
  onClose,
  unreadMessagesCount = 0,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, role, signOut } = useAuth();
  const [academicToolsOpen, setAcademicToolsOpen] = useState(true);

  const currentPath = location.pathname;

  const isHomeActive =
    currentPath === '/' ||
    currentPath === '/community' ||
    currentPath === '/social' ||
    currentPath === '/dashboard';
  const isExploreActive = currentPath.startsWith('/explore');
  const isInboxActive = currentPath.startsWith('/inbox') || currentPath.startsWith('/messages');
  const isProfileActive = currentPath.startsWith('/profile') || currentPath === '/auth';

  // 5 Core Campus Destinations (Matches mobile nav exactly)
  const coreDestinations = [
    {
      name: 'Home Feed',
      path: '/community',
      icon: Home,
      isActive: isHomeActive,
    },
    {
      name: 'Explore Campus',
      path: '/explore',
      icon: Compass,
      isActive: isExploreActive,
    },
    {
      name: 'Create Post',
      path: '#create',
      icon: PlusCircle,
      isActive: false,
      isAction: true,
      onClick: () => {
        openCampusCreateModal();
        onClose?.();
      },
    },
    {
      name: 'Messages',
      path: '/inbox',
      icon: MessageSquare,
      isActive: isInboxActive,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
    },
    {
      name: 'My Profile',
      path: '/profile',
      icon: User,
      isActive: isProfileActive,
    },
  ];

  const isVerifiedAdmin = role === 'admin' || user?.email?.toLowerCase() === 'maherbhatt01@gmail.com';

  // Academic Suite Tools (Preserves all ITM Notes functionality)
  const academicTools = [
    { name: 'Subjects & Notes', path: '/subjects', icon: BookOpen },
    { name: 'Coding Lab (IDE)', path: '/coding-lab', icon: Code2 },
    { name: 'Exam Question Banks', path: '/imp-questions', icon: HelpCircle },
    { name: 'Today’s Study Hub', path: '/today', icon: Calendar },
    { name: 'Solved PYQ Papers', path: '/pyq-papers', icon: FileText },
    { name: 'Timed Mock Exams', path: '/mock-exam', icon: Sparkles },
    { name: 'Study Planner', path: '/study-planner', icon: Calendar },
    { name: 'Rapid Revision', path: '/rapid-revision', icon: Zap },
    { name: 'Formula & Cheat Bank', path: '/formulas', icon: BookOpen },
    { name: 'Attendance & SGPA', path: '/calculator', icon: Calculator },
    { name: 'Study Materials', path: '/materials', icon: FileText },
    { name: 'Saved Bookmarks', path: '/bookmarks', icon: Bookmark },
    ...(isVerifiedAdmin ? [{ name: 'Admin Portal', path: '/admin', icon: Shield }] : []),
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white dark:bg-[#18181B] text-[#111111] dark:text-neutral-100 border-r border-[#E8E4DA] dark:border-neutral-800 select-none">
      {/* Top Brand Lockup */}
      <div className="p-5 flex items-center justify-between border-b border-[#EFECE6] dark:border-neutral-800/80 shrink-0">
        <Link to="/community" onClick={onClose} className="hover:opacity-95 transition-opacity">
          <CampusLoopLogo size="md" showSubtitle />
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Gujarat Campus Selector Bar */}
      <div className="px-4 py-2.5 border-b border-[#EFECE6] dark:border-neutral-800/60 bg-[#F6F3EC]/50 dark:bg-neutral-900/40 shrink-0">
        <UniversityDropdown variant="full" className="w-full justify-between" />
      </div>

      {/* Nav Content Scrollable */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
        {/* Core 5 Destinations */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-neutral-400 px-3 mb-2">
            Main Campus
          </div>
          <div className="space-y-1">
            {coreDestinations.map((item) => {
              const Icon = item.icon;
              if (item.isAction) {
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={item.onClick}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer bg-[#111111] dark:bg-white text-white dark:text-[#111111] hover:bg-[#222222] dark:hover:bg-neutral-200 mt-2 mb-2 shadow-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#D7F75B] text-[#111111] flex items-center justify-center font-black text-xs leading-none">
                        +
                      </span>
                      <span>{item.name}</span>
                    </div>
                  </button>
                );
              }

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 ${
                    item.isActive
                      ? 'bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/60 dark:text-blue-300 font-bold shadow-2xs'
                      : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white hover:bg-[#F6F3EC] dark:hover:bg-neutral-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && <CampusCountBadge count={item.badge} variant="blue" />}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Academic Tools Suite (Preserves all ITM Notes features) */}
        <div>
          <button
            type="button"
            onClick={() => setAcademicToolsOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white transition-colors cursor-pointer"
          >
            <span>Academic Suite</span>
            {academicToolsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>

          {academicToolsOpen && (
            <div className="mt-1 space-y-1">
              {academicTools.map((tool) => {
                const Icon = tool.icon;
                const isActive = currentPath.startsWith(tool.path);
                return (
                  <Link
                    key={tool.name}
                    to={tool.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/60 dark:text-blue-300 font-bold'
                        : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white hover:bg-[#F6F3EC] dark:hover:bg-neutral-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{tool.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* User Quick Profile Footer */}
      <div className="p-3.5 border-t border-[#EFECE6] dark:border-neutral-800/80 shrink-0">
        {user ? (
          <div className="flex items-center justify-between gap-2 p-2 rounded-2xl hover:bg-[#F6F3EC] dark:hover:bg-neutral-800/60 transition-colors">
            <Link
              to="/profile"
              onClick={onClose}
              className="flex items-center gap-2.5 min-w-0 flex-1"
            >
              <CampusAvatar
                name={profile?.display_name || user.email || 'Student'}
                size={36}
                limeRing
              />
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#111111] dark:text-white truncate">
                  {profile?.display_name || 'Campus Student'}
                </p>
                <p className="text-xs text-[#6B7280] dark:text-neutral-400 truncate">
                  {profile?.branch || 'ITM SLS Baroda'}
                </p>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              title="Sign Out"
              className="p-1.5 rounded-full text-neutral-400 hover:text-rose-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            onClick={onClose}
            className="w-full flex items-center justify-center h-10 px-4 rounded-full bg-[#2B4EFF] text-white font-bold text-sm hover:bg-[#1E3EDB] transition-all"
          >
            Sign In to Campus
          </Link>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Left Sidebar */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 shrink-0 h-screen sticky top-0 z-30">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-in Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
