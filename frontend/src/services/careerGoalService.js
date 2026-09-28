import axiosInstance from '../utils/axiosInstance';

const careerGoalService = {
  getGoal: async () => {
    try {
      const response = await axiosInstance.get('/api/career-goals/me');
      return response.data;
    } catch (error) {
      if (error.response && (error.response.status === 404 || error.response.status === 400)) {
        return null;
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

export default careerGoalService;
