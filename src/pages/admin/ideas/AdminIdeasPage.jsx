import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lightbulb,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Star,
  CheckCircle,
  XCircle,
  Archive,
  Trash2,
  ExternalLink,
  Cpu,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminDataTable } from '../../../components/admin/common/AdminDataTable';
import { AdminStatusBadge } from '../../../components/admin/common/AdminStatusBadge';
import { AdminConfirmModal } from '../../../components/admin/common/AdminConfirmModal';
import { Dropdown, DropdownItem } from '../../../components/common/Dropdown';
import { adminIdeaService } from '../../../services/adminIdeaService';
import { adminActivityLogService } from '../../../services/adminActivityLogService';
import { mockAdminCategories } from '../../../data/mockAdminData';
import toast from 'react-hot-toast';

export const AdminIdeasPage = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  // Modal State
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [modalAction, setModalAction] = useState(null); // 'approve' | 'reject' | 'archive' | 'delete'

  const fetchIdeas = async () => {
    setLoading(true);
    try {
      const res = await adminIdeaService.getIdeas({
        category: categoryFilter,
        stage: stageFilter,
        status: statusFilter,
      });
      setIdeas(res.results);
    } catch {
      toast.error('Failed to load ideas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [categoryFilter, stageFilter, statusFilter]);

  const handleToggleFeature = async (idea) => {
    try {
      const res = await adminIdeaService.toggleFeature(idea.id);
      await adminActivityLogService.logAction(
        res.isFeatured ? 'IDEA_FEATURED' : 'IDEA_UNFEATURED',
        `Idea: ${idea.title}`,
        res.isFeatured ? 'Promoted idea to featured showcase.' : 'Removed from featured showcase.',
        'primary'
      );
      toast.success(res.isFeatured ? 'Idea promoted to Featured' : 'Idea removed from Featured');
      fetchIdeas();
    } catch {
      toast.error('Failed to toggle featured status');
    }
  };

  const handleActionConfirm = async () => {
    if (!selectedIdea || !modalAction) return;
    try {
      if (modalAction === 'approve') {
        await adminIdeaService.approveIdea(selectedIdea.id);
        await adminActivityLogService.logAction(
          'IDEA_APPROVED',
          `Idea: ${selectedIdea.title}`,
          'Approved idea for platform publication.',
          'success'
        );
        toast.success('Idea approved & published');
      } else if (modalAction === 'reject') {
        await adminIdeaService.rejectIdea(selectedIdea.id);
        await adminActivityLogService.logAction(
          'IDEA_REJECTED',
          `Idea: ${selectedIdea.title}`,
          'Rejected idea due to policy check.',
          'danger'
        );
        toast.success('Idea rejected');
      } else if (modalAction === 'archive') {
        await adminIdeaService.archiveIdea(selectedIdea.id);
        await adminActivityLogService.logAction(
          'IDEA_ARCHIVED',
          `Idea: ${selectedIdea.title}`,
          'Archived idea record.',
          'warning'
        );
        toast.success('Idea moved to archives');
      } else if (modalAction === 'delete') {
        await adminIdeaService.deleteIdea(selectedIdea.id);
        await adminActivityLogService.logAction(
          'IDEA_DELETED',
          `Idea: ${selectedIdea.title}`,
          'Permanently deleted idea from database.',
          'danger'
        );
        toast.success('Idea permanently removed');
      }
      setSelectedIdea(null);
      setModalAction(null);
      fetchIdeas();
    } catch {
      toast.error('Action failed');
    }
  };

  const columns = [
    {
      header: 'Idea Title',
      key: 'title',
      sortable: true,
      render: (i) => (
        <div className="space-y-1 max-w-sm">
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/ideas/${i.id}`}
              className="font-bold text-xs sm:text-sm text-[#171717] dark:text-[#F5F5F0] hover:text-[#FF7043] transition-colors truncate block"
            >
              {i.title}
            </Link>
            {i.isFeatured && (
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 shrink-0">
                Featured
              </span>
            )}
          </div>
          <p className="text-[11px] text-[#71717A] dark:text-[#A8A8A2] line-clamp-1">
            {i.shortDescription}
          </p>
        </div>
      ),
    },
    {
      header: 'Creator',
      key: 'creator',
      render: (i) => (
        <div className="flex items-center gap-2">
          <img
            src={i.creator.avatar}
            alt={i.creator.name}
            className="w-6 h-6 rounded-full object-cover shrink-0"
          />
          <Link
            to={`/admin/users/${i.creator.id}`}
            className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] hover:underline truncate"
          >
            {i.creator.name}
          </Link>
        </div>
      ),
    },
    {
      header: 'Category',
      key: 'category',
      sortable: true,
      render: (i) => (
        <span className="text-xs font-medium text-[#71717A] dark:text-[#A8A8A2] truncate block">
          {i.category}
        </span>
      ),
    },
    {
      header: 'Stage',
      key: 'stage',
      sortable: true,
      render: (i) => (
        <span className="text-xs font-mono font-medium text-[#171717] dark:text-[#F5F5F0]">
          {i.stage}
        </span>
      ),
    },
    {
      header: 'Connection',
      key: 'connectionType',
      render: (i) => (
        <span className="text-xs font-mono text-[#FF7043] font-semibold">
          {i.connectionType}
        </span>
      ),
    },
    {
      header: 'Engagement',
      key: 'likesCount',
      sortable: true,
      render: (i) => (
        <span className="text-xs font-mono text-[#71717A] dark:text-[#A8A8A2]">
          {i.likesCount} likes • {i.commentsCount} comments
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (i) => <AdminStatusBadge status={i.status} size="xs" />,
    },
    {
      header: 'Actions',
      key: 'actions',
      className: 'text-right',
      cellClassName: 'text-right',
      render: (i) => (
        <Dropdown
          trigger={
            <button className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          }
          align="right"
        >
          <div className="w-48 p-1.5">
            <DropdownItem
              icon={Eye}
              label="View Idea Details"
              onClick={() => navigate(`/admin/ideas/${i.id}`)}
            />
            <DropdownItem
              icon={Star}
              label={i.isFeatured ? 'Unfeature Idea' : 'Feature on Feed'}
              onClick={() => handleToggleFeature(i)}
            />
            {i.status !== 'published' && (
              <DropdownItem
                icon={CheckCircle}
                label="Approve & Publish"
                onClick={() => {
                  setSelectedIdea(i);
                  setModalAction('approve');
                }}
              />
            )}
            {i.status !== 'rejected' && (
              <DropdownItem
                icon={XCircle}
                label="Reject Idea"
                onClick={() => {
                  setSelectedIdea(i);
                  setModalAction('reject');
                }}
              />
            )}
            <DropdownItem
              icon={Archive}
              label="Archive Idea"
              onClick={() => {
                setSelectedIdea(i);
                setModalAction('archive');
              }}
            />
            <div className="my-1 border-t border-[#F0EFEA] dark:border-[#22221F]" />
            <DropdownItem
              icon={Trash2}
              label="Delete Idea"
              danger
              onClick={() => {
                setSelectedIdea(i);
                setModalAction('delete');
              }}
            />
          </div>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <AdminPageHeader
        title="Idea Management"
        description="Inspect all platform proposals, review AI similarity checks, curate featured feed items, and resolve flagged concepts."
        breadcrumbs={[{ label: 'Ideas' }]}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] text-[#171717] dark:text-[#F5F5F0]">
              Total Proposals: {ideas.length}
            </span>
          </div>
        }
      />

      {/* Main Table */}
      <AdminDataTable
        columns={columns}
        data={ideas}
        searchPlaceholder="Search ideas by title or creator..."
        exportFilename="fuse-platform-ideas"
        loading={loading}
        filterComponent={
          <div className="flex items-center gap-2 flex-wrap">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
            >
              <option value="all">All Categories</option>
              {mockAdminCategories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Stage Filter */}
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
            >
              <option value="all">All Stages</option>
              <option value="Just an idea">Just an idea</option>
              <option value="Researching">Researching</option>
              <option value="Planning">Planning</option>
              <option value="Prototype">Prototype</option>
              <option value="Already building">Already building</option>
            </select>
          </div>
        }
      />

      {/* Action Confirmation Modal */}
      <AdminConfirmModal
        isOpen={!!modalAction}
        onClose={() => {
          setSelectedIdea(null);
          setModalAction(null);
        }}
        onConfirm={handleActionConfirm}
        title={
          modalAction === 'delete'
            ? `Delete Idea "${selectedIdea?.title}"?`
            : modalAction === 'reject'
            ? `Reject Idea "${selectedIdea?.title}"?`
            : modalAction === 'archive'
            ? `Archive Idea "${selectedIdea?.title}"?`
            : `Approve Idea "${selectedIdea?.title}"?`
        }
        description={
          modalAction === 'delete'
            ? 'This permanently deletes the idea record, comments, vector index entries, and notifications.'
            : modalAction === 'reject'
            ? 'The idea will be marked rejected and hidden from public feeds.'
            : modalAction === 'archive'
            ? 'The idea will be removed from active feeds and moved to creator archives.'
            : 'The idea will be published to the public explore feed.'
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

export default AdminIdeasPage;
