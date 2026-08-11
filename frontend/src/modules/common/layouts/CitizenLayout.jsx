import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  ListChecks,
Search,
  Map,
  Bell,
  Settings,
  User,
  MessageSquare,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { citizenProfile } from '../data/mockData';
import { useAuth } from '../../auth/context/AuthContext';

const CitizenLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  const navItems = [
    { name: 'Report Issue', path: '/report-issue', icon: FileText },
    { name: 'My Complaints', path: '/my-complaints', icon: ListChecks },
    { name: 'Track Complaint', path: '/citizen/track-complaint', icon: Search },
    { name: 'Nearby Complaints', path: '/citizen/nearby', icon: Map },
    { name: 'Notifications', path: '/citizen/notifications', icon: Bell, badge: 2 },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Feedback', path: '/citizen/feedback', icon: MessageSquare },
  ];

const displayName = user?.name || citizenProfile.name;
  const displayAvatar = user?.avatar || citizenProfile.avatar;

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
    } finally {
      setLoggingOut(false);
    }
  };

  const pathParts = location.pathname.split('/').filter((part) => part !== '');
  const currentPage = navItems.find((item) => item.path === location.pathname)?.name
    || (pathParts.length > 0 ? pathParts[pathParts.length - 1].replace(/-/g, ' ') : 'Dashboard');

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 font-sans">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-gradient-to-b from-[#003078] via-[#00459a] to-[#005EA5] text-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-24 items-center justify-between border-b border-white/15 px-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-2 backdrop-blur">
              <GovLogo className="h-8 w-8 text-white" />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight">CivicAI</div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-100">Citizen Portal</div>
            </div>
          </div>
          <button className="rounded-full p-2 text-blue-100 transition hover:bg-white/10 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="mx-4 mt-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-blue-50">
            <ShieldCheck size={16} />
            Service-ready workspace
          </div>
          <p className="mt-2 text-sm text-blue-100">Track complaints and city updates with confidence.</p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-200 ${
                  isActive ? 'bg-white text-[#003078] shadow-lg' : 'text-blue-50 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <div className={`rounded-xl p-2 ${isActive ? 'bg-[#003078]/10' : 'bg-white/10'}`}>
                  <Icon size={18} />
                </div>
                <span className="text-sm font-semibold">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/15 bg-slate-950/10 p-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-3">
<img
              src={displayAvatar}
              alt={displayName}
              className="h-11 w-11 rounded-full border border-white/20 object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{displayName}</p>
              <p className="truncate text-xs font-medium text-blue-100">Verified citizen account</p>
            </div>
          </div>
<button
            onClick={handleLogout}
            disabled={loggingOut}
            className="mt-3 flex w-full items-center justify-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-blue-50 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingOut ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut size={18} />
                Logout securely
              </>
            )}
          </button>
        </div>
      </aside>

      <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
        <header className="z-10 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-10">
          <div className="flex flex-1 items-center gap-4">
            <button
              className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>

            <div className="hidden items-center text-sm md:flex">
              <span className="font-medium text-slate-500">Home</span>
              <ChevronRight size={16} className="mx-1 text-slate-400" />
              <span className="font-medium text-slate-500">Citizen Portal</span>
              <ChevronRight size={16} className="mx-1 text-slate-400" />
              <span className="font-semibold text-slate-900 capitalize">{currentPage.replace('-', ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600 lg:block">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
            </div>

            <button className="relative rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
              <Bell size={20} />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                2
              </span>
            </button>

            <div className="flex items-center gap-3">
              <div className="hidden text-right md:block">
                <p className="text-sm font-semibold text-slate-900">{citizenProfile.name}</p>
                <p className="text-xs font-medium text-slate-500">Verified citizen</p>
              </div>
              <img src={citizenProfile.avatar} alt="Citizen" className="h-10 w-10 rounded-full border border-slate-200 object-cover" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-100 p-6 lg:p-10">
          <Outlet />
        </main>

        <footer className="flex items-center justify-between border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Official Government Portal. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-700 hover:underline">Privacy</a>
            <a href="#" className="hover:text-slate-700 hover:underline">Accessibility</a>
            <a href="#" className="hover:text-slate-700 hover:underline">Terms</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

function GovLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}

export default CitizenLayout;
