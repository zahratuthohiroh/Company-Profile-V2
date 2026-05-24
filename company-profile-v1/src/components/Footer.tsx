import Link from 'next/link';

const footerLinks = [
  { href: '/',        label: 'Beranda' },
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/kontak',  label: 'Kontak' },
];

const commodities = ['Petis Udang', 'Bawang Merah', 'Kacang Tanah', 'Ebi (Udang Kering)'];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: 'var(--color-espresso)',
        color: 'rgba(255,255,255,0.7)',
        paddingTop: 'var(--space-10)',
        paddingBottom: 'var(--space-5)',
      }}
    >
      <div className="container-site">
        {/* Top Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'var(--space-8)',
            paddingBottom: 'var(--space-8)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <span style={{
                display: 'block',
                fontFamily: 'var(--font-serif)',
                fontSize: '1.375rem',
                fontWeight: 700,
                color: 'white',
                marginBottom: '4px',
              }}>
                Ugi Cahaya Perkasa
              </span>
              <span style={{
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-gold)',
                fontWeight: 600,
              }}>
                Distributor Pangan Cirebon
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.75, maxWidth: '260px' }}>
              Menjembatani tradisi kuliner Nusantara dengan kebutuhan industri B2B secara profesional dan terpercaya sejak 1998.
            </p>
            {/* WhatsApp Link */}
            <div style={{ marginTop: 'var(--space-3)' }}>
              <a
                href="https://wa.me/6281320516633"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
              >
                WA
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 'var(--space-3)' }}>
              Navigasi
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="footer-nav-link"
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Commodities Column */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 'var(--space-3)' }}>
              Komoditas Kami
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {commodities.map(c => (
                <li key={c} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)' }}>
                  • {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 style={{ color: 'white', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 'var(--space-3)' }}>
              Kontak
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
              <div>
                <span style={{ color: 'var(--color-gold)', fontWeight: 600, display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Alamat</span>
                <span>Jl. Bojong Kaler No. 51 RT 03 RW 12,<br />Cigadung, Cibeunying Kaler</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-gold)', fontWeight: 600, display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>Telepon</span>
                <a href="tel:+6281320516633" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>+62 813-2051-6633</a>
              </div>
              <div>
                <span style={{ color: 'var(--color-gold)', fontWeight: 600, display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>WhatsApp</span>
                <a href="https://wa.me/6281320516633" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>+62 813-2051-6633</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 'var(--space-4)',
          flexWrap: 'wrap',
          gap: 'var(--space-2)',
        }}>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
            © {year} Ugi Cahaya Perkasa. Hak cipta dilindungi undang-undang.
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
            Distributor B2B Pangan Tradisional Cirebon
          </p>
        </div>
      </div>
      <style>{`
        .footer-social-link {
          width: 36px;
          height: 36px;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .footer-social-link:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
        }
        .footer-nav-link {
          text-decoration: none;
          font-size: 0.9rem;
          color: rgba(255,255,255,0.65);
          transition: color 0.2s ease;
        }
        .footer-nav-link:hover {
          color: var(--color-gold-light);
        }
      `}</style>
    </footer>
  );
}
