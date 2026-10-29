import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification, Achievement } from '@/hooks/useGamification';
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
  Plus,
  Eye,
  EyeOff,
  GraduationCap,
  Building2,
  Zap,
  CheckCircle2,
  Layers,
  Upload,
  BookOpen,
} from 'lucide-react';
import { toast } from 'sonner';
import { useUniversity } from '@/contexts/UniversityContext';
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

export const POPULAR_INTERESTS_CATALOG = [
  { icon: '🤖', name: 'Robotics & IoT' },
  { icon: '🧠', name: 'AI & Data Science' },
  { icon: '💻', name: 'Web & Full Stack' },
  { icon: '⚡', name: 'Competitive Coding' },
  { icon: '🛡️', name: 'Cyber Security' },
  { icon: '☁️', name: 'Cloud & DevOps' },
  { icon: '📱', name: 'Mobile App Dev' },
  { icon: '🎨', name: 'UI/UX Design' },
  { icon: '📷', name: 'Photography & Media' },
  { icon: '🎤', name: 'Debate Circle' },
  { icon: '🎸', name: 'Music & Cultural Arts' },
  { icon: '⚽', name: 'Sports & Athletics' },
  { icon: '🚀', name: 'Startups & Ventures' },
  { icon: '🕹️', name: 'Game Development' },
  { icon: '📚', name: 'Research & Gate Prep' },
];

export const DEGREE_PROGRAMS = [
  'B.Tech',
  'BCA',
  'MCA',
  'M.Tech',
  'MBA',
  'Diploma Engineering',
  'B.Sc Computer Science',
  'Ph.D / Research',
];

export const BRANCH_SPECIALIZATIONS = [
  'Computer Science & Engineering',
  'Artificial Intelligence & Data Science',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Electrical Engineering',
  'Chemical Engineering',
  'Cloud Computing & DevOps',
  'Cybersecurity & Forensics',
];

type ProfileTab = 'posts' | 'events' | 'saved' | 'settings';

