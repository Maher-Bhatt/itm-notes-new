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
  isVerified?: boolean;
  verifiedBy?: string;
  verifiedAt?: string;
  isAiGenerated?: boolean;
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
  isVerified?: boolean;
  verifiedBy?: string;
  isAiGenerated?: boolean;
  linkUrl?: string;
  mediaUrl?: string;
  verified?: boolean;
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

export const FAKE_POST_IDS = new Set([
  'post-1',
  'post-2',
  'post-3',
  'post-4',
  'post-5',
  'post-maher-verified',
  'post-study-buddies',
]);

export function isFakePost(p: any): boolean {
  if (!p) return false;
  if (p.id && FAKE_POST_IDS.has(p.id)) return true;
  const content = typeof p.content === 'string' ? p.content : '';
  if (
    content.includes('AC in Lab 3 (Ground Floor)') ||
    content.includes('Computer Architecture Unit 2') ||
    content.includes('skipped Friday 8:30 AM lecture') ||
    content.includes('Practical Coding Lab with 94 complete') ||
    content.includes('canteen please bring back hot filter coffee') ||
    content.includes('Welcome to Campus Pulse!') ||
    content.includes('Chapter 3 Matrix Algebra and Tree Traversal')
  ) {
    return true;
  }
  const author = p.authorName || p.author_name;
  if (
    author === 'Rohan Deshmukh' ||
    author === 'Priya Sharma' ||
    author === 'Kunal Verma' ||
    author === 'Ananya Mehta' ||
    author === 'Study Buddies'
  ) {
    return true;
  }
  return false;
}

// Real student data only — no invented profiles or fake posts
export const INITIAL_CLASSMATES: ClassmateProfile[] = [];

export const INITIAL_POSTS: CommunityPost[] = [];

const STORAGE_KEY = 'itm_campus_feed_posts';

export function getStoredPosts(): CommunityPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.filter((p) => !isFakePost(p));
      }
    }
  } catch (err) {
    console.error('Failed to parse community posts:', err);
  }
  return [];
}

export function saveStoredPosts(posts: CommunityPost[]): void {
  try {
    const clean = Array.isArray(posts) ? posts.filter((p) => !isFakePost(p)) : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
  } catch (err) {
    console.error('Failed to save community posts:', err);
  }
}
