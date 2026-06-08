import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Kontak',
  description: 'Hubungi Ugi Cahaya Mentari untuk informasi harga, ketersediaan stok komoditas pangan, dan kemitraan B2B di Cirebon.',
};

const contactCards = [
  {
    label: 'Alamat Kantor',
    lines: ['Jl. Bojong Kaler No. 51 RT 03 RW 12,', 'Cigadung, Cibeunying Kaler'],
    cta: { label: 'Lihat di Google Maps', href: 'https://maps.google.com/?q=Jl+Bojong+Kaler+No+51+Cigadung+Cibeunying+Kaler', external: true },
  },
  {
    label: 'Telepon',
    lines: ['+62 813-2051-6633'],
    cta: { label: 'Hubungi Sekarang', href: 'tel:+6281320516633', external: false },
  },
  {
    label: 'WhatsApp',
    lines: ['+62 813-2051-6633'],
    cta: { label: 'Chat WhatsApp', href: 'https://wa.me/6281320516633?text=Halo%2C%20saya%20tertarik%20untuk%20mengetahui%20lebih%20lanjut%20mengenai%20produk%20anda.', external: true },
  },
  {
    label: 'Jam Operasional',
    lines: ['Senin – Jumat: 08.00 – 17.00 WIB', 'Sabtu: 08.00 – 13.00 WIB'],
    cta: null,
  },
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
                {/* Label */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
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
                    {card.cta.label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  );
}
