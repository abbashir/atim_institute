import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, UserPlus, ArrowLeft, ChevronDown } from 'lucide-react';
import {DONOR_TYPES} from "@/Constants/index.js";
import InputField from "@/Components/Form/InputField.jsx";
import SelectField from "@/Components/Form/SelectField.jsx";
import {error, success} from "@/Utils/Notify.js";
import { local } from "@/Utils/Helper.js";

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

    put(route('admin.donors.update', donor.id), {
      onSuccess: (page) => {
        if (page.props.flash.success) {
          success(page.props.flash.success);
        }
        if (page.props.flash.error) {
          error(page.props.flash.error);
        }
      },
      onError: (validationErrors) => {
        // Use the aliased name here
        error("Update failed. Please check the form.");
      },
    });
  };

  return (
    <AdminLayout pageName={local('IDS_DONOR_EDIT')}>
      <Head title={`${local('IDS_DONOR_EDIT')} - ${donor.full_name}`} />

      <div className="mb-6">
        <Link href={route('admin.donors.index')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition">
          <ArrowLeft size={18} />
          {local('IDS_DONOR_BACK_TO_LIST')}
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-7 py-4 flex items-center gap-2">
            <UserPlus size={18} className="text-indigo-600" />
            <h3 className="font-medium text-[#1C2434]">{local('IDS_DONOR_UPDATE_PROFILE')}</h3>
          </div>

          <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <InputField
              label={local('IDS_DONOR_FULL_NAME')}
              required
              value={data.full_name}
              onChange={e => setData('full_name', e.target.value)}
              error={errors.full_name}
            />

            {/* Phone */}
            <InputField
              label={local('IDS_DONOR_PHONE_NUMBER')}
              required
              value={data.phone}
              onChange={e => setData('phone', e.target.value)}
              error={errors.phone}
            />

            {/* Email */}
            <InputField
              label={local('IDS_DONOR_EMAIL_ADDRESS')}
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              error={errors.email}
            />

            {/* Donation Amount */}
            <InputField
              label={local('IDS_DONOR_DONATION_AMOUNT')}
              type="number"
              step="0.01"
              required
              value={data.donation_amount}
              onChange={e => setData('donation_amount', e.target.value)}
              error={errors.donation_amount}
            />

            {/* Donor Type */}
            <SelectField
              label={local('IDS_DONOR_DONOR_TYPE')}
              required
              value={data.donor_type}
              onChange={e => setData('donor_type', e.target.value)}
              error={errors.donor_type}
              options={DONOR_TYPES}
            />

            {/* Status */}
            <SelectField
              label={local('IDS_DONOR_STATUS')}
              required
              value={data.status}
              onChange={e => setData('status', e.target.value)}
              error={errors.status}
              options={[
                { label: local('IDS_DONOR_ACTIVE'), value: 'Active' },
                { label: local('IDS_DONOR_INACTIVE'), value: 'Inactive' },
              ]}
            />

            {/* Address */}
            <div className="col-span-full">
              <label className="mb-2.5 block text-black font-medium text-sm">
                {local('IDS_DONOR_ADDRESS')} <span className="text-rose-500">*</span>
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
            {local('IDS_DONOR_CANCEL')}
          </Link>
          <button
            disabled={processing}
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-10 py-3 font-medium text-white hover:bg-indigo-700 shadow-lg transition-all"
          >
            <Save size={18} />
            {processing ? local('IDS_DONOR_UPDATING') : local('IDS_DONOR_UPDATE_DONOR')}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default Edit;