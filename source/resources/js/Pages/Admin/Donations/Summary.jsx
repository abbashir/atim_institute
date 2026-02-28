import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { Users, DollarSign, Zap, Calendar, Search, AlertCircle, CheckCircle, User } from 'lucide-react';

export default function Summary({ summary, donors, individualData, filters }) {
  const [activeTab, setActiveTab] = useState(filters.donor_id ? 'individual' : 'month');

  const handleDonorSelect = (id) => {
    router.get(route('admin.donations.summary'), { donor_id: id }, {
      preserveState: true,
      replace: true
    });
  };

  return (
    <AdminLayout pageName="Donation Summary">
      <Head title="Donation Summary" />

      {/* Tab Navigation */}
      <div className="mb-6 flex gap-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('month')}
          className={`pb-4 text-sm font-bold transition-all ${activeTab === 'month' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500 hover:text-indigo-400'}`}
        >
          This Month Statistics
        </button>
        <button
          onClick={() => setActiveTab('individual')}
          className={`pb-4 text-sm font-bold transition-all ${activeTab === 'individual' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500 hover:text-indigo-400'}`}
        >
          Individual Donor Summary
        </button>
      </div>

      {/* Tab 1: Monthly Stats Card Grid */}
      {activeTab === 'month' && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-3 text-indigo-700 border border-indigo-100 w-fit">
            <Calendar size={18} />
            <span className="font-bold">Current Month: {summary.month_name}</span>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Card 1: Quantities */}
            <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
                <Users size={18} className="text-blue-600" />
                <h3 className="font-bold text-slate-700">Monthly Donor Quantity</h3>
              </div>
              <div className="p-6 space-y-4">
                <StatItem label="Total Donors" value={summary.monthly_total_qty} />
                <StatItem label="Paid Donors" value={summary.monthly_paid_qty} color="text-green-600" />
                <StatItem label="Unpaid Donors" value={summary.monthly_unpaid_qty} color="text-rose-600" />
              </div>
            </div>

            {/* Card 2: Amounts */}
            <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
                <DollarSign size={18} className="text-emerald-600" />
                <h3 className="font-bold text-slate-700">Monthly Donation Amount</h3>
              </div>
              <div className="p-6 space-y-4">
                <StatItem label="Target Amount" value={`${summary.monthly_total_amt} BDT`} />
                <StatItem label="Paid Amount" value={`${summary.monthly_paid_amt} BDT`} color="text-emerald-600" />
                <StatItem label="Unpaid Amount" value={`${summary.monthly_unpaid_amt} BDT`} color="text-rose-600" />
              </div>
            </div>

            {/* Card 3: On-time Stats */}
            <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
                <Zap size={18} className="text-amber-500" />
                <h3 className="font-bold text-slate-700">On-Time Donation (This Month)</h3>
              </div>
              <div className="p-6 flex flex-col items-center justify-center h-full gap-4">
                <div className="text-center">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quantity</p>
                  <p className="text-3xl font-black text-slate-800">{summary.ontime_qty}</p>
                </div>
                <div className="text-center border-t border-slate-100 pt-4 w-full">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Amount</p>
                  <p className="text-3xl font-black text-amber-600">{summary.ontime_amt} <span className="text-sm">BDT</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Individual Summary */}
      {activeTab === 'individual' && (
        <div className="space-y-6">
          <div className="max-w-md bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
            <label className="mb-2.5 block text-sm font-bold text-black">Search & Select Donor</label>
            <div className="relative">
              <select
                value={filters.donor_id || ''}
                onChange={(e) => handleDonorSelect(e.target.value)}
                className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-5 outline-none focus:border-indigo-600 appearance-none bg-transparent"
              >
                <option value="">Select a donor...</option>
                {donors.map(d => (
                  <option key={d.id} value={d.id}>{d.full_name} ({d.phone})</option>
                ))}
              </select>
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
          </div>

          {individualData ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Donor Profile Info */}
              <div className="lg:col-span-1 space-y-6">
                <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col items-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
                      <User size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-black">{individualData.donor.full_name}</h3>
                    <p className="text-sm text-slate-500">{individualData.donor.phone}</p>
                    <span className={`mt-3 rounded-full px-3 py-1 text-xs font-bold ${individualData.donor.donor_type === 'Monthly' ? 'bg-indigo-100 text-indigo-600' : 'bg-amber-100 text-amber-600'}`}>
                                            {individualData.donor.donor_type} Donor
                                        </span>
                  </div>
                  <div className="mt-6 border-t border-slate-100 pt-6">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Address</p>
                    <p className="text-sm text-slate-700">{individualData.donor.address}</p>
                  </div>
                </div>

                {/* Due Months logic */}
                {individualData.donor.donor_type === 'Monthly' && (
                  <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm border-l-4 border-l-rose-500">
                    <div className="flex items-center gap-2 mb-4 text-rose-600">
                      <AlertCircle size={20} />
                      <h4 className="font-bold">Unpaid / Due Months</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {individualData.due_months.length > 0 ? (
                        individualData.due_months.map((month, idx) => (
                          <span key={idx} className="bg-rose-50 text-rose-600 px-3 py-1 rounded-md text-xs font-bold border border-rose-100">
                                                        {month}
                                                    </span>
                        ))
                      ) : (
                        <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                          <CheckCircle size={14} /> All months paid!
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Payment History Table */}
              <div className="lg:col-span-2 rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                  <h3 className="font-bold text-slate-700">Payment History (Current Year)</h3>
                </div>
                <div className="p-4 overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                    <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                      <th className="px-4 py-3">Month</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Date Paid</th>
                      <th className="px-4 py-3">Receipt</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                    {individualData.history.length > 0 ? (
                      individualData.history.map((h, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 font-bold text-slate-700">{h.payment_month}</td>
                          <td className="px-4 py-3 font-medium">{h.amount} BDT</td>
                          <td className="px-4 py-3 text-slate-500 text-sm">{h.paid_at}</td>
                          <td className="px-4 py-3 text-xs font-mono text-indigo-600">{h.receipt_no}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-10 text-slate-400">No payment records found for this year.</td>
                      </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50">
              <Search size={40} className="text-slate-300 mb-2" />
              <p className="text-slate-500">Please select a donor above to view their summary.</p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}

// Sub-component for clean rows in stats cards
const StatItem = ({ label, value, color = "text-slate-900" }) => (
  <div className="flex justify-between items-center pb-2 border-b border-slate-50 last:border-0 last:pb-0">
    <span className="text-sm font-medium text-slate-500">{label}:</span>
    <span className={`font-bold ${color}`}>{value}</span>
  </div>
);