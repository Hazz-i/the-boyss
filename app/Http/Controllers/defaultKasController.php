<?php

namespace App\Http\Controllers;

use App\Models\DefaultKas;
use Illuminate\Http\Request;

class defaultKasController extends Controller
{
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'default_kas' => ['required'],
        ]);
    
        DefaultKas::find($id)->update($validatedData);
    
        return to_route('transaksi.index')->with('success', __('Data berhasil diubah'));
    }

}
