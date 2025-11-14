<?php

namespace Database\Seeders;

use App\Models\Roles;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Admin',
                'description' => 'Acceso total al sistema',
                'permissions' => json_encode(['all' => true]),
                'is_active' => true,
                'is_system' => true,
            ],
            [
                'name' => 'Usuario',
                'description' => 'Usuario regular con acceso limitado',
                'permissions' => json_encode(['users' => [
                    'view' => true,
                    'create' => false,
                    'update' => false,
                ]]),
                'is_active' => true,
                'is_system' => true,
            ]
        ];

        foreach ($roles as $role) {
            Roles::updateOrCreate(
                ['name' => $role['name']],
                $role
            );
        }
    }
}
