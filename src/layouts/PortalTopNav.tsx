import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  HelpCircle,
  Bell,
  Clock,
  User,
  LogOut,
  Shield,
  Zap,
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
    <header className="shrink-0 z-30 bg-black/40 backdrop-blur-xl border-b border-white/10 px-3 sm:px-6 flex items-center justify-between transition-all pt-[env(safe-area-inset-top,0px)] h-[calc(3.5rem+env(safe-area-inset-top,0px))] w-full">
      {/* Left: Mobile Sidebar Trigger + Brand + Primary Nav Tabs */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors press"
          title="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group select-none shrink-0" title="ITM Notes Portal">
          <div className="h-7 px-2.5 rounded-lg bg-gradient-electric text-white flex items-center justify-center font-black text-xs tracking-wider shadow-lg shadow-primary/30 font-display">
            ITM
          </div>
          <span className="font-display font-black tracking-tight text-white text-sm sm:text-base">
            Notes
          </span>
        </Link>

        {/* Desktop Sidebar Minimize / Expand Button */}
        {onToggleFocusMode && (
          <button
            onClick={onToggleFocusMode}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-white/10 text-xs font-semibold transition-all cursor-pointer ${
              isFocusMode
                ? "bg-gradient-electric text-white border-white/20 font-bold"
                : "border-white/10 text-white/60 hover:text-white hover:bg-white/5"
            }`}
            title={isFocusMode ? "Expand Sidebar (F)" : "Minimize Sidebar (F)"}
          >
            {isFocusMode ? (
              <>
                <PanelLeftOpen className="h-4 w-4 text-white" />
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
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all relative ${
                  active
                    ? "text-white font-bold bg-white/5 border-b-2 border-primary"
                    : "text-white/60 hover:text-white hover:bg-white/5"
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
          className="flex items-center gap-2 h-9 px-3.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-xs transition-all shadow-sm cursor-pointer group press"
          title="Search Notes, Practicals and Question Banks (Ctrl + K)"
        >
          <Search className="h-3.5 w-3.5 text-white/60 group-hover:text-primary transition-colors" />
          <span className="hidden md:inline font-medium">Search Courses & Notes...</span>
          <span className="md:hidden font-medium">Search...</span>
          <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-black/20 border border-white/10 rounded-md text-white/60">
            ⌘K
          </kbd>
        </button>

        {/* Timetables / Viva Schedule Pill */}
        <button
          onClick={() => openTimetable("viva")}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 shadow-xs cursor-pointer shrink-0 press"
          title="View Official Remedial & Viva Timetables"
        >
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span>Timetable</span>
          <span className="w-1.5 h-1.5 rounded-full bg-electric-foreground animate-pulse" />
        </button>

        {/* Pomodoro Focus Pill */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 press ${
            isRunning
              ? "bg-accent/20 text-accent-foreground border-accent/40 animate-pulse font-bold"
              : "bg-white/5 text-white/60 border-white/10"
          }`}
          title="Study Focus Timer"
        >
          <Clock className={`h-3.5 w-3.5 ${isRunning ? "text-accent" : "text-white/60"}`} />
          <span className="font-mono text-[11px]">
            {isRunning
              ? `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`
              : "Focus"}
          </span>
        </button>

        {/* Fullscreen Focus Mode Toggle */}
        <button
          onClick={onToggleFocusMode}
          className={`flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-semibold border transition-all cursor-pointer press ${
            isFocusMode
              ? "bg-gradient-electric text-white border-white/20 shadow-lg shadow-primary/30 font-bold"
              : "bg-white/5 hover:bg-white/10 text-white/60 border-white/10"
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
              <kbd className="hidden lg:inline-flex items-center px-1 text-[9px] font-mono bg-black/20 rounded border border-white/10">
                F
              </kbd>
            </>
          )}
        </button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors press"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 px-1 min-w-[14px] h-3.5 bg-gradient-electric text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72 p-2 rounded-2xl shadow-xl border border-white/10 glass-card">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
              <span className="font-bold text-xs text-white">Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[10px] font-semibold text-primary hover:text-white/80"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-60 overflow-y-auto divide-y divide-white/10 py-1">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-xs text-white/50">
                  No notifications yet.
                </div>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} className="p-2.5 hover:bg-white/5 rounded-lg transition-colors press">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      {!notif.read && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      <span className="font-bold text-xs text-white truncate">{notif.title}</span>
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed">{notif.message}</p>
                    <span className="text-[9px] text-white/40 font-mono mt-1 block">
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-electric text-white text-xs font-bold shadow-lg shadow-primary/20 press flex items-center gap-2"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In</span>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 p-0.5 rounded-full ring-2 ring-primary/30 hover:ring-primary/50 transition-all cursor-pointer press">
                <UserAvatar
                  avatarUrl={resolveAvatarUrl(profile, user)}
                  displayName={profile?.display_name}
                  email={user?.email}
                  className="w-8 h-8 text-xs"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-1.5 rounded-2xl shadow-xl border border-white/10 glass-card">
              <div className="px-3 py-2.5 border-b border-white/10 mb-1">
                <p className="font-bold text-xs text-white truncate">
                  {profile?.display_name || user?.email?.split("@")[0] || "Student"}
                </p>
                <p className="text-[10px] text-white/60 truncate">{user?.email || "Student Portal"}</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] font-bold text-accent-foreground flex items-center gap-1">
                    🔥 {game.streakDays}d Streak
                  </span>
                  <span className="text-[10px] font-mono text-white font-bold">
                    {game.xp} XP
                  </span>
                </div>
              </div>

              <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer text-xs rounded-xl py-2 press hover:bg-white/5">
                Dashboard
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer text-xs rounded-xl py-2 press hover:bg-white/5">
                Profile & Academic Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/materials")} className="cursor-pointer text-xs rounded-xl py-2 press hover:bg-white/5">
                Study Materials
              </DropdownMenuItem>
              {role === "admin" && (
                <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer text-xs rounded-xl py-2 text-primary font-semibold press hover:bg-white/5">
                  Admin Console
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-xs text-destructive rounded-xl py-2 font-medium press hover:bg-white/5">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}