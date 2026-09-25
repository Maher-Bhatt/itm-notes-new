import { Subject } from './types';
import { computerArchitecture } from './computer-architecture';
import { sem3DetailedSubjects } from './sem3-detailed';
import { sem3JavaMaster } from './sem3-java-master';

export const subjects: Subject[] = [
  computerArchitecture,
  sem3JavaMaster,
  ...sem3DetailedSubjects.filter(s => s.code !== 'JAVA303')
];

export function getSubject(id: string): Subject | undefined {
  return subjects.find((s) => s.id === id);
}

export function getTopic(subjectId: string, topicId: string) {
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

export function getAdjacentTopics(subjectId: string, topicId: string) {
  const subject = getSubject(subjectId);
  if (!subject) return { prev: null, next: null };
  const allTopics = subject.units.flatMap((u) => u.topics);
  const idx = allTopics.findIndex((t) => t.id === topicId);
  return {
    prev: idx > 0 ? allTopics[idx - 1] : null,
    next: idx < allTopics.length - 1 ? allTopics[idx + 1] : null,
  };
}

export function searchTopics(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results = [];
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
