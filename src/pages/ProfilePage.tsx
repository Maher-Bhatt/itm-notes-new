import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/hooks/useGamification';
import { useProgress } from '@/hooks/useProgress';
import {
  Check,
  Menu,
  Share2,
  Edit3,
  Calendar,
  Bookmark,
  Award,
  Trophy,
  Flame,
  Clock,
  Sparkles,
  Sliders,
  Shield,
  Bell,
  BellOff,
  LogOut,
  Camera,
  X,
  Target,
  FileText,
  Trash2,
  Heart,
  MessageCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  CampusAvatar,
  CampusButton,
  CampusPostCard,
  CampusEventRow,
  CampusTag,
} from '@/components/campusloop';
import {
  fetchCampusFollows,
  fetchCampusEvents,
  CampusEventItem,
  fetchCampusSavedPostIds,
} from '@/services/campusLoopService';
import { fetchCommunityPosts } from '@/services/communityService';
import { CommunityPost, isFakePost } from '@/data/communityData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  registerPushSubscription,
  unsubscribePush,
  getPushSubscriptionStatus,
} from '@/services/pushNotificationService';
import { DataExportDeleteModal } from '@/components/DataExportDeleteModal';

export const GRADIENT_AVATARS = [
  { id: 'grad-blue', bgClass: 'from-blue-600 to-indigo-700' },
  { id: 'grad-purple', bgClass: 'from-purple-600 to-pink-600' },
  { id: 'grad-amber', bgClass: 'from-amber-500 to-orange-600' },
  { id: 'grad-emerald', bgClass: 'from-emerald-500 to-teal-700' },
  { id: 'grad-rose', bgClass: 'from-rose-500 to-red-600' },
  { id: 'grad-dark', bgClass: 'from-zinc-700 to-zinc-950' },
];

export function renderAvatarBox(avatarUrl?: string | null, name?: string, sizeClass = 'w-12 h-12 text-lg') {
  if (avatarUrl?.startsWith('http') || avatarUrl?.startsWith('blob:') || avatarUrl?.startsWith('data:')) {
    return (
      <img
        src={avatarUrl}
        alt={name || 'Avatar'}
        className={`${sizeClass} rounded-2xl object-cover border border-border shadow-2xs`}
      />
    );
  }
  const grad = GRADIENT_AVATARS.find((g) => g.id === avatarUrl) || GRADIENT_AVATARS[0];
  const initial = (name || 'S').charAt(0).toUpperCase();
  return (
    <div
      className={`${sizeClass} rounded-2xl bg-gradient-to-tr ${grad.bgClass} text-white font-bold flex items-center justify-center border border-border shadow-2xs`}
    >
      {initial}
    </div>
  );
}

type ProfileTab = 'posts' | 'events' | 'saved' | 'settings';

