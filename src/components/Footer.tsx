import { Globe, LogOut, LayoutDashboard, User, ExternalLink, GraduationCap, FileText, Code, Calculator } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";

export function Footer() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <footer className="border-t border-border/80 bg-card/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-10">

          {/* About & Identity */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="ITM Notes" className="w-8 h-8 object-contain dark:invert" />
              <div>
                <span className="font-extrabold text-base text-foreground tracking-tight block">ITM Notes</span>
                <span className="text-[10px] text-muted-foreground font-semibold">ITM (SLS) Baroda University</span>
              </div>
            </Link>

            <p className="text-xs text-muted-foreground leading-relaxed">
              The independent student study portal for ITM (SLS) Baroda University students. Verified syllabus notes, question banks, practical coding labs, and attendance calculators.
            </p>

            <div className="pt-1">
              <a
                href="https://www.velocityweb.online"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium"
              >
                <Globe className="h-3.5 w-3.5" /> Developed with Velocity Web
              </a>
            </div>
          </div>

          {/* Academic Modules */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-foreground mb-3">
              Academic Resources
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link to="/materials" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-amber-500" />
                  <span>MST Question Banks & Papers</span>
                </Link>
              </li>
              <li>
                <Link to="/coding-lab" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <Code className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Practical Coding Lab</span>
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <Calculator className="h-3.5 w-3.5 text-blue-500" />
                  <span>75% Attendance & SGPA Calculator</span>
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="hover:text-primary transition-colors">
                  Topic Practice Quizzes
                </Link>
              </li>
              <li>
                <Link to="/bookmarks" className="hover:text-primary transition-colors">
                  My Bookmarked Topics
                </Link>
              </li>
            </ul>
          </div>

          {/* Official University Portals */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-foreground mb-3">
              Official University Portals
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <a
                  href="https://itmbu.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1.5 group"
                >
                  <GraduationCap className="h-3.5 w-3.5 text-primary" />
                  <span>ITM (SLS) Baroda University</span>
                  <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a
                  href="https://ums.itmbu.ac.in/StudentPanel/StudentDashboard.aspx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors inline-flex items-center gap-1.5 group"
                >
                  <ExternalLink className="h-3.5 w-3.5 text-amber-500" />
                  <span>Official Student UMS Portal</span>
                  <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li className="pt-2">
                <span className="text-[11px] text-muted-foreground leading-normal block">
                  Use UMS for official university fee payments, grade card downloads, and administrative registration.
                </span>
              </li>
            </ul>
          </div>

          {/* Student Account */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-foreground mb-3">
              Student Account
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              {user ? (
                <>
                  <li>
                    <Link to="/profile" className="flex items-center gap-1.5 hover:text-foreground transition-colors font-medium text-primary">
                      <User className="h-3.5 w-3.5" />
                      <span>{profile?.display_name || user.email?.split('@')[0]}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                      <LayoutDashboard className="h-3.5 w-3.5" />
                      <span>My Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-1.5 text-xs text-destructive hover:underline pt-1"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/auth?mode=login" className="hover:text-primary transition-colors font-semibold text-primary">
                      Student Sign In
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth?mode=signup" className="hover:text-primary transition-colors">
                      Create Account
                    </Link>
                  </li>
                  <li className="pt-2">
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      Register with your email to sync your study streak, save bookmarks, and view verified classmate networks.
                    </p>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="border-t border-border/80 pt-6 space-y-4">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            <strong>Institutional Disclaimer:</strong> ITM Notes is an independent, student-led study & academic resource portal created for students of ITM (SLS) Baroda University. It is not an official university administration website. Official institutional services, fee receipts, and official notifications are maintained at{" "}
            <a href="https://itmbu.ac.in/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              itmbu.ac.in
            </a>{" "}
            and{" "}
            <a href="https://ums.itmbu.ac.in/StudentPanel/StudentDashboard.aspx" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              ums.itmbu.ac.in
            </a>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground pt-2 border-t border-border/40">
            <p>© {new Date().getFullYear()} ITM Notes. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="text-[11px]">Crafted by Maher Bhatt</span>
              <span>•</span>
              <a
                href="https://www.velocityweb.online"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Velocity Web
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
