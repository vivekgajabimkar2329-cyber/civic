import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import tokenUtils from '../../common/utils/token';

const AuthContext = createContext();

/**
 * Role-to-route mapping - Single source of truth for post-login redirects.
 * Backend determines role; this mapping decides where to send the user.
 */
const ROLE_ROUTES = {
  user: '/dashboard',
  admin: '/admin/dashboard',
  super_admin: '/super-admin/dashboard',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    setLoading(true);
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setToken(null);
      setError(null);
      tokenUtils.clearAuthData();
      setLoading(false);
      navigate('/login', { replace: true });
    }
  }, [navigate]);

  /**
   * Initialize session from stored auth data on mount
   */
  useEffect(() => {
    const initSession = () => {
      try {
        const storedToken = tokenUtils.getToken();
        const storedUser = tokenUtils.getUser();

        if (storedToken) {
          if (tokenUtils.isTokenExpired(storedToken)) {
            const refreshToken = tokenUtils.getRefreshToken();
            if (refreshToken) {
              console.warn('Token expired. Session needs refresh.');
            }
            handleLogout();
            return;
          }

          let normalizedUser = storedUser;

          if (!normalizedUser) {
            const decoded = tokenUtils.decodeToken(storedToken);
            const decodedRole = decoded?.role || decoded?.user?.role || decoded?.roles?.[0];

            if (decodedRole) {
              normalizedUser = {
                _id: decoded.sub || decoded.userId || decoded.id || 'session-user',
                name: decoded.name || decoded.email || 'User',
                email: decoded.email || '',
                role: decodedRole,
              };
            }
          }

          if (normalizedUser) {
            tokenUtils.setAuthData({
              token: storedToken,
              refreshToken: tokenUtils.getRefreshToken(),
              user: normalizedUser,
            });
            setUser(normalizedUser);
            setToken(storedToken);
          } else {
            tokenUtils.clearAuthData();
          }
        }
      } catch (err) {
        console.error('Session initialization failed:', err);
        tokenUtils.clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    initSession();

    // Listen for custom logout events from axios interceptor (e.g., 401, refresh failure)
    const handleLogoutEvent = () => {
      console.warn('Auth logout event received from interceptor.');
      handleLogout();
    };

    window.addEventListener('auth:logout', handleLogoutEvent);
    return () => {
      window.removeEventListener('auth:logout', handleLogoutEvent);
    };
  }, [handleLogout]);

  /**
   * Login - calls backend (or mock) and handles redirect based on role.
   * NEVER accepts role from frontend - role comes from backend response only.
   */
  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await authService.login(email, password);

      if (data.success && data.token && data.user) {
        // Store auth data using centralized utility
        tokenUtils.setAuthData({
          token: data.token,
          refreshToken: data.refreshToken,
          user: data.user,
        });

        setUser(data.user);
        setToken(data.token);

        // Determine redirect route based on backend-provided role
        const targetRoute = ROLE_ROUTES[data.user.role];

        if (targetRoute) {
          // Small delay for smooth transition
          setTimeout(() => {
            navigate(targetRoute, { replace: true });
          }, 100);
        } else {
          // Unknown role - fallback to home
          console.warn(`Unknown role "${data.user.role}" - redirecting to home.`);
          navigate('/', { replace: true });
        }

        return data.user;
      } else {
        throw new Error(data.message || 'Authentication failed');
      }
    } catch (err) {
      const errMsg =
        err.response?.data?.message || err.message || 'Login failed. Please try again.';
      setError(errMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  /**
   * Check if user has a specific role (or any of the allowed roles)
   */
  const hasRole = useCallback(
    (allowedRoles) => {
      if (!user || !user.role) return false;
      if (Array.isArray(allowedRoles)) {
        return allowedRoles.includes(user.role);
      }
      return user.role === allowedRoles;
    },
    [user]
  );

  /**
   * Get the user's dashboard route based on their role
   */
  const getDashboardRoute = useCallback(() => {
    if (!user) return '/login';
    return ROLE_ROUTES[user.role] || '/';
  }, [user]);

  const value = {
    user,
    token,
    loading,
    error,
    login,
    logout: handleLogout,
    hasRole,
    getDashboardRoute,
    isAuthenticated: !!token && !!user && !tokenUtils.isTokenExpired(token),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
