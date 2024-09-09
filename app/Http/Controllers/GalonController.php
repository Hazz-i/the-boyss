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
            'number' => ['string', 'required'],
            'status' => ['required', 'boolean'],
        ]);

        Galon::create($validatedData);

        return to_route('dashboard.index')->with('success', __('data berhasil ditambahkan'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => ['required', 'boolean'],
        ]);
    
        Galon::query()->update(['status' => false]);
    
        Galon::find($id)->update([
            'status' => true,
        ]);
    
        return back();
    }
    

}
