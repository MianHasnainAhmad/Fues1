import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Users2,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Archive,
  Ban,
  ExternalLink,
  Target,
  Sparkles,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminDataTable } from '../../../components/admin/common/AdminDataTable';
import { AdminStatusBadge } from '../../../components/admin/common/AdminStatusBadge';
import { AdminConfirmModal } from '../../../components/admin/common/AdminConfirmModal';
import { Dropdown, DropdownItem } from '../../../components/common/Dropdown';
import { adminTeamService } from '../../../services/adminTeamService';
import { adminActivityLogService } from '../../../services/adminActivityLogService';
import toast from 'react-hot-toast';

export const AdminTeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const navigate = useNavigate();

  // Modals
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [modalAction, setModalAction] = useState(null); // 'archive' | 'restrict'

  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await adminTeamService.getTeams({
        status: statusFilter,
        stage: stageFilter,
      });
      setTeams(res.results);
    } catch {
      toast.error('Failed to load teams');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [statusFilter, stageFilter]);

  const handleActionConfirm = async () => {
    if (!selectedTeam || !modalAction) return;
    try {
      if (modalAction === 'archive') {
        await adminTeamService.archiveTeam(selectedTeam.id);
        await adminActivityLogService.logAction(
          'TEAM_ARCHIVED',
          `Team: ${selectedTeam.name}`,
          'Archived team workspace.',
          'warning'
        );
        toast.success(`Team "${selectedTeam.name}" archived`);
      } else if (modalAction === 'restrict') {
        await adminTeamService.restrictTeam(selectedTeam.id);
        await adminActivityLogService.logAction(
          'TEAM_RESTRICTED',
          `Team: ${selectedTeam.name}`,
          'Restricted team workspace.',
          'danger'
        );
        toast.success(`Team "${selectedTeam.name}" restricted`);
      }
      setSelectedTeam(null);
      setModalAction(null);
      fetchTeams();
    } catch {
      toast.error('Operation failed');
    }
  };

  const columns = [
    {
      header: 'Team Workspace',
      key: 'name',
      sortable: true,
      render: (t) => (
        <div className="space-y-0.5 max-w-sm">
          <Link
            to={`/admin/teams/${t.id}`}
            className="text-xs sm:text-sm font-bold text-[#171717] dark:text-[#F5F5F0] hover:text-[#FF7043] transition-colors truncate block"
          >
            {t.name}
          </Link>
          <p className="text-[11px] text-[#71717A] dark:text-[#A8A8A2] line-clamp-1">
            {t.tagline}
          </p>
        </div>
      ),
    },
    {
      header: 'Founder / Lead',
      key: 'owner',
      render: (t) => (
        <div className="flex items-center gap-2">
          <img
            src={t.owner.avatar}
            alt={t.owner.name}
            className="w-6 h-6 rounded-full object-cover shrink-0"
          />
          <span className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] truncate max-w-[120px]">
            {t.owner.name}
          </span>
        </div>
      ),
    },
    {
      header: 'Members',
      key: 'membersCount',
      sortable: true,
      render: (t) => (
        <span className="text-xs font-mono font-semibold text-[#171717] dark:text-[#F5F5F0]">
          {t.membersCount} contributors
        </span>
      ),
    },
    {
      header: 'Current Stage',
      key: 'currentStage',
      sortable: true,
      render: (t) => (
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold text-[#FF7043]">
            {t.currentStage}
          </span>
          <div className="w-24 h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: `${t.progressPercentage}%` }}
            />
          </div>
        </div>
      ),
    },
    {
      header: 'Tasks',
      key: 'taskStats',
      render: (t) => (
        <span className="text-xs font-mono text-[#71717A] dark:text-[#A8A8A2]">
          {t.taskStats.completed}/{t.taskStats.total} done
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (t) => <AdminStatusBadge status={t.status} size="xs" />,
    },
    {
      header: 'Actions',
      key: 'actions',
      className: 'text-right',
      cellClassName: 'text-right',
      render: (t) => (
        <Dropdown
          trigger={
            <button className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 hover:text-stone-900 dark:hover:text-white transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          }
          align="right"
        >
          <div className="w-44 p-1.5">
            <DropdownItem
              icon={Eye}
              label="View Workspace"
              onClick={() => navigate(`/admin/teams/${t.id}`)}
            />
            <DropdownItem
              icon={Archive}
              label="Archive Team"
              onClick={() => {
                setSelectedTeam(t);
                setModalAction('archive');
              }}
            />
            <DropdownItem
              icon={Ban}
              label="Restrict Team"
              danger
              onClick={() => {
                setSelectedTeam(t);
                setModalAction('restrict');
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
        title="Team Workspace Management"
        description="Monitor active project teams, track sprint progression from Idea to Launched, inspect member role distribution, and maintain workspace compliance."
        breadcrumbs={[{ label: 'Teams' }]}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] text-[#171717] dark:text-[#F5F5F0]">
              Total Teams: {teams.length}
            </span>
          </div>
        }
      />

      {/* Main Table */}
      <AdminDataTable
        columns={columns}
        data={teams}
        searchPlaceholder="Search teams by name, lead, or category..."
        exportFilename="fuse-active-teams"
        loading={loading}
        filterComponent={
          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="archived">Archived Only</option>
              <option value="restricted">Restricted Only</option>
            </select>

            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
            >
              <option value="all">All Stages</option>
              <option value="Idea">Idea</option>
              <option value="Team Formed">Team Formed</option>
              <option value="MVP Planning">MVP Planning</option>
              <option value="In Development">In Development</option>
              <option value="Launched">Launched</option>
            </select>
          </div>
        }
      />

      {/* Confirm Modal */}
      <AdminConfirmModal
        isOpen={!!modalAction}
        onClose={() => setModalAction(null)}
        onConfirm={handleActionConfirm}
        title={
          modalAction === 'archive'
            ? `Archive Team "${selectedTeam?.name}"?`
            : `Restrict Team "${selectedTeam?.name}"?`
        }
        description={
          modalAction === 'archive'
            ? 'The team workspace will be locked to read-only mode and moved to archive listings.'
            : 'Workspace collaboration privileges will be suspended pending investigation.'
        }
        confirmText={modalAction === 'archive' ? 'Archive Team' : 'Restrict Team'}
        danger={modalAction === 'restrict'}
      />
    </div>
  );
};

export default AdminTeamsPage;
