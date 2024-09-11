<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\User;
use App\Traits\CDNRWA;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    use CDNRWA;

    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $user = $request->user();
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        $validatedData = $request->validate([
            'username' => ['nullable', 'string', 'max:255'],
            'whatsapp' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'string', 'lowercase', 'email', 'max:255'],
        ]);

        $user = User::findOrFail($id);

        foreach ($validatedData as $key => $value) {
            if (!empty($value)) {
                $user->$key = $value;
            }
        }

        $user->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Update the user's profile image.
     */
    public function updatePhoto(Request $request, string $id): RedirectResponse
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:png,jpg,jpeg', 'max:10240'],
        ]);

        $uploadImage = $this->uploadRwa('photo', $request->file('image'));

        if (!$uploadImage['status'])
            return Redirect::route('profile.edit')->with('error', 'terjadi kesalahan ketika upload photo');

        $user = User::findOrFail($id);
        $user->image = $uploadImage['url'] ?? null;
        $user->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}