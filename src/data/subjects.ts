// @ts-nocheck
import { Subject } from './types';
import { computerArchitecture } from './computer-architecture';
import { sem3JavaMaster } from './sem3-java-master';
import { sem3CoanmpMaster } from './sem3-coanmp-master';
import { sem3DbmsMaster } from './sem3-dbms-master';
import { sem3DsaMaster } from './sem3-dsa-master';
import { pythonSubject } from './python';
import { cLanguageSubject } from './c-language';
import { digitalElectronicsSubject } from './digital-electronics';
import { probabilityStatsSubject, financialAccountingSubject } from './other-subjects';
import { deRichContent } from './rich-content-de';
import { psrRichContent } from './rich-content-psr';
import { extraSubjects } from './extra-subjects';

// Semester 1 Subjects
import { sem1Python1Subject } from './sem1-python1';
import { sem1PhysicsSubject } from './sem1-physics';
import { sem1ClaSubject } from './sem1-cla';
import { sem1TcsSubject } from './sem1-tcs';
import { sem1WtSubject } from './sem1-wt';

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
  ...sem1DetailedSubjects,
  // Semester 3 (Core)
  computerArchitecture,
  sem3JavaMaster,
  sem3CoanmpMaster,
  sem3DbmsMaster,
  sem3DsaMaster,

  // Semester 2
  pythonSubject,
  cLanguageSubject,
  enrichedDE,
  enrichedPSR,
  financialAccountingSubject,

  // Semester 1
  sem1Python1Subject,
  sem1PhysicsSubject,
  sem1ClaSubject,
  sem1TcsSubject,
  sem1WtSubject,

  // Additional subjects (only those with content)
  ...extraSubjects.filter(
    (es) =>
      !['sub-dsa', 'sub-dbms', 'sem3-dbms', 'sem3-java', 'sub-coanmp', 'sem2-cg', 'sem2-dsa'].includes(es.id) &&
      es.units.some((u) => u.topics.length > 0)
  ),
];

export function getSubject(id: string): Subject | undefined {
  if (!id) return undefined;
  const lower = id.toLowerCase().trim();
  return subjects.find(
    (s) =>
      s.id.toLowerCase() === lower ||
      s.code?.toLowerCase() === lower ||
      s.name.toLowerCase() === lower
  );
}

export function getTopic(subjectId: string, topicId: string) {
  const subject = getSubject(subjectId);
  if (!subject) {
    // If subjectId is a UUID or unknown, search across all subjects for the topicId
    for (const s of subjects) {
      for (const unit of s.units) {
        const topic = unit.topics.find(
          (t) =>
            t.id.toLowerCase() === (topicId || '').toLowerCase() ||
            t.title.toLowerCase() === (topicId || '').toLowerCase()
        );
        if (topic) return { subject: s, topic, unitTitle: unit.title };
      }
    }
    return undefined;
  }

  for (const unit of subject.units) {
    const topic = unit.topics.find(
      (t) =>
        t.id.toLowerCase() === (topicId || '').toLowerCase() ||
        t.title.toLowerCase() === (topicId || '').toLowerCase()
    );
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
  const idx = allTopics.findIndex(
    (t) =>
      t.id.toLowerCase() === (topicId || '').toLowerCase() ||
      t.title.toLowerCase() === (topicId || '').toLowerCase()
  );
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
