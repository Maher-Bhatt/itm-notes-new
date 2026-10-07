import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { 
  Code, Play, CheckCircle2, XCircle, RotateCcw, 
  Lightbulb, Sparkles, BookOpen, Terminal, ChevronRight, 
  Layers, Check, Copy, Flame, Award, HelpCircle, FileText, Search, Filter, Menu
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useGamification } from '@/hooks/useGamification';
import { useAcademic } from '@/contexts/AcademicContext';
import { toast } from 'sonner';
import { CodingProblem, ALL_CODING_PROBLEMS as CODING_PROBLEMS } from '@/data/codingLabData';

export default function CodingLabPage() {
  const { semesterNumber } = useAcademic();
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [searchProblemQuery, setSearchProblemQuery] = useState<string>('');
  
  const [activeProblemId, setActiveProblemId] = useState<string>(CODING_PROBLEMS[0].id);
  const [code, setCode] = useState<string>(CODING_PROBLEMS[0].starterCode);
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'compiling' | 'running' | 'success' | 'failed'>('idle');
  const [showSolution, setShowSolution] = useState(false);
  
  // Left side of workspace tabs
  const [leftTab, setLeftTab] = useState<'specs' | 'hints' | 'history' | 'solution'>('specs');
  
  // Mobile layout state
  const [mobileView, setMobileView] = useState<'list' | 'workspace'>('list');
  const [showFilters, setShowFilters] = useState(false);

  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
  const [submissionHistory, setSubmissionHistory] = useState<Array<{ problemId: string; problemTitle?: string; timestamp: string; passed: boolean }>>([]);

  const { addXp, unlockAchievement } = useGamification();

  useEffect(() => {
    try {
      const savedSolved = localStorage.getItem('itm_coding_lab_solved');
      if (savedSolved) setSolvedProblems(JSON.parse(savedSolved));
      const savedHistory = localStorage.getItem('itm_coding_history');
      if (savedHistory) setSubmissionHistory(JSON.parse(savedHistory));
    } catch {}
  }, []);

  useEffect(() => {
    if (!activeProblemId) return;
    const timer = setTimeout(() => {
      localStorage.setItem(`itm_coding_draft_${activeProblemId}`, code);
    }, 400);
    return () => clearTimeout(timer);
  }, [code, activeProblemId]);

  useEffect(() => {
    const draft = localStorage.getItem(`itm_coding_draft_${activeProblemId}`);
    if (draft !== null) {
      setCode(draft);
    } else {
      const prob = CODING_PROBLEMS.find(p => p.id === activeProblemId);
      if (prob) setCode(prob.starterCode);
    }
  }, [activeProblemId]);

  const availableSubjects = useMemo(() => {
    const map = new Map<string, { name: string; semester: number; count: number }>();
    for (const p of CODING_PROBLEMS) {
      const sem = p.id.startsWith('py1') || p.id.startsWith('wt') ? 1 : 3;
      if (!map.has(p.subjectName)) {
        map.set(p.subjectName, { name: p.subjectName, semester: sem, count: 1 });
      } else {
        map.get(p.subjectName)!.count += 1;
      }
    }
    return Array.from(map.values());
  }, []);

  const filteredProblems = useMemo(() => {
    return CODING_PROBLEMS.filter((p) => {
      const probSem = p.id.startsWith('py1') || p.id.startsWith('wt') ? 1 : 3;
      if (selectedSemester !== 'all' && probSem !== selectedSemester) return false;
      if (selectedSubject !== 'all' && p.subjectName !== selectedSubject) return false;
      if (selectedLanguage !== 'all' && p.language.toLowerCase() !== selectedLanguage.toLowerCase()) return false;
      if (searchProblemQuery.trim()) {
        const q = searchProblemQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.subjectName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedSemester, selectedSubject, selectedLanguage, searchProblemQuery]);

  useEffect(() => {
    if (filteredProblems.length > 0 && !filteredProblems.find(p => p.id === activeProblemId)) {
      setActiveProblemId(filteredProblems[0].id);
      setCode(filteredProblems[0].starterCode);
      setOutput(null);
      setStatus('idle');
      setShowSolution(false);
    }
  }, [filteredProblems, activeProblemId]);

  const currentProblem = useMemo(() => {
    const found = filteredProblems.find(p => p.id === activeProblemId);
    if (found) return found;
    return filteredProblems[0];
  }, [activeProblemId, filteredProblems]);

  const handleSelectProblem = (prob: CodingProblem) => {
    setActiveProblemId(prob.id);
    setCode(prob.starterCode);
    setOutput(null);
    setStatus('idle');
    setShowSolution(false);
    setLeftTab('specs');
    setMobileView('workspace');
  };

  const handleResetCode = () => {
    setCode(currentProblem?.starterCode);
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
      `Subject: ${currentProblem?.subjectName}`,
      `Practical Title: ${currentProblem?.title}`,
      `Marks / Syllabus Reference: ${currentProblem?.marks}`,
      `File Name: ${currentProblem?.fileName} (${currentProblem?.language.toUpperCase()})`,
      `Difficulty Level: ${currentProblem?.difficulty}`,
      `================================================================================`,
      ``,
      `[1. AIM / OBJECTIVE]:`,
      currentProblem?.description,
      ``,
      `[2. CONSTRAINTS & EVALUATION CRITERIA]:`,
      ...(currentProblem?.constraints || []).map(c => `• ${c}`),
      ``,
      `[3. SOURCE CODE / SQL IMPLEMENTATION]:`,
      code || currentProblem?.starterCode,
      ``,
      `[4. EXPECTED OUTPUT / TEST HARNESS RESULTS]:`,
      currentProblem?.expectedOutput,
      ``,
      `[5. SUBMISSION VERIFICATION]:`,
      `Status: ${solvedProblems.includes(currentProblem?.id) ? 'VERIFIED & PASSED (100%)' : 'READY FOR FACULTY SUBMISSION'}`,
      `Verification Engine: ITM Notes University Practical Lab Sandbox`,
      `Export Timestamp: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`,
      `================================================================================`,
    ].join('\n');

    navigator.clipboard.writeText(formattedRecord);
    toast.success('📋 University Practical Record copied! Paste directly into your lab manual or report.');
  };

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
    const isSql = currentProblem?.language === 'sql';
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
        const result = currentProblem?.validator 
          ? currentProblem.validator(code) 
          : { passed: false, output: 'Problem validator not found.' };
        setOutput(result.output);

        if (currentProblem) {
          const record = {
            problemId: currentProblem.id,
            problemTitle: currentProblem.title,
            timestamp: new Date().toISOString(),
            passed: result.passed,
          };
          setSubmissionHistory(prev => {
            const next = [record, ...prev.slice(0, 49)];
            localStorage.setItem('itm_coding_history', JSON.stringify(next));
            return next;
          });
        }

        if (result.passed) {
          setStatus('success');
          try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(523.25, ctx.currentTime);
            osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
            osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);
            osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3);
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
            osc.start();
            osc.stop(ctx.currentTime + 0.6);
          } catch {}

          if (!solvedProblems.includes(currentProblem?.id)) {
            const updated = [...solvedProblems, currentProblem?.id];
            setSolvedProblems(updated);
            localStorage.setItem('itm_coding_lab_solved', JSON.stringify(updated));
            addXp(75, `Solved Practical: ${currentProblem?.title}`);
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

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Header />
      
      {/* Top Header Bar */}
      <div className="bg-card border-b py-3 px-4 sm:px-6 shadow-sm z-10">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="p-2 bg-primary/10 rounded-xl text-primary">
              <Code className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">University Coding Lab</h1>
              <p className="text-xs text-muted-foreground flex items-center gap-2">
                <Award className="h-3 w-3" /> {solvedProblems.length}/{CODING_PROBLEMS.length} Solved
                <span className="text-border">|</span>
                <Flame className="h-3 w-3 text-amber-500" /> +75 XP per Practical
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchProblemQuery}
                onChange={(e) => setSearchProblemQuery(e.target.value)}
                placeholder="Search practicals..."
                className="w-full h-9 pl-9 pr-3 rounded-full border bg-secondary/50 text-sm focus:bg-background focus:ring-1 focus:ring-primary outline-none transition-all"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`h-9 rounded-full px-4 gap-2 ${showFilters ? 'bg-primary text-primary-foreground border-primary' : ''}`}
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Expandable Filters (Premium UI) */}
      {showFilters && (
        <div className="bg-card border-b p-4 shadow-inner animate-in slide-in-from-top-2">
          <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Semester</label>
              <div className="flex flex-wrap gap-2">
                {[{ id: 'all', label: 'All' }, { id: 1, label: 'Sem 1' }, { id: 3, label: 'Sem 3' }].map(sem => (
                  <button
                    key={sem.id}
                    onClick={() => { setSelectedSemester(sem.id as any); setSelectedSubject('all'); }}
                    className={`px-3 py-1.5 rounded-lg border transition-all text-xs font-medium ${
                      selectedSemester === sem.id ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-background hover:bg-secondary'
                    }`}
                  >
                    {sem.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subject</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubject('all')}
                  className={`px-3 py-1.5 rounded-lg border transition-all text-xs font-medium ${
                    selectedSubject === 'all' ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-background hover:bg-secondary'
                  }`}
                >
                  All
                </button>
                {availableSubjects.filter(s => selectedSemester === 'all' || s.semester === selectedSemester).map(subj => (
                  <button
                    key={subj.name}
                    onClick={() => setSelectedSubject(subj.name)}
                    className={`px-3 py-1.5 rounded-lg border transition-all text-xs font-medium ${
                      selectedSubject === subj.name ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-background hover:bg-secondary'
                    }`}
                  >
                    {subj.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Language</label>
              <div className="flex flex-wrap gap-2">
                {['all', 'python', 'c', 'sql', 'java'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1.5 rounded-lg border transition-all text-xs font-medium uppercase ${
                      selectedLanguage === lang ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-background hover:bg-secondary'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout: Split Pane */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row overflow-hidden bg-background">
        
        {/* Mobile View Toggle */}
        <div className="lg:hidden flex border-b bg-card">
          <button 
            onClick={() => setMobileView('list')}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 ${mobileView === 'list' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
          >
            Problems List
          </button>
          <button 
            onClick={() => setMobileView('workspace')}
            className={`flex-1 py-3 text-sm font-semibold border-b-2 ${mobileView === 'workspace' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}
          >
            Workspace
          </button>
        </div>

        {/* Left Sidebar: Problem List */}
        <div className={`w-full lg:w-80 flex-shrink-0 flex-col border-r bg-card/30 ${mobileView === 'list' ? 'flex' : 'hidden lg:flex'} h-[calc(100vh-140px)] lg:h-auto`}>
          <div className="p-3 border-b bg-card/50 flex justify-between items-center sticky top-0 z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Practicals ({filteredProblems.length})</span>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {filteredProblems.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">No practicals found.</div>
            ) : (
              <div className="flex flex-col p-2 gap-1">
                {filteredProblems.map(prob => {
                  const isSelected = prob.id === currentProblem?.id;
                  const isSolved = solvedProblems.includes(prob.id);
                  return (
                    <button
                      key={prob.id}
                      onClick={() => handleSelectProblem(prob)}
                      className={`text-left p-3 rounded-xl transition-all border ${
                        isSelected 
                          ? 'bg-primary/10 border-primary/30 shadow-sm ring-1 ring-primary/20' 
                          : 'bg-card border-transparent hover:border-border hover:bg-secondary/50'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-secondary uppercase text-muted-foreground">
                          {prob.language}
                        </span>
                        {isSolved && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                      </div>
                      <h4 className={`text-sm font-semibold line-clamp-2 ${isSelected ? 'text-foreground' : 'text-foreground/80'}`}>
                        {prob.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-2 text-[10px] font-medium">
                        <span className={`px-1.5 py-0.5 rounded-full ${
                          prob.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-600' :
                          prob.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-600' : 'bg-rose-500/10 text-rose-600'
                        }`}>
                          {prob.difficulty}
                        </span>
                        <span className="text-muted-foreground truncate">{prob.subjectName}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Area: Workspace (Question + IDE Split) */}
        <div className={`flex-1 flex-col overflow-hidden bg-background ${mobileView === 'workspace' ? 'flex' : 'hidden lg:flex'} h-[calc(100vh-140px)] lg:h-[calc(100vh-80px)]`}>
          
          {currentProblem ? (
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              
              {/* Leetcode-style Left Pane: Question / Specs / Solution */}
              <div className="w-full lg:w-[45%] flex flex-col border-b lg:border-b-0 lg:border-r bg-card/20 overflow-hidden">
                <div className="flex items-center overflow-x-auto border-b bg-card scrollbar-none sticky top-0 z-10">
                  {[
                    { id: 'specs', icon: BookOpen, label: 'Description' },
                    { id: 'hints', icon: Lightbulb, label: 'Hints' },
                    { id: 'history', icon: RotateCcw, label: 'Submissions' },
                    { id: 'solution', icon: Sparkles, label: 'Solution' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setLeftTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                        leftTab === tab.id ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      }`}
                    >
                      <tab.icon className="h-3.5 w-3.5" /> {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
                  {leftTab === 'specs' && (
                    <div className="space-y-6 animate-fade-in">
                      <div>
                        <h2 className="text-xl font-bold text-foreground mb-2">{currentProblem.title}</h2>
                        <div className="flex flex-wrap items-center gap-2 text-xs font-medium mb-4">
                          <span className={`px-2 py-1 rounded-full ${
                            currentProblem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-600' :
                            currentProblem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-600' : 'bg-rose-500/10 text-rose-600'
                          }`}>
                            {currentProblem.difficulty}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                            {currentProblem.marks}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                            {currentProblem.subjectName}
                          </span>
                        </div>
                      </div>

                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <p className="text-foreground/90 leading-relaxed whitespace-pre-line text-sm">
                          {currentProblem.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                          <Layers className="h-4 w-4 text-primary" /> Constraints
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          {currentProblem.constraints.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-sm font-bold flex items-center gap-2">
                          <Terminal className="h-4 w-4 text-primary" /> Expected Output Format
                        </h3>
                        <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-300 font-mono text-xs overflow-x-auto border border-zinc-800 shadow-inner">
                          {currentProblem.expectedOutput}
                        </pre>
                      </div>
                    </div>
                  )}

                  {leftTab === 'hints' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-sm flex gap-3 items-start">
                        <Lightbulb className="h-5 w-5 shrink-0 mt-0.5" />
                        <p>Examiner Note: Always check edge cases and follow the exact expected output format to pass the automated tests.</p>
                      </div>
                      {currentProblem.hints.map((hint, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-card border flex items-start gap-3 shadow-sm">
                          <span className="font-bold text-primary">Hint {idx + 1}</span>
                          <p className="text-sm text-foreground/90">{hint}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {leftTab === 'history' && (
                    <div className="space-y-3 animate-fade-in">
                      {submissionHistory.filter(s => s.problemId === currentProblem.id).length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-xl">
                          <p className="text-sm font-medium">No submissions yet.</p>
                          <p className="text-xs mt-1">Run your code to record an attempt.</p>
                        </div>
                      ) : (
                        submissionHistory.filter(s => s.problemId === currentProblem.id).map((sub, idx) => (
                          <div key={idx} className={`p-4 rounded-xl border flex items-center justify-between shadow-sm ${
                            sub.passed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'
                          }`}>
                            <div className="flex items-center gap-3">
                              {sub.passed ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <XCircle className="h-5 w-5 text-rose-500" />}
                              <div>
                                <p className={`text-sm font-bold ${sub.passed ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                                  {sub.passed ? 'Accepted' : 'Wrong Answer / Error'}
                                </p>
                                <p className="text-[10px] text-muted-foreground font-mono">{new Date(sub.timestamp).toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {leftTab === 'solution' && (
                    <div className="animate-fade-in">
                      {!showSolution ? (
                        <div className="text-center py-16 px-4 bg-card border rounded-xl shadow-sm">
                          <HelpCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                          <h3 className="font-bold text-lg mb-2">View Reference Solution?</h3>
                          <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                            It's highly recommended to attempt the problem yourself first to truly master the concept and earn your XP reward.
                          </p>
                          <Button onClick={() => setShowSolution(true)} variant="outline" className="gap-2">
                            <Sparkles className="h-4 w-4" /> Reveal Solution
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-bold">Reference Implementation</h3>
                            <Button variant="ghost" size="sm" onClick={() => handleCopyCode(currentProblem.modelSolution)} className="h-8 text-xs">
                              <Copy className="h-3 w-3 mr-1.5" /> Copy Code
                            </Button>
                          </div>
                          <pre className="p-4 rounded-xl bg-zinc-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-zinc-800 shadow-inner">
                            <code>{currentProblem.modelSolution}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Pane: IDE (Editor + Console) */}
              <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden">
                
                {/* Editor Header */}
                <div className="h-12 flex items-center justify-between px-4 bg-zinc-900 border-b border-zinc-800 shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-rose-500/80"></div>
                      <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                      <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-zinc-300 ml-2 bg-zinc-800 px-2 py-1 rounded">
                      {currentProblem.fileName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleCopyFacultySubmission}
                      className="h-8 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 hidden sm:flex"
                    >
                      <FileText className="h-3.5 w-3.5 mr-1.5" /> Export Lab Record
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleResetCode} className="h-8 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
                      <RotateCcw className="h-3.5 w-3.5 mr-1.5" /> Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleRun}
                      disabled={status === 'compiling' || status === 'running'}
                      className="h-8 text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
                    >
                      {status === 'compiling' || status === 'running' ? (
                        <span className="flex items-center gap-1.5 animate-pulse"><Terminal className="h-3.5 w-3.5" /> Executing...</span>
                      ) : (
                        <span className="flex items-center gap-1.5"><Play className="h-3.5 w-3.5 fill-current" /> Run Code</span>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Editor Body */}
                <div className="flex-1 flex overflow-hidden relative group">
                  <div className="w-10 bg-zinc-900/50 border-r border-zinc-800 text-zinc-600 font-mono text-[11px] py-4 flex flex-col items-center select-none shrink-0 overflow-hidden">
                    {Array.from({ length: Math.max(1, code.split('\n').length) }).map((_, i) => (
                      <div key={i} className="leading-relaxed">{i + 1}</div>
                    ))}
                  </div>
                  <Textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    className="flex-1 w-full h-full p-4 font-mono text-sm bg-transparent border-0 text-zinc-100 resize-none focus-visible:ring-0 leading-relaxed selection:bg-emerald-500/30 rounded-none shadow-none"
                  />
                </div>

                {/* Test Console */}
                <div className="h-48 flex flex-col bg-zinc-950 border-t border-zinc-800 shrink-0">
                  <div className="h-9 px-4 flex items-center justify-between bg-zinc-900 border-b border-zinc-800 shrink-0">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                      <Terminal className="h-3.5 w-3.5" /> Execution Console
                    </span>
                    {status === 'success' && <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Passed</span>}
                    {status === 'failed' && <span className="text-[11px] font-mono text-rose-400 font-bold flex items-center gap-1"><XCircle className="h-3 w-3" /> Failed</span>}
                  </div>
                  <div className="flex-1 p-4 font-mono text-xs text-zinc-300 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                    {output || (
                      <span className="text-zinc-600 italic">
                        {currentProblem.language === 'sql'
                          ? '-- Write your SQL queries above and click "Run Code" to execute them against the validation schema.'
                          : '// Write your code above and click "Run Code" to compile and execute test assertions.'}
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground p-8 flex-col text-center">
              <Code className="h-12 w-12 mb-4 opacity-20" />
              <p className="text-lg font-medium">No Practical Selected</p>
              <p className="text-sm">Choose a problem from the left sidebar to start coding.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
