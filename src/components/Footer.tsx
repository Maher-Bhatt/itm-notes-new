import { Globe, LogOut, LayoutDashboard, User, ExternalLink, GraduationCap, FileText, Code, Calculator, ShieldCheck, Mail, MessageSquare, Phone } from "lucide-react";
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 mb-10">

          {/* About & Identity */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="CampusLoop" className="w-8 h-8 object-contain dark:invert" />
              <div>
                <span className="font-semibold text-base text-foreground tracking-tight block">CampusLoop</span>
                <span className="text-[10px] text-muted-foreground font-semibold">Engineering & Student Study Portal</span>
              </div>
            </Link>

            <p className="text-xs text-muted-foreground leading-relaxed">
              Independent study platform for Indian university students. Verified syllabus notes, question banks, practical coding labs, and attendance calculators.
            </p>

            <div className="space-y-1.5 pt-1 text-xs">
              <a
                href="mailto:support@campusloop.in"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-primary" />
                <span>support@campusloop.in</span>
              </a>
              <a
                href="https://wa.me/919429486337?text=Hi%20CampusLoop%20Support"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-success transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5 text-success" />
                <span>WhatsApp Helpline: +91 94294 86337</span>
              </a>
              <a
                href="tel:+919429486337"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-primary" />
                <span>Tel: +91 94294 86337</span>
              </a>
            </div>

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
                <Link to="/library" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-primary" />
                  <span>Syllabus Notes Library</span>
                </Link>
              </li>
              <li>
                <Link to="/papers" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-primary" />
                  <span>Solved PYQ Papers</span>
                </Link>
              </li>
              <li>
                <Link to="/coding-lab" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <Code className="h-3.5 w-3.5 text-primary" />
                  <span>Practical Coding Lab</span>
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <Calculator className="h-3.5 w-3.5 text-primary" />
                  <span>75% Attendance & SGPA</span>
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

          {/* Legal & DPDP Compliance */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-foreground mb-3 flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              <span>Legal & DPDP 2023</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy (DPDP Act)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms of Service (IT Act)
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-primary transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="hover:text-primary transition-colors">
                  Cookie & Storage Policy
                </Link>
              </li>
              <li>
                <Link to="/data-deletion" className="hover:text-primary transition-colors">
                  Data Deletion Request
                </Link>
              </li>
              <li>
                <Link to="/guidelines" className="hover:text-primary transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Grievance Redressal Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Official University Portals */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-foreground mb-3">
              Official University
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
                  <span>ITM (SLS) Baroda Univ</span>
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
                  <ExternalLink className="h-3.5 w-3.5 text-primary" />
                  <span>Official UMS Portal</span>
                  <ExternalLink className="h-3 w-3 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li className="pt-2">
                <span className="text-[11px] text-muted-foreground leading-normal block">
                  Use official UMS for university fee receipts, official hall tickets, and administrative enrollment.
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
                      <span>My Study Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-1.5 text-xs text-destructive hover:underline pt-1 cursor-pointer"
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
                      Register with Google or your college email to sync study streaks, save bookmarks, and view classmate networks.
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
            <strong>Institutional Disclaimer:</strong> CampusLoop is an independent, student-led study & academic resource portal. It is not an official university administration portal. Official institutional services, fee receipts, and official notifications are maintained at{" "}
            <a href="https://itmbu.ac.in/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              itmbu.ac.in
            </a>{" "}
            and{" "}
            <a href="https://ums.itmbu.ac.in/StudentPanel/StudentDashboard.aspx" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              ums.itmbu.ac.in
            </a>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground pt-2 border-t border-border/40">
            <p>© {new Date().getFullYear()} CampusLoop. All rights reserved.</p>
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
