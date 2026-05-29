<?php

use App\Http\Controllers\API\LayananController;
use App\Http\Controllers\API\CommodityController;
use App\Http\Controllers\API\SalesHistoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Autentikasi Admin
Route::post('/login', [App\Http\Controllers\API\AuthController::class, 'login']);

// Endpoint Public (Bisa diakses tanpa login)
Route::get('/layanan', [LayananController::class, 'index']);

// Endpoint Protected (Hanya bisa diakses admin yang login)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [App\Http\Controllers\API\AuthController::class, 'logout']);
    
    Route::apiResource('commodities', CommodityController::class);

    // Rute Layanan / Produk Komoditas
    Route::post('/layanan', [LayananController::class, 'store']);      
    Route::put('/layanan/{id}', [LayananController::class, 'update']);   
    Route::delete('/layanan/{id}', [LayananController::class, 'destroy']);

    // Rute khusus manipulasi data Grafik Tren Tahunan
    Route::post('/sales-history', [SalesHistoryController::class, 'storeOrUpdate']);
    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});