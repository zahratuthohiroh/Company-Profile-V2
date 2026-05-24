import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Layanan & Komoditas',
  description: 'Katalog komoditas pangan B2B dari CV Cahaya Nusantara: petis udang, bawang merah, kacang tanah, dan ebi pilihan berkualitas tinggi asal Cirebon.',
};

async function getLayananFromBackend() {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/layanan', {
      cache: 'no-store'
    });

    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Gagal menyambungkan ke backend Laravel:", error);
    return [];
  }
}

const visualAssetsMap: Record<string, any> = {
  'Petis Udang': {
    id: 'petis-udang',
    image: '/petis-udang.png',
    origin: 'Cirebon, Jawa Barat',
    grade: 'Grade A / Grade B',
    features: ['Kadar protein tinggi', 'Bebas pengawet buatan', 'Tersertifikasi Halal MUI', 'Kemasan industri 1kg - 25kg'],
    color: '#2D6A4F',
    overlayColor: 'rgba(18,55,32,0.72)',
    borderColor: 'rgba(45,106,79,0.22)',
  },
  'Bawang Merah': {
    id: 'bawang-merah',
    image: '/bawang-merah.png',
    origin: 'Brebes & Cirebon, Jawa Barat',
    grade: 'Super / Medium / Industri',
    features: ['Sortir manual berlapis', 'Kadar air optimal', 'Tersedia stok konsisten', 'Pengiriman terjadwal'],
    color: '#1A5C5C',
    overlayColor: 'rgba(14,55,55,0.72)',
    borderColor: 'rgba(26,92,92,0.22)',
  },
  'Kacang Tanah': {
    id: 'kacang-tanah',
    image: '/kacang-tanah.png',
    origin: 'Majalengka & Cirebon',
    grade: 'Kulit / Kupas / Sangrai',
    features: ['Ukuran seragam & besar', 'Kadar aflatoksin terkontrol', 'Terseria varian kupas & kulit', 'MOQ fleksibel per kuintal'],
    color: '#5A7A2E',
    overlayColor: 'rgba(40,55,14,0.72)',
    borderColor: 'rgba(90,122,46,0.22)',
  },
  'Ebi (Udang Kering)': {
    id: 'ebi',
    image: '/ebi.png',
    origin: 'Pesisir Cirebon & Indramayu',
    grade: 'Pilihan / Reguler',
    features: ['Dikeringkan secara alami', 'Aroma kuat & harum', 'Ukuran seragam', 'Kemasan vakum tersedia'],
    color: '#40916C',
    overlayColor: 'rgba(20,65,50,0.72)',
    borderColor: 'rgba(64,145,108,0.22)',
  }
};

const services = [
  { image: '/illus-distribusi.png', accentColor: '#2D6A4F', title: 'Distribusi B2B', desc: 'Layanan distribusi skala besar dengan jadwal pengiriman reguler ke seluruh wilayah Jawa Barat.' },
  { image: '/illus-industri.png', accentColor: '#1A5C5C', title: 'Kemitraan Industri', desc: 'Program kemitraan khusus untuk pabrik bumbu, produsen makanan, hotel, dan jaringan restoran.' },
];

