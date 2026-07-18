/**
 * Career Goal Service – Placeholder
 * Full implementation in Milestone 2.
 *
 * Will provide:
 *  - getGoals() → GET /api/career-goals
 *  - createGoal(data) → POST /api/career-goals
 *  - updateGoal(id, data) → PUT /api/career-goals/{id}
 *  - deleteGoal(id) → DELETE /api/career-goals/{id}
 */

import axiosInstance from '../utils/axiosInstance';

const careerGoalService = {
  getGoal: async () => {
    try {
      const response = await axiosInstance.get('/api/career-goals/me');
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return null; // Handle not found gracefully, just means no goal is set yet
      }
      throw error;
    }
  },
  saveGoal: async (data) => {
    const response = await axiosInstance.post('/api/career-goals', data);
    return response.data;
  },
  deleteGoal: async () => {
    const response = await axiosInstance.delete('/api/career-goals/me');
    return response.data;
  }
}

export default careerGoalService
