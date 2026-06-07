<?php

use App\Http\Controllers\API\LayananController;
use App\Http\Controllers\API\CommodityController;
use App\Http\Controllers\API\SalesHistoryController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AnalyticController;
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

// Auth Routes
Route::post('/login', [AuthController::class, 'login']);

// Public Routes (Layanan)
Route::get('/layanan', [LayananController::class, 'index']);
Route::get('/layanan/{id}', [LayananController::class, 'show']);

// Public Routes (Analytics tracking)
Route::middleware('throttle:60,1')->post('/analytics', [AnalyticController::class, 'store']);

// Protected Admin Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    Route::apiResource('commodities', CommodityController::class);

    // Manajemen Layanan
    Route::post('/layanan', [LayananController::class, 'store']);
    Route::put('/layanan/{id}', [LayananController::class, 'update']);
    Route::delete('/layanan/{id}', [LayananController::class, 'destroy']);
    
    // Manajemen Histori Penjualan
    Route::post('/sales-history', [SalesHistoryController::class, 'storeOrUpdate']);
    
    // Statistik Analitik
    Route::get('/analytics/stats', [AnalyticController::class, 'stats']);
    
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});