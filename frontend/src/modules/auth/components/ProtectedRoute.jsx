import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token, loading, getDashboardRoute, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gov-primary/20 border-t-gov-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium">Verifying Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const isCitizenDashboardRoute = ['/dashboard', '/citizen/dashboard'].includes(location.pathname);

    if (isCitizenDashboardRoute && isAuthenticated) {
      return children;
    }

    return <Navigate to={getDashboardRoute()} replace />;
  }

  return children;
};

export default ProtectedRoute;
