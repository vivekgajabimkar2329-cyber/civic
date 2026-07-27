import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home,
  PlusCircle,
  MapPin,
  Map,
  Bell, 
  Settings,
  User,
  LogOut,
  Search,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { citizenProfile } from '../data/mockData';

const CitizenLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/citizen/dashboard', icon: Home },
    { name: 'Report Issue', path: '/citizen/report-issue', icon: PlusCircle },
    { name: 'Track Complaint', path: '/citizen/track-complaint', icon: MapPin },
    { name: 'Nearby Complaints', path: '/citizen/nearby', icon: Map },
    { name: 'Notifications', path: '/citizen/notifications', icon: Bell, badge: 2 },
    { name: 'Profile', path: '/citizen/profile', icon: User },
    { name: 'Settings', path: '/citizen/settings', icon: Settings },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  // Generate breadcrumb
  const pathParts = location.pathname.split('/').filter(p => p !== '');
  const currentPage = pathParts.length > 1 
    ? navItems.find(item => item.path === location.pathname)?.name || pathParts[pathParts.length - 1]
    : 'Dashboard';

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: 'var(--color-gov-bg)' }}>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Government Primary Color */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 text-white flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--color-gov-primary)' }}
      >
        {/* Logo Area */}
        <div className="flex flex-col justify-center h-24 border-b border-white/20 px-6">
          <div className="flex items-center gap-2">
            <GovLogo className="w-8 h-8 text-white" />
            <div>
              <div className="text-xl font-bold tracking-tight leading-tight">CivicAI</div>
              <div className="text-xs text-blue-200 uppercase tracking-widest font-semibold">Citizen Portal</div>
            </div>
          </div>
          <button 
            className="lg:hidden absolute top-6 right-6 text-gray-300 hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 group relative ${
                  isActive 
                    ? 'text-white' 
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
                style={{ backgroundColor: isActive ? 'var(--color-gov-secondary)' : 'transparent' }}
                onClick={() => setSidebarOpen(false)}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                )}
                <Icon size={20} className={isActive ? "text-white" : "opacity-80"} />
                <span className="font-medium text-sm">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/20 bg-black/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-blue-100 hover:text-white hover:bg-white/10 rounded-md transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Logout securely</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full h-full min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b flex items-center justify-between px-6 lg:px-10 z-10" style={{ borderColor: 'var(--color-gov-border)' }}>
          <div className="flex items-center gap-4 flex-1">
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-900 p-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            
            {/* Breadcrumb (Gov Style) */}
            <div className="hidden md:flex items-center text-sm">
              <span className="text-gray-500 font-medium">Home</span>
              <ChevronRight size={16} className="text-gray-400 mx-1" />
              <span className="text-gray-500 font-medium">Citizen Portal</span>
              <ChevronRight size={16} className="text-gray-400 mx-1" />
              <span className="font-bold text-gray-900 capitalize">{currentPage.replace('-', ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 mr-4">
              <div className="text-sm font-medium text-gray-600 border-r pr-4 border-gray-300">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
              </div>
            </div>

            <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-sm">
                2
              </span>
            </button>
            
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-gray-900">{citizenProfile.name}</p>
                <p className="text-xs text-gray-500 font-medium">Verified Citizen</p>
              </div>
              <img 
                src={citizenProfile.avatar} 
                alt="Citizen" 
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Outlet />
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t px-6 py-4 text-xs text-gray-500 flex justify-between" style={{ borderColor: 'var(--color-gov-border)' }}>
          <p>© {new Date().getFullYear()} Official Government Portal. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

// Official-looking Gov Logo SVG
function GovLogo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )
}

export default CitizenLayout;
