import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Star,
  Lightbulb,
  Handshake,
  Users2,
  ShieldAlert,
  ArrowLeft,
  Ban,
  CheckCircle,
  AlertTriangle,
  Trash2,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminStatusBadge } from '../../../components/admin/common/AdminStatusBadge';
import { AdminConfirmModal } from '../../../components/admin/common/AdminConfirmModal';
import { Button } from '../../../components/common/Button';
import { adminUserService } from '../../../services/adminUserService';
import { adminActivityLogService } from '../../../services/adminActivityLogService';
import {
  mockAdminIdeas,
  mockAdminCollaborations,
  mockAdminTeams,
  mockModerationReports,
} from '../../../data/mockAdminData';
import toast from 'react-hot-toast';

export const AdminUserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'ideas' | 'collaborations' | 'teams' | 'reports'
  const [modalAction, setModalAction] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        const u = await adminUserService.getUserById(id);
        setUser(u);
      } catch {
        toast.error('User not found');
        navigate('/admin/users');
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [id, navigate]);

  if (loading || !user) {
    return (
      <div className="py-20 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-3 border-[#FF7043] border-t-transparent animate-spin mx-auto" />
        <p className="text-xs text-[#71717A] dark:text-[#A8A8A2]">Loading user profile telemetry...</p>
      </div>
    );
  }

  // Linked datasets
  const userIdeas = mockAdminIdeas.filter((i) => i.creator.id === user.id);
  const userCollabs = mockAdminCollaborations.filter(
    (c) => c.owner.name === user.name || c.requester.name === user.name
  );
  const userTeams = mockAdminTeams.filter((t) =>
    t.members.some((m) => m.id === user.id || m.name === user.name)
  );
  const userReports = mockModerationReports.filter(
    (r) => r.reportedUser.id === user.id || r.reportedUser.name === user.name
  );

  const handleActionConfirm = async () => {
    if (!modalAction) return;
    try {
      if (modalAction === 'suspend') {
        await adminUserService.suspendUser(user.id);
        await adminActivityLogService.logAction(
          'USER_SUSPENDED',
          `User: ${user.name} (${user.email})`,
          'Suspended account from user detail view.',
          'danger'
        );
        setUser({ ...user, accountStatus: 'suspended' });
        toast.success(`Account for ${user.name} suspended`);
      } else if (modalAction === 'activate') {
        await adminUserService.activateUser(user.id);
        await adminActivityLogService.logAction(
          'USER_ACTIVATED',
          `User: ${user.name} (${user.email})`,
          'Reactivated user account from user detail view.',
          'success'
        );
        setUser({ ...user, accountStatus: 'active' });
        toast.success(`Account for ${user.name} activated`);
      } else if (modalAction === 'restrict') {
        await adminUserService.restrictUser(user.id, 7);
        await adminActivityLogService.logAction(
          'USER_RESTRICTED',
          `User: ${user.name} (${user.email})`,
          'Restricted idea posting for 7 days.',
          'warning'
        );
        setUser({ ...user, accountStatus: 'restricted' });
        toast.success(`Posting restricted for ${user.name}`);
      } else if (modalAction === 'delete') {
        await adminUserService.deleteUser(user.id);
        await adminActivityLogService.logAction(
          'USER_DELETED',
          `User: ${user.name} (${user.email})`,
          'Deleted user from detail view.',
          'danger'
        );
        toast.success(`User ${user.name} deleted`);
        navigate('/admin/users');
      }
      setModalAction(null);
    } catch {
      toast.error('Action failed');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview & Profile', count: null },
    { id: 'ideas', label: 'Ideas Shared', count: userIdeas.length },
    { id: 'collaborations', label: 'Collaborations', count: userCollabs.length },
    { id: 'teams', label: 'Teams Joined', count: userTeams.length },
    { id: 'reports', label: 'Moderation Reports', count: userReports.length, alert: userReports.length > 0 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header with breadcrumbs & moderation buttons */}
      <AdminPageHeader
        title={user.name}
        description={`Registered platform creator profile • ID: ${user.id} • Last active ${user.lastActive}`}
        breadcrumbs={[
          { label: 'Users', href: '/admin/users' },
          { label: user.name },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Link to="/admin/users">
              <Button variant="ghost" size="sm" icon={ArrowLeft}>
                Back to Users
              </Button>
            </Link>

            {user.accountStatus !== 'active' ? (
              <Button
                variant="primary"
                size="sm"
                icon={CheckCircle}
                onClick={() => setModalAction('activate')}
              >
                Activate Account
              </Button>
            ) : (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={AlertTriangle}
                  onClick={() => setModalAction('restrict')}
                >
                  Restrict (7D)
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  icon={Ban}
                  className="!text-rose-600 hover:!bg-rose-50"
                  onClick={() => setModalAction('suspend')}
                >
                  Suspend
                </Button>
              </>
            )}

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

      {/* Profile Overview Top Card */}
      <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#E8E7E0] dark:border-[#2B2B27] shadow-sm shrink-0"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#171717] dark:text-[#F5F5F0]">
                {user.name}
              </h2>
              <AdminStatusBadge status={user.accountStatus} />
            </div>
            <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] font-mono">{user.handle} • {user.email}</p>
            <div className="flex items-center gap-4 text-xs text-[#71717A] dark:text-[#A8A8A2] pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {user.location}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3.5 h-3.5" /> Joined {user.joinedDate}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Reputation & Health Indicators */}
        <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-[#F0EFEA] dark:border-[#22221F] pt-4 md:pt-0 md:pl-6">
          <div className="text-center p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] min-w-[90px]">
            <span className="text-[10px] text-[#71717A] font-bold uppercase tracking-wider block">Reputation</span>
            <div className="flex items-center justify-center gap-1 text-lg font-black text-amber-500 font-mono mt-0.5">
              <Star className="w-4 h-4 fill-current" />
              <span>{user.reputationScore}</span>
            </div>
          </div>

          <div className="text-center p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] min-w-[90px]">
            <span className="text-[10px] text-[#71717A] font-bold uppercase tracking-wider block">Completeness</span>
            <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
              {user.profileCompleteness}%
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 border-b border-[#E8E7E0] dark:border-[#2B2B27] overflow-x-auto pb-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#171717] text-white dark:bg-white dark:text-[#171717] shadow-xs'
                  : 'text-[#71717A] dark:text-[#A8A8A2] hover:text-[#171717] dark:hover:text-white hover:bg-[#F2F1EC] dark:hover:bg-[#20201E]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    tab.alert
                      ? 'bg-rose-500 text-white'
                      : isActive
                      ? 'bg-white/20 text-white dark:bg-[#171717]/20 dark:text-[#171717]'
                      : 'bg-stone-200 dark:bg-stone-800 text-[#71717A] dark:text-[#A8A8A2]'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
                Creator Bio & Statement
              </h3>
              <p className="text-xs sm:text-sm text-[#71717A] dark:text-[#A8A8A2] leading-relaxed">
                {user.bio || 'No bio provided.'}
              </p>

              <div className="pt-4 border-t border-[#F0EFEA] dark:border-[#22221F] space-y-2">
                <span className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0]">Registered Skills</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {user.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] text-[#171717] dark:text-[#F5F5F0]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
                Platform Engagement Summary
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27]">
                  <span className="text-[10px] text-[#71717A] font-bold uppercase">Ideas Shared</span>
                  <p className="text-lg font-extrabold text-[#171717] dark:text-[#F5F5F0] font-mono mt-1">{user.ideasCount}</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27]">
                  <span className="text-[10px] text-[#71717A] font-bold uppercase">Collaborations</span>
                  <p className="text-lg font-extrabold text-[#171717] dark:text-[#F5F5F0] font-mono mt-1">{user.collaborationsCount}</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27]">
                  <span className="text-[10px] text-[#71717A] font-bold uppercase">Teams Joined</span>
                  <p className="text-lg font-extrabold text-[#171717] dark:text-[#F5F5F0] font-mono mt-1">{user.teamsCount}</p>
                </div>
                <div className="p-3 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27]">
                  <span className="text-[10px] text-[#71717A] font-bold uppercase">Contributions</span>
                  <p className="text-lg font-extrabold text-[#171717] dark:text-[#F5F5F0] font-mono mt-1">{user.contributionsCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Security & Audit sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
                Account Telemetry
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#F0EFEA] dark:border-[#22221F]">
                  <span className="text-[#71717A]">User ID</span>
                  <span className="font-mono text-[#171717] dark:text-[#F5F5F0]">{user.id}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#F0EFEA] dark:border-[#22221F]">
                  <span className="text-[#71717A]">Auth Provider</span>
                  <span className="font-semibold text-[#171717] dark:text-[#F5F5F0]">Django SimpleJWT</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#F0EFEA] dark:border-[#22221F]">
                  <span className="text-[#71717A]">Role</span>
                  <span className="font-semibold text-[#171717] dark:text-[#F5F5F0]">{user.role}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#F0EFEA] dark:border-[#22221F]">
                  <span className="text-[#71717A]">Associated Reports</span>
                  <span className={`font-bold font-mono ${userReports.length > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {userReports.length} reports
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/profile/${user.id}`}
                  target="_blank"
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] text-[#171717] dark:text-[#F5F5F0] hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Public Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ideas Shared */}
      {activeTab === 'ideas' && (
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
            Ideas Published by {user.name} ({userIdeas.length})
          </h3>
          {userIdeas.length === 0 ? (
            <p className="text-xs text-[#71717A] py-8 text-center">No ideas published yet.</p>
          ) : (
            <div className="divide-y divide-[#F0EFEA] dark:divide-[#22221F]">
              {userIdeas.map((idea) => (
                <div key={idea.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1 max-w-xl">
                    <Link
                      to={`/admin/ideas/${idea.id}`}
                      className="font-bold text-sm text-[#171717] dark:text-[#F5F5F0] hover:text-[#FF7043] transition-colors"
                    >
                      {idea.title}
                    </Link>
                    <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] line-clamp-1">
                      {idea.shortDescription}
                    </p>
                    <div className="flex items-center gap-3 text-[11px] text-[#A3A3A3] pt-1">
                      <span>Category: <strong>{idea.category}</strong></span>
                      <span>Stage: <strong>{idea.stage}</strong></span>
                      <span>Connection: <strong>{idea.connectionType}</strong></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <AdminStatusBadge status={idea.status} size="xs" />
                    <Link to={`/admin/ideas/${idea.id}`}>
                      <Button variant="secondary" size="xs">
                        Inspect
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Collaborations */}
      {activeTab === 'collaborations' && (
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
            Collaboration History ({userCollabs.length})
          </h3>
          {userCollabs.length === 0 ? (
            <p className="text-xs text-[#71717A] py-8 text-center">No collaboration requests found.</p>
          ) : (
            <div className="divide-y divide-[#F0EFEA] dark:divide-[#22221F]">
              {userCollabs.map((collab) => (
                <div key={collab.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-[#FF7043]">{collab.connectionType}</span>
                    <h4 className="text-xs sm:text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
                      {collab.ideaTitle}
                    </h4>
                    <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] italic line-clamp-1">
                      "{collab.message}"
                    </p>
                    <span className="text-[10px] text-[#A3A3A3] block">
                      Requested {collab.requestedAt} • Owner: {collab.owner.name} • Requester: {collab.requester.name}
                    </span>
                  </div>
                  <AdminStatusBadge status={collab.status} size="xs" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Teams Joined */}
      {activeTab === 'teams' && (
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
            Teams & Workspaces ({userTeams.length})
          </h3>
          {userTeams.length === 0 ? (
            <p className="text-xs text-[#71717A] py-8 text-center">No teams joined yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userTeams.map((team) => (
                <div key={team.id} className="p-4 rounded-2xl bg-[#F8F8F5] dark:bg-[#141413] border border-[#E8E7E0] dark:border-[#2B2B27] space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-bold text-[#171717] dark:text-[#F5F5F0] truncate">
                      {team.name}
                    </h4>
                    <AdminStatusBadge status={team.status} size="xs" />
                  </div>
                  <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] line-clamp-1">{team.tagline}</p>
                  <div className="pt-2 flex items-center justify-between text-xs text-[#71717A]">
                    <span>Stage: <strong>{team.currentStage}</strong></span>
                    <span className="font-mono font-bold text-emerald-600">{team.progressPercentage}% Progress</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Moderation Reports */}
      {activeTab === 'reports' && (
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-[#171717] dark:text-[#F5F5F0]">
            Reports Involving {user.name} ({userReports.length})
          </h3>
          {userReports.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Clean Record</p>
              <p className="text-xs text-[#71717A]">No moderation reports filed against this user profile.</p>
            </div>
          ) : (
            <div className="divide-y divide-[#F0EFEA] dark:divide-[#22221F]">
              {userReports.map((rep) => (
                <div key={rep.id} className="py-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-rose-600">Report #{rep.id}</span>
                      <span className="text-xs text-[#71717A]">• Reported by {rep.reporter.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AdminStatusBadge status={rep.priority} size="xs" />
                      <AdminStatusBadge status={rep.status} size="xs" />
                    </div>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
                    Reason: {rep.reason} ({rep.contentType})
                  </h4>
                  <p className="text-xs text-[#71717A] dark:text-[#A8A8A2]">{rep.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Confirmation Modal */}
      <AdminConfirmModal
        isOpen={!!modalAction}
        onClose={() => setModalAction(null)}
        onConfirm={handleActionConfirm}
        title={
          modalAction === 'delete'
            ? `Delete User Account (${user.name})?`
            : modalAction === 'suspend'
            ? `Suspend User (${user.name})?`
            : modalAction === 'restrict'
            ? `Restrict Posting for ${user.name}?`
            : `Activate ${user.name}?`
        }
        description={
          modalAction === 'delete'
            ? 'This action will permanently delete this creator profile and associated data.'
            : modalAction === 'suspend'
            ? 'The user will be immediately locked out of the platform until reinstated.'
            : modalAction === 'restrict'
            ? 'The user will be blocked from creating new ideas for 7 calendar days.'
            : 'The user account will be returned to active standing.'
        }
        confirmText={
          modalAction === 'delete'
            ? 'Delete Account Permanently'
            : modalAction === 'suspend'
            ? 'Suspend Account'
            : modalAction === 'restrict'
            ? 'Apply Restriction'
            : 'Activate Account'
        }
        danger={modalAction === 'delete' || modalAction === 'suspend'}
        requireTyping={modalAction === 'delete'}
        requiredWord="DELETE"
      />
    </div>
  );
};

export default AdminUserDetailPage;
