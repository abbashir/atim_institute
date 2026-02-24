<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/**
 * Admin Routes
 * 
 * Defines all routes for the admin panel with prefix 'admin/'.
 * 
 * Public Routes:
 * - GET /admin/login - Display admin login form
 * - POST /admin/login - Handle admin login submission
 * 
 * Protected Routes (requires 'auth:admin' middleware):
 * - GET /admin/dashboard - Display admin dashboard
 * - POST /admin/logout - Handle admin logout
 * 
 * Controllers:
 * - AuthenticatedSessionController: Handles authentication (create, store, destroy)
 * - DashboardController: Handles dashboard display
 */
use App\Http\Controllers\Admin\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Admin\DashboardController;

Route::prefix('admin')
    ->as('admin.')
    ->group(function () {

        Route::get('/login', [AuthenticatedSessionController::class, 'create'])
            ->name('login');

        Route::post('/login', [AuthenticatedSessionController::class, 'store']);

        Route::middleware('auth:admin')->group(function () {

            Route::get('/dashboard', [DashboardController::class, 'index'])
                ->name('dashboard');

          /* Student Section Group */
          Route::prefix('students')->as('students.')->group(function () {
            // List Students
            Route::get('/', [App\Http\Controllers\Admin\StudentController::class, 'index'])
              ->name('index');

            // Add New Student (Form)
            Route::get('/create', [App\Http\Controllers\Admin\StudentController::class, 'create'])
              ->name('create');

            // Store New Student (Process)
            Route::post('/', [App\Http\Controllers\Admin\StudentController::class, 'store'])
              ->name('store');

            // View Student (Detail Page)
            Route::get('/{student}', [App\Http\Controllers\Admin\StudentController::class, 'show'])
              ->name('show');

            // Edit Student (Form)
            Route::get('/{student}/edit', [App\Http\Controllers\Admin\StudentController::class, 'edit'])
              ->name('edit');

            // Update Student (Process)
            Route::put('/{student}', [App\Http\Controllers\Admin\StudentController::class, 'update'])
              ->name('update');
          });

            Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
        });
});

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
