import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, UserPlus, ArrowLeft, CreditCard } from 'lucide-react';
import InputField from '@/Components/Form/InputField';
import SelectField from '@/Components/Form/SelectField';
import TextareaField from '@/Components/Form/TextareaField';
import { success, error } from "@/Utils/Notify.js";

export default function OnTimeDonation() {
  const { data, setData, post, processing, errors, reset } = useForm({
    // Donor Identity
    full_name: '',
    phone: '',
    email: '',
    address: '',
    // Payment Details
    amount: '',
    paid_at: new Date().toISOString().split('T')[0],
    payment_method: 'Cash',
    receipt_no: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.donations.on-time.store'), {
      onSuccess: () => {
        reset();
        success("Record saved successfully!");
      },
      onError: () => error("Please fix the validation errors.")
    });
  };

  return (
    <AdminLayout pageName="Record On-Time Donation">
      <Head title="On-Time Donation" />

      <div className="mb-6">
        <Link href={route('admin.donors.index')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition">
          <ArrowLeft size={18} /> Back to Donor List
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Donor Identity Section */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-7 py-4 flex items-center gap-2">
            <UserPlus size={18} className="text-indigo-600" />
            <h3 className="font-medium text-black">Donor Identity</h3>
          </div>
          <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Full Name" required placeholder="Full name" value={data.full_name} onChange={e => setData('full_name', e.target.value)} error={errors.full_name} />
            <InputField label="Phone Number" required placeholder="017XXXXXXXX" value={data.phone} onChange={e => setData('phone', e.target.value)} error={errors.phone} />
            <InputField label="Email Address" type="email" placeholder="example@mail.com" value={data.email} onChange={e => setData('email', e.target.value)} error={errors.email} />
            <TextareaField label="Address" required rows="1" placeholder="Current address" value={data.address} onChange={e => setData('address', e.target.value)} error={errors.address} />
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="bg-white rounded-sm border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-7 py-4 flex items-center gap-2">
            <CreditCard size={18} className="text-indigo-600" />
            <h3 className="font-medium text-black">Payment Details</h3>
          </div>
          <div className="p-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InputField label="Amount" type="number" required placeholder="0.00" value={data.amount} onChange={e => setData('amount', e.target.value)} error={errors.amount} />
            <InputField label="Payment Date" type="date" required value={data.paid_at} onChange={e => setData('paid_at', e.target.value)} error={errors.paid_at} />
            <SelectField
              label="Payment Method" required value={data.payment_method} onChange={e => setData('payment_method', e.target.value)} error={errors.payment_method}
              options={[{label: 'Cash', value: 'Cash'}, {label: 'Bank', value: 'Bank'}, {label: 'Bkash', value: 'Bkash'}, {label: 'Nagad', value: 'Nagad'}]}
            />
            <InputField label="Receipt No" placeholder="Optional" value={data.receipt_no} onChange={e => setData('receipt_no', e.target.value)} error={errors.receipt_no} />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pb-10">
          <Link
            href={route('admin.donors.index')}
            className="rounded-lg border border-slate-200 px-8 py-3 font-medium text-slate-600 hover:bg-slate-50 transition-all"
          >
            Cancel
          </Link>
          <button
            disabled={processing}
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-10 py-3 font-medium text-white hover:bg-indigo-700 shadow-lg transition-all"
          >
            <Save size={18} />
            {processing ? 'Saving...' : 'Save Donor'}
          </button>
        </div>

      </form>
    </AdminLayout>
  );
}