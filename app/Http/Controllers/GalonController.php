<?php

namespace App\Http\Controllers;

use App\Models\Galon;
use Illuminate\Http\Request;

class GalonController extends Controller
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
            'name' => ['required', 'string'],
            'price' => ['required'],
            'number' => ['string', 'required'],
            'status' => ['required', 'boolean'],
        ]);

        Galon::create($validatedData);

        return to_route('dashboard.index')->with('success', __('data berhasil ditambahkan'));
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
    public function update(Request $request, $id)
    {
        // Validasi input
        $validatedData = $request->validate([
            'status' => ['required', 'boolean'],
        ]);
    
        // Set semua galon ke false
        Galon::query()->update(['status' => false]);
    
        // Update galon dengan ID yang dikirim menjadi true
        Galon::find($id)->update($validatedData);
    
        // Redirect ke halaman dashboard dengan pesan sukses
        return to_route('dashboard.index')->with('success', __('Data berhasil diubah'));
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
