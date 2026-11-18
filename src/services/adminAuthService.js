import api from './api';
import { mockAdminUsers } from '../data/mockAdminData';

/**
 * Admin Authentication Service
 * Prepares Django REST Framework JWT authentication endpoints for administrative users.
 * DRF target endpoints:
 * - POST /api/admin/token/ (Obtain JWT with admin credentials)
 * - POST /api/admin/token/refresh/ (Refresh JWT token)
 * - GET  /api/admin/me/ (Get current admin profile & permissions)
 */
export const adminAuthService = {
  login: async (email, password, role = 'super_admin') => {
    // DRF real API integration point:
    // const response = await api.post('/admin/token/', { email, password });
    // return response.data;

    await new Promise((res) => setTimeout(res, 400));
    const matchedAdmin = mockAdminUsers.find(
      (a) => a.email.toLowerCase() === email.toLowerCase()
    ) || {
      id: 'adm-demo',
      name: email.split('@')[0].replace('.', ' '),
      email,
      role: role || 'super_admin',
      roleLabel: role === 'super_admin' ? 'Super Admin' : role === 'moderator' ? 'Community Moderator' : 'Platform Admin',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      status: 'active',
      department: 'Platform Administration',
      lastLogin: 'Just now',
      permissions: ['all'],
    };

    const mockToken = 'fuse_mock_admin_jwt_' + Math.random().toString(36).substring(2);
    return {
      admin: matchedAdmin,
      token: mockToken,
      refreshToken: 'fuse_mock_admin_refresh_' + Math.random().toString(36).substring(2),
    };
  },

  getCurrentAdmin: async () => {
    // DRF integration point:
    // const response = await api.get('/admin/me/');
    // return response.data;
    const stored = localStorage.getItem('fuse_admin_user');
    return stored ? JSON.parse(stored) : mockAdminUsers[0];
  },

  logout: async () => {
    // DRF integration point:
    // await api.post('/admin/logout/');
    localStorage.removeItem('fuse_admin_token');
    localStorage.removeItem('fuse_admin_user');
    return { success: true };
  },

  requestPasswordReset: async (email) => {
    // DRF integration point:
    // await api.post('/admin/password-reset/', { email });
    await new Promise((res) => setTimeout(res, 500));
    return { success: true, message: 'Admin password reset link sent to registered email' };
  },
};

export default adminAuthService;
