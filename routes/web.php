<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    if (Route::has('login')) {
        return Redirect::route('login');
    }

    abort(404);
});

Route::get('/clear-cache', function() {
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('config:cache');
    Artisan::call('view:clear');
    Artisan::call('route:clear');
    return "Cache is cleared";
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::name('administration.')->prefix('administration')->group(function () {
        Route::resource('roles', RolesController::class)->names('roles');
        Route::resource('users', UserController::class)->names('users');
    });

    Route::name('inventory.')->prefix('inventory')->group(function () {
        // Inventory related routes can be added here
        Route::resource('products', ProductsController::class)->names('products');
    });

});

require __DIR__.'/auth.php';
