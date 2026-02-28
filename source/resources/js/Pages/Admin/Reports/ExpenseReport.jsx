import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { TrendingDown, Download } from 'lucide-react';
import Table from "@/Components/Admin/Common/Table.jsx";

export default function ExpenseReport({ expenses, total_expense, filters }) {

  const handleFilter = (key, value) => {
    router.get(route('admin.reports.expenses'), { ...filters, [key]: value }, { preserveState: true });
  };

  return (
    <AdminLayout pageName="Expense Report">
      <Head title="Expense Report" />

      <div className="mb-6 rounded-sm border border-slate-200 bg-white p-5 shadow-sm flex flex-wrap gap-4 items-end">
        <div className="w-full md:w-48">
          <label className="mb-2 block text-xs font-bold uppercase text-slate-500">From Date</label>
          <input type="date" value={filters.from_date || ''} onChange={e => handleFilter('from_date', e.target.value)} className="w-full rounded border border-slate-200 py-2 px-3 outline-none" />
        </div>
        <div className="w-full md:w-48">
          <label className="mb-2 block text-xs font-bold uppercase text-slate-500">To Date</label>
          <input type="date" value={filters.to_date || ''} onChange={e => handleFilter('to_date', e.target.value)} className="w-full rounded border border-slate-200 py-2 px-3 outline-none" />
        </div>
      </div>

      <div className="mb-6 rounded-sm border-l-4 border-l-rose-500 bg-white p-6 shadow-sm flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-slate-500">Total Expenses in Period</p>
          <h2 className="text-3xl font-black text-slate-800">{total_expense} <span className="text-lg">BDT</span></h2>
        </div>
        <div className="rounded-full bg-rose-50 p-3 text-rose-600">
          <TrendingDown size={32} />
        </div>
      </div>

      <Table columns={[{label: 'Date'}, {label: 'Category'}, {label: 'Purpose'}, {label: 'Amount', align: 'right'}]} isEmpty={expenses.data.length === 0}>
        {expenses.data.map((ex) => (
          <tr key={ex.id} className="border-b border-slate-50 hover:bg-slate-50">
            <td className="px-6 py-4">{ex.expense_date}</td>
            <td className="px-6 py-4 font-medium">{ex.category}</td>
            <td className="px-6 py-4 text-slate-500">{ex.purpose}</td>
            <td className="px-6 py-4 text-right font-bold text-rose-600">{ex.amount}</td>
          </tr>
        ))}
      </Table>
    </AdminLayout>
  );
}