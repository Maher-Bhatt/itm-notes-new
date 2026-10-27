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
  LogIn,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";
import { usePomodoro } from "@/contexts/PomodoroContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UserAvatar, resolveAvatarUrl } from "@/components/UserAvatar";
import { openTimetable } from "@/components/GlobalTimetableModal";
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
  onToggleFocusMode,
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
          read: false,
        },
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

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('itm_notifications', JSON.stringify(updated));
  };

  const topTabs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Subjects & Notes", path: "/subjects" },
    { label: "Materials", path: "/materials" },
    { label: "Coding Lab", path: "/coding-lab" },
    { label: "Exam Questions", path: "/imp-questions" },
    { label: "Quizzes", path: "/quiz" },
  ];

  return (
    <header className="shrink-0 z-30 bg-card/90 backdrop-blur-xl border-b border-border px-3 sm:px-6 flex items-center justify-between transition-all pt-[env(safe-area-inset-top,0px)] h-[calc(3.5rem+env(safe-area-inset-top,0px))] w-full glass-strong">
      {/* Left: Mobile Sidebar Trigger + Brand + Primary Nav Tabs */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors press"
          title="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group select-none shrink-0" title="ITM Notes Portal">
          <div className="h-7 px-2.5 rounded-lg bg-primary text-chartreuse-foreground flex items-center justify-center font-black text-xs tracking-wider border border-chartreuse/30 shadow-sm font-display">
            ITM
          </div>
          <span className="font-display font-black tracking-tight text-foreground text-sm sm:text-base">
            Notes
          </span>
        </Link>

        {/* Desktop Sidebar Minimize / Expand Button */}
        {onToggleFocusMode && (
          <button
            onClick={onToggleFocusMode}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
              isFocusMode
                ? "bg-accent/20 text-primary dark:text-sidebar-foreground border-accent/40 font-bold"
                : "border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
            title={isFocusMode ? "Expand Sidebar (F)" : "Minimize Sidebar (F)"}
          >
            {isFocusMode ? (
              <>
                <PanelLeftOpen className="h-4 w-4 text-primary dark:text-sidebar-primary" />
                <span className="text-[11px] font-bold">Sidebar</span>
              </>
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        )}

        {/* Top Horizontal Tabs (xl+ only) */}
        <nav className="hidden xl:flex items-center gap-1 font-display">
          {topTabs.map((tab) => {
            const active = location.pathname === tab.path || (tab.path === "/subjects" && (location.pathname.startsWith("/subjects") || location.pathname.startsWith("/subject")));
            return (
              <Link
                key={tab.label}
                to={tab.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all relative ${
                  active
                    ? "text-primary font-bold after:absolute after:bottom-[-6px] after:left-1 after:right-1 after:h-1 after:bg-accent after:rounded-full"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right: Search + Timetable + Focus + Notifications + Theme + Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Universal Search Pill */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 h-9 px-3.5 rounded-full bg-card hover:bg-secondary/80 text-muted-foreground hover:text-foreground border border-border text-xs transition-all shadow-sm cursor-pointer group press"
          title="Search Notes, Practicals and Question Banks (Ctrl + K)"
        >
          <Search className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="hidden md:inline font-medium">Search Courses & Notes...</span>
          <span className="md:hidden font-medium">Search...</span>
          <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-background border border-border rounded-md text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        {/* Timetables / Viva Schedule Pill */}
        <button
          onClick={() => openTimetable("viva")}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all bg-primary/10 text-primary dark:text-sidebar-primary dark:bg-primary/20 border-primary/20 hover:bg-primary hover:text-chartreuse-foreground shadow-xs cursor-pointer shrink-0 press"
          title="View Official Remedial & Viva Timetables"
        >
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span>Timetable</span>
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        </button>

        {/* Pomodoro Focus Pill */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 press ${
            isRunning
              ? "bg-accent/20 text-primary dark:text-sidebar-primary border-accent/40 animate-pulse font-bold"
              : "bg-card text-muted-foreground hover:text-foreground border-border"
          }`}
          title="Study Focus Timer"
        >
          <Clock className={`h-3.5 w-3.5 ${isRunning ? "text-primary" : ""}`} />
          <span className="font-mono text-[11px]">
            {isRunning
              ? `${Math.floor(timeLeft / 60).toString().padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`
              : "Focus"}
          </span>
        </button>

        {/* Fullscreen Focus Mode Toggle */}
        <button
          onClick={onToggleFocusMode}
          className={`flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-semibold border transition-all cursor-pointer press ${
            isFocusMode
              ? "bg-primary text-sidebar-primary border-primary shadow-md font-bold"
              : "bg-card hover:bg-secondary text-muted-foreground hover:text-foreground border-border"
          }`}
          title={isFocusMode ? "Exit Focus Mode (Press F or Esc)" : "Focus Mode: Hide Sidebar (Press F)"}
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
              <kbd className="hidden lg:inline-flex items-center px-1 text-[9px] font-mono bg-background/50 rounded border border-border/60">
                F
              </kbd>
            </>
          )}
        </button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors press"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 px-1 min-w-[14px] h-3.5 bg-danger text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 p-2 rounded-2xl shadow-xl border border-border glass-strong">
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
                  <div key={notif.id} className="p-2.5 hover:bg-secondary/40 rounded-lg transition-colors press">
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold shadow-sm hover:bg-primary/90 transition-opacity press"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In</span>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 p-0.5 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all cursor-pointer press">
                <UserAvatar
                  avatarUrl={resolveAvatarUrl(profile, user)}
                  displayName={profile?.display_name}
                  email={user?.email}
                  className="w-8 h-8 text-xs"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-2xl shadow-xl border border-border glass-strong">
              <div className="px-3 py-2.5 border-b border-border mb-1">
                <p className="font-bold text-xs text-foreground truncate">
                  {profile?.display_name || user?.email?.split("@")[0] || "Student"}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">{user?.email || "Student Portal"}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-accent-foreground flex items-center gap-1">
                    🔥 {game.streakDays}d Streak
                  </span>
                  <span className="text-[10px] font-mono text-primary font-bold">
                    {game.xp} XP
                  </span>
                </div>
              </div>

              <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer text-xs rounded-lg py-2 press">
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer text-xs rounded-lg py-2 press">
                Profile & Academic Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/materials")} className="cursor-pointer text-xs rounded-lg py-2 press">
                Study Materials
              </DropdownMenuItem>
              {role === "admin" && (
                <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer text-xs rounded-lg py-2 text-primary font-semibold press">
                  Admin Console
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-xs text-destructive rounded-lg py-2 font-medium press">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
