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
  Flame,
  Award,
  Layers,
  Calendar,
  X,
  LogIn,
  PanelLeftClose,
  FileText,
  Sparkles,
  GraduationCap,
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
    { name: "Materials", path: "/materials", icon: Layers },
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
    { name: "Rapid Revision", path: "/rapid-revision", icon: Sparkles },
    { name: "Formula & Definition Bank", path: "/formulas", icon: BookOpen },
    { name: "Learning Analytics", path: "/analytics", icon: Award },
    { name: "Practice Quizzes", path: "/quiz", icon: Trophy },
    { name: "Attendance & SGPA", path: "/calculator", icon: Calculator },
    { name: "Saved Bookmarks", path: "/bookmarks", icon: Bookmark },
    ...(role === "admin" ? [{ name: "Admin Portal", path: "/admin", icon: Shield }] : []),
    { name: "Settings & Profile", path: "/profile", icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground select-none border-r border-sidebar-border">
      {/* Brand Header */}
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between shrink-0 bg-sidebar-accent/40">
        <Link to="/" onClick={onClose} className="flex items-center gap-2 group">
          <ItmMoocsLogo variant="live" size="md" inverted={true} showTagline={true} />
        </Link>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleFocusMode}
            className="hidden md:flex p-1.5 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-sidebar-border/50 transition-colors cursor-pointer"
            title="Minimize Sidebar / Focus Mode (F)"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-1.5 rounded-lg text-sidebar-foreground/70 hover:text-white hover:bg-sidebar-border/50 transition-colors"
              title="Close Sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Institution Context Banner */}
      <div className="px-4 py-2.5 bg-sidebar-accent/20 border-b border-sidebar-border flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <GraduationCap className="h-3.5 w-3.5 text-sidebar-primary shrink-0" />
          <span className="text-[10px] font-bold text-sidebar-foreground truncate tracking-tight">
            ITM SLS Baroda University
          </span>
        </div>
        <span className="text-[9px] font-semibold text-sidebar-primary bg-sidebar-primary/15 px-1.5 py-0.5 rounded border border-sidebar-primary/30 shrink-0">
          HUB
        </span>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 scrollbar-thin">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-sidebar-foreground/50 px-3 mb-2 font-display">
            Learning Hub
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 relative ${
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-bold shadow-sm shadow-sidebar-accent/40"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/60"}`} />
                    <span>{item.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-sidebar-primary-foreground shadow-sm" />
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
          <div className="text-[10px] font-bold uppercase tracking-wider text-sidebar-foreground/50 px-3 mb-2 font-display">
            Tools & Exams
          </div>
          <nav className="space-y-1">
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
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-150 relative ${
                    active
                      ? "bg-sidebar-primary text-sidebar-primary-foreground font-bold shadow-sm shadow-sidebar-accent/40"
                      : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "text-sidebar-primary-foreground" : "text-sidebar-foreground/60"}`} />
                    <span>{item.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-sidebar-primary-foreground shadow-sm" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Academic Status Card */}
        {!user ? (
          <div className="p-3.5 rounded-xl bg-sidebar-accent/50 border border-sidebar-border text-xs space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-sidebar-primary tracking-wider block font-display">
              Multi-University Access
            </span>
            <p className="text-[11px] text-sidebar-foreground/90 font-medium leading-relaxed">
              Explore university syllabus notes, C & Java practicals, and question banks.
            </p>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-sidebar-accent/50 border border-sidebar-border text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-sidebar-foreground flex items-center gap-1.5 font-display">
                <Sparkles className="h-3.5 w-3.5 text-sidebar-primary" />
                Academic Focus
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-sidebar-primary/20 text-sidebar-primary font-bold border border-sidebar-primary/30">
                🔥 {game.streakDays}d Streak
              </span>
            </div>
            <p className="text-[11px] text-sidebar-foreground/80 mb-2 leading-relaxed">
              Level {levelInfo.level} · {levelInfo.title}
            </p>
            <div className="h-1.5 rounded-full bg-sidebar-border overflow-hidden">
              <div
                className="h-full bg-sidebar-primary rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round(levelInfo.progressPercent))}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* User Footer Profile Card */}
      <div className="p-3 border-t border-sidebar-border bg-sidebar-accent/60 shrink-0">
        {!user ? (
          <div className="p-2.5 rounded-xl bg-sidebar border border-sidebar-border space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-sidebar-primary/20 text-sidebar-primary flex items-center justify-center font-black text-xs font-display">
                MOOC
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">Guest Learner</p>
                <p className="text-[10px] text-sidebar-foreground/70 truncate">Public Preview</p>
              </div>
            </div>
            <Link
              to="/auth"
              onClick={onClose}
              className="w-full h-8 flex items-center justify-center gap-1.5 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold hover:bg-sidebar-primary/90 transition-all shadow-sm"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In / Register</span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-sidebar-border/50 transition-colors">
            <Link to="/profile" onClick={onClose} className="flex items-center gap-2.5 min-w-0 flex-1">
              <UserAvatar
                avatarUrl={resolveAvatarUrl(profile, user)}
                displayName={profile?.display_name}
                email={user?.email}
                className="w-8 h-8 text-xs ring-2 ring-sidebar-primary/40"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-sidebar-foreground truncate leading-tight">
                  {profile?.display_name || user?.email?.split("@")[0] || "Student"}
                </p>
                <p className="text-[10px] text-sidebar-foreground/70 truncate leading-tight">
                  {role === "admin" ? "Platform Admin" : `Semester ${profile?.semester || 1} · ${profile?.branch ? profile.branch.split(" ")[0] : "CSE"}`}
                </p>
              </div>
            </Link>

            <button
              onClick={() => signOut()}
              title="Sign Out"
              className="p-1.5 rounded-lg text-sidebar-foreground/70 hover:text-sidebar-primary hover:bg-sidebar-border/50 transition-colors shrink-0 cursor-pointer press"
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
      <aside className={`hidden md:flex flex-col transition-all duration-300 ease-in-out shrink-0 h-full shadow-xl z-20 select-none overflow-hidden ${
        isCollapsed ? "w-0 -translate-x-full opacity-0 pointer-events-none border-r-0" : "w-64 translate-x-0 opacity-100"
      }`}>
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="relative w-72 max-w-[85vw] h-full z-10 slide-up shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
