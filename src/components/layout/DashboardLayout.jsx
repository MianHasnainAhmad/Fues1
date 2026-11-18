import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  Plus,
  User,
  Settings,
  LogOut,
  Flame,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Avatar } from '../common/Avatar';
import { Dropdown, DropdownItem } from '../common/Dropdown';
import { ThemeToggle } from '../common/ThemeToggle';
import { AccentSelector } from '../common/AccentSelector';
import { useAuth } from '../../context/AuthContext';
import { mockNotifications } from '../../data/mockNotifications';

export const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const unreadCount = mockNotifications.filter((n) => !n.read).length;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (globalSearch.trim()) {
      navigate(`/ideas?q=${encodeURIComponent(globalSearch.trim())}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] flex">
      {/* Sidebar Component */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b border-[#E8E7E0] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 -ml-2 rounded-xl text-[#737373] hover:text-[#171717] hover:bg-[#F2F1EC] dark:hover:text-white dark:hover:bg-[#262624] md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737373] pointer-events-none" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search ideas, skills, collaborators..."
                className="w-full bg-[#F8F8F5] border border-[#E8E7E0] rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm text-[#171717] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-2 focus:ring-[#FF7043]/20 focus:border-[#FF7043] focus:bg-white transition-all"
              />
            </form>
          </div>

          {/* Right Action Icons & Avatar */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Brand Accent Selector */}
            <AccentSelector size="sm" className="hidden sm:inline-flex" />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Quick Share Button */}
            <Link
              to="/ideas/create"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF0EB] text-[#FF7043] hover:bg-[#FFE2D6] font-semibold text-xs border border-[#FFD8CC] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              New Idea
            </Link>

            {/* Notifications Dropdown */}
            <Dropdown
              trigger={
                <button className="relative p-2 rounded-xl text-[#737373] hover:text-[#171717] hover:bg-[#F2F1EC] dark:hover:text-white dark:hover:bg-[#262624] transition-colors">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#FF7043] ring-2 ring-white dark:ring-[#1A1A19]" />
                  )}
                </button>
              }
              align="right"
              className="relative"
            >
              <div className="w-72 sm:w-80 p-2 max-w-[calc(100vw-2rem)]">
                <div className="flex items-center justify-between px-3 py-2 border-b border-[#F0EFEA]">
                  <span className="text-xs font-bold text-[#171717] uppercase tracking-wider">
                    Notifications
                  </span>
                  <Link
                    to="/notifications"
                    className="text-xs text-[#FF7043] hover:underline font-semibold"
                  >
                    View All
                  </Link>
                </div>
                <div className="py-1 divide-y divide-[#F0EFEA] max-h-72 overflow-y-auto">
                  {mockNotifications.slice(0, 3).map((item) => (
                    <Link
                      key={item.id}
                      to={item.actionUrl || '/notifications'}
                      className="block p-2.5 hover:bg-[#F8F8F5] dark:hover:bg-[#262624] rounded-lg transition-colors"
                    >
                      <p className="text-xs font-semibold text-[#171717] truncate">{item.title}</p>
                      <p className="text-xs text-[#737373] line-clamp-1 mt-0.5">{item.message}</p>
                      <span className="text-[10px] text-[#A3A3A3] mt-1 block">{item.time}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </Dropdown>

            {/* User Avatar & Menu */}
            <Dropdown
              trigger={
                <button className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#F2F1EC] dark:hover:bg-[#262624] transition-colors">
                  <Avatar
                    src={user?.avatar}
                    name={user?.name || 'Alex Morgan'}
                    size="sm"
                    status="online"
                  />
                  <span className="hidden lg:block text-xs font-bold text-[#171717] max-w-[100px] truncate">
                    {user?.name || 'Alex Morgan'}
                  </span>
                </button>
              }
              align="right"
            >
              <div className="px-3 py-2.5 border-b border-[#F0EFEA]">
                <p className="text-xs font-bold text-[#171717] truncate">{user?.name}</p>
                <p className="text-[11px] text-[#737373] truncate">{user?.email}</p>
              </div>

              <div className="py-1">
                <DropdownItem icon={User} onClick={() => navigate('/my-profile')}>
                  My Profile
                </DropdownItem>
                <DropdownItem icon={Flame} onClick={() => navigate('/my-ideas')}>
                  My Ideas
                </DropdownItem>
                <DropdownItem icon={Settings} onClick={() => navigate('/settings')}>
                  Account Settings
                </DropdownItem>
                <DropdownItem icon={HelpCircle} onClick={() => navigate('/about')}>
                  Fuse Manifesto & Help
                </DropdownItem>
              </div>

              <div className="pt-1 border-t border-[#F0EFEA]">
                <DropdownItem icon={LogOut} danger onClick={handleLogout}>
                  Sign Out
                </DropdownItem>
              </div>
            </Dropdown>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
