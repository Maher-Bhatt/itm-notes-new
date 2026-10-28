import { useState, useEffect, useMemo, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Code, Play, CheckCircle2, XCircle, RotateCcw, 
  Lightbulb, Sparkles, BookOpen, Terminal, ChevronRight, ChevronLeft,
  Layers, Check, Copy, Flame, Award, HelpCircle, FileText, Search, Filter,
  Maximize2, Minimize2, Trash2, Send, Bot, GraduationCap, ArrowLeft, ArrowRight,
  X, ExternalLink, Cpu, Printer, Timer, Clock, ArrowUpRight
} from 'lucide-react';
import { useGamification } from '@/hooks/useGamification';
import { useAcademic } from '@/contexts/AcademicContext';
import { useFocusMode } from '@/contexts/FocusModeContext';
import { toast } from 'sonner';
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
    icon: '⚡',
    badgeClass: 'bg-blue-500/15 text-blue-500 border-blue-500/30',
    borderClass: 'border-blue-500/40',
    textClass: 'text-blue-500',
    bgClass: 'bg-blue-500/10',
    description: 'Queues, Stacks, Linked Lists, Trees, Graphs & Dynamic Programming in C/Java',
  },
  {
    name: 'Database Management Systems (DBMS302)',
    shortName: 'DBMS / SQL',
    code: 'DBMS302',
    semester: 3,
    icon: '🗄️',
    badgeClass: 'bg-amber-500/15 text-amber-500 border-amber-500/30',
    borderClass: 'border-amber-500/40',
    textClass: 'text-amber-500',
    bgClass: 'bg-amber-500/10',
    description: 'Relational Schema, DDL/DML, Joins, Aggregations & Subqueries in SQL',
  },
  {
    name: 'Java OOP (JAVA303)',
    shortName: 'Java OOP',
    code: 'JAVA303',
    semester: 3,
    icon: '☕',
    badgeClass: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    borderClass: 'border-orange-500/40',
    textClass: 'text-orange-400',
    bgClass: 'bg-orange-500/10',
    description: 'Classes, Inheritance, Polymorphism, Concurrency & Stream API in Java',
  },
  {
    name: 'Numerical Methods (COANMP)',
    shortName: 'Numerical Methods',
    code: 'COANMP',
    semester: 3,
    icon: '🔢',
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
    icon: '🐍',
    badgeClass: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
    borderClass: 'border-emerald-500/40',
    textClass: 'text-emerald-500',
    bgClass: 'bg-emerald-500/10',
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
        '3. Implement business logic methods matching problem specifications.',
        '4. Write test harness in main() to verify execution.',
      ],
      vivaQuestions: [
        {
          q: 'What is the difference between method overloading and method overriding in Java?',
          a: 'Overloading occurs within the same class with identical names but different parameter signatures (static polymorphism). Overriding occurs in child classes replacing inherited methods with the exact same signature (runtime dynamic dispatch).'
        },
        {
          q: 'Why are String objects immutable in Java?',
          a: 'Immutability guarantees thread safety without synchronization, security for sensitive data like classloading and network URLs, and permits the JVM String Constant Pool to optimize memory footprint.'
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
  const { addXp, unlockAchievement } = useGamification();

  // Filters state
  const [selectedSemester, setSelectedSemester] = useState<number | 'all'>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchProblemQuery, setSearchProblemQuery] = useState<string>('');
  const [isProblemPickerOpen, setIsProblemPickerOpen] = useState(false);

  // Active Problem & Code state
  const [activeProblemId, setActiveProblemId] = useState<string>(CODING_PROBLEMS[0]?.id || 'dsa-01-array-reverse');
  const [code, setCode] = useState<string>(CODING_PROBLEMS[0]?.starterCode || '');
  const [output, setOutput] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'compiling' | 'running' | 'success' | 'failed'>('idle');
  const [showSolution, setShowSolution] = useState(false);
  const [isLabManualOpen, setIsLabManualOpen] = useState(false);

  // Editor configuration
  const [editorFontSize, setEditorFontSize] = useState<'12px' | '13px' | '14px' | '16px'>('13px');
  const [activeConsoleTab, setActiveConsoleTab] = useState<'testcase' | 'result' | 'terminal'>('result');
  const [activeTestcaseIndex, setActiveTestcaseIndex] = useState<number | 'custom'>(0);
  const [customTestInput, setCustomTestInput] = useState<string>('5\n1 2 3 4 5');
  const [isConsoleExpanded, setIsConsoleExpanded] = useState<boolean>(false);

  // Stop watch / Exam Timer
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Saved user progress
  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
  const [submissionHistory, setSubmissionHistory] = useState<Array<{ problemId: string; problemTitle?: string; timestamp: string; passed: boolean; runtimeMs?: number; memoryMb?: number }>>([]);
  const [lastSubmissionStats, setLastSubmissionStats] = useState<{
    status: 'accepted' | 'wrong_answer' | 'compile_error';
    runtimeMs: number;
    runtimePercentile: number;
    memoryMb: number;
    memoryPercentile: number;
    failedCaseIndex?: number;
    actualOutput?: string;
    expectedOutput?: string;
  } | null>(null);

  // Interactive Terminal
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    'campusloop@sandbox:~/workspace$ # Linux C/C++/Java/Python/SQL Sandbox initialized.',
    'campusloop@sandbox:~/workspace$ # Type commands (run, test, clear, help) or click "Run Code".',
  ]);
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);

  // Left Tab Navigation
  const [leftTab, setLeftTab] = useState<'specs' | 'hints' | 'agent' | 'history' | 'solution'>('specs');
  const [mobileView, setMobileView] = useState<'specs' | 'editor' | 'console'>('editor');

  // Load saved state
  useEffect(() => {
    try {
      const savedSolved = localStorage.getItem('itm_coding_lab_solved');
      if (savedSolved) setSolvedProblems(JSON.parse(savedSolved));
      const savedHistory = localStorage.getItem('itm_coding_history');
      if (savedHistory) setSubmissionHistory(JSON.parse(savedHistory));
    } catch {}
  }, []);

  // Timer interval
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // Auto-save code draft
  useEffect(() => {
    if (!activeProblemId) return;
    const timer = setTimeout(() => {
      localStorage.setItem(`itm_coding_draft_${activeProblemId}`, code);
    }, 400);
    return () => clearTimeout(timer);
  }, [code, activeProblemId]);

  // Restore draft when active problem changes
  useEffect(() => {
    const draft = localStorage.getItem(`itm_coding_draft_${activeProblemId}`);
    if (draft !== null) {
      setCode(draft);
    } else {
      const prob = CODING_PROBLEMS.find(p => p.id === activeProblemId);
      if (prob) setCode(prob.starterCode);
    }
    setLastSubmissionStats(null);
    setStatus('idle');
  }, [activeProblemId]);

  // Scroll terminal logs
  useEffect(() => {
    if (activeConsoleTab === 'terminal') {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs, activeConsoleTab]);

  // Filter problems
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

  const currentProblem = useMemo(() => {
    const found = filteredProblems.find(p => p.id === activeProblemId);
    if (found) return found;
    return filteredProblems[0] || CODING_PROBLEMS[0];
  }, [activeProblemId, filteredProblems]);

  const currentIndex = useMemo(() => {
    return filteredProblems.findIndex(p => p.id === currentProblem?.id);
  }, [filteredProblems, currentProblem]);

  const handleSelectProblem = (prob: CodingProblem) => {
    setActiveProblemId(prob.id);
    setCode(prob.starterCode);
    setOutput(null);
    setStatus('idle');
    setShowSolution(false);
    setIsProblemPickerOpen(false);
  };

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

  const handleResetCode = () => {
    if (!currentProblem) return;
    setCode(currentProblem.starterCode);
    localStorage.removeItem(`itm_coding_draft_${currentProblem.id}`);
    toast.success('Code reset to official university starter template.');
  };

  const handleFormatCode = () => {
    try {
      const lines = code.split('\n');
      let indentLevel = 0;
      const formatted = lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';
        if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }
        const indented = '    '.repeat(indentLevel) + trimmed;
        if (trimmed.endsWith('{') || trimmed.endsWith(':') || trimmed.endsWith('(')) {
          indentLevel++;
        }
        return indented;
      }).join('\n');
      setCode(formatted);
      toast.success('Code auto-formatted with standard indentation.');
    } catch {
      toast.info('Formatting applied.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (e.shiftKey) {
        handleSubmit();
      } else {
        handleRun();
      }
      return;
    }

    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      toast.success('Code saved to browser storage');
      return;
    }

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
    if (!currentProblem) return;
    setStatus('compiling');
    setActiveConsoleTab('result');

    setTerminalLogs(prev => [
      ...prev,
      `\n[BUILD: ${new Date().toLocaleTimeString()}] compiling ${currentProblem.fileName}...`,
      `compiler: gcc/javac sandbox -O2 optimization enabled`,
      `status: 0 syntax errors, 0 warnings`
    ]);

    setTimeout(() => {
      setStatus('running');
      setTimeout(() => {
        const result = currentProblem.validator ? currentProblem.validator(code) : { passed: false, output: 'Validator not found' };
        setOutput(result.output);

        if (result.passed) {
          setStatus('success');
          setLastSubmissionStats({
            status: 'accepted',
            runtimeMs: Math.floor(Math.random() * 8) + 2,
            runtimePercentile: 94.6,
            memoryMb: 14.2,
            memoryPercentile: 88.4,
            actualOutput: result.output,
            expectedOutput: currentProblem.expectedOutput,
          });
          toast.success('All test assertions passed! Ready for submission.');
        } else {
          setStatus('failed');
          setLastSubmissionStats({
            status: 'wrong_answer',
            runtimeMs: Math.floor(Math.random() * 15) + 8,
            runtimePercentile: 45.0,
            memoryMb: 14.8,
            memoryPercentile: 60.0,
            failedCaseIndex: 1,
            actualOutput: result.output,
            expectedOutput: currentProblem.expectedOutput,
          });
          toast.error('Test Assertion Mismatch: Review expected output vs actual.');
        }
      }, 400);
    }, 400);
  };

  const handleSubmit = () => {
    if (!currentProblem) return;
    setStatus('compiling');
    setActiveConsoleTab('result');

    setTimeout(() => {
      setStatus('running');
      setTimeout(() => {
        const result = currentProblem.validator ? currentProblem.validator(code) : { passed: false, output: 'Validator not found' };
        setOutput(result.output);

        const runtime = Math.floor(Math.random() * 6) + 2;
        const memory = +(13.8 + Math.random() * 1.5).toFixed(1);

        if (result.passed) {
          setStatus('success');
          setLastSubmissionStats({
            status: 'accepted',
            runtimeMs: runtime,
            runtimePercentile: 96.2,
            memoryMb: memory,
            memoryPercentile: 92.1,
            actualOutput: result.output,
            expectedOutput: currentProblem.expectedOutput,
          });

          // Mark as solved
          if (!solvedProblems.includes(currentProblem.id)) {
            const next = [...solvedProblems, currentProblem.id];
            setSolvedProblems(next);
            try {
              localStorage.setItem('itm_coding_lab_solved', JSON.stringify(next));
            } catch {}
            addXp(75, 'Completed Coding Lab Practical');
            toast.success(`🎉 Accepted! Earned +75 XP. (${next.length}/${CODING_PROBLEMS.length} Solved)`);
          } else {
            toast.success('Accepted! All test cases passed.');
          }

          // Add to submission history
          const record = {
            problemId: currentProblem.id,
            problemTitle: currentProblem.title,
            timestamp: new Date().toISOString(),
            passed: true,
            runtimeMs: runtime,
            memoryMb: memory,
          };
          setSubmissionHistory(prev => {
            const next = [record, ...prev.slice(0, 49)];
            try {
              localStorage.setItem('itm_coding_history', JSON.stringify(next));
            } catch {}
            return next;
          });
        } else {
          setStatus('failed');
          setLastSubmissionStats({
            status: 'wrong_answer',
            runtimeMs: runtime,
            runtimePercentile: 40.0,
            memoryMb: memory,
            memoryPercentile: 50.0,
            failedCaseIndex: 1,
            actualOutput: result.output,
            expectedOutput: currentProblem.expectedOutput,
          });
          toast.error('Submission Failed: Wrong Answer assertion.');
        }
      }, 500);
    }, 400);
  };

  const handleCopyFacultySubmission = () => {
    if (!currentProblem) return;
    const formattedRecord = [
      `================================================================================`,
      `CAMPUSLOOP UNIVERSITY PRACTICAL SUBMISSION RECORD`,
      `Course: ${currentProblem.subjectName}`,
      `Practical Title: ${currentProblem.title}`,
      `Difficulty Level: ${currentProblem.difficulty} | Evaluation Marks: ${currentProblem.marks}`,
      `================================================================================`,
      ``,
      `[1. AIM / OBJECTIVE]:`,
      currentProblem.description,
      ``,
      `[2. CONSTRAINTS & EVALUATION CRITERIA]:`,
      ...(currentProblem.constraints || []).map(c => `• ${c}`),
      ``,
      `[3. SOURCE CODE / IMPLEMENTATION]:`,
      code || currentProblem.starterCode,
      ``,
      `[4. EXPECTED OUTPUT / TEST HARNESS RESULTS]:`,
      currentProblem.expectedOutput,
      ``,
      `[5. VERIFICATION STATUS]:`,
      `Status: ${solvedProblems.includes(currentProblem.id) ? 'VERIFIED & PASSED (100%)' : 'READY FOR FACULTY SUBMISSION'}`,
      `Engine: CampusLoop National Engineering Code Sandbox`,
      `Export Timestamp: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`,
      `================================================================================`,
    ].join('\n');

    navigator.clipboard.writeText(formattedRecord);
    toast.success('Practical record copied! Ready to paste into your college lab manual.');
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = terminalInput.trim();
    if (!raw) return;

    const cmd = raw.toLowerCase();
    setTerminalInput('');

    setTerminalLogs(prev => [...prev, `campusloop@sandbox:~/workspace$ ${raw}`]);

    if (cmd === 'clear') {
      setTerminalLogs(['campusloop@sandbox:~/workspace$ # Terminal cleared.']);
      return;
    }
    if (cmd === 'run') {
      handleRun();
      return;
    }
    if (cmd === 'test' || cmd === 'submit') {
      handleSubmit();
      return;
    }
    if (cmd === 'ls') {
      setTerminalLogs(prev => [...prev, `${currentProblem?.fileName || 'solution.c'}  Makefile  test_cases.json  README.md`]);
      return;
    }
    if (cmd === 'help') {
      setTerminalLogs(prev => [
        ...prev,
        'Available sandbox commands:',
        '  run     - Compile and execute against active testcase',
        '  submit  - Run full test harness for submission & XP',
        '  ls      - List files in workspace',
        '  cat     - Print current buffer code',
        '  clear   - Clear terminal output',
      ]);
      return;
    }
    if (cmd === 'cat') {
      setTerminalLogs(prev => [...prev, code]);
      return;
    }

    setTerminalLogs(prev => [...prev, `bash: ${raw}: command not found. Type "help" for valid commands.`]);
  };

  const currentFacultyAI = useMemo(() => {
    return getFacultyAIAssistance(currentProblem);
  }, [currentProblem]);

  return (
    <div className="flex-1 flex flex-col bg-[#F6F3EC] dark:bg-[#121214] min-h-[calc(100vh-64px)] selection:bg-[#2B4EFF]/20">
      
      {/* =========================================================================
          LEETCODE-GRADE TOP BAR
      ========================================================================= */}
      <header className="h-13 bg-white dark:bg-[#1C1C1E] border-b border-[#E8E4DA] dark:border-neutral-800 px-4 sm:px-6 flex items-center justify-between shrink-0 z-20">
        
        {/* Left: Problem Quick Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#2B4EFF] text-white">
              <Code className="h-4 w-4" />
            </div>
            <span className="font-bold text-xs sm:text-sm text-[#111111] dark:text-white hidden md:inline">
              Coding Lab
            </span>
          </div>

          <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700 hidden sm:block" />

          {/* Problem Selector Trigger Button */}
          <button
            onClick={() => setIsProblemPickerOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 hover:bg-[#E6EAFD] dark:hover:bg-neutral-700 border border-[#E8E4DA] dark:border-neutral-700 transition-all cursor-pointer text-xs font-semibold text-[#111111] dark:text-white max-w-[220px] sm:max-w-[340px] truncate"
          >
            <span className="font-mono text-[#2B4EFF] font-bold">
              #{currentIndex + 1}
            </span>
            <span className="truncate">{currentProblem?.title}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold uppercase shrink-0 ${
              currentProblem?.difficulty === 'Easy' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' :
              currentProblem?.difficulty === 'Medium' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
            }`}>
              {currentProblem?.difficulty}
            </span>
          </button>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-0.5">
            <button
              onClick={goToPrevProblem}
              disabled={currentIndex <= 0}
              className="p-1 rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Previous Problem"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={goToNextProblem}
              disabled={currentIndex >= filteredProblems.length - 1}
              className="p-1 rounded-md text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              title="Next Problem"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Center: Run & Submit Actions */}
        <div className="flex items-center gap-2">
          {/* LeetCode Run Button */}
          <button
            onClick={handleRun}
            disabled={status === 'compiling' || status === 'running'}
            className="h-8 px-3.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#111111] dark:text-white text-xs font-bold border border-neutral-300 dark:border-neutral-700 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs disabled:opacity-50"
            title="Run Code (Ctrl + Enter)"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span className="hidden sm:inline">Run</span>
          </button>

          {/* LeetCode Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={status === 'compiling' || status === 'running'}
            className="h-8 px-4 rounded-full bg-[#2B4EFF] hover:bg-[#1E3ECC] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm disabled:opacity-50"
            title="Submit Solution (Ctrl + Shift + Enter)"
          >
            {status === 'compiling' || status === 'running' ? (
              <span className="flex items-center gap-1.5 animate-pulse">Evaluating...</span>
            ) : (
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Submit</span>
              </span>
            )}
          </button>

          {/* Practice Timer */}
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`h-8 px-2.5 rounded-full text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isTimerRunning 
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30' 
                : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            title="Practice Stopwatch Timer"
          >
            <Timer className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{formatTimer(timerSeconds)}</span>
          </button>
        </div>

        {/* Right: Tools & Utilities */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyFacultySubmission}
            className="h-8 px-2.5 rounded-lg text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hidden md:flex items-center gap-1 transition-all cursor-pointer"
            title="Export Verified College Practical Record"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Export</span>
          </button>

          <button
            onClick={() => setIsLabManualOpen(true)}
            className="h-8 px-2.5 rounded-lg text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hidden lg:flex items-center gap-1 transition-all cursor-pointer"
            title="Print University Lab Manual"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Manual</span>
          </button>

          <button
            onClick={handleResetCode}
            className="h-8 w-8 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center transition-all cursor-pointer"
            title="Reset code to starter template"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={toggleFocusMode}
            className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              focusMode ? 'bg-[#2B4EFF] text-white' : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            title="Toggle Focus Mode (Full Screen)"
          >
            {focusMode ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </header>

      {/* =========================================================================
          MAIN DUAL SPLIT-PANE WORKSPACE
      ========================================================================= */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden h-[calc(100vh-115px)]">
        
        {/* Mobile View Toggle Pills */}
        <div className="lg:hidden flex border-b border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E]">
          <button
            onClick={() => setMobileView('specs')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-all ${
              mobileView === 'specs' ? 'border-[#2B4EFF] text-[#2B4EFF] bg-[#2B4EFF]/5' : 'border-transparent text-neutral-500'
            }`}
          >
            Problem Specs
          </button>
          <button
            onClick={() => setMobileView('editor')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-all ${
              mobileView === 'editor' ? 'border-[#2B4EFF] text-[#2B4EFF] bg-[#2B4EFF]/5' : 'border-transparent text-neutral-500'
            }`}
          >
            Code Editor
          </button>
          <button
            onClick={() => setMobileView('console')}
            className={`flex-1 py-2 text-xs font-bold border-b-2 transition-all ${
              mobileView === 'console' ? 'border-[#2B4EFF] text-[#2B4EFF] bg-[#2B4EFF]/5' : 'border-transparent text-neutral-500'
            }`}
          >
            Test Harness
          </button>
        </div>

        {/* -------------------------------------------------------------------------
            LEFT PANE: PROBLEM STATEMENT & SUPPORTING TABS (45% Width)
        ------------------------------------------------------------------------- */}
        <div className={`w-full lg:w-[46%] xl:w-[44%] flex flex-col border-r border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] overflow-hidden ${
          mobileView === 'specs' ? 'flex' : 'hidden lg:flex'
        }`}>
          
          {/* Sub-Tabs Navigation */}
          <div className="flex items-center overflow-x-auto border-b border-[#E8E4DA] dark:border-neutral-800 bg-[#F6F3EC]/80 dark:bg-neutral-900/80 px-3 scrollbar-none shrink-0">
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
                className={`flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all cursor-pointer ${
                  leftTab === tab.id 
                    ? 'border-[#2B4EFF] text-[#2B4EFF] font-bold bg-white dark:bg-[#1C1C1E]' 
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                <tab.icon className={`h-3.5 w-3.5 ${tab.id === 'agent' ? 'text-amber-500' : ''}`} /> 
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Container */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 scrollbar-thin space-y-6">
            
            {/* TAB 1: DESCRIPTION */}
            {leftTab === 'specs' && (
              <div className="space-y-6 animate-fade-in">
                {/* Problem Header Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      currentProblem.difficulty === 'Easy' ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' :
                      currentProblem.difficulty === 'Medium' ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : 'bg-rose-500/15 text-rose-600 dark:text-rose-400'
                    }`}>
                      {currentProblem.difficulty}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-mono">
                      {currentProblem.marks}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300">
                      {currentProblem.subjectName}
                    </span>
                    {solvedProblems.includes(currentProblem.id) && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center gap-1">
                        <Check className="h-3 w-3 stroke-[3]" /> Solved
                      </span>
                    )}
                  </div>

                  <h1 className="text-xl sm:text-2xl font-black text-[#111111] dark:text-white leading-tight">
                    {currentProblem.title}
                  </h1>
                </div>

                {/* Problem Description */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Objective & Requirements
                  </h3>
                  <div className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line bg-[#F6F3EC] dark:bg-neutral-800/40 p-4 rounded-2xl border border-[#E8E4DA] dark:border-neutral-800">
                    {currentProblem.description}
                  </div>
                </div>

                {/* Constraints */}
                {currentProblem.constraints && currentProblem.constraints.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                      Constraints & Bounds
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {currentProblem.constraints.map((c, i) => (
                        <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-[#E8E4DA] dark:border-neutral-700 text-xs font-mono text-neutral-800 dark:text-neutral-200">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#2B4EFF]" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Expected Output Demonstration */}
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Target Output Specification
                  </h3>
                  <pre className="p-4 rounded-2xl bg-neutral-900 text-neutral-100 font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800">
                    <code>{currentProblem.expectedOutput}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* TAB 2: HINTS */}
            {leftTab === 'hints' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <Lightbulb className="h-4 w-4" />
                  <span>Step-by-Step Problem Hints</span>
                </div>
                {currentProblem.hints && currentProblem.hints.length > 0 ? (
                  currentProblem.hints.map((hint, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
                      <strong className="block font-bold mb-1">Hint {idx + 1}:</strong>
                      {hint}
                    </div>
                  ))
                ) : (
                  <div className="p-4 rounded-xl text-xs text-neutral-500 italic bg-neutral-50 dark:bg-neutral-800">
                    No additional hints provided for this practical.
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: FACULTY AI TUTOR & VIVA QUESTIONS */}
            {leftTab === 'agent' && (
              <div className="space-y-5 animate-fade-in">
                <div className="p-4 rounded-2xl bg-[#E6EAFD]/50 dark:bg-blue-950/30 border border-[#2B4EFF]/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2B4EFF] dark:text-blue-300">
                    <Bot className="h-4 w-4" />
                    <span>Faculty Architectural Concept</span>
                  </div>
                  <div className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                    {currentFacultyAI.concept}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                    Implementation Blueprint
                  </h4>
                  <div className="space-y-1.5">
                    {currentFacultyAI.blueprint.map((step, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 border border-[#E8E4DA] dark:border-neutral-700 text-xs text-neutral-800 dark:text-neutral-200">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {currentFacultyAI.vivaQuestions && currentFacultyAI.vivaQuestions.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      College Viva Exam Questions
                    </h4>
                    <div className="space-y-2">
                      {currentFacultyAI.vivaQuestions.map((viva, idx) => (
                        <div key={idx} className="p-3.5 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-1.5">
                          <p className="text-xs font-bold text-amber-900 dark:text-amber-300">
                            Q{idx + 1}: {viva.q}
                          </p>
                          <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                            {viva.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: SUBMISSIONS HISTORY */}
            {leftTab === 'history' && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Your Past Practical Submissions
                </h3>
                {submissionHistory.filter(s => s.problemId === currentProblem.id).length > 0 ? (
                  submissionHistory
                    .filter(s => s.problemId === currentProblem.id)
                    .map((sub, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl border border-[#E8E4DA] dark:border-neutral-800 bg-[#F6F3EC] dark:bg-neutral-800/40 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <div>
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                              Accepted
                            </span>
                            <span className="text-[10px] text-neutral-400 block font-mono">
                              {new Date(sub.timestamp).toLocaleDateString()} · {new Date(sub.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>

                        <div className="text-right text-xs font-mono text-neutral-500">
                          <span>{sub.runtimeMs || 3} ms</span> · <span>{sub.memoryMb || 14.1} MB</span>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="p-6 rounded-2xl border border-dashed border-[#E8E4DA] dark:border-neutral-800 text-center text-xs text-neutral-500 space-y-1">
                    <p className="font-semibold">No submissions recorded for this practical yet.</p>
                    <p className="text-[11px]">Click "Run" or "Submit" to test your code against university harness.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: MODEL SOLUTION */}
            {leftTab === 'solution' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    Official Reference Solution
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentProblem.modelSolution);
                      toast.success('Model solution copied to clipboard!');
                    }}
                    className="text-xs font-semibold text-[#2B4EFF] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="h-3 w-3" />
                    <span>Copy Solution</span>
                  </button>
                </div>
                <pre className="p-4 rounded-2xl bg-neutral-900 text-neutral-100 font-mono text-xs overflow-x-auto leading-relaxed border border-neutral-800">
                  <code>{currentProblem.modelSolution}</code>
                </pre>
              </div>
            )}

          </div>
        </div>

        {/* -------------------------------------------------------------------------
            RIGHT PANE: MONOSPACE IDE & TEST RUNNER CONSOLE (55% Width)
        ------------------------------------------------------------------------- */}
        <div className={`flex-1 flex flex-col bg-[#18181B] overflow-hidden ${
          mobileView === 'editor' || mobileView === 'console' ? 'flex' : 'hidden lg:flex'
        }`}>
          
          {/* Editor Header Bar */}
          <div className="h-10 bg-[#27272A] border-b border-neutral-800 px-4 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-neutral-200 bg-neutral-800 px-2.5 py-0.5 rounded border border-neutral-700">
                {currentProblem?.fileName || 'solution.c'}
              </span>

              {/* Font Size Pills */}
              <div className="hidden sm:flex items-center bg-neutral-800 rounded p-0.5 text-[10px] font-mono text-neutral-400">
                {(['12px', '13px', '14px', '16px'] as const).map(sz => (
                  <button
                    key={sz}
                    onClick={() => setEditorFontSize(sz)}
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${
                      editorFontSize === sz ? 'bg-neutral-700 text-white font-bold' : 'hover:text-neutral-200'
                    }`}
                  >
                    {sz.replace('px', '')}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleFormatCode}
                className="text-xs text-neutral-400 hover:text-white px-2 py-0.5 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                title="Format indentation"
              >
                Format
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(code);
                  toast.success('Code copied to clipboard.');
                }}
                className="text-xs text-neutral-400 hover:text-white px-2 py-0.5 rounded hover:bg-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </button>
            </div>
          </div>

          {/* Code Editor Body */}
          <div className="flex-1 flex overflow-hidden relative">
            {/* Line Numbers */}
            <div className="w-10 bg-[#1F1F23] border-r border-neutral-800/80 text-neutral-600 font-mono text-[11px] py-4 flex flex-col items-center select-none shrink-0 overflow-hidden">
              {Array.from({ length: Math.max(1, code.split('\n').length) }).map((_, i) => (
                <div key={i} className="leading-relaxed">{i + 1}</div>
              ))}
            </div>

            {/* Core Textarea */}
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              style={{ fontSize: editorFontSize }}
              className="flex-1 w-full h-full p-4 font-mono bg-transparent border-0 text-neutral-100 resize-none focus-visible:ring-0 leading-relaxed selection:bg-neutral-800 rounded-none shadow-none"
            />
          </div>

          {/* =========================================================================
              LEETCODE / HACKERRANK BOTTOM CONSOLE & TEST HARNESS
          ========================================================================= */}
          <div className={`${isConsoleExpanded ? 'h-80 sm:h-96' : 'h-56 sm:h-64'} flex flex-col bg-[#141416] border-t border-neutral-800 shrink-0 transition-all duration-200`}>
            
            {/* Console Tabs & Runner Bar */}
            <div className="h-10 px-4 bg-[#1F1F23] border-b border-neutral-800 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setActiveConsoleTab('result')}
                  className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeConsoleTab === 'result' ? 'bg-[#27272A] text-white font-bold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Award className="h-3.5 w-3.5" />
                  <span>Test Result</span>
                </button>

                <button
                  onClick={() => setActiveConsoleTab('testcase')}
                  className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeConsoleTab === 'testcase' ? 'bg-[#27272A] text-white font-bold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Testcases</span>
                </button>

                <button
                  onClick={() => setActiveConsoleTab('terminal')}
                  className={`px-3 py-1 text-xs font-mono rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeConsoleTab === 'terminal' ? 'bg-[#27272A] text-white font-bold' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Terminal</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsConsoleExpanded(!isConsoleExpanded)}
                  className="text-neutral-400 hover:text-white p-1 rounded hover:bg-neutral-800 transition-colors cursor-pointer"
                  title="Expand / Collapse Console"
                >
                  {isConsoleExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            {/* Console Content Area */}
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-neutral-300 scrollbar-thin">
              
              {/* TAB 1: TEST RESULT */}
              {activeConsoleTab === 'result' && (
                <div className="space-y-4">
                  {lastSubmissionStats ? (
                    <div className="space-y-4 animate-fade-in">
                      {lastSubmissionStats.status === 'accepted' ? (
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-base font-bold flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                              Accepted
                            </span>
                            <span className="text-xs bg-emerald-500/20 px-2 py-0.5 rounded font-mono">
                              +75 XP Earned
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-xs font-mono text-neutral-300 pt-1">
                            <div>
                              Runtime: <strong className="text-white">{lastSubmissionStats.runtimeMs} ms</strong>
                              <span className="text-emerald-400 text-[10px] ml-1">({lastSubmissionStats.runtimePercentile}% faster)</span>
                            </div>
                            <div>
                              Memory: <strong className="text-white">{lastSubmissionStats.memoryMb} MB</strong>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 space-y-2">
                          <div className="text-base font-bold flex items-center gap-2">
                            <XCircle className="h-5 w-5 text-rose-500" />
                            Wrong Answer
                          </div>
                          <p className="text-xs text-neutral-300">
                            Assertion failed on Case {lastSubmissionStats.failedCaseIndex || 1}. Inspect output below.
                          </p>
                        </div>
                      )}

                      {/* Output Details */}
                      <div className="space-y-1">
                        <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
                          Standard Sandbox Output
                        </span>
                        <pre className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200 overflow-x-auto whitespace-pre-wrap">
                          {output || 'Execution completed with 0 errors.'}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 py-8 space-y-2">
                      <Terminal className="h-8 w-8 text-neutral-600" />
                      <p>Run your code or submit to view test results and runtime benchmarks.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: TESTCASES */}
              {activeConsoleTab === 'testcase' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    {['Case 1', 'Case 2', 'Custom'].map((tc, idx) => (
                      <button
                        key={tc}
                        onClick={() => setActiveTestcaseIndex(idx === 2 ? 'custom' : idx)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          activeTestcaseIndex === (idx === 2 ? 'custom' : idx)
                            ? 'bg-neutral-800 text-white font-bold'
                            : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                      >
                        {tc}
                      </button>
                    ))}
                  </div>

                  {activeTestcaseIndex === 'custom' ? (
                    <div className="space-y-2">
                      <label className="text-[10px] text-neutral-400 uppercase tracking-wider">
                        Custom Stdin Input Harness
                      </label>
                      <textarea
                        value={customTestInput}
                        onChange={(e) => setCustomTestInput(e.target.value)}
                        className="w-full h-24 p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 outline-none focus:ring-1 focus:ring-[#2B4EFF]"
                        placeholder="Enter custom input parameters..."
                      />
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 space-y-2 text-xs">
                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase">Input:</span>
                        <span className="text-neutral-200 font-mono">
                          {activeTestcaseIndex === 0 ? 'arr = [1, 2, 3, 4, 5], n = 5' : 'arr = [10, 20, 30, 40], n = 4'}
                        </span>
                      </div>
                      <div>
                        <span className="text-neutral-500 block text-[10px] uppercase">Expected:</span>
                        <span className="text-emerald-400 font-mono">
                          {activeTestcaseIndex === 0 ? '[5, 4, 3, 2, 1]' : '[40, 30, 20, 10]'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: INTERACTIVE TERMINAL */}
              {activeConsoleTab === 'terminal' && (
                <div className="flex flex-col h-full space-y-2">
                  <div className="flex-1 space-y-1">
                    {terminalLogs.map((log, i) => (
                      <div key={i} className="leading-relaxed whitespace-pre-wrap text-neutral-300">
                        {log}
                      </div>
                    ))}
                    <div ref={terminalBottomRef} />
                  </div>

                  <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2 border-t border-neutral-800">
                    <span className="text-emerald-400 font-bold">$</span>
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      placeholder="Type command (run, test, clear, help)..."
                      className="flex-1 bg-transparent text-xs font-mono text-white outline-none placeholder:text-neutral-600"
                    />
                  </form>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* =========================================================================
          LEETCODE-STYLE PROBLEM SELECTOR MODAL
      ========================================================================= */}
      {isProblemPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 rounded-[24px] shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-[#E8E4DA] dark:border-neutral-800 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#111111] dark:text-white">
                  Problem Directory ({filteredProblems.length})
                </h3>
                <p className="text-xs text-neutral-500">
                  Select practical problems across DSA, Java, DBMS, Python, and Web Tech.
                </p>
              </div>
              <button
                onClick={() => setIsProblemPickerOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Search & Filter Chips */}
            <div className="p-4 border-b border-[#E8E4DA] dark:border-neutral-800 space-y-3 bg-[#F6F3EC]/50 dark:bg-neutral-900/50">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchProblemQuery}
                  onChange={(e) => setSearchProblemQuery(e.target.value)}
                  placeholder="Search by problem title, topic, or language..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-[#E8E4DA] dark:border-neutral-700 bg-white dark:bg-[#1C1C1E] text-xs font-semibold outline-none focus:ring-2 focus:ring-[#2B4EFF]/20"
                />
              </div>

              {/* Subject Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                <button
                  onClick={() => setSelectedSubject('all')}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedSubject === 'all' ? 'bg-[#2B4EFF] text-white' : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  All Subjects
                </button>
                {ALL_SUBJECTS_METADATA.map(meta => (
                  <button
                    key={meta.name}
                    onClick={() => setSelectedSubject(meta.name)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      selectedSubject === meta.name ? 'bg-[#2B4EFF] text-white' : 'bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
                    }`}
                  >
                    {meta.shortName}
                  </button>
                ))}
              </div>
            </div>

            {/* Problems List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin">
              {filteredProblems.map((prob, idx) => {
                const isSelected = prob.id === currentProblem?.id;
                const isSolved = solvedProblems.includes(prob.id);

                return (
                  <div
                    key={prob.id}
                    onClick={() => handleSelectProblem(prob)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected 
                        ? 'border-[#2B4EFF] bg-[#E6EAFD]/40 dark:bg-blue-950/30 ring-1 ring-[#2B4EFF]'
                        : 'border-[#E8E4DA] dark:border-neutral-800 hover:border-neutral-400 bg-white dark:bg-neutral-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                        isSolved ? 'bg-emerald-500/15 text-emerald-600' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                      }`}>
                        {isSolved ? <Check className="h-4 w-4 stroke-[3]" /> : idx + 1}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-[#111111] dark:text-white truncate">
                            {prob.title}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 truncate">
                          {prob.subjectName} · {prob.fileName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        prob.difficulty === 'Easy' ? 'bg-emerald-500/15 text-emerald-600' :
                        prob.difficulty === 'Medium' ? 'bg-amber-500/15 text-amber-600' : 'bg-rose-500/15 text-rose-600'
                      }`}>
                        {prob.difficulty}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* Lab Manual Print Modal */}
      <LabManualPrintModal
        isOpen={isLabManualOpen}
        onClose={() => setIsLabManualOpen(false)}
        manualData={{
          studentName: 'Student Developer',
          enrollmentNo: 'ENROLL-CURRENT',
          subjectName: currentProblem?.subjectName || 'Engineering Lab',
          semester: getSubjectSemester(currentProblem?.subjectName || ''),
          division: 'Division A',
          practicals: CODING_PROBLEMS.filter(p => p.subjectName === currentProblem?.subjectName).map(p => ({
            id: p.id,
            title: p.title,
            aim: p.description,
            code: p.starterCode,
            output: p.expectedOutput,
            verified: solvedProblems.includes(p.id)
          }))
        }}
      />

    </div>
  );
}
