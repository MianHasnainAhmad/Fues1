import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Handshake,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  User,
  Lightbulb,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminDataTable } from '../../../components/admin/common/AdminDataTable';
import { AdminStatusBadge } from '../../../components/admin/common/AdminStatusBadge';
import { Button } from '../../../components/common/Button';
import { adminCollaborationService } from '../../../services/adminCollaborationService';
import toast from 'react-hot-toast';

export const AdminCollaborationsPage = () => {
  const [collaborations, setCollaborations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [connectionFilter, setConnectionFilter] = useState('all');
  const [inspectedCollab, setInspectedCollab] = useState(null);

  const fetchCollaborations = async () => {
    setLoading(true);
    try {
      const res = await adminCollaborationService.getCollaborations({
        status: statusFilter,
        connectionType: connectionFilter,
      });
      setCollaborations(res.results);
    } catch {
      toast.error('Failed to load collaborations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollaborations();
  }, [statusFilter, connectionFilter]);

  const columns = [
    {
      header: 'Request ID',
      key: 'id',
      render: (c) => (
        <span className="font-mono text-xs font-bold text-[#FF7043]">
          #{c.id}
        </span>
      ),
    },
    {
      header: 'Idea Proposal',
      key: 'ideaTitle',
      sortable: true,
      render: (c) => (
        <div className="space-y-0.5 max-w-sm">
          <Link
            to={`/admin/ideas/${c.ideaId}`}
            className="text-xs sm:text-sm font-bold text-[#171717] dark:text-[#F5F5F0] hover:text-[#FF7043] transition-colors truncate block"
          >
            {c.ideaTitle}
          </Link>
          <span className="text-[11px] text-[#71717A] dark:text-[#A8A8A2]">
            Owned by {c.owner.name}
          </span>
        </div>
      ),
    },
    {
      header: 'Requesting User',
      key: 'requester',
      render: (c) => (
        <div className="flex items-center gap-2">
          <img
            src={c.requester.avatar}
            alt={c.requester.name}
            className="w-6 h-6 rounded-full object-cover shrink-0"
          />
          <div className="min-w-0">
            <span className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] truncate block">
              {c.requester.name}
            </span>
            <span className="text-[10px] text-stone-400 font-mono">
              {c.requester.role}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Connection Type',
      key: 'connectionType',
      sortable: true,
      render: (c) => (
        <span className="text-xs font-mono font-bold text-[#FF7043]">
          {c.connectionType}
        </span>
      ),
    },
    {
      header: 'Date',
      key: 'requestedAt',
      sortable: true,
      render: (c) => (
        <span className="text-xs font-mono text-[#71717A] dark:text-[#A8A8A2]">
          {c.requestedAt}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (c) => <AdminStatusBadge status={c.status} size="xs" />,
    },
    {
      header: 'Action',
      key: 'action',
      className: 'text-right',
      cellClassName: 'text-right',
      render: (c) => (
        <Button
          variant="secondary"
          size="xs"
          icon={Eye}
          onClick={() => setInspectedCollab(c)}
        >
          Inspect
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <AdminPageHeader
        title="Collaboration Management"
        description="Inspect inter-creator connection proposals across all 5 collaboration types, monitor acceptance velocity, and review interaction logs."
        breadcrumbs={[{ label: 'Collaborations' }]}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] text-[#171717] dark:text-[#F5F5F0]">
              Total Proposals: {collaborations.length}
            </span>
          </div>
        }
      />

      {/* Main Table */}
      <AdminDataTable
        columns={columns}
        data={collaborations}
        searchPlaceholder="Search collaborations by idea or participant..."
        exportFilename="fuse-collaboration-proposals"
        loading={loading}
        filterComponent={
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
            </select>

            {/* Connection Type Filter */}
            <select
              value={connectionFilter}
              onChange={(e) => setConnectionFilter(e.target.value)}
              className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
            >
              <option value="all">All Connection Types</option>
              <option value="Co-founder">Co-founder</option>
              <option value="Skill contribution">Skill Contribution</option>
              <option value="Micro-help">Micro-help</option>
              <option value="Accountability partner">Accountability Partner</option>
              <option value="Community">Community</option>
            </select>
          </div>
        }
      />

      {/* Inspection Modal */}
      {inspectedCollab && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#F0EFEA] dark:border-[#22221F]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#FF7043]">
                    Proposal #{inspectedCollab.id}
                  </span>
                  <AdminStatusBadge status={inspectedCollab.status} size="xs" />
                </div>
                <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
                  {inspectedCollab.connectionType} Proposal
                </h3>
              </div>

              <button
                onClick={() => setInspectedCollab(null)}
                className="p-1 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Idea target */}
            <div className="p-3.5 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] space-y-1">
              <span className="text-[10px] text-[#71717A] uppercase font-bold tracking-wider block">Target Idea</span>
              <p className="text-xs sm:text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
                {inspectedCollab.ideaTitle}
              </p>
              <span className="text-[11px] text-[#71717A]">Created by {inspectedCollab.owner.name}</span>
            </div>

            {/* Request Message */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0]">
                Introductory Pitch / Proposal Note:
              </span>
              <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] leading-relaxed p-3.5 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] italic">
                "{inspectedCollab.message}"
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-2 text-xs text-[#71717A] dark:text-[#A8A8A2]">
              <div className="flex justify-between">
                <span>Requested Date</span>
                <strong className="text-[#171717] dark:text-white font-mono">{inspectedCollab.requestedAt}</strong>
              </div>
              <div className="flex justify-between">
                <span>Resolved Date</span>
                <strong className="text-[#171717] dark:text-white font-mono">{inspectedCollab.resolvedAt || 'Pending Review'}</strong>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F0EFEA] dark:border-[#22221F] flex items-center justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setInspectedCollab(null)}
              >
                Close Inspector
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCollaborationsPage;
