import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Edit, MapPin, Phone, User, BookOpen, Users, Calendar } from 'lucide-react';

const Show = ({ student }) => {
    console.log("student: ",student);

  return (
    <AdminLayout pageName="Student Profile">
      <Head title={`Profile - ${student.full_name}`} />

      {/* Header Actions */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href={route('admin.students.index')}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to List</span>
        </Link>
        <Link
          href={route('admin.students.edit', student.id)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition shadow-sm"
        >
          <Edit size={16} />
          Edit Profile
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
            <p className="text-sm font-medium text-indigo-600">{student.class} | Roll: {student.roll_number}</p>
            <div className="mt-4 flex justify-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 uppercase">
                {student.blood_group || 'N/A'}
              </span>
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                {student.academic_year}
              </span>
            </div>
          </div>

          <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4 flex items-center gap-2 font-bold text-slate-800">
              <Phone size={18} className="text-indigo-600" />
              Quick Contact
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Father's Phone</label>
                <p className="text-slate-700 font-medium">{student.father_phone || 'N/A'}</p>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-400 font-bold">Mother's Phone</label>
                <p className="text-slate-700 font-medium">{student.mother_phone || 'N/A'}</p>
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
              Personal & Academic Details
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <DetailItem label="Full Name" value={student.full_name} />
              <DetailItem label="Gender" value={student.gender} />
              <DetailItem label="Date of Birth" value={new Date(student.date_of_birth).toLocaleDateString()} />
              <DetailItem label="Blood Group" value={student.blood_group} />
              <DetailItem label="Class" value={student.class} />
              <DetailItem label="Roll Number" value={student.roll_number} />
              <DetailItem label="Academic Year" value={student.academic_year} />
              <DetailItem label="Status" value={student.status} highlight={student.status === 'Active'} />
            </div>
          </div>

          {/* Section: Family / Guardians */}
          <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2 font-bold text-slate-800">
              <Users size={18} className="text-indigo-600" />
              Guardian Information
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailItem label="Father's Name" value={student.father_name} />
              <DetailItem label="Mother's Name" value={student.mother_name} />
              {student.local_guardian_name && (
                <>
                  <DetailItem label="Local Guardian" value={student.local_guardian_name} />
                  <DetailItem label="Relation" value={student.local_guardian_relation} />
                </>
              )}
            </div>
          </div>

          {/* Section: Addresses */}
          <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-2 font-bold text-slate-800">
              <MapPin size={18} className="text-indigo-600" />
              Address Details
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">Present Address</h4>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-md border border-slate-100">
                  {student.present_address}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-400 uppercase mb-2">Permanent Address</h4>
                <p className="text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-md border border-slate-100">
                  {student.same_as_present ? 'Same as present address' : student.permanent_address}
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
      {value || <span className="text-slate-300">Not Provided</span>}
    </p>
  </div>
);

export default Show;