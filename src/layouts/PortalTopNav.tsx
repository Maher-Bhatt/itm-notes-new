import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Menu, 
  Search, 
  HelpCircle, 
  Bell, 
  Flame, 
  Clock, 
  User, 
  LogOut, 
  Shield, 
  Sparkles,
  Layers,
  Calendar,
  X,
  Maximize2,
  Minimize2,
  LogIn
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";
import { usePomodoro } from "@/contexts/PomodoroContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserAvatar, resolveAvatarUrl } from "@/components/UserAvatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PortalTopNavProps {
  onToggleSidebar?: () => void;
  onOpenSearch?: () => void;
  isFocusMode?: boolean;
  onToggleFocusMode?: () => void;
}

export function PortalTopNav({ 
  onToggleSidebar, 
  onOpenSearch,
  isFocusMode = false,
  onToggleFocusMode
}: PortalTopNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile, role, signOut } = useAuth();
  const { state: game } = useGamification();
  const { timeLeft, isRunning, setIsModalOpen } = usePomodoro();

  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; message: string; timestamp: string; read: boolean }>>(() => {
    try {
      const saved = localStorage.getItem('itm_notifications');
      return saved ? JSON.parse(saved) : [
        {
          id: 'notif-mst',
          title: 'MST-1 Exam Schedule Live',
          message: 'Review high-weightage question banks and verified timetable.',
          timestamp: new Date().toISOString(),
          read: false
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem('itm_notifications');
        if (saved) setNotifications(JSON.parse(saved));
      } catch (e) {
        console.warn('Failed to parse notifications:', e);
      }
    };
    window.addEventListener('itm_notifications_updated', handleUpdate);
    return () => window.removeEventListener('itm_notifications_updated', handleUpdate);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('itm_notifications', JSON.stringify(updated));
  };

  const topTabs = [
    { label: "Home", path: "/" },
    { label: "Schedules", path: "/materials" },
    { label: "Activities", path: "/coding-lab" },
    { label: "Reminders", path: "/calculator" },
  ];

  return (
    <header className="sticky top-0 z-30 h-14 bg-background/95 backdrop-blur-md border-b border-border/80 px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left: Mobile Sidebar Trigger + Primary Nav Tabs */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          title="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Top Horizontal Tabs matching Screenshot */}
        <nav className="hidden sm:flex items-center gap-1">
          {topTabs.map((tab) => {
            const active = location.pathname === tab.path;
            return (
              <Link
                key={tab.label}
                to={tab.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                  active 
                    ? "text-primary font-bold after:absolute after:bottom-[-8px] after:left-3 after:right-3 after:h-0.5 after:bg-primary after:rounded-full" 
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right: Search Input + Focus Timer + Bell + Theme + Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Universal Search Pill matching Screenshot */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 h-9 px-3.5 rounded-full bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/60 text-xs transition-all shadow-xs cursor-pointer group"
          title="Search Notes and Questions (Ctrl + K)"
        >
          <Search className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="hidden md:inline font-medium">Search Note...</span>
          <span className="md:hidden font-medium">Search...</span>
          <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-background border border-border/80 rounded-md text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        {/* Pomodoro Focus Pill */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
            isRunning 
              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 animate-pulse" 
              : "bg-secondary/60 text-muted-foreground hover:text-foreground border-border/60"
          }`}
          title="Study Focus Timer"
        >
          <Clock className={`h-3.5 w-3.5 ${isRunning ? "text-amber-500" : ""}`} />
          <span className="font-mono text-[11px]">
            {isRunning 
              ? `${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}` 
              : "Timer"}
          </span>
        </button>

        {/* Fullscreen Focus Mode Toggle Button */}
        <button
          onClick={onToggleFocusMode}
          className={`flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
            isFocusMode
              ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30 font-bold animate-pulse"
              : "bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground border-border/60"
          }`}
          title={isFocusMode ? "Exit Focus Mode (Press F or Esc)" : "Focus Mode: Hide Sidebar & Expand Fullscreen (Press F)"}
        >
          {isFocusMode ? (
            <>
              <Minimize2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Exit Focus</span>
            </>
          ) : (
            <>
              <Maximize2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Focus</span>
              <kbd className="hidden lg:inline-flex items-center px-1 text-[9px] font-mono bg-background/50 rounded border border-border/60">F</kbd>
            </>
          )}
        </button>

        {/* Notifications Dropdown matching Screenshot */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 px-1 min-w-[14px] h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 p-2 rounded-2xl shadow-xl border border-border">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border">
              <span className="font-bold text-xs text-foreground">Notifications</span>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllRead}
                  className="text-[10px] font-semibold text-primary hover:underline"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-60 overflow-y-auto divide-y divide-border/60 py-1">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-xs text-muted-foreground">
                  No notifications yet.
                </div>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} className="p-2.5 hover:bg-secondary/40 rounded-xl transition-colors">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      <span className="font-bold text-xs text-foreground truncate">{notif.title}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">{notif.message}</p>
                    <span className="text-[9px] text-muted-foreground/60 font-mono mt-1 block">
                      {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Profile Avatar / Sign In */}
        {!user ? (
          <Link
            to="/auth"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In</span>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 p-0.5 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all cursor-pointer">
                <UserAvatar
                  avatarUrl={resolveAvatarUrl(profile, user)}
                  displayName={profile?.display_name}
                  email={user?.email}
                  className="w-8 h-8 text-xs"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-2xl shadow-xl border border-border">
              <div className="px-3 py-2.5 border-b border-border mb-1">
                <p className="font-bold text-xs text-foreground truncate">
                  {profile?.display_name || user?.email?.split("@")[0] || "Student"}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email || "Student Portal"}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1">
                    🔥 {game.streakDays}d Streak
                  </span>
                  <span className="text-[10px] font-mono text-primary font-bold">
                    {game.xp} XP
                  </span>
                </div>
              </div>

              <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer text-xs rounded-lg py-2">
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer text-xs rounded-lg py-2">
                Profile & Academic Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/materials")} className="cursor-pointer text-xs rounded-lg py-2">
                Study Materials
              </DropdownMenuItem>
              {role === "admin" && (
                <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer text-xs rounded-lg py-2 text-purple-600 font-semibold">
                  Admin Console
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-xs text-rose-500 rounded-lg py-2 font-medium">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
