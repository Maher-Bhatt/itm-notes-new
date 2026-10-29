/**
 * CampusLoop - Intelligent Study Planner Engine
 * Distributes topics, SRS cards, and practicals across remaining days
 * leading up to university examinations based on unit weightage.
 */

import { subjects } from "@/data/subjects";

export interface StudyPlanTask {
  id: string;
  subjectCode: string;
  subjectName: string;
  unitNumber?: number;
  title?: string;
  topicTitle?: string;
  topicUrl?: string;
  routeUrl: string;
  type: 'theory' | 'code_practice' | 'srs_review' | 'mock_exam';
  completed: boolean;
  estimatedMinutes: number;
  weightage?: number;
}

export interface StudyPlanDay {
  dayNumber: number;
  date: string;
  dateString: string; // YYYY-MM-DD
  dayOfWeek: string;
  targetMinutes: number;
  tasks: StudyPlanTask[];
}

export interface GeneratedStudyPlan {
  id: string;
  createdAt: string;
  examDate: string;
  dailyHours: number;
  subjectCodes: string[];
  totalDays: number;
  totalTopics: number;
  days: StudyPlanDay[];
}

export type StudyPlan = GeneratedStudyPlan;

const STORAGE_KEY = 'itm_active_study_plan';

export interface GeneratePlanOptions {
  examDate: string;
  dailyStudyHours: number;
  selectedSubjectIds: string[];
}

export function generateStudyPlan(
  optionsOrExamDate: string | GeneratePlanOptions,
  selectedSubjectCodes?: string[],
  dailyHoursInput?: number
): GeneratedStudyPlan {
  let examDateStr: string;
  let subjectCodes: string[];
  let dailyHours: number;

  if (typeof optionsOrExamDate === 'object') {
    examDateStr = optionsOrExamDate.examDate;
    subjectCodes = optionsOrExamDate.selectedSubjectIds;
    dailyHours = optionsOrExamDate.dailyStudyHours;
  } else {
    examDateStr = optionsOrExamDate;
    subjectCodes = selectedSubjectCodes || ['oopj', 'dsa'];
    dailyHours = dailyHoursInput || 3;
  }

  const targetDate = new Date(examDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Collect candidate topics
  const allTasks: Array<{
    subjectCode: string;
    subjectName: string;
    unitNumber: number;
    title: string;
    routeUrl: string;
    type: 'theory' | 'code_practice' | 'srs_review';
  }> = [];

  for (const code of subjectCodes) {
    const sub = subjects.find(
      s => s.code.toLowerCase() === code.toLowerCase() || s.id.toLowerCase() === code.toLowerCase()
    );
    if (sub && sub.units) {
      for (const unit of sub.units) {
        for (const topic of unit.topics || []) {
          allTasks.push({
            subjectCode: sub.code,
            subjectName: sub.name,
            unitNumber: 1,
            title: topic.title,
            routeUrl: `/subject/${sub.id}/topic/${topic.id}`,
            type: topic.title.toLowerCase().includes('program') || topic.title.toLowerCase().includes('implementation') ? 'code_practice' : 'theory',
          });
        }
      }
    }
  }

  // Interleave tasks evenly across days
  const tasksPerDay = Math.max(1, Math.ceil(allTasks.length / totalDays));
  const planDays: StudyPlanDay[] = [];

  let taskPointer = 0;
  for (let d = 0; d < totalDays; d++) {
    const currentDayDate = new Date(today.getTime() + d * 24 * 60 * 60 * 1000);
    const dayTasks: StudyPlanTask[] = [];

    // Assign topics for this day
    for (let t = 0; t < tasksPerDay && taskPointer < allTasks.length; t++) {
      const task = allTasks[taskPointer++];
      dayTasks.push({
        id: `task-${d}-${t}`,
        ...task,
        topicTitle: task.title,
        topicUrl: task.routeUrl,
        completed: false,
        estimatedMinutes: Math.round((dailyHours * 60) / tasksPerDay),
        weightage: 12,
      });
    }

    // Add daily SRS flashcard check task
    dayTasks.unshift({
      id: `srs-day-${d}`,
      subjectCode: 'SRS',
      subjectName: 'Active Recall',
      unitNumber: 0,
      title: 'Review Due Flashcards (SM-2 Spaced Repetition)',
      topicTitle: 'Review Due Flashcards (SM-2 Spaced Repetition)',
      type: 'srs_review',
      routeUrl: '/dashboard#srs',
      topicUrl: '/dashboard#srs',
      completed: false,
      estimatedMinutes: 15,
      weightage: 10,
    });

    planDays.push({
      dayNumber: d + 1,
      date: currentDayDate.toISOString(),
      dateString: currentDayDate.toISOString().slice(0, 10),
      dayOfWeek: currentDayDate.toLocaleDateString('en-US', { weekday: 'short' }),
      targetMinutes: dailyHours * 60,
      tasks: dayTasks,
    });
  }

  const plan: GeneratedStudyPlan = {
    id: `plan-${Date.now()}`,
    createdAt: new Date().toISOString(),
    examDate: examDateStr,
    dailyHours,
    subjectCodes,
    totalDays,
    totalTopics: allTasks.length,
    days: planDays,
  };

  saveStudyPlan(plan);
  return plan;
}

export function getSavedStudyPlan(): GeneratedStudyPlan | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const getActiveStudyPlan = getSavedStudyPlan;

export function saveStudyPlan(plan: GeneratedStudyPlan): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
  } catch (e) {
    console.warn("Failed to persist study plan:", e);
  }
}

export function toggleStudyTaskCompleted(dayNumber: number, taskId: string): GeneratedStudyPlan | null {
  const plan = getSavedStudyPlan();
  if (!plan) return null;

  const day = plan.days.find(d => d.dayNumber === dayNumber);
  if (day) {
    const task = day.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveStudyPlan(plan);
    }
  }
  return plan;
}

export function togglePlanTask(taskId: string): GeneratedStudyPlan | null {
  const plan = getSavedStudyPlan();
  if (!plan) return null;

  for (const day of plan.days) {
    const task = day.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
      saveStudyPlan(plan);
      return plan;
    }
  }
  return plan;
}

export function getPlanProgress(): { total: number; completed: number; percent: number } {
  const plan = getSavedStudyPlan();
  if (!plan) return { total: 0, completed: 0, percent: 0 };

  let total = 0;
  let completed = 0;

  plan.days.forEach(day => {
    day.tasks.forEach(t => {
      total++;
      if (t.completed) completed++;
    });
  });

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return { total, completed, percent };
}
