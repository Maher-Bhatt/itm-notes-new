import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getSubject } from '@/data/subjects';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { 
  Zap, 
  Printer, 
  ChevronLeft, 
  BookOpen, 
  HelpCircle, 
  Award,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function SubjectCheatSheetPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const subject = subjectId ? getSubject(subjectId) : null;
  const [activeUnit, setActiveUnit] = useState<string>('All');

  const allTopics = useMemo(() => {
    if (!subject) return [];
    return subject.units.flatMap((u) => u.topics);
  }, [subject]);

  const units = useMemo(() => {
    if (!subject) return [];
    return ['All', ...subject.units.map((u) => u.title)];
  }, [subject]);

  if (!subject) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-20 text-center">
          <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Subject Not Found</h2>
          <p className="text-muted-foreground mb-6">Cannot find cheat sheet for subject: {subjectId}</p>
          <Link to="/" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold">
            Back to Home
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 animate-fade-in">
        {/* Navigation Breadcrumb */}
        <div className="print-hidden flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to={`/subject/${subject.id}`} className="hover:text-foreground">{subject.name}</Link>
          <span>/</span>
          <span className="text-foreground font-medium">Last-Night Cheat Sheet</span>
        </div>

        {/* Banner Section */}
        <div className="bg-gradient-to-r from-amber-500/10 via-primary/10 to-background border border-amber-500/30 rounded-3xl p-6 sm:p-10 mb-8 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                ⚡ Rapid Cramming Guide
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary text-foreground">
                {subject.code} · Semester {subject.semester}
              </span>
            </div>

            <div className="print-hidden flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-foreground text-background font-bold text-xs inline-flex items-center gap-1.5 shadow-sm hover:opacity-90 apple-press"
              >
                <Printer className="h-4 w-4" /> Print / Save as PDF
              </button>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-foreground mb-3 tracking-tight">
            {subject.name} — Master Cheat Sheet
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-3xl mb-6">
            Everything you need for last-minute exam preparation: condensed formulas, instruction tables, memory hierarchies, normal forms, and hardware flowcharts formatted for fast memorization.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border/60 text-xs">
            <div>
              <p className="text-2xl font-black text-foreground">{subject.units.length}</p>
              <p className="text-muted-foreground font-medium">Syllabus Units</p>
            </div>
            <div>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{allTopics.length}</p>
              <p className="text-muted-foreground font-medium">Core Topics Covered</p>
            </div>
            <div>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                {allTopics.reduce((acc, t) => acc + (t.keyPoints?.length || 0), 0)}
              </p>
              <p className="text-muted-foreground font-medium">High-Yield Key Points</p>
            </div>
            <div>
              <p className="text-2xl font-black text-primary">100%</p>
              <p className="text-muted-foreground font-medium">Exam Coverage</p>
            </div>
          </div>
        </div>

        {/* ── Official Print Header ── */}
        <div className="hidden print-header mb-6">
          <div className="flex justify-between items-center mb-1">
            <span className="font-extrabold text-xl text-black">ITM SLS BARODA UNIVERSITY</span>
            <span className="text-xs text-gray-600 font-bold">B.Tech CSE · Semester 3</span>
          </div>
          <h2 className="text-xl font-black text-black">{subject.name} ({subject.code}) — Master Exam Cheat Sheet</h2>
        </div>

        {/* ── Unit Filter Pills ── */}
        <div className="print-hidden flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider shrink-0 mr-1">
            Filter Unit:
          </span>
          {units.map((u) => (
            <button
              key={u}
              onClick={() => setActiveUnit(u)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all border ${
                activeUnit === u
                  ? 'bg-foreground text-background border-foreground font-bold shadow-sm'
                  : 'bg-card text-muted-foreground border-border hover:text-foreground'
              }`}
            >
              {u}
            </button>
          ))}
        </div>

        {/* ── Units & Fast Revision Cards ── */}
        <div className="space-y-10">
          {subject.units
            .filter((u) => activeUnit === 'All' || u.title === activeUnit)
            .map((unit, uIdx) => (
              <div key={unit.id} className="space-y-4">
                <div className="flex items-center gap-3 pb-2 border-b border-border">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                    {uIdx + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{unit.title}</h3>
                    <p className="text-xs text-muted-foreground">{unit.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {unit.topics.map((t) => (
                    <div
                      key={t.id}
                      className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm hover:border-primary/40 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-bold text-base text-foreground leading-snug">
                            {t.title}
                          </h4>
                          <Link
                            to={`/subject/${subject.id}/topic/${t.id}`}
                            className="print-hidden text-xs text-primary font-semibold hover:underline shrink-0 flex items-center gap-1"
                          >
                            Full Notes <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>

                        {/* Quick Summary */}
                        <p className="text-xs text-muted-foreground leading-relaxed mb-4 p-2.5 rounded-lg bg-secondary/30">
                          {t.simpleExplanation}
                        </p>

                        {/* High-Yield Memorization Bullet Points */}
                        <div className="space-y-1.5 mb-4">
                          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            Must-Know Exam Points:
                          </p>
                          <ul className="space-y-1">
                            {t.keyPoints.map((kp, kIdx) => (
                              <li key={kIdx} className="text-xs text-foreground/90 flex items-start gap-2">
                                <span className="text-amber-500 font-bold shrink-0">•</span>
                                <span className="leading-snug">{kp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Theory Exam Questions Highlights */}
                      {t.theoryQuestions && t.theoryQuestions.length > 0 && (
                        <div className="pt-3 border-t border-border/60 text-xs">
                          <span className="font-semibold text-muted-foreground block mb-1">
                            Repeated Exam Question:
                          </span>
                          <p className="text-foreground font-medium text-xs leading-snug italic">
                            "{t.theoryQuestions[0].question}" ({t.theoryQuestions[0].marks})
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
