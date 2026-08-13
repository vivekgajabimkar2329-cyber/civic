import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AdminLayout from '../modules/common/layouts/AdminLayout';
import AdminCivicLayout from '../modules/common/layouts/AdminCivicLayout';
import SuperAdminLayout from '../modules/common/layouts/SuperAdminLayout';
import PublicLayout from '../modules/common/layouts/PublicLayout';
import { Home } from '../modules/common/pages/Home';
import About from '../modules/common/pages/About';
import { Services } from '../modules/common/pages/Services';
import { Departments as PublicDepartments } from '../modules/common/pages/Departments';
import { ReportIssue as MainReportIssue } from '../modules/common/pages/ReportIssue';

// Pages
import AdminDashboard from '../modules/admin/pages/AdminDashboard';
import Complaints from '../modules/admin/pages/Complaints';
import Departments from '../modules/admin/pages/Departments';
import Officers from '../modules/admin/pages/Officers';
import Citizens from '../modules/admin/pages/Citizens';
import Analytics from '../modules/admin/pages/Analytics';
import Reports from '../modules/admin/pages/Reports';
import AdminNotifications from '../modules/admin/pages/Notifications';
import AdminSettings from '../modules/admin/pages/Settings';
import AuditLogs from '../modules/admin/pages/AuditLogs';
import AISuggestions from '../modules/admin/pages/AISuggestions';
import HelpCenter from '../modules/admin/pages/HelpCenter';

// Citizen Pages
import CitizenLayout from '../modules/common/layouts/CitizenLayout';
import CitizenDashboard from '../modules/citizen/pages/CitizenDashboard';
import ReportIssue from '../modules/citizen/pages/ReportIssue';
import TrackComplaint from '../modules/citizen/pages/TrackComplaint';
import ComplaintDetails from '../modules/citizen/pages/ComplaintDetails';
import NearbyComplaints from '../modules/citizen/pages/NearbyComplaints';
import CitizenNotifications from '../modules/citizen/pages/Notifications';
import Profile from '../modules/citizen/pages/Profile';
import CitizenSettings from '../modules/citizen/pages/Settings';
import Feedback from '../modules/citizen/pages/Feedback';

// New Dashboard Pages
import NewAdminDashboard from '../modules/admin/pages/Dashboard';

// Authentication Pages & Guards
import Login from '../modules/auth/pages/Login';
import ForgotPassword from '../modules/auth/pages/ForgotPassword';
import SuperAdminDashboard from '../modules/superadmin/pages/SuperAdminDashboard';
import SuperAdminUsers from '../modules/superadmin/pages/SuperAdminUsers';
import SuperAdminAdmins from '../modules/superadmin/pages/SuperAdminAdmins';
import SuperAdminDepartments from '../modules/superadmin/pages/SuperAdminDepartments';
import SuperAdminComplaints from '../modules/superadmin/pages/SuperAdminComplaints';
import SuperAdminRoles from '../modules/superadmin/pages/SuperAdminRoles';
import SuperAdminSecurity from '../modules/superadmin/pages/SuperAdminSecurity';
import SuperAdminReports from '../modules/superadmin/pages/SuperAdminReports';
import SuperAdminAuditLogs from '../modules/superadmin/pages/SuperAdminAuditLogs';
import SuperAdminHealth from '../modules/superadmin/pages/SuperAdminHealth';
import SuperAdminSettings from '../modules/superadmin/pages/SuperAdminSettings';
import AccessDenied from '../modules/common/pages/AccessDenied';
import ProtectedRoute from '../modules/auth/components/ProtectedRoute';
import { useAuth } from '../modules/auth/context/AuthContext';

// Placeholders for routes without explicit layouts right now
const Placeholder = ({ title }) => <div className="p-8"><h1>{title}</h1></div>;

