import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  TrendingUp,
  Sparkles,
  Search,
  Filter,
  Plus,
  Calendar,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useGamification } from '@/hooks/useGamification';
import {
  CampusSearchField,
  CampusFilterChip,
  CampusSectionHeader,
  CampusClubCard,
  CampusEventRow,
  CampusPersonTile,
  CampusButton,
} from '@/components/campusloop';
import {
  fetchCampusClubs,
  toggleCampusClubMembership,
  CampusClubItem,
  fetchCampusEvents,
  toggleCampusEventRsvp,
  CampusEventItem,
  DEFAULT_PEOPLE,
  CampusPersonItem,
  fetchCampusFollows,
  toggleCampusFollow,
} from '@/services/campusLoopService';

type FilterCategory = 'All' | 'Clubs' | 'Events' | 'Study' | 'Sports';

const TRENDING_HASHTAGS = [
  { tag: '#HackNight', count: 428 },
  { tag: '#PlacementPrep', count: 312 },
  { tag: '#MidSems', count: 245 },
  { tag: '#DSAChallenge', count: 198 },
  { tag: '#CampusVibes', count: 164 },
];

export default function ExplorePage() {
  const { user } = useAuth();
  const { addXp } = useGamification();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('All');
  const [clubs, setClubs] = useState<CampusClubItem[]>([]);
  const [events, setEvents] = useState<CampusEventItem[]>([]);
  const [people, setPeople] = useState<CampusPersonItem[]>(DEFAULT_PEOPLE);
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Load data
  useEffect(() => {
    async function loadExploreData() {
      try {
        setIsLoading(true);
        const [loadedClubs, loadedEvents, followData] = await Promise.all([
          fetchCampusClubs(user?.id),
          fetchCampusEvents(user?.id),
          fetchCampusFollows(user?.id),
        ]);

        setClubs(loadedClubs);
        setEvents(loadedEvents);
        setFollowingIds(followData.followingIds);
      } catch (err) {
        console.warn('Failed loading explore data:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadExploreData();
  }, [user?.id]);

  // Handle Join/Leave Club
  const handleToggleClub = async (clubId: string) => {
    if (!user) {
      toast.info('Please sign in to join campus clubs.');
      return;
    }
    try {
      const isMember = await toggleCampusClubMembership(clubId, user.id);
      setClubs((prev) =>
        prev.map((c) =>
          c.id === clubId
            ? {
                ...c,
                isMember,
                memberCount: Math.max(0, c.memberCount + (isMember ? 1 : -1)),
              }
            : c
        )
      );
      if (isMember) {
        toast.success('Joined club! Community discussions added to your feed.');
        addXp(15, 'Joined campus club');
      } else {
        toast.info('Left club.');
      }
    } catch {
      toast.error('Could not update club membership.');
    }
  };

  // Handle RSVP to Event
  const handleToggleEventRsvp = async (eventId: string) => {
    if (!user) {
      toast.info('Please sign in to RSVP for events.');
      return;
    }
    try {
      const hasRsvp = await toggleCampusEventRsvp(eventId, user.id);
      setEvents((prev) =>
        prev.map((e) =>
          e.id === eventId
            ? {
                ...e,
                hasRsvp,
                attendeeCount: Math.max(0, e.attendeeCount + (hasRsvp ? 1 : -1)),
              }
            : e
        )
      );
      if (hasRsvp) {
        toast.success('RSVP confirmed! Added to your schedule.');
        addXp(20, 'RSVP to campus event');
      } else {
        toast.info('RSVP cancelled.');
      }
    } catch {
      toast.error('Could not update RSVP.');
    }
  };

  // Handle Follow / Unfollow User
  const handleToggleFollow = async (targetId: string) => {
    if (!user) {
      toast.info('Please sign in to follow classmates.');
      return;
    }
    try {
      const isFollowing = await toggleCampusFollow(user.id, targetId);
      setFollowingIds((prev) => {
        const next = new Set(prev);
        if (isFollowing) {
          next.add(targetId);
          toast.success('Following student! Their posts will appear in your Following tab.');
          addXp(10, 'Followed classmate');
        } else {
          next.delete(targetId);
          toast.info('Unfollowed student.');
        }
        return next;
      });
    } catch {
      toast.error('Could not update follow status.');
    }
  };

  // Filtered lists based on search & category
  const filteredClubs = useMemo(() => {
    if (selectedFilter === 'Events') return [];
    return clubs.filter((c) => {
      if (selectedFilter === 'Sports' && c.category !== 'Sports') return false;
      if (selectedFilter === 'Study' && c.category !== 'Tech' && c.category !== 'Academic') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
      }
      return true;
    });
  }, [clubs, selectedFilter, searchQuery]);

  const filteredEvents = useMemo(() => {
    if (selectedFilter === 'Clubs') return [];
    return events.filter((e) => {
      if (selectedFilter === 'Sports' && !e.title.toLowerCase().includes('sport')) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q) ||
          (e.description && e.description.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [events, selectedFilter, searchQuery]);

  const filteredPeople = useMemo(() => {
    if (selectedFilter === 'Clubs' || selectedFilter === 'Events') return [];
    return people.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.department.toLowerCase().includes(q);
      }
      return true;
    });
  }, [people, selectedFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F6F3EC] dark:bg-[#0E0E10] text-[#111111] dark:text-neutral-100 pb-20">
      <div className="max-w-2xl mx-auto px-3 sm:px-4 pt-4 sm:pt-6 space-y-5">
        {/* 1. Header: "Explore" title + Campus location */}
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#111111] dark:text-white">
            Explore
          </h1>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6B7280] dark:text-neutral-400 bg-white/70 dark:bg-neutral-800/60 px-3 py-1.5 rounded-full border border-[#E8E4DA] dark:border-neutral-700 shadow-2xs">
            <MapPin className="w-4 h-4 text-[#2B4EFF] shrink-0" />
            <span className="truncate max-w-[180px] sm:max-w-none">ITM SLS Baroda University</span>
          </div>
        </div>

        {/* 2. Search Field + Filter Button */}
        <CampusSearchField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search clubs, events, people..."
          hasFilterButton
          filterActive={selectedFilter !== 'All'}
          onFilterClick={() => {
            const filters: FilterCategory[] = ['All', 'Clubs', 'Events', 'Study', 'Sports'];
            const nextIdx = (filters.indexOf(selectedFilter) + 1) % filters.length;
            setSelectedFilter(filters[nextIdx]);
          }}
        />

        {/* 3. Filter Chips: All, Clubs, Events, Study, Sports */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
          {(['All', 'Clubs', 'Events', 'Study', 'Sports'] as FilterCategory[]).map((cat) => (
            <CampusFilterChip
              key={cat}
              active={selectedFilter === cat}
              onClick={() => setSelectedFilter(cat)}
            >
              {cat}
            </CampusFilterChip>
          ))}
        </div>

        {/* 4. Trending Hashtags Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2B4EFF] shrink-0 px-1">
            <TrendingUp className="w-4 h-4" />
            <span>Trending</span>
          </div>
          {TRENDING_HASHTAGS.map((item) => (
            <button
              key={item.tag}
              type="button"
              onClick={() => setSearchQuery(item.tag)}
              className="h-8 px-3 rounded-full bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 text-xs font-semibold text-[#111111] dark:text-neutral-200 hover:border-[#2B4EFF] transition-colors shrink-0 inline-flex items-center gap-1.5"
            >
              <span>{item.tag}</span>
              <span className="text-[10px] text-neutral-400 font-bold">{item.count}</span>
            </button>
          ))}
        </div>

        {/* 5. Section: "Clubs for you" (Horizontal Carousel) */}
        {filteredClubs.length > 0 && (
          <section>
            <CampusSectionHeader
              title="Clubs for you"
              seeAllLink="/explore?tab=clubs"
            />
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x -mx-3 px-3 sm:mx-0 sm:px-0">
              {filteredClubs.map((club) => (
                <CampusClubCard
                  key={club.id}
                  id={club.id}
                  name={club.name}
                  category={club.category}
                  memberCount={club.memberCount}
                  iconName={club.iconName}
                  isMember={club.isMember}
                  onToggleJoin={handleToggleClub}
                  className="snap-start"
                />
              ))}
            </div>
          </section>
        )}

        {/* 6. Section: "This week" (Event Rows) */}
        {filteredEvents.length > 0 && (
          <section className="space-y-3">
            <CampusSectionHeader
              title="This week"
              seeAllLink="/explore?tab=events"
            />
            <div className="space-y-2.5">
              {filteredEvents.map((evt) => (
                <CampusEventRow
                  key={evt.id}
                  id={evt.id}
                  title={evt.title}
                  dateStr={evt.eventDate}
                  locationText={evt.location}
                  timeText={evt.eventTime}
                  attendeeCount={evt.attendeeCount}
                  hasRsvp={evt.hasRsvp}
                  onToggleRsvp={handleToggleEventRsvp}
                />
              ))}
            </div>
          </section>
        )}

        {/* 7. Section: "People to follow" */}
        {filteredPeople.length > 0 && (
          <section>
            <CampusSectionHeader title="People to follow" />
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none -mx-3 px-3 sm:mx-0 sm:px-0">
              {filteredPeople.map((person) => (
                <CampusPersonTile
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  department={person.department}
                  year={person.year}
                  avatarUrl={person.avatarUrl}
                  isFollowing={followingIds.has(person.id)}
                  onToggleFollow={handleToggleFollow}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
