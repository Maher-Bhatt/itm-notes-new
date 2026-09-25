import { supabase } from '@/integrations/supabase/client';
import { CommunityPost, CommunityComment, INITIAL_POSTS } from '@/data/communityData';

const LOCAL_STORAGE_KEY = 'itm_campus_feed_posts';
const LOCAL_FRIENDS_KEY = 'itm_user_friends_ids';

// Helper to format timestamps nicely
export function formatTimeAgo(isoString: string | null | undefined): string {
  if (!isoString) return 'Recently';
  try {
    const past = new Date(isoString).getTime();
    if (isNaN(past)) return isoString; // fallback if already human text
    const now = Date.now();
    const diffSec = Math.floor((now - past) / 1000);

    if (diffSec < 45) return 'Just now';
    if (diffSec < 90) return '1 min ago';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} mins ago`;
    if (diffSec < 7200) return '1 hour ago';
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} hours ago`;
    if (diffSec < 172800) return 'Yesterday';
    const days = Math.floor(diffSec / 86400);
    if (days < 30) return `${days} days ago`;
    return new Date(past).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}

/**
 * Fetch all community posts with their comments and user's like status directly from Supabase.
 * If offline or guest, falls back to localStorage or INITIAL_POSTS.
 * Also recovers any posts saved in local browser storage by syncing them to Supabase!
 */
export async function fetchCommunityPosts(currentUserId?: string): Promise<CommunityPost[]> {
  try {
    // 1. Fetch posts from Supabase
    const { data: dbPosts, error: postsError } = await supabase
      .from('community_posts')
      .select('*')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false });

    if (postsError) {
      console.warn('Could not load posts from Supabase, falling back to cache:', postsError.message);
      return getLocalCachedPosts();
    }

    // 2. Fetch comments from Supabase
    const { data: dbComments, error: commentsError } = await supabase
      .from('community_comments')
      .select('*')
      .order('created_at', { ascending: true });

    if (commentsError) {
      console.warn('Could not load comments from Supabase:', commentsError.message);
    }

    // 3. Fetch user's likes if authenticated
    let userLikedPostIds = new Set<string>();
    if (currentUserId) {
      const { data: likes } = await supabase
        .from('community_post_likes')
        .select('post_id')
        .eq('user_id', currentUserId);

      if (likes) {
        userLikedPostIds = new Set(likes.map((l) => l.post_id));
      }
    }

    // Group comments by post_id
    const commentsByPostId: Record<string, CommunityComment[]> = {};
    (dbComments || []).forEach((c) => {
      if (!commentsByPostId[c.post_id]) {
        commentsByPostId[c.post_id] = [];
      }
      commentsByPostId[c.post_id].push({
        id: c.id,
        postId: c.post_id,
        authorId: c.author_id,
        authorName: c.author_name,
        authorEmail: c.author_email || '',
        authorAvatar: c.author_avatar || undefined,
        isMasked: c.is_masked,
        maskAlias: c.mask_alias || 'Masked Student 🎭',
        content: c.content,
        createdAt: formatTimeAgo(c.created_at),
        likes: c.likes || 0,
      });
    });

    // 4. Map DB posts into UI models
    const remotePosts: CommunityPost[] = (dbPosts || []).map((p) => ({
      id: p.id,
      authorId: p.author_id,
      authorName: p.author_name,
      authorEmail: p.author_email || '',
      authorAvatar: p.author_avatar || undefined,
      authorBranch: p.author_branch || "B.Tech CSE '26",
      isMasked: p.is_masked,
      maskAlias: p.mask_alias || 'Anonymous Student 🎭',
      category: p.category as any,
      content: p.content,
      createdAt: formatTimeAgo(p.created_at),
      likes: p.likes || 0,
      likedByMe: userLikedPostIds.has(p.id),
      pinned: p.pinned || false,
      comments: commentsByPostId[p.id] || [],
    }));

    // 5. Check if user had any local-only posts from previous sessions that are missing in Supabase
    const localPosts = getLocalCachedPosts();
    const existingIds = new Set(remotePosts.map((p) => p.id));
    const missingLocalPosts = localPosts.filter((lp) => !existingIds.has(lp.id));

    if (missingLocalPosts.length > 0) {
      // Sync these local posts up to Supabase in background
      for (const missing of missingLocalPosts) {
        try {
          await supabase.from('community_posts').insert({
            id: missing.id,
            author_id: missing.authorId || currentUserId || 'student-local',
            author_name: missing.authorName,
            author_email: missing.authorEmail || null,
            author_avatar: missing.authorAvatar || null,
            author_branch: missing.authorBranch || "B.Tech CSE '26",
            is_masked: missing.isMasked,
            mask_alias: missing.maskAlias,
            category: missing.category,
            content: missing.content,
            likes: missing.likes || 0,
            pinned: missing.pinned || false,
          });
          remotePosts.unshift(missing);
        } catch (syncErr) {
          console.warn('Failed to sync legacy post:', syncErr);
        }
      }
    }

    // Save combined posts to local cache
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(remotePosts));
    } catch {}

    return remotePosts.length > 0 ? remotePosts : INITIAL_POSTS;
  } catch (error) {
    console.error('Error fetching community posts:', error);
    return getLocalCachedPosts();
  }
}

