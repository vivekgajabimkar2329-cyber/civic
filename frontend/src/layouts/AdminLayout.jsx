import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  Users, 
  UserCircle, 
  BarChart3, 
  FileSpreadsheet,
  Bell, 
  Settings, 
  History, 
  LogOut,
  Search,
  Menu,
  X
} from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admindashboard', icon: LayoutDashboard },
    { name: 'Complaints', path: '/complaints', icon: FileText },
    { name: 'Departments', path: '/admindepartments', icon: Building2 },
    { name: 'Officers', path: '/officers', icon: UserCircle },
    { name: 'Citizens', path: '/citizens', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Reports', path: '/reports', icon: FileSpreadsheet },
    { name: 'Notifications', path: '/notifications', icon: Bell, badge: 6 },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Audit Logs', path: '/auditlogs', icon: History },
  ];

  const handleLogout = () => {
    // Navigate to login
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1e1b4b] text-white flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Area */}
        <div className="flex items-center justify-center h-20 border-b border-white/10 px-6">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-2 rounded-lg">
              <ShieldIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-wider">CivicAI</span>
          </div>
          <button 
            className="lg:hidden ml-auto text-gray-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-indigo-500/20 text-indigo-400' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                )}
                <Icon size={20} className={isActive ? "text-indigo-400" : ""} />
                <span className="font-medium text-sm">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout button at bottom */}
        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-full h-full min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6 lg:px-10 z-10">
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700 p-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            {/* Search Bar */}
            <div className="max-w-md w-full relative hidden sm:block">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search complaints, citizens, or reports..."
                className="block w-full pl-11 pr-4 py-2.5 bg-gray-50 border-transparent rounded-full text-sm placeholder-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 transition-all duration-200 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative text-gray-500 hover:text-indigo-600 transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] font-bold text-white">
                3
              </span>
            </button>
            
            <div className="flex items-center gap-3 pl-6 border-l border-gray-200 cursor-pointer">
              <img 
                src="https://ui-avatars.com/api/?name=Sarah+Jenkins&background=6366f1&color=fff" 
                alt="Admin" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-gray-800">Sarah Jenkins</p>
                <p className="text-xs text-gray-500 font-medium">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#f8fafc]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Simple custom SVG icon for the logo based on the image
function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  )
}

export default AdminLayout;
