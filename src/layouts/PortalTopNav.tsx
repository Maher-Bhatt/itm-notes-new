import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  Clock,
  Calendar,
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
import { CampusAvatar } from "@/components/campusloop/CampusAvatar";
import { CampusLoopLogo } from "@/components/campusloop/CampusLoopLogo";
import { UniversityDropdown } from "@/components/campusloop/UniversityDropdown";
import { resolveAvatarUrl } from "@/components/UserAvatar";
import { openTimetable } from "@/components/GlobalTimetableModal";
import { buildNotifications, markNotificationsRead, NOTIFICATIONS_EVENT, type AppNotification } from "@/lib/notifications";
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

  const [notifications, setNotifications] = useState<AppNotification[]>(() => buildNotifications());

  useEffect(() => {
    const refresh = () => setNotifications(buildNotifications());
    window.addEventListener(NOTIFICATIONS_EVENT, refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener(NOTIFICATIONS_EVENT, refresh);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  useEffect(() => {
    setNotifications(buildNotifications());
  }, [location.pathname]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => markNotificationsRead(notifications.map((n) => n.id));

  return (
    <header className="shrink-0 z-30 bg-background/85 backdrop-blur-md border-b border-border px-3 sm:px-6 flex items-center justify-between transition-all pt-[env(safe-area-inset-top,0px)] h-[calc(3.75rem+env(safe-area-inset-top,0px))] w-full">
      {/* Left: Mobile Sidebar Trigger + CampusLoop Logo */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-background dark:hover:bg-stone-800 transition-colors cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* CampusLoop Logo (mobile or when sidebar is collapsed) */}
        <Link 
          to="/dashboard" 
          className={`items-center gap-2 group select-none shrink-0 ${isFocusMode ? 'flex' : 'flex md:hidden'}`} 
          title="CampusLoop Home"
        >
          <CampusLoopLogo size="sm" showSubtitle />
        </Link>

        {/* Desktop Sidebar Minimize / Expand Button */}
        {onToggleFocusMode && (
          <button
            onClick={onToggleFocusMode}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
              isFocusMode
                ? "bg-primary text-white border-transparent font-bold"
                : "border-border dark:border-stone-800 text-muted-foreground dark:text-stone-400 hover:text-foreground dark:hover:text-white hover:bg-background dark:hover:bg-stone-800"
            }`}
            title={isFocusMode ? "Expand Sidebar (F)" : "Minimize Sidebar (F)"}
          >
            {isFocusMode ? (
              <>
                <PanelLeftOpen className="h-4 w-4" />
                <span className="text-[11px] font-bold">Sidebar</span>
              </>
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Right: Search + Timetable + Focus + Notifications + Theme + Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Universal Search Pill */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 h-10 px-3.5 md:min-w-[15rem] rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 text-xs transition-colors cursor-pointer group"
          title="Search Notes, Practicals and Question Banks (Ctrl + K)"
        >
          <Search className="h-4 w-4 text-stone-400 group-hover:text-primary transition-colors" />
          <span className="hidden md:inline font-medium whitespace-nowrap">Search notes and topics</span>
          <span className="md:hidden font-medium">Search...</span>
          <kbd className="hidden lg:inline-flex ml-auto items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-secondary border border-border rounded-md text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        {/* Timetables / Viva Schedule Pill */}
        <button
          onClick={() => openTimetable("viva")}
          className="hidden md:flex items-center gap-1.5 h-10 px-3 rounded-full text-xs font-semibold border border-border bg-card text-foreground hover:border-primary/40 transition-colors cursor-pointer shrink-0"
          title="View Official Remedial & Viva Timetables"
        >
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span className="hidden xl:inline">Timetable</span>
        </button>

        {/* Pomodoro Focus Pill */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={`hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
            isRunning
              ? "bg-accent text-accent-foreground border-primary/40 font-bold"
              : "bg-background dark:bg-stone-800 text-muted-foreground dark:text-stone-400 border-border dark:border-stone-700 hover:text-foreground dark:hover:text-white"
          }`}
          title="Study Focus Timer"
        >
          <Clock className="h-3.5 w-3.5" />
          <span className="font-mono text-[11px]">
            {isRunning
              ? `${String(Math.floor(timeLeft / 60)).padStart(2, "0")}:${String(timeLeft % 60).padStart(2, "0")}`
              : "Focus"}
          </span>
        </button>

        {/* Notifications Dropdown with Dot */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-background dark:hover:bg-stone-800 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-white dark:border-foreground" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2 rounded-2xl shadow-lg border border-border dark:border-stone-800 bg-white dark:bg-card text-foreground">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border dark:border-stone-800">
              <span className="font-bold text-sm text-foreground dark:text-white">Campus Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-border dark:divide-stone-800 py-1">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-xs text-stone-500">
                  No notifications yet.
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    role={notif.href ? "link" : undefined}
                    tabIndex={notif.href ? 0 : undefined}
                    onClick={() => {
                      markNotificationsRead([notif.id]);
                      if (notif.href) navigate(notif.href);
                    }}
                    className={`p-3 hover:bg-secondary rounded-xl transition-colors ${notif.href ? "cursor-pointer" : ""}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                      <span className="font-bold text-xs text-foreground dark:text-white truncate">{notif.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground dark:text-stone-400 leading-relaxed">{notif.message}</p>
                    <span className="text-[10px] text-stone-400 font-medium mt-1 block">
                      {new Date(notif.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                ))
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle (Light / Dark) */}
        <ThemeToggle />

        {/* Profile Avatar / Sign In */}
        {!user ? (
          <Link
            to="/auth"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary transition-all cursor-pointer"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In</span>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-primary transition-all cursor-pointer">
                <CampusAvatar
                  src={resolveAvatarUrl(profile, user)}
                  name={profile?.display_name || user?.email || "Student"}
                  size={36}
                  limeRing
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 p-2 rounded-2xl shadow-lg border border-border dark:border-stone-800 bg-white dark:bg-card text-foreground">
              <div className="px-3 py-2.5 border-b border-border dark:border-stone-800 mb-1">
                <p className="font-bold text-sm text-foreground dark:text-white truncate">
                  {profile?.display_name || user?.email?.split("@")[0] || "Student"}
                </p>
                <p className="text-xs text-muted-foreground dark:text-stone-400 truncate">{user?.email}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-xs font-bold text-primary flex items-center gap-1 bg-primary/10 dark:bg-primary/15 px-2 py-0.5 rounded-full">
                    ⚡ {game.streakDays}d Streak
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">
                    {game.xp} XP
                  </span>
                </div>
              </div>

              <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer text-xs rounded-xl">
                Profile & Badges
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/calculator")} className="cursor-pointer text-xs rounded-xl">
                Attendance & SGPA
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/bookmarks")} className="cursor-pointer text-xs rounded-xl">
                Saved Bookmarks
              </DropdownMenuItem>
              {(role === "admin" || user?.email?.toLowerCase() === "maherbhatt01@gmail.com") && (
                <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer text-xs font-bold text-primary rounded-xl">
                  Admin Portal
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-xs text-destructive rounded-xl">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
