import { useLocation, Link } from 'react-router-dom';
import { BookOpen, LayoutDashboard, Code2, MessageSquare, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/hooks/useGamification';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export function MobileBottomNav() {
  const location = useLocation();
  const { user } = useAuth();
  const { state: game } = useGamification();

  const handleNavClick = async () => {
    try {
      await Haptics.impact({ style: ImpactStyle.Light });
    } catch (e) {
      // Fallback silently if haptics fail
    }
  };

  // Hide on topic reading page
  if (location.pathname.includes('/topic/')) {
    return null;
  }

  const isMaintenanceActive = (() => {
    try {
      const stored = localStorage.getItem('itm_maintenance_mode');
      return stored === 'true';
    } catch {
      return false;
    }
  })();
  const isAdmin = user?.email?.toLowerCase() === 'maherbhatt01@gmail.com';

  if (isMaintenanceActive && !isAdmin) {
    return null;
  }

  const navItems = [
    {
      to: '/subjects',
      label: 'Subjects',
      icon: BookOpen,
      isActive: location.pathname.startsWith('/subject') || location.pathname === '/subjects',
    },
    {
      to: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      isActive: location.pathname === '/dashboard',
      badge: game.streakDays > 0 ? `${game.streakDays}d` : undefined,
    },
    {
      to: '/coding-lab',
      label: 'Lab',
      icon: Code2,
      isActive: location.pathname.startsWith('/coding-lab'),
    },
    {
      to: '/community',
      label: 'Social',
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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-2xl border-t border-border/80 shadow-xl transition-all"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 8px) + 2px)' }}
    >
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
              className={`flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all rounded-xl select-none press min-h-[44px] relative ${
                active
                  ? 'text-primary font-extrabold'
                  : 'text-muted-foreground hover:text-foreground font-medium'
              }`}
            >
              {active && (
                <span className="absolute inset-y-1 inset-x-2 bg-primary/10 dark:bg-primary/20 rounded-xl -z-10 scale-in" />
              )}

              <div className="relative flex items-center justify-center">
                <Icon className={`h-5 w-5 transition-transform duration-200 ${active ? 'scale-110 text-primary' : 'text-muted-foreground hover:text-foreground'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 text-[9px] font-black px-1.5 py-0.2 rounded-full bg-accent text-accent-foreground shadow-sm">
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
