import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Code, Play, CheckCircle2, XCircle, RotateCcw, 
  Lightbulb, Sparkles, BookOpen, Terminal, ChevronRight, 
  Layers, Check, Copy, FileText, Search, Filter
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
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<'editor' | 'specs' | 'hints' | 'solution' | 'history'>('editor');
  
  // To reduce UI clutter, we can hide/show a filter panel
  const [showFilters, setShowFilters] = useState(false);

  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
  const [submissionHistory, setSubmissionHistory] = useState<Array<{ problemId: string; problemTitle?: string; timestamp: string; passed: boolean }>>([]);

  const { addXp, unlockAchievement } = useGamification();

  // Load solved problems and submission history from localStorage
  useEffect(() => {
    try {
      const savedSolved = localStorage.getItem('itm_coding_lab_solved');
      if (savedSolved) setSolvedProblems(JSON.parse(savedSolved));
      const savedHistory = localStorage.getItem('itm_coding_history');
      if (savedHistory) setSubmissionHistory(JSON.parse(savedHistory));
    } catch {
      // ignore
    }
  }, []);

  // Auto-save code draft with debounce
  useEffect(() => {
    if (!activeProblemId) return;
    const timer = setTimeout(() => {
      localStorage.setItem(`itm_coding_draft_${activeProblemId}`, code);
    }, 400);
    return () => clearTimeout(timer);
  }, [code, activeProblemId]);

  // Restore draft or starterCode when activeProblemId changes
  useEffect(() => {
    const draft = localStorage.getItem(`itm_coding_draft_${activeProblemId}`);
    if (draft !== null) {
      setCode(draft);
    } else {
      const prob = CODING_PROBLEMS.find(p => p.id === activeProblemId);
      if (prob) setCode(prob.starterCode);
    }
  }, [activeProblemId]);

  // Derive unique subjects from problems
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

  // Filter problems by Semester, Subject, Language, and Search Query
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
    setActiveWorkspaceTab('editor');
  };

  const handleResetCode = () => {
    setCode(currentProblem?.starterCode);
    setOutput(null);
    setStatus('idle');
    toast.info('Starter code reset to default.', { style: { background: '#050608', color: '#00ff88', border: '1px solid #00ff88' } });
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Code copied to clipboard!', { style: { background: '#050608', color: '#00ff88', border: '1px solid #00ff88' } });
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
    toast.success('University Practical Record copied!', { style: { background: '#050608', color: '#00ff88', border: '1px solid #00ff88' } });
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
            toast.success(`Practical Solved! +75 XP earned!`, { style: { background: '#050608', color: '#00ff88', border: '1px solid #00ff88' } });
          } else {
            toast.success('All test cases passed successfully!', { style: { background: '#050608', color: '#00ff88', border: '1px solid #00ff88' } });
          }
        } else {
          setStatus('failed');
          toast.error(isSql ? 'SQL validation failed. Check syntax and hints.' : 'Test cases failed. Check console output and hints.', { style: { background: '#050608', color: '#ff3366', border: '1px solid #ff3366' } });
        }
      }, isSql ? 600 : 900);
    }, isSql ? 350 : 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050608] text-[#f4f4f5] font-sans selection:bg-[#00ff88]/30">
      <Header />
      
      {/* Brutalist Header / Top Bar */}
      <div className="border-b border-[#333] bg-[#050608] px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#111] border border-[#333] flex items-center justify-center shadow-[0_0_10px_rgba(0,255,136,0.1)]">
            <Terminal className="h-5 w-5 text-[#00ff88]" />
          </div>
          <div>
            <h1 className="text-lg font-mono font-bold tracking-tight text-[#f4f4f5] uppercase">
              // TERMINAL_LAB_ENVIRONMENT
            </h1>
            <p className="text-[10px] font-mono text-[#888] uppercase tracking-widest">
              SECURE CONNECTION ESTABLISHED. READY FOR INPUT.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#666]" />
            <input
              type="text"
              value={searchProblemQuery}
              onChange={(e) => setSearchProblemQuery(e.target.value)}
              placeholder="SEARCH PROTOCOLS..."
              className="w-full h-9 pl-9 pr-3 bg-[#111] border border-[#333] text-xs font-mono text-[#f4f4f5] placeholder-[#666] focus:border-[#00ff88] focus:outline-none transition-colors rounded-none uppercase"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`h-9 px-3 border border-[#333] flex items-center gap-2 font-mono text-xs transition-colors rounded-none ${showFilters ? 'bg-[#00ff88] text-[#050608] border-[#00ff88]' : 'bg-[#111] text-[#f4f4f5] hover:border-[#00ff88] hover:text-[#00ff88]'}`}
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">FILTERS</span>
          </button>
        </div>
      </div>

      {/* Expandable Filter Panel */}
      {showFilters && (
        <div className="bg-[#0a0a0a] border-b border-[#333] p-4 font-mono text-xs animate-in slide-in-from-top-2">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Semester Filter */}
            <div className="space-y-2">
              <span className="text-[#666] uppercase tracking-wider font-bold">1. TARGET_SEMESTER</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all' as const, label: `ALL (${CODING_PROBLEMS.length})` },
                  { id: 1 as const, label: `SEM_1` },
                  { id: 3 as const, label: `SEM_3` },
                ].map((sem) => (
                  <button
                    key={String(sem.id)}
                    onClick={() => { setSelectedSemester(sem.id); setSelectedSubject('all'); }}
                    className={`px-3 py-1.5 border transition-all rounded-none uppercase ${
                      selectedSemester === sem.id
                        ? 'bg-[#00ff88] text-[#050608] border-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.4)]'
                        : 'bg-[#111] text-[#888] border-[#333] hover:border-[#666] hover:text-[#f4f4f5]'
                    }`}
                  >
                    {sem.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject Filter */}
            <div className="space-y-2">
              <span className="text-[#666] uppercase tracking-wider font-bold">2. LOAD_SUBJECT</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSubject('all')}
                  className={`px-3 py-1.5 border transition-all rounded-none uppercase ${
                    selectedSubject === 'all'
                      ? 'bg-[#00ff88] text-[#050608] border-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.4)]'
                      : 'bg-[#111] text-[#888] border-[#333] hover:border-[#666] hover:text-[#f4f4f5]'
                  }`}
                >
                  ALL_SUBJECTS
                </button>
                {availableSubjects
                  .filter(s => selectedSemester === 'all' || s.semester === selectedSemester)
                  .map((subj) => (
                    <button
                      key={subj.name}
                      onClick={() => setSelectedSubject(subj.name)}
                      className={`px-3 py-1.5 border transition-all rounded-none uppercase ${
                        selectedSubject === subj.name
                          ? 'bg-[#00ff88] text-[#050608] border-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.4)]'
                          : 'bg-[#111] text-[#888] border-[#333] hover:border-[#666] hover:text-[#f4f4f5]'
                      }`}
                    >
                      {subj.name.replace(/\s+/g, '_')}
                    </button>
                  ))}
              </div>
            </div>

            {/* Language Filter */}
            <div className="space-y-2">
              <span className="text-[#666] uppercase tracking-wider font-bold">3. COMPILER_ENV</span>
              <div className="flex flex-wrap gap-2">
                {['all', 'python', 'c', 'sql', 'java'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1.5 border transition-all rounded-none uppercase ${
                      selectedLanguage === lang
                        ? 'bg-[#00ff88] text-[#050608] border-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.4)]'
                        : 'bg-[#111] text-[#888] border-[#333] hover:border-[#666] hover:text-[#f4f4f5]'
                    }`}
                  >
                    {lang === 'all' ? 'ALL_ENV' : `ENV_${lang.toUpperCase()}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Layout */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Left Sidebar: Problem List */}
        <aside className="w-full lg:w-[340px] flex-shrink-0 flex flex-col border-r border-[#333] bg-[#050608]">
          <div className="p-3 border-b border-[#333] bg-[#0a0a0a] flex items-center justify-between">
            <span className="font-mono text-[10px] text-[#888] uppercase tracking-widest">
              Available_Protocols [{filteredProblems.length}]
            </span>
            <span className="font-mono text-[10px] text-[#00ff88] uppercase tracking-widest flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> {solvedProblems.length} SOLVED
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-[#0a0a0a]">
            {filteredProblems.length === 0 ? (
              <div className="p-6 text-center text-[#666] font-mono text-xs">
                NO PROTOCOLS FOUND MATCHING CURRENT PARAMETERS.
              </div>
            ) : (
              <div className="flex flex-col">
                {filteredProblems.map((prob) => {
                  const isSelected = prob.id === currentProblem?.id;
                  const isSolved = solvedProblems.includes(prob.id);
                  
                  return (
                    <button
                      key={prob.id}
                      onClick={() => handleSelectProblem(prob)}
                      className={`w-full text-left p-4 border-b border-[#222] transition-colors relative group ${
                        isSelected 
                          ? 'bg-[#111] border-l-2 border-l-[#00ff88]' 
                          : 'bg-[#050608] border-l-2 border-l-transparent hover:bg-[#0a0a0a]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className={`font-mono text-[10px] px-1.5 py-0.5 uppercase ${
                          isSelected ? 'bg-[#00ff88] text-[#050608]' : 'bg-[#222] text-[#888] group-hover:text-[#aaa]'
                        }`}>
                          {prob.language}
                        </span>
                        {isSolved && <Check className="h-4 w-4 text-[#00ff88]" />}
                      </div>
                      <h4 className={`text-sm font-semibold leading-tight line-clamp-2 ${isSelected ? 'text-[#f4f4f5]' : 'text-[#aaa]'}`}>
                        {prob.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-[10px] font-mono uppercase text-[#666]">
                        <span className="truncate max-w-[120px]">{prob.subjectName}</span>
                        <span>•</span>
                        <span className={`${
                          prob.difficulty === 'Easy' ? 'text-[#00ff88]' : 
                          prob.difficulty === 'Medium' ? 'text-[#ffaa00]' : 'text-[#ff3366]'
                        }`}>{prob.difficulty}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {/* Right Area: Code Workspace */}
        <section className="flex-1 flex flex-col bg-[#0a0a0a] overflow-hidden">
          {currentProblem ? (
            <>
              {/* Workspace Header */}
              <div className="p-4 border-b border-[#333] bg-[#050608] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] text-[#00ff88] uppercase tracking-widest border border-[#00ff88]/30 px-1.5 py-0.5 bg-[#00ff88]/5">
                      {currentProblem.subjectName}
                    </span>
                    <span className="font-mono text-[10px] text-[#666] uppercase">
                      ID: {currentProblem.id}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#f4f4f5] tracking-tight">
                    {currentProblem.title}
                  </h2>
                </div>
                
                <Button
                  onClick={handleCopyFacultySubmission}
                  className="rounded-none bg-[#111] border border-[#333] text-[#aaa] hover:bg-[#222] hover:text-[#f4f4f5] font-mono text-xs uppercase"
                >
                  <FileText className="h-3.5 w-3.5 mr-2" />
                  EXPORT_RECORD
                </Button>
              </div>

              {/* Workspace Tabs */}
              <div className="flex items-center px-4 border-b border-[#333] bg-[#050608] overflow-x-auto scrollbar-none">
                {[
                  { id: 'editor', label: 'TERMINAL_EDITOR' },
                  { id: 'specs', label: 'MISSION_SPECS' },
                  { id: 'hints', label: 'DECRYPT_HINTS' },
                  { id: 'solution', label: 'OVERRIDE_SOLUTION' },
                  { id: 'history', label: 'EXECUTION_LOGS' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveWorkspaceTab(tab.id as any)}
                    className={`px-4 py-3 font-mono text-[11px] uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 ${
                      activeWorkspaceTab === tab.id
                        ? 'border-[#00ff88] text-[#00ff88] bg-[#00ff88]/5'
                        : 'border-transparent text-[#666] hover:text-[#f4f4f5] hover:bg-[#111]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Areas */}
              <div className="flex-1 flex flex-col overflow-hidden">
                
                {activeWorkspaceTab === 'specs' && (
                  <div className="p-6 overflow-y-auto font-mono text-sm leading-relaxed text-[#aaa] space-y-8">
                    <div>
                      <h3 className="text-[#00ff88] text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="h-px bg-[#00ff88]/30 flex-1"></span>
                        [ OBJECTIVE_DATA ]
                        <span className="h-px bg-[#00ff88]/30 flex-1"></span>
                      </h3>
                      <p className="whitespace-pre-line bg-[#111] p-4 border border-[#333] text-[#f4f4f5]">
                        {currentProblem.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-[#00ff88] text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="h-px bg-[#00ff88]/30 flex-1"></span>
                        [ PROTOCOL_CONSTRAINTS ]
                        <span className="h-px bg-[#00ff88]/30 flex-1"></span>
                      </h3>
                      <ul className="space-y-2">
                        {currentProblem.constraints.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 bg-[#111] p-3 border border-[#333]">
                            <span className="text-[#666]">{`> `}</span>
                            <span className="text-[#ccc]">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-[#00ff88] text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="h-px bg-[#00ff88]/30 flex-1"></span>
                        [ EXPECTED_TELEMETRY ]
                        <span className="h-px bg-[#00ff88]/30 flex-1"></span>
                      </h3>
                      <pre className="p-4 bg-black border border-[#333] text-[#00ff88] overflow-x-auto selection:bg-[#00ff88]/30">
                        {currentProblem.expectedOutput}
                      </pre>
                    </div>
                  </div>
                )}

                {activeWorkspaceTab === 'hints' && (
                  <div className="p-6 overflow-y-auto font-mono text-sm space-y-4">
                    {currentProblem.hints.map((hint, idx) => (
                      <div key={idx} className="p-4 bg-[#111] border border-[#333] flex items-start gap-3">
                        <span className="text-[#00ff88] font-bold">[{idx + 1}]</span>
                        <p className="text-[#aaa]">{hint}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeWorkspaceTab === 'history' && (
                  <div className="p-6 overflow-y-auto font-mono space-y-4">
                    {submissionHistory.filter(s => s.problemId === currentProblem.id).length === 0 ? (
                      <div className="p-8 text-center text-[#666] border border-dashed border-[#333]">
                        NO EXECUTION LOGS FOUND FOR CURRENT PROTOCOL.
                      </div>
                    ) : (
                      submissionHistory.filter(s => s.problemId === currentProblem.id).map((sub, idx) => (
                        <div key={idx} className={`p-4 border flex items-center justify-between ${
                          sub.passed ? 'bg-[#00ff88]/5 border-[#00ff88]/30 text-[#00ff88]' : 'bg-[#ff3366]/5 border-[#ff3366]/30 text-[#ff3366]'
                        }`}>
                          <div className="flex items-center gap-3">
                            {sub.passed ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                            <div>
                              <div className="text-sm font-bold uppercase tracking-widest">
                                {sub.passed ? 'VERIFICATION_PASSED' : 'VERIFICATION_FAILED'}
                              </div>
                              <div className="text-[10px] text-[#666] mt-1">
                                TIMESTAMP: {new Date(sub.timestamp).toISOString()}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs uppercase tracking-widest bg-black px-2 py-1 border border-current">
                            {sub.passed ? 'SUCCESS_100%' : 'ERROR_FATAL'}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {activeWorkspaceTab === 'solution' && (
                  <div className="p-6 overflow-y-auto font-mono">
                    {!showSolution ? (
                      <div className="text-center p-12 bg-[#111] border border-[#333]">
                        <Lightbulb className="h-10 w-10 text-[#666] mx-auto mb-4" />
                        <h4 className="text-[#f4f4f5] text-lg mb-2 uppercase tracking-widest font-bold">OVERRIDE_AUTHORIZATION_REQUIRED</h4>
                        <p className="text-[#888] text-xs mb-6 max-w-md mx-auto leading-relaxed">
                          WARNING: ACCESSING REFERENCE SOLUTION WILL BYPASS MANUAL LEARNING PROTOCOLS. IT IS RECOMMENDED TO ATTEMPT EXECUTION FIRST.
                        </p>
                        <Button 
                          onClick={() => setShowSolution(true)}
                          className="bg-transparent border border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88] hover:text-black rounded-none uppercase tracking-widest text-xs h-10 px-6"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          AUTHORIZE OVERRIDE
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[#00ff88] text-xs uppercase tracking-widest">[ DECRYPTED_SOLUTION ]</span>
                          <Button 
                            onClick={() => handleCopyCode(currentProblem.modelSolution)}
                            variant="ghost"
                            className="h-8 rounded-none text-[#aaa] hover:text-[#f4f4f5] hover:bg-[#222]"
                          >
                            <Copy className="h-4 w-4 mr-2" /> COPY
                          </Button>
                        </div>
                        <pre className="p-4 bg-black border border-[#333] text-[#f4f4f5] overflow-x-auto text-xs leading-relaxed selection:bg-[#00ff88]/30">
                          <code>{currentProblem.modelSolution}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}

                {/* Editor Tab */}
                {activeWorkspaceTab === 'editor' && (
                  <div className="flex-1 flex flex-col relative bg-[#050608]">
                    
                    {/* Toolbar */}
                    <div className="h-10 flex items-center justify-between px-3 border-b border-[#333] bg-[#0a0a0a]">
                      <div className="flex items-center gap-3 font-mono text-[10px]">
                        <span className="text-[#00ff88] flex items-center gap-1 uppercase tracking-widest">
                          <Code className="h-3 w-3" /> {currentProblem.fileName}
                        </span>
                        <span className="text-[#666]">|</span>
                        <span className="text-[#888] uppercase tracking-widest">{currentProblem.language}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          onClick={handleResetCode}
                          className="h-7 rounded-none px-2 text-[#888] hover:text-white hover:bg-[#222] font-mono text-[10px] uppercase tracking-widest"
                        >
                          <RotateCcw className="h-3 w-3 mr-1.5" /> RESET
                        </Button>
                        <Button
                          onClick={handleRun}
                          disabled={status === 'compiling' || status === 'running'}
                          className={`h-7 rounded-none px-4 font-mono text-[10px] uppercase tracking-widest transition-all ${
                            status === 'compiling' || status === 'running'
                              ? 'bg-[#222] text-[#666] border border-[#333]'
                              : 'bg-[#00ff88] text-black border border-[#00ff88] hover:bg-[#00cc6a] hover:border-[#00cc6a] shadow-[0_0_10px_rgba(0,255,136,0.2)]'
                          }`}
                        >
                          {(status === 'compiling' || status === 'running') ? (
                            <span className="flex items-center gap-1.5 animate-pulse">
                              <Terminal className="h-3 w-3" /> EXECUTING...
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 font-bold">
                              <Play className="h-3 w-3 fill-current" /> EXECUTE_CODE
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Textarea Area */}
                    <div className="flex-1 flex overflow-hidden">
                      {/* Line Numbers */}
                      <div className="w-12 bg-[#0a0a0a] border-r border-[#333] text-[#555] font-mono text-xs py-4 flex flex-col items-end pr-2 select-none">
                        {Array.from({ length: Math.max(1, code.split('\n').length) }).map((_, i) => (
                          <div key={i} className="leading-relaxed">{i + 1}</div>
                        ))}
                      </div>
                      <Textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyDown={handleKeyDown}
                        spellCheck={false}
                        className="flex-1 font-mono text-sm p-4 bg-transparent border-none text-[#e0e0e0] resize-none focus-visible:ring-0 leading-relaxed selection:bg-[#00ff88]/30 rounded-none h-full"
                      />
                    </div>

                    {/* Terminal Output */}
                    <div className="h-48 flex flex-col border-t border-[#333] bg-black">
                      <div className="h-8 flex items-center px-3 border-b border-[#333] bg-[#0a0a0a]">
                        <span className="font-mono text-[10px] text-[#888] uppercase tracking-widest flex items-center gap-1.5">
                          <Terminal className="h-3 w-3 text-[#00ff88]" /> OUTPUT_CONSOLE
                        </span>
                      </div>
                      <div className="flex-1 p-3 font-mono text-xs leading-relaxed text-[#aaa] overflow-y-auto selection:bg-[#00ff88]/30">
                        {output || (
                          <span className="text-[#444]">
                            &gt; _ WAITING FOR EXECUTION COMMAND...
                          </span>
                        )}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center font-mono text-xs text-[#666] uppercase tracking-widest">
              AWAITING PROTOCOL SELECTION...
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
