<?php

namespace Database\Seeders;

use App\Models\DefaultKas;
use App\Models\Information;
use App\Models\Ledger;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Developer',
            'username' => 'developer',
            'galon' => true,   
            'email' => 'developer@gmail.com',
            'whatsapp' => '081234567890',
            'password' => '12341234',
        ]);

        DefaultKas::factory()->create();
    }
}
