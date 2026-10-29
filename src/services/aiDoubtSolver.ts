/**
 * CampusLoop - Grounded AI Doubt Solver Service
 * Answers student doubts instantly using verified course notes, code examples,
 * and exam question banks with strict source citations.
 */

import { subjects } from "@/data/subjects";
import { MASTER_BANKS } from "@/data/masterBanksRegistry";

export interface DoubtCitation {
  subjectCode: string;
  subjectName: string;
  unitNumber?: number;
  topicTitle: string;
  routeUrl: string;
  snippet: string;
}

export interface DoubtAnswer {
  doubt: string;
  summary: string;
  explanation: string;
  codeSnippet?: string;
  keyRule?: string;
  citations: DoubtCitation[];
  dailyQuotaRemaining: number;
}

const QUOTA_STORAGE_KEY = 'itm_ai_doubt_quota';
const DAILY_LIMIT = 20;

function getDailyQuota(): { count: number; date: string } {
  try {
    const raw = localStorage.getItem(QUOTA_STORAGE_KEY);
    const today = new Date().toISOString().slice(0, 10);
    if (!raw) return { count: 0, date: today };
    const parsed = JSON.parse(raw);
    if (parsed.date !== today) {
      return { count: 0, date: today };
    }
    return parsed;
  } catch {
    return { count: 0, date: new Date().toISOString().slice(0, 10) };
  }
}

function incrementDailyQuota(): number {
  const current = getDailyQuota();
  const updated = { count: current.count + 1, date: current.date };
  try {
    localStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Quota save failed:", e);
  }
  return Math.max(0, DAILY_LIMIT - updated.count);
}

/**
 * Intelligent Retrieval Engine:
 * Indexes syllabus topics and question bank items
 */
interface IndexItem {
  subjectCode: string;
  subjectName: string;
  unitNumber?: number;
  title: string;
  content: string;
  routeUrl: string;
  code?: string;
}

function buildKnowledgeIndex(): IndexItem[] {
  const index: IndexItem[] = [];

  // Index syllabus topics
  for (const sub of subjects) {
    for (const unit of sub.units || []) {
      for (const topic of unit.topics || []) {
        index.push({
          subjectCode: sub.code,
          subjectName: sub.name,
          unitNumber: unit.number,
          title: topic.title,
          content: `${topic.title} ${topic.content || ''}`,
          routeUrl: `/subject/${sub.id}/topic/${topic.id}`,
        });
      }
    }
  }

  // Index Master Question Banks
  for (const [key, bank] of Object.entries(MASTER_BANKS)) {
    for (const pred of bank.predictOutput) {
      index.push({
        subjectCode: bank.code,
        subjectName: bank.name,
        title: pred.title,
        content: `${pred.title} ${pred.concept} ${pred.rule} ${pred.explanation}`,
        routeUrl: `/imp-questions/${key}#part-a`,
        code: pred.code,
      });
    }
    for (const longQ of bank.longAnswers) {
      index.push({
        subjectCode: bank.code,
        subjectName: bank.name,
        title: longQ.title,
        content: `${longQ.title} ${longQ.concept} ${longQ.examNote}`,
        routeUrl: `/imp-questions/${key}#part-b`,
        code: longQ.code,
      });
    }
    for (const th of bank.theoryQuestions) {
      index.push({
        subjectCode: bank.code,
        subjectName: bank.name,
        title: th.title,
        content: `${th.title} ${th.definition} ${th.examTip}`,
        routeUrl: `/imp-questions/${key}#part-c`,
      });
    }
  }

  return index;
}

let KNOWLEDGE_INDEX: IndexItem[] | null = null;

function getKnowledgeIndex(): IndexItem[] {
  if (!KNOWLEDGE_INDEX) {
    KNOWLEDGE_INDEX = buildKnowledgeIndex();
  }
  return KNOWLEDGE_INDEX;
}

/**
 * Solve Student Doubt with Citation Grounding
 */
export async function solveStudentDoubt(doubtQuery: string): Promise<DoubtAnswer> {
  const cleanQuery = doubtQuery.trim();
  if (!cleanQuery) {
    throw new Error("Please enter a question or topic to search.");
  }

  const quota = getDailyQuota();
  if (quota.count >= DAILY_LIMIT) {
    throw new Error(`Daily doubt limit reached (${DAILY_LIMIT}/${DAILY_LIMIT}). Quota resets at midnight.`);
  }

  const queryTerms = cleanQuery
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);

  const index = getKnowledgeIndex();

  // Score items by term occurrence
  const scored = index.map((item) => {
    let score = 0;
    const lowerContent = item.content.toLowerCase();
    const lowerTitle = item.title.toLowerCase();

    for (const term of queryTerms) {
      if (lowerTitle.includes(term)) score += 15;
      if (lowerContent.includes(term)) score += 3;
    }

    return { item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const topMatches = scored.filter((s) => s.score > 0).slice(0, 4);

  const quotaLeft = incrementDailyQuota();

  if (topMatches.length === 0) {
    return {
      doubt: cleanQuery,
      summary: "No exact match found in current Semester 3 notes.",
      explanation: `We searched across OOPJ, DSA, CA, DBMS, and CONMP but couldn't locate specific references matching "${cleanQuery}". Try checking the keyword spelling or exploring our 190 Master Solved Exam Questions in the Question Banks tab.`,
      citations: [
        {
          subjectCode: "ALL",
          subjectName: "Semester 3 Question Banks",
          topicTitle: "All Core Subjects Master Repository",
          routeUrl: "/imp-questions",
          snippet: "Explore 190 fully solved university model questions across all 5 subjects.",
        },
      ],
      dailyQuotaRemaining: quotaLeft,
    };
  }

  const bestMatch = topMatches[0].item;
  const citations: DoubtCitation[] = topMatches.map((m) => ({
    subjectCode: m.item.subjectCode,
    subjectName: m.item.subjectName,
    unitNumber: m.item.unitNumber,
    topicTitle: m.item.title,
    routeUrl: m.item.routeUrl,
    snippet: m.item.content.slice(0, 180) + '...',
  }));

  // Construct structured model answer
  return {
    doubt: cleanQuery,
    summary: `Based on **${bestMatch.subjectName} (${bestMatch.subjectCode})**: ${bestMatch.title}`,
    explanation: bestMatch.content.slice(0, 480) + '...',
    codeSnippet: bestMatch.code,
    keyRule: `Exam Standard Invariant: Review unit ${bestMatch.unitNumber || 'Core'} materials and verify edge-cases with our master model solution.`,
    citations,
    dailyQuotaRemaining: quotaLeft,
  };
}

export function getRemainingDailyDoubts(): number {
  const current = getDailyQuota();
  return Math.max(0, DAILY_LIMIT - current.count);
}
