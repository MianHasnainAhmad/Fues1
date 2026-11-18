import axios from 'axios';

/**
 * Centralized Axios API client configured for Django REST Framework (DRF)
 * with JWT authentication and standardized response handling.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor: inject JWT Bearer token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fuse_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle 401s, token expiration, etc.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('fuse_refresh_token');
      if (refreshToken) {
        try {
          // DRF SimpleJWT token refresh placeholder
          // const res = await axios.post(`${api.defaults.baseURL}/token/refresh/`, { refresh: refreshToken });
          // localStorage.setItem('fuse_access_token', res.data.access);
          // return api(originalRequest);
        } catch (refreshErr) {
          localStorage.removeItem('fuse_access_token');
          localStorage.removeItem('fuse_refresh_token');
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
