<?php

namespace App\Http\Controllers;

use App\Models\Galon;
use Illuminate\Http\Request;

class GalonController extends Controller
{
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
    

}
