import React from 'react';
import AdminLayout from "@/Layouts/AdminLayout.jsx";

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <nav className="flex text-sm text-slate-500">
            <span>Dashboard</span>
            <span className="mx-2">/</span>
            <span className="text-indigo-600 font-medium">Analytics</span>
          </nav>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card Example */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-sm border border-slate-100 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-indigo-600">
                {/*<LayoutGrid size={24} />*/}
              </div>
              <div className="mt-4">
                <h4 className="text-2xl font-bold text-slate-800">$3.456K</h4>
                <span className="text-sm text-slate-500 font-medium">Total views</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;