<?php

namespace App\Http\Controllers\API;

use Illuminate\Routing\Controller;
use App\Models\Commodity;
use Illuminate\Http\Request;

class CommodityController extends Controller
{
    // 1. READ ALL (Untuk Next.js mengambil semua data produk & grafik)
    public function index()
    {
        return response()->json(Commodity::all(), 200);
    }

    // 2. CREATE (Untuk Admin menambah produk baru)
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
            'origin' => 'required|string',
            'grade' => 'required|string',
            'description' => 'required|string',
            'total_sold' => 'required|integer',
        ]);

        $commodity = Commodity::create($validated);
        return response()->json(['message' => 'Produk berhasil ditambahkan!', 'data' => $commodity], 21);
    }

    // 3. UPDATE (Untuk Admin mengubah data/stok terjual produk)
    public function update(Request $request, $id)
    {
        $commodity = Commodity::find($id);
        if (!$commodity) {
            return response()->json(['message' => 'Produk tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string',
            'origin' => 'sometimes|string',
            'grade' => 'sometimes|string',
            'description' => 'sometimes|string',
            'total_sold' => 'sometimes|integer',
        ]);

        $commodity->update($validated);
        return response()->json(['message' => 'Produk berhasil diperbarui!', 'data' => $commodity], 200);
    }

    // 4. DELETE (Untuk Admin menghapus produk)
    public function destroy($id)
    {
        $commodity = Commodity::find($id);
        if (!$commodity) {
            return response()->json(['message' => 'Produk tidak ditemukan'], 404);
        }

        $commodity->delete();
        return response()->json(['message' => 'Produk berhasil dihapus!'], 200);
    }
}