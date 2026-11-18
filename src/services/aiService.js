import { generateMockAIAnalysis } from '../data/mockAI';

/**
 * AI Service for Similarity Detection and Idea Augmentation
 * Structured to cleanly connect to a real Django REST Framework RAG endpoint:
 * - POST /api/ai/similarity/
 * - POST /api/ai/critique/
 */
export const aiService = {
  async analyzeIdea(ideaInput) {
    // Simulate real vector embedding and RAG retrieval latency
    await new Promise((r) => setTimeout(r, 1400));
    return generateMockAIAnalysis(ideaInput);
  }
};
