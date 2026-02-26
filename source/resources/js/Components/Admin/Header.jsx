import React, { useState, useEffect, useRef } from 'react';
import {
  Menu, Search, Bell, Moon, ChevronDown,
  UserCircle, Settings, LifeBuoy, LogOut
} from 'lucide-react';

const Header = ({ setSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center bg-white px-4 md:px-8 border-b border-slate-100 shadow-sm">
      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="mr-4 rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Left: Search bar */}
      <div className="flex flex-1 items-center">
        <div className="relative hidden sm:block w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full border-none bg-transparent py-2 pl-10 pr-4 text-sm focus:ring-0"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 md:gap-4">

        {/* Dark Mode Toggle */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100">
          <Moon size={20} />
        </button>

        {/* Notification Bell */}
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100">
          <Bell size={20} />
          <span className="absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-orange-400"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative ml-2" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 focus:outline-none group"
          >
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-[#1C2434] leading-tight">Ashikullah</p>
              <p className="text-xs text-slate-500 font-medium">Administrator</p>
            </div>

            <div className="relative h-11 w-11">
              <img
                src="https://i.pravatar.cc/150?u=musharof"
                alt="User"
                className="h-full w-full rounded-full object-cover border border-slate-100"
              />
            </div>

            <ChevronDown
              size={16}
              className={`text-slate-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-4 w-64 rounded-xl border border-slate-100 bg-white py-2 shadow-2xl shadow-slate-200/50">
              {/* Header inside dropdown */}
              <div className="px-5 py-3 border-b border-slate-50">
                <p className="text-sm font-bold text-[#1C2434]">Musharof Chowdhury</p>
                <p className="text-xs text-slate-400">randomuser@pimjo.com</p>
              </div>

              {/* Menu Links */}
              <div className="p-2">
                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                  <UserCircle size={20} strokeWidth={1.5} />
                  Edit profile
                </a>
                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                  <Settings size={20} strokeWidth={1.5} />
                  Account settings
                </a>
                <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
                  <LifeBuoy size={20} strokeWidth={1.5} />
                  Support
                </a>
              </div>

              {/* Sign out button */}
              <div className="mt-1 border-t border-slate-50 p-2">
                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors">
                  <LogOut size={20} strokeWidth={1.5} />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;