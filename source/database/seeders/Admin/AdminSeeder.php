<?php

namespace Database\Seeders\Admin;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin\Admin;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@gmail.com');

        // Prevent duplicate admin creation
        if (Admin::where('email', $email)->exists()) {
            $this->command->info('Admin already exists. Skipping...');
            return;
        }

        Admin::create([
            'name' => env('ADMIN_NAME', 'Super Admin'),
            'email' => $email,
            'password' => Hash::make(env('ADMIN_PASSWORD', '12345678')),
        ]);

        $this->command->info('Default Admin Created Successfully.');
    }
}