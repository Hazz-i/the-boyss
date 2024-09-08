<?php

namespace App\Http\Controllers;

use App\Models\Ledger;
use App\Models\Talangan;
use Illuminate\Http\Request;

class TalanganController extends Controller
{
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

}
