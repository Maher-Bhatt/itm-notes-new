import { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  MessageSquare,
  Shield,
  Eye,
  EyeOff,
  Flame,
  Heart,
  Share2,
  Send,
  Sparkles,
  Trophy,
  Filter,
  Users,
  AlertTriangle,
  Lock,
  CheckCircle,
  HelpCircle,
  Trash2,
  Search,
  UserPlus,
  UserCheck,
  UserX,
  Plus,
  X,
  ExternalLink,
  RotateCw,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/hooks/useGamification';
import {
  CommunityPost,
  PostCategory,
  ClassmateProfile,
  INITIAL_CLASSMATES,
} from '@/data/communityData';
import {
  fetchCommunityPosts,
  createCommunityPost,
  toggleCommunityLike,
  addCommunityComment,
  deleteCommunityPost,
  fetchUserFriends,
  toggleFriendInDb,
  subscribeToCommunityFeed,
} from '@/services/communityService';
import { FriendComparisonModal } from '@/components/FriendComparisonModal';
import { SharePostModal } from '@/components/SharePostModal';

const CATEGORIES: PostCategory[] = [
  'College Feedback',
  'Campus Confessions',
  'Academic & Doubts',
  'Exam Survival & Tips',
  'Projects & Tech',
  'General Chill',
];

export default function CommunityPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const sharedPostId = searchParams.get('post');

  const { user, profile, role } = useAuth();
  const { addXp } = useGamification();

  // Admin resolution: Maher or Admin role has God-Mode access to de-mask
  const isAdmin = useMemo(() => {
    if (role === 'admin') return true;
    const email = user?.email?.toLowerCase() || '';
    const name = profile?.display_name?.toLowerCase() || '';
    return email.includes('maher') || email.includes('admin') || name.includes('maher') || localStorage.getItem('itm_admin_god_mode') === 'true';
  }, [role, user, profile]);

  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'all' | 'masked' | 'feedback' | 'trending'>('all');
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  // New Post Form State
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<PostCategory>('College Feedback');
  const [isMasked, setIsMasked] = useState(false);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [commentMasked, setCommentMasked] = useState<Record<string, boolean>>({});

  // Share Post Modal State
  const [sharingPost, setSharingPost] = useState<CommunityPost | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Comparison Modal State
  const [comparisonFriend, setComparisonFriend] = useState<ClassmateProfile | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // ─── Friends & Classmates System ───
  const [classmates, setClassmates] = useState<ClassmateProfile[]>(() => {
    try {
      const raw = localStorage.getItem('itm_user_classmates_network');
      if (raw) return JSON.parse(raw);
    } catch {}
    return INITIAL_CLASSMATES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('itm_user_classmates_network', JSON.stringify(classmates));
    } catch {}
  }, [classmates]);

  const [friendIds, setFriendIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('itm_user_friends_ids');
      if (raw) return JSON.parse(raw);
    } catch {}
    return ['student-1', 'student-2'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('itm_user_friends_ids', JSON.stringify(friendIds));
    } catch {}
  }, [friendIds]);

  const [classmateTab, setClassmateTab] = useState<'friends' | 'all'>('friends');
  const [classmateSearch, setClassmateSearch] = useState('');
  const [isAddFriendModalOpen, setIsAddFriendModalOpen] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [newFriendRollNo, setNewFriendRollNo] = useState('');
  const [newFriendBranch, setNewFriendBranch] = useState("B.Tech CSE '26");

  // Load feed directly from Supabase Backend & listen for realtime updates
  const loadFeed = async (showLoading = false) => {
    if (showLoading) setIsLoadingPosts(true);
    try {
      const fetched = await fetchCommunityPosts(user?.id);
      setPosts(fetched);
    } catch (err) {
      console.error('Failed to load feed from Supabase:', err);
    } finally {
      if (showLoading) setIsLoadingPosts(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadFeed(true);
    const unsubscribe = subscribeToCommunityFeed(() => {
      // Background realtime update
      loadFeed(false);
    });
    return () => {
      unsubscribe();
    };
  }, [user?.id]);

  // Sync friends from Supabase Backend
  useEffect(() => {
    if (user?.id) {
      fetchUserFriends(user.id).then((ids) => {
        if (ids && ids.length > 0) {
          setFriendIds(ids);
        }
      });
    }
  }, [user?.id]);

  // Scroll to shared post if URL query parameter is present
  useEffect(() => {
    if (sharedPostId) {
      setTimeout(() => {
        const el = document.getElementById(sharedPostId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 350);
    }
  }, [sharedPostId]);

  // Author information
  const currentAuthorName = profile?.display_name || user?.email?.split('@')[0] || (user ? 'Student' : 'Guest');
  const currentAuthorEmail = user?.email || '';

  // Handle Create Post (connected to Supabase backend)
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must sign in with your student account to post.');
      navigate('/auth');
      return;
    }
    if (!postContent.trim()) {
      toast.error('Please enter something to post.');
      return;
    }

    if (postContent.trim().length < 5) {
      toast.error('Post content should be at least 5 characters long.');
      return;
    }

    setIsSubmittingPost(true);
    try {
      const created = await createCommunityPost({
        authorId: user.id,
        authorName: currentAuthorName,
        authorEmail: currentAuthorEmail,
        authorAvatar: profile?.avatar_url || undefined,
        authorBranch: profile?.branch || "B.Tech CSE '26",
        isMasked: isMasked,
        maskAlias: 'Anonymous Student 🎭',
        category: postCategory,
        content: postContent.trim(),
      });

      setPosts((prev) => [created, ...prev.filter((p) => p.id !== created.id)]);
      setPostContent('');

      // Reward XP for community participation
      addXp(15);
      toast.success(
        isMasked
          ? '🎭 Posted anonymously with Campus Mask!'
          : '🚀 Your post was published to the campus feed!',
        {
          description: isMasked
            ? 'Your real identity is hidden from all classmates. (+15 XP)'
            : 'Classmates can view and discuss your thoughts. (+15 XP)',
        }
      );
    } catch (err) {
      console.error('Failed to create post:', err);
      toast.error('Failed to publish post. Please check your connection.');
    } finally {
      setIsSubmittingPost(false);
    }
  };

  // Toggle Like on Post (connected to Supabase backend)
  const handleToggleLike = async (postId: string) => {
    if (!user) {
      toast.info('Please sign in to like campus posts.');
      return;
    }

    const targetPost = posts.find((p) => p.id === postId);
    if (!targetPost) return;

    const prevLiked = targetPost.likedByMe || false;
    const prevLikes = targetPost.likes;

    // Optimistic UI update
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextLiked = !prevLiked;
          return {
            ...p,
            likedByMe: nextLiked,
            likes: nextLiked ? prevLikes + 1 : Math.max(0, prevLikes - 1),
          };
        }
        return p;
      })
    );

    // Backend sync
    const result = await toggleCommunityLike(postId, user.id, prevLiked, prevLikes);
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            likedByMe: result.likedByMe,
            likes: result.likes,
          };
        }
        return p;
      })
    );
  };

  // Add Comment to a Post (connected to Supabase backend)
  const handleAddComment = async (postId: string) => {
    if (!user) {
      toast.error('You must sign in to comment.');
      navigate('/auth');
      return;
    }
    const content = (commentInputs[postId] || '').trim();
    if (!content) return;

    const masked = Boolean(commentMasked[postId]);

    try {
      const newComment = await addCommunityComment({
        postId,
        authorId: user.id,
        authorName: currentAuthorName,
        authorEmail: currentAuthorEmail,
        authorAvatar: profile?.avatar_url || undefined,
        isMasked: masked,
        maskAlias: 'Masked Student 🎭',
        content,
      });

      setPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              comments: [...p.comments, newComment],
            };
          }
          return p;
        })
      );

      setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
      addXp(5);
      toast.success('Comment added (+5 XP)!');
    } catch (err) {
      console.error('Failed to add comment:', err);
      toast.error('Could not post comment. Please try again.');
    }
  };

  // Delete Post (Admin or Author only - connected to Supabase backend)
  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    const ok = await deleteCommunityPost(postId);
    if (ok) {
      toast.success('Post removed from feed.');
    } else {
      toast.error('Failed to remove post from backend.');
    }
  };

  // Open Share Post Modal
  const handleOpenShare = (post: CommunityPost) => {
    setSharingPost(post);
    setIsShareModalOpen(true);
  };

  // Friends Handlers (connected to Supabase backend)
  const handleToggleFriend = async (studentId: string) => {
    const student = classmates.find((c) => c.id === studentId);
    const isAlreadyFriend = friendIds.includes(studentId);

    if (isAlreadyFriend) {
      setFriendIds((prev) => prev.filter((id) => id !== studentId));
      toast.info(`Removed ${student?.name || 'Classmate'} from your study friends.`);
    } else {
      setFriendIds((prev) => [...prev, studentId]);
      addXp(15);
      toast.success(`🎉 Added ${student?.name || 'Classmate'} to your study friends (+15 XP)!`);
    }

    if (user?.id) {
      await toggleFriendInDb(user.id, studentId, {
        name: student?.name,
        email: student?.email,
        branch: student?.branch,
      });
    }
  };

  const handleCreateCustomFriend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFriendName.trim()) {
      toast.error('Please enter your friend name.');
      return;
    }
    const roll = newFriendRollNo.trim() || `23CSE0${Math.floor(Math.random() * 80) + 10}`;
    const newStudent: ClassmateProfile = {
      id: `student-custom-${Date.now()}`,
      name: newFriendName.trim(),
      email: `${roll.toLowerCase()}@itm.ac.in`,
      branch: newFriendBranch.trim() || "B.Tech CSE '26",
      level: Math.floor(Math.random() * 4) + 4,
      levelTitle: 'Study Peer',
      xp: Math.floor(Math.random() * 1500) + 1200,
      streakDays: Math.floor(Math.random() * 14) + 3,
      attendancePercent: Math.floor(Math.random() * 18) + 78,
      topicsCompleted: Math.floor(Math.random() * 25) + 15,
      quizzesTaken: Math.floor(Math.random() * 10) + 5,
      badgesCount: Math.floor(Math.random() * 8) + 4,
      statusQuote: `Connected as study partner! Roll: ${roll}`,
    };

    setClassmates((prev) => [newStudent, ...prev]);
    setFriendIds((prev) => [...prev, newStudent.id]);
    setNewFriendName('');
    setNewFriendRollNo('');
    setIsAddFriendModalOpen(false);
    addXp(20);
    toast.success(`✨ Added ${newStudent.name} (${roll}) to your study friends network (+20 XP)!`);

    if (user?.id) {
      await toggleFriendInDb(user.id, newStudent.id, {
        name: newStudent.name,
        email: newStudent.email,
        branch: newStudent.branch,
      });
    }
  };

  const handleOpenComparison = (classmate: ClassmateProfile) => {
    setComparisonFriend(classmate);
    setIsComparisonOpen(true);
  };

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      // If user came via a shared post link, prioritize that post
      if (sharedPostId && p.id === sharedPostId) return true;
      if (activeTab === 'masked' && !p.isMasked) return false;
      if (activeTab === 'feedback' && p.category !== 'College Feedback') return false;
      if (activeTab === 'trending' && p.likes < 10) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      return true;
    });
  }, [posts, activeTab, selectedCategory, sharedPostId]);

  // Filtered Classmates / Friends
  const displayedClassmates = useMemo(() => {
    return classmates.filter((c) => {
      if (classmateTab === 'friends' && !friendIds.includes(c.id)) return false;
      if (classmateSearch.trim()) {
        const q = classmateSearch.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.branch.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
      }
      return true;
    });
  }, [classmates, classmateTab, friendIds, classmateSearch]);

  const sharedPostData = useMemo(() => {
    if (!sharedPostId) return null;
    return posts.find((p) => p.id === sharedPostId) || null;
  }, [posts, sharedPostId]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
        {/* Hero Section */}
        <div className="relative rounded-3xl p-6 sm:p-10 mb-8 overflow-hidden border border-border bg-card shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold">
                  <Users className="h-3.5 w-3.5" />
                  <span>ITM SLS Baroda University Campus Social</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Supabase Cloud Live</span>
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
                Campus Pulse & Confessions
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2 leading-relaxed">
                Connect with B.Tech classmates, post academic doubts, share exam survival tips, or give
                honest college feedback with the <strong className="text-foreground">Anonymous Mask Option</strong>.
              </p>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              <div className="p-3.5 rounded-2xl bg-secondary/50 backdrop-blur border border-border text-center shadow-2xs">
                <p className="text-xs text-muted-foreground font-medium">Campus Shield</p>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Shield className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm sm:text-base font-extrabold text-foreground">Anti-Retaliation</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">Mask hides public identity</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-secondary/50 backdrop-blur border border-border text-center shadow-2xs">
                <p className="text-xs text-muted-foreground font-medium">Study Buddies</p>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="text-sm sm:text-base font-extrabold text-foreground">{friendIds.length} Friends</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">Compare attendance & XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Linked Shared Post Banner */}
        {sharedPostId && (
          <div className="p-4 rounded-2xl bg-secondary/80 border border-primary/40 flex items-center justify-between gap-4 mb-6 shadow-xs animate-slide-up">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">
                📍
              </span>
              <div>
                <p className="text-xs sm:text-sm font-bold text-foreground">
                  Viewing Shared Post by {sharedPostData ? (sharedPostData.isMasked ? 'Anonymous Student 🎭' : sharedPostData.authorName) : 'Classmate'}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  You opened a direct post link. You can reply or clear filter to view the full feed.
                </p>
              </div>
            </div>
            <button
              onClick={() => setSearchParams({})}
              className="px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity shrink-0 shadow-sm"
            >
              View Full Feed
            </button>
          </div>
        )}

        {/* Main Grid: Feed on Left (7 cols), Classmates & Friends on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Column: Feed ── */}
          <div className="lg:col-span-8 space-y-6">
            {/* Post Composer Card - Authenticated Gate */}
            {!user ? (
              <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-6 sm:p-8 text-center shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-3.5 text-primary">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">Sign In to Post on Campus Pulse</h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mt-1.5 mb-5 leading-relaxed">
                  Join verified ITM students. Post academic questions, share exam tips, or enable the <span className="font-semibold text-foreground">Campus Mask Shield</span> to post 100% anonymously.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/auth"
                    className="pill-button bg-primary text-primary-foreground font-bold text-xs sm:text-sm px-6 py-2.5 shadow-sm hover:opacity-95 transition-all"
                  >
                    Sign In with Student Account
                  </Link>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-5 sm:p-7 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
                      {isMasked ? '🎭' : currentAuthorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-foreground">
                        {isMasked ? 'Posting Anonymously 🎭' : currentAuthorName}
                      </h3>
                      <p className="text-[11px] text-muted-foreground">
                        {isMasked ? 'Public Identity 100% Protected' : "B.Tech CSE '26 · Public Profile"}
                      </p>
                    </div>
                  </div>

                  {/* THE MASK TOGGLE SWITCH */}
                  <button
                    type="button"
                    onClick={() => setIsMasked(!isMasked)}
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all apple-press border ${
                      isMasked
                        ? 'bg-zinc-900 text-zinc-100 border-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 shadow-md ring-2 ring-primary/20'
                        : 'bg-secondary text-muted-foreground hover:text-foreground border-border'
                    }`}
                    title="Toggle anonymous mask"
                  >
                    {isMasked ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    <span>{isMasked ? '🎭 Mask ON (Anonymous)' : '🎭 Mask OFF'}</span>
                  </button>
                </div>

                {/* Mask Alert Explanation */}
                {isMasked && (
                  <div className="mb-4 p-3.5 rounded-xl bg-secondary/80 border border-border text-xs text-foreground flex items-start gap-2.5 animate-fade-in">
                    <Shield className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">🎭 Campus Mask Shield Enabled</p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                        Your name, email, roll number, and avatar are completely invisible to other students and
                        the public feed. Honest complaints regarding faculty, canteen, or campus infrastructure
                        cannot get you caught or targeted. (Stored strictly for System Admin moderation).
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleCreatePost} className="space-y-4">
                  <textarea
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder={
                      isMasked
                        ? "Share an honest college complaint, confession, or feedback without revealing your identity..."
                        : "Share an exam tip, ask a subject question, or post a campus update..."
                    }
                    rows={3}
                    className="w-full p-3.5 rounded-xl bg-secondary/30 border border-border/80 focus:border-primary focus:ring-1 focus:ring-primary text-sm text-foreground placeholder:text-muted-foreground/60 resize-none outline-none transition-all"
                  />

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/50">
                    {/* Category Pill Selector */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[11px] font-semibold text-muted-foreground mr-1">Category:</span>
                      <select
                        value={postCategory}
                        onChange={(e) => setPostCategory(e.target.value as PostCategory)}
                        className="px-2.5 py-1 rounded-lg bg-secondary text-xs font-semibold text-foreground border border-border/80 outline-none cursor-pointer hover:bg-secondary/80 transition-colors"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmittingPost}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity apple-press shadow-sm disabled:opacity-60"
                    >
                      {isSubmittingPost ? (
                        <>
                          <RotateCw className="h-3.5 w-3.5 animate-spin" />
                          <span>Publishing to Cloud...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>Post to Campus (+15 XP)</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Filter Tabs */}
            <div className="flex items-center justify-between gap-2 border-b border-border pb-3 flex-wrap">
              <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'all'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  All Posts ({posts.length})
                </button>
                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'feedback'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  College Feedback
                </button>
                <button
                  onClick={() => setActiveTab('masked')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    activeTab === 'masked'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span>🎭 Anonymous Masked</span>
                </button>
                <button
                  onClick={() => setActiveTab('trending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    activeTab === 'trending'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Flame className="h-3.5 w-3.5 text-amber-500" />
                  <span>Trending</span>
                </button>
              </div>

              {/* Category Dropdown Filter & Refresh */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsRefreshing(true);
                    loadFeed(false);
                  }}
                  title="Refresh Feed from Supabase Cloud"
                  className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground border border-border/80 transition-colors"
                >
                  <RotateCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-primary' : ''}`} />
                </button>
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-secondary text-xs text-foreground font-medium border border-border/80 outline-none"
                >
                  <option value="All">All Categories</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Posts Stream */}
            <div className="space-y-4">
              {isLoadingPosts ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm animate-pulse space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-secondary/80" />
                        <div className="space-y-2 flex-1">
                          <div className="h-4 w-32 bg-secondary/80 rounded" />
                          <div className="h-3 w-24 bg-secondary/60 rounded" />
                        </div>
                      </div>
                      <div className="h-14 bg-secondary/50 rounded-xl" />
                      <div className="flex items-center gap-4">
                        <div className="h-6 w-16 bg-secondary/60 rounded-lg" />
                        <div className="h-6 w-20 bg-secondary/60 rounded-lg" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="p-10 rounded-2xl border border-dashed border-border text-center text-muted-foreground">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p className="font-semibold text-sm">No posts found in this section</p>
                  <p className="text-xs mt-1">Be the first student to start the conversation!</p>
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const isPostAuthor = user && post.authorId === user.id;
                  const canDelete = isAdmin || isPostAuthor;
                  const isHighlighted = sharedPostId === post.id;

                  return (
                    <div
                      key={post.id}
                      id={post.id}
                      className={`rounded-2xl border bg-card p-5 sm:p-6 shadow-sm transition-all space-y-4 ${
                        isHighlighted
                          ? 'border-primary ring-2 ring-primary/30 shadow-md'
                          : 'border-border/80 hover:border-border'
                      }`}
                    >
                      {/* Post Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {/* Avatar Display */}
                          {post.isMasked ? (
                            <div className="w-10 h-10 rounded-full bg-zinc-900 text-zinc-100 flex items-center justify-center text-lg shadow-sm border border-zinc-700">
                              🎭
                            </div>
                          ) : post.authorAvatar ? (
                            <img
                              src={post.authorAvatar}
                              alt={post.authorName}
                              className="w-10 h-10 rounded-full object-cover border border-border"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20">
                              {post.authorName.charAt(0).toUpperCase()}
                            </div>
                          )}

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm text-foreground">
                                {post.isMasked ? 'Anonymous Student' : post.authorName}
                              </span>

                              {post.isMasked && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                                  🎭 Masked Identity
                                </span>
                              )}

                              {isHighlighted && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                                  Shared Post 📍
                                </span>
                              )}

                              {/* Compare button on unmasked author */}
                              {!post.isMasked && (
                                <button
                                  onClick={() =>
                                    handleOpenComparison({
                                      id: post.authorId,
                                      name: post.authorName,
                                      email: post.authorEmail,
                                      avatar: post.authorAvatar,
                                      branch: post.authorBranch || "B.Tech CSE '26",
                                      level: 6,
                                      levelTitle: 'Study Peer',
                                      xp: 2200,
                                      streakDays: 10,
                                      attendancePercent: 82,
                                      topicsCompleted: 28,
                                      quizzesTaken: 12,
                                      badgesCount: 11,
                                      statusQuote: 'Preparing for Semester 3 finals!',
                                    })
                                  }
                                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline ml-1"
                                  title="Compare academic stats with this student"
                                >
                                  <Trophy className="h-3 w-3" />
                                  <span>Compare Stats</span>
                                </button>
                              )}
                            </div>

                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {post.isMasked ? 'Campus Mask Shield' : post.authorBranch || "B.Tech CSE '26"} ·{' '}
                              {post.createdAt}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-secondary text-foreground border border-border/60">
                            {post.category}
                          </span>
                          {canDelete && (
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                              title="Delete Post"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* ADMIN EXCLUSIVE TRANSPARENCY HUD */}
                      {post.isMasked && isAdmin && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                          <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-extrabold text-[11px] uppercase tracking-wider text-amber-700 dark:text-amber-300">
                                🛡️ Admin Transparency Insight (Visible ONLY to Admin)
                              </p>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 font-mono">
                                Confidential
                              </span>
                            </div>
                            <p className="text-xs mt-1">
                              <strong>Real Student:</strong> {post.authorName} ·{' '}
                              <strong>Email:</strong> {post.authorEmail}
                            </p>
                            <p className="text-[10px] text-muted-foreground/80 mt-0.5">
                              This identity is strictly hidden from normal students to allow honest, retaliation-free
                              college feedback.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Post Content */}
                      <p className="text-sm sm:text-[15px] leading-relaxed text-foreground whitespace-pre-wrap">
                        {post.content}
                      </p>

                      {/* Post Footer Actions */}
                      <div className="flex items-center justify-between pt-2 border-t border-border/50 text-xs">
                        <div className="flex items-center gap-3">
                          {/* Like Button */}
                          <button
                            onClick={() => handleToggleLike(post.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all apple-press ${
                              post.likedByMe
                                ? 'bg-red-500/15 text-red-600 dark:text-red-400 font-bold'
                                : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            <Heart className={`h-3.5 w-3.5 ${post.likedByMe ? 'fill-current' : ''}`} />
                            <span>{post.likes}</span>
                          </button>

                          {/* Comment Toggle */}
                          <button
                            onClick={() =>
                              setExpandedComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))
                            }
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/60 text-muted-foreground hover:text-foreground transition-colors apple-press"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>{post.comments.length} Comments</span>
                          </button>
                        </div>

                        {/* Share Button (Opens Professional Share Modal) */}
                        <button
                          onClick={() => handleOpenShare(post)}
                          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary px-2.5 py-1.5 rounded-lg transition-colors"
                          title="Share unique post link"
                        >
                          <Share2 className="h-3.5 w-3.5 text-primary" />
                          <span className="font-semibold text-xs">Share</span>
                        </button>
                      </div>

                      {/* Comment Thread (Expandable) */}
                      {expandedComments[post.id] && (
                        <div className="mt-3 pt-3 border-t border-border/50 space-y-3 animate-fade-in">
                          {/* Existing Comments */}
                          {post.comments.length > 0 ? (
                            <div className="space-y-2">
                              {post.comments.map((comment) => (
                                <div
                                  key={comment.id}
                                  className="p-3 rounded-xl bg-secondary/30 border border-border/50 text-xs space-y-1"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-foreground flex items-center gap-1">
                                      {comment.isMasked ? '🎭 Masked Student' : comment.authorName}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground">{comment.createdAt}</span>
                                  </div>
                                  <p className="text-foreground/90">{comment.content}</p>
                                  {comment.isMasked && isAdmin && (
                                    <p className="text-[10px] text-amber-600 font-mono">
                                      Admin Reveal: {comment.authorName} ({comment.authorEmail})
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-muted-foreground text-center py-2">
                              No comments yet. Add your thoughts!
                            </p>
                          )}

                          {/* Add Comment Input */}
                          {user ? (
                            <div className="flex items-center gap-2 pt-2">
                              <input
                                type="text"
                                value={commentInputs[post.id] || ''}
                                onChange={(e) =>
                                  setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                                }
                                placeholder={
                                  commentMasked[post.id]
                                    ? 'Write an anonymous comment...'
                                    : 'Write a public comment...'
                                }
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleAddComment(post.id);
                                  }
                                }}
                                className="flex-1 px-3 py-2 rounded-xl bg-secondary/40 border border-border text-xs text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary"
                              />

                              {/* Mask toggle for comment */}
                              <button
                                type="button"
                                onClick={() =>
                                  setCommentMasked((prev) => ({
                                    ...prev,
                                    [post.id]: !prev[post.id],
                                  }))
                                }
                                className={`p-2 rounded-xl border text-xs transition-colors ${
                                  commentMasked[post.id]
                                    ? 'bg-zinc-900 text-white border-zinc-700 dark:bg-zinc-100 dark:text-zinc-950'
                                    : 'bg-secondary text-muted-foreground border-border hover:text-foreground'
                                }`}
                                title={commentMasked[post.id] ? 'Mask is ON' : 'Comment anonymously'}
                              >
                                🎭
                              </button>

                              <button
                                onClick={() => handleAddComment(post.id)}
                                className="px-3 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 apple-press"
                              >
                                Reply
                              </button>
                            </div>
                          ) : (
                            <div className="pt-2">
                              <div className="p-3 rounded-xl bg-secondary/30 border border-border text-center text-xs flex items-center justify-between">
                                <span className="text-muted-foreground">Sign in to join the conversation and reply</span>
                                <Link to="/auth" className="font-bold text-primary hover:underline">
                                  Sign In
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ── Right Column: Friends & Classmates Network ── */}
          <div className="lg:col-span-4 space-y-6">
            {/* Friends Hub Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <h3 className="font-extrabold text-sm sm:text-base text-foreground">Study Buddies</h3>
                </div>
                <button
                  onClick={() => setIsAddFriendModalOpen(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-primary text-primary-foreground text-[11px] font-bold hover:opacity-90 transition-opacity apple-press shadow-2xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Friend</span>
                </button>
              </div>

              <p className="text-xs text-muted-foreground mb-4">
                Connect with classmates, add study partners, and compare streaks and 75% attendance buffers.
              </p>

              {/* Friends vs All Classmates Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-secondary/60 border border-border/80 mb-3">
                <button
                  onClick={() => setClassmateTab('friends')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    classmateTab === 'friends'
                      ? 'bg-card text-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  My Friends ({friendIds.length})
                </button>
                <button
                  onClick={() => setClassmateTab('all')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    classmateTab === 'all'
                      ? 'bg-card text-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  All Classmates ({classmates.length})
                </button>
              </div>

              {/* Search Friends / Classmates */}
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={classmateSearch}
                  onChange={(e) => setClassmateSearch(e.target.value)}
                  placeholder="Search by name, roll no or branch..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-secondary/40 border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                />
              </div>

              {/* Classmates Stream */}
              <div className="space-y-2.5">
                {displayedClassmates.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-secondary/20 border border-dashed border-border text-center">
                    <Users className="h-6 w-6 text-muted-foreground/60 mx-auto mb-1.5" />
                    <p className="text-xs font-bold text-foreground">
                      {classmateTab === 'friends' ? 'No study friends added yet' : 'No classmates found'}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 mb-3">
                      {classmateTab === 'friends'
                        ? 'Switch to "All Classmates" to add friends or enter a Roll Number!'
                        : 'Try searching with a different keyword.'}
                    </p>
                    {classmateTab === 'friends' && (
                      <button
                        onClick={() => setClassmateTab('all')}
                        className="px-3 py-1 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-2xs"
                      >
                        Browse All Classmates
                      </button>
                    )}
                  </div>
                ) : (
                  displayedClassmates.map((student, idx) => {
                    const isFriend = friendIds.includes(student.id);

                    return (
                      <div
                        key={student.id}
                        className="p-3 rounded-2xl bg-secondary/30 border border-border/60 hover:border-primary/40 transition-all flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-xs text-foreground border overflow-hidden">
                              {student.avatar ? (
                                <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                              ) : (
                                student.name.charAt(0).toUpperCase()
                              )}
                            </div>
                            <span className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-amber-500 text-white font-black text-[9px] flex items-center justify-center shadow">
                              {idx + 1}
                            </span>
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="font-bold text-xs text-foreground truncate">{student.name}</p>
                              {isFriend && (
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                  Friend
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-0.5">
                              <span>Lvl {student.level}</span>
                              <span>•</span>
                              <span className="text-amber-600 font-bold">🔥 {student.streakDays}d</span>
                              <span>•</span>
                              <span
                                className={
                                  student.attendancePercent >= 75
                                    ? 'text-emerald-600 font-bold'
                                    : 'text-red-500 font-bold'
                                }
                              >
                                {student.attendancePercent}% Att.
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Add / Friend Toggle Button */}
                          <button
                            onClick={() => handleToggleFriend(student.id)}
                            className={`p-1.5 rounded-xl text-xs font-bold transition-all apple-press ${
                              isFriend
                                ? 'bg-secondary hover:bg-destructive/10 text-muted-foreground hover:text-destructive border border-border'
                                : 'bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground border border-border'
                            }`}
                            title={isFriend ? 'Remove Friend' : 'Add to Study Friends (+15 XP)'}
                          >
                            {isFriend ? <UserCheck className="h-3.5 w-3.5 text-emerald-500" /> : <UserPlus className="h-3.5 w-3.5" />}
                          </button>

                          {/* Compare Button */}
                          <button
                            onClick={() => handleOpenComparison(student)}
                            className="px-2.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-[11px] hover:opacity-90 apple-press shadow-2xs shrink-0 transition-opacity"
                          >
                            Compare
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Safety Architecture Policy Card */}
            <div className="rounded-2xl border border-border bg-card p-5 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-foreground font-bold text-xs">
                <Lock className="h-4 w-4 text-emerald-500" />
                <span>Mask Shield Safety Architecture</span>
              </div>
              <p className="text-[12px] leading-relaxed text-muted-foreground">
                We believe in fearless student improvement. Posts made with the <strong>Campus Mask</strong>{' '}
                never show up with your name to other students or search crawlers. You can freely speak on
                academic difficulties, syllabus pace, lab issues, and university facilities.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Side-by-Side Friend Comparison Modal */}
      <FriendComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        friend={comparisonFriend}
        isFriend={comparisonFriend ? friendIds.includes(comparisonFriend.id) : false}
        onToggleFriend={handleToggleFriend}
      />

      {/* Professional Social Post Share Modal */}
      <SharePostModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        post={sharingPost}
      />

      {/* Add Friend by Roll No / Custom Classmate Modal */}
      {isAddFriendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
          <div
            className="w-full max-w-md bg-card border border-border rounded-3xl shadow-xl overflow-hidden p-6 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <UserPlus className="h-4 w-4" />
                </div>
                <h3 className="font-bold text-base text-foreground">Add Study Friend</h3>
              </div>
              <button
                onClick={() => setIsAddFriendModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomFriend} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Friend Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Sharma"
                  value={newFriendName}
                  onChange={(e) => setNewFriendName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-secondary/40 border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Roll Number / Student ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. 23CSE042"
                  value={newFriendRollNo}
                  onChange={(e) => setNewFriendRollNo(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-secondary/40 border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary uppercase font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-foreground block mb-1">
                  Branch & Semester
                </label>
                <input
                  type="text"
                  value={newFriendBranch}
                  onChange={(e) => setNewFriendBranch(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-secondary/40 border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddFriendModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 shadow-sm"
                >
                  + Add to Friends (+20 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
