import api from './api';
import { mockAdminAIAnalyses } from '../data/mockAdminData';

/**
 * Admin AI System & RAG Monitoring Service
 * DRF target endpoints:
 * - GET /api/admin/ai/metrics/
 * - GET /api/admin/ai/analyses/
 * - GET /api/admin/ai/analyses/<id>/
 */
export const adminAIService = {
  getAIMetrics: async () => {
    // DRF integration point:
    // const response = await api.get('/admin/ai/metrics/');
    await new Promise((res) => setTimeout(res, 200));
    return {
      totalAnalyses: 1890,
      successRate: '99.2%',
      failedAnalyses: 15,
      averageLatencyMs: 420,
      vectorEmbeddingModel: 'text-embedding-3-small (1536 dim)',
      vectorDatabase: 'PostgreSQL + pgvector',
      totalIndexedIdeaVectors: 218,
    };
  },

  getAnalysesHistory: async (params = {}) => {
    // DRF integration point:
    // const response = await api.get('/admin/ai/analyses/', { params });
    await new Promise((res) => setTimeout(res, 250));
    let filtered = [...mockAdminAIAnalyses];

    if (params.status && params.status !== 'all') {
      filtered = filtered.filter((a) => a.status === params.status);
    }

    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.ideaTitle.toLowerCase().includes(q) ||
          a.user.name.toLowerCase().includes(q) ||
          a.categoryDetected.toLowerCase().includes(q)
      );
    }

    return {
      results: filtered,
      count: filtered.length,
    };
  },

  getAnalysisById: async (id) => {
    await new Promise((res) => setTimeout(res, 150));
    const analysis = mockAdminAIAnalyses.find((a) => a.id === id);
    if (!analysis) throw new Error('AI analysis record not found');
    return analysis;
  },
};

export default adminAIService;
