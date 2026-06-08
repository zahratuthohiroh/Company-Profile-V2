import type { Metadata } from 'next';
import Link from 'next/link';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Beranda',
  description: 'Ugi Cahaya Mentari — Distributor B2B komoditas pangan tradisional Cirebon terpercaya sejak 1998.',
};

const stats = [
  { value: '25+', label: 'Tahun Berpengalaman' },
  { value: '200+', label: 'Mitra Bisnis Aktif' },
  { value: '4', label: 'Komoditas Unggulan' },
  { value: '5 Ton+', label: 'Distribusi Per Bulan' },
];

const highlights = [
  {
    image: '/illus-kualitas.png',
    accentColor: '#2D6A4F',
    title: 'Kualitas Terjamin',
    desc: 'Kami menyortir setiap komoditas secara langsung untuk memastikan standar mutu yang konsisten sebelum pengiriman.',
  },
  {
    image: '/illus-pengiriman.png',
    accentColor: '#1A5C5C',
    title: 'Distribusi Tepat Waktu',
    desc: 'Kami menjamin jadwal pengiriman yang rutin dan aman untuk menjaga kelancaran produksi bisnis Anda.',
  },
  {
    image: '/illus-kemitraan.png',
    accentColor: '#5A7A2E',
    title: 'Kemitraan Jangka Panjang',
    desc: 'Kami berfokus pada kolaborasi jangka panjang, baik dengan petani lokal maupun pelanggan industri kami.',
  },
];

export default function BerandaPage() {
  return (
    <>
      <AnalyticsTracker type="website_visit" />
      {/* ======== HERO SECTION ======== */}
      <section
        style={{
          minHeight: '100vh',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          backgroundColor: 'var(--color-espresso)',
        }}
      >
        {/* Background Photo */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <Image
            src="/hero-bg.png"
            alt="Hero Background"
            fill
            quality={85}
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        {/* Dark overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(18,50,30,0.88) 0%, rgba(14,40,24,0.82) 50%, rgba(10,30,18,0.75) 100%)',
          }}
        />
        {/* Radial highlights */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              radial-gradient(circle at 21% 50%, rgba(27, 107, 58, 0.28) 0%, transparent 55%),
              radial-gradient(circle at 80% 20%, rgba(18, 77, 42, 0.25) 0%, transparent 50%)
            `,
          }}
        />

        <div className="container-site" style={{ position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: 'var(--space-12)' }}>
          <div style={{ maxWidth: '720px' }}>
            <span className="section-label-light animate-fade-in-up">
              Distributor B2B Komoditas Pangan — Cirebon, Jawa Barat
            </span>

            <h1
              className="animate-fade-in-up-delay-1"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
                color: 'white',
                marginBottom: 'var(--space-3)',
                lineHeight: 1.1,
              }}
            >
              Menyalurkan{' '}
              <span style={{ color: 'var(--color-terracotta-light)' }}>Cita Rasa Nusantara</span>
              {' '}ke Industri Anda
            </h1>

            <p
              className="animate-fade-in-up-delay-2"
              style={{
                fontSize: '1.125rem',
                color: 'rgba(255,255,255,0.72)',
                marginBottom: 'var(--space-5)',
                lineHeight: 1.75,
                maxWidth: '580px',
              }}
            >
              Ugi Cahaya Mentari adalah mitra distribusi B2B terpercaya untuk komoditas pangan tradisional pilihan — petis udang, bawang merah, kacang tanah, dan ebi — langsung dari sumber terbaik Cirebon.
            </p>

            <div
              className="animate-fade-in-up-delay-3"
              style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}
            >
              <Link href="/layanan" className="btn-primary">
                Lihat Komoditas Kami
              </Link>
              <Link href="/kontak" className="btn-outline">
                Ajukan Kemitraan
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: 'var(--space-1)',
              marginTop: 'var(--space-8)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid rgba(255,255,255,0.12)',
            }}
          >
            {stats.map(stat => (
              <div key={stat.label} style={{ paddingRight: 'var(--space-4)' }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: 'var(--color-gold-light)',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== HIGHLIGHT / INTRO SECTION ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-site">
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span className="section-label">Mengapa Ugi Cahaya Mentari?</span>
            <div className="divider-terracotta" style={{ margin: '0 auto var(--space-3)' }} />
            <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: 'var(--space-2)' }}>
              Komitmen Kami untuk Kualitas & Kepercayaan
            </h2>
            <p style={{ color: 'var(--color-stone)', fontSize: '1rem', maxWidth: '520px', margin: '0 auto' }}>
              Selama lebih dari 20 tahun, kami dipercaya sebagai pemasok utama komoditas pangan untuk ratusan mitra industri di seluruh Jawa Barat.
            </p>
          </div>

          {/* Highlight Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
            {highlights.map((item, i) => (
              <div
                key={i}
                className="card"
                style={{ padding: 0, overflow: 'hidden' }}
              >
                {/* Illustration Banner */}
                <div style={{
                  height: '170px',
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to bottom, rgba(0,0,0,0.04) 0%, ${item.accentColor}20 100%)`,
                  }} />
                </div>
                {/* Content */}
                <div style={{ padding: 'var(--space-5)' }}>
                  <div style={{
                    width: '36px', height: '3px',
                    backgroundColor: item.accentColor,
                    borderRadius: '2px',
                    marginBottom: '12px',
                  }} />
                  <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-1)', color: 'var(--color-espresso)' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-stone)', lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div
            style={{
              marginTop: 'var(--space-8)',
              borderRadius: '8px',
              backgroundColor: 'var(--color-forest)',
              padding: 'var(--space-6) var(--space-8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
            }}
          >
            <div>
              <h3 style={{ color: 'white', fontSize: '1.375rem', marginBottom: '6px' }}>
                Siap Bermitra dengan Kami?
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9375rem' }}>
                Hubungi tim kami untuk mendapatkan penawaran harga grosir dan informasi ketersediaan stok.
              </p>
            </div>
            <Link href="/kontak" className="btn-primary">
              Mulai Diskusi
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
