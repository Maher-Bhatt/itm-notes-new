import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "@/assets/logo.png";
import { ArrowLeft, BookOpen, FileText, Home, LayoutDashboard, Mail } from "lucide-react";
import { setPageMeta } from "@/lib/pageMeta";

export default function NotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setPageMeta({
      title: "404 - Page Not Found | CampusLoop",
      description: "The requested academic resource or study page could not be located.",
      path: location.pathname,
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-background text-foreground selection:bg-primary/20">
      {/* Top Header */}
      <header className="border-b border-border/60 px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logo} alt="CampusLoop" className="w-7 h-7 object-contain rounded-lg" />
          <span className="font-bold text-base tracking-tight text-foreground">CampusLoop</span>
        </Link>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Go back</span>
        </button>
      </header>

      {/* Main 404 Hero */}
      <main className="flex-1 max-w-xl mx-auto w-full px-6 py-16 flex flex-col items-center justify-center text-center">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 font-mono font-bold text-2xl shadow-xs">
          404
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
          This study page could not be found
        </h1>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-md">
          The link you followed may be outdated, or the course syllabus notes may have moved to a newer unit structure.
        </p>

        {/* Quick Help Links */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <Link
            to="/library"
            className="p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 text-left group"
          >
            <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-foreground block group-hover:text-primary transition-colors">
                Study Notes Library
              </span>
              <span className="text-[11px] text-muted-foreground">Browse all B.Tech & BCA units</span>
            </div>
          </Link>

          <Link
            to="/papers"
            className="p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 text-left group"
          >
            <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-foreground block group-hover:text-primary transition-colors">
                Past Question Papers
              </span>
              <span className="text-[11px] text-muted-foreground">Solved university exams</span>
            </div>
          </Link>

          <Link
            to="/dashboard"
            className="p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 text-left group"
          >
            <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-foreground block group-hover:text-primary transition-colors">
                Student Dashboard
              </span>
              <span className="text-[11px] text-muted-foreground">My courses & streak</span>
            </div>
          </Link>

          <Link
            to="/contact"
            className="p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 text-left group"
          >
            <div className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-foreground block group-hover:text-primary transition-colors">
                Contact & Support
              </span>
              <span className="text-[11px] text-muted-foreground">Report a broken link</span>
            </div>
          </Link>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity shadow-xs"
        >
          <Home className="h-4 w-4" />
          <span>Return to Homepage</span>
        </Link>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-muted-foreground border-t border-border/60">
        © {new Date().getFullYear()} CampusLoop · Made with care for university students
      </footer>
    </div>
  );
}
