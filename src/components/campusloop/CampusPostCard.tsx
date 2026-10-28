import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  MapPin,
  Calendar,
  Send,
  Trash2,
  Flag,
  Check,
} from 'lucide-react';
import { CampusAvatar } from './CampusAvatar';
import { CampusTag } from './CampusTag';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface PostPollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PostPoll {
  question: string;
  options: PostPollOption[];
  userVotedId?: string | null;
  totalVotes: number;
}

export interface PostCommentItem {
  id: string;
  authorName: string;
  authorAvatar?: string | null;
  authorBranch?: string;
  content: string;
  createdAt: string;
}

export interface CampusPostCardProps {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string | null;
  authorBranch?: string;
  communityOrClub?: string;
  createdAt: string;
  content: string;
  images?: string[];
  poll?: PostPoll | null;
  eventDate?: string | null;
  location?: string | null;
  likesCount: number;
  likedByMe?: boolean;
  commentsCount: number;
  sharesCount?: number;
  savedByMe?: boolean;
  comments?: PostCommentItem[];
  currentUserId?: string;
  isAdmin?: boolean;
  onLikeToggle?: (postId: string) => Promise<void> | void;
  onSaveToggle?: (postId: string) => Promise<void> | void;
  onShare?: (postId: string) => void;
  onVotePoll?: (postId: string, optionId: string) => Promise<void> | void;
  onAddComment?: (postId: string, commentText: string) => Promise<void> | void;
  onDeletePost?: (postId: string) => Promise<void> | void;
  onReportPost?: (postId: string, reason: string) => void;
  className?: string;
}

