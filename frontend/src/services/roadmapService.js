/**
 * roadmapService.js
 * Milestone 7: Personalized Learning Roadmap API client
 */
import axiosInstance from '../utils/axiosInstance';

const roadmapService = {
  /**
   * Fetch the persisted roadmap for the current user.
   * Returns null if no roadmap has been generated yet.
   */
  getRoadmap: async () => {
    const response = await axiosInstance.get('/api/roadmap/me');
    return response.data;
  },

  /**
   * Trigger fresh roadmap generation from the AI service.
   * Requires the user to have already run analysis (missingSkills must exist).
   */
  generateRoadmap: async () => {
    const response = await axiosInstance.post('/api/roadmap/generate');
    return response.data;
  },
};

export default roadmapService;
