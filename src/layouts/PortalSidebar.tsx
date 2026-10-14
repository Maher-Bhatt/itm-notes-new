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
  Sparkles,
  Award,
  Layers,
  Calendar,
  X,
  LogIn
} from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";
import { UserAvatar, resolveAvatarUrl } from "@/components/UserAvatar";

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

  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Materials", path: "/materials", icon: Layers, badge: "NEW" },
    { name: "Projects", path: "/coding-lab", icon: Code2 },
    { name: "My Reads", path: "/imp-questions", icon: BookOpen },
    { name: "Communities", path: "/community", icon: Users, hasSubmenu: true },
  ];

  const secondaryItems = [
    { name: "Quizzes", path: "/quiz", icon: Trophy },
    { name: "Calculator", path: "/calculator", icon: Calculator },
    { name: "Bookmarks", path: "/bookmarks", icon: Bookmark },
    ...(role === "admin" ? [{ name: "Admin Portal", path: "/admin", icon: Shield }] : []),
    { name: "Settings", path: "/profile", icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0F172A] text-slate-300 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between shrink-0">
        <Link to="/" onClick={onClose} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center">
            <img src={logo} alt="ITM Notes" className="w-full h-full object-contain p-1 invert" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-white font-sans">
                ITM Notes
              </span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold px-1.5 py-0.2 rounded">
                v2.0
              </span>
            </div>
            <span className="text-[10px] text-slate-400 tracking-wide font-medium">
              SLS Baroda University
            </span>
          </div>
        </Link>

        {onClose && (
          <button 
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
            Main Menu
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
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    active
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "text-white" : "text-slate-400"}`} />
                    <span>{item.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-rose-500 text-white animate-pulse">
                        {item.badge}
                      </span>
                    )}
                    {item.hasSubmenu && !item.badge && (
                      <ChevronRight className="h-3.5 w-3.5 opacity-50" />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Resources & Preferences */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
            Academic Hub
          </div>
          <nav className="space-y-1">
            {secondaryItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                    active
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? "text-white" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Academic Status Card */}
        {!user ? (
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-center space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Student Knowledge Hub
            </span>
            <p className="text-[11px] text-slate-300 font-medium leading-relaxed">
              Explore university notes, practical codes, and exam models.
            </p>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-800/80 to-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-white flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                Academic Status
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-400 font-bold border border-amber-400/20">
                🔥 {game.streakDays}d Streak
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2 leading-relaxed">
              Level {levelInfo.level} · {levelInfo.title}
            </p>
            <div className="h-1.5 rounded-full bg-slate-700/60 overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round(levelInfo.progressPercent))}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* User Footer Profile Card */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 shrink-0">
        {!user ? (
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-black text-xs">
                ITM
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">Guest Visitor</p>
                <p className="text-[10px] text-slate-400 truncate">Previewing Portal</p>
              </div>
            </div>
            <Link
              to="/auth"
              onClick={onClose}
              className="w-full h-8 flex items-center justify-center gap-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In / Join</span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-slate-800/50 transition-colors">
            <Link to="/profile" onClick={onClose} className="flex items-center gap-2.5 min-w-0 flex-1">
              <UserAvatar
                avatarUrl={resolveAvatarUrl(profile, user)}
                displayName={profile?.display_name}
                email={user?.email}
                className="w-8 h-8 text-xs ring-2 ring-indigo-400/30"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate leading-tight">
                  {profile?.display_name || user?.email?.split("@")[0] || "Student"}
                </p>
                <p className="text-[10px] text-slate-400 truncate leading-tight">
                  {role === "admin" ? "Director / Admin" : `Semester ${profile?.semester || 1} · ${profile?.branch ? profile.branch.split(" ")[0] : "CS"}`}
                </p>
              </div>
            </Link>

            <button
              onClick={() => signOut()}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
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
      {/* Desktop Persistent Sidebar (Collapsible in Focus Mode) */}
      <aside className={`hidden md:flex flex-col transition-all duration-300 ease-in-out shrink-0 h-full border-r border-slate-800 shadow-xl z-20 select-none overflow-hidden ${
        isCollapsed ? "w-0 -translate-x-full opacity-0 pointer-events-none border-r-0" : "w-60 translate-x-0 opacity-100"
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
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-slide-in-left shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
