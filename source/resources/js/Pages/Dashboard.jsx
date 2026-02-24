import React from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import AdminLayout from "@/Layouts/AdminLayout.jsx";

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <h3 className="mt-1 text-2xl font-bold text-slate-800">{value}</h3>
      </div>
      <div className={`rounded-xl p-3 ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
        <Icon size={24} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className="font-medium text-emerald-500">{change}</span>
      <span className="ml-2 text-slate-400">vs last month</span>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">Overview</h1>
        <p className="text-slate-500">111Welcome back, Alex. Here's what's happening today.</p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value="$45,231" change="+12.5%" icon={DollarSign} color="bg-indigo-500" />
        <StatCard title="Active Users" value="2,405" change="+3.2%" icon={Users} color="bg-sky-500" />
        <StatCard title="Total Orders" value="1,210" change="+18.4%" icon={Activity} color="bg-amber-500" />
        <StatCard title="Conversion" value="3.42%" change="-1.1%" icon={TrendingUp} color="bg-emerald-500" />
      </div>

      {/* Table Section */}
      <div className="mt-8 rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800">Recent Transactions</h2>
          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View all</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold">
            <tr>
              <th className="px-6 py-4 text-center">Customer</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Date</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
            {[1, 2, 3].map((i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-700">User #{i}042</td>
                <td className="px-6 py-4">
                  <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">Completed</span>
                </td>
                <td className="px-6 py-4 text-slate-600">$120.00</td>
                <td className="px-6 py-4 text-slate-500 text-sm">Feb 23, 2026</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;