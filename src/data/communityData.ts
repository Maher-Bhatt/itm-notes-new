export type PostCategory =
  | 'College Feedback'
  | 'Campus Confessions'
  | 'Academic & Doubts'
  | 'Exam Survival & Tips'
  | 'Projects & Tech'
  | 'General Chill';

export interface CommunityComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  isMasked: boolean;
  maskAlias: string;
  content: string;
  createdAt: string;
  likes: number;
  likedByMe?: boolean;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  authorAvatar?: string;
  authorBranch?: string;
  isMasked: boolean;
  maskAlias: string;
  category: PostCategory;
  content: string;
  createdAt: string;
  likes: number;
  likedByMe?: boolean;
  comments: CommunityComment[];
  pinned?: boolean;
}

export interface ClassmateProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  branch: string;
  level: number;
  levelTitle: string;
  xp: number;
  streakDays: number;
  attendancePercent?: number;
  topicsCompleted?: number;
  quizzesTaken?: number;
  badgesCount?: number;
  statusQuote: string;
  role?: string;
}

export const INITIAL_CLASSMATES: ClassmateProfile[] = [
  {
    id: 'student-1',
    name: 'Priya Sharma',
    email: 'priya.s@itm.ac.in',
    branch: 'B.Tech CSE Sem 3',
    level: 8,
    levelTitle: 'Algorithm Archmage',
    xp: 3420,
    streakDays: 24,
    attendancePercent: 92,
    topicsCompleted: 48,
    quizzesTaken: 22,
    badgesCount: 18,
    statusQuote: 'Targeting 9.5+ SGPA this sem. Trees & Graphs are super fun!',
  },
  {
    id: 'student-2',
    name: 'Aarav Patel',
    email: 'aarav.p@itm.ac.in',
    branch: 'B.Tech CSE Sem 3',
    level: 7,
    levelTitle: 'Logic Architect',
    xp: 2850,
    streakDays: 17,
    attendancePercent: 86,
    topicsCompleted: 39,
    quizzesTaken: 19,
    badgesCount: 15,
    statusQuote: 'Solved all 32 C programming practicals in the Coding Lab. Next up: Java OOP!',
  },
  {
    id: 'student-3',
    name: 'Diya Varma',
    email: 'diya.v@itm.ac.in',
    branch: 'B.Tech CSE Sem 3',
    level: 6,
    levelTitle: 'Binary Virtuoso',
    xp: 2340,
    streakDays: 12,
    attendancePercent: 81,
    topicsCompleted: 31,
    quizzesTaken: 14,
    badgesCount: 13,
    statusQuote: 'Computer Architecture instruction cycle & Booth algorithm notes here saved my MST.',
  },
  {
    id: 'student-4',
    name: 'Siddharth Joshi',
    email: 'sid.j@itm.ac.in',
    branch: 'B.Tech CSE Sem 3',
    level: 5,
    levelTitle: 'Code Apprentice',
    xp: 1890,
    streakDays: 8,
    attendancePercent: 76,
    topicsCompleted: 24,
    quizzesTaken: 10,
    badgesCount: 10,
    statusQuote: 'Need 4 consecutive classes to maintain safe attendance above 75%. Grinding on the calculator!',
  },
  {
    id: 'student-5',
    name: 'Sneha Rao',
    email: 'sneha.r@itm.ac.in',
    branch: 'B.Tech CSE Sem 3',
    level: 4,
    levelTitle: 'Syntax Explorer',
    xp: 1420,
    streakDays: 5,
    attendancePercent: 84,
    topicsCompleted: 18,
    quizzesTaken: 8,
    badgesCount: 8,
    statusQuote: 'Audio notes player while traveling on the college bus is a gamechanger.',
  },
];

export const INITIAL_POSTS: CommunityPost[] = [];

const STORAGE_KEY = 'itm_campus_feed_posts';
const LEGACY_DUMMY_IDS = new Set(['post-1', 'post-2', 'post-3', 'post-4', 'post-5', 'post-maher-verified', 'post-study-buddies']);

export function getStoredPosts(): CommunityPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: CommunityPost[] = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        const cleaned = parsed.filter(p => !LEGACY_DUMMY_IDS.has(p.id) && !p.content?.includes('checkitoutlive'));
        if (cleaned.length !== parsed.length) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
        }
        return cleaned;
      }
    }
  } catch (err) {
    console.error('Failed to parse community posts:', err);
  }
  return [];
}

export function saveStoredPosts(posts: CommunityPost[]): void {
  try {
    const cleaned = (posts || []).filter(p => !LEGACY_DUMMY_IDS.has(p.id) && !p.content?.includes('checkitoutlive'));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  } catch (err) {
    console.error('Failed to save community posts:', err);
  }
}
