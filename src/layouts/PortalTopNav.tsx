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
import { resolveAvatarUrl } from "@/components/UserAvatar";
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
      const saved = localStorage.getItem("itm_notifications");
      return saved ? JSON.parse(saved) : [
        {
          id: "notif-mst",
          title: "Semester Schedule Live",
          message: "Check exam questions and verified schedules for ITM SLS Baroda.",
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
        const saved = localStorage.getItem("itm_notifications");
        if (saved) setNotifications(JSON.parse(saved));
      } catch (e) {
        console.warn("Failed to parse notifications:", e);
      }
    };
    window.addEventListener("itm_notifications_updated", handleUpdate);
    return () => window.removeEventListener("itm_notifications_updated", handleUpdate);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem("itm_notifications", JSON.stringify(updated));
  };

  return (
    <header className="shrink-0 z-30 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-xl border-b border-[#E8E4DA] dark:border-neutral-800 px-3 sm:px-6 flex items-center justify-between transition-all pt-[env(safe-area-inset-top,0px)] h-[calc(3.75rem+env(safe-area-inset-top,0px))] w-full">
      {/* Left: Mobile Sidebar Trigger + CampusLoop Logo */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-[#F6F3EC] dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* CampusLoop Logo */}
        <Link to="/community" className="flex items-center gap-2 group select-none shrink-0" title="CampusLoop Home">
          <CampusLoopLogo size="sm" showSubtitle />
        </Link>

        {/* Desktop Sidebar Minimize / Expand Button */}
        {onToggleFocusMode && (
          <button
            onClick={onToggleFocusMode}
            className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all cursor-pointer ${
              isFocusMode
                ? "bg-[#2B4EFF] text-white border-transparent font-bold"
                : "border-[#E8E4DA] dark:border-neutral-800 text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white hover:bg-[#F6F3EC] dark:hover:bg-neutral-800"
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
          className="flex items-center gap-2 h-10 px-3.5 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 border border-[#E8E4DA] dark:border-neutral-700 text-[#6B7280] dark:text-neutral-300 hover:text-[#111111] dark:hover:text-white text-xs transition-all shadow-2xs cursor-pointer group"
          title="Search Notes, Practicals and Question Banks (Ctrl + K)"
        >
          <Search className="h-4 w-4 text-neutral-400 group-hover:text-[#2B4EFF] transition-colors" />
          <span className="hidden md:inline font-medium">Search clubs, notes, people...</span>
          <span className="md:hidden font-medium">Search...</span>
          <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white dark:bg-neutral-900 border border-[#E8E4DA] dark:border-neutral-700 rounded-md text-neutral-500">
            ⌘K
          </kbd>
        </button>

        {/* Timetables / Viva Schedule Pill */}
        <button
          onClick={() => openTimetable("viva")}
          className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-900/40 hover:bg-[#D8E0FC] shadow-2xs cursor-pointer shrink-0"
          title="View Official Remedial & Viva Timetables"
        >
          <Calendar className="h-3.5 w-3.5 text-[#2B4EFF]" />
          <span>Timetable</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#2B4EFF] animate-pulse" />
        </button>

        {/* Pomodoro Focus Pill */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={`hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
            isRunning
              ? "bg-[#D7F75B] text-[#111111] border-[#C6E84A] animate-pulse font-bold"
              : "bg-[#F6F3EC] dark:bg-neutral-800 text-[#6B7280] dark:text-neutral-400 border-[#E8E4DA] dark:border-neutral-700 hover:text-[#111111] dark:hover:text-white"
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

        {/* Fullscreen Focus Mode Toggle */}
        <button
          onClick={onToggleFocusMode}
          className={`flex items-center gap-1.5 h-10 px-3.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
            isFocusMode
              ? "bg-[#2B4EFF] text-white border-transparent font-bold"
              : "bg-[#F6F3EC] dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#6B7280] dark:text-neutral-300 border-[#E8E4DA] dark:border-neutral-700"
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
              <kbd className="hidden lg:inline-flex items-center px-1 text-[9px] font-mono bg-white dark:bg-neutral-900 rounded border border-[#E8E4DA] dark:border-neutral-700">
                F
              </kbd>
            </>
          )}
        </button>

        {/* Notifications Dropdown with Dot */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative p-2 rounded-full text-neutral-600 dark:text-neutral-300 hover:bg-[#F6F3EC] dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#2B4EFF] rounded-full border-2 border-white dark:border-[#18181B]" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2 rounded-[20px] shadow-xl border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] text-foreground">
            <div className="flex items-center justify-between px-3 py-2 border-b border-[#EFECE6] dark:border-neutral-800">
              <span className="font-bold text-sm text-[#111111] dark:text-white">Campus Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-xs font-semibold text-[#2B4EFF] hover:underline cursor-pointer"
                >
                  Mark all read
                </button>
              )}
            </div>
            <div className="max-h-72 overflow-y-auto divide-y divide-[#EFECE6] dark:divide-neutral-800 py-1">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-xs text-neutral-500">
                  No notifications yet.
                </div>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} className="p-3 hover:bg-[#F6F3EC] dark:hover:bg-neutral-800/60 rounded-xl transition-colors">
                    <div className="flex items-center gap-1.5 mb-1">
                      {!notif.read && <span className="w-2 h-2 rounded-full bg-[#2B4EFF] shrink-0" />}
                      <span className="font-bold text-xs text-[#111111] dark:text-white truncate">{notif.title}</span>
                    </div>
                    <p className="text-xs text-[#6B7280] dark:text-neutral-400 leading-relaxed">{notif.message}</p>
                    <span className="text-[10px] text-neutral-400 font-medium mt-1 block">
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2B4EFF] text-white text-xs font-bold shadow-xs hover:bg-[#1E3EDB] transition-all cursor-pointer"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In</span>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-[#2B4EFF] transition-all cursor-pointer">
                <CampusAvatar
                  src={resolveAvatarUrl(profile, user)}
                  name={profile?.display_name || user?.email || "Student"}
                  size={36}
                  limeRing
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 p-2 rounded-[20px] shadow-xl border border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] text-foreground">
              <div className="px-3 py-2.5 border-b border-[#EFECE6] dark:border-neutral-800 mb-1">
                <p className="font-bold text-sm text-[#111111] dark:text-white truncate">
                  {profile?.display_name || user?.email?.split("@")[0] || "Student"}
                </p>
                <p className="text-xs text-[#6B7280] dark:text-neutral-400 truncate">{user?.email}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="text-xs font-bold text-[#2B4EFF] flex items-center gap-1 bg-[#E6EAFD] dark:bg-blue-950/40 px-2 py-0.5 rounded-full">
                    ⚡ {game.streakDays}d Streak
                  </span>
                  <span className="text-xs text-neutral-500 font-semibold">
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
              {role === "admin" && (
                <DropdownMenuItem onClick={() => navigate("/admin")} className="cursor-pointer text-xs font-bold text-[#2B4EFF] rounded-xl">
                  Admin Portal
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-xs text-rose-600 rounded-xl">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
