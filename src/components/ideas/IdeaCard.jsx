import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bookmark, MessageSquare, ArrowRight, HandHelping, Sparkles } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Textarea } from '../common/Textarea';
import { Select } from '../common/Select';
import { ideaService } from '../../services/ideaService';
import { notificationService } from '../../services/notificationService';
import toast from 'react-hot-toast';

export const IdeaCard = ({
  idea,
  onLikeUpdate,
  onSaveUpdate,
  compact = false,
}) => {
  const [isLiked, setIsLiked] = useState(idea.isLiked || false);
  const [likesCount, setLikesCount] = useState(idea.likesCount || 0);
  const [isSaved, setIsSaved] = useState(idea.isSaved || false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpMessage, setHelpMessage] = useState('');
  const [proposedRole, setProposedRole] = useState('Skill contribution');
  const [isSubmittingHelp, setIsSubmittingHelp] = useState(false);

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const updated = await ideaService.toggleLike(idea.id);
      setIsLiked(updated.isLiked);
      setLikesCount(updated.likesCount);
      if (onLikeUpdate) onLikeUpdate(updated);
    } catch {
      toast.error('Failed to update reaction');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const updated = await ideaService.toggleSave(idea.id);
      setIsSaved(updated.isSaved);
      if (onSaveUpdate) onSaveUpdate(updated);
      toast.success(updated.isSaved ? 'Idea bookmarked' : 'Removed from saved ideas');
    } catch {
      toast.error('Failed to bookmark idea');
    }
  };

  const submitHelpRequest = async (e) => {
    e.preventDefault();
    if (!helpMessage.trim()) {
      toast.error('Please write a brief note on how you can contribute.');
      return;
    }
    try {
      setIsSubmittingHelp(true);
      await notificationService.sendCollaborationRequest({
        ideaId: idea.id,
        ideaTitle: idea.title,
        recipient: idea.creator,
        connectionType: proposedRole,
        message: helpMessage,
      });
      toast.success(`Collaboration request sent to ${idea.creator.name}!`);
      setShowHelpModal(false);
      setHelpMessage('');
    } catch {
      toast.error('Failed to submit request');
    } finally {
      setIsSubmittingHelp(false);
    }
  };

  const getStageVariant = (stage) => {
    switch (stage) {
      case 'Just an idea':
        return 'primary';
      case 'Researching':
        return 'lavender';
      case 'Planning':
        return 'blue';
      case 'Prototype':
      case 'Already building':
        return 'green';
      default:
        return 'default';
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#E8E7E0] p-5 sm:p-6 shadow-sm hover-lift flex flex-col justify-between transition-all group">
        <div>
          {/* Header: Author & Save */}
          <div className="flex items-start justify-between gap-3 mb-3.5">
            <Link
              to={`/profile/${idea.creator.id}`}
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <Avatar
                src={idea.creator.avatar}
                name={idea.creator.name}
                size="md"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-[#171717]">{idea.creator.name}</span>
                  <span className="text-[11px] font-mono font-medium px-1.5 py-0.2 rounded bg-[#FFF0EB] text-[#FF7043]">
                    ★{idea.creator.reputationScore}
                  </span>
                </div>
                <span className="text-xs text-[#737373]">{idea.createdAt || 'Recently'}</span>
              </div>
            </Link>

            <button
              onClick={handleSave}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-[#FFF0EB] border-[#FFD8CC] text-[#FF7043]'
                  : 'bg-[#F8F8F5] border-[#E8E7E0] text-[#737373] hover:text-[#171717] hover:bg-[#F2F1EC] dark:hover:text-white dark:hover:bg-[#262624]'
              }`}
              title={isSaved ? 'Remove bookmark' : 'Bookmark idea'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Badges: Category & Stage */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <Badge variant="default" size="sm">
              {idea.category}
            </Badge>
            <Badge variant={getStageVariant(idea.stage)} size="sm">
              {idea.stage}
            </Badge>
            <Badge variant="lavender" size="sm">
              {idea.connectionType}
            </Badge>
          </div>

          {/* Title & Short Description */}
          <Link to={`/ideas/${idea.id}`} className="block group-hover:text-[#FF7043] transition-colors">
            <h3 className="text-base sm:text-lg font-bold text-[#171717] leading-snug mb-2 transition-colors">
              {idea.title}
            </h3>
          </Link>
          <p className="text-sm text-[#525252] leading-relaxed line-clamp-3 mb-4">
            {idea.shortDescription}
          </p>

          {/* Skills Required */}
          {idea.requiredSkills && idea.requiredSkills.length > 0 && (
            <div className="mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#737373] block mb-1.5">
                Looking for:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {idea.requiredSkills.slice(0, 3).map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-0.5 rounded-lg bg-[#F8F8F5] border border-[#E8E7E0] text-[#404040] font-medium"
                  >
                    {skill}
                  </span>
                ))}
                {idea.requiredSkills.length > 3 && (
                  <span className="text-xs px-2 py-0.5 rounded-lg text-[#737373] font-medium">
                    +{idea.requiredSkills.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer: Stats & Actions */}
        <div className="pt-4 border-t border-[#F0EFEA] dark:border-[#22221F] flex flex-wrap items-center justify-between gap-x-3 gap-y-2.5">
          {/* Left Group: Engagement & Commitment */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-[#737373] dark:text-[#A8A8A2] min-w-0">
            <button
              type="button"
              onClick={handleLike}
              className={`inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer select-none shrink-0 ${
                isLiked
                  ? 'text-[#FF7043] font-bold bg-[#FFF0EB] dark:bg-[#FF7043]/15'
                  : 'hover:text-[#171717] hover:bg-[#F2F1EC] dark:hover:text-white dark:hover:bg-[#262624]'
              }`}
              title={isLiked ? 'Unlike idea' : 'Like idea'}
              aria-label={`${likesCount} likes`}
            >
              <Heart className={`w-3.5 h-3.5 shrink-0 ${isLiked ? 'fill-current text-[#FF7043]' : ''}`} />
              <span className="font-mono text-xs leading-none">{likesCount}</span>
            </button>

            <Link
              to={`/ideas/${idea.id}#comments`}
              className="inline-flex items-center gap-1.5 py-1 px-2 rounded-lg text-xs font-medium hover:text-[#171717] hover:bg-[#F2F1EC] dark:hover:text-white dark:hover:bg-[#262624] transition-colors shrink-0"
              title="View comments"
              aria-label={`${idea.commentsCount || 0} comments`}
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span className="font-mono text-xs leading-none">{idea.commentsCount || 0}</span>
            </Link>

            {idea.commitment && (
              <div className="inline-flex items-center gap-1.5 text-xs text-[#737373] dark:text-[#A8A8A2] whitespace-nowrap shrink-0">
                <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600 shrink-0" />
                <span
                  className="font-medium text-[11px] sm:text-xs truncate max-w-[120px] sm:max-w-none"
                  title={`Commitment level: ${idea.commitment}`}
                >
                  {idea.commitment}
                </span>
              </div>
            )}
          </div>

          {/* Right Group: Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <Button
              variant="subtle"
              size="sm"
              icon={HandHelping}
              onClick={() => setShowHelpModal(true)}
              className="h-8 px-2.5 sm:px-3 text-xs font-semibold whitespace-nowrap shrink-0"
            >
              I Can Help
            </Button>
            <Link to={`/ideas/${idea.id}`} className="inline-flex shrink-0">
              <Button
                variant="outline"
                size="sm"
                icon={ArrowRight}
                iconPosition="right"
                className="h-8 px-2.5 sm:px-3 text-xs font-semibold whitespace-nowrap shrink-0"
              >
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* "I Can Help" Quick Proposal Modal */}
      <Modal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        title="Offer Collaboration"
        description={`Pitch how you can unblock "${idea.title}"`}
      >
        <form onSubmit={submitHelpRequest} className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#F8F8F5] border border-[#E8E7E0] flex items-center gap-3">
            <Avatar src={idea.creator.avatar} name={idea.creator.name} size="md" />
            <div>
              <p className="text-xs text-[#737373]">Idea Creator</p>
              <p className="text-sm font-bold text-[#171717]">{idea.creator.name}</p>
            </div>
          </div>

          <Select
            label="How do you want to contribute?"
            value={proposedRole}
            onChange={(e) => setProposedRole(e.target.value)}
            options={[
              'Skill contribution',
              'Co-founder',
              'Micro-help (Feedback / Code review)',
              'Accountability partner',
              'Community support',
            ]}
          />

          <Textarea
            label="Your message or pitch"
            placeholder="Introduce yourself, what relevant projects you've built, and how you want to help..."
            rows={4}
            value={helpMessage}
            onChange={(e) => setHelpMessage(e.target.value)}
            required
          />

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setShowHelpModal(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={isSubmittingHelp}
              icon={HandHelping}
            >
              Send Offer
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
