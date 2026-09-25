import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchDialog } from "@/components/SearchDialog";
import { 
  BookOpen, 
  ChevronRight, 
  HelpCircle, 
  Sparkles, 
  Cpu, 
  Database, 
  Server, 
  Coffee, 
  Calculator, 
  Terminal, 
  Code2 
} from "lucide-react";

interface ImpSubjectCard {
  id: string;
  route: string;
  name: string;
  code: string;
  semester: string;
  description: string;
  questionsCount: string;
  badge: string;
  badgeColor: string;
  icon: any;
  featured?: boolean;
}

const ALL_IMP_SUBJECTS: ImpSubjectCard[] = [
  // ── SEMESTER 3 CORE SUBJECTS ──
  {
    id: "computer-architecture",
    route: "/imp-questions/ca-101",
    name: "Computer Architecture",
    code: "CS401",
    semester: "Semester 3",
    description: "Units 1–6 · Micro-operations, Common Bus, CPU Organization, Hardwired vs Microprogrammed, RISC/CISC, Pipelining",
    questionsCount: "46 Solved Exam Questions · 218 Marks · Last-Night Cheat Sheet",
    badge: "MST Exam Bank",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    icon: Cpu,
    featured: true,
  },
  {
    id: "dsa",
    route: "/imp-questions/sem3-dsa",
    name: "Data Structures & Algorithms (DSA)",
    code: "DSA301",
    semester: "Semester 3",
    description: "Units 1–6 · Complexity, Linked Lists, Stacks, Queues, BST, AVL Rotations, Dijkstra, Kruskal, Sorting & Hashing",
    questionsCount: "Unit-wise 3M, 5M & 7M Questions · Complexities Table · C Code",
    badge: "Curriculum Bank",
    badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    icon: Database,
    featured: true,
  },
  {
    id: "dbms",
    route: "/imp-questions/sem3-dbms",
    name: "Database Management Systems (DBMS)",
    code: "DBMS302",
    semester: "Semester 3",
    description: "Units 1–5 · 3-Tier Architecture, ER Modeling, Relational Algebra, SQL Joins & Subqueries, 1NF to BCNF, ACID",
    questionsCount: "Unit-wise 3M, 5M & 7M Questions · Normalization Traces · SQL",
    badge: "Curriculum Bank",
    badgeColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20",
    icon: Server,
    featured: true,
  },
  {
    id: "java",
    route: "/imp-questions/sem3-java",
    name: "Object Oriented Programming — Java",
    code: "JAVA303",
    semester: "Semester 3",
    description: "Units 1–6 · JVM Architecture, 4 Pillars of OOP, Dynamic Method Dispatch, Exceptions, Multithreading, Collections",
    questionsCount: "Unit-wise Questions · Working Java Programs · Lifecycle Traces",
    badge: "Curriculum Bank",
    badgeColor: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
    icon: Coffee,
    featured: true,
  },
  {
    id: "coanmp",
    route: "/imp-questions/sem3-coanmp",
    name: "Numerical Methods with Python (COANMP)",
    code: "COANMP",
    semester: "Semester 3",
    description: "Units 1–6 · Errors, Bisection, Newton-Raphson, Interpolation (Forward/Lagrange), Trapezoidal, Simpson 1/3, Gauss, RK4",
    questionsCount: "Formula Sheets · Step-by-Step Derivations · Python Implementations",
    badge: "Curriculum Bank",
    badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20",
    icon: Calculator,
    featured: true,
  },

  // ── FOUNDATIONAL PROGRAMMING ──
  {
    id: "c-programming",
    route: "/imp-questions/c-programming",
    name: "Programming in C",
    code: "CS101",
    semester: "Semester 1 & 2",
    description: "Units 4–8 · Pointers, Pointer Arithmetic, Dynamic Memory, Structures, File I/O, Standard Library",
    questionsCount: "15 MCQs · 15 Important Questions · 6 Complete Programs",
    badge: "CET Exam",
    badgeColor: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20",
    icon: Terminal,
  },
  {
    id: "python",
    route: "/imp-questions/python",
    name: "Python Programming",
    code: "CS201",
    semester: "Semester 1 & 2",
    description: "Multithreading, Custom Exception Handling, Synchronization & Regular Expressions",
    questionsCount: "11 Threading/Exception Qs · 14 Regex Qs · Code Snippets",
    badge: "Assignments & Labs",
    badgeColor: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20",
    icon: Code2,
  },
];

export default function ImpQuestionsSubjectsPage() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"All" | "Semester 3" | "Foundations">("All");

  const filteredSubjects = ALL_IMP_SUBJECTS.filter((sub) => {
    if (activeFilter === "Semester 3") return sub.semester === "Semester 3";
    if (activeFilter === "Foundations") return sub.semester !== "Semester 3";
    return true;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <Header onSearchOpen={() => setSearchOpen(true)} showBack backTo="/" />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-10 animate-fade-in">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Important Exam Questions
              </h1>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Curated question banks, previous year university exam patterns, step-by-step model answers, and last-night revision cheat sheets.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 mb-6 border-b border-border/60 pb-3">
          {(["All", "Semester 3", "Foundations"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {filter === "Semester 3" ? "⚡ Semester 3 (Your Current Semester)" : filter}
            </button>
          ))}
        </div>

        {/* Subjects List */}
        <div className="space-y-4">
          {filteredSubjects.map((subject) => {
            const Icon = subject.icon;
            return (
              <button
                key={subject.id}
                onClick={() => navigate(subject.route)}
                className="group w-full bg-card border border-border/80 hover:border-primary/50 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 text-left transition-all duration-200 shadow-sm hover:shadow-md apple-press"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary">
                      {subject.code}
                    </span>
                    <span className="text-xs text-muted-foreground/60">•</span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {subject.semester}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${subject.badgeColor}`}>
                      {subject.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {subject.name}
                  </h3>

                  <p className="text-xs text-muted-foreground mt-1 mb-2 line-clamp-2 leading-relaxed">
                    {subject.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground/80">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                    <span>{subject.questionsCount}</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                  <ChevronRight className="h-4 w-4" />
                </div>
              </button>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
