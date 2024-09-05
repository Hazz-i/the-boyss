<?php

namespace App\Http\Controllers;

use App\Models\Ledger;
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
        $query = Ledger::query();

        $currentMonthStart = Carbon::now()->startOfMonth();
        $currentMonthEnd = Carbon::now()->endOfMonth();
    
        $ledgers = Ledger::query()->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd]);

        $kas = $query->where('status', 'IN')
                     ->whereLike('transaction_purpose', '%kas%')
                     ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
                     ->sum('amount');

        $currentSaldo = $query->where('status', 'IN')
                     ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
                     ->sum('amount') - $query->where('status', 'OUT')
                     ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd])
                     ->sum('amount');

        $peopleRemaining = User::whereDoesntHave('ledgers', function($query) use ($currentMonthStart, $currentMonthEnd) {
        $query->where('transaction_purpose', 'like', '%kas%')
                ->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd]);
        })->count();

        $users = User::all();

        return Inertia::render('Dashboard', [
            'users' => $users,
            'currentSaldo' => $currentSaldo,
            'peopleRemaining' => $peopleRemaining,
            'kas' => $kas,  
            'ledgers' => $ledgers->limit(5)->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
