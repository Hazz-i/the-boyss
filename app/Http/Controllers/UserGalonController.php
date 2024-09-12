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
        // Validate the request data
        $validatedData = $request->validate([
            'galon' => ['required', 'boolean'],
        ]);
    
        // Set all users' 'galon' field to false
        User::query()->update(['galon' => false]);
    
        $currentUser = User::find(id: $id);
    
        $nextUser = User::where('id', '>', $currentUser->id)->orderBy('id')->first();
    
        if ($nextUser === null) {
            $firstUser = User::orderBy('id')->first();
            $firstUser->update($validatedData);
        } else {
            $nextUser->update($validatedData);
        }
    
        return back();
    }

}
