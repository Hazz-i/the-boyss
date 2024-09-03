<?php

namespace Database\Seeders;

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
        // Ledger::factory(30)->create();
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Developer',
            'username' => 'developer',
            'email' => 'developer@gmail.com',
            'whatsapp' => '081234567890',
            'password' => '12341234',
        ]);

        // Information::factory()->create([
        //     'title' => 'WIFI',
        //     'Id' => '12615566',
        //     'SSID' => 'The Boys 5',
        //     'Password' => '1sampai10',
        //     ]);
    }
}
