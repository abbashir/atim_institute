<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Donation;
use App\Models\Admin\Donor;
use App\Models\Admin\Expense;
use App\Models\Admin\Student;
use Carbon\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
  public function index()
  {
    $now = Carbon::now();

    // Student Stats
    $analytics['students'] = [
      'total' => Student::count(),
    ];

    // Donor Stats
    $analytics['donors'] = [
      'total' => Donor::count(),
      'monthly' => Donor::where('donor_type', 'Monthly')->count(),
    ];

    // Donation Stats
    $analytics['donations'] = [
      'today'      => Donation::whereDate('created_at', $now->toDateString())->sum('amount'),
      'this_month' => Donation::whereMonth('created_at', $now->month)
        ->whereYear('created_at', $now->year)->sum('amount'),
      'this_year'  => Donation::whereYear('created_at', $now->year)->sum('amount'),
      'total'      => Donation::sum('amount'),
    ];

    // Expense Stats (Only sum 'Approved' expenses)
    $analytics['expenses'] = [
      'today'      => Expense::where('status', 'Approved')
        ->whereDate('expense_date', $now->toDateString())->sum('amount'),
      'this_month' => Expense::where('status', 'Approved')
        ->whereMonth('expense_date', $now->month)
        ->whereYear('expense_date', $now->year)->sum('amount'),
      'this_year'  => Expense::where('status', 'Approved')
        ->whereYear('expense_date', $now->year)->sum('amount'),
      'total'      => Expense::where('status', 'Approved')->sum('amount'),
    ];

    return Inertia::render('Admin/Dashboard', [
      'analytics' => $analytics
    ]);
  }
}