/**
 * Creates a new community post in Supabase and syncs to local storage
 */
export async function createCommunityPost(
  post: {
    authorId: string;
    authorName: string;
    authorEmail?: string;
    authorAvatar?: string;
    authorBranch?: string;
    isMasked: boolean;
    maskAlias?: string;
    category: string;
    content: string;
  }
): Promise<CommunityPost> {
  const newId = `post-${Date.now()}`;
  const nowIso = new Date().toISOString();

  const insertData = {
    id: newId,
    author_id: post.authorId,
    author_name: post.authorName,
    author_email: post.authorEmail || null,
    author_avatar: post.authorAvatar || null,
    author_branch: post.authorBranch || "B.Tech CSE '26",
    is_masked: post.isMasked,
    mask_alias: post.maskAlias || 'Anonymous Student 🎭',
    category: post.category,
    content: post.content,
    likes: 1,
    pinned: false,
    created_at: nowIso,
    updated_at: nowIso,
  };

  // 1. Insert into Supabase
  const { error } = await supabase.from('community_posts').insert(insertData);
  if (error) {
    console.error('Failed to create post in Supabase:', error);
  }

  // 2. Also register initial like
  if (post.authorId && post.authorId.length > 10) {
    try {
      await supabase.from('community_post_likes').insert({
        post_id: newId,
        user_id: post.authorId,
      });
    } catch {}
  }

  const createdPost: CommunityPost = {
    id: newId,
    authorId: post.authorId,
    authorName: post.authorName,
    authorEmail: post.authorEmail || '',
    authorAvatar: post.authorAvatar,
    authorBranch: post.authorBranch || "B.Tech CSE '26",
    isMasked: post.isMasked,
    maskAlias: post.maskAlias || 'Anonymous Student 🎭',
    category: post.category as any,
    content: post.content,
    createdAt: 'Just now',
    likes: 1,
    likedByMe: true,
    comments: [],
  };

  // Update local cache
  const cached = getLocalCachedPosts();
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([createdPost, ...cached]));
  } catch {}

  return createdPost;
}

/**
 * Toggles a like on a post in Supabase
 */
export async function toggleCommunityLike(
  postId: string,
  userId: string,
  currentlyLiked: boolean,
  currentLikes: number
): Promise<{ likes: number; likedByMe: boolean }> {
  const newLiked = !currentlyLiked;
  const newLikes = newLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1);

  try {
    if (newLiked) {
      // Add like record
      await supabase.from('community_post_likes').insert({
        post_id: postId,
        user_id: userId,
      });
    } else {
      // Delete like record
      await supabase
        .from('community_post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);
    }

    // Update post count in DB
    await supabase
      .from('community_posts')
      .update({ likes: newLikes })
      .eq('id', postId);
  } catch (err) {
    console.error('Failed to sync like with Supabase:', err);
  }

  return { likes: newLikes, likedByMe: newLiked };
}

