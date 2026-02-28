<?php

namespace App\Http\Controllers\Admin;

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
    $query = Donation::with('donor');

    // Filter by Date Range
    if ($request->from_date && $request->to_date) {
      $query->whereBetween('paid_at', [$request->from_date, $request->to_date]);
    } elseif ($request->from_date) {
      $query->where('paid_at', '>=', $request->from_date);
    } elseif ($request->to_date) {
      $query->where('paid_at', '<=', $request->to_date);
    }

    // Filter by Donor Type
    if ($request->donor_type) {
      $query->whereHas('donor', function ($q) use ($request) {
        $q->where('donor_type', $request->donor_type);
      });
    }

    // Calculate total of the filtered result
    $totalAmount = $query->sum('amount');

    return Inertia::render('Admin/Reports/DonationReport', [
      'donations' => $query->latest('paid_at')->paginate(20)->withQueryString(),
      'total_amount' => number_format($totalAmount, 2, '.', ''),
      'filters' => $request->only(['from_date', 'to_date', 'donor_type'])
    ]);
  }

  /**
   * Display the Expense Report
   */
  public function expenseReport(Request $request)
  {
    $query = Expense::query();

    // Filter by Date Range
    if ($request->from_date && $request->to_date) {
      $query->whereBetween('expense_date', [$request->from_date, $request->to_date]);
    } elseif ($request->from_date) {
      $query->where('expense_date', '>=', $request->from_date);
    }

    // Calculate total expenses for the filtered result
    $totalExpense = $query->sum('amount');

    return Inertia::render('Admin/Reports/ExpenseReport', [
      'expenses' => $query->latest('expense_date')->paginate(20)->withQueryString(),
      'total_expense' => number_format($totalExpense, 2, '.', ''),
      'filters' => $request->only(['from_date', 'to_date'])
    ]);
  }
}