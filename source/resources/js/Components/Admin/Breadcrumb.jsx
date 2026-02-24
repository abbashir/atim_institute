import React from 'react';
import { Link } from '@inertiajs/react';

const Breadcrumb = ({ pageName }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Page Title */}
      <h2 className="text-2xl font-bold text-[#1C2434] dark:text-white">
        {pageName}
      </h2>

      {/* Navigation Links */}
      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium text-slate-500 hover:text-indigo-600" href={route('admin.dashboard')}>
              Dashboard /
            </Link>
          </li>
          <li className="font-medium text-indigo-600">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;