import { mockIdeas } from '../data/mockIdeas';

const STORAGE_KEY = 'fuse_ideas_data';

const getStoredIdeas = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return mockIdeas;
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockIdeas));
  return mockIdeas;
};

const saveStoredIdeas = (ideas) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
};

export const ideaService = {
  async getIdeas({ search = '', category = 'All Categories', stage = 'All Stages', connectionType = 'All Connection Types', sortBy = 'latest' } = {}) {
    await new Promise((r) => setTimeout(r, 250));
    let list = [...getStoredIdeas()].filter((i) => i.status === 'published');

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.shortDescription.toLowerCase().includes(q) ||
          i.requiredSkills.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'All Categories') {
      list = list.filter((i) => i.category === category);
    }

    if (stage && stage !== 'All Stages') {
      list = list.filter((i) => i.stage === stage);
    }

    if (connectionType && connectionType !== 'All Connection Types') {
      list = list.filter((i) => i.connectionType === connectionType);
    }

    if (sortBy === 'trending') {
      list.sort((a, b) => (b.likesCount + b.commentsCount * 2) - (a.likesCount + a.commentsCount * 2));
    } else if (sortBy === 'most-supported') {
      list.sort((a, b) => b.likesCount - a.likesCount);
    } else {
      // Default: latest
      list.sort((a, b) => b.id.localeCompare(a.id));
    }

    return list;
  },

  async getIdeaById(id) {
    await new Promise((r) => setTimeout(r, 200));
    const all = getStoredIdeas();
    const found = all.find((i) => i.id === id);
    if (!found) throw new Error('Idea not found');
    return found;
  },

  async getMyIdeas() {
    await new Promise((r) => setTimeout(r, 200));
    const all = getStoredIdeas();
    return all.filter((i) => i.creator.id === 'me');
  },

  async getSavedIdeas() {
    await new Promise((r) => setTimeout(r, 200));
    const all = getStoredIdeas();
    return all.filter((i) => i.isSaved);
  },

  async createIdea(newIdeaData, author) {
    await new Promise((r) => setTimeout(r, 400));
    const all = getStoredIdeas();
    const newId = `idea-${Date.now()}`;
    const newIdea = {
      id: newId,
      title: newIdeaData.title,
      shortDescription: newIdeaData.shortDescription,
      detailedDescription: newIdeaData.detailedDescription,
      category: newIdeaData.category || 'Tech & AI',
      stage: newIdeaData.stage || 'Just an idea',
      connectionType: newIdeaData.connectionType || 'Co-founder',
      commitment: newIdeaData.commitment || 'Part-time',
      requiredSkills: Array.isArray(newIdeaData.requiredSkills)
        ? newIdeaData.requiredSkills
        : (newIdeaData.requiredSkills || '').split(',').map((s) => s.trim()).filter(Boolean),
      likesCount: 0,
      isLiked: false,
      commentsCount: 0,
      isSaved: false,
      viewsCount: 1,
      status: newIdeaData.status || 'published',
      createdAt: 'Just now',
      targetHelpDescription: newIdeaData.targetHelpDescription || '',
      creator: {
        id: author?.id || 'me',
        name: author?.name || 'Alex Morgan',
        handle: author?.handle || '@alexmorgan',
        avatar: author?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        title: author?.title || 'Product Builder',
        reputationScore: author?.reputationScore || 97,
      },
      comments: [],
    };

    all.unshift(newIdea);
    saveStoredIdeas(all);
    return newIdea;
  },

  async toggleLike(id) {
    const all = getStoredIdeas();
    const idx = all.findIndex((i) => i.id === id);
    if (idx !== -1) {
      const item = all[idx];
      const nextLiked = !item.isLiked;
      all[idx] = {
        ...item,
        isLiked: nextLiked,
        likesCount: nextLiked ? item.likesCount + 1 : Math.max(0, item.likesCount - 1),
      };
      saveStoredIdeas(all);
      return all[idx];
    }
    throw new Error('Idea not found');
  },

  async toggleSave(id) {
    const all = getStoredIdeas();
    const idx = all.findIndex((i) => i.id === id);
    if (idx !== -1) {
      all[idx] = {
        ...all[idx],
        isSaved: !all[idx].isSaved,
      };
      saveStoredIdeas(all);
      return all[idx];
    }
    throw new Error('Idea not found');
  },

  async addComment(id, text, author) {
    const all = getStoredIdeas();
    const idx = all.findIndex((i) => i.id === id);
    if (idx !== -1) {
      const newComment = {
        id: `c-${Date.now()}`,
        author: {
          name: author.name,
          avatar: author.avatar,
          handle: author.handle,
        },
        createdAt: 'Just now',
        content: text,
      };
      all[idx].comments = [newComment, ...(all[idx].comments || [])];
      all[idx].commentsCount = (all[idx].commentsCount || 0) + 1;
      saveStoredIdeas(all);
      return newComment;
    }
    throw new Error('Idea not found');
  },

  async deleteIdea(id) {
    const all = getStoredIdeas();
    const filtered = all.filter((i) => i.id !== id);
    saveStoredIdeas(filtered);
    return true;
  },

  async updateIdeaStatus(id, newStatus) {
    const all = getStoredIdeas();
    const idx = all.findIndex((i) => i.id === id);
    if (idx !== -1) {
      all[idx].status = newStatus;
      saveStoredIdeas(all);
      return all[idx];
    }
    throw new Error('Idea not found');
  }
};
