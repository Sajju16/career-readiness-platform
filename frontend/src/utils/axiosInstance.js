import axios from 'axios'

/**
 * Axios Instance – Pre-configured HTTP client
 *
 * Milestone 1: Base URL and placeholder structure.
 * Milestone 2 additions:
 *  - JWT Bearer token injection via request interceptor
 *  - 401 response interceptor to trigger token refresh
 *  - Redirect to /login on refresh failure
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

// ---- Request Interceptor ----
// Attach JWT token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ---- Response Interceptor ----
// Handle 401 – trigger token refresh (or logout for now)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config.url.includes('/auth/login')) {
        // For Milestone 2, we just clear the token and reload to force login
        // In a real app, you would attempt a refresh token flow here
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
