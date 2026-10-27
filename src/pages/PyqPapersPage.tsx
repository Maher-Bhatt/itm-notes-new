import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  ExternalLink, 
  Printer, 
  CheckCircle2, 
  HelpCircle,
  Download,
  Sparkles
} from 'lucide-react';
import { PYQ_PAPERS, PyqPaper, PyqQuestion } from '@/data/pyqPapersData';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function PyqPapersPage() {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedExamType, setSelectedExamType] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePaperId, setActivePaperId] = useState<string | null>(PYQ_PAPERS[0]?.id || null);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  // Distinct filters
  const subjects = useMemo(() => {
    const map = new Map<string, string>();
    PYQ_PAPERS.forEach(p => map.set(p.subjectCode, p.subjectName));
    return Array.from(map.entries());
  }, []);

  const years = useMemo(() => {
    const set = new Set<number>();
    PYQ_PAPERS.forEach(p => set.add(p.year));
    return Array.from(set).sort((a, b) => b - a);
  }, []);

  const filteredPapers = useMemo(() => {
    return PYQ_PAPERS.filter(p => {
      if (selectedSubject !== 'all' && p.subjectCode !== selectedSubject) return false;
      if (selectedExamType !== 'all' && p.examType !== selectedExamType) return false;
      if (selectedYear !== 'all' && p.year.toString() !== selectedYear) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesSubject = p.subjectName.toLowerCase().includes(q) || p.subjectCode.toLowerCase().includes(q);
        const matchesQuestion = p.questions.some(qn => 
          qn.questionText.toLowerCase().includes(q) || qn.modelSolution.toLowerCase().includes(q)
        );
        if (!matchesSubject && !matchesQuestion) return false;
      }
      return true;
    });
  }, [selectedSubject, selectedExamType, selectedYear, searchQuery]);

  const activePaper = useMemo(() => {
    return PYQ_PAPERS.find(p => p.id === activePaperId) || filteredPapers[0] || null;
  }, [activePaperId, filteredPapers]);

  const toggleSolution = (qId: string) => {
    setExpandedSolutions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const expandAllSolutions = () => {
    if (!activePaper) return;
    const all: Record<string, boolean> = {};
    activePaper.questions.forEach(q => {
      all[q.id] = true;
      q.subQuestions?.forEach((_, idx) => {
        all[`${q.id}-sub-${idx}`] = true;
      });
    });
    setExpandedSolutions(all);
    toast.success('All solutions revealed');
  };

  const collapseAllSolutions = () => {
    setExpandedSolutions({});
    toast.info('All solutions collapsed');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wide">
              Official University PYQ Bank
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 dark:text-indigo-400 font-semibold text-xs">
              100% Solved
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Previous Year Question Papers
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real Mid-Semester (MST-1, MST-2), End-Semester & Remedial papers with verified step-by-step marking schemes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl border border-border/80 bg-card hover:bg-secondary text-foreground text-xs font-semibold flex items-center gap-2 shadow-sm transition-all apple-press"
          >
            <Printer className="h-4 w-4" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-card border border-border/70 p-4 rounded-2xl shadow-sm">
        {/* Subject Filter */}
        <div>
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
            Subject
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full h-10 rounded-xl bg-secondary/50 border border-border px-3 text-xs text-foreground font-medium focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Subjects</option>
            {subjects.map(([code, name]) => (
              <option key={code} value={code}>
                {name} ({code})
              </option>
            ))}
          </select>
        </div>

        {/* Exam Type Filter */}
        <div>
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
            Exam Type
          </label>
          <select
            value={selectedExamType}
            onChange={(e) => setSelectedExamType(e.target.value)}
            className="w-full h-10 rounded-xl bg-secondary/50 border border-border px-3 text-xs text-foreground font-medium focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Exams</option>
            <option value="MST-1">MST-1 (Unit 1 & 2)</option>
            <option value="MST-2">MST-2 (Unit 3 & 4)</option>
            <option value="End-Semester">End-Semester (Full Syllabus)</option>
            <option value="Remedial">Remedial Exam</option>
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
            Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full h-10 rounded-xl bg-secondary/50 border border-border px-3 text-xs text-foreground font-medium focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Years</option>
            {years.map(y => (
              <option key={y} value={y.toString()}>
                {y} Paper
              </option>
            ))}
          </select>
        </div>

        {/* Search inside questions */}
        <div>
          <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block mb-1">
            Search Questions
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="e.g. Dijkstra, Booth, ACID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 rounded-xl bg-secondary/50 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Main Content: Left Papers List, Right Paper Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Papers Selection Pill List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Available Papers ({filteredPapers.length})
            </span>
          </div>

          <div className="space-y-2.5 max-h-[75vh] overflow-y-auto custom-scrollbar pr-1">
            {filteredPapers.map(paper => {
              const isSelected = activePaper?.id === paper.id;
              return (
                <div
                  key={paper.id}
                  onClick={() => setActivePaperId(paper.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer select-none apple-press ${
                    isSelected
                      ? 'bg-primary/10 border-primary shadow-sm ring-1 ring-primary/40'
                      : 'bg-card border-border/80 hover:border-primary/40 hover:bg-secondary/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      paper.examType === 'End-Semester'
                        ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400'
                        : paper.examType === 'Remedial'
                        ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                        : 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                    }`}>
                      {paper.examType} • {paper.year}
                    </span>
                    <span className="text-[11px] font-bold text-foreground">
                      {paper.totalMarks} Marks
                    </span>
                  </div>

                  <h3 className="font-bold text-xs sm:text-sm text-foreground line-clamp-1">
                    {paper.subjectName}
                  </h3>

                  <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-2">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {paper.durationMinutes} mins
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" /> {paper.questions.length} Questions
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredPapers.length === 0 && (
              <div className="p-8 text-center bg-card border border-border rounded-2xl">
                <FileText className="h-8 w-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-xs font-bold text-foreground">No papers matched criteria</p>
                <p className="text-[11px] text-muted-foreground mt-1">
                  Try clearing the search query or changing filters.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Active Paper Viewer */}
        <div className="lg:col-span-8">
          {activePaper ? (
            <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              {/* Paper Header Info */}
              <div className="border-b border-border/70 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-secondary text-primary">
                        {activePaper.subjectCode}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        Semester {activePaper.semester}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                      {activePaper.subjectName}
                    </h2>
                  </div>

                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-extrabold text-foreground block">
                      Max Marks: {activePaper.totalMarks}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Time: {activePaper.durationMinutes} Minutes ({activePaper.dateConducted})
                    </span>
                  </div>
                </div>

                {/* Instructions */}
                <div className="bg-secondary/40 rounded-2xl p-4 border border-border/60 text-xs text-muted-foreground space-y-1">
                  <span className="font-bold text-foreground block mb-1">
                    Instructions to Candidates:
                  </span>
                  {activePaper.instructions.map((inst, i) => (
                    <p key={i} className="flex items-start gap-1.5">
                      <span className="text-primary font-bold">•</span>
                      <span>{inst}</span>
                    </p>
                  ))}
                </div>

                {/* Solution Reveal Controls */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">
                    Paper Pattern: Section-wise full questions with step marking
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={expandAllSolutions}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Reveal All Solutions
                    </button>
                    <span className="text-muted-foreground">•</span>
                    <button
                      onClick={collapseAllSolutions}
                      className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                    >
                      Hide All
                    </button>
                  </div>
                </div>
              </div>

              {/* Questions Stream */}
              <div className="space-y-6">
                {activePaper.questions.map((q, idx) => {
                  const isSolutionOpen = expandedSolutions[q.id];

                  return (
                    <div 
                      key={q.id}
                      className="border border-border/80 rounded-2xl p-5 space-y-4 bg-background/50 hover:border-primary/30 transition-colors"
                    >
                      {/* Question Top Row */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
                            {q.questionNumber}
                          </span>
                          <p className="text-sm font-semibold text-foreground pt-1 leading-relaxed">
                            {q.questionText}
                          </p>
                        </div>
                        <span className="shrink-0 px-2.5 py-1 rounded-xl bg-secondary font-bold text-xs text-foreground">
                          [{q.marks} Marks]
                        </span>
                      </div>

                      {/* Sub-questions if any */}
                      {q.subQuestions && q.subQuestions.length > 0 && (
                        <div className="pl-4 border-l-2 border-border/80 space-y-3 mt-2">
                          {q.subQuestions.map((sub, sIdx) => {
                            const subKey = `${q.id}-sub-${sIdx}`;
                            const isSubOpen = expandedSolutions[subKey];

                            return (
                              <div key={sIdx} className="space-y-2 pt-1">
                                <div className="flex items-start justify-between gap-2">
                                  <p className="text-xs font-medium text-foreground leading-relaxed">
                                    <strong className="text-primary mr-1.5">{sub.optionLabel}</strong>
                                    {sub.questionText}
                                  </p>
                                  <span className="shrink-0 text-[11px] font-bold text-muted-foreground">
                                    [{sub.marks}M]
                                  </span>
                                </div>

                                <div className="flex items-center gap-3">
                                  <button
                                    onClick={() => toggleSolution(subKey)}
                                    className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1"
                                  >
                                    {isSubOpen ? (
                                      <>
                                        <ChevronUp className="h-3 w-3" /> Hide Solution
                                      </>
                                    ) : (
                                      <>
                                        <ChevronDown className="h-3 w-3" /> View Verified Solution
                                      </>
                                    )}
                                  </button>
                                  {sub.linkedTopicUrl && (
                                    <button
                                      onClick={() => navigate(sub.linkedTopicUrl)}
                                      className="text-[11px] font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1"
                                    >
                                      <BookOpen className="h-3 w-3" /> Study in Notes
                                    </button>
                                  )}
                                </div>

                                {isSubOpen && (
                                  <div className="bg-secondary/30 rounded-xl p-3.5 border border-border/70 space-y-2 text-xs animate-scale-in">
                                    <div className="font-mono text-[10px] text-indigo-400 dark:text-indigo-400 font-bold uppercase">
                                      Marking Scheme: {sub.markingScheme}
                                    </div>
                                    <div className="text-foreground/90 whitespace-pre-line leading-relaxed">
                                      {sub.modelSolution}
                                    </div>
                                    {sub.codeSnippet && (
                                      <pre className="p-2.5 rounded-lg bg-black/80 text-indigo-400 font-mono text-[11px] overflow-x-auto">
                                        <code>{sub.codeSnippet}</code>
                                      </pre>
                                    )}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Main Question Solution Toggle */}
                      {q.modelSolution && (
                        <div>
                          <div className="flex items-center justify-between pt-2 border-t border-border/40">
                            <button
                              onClick={() => toggleSolution(q.id)}
                              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1.5"
                            >
                              {isSolutionOpen ? (
                                <>
                                  <ChevronUp className="h-3.5 w-3.5" /> Hide Model Solution
                                </>
                              ) : (
                                <>
                                  <Sparkles className="h-3.5 w-3.5 text-amber-500" /> View Step-by-Step Model Solution
                                </>
                              )}
                            </button>

                            {q.linkedTopicUrl && (
                              <button
                                onClick={() => navigate(q.linkedTopicUrl)}
                                className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center gap-1.5"
                              >
                                <ExternalLink className="h-3.5 w-3.5" /> Read Detailed Topic
                              </button>
                            )}
                          </div>

                          {isSolutionOpen && (
                            <div className="mt-3 bg-secondary/40 rounded-2xl p-4 border border-border/80 space-y-3 text-xs animate-scale-in">
                              <div className="flex items-center justify-between text-[11px] font-bold">
                                <span className="text-indigo-400 dark:text-indigo-400 flex items-center gap-1">
                                  <CheckCircle2 className="h-3.5 w-3.5" /> ITM Examiner Marking Criteria:
                                </span>
                                <span className="text-muted-foreground font-mono">
                                  {q.markingScheme}
                                </span>
                              </div>

                              <div className="text-foreground/90 leading-relaxed whitespace-pre-line text-xs sm:text-sm bg-card p-4 rounded-xl border border-border/60">
                                {q.modelSolution}
                              </div>

                              {q.codeSnippet && (
                                <div>
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase block mb-1">
                                    Executable Code / Syntax:
                                  </span>
                                  <pre className="p-3 rounded-xl bg-black/90 text-indigo-400 font-mono text-xs overflow-x-auto">
                                    <code>{q.codeSnippet}</code>
                                  </pre>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-card border border-border rounded-3xl">
              <p className="text-sm font-semibold text-muted-foreground">Select a paper to view its questions and solutions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
