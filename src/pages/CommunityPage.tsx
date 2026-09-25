import { useState, useMemo } from 'react';
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
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/hooks/useGamification';
import {
  CommunityPost,
  PostCategory,
  ClassmateProfile,
  INITIAL_CLASSMATES,
  getStoredPosts,
  saveStoredPosts,
} from '@/data/communityData';
import { FriendComparisonModal } from '@/components/FriendComparisonModal';

const CATEGORIES: PostCategory[] = [
  'College Feedback',
  'Campus Confessions',
  'Academic & Doubts',
  'Exam Survival & Tips',
  'Projects & Tech',
  'General Chill',
];

export default function CommunityPage() {
  const { user, profile, role } = useAuth();
  const { addXp } = useGamification();

  // Admin resolution: Maher or Admin role has God-Mode access to de-mask
  const isAdmin = useMemo(() => {
    if (role === 'admin') return true;
    const email = user?.email?.toLowerCase() || '';
    const name = profile?.display_name?.toLowerCase() || '';
    return email.includes('maher') || email.includes('admin') || name.includes('maher') || localStorage.getItem('itm_admin_god_mode') === 'true';
  }, [role, user, profile]);

  const [posts, setPosts] = useState<CommunityPost[]>(() => getStoredPosts());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'all' | 'masked' | 'feedback' | 'trending'>('all');
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  // New Post Form State
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<PostCategory>('College Feedback');
  const [isMasked, setIsMasked] = useState(false);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [commentMasked, setCommentMasked] = useState<Record<string, boolean>>({});

  // Comparison Modal State
  const [comparisonFriend, setComparisonFriend] = useState<ClassmateProfile | null>(null);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Author information
  const currentAuthorName = profile?.display_name || user?.email?.split('@')[0] || 'Maher Bhatt';
  const currentAuthorEmail = user?.email || 'maher@itm.ac.in';

  // Handle Create Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) {
      toast.error('Please enter something to post.');
      return;
    }

    if (postContent.trim().length < 5) {
      toast.error('Post content should be at least 5 characters long.');
      return;
    }

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorId: user?.id || `anon-${Date.now()}`,
      authorName: currentAuthorName,
      authorEmail: currentAuthorEmail,
      authorAvatar: profile?.avatar_url || undefined,
      authorBranch: "B.Tech CSE '26",
      isMasked: isMasked,
      maskAlias: 'Anonymous Student 🎭',
      category: postCategory,
      content: postContent.trim(),
      createdAt: 'Just now',
      likes: 1,
      likedByMe: true,
      comments: [],
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    saveStoredPosts(updated);
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
  };

  // Toggle Like on a Post
  const handleToggleLike = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const liked = !p.likedByMe;
        return {
          ...p,
          likedByMe: liked,
          likes: liked ? p.likes + 1 : Math.max(0, p.likes - 1),
        };
      }
      return p;
    });
    setPosts(updated);
    saveStoredPosts(updated);
  };

  // Add Comment to a Post
  const handleAddComment = (postId: string) => {
    const content = (commentInputs[postId] || '').trim();
    if (!content) return;

    const masked = Boolean(commentMasked[postId]);

    const newComment = {
      id: `c-${Date.now()}`,
      postId,
      authorId: user?.id || `user-${Date.now()}`,
      authorName: currentAuthorName,
      authorEmail: currentAuthorEmail,
      authorAvatar: profile?.avatar_url || undefined,
      isMasked: masked,
      maskAlias: 'Masked Student 🎭',
      content,
      createdAt: 'Just now',
      likes: 0,
    };

    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment],
        };
      }
      return p;
    });

    setPosts(updated);
    saveStoredPosts(updated);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    addXp(5);
    toast.success('Comment added (+5 XP)!');
  };

  // Delete Post (Admin or Author only)
  const handleDeletePost = (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    const updated = posts.filter((p) => p.id !== postId);
    setPosts(updated);
    saveStoredPosts(updated);
    toast.success('Post removed from feed.');
  };

  // Filtered Posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      if (activeTab === 'masked' && !p.isMasked) return false;
      if (activeTab === 'feedback' && p.category !== 'College Feedback') return false;
      if (activeTab === 'trending' && p.likes < 10) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      return true;
    });
  }, [posts, activeTab, selectedCategory]);

  const handleOpenComparison = (classmate: ClassmateProfile) => {
    setComparisonFriend(classmate);
    setIsComparisonOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 animate-fade-in">
        {/* Hero Section */}
        <div className="relative rounded-3xl p-6 sm:p-10 mb-8 overflow-hidden border border-border bg-gradient-to-br from-primary/10 via-purple-500/5 to-amber-500/10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-3">
                <Users className="h-3.5 w-3.5" />
                <span>ITM SLS Baroda University Campus Social</span>
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
              <div className="p-3.5 rounded-2xl bg-card/80 backdrop-blur border border-border text-center shadow-sm">
                <p className="text-xs text-muted-foreground font-medium">Campus Shield</p>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Shield className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm sm:text-base font-extrabold text-foreground">Anti-Retaliation</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">Mask hides public identity</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-card/80 backdrop-blur border border-border text-center shadow-sm">
                <p className="text-xs text-muted-foreground font-medium">Study Rivals</p>
                <div className="flex items-center justify-center gap-1.5 mt-1">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <span className="text-sm sm:text-base font-extrabold text-foreground">Compare Peers</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">75% Attendance & XP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid: Feed on Left (7 cols), Classmates on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Column: Feed ── */}
          <div className="lg:col-span-8 space-y-6">
            {/* Post Composer Card */}
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
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md ring-2 ring-purple-500/20'
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
                <div className="mb-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-900 dark:text-purple-200 flex items-start gap-2.5 animate-fade-in">
                  <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">🎭 Campus Mask Shield Enabled</p>
                    <p className="text-[11px] opacity-90 leading-relaxed mt-0.5">
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 transition-opacity apple-press shadow-sm"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Post to Campus (+15 XP)</span>
                  </button>
                </div>
              </form>
            </div>

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
                  🏛️ College Feedback
                </button>
                <button
                  onClick={() => setActiveTab('masked')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'masked'
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  🎭 Masked Only
                </button>
                <button
                  onClick={() => setActiveTab('trending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'trending'
                      ? 'bg-amber-500 text-white shadow-sm'
                      : 'bg-secondary/60 text-muted-foreground hover:text-foreground'
                  }`}
                >
                  🔥 Trending
                </button>
              </div>

              {/* Category Dropdown Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <Filter className="h-3.5 w-3.5 text-muted-foreground" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent font-medium text-muted-foreground hover:text-foreground outline-none cursor-pointer"
                >
                  <option value="All">All Topics</option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Posts Stream */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="p-10 rounded-2xl border border-dashed border-border text-center text-muted-foreground">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p className="font-semibold text-sm">No posts found in this section</p>
                  <p className="text-xs mt-1">Be the first student to start the conversation!</p>
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const isPostAuthor = user && post.authorId === user.id;
                  const canDelete = isAdmin || isPostAuthor;

                  return (
                    <div
                      key={post.id}
                      className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm hover:border-border transition-all space-y-4"
                    >
                      {/* Post Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {/* Avatar Display */}
                          {post.isMasked ? (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-900 to-indigo-700 flex items-center justify-center text-lg shadow-md border border-purple-400/30">
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
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                                  🎭 Masked Identity
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
                              {post.isMasked ? 'Mask Protected' : post.authorBranch || "B.Tech CSE '26"} ·{' '}
                              {post.createdAt}
                            </p>
                          </div>
                        </div>

                        {/* Top-Right Badge & Actions */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-secondary text-muted-foreground">
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

                        {/* Share */}
                        <button
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(
                                `"${post.content.slice(0, 100)}..." - Read more on ITM Notes Campus Feed!`
                              );
                              toast.success('Post text copied to clipboard!');
                            }
                          }}
                          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors p-1"
                          title="Share post"
                        >
                          <Share2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Share</span>
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
                                  ? 'bg-purple-600 text-white border-purple-500'
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
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* ── Right Column: Classmates & Comparison Hub ── */}
          <div className="lg:col-span-4 space-y-6">
            {/* Classmate Study Buddies Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-500" />
                  <h3 className="font-extrabold text-sm sm:text-base text-foreground">Classmates & Ranks</h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  CSE Sem 3
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">
                Click <strong>"Compare"</strong> on any classmate to benchmark your Level, Study Streak, and 75%
                Attendance buffer.
              </p>

              <div className="space-y-3">
                {INITIAL_CLASSMATES.map((student, idx) => (
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
                        <p className="font-bold text-xs text-foreground truncate">{student.name}</p>
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

                    <button
                      onClick={() => handleOpenComparison(student)}
                      className="px-2.5 py-1.5 rounded-xl bg-primary text-primary-foreground font-bold text-[11px] hover:opacity-90 apple-press shadow-sm shrink-0 transition-opacity"
                    >
                      Compare
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* University Anti-Retaliation Policy Card */}
            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5 space-y-3">
              <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold text-xs">
                <Lock className="h-4 w-4" />
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
      />
    </div>
  );
}
