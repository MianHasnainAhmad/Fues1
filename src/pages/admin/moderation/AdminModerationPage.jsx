import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Ban,
  Trash2,
  FileText,
  User,
  MessageSquare,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  Eye,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminDataTable } from '../../../components/admin/common/AdminDataTable';
import { AdminStatusBadge } from '../../../components/admin/common/AdminStatusBadge';
import { AdminConfirmModal } from '../../../components/admin/common/AdminConfirmModal';
import { Button } from '../../../components/common/Button';
import { adminModerationService } from '../../../services/adminModerationService';
import { adminActivityLogService } from '../../../services/adminActivityLogService';
import toast from 'react-hot-toast';

export const AdminModerationPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending'); // 'pending' | 'resolved' | 'dismissed' | 'all'
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [contentTypeFilter, setContentTypeFilter] = useState('all');

  // Detail Modal State
  const [activeReport, setActiveReport] = useState(null);
  const [moderatorNotes, setModeratorNotes] = useState('');
  const [warningText, setWarningText] = useState('Please review the Fuse Community Guidelines regarding spam and self-promotion.');

  // Confirmation Modal State
  const [modalAction, setModalAction] = useState(null); // 'dismiss' | 'resolve' | 'warning' | 'remove' | 'suspend'

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await adminModerationService.getReports({
        status: statusFilter,
        priority: priorityFilter,
        contentType: contentTypeFilter,
      });
      setReports(res.results);
    } catch {
      toast.error('Failed to load moderation queue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [statusFilter, priorityFilter, contentTypeFilter]);

  const handleOpenDetail = (report) => {
    setActiveReport(report);
    setModeratorNotes(report.moderatorNotes || '');
  };

  const handleActionConfirm = async () => {
    if (!activeReport || !modalAction) return;
    try {
      if (modalAction === 'dismiss') {
        await adminModerationService.dismissReport(activeReport.id, moderatorNotes);
        await adminActivityLogService.logAction(
          'REPORT_DISMISSED',
          `Report #${activeReport.id}`,
          `Dismissed report: ${moderatorNotes || 'No violation found.'}`,
          'info'
        );
        toast.success(`Report #${activeReport.id} dismissed`);
      } else if (modalAction === 'resolve') {
        await adminModerationService.resolveReport(activeReport.id, moderatorNotes, 'Manually resolved');
        await adminActivityLogService.logAction(
          'REPORT_RESOLVED',
          `Report #${activeReport.id}`,
          `Resolved report with note: ${moderatorNotes}`,
          'success'
        );
        toast.success(`Report #${activeReport.id} marked resolved`);
      } else if (modalAction === 'warning') {
        await adminModerationService.issueWarning(activeReport.id, warningText);
        await adminActivityLogService.logAction(
          'USER_WARNING_ISSUED',
          `User: ${activeReport.reportedUser.name}`,
          `Warning issued: "${warningText}"`,
          'warning'
        );
        toast.success(`Warning issued to ${activeReport.reportedUser.name}`);
      } else if (modalAction === 'remove') {
        await adminModerationService.removeContent(activeReport.id);
        await adminActivityLogService.logAction(
          'CONTENT_REMOVED',
          `${activeReport.contentType}: ${activeReport.contentTitle}`,
          'Removed reported content permanently.',
          'danger'
        );
        toast.success('Reported content removed');
      } else if (modalAction === 'suspend') {
        await adminModerationService.resolveReport(activeReport.id, 'Account suspended due to policy violation', 'User suspended');
        await adminActivityLogService.logAction(
          'USER_SUSPENDED',
          `User: ${activeReport.reportedUser.name} (${activeReport.reportedUser.email})`,
          `Suspended user via Moderation Center (Report #${activeReport.id})`,
          'danger'
        );
        toast.success(`User ${activeReport.reportedUser.name} suspended`);
      }
      setModalAction(null);
      setActiveReport(null);
      fetchReports();
    } catch {
      toast.error('Moderation action failed');
    }
  };

  const columns = [
    {
      header: 'Report ID',
      key: 'id',
      render: (r) => (
        <span className="font-mono text-xs font-bold text-[#FF7043]">
          #{r.id}
        </span>
      ),
    },
    {
      header: 'Type & Reason',
      key: 'reason',
      sortable: true,
      render: (r) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.2 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
              {r.contentType}
            </span>
            <span className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0]">
              {r.reason}
            </span>
          </div>
          <p className="text-[11px] text-[#71717A] dark:text-[#A8A8A2] line-clamp-1 max-w-xs">
            {r.contentTitle}
          </p>
        </div>
      ),
    },
    {
      header: 'Reported Subject',
      key: 'reportedUser',
      render: (r) => (
        <div className="flex items-center gap-2">
          <img src={r.reportedUser.avatar} alt={r.reportedUser.name} className="w-6 h-6 rounded-full object-cover shrink-0" />
          <span className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] truncate max-w-[120px]">
            {r.reportedUser.name}
          </span>
        </div>
      ),
    },
    {
      header: 'Reporter',
      key: 'reporter',
      render: (r) => (
        <span className="text-xs text-[#71717A] dark:text-[#A8A8A2] truncate max-w-[110px] block">
          {r.reporter.name}
        </span>
      ),
    },
    {
      header: 'Priority',
      key: 'priority',
      sortable: true,
      render: (r) => <AdminStatusBadge status={r.priority} size="xs" />,
    },
    {
      header: 'Submitted',
      key: 'submittedDate',
      sortable: true,
      render: (r) => (
        <span className="text-xs font-mono text-[#71717A] dark:text-[#A8A8A2]">
          {r.submittedDate.slice(5)}
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (r) => <AdminStatusBadge status={r.status} size="xs" />,
    },
    {
      header: 'Action',
      key: 'action',
      className: 'text-right',
      cellClassName: 'text-right',
      render: (r) => (
        <Button
          variant="secondary"
          size="xs"
          icon={Eye}
          onClick={() => handleOpenDetail(r)}
        >
          Review
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <AdminPageHeader
        title="Content Moderation Center"
        description="Inspect community incident reports, evaluate flagged ideas or abusive comments, issue warnings, or revoke access."
        breadcrumbs={[{ label: 'Moderation' }]}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] text-[#171717] dark:text-[#F5F5F0]">
              Pending Queue: {reports.filter((r) => r.status === 'pending').length}
            </span>
          </div>
        }
      />

      {/* Main Table */}
      <AdminDataTable
        columns={columns}
        data={reports}
        searchPlaceholder="Search by reason, reporter, or reported user..."
        exportFilename="fuse-moderation-queue"
        loading={loading}
        filterComponent={
          <div className="flex items-center gap-2 flex-wrap">
            {/* Status Queue Tabs */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
            >
              <option value="pending">Pending Review Only</option>
              <option value="resolved">Resolved Reports</option>
              <option value="dismissed">Dismissed Reports</option>
              <option value="all">All Statuses</option>
            </select>

            {/* Priority Filter */}
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>

            {/* Content Type Filter */}
            <select
              value={contentTypeFilter}
              onChange={(e) => setContentTypeFilter(e.target.value)}
              className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
            >
              <option value="all">All Content Types</option>
              <option value="Idea">Idea</option>
              <option value="Comment">Comment</option>
              <option value="User Profile">User Profile</option>
              <option value="Message">Message</option>
            </select>
          </div>
        }
      />

      {/* Report Review & Adjudication Detail Modal */}
      {activeReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#F0EFEA] dark:border-[#22221F]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#FF7043]">
                    Report #{activeReport.id}
                  </span>
                  <AdminStatusBadge status={activeReport.priority} size="xs" />
                  <AdminStatusBadge status={activeReport.status} size="xs" />
                </div>
                <h3 className="text-lg font-bold text-[#171717] dark:text-[#F5F5F0]">
                  {activeReport.reason}
                </h3>
                <span className="text-xs text-[#71717A] dark:text-[#A8A8A2]">
                  Submitted {activeReport.submittedDate}
                </span>
              </div>

              <button
                onClick={() => setActiveReport(null)}
                className="p-1 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Reporter vs Reported User */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] space-y-1">
                <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider block">
                  Reporting User
                </span>
                <p className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0] truncate">
                  {activeReport.reporter.name}
                </p>
                <Link
                  to={`/admin/users/${activeReport.reporter.id}`}
                  className="text-[11px] text-[#FF7043] font-semibold hover:underline block"
                >
                  Inspect Reporter Profile
                </Link>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] space-y-1">
                <span className="text-[10px] font-bold text-[#71717A] uppercase tracking-wider block">
                  Reported Account
                </span>
                <p className="text-xs font-bold text-rose-600 dark:text-rose-400 truncate">
                  {activeReport.reportedUser.name}
                </p>
                <Link
                  to={`/admin/users/${activeReport.reportedUser.id}`}
                  className="text-[11px] text-[#FF7043] font-semibold hover:underline block"
                >
                  Inspect Reported User
                </Link>
              </div>
            </div>

            {/* Evidence & Content Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0]">
                Flagged Content Evidence ({activeReport.contentType}):
              </span>
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#141413] border border-dashed border-stone-300 dark:border-stone-700 space-y-2 text-xs">
                <h4 className="font-bold text-[#171717] dark:text-[#F5F5F0]">
                  {activeReport.contentTitle}
                </h4>
                <p className="text-[#71717A] dark:text-[#A8A8A2] italic font-mono bg-white dark:bg-[#1E1E1C] p-2.5 rounded-xl border border-stone-200 dark:border-stone-800">
                  "{activeReport.contentSnippet}"
                </p>
              </div>
            </div>

            {/* Reporter Explanation */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0]">
                Reporter Description:
              </span>
              <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] leading-relaxed p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27]">
                {activeReport.description}
              </p>
            </div>

            {/* Moderator Notes */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0]">
                Moderator Investigation Notes (Audit Trail):
              </label>
              <textarea
                rows={2}
                value={moderatorNotes}
                onChange={(e) => setModeratorNotes(e.target.value)}
                placeholder="Record administrative notes, context, or action reasoning..."
                className="w-full p-3 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-xs text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717] dark:focus:border-stone-500"
              />
            </div>

            {/* Action Buttons Toolbar */}
            <div className="pt-4 border-t border-[#F0EFEA] dark:border-[#22221F] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setModalAction('dismiss')}
                >
                  Dismiss Report
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setModalAction('resolve')}
                >
                  Mark Resolved
                </Button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  variant="secondary"
                  size="sm"
                  className="!text-amber-600 hover:!bg-amber-50"
                  onClick={() => setModalAction('warning')}
                >
                  Issue Warning
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="!text-rose-600 hover:!bg-rose-50"
                  onClick={() => setModalAction('remove')}
                >
                  Remove Content
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="!bg-rose-600 hover:!bg-rose-700 text-white"
                  onClick={() => setModalAction('suspend')}
                >
                  Suspend Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <AdminConfirmModal
        isOpen={!!modalAction}
        onClose={() => setModalAction(null)}
        onConfirm={handleActionConfirm}
        title={
          modalAction === 'suspend'
            ? `Suspend Account (${activeReport?.reportedUser.name})?`
            : modalAction === 'remove'
            ? `Remove Flagged ${activeReport?.contentType}?`
            : modalAction === 'warning'
            ? `Issue Formal Warning to ${activeReport?.reportedUser.name}?`
            : modalAction === 'dismiss'
            ? 'Dismiss Moderation Report?'
            : 'Resolve Moderation Report?'
        }
        description={
          modalAction === 'suspend'
            ? 'The user will be immediately locked out of the platform for violating community terms.'
            : modalAction === 'remove'
            ? 'The reported content snippet will be permanently deleted from public listings.'
            : modalAction === 'warning'
            ? 'A formal compliance warning will be added to the user record.'
            : 'The report will be archived as resolved without punitive measures.'
        }
        confirmText={
          modalAction === 'suspend'
            ? 'Suspend User Account'
            : modalAction === 'remove'
            ? 'Remove Content'
            : modalAction === 'warning'
            ? 'Dispatch Warning'
            : modalAction === 'dismiss'
            ? 'Dismiss Report'
            : 'Resolve Report'
        }
        danger={modalAction === 'suspend' || modalAction === 'remove'}
      />
    </div>
  );
};

export default AdminModerationPage;
