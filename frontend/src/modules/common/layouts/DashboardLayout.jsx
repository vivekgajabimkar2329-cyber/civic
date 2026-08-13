import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Building2,
  UserCheck,
  BarChart3,
  FileBarChart,
  Bot,
  Bell,
  Settings,
  ShieldAlert,
  CircleHelp,
  Users,
  UserCog,
  Shield,
  LockKeyhole,
  ClipboardList,
  HeartPulse,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Map,
  MessageSquare,
  Clock,
  Search,
  User,
  ListChecks
} from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import { citizenProfile } from '../data/mockData';

// Helper to resolve role metadata
const getRoleMeta = (role) => {
  switch (role) {
    case 'admin':
      return {
        title: 'Admin Console',
        badge: 'Admin Workspace',
        defaultAvatar: 'https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff',
        notificationsCount: 12,
        navItems: [
          { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
          { name: 'Complaints', path: '/admin/complaints', icon: FileText, badge: '12.8k' },
          { name: 'Departments', path: '/admin/departments', icon: Building2 },
          { name: 'Officers', path: '/admin/officers', icon: UserCheck },
          { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
          { name: 'Reports', path: '/admin/reports', icon: FileBarChart },
          { name: 'AI Insights', path: '/admin/ai-suggestions', icon: Bot, badge: 'New', badgeTone: 'green' },
          { name: 'Notifications', path: '/admin/notifications', icon: Bell },
          { name: 'Settings', path: '/admin/settings', icon: Settings },
          { name: 'Audit Logs', path: '/admin/audit-logs', icon: ShieldAlert },
          { name: 'Help Center', path: '/admin/help', icon: CircleHelp },
        ]
      };
    case 'super_admin':
      return {
        title: 'Super Admin',
        badge: 'System Control',
        defaultAvatar: 'https://ui-avatars.com/api/?name=Super+Admin&background=0f172a&color=fff',
        notificationsCount: 8,
        navItems: [
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
        ]
      };
    case 'user':
    default:
      return {
        title: 'Citizen Portal',
        badge: 'Verified Citizen',
        defaultAvatar: citizenProfile.avatar,
        notificationsCount: 2,
        navItems: [
          { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
          { name: 'Report Issue', path: '/report-issue', icon: FileText },
          { name: 'My Complaints', path: '/my-complaints', icon: ListChecks },
          { name: 'Nearby Complaints', path: '/citizen/nearby', icon: Map },
          { name: 'Notifications', path: '/citizen/notifications', icon: Bell, badge: 2 },
          { name: 'Profile', path: '/profile', icon: User },
          { name: 'Settings', path: '/settings', icon: Settings },
          { name: 'Feedback', path: '/citizen/feedback', icon: MessageSquare },
        ]
      };
  }
};

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Get metadata based on user's current role
  const role = user?.role || 'user';
  const meta = getRoleMeta(role);
  const displayName = user?.name || (role === 'user' ? citizenProfile.name : 'Government Official');
  const displayEmail = user?.email || (role === 'user' ? citizenProfile.email : 'official@civicai.gov.in');
  const displayAvatar = role === 'user' ? (user?.avatar || citizenProfile.avatar) : meta.defaultAvatar;

  // Real-time clock update
  useEffect(() => {
    const updateDateTime = () => {
      const d = new Date();
      setCurrentTime(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' }));
    };
    updateDateTime();
    const timer = setInterval(updateDateTime, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Find active nav item
  const currentNavItem = meta.navItems.find((item) => {
    if (item.path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname === '/citizen/dashboard';
    }
    return location.pathname.startsWith(item.path);
  });
  
  const currentPageTitle = currentNavItem?.name || 'Dashboard';

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] font-sans antialiased text-[#0F172A]">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Unified Enterprise Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#0F172A] text-white border-r border-slate-800 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Branding section */}
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-lg shadow-blue-600/30">
              <Shield className="h-5.5 w-5.5" strokeWidth={2.4} />
            </div>
            <div>
              <div className="text-lg font-black tracking-tight text-white leading-none">Civic AI</div>
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#2563EB]">
                {meta.title}
              </div>
            </div>
          </div>
          <button
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Workspace Quick Tag */}
        <div className="px-4 py-3 border-b border-slate-800/60 bg-slate-950/20 shrink-0">
          <div className="flex items-center gap-2 rounded-lg border border-slate-800/80 bg-slate-900/40 px-3 py-2 text-xs text-slate-350">
            <ShieldCheck size={14} className="text-[#2563EB]" />
            <span className="font-semibold">{meta.badge}</span>
          </div>
        </div>

        {/* Scrolling navigation links */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 scrollbar-thin">
          {meta.navItems.map((item) => {
            const Icon = item.icon;
            // Handle active route state precisely
            const isActive = item.path === '/dashboard'
              ? (location.pathname === '/dashboard' || location.pathname === '/citizen/dashboard')
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`group flex items-center gap-3.5 rounded-xl px-4.5 py-3 text-[14px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#2563EB] text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)]'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon
                  size={18}
                  strokeWidth={2.2}
                  className={`shrink-0 transition-colors duration-200 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                  }`}
                />
                <span className="flex-1 truncate">{item.name}</span>
                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
                      item.badgeTone === 'green'
                        ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/20'
                        : isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/20'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile widget at bottom */}
        <div className="border-t border-slate-800 bg-slate-950/20 p-4 shrink-0">
          <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/40 p-3">
            <img
              src={displayAvatar}
              alt={displayName}
              className="h-10 w-10 rounded-full border border-slate-700 object-cover shrink-0"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  displayName
                )}&background=2563eb&color=fff`;
              }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white leading-snug">{displayName}</p>
              <p className="truncate text-xs font-medium text-slate-400 leading-normal">{displayEmail}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-red-400 border border-red-500/10 bg-red-500/5 hover:bg-red-500/10 hover:text-red-300 transition duration-200"
          >
            <LogOut size={14} />
            Logout securely
          </button>
        </div>
      </aside>

      {/* Core page wrapper */}
      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        {/* Sticky blurred navbar */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200/80 bg-white/80 backdrop-blur-xl px-6 lg:px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button
              className="rounded-xl border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle navigation menu"
            >
              <Menu size={20} />
            </button>

            {/* Breadcrumb section */}
            <div className="hidden items-center text-xs font-semibold text-slate-400 md:flex">
              <span>Home</span>
              <ChevronRight size={14} className="mx-1 text-slate-300" />
              <span className="capitalize">{role === 'user' ? 'Citizen' : role.replace('_', ' ')} Portal</span>
              <ChevronRight size={14} className="mx-1 text-slate-300" />
              <span className="text-[#0F172A] capitalize">{currentPageTitle}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6 shrink-0">
            {/* Unified Search Bar */}
            <div className="relative hidden max-w-[240px] xl:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder:text-slate-400 outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-blue-50"
                placeholder="Quick search..."
                type="search"
              />
            </div>

            {/* Dynamic Date & Time */}
            <div className="hidden items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50/50 px-3.5 py-2 text-xs font-semibold text-slate-600 lg:flex shadow-sm">
              <Clock size={14} className="text-[#2563EB]" />
              <span>{currentTime}</span>
              <span className="h-3 w-px bg-slate-200" />
              <span>{currentDate}</span>
            </div>

            {/* Action Notifications Icon */}
            <button
              onClick={() => {
                const notifyPaths = {
                  user: '/citizen/notifications',
                  admin: '/admin/notifications',
                  super_admin: '/super-admin/notifications' // fallback route path if any
                };
                navigate(notifyPaths[role] || '/notifications');
              }}
              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              aria-label="View notifications"
            >
              <Bell size={18} />
              {meta.notificationsCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white ring-4 ring-white">
                  {meta.notificationsCount}
                </span>
              )}
            </button>

            {/* Avatar Dropdown wrapper */}
            <div className="flex items-center gap-3">
              <div className="hidden text-right lg:block">
                <p className="text-xs font-bold text-slate-800">{displayName}</p>
                <p className="text-[10px] font-semibold text-[#2563EB] uppercase tracking-wider">{role.replace('_', ' ')}</p>
              </div>
              <img
                src={displayAvatar}
                alt="Account"
                className="h-10 w-10 rounded-full border border-slate-200 object-cover cursor-pointer"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    displayName
                  )}&background=2563eb&color=fff`;
                }}
              />
            </div>
          </div>
        </header>

        {/* Scrollable workspace content */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 lg:p-8 animate-fade-in">
          <div className="mx-auto max-w-7xl space-y-6">
            <Outlet />
          </div>
        </main>

        {/* Shared simple footer */}
        <footer className="flex items-center justify-between border-t border-slate-200/80 bg-white px-6 py-4 text-[11px] font-semibold text-slate-400 shrink-0">
          <p>© {new Date().getFullYear()} Official Government Portal. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-700 hover:underline">Privacy Policy</a>
            <a href="#" className="hover:text-slate-700 hover:underline">Accessibility (WCAG)</a>
            <a href="#" className="hover:text-slate-700 hover:underline">Terms of Service</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
