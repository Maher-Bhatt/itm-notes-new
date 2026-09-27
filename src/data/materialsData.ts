export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  subjectId: string;
  semester: number;
  category: "Syllabus" | "Notes" | "Presentation" | "Question Paper" | "Lab Manual" | "Assignment" | "Timetable" | "Other";
  fileType: "PDF" | "PPTX" | "DOCX" | "JPEG" | "PNG" | "Other";
  fileSize: string;
  pages?: string;
  description: string;
  topicsCovered: string[];
  uploadedDate: string;
  badge?: string;
  badgeColor?: string;
  downloadUrl?: string;
}

export const REAL_STUDY_MATERIALS: StudyMaterial[] = [
  {
    id: "mat-timetable-2026",
    title: "Official CET-2 & MST Exam Timetable 2026",
    subject: "All Branches (SOCSET)",
    subjectCode: "SOCSET",
    subjectId: "gen",
    semester: 3,
    category: "Timetable",
    fileType: "PDF",
    fileSize: "135.8 KB",
    pages: "3 Pages",
    badge: "Official Timetable",
    badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/30",
    description: "Official examination timetable issued by ITM (SLS) Baroda University for Odd Semester 2026-27 (B.Tech Sem 3 CSE/IT from Oct 1 to Oct 7, Sem 5, Diploma Sem 3 & 5, BCA Sem 3 & 5, MCA Sem 3).",
    topicsCovered: [
      "Exam Schedule",
      "B.Tech CSE/IT",
      "Diploma",
      "BCA",
      "MCA",
      "Odd Semester 2026-27"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/BTECH_CSA_DIPLOMA_SEMSETER__3___5_CET2_MST_TIME_TABLE_2026.pdf"
  },
  {
    id: "mat-dbms-qb-2025",
    title: "DBMS Official MST & CET Question Bank (C2311C4)",
    subject: "Database Management Systems",
    subjectCode: "CS402",
    subjectId: "dbms-102",
    semester: 3,
    category: "Question Paper",
    fileType: "PDF",
    fileSize: "368.3 KB",
    pages: "4 Pages",
    badge: "High Yield Exam Bank",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/30",
    description: "Official faculty question bank prepared by Raju Nakum & Kinjal Gautam with short and long answer questions covering 3-level architecture, E-R modeling, SQL commands, and normalization.",
    topicsCovered: [
      "3-Level Architecture",
      "ER Model",
      "Mapping Cardinality",
      "DDL & DML",
      "Integrity Constraints",
      "Relational Model"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DBMS_QUESTION_BANK_AY_2025.pdf"
  },
  {
    id: "mat-ca-qb-mst",
    title: "Computer Architecture Master MST Question Bank",
    subject: "Computer Architecture",
    subjectCode: "CS401",
    subjectId: "ca-101",
    semester: 3,
    category: "Question Paper",
    fileType: "PDF",
    fileSize: "188.1 KB",
    pages: "3 Pages",
    badge: "MST Question Bank",
    badgeColor: "bg-indigo-500/10 text-indigo-600 border-indigo-500/30",
    description: "Comprehensive question bank containing 46 exam questions (20 Section A 3-mark questions, Section B 5-mark questions, and Section C 7-mark questions) on RTL, common bus systems, subroutines, and control memory.",
    topicsCovered: [
      "Register Transfer Language",
      "Common Bus System",
      "Instruction Cycle",
      "Microprogrammed Control",
      "Shift Operations",
      "Interrupts"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Computer_Architecture_MST_Question_Bank.pdf"
  },
  {
    id: "mat-dsa-qb-cet2",
    title: "DSA CET-II Master Question Bank (Batch 2025–29)",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS403",
    subjectId: "dsa-103",
    semester: 3,
    category: "Question Paper",
    fileType: "PDF",
    fileSize: "279.9 KB",
    pages: "4 Pages",
    badge: "CET-2 Question Bank",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    description: "Official question bank by Prof. Madonna Lamin for CET-II examination covering multiple-choice and conceptual problems on Queues and Linked Lists.",
    topicsCovered: [
      "Linear Queue",
      "Circular Queue",
      "Deque",
      "Priority Queue",
      "Singly Linked List",
      "Doubly Linked List",
      "Circular Linked List"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/ENotes_12527.pdf"
  },
  {
    id: "mat-dsa-syllabus-cet2",
    title: "DSA CET-II Official Syllabus (Queue & Linked List)",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS403",
    subjectId: "dsa-103",
    semester: 3,
    category: "Syllabus",
    fileType: "PDF",
    fileSize: "61.1 KB",
    pages: "1 Page",
    badge: "Official Syllabus",
    badgeColor: "bg-sky-500/10 text-sky-600 border-sky-500/30",
    description: "Official syllabus outline for B.Tech Semester 3 CET-II covering all types of queues, linked list operations, and their real-world applications.",
    topicsCovered: [
      "Queue Operations",
      "Queue Applications",
      "Linked List Types",
      "Linked List Operations"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DSA_CET_II_Syllabus.pdf"
  },
  {
    id: "mat-conmp-syllabus-cet2",
    title: "CONMP (Python) CET-2 Official Syllabus (S2320C1)",
    subject: "Computer Oriented & Numerical Methods",
    subjectCode: "CS405",
    subjectId: "coanmp-105",
    semester: 3,
    category: "Syllabus",
    fileType: "PDF",
    fileSize: "54.2 KB",
    pages: "1 Page",
    badge: "Official Syllabus",
    badgeColor: "bg-teal-500/10 text-teal-600 border-teal-500/30",
    description: "Official Department of Applied Mathematics syllabus for CET-2 covering Interpolation Techniques, Errors & Approximations, and Iterative Methods (Jacobi, Seidel).",
    topicsCovered: [
      "Interpolation",
      "Newton Forward & Backward",
      "Stirling's Method",
      "Lagrange Method",
      "Errors & Approximations",
      "Jacobi & Seidel Methods"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/CET-2_Syllabus.pdf"
  },
  {
    id: "mat-dbms-syllabus-units",
    title: "DBMS Course Syllabus (Units 1 to 4 - C2311C4)",
    subject: "Database Management Systems",
    subjectCode: "CS402",
    subjectId: "dbms-102",
    semester: 3,
    category: "Syllabus",
    fileType: "JPEG",
    fileSize: "107.6 KB",
    badge: "Course Syllabus",
    badgeColor: "bg-cyan-500/10 text-cyan-600 border-cyan-500/30",
    description: "Official course syllabus snapshot for C2311C4 Database Management Systems covering Unit 1 Database Architecture, Unit 2 Data Models, Unit 3 Relational Query Languages, and Unit 4 Database Design.",
    topicsCovered: [
      "Unit 1 Architecture",
      "Unit 2 Data Models",
      "Unit 3 Relational Queries",
      "Unit 4 Database Design"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DBMS_Syllabus_Units_1_to_4.jpeg"
  },
  {
    id: "mat-dsa-queue-notes",
    title: "DSA Queue Data Structure In-Depth Study Notes",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS403",
    subjectId: "dsa-103",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "8.9 MB",
    pages: "29 Pages",
    badge: "Comprehensive Notes",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    description: "29-page detailed notes and diagrams explaining queue implementations, circular buffer logic, priority queues, and algorithmic analysis.",
    topicsCovered: [
      "Queue Implementations",
      "Circular Queues",
      "Double Ended Queues",
      "Priority Queues",
      "Algorithms"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Queue_Notes.pdf"
  },
  {
    id: "mat-ca-survival-notes",
    title: "Computer Architecture MST Survival Notes (Units 1–6)",
    subject: "Computer Architecture",
    subjectCode: "CS401",
    subjectId: "ca-101",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "381.1 KB",
    pages: "64 Pages",
    badge: "Full Exam Notes",
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/30",
    description: "Comprehensive 64-page student revision notes matching all 46 questions from the official MST question bank with diagrams and textbook references.",
    topicsCovered: [
      "RTL",
      "Micro-operations",
      "Basic Computer Organization",
      "Instruction Cycle",
      "Microprogrammed Control",
      "CPU Architecture"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Computer_Architecture_MST_Notes.pdf"
  },
  {
    id: "mat-java-lab-manual",
    title: "Java OOP Official Faculty Laboratory Manual (C2311C1)",
    subject: "Object-Oriented Programming with Java",
    subjectCode: "CS404",
    subjectId: "java-104",
    semester: 3,
    category: "Lab Manual",
    fileType: "PDF",
    fileSize: "621.0 KB",
    pages: "42 Pages",
    badge: "Official Manual",
    badgeColor: "bg-orange-500/10 text-orange-600 border-orange-500/30",
    description: "Official Faculty Laboratory Manual prepared by Ms. Diksha Durgapal for B.Tech Semester 3 CSE with all practical lists, code samples, and write-ups.",
    topicsCovered: [
      "Java OOP Basics",
      "Class & Object",
      "Inheritance & Polymorphism",
      "Interfaces",
      "Exception Handling",
      "File I/O"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Java_Official_Lab_Manual.pdf"
  },
  {
    id: "mat-conmp-tutorial-1",
    title: "CONMP Tutorial 1: Errors & Floating-Point Computations",
    subject: "Computer Oriented & Numerical Methods",
    subjectCode: "CS405",
    subjectId: "coanmp-105",
    semester: 3,
    category: "Assignment",
    fileType: "PDF",
    fileSize: "102.4 KB",
    pages: "2 Pages",
    badge: "Tutorial & MCQs",
    badgeColor: "bg-slate-500/10 text-slate-600 border-slate-500/30",
    description: "Department of Applied Mathematics tutorial with multiple-choice questions on significant digits, round-off errors, and truncation errors.",
    topicsCovered: [
      "Significant Digits",
      "Round-off Error",
      "Truncation Error",
      "Error Propagation"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Assignment_8926_Content_Document_20260715100533543AM.pdf"
  },
  {
    id: "mat-conmp-tutorial-2",
    title: "CONMP Tutorial 2: Algebraic & Transcendental Equations",
    subject: "Computer Oriented & Numerical Methods",
    subjectCode: "CS405",
    subjectId: "coanmp-105",
    semester: 3,
    category: "Assignment",
    fileType: "PDF",
    fileSize: "135.5 KB",
    pages: "4 Pages",
    badge: "Tutorial Problems",
    badgeColor: "bg-slate-500/10 text-slate-600 border-slate-500/30",
    description: "Practice problems and MCQs covering root finding methods: Bisection Method, Regula-Falsi Method, and Newton-Raphson Method.",
    topicsCovered: [
      "Bisection Method",
      "Regula-Falsi Method",
      "Newton-Raphson Method",
      "Root Convergence"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Assignment_9171_Content_Document_20260801020106817AM.pdf"
  },
  {
    id: "mat-conmp-tutorial-3",
    title: "CONMP Tutorial 3: System of Linear Equations (Jacobi & Seidel)",
    subject: "Computer Oriented & Numerical Methods",
    subjectCode: "CS405",
    subjectId: "coanmp-105",
    semester: 3,
    category: "Assignment",
    fileType: "PDF",
    fileSize: "122.7 KB",
    pages: "2 Pages",
    badge: "Iterative Methods",
    badgeColor: "bg-slate-500/10 text-slate-600 border-slate-500/30",
    description: "Tutorial questions testing diagonal dominance, Gauss-Jacobi iteration, and Gauss-Seidel convergence.",
    topicsCovered: [
      "System of Linear Equations",
      "Gauss-Jacobi Method",
      "Gauss-Seidel Method",
      "Diagonally Dominant Matrices"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Assignment_9651_Content_Document_20260819012630540PM.pdf"
  },
  {
    id: "mat-ca-assignment-1",
    title: "Computer Architecture Assignment 1: Timing, Control & Instruction Cycle",
    subject: "Computer Architecture",
    subjectCode: "CS401",
    subjectId: "ca-101",
    semester: 3,
    category: "Assignment",
    fileType: "PDF",
    fileSize: "133.9 KB",
    pages: "2 Pages",
    badge: "Unit 2 Assignment",
    badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/30",
    description: "Practice questions covering Computer Organization vs Architecture, Register Transfer Language, Common Bus Systems using Multiplexers, and 2's Complement.",
    topicsCovered: [
      "Architecture vs Organization",
      "Registers",
      "Multiplexer Bus",
      "Stored Program Concept",
      "2's Complement"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Assignment_9636_Content_Document_20260818042336477PM.pdf"
  },
  {
    id: "mat-dsa-towers-of-hanoi",
    title: "DSA Recursion Tutorial: Towers of Hanoi Complete Guide",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS403",
    subjectId: "dsa-103",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "542.6 KB",
    pages: "7 Pages",
    badge: "Tutorial Guide",
    badgeColor: "bg-violet-500/10 text-violet-600 border-violet-500/30",
    description: "Complete pedagogical tutorial by Prof. Madonna Lamin explaining recursion, recurrence relations, and base cases via the Towers of Hanoi problem.",
    topicsCovered: [
      "Recursion",
      "Towers of Hanoi",
      "Exponential Complexity",
      "Recurrence Relations"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DSA_Towers_of_Hanoi_Tutorial.pdf"
  },
  {
    id: "mat-dbms-notes-unit1",
    title: "DBMS Unit 1 Lecture Notes: Database System Architecture",
    subject: "Database Management Systems",
    subjectCode: "CS402",
    subjectId: "dbms-102",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "1.2 MB",
    pages: "39 Pages",
    badge: "Unit 1 Notes",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    description: "Official faculty slides covering advantages of DBMS, 3-level ANSI/SPARC architecture, physical and logical data independence, and DBA roles.",
    topicsCovered: [
      "DBMS Intro",
      "ANSI-SPARC Architecture",
      "Data Abstraction",
      "Data Independence",
      "DBA Roles"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DBMS_Complete_Lecture_Notes.pdf"
  },
  {
    id: "mat-dbms-notes-unit2",
    title: "DBMS Unit 2 Lecture Notes: Data Models & E-R Diagrams",
    subject: "Database Management Systems",
    subjectCode: "CS402",
    subjectId: "dbms-102",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "1.2 MB",
    pages: "79 Pages",
    badge: "Unit 2 Notes",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    description: "Complete slides covering Entity Sets, Weak Entities, Attributes, Mapping Cardinality, Extended E-R (Generalization, Specialization, Aggregation), and Relational Reduction.",
    topicsCovered: [
      "E-R Diagrams",
      "Weak Entities",
      "Generalization & Specialization",
      "Aggregation",
      "Hospital Management ER"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DBMS_Relational_Model_and_SQL.pdf"
  },
  {
    id: "mat-dbms-notes-unit3",
    title: "DBMS Unit 3 Lecture Notes: Relational Query Languages & Algebra",
    subject: "Database Management Systems",
    subjectCode: "CS402",
    subjectId: "dbms-102",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "1.4 MB",
    pages: "85 Pages",
    badge: "Unit 3 Notes",
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/30",
    description: "In-depth slides explaining relational algebra operators (Selection, Projection, Joins, Cartesian Product, Set Ops, Division), Aggregate Functions, and SQL.",
    topicsCovered: [
      "Relational Algebra",
      "Selection & Projection",
      "Joins",
      "Cartesian Product",
      "Aggregate Functions"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DBMS_Normalization_and_Transactions.pdf"
  },
  {
    id: "mat-java-slides-unit1",
    title: "Java Unit 1 Slides: Basics of Java, Arrays & Strings",
    subject: "Object-Oriented Programming with Java",
    subjectCode: "CS404",
    subjectId: "java-104",
    semester: 3,
    category: "Presentation",
    fileType: "PPTX",
    fileSize: "4.7 MB",
    badge: "Unit 1 Slides",
    badgeColor: "bg-orange-500/10 text-orange-600 border-orange-500/30",
    description: "Official classroom presentation slides by Asst. Prof. Jeeten Dave covering JDK, JVM architecture, byte code, data types, control flow, and String APIs.",
    topicsCovered: [
      "Features of Java",
      "JVM & Bytecode",
      "Control Statements",
      "Arrays",
      "String Handling"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Unit_1.pptx"
  },
  {
    id: "mat-java-slides-unit2",
    title: "Java Unit 2 Slides: Classes, Objects & Methods",
    subject: "Object-Oriented Programming with Java",
    subjectCode: "CS404",
    subjectId: "java-104",
    semester: 3,
    category: "Presentation",
    fileType: "PPTX",
    fileSize: "2.1 MB",
    badge: "Unit 2 Slides",
    badgeColor: "bg-orange-500/10 text-orange-600 border-orange-500/30",
    description: "Official classroom presentation slides by Asst. Prof. Jeeten Dave covering OOP paradigms, object instantiation, 'this' keyword, and static members.",
    topicsCovered: [
      "Classes & Objects",
      "Constructors",
      "this Keyword",
      "static Keyword",
      "Method Overloading"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Unit_2.pptx"
  },
  {
    id: "mat-mst-exam-format",
    title: "Official Mid-Semester Test (MST) Paper Pattern & Template",
    subject: "All Branches (SOCSET)",
    subjectCode: "SOCSET",
    subjectId: "gen",
    semester: 3,
    category: "Other",
    fileType: "PDF",
    fileSize: "70.8 KB",
    pages: "2 Pages",
    badge: "Exam Format",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    description: "Official examination paper structure released by School of Computer Science, Engineering & Technology showing question division and marking scheme for 60-mark MSTs.",
    topicsCovered: [
      "Exam Format",
      "Section 1 Compulsory (10 Qs)",
      "Section 2 (3-mark)",
      "Section 3 (5-mark)",
      "Section 4 (7-mark)"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/MST_QuestionPaper_Format.pdf"
  },
  {
    id: "mat-dsa-lab-docx",
    title: "DSA Laboratory Practice Problems & Assignment Questions",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS403",
    subjectId: "dsa-103",
    semester: 3,
    category: "Assignment",
    fileType: "DOCX",
    fileSize: "29.2 KB",
    badge: "Lab Assignment",
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
    description: "Practice lab assignments and programming problems on arrays, queues, and linked lists.",
    topicsCovered: [
      "Array Operations",
      "Queue Implementation",
      "Linked List Implementation"
    ],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DSA_Lab_Assignment_Questions.docx"
  }
];
