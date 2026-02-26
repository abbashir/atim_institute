import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, UserPlus, ArrowLeft, ChevronDown } from 'lucide-react';

const Edit = ({ donor }) => {
  // Pre-fill the form with existing donor data
  const { data, setData, put, processing, errors } = useForm({
    full_name: donor.full_name || '',
    phone: donor.phone || '',
    email: donor.email || '',
    address: donor.address || '',
    donation_amount: donor.donation_amount || '',
    donor_type: donor.donor_type || 'Monthly',
    status: donor.status || 'Active',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('admin.donors.update', donor.id));
  };

  return (
    <AdminLayout pageName="Edit Donor">
      <Head title={`Edit - ${donor.full_name}`} />

      <div className="mb-6">
        <Link href={route('admin.donors.index')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition">
          <ArrowLeft size={18} />
          Back to Donors
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-7 py-4 flex items-center gap-2">
            <UserPlus size={18} className="text-indigo-600" />
            <h3 className="font-medium text-[#1C2434]">Update Donor Profile</h3>
          </div>

          <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <InputField
              label="Full Name"
              required
              value={data.full_name}
              onChange={e => setData('full_name', e.target.value)}
              error={errors.full_name}
            />

            {/* Donor Type */}
            <SelectField
              label="Donor Type"
              required
              value={data.donor_type}
              onChange={e => setData('donor_type', e.target.value)}
              error={errors.donor_type}
              options={[
                { label: 'Monthly', value: 'Monthly' },
                { label: 'Yearly', value: 'Yearly' },
                { label: 'One-time', value: 'One-time' },
              ]}
            />

            {/* Phone */}
            <InputField
              label="Phone Number"
              required
              value={data.phone}
              onChange={e => setData('phone', e.target.value)}
              error={errors.phone}
            />

            {/* Email */}
            <InputField
              label="Email Address"
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              error={errors.email}
            />

            {/* Donation Amount */}
            <InputField
              label="Donation Amount"
              type="number"
              step="0.01"
              required
              value={data.donation_amount}
              onChange={e => setData('donation_amount', e.target.value)}
              error={errors.donation_amount}
            />

            {/* Status */}
            <SelectField
              label="Status"
              required
              value={data.status}
              onChange={e => setData('status', e.target.value)}
              error={errors.status}
              options={[
                { label: 'Active', value: 'Active' },
                { label: 'Inactive', value: 'Inactive' },
              ]}
            />

            {/* Address */}
            <div className="col-span-full">
              <label className="mb-2.5 block text-black font-medium text-sm">
                Address <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows="3"
                className={`w-full rounded border-[1.5px] py-3 px-5 outline-none transition focus:border-indigo-600 bg-transparent ${errors.address ? 'border-rose-500' : 'border-slate-200'}`}
                value={data.address}
                onChange={e => setData('address', e.target.value)}
              ></textarea>
              {errors.address && <p className="mt-1 text-xs text-rose-500">{errors.address}</p>}
            </div>
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
            {processing ? 'Updating...' : 'Update Donor'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

/* Reusable Components */
const InputField = ({ label, required, type = "text", error, ...props }) => (
  <div className="w-full">
    <label className="mb-2.5 block text-black font-medium text-sm">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <input 
      type={type} 
      {...props} 
      className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 outline-none transition focus:border-indigo-600 ${error ? 'border-rose-500' : 'border-slate-200'}`} 
    />
    {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
  </div>
);

const SelectField = ({ label, required, options, error, ...props }) => (
  <div className="w-full">
    <label className="mb-2.5 block text-black font-medium text-sm">
      {label} {required && <span className="text-rose-500">*</span>}
    </label>
    <div className="relative">
      <select 
        {...props} 
        className={`w-full appearance-none rounded border py-3 px-5 outline-none transition focus:border-indigo-600 bg-transparent ${error ? 'border-rose-500' : 'border-slate-200'}`}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <span className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 pointer-events-none">
        <ChevronDown size={18} />
      </span>
    </div>
    {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
  </div>
);

export default Edit;