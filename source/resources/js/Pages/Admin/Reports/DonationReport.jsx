import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { FileText, Download, Filter, Calendar } from 'lucide-react';
import Table from "@/Components/Admin/Common/Table.jsx";
import Pagination from "@/Components/Admin/Common/Pagination.jsx";

export default function DonationReport({ donations, total_amount, filters }) {

  const handleFilter = (key, value) => {
    router.get(route('admin.reports.donations'), { ...filters, [key]: value }, { preserveState: true });
  };

  const columns = [
    { label: 'Date' },
    { label: 'Donor Name' },
    { label: 'Type' },
    { label: 'Method' },
    { label: 'Receipt' },
    { label: 'Amount', align: 'right' },
  ];

  return (
    <AdminLayout pageName="Collection Report">
      <Head title="Donation Report" />

      {/* Filter Section */}
      <div className="mb-6 rounded-sm border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-end gap-4">
          <div className="w-full md:w-48">
            <label className="mb-2 block text-xs font-bold uppercase text-slate-500">From Date</label>
            <input type="date" value={filters.from_date || ''} onChange={e => handleFilter('from_date', e.target.value)} className="w-full rounded border border-slate-200 py-2 px-3 outline-none focus:border-indigo-600" />
          </div>
          <div className="w-full md:w-48">
            <label className="mb-2 block text-xs font-bold uppercase text-slate-500">To Date</label>
            <input type="date" value={filters.to_date || ''} onChange={e => handleFilter('to_date', e.target.value)} className="w-full rounded border border-slate-200 py-2 px-3 outline-none focus:border-indigo-600" />
          </div>
          <div className="w-full md:w-48">
            <label className="mb-2 block text-xs font-bold uppercase text-slate-500">Donor Type</label>
            <select value={filters.donor_type || ''} onChange={e => handleFilter('donor_type', e.target.value)} className="w-full rounded border border-slate-200 py-2 px-3 outline-none focus:border-indigo-600">
              <option value="">All Types</option>
              <option value="Monthly">Monthly</option>
              <option value="On-time">On-time</option>
            </select>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 rounded bg-slate-800 px-5 py-2.5 text-white hover:bg-slate-700">
            <Download size={18} /> Print PDF
          </button>
        </div>
      </div>

      {/* Total Summary Card */}
      <div className="mb-6 rounded-sm border-l-4 border-l-emerald-500 bg-white p-6 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-slate-500">Total Collection in Period</p>
          <h2 className="text-3xl font-black text-slate-800">{total_amount} <span className="text-lg">BDT</span></h2>
        </div>
        <div className="rounded-full bg-emerald-50 p-3 text-emerald-600">
          <FileText size={32} />
        </div>
      </div>

      <Table columns={columns} isEmpty={donations.data.length === 0}>
        {donations.data.map((item) => (
          <tr key={item.id} className="hover:bg-slate-50 border-b border-slate-50">
            <td className="px-6 py-4 text-sm">{item.paid_at}</td>
            <td className="px-6 py-4 font-bold text-slate-700">{item.donor?.full_name}</td>
            <td className="px-6 py-4 text-xs font-bold uppercase text-slate-500">{item.donor?.donor_type}</td>
            <td className="px-6 py-4 text-sm">{item.payment_method}</td>
            <td className="px-6 py-4 text-xs font-mono text-indigo-600">{item.receipt_no}</td>
            <td className="px-6 py-4 text-right font-bold text-slate-900">{item.amount}</td>
          </tr>
        ))}
      </Table>

      <Pagination data={donations} filters={filters} />
    </AdminLayout>
  );
}