import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { CampusLoopLogo } from "@/components/campusloop/CampusLoopLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LIBRARY } from "@/data/libraryIndex";

const NAV = [
  { to: "/library", label: "Library" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function PublicHeader() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link to="/" aria-label="CampusLoop home" className="shrink-0">
          <CampusLoopLogo size="sm" />
        </Link>
        <nav aria-label="Main" className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                  isActive ? "bg-foreground text-background font-medium" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <Link to="/dashboard" className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-primary hover:text-primary-foreground transition-colors">
              Open dashboard
            </Link>
          ) : (
            <>
              <Link to="/auth" className="hidden sm:inline-flex rounded-full px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
                Sign in
              </Link>
              <Link to="/library" className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-primary hover:text-primary-foreground transition-colors">
                Start reading
              </Link>
            </>
          )}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary cursor-pointer"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="md:hidden border-t border-border bg-background px-5 py-3">
          {[...NAV, ...(user ? [] : [{ to: "/auth", label: "Sign in" }])].map((n) => (
            <Link key={n.to} to={n.to} className="block rounded-lg px-3 py-2.5 text-[15px] text-foreground hover:bg-secondary">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function PublicFooter() {
  const year = new Date().getFullYear();
  const cols = [
    { title: "Study", links: [{ to: "/library", label: "Library" }, ...LIBRARY.map((s) => ({ to: `/library/${s.slug}`, label: `${s.short} notes` }))] },
    { title: "CampusLoop", links: [{ to: "/about", label: "About" }, { to: "/contact", label: "Contact" }, { to: "/auth", label: "Sign in" }] },
    { title: "Legal", links: [{ to: "/privacy", label: "Privacy policy" }, { to: "/terms", label: "Terms of use" }, { to: "/guidelines", label: "Community guidelines" }] },
  ];
  return (
    <footer className="sidebar-dark mt-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <CampusLoopLogo size="sm" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Free study material and exam tools for B.Tech students, built by students. Read your notes in one calm place.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-foreground/85 hover:text-foreground hover:underline underline-offset-4">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {year} CampusLoop. Course material belongs to its respective authors.</p>
          <p>Made in Vadodara for students everywhere.</p>
        </div>
      </div>
    </footer>
  );
}

/** Layout for public pages. Renders children if given, otherwise the nested route. */
export function PublicLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicHeader />
      <main className="flex-1">{children ?? <Outlet />}</main>
      <PublicFooter />
    </div>
  );
}
