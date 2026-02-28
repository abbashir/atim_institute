import React from 'react';

const Table = ({ columns, children, isEmpty }) => {
  return (
    <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
          <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs font-bold tracking-wider">
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-6 py-4 ${col.align === 'right' ? 'text-right' : ''}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
          {isEmpty ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-10 text-center text-slate-500 italic"
              >
                No records found for the selected criteria.
              </td>
            </tr>
          ) : (
            children
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;