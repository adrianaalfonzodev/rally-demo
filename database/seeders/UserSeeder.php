<?php

namespace Database\Seeders;

use App\Models\Roles;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role_admin = Roles::where('name', 'Admin')->first();
        $users = [
            [
                'name' => 'Admin',
                'last_name' => 'Total',
                'email' => 'admin@example.com',
                'password' => bcrypt('password'),
                'role_id' => $role_admin->id,
                'is_active' => true,
            ],

            [
                'name' => 'Admin',
                'last_name' => 'Rally',
                'email' => 'admin@rally.com',
                'password' => bcrypt('password'),
                'role_id' => $role_admin->id,
                'is_active' => true,
            ],
        ];

        foreach ($users as $user) {
            User::updateOrCreate(
                ['email' => $user['email']],
                $user
            );
        }
    }
}
