import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Code2,
  HelpCircle,
  Users,
  Trophy,
  Calculator,
  Bookmark,
  Shield,
  Settings,
  LogOut,
  ChevronRight,
  Calendar,
  X,
  LogIn,
  PanelLeftClose,
  FileText,
  GraduationCap,
  Zap,
} from "lucide-react";
import { ItmMoocsLogo } from "@/components/brand/ItmMoocsLogo";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";
import { useFocusMode } from "@/contexts/FocusModeContext";
import { UserAvatar, resolveAvatarUrl } from "@/components/UserAvatar";
import { openTimetable } from "@/components/GlobalTimetableModal";

interface PortalSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
}

export function PortalSidebar({ isOpen = false, onClose, isCollapsed = false }: PortalSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, role, signOut } = useAuth();
  const { state: game, levelInfo } = useGamification();
  const { toggleFocusMode } = useFocusMode();

  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path === "/subjects" && (currentPath.startsWith("/subjects") || currentPath.startsWith("/subject/"))) return true;
    if (path !== "/" && path !== "/subjects" && currentPath.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Today's Hub", path: "/today", icon: Calendar },
    { name: "Subjects & Notes", path: "/subjects", icon: BookOpen },
    { name: "Materials", path: "/materials", icon: FileText },
    { name: "Projects & Lab", path: "/coding-lab", icon: Code2 },
    { name: "Question Banks", path: "/imp-questions", icon: HelpCircle },
    { name: "Communities", path: "/community", icon: Users, hasSubmenu: true },
  ];

  const secondaryItems = [
    {
      name: "Exam & Viva Schedule",
      path: "/materials",
      icon: Calendar,
      action: () => openTimetable("viva"),
    },
    { name: "Solved PYQ Papers", path: "/pyq-papers", icon: FileText },
    { name: "Timed Mock Exams", path: "/mock-exam", icon: Trophy },
    { name: "Study Planner", path: "/study-planner", icon: Calendar },
    { name: "Rapid Revision", path: "/rapid-revision", icon: Zap },
    { name: "Formula & Definitions", path: "/formulas", icon: BookOpen },
    { name: "Attendance & SGPA", path: "/calculator", icon: Calculator },
    { name: "Saved Bookmarks", path: "/bookmarks", icon: Bookmark },
    ...(role === "admin" ? [{ name: "Admin Portal", path: "/admin", icon: Shield }] : []),
    { name: "Settings & Profile", path: "/profile", icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground select-none border-r border-sidebar-border">
      {/* Brand Header */}
      <div className="p-4 border-b border-sidebar-border shrink-0 bg-sidebar flex items-center justify-between">
        <Link to="/" onClick={onClose} className="flex items-center gap-2 group">
          <ItmMoocsLogo variant="live" size="md" showTagline={false} />
        </Link>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleFocusMode}
            className="hidden md:flex p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
            title="Minimize Sidebar / Focus Mode (F)"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
              title="Close Sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Institution Context Banner */}
      <div className="px-4 py-2.5 border-b border-sidebar-border flex items-center justify-between bg-secondary/40">
        <div className="flex items-center gap-2 min-w-0">
          <GraduationCap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
          <span className="text-[10px] font-bold text-foreground truncate tracking-tight">
            ITM SLS Baroda University
          </span>
        </div>
        <span className="text-[9px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20 shrink-0">
          HUB
        </span>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-thin">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2 font-display">
            Learning Hub
          </div>
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 relative press ${
                    active
                      ? "bg-primary text-primary-foreground font-bold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    <span>{item.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-sm" />
                    )}
                    {item.hasSubmenu && !active && (
                      <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Resources & Preferences */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-3 mb-2 font-display">
            Tools & Exams
          </div>
          <nav className="space-y-0.5">
            {secondaryItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={(e) => {
                    if (item.action) {
                      e.preventDefault();
                      item.action();
                    }
                    onClose?.();
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 press ${
                    active
                      ? "bg-primary text-primary-foreground font-bold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-3.5 w-3.5 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    <span>{item.name}</span>
                  </div>

                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Academic Status Card */}
        {!user ? (
          <div className="p-3.5 rounded-xl bg-secondary/50 border border-sidebar-border text-xs space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 block font-display">
              Open Course Packs
            </span>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Explore university syllabus notes, C & Java practicals, and solved question banks.
            </p>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-secondary/50 border border-sidebar-border text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-foreground font-display">
                Academic Streak
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
                🔥 {game.streakDays}d Streak
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-2">
              Level {levelInfo.level} · {levelInfo.title}
            </p>
            <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round(levelInfo.progressPercent))}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* User Footer Profile Card */}
      <div className="p-3 border-t border-sidebar-border shrink-0 bg-sidebar">
        {!user ? (
          <div className="p-2.5 rounded-xl bg-secondary/50 border border-sidebar-border space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black text-xs font-display">
                ITM
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-foreground truncate">Guest Student</p>
                <p className="text-[10px] text-muted-foreground truncate">Public Mode</p>
              </div>
            </div>
            <Link
              to="/auth"
              onClick={onClose}
              className="w-full h-8 flex items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold transition-all shadow-sm press"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In / Register</span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-secondary transition-colors cursor-pointer">
            <Link to="/profile" onClick={onClose} className="flex items-center gap-2.5 min-w-0 flex-1">
              <UserAvatar
                avatarUrl={resolveAvatarUrl(profile, user)}
                displayName={profile?.display_name}
                email={user?.email}
                className="w-8 h-8 text-xs ring-1 ring-border"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-foreground truncate leading-tight">
                  {profile?.display_name || user?.email?.split("@")[0] || "Student"}
                </p>
                <p className="text-[10px] text-muted-foreground truncate leading-tight">
                  {role === "admin" ? "Platform Admin" : `Semester ${profile?.semester || 1} · ${profile?.branch ? profile.branch.split(" ")[0] : "CSE"}`}
                </p>
              </div>
            </Link>

            <button
              onClick={() => signOut()}
              title="Sign Out"
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors shrink-0 cursor-pointer press"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:flex flex-col transition-all duration-300 ease-in-out shrink-0 h-full shadow-md z-20 select-none overflow-hidden ${
          isCollapsed ? "w-0 -translate-x-full opacity-0 pointer-events-none border-r-0" : "w-72 translate-x-0 opacity-100"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 slide-up glass-card border-r border-border">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
