import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ShieldAlert } from 'lucide-react';

export const ProtectedAdminRoute = ({ children, requiredPermission, allowedRoles }) => {
  const { isAuthenticated, adminUser, hasPermission, role } = useAdminAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#0E0E0D] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-8 text-center shadow-lg space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#171717] dark:text-[#F5F5F0]">
            Restricted Admin Privilege
          </h2>
          <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] leading-relaxed">
            Your current role (<span className="font-semibold">{adminUser?.roleLabel || role}</span>) does not have authorization to view this admin sector.
          </p>
          <div className="pt-2">
            <a
              href="/admin/dashboard"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl bg-[#171717] text-white hover:bg-[#262626] transition-colors"
            >
              Return to Admin Dashboard
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] dark:bg-[#0E0E0D] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white dark:bg-[#1A1A19] border border-[#E8E7E0] dark:border-[#2B2B27] rounded-3xl p-8 text-center shadow-lg space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#171717] dark:text-[#F5F5F0]">
            Permission Denied
          </h2>
          <p className="text-xs text-[#71717A] dark:text-[#A8A8A2] leading-relaxed">
            You require the <code className="bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded text-[11px]">{requiredPermission}</code> permission to access this module.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedAdminRoute;
