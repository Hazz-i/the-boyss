<?php

namespace Database\Seeders;

use App\Models\DefaultKas;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'id' => 10,
            'name' => 'Developer',
            'username' => 'developer',
            'galon' => true,   
            'role' => 'Developer',   
            'whatsapp' => '081234567890',
            'password' => '12341234',
        ]);

        DefaultKas::factory()->create();
    }
}
