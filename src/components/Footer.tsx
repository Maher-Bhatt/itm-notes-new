import { ExternalLink, Globe, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { subjects } from "@/data/subjects";

export function Footer() {
  return (
    <footer className="border-t border-white/5 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-[9px]">ITM</span>
              </div>
              <span className="font-semibold text-sm">ITM Notes</span>
            </Link>
            <p className="text-[13px] text-muted-foreground mb-3 leading-relaxed">
              Premium study notes for ITM University students. Built with{" "}
              <Heart className="inline h-3 w-3 text-destructive" /> by Velocity Web.
            </p>
            <a href="https://www.velocityweb.online" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[13px] text-primary hover:underline">
              <Globe className="h-3 w-3" /> velocityweb.online
            </a>
          </div>

          <div>
            <h4 className="font-semibold text-[13px] mb-3">Quick Links</h4>
            <ul className="space-y-1.5">
              <li><Link to="/" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              {subjects.slice(0, 4).map(s => (
                <li key={s.id}><Link to={`/subject/${s.id}`} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">{s.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[13px] mb-3">More</h4>
            <ul className="space-y-1.5">
              {subjects.slice(4).map(s => (
                <li key={s.id}><Link to={`/subject/${s.id}`} className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">{s.name}</Link></li>
              ))}
              <li><Link to="/" className="text-[13px] text-muted-foreground hover:text-foreground transition-colors">All Subjects</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[13px] mb-3">Team</h4>
            <ul className="space-y-2 text-[13px] text-muted-foreground">
              <li><span className="font-medium text-foreground">Maher Bhatt</span><br />Founder & Developer</li>
              <li><span className="font-medium text-foreground">Anurag Pandey</span><br />Co-Founder & Designer</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-muted-foreground">© {new Date().getFullYear()} ITM Notes by Velocity Web</p>
          <a href="https://www.velocityweb.online" target="_blank" rel="noopener noreferrer" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
            A Velocity Web Product
          </a>
        </div>
      </div>
    </footer>
  );
}
