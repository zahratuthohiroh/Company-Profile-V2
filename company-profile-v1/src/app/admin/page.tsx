'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // State Form Produk
  const [productId, setProductId] = useState<number | null>(null);
  const [namaLayanan, setNamaLayanan] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [gambarFile, setGambarFile] = useState<File | null>(null);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Simpan / Edit Produk dengan FormData
  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('nama_layanan', namaLayanan);
    formData.append('deskripsi', deskripsi);
    if (gambarFile) {
      formData.append('gambar', gambarFile);
    }

    // Trik FormData Laravel: Jika EDIT/UPDATE, kirim dengan method POST tapi disisipkan '_method' = 'PUT'
    let url = 'http://127.0.0.1:8000/api/layanan';
    if (productId) {
      url = `http://127.0.0.1:8000/api/layanan/${productId}`;
      formData.append('_method', 'PUT');
    }

    try {
      const res = await fetch(url, {
        method: 'POST', // Selalu gunakan POST untuk upload file multipart/form-data
        body: formData,
      });

      if (res.ok) {
        alert(productId ? '✓ Data Komoditas berhasil diperbarui!' : '✓ Komoditas baru berhasil ditambahkan!');
        resetProductForm();
        fetchProducts();
      } else {
        alert('Gagal menyimpan produk, cek validasi backend.');
      }
    } catch (error) {
      alert('Gagal mengeksekusi aksi produk');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/layanan/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('✓ Produk berhasil dihapus!');
        fetchProducts();
      }
    } catch (error) {
      alert('Gagal menghapus produk');
    }
  };

  const handleUpdateGraph = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLayananId) return alert('Pilih produk terlebih dahulu!');

    try {
      const res = await fetch('http://127.0.0.1:8000/api/sales-history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          layanan_id: selectedLayananId,
          year: parseInt(inputYear),
          volume_sold: parseInt(inputVolume)
        })
      });

      if (res.ok) {
        alert('✓ Grafik tren tahunan berhasil diperbarui!');
        setInputVolume('');
        fetchProducts();
      }
    } catch (error) {
      alert('Gagal memperbarui grafik historis');
    }
  };

  const resetProductForm = () => {
    setProductId(null);
    setNamaLayanan('');
    setDeskripsi('');
    setGambarFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEditClick = (item: any) => {
    setProductId(item.id);
    setNamaLayanan(item.nama_layanan);
    setDeskripsi(item.deskripsi);
    setGambarFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Memuat Konsol Admin Pangan...</div>;

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px', fontFamily: 'system-ui, sans-serif', color: '#2b2d42' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '24px 32px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', marginBottom: '32px', border: '1px solid #eef2f1' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#52b788', textTransform: 'uppercase', letterSpacing: '1px' }}>CV Cahaya Nusantara</span>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1b4332', margin: '4px 0 0 0' }}>B2B Supply Console & Photo Manager</h1>
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start', marginBottom: '40px' }}>
          
          {/* FORM CRUD PRODUK */}
          <section style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #eef2f1', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1b4332', marginBottom: '24px' }}>
              {productId ? '✏️ Edit Manifes Komoditas' : '📦 Registrasi Komoditas & Gambar'}
            </h2>
            <form onSubmit={handleSubmitProduct} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>Nama Komoditas</label>
                <input 
                  type="text" value={namaLayanan} onChange={(e) => setNamaLayanan(e.target.value)}
                  placeholder="Contoh: Petis Udang, Bawang Merah" required 
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #dde4e2' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>Deskripsi Rantai Pasok B2B</label>
                <textarea 
                  value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Tuliskan spesifikasi produk..." required rows={3}
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #dde4e2', resize: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>Foto Sampul Komoditas</label>
                <input 
                  type="file" ref={fileInputRef} accept="image/*"
                  onChange={(e) => setGambarFile(e.target.files ? e.target.files[0] : null)}
                  required={!productId} // Wajib hanya jika tambah produk baru
                  style={{ width: '100%', padding: '8px 0', fontSize: '0.875rem' }}
                />
                {productId && <p style={{ fontSize: '0.75rem', color: '#777', marginTop: '4px' }}>* Biarkan kosong jika tidak ingin mengganti gambar produk</p>}
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="submit" style={{ backgroundColor: '#2d6a4f', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                  {productId ? 'Perbarui Data' : 'Publish Komoditas'}
                </button>
                {productId && <button type="button" onClick={resetProductForm} style={{ backgroundColor: '#f1f3f2', padding: '12px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Batal</button>}
              </div>
            </form>
          </section>

          {/* FORM EDIT GRAFIK */}
          <section style={{ backgroundColor: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #eef2f1', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1b4332', marginBottom: '24px' }}>📊 Parameter Tren Tahunan</h2>
            <form onSubmit={handleUpdateGraph} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>Pilih Varietas</label>
                <select onChange={(e) => setSelectedLayananId(Number(e.target.value))} defaultValue="" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #dde4e2', backgroundColor: 'white' }}>
                  <option value="" disabled>-- Pilih komoditas --</option>
                  {products.map((p) => <option key={p.id} value={p.id}>{p.nama_layanan}</option>)}
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>Periode Tahun</label>
                  <select value={inputYear} onChange={(e) => setInputYear(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #dde4e2', backgroundColor: 'white' }}>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '8px' }}>Volume (Ton)</label>
                  <input type="number" value={inputVolume} onChange={(e) => setInputVolume(e.target.value)} placeholder="Contoh: 140" required style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #dde4e2' }} />
                </div>
              </div>
              <button type="submit" style={{ backgroundColor: '#1a5c5c', color: 'white', padding: '12px 24px', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>Sinkronisasi Angka Tren</button>
            </form>
          </section>
        </div>

        {/* TABEL MASTER INVENTORI */}
        <section style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #eef2f1', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8faf9', borderBottom: '1px solid #f1f5f4' }}>
                <th style={{ padding: '16px 32px', fontWeight: 700, fontSize: '0.8rem' }}>Miniatur</th>
                <th style={{ padding: '16px 24px', fontWeight: 700, fontSize: '0.8rem' }}>Nama Produk</th>
                <th style={{ padding: '16px 24px', fontWeight: 700, fontSize: '0.8rem', width: '35%' }}>Manifes Deskripsi</th>
                <th style={{ padding: '16px 24px', fontWeight: 700, fontSize: '0.8rem' }}>Log Grafik</th>
                <th style={{ padding: '16px 32px', fontWeight: 700, fontSize: '0.8rem', textAlign: 'right' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f4' }}>
                  <td style={{ padding: '16px 32px' }}>
                    {item.gambar ? (
                      <img 
                        src={`http://127.0.0.1:8000/storage/${item.gambar}`} 
                        alt={item.nama_layanan} 
                        style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee' }}
                      />
                    ) : (
                      <div style={{ width: '60px', height: '40px', backgroundColor: '#eee', borderRadius: '6px', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>No Photo</div>
                    )}
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: 700, color: '#1b4332' }}>{item.nama_layanan}</td>
                  <td style={{ padding: '16px 24px', color: '#4a5568', lineHeight: '1.5' }}>{item.deskripsi}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {item.histories?.map((h: any, i: number) => (
                        <div key={i} style={{ backgroundColor: '#f0f7f4', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, color: '#2d6a4f' }}>
                          {h.year}: <strong>{h.volume_sold}T</strong>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '16px 32px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button onClick={() => handleEditClick(item)} style={{ backgroundColor: 'white', color: '#b7791f', border: '1px solid #fbd38d', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Edit</button>
                      <button onClick={() => handleDeleteProduct(item.id)} style={{ backgroundColor: 'white', color: '#e53e3e', border: '1px solid #feb2b2', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}