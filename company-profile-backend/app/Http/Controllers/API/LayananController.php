<?php

namespace App\Http\Controllers\API;

use Illuminate\Routing\Controller;
use App\Models\Layanan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LayananController extends Controller
{
    public function index()
    {
        return response()->json(Layanan::with('histories')->get());
    }

    // 1. TAMBAH PRODUK + GAMBAR
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_layanan' => 'required|string|max:255',
            'deskripsi'    => 'required|string',
            'gambar'       => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // max 2MB
        ]);

        if ($request->hasFile('gambar')) {
            // Menyimpan ke folder storage/app/public/komoditas
            $path = $request->file('gambar')->store('komoditas', 'public');
            $validated['gambar'] = $path;
        }

        $layanan = Layanan::create($validated);
        return response()->json(['message' => 'Produk berhasil ditambahkan!', 'data' => $layanan], 201);
    }

    // 2. EDIT PRODUK + GAMBAR (Gunakan POST Method Method Overriding '_method' = 'PUT')
    public function update(Request $request, $id)
    {
        $layanan = Layanan::find($id);
        if (!$layanan) {
            return response()->json(['message' => 'Produk tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'nama_layanan' => 'sometimes|string|max:255',
            'deskripsi'    => 'sometimes|string',
            'gambar'       => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        if ($request->hasFile('gambar')) {
            // Hapus gambar lama jika ada
            if ($layanan->gambar) {
                Storage::disk('public')->delete($layanan->gambar);
            }
            // Simpan gambar baru
            $path = $request->file('gambar')->store('komoditas', 'public');
            $validated['gambar'] = $path;
        }

        $layanan->update($validated);
        return response()->json(['message' => 'Produk berhasil diperbarui!', 'data' => $layanan], 200);
    }

    public function destroy($id)
    {
        $layanan = Layanan::find($id);
        if ($layanan && $layanan->gambar) {
            Storage::disk('public')->delete($layanan->gambar);
        }
        $layanan->delete();
        return response()->json(['message' => 'Produk berhasil dihapus!']);
    }
}