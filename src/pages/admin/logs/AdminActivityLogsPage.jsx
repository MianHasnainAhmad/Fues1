import React, { useState, useEffect } from 'react';
import {
  ScrollText,
  Search,
  Filter,
  Shield,
  Download,
  Clock,
  User,
  ShieldAlert,
  CheckCircle,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminDataTable } from '../../../components/admin/common/AdminDataTable';
import { AdminStatusBadge } from '../../../components/admin/common/AdminStatusBadge';
import { Button } from '../../../components/common/Button';
import { adminActivityLogService } from '../../../services/adminActivityLogService';
import toast from 'react-hot-toast';

export const AdminActivityLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionTypeFilter, setActionTypeFilter] = useState('all');

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await adminActivityLogService.getLogs({ actionType: actionTypeFilter });
      setLogs(res.results);
    } catch {
      toast.error('Failed to load activity logs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionTypeFilter]);

  const columns = [
    {
      header: 'Admin',
      key: 'adminName',
      sortable: true,
      render: (l) => (
        <div className="flex items-center gap-2.5">
          <img
            src={l.adminAvatar}
            alt={l.adminName}
            className="w-7 h-7 rounded-full object-cover shrink-0 border border-[#E8E7E0] dark:border-[#2B2B27]"
          />
          <span className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0] truncate">
            {l.adminName}
          </span>
        </div>
      ),
    },
    {
      header: 'Action',
      key: 'action',
      sortable: true,
      render: (l) => (
        <span className="text-xs font-mono font-bold text-[#171717] dark:text-[#F5F5F0]">
          {l.action}
        </span>
      ),
    },
    {
      header: 'Target Entity',
      key: 'target',
      render: (l) => (
        <span className="text-xs text-[#71717A] dark:text-[#A8A8A2] font-medium truncate block max-w-xs">
          {l.target}
        </span>
      ),
    },
    {
      header: 'Timestamp',
      key: 'timestamp',
      sortable: true,
      render: (l) => (
        <span className="text-xs font-mono text-[#71717A] dark:text-[#A8A8A2]">
          {l.timestamp}
        </span>
      ),
    },
    {
      header: 'IP Address',
      key: 'ipAddress',
      render: (l) => (
        <span className="text-[11px] font-mono text-stone-400">
          {l.ipAddress}
        </span>
      ),
    },
    {
      header: 'Description',
      key: 'description',
      render: (l) => (
        <span className="text-xs text-[#71717A] dark:text-[#A8A8A2] line-clamp-1 max-w-sm">
          {l.description}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <AdminPageHeader
        title="Admin Activity & Audit Logs"
        description="Immutable administrative activity records: every account suspension, content removal, role change, and broadcast is permanently audited."
        breadcrumbs={[{ label: 'Activity Logs' }]}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] text-[#171717] dark:text-[#F5F5F0] flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-600" /> Tamper-Proof Audit
            </span>
          </div>
        }
      />

      {/* Main Table */}
      <AdminDataTable
        columns={columns}
        data={logs}
        searchPlaceholder="Search audit trail by admin, action, target..."
        exportFilename="fuse-admin-audit-logs"
        loading={loading}
        filterComponent={
          <select
            value={actionTypeFilter}
            onChange={(e) => setActionTypeFilter(e.target.value)}
            className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
          >
            <option value="all">All Action Severity</option>
            <option value="danger">Critical (Bans/Deletes)</option>
            <option value="warning">Warning / Restriction</option>
            <option value="success">Approvals / Resolutions</option>
            <option value="info">Informational / Edits</option>
          </select>
        }
      />
    </div>
  );
};

export default AdminActivityLogsPage;
