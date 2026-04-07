import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { TrendingDown, Calendar, Printer, FilterX } from 'lucide-react';
import Table from "@/Components/Admin/Common/Table.jsx";
import Pagination from "@/Components/Admin/Common/Pagination.jsx";
import { formatAmount } from "@/Utils/format.js";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { parse, format } from 'date-fns';

export default function ExpenseReport({ expenses, total_expense, filters }) {

  // Convert "dd-MM-yyyy" string → Date object (or null)
  const toDate = (str) => (str ? parse(str, 'dd-MM-yyyy', new Date()) : null);

  // Convert Date object → "dd-MM-yyyy" string (for Inertia/backend)
  const toStr = (date) => (date ? format(date, 'dd-MM-yyyy') : '');

  const handleFilter = (key, value) => {
    router.get(route('admin.reports.expenses'),
      { ...filters, [key]: value },
      { preserveState: true, replace: true }
    );
  };

  const showAllRecords = () => {
    router.get(route('admin.reports.expenses'), { from_date: '', to_date: '' });
  };

  return (
    <AdminLayout pageName="Expense Report">
      <Head title="Expense Report" />

      {/* Date Chooser Section */}
      <div className="mb-6 rounded-sm border border-slate-200 bg-white p-5 shadow-sm no-print">
        <div className="flex flex-wrap items-end gap-4">

          {/* From Date */}
          <div className="w-full md:w-52">
            <label className="mb-2 block text-xs font-bold uppercase text-slate-500 tracking-tight">
              From Date
            </label>
            <DatePicker
              selected={toDate(filters.from_date)}
              onChange={(date) => handleFilter('from_date', toStr(date))}
              selectsStart
              startDate={toDate(filters.from_date)}
              endDate={toDate(filters.to_date)}
              maxDate={new Date()}
              dateFormat="dd-MM-yyyy"
              placeholderText="From date"
              className="w-full rounded border border-slate-200 py-2 px-3 text-sm focus:border-rose-500 outline-none transition-all"
            />
          </div>

          {/* To Date */}
          <div className="w-full md:w-52">
            <label className="mb-2 block text-xs font-bold uppercase text-slate-500 tracking-tight">
              To Date
            </label>
            <DatePicker
              selected={toDate(filters.to_date)}
              onChange={(date) => handleFilter('to_date', toStr(date))}
              selectsEnd
              startDate={toDate(filters.from_date)}
              endDate={toDate(filters.to_date)}
              minDate={toDate(filters.from_date)}
              
              dateFormat="dd-MM-yyyy"
              placeholderText="To date"
              className="w-full rounded border border-slate-200 py-2 px-3 text-sm focus:border-rose-500 outline-none transition-all"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                const params = new URLSearchParams({
                  from_date: filters.from_date || '',
                  to_date:   filters.to_date   || '',
                });
                window.open(route('admin.reports.expenses.print') + '?' + params.toString(), '_blank');
              }}
              className="flex items-center gap-2 rounded bg-slate-800 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-700 transition-all"
            >
              <Printer size={18} /> Print
            </button>
            <button
              onClick={showAllRecords}
              className="flex items-center gap-2 rounded border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              <FilterX size={18} /> Clear
            </button>
          </div>

        </div>
      </div>

      {/* Summary Card */}
      <div className="mb-6 rounded-sm border-l-4 border-l-rose-500 bg-white p-6 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Approved Expense</p>
          <h2 className="text-4xl font-black text-slate-800">
            {formatAmount(total_expense)}
          </h2>
          <div className="mt-2 flex items-center gap-2 text-xs font-bold text-slate-500">
            <Calendar size={14} className="text-rose-500" />
            <span>Range: {filters.from_date || 'All Time'} — {filters.to_date || 'All Time'}</span>
          </div>
        </div>
        <div className="rounded-full bg-rose-50 p-4 text-rose-600">
          <TrendingDown size={36} />
        </div>
      </div>

      {/* Expense Table */}
      <Table
        columns={[
          { label: 'ID' },
          { label: 'Date' },
          { label: 'Category' },
          { label: 'Method' },
          { label: 'Paid To / Ref' },
          { label: 'Amount', align: 'right' }
        ]}
        isEmpty={expenses.data.length === 0}
      >
        {expenses.data.map((ex) => (
          <tr key={ex.id} className="border-b border-slate-50 hover:bg-slate-100 transition-colors">
            <td className="px-6 py-4 text-sm font-medium">{ex.id}</td>
            <td className="px-6 py-4 text-sm font-medium">{ex.expense_date}</td>
            <td className="px-6 py-4 font-bold text-slate-700">{ex.category?.name || 'N/A'}</td>
            <td className="px-6 py-4 font-bold text-slate-700">{ex.payment_method || 'N/A'}</td>
            <td className="px-6 py-4">
              <div className="text-sm font-medium text-indigo-600">{ex.paid_to}</div>
              <div className="text-[10px] text-slate-400 uppercase">{ex.reference_no}</div>
            </td>
            <td className="px-6 py-4 text-right font-black text-rose-600">
              {formatAmount(ex.amount)}
            </td>
          </tr>
        ))}
      </Table>

      {/* Pagination */}
      <div className="mt-6 no-print">
        <Pagination data={expenses} filters={filters} routeName='admin.reports.expenses' />
      </div>

    </AdminLayout>
  );
}