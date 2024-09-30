<?php

namespace App\Providers;

use Carbon\Carbon;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use App\Models\DefaultKas;
use App\Models\Ledger;
use App\Models\Talangan;

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
        $this->shareInertiaData();
    }

    /**
     * Share data with Inertia.
     */
    private function shareInertiaData(): void
    {
        if ($this->app->runningInConsole()) {
            return;
        }

        if (!Schema::hasTable('ledgers')) {
            return;
        }

        Inertia::share([
            'defaultKas' => fn () => $this->getDefaultKas(),
            'ledgers' => fn () => $this->getLedgers(),
            'talangans' => fn () => $this->getTalangans(),
            'currentSaldo' => fn () => $this->getCurrentSaldo(),
        ]);
    }

    private function getDefaultKas()
    {
        return DefaultKas::first();
    }

    private function getLedgers()
    {
        $currentMonthStart = Carbon::now()->startOfMonth();
        $currentMonthEnd = Carbon::now()->endOfMonth();

        return Ledger::with('user')
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->orderBy('created_at', 'desc')
            ->get();
    }

    private function getTalangans()
    {
        return Talangan::with('user')->orderBy('created_at', 'desc')->get();
    }

    private function getCurrentSaldo()
    {
        $currentMonthStart = Carbon::now()->startOfMonth();
        $currentMonthEnd = Carbon::now()->endOfMonth();

        // Hitung total IN dan OUT untuk bulan ini
        $totalInThisMonth = Ledger::where('status', 'IN')
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->sum('amount');

        $totalOutThisMonth = Ledger::where('status', 'OUT')
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->sum('amount');

        // Hitung saldo sisa dari bulan sebelumnya
        $totalInBeforeThisMonth = Ledger::where('status', 'IN')
            ->where('created_at', '<', $currentMonthStart)
            ->sum('amount');

        $totalOutBeforeThisMonth = Ledger::where('status', 'OUT')
            ->where('created_at', '<', $currentMonthStart)
            ->sum('amount');

        // Saldo bulan sebelumnya
        $saldoBeforeThisMonth = $totalInBeforeThisMonth - $totalOutBeforeThisMonth;

        // Saldo bulan ini dengan penambahan saldo dari bulan sebelumnya
        return $saldoBeforeThisMonth + ($totalInThisMonth - $totalOutThisMonth);
    }
}