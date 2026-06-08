import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Sejarah, visi, dan misi Ugi Cahaya Mentari sebagai distributor B2B komoditas pangan tradisional Cirebon sejak 1998.',
};

const milestones = [
  { year: '1998', title: 'Berdiri di Cirebon', desc: 'Didirikan oleh Bapak H. Suryana dengan modal awal distribusi petis udang ke pasar lokal Cirebon.' },
  { year: '2005', title: 'Ekspansi Komoditas', desc: 'Menambah lini distribusi bawang merah dan kacang tanah, memperluas jaringan ke seluruh Jawa Barat.' },
  { year: '2012', title: 'Sertifikasi & Standarisasi', desc: 'Memperoleh sertifikasi halal MUI dan menerapkan standar BPOM untuk seluruh rantai distribusi.' },
  { year: '2018', title: 'Platform Digital', desc: 'Meluncurkan sistem pemesanan digital dan memperluas jaringan mitra B2B ke wilayah Jabodetabek.' },
  { year: '2024', title: 'Modernisasi Operasional', desc: 'Implementasi sistem manajemen rantai pasok digital dan gudang berpendingin untuk menjaga kualitas komoditas.' },
];

const values = [
  { image: '/illus-integritas.png', accentColor: '#2D6A4F', title: 'Integritas',      desc: 'Kejujuran dalam setiap transaksi dan transparansi penuh dalam rantai distribusi.' },
  { image: '/illus-kualitas.png',   accentColor: '#C89A2E', title: 'Kualitas',        desc: 'Standar seleksi ketat untuk setiap komoditas yang kami distribusikan.' },
  { image: '/illus-kemitraan.png',  accentColor: '#1A5C5C', title: 'Kemitraan',       desc: 'Membangun hubungan jangka panjang yang saling menguntungkan dengan semua pemangku kepentingan.' },
  { image: '/illus-keberlanjutan.png', accentColor: '#5A7A2E', title: 'Keberlanjutan', desc: 'Mendukung petani lokal dan praktik pertanian yang berkelanjutan.' },
];

const stats = [
  { value: '1998', label: 'Tahun Berdiri' },
  { value: '200+', label: 'Mitra Bisnis Aktif' },
  { value: '12', label: 'Kab/Kota Terjangkau' },
  { value: '45', label: 'Tenaga Kerja' },
];

