import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Users, Heart, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import {formatAmount, formatNumber} from "@/Utils/format.js";

const StatCard = ({ title, value, isNumber, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-black text-slate-800 mt-1">{isNumber === 'Yes' ? formatNumber(value) : formatAmount(value)}</h3>
      </div>
      <div className={`p-2 rounded-lg ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
  </div>
);

export default function Dashboard({ analytics }) {
  return (
    <AdminLayout pageName="Analytics Dashboard">
      {/* 1. People Section */}
      <h2 className="text-sm font-bold text-slate-400 uppercase mb-4">Users & Donors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Students" value={analytics.students.total} isNumber={'Yes'} icon={Users} colorClass="bg-blue-50 text-blue-600" />
        <StatCard title="Total Donors" value={analytics.donors.total} isNumber={'Yes'} icon={Heart} colorClass="bg-indigo-50 text-indigo-600" />
        <StatCard title="Monthly Donors" value={analytics.donors.monthly} isNumber={'Yes'} icon={Heart} colorClass="bg-purple-50 text-purple-600" />
      </div>

      {/* 2. Donations (Inflow) */}
      <h2 className="text-sm font-bold text-emerald-500 uppercase mb-4">Donation Analytics (BDT)</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Today" value={analytics.donations.today} icon={ArrowUpCircle} colorClass="bg-emerald-50 text-emerald-600" />
        <StatCard title="This Month" value={analytics.donations.this_month} icon={ArrowUpCircle} colorClass="bg-emerald-50 text-emerald-600" />
        <StatCard title="This Year" value={analytics.donations.this_year} icon={ArrowUpCircle} colorClass="bg-emerald-50 text-emerald-600" />
        <StatCard title="Total (As of now)" value={analytics.donations.total} icon={ArrowUpCircle} colorClass="bg-emerald-600 text-white" />
      </div>

      {/* 3. Expenses (Outflow) */}
      <h2 className="text-sm font-bold text-rose-500 uppercase mb-4">Expense Analytics (BDT)</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Today" value={analytics.expenses.today} icon={ArrowDownCircle} colorClass="bg-rose-50 text-rose-600" />
        <StatCard title="This Month" value={analytics.expenses.this_month} icon={ArrowDownCircle} colorClass="bg-rose-50 text-rose-600" />
        <StatCard title="This Year" value={analytics.expenses.this_year} icon={ArrowDownCircle} colorClass="bg-rose-50 text-rose-600" />
        <StatCard title="Total (As of now)" value={analytics.expenses.total} icon={ArrowDownCircle} colorClass="bg-rose-600 text-white" />
      </div>
    </AdminLayout>
  );
}