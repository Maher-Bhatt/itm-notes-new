import type { Subject, Topic } from "./types";
import { pythonSubject } from "./python";
import { cLanguageSubject } from "./c-language";
import { digitalElectronicsSubject } from "./digital-electronics";
import { probabilityStatsSubject, financialAccountingSubject } from "./other-subjects";
import { deRichContent } from "./rich-content-de";
import { psrRichContent } from "./rich-content-psr";

// Inject rich content into topics
function injectRichContent(subject: Subject, contentMap: Record<string, string>): Subject {
  return {
    ...subject,
    units: subject.units.map((unit) => ({
      ...unit,
      topics: unit.topics.map((topic) => ({
        ...topic,
        richContent: contentMap[topic.id] || topic.richContent,
      })),
    })),
  };
}

const enrichedDE = injectRichContent(digitalElectronicsSubject, deRichContent);
const enrichedPSR = injectRichContent(probabilityStatsSubject, psrRichContent);

export const subjects: Subject[] = [
  pythonSubject,
  cLanguageSubject,
  enrichedDE,
  enrichedPSR,
  financialAccountingSubject,
];

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}

export function getTopic(subjectId: string, topicId: string): { subject: Subject; topic: Topic; unitTitle: string } | undefined {
  const subject = getSubject(subjectId);
  if (!subject) return undefined;
  for (const unit of subject.units) {
    const topic = unit.topics.find((t) => t.id === topicId);
    if (topic) return { subject, topic, unitTitle: unit.title };
  }
  return undefined;
}

export function getAllTopicIds(subjectId: string): string[] {
  const subject = getSubject(subjectId);
  if (!subject) return [];
  return subject.units.flatMap((u) => u.topics.map((t) => t.id));
}

export function getAdjacentTopics(subjectId: string, topicId: string): { prev: Topic | null; next: Topic | null } {
  const subject = getSubject(subjectId);
  if (!subject) return { prev: null, next: null };
  const allTopics = subject.units.flatMap((u) => u.topics);
  const idx = allTopics.findIndex((t) => t.id === topicId);
  return {
    prev: idx > 0 ? allTopics[idx - 1] : null,
    next: idx < allTopics.length - 1 ? allTopics[idx + 1] : null,
  };
}

export function searchTopics(query: string): Array<{ subject: Subject; topic: Topic }> {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: Array<{ subject: Subject; topic: Topic }> = [];
  for (const subject of subjects) {
    for (const unit of subject.units) {
      for (const topic of unit.topics) {
        if (
          topic.title.toLowerCase().includes(q) ||
          topic.simpleExplanation.toLowerCase().includes(q) ||
          topic.keyPoints.some((kp) => kp.toLowerCase().includes(q))
        ) {
          results.push({ subject, topic });
        }
      }
    }
  }
  return results.slice(0, 20);
}
