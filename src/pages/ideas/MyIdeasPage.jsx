import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Lightbulb,
  Plus,
  Eye,
  Trash2,
  Edit,
  TrendingUp,
  MessageSquare,
  Heart,
  Archive,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { Modal } from '../../components/common/Modal';
import { ideaService } from '../../services/ideaService';
import toast from 'react-hot-toast';

export const MyIdeasPage = () => {
  const [activeTab, setActiveTab] = useState('published'); // 'published' | 'draft' | 'archived'
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    loadMyIdeas();
  }, []);

  const loadMyIdeas = async () => {
    try {
      setLoading(true);
      const res = await ideaService.getMyIdeas();
      setIdeas(res);
    } catch {
      toast.error('Failed to load your ideas');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await ideaService.deleteIdea(deleteTarget.id);
      setIdeas((prev) => prev.filter((i) => i.id !== deleteTarget.id));
      toast.success('Idea deleted');
      setDeleteTarget(null);
    } catch {
      toast.error('Failed to delete idea');
    }
  };

  const handleArchive = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'archived' ? 'published' : 'archived';
    try {
      await ideaService.updateIdeaStatus(id, nextStatus);
      setIdeas((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: nextStatus } : i))
      );
      toast.success(nextStatus === 'archived' ? 'Idea moved to archive' : 'Idea restored to published');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const filteredIdeas = ideas.filter((i) => i.status === activeTab);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E8E7E0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171717] tracking-tight">
            My Incomplete Ideas
          </h1>
          <p className="text-sm text-[#737373] mt-1">
            Manage your published concepts, ongoing drafts, and archived explorations.
          </p>
        </div>

        <Link to="/ideas/create">
          <Button variant="primary" size="md" icon={Plus}>
            New Concept
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E8E7E0] pb-2 overflow-x-auto scrollbar-none whitespace-nowrap">
        {[
          { id: 'published', label: 'Published Concepts' },
          { id: 'draft', label: 'Unpublished Drafts' },
          { id: 'archived', label: 'Archived Explorations' },
        ].map((tab) => {
          const count = ideas.filter((i) => i.status === tab.id).length;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#171717] text-white shadow-xs dark:bg-white dark:text-[#171717]'
                  : 'text-[#737373] hover:text-[#171717] hover:bg-white dark:hover:text-white dark:hover:bg-[#262624]'
              }`}
            >
              {tab.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Ideas Listing */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="w-8 h-8 border-3 border-[#FF7043] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredIdeas.length === 0 ? (
        <EmptyState
          icon={Lightbulb}
          title={`No ${activeTab} ideas`}
          description={
            activeTab === 'published'
              ? 'You have not published any ideas yet. Start by sharing a quick unfinished sketch!'
              : 'Drafts and archived concepts will appear here.'
          }
          actionLabel="Share an Idea"
          onAction={() => window.location.assign('/ideas/create')}
        />
      ) : (
        <div className="space-y-4">
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id}
              className="bg-white rounded-2xl border border-[#E8E7E0] p-5 sm:p-6 shadow-sm hover-lift flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="default" size="sm">{idea.category}</Badge>
                  <Badge variant="primary" size="sm">{idea.stage}</Badge>
                  <Badge variant="lavender" size="sm">{idea.connectionType}</Badge>
                </div>

                <Link to={`/ideas/${idea.id}`} className="block group">
                  <h3 className="text-base sm:text-lg font-bold text-[#171717] group-hover:text-[#FF7043] transition-colors">
                    {idea.title}
                  </h3>
                </Link>

                <p className="text-xs sm:text-sm text-[#525252] line-clamp-2 max-w-2xl">
                  {idea.shortDescription}
                </p>

                {/* Metrics */}
                <div className="flex items-center gap-4 pt-2 text-xs text-[#737373]">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-[#FF7043]" /> {idea.likesCount} upvotes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-blue-500" /> {idea.commentsCount || 0} comments
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-400" /> {idea.viewsCount || 100} views
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-center">
                <Link to={`/ideas/${idea.id}`}>
                  <Button variant="outline" size="sm" icon={Eye}>
                    View
                  </Button>
                </Link>

                <button
                  onClick={() => handleArchive(idea.id, idea.status)}
                  className="p-2 rounded-xl border border-[#E8E7E0] text-[#737373] hover:text-[#171717] hover:bg-[#F8F8F5] dark:hover:text-white dark:hover:bg-[#262624] transition-colors cursor-pointer"
                  title={idea.status === 'archived' ? 'Unarchive' : 'Archive'}
                >
                  <Archive className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setDeleteTarget(idea)}
                  className="p-2 rounded-xl border border-red-200 dark:border-red-900/40 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <Modal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          title="Delete Idea"
          description={`Are you sure you want to permanently delete "${deleteTarget.title}"?`}
        >
          <p className="text-xs text-[#737373] mb-4">
            This action cannot be undone. Any open collaboration requests for this concept will also be withdrawn.
          </p>
          <div className="flex justify-end gap-2.5">
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Confirm Delete
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
