<?php

namespace App\Http\Controllers\Admin;

use App\Constants\DonorType;
use App\Helpers\DateFormat;
use App\Http\Controllers\Controller;
use App\Models\Admin\Donation;
use App\Models\Admin\Expense; // Ensure you have an Expense model
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
  /**
   * Display the Donation (Collection) Report
   */
  public function donationReport(Request $request)
  {
    // Default values: Current Year (Jan to Dec)
    $fromMonth = $request->input('from_month', '01');
    $fromYear  = $request->input('from_year', date('Y'));
    $toMonth   = $request->input('to_month', '12');
    $toYear    = $request->input('to_year', date('Y'));

    // Create Carbon instances for the range
    $startDate = \Carbon\Carbon::createFromDate($fromYear, $fromMonth, 1)->startOfDay();
    $endDate   = \Carbon\Carbon::createFromDate($toYear, $toMonth, 1)->endOfMonth()->endOfDay();

    $perPage = $request->input('per_page', 10);
    $query = Donation::with('donor');

    $isOnTime = $request->input('is_on_time'); // '', '0', or '1'

//    dd($isOnTime);

    if ($isOnTime === '0') {
      // Monthly only
      $query->where('is_on_time', false)
        ->whereBetween('paid_at', [$startDate, $endDate]);

    } elseif ($isOnTime === '1') {
      // On-time only
      $query->where('is_on_time', true)
        ->whereBetween('created_at', [$startDate, $endDate]);

    } else {
      // All — union of both conditions
      $query->where(function ($q) use ($startDate, $endDate) {
        $q->where(function ($sub) use ($startDate, $endDate) {
          $sub->where('is_on_time', false)
            ->whereBetween('paid_at', [$startDate, $endDate]);
        })->orWhere(function ($sub) use ($startDate, $endDate) {
          $sub->where('is_on_time', true)
            ->whereBetween('created_at', [$startDate, $endDate]);
        });
      });
    }

    $totalAmount = (clone $query)->sum('amount');

    $donations = $query->latest()->paginate($perPage)->withQueryString()
      ->through(function ($donation) {
        $data = $donation->toArray();
        $data['paid_at'] = DateFormat::CustomDate($donation->paid_at);
        return $data;
      });
    return Inertia::render('Admin/Reports/DonationReport', [
      'donations' => $donations,
      'total_amount' => number_format($totalAmount, 2, '.', ''),
      'filters' => [
        'from_month' => $fromMonth,
        'from_year'  => $fromYear,
        'to_month'   => $toMonth,
        'to_year'    => $toYear,
        'is_on_time' => $request->is_on_time
      ]
    ]);
  }

  /**
   * Display the Expense Report
   */
  public function expenseReport(Request $request)
  {
    // 1. Determine items per page (default to 10)
    $perPage = $request->input('per_page', 10);

    // 1. Get dates from request or set defaults
    // Default: March 1st, 2026 to March 4th, 2026 (based on current date)
    $fromDate = $request->input('from_date', now()->startOfMonth()->toDateString());
    $toDate   = $request->input('to_date', now()->toDateString());

    // 2. Initialize Query
    $query = Expense::with('category:id,name')
      ->where('status', 'Approved');

    // 3. Apply Range Filter on expense_date
    // Use whereBetween with strings is fine for 'date' column types
    if ($fromDate && $toDate) {
      $query->whereBetween('expense_date', [$fromDate, $toDate]);
    }

    // 4. Calculate Total for the filtered results
    $totalAmount = (clone $query)->sum('amount');

    $expenses = $query->latest('expense_date')->paginate($perPage)->withQueryString()
      ->through(function ($donation) {
        $data = $donation->toArray();
        $data['expense_date'] = DateFormat::CustomDate($donation->expense_date);
        return $data;
      });
    // 5. Paginate and Return
    return Inertia::render('Admin/Reports/ExpenseReport', [
      'expenses' => $expenses,
      'total_expense' => number_format($totalAmount, 2, '.', ''),
      'filters' => [
        'from_date' => $fromDate,
        'to_date'   => $toDate,
      ]
    ]);
  }
}