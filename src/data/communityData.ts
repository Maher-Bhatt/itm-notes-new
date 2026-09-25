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
  attendancePercent: number;
  topicsCompleted: number;
  quizzesTaken: number;
  badgesCount: number;
  statusQuote: string;
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

export const INITIAL_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'user-masked-1',
    authorName: 'Rohan Deshmukh',
    authorEmail: 'rohan.d@itm.ac.in',
    authorBranch: 'B.Tech CSE Sem 3',
    isMasked: true,
    maskAlias: 'Anonymous Student 🎭',
    category: 'College Feedback',
    content:
      'The AC in Lab 3 (Ground Floor) has been dripping water right near the power strips for two weeks now, and Wi-Fi speed drops to zero during practical hours. Can college administration please repair this before semester finals start?',
    createdAt: '2 hours ago',
    likes: 38,
    likedByMe: false,
    pinned: true,
    comments: [
      {
        id: 'c-1',
        postId: 'post-1',
        authorId: 'admin-maher',
        authorName: 'Maher Bhatt (Admin)',
        authorEmail: 'maher@itm.ac.in',
        isMasked: false,
        maskAlias: 'Admin',
        content: 'Noted! Forwarding this feedback directly to the IT infrastructure team and campus maintenance.',
        createdAt: '1 hour ago',
        likes: 14,
      },
      {
        id: 'c-2',
        postId: 'post-1',
        authorId: 'user-masked-2',
        authorName: 'Anonymous Peer',
        authorEmail: 'student2@itm.ac.in',
        isMasked: true,
        maskAlias: 'Masked Peer 🎭',
        content: 'Same in Lab 2! Glad someone spoke up with the mask option so we do not get targeted for feedback.',
        createdAt: '45 mins ago',
        likes: 9,
      },
    ],
  },
  {
    id: 'post-2',
    authorId: 'student-1',
    authorName: 'Priya Sharma',
    authorEmail: 'priya.s@itm.ac.in',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    authorBranch: 'B.Tech CSE Sem 3',
    isMasked: false,
    maskAlias: 'Priya Sharma',
    category: 'Exam Survival & Tips',
    content:
      'For anyone studying Computer Architecture Unit 2: pay special attention to the Master Instruction Cycle flowchart (T0 through T6) and BSA subroutine instructions. Those are almost guaranteed 7-mark questions according to previous question papers!',
    createdAt: '4 hours ago',
    likes: 47,
    likedByMe: true,
    comments: [
      {
        id: 'c-3',
        postId: 'post-2',
        authorId: 'student-2',
        authorName: 'Aarav Patel',
        authorEmail: 'aarav.p@itm.ac.in',
        isMasked: false,
        maskAlias: 'Aarav Patel',
        content: 'Yes! Also practice the Booth multiplication numerical with negative multiplicand. That was in the sample paper.',
        createdAt: '3 hours ago',
        likes: 12,
      },
    ],
  },
  {
    id: 'post-3',
    authorId: 'user-masked-3',
    authorName: 'Kunal Verma',
    authorEmail: 'kunal.v@itm.ac.in',
    authorBranch: 'B.Tech CSE Sem 3',
    isMasked: true,
    maskAlias: 'Anonymous Student 🎭',
    category: 'Campus Confessions',
    content:
      'Confession: I skipped Friday 8:30 AM lecture just to finish my assignment, but thanks to the 75% attendance calculator on ITM Notes I checked first and knew I still have 3 safe bunks left without dropping below the threshold! 😅',
    createdAt: '6 hours ago',
    likes: 62,
    likedByMe: false,
    comments: [],
  },
  {
    id: 'post-4',
    authorId: 'student-2',
    authorName: 'Aarav Patel',
    authorEmail: 'aarav.p@itm.ac.in',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    authorBranch: 'B.Tech CSE Sem 3',
    isMasked: false,
    maskAlias: 'Aarav Patel',
    category: 'Projects & Tech',
    content:
      'Check out the new Practical Coding Lab with 94 complete runnable programs for C, Java, and Python! Tested all DSA problems with time complexity analysis. Perfect for preparing for external viva exams.',
    createdAt: '12 hours ago',
    likes: 53,
    likedByMe: false,
    comments: [],
  },
  {
    id: 'post-5',
    authorId: 'user-masked-4',
    authorName: 'Ananya Mehta',
    authorEmail: 'ananya.m@itm.ac.in',
    authorBranch: 'B.Tech CSE Sem 3',
    isMasked: true,
    maskAlias: 'Anonymous Student 🎭',
    category: 'College Feedback',
    content:
      'Can the college canteen please bring back hot filter coffee during afternoon breaks? Also the library study rooms need more charging outlets for laptops. Posting masked so we can get genuine student improvements done without red tape!',
    createdAt: '1 day ago',
    likes: 41,
    likedByMe: false,
    comments: [],
  },
];

const STORAGE_KEY = 'itm_campus_feed_posts';

export function getStoredPosts(): CommunityPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to parse community posts:', err);
  }
  // Initialize with seed posts
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_POSTS));
  return INITIAL_POSTS;
}

export function saveStoredPosts(posts: CommunityPost[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (err) {
    console.error('Failed to save community posts:', err);
  }
}
