import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Lightbulb,
  Handshake,
  Users2,
  ShieldAlert,
  Cpu,
  Tags,
  Award,
  Bell,
  BarChart3,
  ScrollText,
  Settings,
  UserCheck,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Flame,
  ShieldCheck,
  X,
} from 'lucide-react';
import { useAdminAuth } from '../../../context/AdminAuthContext';

export const AdminSidebar = ({ isCollapsed, setIsCollapsed, mobileOpen, setMobileOpen }) => {
  const { adminUser, role, switchRole } = useAdminAuth();

  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'MANAGEMENT',
      items: [
        { label: 'Users', href: '/admin/users', icon: Users, permission: 'users_read' },
        { label: 'Ideas', href: '/admin/ideas', icon: Lightbulb, permission: 'ideas_read' },
        { label: 'Collaborations', href: '/admin/collaborations', icon: Handshake },
        { label: 'Teams', href: '/admin/teams', icon: Users2 },
      ],
    },
    {
      title: 'MODERATION',
      items: [
        { label: 'Moderation Center', href: '/admin/moderation', icon: ShieldAlert, badge: '2 Pending', badgeColor: 'bg-rose-500' },
      ],
    },
    {
      title: 'AI SYSTEM',
      items: [
        { label: 'AI Monitoring', href: '/admin/ai-monitoring', icon: Cpu, badge: 'RAG' },
      ],
    },
    {
      title: 'PLATFORM',
      items: [
        { label: 'Categories & Skills', href: '/admin/categories', icon: Tags },
        { label: 'Reputation', href: '/admin/reputation', icon: Award },
        { label: 'Notifications', href: '/admin/notifications', icon: Bell },
      ],
    },
    {
      title: 'INSIGHTS',
      items: [
        { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
        { label: 'Activity Logs', href: '/admin/activity-logs', icon: ScrollText },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Settings', href: '/admin/settings', icon: Settings },
        { label: 'Admin Profile', href: '/admin/profile', icon: UserCheck },
      ],
    },
  ];

  const handleLinkClick = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 bg-white dark:bg-[#161615] border-r border-[#E8E7E0] dark:border-[#22221F] flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#F0EFEA] dark:border-[#22221F] shrink-0">
          <Link
            to="/admin/dashboard"
            onClick={handleLinkClick}
            className="flex items-center gap-2.5 overflow-hidden group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#171717] dark:bg-white text-white dark:text-[#171717] flex items-center justify-center font-black tracking-tighter shrink-0 shadow-xs">
              <Flame className="w-5 h-5 text-[#FF7043]" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm tracking-tight text-[#171717] dark:text-[#F5F5F0]">
                    FUSE
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-[#F2F1EC] dark:bg-[#262624] text-[#71717A] dark:text-[#A8A8A2]">
                    ADMIN
                  </span>
                </div>
                <span className="text-[10px] text-[#A3A3A3] font-medium">Control Plane</span>
              </div>
            )}
          </Link>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-[#71717A] hover:text-[#171717] dark:hover:text-white hover:bg-[#F2F1EC] dark:hover:bg-[#222220] transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile close toggle */}
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-[#71717A] hover:text-[#171717] dark:hover:text-white hover:bg-[#F2F1EC] dark:hover:bg-[#222220] transition-colors"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1">
              {!isCollapsed ? (
                <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-[#A3A3A3] dark:text-[#6E6E69] uppercase font-mono">
                  {section.title}
                </div>
              ) : (
                <div className="h-2 border-t border-[#F0EFEA] dark:border-[#22221F] my-2" />
              )}

              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    onClick={handleLinkClick}
                    title={isCollapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all group ${
                        isActive
                          ? 'bg-[#171717] text-white dark:bg-white dark:text-[#171717] shadow-xs'
                          : 'text-[#71717A] dark:text-[#A8A8A2] hover:text-[#171717] dark:hover:text-white hover:bg-[#F2F1EC] dark:hover:bg-[#222220]'
                      } ${isCollapsed ? 'justify-center px-0' : ''}`
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                    {!isCollapsed && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}
                    {!isCollapsed && item.badge && (
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full text-white ${
                          item.badgeColor || 'bg-[#171717] dark:bg-stone-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Bottom Role Switcher & App Switcher */}
        <div className="p-3 border-t border-[#F0EFEA] dark:border-[#22221F] shrink-0 bg-stone-50/50 dark:bg-[#121211] space-y-2">
          {/* Active Role Selector Pill */}
          {!isCollapsed ? (
            <div className="p-2.5 rounded-xl bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#A3A3A3] uppercase tracking-wide">
                  Demo Role
                </span>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-3 h-3" /> Live
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {['super_admin', 'moderator', 'admin'].map((r) => (
                  <button
                    key={r}
                    onClick={() => switchRole(r)}
                    className={`py-1 text-[10px] font-mono font-bold rounded-lg transition-colors capitalize ${
                      role === r
                        ? 'bg-[#171717] text-white dark:bg-white dark:text-[#171717]'
                        : 'text-[#71717A] hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    {r === 'super_admin' ? 'Super' : r === 'moderator' ? 'Mod' : 'Admin'}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => switchRole(role === 'super_admin' ? 'moderator' : 'super_admin')}
                className="w-8 h-8 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center"
                title={`Switch demo role (Current: ${role})`}
              >
                <ShieldCheck className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Return to Public Platform */}
          <Link
            to="/"
            className={`flex items-center gap-2 p-2 rounded-xl text-xs text-[#71717A] hover:text-[#171717] dark:hover:text-white hover:bg-white dark:hover:bg-[#1A1A19] border border-transparent hover:border-[#E8E7E0] dark:hover:border-[#2B2B27] transition-all ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            {!isCollapsed && <span className="font-medium">Exit to Public Fuse</span>}
          </Link>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
