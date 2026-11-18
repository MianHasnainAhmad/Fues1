import { mockNotifications, mockCollaborationRequests } from '../data/mockNotifications';

const STORAGE_NOTIFS = 'fuse_notifs_data';
const STORAGE_REQUESTS = 'fuse_collab_requests_data';

const getStoredNotifs = () => {
  const raw = localStorage.getItem(STORAGE_NOTIFS);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return mockNotifications;
    }
  }
  localStorage.setItem(STORAGE_NOTIFS, JSON.stringify(mockNotifications));
  return mockNotifications;
};

const getStoredRequests = () => {
  const raw = localStorage.getItem(STORAGE_REQUESTS);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return mockCollaborationRequests;
    }
  }
  localStorage.setItem(STORAGE_REQUESTS, JSON.stringify(mockCollaborationRequests));
  return mockCollaborationRequests;
};

export const notificationService = {
  async getNotifications() {
    await new Promise((r) => setTimeout(r, 150));
    return getStoredNotifs();
  },

  async markAsRead(id) {
    const list = getStoredNotifs().map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem(STORAGE_NOTIFS, JSON.stringify(list));
    return list;
  },

  async markAllAsRead() {
    const list = getStoredNotifs().map((n) => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_NOTIFS, JSON.stringify(list));
    return list;
  },

  async getRequests() {
    await new Promise((r) => setTimeout(r, 200));
    return getStoredRequests();
  },

  async respondToRequest(requestId, status) {
    // status: 'accepted' | 'rejected' | 'cancelled'
    const list = getStoredRequests().map((req) =>
      req.id === requestId ? { ...req, status } : req
    );
    localStorage.setItem(STORAGE_REQUESTS, JSON.stringify(list));
    return list.find((r) => r.id === requestId);
  },

  async sendCollaborationRequest(requestData, sender) {
    const list = getStoredRequests();
    const newReq = {
      id: `req-${Date.now()}`,
      direction: 'sent',
      ideaId: requestData.ideaId || 'idea-general',
      ideaTitle: requestData.ideaTitle || 'General Collaboration',
      recipient: requestData.recipient,
      connectionType: requestData.connectionType || 'Skill contribution',
      commitmentProposed: requestData.commitmentProposed || 'Casual',
      message: requestData.message,
      status: 'pending',
      createdAt: 'Just now',
    };
    list.unshift(newReq);
    localStorage.setItem(STORAGE_REQUESTS, JSON.stringify(list));
    return newReq;
  }
};
