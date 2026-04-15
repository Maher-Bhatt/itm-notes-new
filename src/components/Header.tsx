import { Link, useNavigate } from "react-router-dom";
import { Search, LogIn, LogOut, User, ChevronLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onSearchOpen: () => void;
  showBack?: boolean;
  backTo?: string;
}

export function Header({ onSearchOpen, showBack, backTo }: HeaderProps) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 apple-vibrancy border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {showBack && (
            <button onClick={() => navigate(backTo || "/")} className="apple-press p-1.5 rounded-lg hover:bg-white/5">
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-[9px] tracking-tight">ITM</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[13px] leading-tight">ITM Notes</span>
              <span className="text-[9px] text-muted-foreground leading-none hidden sm:block">by Velocity Web</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={onSearchOpen} className="apple-press inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[13px] text-muted-foreground hover:bg-white/5 transition-colors">
            <Search className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline text-[10px] bg-white/5 px-1.5 py-0.5 rounded font-mono text-muted-foreground/60 ml-1">⌘K</kbd>
          </button>
          {user ? (
            <div className="flex items-center gap-1">
              <div className="w-7 h-7 rounded-full bg-primary/12 flex items-center justify-center">
                <User className="h-3.5 w-3.5 text-primary" />
              </div>
              <button onClick={() => signOut()} title="Sign out" className="apple-press p-1.5 rounded-lg hover:bg-white/5">
                <LogOut className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            </div>
          ) : (
            <button onClick={() => navigate("/auth")} className="apple-press inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[13px] text-muted-foreground hover:bg-white/5 transition-colors">
              <LogIn className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
