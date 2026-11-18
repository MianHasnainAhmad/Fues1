import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Users2,
  ArrowLeft,
  Calendar,
  Archive,
  Ban,
  CheckCircle,
  Clock,
  ExternalLink,
  Target,
  Sparkles,
  User,
  Shield,
  Layers,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminStatusBadge } from '../../../components/admin/common/AdminStatusBadge';
import { AdminConfirmModal } from '../../../components/admin/common/AdminConfirmModal';
import { Button } from '../../../components/common/Button';
import { adminTeamService } from '../../../services/adminTeamService';
import { adminActivityLogService } from '../../../services/adminActivityLogService';
import toast from 'react-hot-toast';

export const AdminTeamDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalAction, setModalAction] = useState(null);

  useEffect(() => {
    const loadTeam = async () => {
      setLoading(true);
      try {
        const t = await adminTeamService.getTeamById(id);
        setTeam(t);
      } catch {
        toast.error('Team not found');
        navigate('/admin/teams');
      } finally {
        setLoading(false);
      }
    };
    loadTeam();
  }, [id, navigate]);

  if (loading || !team) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-3 border-[#FF7043] border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-[#71717A]">Loading team workspace...</p>
      </div>
    );
  }

  const handleActionConfirm = async () => {
    if (!modalAction) return;
    try {
      if (modalAction === 'archive') {
        await adminTeamService.archiveTeam(team.id);
        await adminActivityLogService.logAction('TEAM_ARCHIVED', `Team: ${team.name}`, 'Archived from detail view.', 'warning');
        setTeam({ ...team, status: 'archived' });
        toast.success(`Team "${team.name}" archived`);
      } else if (modalAction === 'restrict') {
        await adminTeamService.restrictTeam(team.id);
        await adminActivityLogService.logAction('TEAM_RESTRICTED', `Team: ${team.name}`, 'Restricted from detail view.', 'danger');
        setTeam({ ...team, status: 'restricted' });
        toast.success(`Team "${team.name}" restricted`);
      }
      setModalAction(null);
    } catch {
      toast.error('Operation failed');
    }
  };

  const stages = ['Idea', 'Team Formed', 'MVP Planning', 'In Development', 'Launched'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <AdminPageHeader
        title={team.name}
        description={`Associated Idea: ${team.category} • Created ${team.createdAt}`}
        breadcrumbs={[
          { label: 'Teams', href: '/admin/teams' },
          { label: team.name },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link to="/admin/teams">
              <Button variant="ghost" size="sm" icon={ArrowLeft}>
                Back to Teams
              </Button>
            </Link>

            <Button
              variant="secondary"
              size="sm"
              icon={Archive}
              onClick={() => setModalAction('archive')}
            >
              Archive
            </Button>

            <Button
              variant="secondary"
              size="sm"
              icon={Ban}
              className="!text-rose-600 hover:!bg-rose-50"
              onClick={() => setModalAction('restrict')}
            >
              Restrict
            </Button>
          </div>
        }
      />

      {/* Main Workspace Card */}
      <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#171717] dark:text-[#F5F5F0]">
                {team.name}
              </h2>
              <AdminStatusBadge status={team.status} />
            </div>
            <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A8A8A2] font-medium">
              {team.tagline}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#71717A] font-bold uppercase block">Progress</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {team.progressPercentage}%
            </span>
          </div>
        </div>

        {/* 5-Stage Stepper Progression */}
        <div className="pt-4 border-t border-[#F0EFEA] dark:border-[#22221F] space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-[#171717] dark:text-[#F5F5F0]">
            <span>Milestone Sprint Progression</span>
            <span className="text-[#FF7043] font-mono">Active Stage: {team.currentStage}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {stages.map((stg, idx) => {
              const isPast = idx < team.stageIndex;
              const isCurrent = idx === team.stageIndex;
              return (
                <div
                  key={stg}
                  className={`p-3 rounded-2xl border text-center space-y-1 transition-all ${
                    isCurrent
                      ? 'border-[#FF7043] bg-[#FFF0EB]/30 dark:bg-[#FF7043]/10 ring-2 ring-[#FF7043]'
                      : isPast
                      ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400'
                      : 'border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-stone-400 opacity-60'
                  }`}
                >
                  <span className="text-[10px] font-mono font-bold block">0{idx + 1}</span>
                  <p className="text-xs font-bold truncate">{stg}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Members Breakdown */}
        <div className="md:col-span-2 bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
              Active Workspace Members ({team.members.length})
            </h3>
            <span className="text-xs font-mono text-[#71717A]">Role-Based Access</span>
          </div>

          <div className="divide-y divide-[#F0EFEA] dark:divide-[#22221F]">
            {team.members.map((member) => (
              <div key={member.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 text-[#171717] dark:text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {member.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <Link
                      to={`/admin/users/${member.id}`}
                      className="text-xs sm:text-sm font-bold text-[#171717] dark:text-[#F5F5F0] hover:text-[#FF7043] transition-colors truncate block"
                    >
                      {member.name}
                    </Link>
                    <span className="text-[11px] text-[#71717A] dark:text-[#A8A8A2]">{member.title}</span>
                  </div>
                </div>

                <span
                  className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    member.role === 'Owner'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                      : 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300'
                  }`}
                >
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Task & Telemetry Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
              Task Statistics
            </h3>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27]">
                <span className="text-[10px] text-[#71717A] uppercase font-bold">Completed</span>
                <p className="text-xl font-extrabold text-emerald-600 font-mono mt-0.5">{team.taskStats.completed}</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27]">
                <span className="text-[10px] text-[#71717A] uppercase font-bold">In Progress</span>
                <p className="text-xl font-extrabold text-[#635BFF] font-mono mt-0.5">{team.taskStats.inProgress}</p>
              </div>
            </div>

            <div className="pt-2 text-xs text-[#71717A] space-y-1.5">
              <div className="flex justify-between">
                <span>Total Tasks Logged</span>
                <strong className="text-[#171717] dark:text-white font-mono">{team.taskStats.total}</strong>
              </div>
              <div className="flex justify-between">
                <span>Completed Milestones</span>
                <strong className="text-[#171717] dark:text-white font-mono">{team.completedMilestones} of {team.milestonesCount}</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F0EFEA] dark:border-[#22221F]">
              <Link
                to={`/teams/${team.id}`}
                target="_blank"
                className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] text-[#171717] dark:text-[#F5F5F0] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Team Workspace
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
          modalAction === 'archive'
            ? `Archive Team "${team.name}"?`
            : `Restrict Team "${team.name}"?`
        }
        description={
          modalAction === 'archive'
            ? 'The team workspace will be converted to read-only status and hidden from active boards.'
            : 'Workspace collaboration privileges will be suspended pending administrative review.'
        }
        confirmText={modalAction === 'archive' ? 'Archive Team' : 'Restrict Team'}
        danger={modalAction === 'restrict'}
      />
    </div>
  );
};

export default AdminTeamDetailPage;
