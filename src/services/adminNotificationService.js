import api from './api';
import { mockAdminAnnouncements } from '../data/mockAdminData';

let announcementsState = [...mockAdminAnnouncements];

/**
 * Admin Notifications & Platform Announcements Service
 * DRF target endpoints:
 * - GET  /api/admin/announcements/
 * - POST /api/admin/announcements/
 * - DELETE /api/admin/announcements/<id>/
 */
export const adminNotificationService = {
  getAnnouncements: async () => {
    await new Promise((res) => setTimeout(res, 200));
    return announcementsState;
  },

  createAnnouncement: async (announcementData) => {
    // DRF integration point:
    // const response = await api.post('/admin/announcements/', announcementData);
    await new Promise((res) => setTimeout(res, 300));
    const newAnc = {
      id: 'anc-' + Date.now(),
      title: announcementData.title,
      content: announcementData.content,
      audience: announcementData.audience || 'All Users',
      type: announcementData.type || 'banner',
      status: 'active',
      sentAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      viewsCount: 0,
      clicksCount: 0,
    };
    announcementsState = [newAnc, ...announcementsState];
    return newAnc;
  },

  deleteAnnouncement: async (id) => {
    await new Promise((res) => setTimeout(res, 200));
    announcementsState = announcementsState.filter((a) => a.id !== id);
    return { success: true };
  },
};

export default adminNotificationService;
