import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useGamification } from "@/hooks/useGamification";
import {
  MessageSquare,
  ThumbsUp,
  Share2,
  Send,
  Sparkles,
  Search,
  CheckCircle,
  TrendingUp,
  Flame,
  Users,
  Image as ImageIcon,
  Smile,
  MoreHorizontal,
  ChevronRight,
  ExternalLink,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Globe,
  Heart,
  Loader2,
  Check,
  Award
} from "lucide-react";
import { toast } from "sonner";
import {
  fetchCommunityPosts,
  createCommunityPost,
  toggleCommunityLike,
  addCommunityComment,
  deleteCommunityPost,
  subscribeToCommunityFeed,
  fetchUserFriends,
  toggleFriendInDb,
} from "@/services/communityService";
import { CommunityPost, CommunityComment } from "@/data/communityData";
import { SharePostModal } from "@/components/SharePostModal";
import { UserAvatar, resolveAvatarUrl, MAHER_CANONICAL_AVATAR } from "@/components/UserAvatar";

// Initial seed posts matching Screenshot 5 design
const INITIAL_RICH_POSTS: CommunityPost[] = [
  {
    id: "post-maher-verified",
    authorId: "admin-maher",
    authorName: "Maher Bhatt",
    authorEmail: "maherbhatt01@gmail.com",
    authorAvatar: MAHER_CANONICAL_AVATAR,
    authorBranch: "Director / Admin · Computer Science",
    isMasked: false,
    maskAlias: "Maher Bhatt",
    category: "College Feedback" as any,
    createdAt: "Yesterday at 15:04",
    likes: 42,
    likedByMe: false,
    pinned: true,
    content: "Welcome to Campus Pulse! This campus community is made for all students to collaborate, exchange verified MST-1 question banks, and share exam insights. Feel free to request notes or discuss practicals here!",
    linkUrl: "https://checkitoutlive.com",
    verified: true,
    comments: [
      {
        id: "c-101",
        postId: "post-maher-verified",
        authorId: "student-aarav",
        authorName: "Aarav Patel",
        authorEmail: "aarav.p@itm.ac.in",
        authorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100",
        isMasked: false,
        maskAlias: "Aarav Patel",
        content: "Super excited for this! The DSA questions bank is a lifesaver.",
        createdAt: "Yesterday",
        likes: 4
      }
    ]
  },
  {
    id: "post-study-buddies",
    authorId: "group-buddies",
    authorName: "Study Buddies",
    authorEmail: "studybuddies@itm.ac.in",
    authorAvatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100",
    authorBranch: "Campus Study Circle",
    isMasked: false,
    maskAlias: "Study Buddies",
    category: "Community" as any,
    createdAt: "Yesterday at 10:48",
    likes: 88,
    likedByMe: true,
    pinned: false,
    content: "Exciting thing for the semester! We are gathering for group study on Chapter 3 Matrix Algebra and Tree Traversal algorithms on the campus green lawn. Come join us! 😊",
    mediaUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop",
    verified: false,
    comments: [
      {
        id: "c-102",
        postId: "post-study-buddies",
        authorId: "student-diya",
        authorName: "Diya Sharma",
        authorEmail: "diya.s@itm.ac.in",
        authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        isMasked: false,
        maskAlias: "Diya Sharma",
        content: "Count me in! Bringing solved BCA question papers.",
        createdAt: "Yesterday",
        likes: 7
      }
    ]
  }
];

