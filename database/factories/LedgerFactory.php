<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ledger>
 */
class LedgerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'transaction_purpose' => fake()->randomElement(['Bayar Kas', 'Listrik', 'Air', 'Wifi']),
            'status' => fake()->randomElement(['IN', 'OUT']),
            'amount' => fake()->randomFloat(2, 100, 1000),
            'final_balance' => fake()->randomFloat(2, 100, 1000),
            // 'manual_prof' => fake()->realText(50),
        ];
    }
}
