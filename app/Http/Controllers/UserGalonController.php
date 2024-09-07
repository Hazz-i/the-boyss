<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserGalonController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'galon' => ['required', 'boolean'],
        ]);

        User::query()->update(['galon' => false]);
        $nextUser = User::find($id + 1);
        
        if ($nextUser === null) {
            $firstUser = User::orderBy('id')->first();
            $firstUser->update($validatedData);
        } else {
            $nextUser->update($validatedData);
        }

        return back();
    }

}
