<?php

namespace App\Http\Controllers;

use App\Models\Ledger;
use App\Models\Talangan;
use App\Traits\CDNRWA;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class TransactionController extends Controller
{
    use CDNRWA;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        return Inertia::render('Transaction/Index');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => ['required'],
            'amount' => ['required'],
            'bukti' => ['required', 'image', 'mimes:png,jpg,jpeg', 'max:10240'],
            'transaction_purpose' => ['required', 'string'],
            'status' => ['required', 'in:IN,OUT'],
        ]);

        $uploadImage = $this->uploadRwa('kas', $request->file('bukti'));
        if (!$uploadImage['status'])
            return back()->with('error', 'terjadi kesalahan ketika upload bukti');

        $validatedData['manual_prof'] = $uploadImage['url'] ?? null;

        // $image = $validatedData['bukti'] ?? null;

        // if ($image) {
        //     $validatedData['img_path'] = $image->store('project-img', 'public');
        // }

        Ledger::create($validatedData);

        // return to_route('transaksi.index')->with('success', __('data berhasil ditambahkan'));
        return back()->with('success', 'data berhasil ditambahkan');
    }
}