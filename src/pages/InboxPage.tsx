import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Edit3,
  Search,
  ChevronRight,
  Send,
  X,
  Check,
  UserCheck,
  UserX,
  UserPlus,
  ArrowLeft,
  Sparkles,
  Users,
  MessageSquare,
  Clock,
  MapPin,
  GraduationCap,
  ShieldAlert,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/contexts/UniversityContext';
import {
  CampusSearchField,
  CampusFilterChip,
  CampusConversationRow,
  CampusAvatar,
  CampusButton,
  CampusCountBadge,
} from '@/components/campusloop';
import {
  fetchFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  cancelFriendRequest,
  sendFriendRequest,
  fetchFriendsList,
  searchStudents,
  fetchDirectMessages,
  sendDirectMessage,
  subscribeToFriendRequests,
  FriendRequestItem,
  StudentFriendItem,
  DirectMessageItem,
} from '@/services/friendService';

type InboxTab = 'messages' | 'requests' | 'find';

export default function InboxPage() {
  const { user, profile } = useAuth();
  const { currentUniversity, allUniversities } = useUniversity();

  const [activeTab, setActiveTab] = useState<InboxTab>('messages');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnivFilter, setSelectedUnivFilter] = useState<string>('all');

  // Friends & conversations
  const [friends, setFriends] = useState<StudentFriendItem[]>([]);
  const [activeFriend, setActiveFriend] = useState<StudentFriendItem | null>(null);
  const [activeThreadMessages, setActiveThreadMessages] = useState<DirectMessageItem[]>([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // Friend requests
  const [receivedRequests, setReceivedRequests] = useState<FriendRequestItem[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendRequestItem[]>([]);

  // Classmate discovery
  const [discoveredStudents, setDiscoveredStudents] = useState<any[]>([]);
  const [isSearchingStudents, setIsSearchingStudents] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // Load all user network data
  const loadNetworkData = useCallback(async () => {
    if (!user?.id) return;
    try {
      setIsLoading(true);
      const [friendsData, requestsData] = await Promise.all([
        fetchFriendsList(user.id),
        fetchFriendRequests(user.id),
      ]);
      setFriends(friendsData);
      setReceivedRequests(requestsData.received);
      setSentRequests(requestsData.sent);
    } catch (err) {
      console.warn('Failed loading network data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    loadNetworkData();

    // Subscribe to realtime friend requests
    if (user?.id) {
      const unsub = subscribeToFriendRequests(user.id, () => {
        loadNetworkData();
        toast.info('New friend request activity received!');
      });
      return () => unsub();
    }
  }, [user?.id, loadNetworkData]);

  // Load classmate directory when switching to "find" tab
  useEffect(() => {
    if (activeTab === 'find') {
      const fetchDirectory = async () => {
        setIsSearchingStudents(true);
        const results = await searchStudents(searchQuery, user?.id, selectedUnivFilter);
        setDiscoveredStudents(results);
        setIsSearchingStudents(false);
      };
      fetchDirectory();
    }
  }, [activeTab, searchQuery, selectedUnivFilter, user?.id]);

  // Open direct chat thread
  const handleOpenChat = async (friend: StudentFriendItem) => {
    setActiveFriend(friend);
    if (user?.id) {
      const msgs = await fetchDirectMessages(user.id, friend.userId);
      setActiveThreadMessages(msgs);
    }
  };

  // Send message in active thread
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeFriend || !user?.id || isSendingMessage) return;

    try {
      setIsSendingMessage(true);
      const content = newMessageText.trim();
      setNewMessageText('');

      const sentMsg = await sendDirectMessage(user.id, activeFriend.userId, content);
      setActiveThreadMessages((prev) => [...prev, sentMsg]);

      // Update friend's last message in conversation list
      setFriends((prev) =>
        prev.map((f) =>
          f.userId === activeFriend.userId
            ? { ...f, lastMessageSnippet: `You: ${content}`, lastMessageTime: 'Just now' }
            : f
        )
      );
    } catch (err) {
      toast.error('Could not send message.');
    } finally {
      setIsSendingMessage(false);
    }
  };

  // Handle Accept Friend Request
  const handleAccept = async (req: FriendRequestItem) => {
    if (!user?.id) return;
    const success = await acceptFriendRequest(req.id, user.id, {
      id: req.senderId,
      name: req.user.displayName,
      email: req.user.email,
      branch: req.user.branch,
      university: req.user.university,
      avatarUrl: req.user.avatarUrl,
    });

    if (success) {
      toast.success(`You and ${req.user.displayName} are now connected!`);
      loadNetworkData();
    } else {
      toast.error('Could not accept friend request.');
    }
  };

  // Handle Decline Friend Request
  const handleDecline = async (reqId: string) => {
    const success = await declineFriendRequest(reqId);
    if (success) {
      toast.info('Friend request declined.');
      setReceivedRequests((prev) => prev.filter((r) => r.id !== reqId));
    }
  };

  // Handle Cancel Sent Request
  const handleCancelSent = async (reqId: string) => {
    const success = await cancelFriendRequest(reqId);
    if (success) {
      toast.info('Sent request cancelled.');
      setSentRequests((prev) => prev.filter((r) => r.id !== reqId));
    }
  };

  // Handle Send Friend Request to Discovered Student
  const handleSendRequestToStudent = async (targetStudent: any) => {
    if (!user?.id) {
      toast.info('Please sign in to send friend requests.');
      return;
    }

    const res = await sendFriendRequest(
      {
        id: user.id,
        name: profile?.display_name || user.email?.split('@')[0] || 'Student',
        email: user.email,
        branch: profile?.branch || 'Engineering',
        university: currentUniversity.id,
      },
      targetStudent.id
    );

    if (res.success) {
      toast.success(`Friend request sent to ${targetStudent.displayName}!`);
      setDiscoveredStudents((prev) =>
        prev.map((s) => (s.id === targetStudent.id ? { ...s, friendshipStatus: 'pending_sent' } : s))
      );
      loadNetworkData();
    } else {
      toast.error(res.error || 'Failed to send friend request.');
    }
  };

  // Filtered friends list
  const filteredFriends = useMemo(() => {
    if (!searchQuery.trim()) return friends;
    const q = searchQuery.toLowerCase();
    return friends.filter(
      (f) =>
        f.displayName.toLowerCase().includes(q) ||
        f.branch.toLowerCase().includes(q) ||
        f.university.toLowerCase().includes(q)
    );
  }, [friends, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F6F3EC] dark:bg-[#0E0E10] text-[#111111] dark:text-neutral-100 pb-20 select-none">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 space-y-5">
        
        {/* 1. Header: "Messages & Campus Connections" */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#2B4EFF]/10 text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300">
                {currentUniversity.shortName} Network
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#111111] dark:text-white font-display mt-0.5">
              Messages & Connections
            </h1>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center bg-white dark:bg-neutral-800 p-1 rounded-full border border-[#E8E4DA] dark:border-neutral-700 shadow-2xs self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-2xs'
                  : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Chats</span>
              {friends.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-white/20">
                  {friends.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('requests')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer relative ${
                activeTab === 'requests'
                  ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111] shadow-2xs'
                  : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              <UserCheck className="h-3.5 w-3.5" />
              <span>Requests</span>
              {receivedRequests.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-rose-500 text-white font-bold animate-pulse">
                  {receivedRequests.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('find')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'find'
                  ? 'bg-[#2B4EFF] text-white shadow-2xs'
                  : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111] dark:hover:text-white'
              }`}
            >
              <UserPlus className="h-3.5 w-3.5" />
              <span>Find Classmates</span>
            </button>
          </div>
        </div>

        {/* 2. Search Field */}
        <div className="relative">
          <CampusSearchField
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={
              activeTab === 'find'
                ? "Search classmates by name, enrollment no, or branch..."
                : "Search conversations and connected friends..."
            }
          />
        </div>

        {/* ── TAB 1: DIRECT CHATS & CONNECTED FRIENDS ── */}
        {activeTab === 'messages' && (
          <div className="space-y-4 animate-fade-in">
            {filteredFriends.length === 0 ? (
              <div className="p-8 sm:p-12 text-center rounded-[24px] bg-white dark:bg-[#18181B] border border-[#E8E4DA] dark:border-neutral-800 space-y-4 shadow-xs">
                <div className="w-16 h-16 rounded-3xl bg-[#2B4EFF]/10 text-[#2B4EFF] flex items-center justify-center mx-auto shadow-inner">
                  <MessageSquare className="h-8 w-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1.5 max-w-md mx-auto">
                  <h3 className="text-base sm:text-lg font-bold text-[#111111] dark:text-white">
                    No Direct Conversations Yet
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] dark:text-neutral-400 leading-relaxed">
                    Connect with fellow engineering students across Gujarat universities to exchange notes, discuss practical solutions, and form study groups.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('find')}
                  className="px-5 py-2.5 rounded-full bg-[#2B4EFF] hover:bg-blue-600 text-white font-bold text-xs shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Find & Add Classmates</span>
                </button>
              </div>
            ) : (
              <div className="rounded-[24px] bg-white dark:bg-[#18181B] border border-[#E8E4DA] dark:border-neutral-800 p-2 divide-y divide-[#EFECE6] dark:divide-neutral-800/80 shadow-xs">
                {filteredFriends.map((f) => (
                  <CampusConversationRow
                    key={f.userId}
                    id={f.userId}
                    name={f.displayName}
                    avatarUrl={f.avatarUrl}
                    lastMessage={f.lastMessageSnippet || 'Connected on CampusLoop'}
                    timestamp={f.lastMessageTime || 'Recent'}
                    unreadCount={0}
                    isOnline={f.isOnline}
                    onClick={() => handleOpenChat(f)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── TAB 2: FRIEND REQUESTS (RECEIVED & SENT) ── */}
        {activeTab === 'requests' && (
          <div className="space-y-5 animate-fade-in">
            {/* Received Requests */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black uppercase tracking-wider text-[#6B7280] dark:text-neutral-400">
                  Received Requests ({receivedRequests.length})
                </h3>
              </div>

              {receivedRequests.length === 0 ? (
                <div className="p-6 text-center rounded-[20px] bg-white dark:bg-[#18181B] border border-[#E8E4DA] dark:border-neutral-800 text-xs text-[#6B7280] dark:text-neutral-400">
                  No incoming friend requests. Classmates who add you will appear here.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {receivedRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-[20px] bg-white dark:bg-[#18181B] border border-[#E8E4DA] dark:border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="flex items-start gap-3">
                        <CampusAvatar
                          src={req.user.avatarUrl}
                          name={req.user.displayName}
                          size={44}
                        />
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-sm text-[#111111] dark:text-white">
                            {req.user.displayName}
                          </h4>
                          <p className="text-xs text-[#6B7280] dark:text-neutral-400">
                            {req.user.branch} • <span className="uppercase font-semibold text-primary">{req.user.university}</span>
                          </p>
                          {req.message && (
                            <p className="text-xs text-[#111111] dark:text-neutral-200 bg-[#F6F3EC] dark:bg-neutral-800/80 p-2 rounded-xl mt-1 leading-snug">
                              "{req.message}"
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        <button
                          type="button"
                          onClick={() => handleAccept(req)}
                          className="px-4 py-2 rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-bold shadow-2xs hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span>Accept</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDecline(req.id)}
                          className="px-3 py-2 rounded-full border border-[#E8E4DA] dark:border-neutral-700 text-[#6B7280] dark:text-neutral-400 hover:text-rose-500 hover:border-rose-300 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sent Requests */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#6B7280] dark:text-neutral-400">
                Pending Sent Requests ({sentRequests.length})
              </h3>

              {sentRequests.length === 0 ? (
                <div className="p-4 text-center rounded-[18px] bg-white dark:bg-[#18181B] border border-[#E8E4DA] dark:border-neutral-800 text-xs text-[#6B7280] dark:text-neutral-400">
                  No pending sent requests.
                </div>
              ) : (
                <div className="space-y-2">
                  {sentRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-3.5 rounded-[18px] bg-white dark:bg-[#18181B] border border-[#E8E4DA] dark:border-neutral-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                        <div>
                          <p className="font-bold text-[#111111] dark:text-white">
                            Request sent to {req.user.displayName}
                          </p>
                          <span className="text-[11px] text-[#6B7280] dark:text-neutral-400">
                            Awaiting response
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCancelSent(req.id)}
                        className="px-3 py-1.5 rounded-full border border-border hover:bg-rose-500/10 hover:text-rose-600 text-[11px] font-semibold transition-colors cursor-pointer"
                      >
                        Cancel Request
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── TAB 3: FIND CLASSMATES (CAMPUS DIRECTORY) ── */}
        {activeTab === 'find' && (
          <div className="space-y-4 animate-fade-in">
            {/* Campus Filter Row */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                type="button"
                onClick={() => setSelectedUnivFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedUnivFilter === 'all'
                    ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111]'
                    : 'bg-white dark:bg-neutral-800 border border-[#E8E4DA] dark:border-neutral-700 text-[#6B7280] dark:text-neutral-300'
                }`}
              >
                All Gujarat
              </button>
              {allUniversities.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setSelectedUnivFilter(u.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    selectedUnivFilter === u.id
                      ? 'bg-[#2B4EFF] text-white shadow-2xs'
                      : 'bg-white dark:bg-neutral-800 border border-[#E8E4DA] dark:border-neutral-700 text-[#6B7280] dark:text-neutral-300'
                  }`}
                >
                  {u.shortName}
                </button>
              ))}
            </div>

            {/* Students List */}
            {isSearchingStudents ? (
              <div className="p-8 text-center text-xs text-[#6B7280] dark:text-neutral-400">
                Searching verified student directory...
              </div>
            ) : discoveredStudents.length === 0 ? (
              <div className="p-8 text-center rounded-[20px] bg-white dark:bg-[#18181B] border border-[#E8E4DA] dark:border-neutral-800 text-xs text-[#6B7280] dark:text-neutral-400">
                No students found matching your search.
              </div>
            ) : (
              <div className="space-y-2.5">
                {discoveredStudents.map((st) => {
                  const isFriend = st.friendshipStatus === 'friends';
                  const isSent = st.friendshipStatus === 'pending_sent';
                  const isReceived = st.friendshipStatus === 'pending_received';

                  return (
                    <div
                      key={st.id}
                      className="p-3.5 sm:p-4 rounded-[20px] bg-white dark:bg-[#18181B] border border-[#E8E4DA] dark:border-neutral-800 flex items-center justify-between gap-3 shadow-2xs hover:border-[#2B4EFF]/40 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <CampusAvatar
                          src={st.avatarUrl}
                          name={st.displayName}
                          size={44}
                        />
                        <div className="space-y-0.5 min-w-0">
                          <h4 className="font-bold text-sm text-[#111111] dark:text-white truncate">
                            {st.displayName}
                          </h4>
                          <p className="text-xs text-[#6B7280] dark:text-neutral-400 truncate">
                            {st.branch} {st.division ? `(${st.division})` : ''}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-[#6B7280] dark:text-neutral-400">
                            <span className="font-semibold text-primary uppercase">{st.university}</span>
                            {st.enrollmentNo && <span>• {st.enrollmentNo}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {isFriend ? (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('messages');
                              handleOpenChat({
                                id: st.id,
                                userId: st.id,
                                displayName: st.displayName,
                                email: st.email,
                                avatarUrl: st.avatarUrl,
                                branch: st.branch,
                                university: st.university,
                                isOnline: true,
                                connectedAt: 'Connected',
                              });
                            }}
                            className="px-3.5 py-1.5 rounded-full bg-[#E6EAFD] dark:bg-blue-950/40 text-[#2B4EFF] dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-900/40 hover:bg-[#D8E0FC] transition-colors cursor-pointer"
                          >
                            Message 💬
                          </button>
                        ) : isSent ? (
                          <span className="px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-semibold">
                            Request Sent
                          </span>
                        ) : isReceived ? (
                          <button
                            type="button"
                            onClick={() => setActiveTab('requests')}
                            className="px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                          >
                            Respond to Req
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSendRequestToStudent(st)}
                            className="px-3.5 py-1.5 rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-xs font-bold hover:opacity-90 shadow-2xs transition-opacity flex items-center gap-1.5 cursor-pointer"
                          >
                            <UserPlus className="h-3.5 w-3.5" />
                            <span>Add Friend</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ── ACTIVE CHAT MODAL ── */}
      {activeFriend && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4"
          onClick={() => setActiveFriend(null)}
        >
          <div
            className="w-full max-w-lg h-[85vh] bg-white dark:bg-[#18181B] rounded-[24px] border border-[#E8E4DA] dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-[#EFECE6] dark:border-neutral-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveFriend(null)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </button>
                <CampusAvatar
                  src={activeFriend.avatarUrl}
                  name={activeFriend.displayName}
                  size={38}
                  status="online"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-sm sm:text-base text-[#111111] dark:text-white truncate">
                    {activeFriend.displayName}
                  </h3>
                  <p className="text-[11px] text-[#6B7280] dark:text-neutral-400 font-medium truncate">
                    {activeFriend.branch} • <span className="uppercase text-primary font-bold">{activeFriend.university}</span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveFriend(null)}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Message Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F6F3EC]/50 dark:bg-neutral-900/40">
              {activeThreadMessages.length === 0 ? (
                <div className="text-center py-12 text-[#6B7280] dark:text-neutral-400 space-y-2">
                  <Sparkles className="h-8 w-8 mx-auto text-[#2B4EFF]" />
                  <p className="font-bold text-sm text-[#111111] dark:text-white">
                    Start of your direct academic chat
                  </p>
                  <p className="text-xs max-w-xs mx-auto">
                    Share exam preparation queries, ask for lab advice, or coordinate study sessions.
                  </p>
                </div>
              ) : (
                activeThreadMessages.map((msg) => {
                  const isMe = msg.senderId === user?.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-normal shadow-2xs leading-relaxed ${
                          isMe
                            ? 'bg-[#2B4EFF] text-white rounded-br-xs'
                            : 'bg-white dark:bg-[#27272A] text-[#111111] dark:text-white border border-[#E8E4DA] dark:border-neutral-700 rounded-bl-xs'
                        }`}
                      >
                        {msg.content}
                      </div>
                      <span className="text-[10px] text-neutral-400 px-1 mt-1 font-mono">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-[#EFECE6] dark:border-neutral-800 flex items-center gap-2 bg-white dark:bg-[#18181B]"
            >
              <input
                type="text"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                placeholder={`Message ${activeFriend.displayName}...`}
                className="flex-1 h-11 px-4 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 border border-[#E8E4DA] dark:border-neutral-700 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-[#2B4EFF] text-[#111111] dark:text-white placeholder:text-neutral-400"
              />
              <button
                type="submit"
                disabled={!newMessageText.trim() || isSendingMessage}
                className="w-11 h-11 rounded-full bg-[#2B4EFF] text-white flex items-center justify-center hover:bg-blue-600 disabled:opacity-40 transition-all shadow-xs cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
