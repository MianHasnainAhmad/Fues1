import api from './api';
import { mockAdminTeams } from '../data/mockAdminData';

let teamsState = [...mockAdminTeams];

/**
 * Admin Team Management Service
 * DRF target endpoints:
 * - GET   /api/admin/teams/
 * - GET   /api/admin/teams/<id>/
 * - POST  /api/admin/teams/<id>/archive/
 * - POST  /api/admin/teams/<id>/restrict/
 */
export const adminTeamService = {
  getTeams: async (params = {}) => {
    // DRF integration point:
    // const response = await api.get('/admin/teams/', { params });
    await new Promise((res) => setTimeout(res, 200));
    let filtered = [...teamsState];

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.owner.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    if (params.status && params.status !== 'all') {
      filtered = filtered.filter((t) => t.status === params.status);
    }

    if (params.stage && params.stage !== 'all') {
      filtered = filtered.filter((t) => t.currentStage === params.stage);
    }

    return {
      results: filtered,
      count: filtered.length,
    };
  },

  getTeamById: async (id) => {
    await new Promise((res) => setTimeout(res, 200));
    const team = teamsState.find((t) => t.id === id);
    if (!team) throw new Error('Team not found');
    return team;
  },

  archiveTeam: async (id) => {
    await new Promise((res) => setTimeout(res, 250));
    teamsState = teamsState.map((t) => (t.id === id ? { ...t, status: 'archived' } : t));
    return { success: true, status: 'archived' };
  },

  restrictTeam: async (id) => {
    await new Promise((res) => setTimeout(res, 250));
    teamsState = teamsState.map((t) => (t.id === id ? { ...t, status: 'restricted' } : t));
    return { success: true, status: 'restricted' };
  },
};

export default adminTeamService;
