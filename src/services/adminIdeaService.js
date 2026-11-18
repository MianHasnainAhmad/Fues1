import api from './api';
import { mockAdminIdeas } from '../data/mockAdminData';

// In-memory working state
let ideasState = [...mockAdminIdeas];

/**
 * Admin Idea Management Service
 * DRF target endpoints:
 * - GET    /api/admin/ideas/
 * - GET    /api/admin/ideas/<id>/
 * - PATCH  /api/admin/ideas/<id>/
 * - POST   /api/admin/ideas/<id>/feature/
 * - POST   /api/admin/ideas/<id>/approve/
 * - POST   /api/admin/ideas/<id>/reject/
 * - POST   /api/admin/ideas/<id>/archive/
 * - DELETE /api/admin/ideas/<id>/
 */
export const adminIdeaService = {
  getIdeas: async (params = {}) => {
    // DRF integration point:
    // const response = await api.get('/admin/ideas/', { params });
    // return response.data;
    await new Promise((res) => setTimeout(res, 250));
    let filtered = [...ideasState];

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.creator.name.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      );
    }

    if (params.category && params.category !== 'all') {
      filtered = filtered.filter((i) => i.category === params.category);
    }

    if (params.stage && params.stage !== 'all') {
      filtered = filtered.filter((i) => i.stage === params.stage);
    }

    if (params.connectionType && params.connectionType !== 'all') {
      filtered = filtered.filter((i) => i.connectionType === params.connectionType);
    }

    if (params.status && params.status !== 'all') {
      filtered = filtered.filter((i) => i.status === params.status);
    }

    return {
      results: filtered,
      count: filtered.length,
    };
  },

  getIdeaById: async (id) => {
    // DRF integration point:
    // const response = await api.get(`/admin/ideas/${id}/`);
    // return response.data;
    await new Promise((res) => setTimeout(res, 200));
    const idea = ideasState.find((i) => i.id === id);
    if (!idea) throw new Error('Idea not found');
    return idea;
  },

  toggleFeature: async (id) => {
    // DRF integration point:
    // const response = await api.post(`/admin/ideas/${id}/feature/`);
    // return response.data;
    await new Promise((res) => setTimeout(res, 250));
    ideasState = ideasState.map((i) =>
      i.id === id ? { ...i, isFeatured: !i.isFeatured } : i
    );
    const updated = ideasState.find((i) => i.id === id);
    return { success: true, isFeatured: updated.isFeatured };
  },

  approveIdea: async (id) => {
    // DRF integration point:
    // const response = await api.post(`/admin/ideas/${id}/approve/`);
    await new Promise((res) => setTimeout(res, 250));
    ideasState = ideasState.map((i) =>
      i.id === id ? { ...i, status: 'published', moderationStatus: 'approved' } : i
    );
    return { success: true, status: 'published' };
  },

  rejectIdea: async (id, reason = '') => {
    // DRF integration point:
    // const response = await api.post(`/admin/ideas/${id}/reject/`, { reason });
    await new Promise((res) => setTimeout(res, 250));
    ideasState = ideasState.map((i) =>
      i.id === id ? { ...i, status: 'rejected', moderationStatus: 'rejected' } : i
    );
    return { success: true, status: 'rejected' };
  },

  archiveIdea: async (id) => {
    // DRF integration point:
    // const response = await api.post(`/admin/ideas/${id}/archive/`);
    await new Promise((res) => setTimeout(res, 250));
    ideasState = ideasState.map((i) =>
      i.id === id ? { ...i, status: 'archived' } : i
    );
    return { success: true, status: 'archived' };
  },

  deleteIdea: async (id) => {
    // DRF integration point:
    // await api.delete(`/admin/ideas/${id}/`);
    await new Promise((res) => setTimeout(res, 300));
    ideasState = ideasState.filter((i) => i.id !== id);
    return { success: true };
  },
};

export default adminIdeaService;
