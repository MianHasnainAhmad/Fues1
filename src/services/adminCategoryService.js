import api from './api';
import { mockAdminCategories, mockAdminSkills, mockAdminReputationReviews } from '../data/mockAdminData';

let categoriesState = [...mockAdminCategories];
let skillsState = [...mockAdminSkills];
let reviewsState = [...mockAdminReputationReviews];

/**
 * Admin Category, Skills & Reputation Management Service
 * DRF target endpoints:
 * - GET    /api/admin/categories/
 * - POST   /api/admin/categories/
 * - PATCH  /api/admin/categories/<id>/
 * - DELETE /api/admin/categories/<id>/
 * - GET    /api/admin/skills/
 * - POST   /api/admin/skills/
 * - DELETE /api/admin/skills/<id>/
 * - GET    /api/admin/reputation/reviews/
 */
export const adminCategoryService = {
  getCategories: async () => {
    await new Promise((res) => setTimeout(res, 200));
    return categoriesState;
  },

  createCategory: async (categoryData) => {
    await new Promise((res) => setTimeout(res, 250));
    const newCat = {
      id: 'cat-' + Date.now(),
      name: categoryData.name,
      slug: categoryData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ideasCount: 0,
      color: categoryData.color || '#635BFF',
      description: categoryData.description || '',
    };
    categoriesState = [...categoriesState, newCat];
    return newCat;
  },

  updateCategory: async (id, data) => {
    await new Promise((res) => setTimeout(res, 250));
    categoriesState = categoriesState.map((c) => (c.id === id ? { ...c, ...data } : c));
    return categoriesState.find((c) => c.id === id);
  },

  deleteCategory: async (id) => {
    await new Promise((res) => setTimeout(res, 250));
    categoriesState = categoriesState.filter((c) => c.id !== id);
    return { success: true };
  },

  getSkills: async () => {
    await new Promise((res) => setTimeout(res, 150));
    return skillsState;
  },

  createSkill: async (skillData) => {
    await new Promise((res) => setTimeout(res, 200));
    const newSkill = {
      id: 'sk-' + Date.now(),
      name: skillData.name,
      category: skillData.category || 'General',
      usersCount: 0,
    };
    skillsState = [...skillsState, newSkill];
    return newSkill;
  },

  deleteSkill: async (id) => {
    await new Promise((res) => setTimeout(res, 200));
    skillsState = skillsState.filter((s) => s.id !== id);
    return { success: true };
  },

  getReputationReviews: async () => {
    await new Promise((res) => setTimeout(res, 200));
    return reviewsState;
  },

  updateReviewStatus: async (id, status) => {
    await new Promise((res) => setTimeout(res, 200));
    reviewsState = reviewsState.map((r) => (r.id === id ? { ...r, status } : r));
    return { success: true, status };
  },
};

export default adminCategoryService;
