import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout'; // Ensure path is correct
import { Head, useForm } from '@inertiajs/react';
import InputField from '@/Components/Form/InputField';
import { Save, ShieldCheck } from 'lucide-react';
import { success, error } from "@/Utils/Notify.js";

const PasswordUpdate = () => {
  const { data, setData, put, errors, processing, reset } = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    put(route('admin.password.update.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        success("Password updated successfully!");
      },
      onError: () => error("Please check the errors below."),
    });
  };

  return (
    <AdminLayout pageName="Account Settings">
      <Head title="Change Password" />

      <div className="mx-auto">
        <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
          {/* Header Section */}
          <div className="border-b border-slate-200 px-7 py-4 flex items-center gap-3">
            <ShieldCheck className="text-indigo-600" size={22} />
            <h3 className="font-bold text-black text-lg">Update Security Credentials</h3>
          </div>

          {/* Form Section */}
          <div className="p-7">
            <form onSubmit={submit} className="space-y-6">
              <InputField
                label="Current Password"
                type="password"
                required
                value={data.current_password}
                onChange={(e) => setData('current_password', e.target.value)}
                error={errors.current_password}
                placeholder="Verify current password"
              />

              <InputField
                label="New Password"
                type="password"
                required
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                error={errors.password}
                placeholder="Enter new password"
              />

              <InputField
                label="Confirm New Password"
                type="password"
                required
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                error={errors.password_confirmation}
                placeholder="Re-type new password"
              />

              <div className="flex justify-end pt-2">
                <button
                  disabled={processing}
                  type="submit"
                  className="flex items-center gap-2 rounded bg-indigo-600 px-8 py-2.5 font-medium text-white hover:bg-indigo-700 transition-all disabled:bg-slate-300 disabled:cursor-not-allowed shadow-sm"
                >
                  <Save size={18} />
                  {processing ? 'Processing...' : 'Save New Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PasswordUpdate;