<?php

namespace App\Http\Controllers\API;

use Illuminate\Routing\Controller;
use App\Models\SalesHistory;
use Illuminate\Http\Request;

class SalesHistoryController extends Controller
{
    // Fungsi pintar: kalau data tahun produk sudah ada maka diupdate, kalau belum ada akan ditambah baru
    public function storeOrUpdate(Request $request)
    {
        $validated = $request->validate([
            'layanan_id' => 'required|integer',
            'year' => 'required|integer',
            'volume_sold' => 'required|integer',
        ]);

        $history = SalesHistory::updateOrCreate(
            [
                'layanan_id' => $validated['layanan_id'],
                'year' => $validated['year']
            ],
            [
                'volume_sold' => $validated['volume_sold']
            ]
        );

        return response()->json(['message' => 'Data grafik berhasil diperbarui!', 'data' => $history], 200);
    }
}