export default function ProfilePage() {
  const { user, profile, role, updateProfile, uploadAvatar, signOut } = useAuth();
  const navigate = useNavigate();
  const { state: game, levelInfo } = useGamification();
  const { progress } = useProgress();

  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [userPosts, setUserPosts] = useState<CommunityPost[]>([]);
  const [userEvents, setUserEvents] = useState<CampusEventItem[]>([]);
  const [savedPosts, setSavedPosts] = useState<CommunityPost[]>([]);
  const [followersCount, setFollowersCount] = useState(248);
  const [followingCount, setFollowingCount] = useState(190);
  const [isLoading, setIsLoading] = useState(true);

  // Edit profile state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editBranch, setEditBranch] = useState('');
  const [editBio, setEditBio] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Settings & notifications state
  const [pushEnabled, setPushEnabled] = useState(false);
  const [isPushLoading, setIsPushLoading] = useState(false);
  const [isDataExportOpen, setIsDataExportOpen] = useState(false);

  const displayName = profile?.display_name || user?.user_metadata?.full_name || 'Aarav Mehta';
  const handleName = (user?.email?.split('@')[0] || displayName.toLowerCase().replace(/\s+/g, '.'));
  const branchName = profile?.branch || 'B.Tech CSE · Year 2';
  const bio = (profile as any)?.bio || 'Building at the Innovation Lab. Learning DSA one dry run at a time.';

  // Load user data
  useEffect(() => {
    async function loadProfileData() {
      try {
        setIsLoading(true);
        const [posts, events, follows, savedIds] = await Promise.all([
          fetchCommunityPosts(user?.id),
          fetchCampusEvents(user?.id),
          fetchCampusFollows(user?.id),
          fetchCampusSavedPostIds(user?.id),
        ]);

        const realPosts = (posts || []).filter((p) => !isFakePost(p));
        // Filter user's own posts
        const myPosts = realPosts.filter(
          (p) =>
            p.authorId === user?.id ||
            p.authorName === displayName ||
            p.authorEmail === user?.email
        );
        setUserPosts(myPosts);

        // Filter events user RSVP'd to
        const myEvents = events.filter((e) => e.hasRsvp);
        setUserEvents(myEvents);

        // Filter saved posts
        const mySaved = realPosts.filter((p) => savedIds.has(p.id));
        setSavedPosts(mySaved);

        setFollowersCount(follows.followersCount || 248);
        setFollowingCount(follows.followingCount || 190);
      } catch (err) {
        console.warn('Profile data load failed:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfileData();

    if (user?.id) {
      getPushSubscriptionStatus(user.id).then(setPushEnabled);
    }
  }, [user?.id, displayName, user?.email]);

  // Open edit modal
  const openEditModal = () => {
    setEditName(displayName);
    setEditBranch(branchName);
    setEditBio(bio);
    setIsEditModalOpen(true);
  };

  // Save profile changes
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await updateProfile({
        display_name: editName.trim(),
        branch: editBranch.trim(),
        bio: editBio.trim(),
      } as any);
      toast.success('Profile updated successfully!');
      setIsEditModalOpen(false);
    } catch {
      toast.error('Could not save profile changes.');
    } finally {
      setIsSaving(false);
    }
  };

  // Share profile
  const handleShareProfile = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: `${displayName} on CampusLoop`, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Profile link copied to clipboard!');
    }
  };

  // Toggle push notifications
  const handleTogglePush = async (enable: boolean) => {
    if (!user?.id) return;
    setIsPushLoading(true);
    try {
      if (enable) {
        const success = await registerPushSubscription(user.id);
        if (success) {
          setPushEnabled(true);
          toast.success('Push notifications active!');
        } else {
          toast.error('Notification permission was blocked in browser.');
        }
      } else {
        await unsubscribePush(user.id);
        setPushEnabled(false);
        toast.info('Push notifications disabled.');
      }
    } catch {
      toast.error('Could not update notification settings.');
    } finally {
      setIsPushLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F3EC] dark:bg-[#0E0E10] text-[#111111] dark:text-neutral-100 pb-20">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 space-y-5">
        {/* 1. Top Bar: Handle with Verified Badge + 3-Lines Menu */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-black text-[#111111] dark:text-white tracking-tight">
              {handleName}
            </span>
            <span className="w-5 h-5 rounded-full bg-[#2B4EFF] text-white flex items-center justify-center shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="w-10 h-10 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-[#F6F3EC] transition-colors cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 p-2 rounded-[20px] shadow-xl">
              <DropdownMenuItem onClick={openEditModal} className="cursor-pointer rounded-xl">
                <Edit3 className="w-4 h-4 mr-2" /> Edit Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('settings')} className="cursor-pointer rounded-xl">
                <Sliders className="w-4 h-4 mr-2" /> Study & App Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDataExportOpen(true)} className="cursor-pointer rounded-xl">
                <FileText className="w-4 h-4 mr-2" /> Export / Delete Data
              </DropdownMenuItem>
              {role === 'admin' && (
                <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer rounded-xl font-bold text-[#2B4EFF]">
                  <Shield className="w-4 h-4 mr-2" /> Admin Portal
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer rounded-xl text-rose-600 focus:text-rose-600">
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 2. Profile Header: Large Avatar (88px) with Electric Lime Ring + Name + Chip + Bio */}
        <div className="space-y-3.5">
          <div className="relative inline-block">
            <CampusAvatar
              src={profile?.avatar_url}
              name={displayName}
              size={88}
              limeRing
            />
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#111111] dark:text-white leading-tight">
              {displayName}
            </h2>
            <p className="text-sm font-semibold text-[#6B7280] dark:text-neutral-400 mt-0.5">
              @{handleName}
            </p>
            <div className="mt-2 inline-flex items-center">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300">
                {branchName}
              </span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#111111] dark:text-neutral-200 font-normal leading-relaxed max-w-lg">
            {bio}
          </p>
        </div>

        {/* 3. Stats Row: 36 Posts | 248 Followers | 190 Following */}
        <div className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-4 sm:p-5 flex items-center justify-around text-center shadow-xs">
          <div>
            <span className="block text-xl sm:text-2xl font-black text-[#111111] dark:text-white">
              {userPosts.length}
            </span>
            <span className="text-xs font-semibold text-[#6B7280] dark:text-neutral-400">
              Posts
            </span>
          </div>
          <div className="w-[1px] h-8 bg-[#E8E4DA] dark:bg-neutral-800" />
          <div>
            <span className="block text-xl sm:text-2xl font-black text-[#111111] dark:text-white">
              {followersCount}
            </span>
            <span className="text-xs font-semibold text-[#6B7280] dark:text-neutral-400">
              Followers
            </span>
          </div>
          <div className="w-[1px] h-8 bg-[#E8E4DA] dark:bg-neutral-800" />
          <div>
            <span className="block text-xl sm:text-2xl font-black text-[#111111] dark:text-white">
              {followingCount}
            </span>
            <span className="text-xs font-semibold text-[#6B7280] dark:text-neutral-400">
              Following
            </span>
          </div>
        </div>

        {/* 4. Action Buttons: "Edit profile" (blue pill flex-1) + Share icon button */}
        <div className="flex items-center gap-3">
          <CampusButton
            variant="primary"
            size="lg"
            onClick={openEditModal}
            className="flex-1"
          >
            Edit profile
          </CampusButton>

          <button
            type="button"
            onClick={handleShareProfile}
            title="Share Profile"
            className="h-12 w-12 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 flex items-center justify-center text-[#111111] dark:text-white hover:bg-[#F6F3EC] active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* 5. "Clubs & interests" Chips */}
        <div>
          <h3 className="text-base font-bold text-[#111111] dark:text-white mb-2.5">
            Clubs & interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: '⚙️', label: 'Robotics Club' },
              { icon: '⚡', label: 'Hack Club' },
              { icon: '📷', label: 'Photography' },
              { icon: '🎤', label: 'Debate Circle' },
            ].map((chip) => (
              <span
                key={chip.label}
                className="h-9 px-3.5 rounded-full bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 text-xs sm:text-sm font-semibold text-[#111111] dark:text-neutral-200 inline-flex items-center gap-1.5 shadow-2xs"
              >
                <span>{chip.icon}</span>
                <span>{chip.label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* 6. "Campus badges" Cards */}
        <div>
          <h3 className="text-base font-bold text-[#111111] dark:text-white mb-2.5">
            Campus badges
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
            <div className="min-w-[190px] rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-3.5 flex items-center gap-3 shrink-0 shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#EAF6B0] text-[#111111] flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#111111] dark:text-white leading-tight">
                  Hackathon Finalist
                </h4>
                <p className="text-[10px] text-[#6B7280] dark:text-neutral-400 font-medium">
                  Innovation Lab '26
                </p>
              </div>
            </div>

            <div className="min-w-[190px] rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-3.5 flex items-center gap-3 shrink-0 shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#E6EAFD] text-[#2B4EFF] flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#111111] dark:text-white leading-tight">
                  Event Volunteer
                </h4>
                <p className="text-[10px] text-[#6B7280] dark:text-neutral-400 font-medium">
                  Build Sprint '26
                </p>
              </div>
            </div>

            <div className="min-w-[190px] rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-3.5 flex items-center gap-3 shrink-0 shadow-2xs">
              <div className="w-10 h-10 rounded-full bg-[#FEF9C3] text-[#713F12] flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-[#111111] dark:text-white leading-tight">
                  {game.streakDays}d Streak Master
                </h4>
                <p className="text-[10px] text-[#6B7280] dark:text-neutral-400 font-medium">
                  Daily Consistency
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Tabs: Posts | Events | Saved | Settings */}
        <div className="flex items-center justify-around border-b border-[#E8E4DA] dark:border-neutral-800 pt-2 font-display">
          <button
            type="button"
            onClick={() => setActiveTab('posts')}
            className={`pb-2.5 text-sm sm:text-base font-bold transition-all relative cursor-pointer ${
              activeTab === 'posts'
                ? 'text-[#2B4EFF] dark:text-[#3D5EFF]'
                : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111]'
            }`}
          >
            Posts
            {activeTab === 'posts' && (
              <span className="absolute bottom-0 inset-x-0 h-[3px] bg-[#2B4EFF] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('events')}
            className={`pb-2.5 text-sm sm:text-base font-bold transition-all relative cursor-pointer ${
              activeTab === 'events'
                ? 'text-[#2B4EFF] dark:text-[#3D5EFF]'
                : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111]'
            }`}
          >
            Events
            {activeTab === 'events' && (
              <span className="absolute bottom-0 inset-x-0 h-[3px] bg-[#2B4EFF] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`pb-2.5 text-sm sm:text-base font-bold transition-all relative cursor-pointer ${
              activeTab === 'saved'
                ? 'text-[#2B4EFF] dark:text-[#3D5EFF]'
                : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111]'
            }`}
          >
            Saved
            {activeTab === 'saved' && (
              <span className="absolute bottom-0 inset-x-0 h-[3px] bg-[#2B4EFF] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`pb-2.5 text-sm sm:text-base font-bold transition-all relative cursor-pointer ${
              activeTab === 'settings'
                ? 'text-[#2B4EFF] dark:text-[#3D5EFF]'
                : 'text-[#6B7280] dark:text-neutral-400 hover:text-[#111111]'
            }`}
          >
            Settings
            {activeTab === 'settings' && (
              <span className="absolute bottom-0 inset-x-0 h-[3px] bg-[#2B4EFF] rounded-full" />
            )}
          </button>
        </div>

        {/* 8. Tab Contents */}
        <div className="space-y-4">
          {activeTab === 'posts' && (
            userPosts.length === 0 ? (
              <div className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-8 text-center space-y-2">
                <p className="font-bold text-sm text-[#111111] dark:text-white">
                  No posts published yet
                </p>
                <p className="text-xs text-[#6B7280] dark:text-neutral-400">
                  Tap the + create button to share your first study question or campus update.
                </p>
              </div>
            ) : (
              userPosts.map((post) => (
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
                  likesCount={post.likes || 0}
                  commentsCount={post.comments?.length || 0}
                  currentUserId={user?.id}
                />
              ))
            )
          )}

          {activeTab === 'events' && (
            userEvents.length === 0 ? (
              <div className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-8 text-center space-y-2">
                <p className="font-bold text-sm text-[#111111] dark:text-white">
                  No event RSVPs yet
                </p>
                <p className="text-xs text-[#6B7280] dark:text-neutral-400">
                  Explore tech talks and workshops on the Explore tab to RSVP.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/explore')}
                  className="mt-2 text-xs font-bold text-[#2B4EFF] hover:underline"
                >
                  Explore campus events →
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {userEvents.map((evt) => (
                  <CampusEventRow
                    key={evt.id}
                    id={evt.id}
                    title={evt.title}
                    dateStr={evt.eventDate}
                    locationText={evt.location}
                    timeText={evt.eventTime}
                    attendeeCount={evt.attendeeCount}
                    hasRsvp={true}
                  />
                ))}
              </div>
            )
          )}

          {activeTab === 'saved' && (
            savedPosts.length === 0 ? (
              <div className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-8 text-center space-y-2">
                <p className="font-bold text-sm text-[#111111] dark:text-white">
                  No saved posts yet
                </p>
                <p className="text-xs text-[#6B7280] dark:text-neutral-400">
                  Bookmark helpful posts from your campus feed to find them here anytime.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('/bookmarks')}
                  className="mt-2 text-xs font-bold text-[#2B4EFF] hover:underline block mx-auto"
                >
                  View Topic & Question Bookmarks →
                </button>
              </div>
            ) : (
              savedPosts.map((post) => (
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
                  likesCount={post.likes || 0}
                  commentsCount={post.comments?.length || 0}
                  savedByMe={true}
                  currentUserId={user?.id}
                />
              ))
            )
          )}

          {activeTab === 'settings' && (
            <div className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 divide-y divide-[#EFECE6] dark:divide-neutral-800/80 overflow-hidden shadow-xs">
              {/* Push notifications */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#111111] dark:text-white">
                    Push Notifications
                  </h4>
                  <p className="text-xs text-[#6B7280] dark:text-neutral-400">
                    Get reminders for exams, RSVPs, and study sessions
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isPushLoading}
                  onClick={() => handleTogglePush(!pushEnabled)}
                  className={`h-9 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    pushEnabled
                      ? 'bg-[#111111] text-white dark:bg-white dark:text-[#111111]'
                      : 'bg-[#E6EAFD] text-[#2B4EFF]'
                  }`}
                >
                  {pushEnabled ? 'Enabled' : 'Enable'}
                </button>
              </div>

              {/* Attendance & Calculator quick link */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#111111] dark:text-white">
                    Attendance & SGPA Calculator
                  </h4>
                  <p className="text-xs text-[#6B7280] dark:text-neutral-400">
                    Track safe lecture bunks and compute target semester GPA
                  </p>
                </div>
                <Link
                  to="/calculator"
                  className="h-9 px-4 rounded-full bg-[#E6EAFD] text-[#2B4EFF] font-bold text-xs flex items-center justify-center"
                >
                  Open
                </Link>
              </div>

              {/* Data Export / Privacy */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#111111] dark:text-white">
                    Data Privacy & Account
                  </h4>
                  <p className="text-xs text-[#6B7280] dark:text-neutral-400">
                    Download your notes data or manage account privacy
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDataExportOpen(true)}
                  className="h-9 px-4 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 text-[#111111] dark:text-white font-bold text-xs"
                >
                  Manage
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-[#18181B] rounded-[24px] border border-[#E8E4DA] p-5 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b">
              <h3 className="font-bold text-base text-[#111111] dark:text-white">
                Edit Profile
              </h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full hover:bg-neutral-100"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full h-11 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-sm px-4 border border-[#E8E4DA] focus:outline-none focus:border-[#2B4EFF]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Department & Year
                </label>
                <input
                  type="text"
                  value={editBranch}
                  onChange={(e) => setEditBranch(e.target.value)}
                  placeholder="e.g. B.Tech CSE · Year 2"
                  className="w-full h-11 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-sm px-4 border border-[#E8E4DA] focus:outline-none focus:border-[#2B4EFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  placeholder="Tell your campus about what you are building or studying..."
                  className="w-full rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-sm p-3 border border-[#E8E4DA] focus:outline-none focus:border-[#2B4EFF] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 h-11 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 h-11 rounded-full bg-[#2B4EFF] text-white font-bold text-xs hover:bg-[#1E3EDB] disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Data Export / Delete Modal */}
      <DataExportDeleteModal
        isOpen={isDataExportOpen}
        onClose={() => setIsDataExportOpen(false)}
      />
    </div>
  );
}
