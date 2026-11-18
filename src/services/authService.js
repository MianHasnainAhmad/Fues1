import { currentMockUser } from '../data/mockUsers';

// Storage key
const AUTH_USER_KEY = 'fuse_auth_user';
const TOKEN_KEY = 'fuse_access_token';

/**
 * Authentication Service
 * Pre-configured for Django REST Framework SimpleJWT endpoint structure:
 * - POST /api/auth/token/
 * - POST /api/auth/register/
 * - POST /api/auth/password-reset/
 */
export const authService = {
  async login(email, password) {
    // Simulated network delay
    await new Promise((r) => setTimeout(r, 600));

    // Mock validation
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const user = {
      ...currentMockUser,
      email: email,
    };
    const mockToken = 'mock-jwt-token-' + Date.now();
    localStorage.setItem(TOKEN_KEY, mockToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    return { user, token: mockToken };
  },

  async register({ name, email, password }) {
    await new Promise((r) => setTimeout(r, 700));

    if (!name || !email || !password) {
      throw new Error('All fields are required.');
    }

    const user = {
      ...currentMockUser,
      id: 'me-' + Date.now(),
      name,
      email,
      handle: '@' + name.toLowerCase().replace(/\s+/g, ''),
    };
    const mockToken = 'mock-jwt-token-' + Date.now();
    localStorage.setItem(TOKEN_KEY, mockToken);
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    return { user, token: mockToken };
  },

  async logout() {
    await new Promise((r) => setTimeout(r, 200));
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    return true;
  },

  async forgotPassword(email) {
    await new Promise((r) => setTimeout(r, 600));
    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    return { success: true, message: `Password reset instructions sent to ${email}` };
  },

  async resetPassword(newPassword) {
    await new Promise((r) => setTimeout(r, 600));
    if (!newPassword || newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }
    return { success: true, message: 'Password has been reset successfully.' };
  },

  getCurrentUser() {
    const raw = localStorage.getItem(AUTH_USER_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return currentMockUser;
      }
    }
    // Return mock logged in user by default for seamless instant testing
    return currentMockUser;
  },

  updateCurrentUser(updatedFields) {
    const current = this.getCurrentUser();
    const updated = { ...current, ...updatedFields };
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(updated));
    return updated;
  }
};
