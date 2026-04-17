import { Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { subjects } from "@/data/subjects";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* About */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt="Velocity Web"
                className="h-8 w-auto object-contain"
              />
              <span className="font-semibold text-sm">ITM Notes</span>
            </Link>

            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              A free learning platform for ITM University engineering students. Clear notes, real examples, and practice quizzes.
            </p>

            <a
              href="https://www.velocityweb.online"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <Globe className="h-3 w-3" /> velocityweb.online
            </a>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Subjects</h4>
            <ul className="space-y-2">
              {subjects.map(s => (
                <li key={s.id}>
                  <Link
                    to={`/subject/${s.id}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/auth" className="hover:text-foreground transition-colors">Sign In / Register</Link>
              </li>
              <li className="pt-3 border-t">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Sign in to track progress, bookmark topics, and leave reviews.
                </p>
              </li>
            </ul>
          </div>

          {/* Team */}
          <div>
            <h4 className="font-semibold text-sm mb-3 text-foreground">Team</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground block">Maher Bhatt</span>
                <span className="text-xs">Founder & Developer</span>
              </li>
              <li>
                <span className="font-medium text-foreground block">Anurag Pandey</span>
                <span className="text-xs">Co-Founder & Designer</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t mt-10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} ITM Notes by Velocity Web
          </p>
          <a
            href="https://www.velocityweb.online"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            A Velocity Web Product
          </a>
        </div>
      </div>
    </footer>
  );
}
