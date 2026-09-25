import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ChevronLeft, HelpCircle, User, LogOut, Shield, Flame, BookOpen, Trophy, Clock, Calculator, Code, Menu, X, MessageSquare } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";
import { usePomodoro } from "@/contexts/PomodoroContext";
import { ThemeToggle } from "@/components/ThemeToggle";
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
  const { state: game, levelInfo } = useGamification();
  const { timeLeft, isRunning, setIsModalOpen } = usePomodoro();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 apple-vibrancy border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Hamburger Menu Toggle (Mobile Only) */}
            <button 
              onClick={() => setIsDrawerOpen(true)} 
              className="md:hidden p-1.5 -ml-1.5 apple-press rounded-md text-muted-foreground hover:bg-secondary"
            >
              <Menu className="h-5 w-5" />
            </button>

            {showBack && (
              <button onClick={() => navigate(backTo || "/")} className="apple-press p-1.5 rounded hover:bg-secondary hidden md:block">
                <ChevronLeft className="h-4 w-4" />
              </button>
            )}

            <Link to="/" className="flex items-center gap-2 group mr-1">
              <img src={logo} alt="Velocity Web" className="w-7 h-7 object-contain dark:invert" />
              <div className="flex flex-col">
                <span className="font-semibold text-sm leading-tight">ITM Notes</span>
                <span className="text-[9px] text-muted-foreground leading-none hidden sm:block">by Velocity Web</span>
              </div>
            </Link>

            {/* Daily Streak Indicator */}
            <button
              onClick={() => navigate("/profile")}
              title={`${game.streakDays} Day Study Streak! Level ${levelInfo.level} ${levelInfo.title}`}
              className="apple-press inline-flex items-center gap-1 px-2 py-1 md:px-2.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-all border border-amber-500/20 mr-0.5"
            >
              <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>{game.streakDays}</span>
              <span className="hidden md:inline text-[10px] text-muted-foreground font-medium">({game.xp} XP)</span>
            </button>
          </div>
          
          <div className="flex items-center gap-1.5">
            {/* Global Pomodoro Focus Trigger - Hidden on mobile if not running */}
            <button
              onClick={() => setIsModalOpen(true)}
              title={isRunning ? `Focus session active: ${Math.floor(timeLeft / 60)}m left` : "Start Pomodoro Study Focus"}
              className={`apple-press items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all border mr-1 ${
                isRunning
                  ? "inline-flex bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 animate-pulse"
                  : "hidden md:inline-flex bg-secondary/80 text-muted-foreground hover:text-foreground border-border/80"
              }`}
            >
              <Clock className={`h-3.5 w-3.5 ${isRunning ? "text-emerald-500" : "text-primary"}`} />
              <span className="font-mono text-[11px] font-bold">
                {isRunning
                  ? `${String(Math.floor(timeLeft / 60)).padStart(2, '0')}:${String(timeLeft % 60).padStart(2, '0')}`
                  : "Focus"}
              </span>
            </button>

            {/* Materials Navigation - Tablet/Desktop */}
            <button
              onClick={() => navigate("/materials")}
              title="Academic Materials Library"
              className="apple-press hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <BookOpen className="h-4 w-4 text-primary" />
              <span>Materials</span>
            </button>

            {/* Practice Quiz - Desktop only */}
            <button
              onClick={() => navigate("/quiz")}
              title="Practice Quiz"
              className="apple-press hidden lg:inline-flex items-center gap-1.5 h-8 px-2.5 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <span>Quiz</span>
            </button>

            {/* GPA Predictor - Desktop only */}
            <button
              onClick={() => navigate("/calculator")}
              title="SGPA & CGPA Grade Predictor"
              className="apple-press hidden lg:inline-flex items-center gap-1.5 h-8 px-2.5 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <span>GPA Calc</span>
            </button>

            {/* Coding Lab - Desktop only */}
            <button
              onClick={() => navigate("/coding-lab")}
              title="Practical Coding Lab"
              className="apple-press hidden lg:inline-flex items-center gap-1.5 h-8 px-2.5 rounded text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <Code className="h-4 w-4 text-emerald-500" />
              <span>Coding Lab</span>
            </button>

            {/* Campus Social Feed - Desktop */}
            <button
              onClick={() => navigate("/community")}
              title="Campus Social Feed & Confessions"
              className="apple-press hidden lg:inline-flex items-center gap-1.5 h-8 px-2.5 rounded text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-foreground hover:bg-secondary transition-colors"
            >
              <MessageSquare className="h-4 w-4 text-purple-500" />
              <span>Social</span>
            </button>

            {/* IMP Questions - Tablet/Desktop */}
            <button
              onClick={() => navigate("/imp-questions")}
              title="IMP Questions"
              className="apple-press hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded text-sm text-muted-foreground hover:bg-secondary transition-colors"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="hidden lg:inline">IMP Questions</span>
            </button>
            
            {/* Search - Tablet/Desktop */}
            {onSearchOpen && (
              <button onClick={onSearchOpen} className="apple-press hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded text-sm text-muted-foreground hover:bg-secondary transition-colors">
                <Search className="h-4 w-4" />
                <span className="hidden lg:inline">Search</span>
              </button>
            )}

            {/* ThemeToggle - Tablet/Desktop */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* User Dropdown / Auth (Always Visible) */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="apple-press inline-flex items-center justify-center h-8 w-8 rounded-full bg-secondary hover:bg-secondary/80 transition-colors ml-2 border">
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                    ) : (
                      <span className="text-xs font-semibold">
                        {profile?.display_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {profile?.display_name && (
                        <p className="font-medium">{profile.display_name}</p>
                      )}
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  {role === 'admin' && (
                    <>
                      <DropdownMenuItem onClick={() => navigate("/admin")}>
                        <Shield className="mr-2 h-4 w-4" />
                        <span>Admin Dashboard</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <Trophy className="mr-2 h-4 w-4 text-amber-500" />
                    <span>My Profile & Rank</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/community")}>
                    <MessageSquare className="mr-2 h-4 w-4 text-purple-500" />
                    <span>Campus Social & Confessions</span>
                  </DropdownMenuItem>
                  {/* Tablet visibility fallbacks for nav items hidden in header */}
                  <DropdownMenuItem onClick={() => navigate("/quiz")} className="lg:hidden">
                    <HelpCircle className="mr-2 h-4 w-4 text-orange-500" />
                    <span>Practice Quiz</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/calculator")}>
                    <Calculator className="mr-2 h-4 w-4 text-primary" />
                    <span>SGPA & CGPA Predictor</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/coding-lab")}>
                    <Code className="mr-2 h-4 w-4 text-emerald-500" />
                    <span>Practical Coding Lab</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="text-destructive focus:bg-destructive/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-1.5 ml-1">
                <button
                  onClick={() => navigate("/profile")}
                  title="My Student Profile"
                  className="apple-press hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-full bg-secondary hover:bg-secondary/80 transition-colors border overflow-hidden"
                >
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-primary">
                      {profile?.display_name?.charAt(0).toUpperCase() || 'M'}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="apple-press inline-flex items-center justify-center gap-1.5 h-8 px-2.5 rounded text-xs bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
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
        <div 
          className="fixed inset-0 bg-black/60 z-[60] md:hidden backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
      
      <div 
        className={`fixed inset-y-0 left-0 w-[280px] bg-background z-[70] transform transition-transform duration-300 md:hidden border-r flex flex-col shadow-2xl ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Velocity Web" className="w-6 h-6 object-contain dark:invert" />
            <span className="font-semibold text-base leading-tight">ITM Notes</span>
          </div>
          <button onClick={() => setIsDrawerOpen(false)} className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          {/* Focus Pill - if not running, let users start it from drawer */}
          {!isRunning && (
            <button 
              onClick={() => { setIsModalOpen(true); setIsDrawerOpen(false); }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary text-left transition-colors"
            >
              <Clock className="h-5 w-5 text-primary" />
              <span>Start Pomodoro Focus</span>
            </button>
          )}
          
          <div className="px-3 pt-2 pb-1 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Resources & Community
          </div>

          <button onClick={() => { navigate("/community"); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary text-left transition-colors text-purple-600 dark:text-purple-400">
            <MessageSquare className="h-5 w-5 text-purple-500" />
            <div className="flex items-center justify-between w-full">
              <span>Campus Social & Mask</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-500/10 font-bold border border-purple-500/20">Live</span>
            </div>
          </button>
          
          <button onClick={() => { navigate("/materials"); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary text-left transition-colors">
            <BookOpen className="h-5 w-5 text-primary" />
            <span>Materials</span>
          </button>
          
          <button onClick={() => { navigate("/imp-questions"); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary text-left transition-colors">
            <HelpCircle className="h-5 w-5 text-blue-500" />
            <span>IMP Questions</span>
          </button>
          
          <div className="px-3 pt-4 pb-1 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Tools
          </div>

          <button onClick={() => { navigate("/quiz"); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary text-left transition-colors">
            <HelpCircle className="h-5 w-5 text-orange-500" />
            <span>Practice Quiz</span>
          </button>

          <button onClick={() => { navigate("/calculator"); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary text-left transition-colors">
            <Calculator className="h-5 w-5 text-primary" />
            <span>GPA Predictor</span>
          </button>

          <button onClick={() => { navigate("/coding-lab"); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary text-left transition-colors">
            <Code className="h-5 w-5 text-emerald-500" />
            <span>Coding Lab</span>
          </button>
          
          {onSearchOpen && (
            <>
              <div className="h-px bg-border my-2 mx-2" />
              <button onClick={() => { onSearchOpen(); setIsDrawerOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-secondary text-left transition-colors">
                <Search className="h-5 w-5 text-muted-foreground" />
                <span>Search</span>
              </button>
            </>
          )}
        </div>
        
        <div className="p-4 border-t flex items-center justify-between bg-muted/20">
          <span className="text-sm font-medium text-muted-foreground">Theme Settings</span>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}