export default function TentangPage() {
  return (
    <>
      {/* ======== PAGE HERO ======== */}
      <section
        style={{
          backgroundColor: 'var(--color-espresso)',
          paddingTop: '144px',
          paddingBottom: 'var(--space-10)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Photo */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/about-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        {/* Dark overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(14,40,24,0.92) 0%, rgba(18,55,32,0.84) 100%)',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(27,107,58,0.22) 0%, transparent 60%)',
        }} />
        <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label-light">Profil Perusahaan</span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: 'var(--space-3)', maxWidth: '640px' }}>
            Tentang Ugi Cahaya Mentari
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', maxWidth: '560px', lineHeight: 1.8 }}>
            Lebih dari dua dekade menjadi jembatan antara tradisi pangan lokal Cirebon dengan kebutuhan industri B2B modern di seluruh Jawa Barat.
          </p>

          {/* Hero Stats Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: 'var(--space-1)',
            marginTop: 'var(--space-10)',
            paddingTop: 'var(--space-5)',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            maxWidth: '600px',
          }}>
            {stats.map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--color-gold-light)',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SEJARAH INTRO — Photo + Text ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream)', overflow: 'hidden' }}>
        <div className="container-site">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-10)',
            alignItems: 'center',
          }}>
            {/* Photo Side */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '10px',
                overflow: 'hidden',
                height: '380px',
                backgroundImage: 'url(/about-history.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: '0 20px 60px rgba(18,50,30,0.18)',
              }} />
              {/* Floating badge */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-12px',
                backgroundColor: 'var(--color-forest)',
                borderRadius: '8px',
                padding: 'var(--space-3) var(--space-4)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-gold-light)', lineHeight: 1 }}>25+</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>Tahun Berpengalaman</div>
              </div>
            </div>

            {/* Text Side */}
            <div style={{ paddingTop: 'var(--space-4)' }}>
              <span className="section-label">Sejarah Kami</span>
              <div className="divider-terracotta" />
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginBottom: 'var(--space-3)' }}>
                Berawal dari Pasar Tradisional Cirebon
              </h2>
              <p style={{ color: 'var(--color-stone)', lineHeight: 1.85, marginBottom: 'var(--space-3)', fontSize: '0.9375rem' }}>
                Perjalanan kami dimulai pada 1998, ketika Bapak H. Suryana mendirikan usaha distribusi kecil di kawasan Pasar Pagi Cirebon. Dengan kejujuran dan ketekunan, kami perlahan membangun kepercayaan para produsen lokal dan pelaku industri kuliner.
              </p>
              <p style={{ color: 'var(--color-stone)', lineHeight: 1.85, fontSize: '0.9375rem', marginBottom: 'var(--space-5)' }}>
                Hari ini, Ugi Cahaya Mentari telah berkembang menjadi distributor B2B terpercaya dengan jaringan lebih dari 200 mitra aktif, melayani restoran, pabrik bumbu, hotel, dan retail modern di seluruh Jawa Barat.
              </p>
              {/* Highlights list */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Tersertifikasi Halal MUI & standar BPOM',
                  'Jaringan distribusi 12 Kab/Kota di Jawa Barat',
                  'Armada pengiriman berpendingin modern',
                  'Tim QC berlapis untuk setiap komoditas',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--color-espresso-mid)' }}>
                    <span style={{ color: 'var(--color-forest)', fontWeight: 700, flexShrink: 0 }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ======== TIMELINE ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream-dark)' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span className="section-label">Milestone</span>
            <div className="divider-terracotta" style={{ margin: '0 auto var(--space-3)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Tonggak Sejarah Perusahaan</h2>
          </div>

          <div style={{ position: 'relative', maxWidth: '760px', margin: '0 auto' }}>
            {/* Timeline vertical line */}
            <div style={{
              position: 'absolute',
              left: '88px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, transparent, var(--color-forest) 10%, var(--color-forest) 90%, transparent)',
            }} aria-hidden="true" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {milestones.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 'var(--space-5)', alignItems: 'flex-start' }}>
                  {/* Year column */}
                  <div style={{ minWidth: '72px', textAlign: 'right', position: 'relative', paddingTop: '3px' }}>
                    <span style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.9375rem',
                      fontWeight: 700,
                      color: 'var(--color-forest)',
                    }}>{m.year}</span>
                    {/* Dot */}
                    <div style={{
                      position: 'absolute',
                      right: '-25px',
                      top: '7px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: i === milestones.length - 1 ? 'var(--color-forest)' : 'var(--color-terracotta)',
                      border: '2.5px solid var(--color-cream-dark)',
                      boxShadow: '0 0 0 3px ' + (i === milestones.length - 1 ? 'rgba(45,106,79,0.2)' : 'rgba(192,98,42,0.2)'),
                    }} />
                  </div>

                  {/* Content card */}
                  <div style={{
                    flex: 1,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: 'var(--space-3) var(--space-4)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    borderLeft: `3px solid ${i === milestones.length - 1 ? 'var(--color-forest)' : 'var(--color-terracotta)'}`,
                    marginBottom: 'var(--space-1)',
                  }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '5px', color: 'var(--color-espresso)' }}>{m.title}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-stone)', lineHeight: 1.65, margin: 0 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======== VISI & MISI ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-espresso)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle pattern */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(27,107,58,0.18) 0%, transparent 60%), radial-gradient(circle at 80% 30%, rgba(200,154,46,0.08) 0%, transparent 50%)',
        }} />
        <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span className="section-label-light">Arah Perusahaan</span>
            <div className="divider-gold" style={{ margin: '0 auto var(--space-3)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'white' }}>Visi & Misi Kami</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-5)' }}>
            {/* Visi */}
            <div style={{
              border: '1px solid rgba(200,154,46,0.35)',
              borderRadius: '10px',
              padding: 'var(--space-6)',
              backgroundColor: 'rgba(200,154,46,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div aria-hidden="true" style={{
                position: 'absolute', top: '-30px', right: '-30px',
                width: '100px', height: '100px',
                borderRadius: '50%',
                backgroundColor: 'rgba(200,154,46,0.07)',
              }} />
              <span style={{
                display: 'inline-block',
                fontSize: '0.7rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', fontWeight: 700,
                color: 'var(--color-gold)',
                marginBottom: 'var(--space-2)',
                backgroundColor: 'rgba(200,154,46,0.12)',
                padding: '4px 10px', borderRadius: '2px',
              }}>Visi</span>
              <div className="divider-gold" />
              <h2 style={{ fontSize: '1.1875rem', color: 'white', lineHeight: 1.65, marginBottom: 'var(--space-3)' }}>
                Menjadi distributor komoditas pangan tradisional B2B terdepan di Jawa Barat yang dipercaya, berkelanjutan, dan memberdayakan petani lokal.
              </h2>
            </div>

            {/* Misi */}
            <div style={{
              border: '1px solid rgba(45,106,79,0.35)',
              borderRadius: '10px',
              padding: 'var(--space-6)',
              backgroundColor: 'rgba(45,106,79,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div aria-hidden="true" style={{
                position: 'absolute', top: '-30px', right: '-30px',
                width: '100px', height: '100px',
                borderRadius: '50%',
                backgroundColor: 'rgba(45,106,79,0.07)',
              }} />
              <span style={{
                display: 'inline-block',
                fontSize: '0.7rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', fontWeight: 700,
                color: 'var(--color-terracotta-light)',
                marginBottom: 'var(--space-2)',
                backgroundColor: 'rgba(192,98,42,0.12)',
                padding: '4px 10px', borderRadius: '2px',
              }}>Misi</span>
              <div className="divider-terracotta" />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'Menjamin ketersediaan komoditas pangan berkualitas tinggi secara konsisten untuk mitra B2B.',
                  'Memberdayakan petani dan produsen lokal Cirebon melalui kemitraan yang adil dan transparan.',
                  'Mengimplementasikan sistem distribusi modern yang efisien dan ramah lingkungan.',
                  'Membangun ekosistem bisnis pangan yang menguntungkan semua pemangku kepentingan.',
                ].map((m, i) => (
                  <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <span style={{
                      color: 'white', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0,
                      marginTop: '2px', backgroundColor: 'rgba(45,106,79,0.5)',
                      width: '22px', height: '22px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>0{i + 1}</span>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7 }}>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ======== NILAI-NILAI ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span className="section-label">Nilai Perusahaan</span>
            <div className="divider-terracotta" style={{ margin: '0 auto var(--space-3)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Fondasi yang Memandu Langkah Kami</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
            {values.map((v, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', textAlign: 'center' }}>
                {/* Illustration */}
                <div style={{
                  height: '150px',
                  backgroundImage: `url(${v.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, ${v.accentColor}18 100%)`,
                  }} />
                </div>
                {/* Content */}
                <div style={{ padding: 'var(--space-4)' }}>
                  <div style={{
                    width: '32px', height: '3px',
                    backgroundColor: v.accentColor,
                    borderRadius: '2px',
                    margin: '0 auto 12px',
                  }} />
                  <h3 style={{ fontSize: '1.0625rem', marginBottom: '8px', color: 'var(--color-espresso)' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-stone)', lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CTA — Bergabung ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream-dark)' }}>
        <div className="container-site">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-8)',
            alignItems: 'center',
          }}>
            {/* Text */}
            <div>
              <span className="section-label">Bergabung Bersama Kami</span>
              <div className="divider-terracotta" />
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.125rem)', marginBottom: 'var(--space-3)' }}>
                Jadilah Bagian dari Jaringan Distribusi Kami
              </h2>
              <p style={{ color: 'var(--color-stone)', lineHeight: 1.85, marginBottom: 'var(--space-5)', fontSize: '0.9375rem' }}>
                Kami membuka peluang kemitraan untuk pemasok komoditas, distributor sub-regional, dan mitra logistik yang ingin berkembang bersama Ugi Cahaya Mentari.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <Link href="/kontak" className="btn-primary">
                  Hubungi Kami Sekarang
                </Link>
                <Link href="/layanan" className="btn-forest">
                  Lihat Komoditas
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div style={{
              borderRadius: '10px',
              overflow: 'hidden',
              height: '260px',
              backgroundImage: 'url(/about-team.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 12px 40px rgba(18,50,30,0.14)',
            }} />
          </div>
        </div>
      </section>
    </>
  );
}
