import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import PublicLayout from '../layouts/PublicLayout';
import { Home } from '../pages/Home';
import { ReportIssue as MainReportIssue } from '../pages/ReportIssue';

// Pages
import AdminDashboard from '../pages/admindashboard/AdminDashboard';
import Complaints from '../pages/admindashboard/Complaints';
import Departments from '../pages/admindashboard/Departments';
import Officers from '../pages/admindashboard/Officers';
import Citizens from '../pages/admindashboard/Citizens';
import Analytics from '../pages/admindashboard/Analytics';
import Reports from '../pages/admindashboard/Reports';
import AdminNotifications from '../pages/admindashboard/Notifications';
import AdminSettings from '../pages/admindashboard/Settings';
import AuditLogs from '../pages/admindashboard/AuditLogs';

// Citizen Pages
import CitizenLayout from '../layouts/CitizenLayout';
import CitizenDashboard from '../pages/citizen/CitizenDashboard';
import ReportIssue from '../pages/citizen/ReportIssue';
import TrackComplaint from '../pages/citizen/TrackComplaint';
import ComplaintDetails from '../pages/citizen/ComplaintDetails';
import NearbyComplaints from '../pages/citizen/NearbyComplaints';
import CitizenNotifications from '../pages/citizen/Notifications';
import Profile from '../pages/citizen/Profile';
import CitizenSettings from '../pages/citizen/Settings';

// Placeholders for routes without explicit layouts right now
const Placeholder = ({ title }) => <div className="p-8"><h1>{title}</h1></div>;

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<div className="p-20 text-center"><h1 className="text-3xl font-bold text-slate-800">About Us</h1><p className="mt-4 text-slate-600">Coming soon.</p></div>} />
        <Route path="/services" element={<div className="p-20 text-center"><h1 className="text-3xl font-bold text-slate-800">Services</h1><p className="mt-4 text-slate-600">Coming soon.</p></div>} />
        <Route path="/help" element={<div className="p-20 text-center"><h1 className="text-3xl font-bold text-slate-800">Help Center</h1><p className="mt-4 text-slate-600">Coming soon.</p></div>} />
        <Route path="/faq" element={<div className="p-20 text-center"><h1 className="text-3xl font-bold text-slate-800">FAQ</h1><p className="mt-4 text-slate-600">Coming soon.</p></div>} />
        <Route path="/departments" element={<div className="p-20 text-center"><h1 className="text-3xl font-bold text-slate-800">Departments</h1><p className="mt-4 text-slate-600">Coming soon.</p></div>} />
      </Route>
      
      {/* Standalone Public Pages */}
      <Route path="/report" element={<MainReportIssue />} />
      <Route path="/track" element={<TrackComplaint />} />
      
      <Route path="/login" element={<Placeholder title="Login" />} />
      <Route path="/register" element={<Placeholder title="Register" />} />
      <Route path="/forgot-password" element={<Placeholder title="Forgot Password" />} />
      
      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Navigate to="/admindashboard" replace />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/admindepartments" element={<Departments />} />
        <Route path="/officers" element={<Officers />} />
        <Route path="/citizens" element={<Citizens />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/notifications" element={<AdminNotifications />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="/auditlogs" element={<AuditLogs />} />
        <Route path="/profile" element={<Placeholder title="Profile" />} />
      </Route>

      {/* Citizen Portal Routes */}
      <Route path="/citizen" element={<CitizenLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<CitizenDashboard />} />
        <Route path="report-issue" element={<ReportIssue />} />
        <Route path="track-complaint" element={<TrackComplaint />} />
        <Route path="complaint/:id" element={<ComplaintDetails />} />
        <Route path="nearby" element={<NearbyComplaints />} />
        <Route path="notifications" element={<CitizenNotifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<CitizenSettings />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/citizen/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
