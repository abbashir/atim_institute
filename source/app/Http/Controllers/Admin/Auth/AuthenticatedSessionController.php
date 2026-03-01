<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
  /**
   * Show admin login page
   */
  public function create(): Response|RedirectResponse
  {
    // If already logged in as admin, redirect to dashboard
    if (Auth::guard('admin')->check()) {
      return redirect()->route('admin.dashboard');
    }

    return Inertia::render('Admin/Auth/Login');
  }

  /**
   * Handle admin login request
   */
  public function store(Request $request): RedirectResponse
  {
    // Validate input
    $request->validate([
      'email' => ['required', 'email', 'exists:admins,email'],
      'password' => ['required', 'string'],
    ]);

    // Attempt login
    if (! Auth::guard('admin')->attempt(
      $request->only('email', 'password'),
      $request->boolean('remember')
    )) {
      throw ValidationException::withMessages([
        'email' => __('auth.failed'),
      ]);
    }

    // Regenerate session to prevent fixation attack
    $request->session()->regenerate();

    return redirect()->intended(route('admin.dashboard'));
  }

  /**
   * Show the password change page
   */
  public function passwordUpdatePage()
  {
    return Inertia::render('Admin/Settings/PasswordUpdate');
  }

  /**
   * Update the admin's password
   */
  public function updatePassword(Request $request)
  {
    $validated = $request->validate([
      'current_password' => ['required', 'current_password:admin'],
      'password' => ['required', Password::defaults(), 'confirmed'],
    ]);

    $request->user('admin')->update([
      'password' => Hash::make($validated['password']),
    ]);

    return back()->with('success', 'Password changed successfully.');
  }

  /**
   * Handle admin logout
   */
  public function destroy(Request $request): RedirectResponse
  {
    Auth::guard('admin')->logout();

    // Invalidate session
    $request->session()->invalidate();

    // Regenerate CSRF token
    $request->session()->regenerateToken();

    return redirect()->route('admin.login');
  }
}