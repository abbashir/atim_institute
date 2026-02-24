<?php

namespace Database\Factories\Admin;

use Illuminate\Database\Eloquent\Factories\Factory;

class StudentFactory extends Factory
{
    public function definition(): array
    {
        $presentAddress = $this->faker->address();
        $sameAsPresent = $this->faker->boolean(70); // 70% chance it's the same

        return [
            'full_name' => $this->faker->name(),
            'gender' => $this->faker->randomElement(['Male', 'Female', 'Other']),
            'date_of_birth' => $this->faker->date('Y-m-d', '2015-01-01'),
            'blood_group' => $this->faker->randomElement(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
            'photo' => null, // Typically null in seeders, or use a placeholder URL string
            
            'class' => $this->faker->randomElement(['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5']),
            'roll_number' => $this->faker->unique()->numberBetween(1, 100),
            'academic_year' => '2025-2026',

            'father_name' => $this->faker->name('male'),
            'father_phone' => $this->faker->phoneNumber(),
            'mother_name' => $this->faker->name('female'),
            'mother_phone' => $this->faker->phoneNumber(),

            'local_guardian_name' => $this->faker->name(),
            'local_guardian_relation' => $this->faker->randomElement(['Uncle', 'Aunt', 'Grandparent']),
            'local_guardian_phone' => $this->faker->phoneNumber(),
            'local_guardian_address' => $this->faker->address(),

            'present_address' => $presentAddress,
            'permanent_address' => $sameAsPresent ? $presentAddress : $this->faker->address(),
            'same_as_present' => $sameAsPresent,

            'status' => $this->faker->randomElement(['Active', 'Inactive']),
        ];
    }
}