import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Layanan & Komoditas',
  description: 'Katalog komoditas pangan B2B dari Ugi Cahaya Mentari: petis udang, bawang merah, kacang tanah, dan ebi pilihan berkualitas tinggi asal Cirebon.',
};

async function getLayananFromBackend() {
  try {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const res = await fetch(`${API_BASE}/api/layanan`, {
      next: { revalidate: 3600 } // Cache hasil API selama 1 jam untuk performa optimal
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
    features: [],
    color: '#2D6A4F',
    overlayColor: 'rgba(18,55,32,0.72)',
    borderColor: 'rgba(45,106,79,0.22)',
  },
  'Bawang Merah': {
    id: 'bawang-merah',
    image: '/bawang-merah.png',
    origin: 'Brebes & Cirebon, Jawa Barat',
    grade: 'Super / Medium / Industri',
    features: [],
    color: '#1A5C5C',
    overlayColor: 'rgba(14,55,55,0.72)',
    borderColor: 'rgba(26,92,92,0.22)',
  },
  'Kacang Tanah': {
    id: 'kacang-tanah',
    image: '/kacang-tanah.png',
    origin: 'Majalengka & Cirebon',
    grade: 'Kulit / Kupas / Sangrai',
    features: [],
    color: '#5A7A2E',
    overlayColor: 'rgba(40,55,14,0.72)',
    borderColor: 'rgba(90,122,46,0.22)',
  },
  'Ebi (Udang Kering)': {
    id: 'ebi',
    image: '/ebi.png',
    origin: 'Pesisir Cirebon & Indramayu',
    grade: 'Pilihan / Reguler',
    features: [],
    color: '#40916C',
    overlayColor: 'rgba(20,65,50,0.72)',
    borderColor: 'rgba(64,145,108,0.22)',
  }
};

const services = [
  { image: '/illus-distribusi.png', accentColor: '#2D6A4F', title: 'Distribusi Skala Besar (B2B)', desc: 'Kami siap mendukung kelancaran operasional bisnis Anda melalui pasokan komoditas skala besar dengan kepastian jadwal pengiriman yang selalu dapat diandalkan.' },
  { image: '/illus-industri.png', accentColor: '#1A5C5C', title: 'Kemitraan Industri & Horeka', desc: 'Program kerja sama strategis yang dirancang khusus untuk produsen makanan, hotel, dan jaringan restoran dengan jaminan kualitas dan penawaran harga grosir terbaik.' },
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
      features: [],
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
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
        finalProductImage = `${API_BASE}/storage/${item.gambar}`;
      }
    }

    return {
      id: assets.id,
      dbId: item.id, // ID asli dari database untuk routing dinamis
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
        {/* Background Photo */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
          <Image
            src="/hero-bg.png"
            alt="Layanan Ugi Cahaya Mentari"
            fill
            quality={85}
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        {/* Dark overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(14,40,24,0.92) 0%, rgba(18,55,32,0.84) 100%)',
        }} />
        <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label-light animate-fade-in-up">Informasi Produk</span>
          <h1 className="animate-fade-in-up-delay-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: 'var(--space-3)' }}>
            Katalog Komoditas Pilihan
          </h1>
        </div>
      </section>

      {/* ======== COMMODITY GRID WITH TREND CHART ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-site">
          <div className="animate-fade-in-up-delay-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
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
                    <div style={{ position: 'absolute', inset: 0 }}>
                      <Image src={item.image} alt={item.name} fill unoptimized={true} style={{ objectFit: 'cover', objectPosition: 'center' }} />
                    </div>
                    <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${item.overlayColor} 0%, rgba(0,0,0,0.30) 100%)` }} />
                    <div style={{ position: 'absolute', inset: 0, padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                      <h2 style={{ fontSize: '1.375rem', color: 'white', marginBottom: '4px' }}>{item.name}</h2>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: 'var(--space-4)' }}>
                    <p className="line-clamp-4" style={{ fontSize: '0.9rem', color: 'var(--color-stone)', lineHeight: 1.75, marginBottom: 'var(--space-3)', minHeight: '100px' }}>{item.desc}</p>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-4)' }}>
                      {item.features.map((f: string) => (
                        <li key={f} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.875rem', color: 'var(--color-espresso-mid)' }}>
                          <span style={{ color: item.color, fontWeight: 700 }}>•</span> {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/layanan/${item.dbId}`}
                      className="hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: '100%',
                        fontSize: '1rem', 
                        fontWeight: 600, 
                        color: 'white', 
                        backgroundColor: item.color,
                        textDecoration: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        marginTop: 'var(--space-4)',
                      }}
                    >
                      Lihat Detail Produk
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