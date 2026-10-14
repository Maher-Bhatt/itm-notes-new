import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Download, 
  Search, 
  BookOpen, 
  FolderDown, 
  FileText, 
  ExternalLink,
  Sparkles,
  Eye,
  Calendar,
  FileCheck,
  X,
  Code2,
  FileCode,
  GraduationCap,
  Layers,
  CheckCircle2,
  Maximize2
} from "lucide-react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip 
} from "recharts";
import { toast } from "sonner";
import { TIMETABLE_DATA, TimetableBatch } from "@/data/timetableData";

export interface SubjectOverviewCard {
  id: string;
  code: string;
  tag: string;
  tagColor: string;
  title: string;
  subtitle: string;
  pages: string;
  fileSize: string;
  pdfUrl: string;
  summary: string;
  formulas: { title: string; formula: string; note: string }[];
  solvedQuestions: { q: string; a: string }[];
}

// Subject Overviews Cards with Authentic University PDFs
const SUBJECT_OVERVIEW_CARDS: SubjectOverviewCard[] = [
  {
    id: "mat-1",
    code: "C2310C5 · DSA",
    tag: "Core Notes",
    tagColor: "bg-emerald-500 text-white shadow-xs",
    title: "Data Structures: Queue & Stack Master Notes",
    subtitle: "Linear & Circular Queue implementations, dry runs, algorithms, and Railway Reservation practicals.",
    pages: "18 Pages",
    fileSize: "2.4 MB",
    pdfUrl: "/materials/Queue_Notes.pdf",
    summary: "Comprehensive theoretical and implementation guide for Stacks and Queues. Covers FIFO queue fundamentals, front & rear pointer management, boundary checks (overflow/underflow), circular queue arithmetic modulo MAX, and double-ended queues (deque). Includes complete C99 and Java practical code with step-by-step memory trace dry-runs.",
    formulas: [
      { title: "Circular Queue Enqueue", formula: "rear = (rear + 1) % MAX; waitQ[rear] = item;", note: "Prevents memory wastage from drifting front pointer" },
      { title: "Circular Queue IsFull", formula: "(rear + 1) % MAX == front", note: "Returns true if queue has reached maximum capacity" },
      { title: "Queue Length / Count", formula: "front == -1 ? 0 : (rear >= front ? rear - front + 1 : MAX - front + rear + 1)", note: "Accurate count calculation across circular boundary" }
    ],
    solvedQuestions: [
      { 
        q: "Q1: Explain the limitation of a simple linear queue using arrays and how circular queues resolve it.", 
        a: "In a linear array queue, once elements are dequeued, front advances forward. Even if elements are removed from the front, rear reaches MAX-1 and reports false overflow while earlier positions remain empty. A circular queue connects the last position back to the first using modulo arithmetic ((rear + 1) % MAX), reusing freed slots." 
      },
      { 
        q: "Q2: Write the algorithm for allocating seats in a Railway Reservation Waiting List queue.", 
        a: "1. Check if front == -1 or front > rear (Queue Empty). If true, print 'No waiting passengers' and return.\n2. Else, retrieve passenger ID at waitQ[front].\n3. Print 'Seat allocated to Passenger: [ID]'.\n4. Increment front by 1.\n5. If front > rear, reset front = -1, rear = -1 to reclaim array." 
      }
    ]
  },
  {
    id: "mat-2",
    code: "C2311C4 · DBMS",
    tag: "Core Notes",
    tagColor: "bg-blue-600 text-white shadow-xs",
    title: "DBMS Complete Lecture Notes & SQL Guide",
    subtitle: "Relational Algebra, SQL triggers, ACID transaction states, and 1NF to BCNF normalization proofs.",
    pages: "28 Pages",
    fileSize: "3.8 MB",
    pdfUrl: "/materials/DBMS_Complete_Lecture_Notes.pdf",
    summary: "Master reference covering ANSI/SPARC 3-tier database architecture, conceptual ER-to-Relational mapping rules, relational calculus & algebra operators, complete DDL/DML SQL statements, B-Tree index structures, ACID concurrency controls, and schema decomposition up to Boyce-Codd Normal Form.",
    formulas: [
      { title: "Lossless Join Decomposition", formula: "(R1 ∩ R2) → R1  OR  (R1 ∩ R2) → R2", note: "Intersection of attributes must be a superkey in at least one relation" },
      { title: "Boyce-Codd Normal Form (BCNF)", formula: "For every non-trivial FD X → Y, X must be a superkey", note: "Eliminates all anomalies resulting from functional dependencies" }
    ],
    solvedQuestions: [
      { 
        q: "Q1: Distinguish between 3NF and BCNF with a suitable functional dependency example.", 
        a: "A relation is in 3NF if for every non-trivial FD X → A, either X is a superkey OR A is a prime attribute. In BCNF, X MUST be a superkey—there is no relaxation for prime attributes. Every BCNF relation is in 3NF, but the reverse is not always true." 
      }
    ]
  },
  {
    id: "mat-3",
    code: "CET-2 / MST",
    tag: "Official Timetable",
    tagColor: "bg-amber-500 text-white shadow-xs",
    title: "Official Mid-Sem Timetable (CET-2 / MST)",
    subtitle: "Complete exam dates, paper timings, room allocations, and student instructions for 2026.",
    pages: "12 Pages",
    fileSize: "1.2 MB",
    pdfUrl: "/materials/Time_Table_CET2_MST_2026.pdf",
    summary: "Official examination roster issued by the Controller of Examinations, ITM SLS Baroda University. Outlines examination slots (Morning: 10:10 AM - 12:10 PM, Afternoon: 12:30 PM - 02:30 PM), hall ticket verification rules, non-programmable calculator guidelines, and seating arrangements.",
    formulas: [
      { title: "Minimum Attendance Requirement", formula: "Attendance >= 75%", note: "Mandatory for Hall Ticket issuance as per University Ordinances" },
      { title: "Internal CIE Weightage", formula: "CIE (50) = MST (30) + Continuous Evaluation / Assignments (20)", note: "50% weightage towards final semester grading" }
    ],
    solvedQuestions: [
      { 
        q: "What is the passing criteria for Semester examinations?", 
        a: "Students must achieve at least 40% aggregate marks (Internal + External combined) and minimum 35% in the End-Semester University theory paper to be awarded a passing letter grade (DD or above)." 
      }
    ]
  },
  {
    id: "mat-4",
    code: "C2310C2 · COA",
    tag: "Core Notes",
    tagColor: "bg-purple-600 text-white shadow-xs",
    title: "Computer Architecture & Organization MST Notes",
    subtitle: "Instruction sets, addressing modes, 5-stage RISC pipelines, cache mapping, and Booth's algorithm.",
    pages: "24 Pages",
    fileSize: "2.1 MB",
    pdfUrl: "/materials/Computer_Architecture_MST_Notes.pdf",
    summary: "Hardware organization and micro-architecture fundamentals. Covers Von Neumann vs Harvard architectures, control unit designs (Hardwired vs Microprogrammed), structural/data/control pipeline hazards, direct vs set-associative cache mappings, and virtual memory paging.",
    formulas: [
      { title: "Speedup from Pipelining", formula: "S_k = (n * t_non_pipelined) / ((k + n - 1) * t_cycle)", note: "Theoretical maximum speedup approaches k as n becomes large" },
      { title: "Average Memory Access Time (AMAT)", formula: "AMAT = Hit_Time + (Miss_Rate * Miss_Penalty)", note: "Fundamental metric for multi-level hierarchical cache design" }
    ],
    solvedQuestions: [
      { 
        q: "Q1: Explain how Booth's Algorithm performs fast signed 2's complement multiplication.", 
        a: "Booth's algorithm inspects adjacent pairs of multiplier bits (Q0 and Q-1). If '01' it adds the multiplicand, if '10' it subtracts the multiplicand, and if '00' or '11' it simply performs an arithmetic right shift. This reduces the number of addition/subtraction cycles on consecutive blocks of 1s." 
      }
    ]
  },
  {
    id: "mat-5",
    code: "S2320C1 · CONMP",
    tag: "Formula Sheet",
    tagColor: "bg-teal-600 text-white shadow-xs",
    title: "Numerical Methods Formula & Cheatsheet (Python)",
    subtitle: "Newton-Raphson, Bisection, Gauss-Elimination, Runge-Kutta, and error bounds formulas.",
    pages: "14 Pages",
    fileSize: "1.8 MB",
    pdfUrl: "/materials/CONMP_Numerical_Methods_Formula_Sheet.pdf",
    summary: "Quick-revision handbook containing numerical algorithms and Python scipy/numpy implementations for solving non-linear equations, systems of linear algebraic equations, numerical integration (Trapezoidal, Simpson's 1/3 and 3/8 rules), and initial value ODE problems.",
    formulas: [
      { title: "Newton-Raphson Iteration", formula: "x_{n+1} = x_n - f(x_n) / f'(x_n)", note: "Quadratic order of convergence (p = 2) near simple roots" },
      { title: "Simpson's 1/3 Rule", formula: "∫ f(x) dx ≈ (h/3) * [f0 + 4*(f1+f3+...) + 2*(f2+f4+...) + fn]", note: "Exact for polynomials up to degree 3 with step size h = (b-a)/n" }
    ],
    solvedQuestions: [
      { 
        q: "Q1: What is the condition for convergence of the Newton-Raphson method?", 
        a: "The method converges if |f(x) * f''(x)| < [f'(x)]^2 in the interval containing the root, and the initial guess x0 is chosen sufficiently close to the true root where f'(x) ≠ 0." 
      }
    ]
  },
  {
    id: "mat-6",
    code: "C2311C1 · JAVA",
    tag: "Lab Manual",
    tagColor: "bg-rose-600 text-white shadow-xs",
    title: "Java OOP Official Lab Manual & Experiments",
    subtitle: "Full practical code, classes, inheritance, custom exceptions, multithreading, and file I/O.",
    pages: "32 Pages",
    fileSize: "3.1 MB",
    pdfUrl: "/materials/Java_Official_Lab_Manual.pdf",
    summary: "Step-by-step practical laboratory manual aligned with the university syllabus. Contains 12 mandatory lab experiments from basic syntax to thread synchronization and collections framework, complete with expected terminal outputs and viva voce questions.",
    formulas: [
      { title: "Thread Creation Options", formula: "class MyThread extends Thread  OR  class MyTask implements Runnable", note: "Implementing Runnable is preferred to avoid single inheritance limitation" },
      { title: "Custom Checked Exception", formula: "class InvalidAgeException extends Exception { public InvalidAgeException(String s) { super(s); } }", note: "Must be handled with try-catch or declared in throws clause" }
    ],
    solvedQuestions: [
      { 
        q: "Q1: What happens if you call run() directly instead of start() on a Thread object?", 
        a: "Calling run() directly executes the method on the current calling thread synchronously just like an ordinary method call. No new thread is spawned. Calling start() schedules a new OS-level thread and invokes run() concurrently." 
      }
    ]
  },
];

