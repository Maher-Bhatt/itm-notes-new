import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronLeft,
  Image as ImageIcon,
  Calendar,
  MapPin,
  Globe,
  Users,
  ChevronRight,
  Trash2,
  Check,
  Clock,
  Sparkles,
} from 'lucide-react';
import { CampusAvatar } from './CampusAvatar';
import { CampusButton } from './CampusButton';
import { useAuth } from '@/contexts/AuthContext';
import { useUniversity } from '@/contexts/UniversityContext';
import { createCommunityPost } from '@/services/communityService';
import { toast } from 'sonner';

export interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
  /** Pre-fills the post text, e.g. a doubt raised from the Library reader */
  initialContent?: string;
}

const CAMPUS_LOCATIONS = [
  'Central Library',
  'Innovation Lab',
  'Seminar Hall 2',
  'Amphitheatre',
  'Ground Floor Canteen',
  'Sports Complex',
  'Lab 3 (Ground Floor)',
  'Main Auditorium',
  'Study Room B (1st Floor)',
];

const COMMUNITIES = [
  'General Campus',
  'Study Groups',
  'CSE Year 2',
  'DSA Club',
  'Robotics Club',
  'Debate Circle',
  'Placement Prep',
];

const AUDIENCES = [
  { label: 'Everyone at Campus', reach: 840 },
  { label: 'CSE Students Only', reach: 340 },
  { label: 'Club Members Only', reach: 140 },
];

