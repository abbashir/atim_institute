<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    Schema::create('students', function (Blueprint $table) {
      // --- Student Basic Information ---
      $table->id();
      $table->string('full_name'); // Required
      $table->enum('gender', ['Male', 'Female', 'Other']); // Required
      $table->date('date_of_birth'); // Required
      $table->string('blood_group', 5)->nullable(); // Optional
      $table->string('photo')->nullable(); // Optional

      // --- Academic Information ---
      $table->string('class')->nullable(); // Optional
      $table->integer('roll_number')->nullable(); // Optional
      $table->string('academic_year')->nullable(); // Optional

      // --- Guardian Information ---
      $table->string('father_name'); // Required
      $table->string('father_phone')->nullable(); // Optional
      $table->string('mother_name'); // Required
      $table->string('mother_phone')->nullable(); // Optional

      // --- Local Guardian (Optional) ---
      $table->string('local_guardian_name')->nullable();
      $table->string('local_guardian_relation')->nullable();
      $table->string('local_guardian_phone')->nullable();
      $table->text('local_guardian_address')->nullable();

      // --- Address Information ---
      $table->text('present_address'); // Required
      $table->text('permanent_address')->nullable(); // Optional
      $table->boolean('same_as_present')->default(false);

      // --- Status ---
      $table->string('status')->default('Active'); // Default 'Active'

      $table->timestamps();
    });
  }

  public function down(): void
  {
    Schema::dropIfExists('students');
  }
};