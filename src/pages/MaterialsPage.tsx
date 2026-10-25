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
  FileCheck,
  X,
  Code2,
  GraduationCap,
  Maximize2,
  ChevronDown,
  ChevronRight,
  FlaskConical,
  Calculator,
  FileQuestion,
  Layers,
  Filter,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { toast } from "sonner";
import { TIMETABLE_DATA } from "@/data/timetableData";
import { REAL_STUDY_MATERIALS, StudyMaterial } from "@/data/materialsData";
import { fetchLiveMaterials } from "@/data/supabase/fetchMaterials";
import { useEffect } from "react";

// ─── SubjectOverviewCard (rich modal with formulas + solved Q&A) ────────────
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
  semester: number;
  subject: string;
  category: string;
}

const SUBJECT_OVERVIEW_CARDS: SubjectOverviewCard[] = [
  {
    id: "mat-1",
    code: "C2310C5 · DSA",
    tag: "Core Notes",
    tagColor: "bg-emerald-500 text-white shadow-xs",
    title: "Data Structures: Queue & Stack Master Notes",
    subtitle:
      "Linear & Circular Queue implementations, dry runs, algorithms, and Railway Reservation practicals.",
    pages: "18 Pages",
    fileSize: "2.4 MB",
    pdfUrl: "/materials/Queue_Notes.pdf",
    semester: 3,
    subject: "Data Structures and Algorithms",
    category: "Notes",
    summary:
      "Comprehensive theoretical and implementation guide for Stacks and Queues. Covers FIFO queue fundamentals, front & rear pointer management, boundary checks (overflow/underflow), circular queue arithmetic modulo MAX, and double-ended queues (deque). Includes complete C99 and Java practical code with step-by-step memory trace dry-runs.",
    formulas: [
      {
        title: "Circular Queue Enqueue",
        formula: "rear = (rear + 1) % MAX; waitQ[rear] = item;",
        note: "Prevents memory wastage from drifting front pointer",
      },
      {
        title: "Circular Queue IsFull",
        formula: "(rear + 1) % MAX == front",
        note: "Returns true if queue has reached maximum capacity",
      },
      {
        title: "Queue Length / Count",
        formula:
          "front == -1 ? 0 : (rear >= front ? rear - front + 1 : MAX - front + rear + 1)",
        note: "Accurate count calculation across circular boundary",
      },
    ],
    solvedQuestions: [
      {
        q: "Q1: Explain the limitation of a simple linear queue using arrays and how circular queues resolve it.",
        a: "In a linear array queue, once elements are dequeued, front advances forward. Even if elements are removed from the front, rear reaches MAX-1 and reports false overflow while earlier positions remain empty. A circular queue connects the last position back to the first using modulo arithmetic ((rear + 1) % MAX), reusing freed slots.",
      },
      {
        q: "Q2: Write the algorithm for allocating seats in a Railway Reservation Waiting List queue.",
        a: "1. Check if front == -1 or front > rear (Queue Empty). If true, print 'No waiting passengers' and return.\n2. Else, retrieve passenger ID at waitQ[front].\n3. Print 'Seat allocated to Passenger: [ID]'.\n4. Increment front by 1.\n5. If front > rear, reset front = -1, rear = -1 to reclaim array.",
      },
    ],
  },
  {
    id: "mat-2",
    code: "C2311C4 · DBMS",
    tag: "Core Notes",
    tagColor: "bg-blue-600 text-white shadow-xs",
    title: "DBMS Complete Lecture Notes & SQL Guide",
    subtitle:
      "Relational Algebra, SQL triggers, ACID transaction states, and 1NF to BCNF normalization proofs.",
    pages: "28 Pages",
    fileSize: "3.8 MB",
    pdfUrl: "/materials/DBMS_Complete_Lecture_Notes.pdf",
    semester: 3,
    subject: "Database Management Systems",
    category: "Notes",
    summary:
      "Master reference covering ANSI/SPARC 3-tier database architecture, conceptual ER-to-Relational mapping rules, relational calculus & algebra operators, complete DDL/DML SQL statements, B-Tree index structures, ACID concurrency controls, and schema decomposition up to Boyce-Codd Normal Form.",
    formulas: [
      {
        title: "Lossless Join Decomposition",
        formula: "(R1 ∩ R2) → R1  OR  (R1 ∩ R2) → R2",
        note: "Intersection of attributes must be a superkey in at least one relation",
      },
      {
        title: "Boyce-Codd Normal Form (BCNF)",
        formula: "For every non-trivial FD X → Y, X must be a superkey",
        note: "Eliminates all anomalies resulting from functional dependencies",
      },
    ],
    solvedQuestions: [
      {
        q: "Q1: Distinguish between 3NF and BCNF with a suitable functional dependency example.",
        a: "A relation is in 3NF if for every non-trivial FD X → A, either X is a superkey OR A is a prime attribute. In BCNF, X MUST be a superkey—there is no relaxation for prime attributes. Every BCNF relation is in 3NF, but the reverse is not always true.",
      },
    ],
  },
  {
    id: "mat-3",
    code: "CET-2 / MST",
    tag: "Official Timetable",
    tagColor: "bg-amber-500 text-white shadow-xs",
    title: "Official Mid-Sem Timetable (CET-2 / MST)",
    subtitle:
      "Complete exam dates, paper timings, room allocations, and student instructions for 2026.",
    pages: "12 Pages",
    fileSize: "1.2 MB",
    pdfUrl: "/materials/Time_Table_CET2_MST_2026.pdf",
    semester: 3,
    subject: "All Subjects",
    category: "Timetable",
    summary:
      "Official examination roster issued by the Controller of Examinations, ITM SLS Baroda University. Outlines examination slots (Morning: 10:10 AM - 12:10 PM, Afternoon: 12:30 PM - 02:30 PM), hall ticket verification rules, non-programmable calculator guidelines, and seating arrangements.",
    formulas: [
      {
        title: "Minimum Attendance Requirement",
        formula: "Attendance >= 75%",
        note: "Mandatory for Hall Ticket issuance as per University Ordinances",
      },
      {
        title: "Internal CIE Weightage",
        formula: "CIE (50) = MST (30) + Continuous Evaluation / Assignments (20)",
        note: "50% weightage towards final semester grading",
      },
    ],
    solvedQuestions: [
      {
        q: "What is the passing criteria for Semester examinations?",
        a: "Students must achieve at least 40% aggregate marks (Internal + External combined) and minimum 35% in the End-Semester University theory paper to be awarded a passing letter grade (DD or above).",
      },
    ],
  },
  {
    id: "mat-4",
    code: "C2310C2 · COA",
    tag: "Core Notes",
    tagColor: "bg-purple-600 text-white shadow-xs",
    title: "Computer Architecture & Organization MST Notes",
    subtitle:
      "Instruction sets, addressing modes, 5-stage RISC pipelines, cache mapping, and Booth's algorithm.",
    pages: "24 Pages",
    fileSize: "2.1 MB",
    pdfUrl: "/materials/Computer_Architecture_MST_Notes.pdf",
    semester: 3,
    subject: "Computer Architecture",
    category: "Notes",
    summary:
      "Hardware organization and micro-architecture fundamentals. Covers Von Neumann vs Harvard architectures, control unit designs (Hardwired vs Microprogrammed), structural/data/control pipeline hazards, direct vs set-associative cache mappings, and virtual memory paging.",
    formulas: [
      {
        title: "Speedup from Pipelining",
        formula: "S_k = (n * t_non_pipelined) / ((k + n - 1) * t_cycle)",
        note: "Theoretical maximum speedup approaches k as n becomes large",
      },
      {
        title: "Average Memory Access Time (AMAT)",
        formula: "AMAT = Hit_Time + (Miss_Rate * Miss_Penalty)",
        note: "Fundamental metric for multi-level hierarchical cache design",
      },
    ],
    solvedQuestions: [
      {
        q: "Q1: Explain how Booth's Algorithm performs fast signed 2's complement multiplication.",
        a: "Booth's algorithm inspects adjacent pairs of multiplier bits (Q0 and Q-1). If '01' it adds the multiplicand, if '10' it subtracts the multiplicand, and if '00' or '11' it simply performs an arithmetic right shift. This reduces the number of addition/subtraction cycles on consecutive blocks of 1s.",
      },
    ],
  },
  {
    id: "mat-5",
    code: "S2320C1 · CONMP",
    tag: "Formula Sheet",
    tagColor: "bg-teal-600 text-white shadow-xs",
    title: "Numerical Methods Formula & Cheatsheet (Python)",
    subtitle:
      "Newton-Raphson, Bisection, Gauss-Elimination, Runge-Kutta, and error bounds formulas.",
    pages: "14 Pages",
    fileSize: "1.8 MB",
    pdfUrl: "/materials/CONMP_Numerical_Methods_Formula_Sheet.pdf",
    semester: 3,
    subject: "Computer Oriented & Numerical Methods",
    category: "Notes",
    summary:
      "Quick-revision handbook containing numerical algorithms and Python scipy/numpy implementations for solving non-linear equations, systems of linear algebraic equations, numerical integration (Trapezoidal, Simpson's 1/3 and 3/8 rules), and initial value ODE problems.",
    formulas: [
      {
        title: "Newton-Raphson Iteration",
        formula: "x_{n+1} = x_n - f(x_n) / f'(x_n)",
        note: "Quadratic order of convergence (p = 2) near simple roots",
      },
      {
        title: "Simpson's 1/3 Rule",
        formula:
          "∫ f(x) dx ≈ (h/3) * [f0 + 4*(f1+f3+...) + 2*(f2+f4+...) + fn]",
        note: "Exact for polynomials up to degree 3 with step size h = (b-a)/n",
      },
    ],
    solvedQuestions: [
      {
        q: "Q1: What is the condition for convergence of the Newton-Raphson method?",
        a: "The method converges if |f(x) * f''(x)| < [f'(x)]^2 in the interval containing the root, and the initial guess x0 is chosen sufficiently close to the true root where f'(x) ≠ 0.",
      },
    ],
  },
  {
    id: "mat-6",
    code: "C2311C1 · JAVA",
    tag: "Lab Manual",
    tagColor: "bg-rose-600 text-white shadow-xs",
    title: "Java OOP Official Lab Manual & Experiments",
    subtitle:
      "Full practical code, classes, inheritance, custom exceptions, multithreading, and file I/O.",
    pages: "32 Pages",
    fileSize: "3.1 MB",
    pdfUrl: "/materials/Java_Official_Lab_Manual.pdf",
    semester: 3,
    subject: "Object-Oriented Programming with Java",
    category: "Lab Manual",
    summary:
      "Step-by-step practical laboratory manual aligned with the university syllabus. Contains 12 mandatory lab experiments from basic syntax to thread synchronization and collections framework, complete with expected terminal outputs and viva voce questions.",
    formulas: [
      {
        title: "Thread Creation Options",
        formula:
          "class MyThread extends Thread  OR  class MyTask implements Runnable",
        note: "Implementing Runnable is preferred to avoid single inheritance limitation",
      },
      {
        title: "Custom Checked Exception",
        formula:
          "class InvalidAgeException extends Exception { public InvalidAgeException(String s) { super(s); } }",
        note: "Must be handled with try-catch or declared in throws clause",
      },
    ],
    solvedQuestions: [
      {
        q: "Q1: What happens if you call run() directly instead of start() on a Thread object?",
        a: "Calling run() directly executes the method on the current calling thread synchronously just like an ordinary method call. No new thread is spawned. Calling start() schedules a new OS-level thread and invokes run() concurrently.",
      },
    ],
  },
];