export default function CommunityPage() {
  const navigate = useNavigate();
  const { user, profile, role } = useAuth();
  const { addXp } = useGamification();

  // Consistent User Avatar & Identity resolution using canonical resolver
  const currentUserAvatar = useMemo(() => {
    return resolveAvatarUrl(profile, user);
  }, [profile, user]);

  const currentUserName = useMemo(() => {
    return profile?.display_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Maher Bhatt";
  }, [profile, user]);

  const isAdmin = useMemo(() => {
    return role === "admin" || user?.email?.toLowerCase() === "maherbhatt01@gmail.com";
  }, [role, user]);

  // Feed State
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    try {
      const cached = localStorage.getItem("itm_campus_feed_posts");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_RICH_POSTS;
  });

  const [isLoadingPosts, setIsLoadingPosts] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("Community");
  const [sortFilter, setSortFilter] = useState("Latest Posts");
  const [postCardType, setPostCardType] = useState<"Campus" | "Videos" | "Polls">("Campus");

  // Create Post State
  const [newPostText, setNewPostText] = useState("");
  const [isMaskedPost, setIsMaskedPost] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Comments & Interaction State
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [shareModalPost, setShareModalPost] = useState<CommunityPost | null>(null);

  // Study Friends State
  const [connectedFriendIds, setConnectedFriendIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem("itm_user_friends_ids");
      if (raw) return new Set(JSON.parse(raw));
    } catch {}
    return new Set(["friend-khalid"]);
  });

  // Load feed from Supabase Backend with local fallback
  const loadFeed = useCallback(async (showLoading = false) => {
    if (showLoading) setIsLoadingPosts(true);
    try {
      const remote = await fetchCommunityPosts(user?.id);
      if (remote && remote.length > 0) {
        // Merge with initial rich sample posts to guarantee verified design posts remain present
        const combined = [...remote, ...INITIAL_RICH_POSTS];
        const unique = Array.from(new Map(combined.map((p) => [p.id, p])).values());
        
        // Dynamically inject current user's avatar for Maher Bhatt posts if missing
        const normalized = unique.map((p) => {
          if (p.authorName === "Maher Bhatt" || p.authorId === "admin-maher") {
            return {
              ...p,
              authorAvatar: currentUserAvatar || MAHER_CANONICAL_AVATAR,
              verified: true,
            };
          }
          return p;
        });

        setPosts(normalized);
        try {
          localStorage.setItem("itm_campus_feed_posts", JSON.stringify(normalized));
        } catch {}
      }
    } catch (err) {
      console.warn("Using offline feed data:", err);
    } finally {
      if (showLoading) setIsLoadingPosts(false);
    }
  }, [user?.id, currentUserAvatar]);

  // Initial feed load and Realtime Subscription
  useEffect(() => {
    loadFeed(true);
    const unsubscribe = subscribeToCommunityFeed(() => {
      loadFeed(false);
    });
    return () => {
      unsubscribe();
    };
  }, [loadFeed]);

  // Load User Friends
  useEffect(() => {
    if (user?.id) {
      fetchUserFriends(user.id).then((ids) => {
        if (ids && ids.length > 0) {
          setConnectedFriendIds(new Set(ids));
        }
      });
    }
  }, [user?.id]);

  // Create Post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    setIsSubmitting(true);
    const postCategory = activeCategoryFilter === "Confessions" ? "Campus Confessions" : "College Feedback";

    const newPostData = {
      authorId: user?.id || "student-local",
      authorName: currentUserName,
      authorEmail: user?.email || undefined,
      authorAvatar: currentUserAvatar || MAHER_CANONICAL_AVATAR,
      authorBranch: profile?.branch || "Computer Science & Engineering",
      isMasked: isMaskedPost || activeCategoryFilter === "Confessions",
      maskAlias: isMaskedPost || activeCategoryFilter === "Confessions" ? "Anonymous Student 🎭" : currentUserName,
      category: postCategory,
      content: newPostText.trim(),
    };

    // Optimistic UI insert
    const tempPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorId: newPostData.authorId,
      authorName: newPostData.authorName,
      authorEmail: newPostData.authorEmail || "",
      authorAvatar: newPostData.authorAvatar,
      authorBranch: newPostData.authorBranch,
      isMasked: newPostData.isMasked,
      maskAlias: newPostData.maskAlias,
      category: newPostData.category as any,
      content: newPostData.content,
      createdAt: "Just now",
      likes: 1,
      likedByMe: true,
      comments: [],
      verified: isAdmin,
    };

    setPosts((prev) => [tempPost, ...prev]);
    setNewPostText("");
    setIsSubmitting(false);
    addXp(25);
    toast.success("Post published to Campus Pulse! +25 XP 🔥");

    // Sync to Supabase Backend
    try {
      const persisted = await createCommunityPost(newPostData);
      setPosts((prev) => prev.map((p) => (p.id === tempPost.id ? { ...p, id: persisted.id } : p)));
    } catch (err) {
      console.warn("Supabase post sync fallback to local cache:", err);
    }
  };

  // Like Toggle
  const handleToggleLike = async (postId: string) => {
    const targetPost = posts.find((p) => p.id === postId);
    if (!targetPost) return;

    const isLiked = !!targetPost.likedByMe;
    const currentLikes = targetPost.likes || 0;
    const nextLikes = isLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1;

    // Optimistic state update
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likedByMe: !isLiked, likes: nextLikes } : p))
    );
    toast.success(isLiked ? "Like removed" : "Liked post! ❤️");

    // Sync to Supabase
    try {
      await toggleCommunityLike(postId, user?.id || "guest-user", isLiked, currentLikes);
    } catch (err) {
      console.warn("Failed to sync like with backend:", err);
    }
  };

  // Add Comment
  const handleAddComment = async (postId: string) => {
    if (!commentInput.trim()) return;

    setIsSubmittingComment(true);
    const newCommentData = {
      postId,
      authorId: user?.id || "student-local",
      authorName: currentUserName,
      authorEmail: user?.email || undefined,
      authorAvatar: currentUserAvatar || MAHER_CANONICAL_AVATAR,
      isMasked: false,
      maskAlias: currentUserName,
      content: commentInput.trim(),
    };

    const optimisticComment: CommunityComment = {
      id: `c-${Date.now()}`,
      postId,
      authorId: newCommentData.authorId,
      authorName: newCommentData.authorName,
      authorEmail: newCommentData.authorEmail || "",
      authorAvatar: newCommentData.authorAvatar,
      isMasked: false,
      maskAlias: newCommentData.maskAlias,
      content: newCommentData.content,
      createdAt: "Just now",
      likes: 0,
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...(p.comments || []), optimisticComment],
          };
        }
        return p;
      })
    );

    setCommentInput("");
    setIsSubmittingComment(false);
    addXp(5);
    toast.success("Comment posted! (+5 XP)");

    // Sync to Supabase
    try {
      await addCommunityComment(newCommentData);
    } catch (err) {
      console.warn("Failed to sync comment with backend:", err);
    }
  };

  // Delete Post
  const handleDeletePost = async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    toast.success("Post removed.");
    try {
      await deleteCommunityPost(postId);
    } catch (err) {
      console.warn("Failed to delete post from Supabase:", err);
    }
  };

  // Friend Connect Toggle
  const handleToggleFriend = async (friendId: string, friendName: string) => {
    const isConnected = connectedFriendIds.has(friendId);
    setConnectedFriendIds((prev) => {
      const next = new Set(prev);
      if (isConnected) next.delete(friendId);
      else next.add(friendId);
      try {
        localStorage.setItem("itm_user_friends_ids", JSON.stringify(Array.from(next)));
      } catch {}
      return next;
    });

    toast.success(isConnected ? `Disconnected from ${friendName}` : `Connected with ${friendName}! 🎉`);

    if (user?.id) {
      try {
        await toggleFriendInDb(user.id, friendId, { name: friendName });
      } catch (err) {
        console.warn("Friend sync error:", err);
      }
    }
  };

  // Filtered and Sorted Posts
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        if (activeCategoryFilter === "Community") return true;
        if (activeCategoryFilter === "Confessions") return post.category === "Campus Confessions" || post.isMasked;
        return post.category === activeCategoryFilter;
      })
      .sort((a, b) => {
        if (sortFilter === "Most Liked") return (b.likes || 0) - (a.likes || 0);
        if (sortFilter === "Discussions") return (b.comments?.length || 0) - (a.comments?.length || 0);
        return 0; // Default order
      });
  }, [posts, activeCategoryFilter, sortFilter]);

  const categoryPills = [
    { label: "👥 Community", value: "Community" },
    { label: "💬 Confessions", value: "Confessions" },
    { label: "🎓 Exchange", value: "Exchange" },
    { label: "🏢 Standards", value: "Standards" },
    { label: "🏆 Competition", value: "Competition" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 animate-fade-in text-foreground">
      {/* ── TOP HEADER SECTION ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-border/60">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            Campus Pulse & Confessions
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time student discussions, study group calls, and university announcements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/materials"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-xl border border-primary/20"
          >
            <span>Academic Media</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* ── CATEGORY FILTER PILL BAR ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categoryPills.map((pill) => {
          const isActive = activeCategoryFilter === pill.value;
          return (
            <button
              key={pill.value}
              onClick={() => setActiveCategoryFilter(pill.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-xs cursor-pointer ${
                isActive
                  ? "bg-brand-forest text-white shadow-brand-forest/30 scale-[1.02] border border-brand-chartreuse/40"
                  : "bg-secondary text-foreground hover:bg-secondary/80 border border-border/60"
              }`}
            >
              {pill.label}
            </button>
          );
        })}

        <div className="ml-auto hidden sm:block">
          <select
            value={sortFilter}
            onChange={(e) => setSortFilter(e.target.value)}
            className="h-9 px-3 rounded-xl border border-input bg-card text-xs font-semibold text-foreground outline-none cursor-pointer hover:border-primary/50"
          >
            <option value="Latest Posts">Latest Posts</option>
            <option value="Most Liked">Most Liked</option>
            <option value="Discussions">Discussions</option>
          </select>
        </div>
      </div>

      {/* ── THREE-COLUMN SOCIAL LAYOUT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── COLUMN 1: CAMPUS HIGHLIGHTS & BUDDIES (lg:col-span-3) ── */}
        <div className="lg:col-span-3 space-y-5">
          {/* 1. Campus Hero Image Card */}
          <div className="rounded-2xl overflow-hidden relative shadow-md h-52 bg-slate-900 border border-border group">
            <img
              src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&h=400&fit=crop"
              alt="ITM Campus"
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 text-white backdrop-blur-md border border-white/20">
                ITM / 2026
              </span>
            </div>

            <div className="absolute top-3 right-3">
              <button
                onClick={() => toast.info("Opening ITM Campus Desk...")}
                className="w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/80 transition-colors cursor-pointer"
                title="Search campus"
              >
                <Search className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
              <h3 className="font-bold text-sm tracking-tight">Campus Pulse & Confessions</h3>
              <p className="text-[11px] text-slate-300">Find campus AI Desk or look at feed</p>
            </div>
          </div>

          {/* 2. Campus Trends & Tags Card */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-foreground">Campus Trends</h3>

            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setActiveCategoryFilter("Community")}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20 hover:scale-105 transition-transform cursor-pointer"
              >
                🔥 Campus
              </button>
              <button
                onClick={() => toast.info("Filtering Academic Test discussions")}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:scale-105 transition-transform cursor-pointer"
              >
                Academic Tests
              </button>
              <button
                onClick={() => navigate("/materials")}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:scale-105 transition-transform cursor-pointer"
              >
                Diverse Notes
              </button>
              <button
                onClick={() => setActiveCategoryFilter("Confessions")}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 hover:scale-105 transition-transform cursor-pointer"
              >
                Study Messages
              </button>
            </div>

            <div className="pt-2 border-t border-border/60 flex items-center justify-around text-muted-foreground">
              <Globe
                onClick={() => window.open("https://itmuniversity.org", "_blank")}
                className="h-4 w-4 hover:text-foreground cursor-pointer transition-colors"
                title="ITM University Portal"
              />
              <Share2
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  toast.success("Community link copied!");
                }}
                className="h-4 w-4 hover:text-foreground cursor-pointer transition-colors"
                title="Share Community"
              />
              <Heart
                onClick={() => toast.success("You spread love to the campus community! ❤️")}
                className="h-4 w-4 hover:text-rose-500 cursor-pointer transition-colors"
                title="Cheer Community"
              />
              <MessageSquare
                onClick={() => {
                  const input = document.getElementById("post-composer-input");
                  input?.focus();
                }}
                className="h-4 w-4 hover:text-foreground cursor-pointer transition-colors"
                title="Write Post"
              />
            </div>
          </div>

          {/* 3. Study Buddies List */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground">Study Buddies</h3>
              <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground">Community Friends Active Now</p>

            <div className="space-y-3">
              {/* Friend 1: Khalid Gutierrez */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
                    KG
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-foreground truncate">Khalid Gutierrez</p>
                    <p className="text-[10px] text-muted-foreground">2h ago · 👍 112</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleFriend("friend-khalid", "Khalid Gutierrez")}
                  className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold shrink-0 transition-all cursor-pointer ${
                    connectedFriendIds.has("friend-khalid")
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  {connectedFriendIds.has("friend-khalid") ? "Connected" : "Connect"}
                </button>
              </div>

              {/* Friend 2: Yumatria Hallitary */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0">
                    YH
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-foreground truncate">Yumatria Hallitary</p>
                    <p className="text-[10px] text-muted-foreground">3h ago · 👍 16</p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleFriend("friend-yumatria", "Yumatria Hallitary")}
                  className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold shrink-0 transition-all cursor-pointer ${
                    connectedFriendIds.has("friend-yumatria")
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  {connectedFriendIds.has("friend-yumatria") ? "Connected" : "Connect"}
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-border/60">
              <button
                onClick={() => toast.info("Discovering active campus study circles...")}
                className="text-xs text-primary font-semibold hover:underline w-full text-center flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Find for Groups &gt;</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── COLUMN 2: MAIN SOCIAL FEED (lg:col-span-6) ── */}
        <div className="lg:col-span-6 space-y-5">
          {/* 1. Create Post Input Box with Canonical User Avatar */}
          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-3">
            <form onSubmit={handleCreatePost} className="flex items-center gap-3">
              <UserAvatar
                avatarUrl={currentUserAvatar}
                displayName={currentUserName}
                email={user?.email}
                className="w-9 h-9 text-xs"
              />

              <input
                id="post-composer-input"
                type="text"
                placeholder={
                  activeCategoryFilter === "Confessions"
                    ? "Post an anonymous campus confession..."
                    : "Write a new comment or share something with campus..."
                }
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                className="flex-1 h-10 px-4 rounded-full border border-input bg-secondary/40 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />

              <button
                type="button"
                onClick={() => setNewPostText((prev) => prev + " 😊 ")}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
                title="Add Emoji"
              >
                <Smile className="h-5 w-5" />
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !newPostText.trim()}
                className="px-4 py-2 rounded-full bg-brand-forest hover:bg-brand-deep text-white text-xs font-bold shadow-md shadow-brand-forest/20 border border-brand-chartreuse/30 disabled:opacity-50 transition-all shrink-0 cursor-pointer"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Post"}
              </button>
            </form>
          </div>

          {/* 2. Feed Posts */}
          <div className="space-y-4">
            {isLoadingPosts && (
              <div className="p-8 text-center bg-card rounded-2xl border border-border">
                <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary mb-2" />
                <p className="text-xs text-muted-foreground">Loading verified campus pulse...</p>
              </div>
            )}

            {filteredPosts.map((post) => {
              const isAuthor = user?.id && post.authorId === user.id;
              const isMaher = post.authorName === "Maher Bhatt" || post.authorId === "admin-maher";
              const postAvatar = isMaher ? (currentUserAvatar || MAHER_CANONICAL_AVATAR) : post.authorAvatar;
              const isLiked = !!post.likedByMe;
              const commentsList = post.comments || [];

              return (
                <div
                  key={post.id}
                  className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3 hover:border-border/90 transition-all"
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <UserAvatar
                        avatarUrl={postAvatar}
                        displayName={post.authorName}
                        email={post.authorEmail}
                        className="w-10 h-10 text-xs"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-sm text-foreground">{post.authorName}</span>
                          {(post.verified || isMaher || isAdmin) && (
                            <span
                              className="w-4 h-4 rounded-full bg-brand-forest text-brand-chartreuse flex items-center justify-center text-[10px] font-bold shadow-xs border border-brand-chartreuse/40"
                              title="Verified Campus Contributor"
                            >
                              ✓
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <span>{post.createdAt}</span>
                          <span>·</span>
                          <Globe className="h-3 w-3" />
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {(isAuthor || isAdmin) && (
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-muted-foreground hover:text-rose-500 p-1.5 rounded-lg transition-colors cursor-pointer"
                          title="Delete Post"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setShareModalPost(post)}
                        className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Post Content Body */}
                  <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal whitespace-pre-line">
                    {post.content}
                  </p>

                  {/* Optional Link Preview */}
                  {post.linkUrl && (
                    <a
                      href={post.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline block truncate p-2 rounded-xl bg-blue-500/10 border border-blue-500/20"
                    >
                      {post.linkUrl}
                    </a>
                  )}

                  {/* Optional Photo Attachment */}
                  {post.mediaUrl && (
                    <div className="rounded-xl overflow-hidden border border-border max-h-72 mt-2">
                      <img
                        src={post.mediaUrl}
                        alt="Post Attachment"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="pt-3 border-t border-border/60 flex items-center justify-around text-xs text-muted-foreground font-semibold">
                    <button
                      onClick={() => handleToggleLike(post.id)}
                      className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer ${
                        isLiked ? "text-blue-600 dark:text-blue-400 font-bold bg-blue-500/10" : ""
                      }`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                      <span>Like ({post.likes || 0})</span>
                    </button>

                    <button
                      onClick={() => setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Comment ({commentsList.length})</span>
                    </button>

                    <button
                      onClick={() => setShareModalPost(post)}
                      className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer"
                    >
                      <Share2 className="h-4 w-4" />
                      <span>Share Post</span>
                    </button>
                  </div>

                  {/* Comments Drawer */}
                  {activeCommentsPostId === post.id && (
                    <div className="pt-3 border-t border-border/40 space-y-3">
                      {commentsList.length > 0 ? (
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {commentsList.map((c, i) => (
                            <div key={c.id || i} className="p-2.5 rounded-xl bg-secondary/40 text-xs space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-foreground">{c.authorName}</span>
                                <span className="text-[10px] text-muted-foreground">{c.createdAt}</span>
                              </div>
                              <p className="text-muted-foreground">{c.content}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-muted-foreground italic text-center py-1">
                          No replies yet. Be the first to reply!
                        </p>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Write a reply..."
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                          className="flex-1 h-9 px-3 rounded-xl border border-input bg-background text-xs outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          disabled={isSubmittingComment || !commentInput.trim()}
                          className="px-4 h-9 rounded-xl bg-primary text-primary-foreground font-bold text-xs hover:opacity-90 disabled:opacity-50 transition-all shrink-0 cursor-pointer"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── COLUMN 3: TRENDING TOPICS & BUDDIES (lg:col-span-3) ── */}
        <div className="lg:col-span-3 space-y-5">
          {/* 1. Post Card Types Selector */}
          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Post Card Types</h3>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPostCardType("Campus")}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  postCardType === "Campus"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                Campus
              </button>
              <button
                onClick={() => {
                  setPostCardType("Videos");
                  toast.info("Showing campus videos & viva clips");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  postCardType === "Videos"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => {
                  setPostCardType("Polls");
                  toast.info("Showing campus election & academic polls");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  postCardType === "Polls"
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                Polls
              </button>
            </div>
          </div>

          {/* 2. Trending Topics Widget */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground">Trending Topics</h3>
              <span
                onClick={() => toast.info("Displaying full trending leaderboard")}
                className="text-xs text-primary font-semibold hover:underline cursor-pointer"
              >
                See All
              </span>
            </div>

            <div className="space-y-3">
              {/* Item 1: Maher Bhatt */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <UserAvatar
                    avatarUrl={currentUserAvatar || MAHER_CANONICAL_AVATAR}
                    displayName="Maher Bhatt"
                    className="w-8 h-8 text-[10px]"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-foreground truncate">Maher Bhatt</p>
                    <p className="text-[10px] text-muted-foreground truncate">Over 5k views · 23 responses</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs font-mono shrink-0">
                  +180%
                </span>
              </div>

              {/* Item 2: Semester Exam Prep */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=60&h=60&fit=crop"
                    alt="Exam Prep"
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-foreground truncate">Semester Exam Prep</p>
                    <p className="text-[10px] text-muted-foreground truncate">Question banks · 14 responses</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs font-mono shrink-0">
                  +146%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Post Modal */}
      {shareModalPost && (
        <SharePostModal
          isOpen={!!shareModalPost}
          onClose={() => setShareModalPost(null)}
          post={shareModalPost}
        />
      )}
    </div>
  );
}
