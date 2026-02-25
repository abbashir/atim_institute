<?php

namespace Database\Seeders\Admin;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ExpenseCategorySeeder extends Seeder
{
  public function run(): void
  {
    $categories = [
      'Grocery market',
      'Teacher Salary',
      'Staff Salary',
      'Electricity Bill',
      'Water Bill',
      'Internet Bill',
      'Rent',
      'Maintenance',
      'Stationery',
      'Furniture',
      'Event Expense',
      'Examination Expense',
      'Cleaning Supplies',
      'Transport Fuel',
      'Security',
      'Others',
    ];

    foreach ($categories as $category) {
      DB::table('expense_categories')->insert([
        'name' => $category,
        'status' => 'Active',
        'created_at' => Carbon::now(),
        'updated_at' => Carbon::now(),
      ]);
    }
  }
}