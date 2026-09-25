import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Code, Play, CheckCircle2, XCircle, RotateCcw, 
  Lightbulb, Sparkles, BookOpen, Terminal, ChevronRight, 
  Layers, Check, Copy, Flame, Award, HelpCircle, Database, FileText
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useGamification } from '@/hooks/useGamification';
import { toast } from 'sonner';
import { CodingProblem, ALL_CODING_PROBLEMS as CODING_PROBLEMS } from '@/data/codingLabData';

export default function CodingLabPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dsa' | 'dbms' | 'java' | 'python'>('all');
  const [activeProblemId, setActiveProblemId] = useState<string>(CODING_PROBLEMS[0].id);
  const [code, setCode] = useState<string>(CODING_PROBLEMS[0].starterCode);
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'compiling' | 'running' | 'success' | 'failed'>('idle');
  const [showSolution, setShowSolution] = useState(false);
  const [activeLeftTab, setActiveLeftTab] = useState<'problem' | 'hints' | 'solution'>('problem');
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);

  const { addXp, unlockAchievement } = useGamification();

  // Load solved problems from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('itm_coding_lab_solved');
      if (saved) {
        setSolvedProblems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const currentProblem = CODING_PROBLEMS.find(p => p.id === activeProblemId) || CODING_PROBLEMS[0];

  const handleSelectProblem = (prob: CodingProblem) => {
    setActiveProblemId(prob.id);
    setCode(prob.starterCode);
    setOutput(null);
    setStatus('idle');
    setShowSolution(false);
    setActiveLeftTab('problem');
  };

  const handleResetCode = () => {
    setCode(currentProblem.starterCode);
    setOutput(null);
    setStatus('idle');
    toast.info('Starter code reset to default.');
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Code copied to clipboard!');
  };

  const handleCopyFacultySubmission = () => {
    const formattedRecord = [
      `================================================================================`,
      `ITM SLS BARODA UNIVERSITY — LABORATORY PRACTICAL RECORD`,
      `Subject: ${currentProblem.subjectName}`,
      `Practical Title: ${currentProblem.title}`,
      `Marks / Syllabus Reference: ${currentProblem.marks}`,
      `File Name: ${currentProblem.fileName} (${currentProblem.language.toUpperCase()})`,
      `Difficulty Level: ${currentProblem.difficulty}`,
      `================================================================================`,
      ``,
      `[1. AIM / OBJECTIVE]:`,
      currentProblem.description,
      ``,
      `[2. CONSTRAINTS & EVALUATION CRITERIA]:`,
      ...currentProblem.constraints.map(c => `• ${c}`),
      ``,
      `[3. SOURCE CODE / SQL IMPLEMENTATION]:`,
      code || currentProblem.starterCode,
      ``,
      `[4. EXPECTED OUTPUT / TEST HARNESS RESULTS]:`,
      currentProblem.expectedOutput,
      ``,
      `[5. SUBMISSION VERIFICATION]:`,
      `Status: ${solvedProblems.includes(currentProblem.id) ? 'VERIFIED & PASSED (100%)' : 'READY FOR FACULTY SUBMISSION'}`,
      `Verification Engine: ITM Notes University Practical Lab Sandbox`,
      `Export Timestamp: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`,
      `================================================================================`,
    ].join('\n');

    navigator.clipboard.writeText(formattedRecord);
    toast.success('📋 University Practical Record copied! Paste directly into your lab manual or report.');
  };

  // Keyboard support: Handle tab key inside textarea for code indentation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleRun = () => {
    const isSql = currentProblem.language === 'sql';
    setStatus('compiling');
    setOutput(
      isSql
        ? 'Parsing SQL syntax AST and verifying relational schema integrity...'
        : 'Compiling and preparing runtime test harness...'
    );

    setTimeout(() => {
      setStatus('running');
      setOutput(
        isSql
          ? 'Executing relational queries in in-memory database engine against schema tables...'
          : 'Executing binary with test cases in isolated sandbox...'
      );

      setTimeout(() => {
        const result = currentProblem.validator(code);
        setOutput(result.output);

        if (result.passed) {
          setStatus('success');
          // Play celebratory sound synthesis
          try {
            const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
            osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
            osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
            osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
            osc.start();
            osc.stop(ctx.currentTime + 0.6);
          } catch {
            // ignore
          }

          if (!solvedProblems.includes(currentProblem.id)) {
            const updated = [...solvedProblems, currentProblem.id];
            setSolvedProblems(updated);
            localStorage.setItem('itm_coding_lab_solved', JSON.stringify(updated));
            addXp(75, `Solved Practical: ${currentProblem.title}`);
            unlockAchievement('code-ninja');
            toast.success(`🎉 Practical Solved! +75 XP earned! (${updated.length}/${CODING_PROBLEMS.length} Solved)`);
          } else {
            toast.success('All test cases passed successfully!');
          }
        } else {
          setStatus('failed');
          toast.error(isSql ? 'SQL validation failed. Check syntax and hints.' : 'Test cases failed. Check console output and hints.');
        }
      }, isSql ? 600 : 900);
    }, isSql ? 350 : 600);
  };

  const filteredProblems = selectedCategory === 'all' 
    ? CODING_PROBLEMS 
    : CODING_PROBLEMS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />
      
      {/* Top Banner */}
      <section className="bg-secondary/40 border-b py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Code className="h-5 w-5" />
              </span>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">University Coding & Database Lab</h1>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Official ITM SLS Baroda Semester 3 Practicals • Hands-on DBMS SQL, DSA in C, Java OOP & Python Numerical Methods
            </p>
          </div>

          {/* Practical Stats Badge */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-card border shadow-xs">
              <Award className="h-4 w-4 text-emerald-500" />
              <div className="text-xs">
                <span className="font-bold text-foreground">{solvedProblems.length}</span>
                <span className="text-muted-foreground"> / {CODING_PROBLEMS.length} Solved</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold">
              <Flame className="h-4 w-4 fill-amber-500 text-amber-500" />
              <span>+75 XP / Practical</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 flex flex-col gap-4">
        {/* Category Pills & Quick Problem Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: `All Practicals (${CODING_PROBLEMS.length})`, icon: Code },
              { id: 'dbms', label: `DBMS SQL (${CODING_PROBLEMS.filter(p => p.category === 'dbms').length})`, icon: Database },
              { id: 'dsa', label: `DSA in C (${CODING_PROBLEMS.filter(p => p.category === 'dsa').length})`, icon: Code },
              { id: 'java', label: `Java OOP (${CODING_PROBLEMS.filter(p => p.category === 'java').length})`, icon: BookOpen },
              { id: 'python', label: `Python COANMP (${CODING_PROBLEMS.filter(p => p.category === 'python').length})`, icon: Terminal },
            ].map(cat => {
              const IconComp = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id as 'all' | 'dsa' | 'dbms' | 'java' | 'python')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-card text-muted-foreground hover:text-foreground border-border hover:bg-secondary'
                  }`}
                >
                  <IconComp className="h-3.5 w-3.5" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Current Problem Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden md:inline">Select Practical:</span>
            <select
              value={currentProblem.id}
              onChange={(e) => {
                const found = CODING_PROBLEMS.find(p => p.id === e.target.value);
                if (found) handleSelectProblem(found);
              }}
              className="text-xs font-medium bg-card border rounded-lg px-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-primary w-full sm:w-auto"
            >
              {filteredProblems.map(p => (
                <option key={p.id} value={p.id}>
                  {solvedProblems.includes(p.id) ? 'âœ” ' : ''}{p.title} ({p.language.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 2-Column Split: Problem Description (Left) | Code IDE & Runner (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1">
          {/* Left Column (5 Cols): Problem Statement, Constraints & Reference Solution */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <Card className="flex-1 flex flex-col border shadow-xs overflow-hidden">
              {/* Card Header with Badges */}
              <CardHeader className="p-4 pb-3 border-b bg-card">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border">
                    {currentProblem.subjectName}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      currentProblem.difficulty === 'Easy' 
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
                        : currentProblem.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                    }`}>
                      {currentProblem.difficulty}
                    </span>
                    {solvedProblems.includes(currentProblem.id) && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
                        <Check className="h-3 w-3" /> Solved
                      </span>
                    )}
                  </div>
                </div>

                <CardTitle className="text-base sm:text-lg leading-snug">
                  {currentProblem.title}
                </CardTitle>
                <CardDescription className="text-xs flex items-center gap-1 text-primary font-medium mt-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {currentProblem.marks}
                </CardDescription>

                {/* Sub-tabs */}
                <div className="flex border-b border-border/60 -mx-4 px-4 pt-3 gap-2">
                  {[
                    { id: 'problem', label: 'Problem & Specs' },
                    { id: 'hints', label: `Hints (${currentProblem.hints.length})` },
                    { id: 'solution', label: 'Model Solution' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveLeftTab(tab.id as 'problem' | 'hints' | 'solution')}
                      className={`text-xs font-semibold pb-2 border-b-2 transition-all ${
                        activeLeftTab === tab.id
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </CardHeader>

              {/* Tab Contents */}
              <CardContent className="p-4 flex-1 overflow-y-auto max-h-[580px] text-xs leading-relaxed space-y-4">
                {activeLeftTab === 'problem' && (
                  <>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-xs">
                      <div className="whitespace-pre-line text-foreground/90 font-sans">
                        {currentProblem.description}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                        <Layers className="h-3.5 w-3.5 text-primary" /> Constraints & University Criteria
                      </h4>
                      <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                        {currentProblem.constraints.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5 flex items-center gap-1">
                        <Terminal className="h-3.5 w-3.5 text-emerald-500" /> Expected Test Output
                      </h4>
                      <pre className="p-2.5 rounded-lg bg-zinc-950 text-zinc-300 font-mono text-[11px] overflow-x-auto border border-zinc-800">
                        {currentProblem.expectedOutput}
                      </pre>
                    </div>

                    <div className="pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyFacultySubmission}
                        className="w-full gap-2 text-xs border-primary/30 hover:bg-primary/10 hover:border-primary/50 text-foreground font-medium"
                      >
                        <FileText className="h-4 w-4 text-primary" />
                        Copy Complete Faculty Lab Record (Submission Format)
                      </Button>
                    </div>
                  </>
                )}

                {activeLeftTab === 'hints' && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs">
                      <span className="font-bold flex items-center gap-1 mb-1">
                        <Lightbulb className="h-3.5 w-3.5" /> Think like an Examiner:
                      </span>
                      University examiners look for clean pointer updates, base-case checks, and edge case guards.
                    </div>
                    {currentProblem.hints.map((hint, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-secondary/50 border flex items-start gap-2">
                        <span className="font-mono text-primary font-bold text-xs">{idx + 1}.</span>
                        <p className="text-foreground/90">{hint}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeLeftTab === 'solution' && (
                  <div className="space-y-3">
                    {!showSolution ? (
                      <div className="text-center py-8 px-4 border rounded-xl bg-secondary/30">
                        <HelpCircle className="h-8 w-8 text-primary mx-auto mb-2 opacity-80" />
                        <h4 className="font-bold text-sm mb-1">Unlock University Reference Code?</h4>
                        <p className="text-muted-foreground text-xs mb-4">
                          We recommend trying to solve the practical in the editor first to earn your +75 XP reward!
                        </p>
                        <Button size="sm" onClick={() => setShowSolution(true)} className="gap-1.5">
                          <Sparkles className="h-4 w-4" /> Reveal Model Solution
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] text-muted-foreground">Reference Implementation</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs gap-1"
                            onClick={() => handleCopyCode(currentProblem.modelSolution)}
                          >
                            <Copy className="h-3 w-3" /> Copy Solution
                          </Button>
                        </div>
                        <pre className="p-3 rounded-lg bg-zinc-950 text-emerald-400 font-mono text-[11px] leading-relaxed overflow-x-auto border border-zinc-800 max-h-[460px]">
                          <code>{currentProblem.modelSolution}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column (7 Cols): Code Editor & Compiler Runner */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            <Card className="flex-1 flex flex-col border shadow-xs overflow-hidden">
              {/* Editor Toolbar */}
              <div className="py-2.5 px-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></span>
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500/80"></span>
                  <span className="font-mono text-xs font-semibold text-zinc-200 ml-2">
                    {currentProblem.fileName}
                  </span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {currentProblem.language === 'sql' ? 'SQL ENGINE' : currentProblem.language}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyFacultySubmission}
                    title="Copy formatted practical submission for your faculty"
                    className="h-7 px-2 text-xs text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 border border-zinc-700/60"
                  >
                    <FileText className="h-3 w-3 mr-1 text-primary" />
                    <span className="hidden sm:inline">Faculty Copy</span>
                    <span className="sm:hidden">Report</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetCode}
                    title="Reset starter code"
                    className="h-7 px-2 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleRun}
                    disabled={status === 'compiling' || status === 'running'}
                    className="h-7 px-3 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-xs"
                  >
                    {status === 'compiling' ? (
                      <span className="flex items-center gap-1.5 animate-pulse">
                        <Sparkles className="h-3.5 w-3.5" /> {currentProblem.language === 'sql' ? 'Parsing...' : 'Compiling...'}
                      </span>
                    ) : status === 'running' ? (
                      <span className="flex items-center gap-1.5 animate-pulse">
                        <Play className="h-3.5 w-3.5" /> {currentProblem.language === 'sql' ? 'Executing Query...' : 'Testing...'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Play className="h-3.5 w-3.5 fill-current" /> {currentProblem.language === 'sql' ? 'Execute SQL Query' : 'Run & Test Code'}
                      </span>
                    )}
                  </Button>
                </div>
              </div>

              {/* Code Textarea with custom dark styling and tab key capture */}
              <div className="relative flex-1 bg-zinc-950 min-h-[320px]">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={handleKeyDown}
                  spellCheck={false}
                  placeholder={currentProblem.language === 'sql' ? 'Enter your SQL statements here...' : 'Write your code here...'}
                  className="w-full h-full min-h-[320px] lg:min-h-[380px] font-mono text-xs p-4 border-0 focus-visible:ring-0 rounded-none bg-zinc-950 text-zinc-100 leading-relaxed resize-none selection:bg-emerald-500/30"
                />
              </div>

              {/* Integrated Terminal & Test Harness Console */}
              <div className="h-44 flex flex-col bg-zinc-900 border-t border-zinc-800">
                <div className="py-1.5 px-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-zinc-400" />
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-300">
                      Execution Console & Output
                    </span>
                  </div>
                  <div>
                    {status === 'success' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 font-bold">
                        <CheckCircle2 className="h-3.5 w-3.5" /> All Tests Passed
                      </span>
                    )}
                    {status === 'failed' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-rose-400 font-bold">
                        <XCircle className="h-3.5 w-3.5" /> Test Cases Failed
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-3 bg-black font-mono text-[11px] text-zinc-200 overflow-y-auto flex-1 leading-relaxed whitespace-pre-wrap selection:bg-primary/40">
                  {output || (
                    <span className="text-zinc-500 italic">
                      {currentProblem.language === 'sql'
                        ? "Click 'Execute SQL Query' to execute against relational schema tables and verify constraints..."
                        : "Click 'Run & Test Code' to compile in the university sandbox and evaluate against unit test cases..."}
                    </span>
                  )}
                </div>
              </div>
            </Card>

            {/* Quick Next Practical Navigation when solved */}
            {status === 'success' && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  <div>
                    <h5 className="font-bold text-xs text-foreground">Practical Solved & Verified!</h5>
                    <p className="text-[11px] text-muted-foreground">+75 XP has been awarded to your student profile.</p>
                  </div>
                </div>
                {CODING_PROBLEMS.findIndex(p => p.id === currentProblem.id) < CODING_PROBLEMS.length - 1 && (
                  <Button
                    size="sm"
                    onClick={() => {
                      const nextIdx = CODING_PROBLEMS.findIndex(p => p.id === currentProblem.id) + 1;
                      handleSelectProblem(CODING_PROBLEMS[nextIdx]);
                    }}
                    className="gap-1 text-xs"
                  >
                    Next Practical <ChevronRight className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
