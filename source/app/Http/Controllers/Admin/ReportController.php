<?php

namespace App\Http\Controllers\Admin;

use App\Constants\DonorType;
use App\Helpers\DateFormat;
use App\Http\Controllers\Controller;
use App\Models\Admin\Donation;
use App\Models\Admin\Expense; // Ensure you have an Expense model
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

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
    $toDate = $request->input('to_date', now()->endOfMonth()->toDateString());

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

  public function printDonationReport(Request $request)
  {
//    dd($request->all());
    $fromMonth = $request->input('from_month', '01');
    $fromYear  = $request->input('from_year', date('Y'));
    $toMonth   = $request->input('to_month', '12');
    $toYear    = $request->input('to_year', date('Y'));

    $startDate = \Carbon\Carbon::createFromDate($fromYear, $fromMonth, 1)->startOfDay();
    $endDate   = \Carbon\Carbon::createFromDate($toYear, $toMonth, 1)->endOfMonth()->endOfDay();

    $isOnTime = $request->input('is_on_time');

    $query = Donation::with('donor');

    if ($isOnTime === '0') {
      $query->where('is_on_time', false)
        ->whereBetween('paid_at', [$startDate, $endDate]);

    } elseif ($isOnTime === '1') {
      $query->where('is_on_time', true)
        ->whereBetween('created_at', [$startDate, $endDate]);

    } else {
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

    $donations   = $query->latest()->get();
    $totalAmount = $donations->sum('amount');

    $months = ['01'=>'Jan','02'=>'Feb','03'=>'Mar','04'=>'Apr','05'=>'May','06'=>'Jun',
      '07'=>'Jul','08'=>'Aug','09'=>'Sep','10'=>'Oct','11'=>'Nov','12'=>'Dec'];

    $pdf = Pdf::loadView('reports.donation-print', [
      'donations'   => $donations,
      'totalAmount' => number_format($totalAmount, 2),
      'fromLabel'   => $months[$fromMonth] . ' ' . $fromYear,
      'toLabel'     => $months[$toMonth] . ' ' . $toYear,
    ])->setPaper('a4', 'portrait');

    return $pdf->stream('donation-report.pdf'); // stream = open in browser, download() to force download
  }

  public function printExpenseReport(Request $request)
  {
    $fromDate = $request->input('from_date');
    $toDate   = $request->input('to_date');

    $query = Expense::with('category:id,name')
      ->where('status', 'Approved');

    // Only apply date filter if both dates are present
    if ($fromDate && $toDate) {
      $query->whereBetween('expense_date', [$fromDate, $toDate]);
    }

    $expenses    = $query->latest('expense_date')->get();
    $totalAmount = $expenses->sum('amount');

    $fromLabel = $fromDate ? \Carbon\Carbon::parse($fromDate)->format('d M Y') : 'All Time';
    $toLabel   = $toDate   ? \Carbon\Carbon::parse($toDate)->format('d M Y')   : 'All Time';

    $pdf = Pdf::loadView('reports.expense-print', [
      'expenses'    => $expenses,
      'totalAmount' => number_format($totalAmount, 2),
      'fromLabel'   => $fromLabel,
      'toLabel'     => $toLabel,
    ])->setPaper('a4', 'portrait');

    return $pdf->stream('expense-report.pdf');
  }
}