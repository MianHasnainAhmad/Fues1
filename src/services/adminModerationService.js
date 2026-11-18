import api from './api';
import { mockModerationReports } from '../data/mockAdminData';

// In-memory working state
let reportsState = [...mockModerationReports];

/**
 * Admin Moderation Service
 * DRF target endpoints:
 * - GET   /api/admin/moderation/reports/
 * - GET   /api/admin/moderation/reports/<id>/
 * - POST  /api/admin/moderation/reports/<id>/resolve/
 * - POST  /api/admin/moderation/reports/<id>/dismiss/
 * - POST  /api/admin/moderation/reports/<id>/issue-warning/
 * - POST  /api/admin/moderation/reports/<id>/remove-content/
 */
export const adminModerationService = {
  getReports: async (params = {}) => {
    // DRF integration point:
    // const response = await api.get('/admin/moderation/reports/', { params });
    // return response.data;
    await new Promise((res) => setTimeout(res, 250));
    let filtered = [...reportsState];

    if (params.status && params.status !== 'all') {
      filtered = filtered.filter((r) => r.status === params.status);
    }

    if (params.priority && params.priority !== 'all') {
      filtered = filtered.filter((r) => r.priority === params.priority);
    }

    if (params.contentType && params.contentType !== 'all') {
      filtered = filtered.filter((r) => r.contentType === params.contentType);
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.reason.toLowerCase().includes(q) ||
          r.reporter.name.toLowerCase().includes(q) ||
          r.reportedUser.name.toLowerCase().includes(q) ||
          r.contentTitle.toLowerCase().includes(q)
      );
    }

    return {
      results: filtered,
      count: filtered.length,
      pendingCount: filtered.filter((r) => r.status === 'pending').length,
    };
  },

  getReportById: async (id) => {
    // DRF integration point:
    // const response = await api.get(`/admin/moderation/reports/${id}/`);
    await new Promise((res) => setTimeout(res, 200));
    const report = reportsState.find((r) => r.id === id);
    if (!report) throw new Error('Report not found');
    return report;
  },

  resolveReport: async (id, notes = '', actionTaken = '') => {
    // DRF integration point:
    // const response = await api.post(`/admin/moderation/reports/${id}/resolve/`, { notes, actionTaken });
    await new Promise((res) => setTimeout(res, 300));
    reportsState = reportsState.map((r) =>
      r.id === id ? { ...r, status: 'resolved', moderatorNotes: notes } : r
    );
    return { success: true, status: 'resolved' };
  },

  dismissReport: async (id, notes = '') => {
    // DRF integration point:
    // const response = await api.post(`/admin/moderation/reports/${id}/dismiss/`, { notes });
    await new Promise((res) => setTimeout(res, 300));
    reportsState = reportsState.map((r) =>
      r.id === id ? { ...r, status: 'dismissed', moderatorNotes: notes } : r
    );
    return { success: true, status: 'dismissed' };
  },

  issueWarning: async (id, warningText = '') => {
    // DRF integration point:
    // await api.post(`/admin/moderation/reports/${id}/issue-warning/`, { warningText });
    await new Promise((res) => setTimeout(res, 300));
    reportsState = reportsState.map((r) =>
      r.id === id
        ? {
            ...r,
            status: 'resolved',
            moderatorNotes: `Warning issued to user: "${warningText}"`,
          }
        : r
    );
    return { success: true };
  },

  removeContent: async (id) => {
    // DRF integration point:
    // await api.post(`/admin/moderation/reports/${id}/remove-content/`);
    await new Promise((res) => setTimeout(res, 300));
    reportsState = reportsState.map((r) =>
      r.id === id
        ? {
            ...r,
            status: 'resolved',
            moderatorNotes: 'Content removed permanently.',
          }
        : r
    );
    return { success: true };
  },
};

export default adminModerationService;
