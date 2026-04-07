import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { Save, User, BookOpen, MapPin, Users, ChevronDown } from 'lucide-react';
import { success, error } from '@/Utils/Notify';
import InputField from "@/Components/Form/InputField.jsx";
import SelectField from "@/Components/Form/SelectField.jsx";
import TextareaField from "@/Components/Form/TextareaField.jsx";
import compressImage from "@/Utils/index.js";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { local } from "@/Utils/Helper.js";

const Create = () => {
  const { data, setData, post, processing, errors } = useForm({
    full_name: '',
    gender: 'Male',
    date_of_birth: '',
    blood_group: '',
    photo: null,
    class: '',
    roll_number: '',
    school: '',
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
      onSuccess: (page) => {
        // 1. Check if the server sent a 'success' flash message
        if (page.props.flash.success) {
          success(page.props.flash.success);
        }

        // 2. Check if the server sent an 'error' flash message (from your try-catch)
        if (page.props.flash.error) {
          error(page.props.flash.error);
        }
      },
      onError: (errors) => {
        // This triggers for validation errors (422 Unprocessable Entity)
        error("Please fix the highlighted errors.");
        console.log("Validation failed:", errors);
      },
    });
  };

  return (
    <AdminLayout pageName={local('IDS_STUDENT_ADD_NEW')}>
      <Head title={local('IDS_STUDENT_ADD_NEW')} />

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* SECTION 1: Basic Information */}
        <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-7 py-4 flex items-center gap-2">
            <User size={18} className="text-indigo-600" />
            <h3 className="font-medium text-[#1C2434]">{local('IDS_STUDENT_BASIC_INFORMATION')}</h3>
          </div>
          <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label={local('IDS_STUDENT_FULL_NAME')}
              required
              value={data.full_name}
              onChange={e => setData('full_name', e.target.value)}
              error={errors.full_name}
              placeholder={local('IDS_STUDENT_FULL_NAME')}
            />

            <SelectField
              label={local('IDS_STUDENT_GENDER')}
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

            <div>
              <label className="mb-2.5 block text-black font-medium">
                {local('IDS_STUDENT_DATE_OF_BIRTH')} <span className="text-red-500">*</span>
              </label>
              <DatePicker
                selected={data.date_of_birth ? new Date(data.date_of_birth) : null}
                onChange={(date) =>
                  setData('date_of_birth', date ? date.toISOString().split('T')[0] : '')
                }
                dateFormat="dd-MM-yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()}
                placeholderText={local('IDS_STUDENT_SELECT_DATE_OF_BIRTH')}
                className="w-full rounded-lg border-[1.5px] border-slate-300 bg-white py-3 px-5 font-medium outline-none transition focus:border-indigo-600"
                wrapperClassName="w-full"
              />
              {errors.date_of_birth && (
                <p className="mt-1 text-sm text-red-500">{errors.date_of_birth}</p>
              )}
            </div>

            <SelectField
              label={local('IDS_STUDENT_BLOOD_GROUP')}
              value={data.blood_group}
              onChange={e => setData('blood_group', e.target.value)}
              error={errors.blood_group}
              options={[
                { label: local('IDS_STUDENT_SELECT_BLOOD_GROUP'), value: '' },
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
              <label className="mb-2.5 block text-black font-medium">{local('IDS_STUDENT_PHOTO')}</label>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const compressed = await compressImage(file, 50); // 50KB target
                  setData('photo', compressed);
                }}
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
              <h3 className="font-medium text-[#1C2434]">{local('IDS_STUDENT_ACADEMIC_INFO')}</h3>
            </div>
            <div className="p-7 space-y-4">
              <InputField label={local('IDS_STUDENT_CLASS')} value={data.class} onChange={e => setData('class', e.target.value)} error={errors.class} placeholder={local('IDS_STUDENT_CLASS')} />
              <InputField label={local('IDS_STUDENT_ROLL_NUMBER')} type="number" value={data.roll_number} onChange={e => setData('roll_number', e.target.value)} error={errors.roll_number} placeholder={local('IDS_STUDENT_ROLL_NUMBER')} />
              <InputField label={local('IDS_STUDENT_SCHOOL_NAME')}
                          value={data.school}
                          onChange={e => setData('school', e.target.value)}
                          error={errors.school}
                          placeholder={local('IDS_STUDENT_SCHOOL_NAME')} />
            </div>
          </div>

          <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-7 py-4 flex items-center gap-2">
              <Users size={18} className="text-indigo-600" />
              <h3 className="font-medium text-[#1C2434]">{local('IDS_STUDENT_GUARDIAN_INFO')}</h3>
            </div>
            <div className="p-7 space-y-4">
              <InputField label={local('IDS_STUDENT_FATHERS_NAME')} required value={data.father_name} onChange={e => setData('father_name', e.target.value)} error={errors.father_name} placeholder={local('IDS_STUDENT_FATHERS_NAME')} />
              <InputField label={local('IDS_STUDENT_FATHERS_PHONE')} value={data.father_phone} onChange={e => setData('father_phone', e.target.value)} placeholder={local('IDS_STUDENT_FATHERS_PHONE')} />
              <InputField label={local('IDS_STUDENT_MOTHERS_NAME')} required value={data.mother_name} onChange={e => setData('mother_name', e.target.value)} error={errors.mother_name} placeholder={local('IDS_STUDENT_MOTHERS_NAME')} />
              <InputField label={local('IDS_STUDENT_MOTHERS_PHONE')} value={data.mother_phone} onChange={e => setData('mother_phone', e.target.value)} placeholder={local('IDS_STUDENT_MOTHERS_PHONE')} />
            </div>
          </div>
        </div>

        {/* SECTION 3: Address Section */}
        <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-7 py-4 flex items-center gap-2">
            <MapPin size={18} className="text-indigo-600" />
            <h3 className="font-medium text-[#1C2434]">{local('IDS_STUDENT_ADDRESS_INFORMATION')}</h3>
          </div>
          <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextareaField
              label={local('IDS_STUDENT_PRESENT_ADDRESS')}
              required
              placeholder={local('IDS_STUDENT_PRESENT_ADDRESS')}
              value={data.present_address}
              onChange={e => setData('present_address', e.target.value)}
              error={errors.present_address}
            />

            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <label className="block text-black font-medium">{local('IDS_STUDENT_PERMANENT_ADDRESS')}</label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-indigo-600 font-semibold">
                  <input type="checkbox" checked={data.same_as_present} onChange={handleAddressSync} className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
                  {local('IDS_STUDENT_SAME_AS_PRESENT')}
                </label>
              </div>

              <TextareaField
                placeholder={local('IDS_STUDENT_PERMANENT_ADDRESS')}
                disabled={data.same_as_present}
                value={data.permanent_address}
                onChange={e => setData('permanent_address', e.target.value)}
                error={errors.permanent_address}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pb-10">
          <Link href={route('admin.students.index')} 
                className="rounded-lg border border-slate-200 px-8 py-3 font-medium text-slate-600 hover:bg-slate-50 transition-all">
              {local('IDS_STUDENT_CANCEL')}
          </Link>
          <button
            disabled={processing}
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-10 py-3 font-medium text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
          >
            <Save size={18} />
            {processing ? local('IDS_STUDENT_SAVING') : local('IDS_STUDENT_SAVE_STUDENT')}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default Create;