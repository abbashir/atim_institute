import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Settings, User, Bell, Lock, Globe, ShieldCheck } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('general');

  const menuItems = [
    { id: 'general', label: 'General Settings', icon: Settings },
    { id: 'profile', label: 'Profile Information', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Password & Security', icon: Lock },
    { id: 'localization', label: 'Language & Region', icon: Globe },
  ];

  return (
    <AdminLayout pageName="System Settings">
      <Head title="Settings" />

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Left Sidebar Navigation */}
        <div className="w-full md:w-72">
          <div className="rounded-sm border border-slate-200 bg-white p-4 shadow-sm">
            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === item.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Right Content Area (Empty State) */}
        <div className="flex-1">
          <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-7 py-4">
              <h3 className="font-bold text-black">
                {menuItems.find(i => i.id === activeTab)?.label}
              </h3>
            </div>

            <div className="flex flex-col items-center justify-center py-20 px-10 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-50 text-slate-300">
                <ShieldCheck size={40} />
              </div>
              <h4 className="mb-2 text-xl font-bold text-black">Under Construction</h4>
              <p className="max-w-md text-slate-500">
                The <strong>{activeTab}</strong> settings module is currently being developed.
                Please check back later for updates.
              </p>
              <button className="mt-8 rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition">
                Refresh Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;