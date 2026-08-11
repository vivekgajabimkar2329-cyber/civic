/**
 * Token Management Utilities
 * Handles JWT token storage, retrieval, and decoding
 */

const TOKEN_KEY = 'civic_token';
const REFRESH_TOKEN_KEY = 'civic_refresh_token';
const USER_KEY = 'civic_user';

export const tokenUtils = {
  /**
   * Store authentication tokens and user data
   */
  setAuthData: ({ token, refreshToken, user }) => {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  /**
   * Get stored JWT token
   */
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Get stored refresh token
   */
  getRefreshToken: () => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  /**
   * Get stored user object
   */
  getUser: () => {
    const userJson = localStorage.getItem(USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },

  /**
   * Decode JWT token payload (without verification - client-side only)
   * Returns null if token is invalid/expired
   */
  decodeToken: (token) => {
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      const decoded = JSON.parse(atob(payload));
      return decoded;
    } catch {
      return null;
    }
  },

  /**
   * Check if token is expired
   */
  isTokenExpired: (token) => {
    const decoded = tokenUtils.decodeToken(token);
    if (!decoded) return false;
    if (!decoded.exp) return false;
    // Check if expired (with 5 second buffer)
    return Date.now() >= decoded.exp * 1000 - 5000;
  },

  /**
   * Check if user is authenticated (has valid token)
   */
  isAuthenticated: () => {
    const token = tokenUtils.getToken();
    return !!token && !tokenUtils.isTokenExpired(token);
  },

  /**
   * Clear all stored auth data (logout)
   */
  clearAuthData: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export default tokenUtils;

