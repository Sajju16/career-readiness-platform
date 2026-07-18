/**
 * Auth Service – Placeholder
 * Full implementation in Milestone 2.
 *
 * Will provide:
 *  - register(fullName, email, password) → POST /api/auth/register
 *  - login(email, password) → POST /api/auth/login
 *  - logout() → POST /api/auth/logout
 *  - refreshToken() → POST /api/auth/refresh
 */

import axiosInstance from '../utils/axiosInstance'

const authService = {
  register: async (fullName, email, password) => {
    const response = await axiosInstance.post('/api/auth/register', {
        fullName,
        email,
        password
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await axiosInstance.post('/api/auth/login', {
        email,
        password
    });
    return response.data;
  },

  logout: async () => {
    // In a real app with refresh tokens, you might call an endpoint here to invalidate the token.
    // For now, it's handled completely client side in AuthContext.
    return Promise.resolve();
  },

  refreshToken: async () => {
    throw new Error('Not implemented – coming later if needed')
  },
}

export default authService
