<?php

namespace App\Http\Controllers;

use App\Models\Ledger;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => ['required'],
            'amount' => ['required'],
            'bukti' => ['nullable', 'image', 'max:1024'],
            'transaction_purpose' => ['required', 'string'],
            'status' => ['required', 'in:IN,OUT'],
        ]);

        $image = $validatedData['bukti'] ?? null;

        if ($image) {
            $validatedData['img_path'] = $image->store('project-img', 'public');
        }

        Ledger::create($validatedData);

        // return to_route('transaksi.index')->with('success', __('data berhasil ditambahkan'));
        return back()->with('success', 'data berhasil ditambahkan');
    }

}
