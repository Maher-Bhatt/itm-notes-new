import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Library, BookOpen, Users, User } from 'lucide-react';
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
}) => {
  const location = useLocation();
  const { user } = useAuth();

  // Hide on topic reading page or coding lab full screen
  if (location.pathname.includes('/topic/') || /^\/library\/[^/]+\/[^/]+/.test(location.pathname)) {
    return null;
  }

  const handleNavClick = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch {
      // Ignore
    }
  };

  const items = [
    { to: '/dashboard', label: 'Home', icon: Home, active: location.pathname === '/dashboard' || location.pathname === '/' },
    { to: '/library', label: 'Library', icon: Library, active: location.pathname.startsWith('/library') },
    { to: '/subjects', label: 'Subjects', icon: BookOpen, active: location.pathname.startsWith('/subject') },
    { to: '/community', label: 'Campus', icon: Users, active: ['/community', '/social', '/explore', '/inbox', '/messages'].some((p) => location.pathname.startsWith(p)), badge: unreadMessagesCount },
    { to: user ? '/profile' : '/auth', label: 'Profile', icon: User, active: location.pathname.startsWith('/profile') || location.pathname === '/auth' },
  ];

  return (
    <nav
      aria-label="Primary"
      className="md:hidden fixed left-0 right-0 bottom-0 z-40 bg-background/95 backdrop-blur-md border-t border-border select-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="grid grid-cols-5 max-w-md mx-auto">
        {items.map(({ to, label, icon: Icon, active, badge }) => (
          <Link
            key={label}
            to={to}
            onClick={handleNavClick}
            aria-current={active ? 'page' : undefined}
            className={`relative flex flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] text-[11px] transition-colors ${
              active ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground font-medium'
            }`}
          >
            <Icon className="w-5 h-5" strokeWidth={active ? 2.2 : 1.8} />
            <span>{label}</span>
            {badge ? (
              <span className="absolute top-1.5 left-1/2 ml-2 min-w-[16px] h-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center leading-none">
                {badge}
              </span>
            ) : null}
          </Link>
        ))}
      </div>
    </nav>
  );
};
