import axiosInstance from '../utils/axiosInstance';

const analyzeResume = async () => {
  const response = await axiosInstance.post('/api/analysis/analyze');
  return response.data;
};

const getAnalysis = async () => {
  try {
    const response = await axiosInstance.get('/api/analysis/me');
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 404 || error.response.status === 400)) {
      return null;
    }
    throw error;
  }
};

export default {
  analyzeResume,
  getAnalysis
};
