<?php

namespace App\Http\Controllers;

use App\Models\Ledger;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Ledger::query();
    
        if (request('month')) {
            $month = request('month');
            
            $startOfMonth = \Carbon\Carbon::createFromFormat('F', $month)->startOfMonth();
            $endOfMonth = \Carbon\Carbon::createFromFormat('F', $month)->endOfMonth();
            
            $query->whereBetween('created_at', [$startOfMonth, $endOfMonth]);
        } else {
            $currentMonthStart = \Carbon\Carbon::now()->startOfMonth();
            $currentMonthEnd = \Carbon\Carbon::now()->endOfMonth();
    
            $query->whereBetween('created_at', [$currentMonthStart, $currentMonthEnd]);
        }
    
        return Inertia::render('History/Index', [
            "queryParams" => request()->query()?:null, 
            'ledgers' => $query->paginate(10)->onEachSide(1),
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
