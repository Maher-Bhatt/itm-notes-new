import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  HelpCircle, 
  Printer, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { FORMULAS_DATA, FormulaItem } from '@/data/formulasData';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { toast } from 'sonner';

export default function FormulaBankPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    FORMULAS_DATA.forEach(f => set.add(f.category));
    return Array.from(set);
  }, []);

  const filteredFormulas = useMemo(() => {
    return FORMULAS_DATA.filter(f => {
      if (selectedCategory !== 'all' && f.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = f.title.toLowerCase().includes(q);
        const matchesSubject = f.subjectName.toLowerCase().includes(q);
        const matchesExpl = f.explanation.toLowerCase().includes(q);
        const matchesVar = f.variables.some(v => v.symbol.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSubject && !matchesExpl && !matchesVar) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyLatex = (formula: FormulaItem) => {
    navigator.clipboard.writeText(formula.latex);
    setCopiedId(formula.id);
    toast.success('LaTeX code copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wide">
              Official Mathematical Reference
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-semibold text-xs">
              KaTeX Rendered
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Formula & Definition Bank
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Every required formula for Numerical Analysis, Computer Architecture, DSA Complexity, and DBMS Relational Algebra.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl border border-border/80 bg-card hover:bg-secondary text-foreground text-xs font-semibold flex items-center gap-2 shadow-sm transition-all apple-press self-start sm:self-auto"
        >
          <Printer className="h-4 w-4" /> Print Formula Sheet
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-card border border-border/70 p-4 rounded-2xl shadow-sm space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search formulas, variables, or topics (e.g. Newton, AMAT, Simpson, Queue)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-secondary/50 border border-border text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-secondary/40 border-border text-muted-foreground hover:text-foreground'
            }`}
          >
            All Categories ({FORMULAS_DATA.length})
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-secondary/40 border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Formula Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredFormulas.map((f) => {
          const isCopied = copiedId === f.id;

          return (
            <div
              key={f.id}
              className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-4 hover:border-primary/40 transition-all"
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                      {f.subjectCode}
                    </span>
                    <span className="text-[11px] font-semibold text-muted-foreground">
                      {f.category}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-foreground">
                    {f.title}
                  </h3>
                </div>

                <button
                  onClick={() => handleCopyLatex(f)}
                  className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold flex items-center gap-1.5 border border-border/60 transition-all apple-press"
                  title="Copy LaTeX Expression"
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>Copy LaTeX</span>
                    </>
                  )}
                </button>
              </div>

              {/* KaTeX Rendered Formula */}
              <div className="p-4 sm:p-6 rounded-2xl bg-secondary/30 border border-border/70 overflow-x-auto flex items-center justify-center text-center">
                <div className="text-base sm:text-lg text-foreground font-medium py-1">
                  <BlockMath math={f.latex} />
                </div>
              </div>

              {/* Conceptual Explanation */}
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                {f.explanation}
              </p>

              {/* Variables Meaning Breakdown */}
              {f.variables.length > 0 && (
                <div className="pt-2 border-t border-border/60">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                    Variable Definitions:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {f.variables.map((v, vIdx) => (
                      <div
                        key={vIdx}
                        className="p-2 rounded-xl bg-secondary/20 border border-border/50 text-xs flex items-baseline gap-2"
                      >
                        <span className="font-mono font-bold text-primary shrink-0">
                          <InlineMath math={v.symbol} />:
                        </span>
                        <span className="text-muted-foreground leading-tight">
                          {v.meaning}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Exam Tip */}
              {f.examSignificance && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium">
                  <Sparkles className="h-4 w-4 shrink-0 text-amber-500" />
                  <span>Exam Tip: {f.examSignificance}</span>
                </div>
              )}
            </div>
          );
        })}

        {filteredFormulas.length === 0 && (
          <div className="p-12 text-center bg-card border border-border rounded-3xl">
            <BookOpen className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
            <p className="text-sm font-bold text-foreground">No formulas found for "{searchQuery}"</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try searching by subject name or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
