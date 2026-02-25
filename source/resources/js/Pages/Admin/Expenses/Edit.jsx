import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, Receipt, ArrowLeft, ChevronDown } from 'lucide-react';

const Edit = ({ expense, categories }) => {
  const { data, setData, post, processing, errors } = useForm({
    _method: 'put', // Required for file uploads in updates
    expense_date: expense.expense_date || '',
    category_id: expense.category_id || '',
    amount: expense.amount || '',
    payment_method: expense.payment_method || 'Cash',
    paid_to: expense.paid_to || '',
    reference_no: expense.reference_no || '',
    description: expense.description || '',
    attachment: null, // Keep null unless a new file is chosen
    status: expense.status || 'Approved',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // We use post() because of the _method: 'put' trick for files
    post(route('admin.expenses.update', expense.id), {
      forceFormData: true,
    });
  };

  return (
    <AdminLayout pageName="Edit Expense">
      <Head title="Edit Expense" />

      <div className="mb-6">
        <Link href={route('admin.expenses.index')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition">
          <ArrowLeft size={18} />
          Back to Expenses
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-7 py-4 flex items-center gap-2">
            <Receipt size={18} className="text-indigo-600" />
            <h3 className="font-medium text-[#1C2434]">Update Expense Details</h3>
          </div>

          <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Expense Date"
              type="date"
              required
              value={data.expense_date}
              onChange={e => setData('expense_date', e.target.value)}
              error={errors.expense_date}
            />

            <SelectField
              label="Expense Category"
              required
              value={data.category_id}
              onChange={e => setData('category_id', e.target.value)}
              error={errors.category_id}
              options={[
                { label: 'Select Category', value: '', disabled: true },
                ...categories.map(cat => ({ label: cat.name, value: cat.id }))
              ]}
            />

            <InputField
              label="Amount"
              type="number"
              step="0.01"
              required
              value={data.amount}
              onChange={e => setData('amount', e.target.value)}
              error={errors.amount}
            />

            <SelectField
              label="Payment Method"
              required
              value={data.payment_method}
              onChange={e => setData('payment_method', e.target.value)}
              error={errors.payment_method}
              options={[
                { label: 'Cash', value: 'Cash' },
                { label: 'Bank', value: 'Bank' },
                { label: 'Mobile Banking', value: 'Mobile Banking' },
              ]}
            />

            <InputField
              label="Paid To"
              value={data.paid_to}
              onChange={e => setData('paid_to', e.target.value)}
              error={errors.paid_to}
            />

            <InputField
              label="Reference No"
              value={data.reference_no}
              onChange={e => setData('reference_no', e.target.value)}
              error={errors.reference_no}
            />

            <div className="col-span-full">
              <label className="mb-2.5 block text-black font-medium text-sm">Description</label>
              <textarea
                rows="3"
                className="w-full rounded border-[1.5px] border-slate-200 py-3 px-5 outline-none transition focus:border-indigo-600"
                value={data.description}
                onChange={e => setData('description', e.target.value)}
              ></textarea>
            </div>

            <div className="col-span-full">
              <label className="mb-2.5 block text-black font-medium text-sm">
                Attachment (Leave empty to keep current file)
              </label>
              <input
                type="file"
                onChange={e => setData('attachment', e.target.files[0])}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-dashed border-slate-300 bg-slate-50 py-3 px-5 outline-none transition focus:border-indigo-600"
              />
              {expense.attachment && (
                <p className="mt-2 text-xs text-indigo-600 font-medium italic">
                  Current file: {expense.attachment.split('/').pop()}
                </p>
              )}
              {errors.attachment && <p className="mt-1 text-xs text-rose-500">{errors.attachment}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pb-10">
          <Link href={route('admin.expenses.index')} className="rounded-lg border border-slate-200 px-8 py-3 font-medium text-slate-600 hover:bg-slate-50 transition-all">Cancel</Link>
          <button
            disabled={processing}
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-10 py-3 font-medium text-white hover:bg-indigo-700 shadow-lg transition-all"
          >
            <Save size={18} />
            {processing ? 'Updating...' : 'Update Expense'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

/* Reusable Components (Keep these at bottom) */
const InputField = ({ label, required, type = "text", error, ...props }) => (
  <div className="w-full">
    <label className="mb-2.5 block text-black font-medium text-sm">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <input type={type} {...props} className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 outline-none transition focus:border-indigo-600 ${error ? 'border-rose-500' : 'border-slate-200'}`} />
    {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
  </div>
);

const SelectField = ({ label, required, options, error, ...props }) => (
  <div className="w-full">
    <label className="mb-2.5 block text-black font-medium text-sm">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative">
      <select {...props} className={`w-full appearance-none rounded border py-3 px-5 outline-none transition focus:border-indigo-600 bg-transparent ${error ? 'border-rose-500' : 'border-slate-200'}`}>
        {options.map((opt, i) => <option key={i} value={opt.value} disabled={opt.disabled}>{opt.label}</option>)}
      </select>
      <span className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 pointer-events-none"><ChevronDown size={18} /></span>
    </div>
    {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
  </div>
);

export default Edit;