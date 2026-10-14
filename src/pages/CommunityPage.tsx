// @ts-nocheck
import { useState, useMemo, useEffect } from "react";
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
  Flag,
  Globe,
  Heart
} from "lucide-react";
import { toast } from "sonner";
import {
  fetchCommunityPosts,
  createCommunityPost,
  toggleCommunityLike,
  addCommunityComment,
  deleteCommunityPost,
} from "@/services/communityService";

export default function CommunityPage() {
  const navigate = useNavigate();
  const { user, profile, role } = useAuth();
  const { addXp } = useGamification();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState("Community");
  const [newPostText, setNewPostText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [activeCommentsPostId, setActiveCommentsPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");

  // Initial rich posts matching Screenshot 5
  const [posts, setPosts] = useState<any[]>([
    {
      id: "post-maher-verified",
      author_id: "admin-maher",
      author_name: "Maher Bhatt",
      author_avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
      verified: true,
      role: "admin",
      category: "College Feedback",
      created_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      timeDisplay: "Yesterday at 15:04",
      content: "Welcome to Campus Pulse! This campus community is made for all students to collaborate, exchange verified MST-1 question banks, and share exam insights. Feel free to request notes or discuss practicals here!",
      linkUrl: "https://checkitoutlive.com",
      likes_count: 42,
      comments_count: 14,
      comments: [
        { id: "c1", author_name: "Aarav Patel", content: "Super excited for this! The DSA questions bank is a lifesaver.", created_at: "Yesterday" }
      ]
    },
    {
      id: "post-study-buddies",
      author_id: "group-buddies",
      author_name: "Study Buddies",
      author_avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=faces",
      verified: false,
      role: "student",
      category: "Community",
      created_at: new Date(Date.now() - 100800000).toISOString(),
      timeDisplay: "Yesterday at 10:48",
      content: "Exciting thing for the semester! We are gathering for group study on Chapter 3 Matrix Algebra and Tree Traversal algorithms on the campus green lawn. Come join us! 😊",
      mediaUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=450&fit=crop",
      likes_count: 88,
      comments_count: 23,
      comments: [
        { id: "c2", author_name: "Diya Sharma", content: "Count me in! Bringing solved BCA question papers.", created_at: "Yesterday" }
      ]
    }
  ]);

  // Load real posts from Supabase if available
  useEffect(() => {
    async function loadFeed() {
      try {
        const remote = await fetchCommunityPosts();
        if (remote && remote.length > 0) {
          // Merge with sample verified posts
          const merged = [...remote.map(r => ({
            ...r,
            timeDisplay: new Date(r.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            verified: r.role === 'admin' || r.author_name === 'Maher Bhatt'
          })), ...posts];
          // deduplicate by id
          const unique = Array.from(new Map(merged.map(p => [p.id, p])).values());
          setPosts(unique);
        }
      } catch (err) {
        console.warn("Using offline feed data:", err);
      }
    }
    loadFeed();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    setIsSubmitting(true);
    const newEntry = {
      id: `post-${Date.now()}`,
      author_id: user?.id || "local-user",
      author_name: profile?.display_name || user?.email?.split("@")[0] || "Student",
      author_avatar: "",
      verified: role === "admin" || user?.email === "maherbhatt01@gmail.com",
      role: role || "student",
      category: activeCategoryFilter === "Confessions" ? "Campus Confessions" : "College Feedback",
      created_at: new Date().toISOString(),
      timeDisplay: "Just now",
      content: newPostText.trim(),
      likes_count: 1,
      comments_count: 0,
      comments: []
    };

    setPosts([newEntry, ...posts]);
    setNewPostText("");
    setIsSubmitting(false);
    addXp(25);
    toast.success("Post published to Campus Pulse! +25 XP earned 🔥");

    try {
      await createCommunityPost(newEntry.content, newEntry.category, false);
    } catch {
      // Offline fallback already updated in state
    }
  };

  const handleToggleLike = (postId: string) => {
    const isLiked = likedPosts[postId];
    setLikedPosts(prev => ({ ...prev, [postId]: !isLiked }));
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          likes_count: isLiked ? p.likes_count - 1 : p.likes_count + 1
        };
      }
      return p;
    }));
    toast.success(isLiked ? "Like removed" : "Liked post! ❤️");
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author_name: profile?.display_name || user?.email?.split("@")[0] || "Student",
      content: commentInput.trim(),
      created_at: "Just now"
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments_count: (p.comments_count || 0) + 1,
          comments: [...(p.comments || []), newComment]
        };
      }
      return p;
    }));
    setCommentInput("");
    toast.success("Comment added!");
  };

  const categoryPills = [
    { label: "👥 Community", value: "Community" },
    { label: "💬 Confessions", value: "Confessions" },
    { label: "🎓 Exchange", value: "Exchange" },
    { label: "🏢 Standards", value: "Standards" },
    { label: "🏆 Competition", value: "Competition" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 animate-fade-in">
      {/* ── TOP HEADER SECTION matching Screenshot 5 ── */}
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
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>Academic Media</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* ── CATEGORY FILTER PILL BAR matching Screenshot 5 ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categoryPills.map((pill) => {
          const isActive = activeCategoryFilter === pill.value;
          return (
            <button
              key={pill.value}
              onClick={() => setActiveCategoryFilter(pill.value)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-xs ${
                isActive
                  ? "bg-blue-600 text-white shadow-blue-600/30"
                  : "bg-secondary text-foreground hover:bg-secondary/80 border border-border/60"
              }`}
            >
              {pill.label}
            </button>
          );
        })}

        <div className="ml-auto hidden sm:block">
          <select 
            className="h-9 px-3 rounded-xl border border-input bg-card text-xs font-semibold text-foreground outline-none cursor-pointer"
          >
            <option>Post card filters</option>
            <option>Latest Posts</option>
            <option>Most Liked</option>
            <option>Discussions</option>
          </select>
        </div>
      </div>

      {/* ── THREE-COLUMN SOCIAL LAYOUT matching Screenshot 5 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── COLUMN 1: CAMPUS HIGHLIGHTS & BUDDIES (~25% width -> lg:col-span-3) ── */}
        <div className="lg:col-span-3 space-y-5">
          {/* 1. Campus Hero Image Card matching Screenshot 5 */}
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

            <div className="absolute bottom-3 left-3 right-3 text-white space-y-0.5">
              <h3 className="font-bold text-sm tracking-tight">Campus Pulse & Confessions</h3>
              <p className="text-[11px] text-slate-300">Find campus AI Desk or look at feed</p>
            </div>
          </div>

          {/* 2. Campus Trends & Tags Card matching Screenshot 5 */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-sm text-foreground">Campus Trends</h3>

            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                🔥 Campus
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Academic Tests
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                Diverse Notes
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                Study Messages
              </span>
            </div>

            <div className="pt-2 border-t border-border/60 flex items-center justify-around text-muted-foreground">
              <Globe className="h-4 w-4 hover:text-foreground cursor-pointer transition-colors" />
              <Share2 className="h-4 w-4 hover:text-foreground cursor-pointer transition-colors" />
              <Heart className="h-4 w-4 hover:text-foreground cursor-pointer transition-colors" />
              <MessageSquare className="h-4 w-4 hover:text-foreground cursor-pointer transition-colors" />
            </div>
          </div>

          {/* 3. Study Buddies List matching Screenshot 5 */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground">Study Buddies</h3>
              <span className="text-[10px] text-primary font-bold">Online</span>
            </div>
            <p className="text-[11px] text-muted-foreground">Community Friends Active Now</p>

            <div className="space-y-3">
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
                  onClick={() => toast.success("Connected with Khalid!")}
                  className="px-2.5 py-1 rounded-lg border border-border text-[10px] font-bold text-foreground hover:bg-secondary shrink-0"
                >
                  Connect
                </button>
              </div>

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
                  onClick={() => toast.success("Connected with Yumatria!")}
                  className="px-2.5 py-1 rounded-lg border border-border text-[10px] font-bold text-foreground hover:bg-secondary shrink-0"
                >
                  Connect
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-border/60">
              <button 
                onClick={() => toast.info("Discovering campus study groups...")}
                className="text-xs text-primary font-semibold hover:underline w-full text-center"
              >
                Find for Groups &gt;
              </button>
            </div>
          </div>
        </div>

        {/* ── COLUMN 2: MAIN SOCIAL FEED (~48-50% width -> lg:col-span-6) ── */}
        <div className="lg:col-span-6 space-y-5">
          {/* 1. Create Post Input Box matching Screenshot 5 */}
          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-3">
            <form onSubmit={handleCreatePost} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {profile?.display_name ? profile.display_name.charAt(0).toUpperCase() : "M"}
              </div>

              <input
                type="text"
                placeholder="Write a new comment or share something with campus..."
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                className="flex-1 h-10 px-4 rounded-full border border-input bg-secondary/40 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />

              <button
                type="button"
                onClick={() => setNewPostText((prev) => prev + " 😊 ")}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                title="Add Emoji"
              >
                <Smile className="h-5 w-5" />
              </button>

              <button
                type="submit"
                disabled={isSubmitting || !newPostText.trim()}
                className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/20 disabled:opacity-50 transition-all shrink-0"
              >
                Post
              </button>
            </form>
          </div>

          {/* 2. Feed Posts matching Screenshot 5 */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div 
                key={post.id}
                className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3 hover:border-border/90 transition-all"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.author_avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces"} 
                      alt={post.author_name} 
                      className="w-10 h-10 rounded-full object-cover border border-border"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-foreground">{post.author_name}</span>
                        {post.verified && (
                          <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]" title="Verified Campus Contributor">
                            ✓
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <span>{post.timeDisplay || "Recently"}</span>
                        <span>·</span>
                        <Globe className="h-3 w-3" />
                      </span>
                    </div>
                  </div>

                  <button className="text-muted-foreground hover:text-foreground p-1">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>

                {/* Post Body */}
                <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed font-normal">
                  {post.content}
                </p>

                {/* Optional Link Preview */}
                {post.linkUrl && (
                  <a 
                    href={post.linkUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline block truncate"
                  >
                    {post.linkUrl}
                  </a>
                )}

                {/* Optional Photo Attachment matching Screenshot 5 Post 2 */}
                {post.mediaUrl && (
                  <div className="rounded-xl overflow-hidden border border-border max-h-72 mt-2">
                    <img 
                      src={post.mediaUrl} 
                      alt="Post Attachment" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Action Bar matching Screenshot 5 */}
                <div className="pt-3 border-t border-border/60 flex items-center justify-around text-xs text-muted-foreground font-semibold">
                  <button 
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-secondary transition-colors ${
                      likedPosts[post.id] ? "text-blue-600 dark:text-blue-400 font-bold" : ""
                    }`}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>Like ({post.likes_count || 0})</span>
                  </button>

                  <button 
                    onClick={() => setActiveCommentsPostId(activeCommentsPostId === post.id ? null : post.id)}
                    className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Comment ({post.comments_count || 0})</span>
                  </button>

                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Post link copied to clipboard!");
                    }}
                    className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-secondary transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share Post</span>
                  </button>
                </div>

                {/* Comments Section Drawer */}
                {activeCommentsPostId === post.id && (
                  <div className="pt-3 border-t border-border/40 space-y-3">
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {(post.comments || []).map((c, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-secondary/40 text-xs space-y-0.5">
                          <span className="font-bold text-foreground block">{c.author_name}</span>
                          <p className="text-muted-foreground">{c.content}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Write a reply..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddComment(post.id)}
                        className="flex-1 h-8 px-3 rounded-xl border border-input bg-background text-xs outline-none"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="px-3 h-8 rounded-xl bg-primary text-primary-foreground font-bold text-xs"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── COLUMN 3: TRENDING TOPICS & BUDDIES (~25-27% width -> lg:col-span-3) ── */}
        <div className="lg:col-span-3 space-y-5">
          {/* 1. Post Card Types matching Screenshot 5 */}
          <div className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Post Card Types</h3>
            <div className="flex items-center gap-1.5">
              <button className="px-3 py-1 rounded-xl bg-slate-900 text-white font-bold text-xs">
                Campus
              </button>
              <button className="px-3 py-1 rounded-xl bg-secondary text-muted-foreground hover:text-foreground text-xs font-semibold">
                Videos
              </button>
              <button className="px-3 py-1 rounded-xl bg-secondary text-muted-foreground hover:text-foreground text-xs font-semibold">
                Polls
              </button>
            </div>
          </div>

          {/* 2. Trending Topics Widget matching Screenshot 5 with +180% / +146% */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground">Trending Topics</h3>
              <span className="text-xs text-primary font-semibold hover:underline cursor-pointer">
                See All
              </span>
            </div>

            <div className="space-y-3">
              {/* Item 1 */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img 
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop" 
                    alt="Maher Bhatt" 
                    className="w-8 h-8 rounded-full object-cover shrink-0"
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

              {/* Item 2 */}
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=60&h=60&fit=crop" 
                    alt="Exam Prep" 
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-foreground truncate">Semester Exam Prep</p>
                    <p className="text-[10px] text-muted-foreground truncate">Direct links · 29 responses</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs font-mono shrink-0">
                  +146%
                </span>
              </div>
            </div>
          </div>

          {/* 3. Study Buddies Suggestions matching Screenshot 5 (+120%, +180%, +142%) */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground">Study Buddies</h3>
              <span className="text-xs text-primary font-semibold hover:underline cursor-pointer">
                See All
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-foreground truncate">Book Body Friend</p>
                  <p className="text-[10px] text-muted-foreground truncate">Past notes · 3 hours ago</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs font-mono shrink-0">
                  +120%
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-foreground truncate">Book Lite Moded</p>
                  <p className="text-[10px] text-muted-foreground truncate">Best tutors · 11 replies</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs font-mono shrink-0">
                  +180%
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <p className="font-bold text-foreground truncate">Poobely</p>
                  <p className="text-[10px] text-muted-foreground truncate">Govt tutors · 21 comments</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs font-mono shrink-0">
                  +142%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
