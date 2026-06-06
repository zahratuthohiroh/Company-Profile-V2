'use client';

import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<'manajemen' | 'input' | 'grafik' | 'analitik'>('manajemen');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // State Analitik
  const [stats, setStats] = useState<{ total_visits: number, product_views: any[], shopee_clicks: any[] } | null>(null);

  // State Form Produk
  const [productId, setProductId] = useState<number | null>(null);
  const [namaLayanan, setNamaLayanan] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [gambarFile, setGambarFile] = useState<File | null>(null);
  const [shopeeLink, setShopeeLink] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State Form Grafik
  const [selectedLayananId, setSelectedLayananId] = useState<number | null>(null);
  const [inputYear, setInputYear] = useState('2026');
  const [inputVolume, setInputVolume] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/layanan', { cache: 'no-store' });
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  const fetchStats = async () => {
    const token = Cookies.get('admin_token');
    if (!token) return;
    try {
      const res = await fetch('http://127.0.0.1:8000/api/analytics/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Gagal mengambil statistik:', error);
    }
  };

  useEffect(() => {
    fetchProducts().then(() => {
      fetchStats();
      setLoading(false);
    });
  }, []);

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('nama_layanan', namaLayanan);
    formData.append('deskripsi', deskripsi);
    if (gambarFile) {
      formData.append('gambar', gambarFile);
    }
    if (shopeeLink) {
      formData.append('shopee_link', shopeeLink);
    }

    let url = 'http://127.0.0.1:8000/api/layanan';
    if (productId) {
      url = `http://127.0.0.1:8000/api/layanan/${productId}`;
      formData.append('_method', 'PUT');
    }

    const token = Cookies.get('admin_token');
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (res.ok) {
        alert(productId ? 'Data komoditas berhasil diperbarui.' : 'Komoditas baru berhasil ditambahkan.');
        resetProductForm();
        fetchProducts();
        setActiveMenu('manajemen');
      } else {
        alert('Gagal menyimpan produk. Silakan periksa isian Anda.');
      }
    } catch (error) {
      alert('Terjadi kesalahan pada sistem saat menyimpan data.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini secara permanen?')) return;
    const token = Cookies.get('admin_token');
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/layanan/${id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Data berhasil dihapus.');
        fetchProducts();
      }
    } catch (error) {
      alert('Terjadi kesalahan pada sistem saat menghapus data.');
    }
  };

  const handleUpdateGraph = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLayananId) return alert('Silakan pilih produk terlebih dahulu.');

    const token = Cookies.get('admin_token');
    try {
      const res = await fetch('http://127.0.0.1:8000/api/sales-history', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          layanan_id: selectedLayananId,
          year: parseInt(inputYear),
          volume_sold: parseInt(inputVolume)
        })
      });

      if (res.ok) {
        alert('Data riwayat penjualan berhasil disinkronisasi.');
        setInputVolume('');
        fetchProducts();
        setActiveMenu('manajemen');
      }
    } catch (error) {
      alert('Terjadi kesalahan pada sistem saat menyimpan grafik.');
    }
  };

  const resetProductForm = () => {
    setProductId(null);
    setNamaLayanan('');
    setDeskripsi('');
    setGambarFile(null);
    setShopeeLink('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEditClick = (item: any) => {
    setProductId(item.id);
    setNamaLayanan(item.nama_layanan);
    setDeskripsi(item.deskripsi);
    setShopeeLink(item.shopee_link || '');
    setGambarFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setActiveMenu('input'); 
  };

  const handleLogout = async () => {
    const token = Cookies.get('admin_token');
    if (token) {
      try {
        await fetch('http://127.0.0.1:8000/api/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (e) {
        console.error(e);
      }
    }
    Cookies.remove('admin_token');
    router.push('/login');
  };

  if (loading) return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
        <p className="text-sm font-medium text-slate-500">Memuat Sistem Administrator...</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      
      {/* Sidebar Navigasi */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-xl font-bold tracking-tight text-white">Admin Panel</h1>
          <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-wider">CV Cahaya Nusantara</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          <button 
            onClick={() => setActiveMenu('manajemen')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === 'manajemen' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Manajemen Produk
            </div>
          </button>
          
          <button 
            onClick={() => { resetProductForm(); setActiveMenu('input'); }}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === 'input' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Registrasi Produk
            </div>
          </button>
          
          <button 
            onClick={() => setActiveMenu('grafik')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === 'grafik' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Sinkronisasi Grafik
            </div>
          </button>
          <button 
            onClick={() => setActiveMenu('analitik')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeMenu === 'analitik' 
                ? 'bg-indigo-600 text-white' 
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Metrik & Analitik
            </div>
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar Sistem
          </button>
        </div>
      </aside>

      {/* Area Konten Utama */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {/* Konten: Manajemen Tabel Produk */}
          {activeMenu === 'manajemen' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6 bg-white p-6 rounded-xl border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Manajemen Katalog Produk</h2>
                <p className="text-slate-500 mt-1 text-sm">Kelola daftar komoditas yang akan ditampilkan pada halaman publik pelanggan.</p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Visual</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Identitas Produk</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Riwayat Tonase (Tahun)</th>
                        <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Tindakan</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {products.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.gambar ? (
                              <img 
                                src={`http://127.0.0.1:8000/storage/${item.gambar}`} 
                                alt={item.nama_layanan} 
                                className="h-12 w-16 object-cover rounded-md shadow-sm border border-slate-200"
                              />
                            ) : (
                              <div className="h-12 w-16 bg-slate-100 rounded-md flex items-center justify-center text-[10px] font-medium text-slate-400 border border-slate-200">
                                NO IMG
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-bold text-slate-900 mb-0.5">{item.nama_layanan}</div>
                            {item.shopee_link ? (
                              <a href={item.shopee_link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                </svg>
                                Tautan Aktif
                              </a>
                            ) : (
                              <span className="text-xs text-slate-400">Tanpa Tautan Afiliasi</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-2">
                              {item.histories?.length > 0 ? (
                                item.histories.map((h: any, i: number) => (
                                  <span key={i} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                    {h.year}: <span className="ml-1 font-bold">{h.volume_sold}T</span>
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-slate-400 italic">Belum ada data</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-3">
                              <button 
                                onClick={() => handleEditClick(item)} 
                                className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-md transition-colors"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(item.id)} 
                                className="text-rose-600 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-md transition-colors"
                              >
                                Hapus
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {products.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-sm text-slate-500">
                            Tidak ada komoditas terdaftar dalam sistem.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Konten: Input Produk Baru / Edit */}
          {activeMenu === 'input' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
              <div className="mb-6 bg-white p-6 rounded-xl border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {productId ? 'Perbarui Spesifikasi Produk' : 'Registrasi Komoditas Baru'}
                </h2>
                <p className="text-slate-500 mt-1 text-sm">
                  Silakan isi detail produk dengan akurat untuk menjamin kualitas data di katalog publik.
                </p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <form onSubmit={handleSubmitProduct} className="p-6 sm:p-8 space-y-6">
                  
                  <div>
                    <label className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Nama Komoditas / Layanan</label>
                    <input 
                      type="text" 
                      value={namaLayanan} 
                      onChange={(e) => setNamaLayanan(e.target.value)}
                      placeholder="Contoh: Petis Udang Super Grade A" 
                      required 
                      className="block w-full rounded-md border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Deskripsi Teknis (B2B)</label>
                    <textarea 
                      value={deskripsi} 
                      onChange={(e) => setDeskripsi(e.target.value)}
                      placeholder="Jelaskan spesifikasi teknis, standar kualitas, atau informasi penting lainnya..." 
                      required 
                      rows={4}
                      className="block w-full rounded-md border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Unggah Foto Produk</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-300 px-6 py-8 hover:bg-slate-50 transition-colors">
                      <div className="text-center">
                        <svg className="mx-auto h-10 w-10 text-slate-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                        </svg>
                        <div className="mt-4 flex text-sm leading-6 text-slate-600 justify-center">
                          <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span>Pilih file gambar</span>
                            <input 
                              type="file" 
                              ref={fileInputRef} 
                              accept="image/*"
                              onChange={(e) => setGambarFile(e.target.files ? e.target.files[0] : null)}
                              required={!productId}
                              className="sr-only" 
                            />
                          </label>
                        </div>
                        <p className="text-xs leading-5 text-slate-500 mt-1">PNG, JPG, WEBP maks. 2MB</p>
                      </div>
                    </div>
                    {productId && <p className="text-xs text-amber-600 mt-2 font-medium flex items-center gap-1"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Abaikan bagian ini jika Anda tidak ingin mengganti gambar produk yang sudah ada.</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold leading-6 text-slate-900 mb-2">
                      Tautan Eksternal (Shopee) <span className="text-slate-400 font-normal ml-1">(Opsional)</span>
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                      </div>
                      <input 
                        type="url" 
                        value={shopeeLink} 
                        onChange={(e) => setShopeeLink(e.target.value)}
                        placeholder="https://shopee.co.id/..." 
                        className="block w-full rounded-md border-0 py-2.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all"
                      />
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-end gap-3">
                    {productId && (
                      <button 
                        type="button" 
                        onClick={() => { resetProductForm(); setActiveMenu('manajemen'); }} 
                        className="rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
                      >
                        Batalkan
                      </button>
                    )}
                    <button 
                      type="submit" 
                      className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                    >
                      {productId ? 'Simpan Pembaruan' : 'Registrasi Komoditas'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Konten: Pengaturan Grafik Tahunan */}
          {activeMenu === 'grafik' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
              <div className="mb-6 bg-white p-6 rounded-xl border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sinkronisasi Data Penjualan</h2>
                <p className="text-slate-500 mt-1 text-sm">Input data tonase tahunan untuk merender metrik grafik tren pada aplikasi secara real-time.</p>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <form onSubmit={handleUpdateGraph} className="p-6 sm:p-8 space-y-6">
                  <div>
                    <label className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Target Komoditas</label>
                    <select 
                      onChange={(e) => setSelectedLayananId(Number(e.target.value))} 
                      defaultValue="" 
                      required 
                      className="block w-full rounded-md border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all"
                    >
                      <option value="" disabled>-- Pilih referensi produk dari database --</option>
                      {products.map((p) => <option key={p.id} value={p.id}>{p.nama_layanan}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Tahun Fiskal</label>
                      <select 
                        value={inputYear} 
                        onChange={(e) => setInputYear(e.target.value)} 
                        className="block w-full rounded-md border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all"
                      >
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Volume Terjual (Tonase)</label>
                      <input 
                        type="number" 
                        value={inputVolume} 
                        onChange={(e) => setInputVolume(e.target.value)} 
                        placeholder="Contoh metrik: 150" 
                        required 
                        className="block w-full rounded-md border-0 py-2.5 px-3.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all" 
                      />
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
                    <button 
                      type="submit" 
                      className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
                    >
                      Unggah Metrik Penjualan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Konten: Metrik & Analitik */}
          {activeMenu === 'analitik' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6 bg-white p-6 rounded-xl border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Analitik</h2>
                <p className="text-slate-500 mt-1 text-sm">Lacak kunjungan halaman dan keterlibatan produk dari pengguna publik secara real-time.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-center">
                  <div className="text-sm font-semibold text-slate-500 mb-1">Total Kunjungan Web</div>
                  <div className="text-4xl font-bold text-slate-900">{stats?.total_visits || 0}</div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-center">
                  <div className="text-sm font-semibold text-slate-500 mb-1">Total Dilihat (Produk)</div>
                  <div className="text-4xl font-bold text-indigo-600">
                    {stats?.product_views?.reduce((acc, curr) => acc + curr.total, 0) || 0}
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-center">
                  <div className="text-sm font-semibold text-slate-500 mb-1">Total Klik Shopee</div>
                  <div className="text-4xl font-bold text-emerald-600">
                    {stats?.shopee_clicks?.reduce((acc, curr) => acc + curr.total, 0) || 0}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6">Keterlibatan per Produk</h3>
                <div className="space-y-6">
                  {products.map(product => {
                    const views = stats?.product_views?.find(v => v.layanan_id === product.id)?.total || 0;
                    const clicks = stats?.shopee_clicks?.find(c => c.layanan_id === product.id)?.total || 0;
                    
                    // Simple max for bar width calculation
                    const maxViews = Math.max(...(stats?.product_views?.map(v => v.total) || [1]), 1);
                    const viewWidth = `${Math.min((views / maxViews) * 100, 100)}%`;

                    return (
                      <div key={product.id} className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-full md:w-48 text-sm font-medium text-slate-900">{product.nama_layanan}</div>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-20 text-xs text-slate-500">Dilihat</div>
                            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 rounded-full" style={{ width: viewWidth }}></div>
                            </div>
                            <div className="w-12 text-xs font-semibold text-right">{views}</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-20 text-xs text-slate-500">Klik Shopee</div>
                            <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min((clicks / (views || 1)) * 100, 100)}%` }}></div>
                            </div>
                            <div className="w-12 text-xs font-semibold text-right">{clicks}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {products.length === 0 && (
                    <div className="text-sm text-slate-500 text-center py-4">Belum ada data produk.</div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}