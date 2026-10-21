import axios from 'axios'

/**
 * Axios Instance - Pre-configured HTTP client
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
})

// Track active redirection to prevent multiple redirects on parallel 401s
let isRedirecting = false

// ---- Request Interceptor ----
// Attach JWT token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')

    // Do not attach token for auth routes to prevent unnecessary validation / CORS preflight issues
    if (token && !config.url?.includes('/auth/login') && !config.url?.includes('/auth/register')) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ---- Response Interceptor ----
// Handle 401 Unauthorized (expired token, invalid token, or unauthenticated request)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url || ''
      const isAuthRequest = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register')

      // Only handle session expiration for protected endpoints, not login/registration credential errors
      if (!isAuthRequest) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')

        // Guard against duplicate redirects if multiple concurrent requests fail
        if (!isRedirecting && !window.location.pathname.includes('/login')) {
          isRedirecting = true
          window.location.href = '/login?expired=true'
        }
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
