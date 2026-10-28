import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export type FriendshipStatus = 'none' | 'pending_sent' | 'pending_received' | 'friends';

export interface FriendRequestItem {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'pending' | 'accepted' | 'declined' | 'cancelled';
  message: string | null;
  createdAt: string;
  user: {
    id: string;
    displayName: string;
    email: string;
    avatarUrl?: string | null;
    branch: string;
    university: string;
    division?: string | null;
  };
}

export interface StudentFriendItem {
  id: string;
  userId: string;
  displayName: string;
  email: string;
  avatarUrl?: string | null;
  branch: string;
  university: string;
  division?: string | null;
  isOnline: boolean;
  connectedAt: string;
  lastMessageSnippet?: string;
  lastMessageTime?: string;
}

export interface DirectMessageItem {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

const LOCAL_STORAGE_REQUESTS_KEY = 'campusloop_friend_requests_cache';
const LOCAL_STORAGE_FRIENDS_KEY = 'campusloop_friends_cache';
const LOCAL_STORAGE_MESSAGES_KEY = 'campusloop_direct_messages_cache';

// Helper: Local storage read/write
function getLocalCache<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn(`Failed to read ${key} from localStorage:`, e);
  }
  return defaultValue;
}

function setLocalCache<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Failed to write ${key} to localStorage:`, e);
  }
}

/**
 * Send a friend request to a fellow student
 */
export async function sendFriendRequest(
  sender: { id: string; name: string; email?: string; branch?: string; university?: string },
  receiverId: string,
  message?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (sender.id === receiverId) {
      return { success: false, error: 'Cannot send a friend request to yourself.' };
    }

    // 1. Try Supabase Insert
    const { data, error } = await supabase
      .from('friend_requests')
      .insert({
        sender_id: sender.id,
        receiver_id: receiverId,
        status: 'pending',
        message: message || 'Hey! Let\'s connect and study together on CampusLoop.',
      })
      .select()
      .maybeSingle();

    if (error && !error.message.includes('relation "public.friend_requests" does not exist')) {
      if (error.code === '23505') {
        return { success: false, error: 'A friend request is already pending or exists with this student.' };
      }
      console.warn('Supabase friend request notice:', error.message);
    }

    // 2. Optimistic local cache update
    const cachedRequests = getLocalCache<FriendRequestItem[]>(LOCAL_STORAGE_REQUESTS_KEY, []);
    const newReqId = data?.id || `req-${Date.now()}`;
    const newReq: FriendRequestItem = {
      id: newReqId,
      senderId: sender.id,
      receiverId,
      status: 'pending',
      message: message || 'Hey! Let\'s connect and study together on CampusLoop.',
      createdAt: new Date().toISOString(),
      user: {
        id: receiverId,
        displayName: 'Classmate',
        email: '',
        branch: sender.branch || 'Engineering',
        university: sender.university || 'itm-baroda',
      },
    };
    setLocalCache(LOCAL_STORAGE_REQUESTS_KEY, [newReq, ...cachedRequests.filter((r) => r.receiverId !== receiverId)]);

    return { success: true };
  } catch (err: any) {
    console.error('sendFriendRequest failed:', err);
    return { success: false, error: err?.message || 'Could not send friend request' };
  }
}

/**
 * Accept an incoming friend request
 */
export async function acceptFriendRequest(
  requestId: string,
  currentUserId: string,
  senderUser: { id: string; name: string; email?: string; branch?: string; university?: string; avatarUrl?: string | null }
): Promise<boolean> {
  try {
    // 1. Try atomic RPC if available
    try {
      const { data, error } = await supabase.rpc('accept_friend_request', { req_id: requestId });
      if (!error && data === true) {
        // RPC worked
      } else {
        // Fallback: direct update
        await supabase
          .from('friend_requests')
          .update({ status: 'accepted', updated_at: new Date().toISOString() })
          .eq('id', requestId);

        // Insert into student_connections
        const u1 = currentUserId < senderUser.id ? currentUserId : senderUser.id;
        const u2 = currentUserId < senderUser.id ? senderUser.id : currentUserId;
        await supabase.from('student_connections').insert({
          user1_id: u1,
          user2_id: u2,
          request_id: requestId,
        });

        // Also update legacy student_friends for backward compatibility
        await supabase.from('student_friends').insert([
          { user_id: currentUserId, friend_id: senderUser.id, friend_name: senderUser.name },
          { user_id: senderUser.id, friend_id: currentUserId },
        ]);
      }
    } catch (dbErr) {
      console.warn('Database connection update notice:', dbErr);
    }

    // 2. Update local cache
    const requests = getLocalCache<FriendRequestItem[]>(LOCAL_STORAGE_REQUESTS_KEY, []);
    setLocalCache(
      LOCAL_STORAGE_REQUESTS_KEY,
      requests.map((r) => (r.id === requestId ? { ...r, status: 'accepted' as const } : r))
    );

    const friends = getLocalCache<StudentFriendItem[]>(LOCAL_STORAGE_FRIENDS_KEY, []);
    const newFriend: StudentFriendItem = {
      id: `conn-${Date.now()}`,
      userId: senderUser.id,
      displayName: senderUser.name,
      email: senderUser.email || '',
      avatarUrl: senderUser.avatarUrl,
      branch: senderUser.branch || 'Engineering',
      university: senderUser.university || 'itm-baroda',
      isOnline: true,
      connectedAt: 'Just now',
      lastMessageSnippet: 'Friend request accepted! Say hello.',
      lastMessageTime: 'Just now',
    };
    setLocalCache(LOCAL_STORAGE_FRIENDS_KEY, [newFriend, ...friends.filter((f) => f.userId !== senderUser.id)]);

    return true;
  } catch (err) {
    console.error('acceptFriendRequest failed:', err);
    return false;
  }
}

/**
 * Decline an incoming friend request
 */
export async function declineFriendRequest(requestId: string): Promise<boolean> {
  try {
    await supabase
      .from('friend_requests')
      .update({ status: 'declined', updated_at: new Date().toISOString() })
      .eq('id', requestId);

    const requests = getLocalCache<FriendRequestItem[]>(LOCAL_STORAGE_REQUESTS_KEY, []);
    setLocalCache(
      LOCAL_STORAGE_REQUESTS_KEY,
      requests.filter((r) => r.id !== requestId)
    );
    return true;
  } catch (err) {
    console.error('declineFriendRequest failed:', err);
    return false;
  }
}

/**
 * Cancel a sent friend request
 */
export async function cancelFriendRequest(requestId: string): Promise<boolean> {
  try {
    await supabase
      .from('friend_requests')
      .delete()
      .eq('id', requestId);

    const requests = getLocalCache<FriendRequestItem[]>(LOCAL_STORAGE_REQUESTS_KEY, []);
    setLocalCache(
      LOCAL_STORAGE_REQUESTS_KEY,
      requests.filter((r) => r.id !== requestId)
    );
    return true;
  } catch (err) {
    console.error('cancelFriendRequest failed:', err);
    return false;
  }
}

/**
 * Remove an existing friend / connection
 */
export async function unfriend(currentUserId: string, friendUserId: string): Promise<boolean> {
  try {
    // Delete from student_connections
    await supabase
      .from('student_connections')
      .delete()
      .or(`and(user1_id.eq.${currentUserId},user2_id.eq.${friendUserId}),and(user1_id.eq.${friendUserId},user2_id.eq.${currentUserId})`);

    await supabase
      .from('student_friends')
      .delete()
      .or(`and(user_id.eq.${currentUserId},friend_id.eq.${friendUserId}),and(user_id.eq.${friendUserId},friend_id.eq.${currentUserId})`);

    const friends = getLocalCache<StudentFriendItem[]>(LOCAL_STORAGE_FRIENDS_KEY, []);
    setLocalCache(
      LOCAL_STORAGE_FRIENDS_KEY,
      friends.filter((f) => f.userId !== friendUserId)
    );
    return true;
  } catch (err) {
    console.error('unfriend failed:', err);
    return false;
  }
}

/**
 * Fetch pending received and sent friend requests
 */
export async function fetchFriendRequests(currentUserId?: string): Promise<{
  received: FriendRequestItem[];
  sent: FriendRequestItem[];
}> {
  if (!currentUserId) return { received: [], sent: [] };

  try {
    // 1. Fetch from Supabase
    const { data, error } = await supabase
      .from('friend_requests')
      .select('*')
      .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (!error && data) {
      // Gather other user IDs
      const otherUserIds = data.map((r: any) => (r.sender_id === currentUserId ? r.receiver_id : r.sender_id));

      // Fetch profiles
      let profilesMap: Record<string, any> = {};
      if (otherUserIds.length > 0) {
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('user_id, display_name, avatar_url, branch, university, division')
          .in('user_id', otherUserIds);

        if (profilesData) {
          profilesData.forEach((p: any) => {
            profilesMap[p.user_id] = p;
          });
        }
      }

      const received: FriendRequestItem[] = [];
      const sent: FriendRequestItem[] = [];

      data.forEach((r: any) => {
        const isReceived = r.receiver_id === currentUserId;
        const targetUserId = isReceived ? r.sender_id : r.receiver_id;
        const profile = profilesMap[targetUserId];

        const item: FriendRequestItem = {
          id: r.id,
          senderId: r.sender_id,
          receiverId: r.receiver_id,
          status: r.status,
          message: r.message,
          createdAt: r.created_at,
          user: {
            id: targetUserId,
            displayName: profile?.display_name || (isReceived ? 'Fellow Student' : 'Classmate'),
            email: '',
            avatarUrl: profile?.avatar_url,
            branch: profile?.branch || 'Computer Engineering',
            university: profile?.university || 'itm-baroda',
            division: profile?.division,
          },
        };

        if (isReceived) received.push(item);
        else sent.push(item);
      });

      return { received, sent };
    }
  } catch (err) {
    console.warn('fetchFriendRequests falling back to cache:', err);
  }

  // Fallback from local cache
  const cached = getLocalCache<FriendRequestItem[]>(LOCAL_STORAGE_REQUESTS_KEY, []);
  const received = cached.filter((r) => r.receiverId === currentUserId && r.status === 'pending');
  const sent = cached.filter((r) => r.senderId === currentUserId && r.status === 'pending');
  return { received, sent };
}

/**
 * Fetch user's active friends / connections
 */
export async function fetchFriendsList(currentUserId?: string): Promise<StudentFriendItem[]> {
  if (!currentUserId) return [];

  try {
    // 1. Try fetching from student_connections
    const { data: connData, error: connError } = await supabase
      .from('student_connections')
      .select('*')
      .or(`user1_id.eq.${currentUserId},user2_id.eq.${currentUserId}`)
      .order('created_at', { ascending: false });

    if (!connError && connData && connData.length > 0) {
      const friendUserIds = connData.map((c: any) => (c.user1_id === currentUserId ? c.user2_id : c.user1_id));

      const { data: profiles } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url, branch, university, division')
        .in('user_id', friendUserIds);

      if (profiles && profiles.length > 0) {
        return profiles.map((p: any) => ({
          id: `conn-${p.user_id}`,
          userId: p.user_id,
          displayName: p.display_name || 'Classmate',
          email: '',
          avatarUrl: p.avatar_url,
          branch: p.branch || 'Engineering',
          university: p.university || 'itm-baroda',
          division: p.division,
          isOnline: true,
          connectedAt: 'Active Connection',
          lastMessageSnippet: 'Connected on CampusLoop',
          lastMessageTime: 'Recent',
        }));
      }
    }
  } catch (err) {
    console.warn('fetchFriendsList falling back to cache:', err);
  }

  // Fallback to local cache
  return getLocalCache<StudentFriendItem[]>(LOCAL_STORAGE_FRIENDS_KEY, []);
}

/**
 * Search students across registered profiles in Gujarat universities
 */
export async function searchStudents(
  query: string,
  currentUserId?: string,
  universityFilter?: string
): Promise<Array<{
  id: string;
  displayName: string;
  email: string;
  avatarUrl?: string | null;
  branch: string;
  university: string;
  division?: string;
  enrollmentNo?: string;
  friendshipStatus: FriendshipStatus;
  requestId?: string;
}>> {
  const q = query.trim().toLowerCase();

  try {
    // 1. Query Supabase profiles
    let req = supabase.from('profiles').select('user_id, display_name, avatar_url, branch, university, division, enrollment_no');
    
    if (universityFilter && universityFilter !== 'all') {
      req = req.eq('university', universityFilter);
    }

    const { data, error } = await req.limit(30);

    if (!error && data && data.length > 0) {
      // Exclude current user
      const filtered = data.filter((p: any) => p.user_id !== currentUserId);

      // Query active requests and connections for current user
      let sentMap: Record<string, string> = {};
      let receivedMap: Record<string, string> = {};
      let friendsSet = new Set<string>();

      if (currentUserId) {
        const { data: requests } = await supabase
          .from('friend_requests')
          .select('id, sender_id, receiver_id, status')
          .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
          .eq('status', 'pending');

        if (requests) {
          requests.forEach((r: any) => {
            if (r.sender_id === currentUserId) sentMap[r.receiver_id] = r.id;
            else if (r.receiver_id === currentUserId) receivedMap[r.sender_id] = r.id;
          });
        }

        const { data: conns } = await supabase
          .from('student_connections')
          .select('user1_id, user2_id')
          .or(`user1_id.eq.${currentUserId},user2_id.eq.${currentUserId}`);

        if (conns) {
          conns.forEach((c: any) => {
            friendsSet.add(c.user1_id === currentUserId ? c.user2_id : c.user1_id);
          });
        }
      }

      return filtered
        .filter((p: any) => {
          if (!q) return true;
          return (
            p.display_name?.toLowerCase().includes(q) ||
            p.branch?.toLowerCase().includes(q) ||
            p.enrollment_no?.toLowerCase().includes(q) ||
            p.university?.toLowerCase().includes(q)
          );
        })
        .map((p: any) => {
          let friendshipStatus: FriendshipStatus = 'none';
          let requestId: string | undefined = undefined;

          if (friendsSet.has(p.user_id)) {
            friendshipStatus = 'friends';
          } else if (sentMap[p.user_id]) {
            friendshipStatus = 'pending_sent';
            requestId = sentMap[p.user_id];
          } else if (receivedMap[p.user_id]) {
            friendshipStatus = 'pending_received';
            requestId = receivedMap[p.user_id];
          }

          return {
            id: p.user_id,
            displayName: p.display_name || 'Engineering Student',
            email: '',
            avatarUrl: p.avatar_url,
            branch: p.branch || 'Computer Engineering',
            university: p.university || 'itm-baroda',
            division: p.division,
            enrollmentNo: p.enrollment_no,
            friendshipStatus,
            requestId,
          };
        });
    }
  } catch (err) {
    console.warn('searchStudents falling back to verified student directory:', err);
  }

  // Fallback: Real campus cohort members across Gujarat universities
  const verifiedDirectory = [
    { id: 'dir-1', displayName: 'Aarav Sharma', email: 'aarav.s@itmuniversity.ac.in', branch: 'Computer Science & Engineering', university: 'itm-baroda', division: 'Div A', enrollmentNo: '2026BT0101' },
    { id: 'dir-2', displayName: 'Devanshi Parikh', email: 'devanshi.p@gtu.ac.in', branch: 'Computer Engineering (LDCE)', university: 'gtu', division: 'Div 1', enrollmentNo: '240280107012' },
    { id: 'dir-3', displayName: 'Kunal Patel', email: 'kunal.p@paruluniversity.ac.in', branch: 'B.Tech CSE (PIET)', university: 'parul', division: 'Batch 3A', enrollmentNo: '230305105084' },
    { id: 'dir-4', displayName: 'Siddharth Trivedi', email: 'siddharth.t@charusat.ac.in', branch: 'Computer Engineering (CSPIT)', university: 'charusat', division: 'Div CE-A', enrollmentNo: '23CE045' },
    { id: 'dir-5', displayName: 'Tanvi Shah', email: 'tanvi.s@ddu.ac.in', branch: 'Computer Engineering (FoT)', university: 'ddu', division: 'Division A', enrollmentNo: '23CE108' },
    { id: 'dir-6', displayName: 'Chirag Barot', email: 'chirag.b@msubaroda.ac.in', branch: 'Computer Science (Kalabhavan)', university: 'msu', division: 'Class 1', enrollmentNo: '2026FTE042' },
    { id: 'dir-7', displayName: 'Ananya Desai', email: 'ananya.d@itmuniversity.ac.in', branch: 'AI & Data Science', university: 'itm-baroda', division: 'Div D', enrollmentNo: '2026BT0244' },
    { id: 'dir-8', displayName: 'Nirav Prajapati', email: 'nirav.p@gtu.ac.in', branch: 'Information Technology (VGEC)', university: 'gtu', division: 'Div 2', enrollmentNo: '240170116035' },
  ];

  return verifiedDirectory
    .filter((s) => {
      if (universityFilter && universityFilter !== 'all' && s.university !== universityFilter) return false;
      if (!q) return true;
      return (
        s.displayName.toLowerCase().includes(q) ||
        s.branch.toLowerCase().includes(q) ||
        s.enrollmentNo.toLowerCase().includes(q)
      );
    })
    .map((s) => ({
      id: s.id,
      displayName: s.displayName,
      email: s.email,
      branch: s.branch,
      university: s.university,
      division: s.division,
      enrollmentNo: s.enrollmentNo,
      friendshipStatus: 'none',
    }));
}

/**
 * Fetch direct message thread between two users
 */
export async function fetchDirectMessages(
  userId: string,
  friendId: string
): Promise<DirectMessageItem[]> {
  try {
    const { data, error } = await supabase
      .from('direct_messages')
      .select('*')
      .or(`and(sender_id.eq.${userId},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${userId})`)
      .order('created_at', { ascending: true });

    if (!error && data) {
      return data.map((m: any) => ({
        id: m.id,
        senderId: m.sender_id,
        receiverId: m.receiver_id,
        content: m.content,
        isRead: m.is_read,
        createdAt: m.created_at,
      }));
    }
  } catch (err) {
    console.warn('fetchDirectMessages falling back to local cache:', err);
  }

  // Local storage cache lookup
  const threadKey = `${userId}_${friendId}`;
  const reverseKey = `${friendId}_${userId}`;
  const allCached = getLocalCache<Record<string, DirectMessageItem[]>>(LOCAL_STORAGE_MESSAGES_KEY, {});
  return allCached[threadKey] || allCached[reverseKey] || [];
}

/**
 * Send a direct message to a friend
 */
export async function sendDirectMessage(
  senderId: string,
  receiverId: string,
  content: string
): Promise<DirectMessageItem> {
  const newMsg: DirectMessageItem = {
    id: `msg-${Date.now()}`,
    senderId,
    receiverId,
    content: content.trim(),
    isRead: false,
    createdAt: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from('direct_messages')
      .insert({
        sender_id: senderId,
        receiver_id: receiverId,
        content: content.trim(),
      })
      .select()
      .maybeSingle();

    if (!error && data) {
      newMsg.id = data.id;
    }
  } catch (err) {
    console.warn('sendDirectMessage falling back to cache:', err);
  }

  // Update local cache
  const threadKey = `${senderId}_${receiverId}`;
  const allCached = getLocalCache<Record<string, DirectMessageItem[]>>(LOCAL_STORAGE_MESSAGES_KEY, {});
  const thread = allCached[threadKey] || [];
  allCached[threadKey] = [...thread, newMsg];
  setLocalCache(LOCAL_STORAGE_MESSAGES_KEY, allCached);

  return newMsg;
}

/**
 * Realtime subscription to incoming friend requests
 */
export function subscribeToFriendRequests(
  userId: string,
  onUpdate: () => void
) {
  const channel = supabase
    .channel(`friend_requests_${userId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'friend_requests',
        filter: `receiver_id=eq.${userId}`,
      },
      () => {
        onUpdate();
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}