export const CampusPostCard: React.FC<CampusPostCardProps> = ({
  id,
  authorId,
  authorName,
  authorAvatar,
  authorBranch,
  communityOrClub,
  createdAt,
  content,
  images = [],
  poll,
  eventDate,
  location,
  likesCount,
  likedByMe = false,
  commentsCount,
  sharesCount = 0,
  savedByMe = false,
  comments = [],
  currentUserId,
  isAdmin = false,
  onLikeToggle,
  onSaveToggle,
  onShare,
  onVotePoll,
  onAddComment,
  onDeletePost,
  onReportPost,
  className = '',
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const isAuthor = currentUserId === authorId;

  const handleShare = () => {
    if (onShare) {
      onShare(id);
      return;
    }
    const url = `${window.location.origin}/community#post-${id}`;
    if (navigator.share) {
      navigator.share({ title: `Campus Post by ${authorName}`, text: content, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Post link copied to clipboard!');
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || submittingComment) return;
    try {
      setSubmittingComment(true);
      await onAddComment?.(id, newComment.trim());
      setNewComment('');
      toast.success('Reply posted!');
    } catch {
      toast.error('Failed to post reply');
    } finally {
      setSubmittingComment(false);
    }
  };

  return (
    <article
      id={`post-${id}`}
      className={`rounded-[22px] bg-white dark:bg-[#1C1C1E] border border-[#E8E4DA] dark:border-neutral-800 p-4 sm:p-5 shadow-xs transition-all ${className}`}
    >
      {/* 1. Header: Author Avatar + Name + Club/Time + Menu */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <CampusAvatar
            src={authorAvatar}
            name={authorName}
            size={40}
          />
          <div className="min-w-0">
            <h3 className="font-bold text-base text-[#111111] dark:text-white leading-tight truncate">
              {authorName}
            </h3>
            <p className="text-xs text-[#6B7280] dark:text-neutral-400 font-medium flex items-center gap-1 truncate mt-0.5">
              <span>{communityOrClub || authorBranch || 'Campus Community'}</span>
              <span>·</span>
              <span>{createdAt}</span>
            </p>
          </div>
        </div>

        {/* 3-dots Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-2xl p-1.5 shadow-xl">
            <DropdownMenuItem onClick={handleShare} className="cursor-pointer rounded-xl">
              <Share2 className="w-4 h-4 mr-2" /> Share Link
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSaveToggle?.(id)}
              className="cursor-pointer rounded-xl"
            >
              <Bookmark className="w-4 h-4 mr-2" /> {savedByMe ? 'Remove from Saved' : 'Save Post'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onReportPost?.(id, 'Inappropriate content')}
              className="cursor-pointer rounded-xl text-rose-600 focus:text-rose-600"
            >
              <Flag className="w-4 h-4 mr-2" /> Report to Moderator
            </DropdownMenuItem>
            {(isAuthor || isAdmin) && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onDeletePost?.(id)}
                  className="cursor-pointer rounded-xl text-rose-600 focus:text-rose-600 font-semibold"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Post
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 2. Body Text */}
      <p className="text-[#111111] dark:text-neutral-200 text-sm sm:text-base leading-relaxed whitespace-pre-line mb-3 font-normal">
        {content}
      </p>

      {/* Optional Metadata Chips: Event / Location */}
      {(eventDate || location) && (
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {eventDate && (
            <CampusTag variant="lime" icon={<Calendar className="w-3.5 h-3.5" />}>
              {eventDate}
            </CampusTag>
          )}
          {location && (
            <CampusTag variant="slate" icon={<MapPin className="w-3.5 h-3.5" />}>
              {location}
            </CampusTag>
          )}
        </div>
      )}

      {/* Optional Poll */}
      {poll && (
        <div className="rounded-2xl border border-[#E8E4DA] dark:border-neutral-800 p-3.5 mb-3 bg-[#F6F3EC]/50 dark:bg-neutral-900/40">
          <p className="font-bold text-sm text-[#111111] dark:text-white mb-2.5">
            {poll.question}
          </p>
          <div className="space-y-2">
            {poll.options.map((option) => {
              const hasVoted = Boolean(poll.userVotedId);
              const isSelected = poll.userVotedId === option.id;
              const percentage =
                poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;

              return (
                <button
                  key={option.id}
                  type="button"
                  disabled={hasVoted}
                  onClick={() => onVotePoll?.(id, option.id)}
                  className={`w-full text-left relative overflow-hidden rounded-xl p-2.5 border transition-all text-xs sm:text-sm font-semibold flex items-center justify-between ${
                    isSelected
                      ? 'border-[#2B4EFF] bg-blue-50/80 dark:bg-blue-950/40 text-[#2B4EFF]'
                      : 'border-[#E8E4DA] dark:border-neutral-800 bg-white dark:bg-[#1C1C1E] text-[#111111] dark:text-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {hasVoted && (
                    <div
                      className="absolute inset-y-0 left-0 bg-[#E6EAFD] dark:bg-blue-950/30 transition-all duration-500 -z-0"
                      style={{ width: `${percentage}%` }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    {option.text}
                  </span>
                  {hasVoted && (
                    <span className="relative z-10 text-xs font-bold text-[#6B7280] dark:text-neutral-400">
                      {percentage}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-[#6B7280] dark:text-neutral-400 font-medium mt-2">
            {poll.totalVotes} {poll.totalVotes === 1 ? 'vote' : 'votes'}
          </p>
        </div>
      )}

      {/* Optional Attached Images (up to 4 grid) */}
      {images.length > 0 && (
        <div
          className={`grid gap-2 mb-3.5 overflow-hidden rounded-2xl ${
            images.length === 1
              ? 'grid-cols-1'
              : images.length === 2
              ? 'grid-cols-2'
              : images.length === 3
              ? 'grid-cols-2'
              : 'grid-cols-2'
          }`}
        >
          {images.slice(0, 4).map((imgUrl, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(imgUrl)}
              className={`relative overflow-hidden bg-neutral-100 dark:bg-neutral-800 cursor-pointer group ${
                images.length === 3 && idx === 0 ? 'col-span-2 aspect-video' : 'aspect-square'
              }`}
            >
              <img
                src={imgUrl}
                alt={`Post attachment ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* 3. Actions Footer: Like, Comment, Share, Save */}
      <div className="flex items-center justify-between pt-2 border-t border-[#EFECE6] dark:border-neutral-800/80 text-[#6B7280] dark:text-neutral-400">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Like */}
          <button
            type="button"
            onClick={() => onLikeToggle?.(id)}
            className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
              likedByMe ? 'text-[#2B4EFF] dark:text-[#3D5EFF]' : 'hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            <Heart
              className={`w-4 h-4 sm:w-5 sm:h-5 ${likedByMe ? 'fill-[#2B4EFF] text-[#2B4EFF]' : ''}`}
            />
            <span>{likesCount}</span>
          </button>

          {/* Comment */}
          <button
            type="button"
            onClick={() => setShowComments((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold hover:text-[#111111] dark:hover:text-white transition-colors cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{commentsCount}</span>
          </button>

          {/* Share */}
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold hover:text-[#111111] dark:hover:text-white transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{sharesCount}</span>
          </button>
        </div>

        {/* Bookmark / Save */}
        <button
          type="button"
          onClick={() => onSaveToggle?.(id)}
          className={`p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer ${
            savedByMe ? 'text-[#2B4EFF] dark:text-[#3D5EFF]' : 'hover:text-[#111111] dark:hover:text-white'
          }`}
          title={savedByMe ? 'Saved' : 'Save'}
        >
          <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 ${savedByMe ? 'fill-[#2B4EFF]' : ''}`} />
        </button>
      </div>

      {/* 4. Comments Section Accordion */}
      {showComments && (
        <div className="mt-4 pt-3.5 border-t border-[#EFECE6] dark:border-neutral-800 space-y-3">
          {/* New comment input */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a reply to the campus..."
              className="h-10 flex-1 rounded-full bg-[#F6F3EC] dark:bg-neutral-800 text-xs sm:text-sm px-4 border border-[#E8E4DA] dark:border-neutral-700 focus:outline-none focus:border-[#2B4EFF]"
            />
            <button
              type="submit"
              disabled={!newComment.trim() || submittingComment}
              className="h-10 px-4 rounded-full bg-[#2B4EFF] text-white font-bold text-xs hover:bg-[#1E3EDB] disabled:opacity-50 transition-all flex items-center gap-1 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Reply</span>
            </button>
          </form>

          {/* Comment list */}
          {comments.length > 0 ? (
            <div className="space-y-2.5 pt-1">
              {comments.map((c) => (
                <div
                  key={c.id}
                  className="p-3 rounded-2xl bg-[#F6F3EC]/70 dark:bg-neutral-900/60 text-xs sm:text-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#111111] dark:text-white">
                      {c.authorName}
                    </span>
                    <span className="text-[11px] text-[#6B7280] dark:text-neutral-400">
                      {c.createdAt}
                    </span>
                  </div>
                  <p className="text-[#111111] dark:text-neutral-200">{c.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-[#6B7280] dark:text-neutral-400 text-center py-2">
              No replies yet. Be the first to reply!
            </p>
          )}
        </div>
      )}

      {/* Lightbox Modal for Image Preview */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 backdrop-blur-sm cursor-zoom-out"
        >
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}
    </article>
  );
};
