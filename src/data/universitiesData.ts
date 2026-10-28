// =============================================================================
// GUJARAT MULTI-UNIVERSITY CURRICULUM, TIMETABLE & CAMPUS DATASET (2026-2027)
// Deep research verified schemas for top engineering universities in Gujarat
// =============================================================================

export interface UniversitySubject {
  id: string;
  code: string;
  name: string;
  shortName: string;
  semester: number;
  credits: number;
  teachingScheme: {
    lectureHours: number;
    tutorialHours: number;
    practicalHours: number;
  };
  examScheme: {
    theoryMax: number;
    theoryMin: number;
    practicalMax: number;
    practicalMin: number;
    midSemMax: number;
    internalContinuousMax: number;
  };
  category: 'Core' | 'Elective' | 'Lab' | 'Audit' | 'Humanities';
  color: string;
  description: string;
  units: Array<{
    unitNumber: number;
    title: string;
    hours: number;
    weightagePercent: number;
    keyTopics: string[];
  }>;
}

export interface UniversityPeriod {
  id: string;
  division: string;
  timeSlot: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  location: string;
  roomType: 'Lab' | 'Classroom';
  dayOfWeek?: string;
  notes?: string;
}

export interface UniversityExamSchedule {
  examType: 'Mid-Sem' | 'Remedial' | 'End-Sem Theory' | 'Practical Viva';
  term: string;
  startDate: string;
  endDate: string;
  timeSlot: string;
  items: Array<{
    date: string;
    dayOfWeek: string;
    time: string;
    courseCode: string;
    courseName: string;
    durationMins: number;
  }>;
}

export interface UniversityCampusClub {
  id: string;
  name: string;
  category: 'Tech' | 'Coding' | 'Robotics' | 'Academic' | 'Cultural' | 'CyberSecurity';
  leadName: string;
  memberCount: number;
  description: string;
  badge: string;
}

export interface UniversityData {
  id: string;
  name: string;
  shortName: string;
  code: string;
  location: string;
  campuses: string[];
  accreditation: string;
  establishedYear: number;
  affiliationType: 'Institute of National Importance' | 'Deemed University' | 'Central University' | 'State University' | 'Private State University' | 'Affiliating Technical University' | 'Autonomous Institute';
  badge: string;
  accentColor: string;
  portalUrl: string;
  gradingScale: {
    maxGpa: number;
    passGrade: string;
    grades: Array<{ grade: string; points: number; marksRange: string }>;
  };
  departments: Array<{ id: string; name: string; shortCode: string }>;
  semesters: number[];
  divisions: string[];
  subjects: UniversitySubject[];
  dailyTimetable: UniversityPeriod[];
  examSchedule: UniversityExamSchedule;
  clubs: UniversityCampusClub[];
}

