<?php

use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\SettingsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use Inertia\Inertia;

// Admin Controller Imports
use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\StudentController;
use App\Http\Controllers\Admin\ExpenseController;
use App\Http\Controllers\Admin\DonorController;
use App\Http\Controllers\Admin\DonationController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Admin Routes (Prefix: admin/)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->as('admin.')->group(function () {

    // Public Admin Routes
    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);

    // Protected Admin Routes
    Route::middleware('auth:admin')->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        /**
         * Resource Routes
         * Generates: index, create, store, show, edit, update, destroy
         */
        Route::resource('students', StudentController::class);
        Route::resource('expenses', ExpenseController::class);
        Route::resource('donors', DonorController::class);


        // Donation Management Routes
        Route::get('donations/monthly', [DonationController::class, 'index'])->name('donations.monthly');
        Route::post('donations/monthly/store-payment', [DonationController::class, 'monthlyDonationStore'])->name('donations.monthly.store');

        Route::get('donations/on-time', [DonationController::class, 'OnTimeDonation'])->name('donations.on-time');
        Route::post('donations/on-time/store-payment', [DonationController::class, 'storeOnTimeDonation'])->name('donations.on-time.store');

        // Donation Summary Route
        Route::get('donations/summary', [DonationController::class, 'DonationSummary'])->name('donations.summary');


        Route::get('reports/donations', [ReportController::class, 'donationReport'])->name('reports.donations');
        Route::get('reports/expenses', [ReportController::class, 'expenseReport'])->name('reports.expenses');

        Route::get('settings', [SettingsController::class, 'settings'])->name('settings.index');

        // Separate routes for Account Settings
        Route::get('/password/update', [AuthenticatedSessionController::class, 'passwordUpdatePage'])->name('password.update');
        Route::put('/password/update', [AuthenticatedSessionController::class, 'updatePassword'])->name('password.update.store');

        Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    });
});

/*
|--------------------------------------------------------------------------
| User / Frontend Routes
|--------------------------------------------------------------------------
*/
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';