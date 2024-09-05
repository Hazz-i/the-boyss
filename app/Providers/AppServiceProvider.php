<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\DefaultKas;
use App\Models\Ledger;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
         // Share data globally with Inertia.js components
         Inertia::share([
            'defaultKas' => function () {
                return DefaultKas::first(); // Fetch default Kas data
            },
            'ledgers' => function () {
                return Ledger::all(); // Fetch all ledger data
            },
        ]);
    }
}
