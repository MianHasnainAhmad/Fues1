import { mockConversations } from '../data/mockMessages';

const STORAGE_CONVS = 'fuse_conversations_data';

const getStoredConversations = () => {
  const raw = localStorage.getItem(STORAGE_CONVS);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return mockConversations;
    }
  }
  localStorage.setItem(STORAGE_CONVS, JSON.stringify(mockConversations));
  return mockConversations;
};

const saveConversations = (convs) => {
  localStorage.setItem(STORAGE_CONVS, JSON.stringify(convs));
};

export const messageService = {
  async getConversations() {
    await new Promise((r) => setTimeout(r, 150));
    return getStoredConversations();
  },

  async sendMessage(conversationId, text) {
    const list = getStoredConversations();
    const idx = list.findIndex((c) => c.id === conversationId);
    if (idx !== -1) {
      const newMsg = {
        id: `m-${Date.now()}`,
        senderId: 'me',
        text,
        timestamp: 'Just now',
        isMe: true,
      };
      list[idx].messages.push(newMsg);
      list[idx].lastMessage = text;
      list[idx].lastMessageTime = 'Just now';
      saveConversations(list);
      return newMsg;
    }
    throw new Error('Conversation not found');
  }
};
