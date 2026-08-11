import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Building2,
  FileText,
  AlertCircle,
  Brain,
  Users,
  UserCog,
  Shield,
  BarChart3,
  Settings,
  ClipboardList,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Activity,
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', path: '/super-admin/dashboard', icon: LayoutDashboard },
  { name: 'Departments', path: '/super-admin/departments', icon: Building2 },
  { name: 'Complaint Management', path: '/super-admin/complaints', icon: FileText, badge: 128 },
  { name: 'All Issues', path: '/super-admin/issues', icon: AlertCircle, badge: 45 },
  { name: 'AI Analytics', path: '/super-admin/ai-analytics', icon: Brain },
  { name: 'Users Management', path: '/super-admin/users', icon: Users, badge: '45K' },
  { name: 'Admin Management', path: '/super-admin/admins', icon: UserCog },
  { name: 'Role & Permissions', path: '/super-admin/roles', icon: Shield },
  { name: 'Reports & Analytics', path: '/super-admin/reports', icon: BarChart3 },
  { name: 'System Management', path: '/super-admin/system', icon: Settings },
  { name: 'Audit Logs', path: '/super-admin/audit-logs', icon: ClipboardList },
  { name: 'Notifications', path: '/super-admin/notifications', icon: Bell, badge: 8 },
];

const bottomItems = [
  { name: 'System Health', path: '/super-admin/system-health', icon: Activity },
  { name: 'Settings', path: '/super-admin/settings', icon: Settings },
  { name: 'Logout', path: '#', icon: LogOut, action: 'logout' },
];

const Sidebar = ({ collapsed, onToggle, onLogout }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleItemClick = (item) => {
    if (item.action === 'logout' && onLogout) {
      onLogout();
    }
    setMobileOpen(false);
  };

  const isActive = (path) => {
    if (path === '/super-admin/dashboard') {
      return location.pathname === '/super-admin/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const SidebarContent = ({ isMobile = false }) => (
    <aside
      className={`h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out relative z-30 ${
        collapsed && !isMobile ? 'w-[72px]' : 'w-64'
      }`}
    >
      {/* Logo Area */}
      <div className={`flex items-center h-16 px-4 border-b border-gray-100 ${collapsed && !isMobile ? 'justify-center' : 'justify-between'}`}>
        <div className={`flex items-center gap-2.5 ${collapsed && !isMobile ? 'flex-col' : ''}`}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-civic-600 to-secondary-600 flex items-center justify-center shadow-lg shadow-civic-600/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <AnimatePresence>
            {(!collapsed || isMobile) && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <h1 className="text-lg font-bold bg-gradient-to-r from-civic-600 to-secondary-600 bg-clip-text text-transparent">
                  CivicAI
                </h1>
                <p className="text-[10px] font-medium text-text-secondary -mt-0.5">Super Admin</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {!isMobile && (
          <button
            onClick={onToggle}
            className={`p-1.5 rounded-lg hover:bg-gray-100 text-text-secondary hover:text-text-primary transition-colors hidden lg:flex ${collapsed ? 'absolute -right-3 bg-white border border-gray-200 shadow-md' : ''}`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex
