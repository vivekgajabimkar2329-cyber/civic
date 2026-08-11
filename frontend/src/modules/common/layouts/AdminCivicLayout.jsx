import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../admin/components/Sidebar';
import TopNavbar from '../../admin/components/TopNavbar';
import { useAuth } from '../../auth/context/AuthContext';

const AdminCivicLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="h-screen overflow-hidden bg-[#f7fbff] flex">
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onLogout={logout} />
      </div>

      <div className="hidden lg:flex h-screen shrink-0">
        <Sidebar onLogout={logout} />
      </div>

      <div className="flex-1 min-w-0 h-screen flex flex-col overflow-hidden">
        <TopNavbar onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 lg:px-8 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminCivicLayout;
