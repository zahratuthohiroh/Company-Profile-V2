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
    Schema::create('commodities', function (Blueprint $table) {
        $table->id();
        $table->string('name');           // Nama Produk (Petis Udang, Bawang Merah, dll)
        $table->string('origin');         // Asal Daerah (Cirebon, Brebes, dll)
        $table->string('grade');          // Grade (Grade A / Super)
        $table->text('description');      // Deskripsi Produk
        $table->integer('total_sold');    // Data kuantitas penjualan (Misal dalam Ton) untuk Grafik Laris
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commodities');
    }
};
