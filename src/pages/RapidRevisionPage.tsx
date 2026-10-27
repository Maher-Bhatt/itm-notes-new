import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Printer, 
  BookOpen, 
  ExternalLink,
  Code,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RapidSubjectPack {
  id: string;
  code: string;
  name: string;
  goldenConcepts: { title: string; summary: string; topicUrl?: string }[];
  examinerTraps: { trap: string; truth: string }[];
  quickViva: { q: string; a: string }[];
  keyFormulasOrSyntax: { label: string; code: string }[];
}

const RAPID_PACKS: RapidSubjectPack[] = [
  {
    id: 'oopj',
    code: 'C2311C1',
    name: 'Object-Oriented Programming with Java',
    goldenConcepts: [
      {
        title: 'Dynamic Method Dispatch',
        summary: 'When Parent p = new Child() calls p.show(), the Child\'s show() executes. JVM inspects object type on the heap at runtime (vtable lookup).',
        topicUrl: '/subject/oopj'
      },
      {
        title: 'Interface vs Abstract Class (Java 8+)',
        summary: 'Interfaces support multiple inheritance and can have default/static concrete methods. Abstract classes can have instance constructors and state variables.',
        topicUrl: '/subject/oopj'
      },
      {
        title: 'Exception Hierarchy (Checked vs Unchecked)',
        summary: 'Checked exceptions (IOException, SQLException) inherit from Exception and must be handled/declared. Unchecked exceptions inherit from RuntimeException.',
        topicUrl: '/subject/oopj'
      },
      {
        title: 'Multithreading: wait() vs sleep()',
        summary: 'wait() belongs to Object class, must be inside synchronized block, and releases the lock. sleep() belongs to Thread class and holds the lock.',
        topicUrl: '/subject/oopj'
      },
      {
        title: 'Collection Framework Time Complexities',
        summary: 'ArrayList get: O(1), add: O(1) amortized. LinkedList: O(1) ends, O(N) middle. HashMap get/put: O(1) average, O(log N) worst (Java 8 treeified).',
        topicUrl: '/subject/oopj'
      }
    ],
    examinerTraps: [
      {
        trap: 'Variables can be overridden in subclasses just like methods.',
        truth: 'Variables use compile-time static binding. If Parent has int x = 10 and Child has int x = 20, p.x always accesses Parent\'s 10!'
      },
      {
        trap: 'finally block always executes without exception.',
        truth: 'finally executes unless System.exit(0) is invoked or the JVM crashes / power fails.'
      },
      {
        trap: 'Anonymous inner classes cannot access local variables.',
        truth: 'They CAN access local variables, provided those variables are effectively final.'
      }
    ],
    quickViva: [
      { q: 'Why is Java platform independent?', a: 'Because Java compiles into bytecode executed by platform-specific JVMs.' },
      { q: 'What is the role of the ClassLoader?', a: 'It dynamically loads, links, and initializes Java .class files into memory.' },
      { q: 'Can constructors be private?', a: 'Yes! Used in Singleton design patterns and utility classes to prevent direct instantiation.' }
    ],
    keyFormulasOrSyntax: [
      {
        label: 'Custom Exception Boilerplate',
        code: `class InvalidMarksException extends Exception {\n    public InvalidMarksException(String msg) {\n        super(msg);\n    }\n}`
      },
      {
        label: 'Multithreading Runnable Pattern',
        code: `Runnable task = () -> System.out.println("Async thread: " + Thread.currentThread().getName());\nnew Thread(task).start();`
      }
    ]
  },
  {
    id: 'dsa',
    code: 'C2310C5',
    name: 'Data Structures & Algorithms',
    goldenConcepts: [
      {
        title: 'Master Theorem for Divide & Conquer',
        summary: 'T(n) = aT(n/b) + O(n^d). If d < log_b(a) -> O(n^(log_b a)). If d == log_b(a) -> O(n^d log n). If d > log_b(a) -> O(n^d).',
        topicUrl: '/subject/dsa'
      },
      {
        title: 'Circular Queue Full Condition',
        summary: '(rear + 1) % MAX == front. Eliminates false overflow in linear queues by reusing dequeued empty slots.',
        topicUrl: '/subject/dsa'
      },
      {
        title: 'AVL Tree Balance Factor & Rotations',
        summary: 'BF = height(left) - height(right) in {-1, 0, 1}. Four balance fixes: LL (Right rotate), RR (Left rotate), LR (Left then Right), RL (Right then Left).',
        topicUrl: '/subject/dsa'
      },
      {
        title: 'Dijkstra vs Bellman-Ford',
        summary: 'Dijkstra: Greedy, O((V + E) log V), fails on negative weight edges. Bellman-Ford: Dynamic Programming, O(VE), detects negative weight cycles.',
        topicUrl: '/subject/dsa'
      },
      {
        title: 'QuickSort vs MergeSort',
        summary: 'QuickSort: In-place, O(N log N) avg, O(N^2) worst on sorted data. MergeSort: Stable, O(N log N) always, requires O(N) extra memory.',
        topicUrl: '/subject/dsa'
      }
    ],
    examinerTraps: [
      {
        trap: 'Binary Search runs in O(log N) on a singly linked list.',
        truth: 'No! Finding the middle element of a linked list requires O(N) sequential traversal, making binary search on linked lists O(N).'
      },
      {
        trap: 'DFS always finds the shortest path in unweighted graphs.',
        truth: 'False! BFS guarantees the shortest path (minimum edge count) in unweighted graphs. DFS may take long wandering paths.'
      }
    ],
    quickViva: [
      { q: 'What is a Complete Binary Tree?', a: 'Every level is fully filled except possibly the last, which is filled from left to right.' },
      { q: 'What is the minimum height of a BST with N nodes?', a: 'floor(log_2 N).' },
      { q: 'When is a Circular Linked List preferred?', a: 'In Round-Robin CPU scheduling where tasks cycle indefinitely.' }
    ],
    keyFormulasOrSyntax: [
      {
        label: 'Binary Tree Node Structure (C / Java)',
        code: `class Node {\n    int data;\n    Node left, right;\n    Node(int val) { data = val; }\n}`
      }
    ]
  },
  {
    id: 'ca',
    code: 'C2311C3',
    name: 'Computer Architecture & Organization',
    goldenConcepts: [
      {
        title: 'Booth\'s Multiplication Algorithm',
        summary: 'Multiplies signed binary numbers using 2\'s complement. Examine Q0, Q-1: 01 -> A = A + M; 10 -> A = A - M; then Arithmetic Shift Right (ASR) preserving sign bit.',
        topicUrl: '/subject/ca-101'
      },
      {
        title: 'Average Memory Access Time (AMAT)',
        summary: 'AMAT = Hit Time + (Miss Rate * Miss Penalty). Multi-level cache AMAT = T_L1 + M_L1 * (T_L2 + M_L2 * Penalty_RAM).',
        topicUrl: '/subject/ca-101'
      },
      {
        title: 'Pipeline Hazards & Mitigations',
        summary: 'Structural (Resource conflict -> separate I/D caches), Data RAW/WAR/WAW (Mitigated via Operand Forwarding or NOP bubbles), Control (Branches -> Branch Predictor).',
        topicUrl: '/subject/ca-101'
      },
      {
        title: 'Pipelining Speedup Ratio',
        summary: 'Ideal Speedup S = k (number of stages) as N -> infinity. Time for N instructions with k stages: (k + N - 1) clock cycles.',
        topicUrl: '/subject/ca-101'
      },
      {
        title: 'Direct vs Associative Cache Mapping',
        summary: 'Direct: Block address modulo num_lines (high conflict misses). Fully Associative: Anywhere (no conflict misses, expensive comparator hardware).',
        topicUrl: '/subject/ca-101'
      }
    ],
    examinerTraps: [
      {
        trap: 'Arithmetic Shift Right (ASR) shifts in a 0 into the MSB.',
        truth: 'No! Logical Shift Right shifts in 0. ASR duplicates the sign bit (MSB) to preserve the negative/positive sign!'
      },
      {
        trap: 'A 5-stage pipeline makes an individual instruction execute 5 times faster.',
        truth: 'False! An individual instruction still takes 5 clock cycles. Pipelining increases instruction throughput (rate of completion), not single instruction latency.'
      }
    ],
    quickViva: [
      { q: 'What is the purpose of the Program Counter (PC)?', a: 'Holds the memory address of the next instruction to be fetched and executed.' },
      { q: 'What is DMA and why is it used?', a: 'Direct Memory Access transfers high-speed data directly between I/O and RAM without CPU intervention.' }
    ],
    keyFormulasOrSyntax: [
      {
        label: 'Pipeline Speedup Formula',
        code: `Speedup S = (N * t_non_pipelined) / ((k + N - 1) * t_pipelined)`
      }
    ]
  },
  {
    id: 'dbms',
    code: 'C2311C4',
    name: 'Database Management Systems',
    goldenConcepts: [
      {
        title: 'ACID Properties in Transactions',
        summary: 'Atomicity (All or nothing via WAL log), Consistency (Integrity constraints intact), Isolation (Serializability via 2PL), Durability (Committed updates persist across crashes).',
        topicUrl: '/subject/dbms'
      },
      {
        title: 'Normal Forms (1NF to BCNF)',
        summary: '1NF: Atomic values. 2NF: 1NF + No partial dependency. 3NF: 2NF + No transitive dependency. BCNF: For every X -> Y, X must be a superkey.',
        topicUrl: '/subject/dbms'
      },
      {
        title: 'Two-Phase Locking (2PL)',
        summary: 'Growing phase: Locks acquired, none released. Shrinking phase: Locks released, none acquired. Guarantees conflict serializability.',
        topicUrl: '/subject/dbms'
      },
      {
        title: 'B-Tree vs B+ Tree in Indexing',
        summary: 'B+ Tree stores all data records exclusively in leaf nodes linked horizontally via a linked list, making range queries drastically faster than standard B-Trees.',
        topicUrl: '/subject/dbms'
      },
      {
        title: 'SQL Joins & Relational Algebra',
        summary: 'Inner Join (Intersecting keys), Left Outer (All left + matched right), Full Outer (Union with NULL padding). Cartesian Product size = |R| * |S|.',
        topicUrl: '/subject/dbms'
      }
    ],
    examinerTraps: [
      {
        trap: 'A 3NF table is always free of all redundancy.',
        truth: 'False! BCNF is stricter than 3NF. 3NF still allows redundancy when functional dependencies have overlapping candidate keys.'
      },
      {
        trap: 'Primary keys allow a single NULL value in SQL.',
        truth: 'No! Primary keys enforce NOT NULL and UNIQUE strictly. Unique keys allow NULL values depending on the DBMS.'
      }
    ],
    quickViva: [
      { q: 'What is a Foreign Key constraint?', a: 'A field referencing the Primary Key of another table, enforcing referential integrity.' },
      { q: 'What is a View in SQL?', a: 'A virtual table based on the result-set of an SQL query that contains no physical data of its own.' }
    ],
    keyFormulasOrSyntax: [
      {
        label: 'Trigger Boilerplate in PostgreSQL / MySQL',
        code: `CREATE TRIGGER audit_student_update\nAFTER UPDATE ON students\nFOR EACH ROW\nEXECUTE FUNCTION log_student_changes();`
      }
    ]
  }
];

