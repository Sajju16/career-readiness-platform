import axiosInstance from '../utils/axiosInstance';

const analyzeResume = async () => {
  const response = await axiosInstance.post('/api/analysis/analyze');
  return response.data;
};

const getAnalysis = async () => {
  const response = await axiosInstance.get('/api/analysis/me');
  return response.data;
};

export default {
  analyzeResume,
  getAnalysis
};
