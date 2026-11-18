import api from './api';
import { mockAdminCollaborations } from '../data/mockAdminData';

let collabsState = [...mockAdminCollaborations];

/**
 * Admin Collaboration Requests Service
 * DRF target endpoints:
 * - GET /api/admin/collaborations/
 * - GET /api/admin/collaborations/<id>/
 */
export const adminCollaborationService = {
  getCollaborations: async (params = {}) => {
    // DRF integration point:
    // const response = await api.get('/admin/collaborations/', { params });
    // return response.data;
    await new Promise((res) => setTimeout(res, 200));
    let filtered = [...collabsState];

    if (params.status && params.status !== 'all') {
      filtered = filtered.filter((c) => c.status === params.status);
    }

    if (params.connectionType && params.connectionType !== 'all') {
      filtered = filtered.filter((c) => c.connectionType === params.connectionType);
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.ideaTitle.toLowerCase().includes(q) ||
          c.owner.name.toLowerCase().includes(q) ||
          c.requester.name.toLowerCase().includes(q)
      );
    }

    return {
      results: filtered,
      count: filtered.length,
    };
  },

  getCollaborationById: async (id) => {
    await new Promise((res) => setTimeout(res, 150));
    const collab = collabsState.find((c) => c.id === id);
    if (!collab) throw new Error('Collaboration request not found');
    return collab;
  },
};

export default adminCollaborationService;
