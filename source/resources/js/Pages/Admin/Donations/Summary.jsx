import React, { useState, useRef, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import {Head, router} from '@inertiajs/react';
import {Users, DollarSign, Zap, Calendar, Search, AlertCircle, CheckCircle, User} from 'lucide-react';
import {formatAmount, formatNumber} from "@/Utils/format.js";

export default function Summary({summary, donors, individualData, filters, recentDonations}) {
  const [activeTab, setActiveTab] = useState(filters.donor_id ? 'individual' : 'month');

  // --- Searchable Dropdown Logic ---
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync search input text with the currently selected donor on load/filter change
  useEffect(() => {
    if (filters.donor_id) {
      const selected = donors.find(d => d.id == filters.donor_id);
      if (selected) {
        setSearchQuery(`${selected.full_name} (${selected.phone})`);
      }
    } else {
      setSearchQuery('');
    }
  }, [filters.donor_id, donors]);

  // Filter donors based on typing
  const filteredDonors = donors.filter(d =>
    d.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.phone.includes(searchQuery)
  );

  const handleDonorSelect = (id) => {
    router.get(route('admin.donations.summary'), {donor_id: id}, {
      preserveState: true, replace: true
    });
  };

  return (<AdminLayout pageName="Donation Summary">
    <Head title="Donation Summary"/>

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
    {activeTab === 'month' && (<div className="space-y-6">
      <div
        className="flex items-center gap-2 rounded-lg bg-indigo-50 px-4 py-3 text-indigo-700 border border-indigo-100 w-fit">
        <Calendar size={18}/>
        <span className="font-bold">Current Month: {summary.month_name}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Card 1: Quantities */}
        <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
            <Users size={18} className="text-blue-600"/>
            <h3 className="font-bold text-slate-700">Monthly Donor Quantity</h3>
          </div>
          <div className="p-6 space-y-4">
            <StatItem label="Total Donors" value={formatNumber(summary.monthly_total_qty)}/>
            <StatItem label="Paid Donors" value={formatNumber(summary.monthly_paid_qty)} color="text-green-600"/>
            <StatItem label="Unpaid Donors" value={formatNumber(summary.monthly_unpaid_qty)} color="text-rose-600"/>
          </div>
        </div>

        {/* Card 2: Amounts */}
        <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
            <DollarSign size={18} className="text-emerald-600"/>
            <h3 className="font-bold text-slate-700">Monthly Donation Amount</h3>
          </div>
          <div className="p-6 space-y-4">
            <StatItem label="Target Amount" value={`${formatAmount(summary.monthly_total_amt)}`}/>
            <StatItem label="Paid Amount" value={`${formatAmount(summary.monthly_paid_amt)}`} color="text-emerald-600"/>
            <StatItem label="Unpaid Amount" value={`${formatAmount(summary.monthly_unpaid_amt)}`} color="text-rose-600"/>
          </div>
        </div>

        {/* Card 3: On-time Stats */}
        <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2">
            <Zap size={18} className="text-amber-500"/>
            <h3 className="font-bold text-slate-700">On-Time Donation (This Month)</h3>
          </div>
          <div className="p-6 space-y-4">
            <StatItem label="Quantity" value={`${formatNumber(summary.ontime_qty)}`}/>
            <StatItem label="Collection Amount" value={`${formatAmount(summary.ontime_amt)}`} color="text-emerald-600"/>
          </div>
        </div>
      </div>

      {/* New Table: Recent Donations for this Month */}
      <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <h3 className="font-bold text-slate-700">Donation List (This Month)</h3>
          <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-bold">
                {formatNumber(recentDonations.length)} Records
              </span>
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
            <tr
              className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 bg-slate-50/50">
              <th className="px-6 py-4">Donor Name</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Method</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Date & Time</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
            {recentDonations.length > 0 ? (recentDonations.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-700">
                  <div>{item.donor?.full_name}</div>
                  <div className="text-[10px] text-slate-400 font-normal">{item.donor?.phone}</div>
                </td>
                <td className="px-6 py-4 font-bold text-emerald-600">{formatAmount(item.amount)}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{item.payment_method}</td>
                <td className="px-6 py-4">
                  {item.is_on_time ? (<span
                    className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700 border border-amber-100">
                        <CheckCircle size={10}/> On Time
                      </span>) : (<span
                    className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700 border border-green-100">
                        <AlertCircle size={10}/> Monthly
                      </span>)}
                </td>
                <td className="px-6 py-4 text-xs text-slate-500">
                  {item.created_at}
                </td>
              </tr>))) : (<tr>
              <td colSpan="5" className="text-center py-10 text-slate-400 italic">
                No donations recorded yet this month.
              </td>
            </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>)}

    {/* Tab 2: Individual Summary */}
    {activeTab === 'individual' && (
      <div className="space-y-6">
        {/* Search & Select Donor - Searchable Dropdown */}
        <div className="max-w-md bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
          <label className="mb-2.5 block text-sm font-bold text-black">Search & Select Donor</label>

          <div className="relative" ref={dropdownRef}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onClick={() => setIsDropdownOpen(true)}
                className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-5 outline-none focus:border-indigo-600 bg-transparent"
              />
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

              {/* Clear Button (Optional) */}
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    handleDonorSelect(''); // Clear selection in parent/Inertia
                    setIsDropdownOpen(true);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dropdown List */}
            {isDropdownOpen && (
              <div className="absolute z-20 mt-1 w-full max-h-60 overflow-y-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 border border-slate-100">
                {filteredDonors.length > 0 ? (
                  filteredDonors.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                      onClick={() => {
                        handleDonorSelect(d.id);
                        setSearchQuery(`${d.full_name} (${d.phone})`);
                        setIsDropdownOpen(false);
                      }}
                    >
                      <span className="font-medium">{d.full_name}</span>
                      <span className="text-slate-400 text-xs ml-2">{d.phone}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-slate-500 text-center italic">
                    No donors match your search.
                  </div>
                )}
              </div>
            )}
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
                  <p className="text-sm text-slate-700">{individualData.donor.address || 'N/A'}</p>
                </div>

                {/* Total Donated Amount Display */}
                <div className="mt-6 border-t border-slate-100 pt-6">
                  <p className="text-xs font-bold text-slate-400 uppercase mb-2">Total Lifetime Donated</p>
                  <p className="text-2xl font-bold text-emerald-600">{formatAmount(individualData.total_amount)}</p>
                </div>
              </div>
            </div>

            {/* Payment History Table */}
            <div className="lg:col-span-2 rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                <h3 className="font-bold text-slate-700">All Payment History</h3>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                  <tr className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                    <th className="px-4 py-3">Date / Month</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Receipt</th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                  {individualData.history.length > 0 ? (
                    individualData.history.map((h, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 font-bold text-slate-700">
                          {/* Shows Payment Month if it exists, otherwise falls back to the paid/created date */}
                          {h.payment_month ? `${h.payment_month} ${h.payment_year || ''}` : h.paid_at || h.created_at}
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-700">{formatAmount(h.amount)}</td>
                        <td className="px-4 py-3 text-slate-500 text-sm">
                          {h.is_on_time ? 'One-Time' : 'Monthly'}
                        </td>
                        <td className="px-4 py-3 text-xs font-mono text-indigo-600">{h.receipt_no || '-'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-10 text-slate-400">
                        No payment records found.
                      </td>
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
  </AdminLayout>);
}

// Sub-component for clean rows in stats cards
const StatItem = ({label, value, color = "text-slate-900"}) => (
  <div className="flex justify-between items-center pb-2 border-b border-slate-50 last:border-0 last:pb-0">
    <span className="text-sm font-medium text-slate-500">{label}:</span>
    <span className={`font-bold ${color}`}>{value}</span>
  </div>);