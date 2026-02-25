<?php

namespace Database\Seeders;

use App\Models\User;
use Database\Seeders\Admin\ExpenseCategorySeeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin\Student;
class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        // Generate 50 students
        Student::factory()->count(50)->create();

        $this->call(\Database\Seeders\Admin\AdminSeeder::class);
        $this->call([
          ExpenseCategorySeeder::class,
        ]);
    }
}
