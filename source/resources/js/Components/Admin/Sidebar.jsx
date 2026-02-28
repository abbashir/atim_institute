import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  LayoutGrid,
  GraduationCap,
  HeartHandshake,
  Wallet,
  Receipt,
  FileBarChart,
  Settings,
  ChevronDown,
  X
} from 'lucide-react';

const SidebarItem = ({ item }) => {
  const { url } = usePage();

  // 1. Exact match for the sub-menu items
  const isSubItemActive = item.subMenu?.some(sub => url === sub.href);

  // 2. Parent logic: Stay active if it's a direct link match OR if any child is active
  const isDirectActive = url === item.href;
  const isModuleActive = isDirectActive || isSubItemActive;

  // Accordion state: Open if module is active
  const [isOpen, setIsOpen] = useState(isModuleActive);

  // Sync accordion state whenever the URL changes
  useEffect(() => {
    if (isModuleActive) {
      setIsOpen(true);
    }
  }, [url, isModuleActive]);

  const hasSubMenu = item.subMenu && item.subMenu.length > 0;

  return (
    <div className="mb-1">
      {hasSubMenu ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`group flex w-full items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 cursor-pointer ${
            isModuleActive
              ? 'bg-indigo-50/60 text-indigo-600'
              : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
          }`}
        >
          <div className="flex items-center gap-4">
            <item.icon
              size={22}
              className={`${isModuleActive ? 'text-indigo-600' : 'text-slate-500 group-hover:text-indigo-600'}`}
            />
            <span className="font-medium text-[14px]">{item.label}</span>
          </div>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${
              isModuleActive ? 'text-indigo-600' : 'text-slate-400'
            }`}
          />
        </button>
      ) : (
        <Link
          href={item.href}
          className={`group flex w-full items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 cursor-pointer ${
            url === item.href
              ? 'bg-indigo-50/60 text-indigo-600'
              : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
          }`}
        >
          <div className="flex items-center gap-4">
            <item.icon
              size={22}
              className={`${url === item.href ? 'text-indigo-600' : 'text-slate-500 group-hover:text-indigo-600'}`}
            />
            <span className="font-medium text-[14px]">{item.label}</span>
          </div>
        </Link>
      )}

      {/* Sub Menu */}
      {hasSubMenu && (
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 mt-1 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col gap-1 pr-2">
            {item.subMenu.map((sub, idx) => {
              // Strict equality check for sub-menu items
              const isActive = url === sub.href;

              return (
                <Link
                  key={idx}
                  href={sub.href}
                  className={`block ml-12 rounded-lg py-2.5 px-4 text-[14px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-indigo-600 font-bold bg-indigo-50/40'
                      : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                  }`}
                >
                  {sub.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen, setOpen }) => {
  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', href: '/admin/dashboard' },
    {
      icon: GraduationCap,
      label: 'Student',
      subMenu: [
        { label: 'Add New', href: '/admin/students/create' },
        { label: 'Student List', href: '/admin/students' },
      ]
    },
    {
      icon: HeartHandshake,
      label: 'Donor Management',
      subMenu: [
        { label: 'Add Donor', href: '/admin/donors/create' },
        { label: 'Donor List', href: '/admin/donors' },
      ]
    },
    {
      icon: Wallet,
      label: 'Donation Management',
      subMenu: [
        { label: 'Monthly Collection', href: '/admin/donations/monthly' },
        { label: 'On Time Collection', href: '/admin/donations/on-time'},
        { label: 'Donation Summary', href: '/admin/donations/summary'},
      ]
    },
    {
      icon: Receipt,
      label: 'Expense Management',
      subMenu: [
        { label: 'Add New', href: '/admin/expenses/create' },
        { label: 'Expense List', href: '/admin/expenses' },
      ]
    },
    {
      icon: FileBarChart,
      label: 'Reports',
      subMenu: [
        { label: 'Donation Report', href: '/admin/reports/donations'},
        { label: 'Expense Report', href: '/admin/reports/expenses' },
      ]
    },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-72 transform bg-white transition-transform duration-300 ease-in-out border-r border-slate-100 lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col px-4 py-8">
          <div className="flex items-center justify-between mb-10 px-4">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                <LayoutGrid size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold text-[#1C2434]">Darus Salam</span>
            </Link>
            <button onClick={() => setOpen(false)} className="lg:hidden text-slate-400">
              <X size={20} />
            </button>
          </div>

          <p className="mb-4 px-4 text-xs font-semibold tracking-widest text-slate-400 uppercase">Menu</p>

          <nav className="flex-1 space-y-1 overflow-y-auto px-2 custom-scrollbar">
            {menuItems.map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;