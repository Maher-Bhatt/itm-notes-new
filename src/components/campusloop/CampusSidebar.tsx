import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Library,
  LayoutDashboard,
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
  const [academicToolsOpen, setAcademicToolsOpen] = useState(false);

  const currentPath = location.pathname;

  const isHomeActive =
    currentPath === '/community' ||
    currentPath === '/social';
  const isExploreActive = currentPath.startsWith('/explore');
  const isInboxActive = currentPath.startsWith('/inbox') || currentPath.startsWith('/messages');
  const isProfileActive = currentPath.startsWith('/profile') || currentPath === '/auth';

  // 5 Core Campus Destinations (Matches mobile nav exactly)
  const coreDestinations = [
    {
      name: 'Campus Feed',
      path: '/community',
      icon: Home,
      isActive: isHomeActive,
    },
    {
      name: 'Explore',
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
      name: 'Profile',
      path: '/profile',
      icon: User,
      isActive: isProfileActive,
    },
  ];

  const isVerifiedAdmin = role === 'admin' || user?.email?.toLowerCase() === 'maherbhatt01@gmail.com';

  // Study-first navigation (exam season)
  const studyTools = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Library', path: '/library', icon: Library },
    { name: 'Today', path: '/today', icon: Calendar },
    { name: 'Subjects & Topics', path: '/subjects', icon: BookOpen },
    { name: 'Question Banks', path: '/imp-questions', icon: HelpCircle },
    { name: 'Past Papers', path: '/pyq-papers', icon: FileText },
    { name: 'Mock Exams', path: '/mock-exam', icon: Sparkles },
    { name: 'Rapid Revision', path: '/rapid-revision', icon: Zap },
    { name: 'Formula Bank', path: '/formulas', icon: BookOpen },
    { name: 'Coding Lab', path: '/coding-lab', icon: Code2 },
  ];

  const academicTools = [
    { name: 'Study Planner', path: '/study-planner', icon: Calendar },
    { name: 'Attendance & SGPA', path: '/calculator', icon: Calculator },
    { name: 'Study Materials', path: '/materials', icon: FileText },
    { name: 'Bookmarks', path: '/bookmarks', icon: Bookmark },
    ...(isVerifiedAdmin ? [{ name: 'Admin', path: '/admin', icon: Shield }] : []),
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full sidebar-dark border-r border-sidebar-border select-none">
      {/* Top Brand Lockup */}
      <div className="p-5 flex items-center justify-between border-b border-border dark:border-stone-800/80 shrink-0">
        <Link to="/dashboard" onClick={onClose} className="hover:opacity-95 transition-opacity">
          <CampusLoopLogo size="md" showSubtitle />
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="md:hidden p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Gujarat Campus Selector Bar */}
      <div className="px-4 py-2.5 border-b border-border dark:border-stone-800/60 bg-background/50 dark:bg-stone-900/40 shrink-0">
        <UniversityDropdown variant="full" className="w-full justify-between" />
      </div>

      {/* Nav Content Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground px-3 mb-1.5">
            Study
          </div>
          <div className="space-y-0.5">
            {studyTools.map((tool) => {
              const Icon = tool.icon;
              const isActive = tool.path === '/dashboard' ? currentPath === '/dashboard' : currentPath.startsWith(tool.path);
              return (
                <Link
                  key={tool.name}
                  to={tool.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60 font-medium'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : ''}`} />
                  <span className="truncate">{tool.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground px-3 mb-1.5">
            Campus
          </div>
          <div className="space-y-0.5">
            {coreDestinations.map((item) => {
              const Icon = item.icon;
              if (item.isAction) {
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={item.onClick}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.name}</span>
                  </button>
                );
              }
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    item.isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${item.isActive ? 'text-primary' : ''}`} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && <CampusCountBadge count={item.badge} variant="blue" />}
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setAcademicToolsOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <span>More tools</span>
            {academicToolsOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
          {academicToolsOpen && (
            <div className="mt-1 space-y-0.5">
              {academicTools.map((tool) => {
                const Icon = tool.icon;
                const isActive = currentPath.startsWith(tool.path);
                return (
                  <Link
                    key={tool.name}
                    to={tool.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/60 font-medium'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : ''}`} />
                    <span className="truncate">{tool.name}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* User Quick Profile Footer */}
      <div className="p-3.5 border-t border-border dark:border-stone-800/80 shrink-0">
        {user ? (
          <div className="flex items-center justify-between gap-2 p-2 rounded-2xl hover:bg-background dark:hover:bg-stone-800/60 transition-colors">
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
                <p className="text-sm font-bold text-foreground dark:text-white truncate">
                  {profile?.display_name || 'Campus Student'}
                </p>
                <p className="text-xs text-muted-foreground dark:text-stone-400 truncate">
                  {profile?.branch || 'Student'}
                </p>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => signOut()}
              title="Sign Out"
              className="p-1.5 rounded-full text-stone-400 hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            to="/auth"
            onClick={onClose}
            className="w-full flex items-center justify-center h-10 px-4 rounded-full bg-primary text-white font-bold text-sm hover:bg-primary transition-all"
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
          <div className="relative w-72 max-w-[85vw] h-full shadow-lg z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
