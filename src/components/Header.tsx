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
  const { user, loading, signOut } = useAuth();

  const displayName = user?.user_metadata?.display_name
    || user?.email?.split("@")[0]
    || null;

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
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-[9px] tracking-tight">ITM</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm leading-tight">ITM Notes</span>
              <span className="text-[9px] text-muted-foreground leading-none hidden sm:block">by Velocity Web</span>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={onSearchOpen} className="apple-press inline-flex items-center gap-1.5 h-8 px-2.5 rounded text-sm text-muted-foreground hover:bg-secondary transition-colors">
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </button>

          {!loading && (
            user ? (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1.5 h-8 px-2 rounded bg-secondary">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <User className="h-3 w-3 text-primary" />
                  </div>
                  {displayName && (
                    <span className="hidden sm:inline text-xs font-medium text-foreground/80 max-w-[120px] truncate">
                      {displayName}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => signOut()}
                  title="Sign out"
                  className="apple-press inline-flex items-center gap-1 h-8 px-2 rounded text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button onClick={() => navigate("/auth")} className="apple-press inline-flex items-center gap-1.5 h-8 px-2.5 rounded text-sm text-muted-foreground hover:bg-secondary transition-colors">
                <LogIn className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
}
