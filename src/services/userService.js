import { mockUsers, currentMockUser } from '../data/mockUsers';

const STORAGE_USERS = 'fuse_users_data';

const getStoredUsers = () => {
  const raw = localStorage.getItem(STORAGE_USERS);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return mockUsers;
    }
  }
  localStorage.setItem(STORAGE_USERS, JSON.stringify(mockUsers));
  return mockUsers;
};

export const userService = {
  async getCollaborators({ search = '', skill = 'All', commitment = 'All', connectionType = 'All' } = {}) {
    await new Promise((r) => setTimeout(r, 200));
    let list = [...getStoredUsers()];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.bio.toLowerCase().includes(q) ||
          u.title.toLowerCase().includes(q) ||
          u.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (skill && skill !== 'All') {
      list = list.filter((u) => u.skills.some((s) => s.toLowerCase() === skill.toLowerCase()));
    }

    if (commitment && commitment !== 'All') {
      list = list.filter((u) => u.commitment.toLowerCase().includes(commitment.toLowerCase()));
    }

    if (connectionType && connectionType !== 'All') {
      list = list.filter((u) => u.connectionTypes && u.connectionTypes.includes(connectionType));
    }

    return list;
  },

  async getUserById(id) {
    await new Promise((r) => setTimeout(r, 150));
    if (id === 'me') {
      const stored = localStorage.getItem('fuse_auth_user');
      return stored ? JSON.parse(stored) : currentMockUser;
    }
    const all = getStoredUsers();
    const found = all.find((u) => u.id === id);
    if (!found) {
      // Return fallback user
      return {
        ...mockUsers[0],
        id,
        name: 'Collaborator',
        bio: 'Passionate innovator on Fuse.'
      };
    }
    return found;
  }
};
