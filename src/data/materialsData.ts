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
    "id": "13fea5e268",
    "title": "Practice Assignment 1: Timing & Control, Complete Instruction Cycle & Interrupt Cycle with State Flowchart",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Assignment",
    "fileType": "PDF",
    "fileSize": "133.9 KB",
    "description": "In-depth practice assignment covering Timing & Control, Complete Instruction Cycle & Interrupt Cycle with State Flowchart from Unit 2.",
    "topicsCovered": [
      "Computer Architecture",
      "Assignment"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Assignment_9636_Content_Document_20260818042336477PM.pdf"
  },
  {
    "id": "166b729bad",
    "title": "Assignment 8926",
    "subject": "Computer Oriented & Numerical Methods",
    "subjectCode": "CS405",
    "subjectId": "coanmp-105",
    "semester": 3,
    "category": "Assignment",
    "fileType": "PDF",
    "fileSize": "102.4 KB",
    "description": "Study material for Computer Oriented & Numerical Methods.",
    "topicsCovered": [
      "Computer Oriented & Numerical Methods",
      "Assignment"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Assignment_8926_Content_Document_20260715100533543AM.pdf"
  },
  {
    "id": "039578c581",
    "title": "Assignment 9171",
    "subject": "Computer Oriented & Numerical Methods",
    "subjectCode": "CS405",
    "subjectId": "coanmp-105",
    "semester": 3,
    "category": "Assignment",
    "fileType": "PDF",
    "fileSize": "135.5 KB",
    "description": "Study material for Computer Oriented & Numerical Methods.",
    "topicsCovered": [
      "Computer Oriented & Numerical Methods",
      "Assignment"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Assignment_9171_Content_Document_20260801020106817AM.pdf"
  },
  {
    "id": "d0e9df200e",
    "title": "Assignment 9651",
    "subject": "Computer Oriented & Numerical Methods",
    "subjectCode": "CS405",
    "subjectId": "coanmp-105",
    "semester": 3,
    "category": "Assignment",
    "fileType": "PDF",
    "fileSize": "122.7 KB",
    "description": "Study material for Computer Oriented & Numerical Methods.",
    "topicsCovered": [
      "Computer Oriented & Numerical Methods",
      "Assignment"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Assignment_9651_Content_Document_20260819012630540PM.pdf"
  },
  {
    "id": "606c362aba",
    "title": "Assignment 9440",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Assignment",
    "fileType": "DOCX",
    "fileSize": "29.2 KB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Assignment"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Assignment_9440_Content_Document_20260810040114863PM.docx"
  },
  {
    "id": "7259002c0c",
    "title": "DSA CET II Syllabus",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Syllabus",
    "fileType": "PDF",
    "fileSize": "61.1 KB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Syllabus"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/DSA_CET_II_Syllabus.pdf"
  },
  {
    "id": "481ed6cad3",
    "title": "LabManual 9534",
    "subject": "Object-Oriented Programming with Java",
    "subjectCode": "CS404",
    "subjectId": "java-104",
    "semester": 3,
    "category": "Lab Manual",
    "fileType": "PDF",
    "fileSize": "621.0 KB",
    "description": "Study material for Object-Oriented Programming with Java.",
    "topicsCovered": [
      "Object-Oriented Programming with Java",
      "Lab Manual"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/LabManual_9534_Content_Document_20260814113320300AM.pdf"
  },
  {
    "id": "ddc5c72fc8",
    "title": "BTECH CSA DIPLOMA SEMSETER  3 & 5 CET2 MST TIME TABLE 2026",
    "subject": "All Subjects",
    "subjectCode": "GEN",
    "subjectId": "gen",
    "semester": 3,
    "category": "Timetable",
    "fileType": "PDF",
    "fileSize": "135.8 KB",
    "description": "Study material for All Subjects.",
    "topicsCovered": [
      "All Subjects",
      "Timetable"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/BTECH_CSA_DIPLOMA_SEMSETER__3___5_CET2_MST_TIME_TABLE_2026.pdf"
  },
  {
    "id": "03ecb58421",
    "title": "CET-2 Syllabus",
    "subject": "All Subjects",
    "subjectCode": "GEN",
    "subjectId": "gen",
    "semester": 3,
    "category": "Syllabus",
    "fileType": "PDF",
    "fileSize": "54.2 KB",
    "description": "Study material for All Subjects.",
    "topicsCovered": [
      "All Subjects",
      "Syllabus"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/CET-2_Syllabus.pdf"
  },
  {
    "id": "3761f35ae9",
    "title": "Exam Schedule Snapshot",
    "subject": "All Subjects",
    "subjectCode": "GEN",
    "subjectId": "gen",
    "semester": 3,
    "category": "Timetable",
    "fileType": "JPEG",
    "fileSize": "107.6 KB",
    "description": "Screenshot of the official exam timetable shared by faculty.",
    "topicsCovered": [
      "All Subjects",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/WhatsApp_Image_2026-09-23_at_3.17.38_PM.jpeg"
  },
  {
    "id": "1901a04fae",
    "title": "Computer Architecture MST Question Bank",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Question Paper",
    "fileType": "PDF",
    "fileSize": "188 KB",
    "description": "Official Mid-Semester Test (MST) question bank for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Question Paper"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Computer_Architecture_MST_Question_Bank.pdf"
  },
  {
    "id": "323f63c7a7",
    "title": "DBMS Question Bank (AY 2025)",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Question Paper",
    "fileType": "PDF",
    "fileSize": "368 KB",
    "description": "Comprehensive question bank for DBMS covering important exam topics.",
    "topicsCovered": [
      "Database Management Systems",
      "Question Paper"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/DBMS_QUESTION_BANK_AY_2025.pdf"
  },
  {
    "id": "d5309b6601",
    "title": "MST Question Paper Format & Pattern",
    "subject": "All Subjects",
    "subjectCode": "GEN",
    "subjectId": "gen",
    "semester": 3,
    "category": "Other",
    "fileType": "PDF",
    "fileSize": "71 KB",
    "description": "Official formatting and paper pattern guide for the upcoming MST exams.",
    "topicsCovered": [
      "All Subjects",
      "Exam Pattern"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/MST_QuestionPaper_Format.pdf"
  }
];
