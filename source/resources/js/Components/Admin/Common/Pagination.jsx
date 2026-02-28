import React from 'react';
import { Link, router } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

const Pagination = ({ data, filters }) => {
  const { links, from, to, total, per_page } = data;

  const handlePerPageChange = (e) => {
    router.get(
      route('admin.students.index'),
      { ...filters, per_page: e.target.value, page: 1 }, // Reset to page 1 when changing quantity
      { preserveState: true, replace: true }
    );
  };

  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 bg-white px-4 py-4 md:px-6 sm:flex-row sm:items-center sm:justify-between">

      {/* Left: Entries Info & Per Page Dropdown */}
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="text-sm text-slate-500">
          Showing <span className="font-medium text-slate-700">{from || 0}</span> to{' '}
          <span className="font-medium text-slate-700">{to || 0}</span> of{' '}
          <span className="font-medium text-slate-700">{total}</span> entries
        </div>

        <div className="relative flex items-center gap-2 text-sm text-slate-500">
          <span>Show</span>
          <div className="relative">
            <select
              value={per_page}
              onChange={handlePerPageChange}
              className="appearance-none rounded border border-slate-200 bg-white py-1 pl-3 pr-8 outline-none focus:border-indigo-600 font-medium text-slate-700 cursor-pointer"
            >
              {[10, 20, 30, 40, 60, 80, 100].map((num) => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
            {/*<ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />*/}
          </div>
        </div>
      </div>

      {/* Right: Navigation Links */}
      <div className="flex flex-wrap justify-center gap-1 sm:justify-end">
        {links.map((link, index) => {
          const isMobileHidden =
            !link.active &&
            link.label !== '&laquo; Previous' &&
            link.label !== 'Next &raquo;' &&
            index !== 1 &&
            index !== links.length - 2;

          return (
            <Link
              key={index}
              href={link.url || '#'}
              dangerouslySetInnerHTML={{ __html: link.label }}
              className={`flex h-9 min-w-[36px] items-center justify-center rounded-md border px-3 text-sm font-medium transition-all
                ${link.active
                ? 'z-10 bg-indigo-600 border-indigo-600 text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-indigo-300'}
                ${!link.url ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
                ${isMobileHidden ? 'hidden md:flex' : 'flex'} 
              `}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;