const DRAFTS_KEY = 'campusloop_post_drafts';

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPostCreated,
  initialContent,
}) => {
  const { user, profile } = useAuth();
  const { currentUniversity } = useUniversity();

  const [content, setContent] = useState('');
  useEffect(() => {
    if (isOpen && initialContent) setContent(initialContent);
  }, [isOpen, initialContent]);
  const [selectedCommunity, setSelectedCommunity] = useState('Study Groups');
  const [images, setImages] = useState<string[]>([]);
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [showEventPicker, setShowEventPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Central Library');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedAudienceIndex, setSelectedAudienceIndex] = useState(0);
  const [showAudiencePicker, setShowAudiencePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDraftsModal, setShowDraftsModal] = useState(false);
  const [drafts, setDrafts] = useState<Array<{ id: string; content: string; date: string }>>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load drafts
  useEffect(() => {
    try {
      const stored = localStorage.getItem(DRAFTS_KEY);
      if (stored) setDrafts(JSON.parse(stored));
    } catch {}
  }, []);

  // Handle Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Listen to global open event
  useEffect(() => {
    const handleGlobalOpen = () => {
      // Trigger modal open
    };
    window.addEventListener('campus_open_create_post', handleGlobalOpen);
    return () => window.removeEventListener('campus_open_create_post', handleGlobalOpen);
  }, []);

  if (!isOpen) return null;

  const charCount = content.length;
  const isOverLimit = charCount > 280;

  // Handle Image Upload (up to 4 images, 10MB each)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length + files.length > 4) {
      toast.error('You can attach a maximum of 4 images per post.');
      return;
    }

    const readers: Promise<string>[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`"${file.name}" exceeds 10 MB limit.`);
        continue;
      }
      readers.push(
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target?.result as string);
          reader.readAsDataURL(file);
        })
      );
    }

    Promise.all(readers).then((newImgUrls) => {
      setImages((prev) => [...prev, ...newImgUrls].slice(0, 4));
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Drafts handling
  const handleSaveDraft = () => {
    if (!content.trim()) {
      toast.info('Post is empty, nothing to draft.');
      return;
    }
    const newDraft = {
      id: `draft-${Date.now()}`,
      content: content.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };
    const updated = [newDraft, ...drafts].slice(0, 5);
    setDrafts(updated);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated));
    toast.success('Draft saved successfully!');
  };

  const handleLoadDraft = (draftText: string) => {
    setContent(draftText);
    setShowDraftsModal(false);
    toast.success('Draft loaded.');
  };

  const handleDeleteDraft = (draftId: string) => {
    const updated = drafts.filter((d) => d.id !== draftId);
    setDrafts(updated);
    localStorage.setItem(DRAFTS_KEY, JSON.stringify(updated));
  };

  // Publish Post
  const handlePublish = async () => {
    if (!content.trim() && images.length === 0) {
      toast.error('Please write something or attach an image.');
      return;
    }
    if (isOverLimit) {
      toast.error('Please keep post under 280 characters.');
      return;
    }

    try {
      setIsSubmitting(true);
      const authorName = profile?.display_name || user?.email?.split('@')[0] || 'Campus Student';
      const authorBranch = profile?.branch || 'B.Tech CSE · Year 2';
      const eventDetails = eventDate ? `${eventDate} ${eventTime ? `at ${eventTime}` : ''}`.trim() : undefined;

      await createCommunityPost(
        {
          authorId: user?.id || 'guest-author',
          authorName,
          authorEmail: user?.email || '',
          authorAvatar: profile?.avatar_url,
          authorBranch: `${authorBranch} · ${currentUniversity.shortName}`,
          isMasked: false,
          category: selectedCommunity as any,
          content: content.trim(),
          mediaUrl: images[0] || undefined,
          university_id: currentUniversity.id,
        } as any,
        user?.id
      );

      toast.success('Post published to campus feed!');
      setContent('');
      setImages([]);
      setEventDate('');
      onPostCreated?.();
      onClose();
    } catch (err: any) {
      toast.error('Could not publish post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedAudience = AUDIENCES[selectedAudienceIndex];

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto"
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-background rounded-2xl border border-border dark:border-stone-800 shadow-lg overflow-hidden flex flex-col my-auto max-h-[92vh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Header: Back circle, Title, Drafts link */}
        <div className="p-4 sm:p-5 border-b border-border dark:border-stone-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-background dark:bg-stone-800 flex items-center justify-center text-foreground dark:text-white hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold tracking-tight text-foreground dark:text-white">
              New post
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowDraftsModal(true)}
              className="text-sm font-semibold text-primary hover:underline cursor-pointer"
            >
              Drafts ({drafts.length})
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              className="text-xs px-2.5 py-1 rounded-full bg-background dark:bg-stone-800 text-foreground dark:text-stone-300 font-semibold hover:bg-stone-200 transition-colors cursor-pointer"
            >
              Save Draft
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* Author Header */}
          <div className="flex items-center gap-3">
            <CampusAvatar
              src={profile?.avatar_url}
              name={profile?.display_name || user?.email || 'Student'}
              size={40}
            />
            <div>
              <h3 className="font-bold text-sm sm:text-base text-foreground dark:text-white leading-tight">
                {profile?.display_name || user?.email?.split('@')[0] || 'Campus Student'}
              </h3>
              <p className="text-xs text-muted-foreground dark:text-stone-400 font-medium">
                {profile?.branch || 'B.Tech CSE · Year 2'}
              </p>
            </div>
          </div>

          {/* Text Composer with Character Counter */}
          <div className="relative rounded-2xl border-2 border-primary p-3.5 bg-white dark:bg-card focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Anyone up for a Data Structures revision group before mid-sems? Thinking Library, 2nd floor, Thursday 6 PM..."
              className="w-full bg-transparent resize-none text-sm sm:text-base text-foreground dark:text-white placeholder:text-stone-400 focus:outline-none"
            />
            <div className="flex justify-end pt-1">
              <span
                className={`text-xs font-semibold ${
                  isOverLimit ? 'text-destructive font-bold' : 'text-muted-foreground dark:text-stone-400'
                }`}
              >
                {charCount} / 280
              </span>
            </div>
          </div>

          {/* Media Attach Box (Dashed box) */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageUpload}
            />

            {images.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl border-2 border-dashed border-border dark:border-stone-700 hover:border-primary p-4 flex items-center gap-4 cursor-pointer transition-all hover:bg-background/50 dark:hover:bg-stone-800/40"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex flex-col items-center justify-center shrink-0">
                  <ImageIcon className="w-5 h-5" />
                  <span className="text-[9px] font-bold mt-0.5">Add</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-foreground dark:text-white leading-tight">
                    Add photos or a flyer
                  </h4>
                  <p className="text-xs text-muted-foreground dark:text-stone-400 font-medium mt-0.5">
                    Up to 4 images, 10 MB each
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-border">
                      <img src={img} alt="Uploaded attachment" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/75 text-white flex items-center justify-center hover:bg-destructive transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                {images.length < 4 && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-semibold text-primary hover:underline"
                  >
                    + Add more photos ({4 - images.length} remaining)
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Post to a Community Chips */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-foreground dark:text-stone-300 mb-2">
              Post to a community
            </label>
            <div className="flex flex-wrap gap-2">
              {COMMUNITIES.map((c) => {
                const isSelected = selectedCommunity === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedCommunity(c)}
                    className={`h-9 px-4 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-foreground text-white dark:bg-white dark:text-foreground shadow-xs'
                        : 'bg-white dark:bg-card border border-border dark:border-stone-800 text-foreground dark:text-stone-300 hover:border-stone-400'
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Options Card: Event, Location, Audience */}
          <div className="rounded-2xl bg-white dark:bg-card border border-border dark:border-stone-800 divide-y divide-border dark:divide-stone-800/80 overflow-hidden">
            {/* Event Option */}
            <div
              onClick={() => setShowEventPicker(!showEventPicker)}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-background dark:hover:bg-stone-800/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-stone-500" />
                <span className="font-semibold text-sm text-foreground dark:text-white">Event</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground dark:text-stone-400">
                <span>{eventDate ? `${eventDate} ${eventTime}` : 'Optional'}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Event Picker Accordion */}
            {showEventPicker && (
              <div className="p-3 bg-background/40 dark:bg-stone-900/40 flex flex-wrap gap-2">
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="h-9 px-3 rounded-xl bg-white dark:bg-stone-800 border border-border text-xs font-medium"
                />
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="h-9 px-3 rounded-xl bg-white dark:bg-stone-800 border border-border text-xs font-medium"
                />
                {eventDate && (
                  <button
                    type="button"
                    onClick={() => {
                      setEventDate('');
                      setEventTime('');
                    }}
                    className="text-xs text-destructive font-semibold px-2"
                  >
                    Clear
                  </button>
                )}
              </div>
            )}

            {/* Location Option */}
            <div
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-background dark:hover:bg-stone-800/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-stone-500" />
                <span className="font-semibold text-sm text-foreground dark:text-white">Location</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground dark:text-stone-400">
                <span>{selectedLocation}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Location Picker Accordion */}
            {showLocationPicker && (
              <div className="p-3 bg-background/40 dark:bg-stone-900/40 flex flex-wrap gap-1.5">
                {CAMPUS_LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(loc);
                      setShowLocationPicker(false);
                    }}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                      selectedLocation === loc
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-border'
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}

            {/* Audience Option */}
            <div
              onClick={() => setShowAudiencePicker(!showAudiencePicker)}
              className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-background dark:hover:bg-stone-800/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-stone-500" />
                <span className="font-semibold text-sm text-foreground dark:text-white">Audience</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground dark:text-stone-400">
                <span>{selectedAudience.label}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Audience Picker Accordion */}
            {showAudiencePicker && (
              <div className="p-3 bg-background/40 dark:bg-stone-900/40 space-y-1.5">
                {AUDIENCES.map((aud, idx) => (
                  <button
                    key={aud.label}
                    type="button"
                    onClick={() => {
                      setSelectedAudienceIndex(idx);
                      setShowAudiencePicker(false);
                    }}
                    className={`w-full text-left text-xs px-3.5 py-2 rounded-xl font-medium flex items-center justify-between transition-all ${
                      selectedAudienceIndex === idx
                        ? 'bg-primary text-white'
                        : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-border'
                    }`}
                  >
                    <span>{aud.label}</span>
                    <span className="opacity-75">~{aud.reach} students</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Audience Info Lime Banner */}
          <div className="rounded-2xl bg-accent text-foreground p-3.5 sm:p-4 flex items-start gap-3 shadow-2xs">
            <div className="w-9 h-9 rounded-full bg-black/10 flex items-center justify-center shrink-0 mt-0.5">
              <Users className="w-5 h-5 text-foreground" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground leading-tight">
                About {selectedAudience.reach} students will see this
              </h4>
              <p className="text-xs text-stone-800 font-medium mt-0.5">
                Adding a time and place helps people join faster.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Bottom CTA: Full-width Publish button */}
        <div className="p-4 sm:p-5 border-t border-border dark:border-stone-800/80 bg-white dark:bg-background shrink-0">
          <button
            type="button"
            disabled={(!content.trim() && images.length === 0) || isOverLimit || isSubmitting}
            onClick={handlePublish}
            className="w-full h-12 rounded-full bg-primary text-white font-bold text-base hover:bg-primary active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md flex items-center justify-center gap-2"
          >
            {isSubmitting ? 'Publishing to Campus...' : 'Publish to campus'}
          </button>
        </div>
      </div>

      {/* Drafts Modal */}
      {showDraftsModal && (
        <div
          className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowDraftsModal(false)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-card rounded-2xl p-5 border border-border shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b mb-3">
              <h3 className="font-bold text-base text-foreground dark:text-white">Saved Drafts</h3>
              <button
                type="button"
                onClick={() => setShowDraftsModal(false)}
                className="p-1 rounded-full text-stone-500 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {drafts.length === 0 ? (
              <p className="text-xs text-stone-500 py-6 text-center">No saved drafts.</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {drafts.map((d) => (
                  <div
                    key={d.id}
                    className="p-3 rounded-2xl bg-background dark:bg-stone-800 flex items-start justify-between gap-2"
                  >
                    <div
                      className="min-w-0 flex-1 cursor-pointer"
                      onClick={() => handleLoadDraft(d.content)}
                    >
                      <p className="text-xs font-semibold text-foreground dark:text-white line-clamp-2">
                        {d.content}
                      </p>
                      <span className="text-[10px] text-stone-500 mt-1 block">{d.date}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteDraft(d.id)}
                      className="p-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
