<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Redirect;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255',
            'password' => ['required', 'confirmed'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,   
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));
        
        return back()->with('status', 'Registered successfully');
    }

    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'username' => ['required', 'string', 'max:255'],
            'whatsapp' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255'],
        ]);
    
        User::find($id)->update($validatedData);

        return Redirect::route('profile.edit');
    }


    public function updateWithAuth(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'password' => ['min:5', 'confirmed'],
        ]);
    
        User::find($id)->update($validatedData);

        return back();
    }

}
