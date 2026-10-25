/**
 * ITM Notes - Full-Text Content Search Engine
 * Searches inside topic markdown bodies, code blocks, and model solutions.
 * Returns ranked snippet excerpts with line numbers and matched term highlights.
 */

import { subjects } from "@/data/subjects";
import { MASTER_BANKS } from "@/data/masterBanksRegistry";

export interface ContentSearchResult {
  id: string;
  subjectCode: string;
  subjectName: string;
  unitNumber?: number;
  title: string;
  snippet: string;
  matchedLine: number;
  routeUrl: string;
  type: 'topic' | 'code' | 'master_bank';
}

export function searchFullTextContent(query: string, maxResults = 15): ContentSearchResult[] {
  const clean = query.trim().toLowerCase();
  if (clean.length < 2) return [];

  const terms = clean.split(/\s+/).filter(t => t.length > 1);
  const results: ContentSearchResult[] = [];

  // Search inside syllabus topics
  for (const sub of subjects) {
    for (const unit of sub.units || []) {
      for (const topic of unit.topics || []) {
        const text = topic.content || '';
        const lines = text.split('\n');

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const lowerLine = line.toLowerCase();

          // Check if line matches search query
          const matchAll = terms.every(t => lowerLine.includes(t));
          if (matchAll && line.trim().length > 5) {
            const before = Math.max(0, i - 1);
            const after = Math.min(lines.length - 1, i + 1);
            const excerpt = lines.slice(before, after + 1).join('\n');

            results.push({
              id: `${topic.id}-line-${i}`,
              subjectCode: sub.code,
              subjectName: sub.name,
              unitNumber: unit.number,
              title: topic.title,
              snippet: excerpt,
              matchedLine: i + 1,
              routeUrl: `/subject/${sub.id}/topic/${topic.id}`,
              type: lowerLine.includes('class') || lowerLine.includes('def ') || lowerLine.includes('void ') ? 'code' : 'topic',
            });
            break; // One strong snippet per topic
          }
        }
      }
    }
  }

  // Search inside Master Question Banks
  for (const [key, bank] of Object.entries(MASTER_BANKS)) {
    // Predict Output
    for (let pIdx = 0; pIdx < bank.predictOutput.length; pIdx++) {
      const pred = bank.predictOutput[pIdx];
      const combined = `${pred.title}\n${pred.concept}\n${pred.rule}\n${pred.code}\n${pred.explanation}`;
      const lines = combined.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const lowerLine = lines[i].toLowerCase();
        if (terms.every(t => lowerLine.includes(t)) && lines[i].trim().length > 5) {
          results.push({
            id: `${key}-pred-${pIdx}`,
            subjectCode: bank.code,
            subjectName: bank.name,
            title: `Part A: ${pred.title}`,
            snippet: lines.slice(Math.max(0, i - 1), Math.min(lines.length - 1, i + 2)).join('\n'),
            matchedLine: i + 1,
            routeUrl: `/imp-questions/${key}#part-a`,
            type: 'master_bank',
          });
          break;
        }
      }
    }

    // Long Answers
    for (let lIdx = 0; lIdx < bank.longAnswers.length; lIdx++) {
      const longQ = bank.longAnswers[lIdx];
      const combined = `${longQ.title}\n${longQ.concept}\n${longQ.code}\n${longQ.examNote}`;
      const lines = combined.split('\n');

      for (let i = 0; i < lines.length; i++) {
        const lowerLine = lines[i].toLowerCase();
        if (terms.every(t => lowerLine.includes(t)) && lines[i].trim().length > 5) {
          results.push({
            id: `${key}-long-${lIdx}`,
            subjectCode: bank.code,
            subjectName: bank.name,
            title: `Part B: ${longQ.title}`,
            snippet: lines.slice(Math.max(0, i - 1), Math.min(lines.length - 1, i + 2)).join('\n'),
            matchedLine: i + 1,
            routeUrl: `/imp-questions/${key}#part-b`,
            type: 'master_bank',
          });
          break;
        }
      }
    }
  }

  return results.slice(0, maxResults);
}
