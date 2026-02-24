<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Student extends Model
{
  use HasFactory;

  protected $table = 'students';

  /**
   * The attributes that are mass assignable.
   * Includes all fields from your React Inertia form.
   */
  protected $fillable = [
    // Basic Info
    'full_name',
    'gender',
    'date_of_birth',
    'blood_group',
    'photo',

    // Academic Info
    'class',
    'roll_number',
    'academic_year',

    // Guardian Info
    'father_name',
    'father_phone',
    'mother_name',
    'mother_phone',

    // Local Guardian
    'local_guardian_name',
    'local_guardian_relation',
    'local_guardian_phone',
    'local_guardian_address',

    // Address Information
    'present_address',
    'permanent_address',
    'same_as_present',

    // Status
    'status',
  ];

  /**
   * The attributes that should be cast.
   */
  protected $casts = [
    'date_of_birth'   => 'date',
    'same_as_present' => 'boolean',
    'roll_number'     => 'integer',
  ];

  /**
   * Appends custom attributes to the model's array/JSON form.
   */
  protected $appends = ['photo_url'];

  /**
   * Accessor for Photo URL.
   * If no photo is uploaded, it returns a UI-Avatar placeholder.
   */
  public function getPhotoUrlAttribute()
  {
    if ($this->photo && Storage::disk('public')->exists($this->photo)) {
      return asset('storage/' . $this->photo);
    }

    // Return a professional placeholder based on the student's name
    return "https://ui-avatars.com/api/?name=" . urlencode($this->full_name) . "&color=7F9CF5&background=EBF4FF";
  }

  /**
   * Scopes can be useful for your Index page filtering.
   */
  public function scopeActive($query)
  {
    return $query->where('status', 'Active');
  }
}