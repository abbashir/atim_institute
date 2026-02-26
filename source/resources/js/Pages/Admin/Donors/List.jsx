import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Edit, Trash2, Eye, X, ChevronDown, User, Phone, MapPin, Heart } from 'lucide-react';

const Index = ({ donors, filters }) => {
  // Local state for search input
  const [searchValue, setSearchValue] = useState(filters.search || '');

  // Helper function to update filters
  const updateFilters = (newSearch, newStatus) => {
    router.get(
      route('admin.donors.index'),
      { search: newSearch, status: newStatus },
      { preserveState: true, replace: true }
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters(searchValue, filters.status);
  };

  const handleStatusChange = (e) => {
    updateFilters(searchValue, e.target.value);
  };

  const clearSearch = () => {
    setSearchValue('');
    updateFilters('', filters.status);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this donor? This action cannot be undone.')) {
      router.delete(route('admin.donors.destroy', id));
    }
  };

  return (
    <AdminLayout pageName="Donor Management">
      <Head title="Donors" />

      {/* Action Bar */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center">

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="relative w-full max-w-md">
            <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600">
              <Search size={18} />
            </button>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by name or phone..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-11 pr-10 outline-none focus:border-indigo-600 shadow-sm"
            />
            {searchValue && (
              <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500">
                <X size={16} />
              </button>
            )}
          </form>

          {/* Status Filter Dropdown */}
          <div className="relative min-w-[160px]">
            <select
              value={filters.status || ''}
              onChange={handleStatusChange}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-4 pr-10 outline-none focus:border-indigo-600 shadow-sm transition-all font-medium text-slate-700"
            >
              <option value="">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <Link
          href={route('admin.donors.create')}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white hover:bg-indigo-700 transition shadow-md"
        >
          <Plus size={18} />
          Add Donor
        </Link>
      </div>

      {/* Table Section */}
      <div className="rounded-sm border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs font-bold tracking-wider">
                <th className="px-6 py-4">Donor Info</th>
                <th className="px-6 py-4">Contact & Type</th>
                <th className="px-6 py-4 text-right">Commitment</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {donors.data.length > 0 ? (
                donors.data.map((donor) => (
                  <tr key={donor.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                           <User size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 leading-tight">{donor.full_name}</p>
                          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                            <MapPin size={12} /> {donor.address.substring(0, 30)}{donor.address.length > 30 ? '...' : ''}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                           <Phone size={14} className="text-slate-400" />
                           {donor.phone}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-500 mt-1">
                           {donor.donor_type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                       <div className="flex flex-col items-end">
                          <span className="font-bold text-slate-900 flex items-center gap-1">
                            {parseFloat(donor.donation_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase">Fixed Amount</span>
                       </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        donor.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {donor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={route('admin.donors.show', donor.id)} className="p-1 text-slate-400 hover:text-indigo-600" title="View Details"><Eye size={18} /></Link>
                        <Link href={route('admin.donors.edit', donor.id)} className="p-1 text-slate-400 hover:text-amber-600" title="Edit Donor"><Edit size={18} /></Link>
                        <button onClick={() => handleDelete(donor.id)} className="p-1 text-slate-400 hover:text-rose-600" title="Delete Donor"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-slate-500">No donor records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex flex-col gap-4 border-t border-slate-200 bg-white px-4 md:px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center text-sm text-slate-500 sm:text-left">
            Showing <span className="font-medium text-slate-700">{donors.from || 0}</span> to{' '}
            <span className="font-medium text-slate-700">{donors.to || 0}</span> of{' '}
            <span className="font-medium text-slate-700">{donors.total}</span> entries
          </div>

          <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
            {donors.links.map((link, index) => (
              <Link
                key={index}
                href={link.url || '#'}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className={`flex h-9 min-w-[36px] items-center justify-center rounded-md border px-3 text-sm font-medium transition-all
                  ${link.active ? 'z-10 bg-indigo-600 border-indigo-600 text-white shadow-sm' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-indigo-300'}
                  ${!link.url ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''}
                  ${!link.active && link.label !== '&laquo; Previous' && link.label !== 'Next &raquo;' && index !== 1 && index !== donors.links.length - 2 ? 'hidden md:flex' : 'flex'} 
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