const AppRoutes = () => {
  const { token, user, loading, getDashboardRoute } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
          <p className="mt-4 text-sm font-medium text-slate-600">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (token && user) {
    // Signed-in users should leave public entry pages for their role dashboard.
    if (user.role === 'user' && ['/login'].includes(location.pathname)) {
      return <Navigate to={getDashboardRoute()} replace />;
    }
    // Admin and super admin should always land on their dashboards.
    if (user.role !== 'user' && ['/login'].includes(location.pathname)) {
      return <Navigate to={getDashboardRoute()} replace />;
    }
  }

  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/help" element={<div className="p-20 text-center"><h1 className="text-3xl font-bold text-slate-800">Help Center</h1><p className="mt-4 text-slate-600">Coming soon.</p></div>} />
        <Route path="/faq" element={<div className="p-20 text-center"><h1 className="text-3xl font-bold text-slate-800">FAQ</h1><p className="mt-4 text-slate-600">Coming soon.</p></div>} />
        <Route path="/departments" element={<PublicDepartments />} />
      </Route>
      
      {/* Standalone Public Pages */}
      <Route path="/report" element={<MainReportIssue />} />
      <Route path="/track" element={<TrackComplaint />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/access-denied" element={<AccessDenied />} />
      
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminCivicLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<NewAdminDashboard />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="departments" element={<Departments />} />
        <Route path="officers" element={<Officers />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="ai-suggestions" element={<AISuggestions />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="audit-logs" element={<AuditLogs />} />
        <Route path="help" element={<HelpCenter />} />
      </Route>
      
      <Route path="/register" element={<Placeholder title="Register" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Admin Routes */}
      <Route path="/admin-old" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="assigned" element={<Placeholder title="Assigned Complaints" />} />
        <Route path="resolved" element={<Placeholder title="Resolved Complaints" />} />
        <Route path="pending" element={<Placeholder title="Pending Complaints" />} />
        <Route path="departments" element={<Departments />} />
        <Route path="officers" element={<Officers />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="ai-suggestions" element={<Placeholder title="AI Suggestions" />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="reports" element={<Reports />} />
        <Route path="resolved" element={<Placeholder title="Resolved Complaints" />} />
        <Route path="pending" element={<Placeholder title="Pending Complaints" />} />
        <Route path="departments" element={<Departments />} />
        <Route path="officers" element={<Officers />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="ai-suggestions" element={<Placeholder title="AI Suggestions" />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="reports" element={<Reports />} />
        <Route path="documents" element={<Placeholder title="Department Documents" />} />
        <Route path="assign" element={<Placeholder title="Assign Officer" />} />
        <Route path="export" element={<Placeholder title="Export Data" />} />
        <Route path="help" element={<Placeholder title="Admin Help Center" />} />
        <Route path="profile" element={<Placeholder title="Admin Profile" />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      <Route path="/admindashboard" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/complaints" element={<Navigate to="/admin/complaints" replace />} />
      <Route path="/admindepartments" element={<Navigate to="/admin/departments" replace />} />
      <Route path="/officers" element={<Navigate to="/admin/officers" replace />} />
      <Route path="/reports" element={<Navigate to="/admin/reports" replace />} />

      {/* Citizen Portal Routes */}
      <Route element={<ProtectedRoute allowedRoles={['user']}><CitizenLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<CitizenDashboard />} />
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="/my-complaints" element={<TrackComplaint />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<CitizenSettings />} />
        <Route path="/citizen/dashboard" element={<Navigate to="/dashboard" replace />} />
        <Route path="/citizen/report-issue" element={<ReportIssue />} />
        <Route path="/citizen/my-complaints" element={<TrackComplaint />} />
        <Route path="/citizen/track-complaint" element={<TrackComplaint />} />
        <Route path="/citizen/complaint/:id" element={<ComplaintDetails />} />
        <Route path="/citizen/nearby" element={<NearbyComplaints />} />
        <Route path="/citizen/notifications" element={<CitizenNotifications />} />
        <Route path="/citizen/feedback" element={<Feedback />} />
        <Route path="/citizen/profile" element={<Navigate to="/profile" replace />} />
        <Route path="/citizen/settings" element={<Navigate to="/settings" replace />} />
      </Route>

      {/* Super Admin Routes */}
      <Route path="/super-admin" element={<ProtectedRoute allowedRoles={['super_admin']}><SuperAdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="users" element={<SuperAdminUsers />} />
        <Route path="admins" element={<SuperAdminAdmins />} />
        <Route path="departments" element={<SuperAdminDepartments />} />
        <Route path="complaints" element={<SuperAdminComplaints />} />
        <Route path="roles" element={<SuperAdminRoles />} />
        <Route path="security" element={<SuperAdminSecurity />} />
        <Route path="reports" element={<SuperAdminReports />} />
        <Route path="audit-logs" element={<SuperAdminAuditLogs />} />
        <Route path="system-health" element={<SuperAdminHealth />} />
        <Route path="settings" element={<SuperAdminSettings />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;