export default function RapidRevisionPage() {
  const [activeSubjectId, setActiveSubjectId] = useState<string>('oopj');
  const navigate = useNavigate();

  const activePack = RAPID_PACKS.find(p => p.id === activeSubjectId) || RAPID_PACKS[0];

  return (
    <div className="container max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wide flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" /> High-Yield Revision
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold text-xs">
              30-Minute Cram Mode
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Rapid Revision Packs
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            The essential 5 golden concepts, examiner traps, and 10-minute viva cheat sheets for exam morning.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-xl border border-border/80 bg-card hover:bg-secondary text-foreground text-xs font-semibold flex items-center gap-2 shadow-sm transition-all apple-press self-start sm:self-auto"
        >
          <Printer className="h-4 w-4" /> Print Cheat Sheet
        </button>
      </div>

      {/* Subject Tabs */}
      <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2">
        {RAPID_PACKS.map(pack => {
          const isActive = pack.id === activeSubjectId;
          return (
            <button
              key={pack.id}
              onClick={() => setActiveSubjectId(pack.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all apple-press border ${
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-card border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <span>{pack.code}: {pack.name.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Pack Content */}
      <div className="space-y-6">
        {/* Pack Title Card */}
        <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-primary px-2 py-0.5 rounded bg-primary/10">
              {activePack.code}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mt-1">
              {activePack.name}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              High-frequency exam formulas, traps, and oral questions
            </p>
          </div>

          <button
            onClick={() => navigate(`/subject/${activePack.id}`)}
            className="px-4 py-2 rounded-xl bg-secondary text-foreground text-xs font-semibold hover:bg-secondary/80 flex items-center gap-1.5 transition-all self-start sm:self-auto"
          >
            <span>Open Full Subject Notes</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Section 1: 5 Golden Concepts */}
        <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-amber-500" />
            5 Golden Exam Concepts (100% Asked in End-Sem / MST):
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {activePack.goldenConcepts.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-secondary/30 border border-border/70 hover:border-primary/40 transition-all space-y-1"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-foreground flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">
                      {idx + 1}
                    </span>
                    {item.title}
                  </h4>
                  {item.topicUrl && (
                    <button
                      onClick={() => navigate(item.topicUrl!)}
                      className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-0.5"
                    >
                      <span>Study Full Note</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground pl-7 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Examiner Traps */}
        <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-foreground flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-500" />
            Top Examiner Traps & Misconceptions:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activePack.examinerTraps.map((trap, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2"
              >
                <div className="text-xs font-bold text-rose-700 dark:text-rose-400 flex items-start gap-1.5">
                  <span className="shrink-0 text-rose-500">❌ Trap:</span>
                  <span>{trap.trap}</span>
                </div>
                <div className="text-xs font-medium text-indigo-400 dark:text-indigo-400 flex items-start gap-1.5 pt-1 border-t border-rose-500/10">
                  <span className="shrink-0 text-indigo-400">✓ Truth:</span>
                  <span>{trap.truth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: 10-Minute Viva Quick Fire */}
        <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-foreground flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            10-Minute Viva Quick-Fire Round:
          </h3>

          <div className="divide-y divide-border/60">
            {activePack.quickViva.map((v, idx) => (
              <div key={idx} className="py-3 first:pt-0 last:pb-0 space-y-1">
                <p className="text-xs font-bold text-foreground">
                  Q: {v.q}
                </p>
                <p className="text-xs text-muted-foreground pl-3 border-l-2 border-primary/50">
                  A: {v.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Key Syntax & Boilerplates */}
        {activePack.keyFormulasOrSyntax.length > 0 && (
          <div className="bg-card border border-border/80 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="font-extrabold text-sm sm:text-base text-foreground flex items-center gap-2">
              <Code className="h-4 w-4 text-purple-500" />
              Must-Memorize Syntax & Boilerplates:
            </h3>

            <div className="space-y-3">
              {activePack.keyFormulasOrSyntax.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="text-xs font-bold text-foreground">{item.label}</span>
                  <pre className="p-3.5 rounded-2xl bg-black/90 text-indigo-400 font-mono text-xs overflow-x-auto">
                    <code>{item.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
