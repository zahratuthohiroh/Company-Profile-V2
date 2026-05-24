<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('sales_histories', function (Blueprint $table) {
        $table->id();
        // Menghubungkan ke ID tabel layanans kamu
        $table->foreignId('layanan_id')->constrained('layanans')->onDelete('cascade');
        $table->integer('year');        // Contoh: 2024, 2025, 2026
        $table->integer('volume_sold'); // Volume penjualan dalam Ton
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_histories');
    }
};
