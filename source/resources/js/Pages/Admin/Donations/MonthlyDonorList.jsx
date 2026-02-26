import React, { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { success, error } from '@/Utils/Notify';
import { Search, CreditCard, X, CheckCircle, AlertCircle, Filter, RotateCcw } from 'lucide-react';

const MonthlyDonorList = ({ donors, filters }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState(null);

    // 1. Local State for Form Inputs
    const [formFilters, setFormFilters] = useState({
        search: filters.search || '',
        month: filters.month || '',
        year: filters.year || '',
        payment_status: filters.payment_status || 'unpaid',
    });

    // 2. Filter Action
    const handleFilterSubmit = (e) => {
        e.preventDefault();
        router.get(route('admin.donations.monthly'), formFilters, {
            preserveState: true,
            replace: true,
        });
    };

    // 3. Clear Action (Reset to Initial State)
    const handleClear = () => {
        const initialState = {
            search: '',
            month: new Date().toLocaleString('en-us', { month: 'long' }),
            year: new Date().getFullYear().toString(),
            payment_status: 'unpaid',
        };
        setFormFilters(initialState);
        router.get(route('admin.donations.monthly'), initialState);
    };

    // Modal Form Hook - Added 'errors' to destructuring to fix the "not defined" issue
    const { data, setData, post, processing, reset, errors } = useForm({
        donor_id: '',
        amount: '',
        payment_month: filters.month,
        payment_year: filters.year,
        paid_at: new Date().toISOString().split('T')[0],
        payment_method: 'Cash',
        receipt_no: '',
    });

    const openPayModal = (donor) => {
        setSelectedDonor(donor);
        setData({
            ...data,
            donor_id: donor.id,
            amount: donor.donation_amount,
            payment_month: filters.month,
            payment_year: filters.year,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const submitPayment = (e) => {
        e.preventDefault();
        post(route('admin.donations.monthly.store'), {
            onSuccess: () => {
            closeModal();
            // You don't even need to call success() here if you set up 
            // the listener in step 3, but you can if you want:
            success("Payment recorded successfully!");
            },
            onError: () => {
                error("Please fix the errors and try again.");
            }
            
        });
    };

    return (
        <AdminLayout pageName="Monthly Donor Tracking">
            <Head title="Monthly Donors" />

            {/* Filter Bar */}
            <form onSubmit={handleFilterSubmit} className="mb-6 bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Search</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                            <input
                                type="text"
                                value={formFilters.search}
                                onChange={(e) => setFormFilters({...formFilters, search: e.target.value})}
                                className="w-full pl-9 rounded border-slate-200 text-sm h-10"
                                placeholder="Name/Phone"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Month</label>
                        <select 
                            value={formFilters.month} 
                            onChange={(e) => setFormFilters({...formFilters, month: e.target.value})}
                            className="w-full rounded border-slate-200 text-sm h-10"
                        >
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(m => (
                                <option key={m} value={m}>{m}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Year</label>
                        <input 
                            type="number" 
                            value={formFilters.year} 
                            onChange={(e) => setFormFilters({...formFilters, year: e.target.value})}
                            className="w-full rounded border-slate-200 text-sm h-10"
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Status</label>
                        <select 
                            value={formFilters.payment_status} 
                            onChange={(e) => setFormFilters({...formFilters, payment_status: e.target.value})}
                            className="w-full rounded border-slate-200 text-sm h-10 font-bold text-indigo-600"
                        >
                            <option value="all">All Status</option>
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="flex-1 bg-indigo-600 text-white text-xs font-bold py-2 rounded h-10 flex items-center justify-center gap-2 hover:bg-indigo-700 transition">
                            <Filter size={14} /> Filter
                        </button>
                        <button type="button" onClick={handleClear} className="bg-slate-100 text-slate-600 text-xs font-bold px-3 rounded h-10 flex items-center justify-center hover:bg-slate-200 transition">
                            <RotateCcw size={14} />
                        </button>
                    </div>
                </div>
            </form>

            {/* Table Section */}
            <div className="rounded-sm border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="max-w-full overflow-x-auto">
                    <table className="w-full table-auto text-left min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-xs font-bold tracking-wider">
                                <th className="px-6 py-4">Donor Details</th>
                                <th className="px-6 py-4">Address</th>
                                <th className="px-6 py-4 text-right">Fixed Amount</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {donors.data.map((donor) => (
                                <tr key={donor.id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-semibold text-slate-900">{donor.full_name}</div>
                                        <div className="text-xs text-slate-500">{donor.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 max-w-[200px] truncate">{donor.address}</td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900">৳{parseFloat(donor.donation_amount).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-center">
                                        {donor.has_paid ? (
                                            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Paid</span>
                                        ) : (
                                            <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">Unpaid</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {!donor.has_paid && (
                                            <button onClick={() => openPayModal(donor)} className="bg-indigo-600 text-white px-4 py-2 rounded text-xs font-bold hover:bg-indigo-700">Pay Now</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* PAYMENT MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
                            <h3 className="font-bold text-slate-800">New Donation Entry</h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-rose-500 transition"><X size={20} /></button>
                        </div>

                        <form onSubmit={submitPayment} className="p-6 space-y-4">
                            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg">
                                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Selected Donor</p>
                                <p className="text-lg font-bold text-slate-900">{selectedDonor?.full_name}</p>
                                <p className="text-sm text-slate-600 font-medium">Month: {data.payment_month}, {data.payment_year}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Amount (BDT)</label>
                                    <input 
                                        type="number" 
                                        value={data.amount} 
                                        onChange={e => setData('amount', e.target.value)}
                                        className="w-full rounded-lg border-slate-200 focus:border-indigo-600 font-bold" 
                                    />
                                    {errors.amount && <p className="text-rose-500 text-xs mt-1">{errors.amount}</p>}
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Payment Date</label>
                                    <input type="date" value={data.paid_at} onChange={e => setData('paid_at', e.target.value)} className="w-full rounded-lg border-slate-200 text-sm" />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Method</label>
                                    <select value={data.payment_method} onChange={e => setData('payment_method', e.target.value)} className="w-full rounded-lg border-slate-200 text-sm">
                                        <option value="Cash">Cash</option>
                                        <option value="bKash">bKash</option>
                                        <option value="Bank">Bank</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Receipt No (Optional)</label>
                                <input type="text" value={data.receipt_no} onChange={e => setData('receipt_no', e.target.value)} placeholder="Enter receipt ID" className="w-full rounded-lg border-slate-200 text-sm" />
                            </div>

                            <button type="submit" disabled={processing} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 shadow-lg flex items-center justify-center gap-2 transition">
                                {processing ? 'Processing...' : <><CreditCard size={18} /> Confirm Payment</>}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default MonthlyDonorList;