import { supabase } from '@/integrations/supabase/client';
import { CampusPulseTone } from '@/components/campusloop/CampusPulseTile';

export interface PulseTileItem {
  id: string;
  tone: CampusPulseTone;
  tag: string;
  title: string;
  subtitle?: string;
  icon?: 'zap' | 'calendar' | 'clock' | 'sparkles';
  linkUrl?: string;
  isActive: boolean;
  expiresAt?: string;
}

export interface CampusClubItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  iconName?: string;
  memberCount: number;
  isMember?: boolean;
}

export interface CampusEventItem {
  id: string;
  title: string;
  description?: string;
  clubId?: string;
  clubName?: string;
  location: string;
  eventDate: string; // YYYY-MM-DD
  eventTime: string;
  attendeeCount: number;
  hasRsvp?: boolean;
}

export interface CampusPersonItem {
  id: string;
  name: string;
  email?: string;
  department: string;
  year: string;
  avatarUrl?: string | null;
  isFollowing?: boolean;
  followersCount?: number;
}

export interface CampusConversationItem {
  id: string;
  recipientId: string;
  name: string;
  avatarUrl?: string | null;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  isRequest: boolean;
}

export interface CampusMessageItem {
  id: string;
  senderId: string;
  recipientId: string;
  threadId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

// Local cache keys for instant offline-first rendering
const PULSE_CACHE_KEY = 'campusloop_pulse_tiles';
const CLUBS_CACHE_KEY = 'campusloop_clubs';
const EVENTS_CACHE_KEY = 'campusloop_events';
const FOLLOWS_CACHE_KEY = 'campusloop_follows';
const SAVED_CACHE_KEY = 'campusloop_saved_posts';

// Baseline default pulse tiles for real campus info at ITM SLS Baroda (no fake percentages)
export const DEFAULT_PULSE_TILES: PulseTileItem[] = [
  {
    id: 'pulse-library',
    tone: 'black',
    tag: 'LIVE',
    title: 'Central Library Open',
    subtitle: 'Reading rooms and reference section open until 9:00 PM today',
    icon: 'zap',
    isActive: true,
  },
  {
    id: 'pulse-placement',
    tone: 'lime',
    tag: 'TODAY, 4 PM',
    title: 'Placement & Internship Briefing',
    subtitle: 'Seminar Hall 2 · Industry readiness & resume review',
    icon: 'calendar',
    isActive: true,
  },
  {
    id: 'pulse-mst',
    tone: 'blue',
    tag: 'EXAMS',
    title: 'MST Exam Practice Papers Live',
    subtitle: 'Access solved PYQs and high-weightage topics in Question Banks',
    icon: 'sparkles',
    isActive: true,
  },
];

// Baseline real campus clubs
export const DEFAULT_CLUBS: CampusClubItem[] = [
  { id: 'club-robotics', name: 'Robotics Club', category: 'Tech', iconName: 'robot', memberCount: 142 },
  { id: 'club-debate', name: 'Debate Circle', category: 'Cultural', iconName: 'mic', memberCount: 88 },
  { id: 'club-hack', name: 'Code & Hack Club', category: 'Tech', iconName: 'code', memberCount: 196 },
  { id: 'club-photo', name: 'Campus Lens (Photography)', category: 'Arts', iconName: 'camera', memberCount: 74 },
  { id: 'club-sports', name: 'Sports & Athletics', category: 'Sports', iconName: 'sports', memberCount: 110 },
];

// Baseline real campus events
export const DEFAULT_EVENTS: CampusEventItem[] = [
  {
    id: 'event-build-sprint',
    title: 'Build Sprint Kickoff',
    description: '48-hour collaborative engineering sprint with student mentors',
    location: 'Innovation Lab',
    eventDate: '2026-11-02',
    eventTime: '6:30 PM',
    attendeeCount: 48,
  },
  {
    id: 'event-open-mic',
    title: 'Campus Open Mic Night',
    description: 'Poetry, acoustic music, and standup performances by students',
    location: 'Amphitheatre',
    eventDate: '2026-11-05',
    eventTime: '7:00 PM',
    attendeeCount: 92,
  },
  {
    id: 'event-dsa-workshop',
    title: 'DSA Trees & Graphs Masterclass',
    description: 'Hands-on problem solving session for mid-sem preparation',
    location: 'Lab 3 (Ground Floor)',
    eventDate: '2026-11-08',
    eventTime: '5:00 PM',
    attendeeCount: 65,
  },
];

// Baseline classmates / campus peers
export const DEFAULT_PEOPLE: CampusPersonItem[] = [
  { id: 'p-1', name: 'Meera Patel', department: 'Design', year: 'Y3' },
  { id: 'p-2', name: 'Kabir Verma', department: 'CSE', year: 'Y2' },
  { id: 'p-3', name: 'Sana Qureshi', department: 'BBA', year: 'Y2' },
  { id: 'p-4', name: 'Ishaan Trivedi', department: 'ECE', year: 'Y4' },
  { id: 'p-5', name: 'Diya Shah', department: 'CSE', year: 'Y3' },
];

/* ──────────────────────────────────────────────────────────────────────────
   1. CAMPUS PULSE SERVICE
   ────────────────────────────────────────────────────────────────────────── */
export async function fetchCampusPulseTiles(): Promise<PulseTileItem[]> {
  try {
    const { data, error } = await supabase
      .from('campus_pulse_tiles')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (!error && data && data.length > 0) {
      const mapped: PulseTileItem[] = data.map((d: any) => ({
        id: d.id,
        tone: d.tone as CampusPulseTone,
        tag: d.tag,
        title: d.title,
        subtitle: d.subtitle,
        icon: d.icon,
        linkUrl: d.link_url,
        isActive: d.is_active,
        expiresAt: d.expires_at,
      }));
      localStorage.setItem(PULSE_CACHE_KEY, JSON.stringify(mapped));
      return mapped;
    }
  } catch {
    // Fallback to cache or defaults
  }

  try {
    const cached = localStorage.getItem(PULSE_CACHE_KEY);
    if (cached) return JSON.parse(cached);
  } catch {}

  return DEFAULT_PULSE_TILES;
}

export async function saveCampusPulseTile(tile: PulseTileItem): Promise<boolean> {
  try {
    const payload = {
      id: tile.id,
      tone: tile.tone,
      tag: tile.tag,
      title: tile.title,
      subtitle: tile.subtitle,
      icon: tile.icon,
      link_url: tile.linkUrl,
      is_active: tile.isActive,
      updated_at: new Date().toISOString(),
    };
    await supabase.from('campus_pulse_tiles').upsert(payload);
  } catch (err) {
    console.warn('Could not save pulse tile to Supabase:', err);
  }

  // Update local storage
  try {
    const current = await fetchCampusPulseTiles();
    const index = current.findIndex((t) => t.id === tile.id);
    if (index >= 0) {
      current[index] = tile;
    } else {
      current.unshift(tile);
    }
    localStorage.setItem(PULSE_CACHE_KEY, JSON.stringify(current));
  } catch {}

  return true;
}

export async function deleteCampusPulseTile(tileId: string): Promise<boolean> {
  try {
    await supabase.from('campus_pulse_tiles').delete().eq('id', tileId);
  } catch {}
  try {
    const current = await fetchCampusPulseTiles();
    const filtered = current.filter((t) => t.id !== tileId);
    localStorage.setItem(PULSE_CACHE_KEY, JSON.stringify(filtered));
  } catch {}
  return true;
}

/* ──────────────────────────────────────────────────────────────────────────
   2. CLUBS SERVICE
   ────────────────────────────────────────────────────────────────────────── */
export async function fetchCampusClubs(currentUserId?: string): Promise<CampusClubItem[]> {
  let userJoinedClubIds = new Set<string>();

  try {
    if (currentUserId) {
      const { data: memberData } = await supabase
        .from('campus_club_members')
        .select('club_id')
        .eq('user_id', currentUserId);
      if (memberData) {
        userJoinedClubIds = new Set(memberData.map((m: any) => m.club_id));
      }
    }

    const { data: dbClubs, error } = await supabase
      .from('campus_clubs')
      .select('*')
      .order('member_count', { ascending: false });

    if (!error && dbClubs && dbClubs.length > 0) {
      const clubs: CampusClubItem[] = dbClubs.map((c: any) => ({
        id: c.id,
        name: c.name,
        category: c.category,
        description: c.description,
        iconName: c.icon_name,
        memberCount: c.member_count,
        isMember: userJoinedClubIds.has(c.id),
      }));
      localStorage.setItem(CLUBS_CACHE_KEY, JSON.stringify(clubs));
      return clubs;
    }
  } catch {}

  // Fallback
  try {
    const cached = localStorage.getItem(CLUBS_CACHE_KEY);
    if (cached) {
      const parsed: CampusClubItem[] = JSON.parse(cached);
      return parsed.map((c) => ({
        ...c,
        isMember: userJoinedClubIds.has(c.id) || c.isMember,
      }));
    }
  } catch {}

  return DEFAULT_CLUBS.map((c) => ({
    ...c,
    isMember: userJoinedClubIds.has(c.id),
  }));
}

export async function toggleCampusClubMembership(clubId: string, userId: string): Promise<boolean> {
  let isNowMember = false;
  try {
    const { data } = await supabase
      .from('campus_club_members')
      .select('id')
      .eq('club_id', clubId)
      .eq('user_id', userId)
      .maybeSingle();

    if (data) {
      await supabase.from('campus_club_members').delete().eq('id', data.id);
      isNowMember = false;
    } else {
      await supabase.from('campus_club_members').insert({
        club_id: clubId,
        user_id: userId,
      });
      isNowMember = true;
    }
  } catch (err) {
    console.warn('Club membership Supabase toggle error:', err);
  }

  // Update local cache
  try {
    const cached = localStorage.getItem(CLUBS_CACHE_KEY);
    if (cached) {
      const parsed: CampusClubItem[] = JSON.parse(cached);
      const updated = parsed.map((c) => {
        if (c.id === clubId) {
          const nextMember = !c.isMember;
          isNowMember = nextMember;
          return {
            ...c,
            isMember: nextMember,
            memberCount: Math.max(0, c.memberCount + (nextMember ? 1 : -1)),
          };
        }
        return c;
      });
      localStorage.setItem(CLUBS_CACHE_KEY, JSON.stringify(updated));
    }
  } catch {}

  return isNowMember;
}

export async function createCampusClub(club: {
  name: string;
  category: string;
  description?: string;
  iconName?: string;
  leadId?: string;
  leadName?: string;
}): Promise<CampusClubItem> {
  const newId = `club-${Date.now()}`;
  const newClub: CampusClubItem = {
    id: newId,
    name: club.name,
    category: club.category,
    description: club.description,
    iconName: club.iconName || 'users',
    memberCount: 1,
    isMember: true,
  };

  try {
    await supabase.from('campus_clubs').insert({
      id: newId,
      name: club.name,
      category: club.category,
      description: club.description,
      icon_name: club.iconName,
      lead_id: club.leadId,
      lead_name: club.leadName,
      member_count: 1,
    });
    if (club.leadId) {
      await supabase.from('campus_club_members').insert({
        club_id: newId,
        user_id: club.leadId,
        role: 'admin',
      });
    }
  } catch {}

  return newClub;
}

/* ──────────────────────────────────────────────────────────────────────────
   3. EVENTS SERVICE
   ────────────────────────────────────────────────────────────────────────── */
export async function fetchCampusEvents(currentUserId?: string): Promise<CampusEventItem[]> {
  let userRsvps = new Set<string>();

  try {
    if (currentUserId) {
      const { data: rsvps } = await supabase
        .from('campus_event_rsvps')
        .select('event_id')
        .eq('user_id', currentUserId);
      if (rsvps) {
        userRsvps = new Set(rsvps.map((r: any) => r.event_id));
      }
    }

    const { data: dbEvents, error } = await supabase
      .from('campus_events')
      .select('*')
      .order('event_date', { ascending: true });

    if (!error && dbEvents && dbEvents.length > 0) {
      const events: CampusEventItem[] = dbEvents.map((e: any) => ({
        id: e.id,
        title: e.title,
        description: e.description,
        clubId: e.club_id,
        clubName: e.club_name,
        location: e.location,
        eventDate: e.event_date,
        eventTime: e.event_time,
        attendeeCount: e.attendee_count,
        hasRsvp: userRsvps.has(e.id),
      }));
      localStorage.setItem(EVENTS_CACHE_KEY, JSON.stringify(events));
      return events;
    }
  } catch {}

  try {
    const cached = localStorage.getItem(EVENTS_CACHE_KEY);
    if (cached) {
      const parsed: CampusEventItem[] = JSON.parse(cached);
      return parsed.map((e) => ({
        ...e,
        hasRsvp: userRsvps.has(e.id) || e.hasRsvp,
      }));
    }
  } catch {}

  return DEFAULT_EVENTS.map((e) => ({
    ...e,
    hasRsvp: userRsvps.has(e.id),
  }));
}

export async function toggleCampusEventRsvp(eventId: string, userId: string): Promise<boolean> {
  let isNowRsvp = false;
  try {
    const { data } = await supabase
      .from('campus_event_rsvps')
      .select('id')
      .eq('event_id', eventId)
      .eq('user_id', userId)
      .maybeSingle();

    if (data) {
      await supabase.from('campus_event_rsvps').delete().eq('id', data.id);
      isNowRsvp = false;
    } else {
      await supabase.from('campus_event_rsvps').insert({
        event_id: eventId,
        user_id: userId,
      });
      isNowRsvp = true;
    }
  } catch {}

  // Update local storage
  try {
    const cached = localStorage.getItem(EVENTS_CACHE_KEY);
    if (cached) {
      const parsed: CampusEventItem[] = JSON.parse(cached);
      const updated = parsed.map((e) => {
        if (e.id === eventId) {
          const next = !e.hasRsvp;
          isNowRsvp = next;
          return {
            ...e,
            hasRsvp: next,
            attendeeCount: Math.max(0, e.attendeeCount + (next ? 1 : -1)),
          };
        }
        return e;
      });
      localStorage.setItem(EVENTS_CACHE_KEY, JSON.stringify(updated));
    }
  } catch {}

  return isNowRsvp;
}

export async function createCampusEvent(event: {
  title: string;
  description?: string;
  location: string;
  eventDate: string;
  eventTime: string;
  clubName?: string;
  organizerId?: string;
  organizerName?: string;
}): Promise<CampusEventItem> {
  const newId = `event-${Date.now()}`;
  const newEvent: CampusEventItem = {
    id: newId,
    title: event.title,
    description: event.description,
    location: event.location,
    eventDate: event.eventDate,
    eventTime: event.eventTime,
    clubName: event.clubName,
    attendeeCount: 1,
    hasRsvp: true,
  };

  try {
    await supabase.from('campus_events').insert({
      id: newId,
      title: event.title,
      description: event.description,
      location: event.location,
      event_date: event.eventDate,
      event_time: event.eventTime,
      club_name: event.clubName,
      organizer_id: event.organizerId,
      organizer_name: event.organizerName,
      attendee_count: 1,
    });
    if (event.organizerId) {
      await supabase.from('campus_event_rsvps').insert({
        event_id: newId,
        user_id: event.organizerId,
      });
    }
  } catch {}

  return newEvent;
}

/* ──────────────────────────────────────────────────────────────────────────
   4. USER FOLLOWS SERVICE
   ────────────────────────────────────────────────────────────────────────── */
export async function fetchCampusFollows(currentUserId?: string): Promise<{
  followingIds: Set<string>;
  followersCount: number;
  followingCount: number;
}> {
  const followingIds = new Set<string>();
  let followersCount = 0;
  let followingCount = 0;

  if (!currentUserId) {
    try {
      const cached = localStorage.getItem(FOLLOWS_CACHE_KEY);
      if (cached) {
        const arr = JSON.parse(cached);
        return { followingIds: new Set(arr), followersCount: 18, followingCount: arr.length };
      }
    } catch {}
    return { followingIds, followersCount: 18, followingCount: 24 };
  }

  try {
    const { data: followingData } = await supabase
      .from('campus_user_follows')
      .select('following_id')
      .eq('follower_id', currentUserId);

    if (followingData) {
      followingData.forEach((f: any) => followingIds.add(f.following_id));
      followingCount = followingData.length;
    }

    const { count: fCount } = await supabase
      .from('campus_user_follows')
      .select('*', { count: 'exact', head: true })
      .eq('following_id', currentUserId);

    followersCount = fCount || 0;
  } catch {}

  return { followingIds, followersCount, followingCount };
}

export async function toggleCampusFollow(followerId: string, targetUserId: string): Promise<boolean> {
  let isNowFollowing = false;
  try {
    const { data } = await supabase
      .from('campus_user_follows')
      .select('id')
      .eq('follower_id', followerId)
      .eq('following_id', targetUserId)
      .maybeSingle();

    if (data) {
      await supabase.from('campus_user_follows').delete().eq('id', data.id);
      isNowFollowing = false;
    } else {
      await supabase.from('campus_user_follows').insert({
        follower_id: followerId,
        following_id: targetUserId,
      });
      isNowFollowing = true;
    }
  } catch {}

  try {
    const cached = localStorage.getItem(FOLLOWS_CACHE_KEY);
    let arr: string[] = cached ? JSON.parse(cached) : [];
    if (isNowFollowing) {
      arr.push(targetUserId);
    } else {
      arr = arr.filter((id) => id !== targetUserId);
    }
    localStorage.setItem(FOLLOWS_CACHE_KEY, JSON.stringify(arr));
  } catch {}

  return isNowFollowing;
}

/* ──────────────────────────────────────────────────────────────────────────
   5. SAVED POSTS / BOOKMARKS
   ────────────────────────────────────────────────────────────────────────── */
export async function fetchCampusSavedPostIds(userId?: string): Promise<Set<string>> {
  const savedIds = new Set<string>();
  if (!userId) {
    try {
      const cached = localStorage.getItem(SAVED_CACHE_KEY);
      if (cached) return new Set(JSON.parse(cached));
    } catch {}
    return savedIds;
  }

  try {
    const { data } = await supabase
      .from('campus_saved_posts')
      .select('post_id')
      .eq('user_id', userId);
    if (data) {
      data.forEach((d: any) => savedIds.add(d.post_id));
    }
  } catch {}

  try {
    const cached = localStorage.getItem(SAVED_CACHE_KEY);
    if (cached) {
      const arr = JSON.parse(cached);
      arr.forEach((id: string) => savedIds.add(id));
    }
  } catch {}

  return savedIds;
}

export async function toggleCampusSavedPost(postId: string, userId?: string): Promise<boolean> {
  let isNowSaved = false;
  if (userId) {
    try {
      const { data } = await supabase
        .from('campus_saved_posts')
        .select('id')
        .eq('user_id', userId)
        .eq('post_id', postId)
        .maybeSingle();

      if (data) {
        await supabase.from('campus_saved_posts').delete().eq('id', data.id);
        isNowSaved = false;
      } else {
        await supabase.from('campus_saved_posts').insert({
          user_id: userId,
          post_id: postId,
        });
        isNowSaved = true;
      }
    } catch {}
  }

  try {
    const cached = localStorage.getItem(SAVED_CACHE_KEY);
    let arr: string[] = cached ? JSON.parse(cached) : [];
    if (arr.includes(postId)) {
      arr = arr.filter((id) => id !== postId);
      isNowSaved = false;
    } else {
      arr.push(postId);
      isNowSaved = true;
    }
    localStorage.setItem(SAVED_CACHE_KEY, JSON.stringify(arr));
  } catch {}

  return isNowSaved;
}

/* ──────────────────────────────────────────────────────────────────────────
   6. POST REPORTS & MODERATION
   ────────────────────────────────────────────────────────────────────────── */
export async function reportCampusPost(postId: string, reason: string, reporterId?: string): Promise<boolean> {
  try {
    await supabase.from('campus_post_reports').insert({
      post_id: postId,
      reason,
      reporter_id: reporterId || null,
    });
  } catch {}
  return true;
}
