import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, Receipt, Calendar, CreditCard, User, FileText, Paperclip, ArrowLeft, ChevronDown } from 'lucide-react';
import InputField from "@/Components/Form/InputField.jsx";
import SelectField from "@/Components/Form/SelectField.jsx";
import {error, success} from "@/Utils/Notify.js";
import compressImage from "../../../Utils/index.js";

const Create = ({ categories }) => {
  const { data, setData, post, processing, errors } = useForm({
    expense_date: new Date().toISOString().split('T')[0], // Default to today
    category_id: '',
    amount: '',
    payment_method: 'Cash',
    paid_to: '',
    reference_no: '',
    description: '',
    attachment: null,
    status: 'Approved',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('admin.expenses.store'), {
      forceFormData: true,
      onSuccess: (page) => {
        // Check if the backend sent a success message
        if (page.props.flash.success) {
          success(page.props.flash.success);
        }
      },
      onError: (errors) => {
        // Display a general notification for validation/server errors
        error("Failed to save expense. Please check the form.");
      },
    });
  };

  return (
    <AdminLayout pageName="Add Expense">

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
            <h3 className="font-medium text-[#1C2434]">Expense Details</h3>
          </div>

          <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <InputField
              label="Expense Date"
              type="date"
              required
              value={data.expense_date}
              onChange={e => setData('expense_date', e.target.value)}
              error={errors.expense_date}
            />

            {/* Category Dropdown (Dynamic) */}
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

            {/* Amount */}
            <InputField
              label="Amount"
              type="number"
              step="0.01"
              required
              placeholder="0.00"
              value={data.amount}
              onChange={e => setData('amount', e.target.value)}
              error={errors.amount}
            />

            {/* Payment Method (Static) */}
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
              placeholder="e.g. Electric Company, Staff Name"
              value={data.paid_to}
              onChange={e => setData('paid_to', e.target.value)}
              error={errors.paid_to}
            />

            <InputField
              label="Reference No"
              placeholder="Invoice # or Transaction ID"
              value={data.reference_no}
              onChange={e => setData('reference_no', e.target.value)}
              error={errors.reference_no}
            />

            <div className="col-span-full">
              <label className="mb-2.5 block text-black font-medium text-sm">Description</label>
              <textarea
                rows="3"
                className="w-full rounded border-[1.5px] border-slate-200 py-3 px-5 outline-none transition focus:border-indigo-600"
                placeholder="Details about the expense..."
                value={data.description}
                onChange={e => setData('description', e.target.value)}
              ></textarea>
            </div>

            <div className="col-span-full">
              <label className="mb-2.5 block text-black font-medium text-sm">Attachment (Receipt)</label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const compressed = await compressImage(file, 50); // 50KB target
                  setData('attachment', compressed);
                }}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-dashed border-slate-300 bg-slate-50 py-3 px-5 outline-none transition focus:border-indigo-600"
              />
              {errors.attachment && <p className="mt-1 text-xs text-rose-500">{errors.attachment}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pb-10">
          <button type="button" className="rounded-lg border border-slate-200 px-8 py-3 font-medium text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
          <button
            disabled={processing}
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-10 py-3 font-medium text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
          >
            <Save size={18} />
            {processing ? 'Saving...' : 'Save Expense'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default Create;