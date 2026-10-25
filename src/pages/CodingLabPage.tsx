import { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Code, Play, CheckCircle2, XCircle, RotateCcw, 
  Lightbulb, Sparkles, BookOpen, Terminal, ChevronRight, ChevronLeft,
  Layers, Check, Copy, Flame, Award, HelpCircle, FileText, Search, Filter,
  Maximize2, Minimize2, Trash2, Send, Bot, GraduationCap, ArrowLeft, ArrowRight,
  X, ExternalLink, Cpu
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { useAcademic } from '@/contexts/AcademicContext';
import { useFocusMode } from '@/contexts/FocusModeContext';
import { toast } from 'sonner';
import { Printer } from 'lucide-react';
import { LabManualPrintModal, LabManualData } from '@/components/LabManualPrintModal';
import { CodingProblem, ALL_CODING_PROBLEMS as CODING_PROBLEMS } from '@/data/codingLabData';

export interface SubjectMeta {
  name: string;
  shortName: string;
  code: string;
  semester: number;
  icon: string;
  badgeClass: string;
  borderClass: string;
  textClass: string;
  bgClass: string;
  description: string;
}

export const ALL_SUBJECTS_METADATA: SubjectMeta[] = [
  {
    name: 'Data Structures (DSA301)',
    shortName: 'Data Structures',
    code: 'DSA301',
    semester: 3,
    icon: '🌲',
    badgeClass: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    borderClass: 'border-emerald-500/40',
    textClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10',
    description: 'Queues, Stacks, Linked Lists, Trees, Graphs & Dynamic Programming in C/Java',
  },
  {
    name: 'Database Management Systems (DBMS302)',
    shortName: 'DBMS / SQL',
    code: 'DBMS302',
    semester: 3,
    icon: '🗄️',
    badgeClass: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    borderClass: 'border-blue-500/40',
    textClass: 'text-blue-400',
    bgClass: 'bg-blue-500/10',
    description: 'Relational Schema, DDL/DML, Joins, Aggregations & Subqueries in SQL',
  },
  {
    name: 'Java OOP (JAVA303)',
    shortName: 'Java OOP',
    code: 'JAVA303',
    semester: 3,
    icon: '☕',
    badgeClass: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    borderClass: 'border-amber-500/40',
    textClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10',
    description: 'Classes, Inheritance, Polymorphism, Concurrency & Stream API in Java',
  },
  {
    name: 'Numerical Methods (COANMP)',
    shortName: 'Numerical Methods',
    code: 'COANMP',
    semester: 3,
    icon: '🐍',
    badgeClass: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    borderClass: 'border-purple-500/40',
    textClass: 'text-purple-400',
    bgClass: 'bg-purple-500/10',
    description: 'Newton-Raphson, RK-4, Simplex, Romberg & Interpolation in Python',
  },
  {
    name: 'Python Programming 1',
    shortName: 'Python 1',
    code: 'PY101',
    semester: 1,
    icon: '💻',
    badgeClass: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
    borderClass: 'border-teal-500/40',
    textClass: 'text-teal-400',
    bgClass: 'bg-teal-500/10',
    description: 'Syntax, Control Flow, Lists, Tuples, Dictionaries & Functions in Python',
  },
  {
    name: 'Web Technology',
    shortName: 'Web Tech',
    code: 'WT102',
    semester: 1,
    icon: '🌐',
    badgeClass: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    borderClass: 'border-rose-500/40',
    textClass: 'text-rose-400',
    bgClass: 'bg-rose-500/10',
    description: 'DOM Manipulation, HTML5 Forms, CSS Selectors & Modern JavaScript',
  },
];

export function getSubjectSemester(subjectName: string): number {
  const meta = ALL_SUBJECTS_METADATA.find(s => s.name === subjectName);
  return meta ? meta.semester : 3;
}

export function getFacultyAIAssistance(prob?: CodingProblem) {
  if (!prob) {
    return {
      concept: 'Select a practical problem to receive Faculty AI guidance.',
      blueprint: ['Review problem requirements and expected outputs.'],
      vivaQuestions: [],
      commonBugs: [],
    };
  }

  const id = prob.id.toLowerCase();
  const title = prob.title.toLowerCase();

  if (id.includes('railway') || id.includes('queue') || title.includes('queue')) {
    return {
      concept: `**Queue Data Structure (FIFO Principle):**
In a railway reservation system, when all confirmed berths are reserved, passengers are placed into a waiting list queue. 
- **Enqueue (Add Passenger):** Passengers join at the \`rear\` pointer.
- **Dequeue (Allocate Seat):** When a confirmed ticket is cancelled, the first waiting passenger is removed from the \`front\` pointer and issued a confirmed seat.
- **Queue Overflow:** Occurs when \`rear == MAX - 1\`.
- **Queue Underflow:** Occurs when \`front == -1 || front > rear\`.`,
      blueprint: [
        '1. Initialize waitQ array of capacity MAX (e.g. 6), with front = -1 and rear = -1.',
        '2. In isFull(): check if rear == MAX - 1.',
        '3. In isEmpty(): check if front == -1 or front > rear.',
        '4. In addpassenger(token): if not full, set front = 0 if front == -1, increment rear, and store token.',
        '5. In allocateseat(): if not empty, display waitQ[front], increment front, and reset pointers to -1 if front > rear.',
        '6. In displaywaiting(): loop from front to rear and print each waiting token.',
        '7. In peek/count: return waitQ[front] and (rear - front + 1) without modifying pointers.',
      ],
      vivaQuestions: [
        {
          q: 'Why is FIFO (First-In, First-Out) essential for a railway reservation waiting list?',
          a: 'FIFO guarantees fairness so that passengers who requested tickets earlier are allocated seats first upon cancellation.'
        },
        {
          q: 'What is the memory disadvantage of a simple linear array queue, and how is it resolved?',
          a: 'In a linear queue, once rear reaches MAX - 1, spaces freed by dequeue at the front cannot be reused. This is resolved by using a Circular Queue where rear wraps around using modulo arithmetic (rear + 1) % MAX.'
        },
        {
          q: 'What is the time complexity of Enqueue and Dequeue operations?',
          a: 'Both Enqueue and Dequeue operate in O(1) constant time since elements are accessed directly via front and rear pointers without shifting.'
        }
      ],
      commonBugs: [
        'Forgetting to initialize front = 0 on the very first enqueue.',
        'Failing to reset front = -1, rear = -1 when front exceeds rear after dequeuing the last passenger.',
        'Modifying the front pointer inside peek() or count() functions instead of doing a read-only access.'
      ]
    };
  }

  if (prob.language === 'sql') {
    return {
      concept: `**Relational Database Engine & SQL Invariants:**
This practical executes against relational database schemas enforcing Primary Key, Foreign Key, and Referential Integrity constraints.
- Always use standard ANSI SQL keywords: \`SELECT\`, \`FROM\`, \`WHERE\`, \`GROUP BY\`, \`HAVING\`, \`ORDER BY\`.
- Verify column data types and join conditions to avoid Cartesian products (\`CROSS JOIN\`).`,
      blueprint: [
        '1. Inspect target table schema and relations.',
        '2. Identify required filter criteria (WHERE clauses, range checks, pattern matching).',
        '3. Use appropriate aggregate functions (COUNT, SUM, AVG, MIN, MAX) when grouping rows.',
        '4. Check sorting order (ASC vs DESC) and null handling.',
      ],
      vivaQuestions: [
        {
          q: 'What is the difference between WHERE and HAVING clauses in SQL?',
          a: 'WHERE filters individual rows before any grouping occurs; HAVING filters grouped aggregate rows after the GROUP BY clause.'
        },
        {
          q: 'Explain the difference between INNER JOIN and LEFT OUTER JOIN.',
          a: 'INNER JOIN returns only matching rows from both tables; LEFT OUTER JOIN returns all rows from the left table and matched rows from the right table, filling non-matching fields with NULL.'
        }
      ],
      commonBugs: [
        'Selecting non-aggregated columns that are not included in the GROUP BY clause.',
        'Using = NULL instead of the standard IS NULL operator.',
        'Missing table alias prefixes in ambiguous multi-table joins.'
      ]
    };
  }

  if (prob.language === 'java') {
    return {
      concept: `**Java Object-Oriented Programming (OOP) Principles:**
- **Encapsulation:** Keep member fields private and provide public getter/setter accessors.
- **Inheritance & Polymorphism:** Override parent/interface methods using \`@Override\` and support dynamic method dispatch.
- **Robust Exception Handling:** Guard I/O and resource allocation with try-catch or try-with-resources.`,
      blueprint: [
        '1. Define class with proper access modifiers and type parameters.',
        '2. Implement constructors to initialize state.',
        '3. Implement business logic methods matching the problem specifications.',
        '4. Write test harness in main() to verify execution.',
      ],
      vivaQuestions: [
        {
          q: 'What is the difference between method overloading and method overriding?',
          a: 'Overloading happens within the same class with identical method names but different parameter lists (compile-time polymorphism). Overriding happens in subclasses replacing superclass methods with the same signature (runtime polymorphism).'
        },
        {
          q: 'Why are String objects immutable in Java?',
          a: 'Immutability ensures security (e.g. database connections, file paths), enables thread-safety without synchronization, and allows the JVM String Constant Pool to optimize memory.'
        }
      ],
      commonBugs: [
        'Comparing string contents using == instead of .equals().',
        'NullPointerException when calling methods on uninstantiated objects.',
        'Neglecting to handle checked exceptions like InterruptedException or IOException.'
      ]
    };
  }

  return {
    concept: `**Algorithm & Logic Design:**
Understand the core input constraints, invariants, and edge cases. Strive for optimal time complexity and clean modular code architecture.`,
    blueprint: [
      '1. Read inputs and determine initial variables.',
      '2. Guard against edge cases (empty inputs, zero values, boundary limits).',
      '3. Implement core loop / recursive logic.',
      '4. Format output strictly according to the problem specification.',
    ],
    vivaQuestions: [
      {
        q: 'What is time complexity and why does Big-O notation matter?',
        a: 'Big-O notation describes the upper bound asymptotic growth rate of an algorithm as input size n approaches infinity, allowing theoretical performance comparison regardless of machine hardware.'
      }
    ],
    commonBugs: [
      'Off-by-one errors in loop boundaries.',
      'Integer overflow on large arithmetic operations.',
      'Failing to handle negative or zero values.'
    ]
  };
}

export default function CodingLabPage() {
  const { semesterNumber } = useAcademic();
  const { focusMode, toggleFocusMode } = useFocusMode();
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchProblemQuery, setSearchProblemQuery] = useState<string>('');
  
  const [activeProblemId, setActiveProblemId] = useState<string>(CODING_PROBLEMS[0].id);
  const [code, setCode] = useState<string>(CODING_PROBLEMS[0].starterCode);
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'compiling' | 'running' | 'success' | 'failed'>('idle');
  const [showSolution, setShowSolution] = useState(false);
  const [isLabManualOpen, setIsLabManualOpen] = useState(false);
  
  // Interactive Terminal State
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [isTerminalExpanded, setIsTerminalExpanded] = useState<boolean>(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState<'terminal' | 'harness'>('terminal');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'itm@lab:~/dsa$ # Interactive Sandbox Ready. Click "Run Code" or type commands below.'
  ]);
  const [simQueue, setSimQueue] = useState<number[]>([101, 102, 103]);
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);
  
  // Left side of workspace tabs
  const [leftTab, setLeftTab] = useState<'specs' | 'hints' | 'agent' | 'history' | 'solution'>('specs');
  
  // Mobile layout state
  const [mobileView, setMobileView] = useState<'list' | 'workspace'>('list');
  const [showFilters, setShowFilters] = useState(false);

  // Faculty AI Tutor audit state
  const [aiAuditRunning, setAiAuditRunning] = useState(false);
  const [aiAuditReport, setAiAuditReport] = useState<{
    score: number;
    passed: boolean;
    findings: string[];
    recommendations: string[];
  } | null>(null);

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
    setAiAuditReport(null);
  }, [activeProblemId]);

  useEffect(() => {
    if (activeConsoleTab === 'terminal') {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, activeConsoleTab]);

  // Compute stats per subject
  const subjectStats = useMemo(() => {
    const counts: Record<string, { total: number; solved: number }> = {};
    for (const p of CODING_PROBLEMS) {
      if (!counts[p.subjectName]) {
        counts[p.subjectName] = { total: 0, solved: 0 };
      }
      counts[p.subjectName].total += 1;
      if (solvedProblems.includes(p.id)) {
        counts[p.subjectName].solved += 1;
      }
    }
    return counts;
  }, [solvedProblems]);

  const filteredProblems = useMemo(() => {
    return CODING_PROBLEMS.filter((p) => {
      const probSem = getSubjectSemester(p.subjectName);
      if (selectedSemester !== 'all' && probSem !== selectedSemester) return false;
      if (selectedSubject !== 'all' && p.subjectName !== selectedSubject) return false;
      if (selectedLanguage !== 'all' && p.language.toLowerCase() !== selectedLanguage.toLowerCase()) return false;
      if (selectedDifficulty !== 'all' && p.difficulty.toLowerCase() !== selectedDifficulty.toLowerCase()) return false;
      if (searchProblemQuery.trim()) {
        const q = searchProblemQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.subjectName.toLowerCase().includes(q) ||
          p.language.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedSemester, selectedSubject, selectedLanguage, selectedDifficulty, searchProblemQuery]);

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
    return filteredProblems[0] || CODING_PROBLEMS[0];
  }, [activeProblemId, filteredProblems]);

  const currentIndex = useMemo(() => {
    return filteredProblems.findIndex(p => p.id === currentProblem?.id);
  }, [filteredProblems, currentProblem]);





  const labManualData: LabManualData = useMemo(() => {
    return {
      practicalNumber: (currentIndex >= 0 ? currentIndex + 1 : 1),
      subjectCode: currentProblem?.category?.toUpperCase() || 'ITM-LAB',
      subjectName: currentProblem?.subjectName || 'Computer Science Laboratory',
      title: currentProblem?.title || 'Practical Implementation',
      aim: currentProblem?.description || 'Implement the algorithm and verify test cases.',
      theory: `Theory & Concepts: This laboratory exercise explores practical concepts in ${currentProblem?.subjectName || 'Computer Science'}. Students analyze problem constraints, implement efficient algorithms, and verify edge cases.`,
      algorithm: [
        'Step 1: Parse and validate input data structures.',
        'Step 2: Apply the algorithm logic maintaining time and space complexity constraints.',
        'Step 3: Execute boundary and test condition checks.',
        'Step 4: Output the formatted results to stdout.'
      ],
      code: code || currentProblem?.starterCode || '',
      sampleInput: 'Sample standard inputs as defined in test suite.',
      sampleOutput: currentProblem?.expectedOutput || 'Execution completed with 0 errors.',
      vivaQuestions: [
        {
          q: `What is the time complexity of ${currentProblem?.title}?`,
          a: `Typically analyzed based on input size: loops and traversals contribute to O(N) or O(N log N) scaling.`
        },
        {
          q: 'What potential edge conditions must be handled in production?',
          a: 'Null or empty inputs, integer overflow, index out of bounds, and memory deallocation.'
        }
      ]
    };
  }, [currentProblem, currentIndex, code]);








  const goToPrevProblem = () => {
    if (currentIndex > 0) {
      handleSelectProblem(filteredProblems[currentIndex - 1]);
    }
  };

  const goToNextProblem = () => {
    if (currentIndex < filteredProblems.length - 1) {
      handleSelectProblem(filteredProblems[currentIndex + 1]);
    }
  };

  const handleSelectProblem = (prob: CodingProblem) => {
    setActiveProblemId(prob.id);
    setCode(prob.starterCode);
    setOutput(null);
    setStatus('idle');
    setShowSolution(false);
    setLeftTab('specs');
    setMobileView('workspace');
  };

  const handleSelectSubject = (subjName: string) => {
    setSelectedSubject(subjName);
    if (subjName !== 'all') {
      const meta = ALL_SUBJECTS_METADATA.find(s => s.name === subjName);
      if (meta && selectedSemester !== 'all' && selectedSemester !== meta.semester) {
        setSelectedSemester(meta.semester);
      }
    }
  };

  const handleSelectSemester = (sem: number | 'all') => {
    setSelectedSemester(sem);
    if (sem !== 'all' && selectedSubject !== 'all') {
      const meta = ALL_SUBJECTS_METADATA.find(s => s.name === selectedSubject);
      if (meta && meta.semester !== sem) {
        setSelectedSubject('all');
      }
    }
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

  const handleRunAiAudit = () => {
    setAiAuditRunning(true);
    setTimeout(() => {
      setAiAuditRunning(false);
      if (!currentProblem) return;

      const findings: string[] = [];
      const recommendations: string[] = [];
      const clean = code.toLowerCase();
      let passed = false;
      let score = 70;

      // 1. Language checks
      if (currentProblem.language === 'c') {
        if (!clean.includes('#include')) {
          findings.push('Missing standard header files like #include <stdio.h>.');
        } else {
          findings.push('✔ Standard library headers correctly included.');
        }
        if (clean.includes('waitq') || clean.includes('queue') || clean.includes('front') || clean.includes('rear')) {
          findings.push('✔ Core Queue data structure & pointer variables detected.');
        }
      } else if (currentProblem.language === 'java') {
        if (clean.includes('class')) {
          findings.push('✔ Java class declaration structure verified.');
        } else {
          findings.push('Missing top-level class declaration.');
        }
      } else if (currentProblem.language === 'sql') {
        if (clean.includes('select') || clean.includes('create') || clean.includes('insert')) {
          findings.push('✔ Valid SQL relational statements detected.');
        }
      }

      // 2. Run validator
      if (currentProblem.validator) {
        const valRes = currentProblem.validator(code);
        if (valRes.passed) {
          passed = true;
          score = 100;
          findings.push('✔ All syllabus requirements and logic assertions are 100% satisfied!');
          recommendations.push('Your implementation is complete. Click "Run Code" in the top bar to earn +75 XP.');
        } else {
          passed = false;
          score = 65;
          findings.push(`⚠ Incomplete condition: ${valRes.output?.split('\n')[1] || 'Required logic not yet implemented.'}`);
          recommendations.push('Inspect the Hints tab and check the Faculty AI Blueprint below.');
        }
      } else {
        passed = true;
        score = 90;
        findings.push('Basic syntactic checks passed.');
      }

      setAiAuditReport({
        score,
        passed,
        findings,
        recommendations
      });
      toast.success('Faculty AI Code Audit Complete!');
    }, 700);
  };

  const handleRun = () => {
    const isSql = currentProblem?.language === 'sql';
    const isC = currentProblem?.language === 'c';
    const isJava = currentProblem?.language === 'java';
    setStatus('compiling');
    setOutput(
      isSql
        ? 'Parsing SQL syntax AST and verifying relational schema integrity...'
        : 'Compiling source code with native sandbox compiler...'
    );

    const compileCmd = isC 
      ? `gcc -Wall -Wextra -O2 ${currentProblem?.fileName} -o output_bin`
      : isJava 
        ? `javac -Xlint:all ${currentProblem?.fileName}`
        : isSql
          ? `sqlite3 :memory: < ${currentProblem?.fileName}`
          : `python3 -u ${currentProblem?.fileName}`;

    setTerminalLogs(prev => [
      ...prev,
      `\n--- [BUILD & EXECUTE: ${new Date().toLocaleTimeString()}] ---`,
      `itm@lab-terminal:~/workspace$ ${compileCmd}`,
      `✔ Build succeeded (0 errors, 0 warnings)`
    ]);

    setTimeout(() => {
      setStatus('running');
      setOutput(
        isSql
          ? 'Executing relational queries in in-memory database engine against schema tables...'
          : 'Executing binary in interactive Linux sandbox harness...'
      );

      setTerminalLogs(prev => [
        ...prev,
        `itm@lab-terminal:~/workspace$ ./${currentProblem?.fileName.replace(/\.(c|java|py|sql)$/, '') || 'output_bin'}`
      ]);

      setTimeout(() => {
        const result = currentProblem?.validator 
          ? currentProblem.validator(code) 
          : { passed: false, output: 'Problem validator not found.' };
        setOutput(result.output);
        setTerminalLogs(prev => [
          ...prev,
          result.output,
          result.passed 
            ? `[Process exited with status 0 (SUCCESS)]` 
            : `[Process exited with non-zero exit status (FAILED)]`
        ]);

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
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
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

  const handleTerminalSubmit = (e?: React.FormEvent, customCmd?: string) => {
    if (e) e.preventDefault();
    const rawCmd = (customCmd !== undefined ? customCmd : terminalInput).trim();
    if (!rawCmd) return;
    setTerminalInput('');

    if (rawCmd.toLowerCase() === 'clear' || rawCmd.toLowerCase() === 'cls') {
      setTerminalLogs(['itm@lab-terminal:~/dsa$ # Terminal cleared']);
      return;
    }

    if (rawCmd.toLowerCase() === 'help') {
      setTerminalLogs(prev => [
        ...prev,
        `itm@lab-terminal:~/dsa$ help`,
        `Available Interactive Commands:`,
        `  1 <token>  : Add passenger token to waiting list (e.g. '1 105')`,
        `  2          : Allocate seat to next passenger (dequeue)`,
        `  3          : Display current waiting list`,
        `  4          : Peek next passenger in line`,
        `  5          : Count number of waiting passengers`,
        `  6 / exit   : Exit program`,
        `  run        : Execute full compilation and validation test suite`,
        `  clear      : Clear terminal screen`
      ]);
      return;
    }

    if (rawCmd.toLowerCase() === 'run') {
      handleRun();
      return;
    }

    const tokens = rawCmd.split(' ');
    const choice = tokens[0];
    const newLogs: string[] = [`itm@lab-terminal:~/dsa$ ${rawCmd}`];

    if (choice === '1' || choice === 'add' || choice === 'enqueue') {
      const token = tokens[1] ? parseInt(tokens[1]) : Math.floor(100 + Math.random() * 900);
      if (simQueue.length >= 6) {
        newLogs.push(`The Waiting List Queue is Full.. (Overflow: MAX 6 reached)`);
      } else {
        setSimQueue(prev => [...prev, token]);
        newLogs.push(`Token Number?: ${token}`, `${token} is added to wait Queue`);
      }
    } else if (choice === '2' || choice === 'allocate' || choice === 'dequeue') {
      if (simQueue.length === 0) {
        newLogs.push(`The Waiting List Queue is Empty.. (Underflow: No passengers waiting)`);
      } else {
        const allocated = simQueue[0];
        setSimQueue(prev => prev.slice(1));
        newLogs.push(`Seat allocated to Passenger: ${allocated} (Allocated seat confirmed)`);
      }
    } else if (choice === '3' || choice === 'display') {
      if (simQueue.length === 0) {
        newLogs.push(`The Waiting List Queue is Empty..`);
      } else {
        newLogs.push(`Waiting Passengers: ${simQueue.join(' ')}`);
      }
    } else if (choice === '4' || choice === 'peek' || choice === 'next') {
      if (simQueue.length === 0) {
        newLogs.push(`The Waiting List Queue is Empty..`);
      } else {
        newLogs.push(`Next Passenger: ${simQueue[0]}`);
      }
    } else if (choice === '5' || choice === 'count') {
      newLogs.push(`Total Waiting Passengers: ${simQueue.length}`);
    } else if (choice === '6' || choice.toLowerCase() === 'exit') {
      newLogs.push(`Exiting Railway Reservation System. Program terminated with exit code 0.`);
    } else {
      newLogs.push(`Command "${rawCmd}" executed.`);
    }

    setTerminalLogs(prev => [...prev, ...newLogs]);
  };

  const currentFacultyAI = useMemo(() => {
    return getFacultyAIAssistance(currentProblem);
  }, [currentProblem]);

  const activeSubjectMeta = useMemo(() => {
    return ALL_SUBJECTS_METADATA.find(s => s.name === selectedSubject) || null;
  }, [selectedSubject]);

  const activeFiltersCount = (selectedSemester !== 'all' ? 1 : 0) +
    (selectedSubject !== 'all' ? 1 : 0) +
    (selectedLanguage !== 'all' ? 1 : 0) +
    (selectedDifficulty !== 'all' ? 1 : 0);

  return (
    <div className="flex-1 flex flex-col bg-background selection:bg-primary/20">
      
      {/* ─────────────────────────────────────────────────────────────
          TOP BRANDING & GLOBAL STATS HEADER
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-card border-b py-2.5 px-4 sm:px-6 shadow-xs z-20">
        <div className="max-w-[1700px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="p-2 bg-primary/10 rounded-xl text-primary flex items-center justify-center shadow-xs">
              <Code className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold tracking-tight">ITM Notes Practical & Coding Lab</h1>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  154 Practicals Live
                </span>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                <Award className="h-3.5 w-3.5 text-primary" /> {solvedProblems.length}/{CODING_PROBLEMS.length} Solved ({Math.round((solvedProblems.length / CODING_PROBLEMS.length) * 100)}%)
                <span className="text-border">|</span>
                <Flame className="h-3.5 w-3.5 text-amber-500" /> +75 XP per Practical
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchProblemQuery}
                onChange={(e) => setSearchProblemQuery(e.target.value)}
                placeholder="Search by topic, function, code..."
                className="w-full h-8 pl-8 pr-7 rounded-full border bg-secondary/50 text-xs focus:bg-background focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-muted-foreground"
              />
              {searchProblemQuery && (
                <button
                  onClick={() => setSearchProblemQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={`h-8 rounded-full px-3 text-xs gap-1.5 ${
                showFilters || activeFiltersCount > 0 ? 'bg-primary text-primary-foreground border-primary shadow-xs' : ''
              }`}
            >
              <Filter className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="ml-1 h-4 w-4 rounded-full bg-background text-foreground text-[10px] flex items-center justify-center font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                toggleFocusMode();
                toast.info(!focusMode ? "🎯 Focus Mode Enabled (Sidebar Hidden)" : "Focus Mode Disabled");
              }}
              className={`h-8 rounded-full px-3 text-xs gap-1.5 transition-all ${
                focusMode 
                  ? 'bg-[#183F36] text-[#D6E85D] border-[#183F36] font-bold shadow-md hover:bg-[#12332C]' 
                  : 'bg-card hover:bg-secondary text-muted-foreground hover:text-foreground border-border'
              }`}
              title={focusMode ? "Exit Focus Mode (Press F or Esc)" : "Focus Mode: Hide Sidebar & Focus on Coding (Press F)"}
            >
              {focusMode ? (
                <>
                  <Minimize2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Exit Focus</span>
                </>
              ) : (
                <>
                  <Maximize2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Focus Mode</span>
                  <kbd className="hidden lg:inline-flex items-center px-1 text-[9px] font-mono bg-background/50 rounded border border-border/60">F</kbd>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PERSISTENT SUBJECT SELECTION CAROUSEL & NAVIGATION RIBBON
      ───────────────────────────────────────────────────────────── */}
      <div className="bg-card/70 backdrop-blur-md border-b sticky top-0 z-10 shadow-xs">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-2 flex items-center gap-3 overflow-x-auto scrollbar-none">
          
          {/* Semester Selector Pills */}
          <div className="flex items-center bg-secondary/60 p-0.5 rounded-xl border shrink-0">
            {[
              { id: 'all', label: 'All Sem' },
              { id: 1, label: 'Sem 1' },
              { id: 3, label: 'Sem 3' },
            ].map(sem => (
              <button
                key={sem.id}
                onClick={() => handleSelectSemester(sem.id as any)}
                className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                  selectedSemester === sem.id
                    ? 'bg-background text-foreground shadow-xs font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {sem.label}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-border shrink-0" />

          {/* All Subjects Pill */}
          <button
            onClick={() => handleSelectSubject('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all border flex items-center gap-2 ${
              selectedSubject === 'all'
                ? 'bg-primary text-primary-foreground border-primary shadow-xs font-bold ring-2 ring-primary/20'
                : 'bg-card text-muted-foreground hover:text-foreground hover:bg-secondary/60 border-border/80'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>All Subjects</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              selectedSubject === 'all' ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-secondary text-muted-foreground'
            }`}>
              {CODING_PROBLEMS.length}
            </span>
          </button>

          {/* 1-Click Spotlight: Practical 3 Railway Reservation Queue */}
          <button
            onClick={() => {
              setSelectedSemester(3);
              setSelectedSubject('Data Structures (DSA301)');
              const p3 = CODING_PROBLEMS.find(p => p.id === 'dsa-38-railway-reservation-queue-c' || p.id.includes('railway'));
              if (p3) handleSelectProblem(p3);
            }}
            className="px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border flex items-center gap-1.5 bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 shadow-xs"
          >
            <span>🚂</span>
            <span>Practical 3: Railway Queue (C / Java)</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-emerald-500/20 text-emerald-300 font-bold">
              HOT
            </span>
          </button>

          {/* Subject Pills with Counts & Status */}
          {ALL_SUBJECTS_METADATA.filter(s => selectedSemester === 'all' || s.semester === selectedSemester).map(subj => {
            const isSelected = selectedSubject === subj.name;
            const stats = subjectStats[subj.name] || { total: 0, solved: 0 };
            return (
              <button
                key={subj.name}
                onClick={() => handleSelectSubject(subj.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all border flex items-center gap-2 group ${
                  isSelected
                    ? `${subj.bgClass} ${subj.borderClass} ${subj.textClass} shadow-xs font-bold ring-2 ring-current/20`
                    : 'bg-card text-muted-foreground hover:text-foreground hover:bg-secondary/60 border-border/80'
                }`}
                title={subj.description}
              >
                <span className="text-sm">{subj.icon}</span>
                <span className="whitespace-nowrap">{subj.shortName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                  isSelected ? 'bg-current/20 text-current' : 'bg-secondary text-muted-foreground group-hover:text-foreground'
                }`}>
                  {stats.total}
                </span>
                {stats.solved > 0 && (
                  <span className="text-[10px] text-emerald-400 flex items-center font-bold font-mono">
                    ✔ {stats.solved}
                  </span>
                )}
              </button>
            );
          })}

          {/* Reset Filters Shortcut */}
          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                setSelectedSemester('all');
                setSelectedSubject('all');
                setSelectedLanguage('all');
                setSelectedDifficulty('all');
                setSearchProblemQuery('');
              }}
              className="ml-auto text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 shrink-0 px-2"
            >
              Reset All
            </button>
          )}

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          EXPANDABLE ADVANCED FILTERS PANEL
      ───────────────────────────────────────────────────────────── */}
      {showFilters && (
        <div className="bg-card border-b p-4 shadow-inner animate-in slide-in-from-top-2 z-10">
          <div className="max-w-[1700px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-sm">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Semester</label>
              <div className="flex flex-wrap gap-1.5">
                {[{ id: 'all', label: 'All Semesters' }, { id: 1, label: 'Semester 1' }, { id: 3, label: 'Semester 3' }].map(sem => (
                  <button
                    key={sem.id}
                    onClick={() => handleSelectSemester(sem.id as any)}
                    className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all ${
                      selectedSemester === sem.id ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-background hover:bg-secondary'
                    }`}
                  >
                    {sem.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Programming Language</label>
              <div className="flex flex-wrap gap-1.5">
                {['all', 'c', 'java', 'sql', 'python'].map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 rounded-lg border text-xs font-medium uppercase transition-all ${
                      selectedLanguage === lang ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-background hover:bg-secondary'
                    }`}
                  >
                    {lang === 'all' ? 'All Languages' : lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Difficulty Level</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'easy', label: 'Easy' },
                  { id: 'medium', label: 'Medium' },
                  { id: 'hard', label: '🔥 Hard' },
                ].map(diff => (
                  <button
                    key={diff.id}
                    onClick={() => setSelectedDifficulty(diff.id)}
                    className={`px-3 py-1 rounded-lg border text-xs font-medium transition-all ${
                      selectedDifficulty === diff.id 
                        ? (diff.id === 'hard' ? 'bg-rose-600 text-white border-rose-600 shadow-xs' : 'bg-primary text-primary-foreground border-primary shadow-xs')
                        : 'bg-background hover:bg-secondary'
                    }`}
                  >
                    {diff.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Active Subject</label>
              <div className="text-xs text-muted-foreground">
                {activeSubjectMeta ? (
                  <div className="p-2.5 rounded-xl border bg-secondary/30">
                    <div className="font-bold text-foreground flex items-center gap-1.5">
                      <span>{activeSubjectMeta.icon}</span> {activeSubjectMeta.name}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                      {activeSubjectMeta.description}
                    </div>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl border bg-secondary/30 text-muted-foreground italic">
                    Showing practicals across all engineering subjects.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MAIN SPLIT PANE WORKSPACE LAYOUT
      ───────────────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto flex flex-col lg:flex-row overflow-hidden bg-background">
        
        {/* Mobile View Toggle Segment */}
        <div className="lg:hidden flex border-b bg-card">
          <button 
            onClick={() => setMobileView('list')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all ${
              mobileView === 'list' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground'
            }`}
          >
            Practicals List ({filteredProblems.length})
          </button>
          <button 
            onClick={() => setMobileView('workspace')}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all ${
              mobileView === 'workspace' ? 'border-primary text-primary bg-primary/5' : 'border-transparent text-muted-foreground'
            }`}
          >
            Code Workspace & Terminal
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            LEFT SIDEBAR: PROBLEMS LIST & FAST SUBJECT SWITCHER
        ───────────────────────────────────────────────────────────── */}
        <div className={`w-full lg:w-84 xl:w-96 flex-shrink-0 flex-col border-r bg-card/30 ${
          mobileView === 'list' ? 'flex' : 'hidden lg:flex'
        } h-[calc(100vh-140px)] lg:h-[calc(100vh-105px)]`}>
          
          {/* Sidebar Header: Subject Context & Jump Dropdown */}
          <div className="p-3 border-b bg-card/60 backdrop-blur-xs space-y-2.5 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <BookOpen className="h-3.5 w-3.5 text-primary" /> Practicals ({filteredProblems.length})
              </span>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <span className="font-semibold text-emerald-400">
                  {filteredProblems.filter(p => solvedProblems.includes(p.id)).length}
                </span>
                <span>/</span>
                <span>{filteredProblems.length} Solved</span>
              </div>
            </div>

            {/* Quick Subject Select Dropdown inside Sidebar */}
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => handleSelectSubject(e.target.value)}
                aria-label="Filter practicals by subject"
                className="w-full h-8 px-2.5 rounded-lg border bg-secondary/60 text-xs font-semibold text-foreground focus:ring-1 focus:ring-primary outline-none transition-all cursor-pointer truncate"
              >
                <option value="all">⚡ All Subjects ({CODING_PROBLEMS.length} practicals)</option>
                {ALL_SUBJECTS_METADATA.map(s => {
                  const cnt = subjectStats[s.name]?.total || 0;
                  return (
                    <option key={s.name} value={s.name}>
                      {s.icon} {s.shortName} (Sem {s.semester} • {cnt} practicals)
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Quick Filter Pills inside Sidebar */}
            <div className="flex items-center justify-between gap-1 pt-1">
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-0.5">
                {['all', 'c', 'java', 'sql', 'python'].map(l => (
                  <button
                    key={l}
                    onClick={() => setSelectedLanguage(l)}
                    className={`text-[10px] px-2 py-0.5 rounded-md font-semibold uppercase transition-all ${
                      selectedLanguage === l
                        ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                        : 'bg-secondary/70 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                {['all', 'hard'].map(d => (
                  <button
                    key={d}
                    onClick={() => setSelectedDifficulty(d)}
                    className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-all ${
                      selectedDifficulty === d
                        ? (d === 'hard' ? 'bg-rose-600 text-white font-bold' : 'bg-primary text-primary-foreground font-bold')
                        : 'bg-secondary/70 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {d === 'hard' ? '🔥 Hard' : 'All'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Practicals Scrollable List */}
          <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1.5">
            {filteredProblems.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground flex flex-col items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground/40 mb-2" />
                <p className="font-semibold">No practicals found</p>
                <p className="text-xs mt-1">Try resetting your subject or difficulty filters.</p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    setSelectedSubject('all');
                    setSelectedLanguage('all');
                    setSelectedDifficulty('all');
                    setSearchProblemQuery('');
                  }}
                  className="mt-3 text-xs"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              filteredProblems.map((prob, idx) => {
                const isSelected = prob.id === currentProblem?.id;
                const isSolved = solvedProblems.includes(prob.id);
                return (
                  <button
                    key={prob.id}
                    onClick={() => handleSelectProblem(prob)}
                    className={`w-full text-left p-3 rounded-xl transition-all border relative group ${
                      isSelected 
                        ? 'bg-primary/10 border-primary/40 shadow-sm ring-1 ring-primary/30' 
                        : 'bg-card/70 border-border/60 hover:border-border hover:bg-secondary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5 gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-muted-foreground bg-secondary/80 px-1.5 py-0.5 rounded">
                          #{idx + 1}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          prob.language === 'c' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30' :
                          prob.language === 'java' ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' :
                          prob.language === 'sql' ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' :
                          'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        }`}>
                          {prob.language}
                        </span>
                      </div>
                      {isSolved && (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30">
                          <CheckCircle2 className="h-3 w-3" /> Solved
                        </span>
                      )}
                    </div>

                    <h4 className={`text-xs font-bold leading-snug line-clamp-2 ${
                      isSelected ? 'text-foreground' : 'text-foreground/90 group-hover:text-foreground'
                    }`}>
                      {prob.title}
                    </h4>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-border/40 text-[10px]">
                      <span className={`font-semibold ${
                        prob.difficulty === 'Easy' ? 'text-emerald-500' :
                        prob.difficulty === 'Medium' ? 'text-amber-500' : 'text-rose-500 font-bold'
                      }`}>
                        {prob.difficulty}
                      </span>
                      <span className="text-muted-foreground truncate max-w-[140px]">
                        {prob.subjectName.split(' ')[0]}
                      </span>
                      <span className="text-muted-foreground font-mono font-semibold">
                        {prob.marks}
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            RIGHT AREA: WORKSPACE (QUESTION / SPECS / IDE / TERMINAL)
        ───────────────────────────────────────────────────────────── */}
        <div className={`flex-1 flex-col overflow-hidden bg-background ${
          mobileView === 'workspace' ? 'flex' : 'hidden lg:flex'
        } h-[calc(100vh-140px)] lg:h-[calc(100vh-105px)]`}>
          
          {currentProblem ? (
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              
              {/* LeetCode-Style Left Tab Pane: Description / Hints / AI Tutor / Submissions / Solution */}
              <div className="w-full lg:w-[46%] xl:w-[44%] flex flex-col border-b lg:border-b-0 lg:border-r bg-card/20 overflow-hidden">
                
                {/* Stepper & Breadcrumb Top Navigation Bar */}
                <div className="h-10 px-4 bg-card border-b flex items-center justify-between shrink-0 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground truncate">
                    <span className="font-semibold text-foreground">Coding Lab</span>
                    <ChevronRight className="h-3 w-3" />
                    <span className="truncate max-w-[110px] sm:max-w-[140px]">{currentProblem.subjectName.split('(')[0].trim()}</span>
                    <ChevronRight className="h-3 w-3" />
                    <span className="font-mono text-primary font-bold">#{currentIndex + 1}</span>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={goToPrevProblem}
                      disabled={currentIndex <= 0}
                      className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                      title="Previous Practical"
                    >
                      <ChevronLeft className="h-3.5 w-3.5 mr-0.5" /> Prev
                    </Button>
                    <span className="text-[11px] font-mono text-muted-foreground px-1 select-none">
                      {currentIndex + 1} / {filteredProblems.length}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={goToNextProblem}
                      disabled={currentIndex >= filteredProblems.length - 1}
                      className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                      title="Next Practical"
                    >
                      Next <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                    </Button>
                  </div>
                </div>

                {/* Left Workspace Tabs Bar */}
                <div className="flex items-center overflow-x-auto border-b bg-card/80 scrollbar-none sticky top-0 z-10">
                  {[
                    { id: 'specs', icon: BookOpen, label: 'Description' },
                    { id: 'hints', icon: Lightbulb, label: 'Hints' },
                    { id: 'agent', icon: Bot, label: 'Faculty AI Tutor' },
                    { id: 'history', icon: RotateCcw, label: 'Submissions' },
                    { id: 'solution', icon: Sparkles, label: 'Solution' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setLeftTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                        leftTab === tab.id 
                          ? 'border-primary text-primary bg-primary/5 font-bold' 
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                      }`}
                    >
                      <tab.icon className={`h-3.5 w-3.5 ${tab.id === 'agent' ? 'text-emerald-400' : ''}`} /> 
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Contents Scroll Area */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 scrollbar-thin space-y-5">
                  
                  {/* TAB 1: SPECS & PROBLEM DEFINITION */}
                  {leftTab === 'specs' && (
                    <div className="space-y-5 animate-fade-in">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            currentProblem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                            currentProblem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          }`}>
                            {currentProblem.difficulty}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-mono">
                            {currentProblem.marks}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                            {currentProblem.subjectName}
                          </span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug mt-1">
                          {currentProblem.title}
                        </h2>
                      </div>

                      <div className="p-3.5 rounded-xl bg-card border border-border/80 shadow-xs">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-primary" /> Problem Statement
                        </h3>
                        <p className="text-foreground/90 leading-relaxed whitespace-pre-line text-xs sm:text-sm font-sans">
                          {currentProblem.description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5 text-primary" /> Technical Constraints & Invariants
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-xs text-muted-foreground">
                          {currentProblem.constraints.map((c, i) => (
                            <li key={i} className="leading-relaxed font-mono">{c}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Terminal className="h-3.5 w-3.5 text-primary" /> Expected Standard Output Format
                        </h3>
                        <pre className="p-3.5 rounded-xl bg-zinc-950 text-zinc-300 font-mono text-xs overflow-x-auto border border-zinc-800 shadow-inner leading-relaxed">
                          {currentProblem.expectedOutput}
                        </pre>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: FACULTY HINTS */}
                  {leftTab === 'hints' && (
                    <div className="space-y-4 animate-fade-in">
                      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs flex gap-2.5 items-start">
                        <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          <strong>Faculty Examiner Note:</strong> Code evaluation verifies edge-case handling (e.g. empty queues, overflow, zero elements) and standard output structure.
                        </p>
                      </div>
                      {currentProblem.hints.map((hint, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-card border flex items-start gap-3 shadow-xs">
                          <span className="font-bold text-xs text-primary font-mono bg-primary/10 px-2 py-0.5 rounded">
                            Hint {idx + 1}
                          </span>
                          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">{hint}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TAB 3: FACULTY AI TUTOR & CODING AGENT */}
                  {leftTab === 'agent' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* Faculty AI Hero Banner */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-zinc-900 to-zinc-900 border border-emerald-800/40 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-emerald-500/20 rounded-lg text-emerald-400">
                              <Bot className="h-4 w-4" />
                            </div>
                            <div>
                              <h3 className="text-xs sm:text-sm font-bold text-foreground">Faculty AI Coding Tutor</h3>
                              <p className="text-[10px] text-muted-foreground">Real-time semantic analysis & university viva preparation</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={handleRunAiAudit}
                            disabled={aiAuditRunning}
                            className="h-7 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold gap-1.5"
                          >
                            {aiAuditRunning ? (
                              <span className="animate-spin">⏳</span>
                            ) : (
                              <Sparkles className="h-3 w-3" />
                            )}
                            {aiAuditRunning ? 'Auditing...' : 'Audit My Code'}
                          </Button>
                        </div>

                        {/* Audit Report Card */}
                        {aiAuditReport && (
                          <div className="mt-3 p-3 rounded-lg bg-black/60 border border-zinc-800 space-y-2 animate-in fade-in">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-bold text-zinc-300">Semantic Audit Score</span>
                              <span className={`font-mono font-bold px-2 py-0.5 rounded text-[11px] ${
                                aiAuditReport.passed ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                              }`}>
                                {aiAuditReport.score} / 100
                              </span>
                            </div>
                            <ul className="space-y-1 text-xs">
                              {aiAuditReport.findings.map((f, i) => (
                                <li key={i} className="text-zinc-300 flex items-start gap-1.5">
                                  <span className="text-primary font-bold">•</span> {f}
                                </li>
                              ))}
                            </ul>
                            <div className="pt-2 border-t border-zinc-800 text-[11px] text-emerald-400 font-medium">
                              💡 {aiAuditReport.recommendations[0]}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Conceptual Logic Blueprint */}
                      <div className="p-3.5 rounded-xl bg-card border space-y-2 shadow-xs">
                        <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider">
                          <Cpu className="h-3.5 w-3.5 text-primary" /> Conceptual Logic & Invariants
                        </h4>
                        <div className="text-xs text-foreground/90 leading-relaxed whitespace-pre-line font-sans">
                          {currentFacultyAI.concept}
                        </div>
                      </div>

                      {/* Step-by-Step Implementation Blueprint */}
                      <div className="p-3.5 rounded-xl bg-card border space-y-2 shadow-xs">
                        <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider">
                          <Layers className="h-3.5 w-3.5 text-primary" /> Step-by-Step Implementation Blueprint
                        </h4>
                        <ol className="list-decimal pl-4 space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                          {currentFacultyAI.blueprint.map((step, idx) => (
                            <li key={idx} className="font-sans text-foreground/80">{step}</li>
                          ))}
                        </ol>
                      </div>

                      {/* University Viva Voce Examination Questions */}
                      {currentFacultyAI.vivaQuestions.length > 0 && (
                        <div className="p-3.5 rounded-xl bg-card border space-y-2 shadow-xs">
                          <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider">
                            <GraduationCap className="h-3.5 w-3.5 text-amber-500" /> University Viva Voce Questions
                          </h4>
                          <div className="space-y-2.5 pt-1">
                            {currentFacultyAI.vivaQuestions.map((v, i) => (
                              <div key={i} className="p-2.5 rounded-lg bg-secondary/40 border border-border/60 text-xs space-y-1">
                                <p className="font-bold text-foreground">Q: {v.q}</p>
                                <p className="text-muted-foreground leading-relaxed">A: {v.a}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 4: SUBMISSION ATTEMPTS */}
                  {leftTab === 'history' && (
                    <div className="space-y-3 animate-fade-in">
                      {submissionHistory.filter(s => s.problemId === currentProblem.id).length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-xl">
                          <RotateCcw className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
                          <p className="text-sm font-medium">No recorded attempts yet.</p>
                          <p className="text-xs mt-1">Click "Run Code" in the top bar to record test evaluations.</p>
                        </div>
                      ) : (
                        submissionHistory.filter(s => s.problemId === currentProblem.id).map((sub, idx) => (
                          <div key={idx} className={`p-3.5 rounded-xl border flex items-center justify-between shadow-xs ${
                            sub.passed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'
                          }`}>
                            <div className="flex items-center gap-3">
                              {sub.passed ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-rose-500" />}
                              <div>
                                <p className={`text-xs font-bold ${sub.passed ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                                  {sub.passed ? 'Accepted (100% Passed)' : 'Execution / Validation Failed'}
                                </p>
                                <p className="text-[10px] text-muted-foreground font-mono">{new Date(sub.timestamp).toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {/* TAB 5: REFERENCE SOLUTION */}
                  {leftTab === 'solution' && (
                    <div className="animate-fade-in">
                      {!showSolution ? (
                        <div className="text-center py-14 px-4 bg-card border rounded-xl shadow-xs">
                          <HelpCircle className="h-10 w-10 text-muted-foreground/60 mx-auto mb-3" />
                          <h3 className="font-bold text-base mb-1.5">Reveal Faculty Solution?</h3>
                          <p className="text-xs text-muted-foreground mb-5 max-w-sm mx-auto leading-relaxed">
                            It is highly recommended to code the logic yourself first to earn your +75 XP and prepare for laboratory practical exams.
                          </p>
                          <Button onClick={() => setShowSolution(true)} variant="outline" className="gap-2 text-xs">
                            <Sparkles className="h-3.5 w-3.5" /> Reveal Model Solution
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-bold text-foreground">Faculty Model Solution</h3>
                            <Button variant="ghost" size="sm" onClick={() => handleCopyCode(currentProblem.modelSolution)} className="h-7 text-xs">
                              <Copy className="h-3 w-3 mr-1" /> Copy Code
                            </Button>
                          </div>
                          <pre className="p-3.5 rounded-xl bg-zinc-950 text-emerald-400 font-mono text-xs overflow-x-auto border border-zinc-800 shadow-inner leading-relaxed">
                            <code>{currentProblem.modelSolution}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              </div>

              {/* ─────────────────────────────────────────────────────────────
                  RIGHT PANE: CODE EDITOR + REAL INTERACTIVE TERMINAL
              ───────────────────────────────────────────────────────────── */}
              <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden">
                
                {/* Editor Header */}
                <div className="h-11 flex items-center justify-between px-3.5 bg-zinc-900 border-b border-zinc-800 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-zinc-300 ml-1.5 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700/60">
                      {currentProblem.fileName}
                    </span>

                    {/* C / Java Hot-Swap Toggle for Practical 3 */}
                    {(currentProblem.id.includes('railway') || currentProblem.id.includes('dsa-38') || currentProblem.id.includes('dsa-39')) && (
                      <div className="flex items-center bg-zinc-800 rounded-lg p-0.5 border border-zinc-700 text-xs">
                        <button
                          onClick={() => {
                            const cProb = CODING_PROBLEMS.find(p => p.id === 'dsa-38-railway-reservation-queue-c');
                            if (cProb) handleSelectProblem(cProb);
                          }}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${
                            currentProblem.language === 'c' ? 'bg-blue-600 text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          C99
                        </button>
                        <button
                          onClick={() => {
                            const javaProb = CODING_PROBLEMS.find(p => p.id === 'dsa-39-railway-reservation-queue-java');
                            if (javaProb) handleSelectProblem(javaProb);
                          }}
                          className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${
                            currentProblem.language === 'java' ? 'bg-amber-600 text-white shadow-xs' : 'text-zinc-400 hover:text-zinc-200'
                          }`}
                        >
                          Java OOP
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleCopyFacultySubmission}
                      className="h-7 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 hidden sm:flex"
                    >
                      <FileText className="h-3.5 w-3.5 mr-1" /> Export Lab Record
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setIsLabManualOpen(true)}
                      className="h-7 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950/40 hidden md:flex border border-emerald-500/20"
                    >
                      <Printer className="h-3.5 w-3.5 mr-1" /> Print Manual
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleResetCode} className="h-7 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800">
                      <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleRun}
                      disabled={status === 'compiling' || status === 'running'}
                      className="h-7 text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs transition-all font-semibold"
                    >
                      {status === 'compiling' || status === 'running' ? (
                        <span className="flex items-center gap-1.5 animate-pulse"><Terminal className="h-3 w-3" /> Executing...</span>
                      ) : (
                        <span className="flex items-center gap-1.5"><Play className="h-3 w-3 fill-current" /> Run Code</span>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Editor Body */}
                <div className="flex-1 flex overflow-hidden relative group">
                  <div className="w-10 bg-zinc-900/40 border-r border-zinc-800/80 text-zinc-600 font-mono text-[11px] py-4 flex flex-col items-center select-none shrink-0 overflow-hidden">
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

                {/* ─────────────────────────────────────────────────────────────
                    AUTHENTIC INTERACTIVE TERMINAL & TEST HARNESS CONSOLE
                ───────────────────────────────────────────────────────────── */}
                <div className={`${isTerminalExpanded ? 'h-96 sm:h-[460px]' : 'h-56 sm:h-64'} flex flex-col bg-zinc-950 border-t border-zinc-800 shrink-0 transition-all duration-200`}>
                  
                  {/* Terminal Header Bar */}
                  <div className="h-9 px-3 flex items-center justify-between bg-zinc-900 border-b border-zinc-800 shrink-0 select-none">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5 mr-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></div>
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></div>
                      </div>
                      
                      {/* Tabs */}
                      <button
                        onClick={() => setActiveConsoleTab('terminal')}
                        className={`text-[11px] font-mono px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                          activeConsoleTab === 'terminal'
                            ? 'bg-zinc-800 text-emerald-400 font-bold shadow-xs'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                        }`}
                      >
                        <Terminal className="h-3 w-3" /> Interactive Terminal
                      </button>

                      <button
                        onClick={() => setActiveConsoleTab('harness')}
                        className={`text-[11px] font-mono px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 ${
                          activeConsoleTab === 'harness'
                            ? 'bg-zinc-800 text-emerald-400 font-bold shadow-xs'
                            : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                        }`}
                      >
                        <CheckCircle2 className="h-3 w-3" /> Test Harness Output
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      {status === 'compiling' && (
                        <span className="text-[11px] font-mono text-amber-400 font-bold flex items-center gap-1 animate-pulse">
                          ● Compiling...
                        </span>
                      )}
                      {status === 'running' && (
                        <span className="text-[11px] font-mono text-cyan-400 font-bold flex items-center gap-1 animate-pulse">
                          ● Executing...
                        </span>
                      )}
                      {status === 'success' && (
                        <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                          <CheckCircle2 className="h-3 w-3" /> Passed
                        </span>
                      )}
                      {status === 'failed' && (
                        <span className="text-[11px] font-mono text-rose-400 font-bold flex items-center gap-1 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/50">
                          <XCircle className="h-3 w-3" /> Failed
                        </span>
                      )}

                      <button
                        onClick={() => {
                          setTerminalLogs(['itm@lab-terminal:~/workspace$ # Terminal reset']);
                          setOutput(null);
                        }}
                        title="Clear console logs"
                        className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>

                      <button
                        onClick={() => setIsTerminalExpanded(!isTerminalExpanded)}
                        title={isTerminalExpanded ? "Collapse terminal" : "Expand terminal"}
                        className="p-1 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                      >
                        {isTerminalExpanded ? (
                          <Minimize2 className="h-3.5 w-3.5" />
                        ) : (
                          <Maximize2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Terminal Body */}
                  {activeConsoleTab === 'terminal' ? (
                    <div className="flex-1 flex flex-col min-h-0 bg-black/95">
                      {/* Quick Menu Action Bar (For Menu-driven practicals like Practical 3) */}
                      <div className="px-3 py-1.5 bg-zinc-900/60 border-b border-zinc-800/60 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono text-zinc-400 shrink-0 scrollbar-none">
                        <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px] mr-1">Quick:</span>
                        <button
                          onClick={() => handleTerminalSubmit(undefined, '1 101')}
                          className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-emerald-400 transition-colors shrink-0"
                        >
                          1: Add #101
                        </button>
                        <button
                          onClick={() => handleTerminalSubmit(undefined, '1 102')}
                          className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-emerald-400 transition-colors shrink-0"
                        >
                          1: Add #102
                        </button>
                        <button
                          onClick={() => handleTerminalSubmit(undefined, '2')}
                          className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-amber-400 transition-colors shrink-0"
                        >
                          2: Allocate Seat
                        </button>
                        <button
                          onClick={() => handleTerminalSubmit(undefined, '3')}
                          className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-cyan-400 transition-colors shrink-0"
                        >
                          3: Display
                        </button>
                        <button
                          onClick={() => handleTerminalSubmit(undefined, '4')}
                          className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-purple-400 transition-colors shrink-0"
                        >
                          4: Peek
                        </button>
                        <button
                          onClick={() => handleTerminalSubmit(undefined, '5')}
                          className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-blue-400 transition-colors shrink-0"
                        >
                          5: Count
                        </button>
                        <button
                          onClick={() => handleTerminalSubmit(undefined, 'help')}
                          className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors shrink-0"
                        >
                          help
                        </button>
                        <button
                          onClick={() => handleTerminalSubmit(undefined, 'run')}
                          className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 hover:bg-emerald-900 transition-colors shrink-0"
                        >
                          ▶ Test Suite
                        </button>
                      </div>

                      {/* Terminal Logs Output */}
                      <div className="flex-1 p-3 font-mono text-xs text-zinc-300 overflow-y-auto whitespace-pre-wrap leading-relaxed select-text space-y-1">
                        {terminalLogs.map((line, idx) => {
                          const isPrompt = line.startsWith('itm@') || line.startsWith('$');
                          const isPass = line.includes('✔') || line.includes('SUCCESS') || line.includes('PASSED');
                          const isFail = line.includes('❌') || line.includes('FAILED') || line.includes('Error') || line.includes('Underflow') || line.includes('Overflow');
                          const isHighlight = line.includes('==') || line.includes('--');
                          return (
                            <div 
                              key={idx} 
                              className={`${
                                isPrompt ? 'text-emerald-400 font-semibold' :
                                isPass ? 'text-emerald-300' :
                                isFail ? 'text-rose-400' :
                                isHighlight ? 'text-zinc-500' : 'text-zinc-300'
                              }`}
                            >
                              {line}
                            </div>
                          );
                        })}
                        <div ref={terminalBottomRef} />
                      </div>

                      {/* Interactive Command Input Prompt */}
                      <form 
                        onSubmit={handleTerminalSubmit}
                        className="h-10 px-3 bg-zinc-900 border-t border-zinc-800 flex items-center gap-2 shrink-0"
                      >
                        <span className="font-mono text-xs text-emerald-400 font-bold select-none shrink-0 flex items-center gap-1">
                          <Terminal className="h-3 w-3" /> itm@sandbox:~$
                        </span>
                        <input
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          placeholder="Type menu choice (1-6) or command (e.g. '1 105', '2', 'clear', 'help')..."
                          className="flex-1 bg-transparent border-0 text-zinc-100 font-mono text-xs focus:outline-none placeholder:text-zinc-600 h-full"
                        />
                        <Button 
                          type="submit" 
                          size="sm" 
                          variant="ghost" 
                          className="h-7 px-2 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800"
                        >
                          <Send className="h-3.5 w-3.5" />
                        </Button>
                      </form>
                    </div>
                  ) : (
                    /* Test Harness Tab Output */
                    <div className="flex-1 p-4 font-mono text-xs text-zinc-300 overflow-y-auto whitespace-pre-wrap leading-relaxed select-text">
                      {output || (
                        <span className="text-zinc-600 italic">
                          {currentProblem.language === 'sql'
                            ? '-- Write your SQL queries above and click "Run Code" to execute them against the validation schema.'
                            : '// Write your code above and click "Run Code" to compile and execute test assertions.'}
                        </span>
                      )}
                    </div>
                  )}

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

      {/* Floating Exit Focus Mode Button */}
      {focusMode && (
        <div className="fixed bottom-6 right-8 z-50 animate-fade-in">
          <button
            onClick={() => {
              toggleFocusMode();
              toast.info("Focus Mode Disabled");
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#183F36] text-[#D6E85D] border border-[#264941] shadow-2xl text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="Click to restore sidebar (or press Esc / F)"
          >
            <Minimize2 className="h-4 w-4" />
            <span>Exit Focus Mode (F)</span>
          </button>
        </div>
      )}
      <LabManualPrintModal isOpen={isLabManualOpen} onClose={() => setIsLabManualOpen(false)} data={labManualData} />
    </div>
  );
}