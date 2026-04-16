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

  // Derive a display name: prefer user_metadata.display_name, fall back to email prefix
  const displayName = user?.user_metadata?.display_name
    || user?.email?.split("@")[0]
    || null;

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

          {/* Render nothing until auth state is resolved to prevent flash */}
          {!loading && (
            user ? (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-1.5 h-7 px-2 rounded-lg bg-primary/8">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <User className="h-3 w-3 text-primary" />
                  </div>
                  {displayName && (
                    <span className="hidden sm:inline text-[12px] font-medium text-foreground/80 max-w-[120px] truncate">
                      {displayName}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => signOut()}
                  title="Sign out"
                  className="apple-press inline-flex items-center gap-1 h-7 px-2 rounded-lg text-[12px] text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button onClick={() => navigate("/auth")} className="apple-press inline-flex items-center gap-1.5 h-7 px-2.5 rounded-lg text-[13px] text-muted-foreground hover:bg-white/5 transition-colors">
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
