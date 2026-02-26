<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Donor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DonorController extends Controller
{
        /**
     * Display a listing of the donors.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        // 1. Initialize the query
        $query = Donor::query();

        // 2. Search Filter (Name, Phone, or Email)
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('full_name', 'like', "%{$search}%")
                ->orWhere('phone', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%")
                ->orWhere('address', 'like', "%{$search}%");
            });
        }

        // 3. Status Filter (Active/Inactive)
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // 4. Get Paginated Results
        $donors = $query->latest()
            ->paginate(10)
            ->withQueryString(); // Crucial: Keeps search/status filters in pagination links

        // 5. Return to Inertia View
        return Inertia::render('Admin/Donors/List', [
            'donors' => $donors,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Donors/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name'       => 'required|string|max:255',
            'phone'           => 'required|string|max:20',
            'email'           => 'nullable|email|max:255',
            'address'         => 'required|string',
            'donation_amount' => 'required|numeric|min:0',
            'donor_type'      => 'required|string', // e.g., Monthly, One-time, Corporate
            'status'          => 'required|in:Active,Inactive',
        ]);

        Donor::create($validated);

        return redirect()->route('admin.donors.index')->with('success', 'Donor created successfully.');
    }

    public function edit(Donor $donor)
    {
        return Inertia::render('Admin/Donors/Edit', ['donor' => $donor]);
    }

    public function update(Request $request, Donor $donor)
    {
        $validated = $request->validate([
            'full_name'       => 'required|string|max:255',
            'phone'           => 'required|string|max:20',
            'email'           => 'nullable|email|max:255',
            'address'         => 'required|string',
            'donation_amount' => 'required|numeric|min:0',
            'donor_type'      => 'required|string',
            'status'          => 'required|in:Active,Inactive',
        ]);

        $donor->update($validated);

        return redirect()->route('admin.donors.index')->with('success', 'Donor updated successfully.');
    }

    public function show(Donor $donor)
    {
        return Inertia::render('Admin/Donors/Show', [
            'donor' => $donor
        ]);
    }

    public function destroy(Donor $donor)
    {
        $donor->delete();
        return redirect()->route('admin.donors.index')->with('success', 'Donor deleted.');
    }
}