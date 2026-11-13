import { memo, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  List,
  Maximize2,
  Minimize2,
  Minus,
  Moon,
  Plus,
  Sun,
  Type,
  X,
} from "lucide-react";
import { LIBRARY } from "@/data/libraryIndex";
import { getProgress, minutesFor, saveProgress } from "@/lib/readingProgress";

/* ───────────────────────── preferences ───────────────────────── */

const PREF_KEY = "cl_reader_prefs_v1";
interface ReaderPrefs {
  size: number; // px
  serif: boolean;
}
const SIZES = [15, 16, 17, 18, 19, 20, 22];

function loadPrefs(): ReaderPrefs {
  try {
    const p = JSON.parse(localStorage.getItem(PREF_KEY) || "{}");
    return { size: SIZES.includes(p.size) ? p.size : 18, serif: p.serif ?? true };
  } catch {
    return { size: 18, serif: true };
  }
}

/* ───────────────────────── headings / toc ───────────────────────── */

interface Heading {
  id: string;
  text: string;
  level: number;
  line: number;
}

function slugify(t: string) {
  return t
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function extractHeadings(md: string): Heading[] {
  const out: Heading[] = [];
  const seen = new Map<string, number>();
  let inCode = false;
  md.split("\n").forEach((line, i) => {
    if (line.startsWith("```")) inCode = !inCode;
    if (inCode) return;
    const m = /^(#{1,3})\s+(.+?)\s*$/.exec(line);
    if (!m) return;
    const text = m[2].replace(/[*_`]/g, "");
    const base = slugify(text) || "section";
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.push({ id: n ? `${base}-${n}` : base, text, level: m[1].length, line: i + 1 });
  });
  return out;
}

function textOf(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textOf).join("");
  if (children && typeof children === "object" && "props" in children) {
    return textOf((children as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

/* ───────────────────────── markdown body ───────────────────────── */

const Article = memo(function Article({ md, headings }: { md: string; headings: Heading[] }) {
  const byLine = useMemo(() => new Map(headings.map((h) => [h.line, h.id])), [headings]);

  const components = useMemo<Components>(() => {
    const heading =
      (Tag: "h1" | "h2" | "h3") =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ node, children }: any) => {
        const id = byLine.get(node?.position?.start?.line) ?? slugify(textOf(children));
        return (
          <Tag id={id} data-reader-heading className="reader-heading scroll-mt-24">
            {children}
          </Tag>
        );
      };
    return {
      h1: heading("h1"),
      h2: heading("h2"),
      h3: heading("h3"),
      img: ({ src, alt }) => (
        <a href={src} target="_blank" rel="noreferrer" className="reader-figure block">
          <img src={src} alt={alt || "Figure"} loading="lazy" decoding="async" />
        </a>
      ),
      table: ({ children }) => (
        <div className="reader-table">
          <table>{children}</table>
        </div>
      ),
      a: ({ href, children }) => (
        <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {children}
        </a>
      ),
    };
  }, [byLine]);

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {md}
    </ReactMarkdown>
  );
});

/* ───────────────────────── page ───────────────────────── */

export default function ReaderPage() {
  const { subjectSlug = "", docSlug = "" } = useParams();
  const navigate = useNavigate();
  const { resolvedTheme, setTheme } = useTheme();

  const subject = LIBRARY.find((s) => s.slug === subjectSlug);
  const docIndex = subject ? subject.docs.findIndex((d) => d.slug === docSlug) : -1;
  const doc = subject && docIndex >= 0 ? subject.docs[docIndex] : undefined;
  const prevDoc = subject && docIndex > 0 ? subject.docs[docIndex - 1] : undefined;
  const nextDoc = subject && docIndex >= 0 && docIndex < subject.docs.length - 1 ? subject.docs[docIndex + 1] : undefined;

  const [md, setMd] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prefs, setPrefs] = useState<ReaderPrefs>(loadPrefs);
  const [focus, setFocus] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pct, setPct] = useState(0);
  const [activeId, setActiveId] = useState<string>("");
  const [barHidden, setBarHidden] = useState(false);
  const [resumed, setResumed] = useState<number | null>(null);
  const lastY = useRef(0);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
  }, [prefs]);

  // load document
  useEffect(() => {
    if (!doc || !subject) return;
    let cancelled = false;
    setMd(null);
    setError(null);
    fetch(`/reading/${subject.slug}/${doc.slug}.md`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((t) => {
        if (!cancelled) setMd(t);
      })
      .catch(() => {
        if (!cancelled) setError("This document could not be loaded. Check your connection and try again.");
      });
    document.title = `${doc.title} · Library · CampusLoop`;
    return () => {
      cancelled = true;
    };
  }, [subject, doc]);

  const headings = useMemo(() => (md ? extractHeadings(md) : []), [md]);
  const tocHeadings = useMemo(() => {
    const levels = [...new Set(headings.map((h) => h.level))].sort();
    const keep = levels.slice(0, 2);
    return headings.filter((h) => keep.includes(h.level));
  }, [headings]);
  const topLevel = tocHeadings.length ? Math.min(...tocHeadings.map((h) => h.level)) : 1;

  // restore position once content is in the DOM
  useEffect(() => {
    if (!md || !subject || !doc) return;
    const saved = getProgress(subject.slug, doc.slug);
    window.scrollTo(0, 0);
    if (saved && saved.pct > 0.02 && saved.pct < 0.97) {
      const id = window.setTimeout(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo(0, saved.pct * max);
        setResumed(saved.pct);
        window.setTimeout(() => setResumed(null), 5000);
      }, 120);
      return () => window.clearTimeout(id);
    }
  }, [md, subject, doc]);

  // scroll tracking: progress, auto-hide bar, active heading
  useEffect(() => {
    if (!md || !subject || !doc) return;
    let raf = 0;
    let saveTimer = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const p = Math.min(1, y / max);
        setPct(p);
        setBarHidden(y > lastY.current && y > 160);
        lastY.current = y;
        const hs = articleRef.current?.querySelectorAll<HTMLElement>("[data-reader-heading]");
        if (hs) {
          let current = "";
          for (const h of hs) {
            if (h.getBoundingClientRect().top < 120) current = h.id;
            else break;
          }
          setActiveId(current);
        }
        window.clearTimeout(saveTimer);
        saveTimer = window.setTimeout(() => saveProgress(subject.slug, doc.slug, p), 400);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      window.clearTimeout(saveTimer);
    };
  }, [md, subject, doc]);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "f") setFocus((v) => !v);
      else if (e.key === "t") setTocOpen((v) => !v);
      else if (e.key === "Escape") {
        setFocus(false);
        setTocOpen(false);
        setSettingsOpen(false);
      } else if (e.key === "+" || e.key === "=") setPrefs((p) => ({ ...p, size: SIZES[Math.min(SIZES.length - 1, SIZES.indexOf(p.size) + 1)] }));
      else if (e.key === "-") setPrefs((p) => ({ ...p, size: SIZES[Math.max(0, SIZES.indexOf(p.size) - 1)] }));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const jumpTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 72, behavior: "smooth" });
    }
    setTocOpen(false);
  }, []);

  if (!subject || !doc) {
    return (
      <div className="min-h-screen grid place-items-center bg-background px-6 text-center">
        <div>
          <p className="text-lg font-semibold text-foreground">Document not found</p>
          <Link to="/library" className="mt-3 inline-block text-sm text-primary underline underline-offset-4">
            Back to the Library
          </Link>
        </div>
      </div>
    );
  }

  const minutesLeft = Math.max(0, Math.round(minutesFor(doc.words) * (1 - pct)));
  const activeHeading = headings.find((h) => h.id === activeId);

  const Toc = (
    <nav aria-label="Contents" className="text-[13px] leading-snug">
      <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">Contents</p>
      <ul className="space-y-px">
        {tocHeadings.map((h) => {
          const isActive = h.id === activeId || (activeHeading && activeHeading.level > h.level && false);
          return (
            <li key={h.id}>
              <button
                type="button"
                onClick={() => jumpTo(h.id)}
                className={`w-full text-left rounded-md px-3 py-1.5 transition-colors cursor-pointer ${
                  h.level === topLevel ? "font-medium" : "pl-6"
                } ${isActive ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"}`}
              >
                {h.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* progress line */}
      <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent" aria-hidden>
        <div className="h-full bg-primary" style={{ width: `${pct * 100}%` }} />
      </div>

      {/* top bar */}
      {!focus && (
        <header
          className={`fixed inset-x-0 top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md transition-transform duration-300 ${
            barHidden && !tocOpen && !settingsOpen ? "-translate-y-full" : "translate-y-0"
          }`}
        >
          <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-3 sm:px-5">
            <button
              type="button"
              onClick={() => navigate(`/library/${subject.slug}`)}
              className="inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
              aria-label="Back to library"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">{subject.short}</span>
            </button>
            <div className="min-w-0 flex-1 px-1">
              <p className="truncate text-sm font-medium text-foreground">{doc.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {activeHeading ? activeHeading.text : doc.kind}
                {!doc.scanned && md && ` · ${minutesLeft} min left`}
              </p>
            </div>
            {tocHeadings.length > 0 && (
              <IconBtn label="Contents (t)" onClick={() => setTocOpen((v) => !v)} className="lg:hidden" active={tocOpen}>
                <List className="h-4 w-4" />
              </IconBtn>
            )}
            <IconBtn label="Text settings" onClick={() => setSettingsOpen((v) => !v)} active={settingsOpen}>
              <Type className="h-4 w-4" />
            </IconBtn>
            <IconBtn label="Toggle theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
              {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </IconBtn>
            <IconBtn label="Focus mode (f)" onClick={() => setFocus(true)}>
              <Maximize2 className="h-4 w-4" />
            </IconBtn>
          </div>

          {settingsOpen && (
            <div className="border-t border-border bg-background">
              <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 text-sm sm:px-6">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Size</span>
                  <IconBtn label="Smaller text (-)" onClick={() => setPrefs((p) => ({ ...p, size: SIZES[Math.max(0, SIZES.indexOf(p.size) - 1)] }))}>
                    <Minus className="h-4 w-4" />
                  </IconBtn>
                  <span className="w-8 text-center tabular-nums">{prefs.size}</span>
                  <IconBtn label="Larger text (+)" onClick={() => setPrefs((p) => ({ ...p, size: SIZES[Math.min(SIZES.length - 1, SIZES.indexOf(p.size) + 1)] }))}>
                    <Plus className="h-4 w-4" />
                  </IconBtn>
                </div>
                <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
                  {[
                    { v: true, l: "Serif" },
                    { v: false, l: "Sans" },
                  ].map((o) => (
                    <button
                      key={o.l}
                      type="button"
                      onClick={() => setPrefs((p) => ({ ...p, serif: o.v }))}
                      className={`rounded-md px-3 py-1 text-sm transition-colors cursor-pointer ${
                        prefs.serif === o.v ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
                      } ${o.v ? "font-reading" : ""}`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Shortcuts: <kbd>f</kbd> focus · <kbd>t</kbd> contents · <kbd>+</kbd>/<kbd>-</kbd> size · <kbd>Esc</kbd> exit
                </p>
              </div>
            </div>
          )}
        </header>
      )}

      {focus && (
        <button
          type="button"
          onClick={() => setFocus(false)}
          className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-4 py-2 text-xs text-muted-foreground shadow-sm backdrop-blur hover:text-foreground transition-colors cursor-pointer"
        >
          <Minimize2 className="h-3.5 w-3.5" /> Exit focus · {Math.round(pct * 100)}%
        </button>
      )}

      {/* mobile toc drawer */}
      {tocOpen && !focus && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/30" onClick={() => setTocOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[85vw] max-w-sm overflow-y-auto border-r border-border bg-background p-3 pt-4">
            <div className="mb-2 flex items-center justify-between px-3">
              <p className="text-sm font-semibold">{doc.title}</p>
              <IconBtn label="Close" onClick={() => setTocOpen(false)}>
                <X className="h-4 w-4" />
              </IconBtn>
            </div>
            {Toc}
          </div>
        </div>
      )}

      <div className={`mx-auto max-w-6xl px-5 sm:px-8 ${focus ? "pt-16" : "pt-24"} pb-24`}>
        <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
          {/* desktop toc */}
          <aside className={`hidden lg:block ${focus ? "invisible" : ""}`}>
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-2 scrollbar-thin">{tocHeadings.length > 0 && Toc}</div>
          </aside>

          <main className="min-w-0">
            <div className="mx-auto max-w-[68ch]">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {subject.short} · {doc.kind}
                {doc.unit != null && ` · Unit ${doc.unit}`}
              </p>
              <h1 className="mt-3 text-3xl sm:text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-foreground">{doc.title}</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                {doc.scanned
                  ? `${doc.pages} handwritten / scanned pages, shown as images`
                  : `${minutesFor(doc.words)} min read · ${doc.words.toLocaleString("en-IN")} words`}
              </p>

              {resumed !== null && (
                <div className="mt-6 flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/60 px-4 py-2.5 text-sm">
                  <span className="text-muted-foreground">Resumed where you left off ({Math.round(resumed * 100)}%)</span>
                  <button
                    type="button"
                    className="font-medium text-primary hover:underline underline-offset-4 cursor-pointer"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      setResumed(null);
                    }}
                  >
                    Start over
                  </button>
                </div>
              )}

              <hr className="my-8 border-border" />

              {error && <p className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{error}</p>}
              {!md && !error && (
                <div className="space-y-3" aria-busy>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="h-4 animate-pulse rounded bg-muted" style={{ width: `${70 + ((i * 37) % 30)}%` }} />
                  ))}
                </div>
              )}

              {md && (
                <div
                  ref={articleRef}
                  className={`reader-prose ${prefs.serif ? "reader-serif" : ""} ${doc.scanned ? "reader-scanned" : ""}`}
                  style={{ fontSize: `${prefs.size}px` }}
                >
                  <Article md={md} headings={headings} />
                </div>
              )}

              {md && (
                <footer className="mt-16 border-t border-border pt-8">
                  <button
                    type="button"
                    onClick={() => {
                      saveProgress(subject.slug, doc.slug, 1, true);
                      setPct(1);
                    }}
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <CheckCircle2 className="h-4 w-4 text-success" /> Mark as finished
                  </button>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {prevDoc ? (
                      <Link to={`/library/${subject.slug}/${prevDoc.slug}`} className="rounded-xl border border-border p-4 hover:border-primary/40 transition-colors">
                        <p className="text-xs text-muted-foreground">Previous</p>
                        <p className="mt-1 text-sm font-medium text-foreground line-clamp-2">{prevDoc.title}</p>
                      </Link>
                    ) : (
                      <span />
                    )}
                    {nextDoc && (
                      <Link
                        to={`/library/${subject.slug}/${nextDoc.slug}`}
                        className="rounded-xl border border-border p-4 text-right hover:border-primary/40 transition-colors"
                      >
                        <p className="text-xs text-muted-foreground">
                          Next <ArrowRight className="inline h-3 w-3" />
                        </p>
                        <p className="mt-1 text-sm font-medium text-foreground line-clamp-2">{nextDoc.title}</p>
                      </Link>
                    )}
                  </div>
                </footer>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  className = "",
  active,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  className?: string;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors cursor-pointer ${
        active ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      } ${className}`}
    >
      {children}
    </button>
  );
}