// IDs of rich cards so we skip them in the plain grid (avoid duplication)
const RICH_CARD_PDF_URLS = new Set(SUBJECT_OVERVIEW_CARDS.map((c) => c.pdfUrl));

// ─── Category icon helper ──────────────────────────────────────────────────
function CategoryIcon({ category }: { category: string }) {
  const cls = "h-3.5 w-3.5 shrink-0";
  switch (category) {
    case "Notes":
      return <BookOpen className={cls} />;
    case "Lab Manual":
      return <FlaskConical className={cls} />;
    case "Question Paper":
      return <FileQuestion className={cls} />;
    case "Assignment":
      return <FileCheck className={cls} />;
    case "Syllabus":
      return <Layers className={cls} />;
    case "Presentation":
      return <FileText className={cls} />;
    case "Timetable":
      return <Calculator className={cls} />;
    default:
      return <FileText className={cls} />;
  }
}

// ─── Category badge colour helper ─────────────────────────────────────────
function categoryBadgeClass(category: string): string {
  const map: Record<string, string> = {
    Notes: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    "Lab Manual": "bg-orange-500/10 text-orange-600 border-orange-500/30",
    "Question Paper": "bg-amber-500/10 text-amber-600 border-amber-500/30",
    Assignment: "bg-indigo-500/10 text-indigo-600 border-indigo-500/30",
    Syllabus: "bg-cyan-500/10 text-cyan-600 border-cyan-500/30",
    Presentation: "bg-violet-500/10 text-violet-600 border-violet-500/30",
    Timetable: "bg-rose-500/10 text-rose-600 border-rose-500/30",
  };
  return map[category] ?? "bg-slate-500/10 text-slate-600 border-slate-500/30";
}

