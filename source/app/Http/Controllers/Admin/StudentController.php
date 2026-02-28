<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Admin\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;


class StudentController extends Controller
{
    /**
     * Display a listing of students.
     */
    public function index(Request $request)
    {
      $query = Student::query();

      // 1. Determine items per page (default to 10)
      $perPage = $request->input('per_page', 10);

      // 2. Search logic
      $query->when($request->search, function ($q, $search) {
        $q->where(function($sub) use ($search) {
          $sub->where('full_name', 'like', "%{$search}%")
            ->orWhere('roll_number', 'like', "%{$search}%")
            ->orWhere('father_name', 'like', "%{$search}%");
        });
      });

      // 3. Status logic
      $query->when($request->status, function ($q, $status) {
        $q->where('status', $status);
      });

      return inertia('Admin/Students/List', [
        // Use the $perPage variable here
        'students' => $query->latest()->paginate($perPage)->withQueryString(),

        // Pass per_page back so the dropdown in React stays synced
        'filters'  => $request->only(['search', 'status', 'per_page'])
      ]);
    }

  /**
   * Show the form for creating a new student.
   */
  public function create()
  {
    return Inertia::render('Admin/Students/Create');
  }

  /**
   * Store a newly created student in storage.
   */
  public function store(Request $request)
  {
    $validated = $request->validate([
      // Required Fields
      'full_name'       => 'required|string|max:255',
      'gender'          => 'required|in:Male,Female,Other',
      'date_of_birth'   => 'required|date',
      'father_name'     => 'required|string|max:255',
      'mother_name'     => 'required|string|max:255',
      'present_address'  => 'required|string',

      // Optional Fields (nullable)
      'blood_group'     => 'nullable|string',
      'photo'           => 'nullable|image|max:2048',
      'class'           => 'nullable|string',
      'roll_number'     => 'nullable|integer',
      'academic_year'   => 'nullable|string',
      'father_phone'    => 'nullable|string',
      'mother_phone'    => 'nullable|string',
      'local_guardian_name'    => 'nullable|string',
      'local_guardian_phone'   => 'nullable|string',
      'local_guardian_relation'=> 'nullable|string',
      'local_guardian_address' => 'nullable|string',
      'permanent_address'      => 'nullable|string',
      'status'                 => 'required|string',
    ]);

    if ($request->hasFile('photo')) {
      $validated['photo'] = $request->file('photo')->store('students', 'public');
    }

    Student::create($validated);

    return redirect()->route('admin.students.index')->with('success', 'Student created!');
  }

  /**
   * Display the specified student.
   */
  public function show(Student $student)
  {
    return Inertia::render('Admin/Students/Show', [
      'student' => $student
    ]);
  }

  /**
   * Show the form for editing the specified student.
   */
  public function edit(Student $student)
  {
    return Inertia::render('Admin/Students/Edit', [
      'student' => $student
    ]);
  }

  /**
 * Update the specified student in storage.
 */
public function update(Request $request, Student $student)
{
    $validated = $request->validate([
        // Required Fields
        'full_name'       => 'required|string|max:255',
        'gender'          => 'required|in:Male,Female,Other',
        'date_of_birth'   => 'required|date',
        'father_name'     => 'required|string|max:255',
        'mother_name'     => 'required|string|max:255',
        'present_address'  => 'required|string',

        // Optional Fields
        'blood_group'     => 'nullable|string',
        'photo'           => 'nullable|image|max:2048', // Validate as image
        'class'           => 'nullable|string',
        'roll_number'     => 'nullable|integer',
        'academic_year'   => 'nullable|string',
        'father_phone'    => 'nullable|string',
        'mother_phone'    => 'nullable|string',
        'local_guardian_name'    => 'nullable|string',
        'local_guardian_phone'   => 'nullable|string',
        'local_guardian_relation'=> 'nullable|string',
        'local_guardian_address' => 'nullable|string',
        'permanent_address'      => 'nullable|string',
        'status'                 => 'required|string',
    ]);

    // Handle Photo Update
    if ($request->hasFile('photo')) {
        // 1. Delete the old photo if it exists
        if ($student->photo) {
            Storage::disk('public')->delete($student->photo);
        }
        
        // 2. Store the new photo
        $validated['photo'] = $request->file('photo')->store('students', 'public');
    } else {
        // Ensure we don't overwrite the existing photo path with null 
        // if no new file was uploaded during this edit.
        unset($validated['photo']);
    }

    // Update the record
    $student->update($validated);

    return redirect()->route('admin.students.index')
        ->with('success', 'Student record updated successfully!');
}

  /**
   * Remove the specified student from storage.
   */
  public function destroy(Student $student)
  {
    $student->delete();

    return Redirect::route('admin.students.index')->with('success', 'Student deleted successfully.');
  }
}