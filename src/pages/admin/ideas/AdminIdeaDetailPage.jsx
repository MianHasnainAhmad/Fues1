import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Lightbulb,
  ArrowLeft,
  Star,
  CheckCircle,
  XCircle,
  Archive,
  Trash2,
  Cpu,
  User,
  Calendar,
  Eye,
  Heart,
  MessageSquare,
  ShieldAlert,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminStatusBadge } from '../../../components/admin/common/AdminStatusBadge';
import { AdminConfirmModal } from '../../../components/admin/common/AdminConfirmModal';
import { Button } from '../../../components/common/Button';
import { adminIdeaService } from '../../../services/adminIdeaService';
import { adminActivityLogService } from '../../../services/adminActivityLogService';
import toast from 'react-hot-toast';

export const AdminIdeaDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalAction, setModalAction] = useState(null);

  useEffect(() => {
    const loadIdea = async () => {
      setLoading(true);
      try {
        const i = await adminIdeaService.getIdeaById(id);
        setIdea(i);
      } catch {
        toast.error('Idea not found');
        navigate('/admin/ideas');
      } finally {
        setLoading(false);
      }
    };
    loadIdea();
  }, [id, navigate]);

  if (loading || !idea) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-3 border-[#FF7043] border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-[#71717A]">Loading idea record...</p>
      </div>
    );
  }

  const handleToggleFeature = async () => {
    try {
      const res = await adminIdeaService.toggleFeature(idea.id);
      setIdea({ ...idea, isFeatured: res.isFeatured });
      toast.success(res.isFeatured ? 'Idea promoted to Featured' : 'Idea unfeatured');
    } catch {
      toast.error('Failed to update featured status');
    }
  };

  const handleActionConfirm = async () => {
    if (!modalAction) return;
    try {
      if (modalAction === 'approve') {
        await adminIdeaService.approveIdea(idea.id);
        await adminActivityLogService.logAction('IDEA_APPROVED', `Idea: ${idea.title}`, 'Approved from detail view.', 'success');
        setIdea({ ...idea, status: 'published', moderationStatus: 'approved' });
        toast.success('Idea approved & published');
      } else if (modalAction === 'reject') {
        await adminIdeaService.rejectIdea(idea.id);
        await adminActivityLogService.logAction('IDEA_REJECTED', `Idea: ${idea.title}`, 'Rejected from detail view.', 'danger');
        setIdea({ ...idea, status: 'rejected', moderationStatus: 'rejected' });
        toast.success('Idea rejected');
      } else if (modalAction === 'archive') {
        await adminIdeaService.archiveIdea(idea.id);
        await adminActivityLogService.logAction('IDEA_ARCHIVED', `Idea: ${idea.title}`, 'Archived from detail view.', 'warning');
        setIdea({ ...idea, status: 'archived' });
        toast.success('Idea archived');
      } else if (modalAction === 'delete') {
        await adminIdeaService.deleteIdea(idea.id);
        await adminActivityLogService.logAction('IDEA_DELETED', `Idea: ${idea.title}`, 'Deleted from detail view.', 'danger');
        toast.success('Idea permanently removed');
        navigate('/admin/ideas');
      }
      setModalAction(null);
    } catch {
      toast.error('Operation failed');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <AdminPageHeader
        title={idea.title}
        description={`Category: ${idea.category} • Stage: ${idea.stage} • Published on ${idea.publishedAt}`}
        breadcrumbs={[
          { label: 'Ideas', href: '/admin/ideas' },
          { label: idea.title },
        ]}
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Link to="/admin/ideas">
              <Button variant="ghost" size="sm" icon={ArrowLeft}>
                Back to Ideas
              </Button>
            </Link>

            <Button
              variant={idea.isFeatured ? 'primary' : 'secondary'}
              size="sm"
              icon={Star}
              onClick={handleToggleFeature}
            >
              {idea.isFeatured ? 'Featured Idea' : 'Feature Idea'}
            </Button>

            {idea.status !== 'published' ? (
              <Button
                variant="primary"
                size="sm"
                icon={CheckCircle}
                onClick={() => setModalAction('approve')}
              >
                Approve
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                icon={XCircle}
                className="!text-rose-600 hover:!bg-rose-50"
                onClick={() => setModalAction('reject')}
              >
                Reject
              </Button>
            )}

            <Button
              variant="secondary"
              size="sm"
              icon={Archive}
              onClick={() => setModalAction('archive')}
            >
              Archive
            </Button>

            <Button
              variant="ghost"
              size="sm"
              icon={Trash2}
              className="text-stone-400 hover:text-rose-600"
              onClick={() => setModalAction('delete')}
            />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main 2 Cols: Content, Skills, AI Telemetry */}
        <div className="lg:col-span-2 space-y-6">
          {/* Detailed Proposal Card */}
          <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <AdminStatusBadge status={idea.status} />
                <AdminStatusBadge status={idea.moderationStatus} />
              </div>
              <span className="text-xs font-mono font-bold text-[#FF7043] bg-[#FFF0EB] dark:bg-[#FF7043]/15 px-3 py-1 rounded-full border border-[#FFD8CC] dark:border-[#FF7043]/30">
                Connection Needed: {idea.connectionType}
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#171717] dark:text-[#F5F5F0]">
                {idea.title}
              </h2>
              <p className="text-sm text-[#71717A] dark:text-[#A8A8A2] font-medium leading-relaxed">
                {idea.shortDescription}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F0EFEA] dark:border-[#22221F] space-y-2">
              <h3 className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0] uppercase tracking-wider">
                Full Description & Problem Statement
              </h3>
              <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A8A8A2] leading-relaxed">
                {idea.detailedDescription || idea.shortDescription}
              </p>
            </div>

            {/* Target Help & Skills */}
            <div className="pt-4 border-t border-[#F0EFEA] dark:border-[#22221F] space-y-3">
              <h3 className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0] uppercase tracking-wider">
                Required Technical & Creative Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {idea.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] text-[#171717] dark:text-[#F5F5F0]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* AI RAG Similarity Metadata Card */}
          <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
                    AI Similarity Analysis (RAG Engine)
                  </h3>
                  <p className="text-[11px] text-[#71717A] dark:text-[#A8A8A2]">
                    Cosine vector score across pgvector embeddings
                  </p>
                </div>
              </div>

              <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-1 rounded-full">
                {idea.aiSimilarityChecked ? 'Indexed & Analyzed' : 'Pending Vector Index'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#71717A]">Top Semantic Overlap</span>
                <strong className="text-[#171717] dark:text-[#F5F5F0] font-mono">{idea.topSimilarityMatch}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71717A]">Embedding Distance</span>
                <span className="font-mono text-emerald-600 font-bold">0.84 Cosine Similarity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Creator Profile & Engagement Stats */}
        <div className="space-y-6">
          {/* Creator Profile Card */}
          <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
              Idea Creator
            </h3>
            <div className="flex items-center gap-3">
              <img
                src={idea.creator.avatar}
                alt={idea.creator.name}
                className="w-12 h-12 rounded-full object-cover border border-[#E8E7E0] dark:border-[#2B2B27]"
              />
              <div className="min-w-0">
                <Link
                  to={`/admin/users/${idea.creator.id}`}
                  className="font-bold text-sm text-[#171717] dark:text-[#F5F5F0] hover:text-[#FF7043] transition-colors truncate block"
                >
                  {idea.creator.name}
                </Link>
                <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] font-mono truncate">{idea.creator.email}</p>
                <span className="text-[11px] text-stone-400 font-mono">{idea.creator.handle}</span>
              </div>
            </div>

            <div className="pt-2">
              <Link to={`/admin/users/${idea.creator.id}`}>
                <Button variant="secondary" size="xs" className="w-full">
                  Inspect User Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
              Engagement Telemetry
            </h3>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27]">
                <span className="text-[10px] text-[#71717A] font-bold uppercase flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3 text-rose-500" /> Likes
                </span>
                <p className="text-lg font-black text-[#171717] dark:text-[#F5F5F0] font-mono mt-1">{idea.likesCount}</p>
              </div>

              <div className="p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27]">
                <span className="text-[10px] text-[#71717A] font-bold uppercase flex items-center justify-center gap-1">
                  <MessageSquare className="w-3 h-3 text-blue-500" /> Comments
                </span>
                <p className="text-lg font-black text-[#171717] dark:text-[#F5F5F0] font-mono mt-1">{idea.commentsCount}</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to={`/ideas/${idea.id}`}
                target="_blank"
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] text-[#171717] dark:text-[#F5F5F0] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> View on Public Feed
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AdminConfirmModal
        isOpen={!!modalAction}
        onClose={() => setModalAction(null)}
        onConfirm={handleActionConfirm}
        title={
          modalAction === 'delete'
            ? `Delete Idea "${idea.title}"?`
            : modalAction === 'reject'
            ? `Reject Idea "${idea.title}"?`
            : modalAction === 'archive'
            ? `Archive Idea "${idea.title}"?`
            : `Approve Idea "${idea.title}"?`
        }
        description={
          modalAction === 'delete'
            ? 'This permanently deletes the proposal and all associated collaborations and comments.'
            : modalAction === 'reject'
            ? 'This proposal will be marked as rejected and unlisted from public feeds.'
            : modalAction === 'archive'
            ? 'This idea will be moved to archived records.'
            : 'This idea will be published to the public explore feed.'
        }
        confirmText={
          modalAction === 'delete'
            ? 'Delete Permanently'
            : modalAction === 'reject'
            ? 'Reject Proposal'
            : modalAction === 'archive'
            ? 'Archive Idea'
            : 'Approve & Publish'
        }
        danger={modalAction === 'delete' || modalAction === 'reject'}
        requireTyping={modalAction === 'delete'}
        requiredWord="DELETE"
      />
    </div>
  );
};

export default AdminIdeaDetailPage;
