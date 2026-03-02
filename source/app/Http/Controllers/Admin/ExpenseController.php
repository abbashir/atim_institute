<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Expense;
use App\Models\Admin\ExpenseCategory;
use App\Services\ImageService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
class ExpenseController extends Controller
{
    /**
 * Display a listing of the expenses.
 */
public function index(Request $request)
{
    // 1. Start the query with the category relationship
    $query = Expense::with('category');

    // 2. Apply Search Filter (Search by paid_to or reference_no)
    if ($request->filled('search')) {
        $search = $request->input('search');
        $query->where(function ($q) use ($search) {
            $q->where('paid_to', 'like', "%{$search}%")
              ->orWhere('reference_no', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%");
        });
    }

    // 3. Apply Status Filter
    if ($request->filled('status')) {
        $query->where('status', $request->status);
    }

    // 4. Get Paginated Results
    $expenses = $query->latest()
        ->paginate(10)
        ->withQueryString(); // Keeps filters in pagination links

    // 5. Render View with Data and current Filters
    return Inertia::render('Admin/Expenses/List', [
        'expenses' => $expenses,
        'filters'  => $request->only(['search', 'status']),
    ]);
}

    /**
     * Show the form for creating a new expense.
     */
    public function create()
    {
        return Inertia::render('Admin/Expenses/Create', [
            'categories' => ExpenseCategory::select('id', 'name')->get()
        ]);
    }

    /**
     * Store a newly created expense.
     */
    public function store(Request $request, ImageService $imageService)
    {
        $validated = $request->validate([
            'expense_date'   => 'required|date',
            'category_id'    => 'required|exists:expense_categories,id',
            'amount'         => 'required|numeric|min:0',
            'payment_method' => 'required|in:Cash,Bank,Mobile Banking',
            'paid_to'        => 'nullable|string|max:255',
            'reference_no'   => 'nullable|string|max:255',
            'description'    => 'nullable|string',
            'attachment'     => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'status'         => 'required|in:Pending,Approved,Rejected',
        ]);

        if ($request->hasFile('attachment')) {
          $validated['attachment'] = $imageService->upload($request->file('attachment'), 'expenses');
        }

        // Set the creator automatically
        $validated['created_by'] = auth()->id();

        Expense::create($validated);

        return redirect()->route('admin.expenses.index')
            ->with('success', 'Expense recorded successfully.');
    }

        /**
     * Display the specified expense.
     *
     * @param  \App\Models\Admin\Expense  $expense
     * @return \Inertia\Response
     */
    public function show(Expense $expense)
    {
        // Load the 'category' relationship to show the category name
        // and 'creator' if you want to show which admin logged the expense
        $expense->load(['category:id,name']);

        return Inertia::render('Admin/Expenses/Show', [
            'expense' => $expense
        ]);
    }

    public function edit(Expense $expense)
{
    return Inertia::render('Admin/Expenses/Edit', [
        'expense' => $expense,
        'categories' => ExpenseCategory::select('id', 'name')->get()
    ]);
}

public function update(Request $request, Expense $expense, ImageService $imageService)
{
    $validated = $request->validate([
        'expense_date'   => 'required|date',
        'category_id'    => 'required|exists:expense_categories,id',
        'amount'         => 'required|numeric',
        'payment_method' => 'required|in:Cash,Bank,Mobile Banking',
        'paid_to'        => 'nullable|string|max:255',
        'reference_no'   => 'nullable|string|max:255',
        'description'    => 'nullable|string',
        'attachment'     => 'nullable|file|max:2048',
        'status'         => 'required|in:Pending,Approved,Rejected',
    ]);

    // photo update method call
    $validated = $imageService->handleUpdate($validated, $request, 'attachment', 'expenses', $expense->attachment);

    $expense->update($validated);

    return redirect()->route('admin.expenses.index')->with('success', 'Expense updated!');
}

    /**
     * Remove the specified expense and its attachment.
     */
    public function destroy(Expense $expense, ImageService $imageService)
    {
        // 1. Delete the physical file from storage using the service
        if ($expense->attachment) {
          $imageService->delete($expense->attachment);
        }

        
        $expense->delete();
        return back()->with('success', 'Expense deleted.');
    }
}