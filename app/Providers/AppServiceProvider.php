<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use App\Models\DefaultKas;
use App\Models\Ledger;
use App\Models\Talangan;
use Schema;

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
        if(Schema::hasTable('ledgers')) {
            $currentMonthStart = Carbon::now()->startOfMonth();
            $currentMonthEnd = Carbon::now()->endOfMonth();
            
            $ledgers = Ledger::with('user')
                ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
                ->orderBy('created_at', 'desc')
                ->get();

            $currentMonthStart = Carbon::now()->startOfMonth();
            $currentMonthEnd = Carbon::now()->endOfMonth();
        
            // Hitung total pemasukan (IN) pada bulan ini
            $totalIn = Ledger::where('status', 'IN')
                ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
                ->sum('amount');

            // Hitung total pengeluaran (OUT) pada bulan ini
            $totalOut = Ledger::where('status', 'OUT')
                ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
                ->sum('amount');

            $currentSaldo = $totalIn - $totalOut;

            $talangans = Talangan::with('user')->orderBy('created_at', 'desc')->get();
            
            Inertia::share([
                'defaultKas' => function () {
                    return DefaultKas::first();
                },
                'ledgers' => function () use ($ledgers) {
                    return $ledgers; 
                },
                'talangans' => function () use ($talangans) {
                    return $talangans; 
                },
                'currentSaldo' => function () use ($currentSaldo) {
                    return $currentSaldo; 
                },
            ]);
        }
    }
}
