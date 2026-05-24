import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi CV Cahaya Nusantara untuk informasi harga, ketersediaan stok komoditas pangan, dan kemitraan B2B di Cirebon.',
};

const contactCards = [
  {
    icon: '📍',
    label: 'Alamat Kantor',
    lines: ['Jl. Bojong Kaler No. 51 RT 03 RW 12,', 'Cigadung, Cibeunying Kaler'],
    cta: { label: 'Lihat di Google Maps', href: 'https://maps.google.com/?q=Jl+Bojong+Kaler+No+51+Cigadung+Cibeunying+Kaler', external: true },
  },
  {
    icon: '📞',
    label: 'Telepon',
    lines: ['+62 813-2051-6633'],
    cta: { label: 'Hubungi Sekarang', href: 'tel:+6281320516633', external: false },
  },
  {
    icon: '💬',
    label: 'WhatsApp',
    lines: ['+62 813-2051-6633'],
    cta: { label: 'Chat WhatsApp', href: 'https://wa.me/6281320516633', external: true },
  },
  {
    icon: '🕐',
    label: 'Jam Operasional',
    lines: ['Senin – Jumat: 08.00 – 17.00 WIB', 'Sabtu: 08.00 – 13.00 WIB'],
    cta: null,
  },
];

const commoditiesCta = [
  { emoji: '🦐', name: 'Petis Udang' },
  { emoji: '🧅', name: 'Bawang Merah' },
  { emoji: '🥜', name: 'Kacang Tanah' },
  { emoji: '🌊', name: 'Ebi (Udang Kering)' },
];

export default function KontakPage() {
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
          backgroundImage: 'url(/contact-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />
        {/* Dark overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(10,35,22,0.90) 0%, rgba(18,60,35,0.82) 100%)',
        }} />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 75% 35%, rgba(27,107,58,0.18) 0%, transparent 55%), radial-gradient(circle at 20% 70%, rgba(18,77,42,0.14) 0%, transparent 50%)',
          }}
        />
        <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label-light">Hubungi Kami</span>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: 'white',
              marginBottom: 'var(--space-3)',
              maxWidth: '560px',
            }}
          >
            Mari Mulai Kerjasama Bisnis Anda
          </h1>
          <p
            style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: '1.0625rem',
              maxWidth: '520px',
              lineHeight: 1.75,
            }}
          >
            Tim sales kami siap membantu mendapatkan informasi harga, ketersediaan stok, dan skema kemitraan yang sesuai dengan kebutuhan bisnis Anda.
          </p>
        </div>
      </section>

      {/* ======== CONTACT INFO GRID ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span className="section-label">Informasi Kontak</span>
            <div className="divider-terracotta" style={{ margin: '0 auto var(--space-3)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginBottom: 'var(--space-2)' }}>
              Semua Cara untuk Menghubungi Kami
            </h2>
            <p style={{ color: 'var(--color-stone)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
              Pilih metode komunikasi yang paling nyaman bagi Anda. Kami siap merespons dalam 1×24 jam pada hari kerja.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-3)',
            }}
          >
            {contactCards.map((card, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: 'var(--space-5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                }}
              >
                {/* Icon + Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#EEF7F2',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.375rem',
                      flexShrink: 0,
                    }}
                  >
                    {card.icon}
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: 'var(--color-terracotta)',
                    }}
                  >
                    {card.label}
                  </span>
                </div>

                {/* Lines */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {card.lines.map((line, j) => (
                    <p key={j} style={{ fontSize: '0.9375rem', color: 'var(--color-espresso-mid)', lineHeight: 1.6 }}>
                      {line}
                    </p>
                  ))}
                </div>

                {/* CTA Link */}
                {card.cta && (
                  <a
                    href={card.cta.href}
                    target={card.cta.external ? '_blank' : undefined}
                    rel={card.cta.external ? 'noopener noreferrer' : undefined}
                    style={{
                      marginTop: 'auto',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--color-terracotta)',
                      textDecoration: 'none',
                      borderBottom: '1.5px solid rgba(27,107,58,0.25)',
                      paddingBottom: '2px',
                      width: 'fit-content',
                      transition: 'color 0.2s, border-color 0.2s',
                    }}
                  >
                    {card.cta.label} →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== KOMODITAS CTA STRIP ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream-dark)' }}>
        <div className="container-site">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--space-8)',
              alignItems: 'center',
            }}
          >
            {/* Text */}
            <div>
              <span className="section-label">Mulai Sekarang</span>
              <div className="divider-terracotta" />
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.125rem)', marginBottom: 'var(--space-3)' }}>
                Butuh Komoditas dalam Jumlah Besar?
              </h2>
              <p style={{ color: 'var(--color-stone)', lineHeight: 1.8, marginBottom: 'var(--space-5)', fontSize: '0.9375rem' }}>
                Kami menyediakan empat komoditas unggulan untuk kebutuhan industri B2B Anda. Hubungi tim sales kami via WhatsApp untuk mendapatkan penawaran harga grosir terbaik.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <a href="https://wa.me/6281320516633" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  Chat WhatsApp →
                </a>
              </div>
            </div>

            {/* Commodity Tags */}
            <div
              style={{
                backgroundColor: 'var(--color-espresso)',
                borderRadius: '8px',
                padding: 'var(--space-6)',
              }}
            >
              <p
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gold-light)',
                  marginBottom: 'var(--space-4)',
                }}
              >
                Komoditas Tersedia
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {commoditiesCta.map((c) => (
                  <div
                    key={c.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      padding: 'var(--space-2) var(--space-3)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <span style={{ fontSize: '1.375rem' }}>{c.emoji}</span>
                    <span style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>
                      {c.name}
                    </span>
                    <Link
                      href="/layanan"
                      style={{
                        marginLeft: 'auto',
                        fontSize: '0.75rem',
                        color: 'var(--color-gold-light)',
                        textDecoration: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Detail →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
