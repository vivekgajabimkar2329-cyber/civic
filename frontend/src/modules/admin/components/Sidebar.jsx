import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  Bell,
  Bot,
  Building2,
  CircleHelp,
  FileBarChart,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UsersRound,
} from 'lucide-react';

const navItems = [
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
];

const Sidebar = ({ onLogout }) => {
  return (
    <aside className="h-screen w-[280px] shrink-0 bg-gradient-to-b from-[#003b78] via-[#06386f] to-[#052b58] text-white flex flex-col shadow-[18px_0_45px_rgba(3,34,72,0.16)]">
      <div className="px-7 pt-7 pb-6">
        <div className="flex items-center gap-4">
          <div className="h-[74px] w-[74px] rounded-full bg-white ring-4 ring-white/15 shadow-xl overflow-hidden flex items-center justify-center">
            <div className="h-full w-full bg-gradient-to-b from-emerald-50 to-cyan-50 flex items-center justify-center">
              <Building2 className="h-10 w-10 text-emerald-700" />
            </div>
          </div>
          <div>
            <p className="text-[28px] leading-none font-extrabold tracking-tight">Civic AI</p>
            <p className="mt-2 text-[13px] font-semibold text-blue-100">Smart City. Better Living.</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-xl px-4 py-3 text-[15px] font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#0b83ff] text-white shadow-[0_14px_28px_rgba(0,123,255,0.34)]'
                    : 'text-blue-50/95 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" strokeWidth={2.2} />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <span
                  className={`rounded-full px-2.5 py-1 text-xs font-extrabold ${
                    item.badgeTone === 'green'
                      ? 'bg-emerald-400 text-white'
                      : 'bg-[#1789ff] text-white'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="px-4 pb-6 pt-4 space-y-5">
        <div className="rounded-2xl bg-white/10 border border-white/10 p-4 flex items-center gap-3 shadow-inner">
          <div className="h-12 w-12 rounded-full bg-[#0b83ff] flex items-center justify-center shadow-lg">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[15px]">Admin User</p>
            <p className="text-xs text-blue-100 truncate">admin@civicai.gov.in</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 rounded-xl px-4 py-3.5 text-[16px] font-semibold text-blue-50 hover:bg-white/10 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