// ─── File type indicator colour ──────────────────────────────────────────
function fileTypeClass(fileType: string): string {
  const map: Record<string, string> = {
    PDF: "bg-red-500/10 text-red-500",
    PPTX: "bg-orange-500/10 text-orange-500",
    DOCX: "bg-blue-500/10 text-blue-500",
    JPEG: "bg-green-500/10 text-green-500",
    PNG: "bg-green-500/10 text-green-500",
  };
  return map[fileType] ?? "bg-slate-500/10 text-slate-500";
}

// ─── Plain material card ───────────────────────────────────────────────────
function PlainMaterialCard({ mat }: { mat: StudyMaterial }) {
  const handleOpen = () => {
    if (mat.downloadUrl) {
      window.open(mat.downloadUrl, "_blank", "noreferrer");
    } else {
      toast.error("No download URL available for this file.");
    }
  };

  const handleDownload = () => {
    if (!mat.downloadUrl) {
      toast.error("No download URL available for this file.");
      return;
    }
    toast.success(`Downloading ${mat.title}…`);
    const a = document.createElement("a");
    a.href = mat.downloadUrl;
    a.download = mat.title.replace(/[^a-zA-Z0-9_-]/g, "_") + "." + mat.fileType.toLowerCase();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col gap-3 group">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${categoryBadgeClass(mat.category)} flex items-center gap-1`}
          >
            <CategoryIcon category={mat.category} />
            {mat.category}
          </span>
          <span
            className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${fileTypeClass(mat.fileType)}`}
          >
            {mat.fileType}
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground shrink-0">
          Sem {mat.semester}
        </span>
      </div>

      {/* Title + description */}
      <div className="space-y-1 flex-1">
        <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {mat.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {mat.description}
        </p>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
        {mat.pages && (
          <>
            <span>{mat.pages}</span>
            <span>·</span>
          </>
        )}
        <span className="font-mono font-semibold">{mat.fileSize}</span>
        <span>·</span>
        <span>{mat.uploadedDate}</span>
      </div>

      {/* Badge */}
      {mat.badge && (
        <div>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${mat.badgeColor ?? "bg-slate-500/10 text-slate-600 border-slate-500/20"}`}
          >
            {mat.badge}
          </span>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-1.5 pt-1 border-t border-border/50">
        <button
          onClick={handleOpen}
          className="flex-1 h-7 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
        >
          <Eye className="h-3 w-3" />
          <span>Open</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 h-7 rounded-lg bg-[#183F36] hover:bg-[#122d26] text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
        >
          <Download className="h-3 w-3 text-[#D6E85D]" />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
}

// ─── Rich overview card ────────────────────────────────────────────────────
function RichOverviewCard({
  item,
  onPreview,
  onDownload,
}: {
  item: SubjectOverviewCard;
  onPreview: (card: SubjectOverviewCard) => void;
  onDownload: (card: SubjectOverviewCard) => void;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-primary/30 transition-all flex flex-col gap-3 group relative overflow-hidden">
      {/* Top */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] font-bold text-muted-foreground tracking-wide">
          {item.code}
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.tagColor}`}>
          {item.tag}
        </span>
      </div>

      {/* Title */}
      <div className="space-y-1 flex-1">
        <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {item.title}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {item.subtitle}
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium">
        <span>{item.pages}</span>
        <span>·</span>
        <span className="font-mono font-semibold">{item.fileSize}</span>
        <span>·</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 font-semibold">
          Rich View
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1.5 pt-1 border-t border-border/50">
        <button
          onClick={() => onPreview(item)}
          className="flex-1 h-7 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
        >
          <Eye className="h-3 w-3" />
          <span>View</span>
        </button>
        <button
          onClick={() => onDownload(item)}
          className="flex-1 h-7 rounded-lg bg-[#183F36] hover:bg-[#122d26] text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
        >
          <Download className="h-3 w-3 text-[#D6E85D]" />
          <span>PDF</span>
        </button>
      </div>
    </div>
  );
}

// ─── Collapsible semester section ─────────────────────────────────────────
function SemesterSection({
  title,
  count,
  defaultOpen,
  children,
}: {
  title: string;
  count: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen ?? true);
  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 py-2 px-3 rounded-xl bg-secondary/60 border border-border hover:bg-secondary transition-colors"
      >
        <div className="flex items-center gap-2">
          {open ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="font-bold text-sm text-foreground">{title}</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#183F36]/10 text-[#183F36] dark:text-emerald-400 border border-[#183F36]/20">
            {count} files
          </span>
        </div>
        <span className="text-[11px] text-muted-foreground">
          {open ? "Collapse" : "Expand"}
        </span>
      </button>
      {open && <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">{children}</div>}
    </div>
  );
}

// ─── Trend chart data ──────────────────────────────────────────────────────
const TREND_DATA = [
  { date: "Oct 00", count: 18 },
  { date: "Oct 08", count: 32 },
  { date: "Oct 16", count: 48 },
  { date: "Oct 24", count: 38 },
  { date: "Oct 30", count: 72 },
  { date: "Nov 10", count: 85 },
];

// ─── Main Page ─────────────────────────────────────────────────────────────
export default function MaterialsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [semesterFilter, setSemesterFilter] = useState<"all" | "1" | "3">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [activePreview, setActivePreview] = useState<SubjectOverviewCard | null>(null);
  const [previewTab, setPreviewTab] = useState<"pdf" | "summary" | "questions" | "download">("pdf");
  const [selectedBatchId, setSelectedBatchId] = useState<string>("b.tech-sem3-cse");

  // Live Materials State
  const [liveMaterials, setLiveMaterials] = useState<StudyMaterial[]>(REAL_STUDY_MATERIALS);
  const [isLoadingLive, setIsLoadingLive] = useState(false);

  useEffect(() => {
    async function load() {
      setIsLoadingLive(true);
      try {
        const data = await fetchLiveMaterials();
        if (data && data.length > 0) {
          // Combine static + live or replace completely (Combining handles the fact that DB might only have a few initially)
          setLiveMaterials([...data, ...REAL_STUDY_MATERIALS]);
        }
      } catch (e) {
        console.warn("Could not fetch live materials, falling back to static", e);
      } finally {
        setIsLoadingLive(false);
      }
    }
    load();
  }, []);

  // Plain materials excluding those already covered by rich cards
  const plainMaterials = useMemo(
    () => liveMaterials.filter((m) => !RICH_CARD_PDF_URLS.has(m.downloadUrl ?? "")),
    [liveMaterials]
  );

  // All categories from plain materials
  const allCategories = useMemo(() => {
    const cats = new Set(plainMaterials.map((m) => m.category));
    return ["all", ...Array.from(cats).sort()];
  }, [plainMaterials]);

  // Stats
  const stats = useMemo(() => {
    const notes = liveMaterials.filter((m) => m.category === "Notes").length + SUBJECT_OVERVIEW_CARDS.filter((c) => c.category === "Notes").length;
    const labs = liveMaterials.filter((m) => m.category === "Lab Manual").length + SUBJECT_OVERVIEW_CARDS.filter((c) => c.category === "Lab Manual").length;
    const qps = liveMaterials.filter((m) => m.category === "Question Paper").length;
    const total = liveMaterials.length + SUBJECT_OVERVIEW_CARDS.length;
    return { notes, labs, qps, total };
  }, [liveMaterials]);

  // Filter plain materials
  const filteredPlain = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return plainMaterials.filter((m) => {
      const semOk =
        semesterFilter === "all" || m.semester === parseInt(semesterFilter);
      const typeOk = typeFilter === "all" || m.category === typeFilter;
      const searchOk =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.subjectCode.toLowerCase().includes(q);
      return semOk && typeOk && searchOk;
    });
  }, [plainMaterials, searchQuery, semesterFilter, typeFilter]);

  // Filter rich cards
  const filteredRich = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SUBJECT_OVERVIEW_CARDS.filter((c) => {
      const semOk =
        semesterFilter === "all" || c.semester === parseInt(semesterFilter);
      const typeOk = typeFilter === "all" || c.category === typeFilter;
      const searchOk =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q);
      return semOk && typeOk && searchOk;
    });
  }, [searchQuery, semesterFilter, typeFilter]);

  // Group plain materials by semester
  const sem1Materials = filteredPlain.filter((m) => m.semester === 1);
  const sem3Materials = filteredPlain.filter((m) => m.semester === 3);
  const otherMaterials = filteredPlain.filter(
    (m) => m.semester !== 1 && m.semester !== 3
  );

  // Rich cards by semester
  const sem3Rich = filteredRich.filter((c) => c.semester === 3);
  const sem1Rich = filteredRich.filter((c) => c.semester === 1);

  const activeBatch = TIMETABLE_DATA.find((b) => b.id === selectedBatchId) || TIMETABLE_DATA[3] || TIMETABLE_DATA[0];

  const handleDownloadRich = (card: SubjectOverviewCard) => {
    toast.success(`Downloading ${card.title}…`);
    const a = document.createElement("a");
    a.href = card.pdfUrl;
    a.download = card.title.replace(/[^a-zA-Z0-9_-]/g, "_") + ".pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const totalFiltered = filteredRich.length + filteredPlain.length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-8 animate-fade-in">

      {/* ── PAGE HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-2 flex-wrap">
            <span>ITM Notes · Study Materials</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
              {stats.total} Files
            </span>
          </h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5 font-medium flex-wrap">
            <span>Academic resources</span>
            <span>·</span>
            <span>ITM (SLS) Baroda University</span>
            <span>·</span>
            <span>Sem 1 &amp; Sem 3</span>
            <span>·</span>
            <span className="text-foreground font-semibold">All subjects covered</span>
          </div>
        </div>

        {/* Search */}
        <div className="relative shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search PDF, subject, topic…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-8 pr-3 w-56 sm:w-72 rounded-xl bg-card border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Notes & Slides", value: stats.notes, color: "text-blue-600" },
          { label: "Lab Manuals", value: stats.labs, color: "text-orange-500" },
          { label: "Question Papers", value: stats.qps, color: "text-amber-500" },
          { label: "Total Files", value: stats.total, color: "text-[#183F36] dark:text-emerald-400" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-card border border-border rounded-2xl p-4 text-center shadow-sm"
          >
            <span className={`text-2xl font-black font-mono ${s.color}`}>{s.value}</span>
            <p className="text-[11px] text-muted-foreground mt-0.5 font-medium uppercase tracking-wide">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* ── FILTER BAR ── */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-card border border-border rounded-2xl shadow-sm">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground shrink-0">
          <Filter className="h-3.5 w-3.5" />
          <span>Filters:</span>
        </div>

        {/* Semester filter */}
        <div className="flex overflow-x-auto scrollbar-none rounded-xl bg-secondary p-0.5 border border-border text-xs font-semibold gap-0.5 shrink-0 max-w-full">
          {(["all", "1", "3"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSemesterFilter(s)}
              className={`px-3 py-1 rounded-lg transition-all whitespace-nowrap ${
                semesterFilter === s
                  ? "bg-[#183F36] text-[#D6E85D] font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? "All Semesters" : `Semester ${s}`}
            </button>
          ))}
        </div>

        {/* Type filter */}
        <div className="flex overflow-x-auto scrollbar-none gap-1 max-w-full shrink-0">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setTypeFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all border whitespace-nowrap ${
                typeFilter === cat
                  ? "bg-[#183F36] text-[#D6E85D] border-[#183F36]"
                  : "bg-secondary text-muted-foreground border-border hover:text-foreground"
              }`}
            >
              {cat === "all" ? "All Types" : cat}
            </button>
          ))}
        </div>

        {totalFiltered !== stats.total && (
          <span className="ml-auto text-xs text-muted-foreground font-mono">
            Showing {totalFiltered} of {stats.total}
          </span>
        )}
      </div>

      {/* ── SEMESTER 3 ── */}
      {(sem3Rich.length > 0 || sem3Materials.length > 0) && (
        <SemesterSection
          title="Semester 3 — Core Engineering"
          count={sem3Rich.length + sem3Materials.length}
          defaultOpen
        >
          {/* Rich cards first */}
          {sem3Rich.map((card) => (
            <RichOverviewCard
              key={card.id}
              item={card}
              onPreview={(c) => { setActivePreview(c); setPreviewTab("pdf"); }}
              onDownload={handleDownloadRich}
            />
          ))}
          {/* Plain cards */}
          {sem3Materials.map((mat) => (
            <PlainMaterialCard key={mat.id} mat={mat} />
          ))}
        </SemesterSection>
      )}

      {/* ── SEMESTER 1 ── */}
      {(sem1Rich.length > 0 || sem1Materials.length > 0) && (
        <SemesterSection
          title="Semester 1 — Foundation Courses"
          count={sem1Rich.length + sem1Materials.length}
          defaultOpen={semesterFilter === "1" || semesterFilter === "all"}
        >
          {sem1Rich.map((card) => (
            <RichOverviewCard
              key={card.id}
              item={card}
              onPreview={(c) => { setActivePreview(c); setPreviewTab("pdf"); }}
              onDownload={handleDownloadRich}
            />
          ))}
          {sem1Materials.map((mat) => (
            <PlainMaterialCard key={mat.id} mat={mat} />
          ))}
        </SemesterSection>
      )}

      {/* ── OTHER ── */}
      {otherMaterials.length > 0 && (
        <SemesterSection
          title="General / Multi-Semester"
          count={otherMaterials.length}
          defaultOpen={false}
        >
          {otherMaterials.map((mat) => (
            <PlainMaterialCard key={mat.id} mat={mat} />
          ))}
        </SemesterSection>
      )}

      {/* Empty state */}
      {totalFiltered === 0 && (
        <div className="text-center py-16 space-y-2">
          <FileText className="h-10 w-10 text-muted-foreground/50 mx-auto" />
          <p className="font-bold text-sm text-foreground">No materials found</p>
          <p className="text-xs text-muted-foreground">
            Try clearing filters or adjusting your search.
          </p>
          <button
            onClick={() => { setSearchQuery(""); setSemesterFilter("all"); setTypeFilter("all"); }}
            className="mt-2 px-4 py-2 rounded-xl bg-secondary text-xs font-semibold text-foreground hover:bg-secondary/80 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* ── BOTTOM ROW: TREND CHART + TIMETABLE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-8 bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <span>Question Bank Trend</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-500 dark:text-blue-400 font-bold">
                  High Yield
                </span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Distribution of solved exam questions across Semester 3 units
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-500 font-mono">+42% this week</span>
          </div>
          <div className="h-44 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TREND_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={{ stroke: "#e2e8f0" }} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
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
                  dot={{ r: 3, fill: "#183F36" }}
                  activeDot={{ r: 5, fill: "#D6E85D" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Solved Questions promo */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-indigo-950 text-white border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                MST Exclusive
              </span>
              <span className="text-[11px] text-slate-400">Baroda University</span>
            </div>
            <h3 className="font-bold text-base text-white">ITM Notes · Solved Mid-Sem Questions</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              High-yield question banks, algorithm dry-runs, and step-by-step solutions compiled from past SLS university examination papers.
            </p>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs">
              {[
                { color: "text-emerald-400", text: "Railway Reservation Queue (C & Java)" },
                { color: "text-indigo-300", text: "DBMS 3NF & BCNF Normalization Proofs" },
                { color: "text-cyan-300", text: "Newton-Raphson & Runge-Kutta 4" },
              ].map((item) => (
                <div key={item.text} className={`flex items-center gap-2 ${item.color} font-semibold text-[11px]`}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-4 flex items-center justify-between">
            <button
              onClick={() => navigate("/imp-questions")}
              className="px-4 py-2 rounded-xl bg-[#183F36] hover:bg-[#122d26] text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              Open Solved Bank &gt;
            </button>
            <span className="text-[11px] text-[#D6E85D] font-semibold font-mono">✓ 100% Verified</span>
          </div>
        </div>
      </div>

      {/* ── TIMETABLE TABLE ── */}
      <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-foreground">Official Examination Timetables</h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
              CET-2 / MST 2026
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {TIMETABLE_DATA.map((batch) => (
              <button
                key={batch.id}
                onClick={() => setSelectedBatchId(batch.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  selectedBatchId === batch.id
                    ? "bg-[#183F36] text-[#D6E85D] font-bold"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                {batch.id === "b.tech-sem3-cse"
                  ? "B.Tech Sem 3"
                  : batch.id === "bca-sem3"
                  ? "BCA Sem 3"
                  : batch.id === "mca-sem3"
                  ? "MCA Sem 3"
                  : batch.id === "b.tech-sem5-cse"
                  ? "B.Tech Sem 5"
                  : batch.name.split(" ")[0]}
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
                    <span className="text-xs font-semibold text-muted-foreground font-mono">{exam.time}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-border/60 text-xs">
          <span className="text-muted-foreground text-[11px]">
            {activeBatch.exams.length} papers · {activeBatch.name}
          </span>
          <a
            href="/materials/Time_Table_CET2_MST_2026.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline font-semibold flex items-center gap-1 text-[11px]"
          >
            <span>Download Timetable PDF</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* ── RICH DOCUMENT MODAL ── */}
      {activePreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-scale-in">

            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-border bg-secondary/30 flex items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activePreview.tagColor}`}>
                    {activePreview.tag}
                  </span>
                  <span className="text-xs font-mono font-bold text-primary">{activePreview.code}</span>
                  <span className="text-xs text-muted-foreground font-mono">
                    · {activePreview.pages} · {activePreview.fileSize}
                  </span>
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-foreground">{activePreview.title}</h3>
              </div>
              <div className="flex items-center gap-2 shrink-0">
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

            {/* Modal Tabs */}
            <div className="px-5 pt-3 border-b border-border flex items-center gap-2 text-xs font-semibold overflow-x-auto">
              {(
                [
                  { key: "pdf", Icon: FileText, label: "PDF Preview" },
                  { key: "summary", Icon: Sparkles, label: "Formulas & Summary" },
                  { key: "questions", Icon: GraduationCap, label: "Solved Questions" },
                  { key: "download", Icon: Download, label: "Download" },
                ] as const
              ).map(({ key, Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setPreviewTab(key)}
                  className={`pb-2.5 px-3 border-b-2 flex items-center gap-1.5 transition-all whitespace-nowrap ${
                    previewTab === key
                      ? "border-primary text-primary font-bold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {previewTab === "pdf" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground bg-secondary/40 p-2.5 rounded-xl border border-border">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="h-4 w-4 text-emerald-500" />
                      <span>Verified official document — SLS Baroda University repository.</span>
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
                    <p className="text-xs text-muted-foreground leading-relaxed">{activePreview.summary}</p>
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
                    <h4 className="font-bold text-sm text-foreground">University Exam Solved Questions</h4>
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
                      Official verified PDF ({activePreview.fileSize}, {activePreview.pages}).
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/50 border border-border text-left text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Source:</span>
                      <span className="font-semibold text-foreground">ITM SLS Baroda University</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Format:</span>
                      <span className="font-mono font-bold text-foreground">PDF</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Verification:</span>
                      <span className="font-bold text-emerald-500">✓ Digital Signature Valid</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => handleDownloadRich(activePreview)}
                      className="px-6 py-2.5 rounded-xl bg-[#183F36] text-white font-bold text-xs shadow-md hover:opacity-90 flex items-center gap-2 active:scale-95 transition-all"
                    >
                      <Download className="h-4 w-4 text-[#D6E85D]" />
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

            {/* Modal Footer */}
            <div className="p-4 border-t border-border bg-secondary/20 flex items-center justify-between text-xs">
              <span className="text-muted-foreground text-[11px]">ITM Notes Academic Portal · Baroda University</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActivePreview(null)}
                  className="px-4 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownloadRich(activePreview)}
                  className="px-4 py-1.5 rounded-xl bg-[#183F36] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="h-3.5 w-3.5 text-[#D6E85D]" />
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
