import React, { useState } from 'react';
import {
  User,
  Mail,
  Shield,
  Key,
  Calendar,
  Clock,
  CheckCircle,
  Save,
  Lock,
} from 'lucide-react';
import { AdminPageHeader } from '../../../components/admin/common/AdminPageHeader';
import { Button } from '../../../components/common/Button';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { mockAdminActivityLogs } from '../../../data/mockAdminData';
import toast from 'react-hot-toast';

export const AdminProfilePage = () => {
  const { adminUser, role } = useAdminAuth();

  const [name, setName] = useState(adminUser?.name || 'Elena Rostova');
  const [email, setEmail] = useState(adminUser?.email || 'elena.admin@fuse.io');
  const [department, setDepartment] = useState(adminUser?.department || 'Platform Operations');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const personalLogs = mockAdminActivityLogs.filter(
    (l) => l.adminName.toLowerCase() === (adminUser?.name || '').toLowerCase()
  );

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    toast.success('Admin profile credentials updated');
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!currentPassword) {
      toast.error('Please enter current password');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    toast.success('Admin password updated successfully');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-200">
      <AdminPageHeader
        title="Admin Profile & Account"
        description="Manage your platform administrator credentials, security keys, and personal audit trail."
        breadcrumbs={[{ label: 'Admin Profile' }]}
      />

      {/* Profile Overview Header Card */}
      <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={adminUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'}
            alt={adminUser?.name}
            className="w-16 h-16 rounded-2xl object-cover border border-[#E8E7E0] dark:border-[#2B2B27] shadow-sm"
          />
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-[#171717] dark:text-[#F5F5F0]">
              {adminUser?.name}
            </h2>
            <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] font-mono">{adminUser?.email}</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300">
                {adminUser?.roleLabel || role}
              </span>
              <span className="text-xs text-stone-400">• {department}</span>
            </div>
          </div>
        </div>

        <div className="text-left sm:text-right text-xs text-[#71717A] border-t sm:border-t-0 sm:border-l border-[#F0EFEA] dark:border-[#22221F] pt-3 sm:pt-0 sm:pl-6">
          <span className="block text-[10px] uppercase font-bold text-stone-400">Last Authentication</span>
          <span className="font-mono text-[#171717] dark:text-white font-bold">{adminUser?.lastLogin || 'Just now'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Details Form */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
            Personal Information
          </h3>

          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Department / Team</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <Button type="submit" variant="primary" size="sm" icon={Save} className="w-full mt-2">
              Save Profile Changes
            </Button>
          </form>
        </div>

        {/* Change Password Form */}
        <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
            Change Password
          </h3>

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#171717] dark:text-[#F5F5F0]">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E7E0] dark:border-[#2B2B27] bg-[#F8F8F5] dark:bg-[#141413] text-sm text-[#171717] dark:text-[#F5F5F0] focus:outline-none focus:border-[#171717]"
              />
            </div>

            <Button type="submit" variant="secondary" size="sm" icon={Key} className="w-full mt-2">
              Update Admin Password
            </Button>
          </form>
        </div>
      </div>

      {/* Personal Activity Log */}
      <div className="bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-[#171717] dark:text-[#F5F5F0]">
          Your Recent Administrative Actions
        </h3>
        <div className="divide-y divide-[#F0EFEA] dark:divide-[#22221F]">
          {personalLogs.length === 0 ? (
            <p className="text-xs text-[#71717A] py-4">No recent activity found for this account.</p>
          ) : (
            personalLogs.map((log) => (
              <div key={log.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-mono font-bold text-[#171717] dark:text-white mr-2">
                    {log.action}
                  </span>
                  <span className="text-[#71717A]">{log.target}</span>
                </div>
                <span className="text-[11px] font-mono text-stone-400 shrink-0">{log.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
