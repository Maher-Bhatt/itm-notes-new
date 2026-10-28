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
  universityId?: string;
  universityName?: string;
  universityBadge?: string;
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
  tags?: string[];
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

// Only block malicious garbage strings, never block genuine student discussions
export function isFakePost(p: any): boolean {
  if (!p) return false;
  const content = typeof p.content === 'string' ? p.content : '';
  if (content.includes('DROP TABLE') || content.includes('UNION SELECT')) return true;
  return false;
}

export const INITIAL_CLASSMATES: ClassmateProfile[] = [
  {
    id: "classmate-1",
    name: "Maher Bhatt",
    email: "maherbhatt01@gmail.com",
    avatar: "https://woclidkjrzlquncudfuj.supabase.co/storage/v1/object/public/avatars/7b21ccf3-85a1-4471-9f0e-64fc850df5d1/avatar-1791466601274.jpg",
    branch: "Computer Science & Engineering",
    level: 7,
    levelTitle: "Campus Architect",
    xp: 3420,
    streakDays: 14,
    attendancePercent: 88,
    topicsCompleted: 64,
    quizzesTaken: 42,
    badgesCount: 9,
    statusQuote: "Building CampusLoop for all Indian technical universities.",
    role: "admin"
  },
  {
    id: "classmate-2",
    name: "Diya Shah",
    email: "diya.design@itmsls.edu.in",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    branch: "Design & UX · Year 2",
    level: 4,
    levelTitle: "UI Craftsperson",
    xp: 1850,
    streakDays: 8,
    attendancePercent: 92,
    topicsCompleted: 38,
    quizzesTaken: 19,
    badgesCount: 5,
    statusQuote: "Leading design critique sprints every Friday."
  },
  {
    id: "classmate-3",
    name: "Aarav Mehta",
    email: "aarav.mehta@itmsls.edu.in",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80",
    branch: "B.Tech CSE · Year 2",
    level: 5,
    levelTitle: "Algorithmic Solver",
    xp: 2240,
    streakDays: 11,
    attendancePercent: 84,
    topicsCompleted: 45,
    quizzesTaken: 28,
    badgesCount: 6,
    statusQuote: "Mastering LeetCode trees & graphs one dry run at a time."
  }
];

