import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, Eye, X, ChevronDown, Receipt, Calendar, CreditCard } from 'lucide-react';
import {error, success} from "@/Utils/Notify.js";
import {formatAmount} from "@/Utils/format.js";
import Pagination from "@/Components/Admin/Common/Pagination.jsx";

const Index = ({ expenses, filters }) => {
  // Local state for search input
  const [searchValue, setSearchValue] = useState(filters.search || '');

  // Helper function to update filters
  const updateFilters = (newSearch, newStatus) => {
    router.get(
      route('admin.expenses.index'),
      { search: newSearch, status: newStatus },
      { preserveState: true, replace: true }
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters(searchValue, filters.status);
  };

  const handleStatusChange = (e) => {
    updateFilters(searchValue, e.target.value);
  };

  const clearSearch = () => {
    setSearchValue('');
    updateFilters('', filters.status);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this expense record? ')) {
      router.delete(route('admin.expenses.destroy', id), {
        preserveScroll: true,
        onSuccess: (page) => {
          // Trigger manual success if no global listener exists
          if (page.props.flash.success) {
            success(page.props.flash.success);
          }
        },
        onError: () => {
          error("Failed to delete the expense. It might be linked to other records.");
        },
      });
    }
  };

  return (
    <AdminLayout pageName="Expense Management">
      <Head title="Expenses" />

      {/* Action Bar */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
            <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
              <Search size={18} />
            </button>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search reference or paid to..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-11 pr-10 outline-none focus:border-indigo-600 shadow-sm"
            />
            {searchValue && (
              <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500">
                <X size={16} />
              </button>
            )}
          </form>

          {/* Status Filter Dropdown */}
          <div className="relative min-w-[160px]">
            <select
              value={filters.status || ''}
              onChange={handleStatusChange}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-4 pr-10 outline-none focus:border-indigo-600 shadow-sm transition-all font-medium text-slate-700"
            >
              <option value="">All Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <Link
          href={route('admin.expenses.create')}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white hover:bg-indigo-700 transition shadow-md"
        >
          <Plus size={18} />
          Add Expense
        </Link>
      </div>

      {/* Table Section */}
      <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs font-bold tracking-wider">
                <th className="px-6 py-4 text-nowrap">Date & Category</th>
                <th className="px-6 py-4">Paid To / Ref</th>
                <th className="px-6 py-4 text-right">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {expenses.data.length > 0 ? (
                expenses.data.map((expense) => (
                  <tr key={expense.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                           <Calendar size={14} className="text-slate-400" />
                           {expense.expense_date}
                        </span>
                        <span className="text-xs font-medium text-indigo-600 mt-0.5">
                           {expense.category_name || 'Uncategorized'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700 leading-tight">{expense.paid_to || 'N/A'}</p>
                      <p className="text-xs text-slate-500 mt-1 uppercase font-semibold">Ref: {expense.reference_no || '---'}</p>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                      {formatAmount(expense.amount)}
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex items-center gap-2 text-slate-600">
                          <CreditCard size={14} className="text-slate-400" />
                          <span className="text-xs font-medium">{expense.payment_method}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        expense.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                        expense.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {expense.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* If you have a Show page for expenses */}
                        <Link href={route('admin.expenses.show', expense.id)} className="p-1 text-slate-400 hover:text-indigo-600"><Eye size={18} /></Link>
                        {/* Edit and Delete */}
                        <Link href={route('admin.expenses.edit', expense.id)} className="p-1 text-slate-400 hover:text-amber-600"><Edit size={18} /></Link>
                        <button onClick={() => handleDelete(expense.id)} className="p-1 text-slate-400 hover:text-rose-600"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-10 text-center text-slate-500">No expense records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer (Reusing your logic) */}
        <Pagination data={expenses} filters={filters} routeName="admin.expenses.index" />
      </div>
    </AdminLayout>
  );
};

export default Index;