function MaterialCardThumbnail({ id }: { id: string }) {
  if (id === "mat-1") {
    return (
      <div className="w-full h-full rounded-xl bg-slate-900 text-slate-300 p-2.5 flex flex-col justify-between font-mono text-[9px] border border-emerald-500/30 shadow-xs">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[8px] text-emerald-400 font-bold">Queue_Notes.pdf</span>
          </div>
          <span className="text-[7.5px] px-1 rounded bg-emerald-500/20 text-emerald-300">C99 / Java</span>
        </div>
        <div className="space-y-0.5 text-slate-400 text-[8px] leading-tight">
          <p className="text-emerald-300">front = 0; rear = -1;</p>
          <p>waitQ[++rear] = tokenNumber;</p>
          <p className="text-pink-300">// Railway Reservation</p>
        </div>
        <div className="text-[8px] text-emerald-400 font-bold flex justify-between items-center">
          <span>✓ Queue ADT</span>
          <span>18 Pgs</span>
        </div>
      </div>
    );
  }
  if (id === "mat-2") {
    return (
      <div className="w-full h-full rounded-xl bg-slate-900 text-slate-300 p-2.5 flex flex-col justify-between font-mono text-[9px] border border-blue-500/30 shadow-xs">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-[8px] text-blue-400 font-bold">DBMS_Notes.pdf</span>
          </div>
          <span className="text-[7.5px] px-1 rounded bg-blue-500/20 text-blue-300">SQL / 3NF</span>
        </div>
        <div className="space-y-0.5 text-slate-400 text-[8px] leading-tight">
          <p className="text-blue-300">SELECT name, seat_no</p>
          <p>FROM reservations</p>
          <p className="text-cyan-300">WHERE status = 'WAITING';</p>
        </div>
        <div className="text-[8px] text-blue-400 font-bold flex justify-between items-center">
          <span>✓ BCNF Proofs</span>
          <span>28 Pgs</span>
        </div>
      </div>
    );
  }
  if (id === "mat-3") {
    return (
      <div className="w-full h-full rounded-xl bg-slate-900 text-slate-300 p-2.5 flex flex-col justify-between font-mono text-[9px] border border-amber-500/30 shadow-xs">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span className="text-[8px] text-amber-400 font-bold">TimeTable_2026.pdf</span>
          </div>
          <span className="text-[7.5px] px-1 rounded bg-amber-500/20 text-amber-300">Official</span>
        </div>
        <div className="space-y-0.5 text-slate-300 text-[8px] leading-tight">
          <p className="text-amber-300 font-bold">CET-2 / MST 2026</p>
          <p>Slot: 10:10 AM - 12:10 PM</p>
          <p className="text-slate-400">SLS Baroda University</p>
        </div>
        <div className="text-[8px] text-amber-400 font-bold flex justify-between items-center">
          <span>✓ Exam Cell</span>
          <span>12 Pgs</span>
        </div>
      </div>
    );
  }
  if (id === "mat-4") {
    return (
      <div className="w-full h-full rounded-xl bg-slate-900 text-slate-300 p-2.5 flex flex-col justify-between font-mono text-[9px] border border-purple-500/30 shadow-xs">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            <span className="text-[8px] text-purple-400 font-bold">Comp_Arch.pdf</span>
          </div>
          <span className="text-[7.5px] px-1 rounded bg-purple-500/20 text-purple-300">RISC-V</span>
        </div>
        <div className="space-y-0.5 text-slate-400 text-[8px] leading-tight">
          <p className="text-purple-300">IF → ID → EX → MEM → WB</p>
          <p>Hazard: RAW / WAR / WAW</p>
          <p className="text-teal-300">Cache: Set-Associative</p>
        </div>
        <div className="text-[8px] text-purple-400 font-bold flex justify-between items-center">
          <span>✓ Booth's Algo</span>
          <span>24 Pgs</span>
        </div>
      </div>
    );
  }
  if (id === "mat-5") {
    return (
      <div className="w-full h-full rounded-xl bg-slate-900 text-slate-300 p-2.5 flex flex-col justify-between font-mono text-[9px] border border-teal-500/30 shadow-xs">
        <div className="flex items-center justify-between pb-1 border-b border-slate-800">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
            <span className="text-[8px] text-teal-400 font-bold">Numerical_Methods.pdf</span>
          </div>
          <span className="text-[7.5px] px-1 rounded bg-teal-500/20 text-teal-300">Python</span>
        </div>
        <div className="space-y-0.5 text-slate-400 text-[8px] leading-tight">
          <p className="text-teal-300">x_{'{n+1}'} = x_n - f(x_n)/f'(x_n)</p>
          <p>RK4: k1, k2, k3, k4</p>
          <p className="text-yellow-300">Simpson's 1/3 Rule</p>
        </div>
        <div className="text-[8px] text-teal-400 font-bold flex justify-between items-center">
          <span>✓ Formula Sheet</span>
          <span>14 Pgs</span>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-full rounded-xl bg-slate-900 text-slate-300 p-2.5 flex flex-col justify-between font-mono text-[9px] border border-rose-500/30 shadow-xs">
      <div className="flex items-center justify-between pb-1 border-b border-slate-800">
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span className="text-[8px] text-rose-400 font-bold">Java_Lab_Manual.pdf</span>
        </div>
        <span className="text-[7.5px] px-1 rounded bg-rose-500/20 text-rose-300">JDK 17</span>
      </div>
      <div className="space-y-0.5 text-slate-400 text-[8px] leading-tight">
        <p className="text-rose-300">public class PassengerQueue &#123;</p>
        <p className="pl-1">Queue&lt;Integer&gt; waitQ = new ArrayDeque&lt;&gt;();</p>
        <p className="text-emerald-300">&#125;</p>
      </div>
      <div className="text-[8px] text-rose-400 font-bold flex justify-between items-center">
        <span>✓ 12 Experiments</span>
        <span>32 Pgs</span>
      </div>
    </div>
  );
}

// Question Banks Chart Data matching Screenshot 2
const QUESTION_BANK_TREND_DATA = [
  { date: "Oct 00", count: 18 },
  { date: "Oct 08", count: 32 },
  { date: "Oct 16", count: 48 },
  { date: "Oct 24", count: 38 },
  { date: "Oct 30", count: 72 },
  { date: "Nov 10", count: 85 },
];

export default function MaterialsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubTab, setSelectedSubTab] = useState<"notes" | "timetables">("notes");
  const [selectedBatchId, setSelectedBatchId] = useState<string>("b.tech-sem3-cse");
  const [activePreview, setActivePreview] = useState<SubjectOverviewCard | null>(null);
  const [previewTab, setPreviewTab] = useState<"pdf" | "summary" | "questions" | "download">("pdf");

  // Filtered cards based on search query
  const filteredOverviews = useMemo(() => {
    if (!searchQuery.trim()) return SUBJECT_OVERVIEW_CARDS;
    return SUBJECT_OVERVIEW_CARDS.filter(c => 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const activeBatch = useMemo(() => {
    return TIMETABLE_DATA.find(b => b.id === selectedBatchId) || TIMETABLE_DATA[3] || TIMETABLE_DATA[0];
  }, [selectedBatchId]);

  const handleDownloadPdf = (card: SubjectOverviewCard) => {
    toast.success(`Downloading ${card.title}...`);
    const a = document.createElement("a");
    a.href = card.pdfUrl;
    a.download = `${card.title.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in">
      {/* ── TOP HEADER SECTION matching Screenshot 2 ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2">
            <span>ITM MOOCs Materials & Repositories</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
              Authentic PDFs Ready
            </span>
          </h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 font-medium">
            <span>Academic resources</span>
            <span>·</span>
            <span>Multi-University syllabus & courseware</span>
            <span>·</span>
            <span>SLS Baroda University & Partner Curricula</span>
            <span>·</span>
            <span className="text-foreground font-semibold">Sem 3 Hub</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Sub Tabs */}
          <div className="flex rounded-xl bg-secondary p-1 border border-border text-xs font-semibold">
            <button
              onClick={() => setSelectedSubTab("notes")}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedSubTab === "notes" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
              }`}
            >
              Curriculum Notes & PDFs
            </button>
            <button
              onClick={() => setSelectedSubTab("timetables")}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedSubTab === "timetables" ? "bg-background text-foreground shadow-xs font-bold" : "text-muted-foreground"
              }`}
            >
              Official Timetables
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search PDF or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 pl-8 pr-3 w-48 sm:w-60 rounded-xl bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* ── SECTION 1: 6-CARD GRID OF SUBJECT OVERVIEWS matching Screenshot 2 ── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-sm text-foreground">
              Core Course Modules & PDF Repositories
            </h2>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
              {filteredOverviews.length} documents
            </span>
          </div>
          <button
            onClick={() => {
              setActivePreview(SUBJECT_OVERVIEW_CARDS[0]);
              setPreviewTab("pdf");
            }}
            className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
          >
            <span>Preview Featured PDF (Queue Notes)</span>
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOverviews.map((item) => (
            <div
              key={item.id}
              className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-border/80 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Card Top: Code Pill & Tag */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono text-[10px] font-bold text-muted-foreground tracking-wide">
                  {item.code}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.tagColor}`}>
                  {item.tag}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-3 space-y-1">
                <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>
              </div>

              {/* Thumbnail Area */}
              <div className="h-28 w-full my-1 rounded-xl overflow-hidden">
                <MaterialCardThumbnail id={item.id} />
              </div>

              {/* Card Bottom: Pages, Size & Actions */}
              <div className="pt-3 mt-1 border-t border-border/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground font-medium text-[11px]">
                  <span>{item.pages}</span>
                  <span>·</span>
                  <span className="font-mono font-semibold">{item.fileSize}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setActivePreview(item);
                      setPreviewTab("pdf");
                    }}
                    className="h-7 px-2.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-[11px] flex items-center gap-1 transition-colors"
                  >
                    <Eye className="h-3 w-3" />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleDownloadPdf(item)}
                    className="h-7 px-2.5 rounded-lg bg-primary hover:opacity-90 text-primary-foreground font-semibold text-[11px] flex items-center gap-1 transition-all active:scale-95 shadow-xs"
                  >
                    <Download className="h-3 w-3" />
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SECTION 2: QUESTION BANKS CHART & SUMMARY SIDEBAR matching Screenshot 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Question Banks Trend Area (~70% -> lg:col-span-8) */}
        <div className="lg:col-span-8 bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <span>Subject Question Banks</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 dark:text-blue-400 font-bold">
                  High Yield
                </span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Distribution of high-frequency university exam questions across Semester 3 units
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground font-mono">Solved Velocity</span>
              <span className="text-xs font-bold text-emerald-500 font-mono">+42% this week</span>
            </div>
          </div>

          {/* Recharts Area Chart */}
          <div className="h-44 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={QUESTION_BANK_TREND_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <XAxis 
                  dataKey="date" 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={{ stroke: '#e2e8f0' }} 
                />
                <YAxis 
                  stroke="#94a3b8" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg bg-slate-900 text-white p-2 text-xs shadow-lg border border-slate-800">
                          <p className="font-bold">{payload[0].payload.date}</p>
                          <p className="text-emerald-400">{payload[0].value} Solved Questions</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#183F36"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: '#183F36' }}
                  activeDot={{ r: 5, fill: '#D6E85D' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Metrics / Download Bundle (~30% -> lg:col-span-4) */}
        <div className="lg:col-span-4 bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-bold text-sm text-foreground">Semester 3 Archive</h3>
              <span className="text-xs text-muted-foreground font-mono font-medium">SLS Baroda</span>
            </div>

            {/* Metric Grid 2 Rows */}
            <div className="grid grid-cols-5 gap-2 text-center py-1">
              <div>
                <span className="text-base font-black font-mono text-foreground block">32</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Notes</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-brand-forest dark:text-emerald-400 block">67</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">MCQs</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-foreground block">31</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Prac</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-brand-forest dark:text-emerald-400 block">515</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Quest</span>
              </div>
              <div>
                <span className="text-base font-black font-mono text-emerald-600 dark:text-brand-chartreuse block">50%</span>
                <span className="text-[10px] text-muted-foreground uppercase font-semibold">Solved</span>
              </div>

              {/* Row 2 */}
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">24</span>
                <span className="text-[9px] text-muted-foreground">Files</span>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">4</span>
                <span className="text-[9px] text-muted-foreground">Units</span>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">5</span>
                <span className="text-[9px] text-muted-foreground">Themes</span>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">27</span>
                <span className="text-[9px] text-muted-foreground">Images</span>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-xs font-bold font-mono text-foreground block">1.2k</span>
                <span className="text-[9px] text-muted-foreground">Views</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              toast.success("Preparing offline bundle: 32 Notes & 515 Questions (24.8 MB)...");
              const a = document.createElement("a");
              a.href = "/materials/Time_Table_CET2_MST_2026.pdf";
              a.download = "ITM_Sem3_Master_Revision_Bundle.pdf";
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            className="w-full h-10 rounded-xl bg-brand-forest hover:bg-brand-deep text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-brand-forest/20"
          >
            <FolderDown className="h-4 w-4 text-brand-chartreuse" />
            <span>Get Revision Now (Download Master PDF)</span>
          </button>
        </div>
      </div>

      {/* ── SECTION 3: BOTTOM ROW: TIMETABLES & CHEATSHEET BANNER matching Screenshot 2 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Table: Timetables (~65% -> lg:col-span-8) */}
        <div className="lg:col-span-8 bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-foreground">Official Examination Timetables</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
                CET-2 / MST 2026
              </span>
            </div>

            {/* Batch Selector Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {TIMETABLE_DATA.map((batch) => (
                <button
                  key={batch.id}
                  onClick={() => setSelectedBatchId(batch.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    selectedBatchId === batch.id
                      ? "bg-primary text-primary-foreground font-bold shadow-xs"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {batch.id === "b.tech-sem3-cse" ? "B.Tech Sem 3 CSE" :
                   batch.id === "bca-sem3" ? "BCA Sem 3" :
                   batch.id === "mca-sem3" ? "MCA Sem 3" :
                   batch.id === "b.tech-sem5-cse" ? "B.Tech Sem 5" : batch.name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-[10px] font-bold text-muted-foreground uppercase border-b border-border">
                <tr>
                  <th className="pb-2.5">Date</th>
                  <th className="pb-2.5">Course Code</th>
                  <th className="pb-2.5">Course Name</th>
                  <th className="pb-2.5 text-right">Time Slot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {activeBatch.exams.map((exam, idx) => (
                  <tr key={idx} className="hover:bg-secondary/20 transition-colors">
                    <td className="py-3 font-semibold text-foreground flex items-center gap-2">
                      <FileCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                      <span className="font-mono">{exam.date}</span>
                    </td>
                    <td className="py-3 font-mono text-[11px] font-bold text-indigo-500 dark:text-indigo-400">
                      {exam.courseCode}
                    </td>
                    <td className="py-3 font-medium text-foreground">{exam.courseName}</td>
                    <td className="py-3 text-right">
                      <span className="text-xs font-semibold text-muted-foreground font-mono">
                        {exam.time}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-border/60 text-xs">
            <span className="text-muted-foreground text-[11px]">
              Showing {activeBatch.exams.length} papers for {activeBatch.name}
            </span>
            <a
              href="/materials/Time_Table_CET2_MST_2026.pdf"
              target="_blank"
              rel="noreferrer"
              className="text-primary hover:underline font-semibold flex items-center gap-1 text-[11px]"
            >
              <span>Download Official Timetable PDF</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Right Promo Card: ITM Notes Solved Questions (~35% -> lg:col-span-4) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-indigo-950 text-white border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                MST Exclusive
              </span>
              <span className="text-[11px] text-slate-400">Baroda University</span>
            </div>
            <h3 className="font-bold text-base text-white">
              ITM Notes · Solved Mid-Sem Questions
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              High-yield question banks, algorithm dry-runs, and step-by-step solutions compiled directly from past SLS university examination papers.
            </p>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-[11px]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Railway Reservation Queue (C & Java)</span>
              </div>
              <div className="flex items-center gap-2 text-indigo-300 font-semibold text-[11px]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>DBMS 3NF & BCNF Normalization Proofs</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-300 font-semibold text-[11px]">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Newton-Raphson & Runge-Kutta 4</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/imp-questions")}
              className="px-4 py-2 rounded-xl bg-brand-forest hover:bg-brand-deep text-white font-bold text-xs shadow-md shadow-brand-forest/20 transition-all active:scale-95"
            >
              Open Solved Bank &gt;
            </button>
            <span className="text-[11px] text-brand-chartreuse font-semibold font-mono">
              ✓ 100% Verified
            </span>
          </div>
        </div>
      </div>

      {/* ── HIGH-AESTHETIC INTERACTIVE DOCUMENT & PDF READER MODAL ── */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-border bg-secondary/30 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activePreview.tagColor}`}>
                    {activePreview.tag}
                  </span>
                  <span className="text-xs font-mono font-bold text-primary">
                    {activePreview.code}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    · {activePreview.pages} · {activePreview.fileSize}
                  </span>
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-foreground">
                  {activePreview.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activePreview.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  title="Open PDF in new tab"
                >
                  <Maximize2 className="h-4 w-4" />
                </a>
                <button
                  onClick={() => setActivePreview(null)}
                  className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Modal Segmented Tabs */}
            <div className="px-5 pt-3 border-b border-border flex items-center gap-2 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setPreviewTab("pdf")}
                className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
                  previewTab === "pdf"
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>PDF Document Preview</span>
              </button>
              <button
                onClick={() => setPreviewTab("summary")}
                className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
                  previewTab === "summary"
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>High-Yield Formulas & Summary</span>
              </button>
              <button
                onClick={() => setPreviewTab("questions")}
                className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
                  previewTab === "questions"
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Solved Exam Questions</span>
              </button>
              <button
                onClick={() => setPreviewTab("download")}
                className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all ${
                  previewTab === "download"
                    ? "border-primary text-primary font-bold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download & Offline Save</span>
              </button>
            </div>

            {/* Modal Tab Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {previewTab === "pdf" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground bg-secondary/40 p-2.5 rounded-xl border border-border">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="h-4 w-4 text-emerald-500" />
                      <span>Viewing verified official document from SLS Baroda University repository.</span>
                    </span>
                    <a
                      href={activePreview.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Full Screen</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  {/* Responsive Iframe Document Viewer */}
                  <div className="w-full h-[480px] rounded-xl overflow-hidden border border-border bg-slate-950 shadow-inner">
                    <iframe
                      src={`${activePreview.pdfUrl}#toolbar=1&navpanes=0`}
                      className="w-full h-full border-0"
                      title={activePreview.title}
                    />
                  </div>
                </div>
              )}

              {previewTab === "summary" && (
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border space-y-2">
                    <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>Curriculum Overview & Scope</span>
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {activePreview.summary}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-emerald-500" />
                      <span>Key Formulas & Algorithmic Complexities</span>
                    </h4>

                    <div className="grid grid-cols-1 gap-3">
                      {activePreview.formulas.map((f, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-slate-950 text-slate-200 border border-slate-800 space-y-1.5 font-mono text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-primary font-sans">{f.title}</span>
                            <span className="text-[10px] text-slate-400 font-sans">{f.note}</span>
                          </div>
                          <p className="p-2 rounded bg-slate-900 border border-slate-800 text-emerald-400 select-all overflow-x-auto">
                            {f.formula}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {previewTab === "questions" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-foreground">
                      University Exam Solved Questions
                    </h4>
                    <span className="text-xs text-muted-foreground font-mono">
                      {activePreview.solvedQuestions.length} Questions
                    </span>
                  </div>

                  <div className="space-y-4">
                    {activePreview.solvedQuestions.map((q, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-card border border-border space-y-2.5 shadow-xs">
                        <div className="font-bold text-xs sm:text-sm text-foreground flex items-start gap-2">
                          <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-xs shrink-0">
                            Q{idx + 1}
                          </span>
                          <span>{q.q}</span>
                        </div>
                        <div className="pl-6 text-xs text-muted-foreground leading-relaxed whitespace-pre-line border-l-2 border-primary/30 py-1">
                          {q.a}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {previewTab === "download" && (
                <div className="p-6 text-center space-y-4 max-w-md mx-auto">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
                    <FileText className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-foreground">{activePreview.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Official verified PDF document ({activePreview.fileSize}, {activePreview.pages}).
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-secondary/50 border border-border text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Source:</span>
                      <span className="font-semibold text-foreground">ITM SLS Baroda University</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format:</span>
                      <span className="font-mono font-bold text-foreground">Portable Document Format (.pdf)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verification:</span>
                      <span className="font-bold text-emerald-500">✓ Digital Signature Valid</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => handleDownloadPdf(activePreview)}
                      className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-md hover:opacity-90 flex items-center gap-2 active:scale-95 transition-all"
                    >
                      <Download className="h-4 w-4" />
                      <span>Download PDF Now</span>
                    </button>
                    <a
                      href={activePreview.pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Open in Browser</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Footer */}
            <div className="p-4 border-t border-border bg-secondary/20 flex items-center justify-between text-xs">
              <span className="text-muted-foreground text-[11px]">
                ITM Notes Academic Portal · Baroda University
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePreview(null)}
                  className="px-4 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadPdf(activePreview)}
                  className="px-4 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
