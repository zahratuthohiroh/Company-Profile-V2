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

// Endpoint untuk mengambil data layanan dari database via Controller
Route::get('/layanan', [LayananController::class, 'index']);
Route::apiResource('commodities', CommodityController::class);

// Rute Layanan / Produk Komoditas
Route::get('/layanan', [LayananController::class, 'index']);
Route::post('/layanan', [LayananController::class, 'store']);      
Route::put('/layanan/{id}', [LayananController::class, 'update']);   
Route::delete('/layanan/{id}', [LayananController::class, 'destroy']);

// Rute khusus manipulasi data Grafik Tren Tahunan
Route::post('/sales-history', [SalesHistoryController::class, 'storeOrUpdate']);

// Endpoint bawaan Laravel untuk mengambil data user (bisa dibiarkan saja)
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});