export const GUJARAT_UNIVERSITIES: UniversityData[] = [
  // ───────────────────────────────────────────────────────────────────────────
  // 1. ITM (SLS) BARODA UNIVERSITY (VADODARA)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'itm-baroda',
    name: 'ITM (SLS) Baroda University',
    shortName: 'ITM SLS Baroda',
    code: 'ITMSLS',
    location: 'Vadodara, Gujarat',
    campuses: ['Dhanora Campus (Jarod Road, Vadodara)', 'Paldi Campus'],
    accreditation: 'UGC Recognized · Private State University Act 2019',
    establishedYear: 2019,
    affiliationType: 'Private State University',
    badge: 'Official Campus Hub',
    accentColor: '#2B4EFF',
    portalUrl: 'https://itmuniversity.ac.in',
    gradingScale: {
      maxGpa: 10.0,
      passGrade: 'C',
      grades: [
        { grade: 'O', points: 10, marksRange: '85-100' },
        { grade: 'A+', points: 9, marksRange: '75-84' },
        { grade: 'A', points: 8, marksRange: '65-74' },
        { grade: 'B+', points: 7, marksRange: '55-64' },
        { grade: 'B', points: 6, marksRange: '48-54' },
        { grade: 'C', points: 5, marksRange: '40-47' },
        { grade: 'F', points: 0, marksRange: '<40' },
      ],
    },
    departments: [
      { id: 'cse', name: 'Computer Science & Engineering', shortCode: 'CSE' },
      { id: 'it', name: 'Information Technology', shortCode: 'IT' },
      { id: 'aids', name: 'Artificial Intelligence & Data Science', shortCode: 'AI&DS' },
    ],
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    divisions: ['Div A', 'Div B', 'Div C', 'Div D', 'Div E'],
    subjects: [
      {
        id: 'itm-s3-dsa',
        code: 'DSA301',
        name: 'Data Structures & Algorithms',
        shortName: 'DSA',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 50, theoryMin: 20, practicalMax: 50, practicalMin: 25, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-blue-600 to-indigo-700',
        description: 'Linear & non-linear structures, complexity analysis, trees, AVL, graphs, sorting & hashing in C.',
        units: [
          { unitNumber: 1, title: 'Introduction & Linear Arrays', hours: 8, weightagePercent: 18, keyTopics: ['Asymptotic Notations O/Omega/Theta', '2D Array Row/Col Major', 'Dynamic Allocation malloc/free'] },
          { unitNumber: 2, title: 'Stacks & Queues', hours: 9, weightagePercent: 20, keyTopics: ['Infix to Postfix Shunting-Yard', 'Postfix Evaluation', 'Circular Queue', 'Double-Ended Queue (Deque)'] },
          { unitNumber: 3, title: 'Linked Lists', hours: 9, weightagePercent: 20, keyTopics: ['Singly Linked List', 'Doubly Linked List', 'Circular Linked List', 'Polynomial Arithmetic'] },
          { unitNumber: 4, title: 'Trees & Search Trees', hours: 10, weightagePercent: 22, keyTopics: ['Binary Tree Traversals', 'BST Insertion/Deletion', 'AVL Rotations', 'Min/Max Heaps'] },
          { unitNumber: 5, title: 'Graphs & Hashing', hours: 9, weightagePercent: 20, keyTopics: ['Adjacency List/Matrix', 'BFS & DFS', 'Dijkstra Shortest Path', 'Hash Collision Resolution'] },
        ],
      },
      {
        id: 'itm-s3-dbms',
        code: 'DBMS302',
        name: 'Database Management Systems',
        shortName: 'DBMS',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 50, theoryMin: 20, practicalMax: 50, practicalMin: 25, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-amber-500 to-orange-600',
        description: 'Relational model, SQL DDL/DML, normalization (1NF-BCNF), transactions, ACID properties & indexing.',
        units: [
          { unitNumber: 1, title: 'Introduction & Database Architecture', hours: 7, weightagePercent: 15, keyTopics: ['Three-Schema ANSI/SPARC', 'Data Independence', 'DBMS vs File System'] },
          { unitNumber: 2, title: 'Entity-Relationship Modeling', hours: 8, weightagePercent: 20, keyTopics: ['Strong vs Weak Entities', 'Cardinality Ratios', 'ER-to-Relational Mapping'] },
          { unitNumber: 3, title: 'Relational Algebra & Advanced SQL', hours: 10, weightagePercent: 25, keyTopics: ['Selection, Projection, Join', 'Subqueries & CTEs', 'DENSE_RANK() Window Functions'] },
          { unitNumber: 4, title: 'Relational Normalization', hours: 10, weightagePercent: 22, keyTopics: ['Functional Dependencies', '1NF, 2NF, 3NF', 'Boyce-Codd Normal Form (BCNF)'] },
          { unitNumber: 5, title: 'Transaction Management & Concurrency', hours: 10, weightagePercent: 18, keyTopics: ['ACID Guarantees', 'Serializability', 'Two-Phase Locking (2PL)', 'Deadlock Prevention'] },
        ],
      },
      {
        id: 'itm-s3-oopj',
        code: 'JAVA303',
        name: 'Object-Oriented Programming using Java',
        shortName: 'OOPJ',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 50, theoryMin: 20, practicalMax: 50, practicalMin: 25, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-rose-500 to-pink-600',
        description: 'Java OOP paradigm, encapsulation, inheritance, interfaces, packages, exception handling & streams.',
        units: [
          { unitNumber: 1, title: 'Java Fundamentals & OOP Concepts', hours: 8, weightagePercent: 18, keyTopics: ['JVM, JRE, JDK Architecture', 'Classes & Object Lifetime', 'Constructors & this Keyword'] },
          { unitNumber: 2, title: 'Inheritance & Polymorphism', hours: 9, weightagePercent: 20, keyTopics: ['super Keyword', 'Method Overriding & Dynamic Binding', 'Abstract Classes', 'final Keyword'] },
          { unitNumber: 3, title: 'Interfaces, Packages & Access Control', hours: 9, weightagePercent: 20, keyTopics: ['Multiple Interface Inheritance', 'Default Methods', 'Package Creation & JAR Distribution'] },
          { unitNumber: 4, title: 'Exception Handling & File I/O', hours: 9, weightagePercent: 22, keyTopics: ['try-catch-finally Flow', 'Custom Checked Exceptions', 'Byte vs Character Streams'] },
          { unitNumber: 5, title: 'Multithreading & Collections Framework', hours: 10, weightagePercent: 20, keyTopics: ['Thread Lifecycle & Runnable', 'synchronized Blocks', 'ArrayList, HashMap, Streams'] },
        ],
      },
      {
        id: 'itm-s3-coa',
        code: 'COA304',
        name: 'Computer Architecture & Organization',
        shortName: 'COA',
        semester: 3,
        credits: 3,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 0 },
        examScheme: { theoryMax: 50, theoryMin: 20, practicalMax: 0, practicalMin: 0, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-purple-600 to-indigo-800',
        description: 'RISC instruction formats, addressing modes, 5-stage pipelining, cache memory mapping & Booth algorithm.',
        units: [
          { unitNumber: 1, title: 'Basic Computer Architecture & RTL', hours: 8, weightagePercent: 20, keyTopics: ['Von Neumann vs Harvard', 'Bus Architecture', 'Register Transfer Language (RTL)'] },
          { unitNumber: 2, title: 'Computer Arithmetic & ALU Design', hours: 9, weightagePercent: 22, keyTopics: ["Booth's Signed Multiplication", 'Restoring & Non-Restoring Division', 'IEEE 754 Floating Point'] },
          { unitNumber: 3, title: 'Instruction Sequencing & Addressing', hours: 8, weightagePercent: 20, keyTopics: ['Instruction Cycles & Timing', 'Immediate, Direct, Indirect, Base-Register', 'RISC vs CISC'] },
          { unitNumber: 4, title: 'Pipelining & Superscalar Processors', hours: 10, weightagePercent: 20, keyTopics: ['5-Stage RISC Pipeline', 'Structural, Data, Control Hazards', 'Branch Prediction'] },
          { unitNumber: 5, title: 'Memory Hierarchy & Cache Design', hours: 10, weightagePercent: 18, keyTopics: ['Direct, Associative, Set-Associative Cache', 'AMAT Formula', 'Virtual Memory Paging'] },
        ],
      },
      {
        id: 'itm-s3-conmp',
        code: 'CONMP305',
        name: 'Computer Oriented Numerical Methods (Python)',
        shortName: 'CONMP',
        semester: 3,
        credits: 3,
        teachingScheme: { lectureHours: 2, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 50, theoryMin: 20, practicalMax: 50, practicalMin: 25, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-emerald-500 to-teal-700',
        description: 'Non-linear root finding, Gauss elimination, numerical integration (Simpson), Runge-Kutta ODE solvers in Python.',
        units: [
          { unitNumber: 1, title: 'Error Analysis & Root Finding', hours: 7, weightagePercent: 20, keyTopics: ['Absolute vs Relative Error', 'Bisection Method', 'Newton-Raphson Iteration', 'Secant Method'] },
          { unitNumber: 2, title: 'Linear Systems of Equations', hours: 8, weightagePercent: 20, keyTopics: ['Gauss Elimination with Partial Pivoting', 'Gauss-Jordan Method', 'Gauss-Seidel Iteration'] },
          { unitNumber: 3, title: 'Interpolation & Curve Fitting', hours: 9, weightagePercent: 22, keyTopics: ['Newton Forward & Backward Differences', 'Lagrange Interpolation', 'Natural Cubic Splines'] },
          { unitNumber: 4, title: 'Numerical Quadrature & Integration', hours: 8, weightagePercent: 20, keyTopics: ['Trapezoidal Rule', "Simpson's 1/3 and 3/8 Rules", 'Gauss-Legendre 2 & 3 Point Quadrature'] },
          { unitNumber: 5, title: 'Numerical Solution of ODEs', hours: 8, weightagePercent: 18, keyTopics: ["Euler's Method", 'Runge-Kutta 4th Order (RK4)', 'Adams-Bashforth-Moulton Multi-Step'] },
        ],
      },
    ],
    dailyTimetable: [
      { id: 'itm-t-1', division: 'Div A', timeSlot: '10:10 AM - 11:15 AM', subjectCode: 'JAVA303', subjectName: 'OOP Java Practical Lab', facultyName: 'Prof. Diksha Durgapal', location: 'Lab-4', roomType: 'Lab', notes: 'Practical batch implementation' },
      { id: 'itm-t-2', division: 'Div A', timeSlot: '11:15 AM - 12:15 PM', subjectCode: 'DBMS302', subjectName: 'Database Management Systems', facultyName: 'Prof. Raju Nakum', location: 'EB-15', roomType: 'Classroom', notes: 'BCNF Normalization' },
      { id: 'itm-t-3', division: 'Div A', timeSlot: '01:00 PM - 02:00 PM', subjectCode: 'COA304', subjectName: 'Computer Architecture', facultyName: 'Prof. Ankita Kumari', location: 'EB-15', roomType: 'Classroom', notes: 'Pipeline hazards' },
      { id: 'itm-t-4', division: 'Div A', timeSlot: '02:05 PM - 03:05 PM', subjectCode: 'DSA301', subjectName: 'Data Structures & Algorithms', facultyName: 'Prof. Madonna Lamin', location: 'EB-15', roomType: 'Classroom', notes: 'AVL Tree rotations' },
      { id: 'itm-t-5', division: 'Div D', timeSlot: '10:10 AM - 11:15 AM', subjectCode: 'JAVA303', subjectName: 'OOP Java Practical Lab', facultyName: 'Prof. Narendra Gamit', location: 'Lab-4', roomType: 'Lab' },
      { id: 'itm-t-6', division: 'Div D', timeSlot: '11:15 AM - 12:15 PM', subjectCode: 'DBMS302', subjectName: 'Database Management Systems', facultyName: 'Prof. Raju Nakum', location: 'EB-39', roomType: 'Classroom' },
      { id: 'itm-t-7', division: 'Div D', timeSlot: '01:00 PM - 02:00 PM', subjectCode: 'COA304', subjectName: 'Computer Architecture', facultyName: 'Prof. Ankita Kumari', location: 'EB-39', roomType: 'Classroom' },
      { id: 'itm-t-8', division: 'Div D', timeSlot: '02:05 PM - 03:05 PM', subjectCode: 'DSA301', subjectName: 'Data Structures & Algorithms', facultyName: 'Prof. Madonna Lamin', location: 'EB-39', roomType: 'Classroom' },
    ],
    examSchedule: {
      examType: 'Mid-Sem',
      term: 'Odd Semester 2026-2027',
      startDate: '26-10-2026',
      endDate: '31-10-2026',
      timeSlot: '10:10 AM - 11:40 AM',
      items: [
        { date: '26-10-2026', dayOfWeek: 'Monday', time: '10:10 AM - 11:40 AM', courseCode: 'JAVA303', courseName: 'Object-Oriented Programming Java', durationMins: 90 },
        { date: '27-10-2026', dayOfWeek: 'Tuesday', time: '10:10 AM - 11:40 AM', courseCode: 'DSA301', courseName: 'Data Structures and Algorithms', durationMins: 90 },
        { date: '28-10-2026', dayOfWeek: 'Wednesday', time: '10:10 AM - 11:40 AM', courseCode: 'DBMS302', courseName: 'Database Management Systems', durationMins: 90 },
        { date: '29-10-2026', dayOfWeek: 'Thursday', time: '10:10 AM - 11:40 AM', courseCode: 'COA304', courseName: 'Computer Architecture', durationMins: 90 },
        { date: '30-10-2026', dayOfWeek: 'Friday', time: '10:10 AM - 11:40 AM', courseCode: 'CONMP305', courseName: 'Numerical Methods in Computing', durationMins: 90 },
      ],
    },
    clubs: [
      { id: 'itm-club-gdsc', name: 'Google Developer Student Club (GDSC ITM)', category: 'Tech', leadName: 'Devansh Parikh', memberCount: 312, description: 'Official campus chapter focusing on Web, Cloud & Android development.', badge: 'Google Supported' },
      { id: 'itm-club-robotics', name: 'ITM Robotics & IoT Guild', category: 'Robotics', leadName: 'Aarav Mehta', memberCount: 184, description: 'Hardware prototyping, ROS, Arduino, and autonomous line-follower rovers.', badge: 'Hardware Lab' },
      { id: 'itm-club-coders', name: 'Competitive Programming League (CPL)', category: 'Coding', leadName: 'Priya Joshi', memberCount: 420, description: 'Weekly LeetCode and Codeforces sprints for technical placements.', badge: 'Placement Focus' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 2. GUJARAT TECHNOLOGICAL UNIVERSITY (GTU) (AHMEDABAD / STATEWIDE)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'gtu',
    name: 'Gujarat Technological University',
    shortName: 'GTU Gujarat',
    code: 'GTU',
    location: 'Ahmedabad / Gandhinagar, Gujarat',
    campuses: ['Chandkheda Campus (Ahmedabad)', 'VGEC Chandkheda', 'LDCE Ahmedabad', 'BVM Anand'],
    accreditation: 'State Affiliating Technical University · AICTE Approved · NAAC A+',
    establishedYear: 2007,
    affiliationType: 'Affiliating Technical University',
    badge: 'AICTE Model Curriculum',
    accentColor: '#0EA5E9',
    portalUrl: 'https://gtu.ac.in',
    gradingScale: {
      maxGpa: 10.0,
      passGrade: 'DD',
      grades: [
        { grade: 'AA', points: 10, marksRange: '85-100' },
        { grade: 'AB', points: 9, marksRange: '75-84' },
        { grade: 'BB', points: 8, marksRange: '65-74' },
        { grade: 'BC', points: 7, marksRange: '55-64' },
        { grade: 'CC', points: 6, marksRange: '45-54' },
        { grade: 'CD', points: 5, marksRange: '40-44' },
        { grade: 'DD', points: 4, marksRange: '35-39' },
        { grade: 'FF', points: 0, marksRange: '<35' },
      ],
    },
    departments: [
      { id: 'ce', name: 'Computer Engineering', shortCode: 'CE' },
      { id: 'it', name: 'Information Technology', shortCode: 'IT' },
      { id: 'aiml', name: 'Artificial Intelligence & Machine Learning', shortCode: 'AI&ML' },
    ],
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    divisions: ['Div 1', 'Div 2', 'Div 3'],
    subjects: [
      {
        id: 'gtu-3130702',
        code: '3130702',
        name: 'Data Structures',
        shortName: 'DS',
        semester: 3,
        credits: 5,
        teachingScheme: { lectureHours: 4, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 70, theoryMin: 23, practicalMax: 30, practicalMin: 15, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-cyan-600 to-blue-700',
        description: 'Official GTU syllabus: Linear data structures, generalized linked lists, binary search trees, threaded trees, graphs and internal sorting.',
        units: [
          { unitNumber: 1, title: 'Introduction to Data Structures & Analysis', hours: 7, weightagePercent: 12, keyTopics: ['Data types, Abstract Data Types (ADT)', 'Time and Space Complexity Analysis', 'Big-O, Omega, Theta'] },
          { unitNumber: 2, title: 'Linear Data Structures (Arrays & Stacks)', hours: 10, weightagePercent: 20, keyTopics: ['Sequential Allocation', 'Stack Operations (Push, Pop, Peep)', 'Applications of Stack: Infix to Postfix, Recursion'] },
          { unitNumber: 3, title: 'Queues & Linked Lists', hours: 12, weightagePercent: 24, keyTopics: ['Circular Queue, Priority Queue', 'Singly, Doubly and Circular Linked Lists', 'Polynomial representation using Linked List'] },
          { unitNumber: 4, title: 'Nonlinear Data Structures: Trees', hours: 13, weightagePercent: 26, keyTopics: ['Binary Tree Traversals (Recursive & Non-Recursive)', 'BST Insertion/Deletion', 'Threaded Binary Trees', 'AVL Trees with Balance Factor'] },
          { unitNumber: 5, title: 'Graphs, Sorting & Hashing', hours: 10, weightagePercent: 18, keyTopics: ['Graph Traversals (BFS, DFS)', 'Minimum Spanning Tree (Prim, Kruskal)', 'QuickSort, MergeSort, HeapSort', 'Hashing with Open Addressing'] },
        ],
      },
      {
        id: 'gtu-3130703',
        code: '3130703',
        name: 'Database Management Systems',
        shortName: 'DBMS',
        semester: 3,
        credits: 5,
        teachingScheme: { lectureHours: 4, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 70, theoryMin: 23, practicalMax: 30, practicalMin: 15, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-amber-600 to-yellow-600',
        description: 'Relational data model, relational algebra, SQL DDL/DML/DCL, functional dependencies and decomposition, transactions and recovery.',
        units: [
          { unitNumber: 1, title: 'Introductory Concepts of DBMS', hours: 6, weightagePercent: 12, keyTopics: ['Database System vs File System', 'View of Data, Data Abstraction', 'Instances and Schemas, Architecture'] },
          { unitNumber: 2, title: 'Entity-Relationship Model & Relational Algebra', hours: 12, weightagePercent: 24, keyTopics: ['ER Diagram, Extended ER features', 'Relational Model Constraints', 'Relational Algebra Operations (Select, Project, Join, Division)'] },
          { unitNumber: 3, title: 'Structured Query Language (SQL)', hours: 12, weightagePercent: 24, keyTopics: ['DDL, DML, DCL commands', 'Nested Subqueries, Views, Triggers, Stored Procedures', 'PL/SQL Block structure and Cursors'] },
          { unitNumber: 4, title: 'Relational Database Design & Normalization', hours: 12, weightagePercent: 25, keyTopics: ['Functional Dependencies, Closure of FDs', 'Canonical Cover, Lossless Join & Dependency Preservation', '1NF, 2NF, 3NF, BCNF Decomposition'] },
          { unitNumber: 5, title: 'Transaction Processing & Concurrency', hours: 10, weightagePercent: 15, keyTopics: ['Transaction States & ACID Properties', 'Serializability & Recoverability', 'Lock-Based Protocols (Strict 2PL), Deadlock Handling', 'Log-Based Recovery (ARIES)'] },
        ],
      },
      {
        id: 'gtu-3130704',
        code: '3130704',
        name: 'Digital Fundamentals',
        shortName: 'DF',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 70, theoryMin: 23, practicalMax: 30, practicalMin: 15, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-emerald-600 to-green-700',
        description: 'Binary number systems, Boolean algebra, Karnaugh maps, combinational logic design, sequential circuits and flip-flops.',
        units: [
          { unitNumber: 1, title: 'Number Systems & Binary Codes', hours: 6, weightagePercent: 15, keyTopics: ['Binary, Octal, Hexadecimal conversions', "1's and 2's Complement Arithmetic", 'BCD, Gray code, Error detecting codes'] },
          { unitNumber: 2, title: 'Boolean Algebra & Logic Simplification', hours: 10, weightagePercent: 25, keyTopics: ['De Morgan’s Theorems', 'Standard SOP and POS forms', 'Karnaugh Map (up to 5 variables)', 'Quine-McCluskey (Tabular) Minimization'] },
          { unitNumber: 3, title: 'Combinational Logic Design', hours: 12, weightagePercent: 25, keyTopics: ['Half Adder, Full Adder, Look-ahead Carry Adder', 'Multiplexers, Demultiplexers, Decoders, Encoders', 'Magnitude Comparators'] },
          { unitNumber: 4, title: 'Sequential Logic Circuits', hours: 12, weightagePercent: 25, keyTopics: ['SR, JK, D, T Flip-Flops (Master-Slave)', 'Flip-Flop Conversion and Timing Considerations', 'Asynchronous & Synchronous Binary Counters', 'Shift Registers (SISO, SIPO, PISO, PIPO)'] },
          { unitNumber: 5, title: 'Finite State Machines & PLDs', hours: 5, weightagePercent: 10, keyTopics: ['Mealy vs Moore FSM models', 'State Reduction and State Assignment', 'ROM, PLA, PAL basics'] },
        ],
      },
      {
        id: 'gtu-3130006',
        code: '3130006',
        name: 'Probability and Statistics',
        shortName: 'PS',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 1, practicalHours: 0 },
        examScheme: { theoryMax: 70, theoryMin: 23, practicalMax: 0, practicalMin: 0, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-violet-600 to-purple-700',
        description: 'Random variables, probability distributions (Binomial, Poisson, Normal), correlation, regression & hypothesis testing.',
        units: [
          { unitNumber: 1, title: 'Basic Probability & Random Variables', hours: 8, weightagePercent: 20, keyTopics: ['Conditional Probability & Bayes Theorem', 'Discrete & Continuous Random Variables', 'Probability Mass & Density Functions'] },
          { unitNumber: 2, title: 'Theoretical Probability Distributions', hours: 10, weightagePercent: 25, keyTopics: ['Binomial Distribution', 'Poisson Distribution as limiting case', 'Normal Distribution & Standard Normal Table'] },
          { unitNumber: 3, title: 'Applied Statistics & Correlation', hours: 9, weightagePercent: 20, keyTopics: ['Moments, Skewness & Kurtosis', 'Karl Pearson’s Correlation Coefficient', 'Lines of Regression (Y on X, X on Y)'] },
          { unitNumber: 4, title: 'Large Sample Hypothesis Tests', hours: 9, weightagePercent: 20, keyTopics: ['Null & Alternative Hypothesis', 'Level of Significance, Type I & Type II Errors', 'Z-Test for Single Mean & Difference of Means'] },
          { unitNumber: 5, title: 'Small Sample Tests (t, F, Chi-Square)', hours: 9, weightagePercent: 15, keyTopics: ["Student's t-Distribution", 'F-Test for Equality of Variances', 'Chi-Square Test for Goodness of Fit & Independence'] },
        ],
      },
    ],
    dailyTimetable: [
      { id: 'gtu-t-1', division: 'Div 1', timeSlot: '10:30 AM - 11:30 AM', subjectCode: '3130703', subjectName: 'Database Management Systems', facultyName: 'Prof. D. H. Patel', location: 'Room 301', roomType: 'Classroom' },
      { id: 'gtu-t-2', division: 'Div 1', timeSlot: '11:30 AM - 12:30 PM', subjectCode: '3130702', subjectName: 'Data Structures', facultyName: 'Prof. M. K. Shah', location: 'Room 301', roomType: 'Classroom' },
      { id: 'gtu-t-3', division: 'Div 1', timeSlot: '01:15 PM - 03:15 PM', subjectCode: '3130702', subjectName: 'Data Structures Lab (C Programming)', facultyName: 'Prof. M. K. Shah', location: 'Lab CC-2', roomType: 'Lab' },
      { id: 'gtu-t-4', division: 'Div 1', timeSlot: '03:30 PM - 04:30 PM', subjectCode: '3130704', subjectName: 'Digital Fundamentals', facultyName: 'Prof. P. R. Joshi', location: 'Room 301', roomType: 'Classroom' },
      { id: 'gtu-t-5', division: 'Div 1', timeSlot: '04:30 PM - 05:30 PM', subjectCode: '3130006', subjectName: 'Probability and Statistics', facultyName: 'Prof. S. A. Desai', location: 'Room 301', roomType: 'Classroom' },
    ],
    examSchedule: {
      examType: 'Mid-Sem',
      term: 'Winter Session 2026',
      startDate: '10-11-2026',
      endDate: '17-11-2026',
      timeSlot: '10:30 AM - 12:00 PM',
      items: [
        { date: '10-11-2026', dayOfWeek: 'Tuesday', time: '10:30 AM - 12:00 PM', courseCode: '3130702', courseName: 'Data Structures', durationMins: 90 },
        { date: '11-11-2026', dayOfWeek: 'Wednesday', time: '10:30 AM - 12:00 PM', courseCode: '3130703', courseName: 'Database Management Systems', durationMins: 90 },
        { date: '12-11-2026', dayOfWeek: 'Thursday', time: '10:30 AM - 12:00 PM', courseCode: '3130704', courseName: 'Digital Fundamentals', durationMins: 90 },
        { date: '13-11-2026', dayOfWeek: 'Friday', time: '10:30 AM - 12:00 PM', courseCode: '3130006', courseName: 'Probability and Statistics', durationMins: 90 },
      ],
    },
    clubs: [
      { id: 'gtu-club-osc', name: 'GTU Open Source Community', category: 'Tech', leadName: 'Kishan Dave', memberCount: 520, description: 'Linux, Git, Rust and FOSS tooling across GTU affiliated engineering colleges.', badge: 'Statewide Hub' },
      { id: 'gtu-club-cp', name: 'LDCE Competitive Coders Chapter', category: 'Coding', leadName: 'Harshil Shah', memberCount: 380, description: 'ICP & Codeforces ranking preparation with monthly mock contests.', badge: 'LDCE Chapter' },
      { id: 'gtu-club-cyber', name: 'GTU Cyber Defense & CTF Wing', category: 'CyberSecurity', leadName: 'Nirav Prajapati', memberCount: 290, description: 'Ethical hacking, binary exploitation and DefCon CTF team training.', badge: 'InfoSec' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 3. PARUL UNIVERSITY (VADODARA)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'parul',
    name: 'Parul University (PIET / PIT)',
    shortName: 'Parul University',
    code: 'PU',
    location: 'Waghodia, Vadodara, Gujarat',
    campuses: ['Main University Campus (Waghodia)', 'PIET Block', 'PIT Engineering Complex'],
    accreditation: 'NAAC A++ Accredited · AICTE & UGC Recognized',
    establishedYear: 2015,
    affiliationType: 'Private State University',
    badge: 'NAAC A++ Campus',
    accentColor: '#8B5CF6',
    portalUrl: 'https://paruluniversity.ac.in',
    gradingScale: {
      maxGpa: 10.0,
      passGrade: 'P',
      grades: [
        { grade: 'O', points: 10, marksRange: '90-100' },
        { grade: 'A+', points: 9, marksRange: '80-89' },
        { grade: 'A', points: 8, marksRange: '70-79' },
        { grade: 'B+', points: 7, marksRange: '60-69' },
        { grade: 'B', points: 6, marksRange: '50-59' },
        { grade: 'P', points: 5, marksRange: '40-49' },
        { grade: 'F', points: 0, marksRange: '<40' },
      ],
    },
    departments: [
      { id: 'cse', name: 'Computer Science & Engineering', shortCode: 'CSE' },
      { id: 'it', name: 'Information Technology', shortCode: 'IT' },
      { id: 'csd', name: 'Computer Science & Design', shortCode: 'CSD' },
    ],
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    divisions: ['Batch 3A', 'Batch 3B', 'Batch 3C'],
    subjects: [
      {
        id: 'pu-203105201',
        code: '203105201',
        name: 'Data Structures and Algorithms with C++',
        shortName: 'DSA (C++)',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 60, theoryMin: 24, practicalMax: 40, practicalMin: 20, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-purple-600 to-indigo-700',
        description: 'Parul University curriculum: C++ STL vectors, stacks, queues, balanced trees, graph connectivity and greedy algorithms.',
        units: [
          { unitNumber: 1, title: 'C++ Modern OOP & STL Fundamentals', hours: 7, weightagePercent: 15, keyTopics: ['Templates, Vector, Iterator pattern', 'Pointers and Dynamic memory in C++', 'Time & Space complexity analysis'] },
          { unitNumber: 2, title: 'Linear Structures & Linked Representations', hours: 10, weightagePercent: 25, keyTopics: ['Single, Doubly, Circular Linked List in C++', 'Stack implementation and evaluation', 'Queue, Circular Queue and Deque'] },
          { unitNumber: 3, title: 'Trees, Heaps & Priority Queues', hours: 11, weightagePercent: 25, keyTopics: ['Binary Search Tree with C++ classes', 'AVL Tree Self-Balancing Rotations', 'Min-Heap, Max-Heap and Priority Queue in STL'] },
          { unitNumber: 4, title: 'Graph Algorithms & Shortest Path', hours: 10, weightagePercent: 20, keyTopics: ['Adjacency List & Matrix representation', 'Breadth First Search (BFS), Depth First Search (DFS)', 'Dijkstra and Prim algorithms'] },
          { unitNumber: 5, title: 'Sorting, Searching & Hash Tables', hours: 7, weightagePercent: 15, keyTopics: ['QuickSort, MergeSort, RadixSort', 'Hash functions, Linear Probing, Chaining'] },
        ],
      },
      {
        id: 'pu-203105202',
        code: '203105202',
        name: 'Database Management Systems and SQL',
        shortName: 'DBMS SQL',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 60, theoryMin: 24, practicalMax: 40, practicalMin: 20, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-pink-600 to-rose-700',
        description: 'ER diagrams, relational normalization, advanced MySQL joins, subqueries, transaction isolation and ACID guarantees.',
        units: [
          { unitNumber: 1, title: 'Database Foundations & ER Models', hours: 8, weightagePercent: 20, keyTopics: ['File System vs DBMS', 'Conceptual, Logical & Physical Data Models', 'Entities, Relationships, Weak Entity Sets'] },
          { unitNumber: 2, title: 'Relational Model & Relational Algebra', hours: 8, weightagePercent: 20, keyTopics: ['Relational Integrity Constraints', 'Relational Algebra (Select, Project, Union, Cross, Join)', 'Tuple Relational Calculus'] },
          { unitNumber: 3, title: 'SQL & Database Programming', hours: 10, weightagePercent: 25, keyTopics: ['DDL, DML, DQL, DCL queries in MySQL', 'Complex Joins, Aggregate Functions, Group By', 'Triggers, Views and Stored Procedures'] },
          { unitNumber: 4, title: 'Normalization & Schema Refinement', hours: 10, weightagePercent: 20, keyTopics: ['Functional Dependencies and Armstrong Axioms', '1NF, 2NF, 3NF and BCNF Normal Forms', 'Multivalued Dependencies & 4NF'] },
          { unitNumber: 5, title: 'Transaction Processing & Concurrency', hours: 9, weightagePercent: 15, keyTopics: ['ACID Properties, Transaction States', 'Serializability, Concurrency Protocols (2PL)', 'Database Backup & Recovery Techniques'] },
        ],
      },
      {
        id: 'pu-203105203',
        code: '203105203',
        name: 'Object Oriented Programming with Java',
        shortName: 'Java OOP',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 60, theoryMin: 24, practicalMax: 40, practicalMin: 20, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-amber-500 to-orange-600',
        description: 'Core Java, class hierarchies, interfaces, exceptions, multithreading, collections, lambda expressions & JavaFX UI.',
        units: [
          { unitNumber: 1, title: 'Java Architecture & Syntax', hours: 7, weightagePercent: 15, keyTopics: ['Java Virtual Machine (JVM) internals', 'Primitive types, Wrapper classes, Operators', 'Static vs Instance members'] },
          { unitNumber: 2, title: 'Classes, Inheritance & Polymorphism', hours: 10, weightagePercent: 25, keyTopics: ['Encapsulation & Access Modifiers', 'Super constructor chaining', 'Method Overriding & Abstract classes', 'Final keyword'] },
          { unitNumber: 3, title: 'Interfaces, Packages & Exception Handling', hours: 10, weightagePercent: 25, keyTopics: ['Multiple interface implementation', 'Creating user-defined packages', 'Checked vs Unchecked Exceptions, throw/throws', 'Custom Exception classes'] },
          { unitNumber: 4, title: 'Java Multithreading & Synchronization', hours: 9, weightagePercent: 20, keyTopics: ['Thread class vs Runnable interface', 'Thread priorities and Inter-thread communication', 'Deadlock detection & synchronized methods'] },
          { unitNumber: 5, title: 'Collections & Generics', hours: 9, weightagePercent: 15, keyTopics: ['ArrayList, LinkedList, HashSet, HashMap', 'Generic classes & wildcards', 'Java 8 Stream API & Lambda expressions'] },
        ],
      },
      {
        id: 'pu-203105204',
        code: '203105204',
        name: 'Computer Organization and Microprocessors',
        shortName: 'CO & MP',
        semester: 3,
        credits: 3,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 0 },
        examScheme: { theoryMax: 60, theoryMin: 24, practicalMax: 0, practicalMin: 0, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-blue-600 to-cyan-700',
        description: 'Instruction sets, CPU control unit, 8086 microprocessor architecture, memory hierarchy and cache mapping.',
        units: [
          { unitNumber: 1, title: 'Instruction Set Architecture & RTL', hours: 8, weightagePercent: 20, keyTopics: ['Computer Registers & Bus System', 'Instruction cycle and execution steps', 'Register transfer micro-operations'] },
          { unitNumber: 2, title: 'Control Unit & Arithmetic Processing', hours: 9, weightagePercent: 22, keyTopics: ['Hardwired vs Micro-programmed Control', "Booth's algorithm for signed 2's complement", 'IEEE 754 floating point standard'] },
          { unitNumber: 3, title: '8086 Microprocessor Architecture', hours: 10, weightagePercent: 25, keyTopics: ['Bus Interface Unit (BIU) & Execution Unit (EU)', 'Segmented memory addressing in 8086', 'Pin diagram, Interrupts and Flag Register'] },
          { unitNumber: 4, title: 'Memory Organization & Cache', hours: 9, weightagePercent: 18, keyTopics: ['Memory hierarchy, SRAM vs DRAM', 'Direct, Associative and Set-Associative Cache', 'Virtual memory management and Paging'] },
          { unitNumber: 5, title: 'Input-Output Organization', hours: 9, weightagePercent: 15, keyTopics: ['Programmed I/O vs Interrupt-Driven I/O', 'Direct Memory Access (DMA) controller', 'Standard bus interfaces (PCI, USB)'] },
        ],
      },
    ],
    dailyTimetable: [
      { id: 'pu-t-1', division: 'Batch 3A', timeSlot: '09:30 AM - 10:30 AM', subjectCode: '203105203', subjectName: 'Object Oriented Programming Java', facultyName: 'Prof. J. K. Sharma', location: 'Room PU-204', roomType: 'Classroom' },
      { id: 'pu-t-2', division: 'Batch 3A', timeSlot: '10:30 AM - 11:30 AM', subjectCode: '203105202', subjectName: 'Database Management Systems', facultyName: 'Prof. N. V. Mehta', location: 'Room PU-204', roomType: 'Classroom' },
      { id: 'pu-t-3', division: 'Batch 3A', timeSlot: '12:00 PM - 02:00 PM', subjectCode: '203105201', subjectName: 'DSA Implementation Lab (C++)', facultyName: 'Prof. R. S. Trivedi', location: 'Lab PU-Comp 3', roomType: 'Lab' },
      { id: 'pu-t-4', division: 'Batch 3A', timeSlot: '02:15 PM - 03:15 PM', subjectCode: '203105204', subjectName: 'Computer Organization & MP', facultyName: 'Prof. R. S. Trivedi', location: 'Room PU-204', roomType: 'Classroom' },
    ],
    examSchedule: {
      examType: 'Mid-Sem',
      term: 'Semester 3 MST',
      startDate: '04-11-2026',
      endDate: '09-11-2026',
      timeSlot: '09:30 AM - 11:00 AM',
      items: [
        { date: '04-11-2026', dayOfWeek: 'Wednesday', time: '09:30 AM - 11:00 AM', courseCode: '203105201', courseName: 'Data Structures and Algorithms (C++)', durationMins: 90 },
        { date: '05-11-2026', dayOfWeek: 'Thursday', time: '09:30 AM - 11:00 AM', courseCode: '203105202', courseName: 'Database Management Systems and SQL', durationMins: 90 },
        { date: '06-11-2026', dayOfWeek: 'Friday', time: '09:30 AM - 11:00 AM', courseCode: '203105203', courseName: 'Object Oriented Programming Java', durationMins: 90 },
        { date: '07-11-2026', dayOfWeek: 'Saturday', time: '09:30 AM - 11:00 AM', courseCode: '203105204', courseName: 'Computer Organization & Microprocessors', durationMins: 90 },
      ],
    },
    clubs: [
      { id: 'pu-club-league', name: 'PU Coders League', category: 'Coding', leadName: 'Aryan Varma', memberCount: 450, description: 'Competitive programming, LeetCode daily streaks and Hackathons.', badge: 'Coding Guild' },
      { id: 'pu-club-gdsc', name: 'Google Developer Student Club Parul', category: 'Tech', leadName: 'Ananya Desai', memberCount: 620, description: 'Android, Flutter, Google Cloud and TensorFlow community workshops.', badge: 'GDSC Partner' },
      { id: 'pu-club-robotics', name: 'PIET AI & Robotics Society', category: 'Robotics', leadName: 'Kunal Patel', memberCount: 210, description: 'Drone building, embedded C, computer vision and automated bots.', badge: 'Maker Lab' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 4. CHARUSAT (CHANGA / ANAND)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'charusat',
    name: 'CHARUSAT (CSPIT & DEPSTAR)',
    shortName: 'CHARUSAT',
    code: 'CHARUSAT',
    location: 'Changa / Anand, Gujarat',
    campuses: ['CHARUSAT Campus Changa', 'CSPIT Engineering Complex', 'DEPSTAR Tech Wing'],
    accreditation: 'NAAC A+ Grade · Gujarat State Autonomous Private University',
    establishedYear: 2009,
    affiliationType: 'Private State University',
    badge: 'NAAC A+ Autonomous',
    accentColor: '#10B981',
    portalUrl: 'https://charusat.ac.in',
    gradingScale: {
      maxGpa: 10.0,
      passGrade: 'C',
      grades: [
        { grade: 'A+', points: 10, marksRange: '90-100' },
        { grade: 'A', points: 9, marksRange: '80-89' },
        { grade: 'B+', points: 8, marksRange: '70-79' },
        { grade: 'B', points: 7, marksRange: '60-69' },
        { grade: 'C+', points: 6, marksRange: '50-59' },
        { grade: 'C', points: 5, marksRange: '40-49' },
        { grade: 'F', points: 0, marksRange: '<40' },
      ],
    },
    departments: [
      { id: 'ce', name: 'Computer Engineering (CSPIT)', shortCode: 'CE' },
      { id: 'it', name: 'Information Technology (CSPIT)', shortCode: 'IT' },
      { id: 'depstar-cse', name: 'Computer Science & Engineering (DEPSTAR)', shortCode: 'DEPSTAR' },
    ],
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    divisions: ['Div CE-A', 'Div CE-B', 'Div DEPSTAR'],
    subjects: [
      {
        id: 'charusat-ce241',
        code: 'CE241',
        name: 'Data Structures & Algorithms',
        shortName: 'DSA',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 60, theoryMin: 24, practicalMax: 40, practicalMin: 20, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-emerald-600 to-teal-700',
        description: 'CHARUSAT syllabus: Abstract data types, recursion, linear lists, binary trees, red-black trees, graph algorithms and dynamic programming.',
        units: [
          { unitNumber: 1, title: 'Introduction & Algorithm Analysis', hours: 7, weightagePercent: 15, keyTopics: ['ADT concept, Pseudo-code conventions', 'Worst, Best, Average Case complexity', 'Big-O notation, Space complexity'] },
          { unitNumber: 2, title: 'Linear Structures: Arrays, Stacks, Queues', hours: 10, weightagePercent: 22, keyTopics: ['Stack ADT, Infix-to-Postfix conversion', 'Queue ADT, Circular queue, Deque', 'Dynamic array implementations'] },
          { unitNumber: 3, title: 'Linked Lists & Applications', hours: 10, weightagePercent: 23, keyTopics: ['Singly, Doubly and Circular linked lists', 'Memory management, Garbage collection concept', 'Header linked list, Sparse matrix representation'] },
          { unitNumber: 4, title: 'Trees & Search Tree Variants', hours: 12, weightagePercent: 25, keyTopics: ['Binary tree properties and traversals', 'Binary Search Tree operations', 'AVL Tree balancing, Red-Black tree introduction', 'Binary Heap & Priority Queue'] },
          { unitNumber: 5, title: 'Graph Theory & Algorithmic Paradigms', hours: 9, weightagePercent: 15, keyTopics: ['Graph representations (Adjacency Matrix/List)', 'DFS, BFS, Topological Sort', 'Dijkstra and Kruskal algorithms'] },
        ],
      },
      {
        id: 'charusat-ce242',
        code: 'CE242',
        name: 'Database Management Systems',
        shortName: 'DBMS',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 60, theoryMin: 24, practicalMax: 40, practicalMin: 20, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-teal-600 to-cyan-700',
        description: 'Relational data model, relational algebra, SQL DDL/DML, functional dependencies and decomposition, transactions and recovery.',
        units: [
          { unitNumber: 1, title: 'Data Modeling & ER Diagrams', hours: 8, weightagePercent: 20, keyTopics: ['Three-level schema architecture', 'ER diagram constructs, Enhanced ER (EER)', 'Mapping ER to Relational schema'] },
          { unitNumber: 2, title: 'Relational Algebra & Calculus', hours: 8, weightagePercent: 20, keyTopics: ['Fundamental relational algebra operations', 'Join operations (Theta, Natural, Outer join)', 'Integrity constraints and domain checks'] },
          { unitNumber: 3, title: 'PostgreSQL & SQL Query Optimization', hours: 10, weightagePercent: 25, keyTopics: ['Complex aggregate queries, Subqueries', 'Indexes (B-Tree, Hash), Query execution plans', 'PL/pgSQL functions and triggers'] },
          { unitNumber: 4, title: 'Normalization & Functional Dependencies', hours: 10, weightagePercent: 20, keyTopics: ['Inference rules for FDs, Attribute closure', 'Lossless decomposition, Dependency preservation', '1NF, 2NF, 3NF, BCNF, 4NF'] },
          { unitNumber: 5, title: 'Transaction Processing & Security', hours: 9, weightagePercent: 15, keyTopics: ['ACID criteria, Schedule serializability', 'Two-phase locking, Timestamp ordering', 'Database security and Role-based access'] },
        ],
      },
      {
        id: 'charusat-ce243',
        code: 'CE243',
        name: 'Object-Oriented Programming with Java',
        shortName: 'Java',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 60, theoryMin: 24, practicalMax: 40, practicalMin: 20, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-amber-600 to-orange-700',
        description: 'Java language constructs, OOP principles, inheritance, abstract classes, interfaces, multithreading, generic collections & lambdas.',
        units: [
          { unitNumber: 1, title: 'Java Fundamentals & Object Thinking', hours: 7, weightagePercent: 15, keyTopics: ['Bytecode, JVM architecture, Class loading', 'Class structure, Objects, Constructors', 'Memory allocation in Heap and Stack'] },
          { unitNumber: 2, title: 'Inheritance, Packages & Access Specifiers', hours: 10, weightagePercent: 25, keyTopics: ['Single, Multilevel, Hierarchical inheritance', 'Method overriding vs overloading', 'super keyword, final modifier, abstract classes'] },
          { unitNumber: 3, title: 'Interfaces, Exceptions & Assertions', hours: 10, weightagePercent: 25, keyTopics: ['Multiple interface implementation', 'try-catch-finally, multi-catch, try-with-resources', 'Custom exceptions, chained exceptions'] },
          { unitNumber: 4, title: 'Multithreading & Concurrent Programming', hours: 9, weightagePercent: 20, keyTopics: ['Thread class vs Runnable interface', 'Thread states, thread join, sleep, yield', 'Synchronization, deadlocks, wait/notify'] },
          { unitNumber: 5, title: 'Java Collections & Modern Features', hours: 9, weightagePercent: 15, keyTopics: ['List, Set, Map interfaces and implementations', 'Generics and Type Erasure', 'Lambda expressions and Stream API'] },
        ],
      },
    ],
    dailyTimetable: [
      { id: 'ch-t-1', division: 'Div CE-A', timeSlot: '09:10 AM - 10:10 AM', subjectCode: 'CE241', subjectName: 'Data Structures & Algorithms', facultyName: 'Prof. R. B. Patel', location: 'CSPIT Room 102', roomType: 'Classroom' },
      { id: 'ch-t-2', division: 'Div CE-A', timeSlot: '10:10 AM - 11:10 AM', subjectCode: 'CE242', subjectName: 'Database Management Systems', facultyName: 'Prof. K. N. Shah', location: 'CSPIT Room 102', roomType: 'Classroom' },
      { id: 'ch-t-3', division: 'Div CE-A', timeSlot: '11:30 AM - 12:30 PM', subjectCode: 'CE243', subjectName: 'Object-Oriented Programming Java', facultyName: 'Prof. S. P. Dave', location: 'CSPIT Room 102', roomType: 'Classroom' },
      { id: 'ch-t-4', division: 'Div CE-A', timeSlot: '01:15 PM - 03:15 PM', subjectCode: 'CE241', subjectName: 'DSA Implementation Lab', facultyName: 'Prof. R. B. Patel', location: 'DEPSTAR Lab 4', roomType: 'Lab' },
    ],
    examSchedule: {
      examType: 'Mid-Sem',
      term: 'Semester 3 Sessional',
      startDate: '02-11-2026',
      endDate: '07-11-2026',
      timeSlot: '09:15 AM - 10:45 AM',
      items: [
        { date: '02-11-2026', dayOfWeek: 'Monday', time: '09:15 AM - 10:45 AM', courseCode: 'CE241', courseName: 'Data Structures & Algorithms', durationMins: 90 },
        { date: '03-11-2026', dayOfWeek: 'Tuesday', time: '09:15 AM - 10:45 AM', courseCode: 'CE242', courseName: 'Database Management Systems', durationMins: 90 },
        { date: '04-11-2026', dayOfWeek: 'Wednesday', time: '09:15 AM - 10:45 AM', courseCode: 'CE243', courseName: 'Object-Oriented Programming Java', durationMins: 90 },
      ],
    },
    clubs: [
      { id: 'charusat-club-dsc', name: 'CSPIT Developer Student Club', category: 'Tech', leadName: 'Siddharth Trivedi', memberCount: 380, description: 'Full-stack engineering, hackathons, and cloud native architectures.', badge: 'Developer Chapter' },
      { id: 'charusat-club-acm', name: 'CHARUSAT ACM Student Chapter', category: 'Academic', leadName: 'Tanvi Shah', memberCount: 290, description: 'Research papers, computer science colloquiums and algorithms discussions.', badge: 'ACM Chapter' },
      { id: 'charusat-club-infosec', name: 'Infosec Wing CHARUSAT', category: 'CyberSecurity', leadName: 'Jayraj Solanki', memberCount: 195, description: 'Web security, cryptography and reverse engineering.', badge: 'Cyber Hub' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 5. DHARMSINH DESAI UNIVERSITY (DDU, NADIAD)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'ddu',
    name: 'Dharmsinh Desai University',
    shortName: 'DDU Nadiad',
    code: 'DDU',
    location: 'Nadiad, Central Gujarat',
    campuses: ['Faculty of Technology Campus, College Road, Nadiad'],
    accreditation: 'Autonomous State Private University · NIRF Ranked · NAAC A Grade',
    establishedYear: 1968,
    affiliationType: 'Autonomous Institute',
    badge: 'Premier Technical Hub',
    accentColor: '#DC2626',
    portalUrl: 'https://ddu.ac.in',
    gradingScale: {
      maxGpa: 10.0,
      passGrade: 'D',
      grades: [
        { grade: 'A+', points: 10, marksRange: '90-100' },
        { grade: 'A', points: 9, marksRange: '80-89' },
        { grade: 'B', points: 8, marksRange: '70-79' },
        { grade: 'C', points: 7, marksRange: '60-69' },
        { grade: 'D', points: 6, marksRange: '50-59' },
        { grade: 'F', points: 0, marksRange: '<50' },
      ],
    },
    departments: [
      { id: 'ce', name: 'Computer Engineering (FoT)', shortCode: 'CE' },
      { id: 'it', name: 'Information Technology (FoT)', shortCode: 'IT' },
    ],
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    divisions: ['Division A', 'Division B'],
    subjects: [
      {
        id: 'ddu-ce301',
        code: 'CE301',
        name: 'Data Structures & Applications',
        shortName: 'DSA',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 60, theoryMin: 24, practicalMax: 40, practicalMin: 20, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-rose-600 to-red-800',
        description: 'DDU curriculum: Abstract data structures, asymptotic notation, balanced trees, graph connectivity and internal sorting.',
        units: [
          { unitNumber: 1, title: 'Foundations & Linear Lists', hours: 8, weightagePercent: 18, keyTopics: ['Algorithm efficiency, Big-Oh notation', 'Array memory mapping', 'Dynamic memory allocation in C/C++'] },
          { unitNumber: 2, title: 'Stack, Queue & Deque Operations', hours: 9, weightagePercent: 20, keyTopics: ['Expression evaluation, Postfix arithmetic', 'Circular queue, Priority queue implementation'] },
          { unitNumber: 3, title: 'Linked Lists & Dynamic Structures', hours: 10, weightagePercent: 22, keyTopics: ['Singly, Doubly, Circular lists', 'Sparse matrix representation', 'Memory management'] },
          { unitNumber: 4, title: 'Trees, AVL & Balanced Indexes', hours: 11, weightagePercent: 24, keyTopics: ['Binary tree traversals', 'BST search, insertion and deletion', 'AVL self-balancing rotations', 'Heaps'] },
          { unitNumber: 5, title: 'Graphs, Sorting & Hashing', hours: 9, weightagePercent: 16, keyTopics: ['DFS, BFS, Dijkstra shortest path', 'QuickSort, MergeSort, HeapSort', 'Hashing techniques'] },
        ],
      },
      {
        id: 'ddu-ce302',
        code: 'CE302',
        name: 'Relational Database Management Systems',
        shortName: 'RDBMS',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 60, theoryMin: 24, practicalMax: 40, practicalMin: 20, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-amber-600 to-orange-700',
        description: 'Relational algebra, SQL DDL/DML, functional dependencies, 1NF-BCNF, transactions and ACID recovery.',
        units: [
          { unitNumber: 1, title: 'Database Concepts & ER Modeling', hours: 8, weightagePercent: 20, keyTopics: ['Database architecture, Schemas', 'Entity-Relationship modeling', 'Mapping ER to Relational schema'] },
          { unitNumber: 2, title: 'Relational Algebra & SQL', hours: 10, weightagePercent: 25, keyTopics: ['Relational algebra queries', 'SQL DDL, DML, Joins, Aggregates', 'Views and Indexes'] },
          { unitNumber: 3, title: 'Schema Normalization', hours: 10, weightagePercent: 22, keyTopics: ['Functional dependencies', '1NF, 2NF, 3NF, BCNF decomposition', 'Lossless joins'] },
          { unitNumber: 4, title: 'Transactions & Concurrency', hours: 9, weightagePercent: 20, keyTopics: ['ACID criteria', 'Two-phase locking (2PL)', 'Deadlock detection'] },
          { unitNumber: 5, title: 'Recovery & Security', hours: 8, weightagePercent: 13, keyTopics: ['Log-based recovery', 'Security controls and User grants'] },
        ],
      },
    ],
    dailyTimetable: [
      { id: 'ddu-t-1', division: 'Division A', timeSlot: '09:00 AM - 10:00 AM', subjectCode: 'CE302', subjectName: 'Relational DBMS', facultyName: 'Prof. A. S. Pandya', location: 'Room DDU-FOT 12', roomType: 'Classroom' },
      { id: 'ddu-t-2', division: 'Division A', timeSlot: '10:00 AM - 11:00 AM', subjectCode: 'CE301', subjectName: 'Data Structures & Applications', facultyName: 'Prof. K. M. Solanki', location: 'Room DDU-FOT 12', roomType: 'Classroom' },
      { id: 'ddu-t-3', division: 'Division A', timeSlot: '11:15 AM - 01:15 PM', subjectCode: 'CE301', subjectName: 'DSA Practical Lab', facultyName: 'Prof. K. M. Solanki', location: 'Computing Lab 2', roomType: 'Lab' },
    ],
    examSchedule: {
      examType: 'Mid-Sem',
      term: 'Semester 3 Sessional Examination',
      startDate: '09-11-2026',
      endDate: '14-11-2026',
      timeSlot: '09:00 AM - 10:30 AM',
      items: [
        { date: '09-11-2026', dayOfWeek: 'Monday', time: '09:00 AM - 10:30 AM', courseCode: 'CE301', courseName: 'Data Structures & Applications', durationMins: 90 },
        { date: '10-11-2026', dayOfWeek: 'Tuesday', time: '09:00 AM - 10:30 AM', courseCode: 'CE302', courseName: 'Relational DBMS', durationMins: 90 },
      ],
    },
    clubs: [
      { id: 'ddu-club-ieee', name: 'DDU IEEE Computer Society', category: 'Tech', leadName: 'Manan Dave', memberCount: 340, description: 'Technical workshops, algorithm symposiums and IEEE conferences.', badge: 'IEEE Chapter' },
      { id: 'ddu-club-cp', name: 'DDU CodeChef Campus Chapter', category: 'Coding', leadName: 'Rushi Joshi', memberCount: 410, description: 'Algorithmic problem solving and ICPC regional preparation.', badge: 'Competitive' },
    ],
  },

  // ───────────────────────────────────────────────────────────────────────────
  // 6. THE MAHARAJA SAYAJIRAO UNIVERSITY OF BARODA (MSU BARODA)
  // ───────────────────────────────────────────────────────────────────────────
  {
    id: 'msu',
    name: 'The Maharaja Sayajirao University of Baroda (FTE)',
    shortName: 'MSU Baroda',
    code: 'MSU',
    location: 'Kalabhavan, Vadodara, Gujarat',
    campuses: ['Faculty of Technology & Engineering (Kalabhavan Campus, Vadodara)'],
    accreditation: 'Prestigious State University · Established 1949 · NAAC A+ Grade',
    establishedYear: 1949,
    affiliationType: 'State University',
    badge: 'Historic Kalabhavan',
    accentColor: '#D97706',
    portalUrl: 'https://msubaroda.ac.in',
    gradingScale: {
      maxGpa: 10.0,
      passGrade: 'P',
      grades: [
        { grade: 'O', points: 10, marksRange: '85-100' },
        { grade: 'A', points: 9, marksRange: '75-84' },
        { grade: 'B', points: 8, marksRange: '65-74' },
        { grade: 'C', points: 7, marksRange: '55-64' },
        { grade: 'D', points: 6, marksRange: '45-54' },
        { grade: 'E', points: 5, marksRange: '40-44' },
        { grade: 'F', points: 0, marksRange: '<40' },
      ],
    },
    departments: [
      { id: 'cse', name: 'Computer Science & Engineering', shortCode: 'CSE' },
      { id: 'mca', name: 'Computer Applications', shortCode: 'MCA' },
    ],
    semesters: [1, 2, 3, 4, 5, 6, 7, 8],
    divisions: ['Class 1', 'Class 2'],
    subjects: [
      {
        id: 'msu-cse2101',
        code: 'CSE2101',
        name: 'Data Structures',
        shortName: 'DS',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 70, theoryMin: 28, practicalMax: 30, practicalMin: 15, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-amber-600 to-yellow-700',
        description: 'MSU Faculty of Technology syllabus: Concrete and abstract data representations, stacks, queues, trees, hashing and graph algorithms.',
        units: [
          { unitNumber: 1, title: 'Data Abstraction & Array Mappings', hours: 7, weightagePercent: 15, keyTopics: ['ADT specification, asymptotic growth', 'Matrix representations in memory'] },
          { unitNumber: 2, title: 'Stack & Queue ADTs', hours: 9, weightagePercent: 20, keyTopics: ['Stack operations and prefix/postfix conversion', 'Queues and double ended queues'] },
          { unitNumber: 3, title: 'Linked Structures & Pointer Manipulation', hours: 10, weightagePercent: 25, keyTopics: ['Linear and circular linked lists', 'Doubly linked lists and polynomial manipulation'] },
          { unitNumber: 4, title: 'Trees, Traversals & Heaps', hours: 11, weightagePercent: 25, keyTopics: ['Binary tree traversals', 'BST properties and balance factors', 'Min/Max heap structures'] },
          { unitNumber: 5, title: 'Graphs & Sorting Techniques', hours: 9, weightagePercent: 15, keyTopics: ['Adjacency representations', 'BFS, DFS, Dijkstra', 'QuickSort and MergeSort'] },
        ],
      },
      {
        id: 'msu-cse2102',
        code: 'CSE2102',
        name: 'Database Systems',
        shortName: 'DBS',
        semester: 3,
        credits: 4,
        teachingScheme: { lectureHours: 3, tutorialHours: 0, practicalHours: 2 },
        examScheme: { theoryMax: 70, theoryMin: 28, practicalMax: 30, practicalMin: 15, midSemMax: 30, internalContinuousMax: 20 },
        category: 'Core',
        color: 'from-amber-700 to-red-800',
        description: 'Relational data model, formal relational query languages, normalization, transaction processing and concurrency control.',
        units: [
          { unitNumber: 1, title: 'Introduction & ER Modeling', hours: 8, weightagePercent: 20, keyTopics: ['DBMS architecture, Data independence', 'ER modeling and constraints'] },
          { unitNumber: 2, title: 'Relational Model & SQL', hours: 10, weightagePercent: 25, keyTopics: ['Relational algebra operations', 'Complex SQL queries, subqueries and views'] },
          { unitNumber: 3, title: 'Normalization Theory', hours: 10, weightagePercent: 25, keyTopics: ['Functional dependencies', '1NF, 2NF, 3NF, BCNF decomposition'] },
          { unitNumber: 4, title: 'Transactions & Concurrency', hours: 9, weightagePercent: 20, keyTopics: ['ACID properties, Serializability', 'Two-phase locking protocol, Deadlocks'] },
          { unitNumber: 5, title: 'Storage & Indexing', hours: 8, weightagePercent: 10, keyTopics: ['File organization, B+ tree indexing', 'Hash-based indexing'] },
        ],
      },
    ],
    dailyTimetable: [
      { id: 'msu-t-1', division: 'Class 1', timeSlot: '10:30 AM - 11:30 AM', subjectCode: 'CSE2101', subjectName: 'Data Structures', facultyName: 'Prof. B. J. Shah', location: 'Kalabhavan Room 44', roomType: 'Classroom' },
      { id: 'msu-t-2', division: 'Class 1', timeSlot: '11:30 AM - 12:30 PM', subjectCode: 'CSE2102', subjectName: 'Database Systems', facultyName: 'Prof. P. M. Dave', location: 'Kalabhavan Room 44', roomType: 'Classroom' },
      { id: 'msu-t-3', division: 'Class 1', timeSlot: '01:30 PM - 03:30 PM', subjectCode: 'CSE2101', subjectName: 'Data Structures Lab (C++)', facultyName: 'Prof. B. J. Shah', location: 'Computer Centre Lab', roomType: 'Lab' },
    ],
    examSchedule: {
      examType: 'Mid-Sem',
      term: 'Semester 3 Test',
      startDate: '11-11-2026',
      endDate: '16-11-2026',
      timeSlot: '10:30 AM - 12:00 PM',
      items: [
        { date: '11-11-2026', dayOfWeek: 'Wednesday', time: '10:30 AM - 12:00 PM', courseCode: 'CSE2101', courseName: 'Data Structures', durationMins: 90 },
        { date: '12-11-2026', dayOfWeek: 'Thursday', time: '10:30 AM - 12:00 PM', courseCode: 'CSE2102', courseName: 'Database Systems', durationMins: 90 },
      ],
    },
    clubs: [
      { id: 'msu-club-kalabhavan', name: 'Kalabhavan Coders Society', category: 'Tech', leadName: 'Chirag Barot', memberCount: 375, description: 'Historic Kalabhavan tech club focusing on open source and systems engineering.', badge: 'Heritage Club' },
      { id: 'msu-club-csi', name: 'CSI Student Chapter MSU Baroda', category: 'Academic', leadName: 'Riddhi Patel', memberCount: 280, description: 'Computer Society of India student branch for seminars and workshops.', badge: 'CSI Branch' },
    ],
  },
];

export interface BTechBranchInfo {
  id: string;
  name: string;
  shortCode: string;
  iconName: string;
  description: string;
  coreSubjectsBySem: Record<number, string[]>;
}

export const ALL_BTECH_BRANCHES: BTechBranchInfo[] = [
  {
    id: 'cse',
    name: 'Computer Science & Engineering',
    shortCode: 'CSE',
    iconName: 'Code',
    description: 'Algorithms, Data Structures, Operating Systems, Database Systems, Computer Networks & Software Engineering',
    coreSubjectsBySem: {
      1: ['Engineering Mathematics I', 'Programming in C / Python', 'Engineering Physics', 'Basic Electrical Engineering'],
      2: ['Engineering Mathematics II', 'Data Structures & Algorithms', 'Digital Logic & Computer Design', 'Web Technologies'],
      3: ['Data Structures & Algorithms', 'Database Management Systems', 'Object-Oriented Programming (Java)', 'Computer Architecture & Org', 'Numerical Methods with Python'],
      4: ['Operating Systems', 'Theory of Computation', 'Design & Analysis of Algorithms', 'Computer Networks', 'Discrete Mathematics'],
      5: ['Software Engineering', 'Compiler Design', 'Machine Learning & AI', 'Cloud Computing', 'Cybersecurity Fundamentals'],
      6: ['Distributed Systems', 'Deep Learning', 'DevOps & Microservices', 'Full Stack Web Development', 'Mobile App Development'],
      7: ['Big Data Analytics', 'Natural Language Processing', 'Internet of Things (IoT)', 'Blockchain Technology'],
      8: ['Major Capstone Project', 'Industrial Internship', 'High Performance Computing']
    }
  },
  {
    id: 'aids',
    name: 'Artificial Intelligence & Data Science',
    shortCode: 'AI & DS',
    iconName: 'Cpu',
    description: 'Machine Learning, Deep Neural Networks, Data Mining, Predictive Modeling, NLP & Big Data Analytics',
    coreSubjectsBySem: {
      1: ['Calculus & Linear Algebra', 'Python for Data Science', 'Physics for Computing', 'Basic Electronics'],
      2: ['Probability & Statistics for AI', 'Data Structures using Python', 'Digital Logic', 'Foundations of Data Science'],
      3: ['Statistical Foundations for ML', 'Advanced Data Structures', 'Database Systems & NoSQL', 'Object Oriented Programming', 'Linear Algebra & Optimization'],
      4: ['Supervised & Unsupervised ML', 'Data Warehousing & Mining', 'Operating Systems', 'Computer Networks for Data Pipelines', 'Design of Algorithms'],
      5: ['Deep Learning & Neural Networks', 'Natural Language Processing', 'Big Data Engineering (Spark/Hadoop)', 'AI Ethics & Governance', 'Computer Vision'],
      6: ['Generative AI & LLMs', 'Reinforcement Learning', 'MLOps & Pipeline Deployment', 'Time Series Forecasting', 'Information Retrieval'],
      7: ['Autonomous Systems & Robotics', 'Graph Neural Networks', 'AI Cloud Infrastructure', 'Explainable AI (XAI)'],
      8: ['Industry AI Capstone Project', 'AI Research Internship', 'Advanced AI Architectures']
    }
  },
  {
    id: 'it',
    name: 'Information Technology',
    shortCode: 'IT',
    iconName: 'Server',
    description: 'Cloud Infrastructure, Web & Mobile Platforms, Enterprise Databases, Cybersecurity & Network Systems',
    coreSubjectsBySem: {
      1: ['Engineering Mathematics I', 'Problem Solving with C', 'Applied Physics', 'Elements of Electrical Engineering'],
      2: ['Discrete Structures', 'Object-Oriented Programming with C++', 'Digital Electronics', 'HTML5/CSS3 Web Systems'],
      3: ['Data Structures with C++', 'Relational Database Management Systems', 'Java Programming', 'Computer Networks Architecture', 'Digital Communication'],
      4: ['Operating Systems & Linux Admin', 'Full-Stack Web Development', 'Design of Algorithms', 'Information Security Fundamentals', 'Cloud Fundamentals'],
      5: ['DevOps & CI/CD Pipelines', 'Enterprise Java (Spring Boot)', 'Mobile Application Development', 'Network Security & Cryptography', 'Data Analytics'],
      6: ['Cloud Computing (AWS/GCP)', 'Software Testing & QA', 'Cyber Threat Intelligence', 'Microservices Architecture', 'IoT Applications'],
      7: ['Enterprise Resource Planning (ERP)', 'Containerization & Kubernetes', 'IT Project Management', 'Ethical Hacking'],
      8: ['Enterprise IT Project', 'Corporate Internship', 'IT Service Management']
    }
  },
  {
    id: 'ece',
    name: 'Electronics & Communication Engineering',
    shortCode: 'ECE',
    iconName: 'Radio',
    description: 'Embedded Systems, VLSI Design, Signal Processing, Wireless & 5G Communications, Microcontrollers',
    coreSubjectsBySem: {
      1: ['Engineering Mathematics I', 'Semiconductor Physics', 'Basic Electrical & Electronics', 'Engineering Graphics'],
      2: ['Engineering Mathematics II', 'Electronic Devices & Circuits', 'Network Theory & Analysis', 'C Programming for Embedded'],
      3: ['Digital Electronics & HDL', 'Signals & Systems', 'Analog Circuits & Op-Amps', 'Electromagnetic Fields & Waves', 'C++ Programming'],
      4: ['Microprocessors & Microcontrollers (8051/ARM)', 'Analog & Digital Communication', 'Control Systems Engineering', 'Linear Integrated Circuits', 'Probability & Random Processes'],
      5: ['VLSI Design & CMOS Circuits', 'Digital Signal Processing (DSP)', 'Antennas & Microwave Propagation', 'Transmission Lines', 'Computer Architecture for Embedded'],
      6: ['Embedded Systems & RTOS', 'Wireless & Cellular Communication (5G)', 'Optical Fiber Communication', 'FPGA Prototyping', 'Internet of Things (IoT)'],
      7: ['Satellite Communication & Radar', 'MEMS & Sensor Technology', 'RF Circuit Design', 'Bio-Medical Electronics'],
      8: ['Core Electronics Capstone Project', 'Semiconductor Fab / Telecom Internship', 'Advanced Wireless Systems']
    }
  },
  {
    id: 'eee',
    name: 'Electrical & Electronics Engineering',
    shortCode: 'EEE',
    iconName: 'Zap',
    description: 'Power Systems, Renewable Energy, Electric Vehicles, Power Electronics, Smart Grid & High Voltage',
    coreSubjectsBySem: {
      1: ['Engineering Mathematics I', 'Engineering Chemistry', 'Basic Mechanical Engineering', 'Fundamental Electrical Laws'],
      2: ['Engineering Mathematics II', 'Electrical Circuit Analysis', 'Electromagnetic Field Theory', 'Engineering Workshop Practice'],
      3: ['DC Machines & Transformers', 'Analog & Digital Electronic Circuits', 'Electrical Measurements & Instrumentation', 'Network Analysis & Synthesis', 'C Programming'],
      4: ['AC Electrical Machines (Induction & Synchronous)', 'Power Electronics Devices & Converters', 'Control Systems Engineering', 'Signals & Linear Systems', 'Digital Electronics'],
      5: ['Power Generation, Transmission & Distribution', 'Microcontrollers & Embedded Applications', 'Renewable Energy Systems (Solar/Wind)', 'Electric Drives & Traction', 'Power System Analysis'],
      6: ['Switchgear & Substation Protection', 'Electric Vehicle Technology & Battery Management', 'Smart Grid Architecture', 'Industrial Automation & PLC/SCADA', 'Digital Signal Processing'],
      7: ['High Voltage Engineering', 'Power Quality & FACTS Controllers', 'Energy Auditing & Management', 'AI Applications in Power Systems'],
      8: ['Major Power & EV Project', 'Power Grid / Utility Internship', 'Advanced Electric Drive Systems']
    }
  },
  {
    id: 'me',
    name: 'Mechanical Engineering',
    shortCode: 'ME',
    iconName: 'Cog',
    description: 'Thermodynamics, CAD/CAM, Robotics, Fluid Mechanics, Automobile Engineering & Manufacturing Tech',
    coreSubjectsBySem: {
      1: ['Calculus & Differential Equations', 'Engineering Physics', 'Basic Civil & Mechanical', 'Computer Aided Engineering Graphics (CAD)'],
      2: ['Engineering Mechanics', 'Manufacturing Processes I', 'Materials Science & Metallurgy', 'Basics of Electrical Engineering'],
      3: ['Thermodynamics & Heat Cycles', 'Mechanics of Solids (Strength of Materials)', 'Kinematics of Machinery', 'Manufacturing Processes II', 'Applied Mathematics III'],
      4: ['Fluid Mechanics & Hydraulic Machines', 'Dynamics of Machinery', 'Thermal Engineering & IC Engines', 'Machine Design I', 'Metrology & Quality Control'],
      5: ['Heat & Mass Transfer', 'Design of Machine Elements II', 'Computer Integrated Manufacturing (CIM)', 'Control Engineering', 'Automobile Engineering'],
      6: ['Refrigeration & Air Conditioning (RAC)', 'Finite Element Analysis (FEA)', 'Robotics & Industrial Automation', 'Operations Research & Supply Chain', 'Mechatronics Systems'],
      7: ['Power Plant Engineering', 'Computational Fluid Dynamics (CFD)', 'Additive Manufacturing (3D Printing)', 'Total Quality Management (TQM)'],
      8: ['Industrial Product Design Capstone', 'Automotive / Manufacturing Internship', 'Renewable Energy Systems']
    }
  },
  {
    id: 'ce',
    name: 'Civil Engineering',
    shortCode: 'CE',
    iconName: 'Building',
    description: 'Structural Analysis, Geotechnical Engineering, Transportation, Environmental & Water Resources',
    coreSubjectsBySem: {
      1: ['Calculus & Linear Algebra', 'Engineering Chemistry', 'Engineering Mechanics & Statics', 'Surveying & Geomatics Basics'],
      2: ['Differential Equations', 'Building Materials & Construction Tech', 'Basics of Electrical & Electronics', 'Computer Aided Civil Drafting (AutoCAD)'],
      3: ['Mechanics of Solids', 'Advanced Surveying & Levelling', 'Fluid Mechanics in Open Channels', 'Engineering Geology', 'Building Planning & Drawing'],
      4: ['Structural Analysis I', 'Concrete Technology & Mix Design', 'Water Resources Engineering & Hydrology', 'Geotechnical Engineering I (Soil Mechanics)', 'Environmental Engineering I'],
      5: ['Design of Reinforced Concrete Structures (RCC)', 'Structural Analysis II', 'Geotechnical Engineering II (Foundations)', 'Highway & Transportation Engineering', 'Environmental Engineering II (Wastewater)'],
      6: ['Design of Steel Structures', 'Hydrology & Irrigation Engineering', 'Construction Management & Estimation', 'GIS & Remote Sensing Applications', 'Bridge Engineering'],
      7: ['Earthquake Resistant Structural Design', 'Pavement Design & Highway Maintenance', 'Urban Infrastructure Planning', 'Prestressed Concrete Structures'],
      8: ['Infrastructure Capstone Project', 'Structural Design / EPC Internship', 'Smart City Construction Systems']
    }
  }
];


// Helper functions for university lookups
export function getUniversityById(id?: string | null): UniversityData {
  if (!id) return GUJARAT_UNIVERSITIES[0];
  const found = GUJARAT_UNIVERSITIES.find((u) => u.id.toLowerCase() === id.toLowerCase());
  return found || GUJARAT_UNIVERSITIES[0];
}

export function getAllUniversities(): UniversityData[] {
  return GUJARAT_UNIVERSITIES;
}

export function getBranchById(branchId?: string | null): BTechBranchInfo {
  if (!branchId) return ALL_BTECH_BRANCHES[0];
  const found = ALL_BTECH_BRANCHES.find(b => b.id.toLowerCase() === branchId.toLowerCase() || b.shortCode.toLowerCase() === branchId.toLowerCase());
  return found || ALL_BTECH_BRANCHES[0];
}