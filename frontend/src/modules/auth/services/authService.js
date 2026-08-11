import api from '../../common/services/api';

/**
 * Mock mode is enabled by default for local frontend demos so the login page
 * does not call a missing localhost backend. Set VITE_FORCE_MOCK_AUTH=false
 * when the real backend is running.
 */
const FORCE_MOCK = import.meta.env.VITE_FORCE_MOCK_AUTH !== 'false';

/**
 * Mock user database.
 * Roles follow the PRD spec: 'user', 'admin', 'super_admin'
 * Backend is the sole source of truth for roles.
 */
const MOCK_USERS = {
  'citizen@civic.gov': {
    _id: 'c1',
    name: 'Ramesh Kumar',
    email: 'citizen@civic.gov',
    role: 'user',
  },
  'admin@civic.gov': {
    _id: 'a1',
    name: 'Dr. Sunita Sharma',
    email: 'admin@civic.gov',
    role: 'admin',
  },
  'super@civic.gov': {
    _id: 's1',
    name: 'Super Administrator',
    email: 'super@civic.gov',
    role: 'super_admin',
  },
};

export const authService = {
  /**
   * Authenticate user with email and password.
   * Role is determined SOLELY by the backend - never passed from frontend.
   */
  login: async (email, password) => {
    if (FORCE_MOCK) {
      return authService.mockLogin(email, password);
    }

    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  /**
   * Mock login for development/testing.
   * Simulates backend response - role comes from server (mock DB), not user input.
   */
  mockLogin: async (email, password) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const lowerEmail = email.toLowerCase().trim();

    // Check if email matches a known mock user
    const matchedUser = MOCK_USERS[lowerEmail];

    if (matchedUser) {
      // Validate password (any valid password pattern works for mock)
      if (
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password)
      ) {
        return {
          success: true,
          message: 'Login Successful',
          token: `mock_jwt_${matchedUser.role}_token_${Date.now()}`,
          refreshToken: `mock_refresh_${matchedUser.role}_token_${Date.now()}`,
          user: {
            _id: matchedUser._id,
            name: matchedUser.name,
            email: matchedUser.email,
            role: matchedUser.role,
          },
        };
      }
    }

    const error = new Error('Invalid credentials. Please check your email and password.');
    error.response = {
      status: 401,
      data: {
        success: false,
        message:
          'Invalid credentials. Hint: In mock mode use citizen@civic.gov / admin@civic.gov / super@civic.gov with Password@123',
      },
    };
    throw error;
  },

  /**
   * Logout - clear tokens and notify backend if online
   */
  logout: async () => {
    try {
      if (!FORCE_MOCK) {
        await api.post('/auth/logout');
      }
    } catch (e) {
      console.error('Logout request failed', e);
    }
  },

  /**
   * Get stored user from localStorage
   */
  getCurrentUser: () => {
    try {
      const userJson = localStorage.getItem('civic_user');
      return userJson ? JSON.parse(userJson) : null;
    } catch {
      return null;
    }
  },

  /**
   * Get stored token from localStorage
   */
  getToken: () => {
    return localStorage.getItem('civic_token');
  },
};

export default authService;
