import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm } from '@inertiajs/react';
import { Save, User, BookOpen, MapPin, Users, ChevronDown, ArrowLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import InputField from "@/Components/Form/InputField.jsx";
import SelectField from "@/Components/Form/SelectField.jsx";
import {error, success} from "@/Utils/Notify.js";
import compressImage from "@/Utils/index.js";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { local } from "@/Utils/Helper.js";

const Edit = ({ student }) => {
  // Initialize form with existing student data
  const { data, setData, post, processing, errors } = useForm({
    _method: 'put', // Required for Laravel to handle spoofed PUT requests with files
    full_name: student.full_name || '',
    gender: student.gender || 'Male',
    date_of_birth: student.date_of_birth ? student.date_of_birth.split('T')[0] : '',
    blood_group: student.blood_group || '',
    photo: null, // Files start as null
    class: student.class || '',
    roll_number: student.roll_number || '',
    school: student.school || '',
    father_name: student.father_name || '',
    father_phone: student.father_phone || '',
    mother_name: student.mother_name || '',
    mother_phone: student.mother_phone || '',
    local_guardian_name: student.local_guardian_name || '',
    local_guardian_relation: student.local_guardian_relation || '',
    local_guardian_phone: student.local_guardian_phone || '',
    local_guardian_address: student.local_guardian_address || '',
    present_address: student.present_address || '',
    permanent_address: student.permanent_address || '',
    same_as_present: student.same_as_present || false,
    status: student.status || 'Active',
  });

  const handleAddressSync = (e) => {
    const checked = e.target.checked;
    setData((prev) => ({
      ...prev,
      same_as_present: checked,
      permanent_address: checked ? prev.present_address : prev.permanent_address,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post(route('admin.students.update', student.id), {
      forceFormData: true,
      onSuccess: (page) => {
        // Access the flash message from the shared props
        if (page.props.flash.success) {
          success(page.props.flash.success);
        }
      },
      onError: (errors) => {
        // Trigger error notification if validation fails
        error("Update failed. Please check the form for errors.");
        console.log(errors);
      },
    });
  };

return (
    <AdminLayout pageName={local('IDS_STUDENT_EDIT')}>
      <Head title={`${local('IDS_STUDENT_EDIT')} - ${student.full_name}`} />

      <div className="mb-6">
        <Link href={route('admin.students.index')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition">
          <ArrowLeft size={18} />
          {local('IDS_STUDENT_BACK_TO_LIST')}
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* SECTION 1: Basic Information */}
        <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-7 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User size={18} className="text-indigo-600" />
              <h3 className="font-medium text-[#1C2434]">{local('IDS_STUDENT_BASIC_INFORMATION')}</h3>
            </div>
            <div className="flex items-center gap-2">
                 <span className="text-xs font-medium text-slate-400 uppercase">{local('IDS_STUDENT_CURRENT_STATUS')}:</span>
                 <select 
                    value={data.status} 
                    onChange={e => setData('status', e.target.value)}
                    className="text-xs font-bold border-none bg-slate-100 rounded px-2 py-1 focus:ring-0"
                 >
                    <option value="Active">{local('IDS_STUDENT_ACTIVE')}</option>
                    <option value="Inactive">{local('IDS_STUDENT_INACTIVE')}</option>
                 </select>
            </div>
          </div>
          <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label={local('IDS_STUDENT_FULL_NAME')} required value={data.full_name} onChange={e => setData('full_name', e.target.value)} error={errors.full_name} />
            <SelectField label={local('IDS_STUDENT_GENDER')} required value={data.gender} onChange={e => setData('gender', e.target.value)} error={errors.gender}
              options={[{ label: 'Male', value: 'Male' }, { label: 'Female', value: 'Female' }, { label: 'Other', value: 'Other' }]}
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

            <SelectField label={local('IDS_STUDENT_BLOOD_GROUP')} value={data.blood_group} onChange={e => setData('blood_group', e.target.value)} error={errors.blood_group}
              options={[
                { label: local('IDS_STUDENT_SELECT_BLOOD_GROUP'), value: '' }, { label: 'A+', value: 'A+' }, { label: 'A-', value: 'A-' },
                { label: 'B+', value: 'B+' }, { label: 'B-', value: 'B-' }, { label: 'O+', value: 'O+' },
                { label: 'O-', value: 'O-' }, { label: 'AB+', value: 'AB+' }, { label: 'AB-', value: 'AB-' },
              ]}
            />

            <div className="col-span-full">
              <label className="mb-2.5 block text-black font-medium">{local('IDS_STUDENT_CHANGE_PHOTO')}</label>
              <div className="flex items-center gap-4">
                {student.photo_url && !data.photo && (
                    <img src={student.photo_url} className="h-16 w-16 rounded-lg object-cover border border-slate-200" alt="Current" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const compressed = await compressImage(file, 50); // 50KB target
                    setData('photo', compressed);
                  }}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-dashed border-slate-300 bg-slate-50 py-3 px-5 font-medium outline-none transition focus:border-indigo-600" />
              </div>
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
              <InputField label={local('IDS_STUDENT_CLASS')} value={data.class} onChange={e => setData('class', e.target.value)} error={errors.class} />
              <InputField label={local('IDS_STUDENT_ROLL_NUMBER')} type="number" value={data.roll_number} onChange={e => setData('roll_number', e.target.value)} error={errors.roll_number} />
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
              <InputField label={local('IDS_STUDENT_FATHERS_NAME')} required value={data.father_name} onChange={e => setData('father_name', e.target.value)} error={errors.father_name} />
              <InputField label={local('IDS_STUDENT_FATHERS_PHONE')} value={data.father_phone} onChange={e => setData('father_phone', e.target.value)} />
              <InputField label={local('IDS_STUDENT_MOTHERS_NAME')} required value={data.mother_name} onChange={e => setData('mother_name', e.target.value)} error={errors.mother_name} />
              <InputField label={local('IDS_STUDENT_MOTHERS_PHONE')} value={data.mother_phone} onChange={e => setData('mother_phone', e.target.value)} />
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
            <div>
              <label className="mb-2.5 block text-black font-medium">{local('IDS_STUDENT_PRESENT_ADDRESS')} <span className="text-rose-500">*</span></label>
              <textarea rows="4" className={`w-full rounded border-[1.5px] py-3 px-5 outline-none transition focus:border-indigo-600 ${errors.present_address ? 'border-rose-500' : 'border-slate-200'}`}
                value={data.present_address} onChange={e => setData('present_address', e.target.value)}
              ></textarea>
            </div>
            <div>
              <div className="mb-2.5 flex items-center justify-between">
                <label className="block text-black font-medium">{local('IDS_STUDENT_PERMANENT_ADDRESS')}</label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-indigo-600 font-semibold">
                  <input type="checkbox" checked={data.same_as_present} onChange={handleAddressSync} className="h-4 w-4 rounded border-slate-300 text-indigo-600" />
                  {local('IDS_STUDENT_SAME_AS_PRESENT')}
                </label>
              </div>
              <textarea rows="4" disabled={data.same_as_present} className={`w-full rounded border-[1.5px] border-slate-200 py-3 px-5 outline-none transition focus:border-indigo-600 ${data.same_as_present ? 'bg-slate-50 opacity-70' : ''}`}
                value={data.permanent_address} onChange={e => setData('permanent_address', e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pb-10">
          <Link href={route('admin.students.index')} className="rounded-lg border border-slate-200 px-8 py-3 font-medium text-slate-600 hover:bg-slate-50 transition-all">{local('IDS_STUDENT_CANCEL')}</Link>
          <button disabled={processing} type="submit" className="flex items-center gap-2 rounded-lg bg-indigo-600 px-10 py-3 font-medium text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
            <Save size={18} />
            {processing ? local('IDS_STUDENT_UPDATING') : local('IDS_STUDENT_UPDATE_STUDENT')}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
};
export default Edit;