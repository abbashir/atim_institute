<?php

namespace App\Http\Controllers\Admin;

use App\Constants\DonorType;
use App\Http\Controllers\Controller;
use App\Models\Admin\Donor;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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

      // 1. Determine items per page (default to 10)
      $perPage = $request->input('per_page', 10);

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
            ->paginate($perPage)
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
            'phone'           => 'required|string|max:20|unique:donors,phone',
            'email'           => 'nullable|email|max:255',
            'address'         => 'required|string',
            'donation_amount' => 'required|numeric|min:0',
            'donor_type'      => 'required|string|in:' . implode(',', DonorType::ALL),
            'status'          => 'required|in:Active,Inactive',
        ]);

      try {
        // 1. Merge the authenticated admin ID
        $data = array_merge($validated, [
          'created_by' => Auth::guard('admin')->id()
        ]);

        // 2. Attempt to create the Donor
        Donor::create($data);

        return redirect()->route('admin.donors.index')
          ->with('success', 'Donor created successfully.');

      } catch (Exception $e) {
        // 3. Log the technical error for the developer
        Log::error("Donor Creation Failed: " . $e->getMessage());

        // 4. Return to the form with an error message and the user's input preserved
        return back()
          ->withInput()
          ->with('error', 'Failed to create donor. Please try again.');
      }
    }

    public function edit(Donor $donor)
    {
        return Inertia::render('Admin/Donors/Edit', ['donor' => $donor]);
    }

    public function update(Request $request, Donor $donor)
    {
        $validated = $request->validate([
            'full_name'       => 'required|string|max:255',
            'phone'           => 'required|string|max:20|unique:donors,phone,' . $donor->id,
            'email'           => 'nullable|email|max:255',
            'address'         => 'required|string',
            'donation_amount' => 'required|numeric|min:0',
            'donor_type'      => 'required|string|in:' . implode(',', DonorType::ALL),
            'status'          => 'required|in:Active,Inactive',
        ]);

      try {
        $donor->update($validated);

        return redirect()->route('admin.donors.index')
          ->with('success', 'Donor updated successfully.');
      } catch (Exception $e) {
        Log::error("Donor Update Failed: " . $e->getMessage());

        return back()
          ->withInput()
          ->with('error', 'Failed to update donor. Please try again.');
      }
    }

    public function show(Donor $donor)
    {
        return Inertia::render('Admin/Donors/Show', [
            'donor' => $donor
        ]);
    }

  public function destroy(Donor $donor)
  {
    try {
      if ($donor->donations()->exists()) {
        return back()->with('error', 'Cannot delete donor. This donor has existing donation records.');
      }

      $donor->delete();

      return redirect()->route('admin.donors.index')
        ->with('success', 'Donor deleted successfully.');
    } catch (Exception $e) {
      Log::error("Donor Deletion Failed: " . $e->getMessage());

      return back()
        ->with('error', 'Failed to delete donor. Please try again.');
    }
  }
}