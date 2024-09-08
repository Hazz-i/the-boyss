<?php

namespace App\Http\Controllers;

use App\Models\Galon;
use App\Models\Ledger;
use App\Models\Talangan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Ledger::with('user');

        $currentMonthStart = Carbon::now()->startOfMonth();
        $currentMonthEnd = Carbon::now()->endOfMonth();
    
        $galonDriver = Galon::get();

        $kas = $query->where('status', 'IN')
            ->whereLike('transaction_purpose', '%kas%')
            ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
            ->sum('amount');

        $talangan = Talangan::query()->sum('amount');
        $talanganReverse = Talangan::where('dikembalikan', true)->sum('amount');

        $currentTalangan = $talangan - $talanganReverse;

        $peopleRemaining = User::whereDoesntHave('ledgers', function($query) use ($currentMonthStart, $currentMonthEnd) {
        $query->where('transaction_purpose', 'like', '%kas%')
                ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd]);
        })->count();

        $users = User::all();

        return Inertia::render('Dashboard', [
            'galonDrivers' => $galonDriver,
            'users' => $users,
            'peopleRemaining' => $peopleRemaining,
            'kas' => $kas,  
            'talangan' => $currentTalangan,
        ]);
    }
}