export const MULTI_CAMPUS_POSTS: CommunityPost[] = [
  {
    id: "post-campusloop-welcome",
    authorId: "admin-maher",
    authorName: "Maher Bhatt",
    authorEmail: "maherbhatt01@gmail.com",
    authorAvatar: "https://woclidkjrzlquncudfuj.supabase.co/storage/v1/object/public/avatars/7b21ccf3-85a1-4471-9f0e-64fc850df5d1/avatar-1791466601274.jpg",
    authorBranch: "B.Tech CSE · Year 2",
    universityId: "itm-baroda",
    universityName: "ITM (SLS) Baroda University",
    universityBadge: "ITM SLS Baroda",
    isMasked: false,
    maskAlias: "Maher",
    category: "Projects & Tech",
    content: "Welcome to CampusLoop! We just expanded our academic suite to cover 15+ B.Tech subjects and 30 BCA subjects semester-wise with full handwritten notes, KaTeX proofs, runnable code labs, and solved university PYQs.\n\nBrowse by your university or explore all India campuses right from the top switcher. Feedback & pull requests welcome!",
    createdAt: "Just now",
    likes: 42,
    likedByMe: true,
    pinned: true,
    isVerified: true,
    verifiedBy: "Campus Admin",
    tags: ["#CampusLoop", "#AcademicSuite", "#BTech", "#BCA"],
    comments: [
      {
        id: "c-welcome-1",
        postId: "post-campusloop-welcome",
        authorId: "diya-102",
        authorName: "Diya Shah",
        authorEmail: "diya@itmsls.edu.in",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        isMasked: false,
        maskAlias: "Diya",
        content: "The clean warm canvas and typography look so good! Great work.",
        createdAt: "5 mins ago",
        likes: 6
      }
    ]
  },
  {
    id: "post-diya-design-review",
    authorId: "student-diya",
    authorName: "Diya Shah",
    authorEmail: "diya.design@itmsls.edu.in",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    authorBranch: "Design Club · 2h",
    universityId: "itm-baroda",
    universityName: "ITM (SLS) Baroda University",
    universityBadge: "ITM SLS Baroda",
    isMasked: false,
    maskAlias: "Diya",
    category: "Projects & Tech",
    content: "Portfolio review night this Friday at Innovation Lab! Bring one project and get live design feedback from three graduating seniors. 30 seats available.\n\nRSVP in the Explore tab so we can arrange adequate pizza & drinks.",
    createdAt: "2 hours ago",
    likes: 84,
    likedByMe: false,
    comments: [
      {
        id: "c-diya-1",
        postId: "post-diya-design-review",
        authorId: "aarav-201",
        authorName: "Aarav Mehta",
        authorEmail: "aarav@itmsls.edu.in",
        isMasked: false,
        maskAlias: "Aarav",
        content: "Can we present our Figma prototypes directly on the big screen?",
        createdAt: "1 hour ago",
        likes: 3
      }
    ]
  },
  {
    id: "post-rohan-robotics",
    authorId: "student-rohan",
    authorName: "Rohan Desai",
    authorEmail: "rohan.robotics@itmsls.edu.in",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    authorBranch: "Robotics Club · 4h",
    universityId: "itm-baroda",
    universityName: "ITM (SLS) Baroda University",
    universityBadge: "ITM SLS Baroda",
    isMasked: false,
    maskAlias: "Rohan",
    category: "Projects & Tech",
    content: "Build Sprint registrations are officially open! Teams of 2 to 4, hardware kits (ESP32, motor drivers, sensor shields) provided by the club on us. Kickoff is next Tuesday in Lab 4.\n\nAny branch can join — first-years welcome!",
    createdAt: "4 hours ago",
    likes: 67,
    likedByMe: false,
    comments: []
  },
  {
    id: "post-parul-hackathon",
    authorId: "parul-student-1",
    authorName: "Harshil Trivedi",
    authorEmail: "harshil.t@paruluniversity.ac.in",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    authorBranch: "B.Tech IT · Year 3",
    universityId: "parul",
    universityName: "Parul University",
    universityBadge: "Parul University",
    isMasked: false,
    maskAlias: "Harshil",
    category: "Projects & Tech",
    content: "Looking for 1 frontend dev (React/Tailwind) and 1 ML student for Gujarat Smart Hackathon 2026. Our problem statement is AI-powered traffic congestion prediction for Vadodara Municipal Corporation. DM if interested!",
    createdAt: "5 hours ago",
    likes: 38,
    likedByMe: false,
    comments: [
      {
        id: "c-parul-1",
        postId: "post-parul-hackathon",
        authorId: "tanvi-parul",
        authorName: "Tanvi Patel",
        authorEmail: "tanvi@paruluniversity.ac.in",
        isMasked: false,
        maskAlias: "Tanvi",
        content: "Hey Harshil, I have experience with YOLOv8 and OpenCV. Sent you a DM in Messages!",
        createdAt: "3 hours ago",
        likes: 2
      }
    ]
  },
  {
    id: "post-gtu-exam-circular",
    authorId: "gtu-mod-1",
    authorName: "Devendra Solanki",
    authorEmail: "devendra@gtu.ac.in",
    authorAvatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
    authorBranch: "B.Tech Mechanical · Year 4",
    universityId: "gtu",
    universityName: "Gujarat Technological University",
    universityBadge: "GTU Gujarat",
    isMasked: false,
    maskAlias: "Devendra",
    category: "Exam Survival & Tips",
    content: "Official GTU Circular Update: Summer 2026 regular and remedial theory examinations will commence from May 18. Practical exams will be held at your respective zone institutes between May 2 to May 12.\n\nMake sure to verify your hall tickets on the student portal.",
    createdAt: "6 hours ago",
    likes: 112,
    likedByMe: false,
    isVerified: true,
    verifiedBy: "GTU Student Rep",
    comments: []
  },
  {
    id: "post-iitb-ecell",
    authorId: "iitb-ambassador",
    authorName: "Siddharth Nair",
    authorEmail: "siddharth@iitb.ac.in",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    authorBranch: "E-Cell IIT Bombay",
    universityId: "iit-bombay",
    universityName: "IIT Bombay",
    universityBadge: "IIT Bombay",
    isMasked: false,
    maskAlias: "Siddharth",
    category: "Projects & Tech",
    content: "Eureka! Asia's largest Business Model Competition by E-Cell IIT Bombay is inviting College Ambassadors from all colleges in Gujarat (ITM, GTU, Parul, Nirma, MSU). Perks include exclusive mentorship from Sequoia & Accel partners, certificates, and free entry to E-Summit '26 in Mumbai. Apply via link in thread!",
    createdAt: "8 hours ago",
    likes: 145,
    likedByMe: false,
    comments: []
  },
  {
    id: "post-nirma-robotics",
    authorId: "nirma-lead",
    authorName: "Pravesh Shah",
    authorEmail: "pravesh@nirmauni.ac.in",
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    authorBranch: "Robotics & Automation · Year 3",
    universityId: "nirma",
    universityName: "Nirma University",
    universityBadge: "Nirma Ahmedabad",
    isMasked: false,
    maskAlias: "Pravesh",
    category: "Projects & Tech",
    content: "PRAVEG 2026 National Robotics Challenge rulebook has been released! Combat robotics (15kg & 30kg featherweight), Robo-Soccer, and Maze Solver competitions with ₹3.5 Lakh total cash prizes. All Gujarat technical university teams get free hostel stay on campus.",
    createdAt: "12 hours ago",
    likes: 93,
    likedByMe: false,
    comments: []
  },
  {
    id: "post-msu-fte-contest",
    authorId: "msu-student",
    authorName: "Riddhi Parmar",
    authorEmail: "riddhi.fte@msubaroda.ac.in",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    authorBranch: "Computer Engineering · Year 3",
    universityId: "msu-baroda",
    universityName: "MSU Baroda (FTE)",
    universityBadge: "MSU Baroda",
    isMasked: false,
    maskAlias: "Riddhi",
    category: "Exam Survival & Tips",
    content: "Faculty of Technology & Engineering (MSU Baroda) is hosting an inter-college algorithmic battle on HackerEarth this Saturday 6:00 PM - 8:30 PM. 5 DSA problems from medium to hard. Best way to prep for campus placement coding rounds!",
    createdAt: "Yesterday",
    likes: 76,
    likedByMe: false,
    comments: []
  },
  {
    id: "post-bca-java-notes",
    authorId: "pooja-bca",
    authorName: "Pooja Patel",
    authorEmail: "pooja.patel@itmsls.edu.in",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    authorBranch: "BCA · Semester 4",
    universityId: "itm-baroda",
    universityName: "ITM (SLS) Baroda University",
    universityBadge: "ITM SLS Baroda",
    isMasked: false,
    maskAlias: "Pooja",
    category: "Academic & Doubts",
    content: "Just finished going through the newly uploaded BCA Semester 4 Java & Web Tech practicals in the Coding Lab! The step-by-step testcases and execution blueprints make JDBC and Servlets so much easier to understand. Kudos to whoever contributed!",
    createdAt: "Yesterday",
    likes: 54,
    likedByMe: false,
    comments: []
  }
];

export const INITIAL_POSTS: CommunityPost[] = MULTI_CAMPUS_POSTS;

const STORAGE_KEY = 'itm_campus_feed_posts';

export function getStoredPosts(): CommunityPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter((p) => !isFakePost(p));
      }
    }
  } catch (err) {
    console.error('Failed to parse community posts:', err);
  }
  return MULTI_CAMPUS_POSTS;
}

export function saveStoredPosts(posts: CommunityPost[]): void {
  try {
    const clean = Array.isArray(posts) ? posts.filter((p) => !isFakePost(p)) : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clean));
  } catch (err) {
    console.error('Failed to save community posts:', err);
  }
}
