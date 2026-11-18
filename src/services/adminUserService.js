import api from './api';
import { mockPlatformUsers } from '../data/mockAdminData';

/**
 * Admin User Management Service
 * DRF target endpoints:
 * - GET    /api/admin/users/ (paginated, filtered, searchable)
 * - GET    /api/admin/users/<id>/
 * - PATCH  /api/admin/users/<id>/ (update status, edit details)
 * - POST   /api/admin/users/<id>/suspend/
 * - POST   /api/admin/users/<id>/activate/
 * - POST   /api/admin/users/<id>/restrict/
 * - DELETE /api/admin/users/<id>/
 */

// In-memory working state
let usersState = [...mockPlatformUsers];

export const adminUserService = {
  getUsers: async (params = {}) => {
    // DRF integration point:
    // const response = await api.get('/admin/users/', { params });
    // return response.data;

    await new Promise((res) => setTimeout(res, 250));
    let filtered = [...usersState];

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          u.handle.toLowerCase().includes(q)
      );
    }

    if (params.status && params.status !== 'all') {
      filtered = filtered.filter((u) => u.accountStatus === params.status);
    }

    if (params.role && params.role !== 'all') {
      filtered = filtered.filter((u) => u.role.toLowerCase() === params.role.toLowerCase());
    }

    return {
      results: filtered,
      count: filtered.length,
    };
  },

  getUserById: async (id) => {
    // DRF integration point:
    // const response = await api.get(`/admin/users/${id}/`);
    // return response.data;
    await new Promise((res) => setTimeout(res, 200));
    const user = usersState.find((u) => u.id === id);
    if (!user) throw new Error('User not found');
    return user;
  },

  updateUser: async (id, payload) => {
    // DRF integration point:
    // const response = await api.patch(`/admin/users/${id}/`, payload);
    // return response.data;
    await new Promise((res) => setTimeout(res, 300));
    usersState = usersState.map((u) => (u.id === id ? { ...u, ...payload } : u));
    return usersState.find((u) => u.id === id);
  },

  suspendUser: async (id, reason = '') => {
    // DRF integration point:
    // const response = await api.post(`/admin/users/${id}/suspend/`, { reason });
    // return response.data;
    await new Promise((res) => setTimeout(res, 300));
    usersState = usersState.map((u) =>
      u.id === id ? { ...u, accountStatus: 'suspended' } : u
    );
    return { success: true, status: 'suspended' };
  },

  activateUser: async (id) => {
    // DRF integration point:
    // const response = await api.post(`/admin/users/${id}/activate/`);
    // return response.data;
    await new Promise((res) => setTimeout(res, 300));
    usersState = usersState.map((u) =>
      u.id === id ? { ...u, accountStatus: 'active' } : u
    );
    return { success: true, status: 'active' };
  },

  restrictUser: async (id, days = 7) => {
    // DRF integration point:
    // const response = await api.post(`/admin/users/${id}/restrict/`, { days });
    // return response.data;
    await new Promise((res) => setTimeout(res, 300));
    usersState = usersState.map((u) =>
      u.id === id ? { ...u, accountStatus: 'restricted' } : u
    );
    return { success: true, status: 'restricted' };
  },

  deleteUser: async (id) => {
    // DRF integration point:
    // await api.delete(`/admin/users/${id}/`);
    await new Promise((res) => setTimeout(res, 350));
    usersState = usersState.filter((u) => u.id !== id);
    return { success: true };
  },
};

export default adminUserService;