/**
 * Adds a comment to a post in Supabase
 */
export async function addCommunityComment(comment: {
  postId: string;
  authorId: string;
  authorName: string;
  authorEmail?: string;
  authorAvatar?: string;
  isMasked: boolean;
  maskAlias?: string;
  content: string;
}): Promise<CommunityComment> {
  const commentId = `c-${Date.now()}`;
  const nowIso = new Date().toISOString();

  const insertData = {
    id: commentId,
    post_id: comment.postId,
    author_id: comment.authorId,
    author_name: comment.authorName,
    author_email: comment.authorEmail || null,
    author_avatar: comment.authorAvatar || null,
    is_masked: comment.isMasked,
    mask_alias: comment.maskAlias || 'Masked Student 🎭',
    content: comment.content,
    likes: 0,
    created_at: nowIso,
  };

  const { error } = await supabase.from('community_comments').insert(insertData);
  if (error) {
    console.error('Failed to insert comment into Supabase:', error);
  }

  return {
    id: commentId,
    postId: comment.postId,
    authorId: comment.authorId,
    authorName: comment.authorName,
    authorEmail: comment.authorEmail || '',
    authorAvatar: comment.authorAvatar,
    isMasked: comment.isMasked,
    maskAlias: comment.maskAlias || 'Masked Student 🎭',
    content: comment.content,
    createdAt: 'Just now',
    likes: 0,
  };
}

/**
 * Deletes a post from Supabase
 */
export async function deleteCommunityPost(postId: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('community_posts').delete().eq('id', postId);
    if (error) {
      console.error('Failed to delete post from Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Delete post error:', err);
    return false;
  }
}

/**
 * Sync user's study friends with Supabase
 */
export async function fetchUserFriends(userId: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('student_friends')
      .select('friend_id')
      .eq('user_id', userId);

    if (error) {
      console.warn('Could not fetch friends from Supabase:', error.message);
      return getLocalFriendIds();
    }

    if (data && data.length > 0) {
      const ids = data.map((d) => d.friend_id);
      try {
        localStorage.setItem(LOCAL_FRIENDS_KEY, JSON.stringify(ids));
      } catch {}
      return ids;
    }
  } catch (err) {
    console.error('Failed to fetch friends from Supabase:', err);
  }
  return getLocalFriendIds();
}

/**
 * Toggle friend status in Supabase
 */
export async function toggleFriendInDb(
  userId: string,
  friendId: string,
  friendData?: { name?: string; email?: string; branch?: string }
): Promise<boolean> {
  try {
    // Check if exists
    const { data } = await supabase
      .from('student_friends')
      .select('id')
      .eq('user_id', userId)
      .eq('friend_id', friendId)
      .maybeSingle();

    if (data) {
      // Remove
      await supabase
        .from('student_friends')
        .delete()
        .eq('user_id', userId)
        .eq('friend_id', friendId);
      return false;
    } else {
      // Add
      await supabase.from('student_friends').insert({
        user_id: userId,
        friend_id: friendId,
        friend_name: friendData?.name || null,
        friend_email: friendData?.email || null,
        friend_branch: friendData?.branch || null,
      });
      return true;
    }
  } catch (err) {
    console.error('Failed to toggle friend in Supabase:', err);
    return false;
  }
}

/**
 * Realtime subscription to community posts and comments
 */
export function subscribeToCommunityFeed(onFeedChange: () => void) {
  const channel = supabase
    .channel('community_feed_live')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'community_posts' },
      () => {
        onFeedChange();
      }
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'community_comments' },
      () => {
        onFeedChange();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

// Local storage fallback helpers
function getLocalCachedPosts(): CommunityPost[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return INITIAL_POSTS;
}

function getLocalFriendIds(): string[] {
  try {
    const raw = localStorage.getItem(LOCAL_FRIENDS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return ['student-1', 'student-2'];
}
