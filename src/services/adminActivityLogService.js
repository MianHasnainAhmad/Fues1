import api from './api';
import { mockAdminActivityLogs } from '../data/mockAdminData';

let logsState = [...mockAdminActivityLogs];

/**
 * Admin Activity & Audit Logs Service
 * Records are immutable in the UI.
 * DRF target endpoints:
 * - GET  /api/admin/activity-logs/
 * - POST /api/admin/activity-logs/
 */
export const adminActivityLogService = {
  getLogs: async (params = {}) => {
    await new Promise((res) => setTimeout(res, 200));
    let filtered = [...logsState];

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.adminName.toLowerCase().includes(q) ||
          l.action.toLowerCase().includes(q) ||
          l.target.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
      );
    }

    if (params.actionType && params.actionType !== 'all') {
      filtered = filtered.filter((l) => l.actionType === params.actionType);
    }

    return {
      results: filtered,
      count: filtered.length,
    };
  },

  logAction: async (action, target, description, actionType = 'info') => {
    const adminUser = JSON.parse(localStorage.getItem('fuse_admin_user') || '{}');
    const newLog = {
      id: 'act-' + Date.now(),
      adminName: adminUser.name || 'Admin',
      adminAvatar: adminUser.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
      action,
      actionType,
      target,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      ipAddress: '127.0.0.1 (Local Session)',
      description,
    };
    logsState = [newLog, ...logsState];
    return newLog;
  },
};

export default adminActivityLogService;
