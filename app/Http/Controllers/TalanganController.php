<?php

namespace App\Http\Controllers;

use App\Models\Ledger;
use App\Models\Talangan;
use App\Traits\CDNRWA;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TalanganController extends Controller
{
    use CDNRWA;

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => ['required'],
            'amount' => ['required'],
            'tujuan' => ['required', 'string'],
            'bukti' => ['required', 'image', 'mimes:png,jpg,jpeg', 'max:1024'],
            'dikembalikan' => ['required', 'boolean'],
        ]);

        $uploadImage = $this->uploadRwa('talangan', $request->file('bukti'));
        if (!$uploadImage['status'])
            return back()->with('error', 'terjadi kesalahan ketika upload bukti');

        $validatedData['bukti'] = $uploadImage['url'] ?? null;

        Talangan::create($validatedData);

        return back()->with('success', 'data berhasil ditambahkan');
    }

    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'amount' => ['required'],
            'dikembalikan' => ['required', 'boolean'],
            'bukti' => ['required', 'image', 'mimes:png,jpg,jpeg', 'max:1024'],
        ]);

        $uploadImage = $this->uploadRwa('talangan', $request->file('bukti'));
        if (!$uploadImage['status'])
            return back()->with('error', 'terjadi kesalahan ketika upload bukti');

        $validatedData['bukti'] = $uploadImage['url'] ?? null;

        Talangan::find($id)->update([
            'dikembalikan' => $validatedData['dikembalikan'],
            // 'bukti' => $validatedData['bukti'], // jangan di update bukti lamanya
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