import { Link, useNavigate } from "react-router-dom";
import { Search, ChevronLeft, HelpCircle, User, LogOut, Shield } from "lucide-react";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
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

  return (
    <header className="sticky top-0 z-50 apple-vibrancy border-b">
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && (
            <button onClick={() => navigate(backTo || "/")} className="apple-press p-1.5 rounded hover:bg-secondary">
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo} alt="Velocity Web" className="w-7 h-7 object-contain dark:invert" />
            <div className="flex flex-col">
              <span className="font-semibold text-sm leading-tight">ITM Notes</span>
              <span className="text-[9px] text-muted-foreground leading-none hidden sm:block">by Velocity Web</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-1.5">
          {user && (
            <>
              <button
                onClick={() => navigate("/materials")}
                title="Materials Library"
                className="apple-press hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded text-sm text-muted-foreground hover:bg-secondary transition-colors"
              >
                <span>Materials</span>
              </button>
              <button
                onClick={() => navigate("/quiz")}
                title="Practice Quiz"
                className="apple-press hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded text-sm text-muted-foreground hover:bg-secondary transition-colors"
              >
                <span>Quiz</span>
              </button>
            </>
          )}
          <button
            onClick={() => navigate("/imp-questions")}
            title="IMP Questions"
            className="apple-press inline-flex items-center gap-1.5 h-8 px-2.5 rounded text-sm text-muted-foreground hover:bg-secondary transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
            <span className="hidden sm:inline">IMP Questions</span>
          </button>
          {onSearchOpen && (
            <button onClick={onSearchOpen} className="apple-press inline-flex items-center gap-1.5 h-8 px-2.5 rounded text-sm text-muted-foreground hover:bg-secondary transition-colors">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          )}

          <ThemeToggle />

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
            <button
              onClick={() => navigate("/auth")}
              className="apple-press inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-colors ml-2 font-medium"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
