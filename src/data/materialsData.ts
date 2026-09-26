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
    "title": "Assignment 9636",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Assignment",
    "fileType": "PDF",
    "fileSize": "133.9 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Assignment"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Assignment_9636_Content_Document_20260818042336477PM.pdf"
  },
  {
    "id": "1537449f37",
    "title": "E-Notes 10176",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "10.1 MB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_10176_Content_Document_20260826032250423PM.pdf"
  },
  {
    "id": "e830e94f2c",
    "title": "E-Notes 10177",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "10.5 MB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_10177_Content_Document_20260826032332650PM.pdf"
  },
  {
    "id": "84bead0d44",
    "title": "E-Notes 10178",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "21.3 MB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_10178_Content_Document_20260826032540310PM.pdf"
  },
  {
    "id": "0ba75426cd",
    "title": "Lecture 10282",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10282_Content_Document_20260827113856203AM.pdf"
  },
  {
    "id": "0384c09b2e",
    "title": "Lecture 10283",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10283_Content_Document_20260827114000333AM.pdf"
  },
  {
    "id": "a27fd640ae",
    "title": "Lecture 10284",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10284_Content_Document_20260827114026870AM.pdf"
  },
  {
    "id": "e92a2d9546",
    "title": "Lecture 10286",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10286_Content_Document_20260827114124710AM.pdf"
  },
  {
    "id": "2f8e640c5a",
    "title": "Lecture 10287",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10287_Content_Document_20260827114314727AM.pdf"
  },
  {
    "id": "d4843d99a3",
    "title": "Lecture 10288",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10288_Content_Document_20260827114451767AM.pdf"
  },
  {
    "id": "78ea87bf5f",
    "title": "Lecture 10290",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10290_Content_Document_20260827114518387AM.pdf"
  },
  {
    "id": "0d0c985fcd",
    "title": "Lecture 10291",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10291_Content_Document_20260827114634717AM.pdf"
  },
  {
    "id": "7c16165e11",
    "title": "Lecture 10292",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10292_Content_Document_20260827114658240AM.pdf"
  },
  {
    "id": "0f1dc82497",
    "title": "Lecture 10317",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10317_Content_Document_20260827115451233AM.pdf"
  },
  {
    "id": "3eb0392531",
    "title": "Lecture 10321",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10321_Content_Document_20260827115517940AM.pdf"
  },
  {
    "id": "1384108bf1",
    "title": "Lecture 10325",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10325_Content_Document_20260827115557770AM.pdf"
  },
  {
    "id": "bff021ffff",
    "title": "Lecture 10382",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10382_Content_Document_20260827120751833PM.pdf"
  },
  {
    "id": "10962be235",
    "title": "Lecture 10385",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10385_Content_Document_20260827120841143PM.pdf"
  },
  {
    "id": "44989fbed0",
    "title": "Lecture 10390",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10390_Content_Document_20260827120945423PM.pdf"
  },
  {
    "id": "ad4d21e6d6",
    "title": "Lecture 10399",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10399_Content_Document_20260827121053837PM.pdf"
  },
  {
    "id": "3e6d690cc5",
    "title": "Lecture 10403",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10403_Content_Document_20260827121134047PM.pdf"
  },
  {
    "id": "a8648f6467",
    "title": "Lecture 10534",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10534_Content_Document_20260827125200117PM__1_.pdf"
  },
  {
    "id": "ba4012cfc1",
    "title": "Lecture 10534",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10534_Content_Document_20260827125200117PM.pdf"
  },
  {
    "id": "3e9ac4e456",
    "title": "Lecture 10537",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10537_Content_Document_20260827125242013PM.pdf"
  },
  {
    "id": "649c43d384",
    "title": "Lecture 10555",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10555_Content_Document_20260827125505323PM.pdf"
  },
  {
    "id": "fa94a8967e",
    "title": "Lecture 10560",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10560_Content_Document_20260827125601423PM.pdf"
  },
  {
    "id": "5be62529ef",
    "title": "Lecture 10569",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10569_Content_Document_20260827125659173PM.pdf"
  },
  {
    "id": "c5e5c6f3e1",
    "title": "Lecture 10577",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10577_Content_Document_20260827125803580PM.pdf"
  },
  {
    "id": "69df2079e9",
    "title": "Lecture 10584",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10584_Content_Document_20260827125856187PM.pdf"
  },
  {
    "id": "6bc852f8b0",
    "title": "Lecture 10596",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10596_Content_Document_20260827010137910PM.pdf"
  },
  {
    "id": "1773452394",
    "title": "Lecture 10676",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10676_Content_Document_20260827010913977PM.pdf"
  },
  {
    "id": "3d59456adb",
    "title": "Lecture 10689",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10689_Content_Document_20260827011009187PM.pdf"
  },
  {
    "id": "504d7659dc",
    "title": "Lecture 10698",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10698_Content_Document_20260827011058653PM.pdf"
  },
  {
    "id": "62ea18d1c8",
    "title": "Lecture 10719",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10719_Content_Document_20260827011219753PM.pdf"
  },
  {
    "id": "0026b244c7",
    "title": "Lecture 10744",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10744_Content_Document_20260827011500763PM.pdf"
  },
  {
    "id": "87343261f8",
    "title": "Lecture 10752",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10752_Content_Document_20260827011548843PM.pdf"
  },
  {
    "id": "ef8d8aaabe",
    "title": "Lecture 10758",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10758_Content_Document_20260827011633597PM.pdf"
  },
  {
    "id": "1645ab071c",
    "title": "Lecture 10767",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10767_Content_Document_20260827011806990PM.pdf"
  },
  {
    "id": "a83818593b",
    "title": "Lecture 10985",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10985_Content_Document_20260827020012500PM.pdf"
  },
  {
    "id": "cdacf28baa",
    "title": "Lecture 11011",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11011_Content_Document_20260827020351867PM.pdf"
  },
  {
    "id": "9781245743",
    "title": "Lecture 11020",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11020_Content_Document_20260827020505613PM.pdf"
  },
  {
    "id": "e0cd742eff",
    "title": "Lecture 11049",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11049_Content_Document_20260827020733240PM.pdf"
  },
  {
    "id": "acca7751e9",
    "title": "Lecture 11063",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11063_Content_Document_20260827020940923PM.pdf"
  },
  {
    "id": "00a573172d",
    "title": "Lecture 11084",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.6 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11084_Content_Document_20260827021159263PM.pdf"
  },
  {
    "id": "fbc731691d",
    "title": "Lecture 11096",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11096_Content_Document_20260827021324653PM.pdf"
  },
  {
    "id": "9942d5019d",
    "title": "Lecture 11108",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11108_Content_Document_20260827021520803PM.pdf"
  },
  {
    "id": "df41a1dfd8",
    "title": "Lecture 11121",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11121_Content_Document_20260827021638340PM.pdf"
  },
  {
    "id": "383d9081e5",
    "title": "Lecture 11164",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11164_Content_Document_20260827022052823PM.pdf"
  },
  {
    "id": "37111752d1",
    "title": "Lecture 11172",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.7 KB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11172_Content_Document_20260827022147593PM.pdf"
  },
  {
    "id": "ecdf0b6819",
    "title": "Presentation 10168",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Presentation",
    "fileType": "PPTX",
    "fileSize": "3.8 MB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Presentation"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Presentation_10168_Content_Document_20260826024647690PM.pptx"
  },
  {
    "id": "5d704a69a9",
    "title": "Presentation 9628",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Presentation",
    "fileType": "PPTX",
    "fileSize": "1.9 MB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Presentation"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Presentation_9628_Content_Document_20260818040959457PM.pptx"
  },
  {
    "id": "0512301927",
    "title": "Presentation 9629",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Presentation",
    "fileType": "PPTX",
    "fileSize": "1.9 MB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Presentation"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Presentation_9629_Content_Document_20260818041056243PM.pptx"
  },
  {
    "id": "bb74037856",
    "title": "Presentation 9630",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Presentation",
    "fileType": "PPTX",
    "fileSize": "2.7 MB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Presentation"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Presentation_9630_Content_Document_20260818041316487PM.pptx"
  },
  {
    "id": "35da71036b",
    "title": "Presentation 9631",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Presentation",
    "fileType": "PPTX",
    "fileSize": "1.9 MB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Presentation"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Presentation_9631_Content_Document_20260818041420960PM.pptx"
  },
  {
    "id": "f1b617c5ad",
    "title": "Presentation 9632",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Presentation",
    "fileType": "PPTX",
    "fileSize": "3.1 MB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Presentation"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Presentation_9632_Content_Document_20260818041555690PM.pptx"
  },
  {
    "id": "4fcf0cc6f0",
    "title": "Presentation 9633",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Presentation",
    "fileType": "PPTX",
    "fileSize": "3.0 MB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Presentation"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Presentation_9633_Content_Document_20260818041719327PM.pptx"
  },
  {
    "id": "72ec4cba94",
    "title": "Presentation 9634",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Presentation",
    "fileType": "PPTX",
    "fileSize": "2.6 MB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Presentation"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Presentation_9634_Content_Document_20260818041827213PM.pptx"
  },
  {
    "id": "64645b84e0",
    "title": "Presentation 9635",
    "subject": "Computer Architecture",
    "subjectCode": "CS401",
    "subjectId": "ca-101",
    "semester": 3,
    "category": "Presentation",
    "fileType": "PPTX",
    "fileSize": "2.9 MB",
    "description": "Study material for Computer Architecture.",
    "topicsCovered": [
      "Computer Architecture",
      "Presentation"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Presentation_9635_Content_Document_20260818041919323PM.pptx"
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
    "id": "acc2598dfa",
    "title": "E-Notes 8861",
    "subject": "Computer Oriented & Numerical Methods",
    "subjectCode": "CS405",
    "subjectId": "coanmp-105",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "120.0 KB",
    "description": "Study material for Computer Oriented & Numerical Methods.",
    "topicsCovered": [
      "Computer Oriented & Numerical Methods",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_8861_Content_Document_20260710034134003PM.pdf"
  },
  {
    "id": "565792f3fd",
    "title": "E-Notes 8862",
    "subject": "Computer Oriented & Numerical Methods",
    "subjectCode": "CS405",
    "subjectId": "coanmp-105",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "16.4 MB",
    "description": "Study material for Computer Oriented & Numerical Methods.",
    "topicsCovered": [
      "Computer Oriented & Numerical Methods",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_8862_Content_Document_20260710034607963PM.pdf"
  },
  {
    "id": "9bff78295b",
    "title": "E-Notes 8863",
    "subject": "Computer Oriented & Numerical Methods",
    "subjectCode": "CS405",
    "subjectId": "coanmp-105",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "2.5 MB",
    "description": "Study material for Computer Oriented & Numerical Methods.",
    "topicsCovered": [
      "Computer Oriented & Numerical Methods",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_8863_Content_Document_20260710034756850PM.pdf"
  },
  {
    "id": "59bdbf709e",
    "title": "E-Notes 9221",
    "subject": "Computer Oriented & Numerical Methods",
    "subjectCode": "CS405",
    "subjectId": "coanmp-105",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "332.2 KB",
    "description": "Study material for Computer Oriented & Numerical Methods.",
    "topicsCovered": [
      "Computer Oriented & Numerical Methods",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_9221_Content_Document_20260801103313350PM.pdf"
  },
  {
    "id": "c03f94e998",
    "title": "E-Notes 9817",
    "subject": "Computer Oriented & Numerical Methods",
    "subjectCode": "CS405",
    "subjectId": "coanmp-105",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "60.4 KB",
    "description": "Study material for Computer Oriented & Numerical Methods.",
    "topicsCovered": [
      "Computer Oriented & Numerical Methods",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_9817_Content_Document_20260822010329183PM.pdf"
  },
  {
    "id": "3886378d27",
    "title": "E-Notes 11355",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "1.7 MB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_11355_Content_Document_20260827032903943PM.pdf"
  },
  {
    "id": "5c88a4528f",
    "title": "E-Notes 9261",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "1.2 MB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_9261_Content_Document_20260803011237557PM.PDF"
  },
  {
    "id": "05828460ab",
    "title": "E-Notes 9455",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "1.2 MB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_9455_Content_Document_20260811100713773AM.PDF"
  },
  {
    "id": "54671bed3f",
    "title": "E-Notes 9647",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "1.4 MB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_9647_Content_Document_20260819103036857AM.PDF"
  },
  {
    "id": "325aed7687",
    "title": "Lecture 10831",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.2 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10831_Content_Document_20260827012427943PM.pdf"
  },
  {
    "id": "64e6dc0231",
    "title": "Lecture 10837",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.4 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10837_Content_Document_20260827012510427PM.pdf"
  },
  {
    "id": "11f0490b81",
    "title": "Lecture 10841",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.3 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10841_Content_Document_20260827012537023PM.pdf"
  },
  {
    "id": "a00e37b926",
    "title": "Lecture 10846",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.3 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10846_Content_Document_20260827012601157PM.pdf"
  },
  {
    "id": "13c0a9ec3e",
    "title": "Lecture 10849",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.3 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10849_Content_Document_20260827012630560PM.pdf"
  },
  {
    "id": "c0dc73ab3e",
    "title": "Lecture 10887",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.0 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10887_Content_Document_20260827013555073PM.pdf"
  },
  {
    "id": "528e848c80",
    "title": "Lecture 10888",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.0 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10888_Content_Document_20260827013616390PM.pdf"
  },
  {
    "id": "14128f64be",
    "title": "Lecture 10889",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.1 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10889_Content_Document_20260827013635617PM.pdf"
  },
  {
    "id": "8eea5cc24b",
    "title": "Lecture 10890",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.2 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10890_Content_Document_20260827013653907PM.pdf"
  },
  {
    "id": "9813e0f7de",
    "title": "Lecture 10891",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.1 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10891_Content_Document_20260827013713900PM.pdf"
  },
  {
    "id": "ac744194ec",
    "title": "Lecture 10892",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.2 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_10892_Content_Document_20260827013734873PM.pdf"
  },
  {
    "id": "364f387aca",
    "title": "Lecture 11224",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.6 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11224_Content_Document_20260827023111630PM.pdf"
  },
  {
    "id": "8baf92e3ec",
    "title": "Lecture 11266",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.2 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11266_Content_Document_20260827023714007PM.pdf"
  },
  {
    "id": "7ae7d75ae4",
    "title": "Lecture 11268",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.4 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11268_Content_Document_20260827023807610PM.pdf"
  },
  {
    "id": "9bd13f0738",
    "title": "Lecture 11270",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.5 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11270_Content_Document_20260827023829893PM.pdf"
  },
  {
    "id": "d95e219efb",
    "title": "Lecture 11282",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.1 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11282_Content_Document_20260827024325163PM.pdf"
  },
  {
    "id": "8c13087ecf",
    "title": "Lecture 11283",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "22.9 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11283_Content_Document_20260827024348393PM.pdf"
  },
  {
    "id": "017fc64dea",
    "title": "Lecture 11284",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.4 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11284_Content_Document_20260827024406370PM.pdf"
  },
  {
    "id": "b15b07a47c",
    "title": "Lecture 11287",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.3 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11287_Content_Document_20260827024452423PM.pdf"
  },
  {
    "id": "6b9ff8f19b",
    "title": "Lecture 11331",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.2 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11331_Content_Document_20260827031217567PM.pdf"
  },
  {
    "id": "873353279a",
    "title": "Lecture 11333",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.1 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11333_Content_Document_20260827031253423PM.pdf"
  },
  {
    "id": "13d44aff11",
    "title": "Lecture 11334",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.6 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11334_Content_Document_20260827031329083PM.pdf"
  },
  {
    "id": "afa6221af2",
    "title": "Lecture 11335",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.2 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11335_Content_Document_20260827031402273PM.pdf"
  },
  {
    "id": "6b56ee4c6b",
    "title": "Lecture 11336",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.2 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11336_Content_Document_20260827031429163PM.pdf"
  },
  {
    "id": "cd800c4214",
    "title": "Lecture 11338",
    "subject": "Database Management Systems",
    "subjectCode": "CS402",
    "subjectId": "dbms-102",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "23.5 KB",
    "description": "Study material for Database Management Systems.",
    "topicsCovered": [
      "Database Management Systems",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Lecture_11338_Content_Document_20260827031502653PM.pdf"
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
    "id": "cc191df72a",
    "title": "E-Notes 11446",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "542.6 KB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_11446_Content_Document_20260828110448807AM.pdf"
  },
  {
    "id": "e619b15ffc",
    "title": "E-Notes 11447",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "268.9 KB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_11447_Content_Document_20260828114542540AM.pdf"
  },
  {
    "id": "885d665e4c",
    "title": "E-Notes 12527",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "279.9 KB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_12527_Content_Document_20260924023809583PM.pdf"
  },
  {
    "id": "4584c5f256",
    "title": "E-Notes 9034",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "755.7 KB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_9034_Content_Document_20260725022451643PM.pdf"
  },
  {
    "id": "3b3f5064e1",
    "title": "E-Notes 9035",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "3.4 MB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_9035_Content_Document_20260725023218667PM.pdf"
  },
  {
    "id": "fed53081de",
    "title": "E-Notes 9037",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "1.8 MB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_9037_Content_Document_20260725023633110PM.pdf"
  },
  {
    "id": "10328d433e",
    "title": "E-Notes 9389",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "658.2 KB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_9389_Content_Document_20260808074757423PM.pdf"
  },
  {
    "id": "cc2cbc5a6f",
    "title": "E-Notes 9508",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "311.6 KB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_9508_Content_Document_20260812070818263PM.pdf"
  },
  {
    "id": "152b754007",
    "title": "E-Notes 9509",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "193.4 KB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_9509_Content_Document_20260812071017790PM.pdf"
  },
  {
    "id": "b59009f005",
    "title": "E-Notes 9560",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "232.0 KB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_9560_Content_Document_20260816070431333PM.pdf"
  },
  {
    "id": "d92a688777",
    "title": "E-Notes 9561",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "722.1 KB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_9561_Content_Document_20260816070815093PM.pdf"
  },
  {
    "id": "5f5816b5cb",
    "title": "E-Notes 8923",
    "subject": "Object-Oriented Programming with Java",
    "subjectCode": "CS404",
    "subjectId": "java-104",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "6.5 MB",
    "description": "Study material for Object-Oriented Programming with Java.",
    "topicsCovered": [
      "Object-Oriented Programming with Java",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_8923_Content_Document_20260714024749560PM.pdf"
  },
  {
    "id": "b5b619d339",
    "title": "E-Notes 8986",
    "subject": "Object-Oriented Programming with Java",
    "subjectCode": "CS404",
    "subjectId": "java-104",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "9.1 MB",
    "description": "Study material for Object-Oriented Programming with Java.",
    "topicsCovered": [
      "Object-Oriented Programming with Java",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_8986_Content_Document_20260722115653220AM.pdf"
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
    "id": "cfb2a28009",
    "title": "Presentation 12210",
    "subject": "Object-Oriented Programming with Java",
    "subjectCode": "CS404",
    "subjectId": "java-104",
    "semester": 3,
    "category": "Presentation",
    "fileType": "PPTX",
    "fileSize": "3.2 MB",
    "description": "Study material for Object-Oriented Programming with Java.",
    "topicsCovered": [
      "Object-Oriented Programming with Java",
      "Presentation"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Presentation_12210_Content_Document_20260911115543917AM.pptx"
  },
  {
    "id": "b594c17135",
    "title": "Presentation 8922",
    "subject": "Object-Oriented Programming with Java",
    "subjectCode": "CS404",
    "subjectId": "java-104",
    "semester": 3,
    "category": "Presentation",
    "fileType": "PPTX",
    "fileSize": "5.7 MB",
    "description": "Study material for Object-Oriented Programming with Java.",
    "topicsCovered": [
      "Object-Oriented Programming with Java",
      "Presentation"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Presentation_8922_Content_Document_20260714024649840PM.pptx"
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
    "id": "53309edbee",
    "title": "E-Notes 12527",
    "subject": "All Subjects",
    "subjectCode": "GEN",
    "subjectId": "gen",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "279.9 KB",
    "description": "Study material for All Subjects.",
    "topicsCovered": [
      "All Subjects",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/E-Notes_12527_Content_Document_20260924023809583PM.pdf"
  },
  {
    "id": "bfee76819d",
    "title": "Queue Notes",
    "subject": "Data Structures and Algorithms",
    "subjectCode": "CS403",
    "subjectId": "dsa-103",
    "semester": 3,
    "category": "Notes",
    "fileType": "PDF",
    "fileSize": "8.7 MB",
    "description": "Study material for Data Structures and Algorithms.",
    "topicsCovered": [
      "Data Structures and Algorithms",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/Queue_Notes.pdf"
  },
  {
    "id": "856e0e7b62",
    "title": "unit 1",
    "subject": "All Subjects",
    "subjectCode": "GEN",
    "subjectId": "gen",
    "semester": 3,
    "category": "Presentation",
    "fileType": "PPTX",
    "fileSize": "4.7 MB",
    "description": "Study material for All Subjects.",
    "topicsCovered": [
      "All Subjects",
      "Presentation"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/unit_1.pptx"
  },
  {
    "id": "2c8e48205d",
    "title": "unit 2",
    "subject": "All Subjects",
    "subjectCode": "GEN",
    "subjectId": "gen",
    "semester": 3,
    "category": "Presentation",
    "fileType": "PPTX",
    "fileSize": "2.1 MB",
    "description": "Study material for All Subjects.",
    "topicsCovered": [
      "All Subjects",
      "Presentation"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/unit_2.pptx"
  },
  {
    "id": "3761f35ae9",
    "title": "WhatsApp Image 2026-09-23 at 3.17.38 PM",
    "subject": "All Subjects",
    "subjectCode": "GEN",
    "subjectId": "gen",
    "semester": 3,
    "category": "Notes",
    "fileType": "JPEG",
    "fileSize": "107.6 KB",
    "description": "Study material for All Subjects.",
    "topicsCovered": [
      "All Subjects",
      "Notes"
    ],
    "uploadedDate": "Sept 2026",
    "downloadUrl": "/materials/WhatsApp_Image_2026-09-23_at_3.17.38_PM.jpeg"
  }
];
