<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Layanan extends Model
{
    use HasFactory;

    protected $fillable = ['nama_layanan', 'deskripsi', 'gambar', 'shopee_link'];

    // Menambahkan relasi data tahunan
    public function histories()
    {
        return $this->hasMany(SalesHistory::class, 'layanan_id')->orderBy('year', 'asc');
    }
}