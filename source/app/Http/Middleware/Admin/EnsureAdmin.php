<?php

namespace App\Http\Middleware\Admin;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureAdmin
{
    if (!auth('admin')->check()) {
        return redirect()->route('admin.login');
    }

    return $next($request);
}
