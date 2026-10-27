import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ChevronLeft, HelpCircle, User, LogOut, Shield, Flame, BookOpen, Trophy, Clock, Calculator, Code, Menu, X, MessageSquare, Bell, Keyboard } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";
import { usePomodoro } from "@/contexts/PomodoroContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { KeyboardShortcutsModal } from "@/components/KeyboardShortcutsModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onSearchOpen?: () => void;
  showBack?: boolean;
  backTo?: string;
}

export function Header({ onSearchOpen, showBack, backTo }: HeaderProps) {
  const navigate = useNavigate();
  const { user, profile, role, signOut } = useAuth();
  const [notifications, setNotifications] = useState<Array<{ id: string; title: string; message: string; timestamp: string; read: boolean }>>(() => {
    try {
      const saved = localStorage.getItem('itm_notifications');
      return saved ? JSON.parse(saved) : [
        {
          id: 'welcome-notif',
          title: 'Welcome to ITM Notes',
          message: 'Explore detailed notes, coding practicals, and university materials.',
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
        console.warn('Failed to parse notifications from localStorage:', e);
      }
    };
    window.addEventListener('itm_notifications_updated', handleUpdate);
    return () => window.removeEventListener('itm_notifications_updated', handleUpdate);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('itm_notifications', JSON.stringify(updated));
  };
  const { state: game, levelInfo } = useGamification();
  const { timeLeft, isRunning, setIsModalOpen } = usePomodoro();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Hamburger Menu Toggle (Mobile Only) */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden p-1.5 -ml-1.5 press rounded-lg text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <Menu className="h-5 w-5" />
            </button>

            {showBack && (
              <button onClick={() => navigate(backTo || "/")} className="press p-2.5 -ml-1 rounded-lg hover:bg-white/10 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}

            <Link to="/" className="flex items-center gap-2 group mr-1">
              <img src={logo} alt="ITM Notes" className="w-7 h-7 object-contain" />
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight text-white">ITM Notes</span>
                <span className="text-[9px] text-white/50 leading-none hidden sm:block">by Velocity Web</span>
              </div>
            </Link>

            {/* Daily Streak Indicator */}
            {user && (
              <button
                onClick={() => navigate("/profile")}
                title={`${game.streakDays} Day Study Streak! Level ${levelInfo.level} ${levelInfo.title}`}
                className="press inline-flex items-center gap-1 px-2 py-1 md:px-2.5 rounded-full text-xs font-bold bg-white/10 text-white hover:bg-white/20 transition-all border border-white/10 mr-0.5"
              >
                <Flame className="h-3.5 w-3.5 text-accent-foreground" />
                <span>{game.streakDays}</span>
                <span className="hidden md:inline text-[10px] text-white/60 font-medium">({game.xp} XP)</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Global Pomodoro Focus Trigger */}
            <button
              onClick={() => setIsModalOpen(true)}
              title={isRunning ? `Focus session active: ${Math.floor(timeLeft / 60)}m left` : "Start Pomodoro Study Focus"}
              className={`press items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all border mr-1 ${
                isRunning
                  ? "inline-flex bg-accent/20 text-accent-foreground border-accent/30 animate-pulse"
                  : "hidden md:inline-flex bg-white/10 text-white/60 border-white/10"
              }`}
            >
              <Clock className={`h-3.5 w-3.5 ${isRunning ? "text-accent-foreground" : "text-primary"}`} />
              <span className="font-mono text-[11px] font-bold">
                {isRunning
                  ? `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`
                  : "Focus"}
              </span>
            </button>

            {/* Materials Navigation */}
            <button
              onClick={() => navigate("/materials")}
              title="Academic Materials Library"
              className="press hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <BookOpen className="h-4 w-4 text-primary" />
              <span>Materials</span>
            </button>

            {/* Practice Quiz */}
            <button
              onClick={() => navigate("/quiz")}
              title="Practice Quiz"
              className="press hidden lg:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span>Quiz</span>
            </button>

            {/* GPA Predictor */}
            <button
              onClick={() => navigate("/calculator")}
              title="SGPA & CGPA Grade Predictor"
              className="press hidden lg:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span>GPA Calc</span>
            </button>

            {/* Coding Lab */}
            <button
              onClick={() => navigate("/coding-lab")}
              title="Practical Coding Lab"
              className="press hidden lg:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Code className="h-4 w-4 text-accent" />
              <span>Coding Lab</span>
            </button>

            {/* Campus Social Feed */}
            <button
              onClick={() => navigate("/community")}
              title="Campus Social Feed & Confessions"
              className="press hidden lg:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
            >
              <MessageSquare className="h-4 w-4 text-primary" />
              <span>Social</span>
            </button>

            {/* IMP Questions */}
            <button
              onClick={() => navigate("/imp-questions")}
              title="IMP Questions"
              className="press hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-sm text-white/60 hover:bg-white/10 transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="hidden lg:inline">IMP Questions</span>
            </button>

            {/* Search */}
            {onSearchOpen && (
              <button onClick={onSearchOpen} className="press hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg text-sm text-white/60 hover:bg-white/10 transition-colors">
                <Search className="h-4 w-4" />
                <span className="hidden lg:inline">Search</span>
              </button>
            )}

            {/* ThemeToggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Keyboard Shortcuts Trigger */}
            <button
              onClick={() => setShortcutsOpen(true)}
              className="press hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors border border-white/10 press"
              title="Keyboard Shortcuts (?)"
            >
              <Keyboard className="h-4 w-4" />
            </button>

            {/* Notification Bell */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="relative press inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 ml-1"
                    title="Campus Notifications"
                  >
                    <Bell className="h-4 w-4 text-white" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-electric text-[9px] font-bold text-white ring-2 ring-background">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 sm:w-80 p-2 max-w-[calc(100vw-2rem)] rounded-2xl shadow-xl border border-white/10 glass-card">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b px-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-white/50">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-primary hover:text-white/80 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="space-y-1.5 max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-xs text-white/50">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-lg text-xs transition-colors border ${n.read ? 'bg-transparent border-transparent text-white/50' : 'bg-primary/5 border-primary/20 text-white font-medium'}`}
                        >
                          <p className="font-semibold">{n.title}</p>
                          <p className="text-[11px] text-white/60 line-clamp-2 mt-0.5">{n.message}</p>
                          <span className="text-[9px] text-white/40 font-mono mt-1 block">
                            {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* User Dropdown / Auth */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="press inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 ml-2 press">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                    ) : (
                      <span className="text-xs font-semibold">
                        {profile?.display_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-2xl shadow-xl border border-white/10 glass-card">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {profile?.display_name && (
                        <p className="font-medium text-white">{profile.display_name}</p>
                      )}
                      <p className="w-[200px] truncate text-sm text-white/60">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {role === 'admin' && (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/admin")} className="press hover:bg-white/5">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="press hover:bg-white/5">
                    <Trophy className="mr-2 h-4 w-4 text-accent-foreground" />
                    <span>My Profile & Rank</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/community")} className="press hover:bg-white/5">
                    <MessageSquare className="mr-2 h-4 w-4 text-primary" />
                    <span>Campus Social & Confessions</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/quiz")} className="lg:hidden press hover:bg-white/5">
                    <HelpCircle className="mr-2 h-4 w-4 text-accent-foreground" />
                    <span>Practice Quiz</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/calculator")} className="press hover:bg-white/5">
                    <Calculator className="mr-2 h-4 w-4 text-primary" />
                    <span>SGPA & CGPA Predictor</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/coding-lab")} className="press hover:bg-white/5">
                    <Code className="mr-2 h-4 w-4 text-accent" />
                    <span>Practical Coding Lab</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="press hover:bg-white/5">
                    <User className="mr-2 h-4 w-4" />
                    <span>My Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="text-destructive hover:bg-white/5 press">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2 ml-1">
                <button
                  onClick={() => navigate("/auth")}
                  className="press inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-xs bg-gradient-electric text-white hover:bg-primary/90 transition-colors font-semibold shadow-lg shadow-primary/20"
                >
                  Sign In
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
      )}

      <div className={`fixed inset-y-0 left-0 w-[280px] bg-background z-[70] transform transition-transform duration-300 md:hidden border-r border-white/10 flex flex-col shadow-2xl ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <img src={logo} alt="ITM Notes" className="w-6 h-6 object-contain" />
            <span className="font-bold text-base leading-tight text-white">ITM Notes</span>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} className="p-2.5 -mr-1.5 rounded-lg hover:bg-white/10 text-white/60 min-w-[44px] min-h-[44px] flex items-center justify-center press">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          {!isRunning && (
            <button
              onClick={() => { setIsModalOpen(true); setIsDrawerOpen(false); }}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium hover:bg-white/10 text-left transition-colors min-h-[44px] press"
            >
              <Clock className="h-5 w-5 text-primary" />
              <span>Start Pomodoro Focus</span>
            </button>
          )}

          <div className="px-3 pt-2 pb-1 text-xs font-bold text-white/50 uppercase tracking-wider">
            Resources & Community
          </div>

          <button onClick={() => { navigate("/community"); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium hover:bg-white/10 text-left transition-colors text-white min-h-[44px] press">
            <MessageSquare className="h-5 w-5 text-primary" />
            <div className="flex items-center justify-between w-full">
              <span>Campus Social & Mask</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-white/10">Feed</span>
            </div>
          </button>

          <button onClick={() => { navigate("/materials"); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium hover:bg-white/10 text-left transition-colors min-h-[44px] press">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Materials</span>
          </button>

          <button onClick={() => { navigate("/imp-questions"); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium hover:bg-white/10 text-left transition-colors min-h-[44px] press">
            <HelpCircle className="h-5 w-5 text-accent-foreground" />
            <span>IMP Questions</span>
          </button>

          <div className="px-3 pt-4 pb-1 text-xs font-bold text-white/50 uppercase tracking-wider">
            Tools
          </div>

          <button onClick={() => { navigate("/quiz"); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium hover:bg-white/10 text-left transition-colors min-h-[44px] press">
            <HelpCircle className="h-5 w-5 text-accent-foreground" />
            <span>Practice Quiz</span>
          </button>

          <button onClick={() => { navigate("/calculator"); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium hover:bg-white/10 text-left transition-colors min-h-[44px] press">
            <Calculator className="h-5 w-5 text-primary" />
            <span>GPA Predictor</span>
          </button>

          <button onClick={() => { navigate("/coding-lab"); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium hover:bg-white/10 text-left transition-colors min-h-[44px] press">
            <Code className="h-5 w-5 text-accent" />
            <span>Coding Lab</span>
          </button>

          {onSearchOpen && (
            <>
              <div className="h-px bg-white/10 my-2 mx-2" />
              <button onClick={() => { onSearchOpen(); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium hover:bg-white/10 text-left transition-colors min-h-[44px] press">
                <Search className="h-5 w-5 text-white/60" />
                <span>Search</span>
              </button>
            </>
          )}
        </div>

        <div className="p-4 border-t border-white/10 flex items-center justify-between bg-white/5" style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
          <span className="text-sm font-medium text-white/50">Theme Settings</span>
          <ThemeToggle />
        </div>
      </div>

      <KeyboardShortcutsModal open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </>
  );
}