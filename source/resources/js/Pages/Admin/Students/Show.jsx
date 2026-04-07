import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, MapPin, Phone, User, BookOpen, Users, Calendar } from 'lucide-react';
import {formatDateDisplay} from "@/Utils/format.js";
import { local } from "@/Utils/Helper.js";

const Show = ({ student }) => {
    console.log("student: ",student);

  return (
    <AdminLayout pageName={local('IDS_STUDENT_PROFILE')}>
      <Head title={`${local('IDS_STUDENT_PROFILE')} - ${student.full_name}`} />

      {/* Header Actions */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={route('admin.students.index')}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>{local('IDS_STUDENT_BACK_TO_LIST')}</span>
        </Link>
        <Link
          href={route('admin.students.edit', student.id)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition shadow-sm"
        >
          <Edit size={16} />
          {local('IDS_STUDENT_EDIT_PROFILE')}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Brief Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm text-center">
            <div className="relative mx-auto mb-4 h-32 w-32">
              <img
                src={student.photo_url}
                alt={student.full_name}
                className="h-full w-full rounded-full border-4 border-slate-50 object-cover shadow-sm"
              />
              <span className={`absolute bottom-2 right-2 h-4 w-4 rounded-full border-2 border-white ${student.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{student.full_name}</h3>
            <p className="text-sm font-medium text-indigo-600">{student.class} | {local('IDS_STUDENT_ROLL')}: {student.roll_number}</p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 uppercase">
                {student.blood_group || local('IDS_STUDENT_NA')}
              </span>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                {student.school}
              </span>
            </div>
          </div>

          <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center gap-2 font-bold text-slate-800">
              <Phone size={18} className="text-indigo-600" />
              {local('IDS_STUDENT_QUICK_CONTACT')}
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">{local('IDS_STUDENT_FATHERS_PHONE')}</label>
                <p className="text-slate-700 font-medium">{student.father_phone || local('IDS_STUDENT_NA')}</p>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">{local('IDS_STUDENT_MOTHERS_PHONE')}</label>
                <p className="text-slate-700 font-medium">{student.mother_phone || local('IDS_STUDENT_NA')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section: Academic & Personal */}
          <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2 font-bold text-slate-800">
              <User size={18} className="text-indigo-600" />
              {local('IDS_STUDENT_PERSONAL_ACADEMIC_DETAILS')}
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <DetailItem label={local('IDS_STUDENT_FULL_NAME')} value={student.full_name} />
              <DetailItem label={local('IDS_STUDENT_GENDER')} value={student.gender} />
              <DetailItem label={local('IDS_STUDENT_DATE_OF_BIRTH')} value={formatDateDisplay(student.date_of_birth)} />
              <DetailItem label={local('IDS_STUDENT_BLOOD_GROUP')} value={student.blood_group} />
              <DetailItem label={local('IDS_STUDENT_CLASS')} value={student.class} />
              <DetailItem label={local('IDS_STUDENT_ROLL_NUMBER')} value={student.roll_number} />
              <DetailItem label={local('IDS_STUDENT_ACADEMIC_YEAR')} value={student.school} />
              <DetailItem label={local('IDS_STUDENT_STATUS')} value={student.status} highlight={student.status === 'Active'} />
            </div>
          </div>

          {/* Section: Family / Guardians */}
          <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2 font-bold text-slate-800">
              <Users size={18} className="text-indigo-600" />
              {local('IDS_STUDENT_GUARDIAN_INFORMATION')}
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label={local('IDS_STUDENT_FATHERS_NAME')} value={student.father_name} />
              <DetailItem label={local('IDS_STUDENT_MOTHERS_NAME')} value={student.mother_name} />
              {student.local_guardian_name && (
                <>
                  <DetailItem label={local('IDS_STUDENT_LOCAL_GUARDIAN')} value={student.local_guardian_name} />
                  <DetailItem label={local('IDS_STUDENT_RELATION')} value={student.local_guardian_relation} />
                </>
              )}
            </div>
          </div>

          {/* Section: Addresses */}
          <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2 font-bold text-slate-800">
              <MapPin size={18} className="text-indigo-600" />
              {local('IDS_STUDENT_ADDRESS_DETAILS')}
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">{local('IDS_STUDENT_PRESENT_ADDRESS')}</h4>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-md border border-slate-100">
                  {student.present_address}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">{local('IDS_STUDENT_PERMANENT_ADDRESS')}</h4>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-md border border-slate-100">
                  {student.same_as_present ? local('IDS_STUDENT_SAME_AS_PRESENT_ADDRESS') : student.permanent_address}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

/** Reusable Detail Component **/
const DetailItem = ({ label, value, highlight }) => (
  <div>
    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">{label}</label>
    <p className={`text-slate-800 font-medium ${highlight ? 'text-emerald-600' : ''}`}>
      {value || <span className="text-slate-300">{local('IDS_STUDENT_NOT_PROVIDED')}</span>}
    </p>
  </div>
);

export default Show;