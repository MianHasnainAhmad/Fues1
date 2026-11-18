import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit2,
  Ban,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Download,
  Shield,
  Star,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { AdminDataTable } from '../../../components/admin/common/AdminDataTable';
import { AdminStatusBadge } from '../../../components/admin/common/AdminStatusBadge';
import { AdminConfirmModal } from '../../../components/admin/common/AdminConfirmModal';
import { Dropdown, DropdownItem } from '../../../components/common/Dropdown';
import { Button } from '../../../components/common/Button';
import { adminUserService } from '../../../services/adminUserService';
import { adminActivityLogService } from '../../../services/adminActivityLogService';
import toast from 'react-hot-toast';

export const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Modals state
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalAction, setModalAction] = useState(null); // 'suspend' | 'activate' | 'restrict' | 'delete'

  const initialSearch = searchParams.get('q') || '';

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminUserService.getUsers({
        status: statusFilter,
        role: roleFilter,
      });
      setUsers(res.results);
    } catch {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [statusFilter, roleFilter]);

  const handleActionConfirm = async () => {
    if (!selectedUser || !modalAction) return;
    try {
      if (modalAction === 'suspend') {
        await adminUserService.suspendUser(selectedUser.id);
        await adminActivityLogService.logAction(
          'USER_SUSPENDED',
          `User: ${selectedUser.name} (${selectedUser.email})`,
          'Suspended account through User Management table.',
          'danger'
        );
        toast.success(`Account for ${selectedUser.name} suspended`);
      } else if (modalAction === 'activate') {
        await adminUserService.activateUser(selectedUser.id);
        await adminActivityLogService.logAction(
          'USER_ACTIVATED',
          `User: ${selectedUser.name} (${selectedUser.email})`,
          'Reactivated user account.',
          'success'
        );
        toast.success(`Account for ${selectedUser.name} activated`);
      } else if (modalAction === 'restrict') {
        await adminUserService.restrictUser(selectedUser.id, 7);
        await adminActivityLogService.logAction(
          'USER_RESTRICTED',
          `User: ${selectedUser.name} (${selectedUser.email})`,
          'Applied 7-day idea posting restriction.',
          'warning'
        );
        toast.success(`Posting restricted for ${selectedUser.name}`);
      } else if (modalAction === 'delete') {
        await adminUserService.deleteUser(selectedUser.id);
        await adminActivityLogService.logAction(
          'USER_DELETED',
          `User: ${selectedUser.name} (${selectedUser.email})`,
          'Permanently deleted user account.',
          'danger'
        );
        toast.success(`User ${selectedUser.name} deleted`);
      }
      setSelectedUser(null);
      setModalAction(null);
      fetchUsers();
    } catch {
      toast.error('Operation failed');
    }
  };

  const columns = [
    {
      header: 'User',
      key: 'name',
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-3">
          <img
            src={u.avatar}
            alt={u.name}
            className="w-9 h-9 rounded-full object-cover shrink-0 border border-[#E8E7E0] dark:border-[#2B2B27]"
          />
          <div className="min-w-0">
            <Link
              to={`/admin/users/${u.id}`}
              className="font-bold text-xs sm:text-sm text-[#171717] dark:text-[#F5F5F0] hover:text-[#FF7043] transition-colors truncate block"
            >
              {u.name}
            </Link>
            <span className="text-[11px] text-[#71717A] dark:text-[#A8A8A2] font-mono">
              {u.handle}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Email',
      key: 'email',
      sortable: true,
      render: (u) => (
        <span className="text-xs text-[#71717A] dark:text-[#A8A8A2] font-mono truncate block max-w-[180px]">
          {u.email}
        </span>
      ),
    },
    {
      header: 'Registered',
      key: 'joinedDate',
      sortable: true,
      render: (u) => (
        <span className="text-xs text-[#71717A] dark:text-[#A8A8A2] font-mono">
          {u.joinedDate}
        </span>
      ),
    },
    {
      header: 'Reputation',
      key: 'reputationScore',
      sortable: true,
      render: (u) => (
        <div className="flex items-center gap-1 text-xs font-bold text-amber-500 font-mono">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{u.reputationScore}</span>
        </div>
      ),
    },
    {
      header: 'Ideas / Teams',
      key: 'ideasCount',
      render: (u) => (
        <span className="text-xs font-mono text-[#171717] dark:text-[#F5F5F0]">
          {u.ideasCount} ideas • {u.teamsCount} teams
        </span>
      ),
    },
    {
      header: 'Status',
      key: 'accountStatus',
      sortable: true,
      render: (u) => <AdminStatusBadge status={u.accountStatus} size="xs" />,
    },
    {
      header: 'Actions',
      key: 'actions',
      className: 'text-right',
      cellClassName: 'text-right',
      render: (u) => (
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
              label="View Details"
              onClick={() => navigate(`/admin/users/${u.id}`)}
            />
            {u.accountStatus !== 'active' ? (
              <DropdownItem
                icon={CheckCircle}
                label="Activate Account"
                onClick={() => {
                  setSelectedUser(u);
                  setModalAction('activate');
                }}
              />
            ) : (
              <>
                <DropdownItem
                  icon={Ban}
                  label="Suspend Account"
                  onClick={() => {
                    setSelectedUser(u);
                    setModalAction('suspend');
                  }}
                />
                <DropdownItem
                  icon={AlertTriangle}
                  label="Restrict Posting (7D)"
                  onClick={() => {
                    setSelectedUser(u);
                    setModalAction('restrict');
                  }}
                />
              </>
            )}
            <div className="my-1 border-t border-[#F0EFEA] dark:border-[#22221F]" />
            <DropdownItem
              icon={Trash2}
              label="Delete User"
              danger
              onClick={() => {
                setSelectedUser(u);
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
        title="User Management"
        description="Inspect registered platform creators, monitor reputation trust scores, enforce safety suspensions, or adjust account restrictions."
        breadcrumbs={[{ label: 'Users' }]}
        actions={
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] text-[#171717] dark:text-[#F5F5F0]">
              Total Users: {users.length}
            </span>
          </div>
        }
      />

      {/* Main Table */}
      <AdminDataTable
        columns={columns}
        data={users}
        searchPlaceholder="Search by name, handle, or email..."
        exportFilename="fuse-registered-users"
        loading={loading}
        filterComponent={
          <div className="flex items-center gap-2">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-xl px-3 py-2 text-xs font-semibold text-[#171717] dark:text-[#F5F5F0] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="suspended">Suspended Only</option>
              <option value="restricted">Restricted Only</option>
            </select>
          </div>
        }
      />

      {/* Confirmation Modal */}
      <AdminConfirmModal
        isOpen={!!modalAction}
        onClose={() => {
          setSelectedUser(null);
          setModalAction(null);
        }}
        onConfirm={handleActionConfirm}
        title={
          modalAction === 'delete'
            ? `Delete User Account (${selectedUser?.name})?`
            : modalAction === 'suspend'
            ? `Suspend ${selectedUser?.name}?`
            : modalAction === 'restrict'
            ? `Restrict Idea Posting for ${selectedUser?.name}?`
            : `Activate ${selectedUser?.name}?`
        }
        description={
          modalAction === 'delete'
            ? 'This action permanently purges the user profile, collaborations, and access tokens from the database. This action cannot be reversed.'
            : modalAction === 'suspend'
            ? 'The user will be immediately logged out and blocked from creating ideas, sending messages, or logging in until an administrator reinstates their account.'
            : modalAction === 'restrict'
            ? 'The user will retain login and messaging access, but will be barred from publishing new ideas for 7 calendar days.'
            : 'The user account will be restored to full platform standing.'
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

export default AdminUsersPage;
