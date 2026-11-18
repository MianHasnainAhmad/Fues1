import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Lightbulb,
  Sparkles,
  Users2,
  FolderKanban,
  MessageSquare,
  Bell,
  Bookmark,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Flame,
  LogOut,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from '../common/ThemeToggle';

export const Sidebar = ({ isCollapsed, setIsCollapsed, mobileOpen, setMobileOpen }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/ideas', label: 'Explore Ideas', icon: Compass },
    { to: '/my-ideas', label: 'My Ideas', icon: Lightbulb },
    { to: '/ai-companion', label: 'AI Companion', icon: Sparkles, badge: 'Smart' },
    { to: '/collaborators', label: 'Find Collaborators', icon: Users2 },
    { to: '/teams/team-1', label: 'My Teams', icon: FolderKanban },
    { to: '/messages', label: 'Messages', icon: MessageSquare, badgeCount: 2 },
    { to: '/notifications', label: 'Notifications', icon: Bell, badgeCount: 2 },
    { to: '/saved', label: 'Saved Ideas', icon: Bookmark },
    { to: '/my-profile', label: 'My Profile', icon: User },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navContent = (
    <div className="flex flex-col h-full bg-white border-r border-[#E8E7E0] transition-all duration-300">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#E8E7E0]">
        <NavLink to="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-[#FF7043] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Flame className="w-5 h-5 fill-white" />
          </div>
          {!isCollapsed && (
            <div className="min-w-0">
              <span className="text-lg font-extrabold tracking-tight text-[#171717] block leading-none">
                FUSE<span className="text-[#FF7043]">.</span>
              </span>
              <span className="text-[10px] font-semibold text-[#737373] tracking-wide block uppercase truncate">
                Collaborative
              </span>
            </div>
          )}
        </NavLink>

        {/* Collapse toggle (desktop only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-[#737373] hover:text-[#171717] hover:bg-[#F2F1EC] dark:hover:text-white dark:hover:bg-[#262624] transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Mobile close toggle */}
        <button
          onClick={() => setMobileOpen && setMobileOpen(false)}
          className="md:hidden p-1.5 rounded-lg text-[#737373] hover:text-[#171717] hover:bg-[#F2F1EC] dark:hover:text-white dark:hover:bg-[#262624] transition-colors"
          title="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Action: Share Idea */}
      <div className="p-3">
        <NavLink
          to="/ideas/create"
          onClick={() => setMobileOpen && setMobileOpen(false)}
          className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#FF7043] text-white hover:bg-[#F4511E] transition-all font-semibold text-sm shadow-xs ${
            isCollapsed ? 'px-2' : ''
          }`}
          title="Share an Idea"
        >
          <PlusCircle className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Share Idea</span>}
        </NavLink>
      </div>

      {/* Main Navigation links */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors group relative ${
                  isActive
                    ? 'bg-[#FFF0EB] text-[#FF7043] font-semibold'
                    : 'text-[#525252] hover:text-[#171717] hover:bg-[#F8F8F5] dark:text-[#A8A8A2] dark:hover:text-white dark:hover:bg-[#262624]'
                } ${isCollapsed ? 'justify-center px-2' : ''}`
              }
              title={isCollapsed ? link.label : undefined}
            >
              <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
              {!isCollapsed && (
                <span className="truncate flex-1">{link.label}</span>
              )}

              {/* Badges */}
              {!isCollapsed && link.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#E9E4FF] text-[#6C5CE7]">
                  {link.badge}
                </span>
              )}
              {!isCollapsed && link.badgeCount && (
                <span className="text-[11px] font-bold px-1.5 py-0.2 rounded-full bg-[#FF7043] text-white">
                  {link.badgeCount}
                </span>
              )}
              {isCollapsed && (link.badgeCount || link.badge) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF7043]" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Footer: Theme toggle & Sign out */}
      <div className="p-3 border-t border-[#E8E7E0] space-y-1">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-2 py-1'}`}>
          {!isCollapsed && <span className="text-xs text-[#737373] font-medium">Theme</span>}
          <ThemeToggle />
        </div>
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
          title="Sign Out"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block shrink-0 sticky top-0 h-screen transition-all duration-300 z-30 ${
          isCollapsed ? 'w-18' : 'w-64'
        }`}
      >
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#171717]/40 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white md:hidden transform transition-transform duration-300 shadow-2xl ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </div>
    </>
  );
};
