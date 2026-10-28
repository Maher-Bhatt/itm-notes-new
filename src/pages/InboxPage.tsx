import React, { useState, useMemo, useEffect } from 'react';
import {
  Edit3,
  Search,
  ChevronRight,
  Send,
  X,
  Check,
  UserCheck,
  UserX,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import {
  CampusSearchField,
  CampusFilterChip,
  CampusConversationRow,
  CampusAvatar,
  CampusButton,
  CampusCountBadge,
} from '@/components/campusloop';

type MessageFilter = 'All' | 'Unread' | 'Clubs' | 'Groups';

interface Conversation {
  id: string;
  name: string;
  avatarUrl?: string | null;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  type: 'direct' | 'club' | 'group';
  messages: Array<{ id: string; sender: 'me' | 'them'; text: string; time: string }>;
}

interface MessageRequest {
  id: string;
  name: string;
  department: string;
  snippet: string;
  time: string;
}

const DEFAULT_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-study-dsa',
    name: 'Study Squad · DSA',
    lastMessage: "Kabir: I'll book the room for 6 PM",
    timestamp: '2m',
    unreadCount: 3,
    isOnline: true,
    type: 'group',
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey guys, are we meeting today for Trees revision?', time: '5:45 PM' },
      { id: 'm2', sender: 'them', text: "Kabir: I'll book the room for 6 PM", time: '5:48 PM' },
    ],
  },
  {
    id: 'conv-diya',
    name: 'Diya Shah',
    lastMessage: 'Sent you the Figma file. Check the project notes!',
    timestamp: '12m',
    unreadCount: 1,
    isOnline: true,
    type: 'direct',
    messages: [
      { id: 'm1', sender: 'me', text: 'Hey Diya, did you finalize the UI layout for our project?', time: '4:20 PM' },
      { id: 'm2', sender: 'them', text: 'Sent you the Figma file. Check the project notes!', time: '4:30 PM' },
    ],
  },
  {
    id: 'conv-robotics',
    name: 'Robotics Club',
    lastMessage: 'Build night moved to Block C, 7 PM',
    timestamp: '1h',
    unreadCount: 0,
    isOnline: false,
    type: 'club',
    messages: [
      { id: 'm1', sender: 'them', text: 'Build night moved to Block C, 7 PM', time: '1:00 PM' },
    ],
  },
  {
    id: 'conv-sana',
    name: 'Sana Qureshi',
    lastMessage: 'Thanks for the notes!',
    timestamp: '3h',
    unreadCount: 0,
    isOnline: true,
    type: 'direct',
    messages: [
      { id: 'm1', sender: 'them', text: 'Thanks for the notes!', time: '11:15 AM' },
    ],
  },
  {
    id: 'conv-placement',
    name: 'Placement Cell Group',
    lastMessage: 'Resume workshop registration closes tonight at 9 PM',
    timestamp: '5h',
    unreadCount: 1,
    isOnline: false,
    type: 'group',
    messages: [
      { id: 'm1', sender: 'them', text: 'Resume workshop registration closes tonight at 9 PM', time: '9:00 AM' },
    ],
  },
  {
    id: 'conv-rohan',
    name: 'Rohan Desai',
    lastMessage: 'You: See you at the amphitheatre...',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
    type: 'direct',
    messages: [
      { id: 'm1', sender: 'me', text: 'See you at the amphitheatre...', time: 'Yesterday' },
    ],
  },
];

const DEFAULT_REQUESTS: MessageRequest[] = [
  { id: 'req-1', name: 'Ishaan Patel', department: 'B.Tech CSE Y2', snippet: 'Hey, are you taking Microprocessors with Prof. Trivedi?', time: '1d ago' },
  { id: 'req-2', name: 'Tara Joshi', department: 'B.Tech IT Y3', snippet: 'Do you have the question bank for Unit 3?', time: '2d ago' },
];

