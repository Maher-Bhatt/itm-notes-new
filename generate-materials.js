
const fs = require("fs");

const materials = `export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  subjectId: string;
  semester: number;
  category: "Syllabus" | "Notes" | "Presentation" | "Question Paper" | "Lab Manual" | "Assignment" | "Timetable" | "Other";
  fileType: "PDF" | "PPTX" | "DOCX" | "JPEG" | "PNG";
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
    id: "ca-assignment-questions",
    title: "Computer Architecture Assignment Questions",
    subject: "Computer Architecture",
    subjectCode: "CS401",
    subjectId: "ca-101",
    semester: 3,
    category: "Assignment",
    fileType: "PDF",
    fileSize: "134 KB",
    description: "Important assignment questions covering all major topics in Computer Architecture for exam preparation.",
    topicsCovered: ["Computer Architecture", "Assignments"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/CA_Assignment_Questions.pdf"
  },
  {
    id: "ca-unit2-presentation",
    title: "Computer Architecture Unit 2 Presentation",
    subject: "Computer Architecture",
    subjectCode: "CS401",
    subjectId: "ca-101",
    semester: 3,
    category: "Presentation",
    fileType: "PPTX",
    fileSize: "1.9 MB",
    description: "Detailed presentation slides for Unit 2 of Computer Architecture.",
    topicsCovered: ["Unit 2", "Architecture"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/CA_Unit2_Presentation.pptx"
  },
  {
    id: "coanmp-assignments",
    title: "COANMP Assignments",
    subject: "Computer Oriented & Numerical Methods",
    subjectCode: "CS405",
    subjectId: "coanmp-105",
    semester: 3,
    category: "Assignment",
    fileType: "PDF",
    fileSize: "102 KB",
    description: "Numerical Methods assignment questions for practice.",
    topicsCovered: ["Numerical Methods", "Assignments"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/COANMP_Assignments.pdf"
  },
  {
    id: "coanmp-formulas-notes",
    title: "COANMP Formulas and Notes",
    subject: "Computer Oriented & Numerical Methods",
    subjectCode: "CS405",
    subjectId: "coanmp-105",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "332 KB",
    description: "Comprehensive list of formulas and essential notes for COANMP.",
    topicsCovered: ["Formulas", "Numerical Analysis"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/COANMP_Formulas_and_Notes.pdf"
  },
  {
    id: "coanmp-roots-interpolation",
    title: "Roots and Interpolation Notes (COANMP)",
    subject: "Computer Oriented & Numerical Methods",
    subjectCode: "CS405",
    subjectId: "coanmp-105",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "2.5 MB",
    description: "Detailed study material covering finding roots of equations and interpolation techniques.",
    topicsCovered: ["Roots", "Interpolation"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/COANMP_Roots_and_Interpolation.pdf"
  },
  {
    id: "ca-mst-notes",
    title: "Computer Architecture MST Notes",
    subject: "Computer Architecture",
    subjectCode: "CS401",
    subjectId: "ca-101",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "381 KB",
    description: "Mid-Semester Test (MST) preparation notes for Computer Architecture.",
    topicsCovered: ["MST Prep", "Revision"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Computer_Architecture_MST_Notes.pdf",
    badge: "Most Popular",
    badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
  },
  {
    id: "dbms-complete-lecture-notes",
    title: "DBMS Complete Lecture Notes",
    subject: "Database Management Systems",
    subjectCode: "CS402",
    subjectId: "dbms-102",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "1.1 MB",
    description: "Full semester lecture notes for Database Management Systems.",
    topicsCovered: ["Databases", "Complete Syllabus"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DBMS_Complete_Lecture_Notes.pdf"
  },
  {
    id: "dbms-normalization-transactions",
    title: "DBMS Normalization and Transactions",
    subject: "Database Management Systems",
    subjectCode: "CS402",
    subjectId: "dbms-102",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "1.3 MB",
    description: "In-depth notes on Database Normalization (1NF to BCNF) and Transaction Management.",
    topicsCovered: ["Normalization", "Transactions", "ACID Properties"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DBMS_Normalization_and_Transactions.pdf"
  },
  {
    id: "dbms-relational-model-sql",
    title: "DBMS Relational Model and SQL",
    subject: "Database Management Systems",
    subjectCode: "CS402",
    subjectId: "dbms-102",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "1.1 MB",
    description: "Notes covering the Relational Data Model, Relational Algebra, and advanced SQL queries.",
    topicsCovered: ["Relational Model", "SQL"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DBMS_Relational_Model_and_SQL.pdf"
  },
  {
    id: "dsa-lab-assignment",
    title: "DSA Lab Assignment Questions",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS403",
    subjectId: "dsa-103",
    semester: 3,
    category: "Assignment",
    fileType: "DOCX",
    fileSize: "29 KB",
    description: "Laboratory assignment questions for Data Structures practicals.",
    topicsCovered: ["Lab Tasks", "Coding"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DSA_Lab_Assignment_Questions.docx"
  },
  {
    id: "dsa-sorting-searching",
    title: "DSA Sorting and Searching Notes",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS403",
    subjectId: "dsa-103",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "1.7 MB",
    description: "Comprehensive guide to sorting algorithms (Merge, Quick, Bubble) and searching techniques.",
    topicsCovered: ["Sorting", "Searching", "Time Complexity"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DSA_Sorting_and_Searching.pdf"
  },
  {
    id: "dsa-stacks-queues",
    title: "DSA Stacks and Queues Notes",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS403",
    subjectId: "dsa-103",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "755 KB",
    description: "Detailed notes on linear data structures: Stacks, Queues, and their applications.",
    topicsCovered: ["Stacks", "Queues", "Linear Data Structures"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DSA_Stacks_and_Queues_Notes.pdf"
  },
  {
    id: "dsa-trees-graphs",
    title: "DSA Trees and Graphs Notes",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS403",
    subjectId: "dsa-103",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "542 KB",
    description: "Advanced notes covering non-linear data structures: Trees, BST, AVL, and Graph traversals (BFS/DFS).",
    topicsCovered: ["Trees", "Graphs", "Non-linear Data Structures"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DSA_Trees_and_Graphs_Notes.pdf"
  },
  {
    id: "java-official-lab-manual",
    title: "Java Official Lab Manual",
    subject: "Object-Oriented Programming with Java",
    subjectCode: "CS404",
    subjectId: "java-104",
    semester: 3,
    category: "Lab Manual",
    fileType: "PDF",
    fileSize: "621 KB",
    description: "Official university lab manual containing all practical programs for OOP with Java.",
    topicsCovered: ["Java Programs", "Lab Manual", "Practical Exams"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Java_Official_Lab_Manual.pdf",
    badge: "Official",
    badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
  },
  {
    id: "time-table-cet2-mst-2026",
    title: "CET-2 & MST Time Table 2026 (Sem 3 & 5)",
    subject: "All Subjects",
    subjectCode: "GEN",
    subjectId: "gen",
    semester: 3,
    category: "Timetable",
    fileType: "PDF",
    fileSize: "135 KB",
    description: "Official B.Tech CSA Diploma Semester 3 & 5 CET-2 and MST Timetable for 2026 exams.",
    topicsCovered: ["Timetable", "Exams", "Schedule"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Time_Table_CET2_MST_2026.pdf",
    badge: "New",
    badgeColor: "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
  },
  {
    id: "cet2-syllabus",
    title: "CET-2 General Syllabus",
    subject: "All Subjects",
    subjectCode: "GEN",
    subjectId: "gen",
    semester: 3,
    category: "Syllabus",
    fileType: "PDF",
    fileSize: "54 KB",
    description: "Syllabus copy for upcoming CET-2 examinations.",
    topicsCovered: ["Syllabus", "Exams"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/CET2_Syllabus.pdf"
  },
  {
    id: "dsa-cet2-syllabus",
    title: "DSA CET-2 Syllabus",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS403",
    subjectId: "dsa-103",
    semester: 3,
    category: "Syllabus",
    fileType: "PDF",
    fileSize: "61 KB",
    description: "Specific syllabus breakdown for DSA CET-2 exam.",
    topicsCovered: ["Syllabus", "Exams", "DSA"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/DSA_CET2_Syllabus.pdf"
  },
  {
    id: "enotes-12527",
    title: "Faculty Shared E-Notes",
    subject: "All Subjects",
    subjectCode: "GEN",
    subjectId: "gen",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "279 KB",
    description: "Recently shared E-Notes document from faculty.",
    topicsCovered: ["Important Notes"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/ENotes_12527.pdf"
  },
  {
    id: "queue-notes-dsa",
    title: "Data Structures - Queue Notes",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS403",
    subjectId: "dsa-103",
    semester: 3,
    category: "Notes",
    fileType: "PDF",
    fileSize: "8.9 MB",
    description: "In-depth faculty notes on Queue data structures, operations, and types (Circular, Priority).",
    topicsCovered: ["Queues", "Data Structures"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Queue_Notes.pdf"
  },
  {
    id: "dsa-unit-1-pptx",
    title: "DSA Unit 1 Presentation",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS403",
    subjectId: "dsa-103",
    semester: 3,
    category: "Presentation",
    fileType: "PPTX",
    fileSize: "4.7 MB",
    description: "Faculty presentation slides for Unit 1.",
    topicsCovered: ["Unit 1", "Introduction"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Unit_1.pptx"
  },
  {
    id: "dsa-unit-2-pptx",
    title: "DSA Unit 2 Presentation",
    subject: "Data Structures and Algorithms",
    subjectCode: "CS403",
    subjectId: "dsa-103",
    semester: 3,
    category: "Presentation",
    fileType: "PPTX",
    fileSize: "2.1 MB",
    description: "Faculty presentation slides for Unit 2.",
    topicsCovered: ["Unit 2"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Unit_2.pptx"
  },
  {
    id: "exam-schedule-image",
    title: "WhatsApp Exam Schedule Snapshot",
    subject: "All Subjects",
    subjectCode: "GEN",
    subjectId: "gen",
    semester: 3,
    category: "Timetable",
    fileType: "JPEG",
    fileSize: "107 KB",
    description: "Image snapshot of the exam schedule shared via WhatsApp.",
    topicsCovered: ["Schedule", "Exams"],
    uploadedDate: "Sept 2026",
    downloadUrl: "/materials/Exam_Schedule_Image.jpeg"
  }
];
`;
fs.writeFileSync("e:/PROJECT/itm-notes-new-main/src/data/materialsData.ts", materials);

