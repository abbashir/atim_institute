<?php

namespace App\Http\Controllers\Admin;
use App\Models\Admin\Donor;
use App\Http\Controllers\Controller;
use App\Models\Admin\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function index(Request $request)
{
    // Set Initial Defaults
    $month  = $request->input('month', date('F'));
    $year   = $request->input('year', date('Y'));
    $status = $request->input('payment_status', 'unpaid'); // Initial state: unpaid
    $search = $request->input('search', '');

    $query = Donor::where('status', 'Active')->where('donor_type', 'Monthly');

    if ($search) {
        $query->where(function($q) use ($search) {
            $q->where('full_name', 'like', "%{$search}%")->orWhere('phone', 'like', "%{$search}%");
        });
    }

    if ($status === 'paid') {
        $query->whereHas('donations', fn($q) => $q->where('payment_month', $month)->where('payment_year', $year));
    } elseif ($status === 'unpaid') {
        $query->whereDoesntHave('donations', fn($q) => $q->where('payment_month', $month)->where('payment_year', $year));
    }

    $donors = $query->withExists(['donations as has_paid' => fn($q) => $q->where('payment_month', $month)->where('payment_year', $year)])
                    ->latest()->paginate(10)->withQueryString();

    return Inertia::render('Admin/Donations/MonthlyDonorList', [
        'donors' => $donors,
        'filters' => ['search' => $search, 'month' => $month, 'year' => $year, 'payment_status' => $status]
    ]);
}

/**
 * Store a newly created donation in storage.
 */
public function monthlyDonationStore(Request $request)
{
    // 1. Validation
    $validated = $request->validate([
        'donor_id'       => 'required|exists:donors,id',
        'amount'         => 'required|numeric|min:1',
        'payment_month'  => 'required|string',
        'payment_year'   => 'required|string',
        'paid_at'        => 'required|date',
        'payment_method' => 'required|string',
        'receipt_no'     => 'nullable|string|max:100',
    ]);

    try {
        DB::beginTransaction();

        // 2. Double-Check for existing payment (Prevent Duplicates)
        $exists = Donation::where('donor_id', $validated['donor_id'])
            ->where('payment_month', $validated['payment_month'])
            ->where('payment_year', $validated['payment_year'])
            ->exists();

        if ($exists) {
            return redirect()->back()->withErrors([
                'amount' => "A payment for {$validated['payment_month']} {$validated['payment_year']} has already been recorded for this donor."
            ]);
        }

        // 3. Create the Record
        Donation::create($validated);

        DB::commit();

        // 4. Redirect with Success Message
        return redirect()->back()->with('success', 'Donation recorded successfully!');

    } catch (\Exception $e) {
        DB::rollBack();
        
        return redirect()->back()->withErrors([
            'amount' => 'Something went wrong while saving the donation. Please try again.'
        ]);
    }
}


}