const INBOX_STORAGE_KEY = 'campusloop_inbox_conversations';
const REQUESTS_STORAGE_KEY = 'campusloop_inbox_requests';

export default function InboxPage() {
  const { user } = useAuth();

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const stored = localStorage.getItem(INBOX_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_CONVERSATIONS;
  });

  const [requests, setRequests] = useState<MessageRequest[]>(() => {
    try {
      const stored = localStorage.getItem(REQUESTS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_REQUESTS;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<MessageFilter>('All');
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [newMessageText, setNewMessageText] = useState('');
  const [showRequestsModal, setShowRequestsModal] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [newRecipientName, setNewRecipientName] = useState('');

  // Persist conversations
  useEffect(() => {
    try {
      localStorage.setItem(INBOX_STORAGE_KEY, JSON.stringify(conversations));
    } catch {}
  }, [conversations]);

  // Persist requests
  useEffect(() => {
    try {
      localStorage.setItem(REQUESTS_STORAGE_KEY, JSON.stringify(requests));
    } catch {}
  }, [requests]);

  // Total unread count
  const totalUnread = useMemo(() => {
    return conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  }, [conversations]);

  // Filter conversations
  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      if (selectedFilter === 'Unread' && c.unreadCount === 0) return false;
      if (selectedFilter === 'Clubs' && c.type !== 'club') return false;
      if (selectedFilter === 'Groups' && c.type !== 'group') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.lastMessage.toLowerCase().includes(q);
      }
      return true;
    });
  }, [conversations, selectedFilter, searchQuery]);

  // Open conversation
  const handleOpenConversation = (conv: Conversation) => {
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === conv.id ? { ...c, unreadCount: 0 } : c))
    );
    setActiveConversation({ ...conv, unreadCount: 0 });
  };

  // Send message in active thread
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim() || !activeConversation) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: 'me' as const,
      text: newMessageText.trim(),
      time: 'Just now',
    };

    const updatedConv: Conversation = {
      ...activeConversation,
      lastMessage: `You: ${newMsg.text}`,
      timestamp: 'Just now',
      messages: [...activeConversation.messages, newMsg],
    };

    setActiveConversation(updatedConv);
    setConversations((prev) =>
      prev.map((c) => (c.id === activeConversation.id ? updatedConv : c))
    );
    setNewMessageText('');
  };

  // Accept request
  const handleAcceptRequest = (req: MessageRequest) => {
    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      name: req.name,
      lastMessage: req.snippet,
      timestamp: 'Just now',
      unreadCount: 1,
      isOnline: true,
      type: 'direct',
      messages: [{ id: 'm1', sender: 'them', text: req.snippet, time: 'Just now' }],
    };
    setConversations((prev) => [newConv, ...prev]);
    setRequests((prev) => prev.filter((r) => r.id !== req.id));
    toast.success(`Connected with ${req.name}!`);
  };

  // Decline request
  const handleDeclineRequest = (reqId: string) => {
    setRequests((prev) => prev.filter((r) => r.id !== reqId));
    toast.info('Request removed.');
  };

  // Start new conversation from compose
  const handleStartCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipientName.trim()) return;

    const newConv: Conversation = {
      id: `conv-${Date.now()}`,
      name: newRecipientName.trim(),
      lastMessage: 'Conversation started',
      timestamp: 'Just now',
      unreadCount: 0,
      isOnline: true,
      type: 'direct',
      messages: [{ id: 'm1', sender: 'me', text: 'Hey! Connected via CampusLoop.', time: 'Just now' }],
    };

    setConversations((prev) => [newConv, ...prev]);
    setActiveConversation(newConv);
    setShowComposeModal(false);
    setNewRecipientName('');
  };

  return (
    <div className="min-h-screen bg-[#F6F3EC] dark:bg-[#0E0E10] text-[#111111] dark:text-neutral-100 pb-20">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 space-y-5">
        {/* 1. Header: "Messages" + Blue compose button */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111111] dark:text-white">
              Messages
            </h1>
            {totalUnread > 0 && <CampusCountBadge count={totalUnread} variant="blue" />}
          </div>

          <button
            type="button"
            onClick={() => setShowComposeModal(true)}
            title="New Message"
            className="w-11 h-11 rounded-2xl bg-[#2B4EFF] hover:bg-[#1E3EDB] text-white flex items-center justify-center shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <Edit3 className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Search Field */}
        <CampusSearchField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search people, clubs, groups..."
        />

        {/* 3. Filter Chips: All, Unread, Clubs, Groups */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
          {(['All', 'Unread', 'Clubs', 'Groups'] as MessageFilter[]).map((filter) => (
            <CampusFilterChip
              key={filter}
              active={selectedFilter === filter}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </CampusFilterChip>
          ))}
        </div>

        {/* 4. "Message Requests" Row */}
        {requests.length > 0 && (
          <div
            onClick={() => setShowRequestsModal(true)}
            className="rounded-[22px] bg-[#E6EAFD] dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-xs hover:border-[#2B4EFF] transition-all cursor-pointer select-none"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              {/* Stacked Avatars */}
              <div className="flex -space-x-2 shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#FDE8E0] text-[#B91C1C] flex items-center justify-center text-xs font-bold border-2 border-white dark:border-[#1C1C1E]">
                  IP
                </div>
                <div className="w-8 h-8 rounded-full bg-[#EAF6B0] text-[#3E5200] flex items-center justify-center text-xs font-bold border-2 border-white dark:border-[#1C1C1E]">
                  TJ
                </div>
              </div>

              <div className="min-w-0">
                <h4 className="font-bold text-sm text-[#111111] dark:text-white leading-tight">
                  Message requests
                </h4>
                <p className="text-xs text-[#2B4EFF] dark:text-blue-300 font-medium truncate mt-0.5">
                  {requests.map((r) => r.name.split(' ')[0]).join(', ')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="w-5 h-5 rounded-full bg-[#2B4EFF] text-white text-xs font-bold flex items-center justify-center">
                {requests.length}
              </span>
              <ChevronRight className="w-5 h-5 text-neutral-400" />
            </div>
          </div>
        )}

        {/* 5. Conversation Rows List */}
        <div className="rounded-[24px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 divide-y divide-[#EFECE6] dark:divide-neutral-800/80 overflow-hidden shadow-xs">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="font-bold text-sm text-[#111111] dark:text-white">
                No conversations found
              </p>
              <p className="text-xs text-[#6B7280] dark:text-neutral-400">
                Start a new chat by tapping the compose icon above.
              </p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <CampusConversationRow
                key={conv.id}
                id={conv.id}
                name={conv.name}
                avatarUrl={conv.avatarUrl}
                lastMessage={conv.lastMessage}
                timestamp={conv.timestamp}
                unreadCount={conv.unreadCount}
                isOnline={conv.isOnline}
                onClick={() => handleOpenConversation(conv)}
              />
            ))
          )}
        </div>
      </div>

      {/* 6. Active Chat Thread Modal / Drawer */}
      {activeConversation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4">
          <div
            className="w-full max-w-lg h-[90vh] bg-white dark:bg-[#18181B] rounded-[24px] border border-[#E8E4DA] dark:border-neutral-800 shadow-2xl flex flex-col overflow-hidden animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Chat Header */}
            <div className="p-4 border-b border-[#EFECE6] dark:border-neutral-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveConversation(null)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </button>
                <CampusAvatar
                  src={activeConversation.avatarUrl}
                  name={activeConversation.name}
                  size={36}
                  status={activeConversation.isOnline ? 'online' : undefined}
                />
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-[#111111] dark:text-white">
                    {activeConversation.name}
                  </h3>
                  <span className="text-[11px] text-[#6B7280] dark:text-neutral-400 font-medium">
                    {activeConversation.isOnline ? 'Online now' : 'Campus Member'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveConversation(null)}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="w-5 h-5 text-neutral-400" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F6F3EC]/50 dark:bg-neutral-900/40">
              {activeConversation.messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'me' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-normal shadow-2xs leading-relaxed ${
                      m.sender === 'me'
                        ? 'bg-[#2B4EFF] text-white rounded-br-xs'
                        : 'bg-white dark:bg-[#1C1C1E] text-[#111111] dark:text-neutral-200 border border-[#E8E4DA] dark:border-neutral-800 rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-[#6B7280] dark:text-neutral-500 mt-1 px-1">
                    {m.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Chat Send Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-3.5 border-t border-[#EFECE6] dark:border-neutral-800 bg-white dark:bg-[#18181B] flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                placeholder={`Message ${activeConversation.name.split(' ')[0]}...`}
                className="h-11 flex-1 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 text-xs sm:text-sm px-4 border border-[#E8E4DA] dark:border-neutral-700 focus:outline-none focus:border-[#2B4EFF]"
              />
              <button
                type="submit"
                disabled={!newMessageText.trim()}
                className="w-11 h-11 rounded-full bg-[#2B4EFF] text-white flex items-center justify-center hover:bg-[#1E3EDB] disabled:opacity-50 transition-all shrink-0 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 7. Message Requests Modal */}
      {showRequestsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowRequestsModal(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-[#18181B] rounded-[24px] border border-[#E8E4DA] p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-bold text-base text-[#111111] dark:text-white">
                Message Requests ({requests.length})
              </h3>
              <button
                type="button"
                onClick={() => setShowRequestsModal(false)}
                className="p-1 rounded-full hover:bg-neutral-100"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 rounded-2xl bg-[#F6F3EC] dark:bg-neutral-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#111111] dark:text-white">{req.name}</h4>
                      <p className="text-[11px] text-neutral-500">{req.department}</p>
                    </div>
                    <span className="text-[10px] text-neutral-400">{req.time}</span>
                  </div>

                  <p className="text-xs text-neutral-700 dark:text-neutral-300 font-medium">
                    "{req.snippet}"
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleAcceptRequest(req)}
                      className="flex-1 h-9 rounded-full bg-[#2B4EFF] text-white font-bold text-xs hover:bg-[#1E3EDB] flex items-center justify-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>Accept</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeclineRequest(req.id)}
                      className="flex-1 h-9 rounded-full bg-white dark:bg-neutral-700 border border-[#E8E4DA] text-neutral-700 dark:text-neutral-200 font-bold text-xs hover:bg-neutral-100 flex items-center justify-center gap-1.5"
                    >
                      <UserX className="w-3.5 h-3.5" />
                      <span>Decline</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. Compose New Message Modal */}
      {showComposeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowComposeModal(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-[#18181B] rounded-[24px] border border-[#E8E4DA] p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-bold text-base text-[#111111] dark:text-white">
                New Campus Message
              </h3>
              <button
                type="button"
                onClick={() => setShowComposeModal(false)}
                className="p-1 rounded-full hover:bg-neutral-100"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <form onSubmit={handleStartCompose} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                  Send to:
                </label>
                <input
                  type="text"
                  value={newRecipientName}
                  onChange={(e) => setNewRecipientName(e.target.value)}
                  placeholder="Enter peer name (e.g. Kabir, Diya, Rohan)..."
                  className="w-full h-11 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-sm px-4 border border-[#E8E4DA] dark:border-neutral-700 focus:outline-none focus:border-[#2B4EFF]"
                />
              </div>

              <button
                type="submit"
                disabled={!newRecipientName.trim()}
                className="w-full h-11 rounded-full bg-[#2B4EFF] text-white font-bold text-sm hover:bg-[#1E3EDB] disabled:opacity-50 transition-all cursor-pointer"
              >
                Start Conversation
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
