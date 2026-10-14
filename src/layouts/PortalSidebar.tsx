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
  LogIn,
  GraduationCap,
  Building2
} from "lucide-react";
import { ItmMoocsLogo } from "@/components/brand/ItmMoocsLogo";
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
    { name: "Projects & Lab", path: "/coding-lab", icon: Code2 },
    { name: "My Reads", path: "/imp-questions", icon: BookOpen },
    { name: "Communities", path: "/community", icon: Users, hasSubmenu: true },
  ];

  const secondaryItems = [
    { name: "Practice Quizzes", path: "/quiz", icon: Trophy },
    { name: "Attendance & SGPA", path: "/calculator", icon: Calculator },
    { name: "Saved Bookmarks", path: "/bookmarks", icon: Bookmark },
    ...(role === "admin" ? [{ name: "Admin Portal", path: "/admin", icon: Shield }] : []),
    { name: "Settings & Profile", path: "/profile", icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#183F36] text-[#E8EDE4] select-none border-r border-[#1D4A3F]">
      {/* Brand Header — ITM Notes */}
      <div className="p-4 border-b border-[#1D4A3F] flex items-center justify-between shrink-0 bg-[#12332C]/60">
        <Link to="/" onClick={onClose} className="flex items-center gap-2 group">
          <ItmMoocsLogo variant="live" size="md" inverted={true} showTagline={true} />
        </Link>

        {onClose && (
          <button 
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-[#A2BAAF] hover:text-white hover:bg-[#1F4A40] transition-colors"
            title="Close Sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Multi-University Institution Context Banner */}
      <div className="px-4 py-2.5 bg-[#12332C]/40 border-b border-[#1D4A3F] flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <GraduationCap className="h-3.5 w-3.5 text-[#D6E85D] shrink-0" />
          <span className="text-[10px] font-bold text-[#F5F1E8] truncate tracking-tight">
            ITM SLS Baroda University
          </span>
        </div>
        <span className="text-[9px] font-semibold text-[#D6E85D] bg-[#D6E85D]/15 px-1.5 py-0.5 rounded border border-[#D6E85D]/30 shrink-0">
          HUB
        </span>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 scrollbar-thin scrollbar-thumb-[#1F4A40]">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#A2BAAF]/70 px-3 mb-2 font-display">
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
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 relative ${
                    active
                      ? "bg-[#224E43] text-[#F5F1E8] font-bold shadow-sm shadow-[#12332C]/30"
                      : "text-[#A2BAAF] hover:text-[#F5F1E8] hover:bg-[#1C463C]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "text-[#D6E85D]" : "text-[#A2BAAF]"}`} />
                    <span>{item.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Small energetic Chartreuse indicator for active item */}
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D6E85D] shadow-sm shadow-[#D6E85D]/50" />
                    )}
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#D6E85D] text-[#183F36]">
                        {item.badge}
                      </span>
                    )}
                    {item.hasSubmenu && !item.badge && !active && (
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
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#A2BAAF]/70 px-3 mb-2 font-display">
            Tools & Records
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
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 relative ${
                    active
                      ? "bg-[#224E43] text-[#F5F1E8] font-bold shadow-sm shadow-[#12332C]/30"
                      : "text-[#A2BAAF] hover:text-[#F5F1E8] hover:bg-[#1C463C]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${active ? "text-[#D6E85D]" : "text-[#A2BAAF]"}`} />
                    <span>{item.name}</span>
                  </div>

                  {active && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6E85D] shadow-sm shadow-[#D6E85D]/50" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Academic Status Card */}
        {!user ? (
          <div className="p-3.5 rounded-2xl bg-[#12332C]/70 border border-[#1D4A3F] text-xs space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-[#D6E85D] tracking-wider block font-display">
              Multi-University Access
            </span>
            <p className="text-[11px] text-[#E8EDE4]/90 font-medium leading-relaxed">
              Explore university syllabus notes, C & Java practicals, and question banks.
            </p>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-[#12332C]/70 border border-[#1D4A3F] text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#F5F1E8] flex items-center gap-1.5 font-display">
                <Sparkles className="h-3.5 w-3.5 text-[#D6E85D]" />
                Academic Focus
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D6E85D]/20 text-[#D6E85D] font-bold border border-[#D6E85D]/30">
                🔥 {game.streakDays}d Streak
              </span>
            </div>
            <p className="text-[11px] text-[#A2BAAF] mb-2 leading-relaxed">
              Level {levelInfo.level} · {levelInfo.title}
            </p>
            <div className="h-1.5 rounded-full bg-[#1F4A40] overflow-hidden">
              <div 
                className="h-full bg-[#D6E85D] rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.round(levelInfo.progressPercent))}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* User Footer Profile Card */}
      <div className="p-3 border-t border-[#1D4A3F] bg-[#12332C]/90 shrink-0">
        {!user ? (
          <div className="p-2.5 rounded-xl bg-[#183F36] border border-[#1D4A3F] space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#D6E85D]/20 text-[#D6E85D] flex items-center justify-center font-black text-xs font-display">
                MOOC
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">Guest Learner</p>
                <p className="text-[10px] text-[#A2BAAF] truncate">Public Preview</p>
              </div>
            </div>
            <Link
              to="/auth"
              onClick={onClose}
              className="w-full h-8 flex items-center justify-center gap-1.5 rounded-lg bg-[#D6E85D] text-[#183F36] text-xs font-bold hover:bg-[#C8DC47] transition-all shadow-sm"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In / Register</span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-xl hover:bg-[#1F4A40]/50 transition-colors">
            <Link to="/profile" onClick={onClose} className="flex items-center gap-2.5 min-w-0 flex-1">
              <UserAvatar
                avatarUrl={resolveAvatarUrl(profile, user)}
                displayName={profile?.display_name}
                email={user?.email}
                className="w-8 h-8 text-xs ring-2 ring-[#D6E85D]/40"
              />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#F5F1E8] truncate leading-tight">
                  {profile?.display_name || user?.email?.split("@")[0] || "Student"}
                </p>
                <p className="text-[10px] text-[#A2BAAF] truncate leading-tight">
                  {role === "admin" ? "Platform Admin" : `Semester ${profile?.semester || 1} · ${profile?.branch ? profile.branch.split(" ")[0] : "CSE"}`}
                </p>
              </div>
            </Link>

            <button
              onClick={() => signOut()}
              title="Sign Out"
              className="p-1.5 rounded-lg text-[#A2BAAF] hover:text-rose-400 hover:bg-[#1F4A40] transition-colors shrink-0 cursor-pointer"
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
          <div className="relative w-72 max-w-[85vw] h-full z-10 animate-slide-in-left shadow-2xl">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
