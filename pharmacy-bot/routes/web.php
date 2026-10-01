<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PharmacyChatController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/liff', [PharmacyChatController::class, 'index']);
Route::post('/get-answer', [PharmacyChatController::class, 'getAnswer']);
Route::get('/get-answer', [PharmacyChatController::class, 'getAnswer']);