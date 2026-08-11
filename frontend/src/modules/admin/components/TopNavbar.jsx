import React from 'react';
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Globe2,
  Menu,
  MessageSquare,
  Moon,
  Search,
  UserRound,
} from 'lucide-react';

const TopNavbar = ({ onMenuClick }) => {
  return (
    <header className="h-20 bg-white/82 backdrop-blur-xl border-b border-[#e2e8f0]/80 flex items-center justify-between gap-6 px-6 lg:px-8 sticky top-0 z-20">
      <div className="flex items-center gap-6 min-w-0">
        <button
          onClick={onMenuClick}
          className="h-11 w-11 rounded-xl text-[#0878eb] hover:bg-blue-50 flex items-center justify-center transition-colors"
          aria-label="Open admin navigation"
        >
          <Menu className="h-7 w-7" strokeWidth={2.6} />
        </button>
        <div className="min-w-0">
          <h1 className="text-[24px] leading-tight font-extrabold text-[#061936] tracking-tight">
            Welcome back, Admin!
          </h1>
          <p className="mt-1 text-[14px] font-medium text-[#526586]">
            Here's what's happening in your system today.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <label className="relative hidden 2xl:block">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#50678b]" />
          <input
            className="h-11 w-[340px] rounded-xl border border-[#cfdbeb] bg-white pl-5 pr-12 text-sm font-medium text-[#061936] placeholder:text-[#526586] outline-none transition focus:border-[#0878eb] focus:ring-4 focus:ring-blue-100"
            placeholder="Search complaints, users..."
            type="search"
          />
        </label>

        <button className="relative h-11 w-11 rounded-xl bg-white border border-[#e3ebf6] text-[#0b1f3d] shadow-sm hover:border-[#c7d7eb] transition-colors flex items-center justify-center" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-2 -right-2 h-6 min-w-6 rounded-full bg-[#ff3b54] px-1.5 text-[11px] font-extrabold text-white flex items-center justify-center ring-4 ring-white">
            12
          </span>
        </button>

        <button className="h-11 w-11 rounded-xl bg-white border border-[#e3ebf6] text-[#0b1f3d] shadow-sm hover:border-[#c7d7eb] flex items-center justify-center" aria-label="Messages">
          <MessageSquare className="h-5 w-5" />
        </button>

        <button className="hidden xl:flex h-11 rounded-xl bg-white border border-[#cfdbeb] px-3 text-sm font-bold text-[#061936] shadow-sm items-center gap-2 hover:border-[#b8cbe3] transition-colors">
          6 June 2025
          <CalendarDays className="h-4 w-4 text-[#526586]" />
        </button>

        <button className="hidden xl:flex h-11 rounded-xl bg-white border border-[#cfdbeb] px-3 text-sm font-bold text-[#061936] shadow-sm items-center gap-2">
          <Globe2 className="h-4 w-4 text-[#526586]" />
          EN
        </button>

        <button className="hidden xl:flex h-11 w-11 rounded-xl bg-white border border-[#e3ebf6] text-[#0b1f3d] shadow-sm items-center justify-center" aria-label="Theme">
          <Moon className="h-5 w-5" />
        </button>

        <button className="h-11 rounded-xl bg-white border border-[#cfdbeb] pl-2 pr-3 text-sm font-bold text-[#061936] shadow-sm flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-[#0878eb] text-white flex items-center justify-center">
            <UserRound className="h-4 w-4" />
          </span>
          Admin
          <ChevronDown className="h-4 w-4 text-[#526586]" />
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
