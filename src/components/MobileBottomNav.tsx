import { useLocation, Link } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Code2, MessageSquare, User, Flame } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/hooks/useGamification';

export function MobileBottomNav() {
  const location = useLocation();
  const { user } = useAuth();
  const { state: game } = useGamification();

  // Hide on topic reading page to keep screen real estate 100% focused on reading
  if (location.pathname.includes('/topic/')) {
    return null;
  }

  // Hide during maintenance mode for non-admins so outer users only see the banner
  const isMaintenanceActive = (() => {
    try {
      const stored = localStorage.getItem('itm_maintenance_mode');
      if (stored === 'false') return false;
      return true;
    } catch {
      return true;
    }
  })();
  const isAdmin = user?.email === 'maherbhatt01@gmail.com';
  const isBypassed = typeof window !== 'undefined' && sessionStorage.getItem('itm_admin_bypassed') === 'true';

  if (isMaintenanceActive && !isAdmin && !isBypassed) {
    return null;
  }

  const navItems = [
    {
      to: '/',
      label: 'Subjects',
      icon: BookOpen,
      isActive: location.pathname === '/',
    },
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      isActive: location.pathname === '/dashboard',
      badge: game.streakDays > 0 ? `${game.streakDays}🔥` : undefined,
    },
    {
      to: '/coding-lab',
      label: 'Coding Lab',
      icon: Code2,
      isActive: location.pathname.startsWith('/coding-lab'),
    },
    {
      to: '/community',
      label: 'Community',
      icon: MessageSquare,
      isActive: location.pathname.startsWith('/community') || location.pathname.startsWith('/social'),
    },
    {
      to: user ? '/profile' : '/auth',
      label: user ? 'Profile' : 'Sign In',
      icon: User,
      isActive: location.pathname === '/profile' || location.pathname === '/auth',
    },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-xl border-t border-border/80 shadow-lg"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 6px)' }}
    >
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all rounded-xl select-none apple-press min-h-[44px] ${
                active 
                  ? 'text-primary font-bold' 
                  : 'text-muted-foreground hover:text-foreground font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`h-5 w-5 transition-transform ${active ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 text-[9px] font-bold px-1 py-0.2 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${active ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
