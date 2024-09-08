<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\defaultKasController;
use App\Http\Controllers\GalonController;
use App\Http\Controllers\HistoryController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TalanganController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserGalonController;
use App\Http\Controllers\UserPasswordUpdateAuth;
use App\Http\Controllers\UserRoleUpdateController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect("/", '/dashboard');

Route::middleware('auth')->group(function () {
    Route::resource('/dashboard',DashboardController::class); 
    Route::resource('/transaksi', TransactionController::class);
    Route::resource('/default-kas', defaultKasController::class);
    Route::resource('/talangan', TalanganController::class);
    Route::resource('/history', HistoryController::class);
    Route::resource('/galon', GalonController::class);
    Route::resource('/notification', NotificationController::class);
    
    Route::resource('/user', UserController::class);
    Route::resource('/user-galon', UserGalonController::class);
    Route::resource('/role', UserRoleUpdateController::class);
    Route::resource('/dev-pass', UserPasswordUpdateAuth::class);
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile/{id}', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
