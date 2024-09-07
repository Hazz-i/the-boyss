<?php

namespace App\Http\Controllers;

use App\Models\Ledger;
use App\Models\Talangan;
use Illuminate\Http\Request;

class TalanganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $validatedData = $request->validate([
            'user_id' => ['required'],
            'amount' => ['required'],
            'tujuan' => ['required', 'string'],
            'bukti' => ['nullable', 'image', 'max:1024'],
            'dikembalikan' => ['required', 'boolean'],
        ]);

        $image = $validatedData['bukti'] ?? null;

        if ($image) {
            $validatedData['img_path'] = $image->store('project-img', 'public');
        }

        Talangan::create($validatedData);

        return back()->with('success', 'data berhasil ditambahkan');

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
        $validatedData = $request->validate([
            'amount' => ['required'],
            'dikembalikan' => ['required', 'boolean'],
            'bukti' => ['nullable', 'image', 'max:1024'],
        ]);
        
        $image = $validatedData['bukti'] ?? null;
        
        if ($image) {
            $validatedData['img_path'] = $image->store('project-img', 'public');
        }
        
        Talangan::find($id)->update([
            'dikembalikan' => $validatedData['dikembalikan'],
            'bukti' => $validatedData['bukti'],
        ]);
        Ledger::create([
            'user_id' => auth()->id(),
            'amount' => $request->amount,
            'transaction_purpose' => "Talangan",
            'status' => 'OUT',
            'manual_prof' => $validatedData['bukti'],
        ]);

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