export default async function LayananPage() {
  const backendLayanan = await getLayananFromBackend();

  const commodities = backendLayanan.map((item: any) => {
    // Ambil basis tema styling template (warna, border, list features) berdasarkan kesamaan nama
    const assets = visualAssetsMap[item.nama_layanan] || {
      id: `layanan-${item.id}`,
      image: '/petis-udang.png', 
      origin: 'Cirebon, Jawa Barat',
      grade: 'Standard B2B',
      features: ['Mutu Standar Industri', 'Rantai Pasok Terjamin'],
      color: '#2D6A4F',
      overlayColor: 'rgba(18,55,32,0.72)',
      borderColor: 'rgba(45,106,79,0.22)',
    };

    // LOGIKA FILTER DAN SINKRONISASI FOTO (Mencegah url pecah/tidak sinkron)
    let finalProductImage = assets.image;
    if (item.gambar) {
      if (item.gambar.startsWith('http')) {
        finalProductImage = item.gambar;
      } else if (item.gambar.startsWith('komoditas')) {
        finalProductImage = `http://127.0.0.1:8000/storage/${item.gambar}`;
      }
    }

    return {
      id: assets.id,
      image: finalProductImage, // <--- Sudah disaring aman menggunakan URL Storage asli Laravel
      name: item.nama_layanan, 
      origin: assets.origin,
      grade: assets.grade,
      desc: item.deskripsi,   
      features: assets.features,
      color: assets.color,
      overlayColor: assets.overlayColor,
      borderColor: assets.borderColor,
      histories: item.histories || [] 
    };
  });

  return (
    <>
      {/* Hero */}
      <section style={{ backgroundColor: 'var(--color-espresso)', paddingTop: '144px', paddingBottom: 'var(--space-10)', position: 'relative', overflow: 'hidden' }}>
        <div className="container-site">
          <span className="section-label-light">Katalog & Analisis</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: 'var(--space-3)' }}>
            Komoditas Pangan & Tren Tahunan
          </h1>
        </div>
      </section>

      {/* ======== COMMODITY GRID WITH TREND CHART ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
            {commodities.map((item: any) => {
              
              // LOGIK GENERATOR GRAFIK GARIS NAIK TURUN (SVG)
              const hasHistory = item.histories.length > 1;
              let svgPoints = "";
              let maxVal = 100;
              let minVal = 0;

              if (hasHistory) {
                const volumes = item.histories.map((h: any) => h.volume_sold);
                maxVal = Math.max(...volumes) * 1.2; 
                minVal = Math.min(...volumes) * 0.8; 
                
                const widthBetweenPoints = 300 / (item.histories.length - 1);
                svgPoints = item.histories.map((h: any, idx: number) => {
                  const x = idx * widthBetweenPoints;
                  const y = 80 - ((h.volume_sold - minVal) / (maxVal - minVal)) * 60 - 10;
                  return `${x},${y}`;
                }).join(" ");
              }

              return (
                <article key={item.id} className="card" style={{ padding: 0, overflow: 'hidden', border: `1px solid ${item.borderColor}` }}>
                  {/* Image Header */}
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                    {/* IMPLEMENTASI BG IMAGE BARU YANG SUDAH SINKRON */}
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${item.overlayColor} 0%, rgba(0,0,0,0.30) 100%)` }} />
                    <div style={{ position: 'absolute', inset: 0, padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <h2 style={{ fontSize: '1.375rem', color: 'white', marginBottom: '4px' }}>{item.name}</h2>
                      <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.80)' }}>📍 {item.origin} | Grade: {item.grade}</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: 'var(--space-4)' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-stone)', lineHeight: 1.75, marginBottom: 'var(--space-3)', minHeight: '70px' }}>{item.desc}</p>

                    {/* ======== VISUALISASI GRAFIK NAIK TURUN TAHUNAN ======== */}
                    <div style={{ backgroundColor: '#F8F9FA', padding: '12px', borderRadius: '8px', marginBottom: 'var(--space-3)', border: '1px solid #E9ECEF' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-stone)', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        📈 Tren Distribusi (Tahun ke Tahun)
                      </span>
                      
                      {hasHistory ? (
                        <div style={{ position: 'relative' }}>
                          {/* Jalur Line Chart */}
                          <svg viewBox="0 0 300 80" style={{ width: '100%', height: '60px' }}>
                            <polyline
                              fill="none"
                              stroke={item.color}
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              points={svgPoints}
                            />
                          </svg>
                          {/* Label Tahun & Angka Kuantitas di bawah grafik */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', borderTop: '1px dashed #E9ECEF', paddingTop: '4px' }}>
                            {item.histories.map((h: any, idx: number) => (
                              <div key={idx} style={{ textAlign: 'center', flex: 1, fontSize: '0.7rem', color: 'var(--color-espresso)' }}>
                                <span style={{ fontWeight: 'bold', display: 'block' }}>{h.year}</span>
                                <span style={{ color: item.color, fontWeight: '600' }}>{h.volume_sold}T</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: '#6C757D', fontStyle: 'italic' }}>Belum ada data historis tahunan.</span>
                      )}
                    </div>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-4)' }}>
                      {item.features.map((f: string) => (
                        <li key={f} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.875rem', color: 'var(--color-espresso-mid)' }}>
                          <span style={{ color: item.color, fontWeight: 700 }}>✓</span> {f}
                        </li>
                      ))}
                    </ul>

                    <Link href="/kontak" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '0.875rem', fontWeight: 600, color: item.color, textDecoration: 'none' }}>
                      Minta Penawaran Harga →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid & CTA Bawaan */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream-dark)' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-3)' }}>
            {services.map((s, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ height: '160px', backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: 'var(--space-4)' }}>
                  <h3 style={{ fontSize: '1.0625rem', marginBottom: '8px', color: 'var(--color-espresso)' }}>{s.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-stone)', lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}