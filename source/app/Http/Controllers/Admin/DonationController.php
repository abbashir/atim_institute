<?php

namespace App\Http\Controllers\Admin;
use App\Models\Admin\Donor;
use App\Http\Controllers\Controller;
use App\Models\Admin\Donation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

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
  public function OnTimeDonation()
  {
    return Inertia::render('Admin/Donations/OnTimeDonation');
  }

  public function storeOnTimeDonation(Request $request)
  {
    $validated = $request->validate([
      // Donor Identity
      'full_name'      => 'required|string|max:255',
      'phone'          => 'required|string|max:20',
      'email'          => 'nullable|email',
      'address'        => 'required|string',
      // Payment Details
      'amount'         => 'required|numeric|min:1',
      'paid_at'        => 'required|date',
      'payment_method' => 'required|string',
      'receipt_no'     => 'nullable|string|max:50',
    ]);

    try {
      return DB::transaction(function () use ($validated) {
        // 1. Check if donor exists by phone, if not, insert with defaults
        // firstOrCreate returns the existing model or the newly created one
        $donor = Donor::firstOrCreate(
          ['phone' => $validated['phone']],
          [
            'full_name'       => $validated['full_name'],
            'email'           => $validated['email'],
            'address'         => $validated['address'],
            'donor_type'      => 'On-time', // Hard-coded default
            'status'          => 'Active',  // Hard-coded default
            'donation_amount' => 0.00,      // Initial amount 0 as requested
          ]
        );

        // 2. Insert into donation table using the donor_id
        $date = Carbon::parse($validated['paid_at']);

        Donation::create([
          'donor_id'       => $donor->id,
          'amount'         => $validated['amount'],
          'payment_month'  => $date->format('F Y'),
          'payment_year'   => $date->format('Y'),
          'paid_at'        => $validated['paid_at'],
          'payment_method' => $validated['payment_method'],
          'receipt_no'     => $validated['receipt_no'] ?? 'REC-' . strtoupper(uniqid()),
        ]);

        // Optional: If you want the donor's donation_amount to reflect the sum:
        $donor->increment('donation_amount', $validated['amount']);

        return redirect()->back()->with('success', 'Donation recorded successfully!');
      });
    } catch (\Exception $e) {
      return redirect()->back()->with('error', 'Process failed: ' . $e->getMessage());
    }
  }

  public function DonationSummary(Request $request)
  {
    $currentMonthName = now()->format('F');
    $currentMonthYear = now()->format('F Y');
    $currentYear = now()->format('Y');

    // --- Stats Calculation ---
    $monthlyDonors = Donor::where('donor_type', 'Monthly')->where('status', 'Active')->get();
    $totalMonthlyCount = $monthlyDonors->count();
    $expectedMonthlyAmount = $monthlyDonors->sum('donation_amount');

    $paidRecords = Donation::where('payment_month', $currentMonthYear)->get();
    $paidMonthlyCount = $paidRecords->pluck('donor_id')->unique()->count();
    $paidMonthlyAmount = $paidRecords->sum('amount');

    $onTimeData = Donation::whereHas('donor', function($q) {
      $q->where('donor_type', 'On-time');
    })->whereMonth('paid_at', now()->month)->whereYear('paid_at', now()->year);

    $summary = [
      'month_name' => $currentMonthName,
      'monthly_total_qty' => $totalMonthlyCount,
      'monthly_paid_qty' => $paidMonthlyCount,
      'monthly_unpaid_qty' => $totalMonthlyCount - $paidMonthlyCount,
      'monthly_total_amt' => $expectedMonthlyAmount,
      'monthly_paid_amt' => $paidMonthlyAmount,
      'monthly_unpaid_amt' => $expectedMonthlyAmount - $paidMonthlyAmount,
      'ontime_qty' => $onTimeData->count(),
      'ontime_amt' => $onTimeData->sum('amount'),
    ];

    // --- Individual Summary Logic ---
    $individualData = null;
    if ($request->donor_id) {
      $donor = Donor::with(['donations' => function($q) use ($currentYear) {
        $q->where('payment_year', $currentYear)->orderBy('paid_at', 'desc');
      }])->findOrFail($request->donor_id);

      // Calculate Due Months for Monthly Donors
      $paidMonths = $donor->donations->pluck('payment_month')->toArray();
      $allMonths = collect(range(1, 12))->map(fn($m) => Carbon::create(null, $m, 1)->format('F ' . $currentYear));

      $individualData = [
        'donor' => $donor,
        'history' => $donor->donations,
        'due_months' => $donor->donor_type === 'Monthly'
          ? $allMonths->filter(fn($m) => !in_array($m, $paidMonths))->values()
          : []
      ];
    }

    return Inertia::render('Admin/Donations/Summary', [
      'summary' => $summary,
      'donors' => Donor::select('id', 'full_name', 'phone')->orderBy('full_name')->get(),
      'individualData' => $individualData,
      'filters' => $request->only(['donor_id'])
    ]);
  }


}
