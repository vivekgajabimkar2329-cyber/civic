import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  BarChart3,
  Bell,
  Building2,
  ClipboardList,
  FileText,
  HeartPulse,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Menu,
  Settings,
  Shield,
  UserCog,
  Users,
  X
} from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';

const navItems = [
  { name: 'Dashboard', path: '/super-admin/dashboard', icon: LayoutDashboard },
  { name: 'Users', path: '/super-admin/users', icon: Users },
  { name: 'Admins', path: '/super-admin/admins', icon: UserCog },
  { name: 'Departments', path: '/super-admin/departments', icon: Building2 },
  { name: 'Complaints', path: '/super-admin/complaints', icon: FileText },
  { name: 'Roles', path: '/super-admin/roles', icon: Shield },
  { name: 'Security', path: '/super-admin/security', icon: LockKeyhole },
  { name: 'Reports', path: '/super-admin/reports', icon: BarChart3 },
  { name: 'Audit Logs', path: '/super-admin/audit-logs', icon: ClipboardList },
  { name: 'Health', path: '/super-admin/system-health', icon: HeartPulse },
  { name: 'Settings', path: '/super-admin/settings', icon: Settings },
];

const SuperAdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentRoute = navItems.find((item) => location.pathname.startsWith(item.path));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close navigation overlay"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 shadow-xl shadow-slate-200/50 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight">Civic AI</p>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Super Admin</p>
            </div>
          </div>
          <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-160px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-100'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-50 transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      <div className="lg:pl-72 min-h-screen flex flex-col">
        <header className="sticky top-0 z-20 h-20 bg-white/90 backdrop-blur border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">System Control Center</p>
              <h1 className="text-xl font-bold text-slate-950">{currentRoute?.name || 'Super Admin Dashboard'}</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/super-admin/notifications')}
              className="relative p-2 rounded-lg border border-slate-200 hover:bg-slate-50"
              aria-label="Open notifications"
            >
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">8</span>
            </button>
            <button
              onClick={() => navigate('/super-admin/settings')}
              className="hidden sm:flex items-center gap-3 pl-4 border-l border-slate-200 text-left"
              aria-label="Open account settings"
            >
              <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">
                {(user?.name || 'SA').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{user?.name || 'Super Administrator'}</p>
                <p className="text-xs text-slate-500">{user?.email || 'super@civic.gov'}</p>
              </div>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
