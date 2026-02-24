import React, { useState } from 'react';
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
  // Check if any subMenu item is active to keep parent open by default
  const isSubItemActive = item.subMenu?.some(sub => sub.active);
  const [isOpen, setIsOpen] = useState(isSubItemActive || false);
  const hasSubMenu = item.subMenu && item.subMenu.length > 0;

  // Navigation Logic: Button for collapse, Anchor for direct links
  const Tag = hasSubMenu ? 'button' : 'a';
  const navProps = hasSubMenu ? { onClick: () => setIsOpen(!isOpen) } : { href: item.href };

  // Parent stays active if it is OPEN or if it's a direct active link
  const isParentActive = (hasSubMenu && isOpen) || item.active || isSubItemActive;

  return (
    <div className="mb-1">
      <Tag
        {...navProps}
        className={`group flex w-full items-center justify-between rounded-lg px-4 py-3 transition-all duration-200 cursor-pointer ${
          isParentActive
            ? 'bg-indigo-50/60 text-indigo-600'
            : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
        }`}
      >
        <div className="flex items-center gap-4">
          <item.icon
            size={22}
            className={`${isParentActive ? 'text-indigo-600' : 'text-slate-500 group-hover:text-indigo-600'}`}
          />
          <span className="font-medium text-[14px]">{item.label}</span>
        </div>

        <div className="flex items-center gap-2">
          {item.badge && (
            <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-500 border border-emerald-100">
              {item.badge}
            </span>
          )}
          {hasSubMenu && (
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${
                isParentActive ? 'text-indigo-600' : 'text-slate-400'
              }`}
            />
          )}
        </div>
      </Tag>

      {/* Sub Menu with exact indentation and pill styling */}
      {hasSubMenu && (
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 mt-1 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="flex flex-col gap-1 pr-2">
            {item.subMenu.map((sub, idx) => (
              <a
                key={idx}
                href={sub.href}
                className={`block ml-12 rounded-lg py-2.5 px-4 text-[14px] font-medium transition-all duration-200 ${
                  sub.active
                    ? 'text-indigo-600 font-bold'
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                {sub.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isOpen, setOpen }) => {
  const menuItems = [
    { icon: LayoutGrid, label: 'Dashboard', href: '/admin/dashboard', active: true },
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
      label: 'Donation Management',
      subMenu: [
        { label: 'Add Donor', href: '#' },
        { label: 'Donor List', href: '#'},
      ]
    },
    {
      icon: Wallet,
      label: 'Collection Management',
      subMenu: [
        { label: 'Monthly Collection', href: '#' },
        { label: 'On Time Collection', href: '#'},
        { label: 'Collection History', href: '#'},
      ]
    },
    {
      icon: Receipt,
      label: 'Cost Management',
      subMenu: [
        { label: 'Add New', href: '#' },
        { label: 'Cost List', href: '#'},
      ]
    },
    {
      icon: FileBarChart,
      label: 'Reports',
      subMenu: [
        { label: 'Collection Report', href: '#'},
        { label: 'Expenditure Report', href: '#' },
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
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                <LayoutGrid size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold text-[#1C2434]">TailAdmin</span>
            </div>
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