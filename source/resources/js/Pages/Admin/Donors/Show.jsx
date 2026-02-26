import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, User, Phone, Mail, MapPin, CreditCard, Calendar, Activity } from 'lucide-react';

const Show = ({ donor }) => {
  return (
    <AdminLayout pageName="Donor Details">
      <Head title={`Donor - ${donor.full_name}`} />

      {/* Navigation & Actions */}
      <div className="mb-6 flex items-center justify-between">
        <Link href={route('admin.donors.index')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition">
          <ArrowLeft size={18} />
          Back to Donors
        </Link>
        <Link 
          href={route('admin.donors.edit', donor.id)}
          className="flex items-center gap-2 rounded-lg bg-white border border-slate-200 px-5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition shadow-sm"
        >
          <Edit size={16} />
          Edit Profile
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 border-4 border-white shadow-md">
              <User size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{donor.full_name}</h3>
            <p className="text-sm font-medium text-indigo-600 uppercase tracking-wider mt-1">{donor.donor_type}</p>
            
            <div className="mt-6 border-t border-slate-100 pt-6">
              <span className={`inline-flex rounded-full px-4 py-1 text-sm font-semibold ${
                donor.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {donor.status} Account
              </span>
            </div>
          </div>

          {/* Quick Stats/Commitment */}
          <div className="rounded-sm border border-slate-200 bg-indigo-600 p-6 shadow-sm text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-500 rounded-lg">
                <CreditCard size={20} />
              </div>
              <p className="text-indigo-100 text-sm font-medium">Monthly Commitment</p>
            </div>
            <h2 className="text-3xl font-bold">
              {parseFloat(donor.donation_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              <span className="text-sm ml-2 font-normal text-indigo-200">BDT</span>
            </h2>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="lg:col-span-2">
          <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-7 py-4">
              <h3 className="font-bold text-slate-800">Complete Information</h3>
            </div>
            <div className="p-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-6">
                
                <DetailBox 
                  icon={<Phone size={16} className="text-slate-400" />}
                  label="Phone Number" 
                  value={donor.phone} 
                />

                <DetailBox 
                  icon={<Mail size={16} className="text-slate-400" />}
                  label="Email Address" 
                  value={donor.email || 'No email provided'} 
                />

                <DetailBox 
                  icon={<Activity size={16} className="text-slate-400" />}
                  label="Donor Type" 
                  value={donor.donor_type} 
                />

                <DetailBox 
                  icon={<Calendar size={16} className="text-slate-400" />}
                  label="Member Since" 
                  value={new Date(donor.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} 
                />

                <div className="col-span-full">
                  <DetailBox 
                    icon={<MapPin size={16} className="text-slate-400" />}
                    label="Physical Address" 
                    value={donor.address} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

/* Reusable Detail Component */
const DetailBox = ({ label, value, icon }) => (
  <div>
    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
      {icon} {label}
    </label>
    <p className="text-slate-800 font-semibold text-lg leading-relaxed">
      {value || <span className="text-slate-300 italic font-normal text-sm">Not Provided</span>}
    </p>
  </div>
);

export default Show;