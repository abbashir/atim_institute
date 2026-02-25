import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { 
  ArrowLeft, Edit, Receipt, Calendar, CreditCard, 
  User, FileText, Download, CheckCircle, Clock, XCircle 
} from 'lucide-react';

const Show = ({ expense }) => {
  // Status style helper
  const statusConfig = {
    Approved: { color: 'text-emerald-600 bg-emerald-50', icon: <CheckCircle size={16} /> },
    Pending: { color: 'text-amber-600 bg-amber-50', icon: <Clock size={16} /> },
    Rejected: { color: 'text-rose-600 bg-rose-50', icon: <XCircle size={16} /> },
  };

  const currentStatus = statusConfig[expense.status] || statusConfig.Pending;

  return (
    <AdminLayout pageName="Expense Details">
      <Head title={`Expense - ${expense.reference_no || expense.id}`} />

      {/* Header Actions */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={route('admin.expenses.index')}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to List</span>
        </Link>
        <Link
          href={route('admin.expenses.edit', expense.id)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition shadow-sm"
        >
          <Edit size={16} />
          Edit Expense
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Summary Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-sm border border-slate-200 bg-white p-8 shadow-sm text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              <Receipt size={32} />
            </div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Total Amount</h3>
            <p className="mt-2 text-4xl font-black text-slate-900">
              {parseFloat(expense.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </p>
            
            <div className={`mt-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold ${currentStatus.color}`}>
              {currentStatus.icon}
              {expense.status}
            </div>
          </div>

          {/* Metadata Card */}
          <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm font-medium">Payment Method</span>
                <span className="text-slate-900 font-bold flex items-center gap-2">
                  <CreditCard size={14} className="text-indigo-500" />
                  {expense.payment_method}
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-50 pt-4">
                <span className="text-slate-500 text-sm font-medium">Reference No</span>
                <span className="text-slate-900 font-bold font-mono">{expense.reference_no || 'N/A'}</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-50 pt-4">
                <span className="text-slate-500 text-sm font-medium">Category</span>
                <span className="text-indigo-600 font-bold">{expense.category?.name || 'Uncategorized'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Information */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2 font-bold text-slate-800">
              <FileText size={18} className="text-indigo-600" />
              Transaction Details
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <DetailBox label="Expense Date" icon={<Calendar size={16}/>} value={new Date(expense.expense_date).toLocaleDateString('en-GB', { dateStyle: 'long' })} />
              <DetailBox label="Paid To" icon={<User size={16}/>} value={expense.paid_to} />
              
              <div className="col-span-full">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Description</label>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-md border border-slate-100 italic">
                  {expense.description || "No description provided for this expense."}
                </p>
              </div>
            </div>
          </div>

          {/* Attachment Section */}
          <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2 font-bold text-slate-800">
              <Download size={18} className="text-indigo-600" />
              Evidence / Attachment
            </div>
            <div className="p-6">
              {expense.attachment ? (
                <div className="flex items-center justify-between p-4 border rounded-lg border-slate-200 hover:border-indigo-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded">
                      <FileText size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Receipt Attachment</p>
                      <p className="text-xs text-slate-500 uppercase">Click to view or download</p>
                    </div>
                  </div>
                  <a 
                    href={`/storage/${expense.attachment}`} 
                    target="_blank" 
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-indigo-600 hover:text-white rounded-md text-sm font-bold transition-all"
                  >
                    View File
                  </a>
                </div>
              ) : (
                <div className="text-center py-6 border-2 border-dashed border-slate-100 rounded-lg text-slate-400">
                  No attachment available for this transaction.
                </div>
              )}
            </div>
          </div>
          
          <div className="text-xs text-slate-400 italic px-2">
            Created on {new Date(expense.created_at).toLocaleString()} by Admin ID: {expense.created_by}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const DetailBox = ({ label, value, icon }) => (
  <div>
    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
      {icon} {label}
    </label>
    <p className="text-slate-800 font-semibold text-lg">
      {value || <span className="text-slate-300">---</span>}
    </p>
  </div>
);


export default Show;