export default function ProfilePage() {
  const { user, profile, role, updateProfile, uploadAvatar, signOut } = useAuth();
  const { currentUniversity, allUniversities, setUniversity: setGlobalUniversity } = useUniversity();
  const navigate = useNavigate();
  const { state: game, levelInfo } = useGamification();
  const { progress } = useProgress();

  const [activeTab, setActiveTab] = useState<ProfileTab>('posts');
  const [userPosts, setUserPosts] = useState<CommunityPost[]>([]);
  const [userEvents, setUserEvents] = useState<CampusEventItem[]>([]);
  const [savedPosts, setSavedPosts] = useState<CommunityPost[]>([]);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  // Edit profile state (covers EVERYTHING user can edit)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editTab, setEditTab] = useState<'academic' | 'personal' | 'avatar' | 'interests'>('academic');
  const [editName, setEditName] = useState('');
  const [editProgram, setEditProgram] = useState('B.Tech');
  const [editBranch, setEditBranch] = useState('Computer Science & Engineering');
  const [editSemester, setEditSemester] = useState<number>(3);
  const [editDivision, setEditDivision] = useState('Div A');
  const [editEnrollment, setEditEnrollment] = useState('');
  const [editUniversity, setEditUniversity] = useState('itm-baroda');
  const [editBio, setEditBio] = useState('');
  const [editGoal, setEditGoal] = useState('');
  const [editTargetCgpa, setEditTargetCgpa] = useState<number>(8.5);
  const [editAvatarUrl, setEditAvatarUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  // User-chosen Clubs & Interests State
  const [userInterests, setUserInterests] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(`campusloop_user_interests_${user?.id}`);
      if (raw) return JSON.parse(raw);
      if (profile && (profile as any).interests) return (profile as any).interests;
      return [];
    } catch {
      return [];
    }
  });
  const [customInterestText, setCustomInterestText] = useState('');
  const [isInterestsModalOpen, setIsInterestsModalOpen] = useState(false);

  // Gamification Badges Visibility State (User controls which badges show on profile)
  const [showcasedBadgeIds, setShowcasedBadgeIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(`campusloop_showcased_badges_${user?.id}`);
      if (raw) return JSON.parse(raw);
      return [];
    } catch {
      return [];
    }
  });
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [badgesFilter, setBadgesFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  // Settings & notifications state
  const [pushEnabled, setPushEnabled] = useState(false);
  const [isPushLoading, setIsPushLoading] = useState(false);
  const [isDataExportOpen, setIsDataExportOpen] = useState(false);

  const displayName = profile?.display_name || user?.user_metadata?.full_name || 'Student';
  const handleName = (user?.email?.split('@')[0] || displayName.toLowerCase().replace(/\s+/g, '.'));
  const programName = profile?.program || 'B.Tech';
  const branchName = profile?.branch || 'Computer Science & Engineering';
  const semesterNum = profile?.semester || 3;
  const divisionName = profile?.division || 'Div A';
  const bio = (profile as any)?.bio || 'Student at CampusLoop. Exploring engineering, coding, and campus life.';
  const academicGoal = profile?.goal || 'Maintain 8.5+ SGPA and crack top technical campus placements';

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

        // REAL counts from database/local storage (never hardcoded)
        setFollowersCount(follows.followersCount ?? 0);
        setFollowingCount(follows.followingCount ?? 0);
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

  // Open edit modal & prefill with user's real credentials
  const openEditModal = () => {
    setEditName(profile?.display_name || displayName);
    setEditProgram(profile?.program || 'B.Tech');
    setEditBranch(profile?.branch || 'Computer Science & Engineering');
    setEditSemester(profile?.semester || 3);
    setEditDivision(profile?.division || 'Div A');
    setEditEnrollment(profile?.enrollment_no || '');
    setEditUniversity(profile?.university || currentUniversity.id || 'itm-baroda');
    setEditBio(profile?.bio || bio);
    setEditGoal(profile?.goal || academicGoal);
    setEditTargetCgpa(profile?.target_cgpa || 8.5);
    setEditAvatarUrl(profile?.avatar_url || 'grad-blue');
    setIsEditModalOpen(true);
  };

  // Upload custom avatar photo
  const handleAvatarFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const url = await uploadAvatar(file);
      setEditAvatarUrl(url);
      toast.success('Avatar photo uploaded successfully!');
    } catch {
      toast.error('Failed to upload avatar photo.');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  // Save profile changes (Degree, branch, sem, div, university, bio, goal, avatar, interests)
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await updateProfile({
        display_name: editName.trim(),
        program: editProgram,
        branch: editBranch.trim(),
        semester: Number(editSemester) || 3,
        division: editDivision.trim() || 'Div A',
        enrollment_no: editEnrollment.trim() || null,
        bio: editBio.trim(),
        goal: editGoal.trim() || undefined,
        target_cgpa: editTargetCgpa,
        university: editUniversity,
        avatar_url: editAvatarUrl || profile?.avatar_url,
        interests: userInterests,
      } as any);

      // Keep app-wide university synchronized if changed
      if (editUniversity && editUniversity !== currentUniversity.id) {
        await setGlobalUniversity(editUniversity);
      }

      localStorage.setItem(`campusloop_user_interests_${user?.id}`, JSON.stringify(userInterests));
      toast.success('Profile and academic credentials updated!');
      setIsEditModalOpen(false);
    } catch (err: any) {
      toast.error('Could not save profile: ' + (err?.message || 'Network error'));
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle interest
  const toggleInterest = (name: string) => {
    const next = userInterests.includes(name)
      ? userInterests.filter((i) => i !== name)
      : [...userInterests, name];
    setUserInterests(next);
    localStorage.setItem(`campusloop_user_interests_${user?.id}`, JSON.stringify(next));
    updateProfile({ interests: next } as any).catch(() => {});
  };

  // Add custom interest tag
  const handleAddCustomInterest = (e: React.FormEvent) => {
    e.preventDefault();
    const tag = customInterestText.trim();
    if (!tag) return;
    if (userInterests.includes(tag)) {
      toast.info('Interest already added.');
      setCustomInterestText('');
      return;
    }
    const next = [...userInterests, tag];
    setUserInterests(next);
    localStorage.setItem(`campusloop_user_interests_${user?.id}`, JSON.stringify(next));
    updateProfile({ interests: next } as any).catch(() => {});
    setCustomInterestText('');
    toast.success(`Added "${tag}" to your interests!`);
  };

  // Remove interest
  const handleRemoveInterest = (name: string) => {
    const next = userInterests.filter((i) => i !== name);
    setUserInterests(next);
    localStorage.setItem(`campusloop_user_interests_${user?.id}`, JSON.stringify(next));
    updateProfile({ interests: next } as any).catch(() => {});
  };

  // Toggle Showcase Badge on Profile
  const toggleShowcaseBadge = (badgeId: string) => {
    let next: string[];
    if (showcasedBadgeIds.includes(badgeId)) {
      next = showcasedBadgeIds.filter((id) => id !== badgeId);
      toast.info('Badge hidden from profile.');
    } else {
      next = [...showcasedBadgeIds, badgeId];
      toast.success('Badge will now be showcased on your profile!');
    }
    setShowcasedBadgeIds(next);
    localStorage.setItem(`campusloop_showcased_badges_${user?.id}`, JSON.stringify(next));
  };

  // Calculate real unlocked vs locked badges from useGamification
  const unlockedBadges = useMemo(() => {
    return (game.achievements || []).filter((a) => Boolean(a.unlockedAt));
  }, [game.achievements]);

  const lockedBadges = useMemo(() => {
    return (game.achievements || []).filter((a) => !a.unlockedAt);
  }, [game.achievements]);

  // Badges actually showcased on profile
  const displayedProfileBadges = useMemo(() => {
    if (showcasedBadgeIds.length > 0) {
      return (game.achievements || []).filter(
        (a) => showcasedBadgeIds.includes(a.id) && Boolean(a.unlockedAt)
      );
    }
    // Default to first 4 unlocked badges if user has not explicitly hidden them
    return unlockedBadges.slice(0, 4);
  }, [game.achievements, showcasedBadgeIds, unlockedBadges]);

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
              <DropdownMenuItem onClick={openEditModal} className="cursor-pointer rounded-xl font-bold">
                <Edit3 className="w-4 h-4 mr-2 text-[#2B4EFF]" /> Edit Profile & Credentials
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsBadgesModalOpen(true)} className="cursor-pointer rounded-xl font-medium">
                <Trophy className="w-4 h-4 mr-2 text-amber-500" /> Manage Badges & Honors
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsInterestsModalOpen(true)} className="cursor-pointer rounded-xl font-medium">
                <Sparkles className="w-4 h-4 mr-2 text-purple-500" /> Clubs & Interests
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActiveTab('settings')} className="cursor-pointer rounded-xl font-medium">
                <Sliders className="w-4 h-4 mr-2" /> Study & App Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDataExportOpen(true)} className="cursor-pointer rounded-xl font-medium">
                <FileText className="w-4 h-4 mr-2" /> Export / Delete Data
              </DropdownMenuItem>
              {role === 'admin' && (
                <DropdownMenuItem onClick={() => navigate('/admin')} className="cursor-pointer rounded-xl font-bold text-[#2B4EFF]">
                  <Shield className="w-4 h-4 mr-2" /> Admin Portal
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer rounded-xl text-rose-600 focus:text-rose-600 font-bold">
                <LogOut className="w-4 h-4 mr-2" /> Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 2. Profile Header: Large Avatar (88px) with Electric Lime Ring + Edit Trigger + Name + Credentials */}
        <div className="space-y-3.5">
          <div className="relative inline-block group">
            <CampusAvatar
              src={profile?.avatar_url}
              name={displayName}
              size={88}
              limeRing
            />
            <button
              onClick={openEditModal}
              title="Change Profile Photo & Info"
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] border-2 border-white dark:border-[#111111] flex items-center justify-center shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-[#111111] dark:text-white leading-tight">
                {displayName}
              </h2>
              <button
                onClick={openEditModal}
                className="text-xs font-bold text-[#2B4EFF] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>
            <p className="text-sm font-semibold text-[#6B7280] dark:text-neutral-400 mt-0.5">
              @{handleName}
            </p>

            {/* Academic Credentials Pills Row */}
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300 flex items-center gap-1.5 border border-[#2B4EFF]/20">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{programName} · {branchName}</span>
              </span>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300 flex items-center gap-1.5 border border-emerald-500/20">
                <span>Semester {semesterNum}</span>
                <span>·</span>
                <span>{divisionName}</span>
              </span>

              <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 border border-[#E8E4DA] dark:border-neutral-700">
                <Building2 className="w-3.5 h-3.5" />
                <span>{currentUniversity.shortName}</span>
              </span>

              {profile?.enrollment_no && (
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-border">
                  #{profile.enrollment_no}
                </span>
              )}
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#111111] dark:text-neutral-200 font-normal leading-relaxed max-w-lg">
            {bio}
          </p>

          {/* Academic Goal Quote */}
          {academicGoal && (
            <div className="p-3 rounded-2xl bg-white/70 dark:bg-[#1C1C1E]/70 border border-[#E8E4DA] dark:border-neutral-800 flex items-center gap-2.5 text-xs">
              <Target className="w-4 h-4 text-[#2B4EFF] shrink-0" />
              <span className="text-neutral-600 dark:text-neutral-300 italic">
                "{academicGoal}"
              </span>
            </div>
          )}
        </div>

        {/* 3. Real Stats Row: Posts | Real Followers | Real Following | Daily Streak */}
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
          <div className="w-[1px] h-8 bg-[#E8E4DA] dark:bg-neutral-800" />
          <div>
            <span className="block text-xl sm:text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
              <span>{game.streakDays}</span>
              <Flame className="w-4 h-4 fill-amber-500" />
            </span>
            <span className="text-xs font-semibold text-[#6B7280] dark:text-neutral-400">
              Streak
            </span>
          </div>
        </div>

        {/* 4. Action Buttons: "Edit Profile" (blue pill flex-1) + Badges Manager + Share Button */}
        <div className="flex items-center gap-2.5">
          <CampusButton
            variant="primary"
            size="lg"
            onClick={openEditModal}
            className="flex-1 font-bold text-xs sm:text-sm"
          >
            <Edit3 className="w-4 h-4 mr-1.5" />
            Edit Profile
          </CampusButton>

          <button
            type="button"
            onClick={() => setIsBadgesModalOpen(true)}
            className="h-12 px-4 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 flex items-center gap-1.5 text-xs font-bold text-[#111111] dark:text-white hover:bg-[#F6F3EC] active:scale-95 transition-all cursor-pointer shadow-2xs"
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Badges</span>
          </button>

          <button
            type="button"
            onClick={handleShareProfile}
            title="Share Profile"
            className="h-12 w-12 rounded-2xl bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 flex items-center justify-center text-[#111111] dark:text-white hover:bg-[#F6F3EC] active:scale-95 transition-all cursor-pointer shrink-0 shadow-2xs"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* 5. User-Chosen Clubs & Interests (Full user control: add/remove/toggle) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111111] dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Clubs & Interests</span>
            </h3>
            <button
              onClick={() => setIsInterestsModalOpen(true)}
              className="text-xs font-bold text-[#2B4EFF] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Manage</span>
            </button>
          </div>

          {userInterests.length === 0 ? (
            <div className="rounded-[20px] bg-white dark:bg-[#1C1C1E] border border-dashed border-[#E8E4DA] dark:border-neutral-800 p-4 text-center space-y-2">
              <p className="text-xs font-semibold text-neutral-500">
                No clubs or interests chosen yet. Choose your tech, cultural, or sports passions!
              </p>
              <button
                onClick={() => setIsInterestsModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#2B4EFF] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Choose Your Clubs & Interests</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {userInterests.map((interest) => {
                const catalogMatch = POPULAR_INTERESTS_CATALOG.find((p) => p.name.toLowerCase() === interest.toLowerCase());
                const icon = catalogMatch ? catalogMatch.icon : '✨';
                return (
                  <span
                    key={interest}
                    className="h-9 px-3.5 rounded-full bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 text-xs sm:text-sm font-semibold text-[#111111] dark:text-neutral-200 inline-flex items-center gap-2 shadow-2xs group"
                  >
                    <span>{icon}</span>
                    <span>{interest}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveInterest(interest)}
                      title="Remove interest"
                      className="w-4 h-4 rounded-full text-neutral-400 hover:text-rose-500 hover:bg-neutral-100 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* 6. Real Gamification Badges & Honors (User toggles showcase on/off) */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#111111] dark:text-white flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Gamification Badges & Honors</span>
              </h3>
              <p className="text-[11px] text-neutral-500 font-medium">
                Earned via study streaks, syllabus mastery & coding lab. You control which appear on profile.
              </p>
            </div>
            <button
              onClick={() => setIsBadgesModalOpen(true)}
              className="text-xs font-bold text-[#2B4EFF] hover:underline flex items-center gap-1 cursor-pointer shrink-0"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Showcase ({displayedProfileBadges.length})</span>
            </button>
          </div>

          {/* Gamification Level & XP Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-purple-900/10 border border-[#2B4EFF]/20 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#2B4EFF] text-white flex items-center justify-center font-black text-sm shadow-xs">
                L{game.level}
              </div>
              <div>
                <span className="text-xs font-bold text-[#111111] dark:text-white block">
                  Level {game.level} · {levelInfo.title}
                </span>
                <span className="text-[11px] text-neutral-500 font-medium block">
                  {game.xp} XP Earned · {levelInfo.nextXp ? `${levelInfo.nextXp - game.xp} XP to next level` : 'Max Level'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsBadgesModalOpen(true)}
              className="px-3 py-1.5 rounded-xl border border-border bg-white dark:bg-[#1C1C1E] text-xs font-bold text-[#111111] dark:text-white hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              View All ({game.achievements.length})
            </button>
          </div>

          {/* Displayed Showcased Badges Horizontal Scroll */}
          {displayedProfileBadges.length === 0 ? (
            <div className="rounded-[20px] bg-white dark:bg-[#1C1C1E] border border-dashed border-[#E8E4DA] dark:border-neutral-800 p-4 text-center space-y-1.5">
              <p className="text-xs font-semibold text-neutral-500">
                {unlockedBadges.length === 0
                  ? "Complete study topics, quizzes, or coding problems to earn your first badge!"
                  : "You haven't showcased any badges on your profile yet."}
              </p>
              {unlockedBadges.length > 0 && (
                <button
                  onClick={() => setIsBadgesModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#2B4EFF] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Choose Badges to Showcase</span>
                </button>
              )}
            </div>
          ) : (
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
              {displayedProfileBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="min-w-[210px] rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-3.5 flex items-center justify-between gap-3 shrink-0 shadow-2xs relative group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-[#E6EAFD] text-[#2B4EFF] dark:bg-blue-950/40 dark:text-blue-300 flex items-center justify-center text-lg shrink-0">
                      {badge.icon}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-[#111111] dark:text-white leading-tight truncate">
                        {badge.title}
                      </h4>
                      <p className="text-[10px] text-[#6B7280] dark:text-neutral-400 font-medium truncate">
                        {badge.tier.toUpperCase()} · +{badge.xpReward} XP
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleShowcaseBadge(badge.id)}
                    title="Hide badge from profile"
                    className="p-1 rounded-lg text-neutral-400 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                  >
                    <EyeOff className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
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
            Posts ({userPosts.length})
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
            Events ({userEvents.length})
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
            Saved ({savedPosts.length})
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
                  No RSVP'd events yet
                </p>
                <p className="text-xs text-[#6B7280] dark:text-neutral-400">
                  Explore tech talks, campus hackathons, and festivals to RSVP.
                </p>
              </div>
            ) : (
              <div className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 divide-y divide-[#EFECE6] dark:divide-neutral-800 overflow-hidden shadow-xs">
                {userEvents.map((evt) => (
                  <CampusEventRow
                    key={evt.id}
                    event={evt}
                    onRsvpToggle={() => {}}
                  />
                ))}
              </div>
            )
          )}

          {activeTab === 'saved' && (
            savedPosts.length === 0 ? (
              <div className="rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-8 text-center space-y-2">
                <Bookmark className="w-8 h-8 text-neutral-400 mx-auto opacity-60" />
                <p className="font-bold text-sm text-[#111111] dark:text-white">
                  No saved bookmarks
                </p>
                <p className="text-xs text-[#6B7280] dark:text-neutral-400">
                  Bookmark important university posts and cheat sheets to view them here.
                </p>
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

      {/* ========================================================================= */}
      {/* MODAL 1: FULL EDIT PROFILE & CREDENTIALS MODAL                            */}
      {/* Enables editing EVERYTHING: degree, branch, sem, div, enrollment, bio...  */}
      {/* ========================================================================= */}
      {isEditModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-[#18181B] rounded-[26px] border border-[#E8E4DA] dark:border-neutral-800 p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="font-black text-lg text-[#111111] dark:text-white">
                  Edit Profile & Credentials
                </h3>
                <p className="text-xs text-neutral-500">
                  Update your university, degree, branch, semester, bio, and avatar.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Navigation Pills inside Edit Modal */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setEditTab('academic')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  editTab === 'academic'
                    ? 'bg-white dark:bg-neutral-900 text-[#2B4EFF] shadow-xs'
                    : 'text-neutral-500 hover:text-foreground'
                }`}
              >
                1. Academic
              </button>
              <button
                type="button"
                onClick={() => setEditTab('personal')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  editTab === 'personal'
                    ? 'bg-white dark:bg-neutral-900 text-[#2B4EFF] shadow-xs'
                    : 'text-neutral-500 hover:text-foreground'
                }`}
              >
                2. Personal
              </button>
              <button
                type="button"
                onClick={() => setEditTab('avatar')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  editTab === 'avatar'
                    ? 'bg-white dark:bg-neutral-900 text-[#2B4EFF] shadow-xs'
                    : 'text-neutral-500 hover:text-foreground'
                }`}
              >
                3. Avatar
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* TAB 1: ACADEMIC CREDENTIALS */}
              {editTab === 'academic' && (
                <div className="space-y-3.5">
                  {/* University Selection */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      University / College
                    </label>
                    <select
                      value={editUniversity}
                      onChange={(e) => setEditUniversity(e.target.value)}
                      className="w-full h-11 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs sm:text-sm px-3.5 border border-[#E8E4DA] dark:border-neutral-700 focus:outline-none focus:border-[#2B4EFF] font-medium"
                    >
                      {allUniversities.map((u) => (
                        <option key={u.id} value={u.id}>
                          {u.name} ({u.shortName})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Degree / Program */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Degree Program
                    </label>
                    <select
                      value={editProgram}
                      onChange={(e) => setEditProgram(e.target.value)}
                      className="w-full h-11 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs sm:text-sm px-3.5 border border-[#E8E4DA] dark:border-neutral-700 focus:outline-none focus:border-[#2B4EFF] font-semibold"
                    >
                      {DEGREE_PROGRAMS.map((prog) => (
                        <option key={prog} value={prog}>
                          {prog}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Branch / Specialization */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Branch / Specialization
                    </label>
                    <input
                      type="text"
                      value={editBranch}
                      onChange={(e) => setEditBranch(e.target.value)}
                      placeholder="e.g. Computer Science & Engineering"
                      className="w-full h-11 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs sm:text-sm px-4 border border-[#E8E4DA] dark:border-neutral-700 focus:outline-none focus:border-[#2B4EFF]"
                      required
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {['CSE', 'AI&DS', 'IT', 'ECE', 'ME', 'Civil', 'BCA Master'].map((quick) => (
                        <button
                          key={quick}
                          type="button"
                          onClick={() => {
                            if (quick === 'CSE') setEditBranch('Computer Science & Engineering');
                            if (quick === 'AI&DS') setEditBranch('Artificial Intelligence & Data Science');
                            if (quick === 'IT') setEditBranch('Information Technology');
                            if (quick === 'ECE') setEditBranch('Electronics & Communication');
                            if (quick === 'ME') setEditBranch('Mechanical Engineering');
                            if (quick === 'Civil') setEditBranch('Civil Engineering');
                            if (quick === 'BCA Master') {
                              setEditProgram('BCA');
                              setEditBranch('Computer Applications');
                            }
                          }}
                          className="px-2 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-600 dark:text-neutral-300 hover:bg-[#E6EAFD] hover:text-[#2B4EFF]"
                        >
                          {quick}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Semester and Division */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        Current Semester
                      </label>
                      <select
                        value={editSemester}
                        onChange={(e) => setEditSemester(Number(e.target.value))}
                        className="w-full h-11 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs sm:text-sm px-3 border border-[#E8E4DA] dark:border-neutral-700 focus:outline-none focus:border-[#2B4EFF] font-bold"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                          <option key={s} value={s}>
                            Semester {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        Division / Batch
                      </label>
                      <input
                        type="text"
                        value={editDivision}
                        onChange={(e) => setEditDivision(e.target.value)}
                        placeholder="e.g. Div A / Div 1"
                        className="w-full h-11 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs sm:text-sm px-3.5 border border-[#E8E4DA] dark:border-neutral-700 focus:outline-none focus:border-[#2B4EFF]"
                      />
                    </div>
                  </div>

                  {/* Enrollment Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      University Enrollment No.
                    </label>
                    <input
                      type="text"
                      value={editEnrollment}
                      onChange={(e) => setEditEnrollment(e.target.value)}
                      placeholder="e.g. 2026BT0101 / 240280107012"
                      className="w-full h-11 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs sm:text-sm px-4 border border-[#E8E4DA] dark:border-neutral-700 focus:outline-none focus:border-[#2B4EFF] font-mono"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PERSONAL BIO & ACADEMIC GOAL */}
              {editTab === 'personal' && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Full Display Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full h-11 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs sm:text-sm px-4 border border-[#E8E4DA] dark:border-neutral-700 focus:outline-none focus:border-[#2B4EFF] font-bold"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Bio / Status
                    </label>
                    <textarea
                      rows={3}
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      placeholder="Tell your campus peers about your projects, study rhythm, or interests..."
                      className="w-full rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs sm:text-sm p-3.5 border border-[#E8E4DA] dark:border-neutral-700 focus:outline-none focus:border-[#2B4EFF] resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Academic Goal & Vision
                    </label>
                    <input
                      type="text"
                      value={editGoal}
                      onChange={(e) => setEditGoal(e.target.value)}
                      placeholder="e.g. Score 8.5+ SGPA and crack technical placement"
                      className="w-full h-11 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs sm:text-sm px-4 border border-[#E8E4DA] dark:border-neutral-700 focus:outline-none focus:border-[#2B4EFF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Target Semester CGPA / SGPA
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="4.0"
                      max="10.0"
                      value={editTargetCgpa}
                      onChange={(e) => setEditTargetCgpa(parseFloat(e.target.value) || 8.0)}
                      className="w-full h-11 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs sm:text-sm px-4 border border-[#E8E4DA] dark:border-neutral-700 focus:outline-none focus:border-[#2B4EFF] font-mono font-bold"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: AVATAR & APPEARANCE */}
              {editTab === 'avatar' && (
                <div className="space-y-4">
                  {/* Current Preview */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F6F3EC] dark:bg-neutral-800">
                    {renderAvatarBox(editAvatarUrl || profile?.avatar_url, editName || displayName, 'w-16 h-16 text-2xl')}
                    <div>
                      <span className="font-bold text-sm text-[#111111] dark:text-white block">
                        Avatar Preview
                      </span>
                      <span className="text-xs text-neutral-500 block">
                        Choose photo upload or a signature gradient avatar below.
                      </span>
                    </div>
                  </div>

                  {/* Device Photo Upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
                      Upload Custom Photo
                    </label>
                    <label className="flex items-center justify-center gap-2 w-full h-12 rounded-xl border border-dashed border-[#2B4EFF] text-[#2B4EFF] bg-[#E6EAFD]/40 font-bold text-xs cursor-pointer hover:bg-[#E6EAFD]/70 transition-all">
                      <Upload className="w-4 h-4" />
                      <span>{isUploadingPhoto ? 'Uploading Photo...' : 'Browse Photo From Device'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarFileUpload}
                        className="hidden"
                        disabled={isUploadingPhoto}
                      />
                    </label>
                  </div>

                  {/* Signature Gradient Avatars */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
                      Or Choose Signature Gradient
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {GRADIENT_AVATARS.map((grad) => {
                        const isSelected = editAvatarUrl === grad.id;
                        return (
                          <button
                            key={grad.id}
                            type="button"
                            onClick={() => setEditAvatarUrl(grad.id)}
                            className={`h-12 rounded-2xl bg-gradient-to-tr ${grad.bgClass} flex items-center justify-center text-white font-black text-sm transition-all cursor-pointer ${
                              isSelected ? 'ring-4 ring-[#2B4EFF] scale-105 shadow-md' : 'opacity-80 hover:opacity-100'
                            }`}
                          >
                            {(editName || displayName).charAt(0).toUpperCase()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 h-11 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 font-bold text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 h-11 rounded-full bg-[#2B4EFF] text-white font-bold text-xs hover:bg-[#1E3EDB] disabled:opacity-50 transition-all cursor-pointer shadow-md"
                >
                  {isSaving ? 'Saving Changes...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: USER-CHOSEN CLUBS & INTERESTS MANAGER                            */}
      {/* ========================================================================= */}
      {isInterestsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4"
          onClick={() => setIsInterestsModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-[#18181B] rounded-[26px] border border-[#E8E4DA] dark:border-neutral-800 p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="font-black text-lg text-[#111111] dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-500" />
                  <span>Choose Clubs & Interests</span>
                </h3>
                <p className="text-xs text-neutral-500">
                  Select your campus passions. You can add custom clubs too.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsInterestsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Custom Tag Input */}
            <form onSubmit={handleAddCustomInterest} className="flex items-center gap-2">
              <input
                type="text"
                value={customInterestText}
                onChange={(e) => setCustomInterestText(e.target.value)}
                placeholder="Type custom club (e.g. Autonomous Drones)..."
                className="flex-1 h-10 px-3.5 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs border border-border focus:outline-none focus:border-[#2B4EFF]"
              />
              <button
                type="submit"
                disabled={!customInterestText.trim()}
                className="h-10 px-4 rounded-xl bg-[#2B4EFF] text-white text-xs font-bold hover:bg-[#1E3EDB] disabled:opacity-40 cursor-pointer shrink-0"
              >
                + Add
              </button>
            </form>

            {/* Popular Catalog Grid */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block">
                Popular Campus Clubs & Passions
              </span>
              <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                {POPULAR_INTERESTS_CATALOG.map((item) => {
                  const isSelected = userInterests.includes(item.name);
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => toggleInterest(item.name)}
                      className={`h-9 px-3.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#2B4EFF] text-white shadow-xs ring-2 ring-[#2B4EFF]/30'
                          : 'bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-[#E6EAFD]'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                      {isSelected ? <Check className="w-3.5 h-3.5 ml-1" /> : <Plus className="w-3.5 h-3.5 ml-1 opacity-60" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={() => setIsInterestsModalOpen(false)}
                className="w-full h-11 rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-bold text-xs"
              >
                Done ({userInterests.length} Selected)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: GAMIFICATION BADGES & SHOWCASE MANAGER                          */}
      {/* ========================================================================= */}
      {isBadgesModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4"
          onClick={() => setIsBadgesModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white dark:bg-[#18181B] rounded-[26px] border border-[#E8E4DA] dark:border-neutral-800 p-5 sm:p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="font-black text-lg text-[#111111] dark:text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span>Badges & Honors Manager</span>
                </h3>
                <p className="text-xs text-neutral-500">
                  Toggle which badges you want to showcase publicly on your profile.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsBadgesModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-[#F6F3EC] dark:bg-neutral-800 text-xs font-bold">
              <button
                type="button"
                onClick={() => setBadgesFilter('all')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  badgesFilter === 'all'
                    ? 'bg-white dark:bg-neutral-900 text-[#2B4EFF] shadow-xs'
                    : 'text-neutral-500'
                }`}
              >
                All ({game.achievements.length})
              </button>
              <button
                type="button"
                onClick={() => setBadgesFilter('unlocked')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  badgesFilter === 'unlocked'
                    ? 'bg-white dark:bg-neutral-900 text-emerald-600 shadow-xs'
                    : 'text-neutral-500'
                }`}
              >
                Unlocked ({unlockedBadges.length})
              </button>
              <button
                type="button"
                onClick={() => setBadgesFilter('locked')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
                  badgesFilter === 'locked'
                    ? 'bg-white dark:bg-neutral-900 text-amber-600 shadow-xs'
                    : 'text-neutral-500'
                }`}
              >
                In Progress ({lockedBadges.length})
              </button>
            </div>

            {/* Badges List */}
            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
              {(badgesFilter === 'all'
                ? game.achievements
                : badgesFilter === 'unlocked'
                ? unlockedBadges
                : lockedBadges
              ).map((ach) => {
                const isUnlocked = Boolean(ach.unlockedAt);
                const isShowcased = showcasedBadgeIds.includes(ach.id) && isUnlocked;

                return (
                  <div
                    key={ach.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isUnlocked
                        ? 'border-border bg-white dark:bg-neutral-900 shadow-2xs'
                        : 'border-border/60 bg-neutral-50 dark:bg-neutral-900/40 opacity-75'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-2xl bg-[#F6F3EC] dark:bg-neutral-800 flex items-center justify-center text-xl shrink-0">
                        {ach.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs sm:text-sm text-[#111111] dark:text-white truncate">
                            {ach.title}
                          </h4>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                            {ach.tier}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                          {ach.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {isUnlocked ? (
                        <button
                          type="button"
                          onClick={() => toggleShowcaseBadge(ach.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                            isShowcased
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-[#F6F3EC] dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-[#E6EAFD]'
                          }`}
                        >
                          {isShowcased ? (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Showcased</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Show</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider px-2.5 py-1 rounded-lg bg-neutral-200/50 dark:bg-neutral-800">
                          +{ach.xpReward} XP
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-border flex justify-end">
              <button
                type="button"
                onClick={() => setIsBadgesModalOpen(false)}
                className="w-full h-11 rounded-full bg-[#111111] dark:bg-white text-white dark:text-[#111111] font-bold text-xs"
              >
                Done
              </button>
            </div>
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
