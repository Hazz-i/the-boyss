<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class UserRoleUpdateController extends Controller
{
    public function update(Request $request, string $id)
    {
        $validatedData = $request->validate([
            'role' => ['required', 'string', Rule::in(['Developer', 'Bendahara', 'Anggota'])],
        ]);

        User::find($id)->update($validatedData);

        return back();
    }

}
