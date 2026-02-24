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
  public function index()
  {
    $students = Student::latest()->paginate(10);

    return Inertia::render('Admin/Students/List', [
      'students' => $students
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
    $validated = $request.validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:students,email,' . $student->id,
        'phone' => 'required|string|max:20',
        'address' => 'nullable|string',
      ]);

    $student->update($validated);

    return Redirect::route('admin.students.index')->with('success', 'Student updated successfully.');
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