import React from 'react';

import AdminLayout from '@/Layouts/AdminLayout';

import { Head, router } from '@inertiajs/react';

import { FileText, Download, Filter, Calendar } from 'lucide-react';

import Table from "@/Components/Admin/Common/Table.jsx";

import Pagination from "@/Components/Admin/Common/Pagination.jsx";
import {formatAmount} from "@/Utils/format.js";

export default function DonationReport({ donations, total_amount, filters }) {
  const months = [
    {v: '01', l: 'Jan'}, {v: '02', l: 'Feb'}, {v: '03', l: 'Mar'}, {v: '04', l: 'Apr'},
    {v: '05', l: 'May'}, {v: '06', l: 'Jun'}, {v: '07', l: 'Jul'}, {v: '08', l: 'Aug'},
    {v: '09', l: 'Sep'}, {v: '10', l: 'Oct'}, {v: '11', l: 'Nov'}, {v: '12', l: 'Dec'}
  ];

  const years = Array.from({length: 5}, (_, i) => new Date().getFullYear() - i);

  const handleFilter = (key, value) => {
    router.get(route('admin.reports.donations'), { ...filters, [key]: value }, { preserveState: true });
  };

  const columns = [
    { label: 'Date' },
    { label: 'Donor Info' }, // Updated Label
    { label: 'Type' },
    { label: 'Method' },
    { label: 'Receipt' },
    { label: 'Amount', align: 'right' },
  ];

  return (
    <AdminLayout pageName="Collection Report">
      {/* Filter Section */}
      <div className="mb-6 rounded-sm border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">

          {/* From Month/Year */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">From</label>
              <select value={filters.from_month} onChange={e => handleFilter('from_month', e.target.value)} className="w-full rounded border border-slate-200 p-2 text-sm">
                {months.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="mb-1 opacity-0 block text-xs font-bold uppercase text-slate-500">Year</label>
              <select value={filters.from_year} onChange={e => handleFilter('from_year', e.target.value)} className="w-full rounded border border-slate-200 p-2 text-sm">
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          {/* To Month/Year */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="mb-1 block text-xs font-bold text-slate-500 uppercase">To</label>
              <select value={filters.to_month} onChange={e => handleFilter('to_month', e.target.value)} className="w-full rounded border border-slate-200 p-2 text-sm">
                {months.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="mb-1 opacity-0 block text-xs font-bold uppercase text-slate-500">Year</label>
              <select value={filters.to_year} onChange={e => handleFilter('to_year', e.target.value)} className="w-full rounded border border-slate-200 p-2 text-sm">
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-bold uppercase text-slate-500">Type</label>
            <select
              value={filters.is_on_time ?? ''}
              onChange={e => handleFilter('is_on_time', e.target.value)}
              className="w-full rounded border border-slate-200 p-2 text-sm"
            >
              <option value="">All Types</option>
              <option value="0">Monthly</option>
              <option value="1">On-time</option>
            </select>
          </div>

          <button onClick={() => {
            const params = new URLSearchParams({
              from_month: filters.from_month,
              from_year:  filters.from_year,
              to_month:   filters.to_month,
              to_year:    filters.to_year,
              ...(filters.is_on_time !== '' && { is_on_time: filters.is_on_time }),
            });
            window.open(route('admin.reports.donations.print') + '?' + params.toString(), '_blank');
          }} className="flex items-center justify-center gap-2 rounded bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 h-[38px]">
            <Download size={16} /> Print Report
          </button>
        </div>
      </div>

      {/* Total Summary Card */}
      <div className="mb-6 rounded-sm border-l-4 border-l-emerald-500 bg-white p-6 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
            Collection Summary
          </p>
          <h2 className="text-3xl font-black text-slate-800">
            {formatAmount(total_amount)}
          </h2>
          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <Calendar size={14} className="text-emerald-500" />
            <span>
        Period: <span className="font-bold text-slate-700">
          {months.find(m => m.v === filters.from_month)?.l} {filters.from_year}
        </span>
        <span className="mx-2">→</span>
        <span className="font-bold text-slate-700">
          {months.find(m => m.v === filters.to_month)?.l} {filters.to_year}
        </span>
      </span>
          </div>
        </div>
        <div className="rounded-full bg-emerald-50 p-4 text-emerald-600 shadow-inner">
          <FileText size={32} />
        </div>
      </div>

      <Table columns={columns} isEmpty={donations.data.length === 0}>
        {donations.data.map((item) => (
          <tr key={item.id} className="hover:bg-slate-50 border-b border-slate-50">
            <td className="px-6 py-4 text-sm">{item.paid_at}</td>
            <td className="px-6 py-4">
              <div className="font-bold text-slate-700">{item.donor?.full_name}</div>
              <div className="text-xs text-slate-500">{item.donor?.phone}</div> {/* Added Phone */}
            </td>
            <td className="px-6 py-4 text-xs font-bold uppercase">
              <span className={item.is_on_time ? 'text-green-500' : 'text-red-500'}>
                  {item.is_on_time ? 'On Time' : 'Monthly'}
              </span>
            </td>
            <td className="px-6 py-4 text-sm">{item.payment_method}</td>
            <td className="px-6 py-4 text-xs font-mono text-indigo-600">{item.receipt_no}</td>
            <td className="px-6 py-4 text-right font-bold text-slate-900">{formatAmount(item.amount)}</td>
          </tr>
        ))}
      </Table>

      <Pagination data={donations} filters={filters} routeName='admin.reports.donations' />
    </AdminLayout>
  );
}