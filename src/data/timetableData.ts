
export type ExamEvent = {
  date: string;
  time: string;
  courseCode: string;
  courseName: string;
};

export type TimetableBatch = {
  id: string;
  name: string;
  exams: ExamEvent[];
};

export const TIMETABLE_DATA: TimetableBatch[] = [
  {
    id: "bca-sem3",
    name: "BCA Semester 3 (CET 1 & 2 / MST)",
    exams: [
      { date: "30-09-2026", time: "10:10 AM - 11:40 AM", courseCode: "C4361C1", courseName: "Data Structures & Algorithms" },
      { date: "01-10-2026", time: "10:10 AM - 11:40 AM", courseCode: "C4361C2", courseName: "Object Oriented Programming Using Java" },
      { date: "03-10-2026", time: "10:10 AM - 11:40 AM", courseCode: "C43X1C3", courseName: "Basic Statistics using R" },
      { date: "05-10-2026", time: "10:10 AM - 12:10 PM", courseCode: "C4361S1", courseName: "Advanced Web Designing-2(PHP)" },
      { date: "06-10-2026", time: "10:10 AM - 12:10 PM", courseCode: "C43X1M1", courseName: "MIS-ERP" },
      { date: "07-10-2026", time: "10:10 AM - 12:10 PM", courseCode: "C43X1A1", courseName: "English & Communication" },
    ]
  },
  {
    id: "bca-sem5",
    name: "BCA Semester 5 (CET 1 & 2 / MST)",
    exams: [
      { date: "01-10-2026", time: "12:30 PM - 02:00 PM", courseCode: "C4561C1", courseName: "Mobile Application Development" },
      { date: "03-10-2026", time: "12:30 PM - 02:30 PM", courseCode: "C4561C2", courseName: "Principles of AI" },
      { date: "05-10-2026", time: "12:30 PM - 02:30 PM", courseCode: "C4561D3", courseName: "Introduction to Cloud & IoT" },
    ]
  },
  {
    id: "mca-sem3",
    name: "MCA Semester 3 (MST)",
    exams: [
      { date: "30-09-2026", time: "10:10 AM - 12:10 PM", courseCode: "C5360C1", courseName: "Software Engineering & Agile Methodology" },
      { date: "01-10-2026", time: "10:10 AM - 12:10 PM", courseCode: "C5360C2", courseName: "Mobile Application Development(Android)" },
      { date: "03-10-2026", time: "10:10 AM - 12:10 PM", courseCode: "C5360C3", courseName: "Introduction to Machine Learning" },
      { date: "05-10-2026", time: "10:10 AM - 12:10 PM", courseCode: "C5360D3", courseName: "Computer Vision and Applications" },
      { date: "06-10-2026", time: "10:10 AM - 12:10 PM", courseCode: "C5360D7/6", courseName: "Cloud Computing / Deep Learning" },
      { date: "07-10-2026", time: "10:10 AM - 12:10 PM", courseCode: "H5360V1", courseName: "Introduction to Indian Constitution" },
    ]
  }
];

