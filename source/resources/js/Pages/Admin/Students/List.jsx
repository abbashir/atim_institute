import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, Eye, User, ChevronLeft, ChevronRight } from 'lucide-react';

const Index = ({ students }) => {
  
  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      router.delete(route('admin.students.destroy', id));
    }
  };

  return (
    <AdminLayout pageName="Student List">
      <Head title="Students" />

      {/* Action Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search students..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-11 pr-4 outline-none focus:border-indigo-600"
          />
        </div>

        <Link
          href={route('admin.students.create')}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white hover:bg-indigo-700 transition shadow-md"
        >
          <Plus size={18} />
          Add Student
        </Link>
      </div>

      {/* Table Section */}
      <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs font-bold tracking-wider">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Class Info</th>
                <th className="px-6 py-4">Guardian</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.data.length > 0 ? (
                students.data.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={student.photo_url} 
                          alt={student.full_name} 
                          className="h-10 w-10 rounded-full border border-slate-200 object-cover" 
                        />
                        <div>
                          <p className="font-semibold text-slate-900 leading-tight">{student.full_name}</p>
                          <p className="text-xs text-slate-500">{student.gender} • {student.blood_group}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-700">{student.class}</p>
                      <p className="text-xs text-slate-500 text-nowrap">Roll: {student.roll_number} ({student.academic_year})</p>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p className="text-slate-700">{student.father_name}</p>
                      <p className="text-xs text-slate-500">{student.father_phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={route('admin.students.show', student.id)} className="p-1 text-slate-400 hover:text-indigo-600"><Eye size={18} /></Link>
                        <Link href={route('admin.students.edit', student.id)} className="p-1 text-slate-400 hover:text-amber-600"><Edit size={18} /></Link>
                        <button onClick={() => handleDelete(student.id)} className="p-1 text-slate-400 hover:text-rose-600"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-500">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 bg-white">
          <div className="text-sm text-slate-500">
            Showing <span className="font-medium text-slate-700">{students.from}</span> to <span className="font-medium text-slate-700">{students.to}</span> of <span className="font-medium text-slate-700">{students.total}</span> entries
          </div>
          <div className="flex gap-1">
            {students.links.map((link, index) => (
              <Link
                key={index}
                href={link.url || '#'}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className={`flex h-9 min-w-[36px] items-center justify-center rounded-md border px-3 text-sm font-medium transition-all
                  ${link.active 
                    ? 'z-10 bg-indigo-600 border-indigo-600 text-white' 
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}
                  ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Index;