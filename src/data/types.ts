export interface MCQ {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Example {
  title: string;
  problem: string;
  explanation: string;
  code?: string;
  output?: string;
}

export interface TheoryQuestion {
  question: string;
  marks: "2 Marks" | "3 Marks" | "5 Marks" | "7 Marks";
  answer: string;
  keyPoints?: string[];
}

export interface Topic {
  id: string;
  title: string;
  simpleExplanation: string;
  detailedExplanation: string;
  richContent?: string; // Markdown with KaTeX, Mermaid, and chart directives
  shortNotes?: string;
  examples: Example[];
  keyPoints: string[];
  theoryQuestions?: TheoryQuestion[];
  mcqs: MCQ[];
}

export interface Unit {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  color: string;
  icon: string;
  description: string;
  semester: number;
  units: Unit[];
}

export interface Progress {
  completedTopics: string[];
  bookmarkedTopics: string[];
  mcqScores: Record<string, number>;
}
