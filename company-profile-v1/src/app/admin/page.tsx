'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const RechartsTooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

export default function AdminDashboard() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<'manajemen' | 'input' | 'grafik' | 'analitik' | 'audit'>('manajemen');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // State Sidebar & Table
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State Audit
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  // State Analitik
  const [analyticPeriod, setAnalyticPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');
  const [stats, setStats] = useState<{ total_visits: number, visits_series: any[], product_views: any[], shopee_clicks: any[] } | null>(null);

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/layanan`, { cache: 'no-store' });
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  const fetchStats = async (period = analyticPeriod) => {
    try {
      const res = await fetch(`/api/proxy/analytics/stats?period=${period}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Gagal mengambil statistik:', error);
    }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch(`/api/proxy/audit-logs`);
      if (res.ok) {
        const data = await res.json();
        setAuditLogs(data);
      }
    } catch (error) {
      console.error('Gagal mengambil audit logs:', error);
    }
  };

  useEffect(() => {
    fetchProducts().then(() => {
      fetchStats(analyticPeriod);
      fetchAuditLogs();
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading) fetchStats(analyticPeriod);
  }, [analyticPeriod]);

  // Efek untuk mengisi otomatis metrik volume jika data tahunan sudah tersedia
  useEffect(() => {
    if (selectedLayananId && inputYear) {
      const product = products.find(p => p.id === selectedLayananId);
      if (product && product.histories) {
        const history = product.histories.find((h: any) => h.year === parseInt(inputYear));
        if (history) {
          setInputVolume(history.volume_sold.toString());
        } else {
          setInputVolume('');
        }
      } else {
        setInputVolume('');
      }
    }
  }, [selectedLayananId, inputYear, products]);

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('nama_layanan', namaLayanan);
    formData.append('deskripsi', deskripsi);
    if (gambarFile) {
      formData.append('gambar', gambarFile);
    }
    if (shopeeLink) {
      formData.append('shopee_link', shopeeLink);
    }

    let url = `/api/proxy/layanan`;
    if (productId) {
      url = `/api/proxy/layanan/${productId}`;
      formData.append('_method', 'PUT');
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert(productId ? 'Data komoditas berhasil diperbarui.' : 'Komoditas baru berhasil ditambahkan.');
        resetProductForm();
        fetchProducts();
      } else {
        alert('Gagal menyimpan produk. Silakan periksa isian Anda.');
      }
    } catch (error) {
      alert('Terjadi kesalahan pada sistem saat menyimpan data.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini secara permanen?')) return;
    try {
      const res = await fetch(`/api/proxy/layanan/${id}`, { 
        method: 'DELETE',
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

    try {
      const res = await fetch(`/api/proxy/sales-history`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
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
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    router.push('/login');
  };

  // Logic Search & Pagination
  const filteredProducts = products.filter(p => p.nama_layanan.toLowerCase().includes(searchQuery.toLowerCase()));
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const currentData = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
        <p className="text-sm font-medium text-slate-500">Memuat Sistem Administrator...</p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50/50 font-sans tracking-normal text-slate-800">
      
      {/* Sidebar Navigasi */}
      <aside className={`${isSidebarCollapsed ? 'w-20' : 'w-72'} transition-all duration-300 ease-in-out bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-10 shadow-sm relative`}>
        <button 
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-8 bg-white border border-slate-200 rounded-full p-1 text-slate-400 hover:text-indigo-600 shadow-sm z-20"
        >
          <svg className={`w-4 h-4 transition-transform ${isSidebarCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className={`p-8 border-b border-slate-100 flex flex-col ${isSidebarCollapsed ? 'items-center px-4' : ''}`}>
          {isSidebarCollapsed ? (
            <div className="w-8 h-8 rounded bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">A</div>
          ) : (
            <>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">Panel Kontrol</h1>
              <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">UGI CAHAYA MENTARI</p>
            </>
          )}
        </div>

        <nav className="flex-1 p-6 flex flex-col gap-2">
          <button 
            onClick={() => setActiveMenu('manajemen')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeMenu === 'manajemen' 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
            }`}
          >
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <svg className={`w-5 h-5 flex-shrink-0 ${activeMenu === 'manajemen' ? 'text-indigo-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              {!isSidebarCollapsed && "Katalog Komoditas"}
            </div>
          </button>
          
          <button 
            onClick={() => { resetProductForm(); setActiveMenu('input'); }}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeMenu === 'input' 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
            }`}
          >
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <svg className={`w-5 h-5 flex-shrink-0 ${activeMenu === 'input' ? 'text-indigo-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              {!isSidebarCollapsed && "Registrasi Entri Baru"}
            </div>
          </button>
          
          <button 
            onClick={() => setActiveMenu('grafik')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeMenu === 'grafik' 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
            }`}
          >
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <svg className={`w-5 h-5 flex-shrink-0 ${activeMenu === 'grafik' ? 'text-indigo-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              {!isSidebarCollapsed && "Sinkronisasi Grafik"}
            </div>
          </button>
          <button 
            onClick={() => setActiveMenu('analitik')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeMenu === 'analitik' 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
            }`}
            title="Metrik & Analitik"
          >
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <svg className={`w-5 h-5 flex-shrink-0 ${activeMenu === 'analitik' ? 'text-indigo-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              {!isSidebarCollapsed && "Metrik & Analitik"}
            </div>
          </button>

          <button 
            onClick={() => setActiveMenu('audit')}
            className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              activeMenu === 'audit' 
                ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
            }`}
            title="Sistem Log & Audit"
          >
            <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'gap-3'}`}>
              <svg className={`w-5 h-5 flex-shrink-0 ${activeMenu === 'audit' ? 'text-indigo-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {!isSidebarCollapsed && "Sistem Log & Audit"}
            </div>
          </button>
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={handleLogout} 
            className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-colors ${isSidebarCollapsed ? 'px-0' : ''}`}
            title="Keluar Sistem"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!isSidebarCollapsed && "Keluar Sistem"}
          </button>
        </div>
      </aside>

      {/* Area Konten Utama */}
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <div className="w-full h-full min-h-[calc(100vh-4rem)] bg-white rounded-md shadow-sm border border-slate-300 overflow-hidden flex flex-col">
          
          {/* Konten: Manajemen Tabel Produk */}
          {activeMenu === 'manajemen' && (
            <div className="animate-in fade-in duration-500 flex-1 flex flex-col p-8">
              <div className="mb-8 pb-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight uppercase">Dashboard Produk</h2>
                  <p className="text-slate-700 font-medium mt-1.5 text-sm">Otorisasi dan kelola data inventaris komoditas publik.</p>
                </div>
                <div className="relative w-full md:w-64">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="block w-full rounded-md border-0 py-2 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="flex-1 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col">
                <div className="overflow-x-auto flex-1">
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
                      {currentData.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            {item.gambar ? (
                              <Image 
                                src={`${API_BASE}/storage/${item.gambar}`} 
                                alt={item.nama_layanan} 
                                width={64}
                                height={48}
                                unoptimized={true}
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
                      {currentData.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-sm text-slate-500">
                            Tidak ada komoditas terdaftar dalam sistem.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between bg-slate-50">
                    <p className="text-sm text-slate-700">
                      Menampilkan <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> hingga <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</span> dari <span className="font-semibold">{filteredProducts.length}</span> produk
                    </p>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Sebelumnya
                      </button>
                      <button 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1.5 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Selanjutnya
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Konten: Input Produk Baru / Edit */}
          {activeMenu === 'input' && (
            <div className="animate-in fade-in duration-500 flex-1 flex flex-col p-8">
              <div className="mb-8 pb-6 border-b border-slate-100 max-w-3xl">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {productId ? 'Perbarui Spesifikasi Produk' : 'Registrasi Komoditas Baru'}
                </h2>
                <p className="text-slate-500 mt-1.5 text-sm">
                  Silakan isi detail produk dengan akurat untuk menjamin kualitas data di katalog publik.
                </p>
              </div>

              <div className="flex-1 max-w-3xl">
                <form onSubmit={handleSubmitProduct} className="space-y-6" autoComplete="off">
                  
                  <div>
                    <label className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Nama Komoditas / Layanan</label>
                    <input 
                      type="text" 
                      value={namaLayanan} 
                      onChange={(e) => setNamaLayanan(e.target.value)}
                      placeholder="Contoh: Petis Udang Super Grade A" 
                      required 
                      autoComplete="off"
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
                      autoComplete="off"
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
                        <div className="mt-4 flex text-sm leading-6 text-slate-700 justify-center">
                          <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-600 uppercase tracking-wide text-xs px-4 py-2 border border-slate-300 hover:bg-slate-50 transition-colors">
                            <span>Unggah Dokumen Visual</span>
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
                        {gambarFile && (
                          <div className="mt-3 flex items-center gap-2 text-sm font-medium text-indigo-700 bg-indigo-50 py-1.5 px-3 rounded-md border border-indigo-100 w-fit mx-auto">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                            {gambarFile.name}
                          </div>
                        )}
                      </div>
                    </div>
                    {productId && <p className="text-xs text-amber-600 mt-2 font-bold flex items-center gap-1 uppercase tracking-wide"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>PENTING: Kosongkan area ini jika tidak ada pembaruan dokumen visual.</p>}
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
                        disabled={isSubmitting}
                        className={`rounded-md px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center justify-center gap-2 ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                      >
                        {isSubmitting && (
                          <svg className="animate-spin -ml-1 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        )}
                        {isSubmitting 
                          ? (productId ? 'MENGOTORISASI PEMBARUAN...' : 'MENGEKSEKUSI REGISTRASI...') 
                          : (productId ? 'OTORISASI PEMBARUAN' : 'EKSEKUSI REGISTRASI')}
                      </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Konten: Pengaturan Grafik Tahunan */}
          {activeMenu === 'grafik' && (
            <div className="animate-in fade-in duration-500 flex-1 flex flex-col p-8">
              <div className="mb-8 pb-6 border-b border-slate-100 max-w-3xl">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sinkronisasi Data Penjualan</h2>
                <p className="text-slate-500 mt-1.5 text-sm">Input data tonase tahunan untuk merender metrik grafik tren pada aplikasi secara real-time.</p>
              </div>

              <div className="flex-1 max-w-3xl">
                <form onSubmit={handleUpdateGraph} className="space-y-6">
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
                      <label className="block text-sm font-semibold leading-6 text-slate-900 mb-2">Tahun</label>
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
                        placeholder="Contoh: 150" 
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
            <div className="animate-in fade-in duration-500 flex-1 flex flex-col p-8 bg-slate-50/30">
              <div className="mb-8 pb-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard Analitik</h2>
                  <p className="text-slate-500 mt-1.5 text-sm">Lacak kunjungan halaman dan keterlibatan produk dari pengguna publik secara real-time.</p>
                </div>
                <select 
                  value={analyticPeriod}
                  onChange={(e) => setAnalyticPeriod(e.target.value as any)}
                  className="rounded-md border-slate-300 py-2 pl-3 pr-10 text-slate-700 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm bg-white"
                >
                  <option value="weekly">7 Hari Terakhir</option>
                  <option value="monthly">Bulan Ini (30 Hari)</option>
                  <option value="yearly">Tahun Ini (12 Bulan)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Total Kunjungan Web</div>
                  <div className="text-4xl font-extrabold text-slate-800">{stats?.total_visits || 0}</div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Total Dilihat (Produk)</div>
                  <div className="text-4xl font-extrabold text-indigo-500">
                    {stats?.product_views?.reduce((acc, curr) => acc + curr.total, 0) || 0}
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-center shadow-sm">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Total Klik Shopee</div>
                  <div className="text-4xl font-extrabold text-emerald-500">
                    {stats?.shopee_clicks?.reduce((acc, curr) => acc + curr.total, 0) || 0}
                  </div>
                </div>
              </div>

              {/* Grafik Kunjungan Website (2-Sumbu) */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 mb-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-8">Grafik Kunjungan Website</h3>
                <div className="relative h-72 w-full flex">
                  {/* Y-Axis Labels */}
                  {(() => {
                    const maxVisits = stats?.visits_series && stats.visits_series.length > 0 
                      ? Math.max(...stats.visits_series.map((v: any) => v.total), 1) 
                      : 1;
                    const yMax = Math.ceil(maxVisits / 10) * 10 || 10;
                    return (
                      <div className="flex flex-col justify-between items-end pr-4 text-[11px] font-semibold text-slate-400 h-full pb-6 w-12 border-r border-slate-100">
                        <span>{yMax}</span>
                        <span>{Math.round(yMax * 0.75)}</span>
                        <span>{Math.round(yMax * 0.5)}</span>
                        <span>{Math.round(yMax * 0.25)}</span>
                        <span>0</span>
                      </div>
                    );
                  })()}
                  
                  {/* Chart Area with Grid */}
                  <div className="flex-1 relative h-full pb-6 pl-4 flex items-end justify-between gap-2">
                    {/* Horizontal Grid Lines */}
                    <div className="absolute inset-0 pb-6 pl-4 pointer-events-none flex flex-col justify-between z-0">
                      <div className="w-full border-t border-slate-100"></div>
                      <div className="w-full border-t border-slate-100"></div>
                      <div className="w-full border-t border-slate-100"></div>
                      <div className="w-full border-t border-slate-100"></div>
                      <div className="w-full border-t border-slate-200"></div>
                    </div>

                    {/* Bars */}
                    {stats?.visits_series && stats.visits_series.length > 0 ? (
                      (() => {
                        const maxVisits = Math.max(...stats.visits_series.map((v: any) => v.total), 1);
                        const yMax = Math.ceil(maxVisits / 10) * 10 || 10;
                        return stats.visits_series.map((item: any, idx: number) => {
                          const heightPercent = `${(item.total / yMax) * 100}%`;
                          const label = analyticPeriod === 'yearly' ? item.label : new Date(item.label).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
                          return (
                            <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full z-10 group relative">
                              <div className="w-full max-w-[48px] bg-slate-800 rounded-t hover:bg-indigo-500 transition-colors relative flex justify-center" style={{ height: heightPercent, minHeight: '2px' }}>
                                <span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-md whitespace-nowrap transition-opacity">
                                  {item.total} Kunjungan
                                </span>
                              </div>
                              <div className="absolute -bottom-6 text-[10px] font-bold text-slate-400 text-center w-full truncate px-1">{label}</div>
                            </div>
                          );
                        });
                      })()
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-medium z-10">Tidak ada data untuk periode ini.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Grafik Keterlibatan Produk (2-Sumbu) */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold text-slate-800">Perbandingan Keterlibatan per Produk</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-indigo-400"></div>
                      <span className="text-xs font-semibold text-slate-500">Dilihat (Views)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded bg-emerald-400"></div>
                      <span className="text-xs font-semibold text-slate-500">Klik Shopee</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative h-72 w-full flex">
                  {/* Y-Axis Labels */}
                  {(() => {
                    let maxVal = 1;
                    products.forEach(p => {
                      const v = stats?.product_views?.find(v => v.layanan_id === p.id)?.total || 0;
                      const c = stats?.shopee_clicks?.find(c => c.layanan_id === p.id)?.total || 0;
                      if (v > maxVal) maxVal = v;
                      if (c > maxVal) maxVal = c;
                    });
                    const yMax = Math.ceil(maxVal / 10) * 10 || 10;
                    return (
                      <div className="flex flex-col justify-between items-end pr-4 text-[11px] font-semibold text-slate-400 h-full pb-6 w-12 border-r border-slate-100">
                        <span>{yMax}</span>
                        <span>{Math.round(yMax * 0.75)}</span>
                        <span>{Math.round(yMax * 0.5)}</span>
                        <span>{Math.round(yMax * 0.25)}</span>
                        <span>0</span>
                      </div>
                    );
                  })()}
                  
                  {/* Chart Area with Grid */}
                  <div className="flex-1 relative h-full pb-6 pl-4 flex items-end justify-between gap-4 overflow-x-auto">
                    {/* Horizontal Grid Lines */}
                    <div className="absolute inset-0 pb-6 pl-4 pointer-events-none flex flex-col justify-between z-0">
                      <div className="w-full border-t border-slate-100"></div>
                      <div className="w-full border-t border-slate-100"></div>
                      <div className="w-full border-t border-slate-100"></div>
                      <div className="w-full border-t border-slate-100"></div>
                      <div className="w-full border-t border-slate-200"></div>
                    </div>

                    {/* Bars */}
                    {products.length > 0 ? (
                      (() => {
                        let maxVal = 1;
                        products.forEach(p => {
                          const v = stats?.product_views?.find(v => v.layanan_id === p.id)?.total || 0;
                          const c = stats?.shopee_clicks?.find(c => c.layanan_id === p.id)?.total || 0;
                          if (v > maxVal) maxVal = v;
                          if (c > maxVal) maxVal = c;
                        });
                        const yMax = Math.ceil(maxVal / 10) * 10 || 10;

                        return products.map((product) => {
                          const views = stats?.product_views?.find(v => v.layanan_id === product.id)?.total || 0;
                          const clicks = stats?.shopee_clicks?.find(c => c.layanan_id === product.id)?.total || 0;
                          const viewHeight = `${(views / yMax) * 100}%`;
                          const clickHeight = `${(clicks / yMax) * 100}%`;

                          return (
                            <div key={product.id} className="min-w-[80px] flex-1 flex flex-col items-center justify-end h-full z-10 group relative">
                              <div className="flex items-end gap-1 w-full h-full justify-center">
                                {/* Bar Views */}
                                <div className="relative w-full max-w-[24px] bg-indigo-400 rounded-t hover:bg-indigo-500 transition-colors flex items-end justify-center" style={{ height: viewHeight, minHeight: '2px' }}>
                                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-md whitespace-nowrap z-10">
                                    {views} Views
                                  </span>
                                </div>
                                {/* Bar Clicks */}
                                <div className="relative w-full max-w-[24px] bg-emerald-400 rounded-t hover:bg-emerald-500 transition-colors flex items-end justify-center" style={{ height: clickHeight, minHeight: '2px' }}>
                                  <span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-slate-800 text-white text-[10px] py-1 px-2 rounded shadow-md whitespace-nowrap z-10">
                                    {clicks} Clicks
                                  </span>
                                </div>
                              </div>
                              <div className="absolute -bottom-6 text-[10px] font-bold text-slate-400 text-center w-full truncate px-1" title={product.nama_layanan}>
                                {product.nama_layanan}
                              </div>
                            </div>
                          );
                        });
                      })()
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm font-medium z-10">Belum ada komoditas.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Konten: Audit Log */}
          {activeMenu === 'audit' && (
            <div className="animate-in fade-in duration-500 flex-1 flex flex-col p-8 bg-slate-50/30">
              <div className="mb-8 pb-6 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Sistem Log & Audit</h2>
                <p className="text-slate-500 mt-1.5 text-sm">Pencatatan riwayat aktivitas administratif demi akuntabilitas sistem.</p>
              </div>

              <div className="flex-1 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm flex flex-col">
                <div className="overflow-x-auto flex-1">
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Waktu (WIB)</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Aktivitas</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Pengguna</th>
                        <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">IP Address</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {auditLogs.map((log: any) => (
                        <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                            {new Date(log.created_at).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                log.action === 'CREATED' ? 'bg-emerald-100 text-emerald-800' :
                                log.action === 'UPDATED' ? 'bg-blue-100 text-blue-800' :
                                log.action === 'DELETED' ? 'bg-rose-100 text-rose-800' :
                                'bg-slate-100 text-slate-800'
                              }`}>
                                {log.action}
                              </span>
                              <span className="text-sm font-semibold text-slate-700">{log.model}</span>
                            </div>
                            {log.details && (
                              <div className="text-xs text-slate-400 mt-1 max-w-md truncate" title={JSON.stringify(log.details)}>
                                {JSON.stringify(log.details)}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                            {log.user?.name || 'Sistem / Superadmin'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                            {log.ip_address || '-'}
                          </td>
                        </tr>
                      ))}
                      {auditLogs.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center text-sm text-slate-500">
                            Tidak ada riwayat aktivitas yang tercatat.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}