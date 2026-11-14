export type LibraryDocKind =
  | "Study guide"
  | "Syllabus"
  | "Lecture notes"
  | "Slides"
  | "Handwritten notes"
  | "Tutorial"
  | "Question paper"
  | "Lab manual"
  | "Assignment";

export interface LibraryDoc {
  slug: string;
  title: string;
  kind: LibraryDocKind | string;
  unit: number | null;
  words: number;
  /** Mostly scanned / handwritten pages that are shown as page images */
  scanned: boolean;
  featured: boolean;
  pages?: number;
  summary: string;
  /** Past papers only */
  exam?: "CET-1" | "CET-2" | "Mid-sem" | "End-sem" | string;
  date?: string;
  academicYear?: string;
  marks?: number;
}

export interface LibrarySubject {
  slug: string;
  code: string;
  name: string;
  short: string;
  docs: LibraryDoc[];
}
