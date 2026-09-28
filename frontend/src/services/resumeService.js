import axiosInstance from '../utils/axiosInstance';

const resumeService = {
  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await axiosInstance.post('/api/resumes/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  getResume: async () => {
    try {
      const response = await axiosInstance.get('/api/resumes/me');
      return response.data;
    } catch (error) {
      if (error.response && (error.response.status === 404 || error.response.status === 400)) {
        return null;
      }
      throw error;
    }
  },
  deleteResume: async () => {
    const response = await axiosInstance.delete('/api/resumes/me');
    return response.data;
  }
}

export default resumeService;
