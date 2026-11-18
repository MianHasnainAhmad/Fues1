import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminAuthService } from '../services/adminAuthService';
import { mockAdminUsers } from '../data/mockAdminData';
import toast from 'react-hot-toast';

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const stored = localStorage.getItem('fuse_admin_user');
      return stored ? JSON.parse(stored) : mockAdminUsers[0]; // Default to Elena (Super Admin) for seamless demo inspection
    } catch {
      return mockAdminUsers[0];
    }
  });

  const [adminToken, setAdminToken] = useState(() => {
    return localStorage.getItem('fuse_admin_token') || 'demo_admin_jwt_session';
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('fuse_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('fuse_admin_user');
    }
  }, [adminUser]);

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem('fuse_admin_token', adminToken);
    } else {
      localStorage.removeItem('fuse_admin_token');
    }
  }, [adminToken]);

  const loginAdmin = async (email, password, role = 'super_admin') => {
    setLoading(true);
    try {
      const res = await adminAuthService.login(email, password, role);
      setAdminUser(res.admin);
      setAdminToken(res.token);
      toast.success(`Welcome back, ${res.admin.name}`);
      return res.admin;
    } catch (err) {
      toast.error('Admin authentication failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logoutAdmin = async () => {
    try {
      await adminAuthService.logout();
    } finally {
      setAdminUser(null);
      setAdminToken(null);
      toast.success('Admin session ended');
    }
  };

  const switchRole = (newRole) => {
    const matched = mockAdminUsers.find((u) => u.role === newRole) || {
      ...adminUser,
      role: newRole,
      roleLabel: newRole === 'super_admin' ? 'Super Admin' : newRole === 'moderator' ? 'Community Moderator' : 'Platform Admin',
    };
    setAdminUser(matched);
    toast.success(`Switched active admin role to ${matched.roleLabel}`);
  };

  const hasPermission = (permission) => {
    if (!adminUser) return false;
    if (adminUser.role === 'super_admin') return true;
    if (adminUser.permissions?.includes('all')) return true;
    return adminUser.permissions?.includes(permission);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        adminToken,
        isAuthenticated: !!adminUser && !!adminToken,
        role: adminUser?.role || 'super_admin',
        loading,
        loginAdmin,
        logoutAdmin,
        switchRole,
        hasPermission,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export default AdminAuthContext;
