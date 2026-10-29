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

// Semester 4 Master Subjects
import { sem4OsMaster } from './sem4-os-master';
import { sem4CnMaster } from './sem4-cn-master';
import { sem4DaaMaster } from './sem4-daa-master';

// Semester 5 Master Subjects
import { sem5AimlMaster } from './sem5-aiml-master';
import { sem5SeMaster } from './sem5-se-master';
import { sem5TocMaster } from './sem5-toc-master';

// Semester 6 Master Subjects
import { sem6CdMaster } from './sem6-cd-master';
import { sem6CloudMaster } from './sem6-cloud-master';

// Semester 7 Master Subjects
import { sem7CyberMaster } from './sem7-cyber-master';
import { sem7NlpMaster } from './sem7-nlp-master';

// Semester 8 Master Subjects
import { sem8DevopsMaster } from './sem8-devops-master';

// BCA Master Curriculum (30 Subjects)
import { bcaMasterSubjects } from './bca-master-subjects';
import { MASSIVE_QUESTION_BANK } from './massiveQuestionBank';

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

export function enrichSubjectWithBankMCQs(subject: Subject): Subject {
  const bankForSubject = MASSIVE_QUESTION_BANK.filter(
    (item) => item.subjectId === subject.id || item.subjectId === subject.id + "-master"
  );
  if (bankForSubject.length === 0) return subject;

  return {
    ...subject,
    units: subject.units.map((unit, uIdx) => {
      const bankForUnit = bankForSubject.filter(
        (q) => q.unitTitle.toLowerCase().includes(`unit ${uIdx + 1}`) || q.id.includes(`-u${uIdx + 1}-`)
      );

      if (bankForUnit.length === 0 || !unit.topics || unit.topics.length === 0) return unit;

      return {
        ...unit,
        topics: unit.topics.map((topic, tIdx) => {
          const distributedQuestions = bankForUnit.filter((_, qIdx) => qIdx % unit.topics.length === tIdx);
          const mappedMcqs = distributedQuestions.map((q) => ({
            question: q.question,
            options: q.options,
            correctIndex: q.correctIndex,
            explanation: q.explanation,
          }));

          return {
            ...topic,
            mcqs: [...(topic.mcqs || []), ...mappedMcqs],
          };
        }),
      };
    }),
  };
}

const enrichedDE = injectRichContent(digitalElectronicsSubject, deRichContent);
const enrichedPSR = injectRichContent(probabilityStatsSubject, psrRichContent);

const rawBtechSubjects: Subject[] = [
  // Semester 8 (Core & SRE)
  sem8DevopsMaster,

  // Semester 7 (Core & AI/Security)
  sem7CyberMaster,
  sem7NlpMaster,

  // Semester 6 (Core & Cloud/Compilers)
  sem6CdMaster,
  sem6CloudMaster,

  // Semester 5 (Core)
  sem5AimlMaster,
  sem5SeMaster,
  sem5TocMaster,

  // Semester 4 (Core)
  sem4OsMaster,
  sem4CnMaster,
  sem4DaaMaster,

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

export const btechSubjects: Subject[] = rawBtechSubjects.map(enrichSubjectWithBankMCQs);

export const bcaSubjects: Subject[] = bcaMasterSubjects;

export const subjects: Subject[] = [
  ...btechSubjects,
  ...bcaSubjects,
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
