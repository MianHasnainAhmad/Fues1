import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminNavbar } from './AdminNavbar';

export const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#0E0E0D] text-[#171717] dark:text-[#F5F5F0] transition-colors">
      {/* Collapsible Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Administrative Viewport */}
      <div className="flex flex-col min-h-screen">
        {/* Top Navigation */}
        <AdminNavbar
          isCollapsed={isCollapsed}
          setMobileOpen={setMobileOpen}
        />

        {/* Content Area */}
        <main
          className={`flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300 ${
            isCollapsed ? 'md:ml-20' : 'md:ml-64'
          }`}
        >
          <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
