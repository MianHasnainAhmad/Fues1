import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  Bookmark,
  Share2,
  HandHelping,
  MessageSquare,
  ArrowLeft,
  Calendar,
  Sparkles,
  CheckCircle2,
  Users,
  Send,
  Flame,
} from 'lucide-react';
import { Avatar } from '../../components/common/Avatar';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { IdeaCard } from '../../components/ideas/IdeaCard';
import { ideaService } from '../../services/ideaService';
import { notificationService } from '../../services/notificationService';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export const IdeaDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [similarIdeas, setSimilarIdeas] = useState([]);

  // "I Can Help" modal state
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [proposedRole, setProposedRole] = useState('Skill contribution');
  const [helpMessage, setHelpMessage] = useState('');
  const [isSubmittingHelp, setIsSubmittingHelp] = useState(false);

  useEffect(() => {
    loadIdea();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const loadIdea = async () => {
    try {
      setLoading(true);
      const res = await ideaService.getIdeaById(id);
      setIdea(res);

      // fetch similar ideas
      const allIdeas = await ideaService.getIdeas();
      const filtered = allIdeas.filter((item) => item.id !== id).slice(0, 2);
      setSimilarIdeas(filtered);
    } catch (e) {
      toast.error('Idea not found');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const updated = await ideaService.toggleLike(idea.id);
      setIdea(updated);
    } catch {
      toast.error('Failed to update reaction');
    }
  };

  const handleSave = async () => {
    try {
      const updated = await ideaService.toggleSave(idea.id);
      setIdea(updated);
      toast.success(updated.isSaved ? 'Idea bookmarked' : 'Removed from bookmarks');
    } catch {
      toast.error('Failed to bookmark');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      setIsSubmittingComment(true);
      const newComment = await ideaService.addComment(idea.id, commentText, user);
      setIdea((prev) => ({
        ...prev,
        comments: [newComment, ...(prev.comments || [])],
        commentsCount: (prev.commentsCount || 0) + 1,
      }));
      setCommentText('');
      toast.success('Comment posted!');
    } catch {
      toast.error('Failed to post comment');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleSendHelp = async (e) => {
    e.preventDefault();
    if (!helpMessage.trim()) {
      toast.error('Please write a note explaining your offer.');
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
      toast.success(`Proposal sent to ${idea.creator.name}!`);
      setShowHelpModal(false);
      setHelpMessage('');
    } catch {
      toast.error('Failed to send proposal');
    } finally {
      setIsSubmittingHelp(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <div className="w-8 h-8 border-3 border-[#FF7043] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-xl font-bold">Idea not found</h2>
        <Link to="/ideas">
          <Button variant="primary">Return to Ideas Feed</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between">
        <Link
          to="/ideas"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#737373] hover:text-[#171717] dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to explore
        </Link>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Share2}
            onClick={handleShare}
          >
            Share
          </Button>
          <Button
            variant={idea.isSaved ? 'subtle' : 'outline'}
            size="sm"
            icon={Bookmark}
            onClick={handleSave}
          >
            {idea.isSaved ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Main Grid: Content (Left) + Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Main Idea Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" size="md">
                {idea.category}
              </Badge>
              <Badge variant="primary" size="md">
                {idea.stage}
              </Badge>
              <Badge variant="lavender" size="md">
                {idea.connectionType}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight leading-tight">
              {idea.title}
            </h1>

            {/* Short Pitch */}
            <p className="text-base sm:text-lg text-[#404040] leading-relaxed font-medium">
              {idea.shortDescription}
            </p>

            {/* Detailed Body */}
            {idea.detailedDescription && (
              <div className="pt-4 border-t border-[#F0EFEA] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#737373]">
                  Detailed Breakdown & Problem Scope
                </h3>
                <p className="text-sm text-[#525252] leading-relaxed whitespace-pre-line">
                  {idea.detailedDescription}
                </p>
              </div>
            )}

            {/* Target Help Callout */}
            {idea.targetHelpDescription && (
              <div className="p-4 rounded-2xl bg-[#FFF0EB] border border-[#FFD8CC] space-y-1.5">
                <span className="text-xs font-bold text-[#FF7043] uppercase tracking-wider block">
                  Creator's Primary Blocker
                </span>
                <p className="text-sm text-[#171717] font-medium leading-relaxed">
                  "{idea.targetHelpDescription}"
                </p>
              </div>
            )}

            {/* Required Skills */}
            {idea.requiredSkills && idea.requiredSkills.length > 0 && (
              <div className="pt-4 border-t border-[#F0EFEA]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#737373] block mb-2">
                  Needed Skills & Expertise
                </span>
                <div className="flex flex-wrap gap-2">
                  {idea.requiredSkills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-[#F8F8F5] border border-[#E8E7E0] text-xs font-semibold text-[#171717]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Reactions & "I Can Help" Action */}
            <div className="pt-6 border-t border-[#F0EFEA] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 py-2 px-3.5 rounded-xl border text-sm font-semibold transition-colors cursor-pointer ${
                    idea.isLiked
                      ? 'bg-[#FFF0EB] border-[#FFD8CC] text-[#FF7043]'
                      : 'border-[#E8E7E0] text-[#737373] hover:text-[#171717] hover:bg-[#F8F8F5] dark:hover:text-white dark:hover:bg-[#262624]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${idea.isLiked ? 'fill-current' : ''}`} />
                  <span>{idea.likesCount} Upvotes</span>
                </button>

                <a
                  href="#comments"
                  className="flex items-center gap-2 py-2 px-3.5 rounded-xl border border-[#E8E7E0] text-sm font-semibold text-[#737373] hover:text-[#171717] hover:bg-[#F8F8F5] dark:hover:text-white dark:hover:bg-[#262624] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{idea.commentsCount || 0} Comments</span>
                </a>
              </div>

              <Button
                variant="primary"
                size="md"
                icon={HandHelping}
                onClick={() => setShowHelpModal(true)}
              >
                I Can Help With This
              </Button>
            </div>
          </div>

          {/* Comments Section */}
          <div id="comments" className="bg-white rounded-3xl border border-[#E8E7E0] p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#171717]">
                Community Discussion ({idea.comments?.length || 0})
              </h3>
              <span className="text-xs text-[#737373]">Help critique or suggest next steps</span>
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="space-y-3">
              <Textarea
                placeholder="Share constructive feedback, a relevant link, or how you might tackle this..."
                rows={3}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  loading={isSubmittingComment}
                  icon={Send}
                >
                  Post Comment
                </Button>
              </div>
            </form>

            {/* Comments List */}
            <div className="divide-y divide-[#F0EFEA] pt-4">
              {idea.comments && idea.comments.length > 0 ? (
                idea.comments.map((comment) => (
                  <div key={comment.id} className="py-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Avatar
                          src={comment.author.avatar}
                          name={comment.author.name}
                          size="sm"
                        />
                        <div>
                          <span className="text-xs font-bold text-[#171717]">
                            {comment.author.name}
                          </span>
                          <span className="text-[11px] text-[#A3A3A3] ml-2">
                            {comment.author.handle}
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] text-[#737373]">{comment.createdAt}</span>
                    </div>
                    <p className="text-sm text-[#525252] pl-10 leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-[#737373]">
                  No comments yet. Be the first to share your perspective!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Creator Profile Card & AI Analysis CTA */}
        <div className="space-y-6">
          {/* Creator Information Card */}
          <div className="bg-white rounded-3xl border border-[#E8E7E0] p-6 shadow-sm space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF7043] block">
              About the Creator
            </span>

            <div className="flex items-center gap-3.5">
              <Avatar
                src={idea.creator.avatar}
                name={idea.creator.name}
                size="lg"
                status="online"
              />
              <div className="min-w-0">
                <h4 className="text-base font-bold text-[#171717] truncate">{idea.creator.name}</h4>
                <p className="text-xs text-[#737373] truncate">{idea.creator.title}</p>
                <span className="text-[11px] font-mono font-bold text-[#FF7043] block mt-0.5">
                  Reputation Score: ★{idea.creator.reputationScore}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8F8F5] border border-[#E8E7E0] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#737373]">Commitment Desired:</span>
                <span className="font-semibold text-[#171717]">{idea.commitment}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#737373]">Published:</span>
                <span className="font-semibold text-[#171717]">{idea.createdAt || 'Recently'}</span>
              </div>
            </div>

            <Link to={`/profile/${idea.creator.id}`} className="block">
              <Button variant="outline" size="sm" className="w-full">
                View Creator Profile
              </Button>
            </Link>
          </div>

          {/* AI Semantic Cross-Check Widget */}
          <div className="bg-gradient-to-br from-[#171717] to-[#262626] text-white rounded-3xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF7043]">
              <Sparkles className="w-4 h-4" />
              <span>AI Similarity Cross-Check</span>
            </div>
            <h4 className="text-sm font-bold text-white">Compare Against Similar Concepts</h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              Use our AI Companion to inspect how this idea contrasts with other active community projects.
            </p>
            <Link to={`/ai-companion?seed=${idea.id}`} className="block pt-1">
              <Button variant="primary" size="sm" className="w-full">
                Run AI Similarity Match
              </Button>
            </Link>
          </div>

          {/* Similar Community Ideas */}
          {similarIdeas.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-[#171717]">Similar Ideas on Fuse</h4>
              <div className="space-y-3">
                {similarIdeas.map((sim) => (
                  <Link
                    key={sim.id}
                    to={`/ideas/${sim.id}`}
                    className="block p-4 rounded-2xl bg-white border border-[#E8E7E0] hover-lift transition-all"
                  >
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#FFF0EB] text-[#FF7043] inline-block mb-1.5">
                      {sim.category}
                    </span>
                    <h5 className="text-xs font-bold text-[#171717] line-clamp-1">{sim.title}</h5>
                    <p className="text-[11px] text-[#737373] line-clamp-2 mt-1">{sim.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* "I Can Help" Modal */}
      <Modal
        isOpen={showHelpModal}
        onClose={() => setShowHelpModal(false)}
        title="Propose Collaboration"
        description={`Send a personal note to ${idea.creator.name}`}
      >
        <form onSubmit={handleSendHelp} className="space-y-4">
          <Select
            label="In what role do you want to contribute?"
            value={proposedRole}
            onChange={(e) => setProposedRole(e.target.value)}
            options={[
              'Skill contribution',
              'Co-founder',
              'Micro-help (Feedback / Code review)',
              'Accountability partner',
              'Community testing',
            ]}
          />

          <Textarea
            label="Your proposal or intro"
            placeholder="Share your relevant background, what caught your attention in this idea, and how many hours you can commit..."
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
              icon={Send}
            >
              Send Proposal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
