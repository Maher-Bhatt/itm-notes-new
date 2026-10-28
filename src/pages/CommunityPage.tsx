import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/contexts/UniversityContext';
import { useGamification } from '@/hooks/useGamification';
import {
  Sparkles,
  Plus,
  Image as ImageIcon,
  Flame,
  Search,
  Filter,
  RefreshCw,
  Bell,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  fetchCommunityPosts,
  createCommunityPost,
  toggleCommunityLike,
  addCommunityComment,
  deleteCommunityPost,
  subscribeToCommunityFeed,
} from '@/services/communityService';
import {
  fetchCampusPulseTiles,
  PulseTileItem,
  fetchCampusClubs,
  fetchCampusFollows,
  fetchCampusSavedPostIds,
  toggleCampusSavedPost,
  reportCampusPost,
} from '@/services/campusLoopService';
import { CommunityPost, isFakePost } from '@/data/communityData';
import {
  CampusPulseTile,
  CampusPostCard,
  CampusAvatar,
  CampusTag,
  CampusButton,
  CampusSearchField,
} from '@/components/campusloop';
import { CreatePostModal } from '@/components/campusloop/CreatePostModal';

type HomeFeedTab = 'for_you' | 'my_campus' | 'following' | 'my_clubs';

export default function CommunityPage() {
  const { user, profile, role } = useAuth();
  const { currentUniversity } = useUniversity();
  const { addXp } = useGamification();

  const [activeTab, setActiveTab] = useState<HomeFeedTab>('for_you');
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [pulseTiles, setPulseTiles] = useState<PulseTileItem[]>([]);
  const [savedPostIds, setSavedPostIds] = useState<Set<string>>(new Set());
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());
  const [myClubNames, setMyClubNames] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Announcement banner dismissible state
  const [showAnnouncement, setShowAnnouncement] = useState(() => {
    try {
      return localStorage.getItem('itm_feed_announcement_dismissed') !== 'true';
    } catch {
      return true;
    }
  });

  const isAdmin = role === 'admin' || user?.email?.toLowerCase() === 'maherbhatt01@gmail.com';

  // Load all home feed data
  const loadData = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const [fetchedPosts, tiles, saved, follows, clubs] = await Promise.all([
        fetchCommunityPosts(user?.id),
        fetchCampusPulseTiles(),
        fetchCampusSavedPostIds(user?.id),
        fetchCampusFollows(user?.id),
        fetchCampusClubs(user?.id),
      ]);

      // Filter out fake test posts
      const realPosts = (fetchedPosts || []).filter((p) => !isFakePost(p));
      setPosts(realPosts);
      setPulseTiles(tiles);
      setSavedPostIds(saved);
      setFollowingIds(follows.followingIds);

      const joinedClubs = new Set(clubs.filter((c) => c.isMember).map((c) => c.name.toLowerCase()));
      setMyClubNames(joinedClubs);
    } catch (err) {
      console.warn('Failed loading feed data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadData();
    // Realtime Supabase post feed updates
    const unsubscribe = subscribeToCommunityFeed(() => {
      loadData();
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [loadData]);

  // Global listener for "Create Post" modal trigger
  useEffect(() => {
    const handleOpen = () => setIsCreateModalOpen(true);
    window.addEventListener('campus_open_create_post', handleOpen);
    return () => window.removeEventListener('campus_open_create_post', handleOpen);
  }, []);

  // Filter posts based on active tab and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // 1. Tab filter
      if (activeTab === 'my_campus') {
        const u = (post as any).university_id;
        const matchesCampus =
          u === currentUniversity.id ||
          post.authorBranch?.toLowerCase().includes(currentUniversity.shortName.toLowerCase()) ||
          post.authorBranch?.toLowerCase().includes(currentUniversity.code.toLowerCase()) ||
          !u || u === 'all';
        if (!matchesCampus) return false;
      } else if (activeTab === 'following') {
        if (!followingIds.has(post.authorId)) return false;
      } else if (activeTab === 'my_clubs') {
        const cat = (post.category || '').toLowerCase();
        if (!myClubNames.has(cat) && !myClubNames.has(cat.replace(' club', ''))) return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesContent = post.content.toLowerCase().includes(q);
        const matchesAuthor = post.authorName.toLowerCase().includes(q);
        const matchesCat = (post.category || '').toLowerCase().includes(q);
        if (!matchesContent && !matchesAuthor && !matchesCat) return false;
      }

      return true;
    });
  }, [posts, activeTab, followingIds, myClubNames, searchQuery]);

  // Handle Like Toggle
  const handleLikeToggle = async (postId: string) => {
    try {
      const post = posts.find((p) => p.id === postId);
      if (!post) return;

      const willLike = !post.likedByMe;
      // Optimistic update
      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                likedByMe: willLike,
                likes: Math.max(0, p.likes + (willLike ? 1 : -1)),
              }
            : p
        )
      );

      await toggleCommunityLike(postId, user?.id);
      if (willLike) {
        addXp(5, 'Liked campus post');
      }
    } catch {
      toast.error('Could not update like.');
      loadData();
    }
  };

  // Handle Save / Bookmark Toggle
  const handleSaveToggle = async (postId: string) => {
    try {
      const isSaved = await toggleCampusSavedPost(postId, user?.id);
      setSavedPostIds((prev) => {
        const next = new Set(prev);
        if (isSaved) {
          next.add(postId);
          toast.success('Post saved to your collection!');
        } else {
          next.delete(postId);
          toast.info('Post removed from saved.');
        }
        return next;
      });
    } catch {
      toast.error('Failed saving post.');
    }
  };

  // Handle Comment Submission
  const handleAddComment = async (postId: string, commentText: string) => {
    try {
      const authorName = profile?.display_name || user?.email?.split('@')[0] || 'Campus Student';
      await addCommunityComment(
        postId,
        {
          authorId: user?.id || 'guest-user',
          authorName,
          authorEmail: user?.email || '',
          authorAvatar: profile?.avatar_url,
          isMasked: false,
          content: commentText,
        },
        user?.id
      );

      // Optimistically update comments
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            const newComment = {
              id: `c-${Date.now()}`,
              postId,
              authorId: user?.id || 'guest',
              authorName,
              authorEmail: user?.email || '',
              authorAvatar: profile?.avatar_url,
              isMasked: false,
              maskAlias: 'Student',
              content: commentText,
              createdAt: 'Just now',
              likes: 0,
            };
            return {
              ...p,
              comments: [...(p.comments || []), newComment],
            };
          }
          return p;
        })
      );
      addXp(10, 'Replied to campus discussion');
    } catch {
      toast.error('Could not send reply.');
    }
  };

  // Handle Delete Post (for author or admin)
  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await deleteCommunityPost(postId, user?.id);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      toast.success('Post deleted.');
    } catch {
      toast.error('Failed to delete post.');
    }
  };

  // Handle Report Post
  const handleReportPost = async (postId: string, reason: string) => {
    try {
      await reportCampusPost(postId, reason, user?.id);
      toast.success('Thank you. Post reported to campus moderators.');
    } catch {
      toast.error('Failed submitting report.');
    }
  };

  // Dismiss Announcement
  const dismissAnnouncement = () => {
    setShowAnnouncement(false);
    try {
      localStorage.setItem('itm_feed_announcement_dismissed', 'true');
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#F6F3EC] dark:bg-[#0E0E10] text-[#111111] dark:text-neutral-100 pb-20">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 space-y-4 sm:space-y-5">
        {/* 1. Feed Navigation Tabs: For You / Following / My Clubs */}
        <div className="flex items-center justify-between border-b border-[#E8E4DA] dark:border-neutral-800 pb-1">
          <div className="flex items-center gap-6 sm:gap-8 font-display">
            <button
              type="button"
              onClick={() => setActiveTab('for_you')}
              className={`pb-2.5 text-base sm:text-lg font-bold transition-all relative cursor-pointer ${
                activeTab === 'for_you'
                  ? 'text-[#2B4EFF] dark:text-[#3D5EFF]'
                  : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              All Gujarat
              {activeTab === 'for_you' && (
                <span className="absolute bottom-0 inset-x-0 h-[3px] bg-[#2B4EFF] dark:bg-[#3D5EFF] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('my_campus')}
              className={`pb-2.5 text-base sm:text-lg font-bold transition-all relative cursor-pointer ${
                activeTab === 'my_campus'
                  ? 'text-[#2B4EFF] dark:text-[#3D5EFF]'
                  : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              {currentUniversity.shortName}
              {activeTab === 'my_campus' && (
                <span className="absolute bottom-0 inset-x-0 h-[3px] bg-[#2B4EFF] dark:bg-[#3D5EFF] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('following')}
              className={`pb-2.5 text-base sm:text-lg font-bold transition-all relative cursor-pointer ${
                activeTab === 'following'
                  ? 'text-[#2B4EFF] dark:text-[#3D5EFF]'
                  : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              Following
              {activeTab === 'following' && (
                <span className="absolute bottom-0 inset-x-0 h-[3px] bg-[#2B4EFF] dark:bg-[#3D5EFF] rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('my_clubs')}
              className={`pb-2.5 text-base sm:text-lg font-bold transition-all relative cursor-pointer ${
                activeTab === 'my_clubs'
                  ? 'text-[#2B4EFF] dark:text-[#3D5EFF]'
                  : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              My Clubs
              {activeTab === 'my_clubs' && (
                <span className="absolute bottom-0 inset-x-0 h-[3px] bg-[#2B4EFF] dark:bg-[#3D5EFF] rounded-full" />
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={loadData}
            title="Refresh Feed"
            className={`p-2 rounded-full text-neutral-400 hover:text-[#2B4EFF] transition-colors cursor-pointer ${
              isRefreshing ? 'animate-spin text-[#2B4EFF]' : ''
            }`}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* 2. Campus Pulse LIVE Carousel (Horizontal Scrollable) */}
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#D7F75B] text-[#111111] inline-flex items-center gap-1 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              LIVE
            </span>
            <span className="text-xs font-bold text-[#6B7280] dark:text-neutral-400 uppercase tracking-wider">
              Campus Pulse · ITM SLS Baroda
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x -mx-3 px-3 sm:mx-0 sm:px-0">
            {pulseTiles.map((tile) => (
              <CampusPulseTile
                key={tile.id}
                tone={tile.tone}
                tag={tile.tag}
                title={tile.title}
                subtitle={tile.subtitle}
                icon={tile.icon}
                className="snap-start"
              />
            ))}
          </div>
        </div>

        {/* 3. Integrated Dismissible Announcement Banner */}
        {showAnnouncement && (
          <div className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-3.5 sm:p-4 flex items-start justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#E6EAFD] text-[#2B4EFF] flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#111111] dark:text-white leading-tight">
                  Welcome to CampusLoop at ITM SLS Baroda
                </h4>
                <p className="text-xs text-[#6B7280] dark:text-neutral-400 font-medium mt-0.5 leading-relaxed">
                  Connect with classmates, join university clubs, RSVP for tech sprints, and study together.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={dismissAnnouncement}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 4. "Share with your campus" Composer Bar */}
        <div
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-full bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-2 pl-3 sm:pl-3.5 flex items-center justify-between gap-3 shadow-xs hover:border-[#2B4EFF]/50 transition-all cursor-pointer select-none"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <CampusAvatar
              src={profile?.avatar_url}
              name={profile?.display_name || user?.email || 'Student'}
              size={36}
            />
            <span className="text-sm font-medium text-neutral-400 truncate">
              Share with your campus...
            </span>
          </div>

          <button
            type="button"
            className="w-9 h-9 rounded-full bg-[#E6EAFD] text-[#2B4EFF] hover:bg-[#D8E0FC] flex items-center justify-center transition-colors shrink-0"
            title="Add photo or flyer"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
        </div>

        {/* 5. Search & Filter Bar */}
        <CampusSearchField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter discussions, questions, or announcements..."
        />

        {/* 6. Posts Feed */}
        {isLoading ? (
          <div className="py-16 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 rounded-full border-3 border-[#2B4EFF] border-t-transparent animate-spin" />
            <p className="text-xs font-semibold text-[#6B7280] dark:text-neutral-400">
              Loading campus feed...
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-8 sm:p-12 text-center space-y-3 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#E6EAFD] text-[#2B4EFF] flex items-center justify-center mx-auto">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-lg text-[#111111] dark:text-white">
              {activeTab === 'following'
                ? 'No posts from people you follow yet'
                : activeTab === 'my_clubs'
                ? 'No posts from your clubs yet'
                : 'No campus posts found'}
            </h3>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-neutral-400 max-w-sm mx-auto">
              {activeTab === 'following'
                ? 'Follow peers from Explore to see their updates right here in your feed.'
                : activeTab === 'my_clubs'
                ? 'Join clubs in the Explore tab to see community discussions and activities.'
                : 'Be the first to ask a doubt, share notes, or announce an event to your batch!'}
            </p>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-2 h-10 px-5 rounded-full bg-[#2B4EFF] text-white font-bold text-xs hover:bg-[#1E3EDB] transition-all cursor-pointer"
            >
              Start the first discussion
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <CampusPostCard
                key={post.id}
                id={post.id}
                authorId={post.authorId}
                authorName={post.authorName}
                authorAvatar={post.authorAvatar}
                authorBranch={post.authorBranch}
                communityOrClub={post.category}
                createdAt={post.createdAt}
                content={post.content}
                images={post.mediaUrl ? [post.mediaUrl] : []}
                likesCount={post.likes || 0}
                likedByMe={Boolean(post.likedByMe)}
                commentsCount={post.comments?.length || 0}
                savedByMe={savedPostIds.has(post.id)}
                comments={(post.comments || []).map((c) => ({
                  id: c.id,
                  authorName: c.authorName,
                  authorAvatar: c.authorAvatar,
                  content: c.content,
                  createdAt: c.createdAt,
                }))}
                currentUserId={user?.id}
                isAdmin={isAdmin}
                onLikeToggle={handleLikeToggle}
                onSaveToggle={handleSaveToggle}
                onAddComment={handleAddComment}
                onDeletePost={handleDeletePost}
                onReportPost={handleReportPost}
              />
            ))}
          </div>
        )}
      </div>

      {/* 7. Create Post Modal Component */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={loadData}
      />
    </div>
  );
}
