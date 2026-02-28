import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Save, User, BookOpen, MapPin, Users, ChevronDown } from 'lucide-react';
import { success, error } from '@/Utils/Notify';
import InputField from "@/Components/Form/InputField.jsx";
import SelectField from "@/Components/Form/SelectField.jsx";
import TextareaField from "@/Components/Form/TextareaField.jsx";

const Create = () => {
  const { data, setData, post, processing, errors } = useForm({
    full_name: '',
    gender: 'Male',
    date_of_birth: '',
    blood_group: '',
    photo: null,
    class: '',
    roll_number: '',
    academic_year: '2025-2026',
    father_name: '',
    father_phone: '',
    mother_name: '',
    mother_phone: '',
    local_guardian_name: '',
    local_guardian_relation: '',
    local_guardian_phone: '',
    local_guardian_address: '',
    present_address: '',
    permanent_address: '',
    same_as_present: false,
    status: 'Active',
  });

  const handleAddressSync = (e) => {
    const checked = e.target.checked;
    setData((prev) => ({
      ...prev,
      same_as_present: checked,
      permanent_address: checked ? prev.present_address : '',
    }));
  };

const handleSubmit = (e) => {
    e.preventDefault();
    
    post(route('admin.students.store'), {
        forceFormData: true,
        onSuccess: () => {
          success("Student added successfully!");
        },
        onError: (errors) => {
          error("Please fix the errors and try again.");
            console.log("Validation failed:", errors);
        },
    });
};

  return (
    <AdminLayout pageName="Add New Student">
      <Head title="Add Student" />

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* SECTION 1: Basic Information */}
        <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-7 py-4 flex items-center gap-2">
            <User size={18} className="text-indigo-600" />
            <h3 className="font-medium text-[#1C2434]">Basic Information</h3>
          </div>
          <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              required
              value={data.full_name}
              onChange={e => setData('full_name', e.target.value)}
              error={errors.full_name}
              placeholder="Enter full name"
            />

            <SelectField
              label="Gender"
              required
              value={data.gender}
              onChange={e => setData('gender', e.target.value)}
              error={errors.gender}
              options={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
                { label: 'Other', value: 'Other' },
              ]}
            />

            <InputField
              label="Date of Birth"
              required
              type="date"
              value={data.date_of_birth}
              onChange={e => setData('date_of_birth', e.target.value)}
              error={errors.date_of_birth}
            />

            <SelectField
              label="Blood Group"
              value={data.blood_group}
              onChange={e => setData('blood_group', e.target.value)}
              error={errors.blood_group}
              options={[
                { label: 'Select Blood Group', value: '' },
                { label: 'A+', value: 'A+' },
                { label: 'A-', value: 'A-' },
                { label: 'B+', value: 'B+' },
                { label: 'B-', value: 'B-' },
                { label: 'O+', value: 'O+' },
                { label: 'O-', value: 'O-' },
                { label: 'AB+', value: 'AB+' },
                { label: 'AB-', value: 'AB-' },
              ]}
            />

            <div className="col-span-full">
              <label className="mb-2.5 block text-black font-medium">Student Photo</label>
              <input
                type="file"
                onChange={e => setData('photo', e.target.files[0])}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-dashed border-slate-300 bg-slate-50 py-3 px-5 font-medium outline-none transition focus:border-indigo-600 active:border-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Academic & Guardians */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-7 py-4 flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-600" />
              <h3 className="font-medium text-[#1C2434]">Academic Info</h3>
            </div>
            <div className="p-7 space-y-4">
              <InputField label="Class" value={data.class} onChange={e => setData('class', e.target.value)} error={errors.class} placeholder="Enter Class" />
              <InputField label="Roll Number" type="number" value={data.roll_number} onChange={e => setData('roll_number', e.target.value)} error={errors.roll_number} placeholder="Enter Roll no" />
              <SelectField
                label="Academic Year"
                value={data.academic_year}
                onChange={e => setData('academic_year', e.target.value)}
                options={[
                  { label: '2024-2025', value: '2024-2025' },
                  { label: '2025-2026', value: '2025-2026' },
                ]}
              />
            </div>
          </div>

          <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-7 py-4 flex items-center gap-2">
              <Users size={18} className="text-indigo-600" />
              <h3 className="font-medium text-[#1C2434]">Guardian Info</h3>
            </div>
            <div className="p-7 space-y-4">
              <InputField label="Father's Name" required value={data.father_name} onChange={e => setData('father_name', e.target.value)} error={errors.father_name} placeholder="Enter father name" />
              <InputField label="Father's Phone" value={data.father_phone} onChange={e => setData('father_phone', e.target.value)} placeholder="Enter phone no" />
              <InputField label="Mother's Name" required value={data.mother_name} onChange={e => setData('mother_name', e.target.value)} error={errors.mother_name} placeholder="Enter mother name" />
              <InputField label="Mother's Phone" value={data.mother_phone} onChange={e => setData('mother_phone', e.target.value)} placeholder="Enter phone no" />
            </div>
          </div>
        </div>

        {/* SECTION 3: Address Section */}
        <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-7 py-4 flex items-center gap-2">
            <MapPin size={18} className="text-indigo-600" />
            <h3 className="font-medium text-[#1C2434]">Address Information</h3>
          </div>
          <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextareaField
              label="Present Address"
              required
              placeholder="Enter present address"
              value={data.present_address}
              onChange={e => setData('present_address', e.target.value)}
              error={errors.present_address}
            />

            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <label className="block text-black font-medium">Permanent Address</label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-indigo-600 font-semibold">
                  <input type="checkbox" checked={data.same_as_present} onChange={handleAddressSync} className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
                  Same as Present
                </label>
              </div>

              <TextareaField
                placeholder="Enter permanent address"
                disabled={data.same_as_present}
                value={data.permanent_address}
                onChange={e => setData('permanent_address', e.target.value)}
                error={errors.permanent_address}
              />
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
            {processing ? 'Saving...' : 'Save Student'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default Create;