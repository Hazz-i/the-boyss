<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Hash;

class UserPasswordUpdateAuth extends Controller
{
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'password' => ['required', 'string', 'min:8'],
        ]);

        User::find($id)->update([
            'password' => Hash::make($validated['password'])
        ]);

        return back();
    }
}
