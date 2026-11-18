import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Shield,
  LogOut,
  User,
  Settings,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { ThemeToggle } from '../../common/ThemeToggle';
import { AccentSelector } from '../../common/AccentSelector';
import { Dropdown, DropdownItem } from '../../common/Dropdown';
import { AdminConfirmModal } from '../common/AdminConfirmModal';
import { mockModerationReports } from '../../../data/mockAdminData';

export const AdminNavbar = ({ isCollapsed, setMobileOpen }) => {
  const { adminUser, role, logoutAdmin } = useAdminAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const pendingReports = mockModerationReports.filter((r) => r.status === 'pending');

  const handleGlobalSearchSubmit = (e) => {
    e.preventDefault();
    if (!globalSearch.trim()) return;
    navigate(`/admin/users?q=${encodeURIComponent(globalSearch.trim())}`);
  };

  const handleConfirmLogout = async () => {
    await logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-30 h-16 bg-white/90 dark:bg-[#161615]/90 backdrop-blur-md border-b border-[#E8E7E0] dark:border-[#22221F] px-4 sm:px-6 flex items-center justify-between gap-4 transition-all duration-300 ${
          isCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {/* Left Section: Mobile Toggle & Global Search */}
        <div className="flex items-center gap-3 flex-1 max-w-lg">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-xl text-[#71717A] hover:text-[#171717] hover:bg-[#F2F1EC] dark:hover:text-white dark:hover:bg-[#222220] transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <form onSubmit={handleGlobalSearchSubmit} className="relative w-full hidden sm:block">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search users, ideas, reports... (Press Enter)"
              className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-[#F8F8F5] dark:bg-[#1E1E1C] border border-[#E8E7E0] dark:border-[#2B2B27] text-[#171717] dark:text-[#F5F5F0] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#171717] dark:focus:border-stone-500 transition-colors"
            />
            {globalSearch && (
              <button
                type="button"
                onClick={() => setGlobalSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </form>
        </div>

        {/* Right Section: Role pill, Theme toggle, Notifications, Admin Profile */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Active Role Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-[#262624] text-[11px] font-mono font-bold text-[#71717A] dark:text-[#A8A8A2] border border-[#E8E7E0] dark:border-[#2B2B27]">
            <Shield className="w-3 h-3 text-[#FF7043]" />
            <span>{adminUser?.roleLabel || role}</span>
          </div>

          {/* Accent Color & Theme Toggle */}
          <AccentSelector size="sm" className="hidden sm:inline-flex" />
          <ThemeToggle />

          {/* Notifications Dropdown */}
          <Dropdown
            trigger={
              <button className="relative p-2 rounded-xl text-[#71717A] hover:text-[#171717] hover:bg-[#F2F1EC] dark:hover:text-white dark:hover:bg-[#222220] transition-colors">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                {pendingReports.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-[#161615]" />
                )}
              </button>
            }
            align="right"
          >
            <div className="w-72 sm:w-80 p-2 max-w-[calc(100vw-2rem)]">
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#F0EFEA] dark:border-[#22221F]">
                <span className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0] uppercase tracking-wider">
                  Admin Alerts
                </span>
                <Link
                  to="/admin/moderation"
                  className="text-[11px] text-[#FF7043] font-semibold hover:underline"
                >
                  View All ({pendingReports.length})
                </Link>
              </div>

              <div className="py-1 divide-y divide-[#F0EFEA] dark:divide-[#22221F] max-h-72 overflow-y-auto">
                {pendingReports.length === 0 ? (
                  <div className="py-6 text-center text-xs text-[#A3A3A3]">
                    No pending moderation alerts.
                  </div>
                ) : (
                  pendingReports.map((rep) => (
                    <Link
                      key={rep.id}
                      to="/admin/moderation"
                      className="block p-2.5 hover:bg-[#F8F8F5] dark:hover:bg-[#222220] rounded-xl transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-rose-600 dark:text-rose-400">
                          {rep.reason}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {rep.submittedDate.slice(11)}
                        </span>
                      </div>
                      <p className="text-xs text-[#171717] dark:text-[#F5F5F0] line-clamp-1 mt-0.5">
                        {rep.contentTitle}
                      </p>
                      <span className="text-[10px] text-[#71717A] dark:text-[#A8A8A2] mt-1 block">
                        Reported by {rep.reporter.name}
                      </span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </Dropdown>

          {/* Admin Avatar & Account Dropdown */}
          <Dropdown
            trigger={
              <button className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-[#F2F1EC] dark:hover:bg-[#222220] transition-colors">
                <img
                  src={adminUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80'}
                  alt={adminUser?.name || 'Admin'}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[#E8E7E0] dark:border-[#2B2B27]"
                />
                <div className="hidden xl:flex flex-col text-left pr-1">
                  <span className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0] truncate max-w-[120px]">
                    {adminUser?.name || 'Admin'}
                  </span>
                  <span className="text-[10px] text-[#71717A] dark:text-[#A8A8A2] capitalize">
                    {adminUser?.roleLabel || role}
                  </span>
                </div>
              </button>
            }
            align="right"
          >
            <div className="w-56 p-1.5">
              <div className="px-3 py-2 border-b border-[#F0EFEA] dark:border-[#22221F] mb-1">
                <p className="text-xs font-bold text-[#171717] dark:text-[#F5F5F0] truncate">
                  {adminUser?.name || 'Admin'}
                </p>
                <p className="text-[11px] text-[#71717A] dark:text-[#A8A8A2] truncate">
                  {adminUser?.email || 'admin@fuse.io'}
                </p>
              </div>

              <DropdownItem
                icon={User}
                label="Admin Profile"
                onClick={() => navigate('/admin/profile')}
              />
              <DropdownItem
                icon={Settings}
                label="Admin Settings"
                onClick={() => navigate('/admin/settings')}
              />
              <DropdownItem
                icon={ExternalLink}
                label="View Public Platform"
                onClick={() => navigate('/')}
              />

              <div className="my-1 border-t border-[#F0EFEA] dark:border-[#22221F]" />

              <DropdownItem
                icon={LogOut}
                label="Sign Out"
                danger
                onClick={() => setShowLogoutModal(true)}
              />
            </div>
          </Dropdown>
        </div>
      </header>

      {/* Logout Confirmation Modal */}
      <AdminConfirmModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleConfirmLogout}
        title="Sign Out of Admin Control Plane?"
        description="Your administrative session token will be revoked. You will need to log back in to access the control plane."
        confirmText="Sign Out"
        danger={false}
      />
    </>
  );
};

export default AdminNavbar;
