'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const footerLinks = [
  { href: '/',        label: 'Beranda' },
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/kontak',  label: 'Kontak' },
];


export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname.startsWith('/admin') || pathname === '/login') return null;

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
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <Image 
                src="/logo.png" 
                alt="Ugi Cahaya Mentari" 
                width={200}
                height={60}
                style={{ height: '56px', width: 'auto', objectFit: 'contain' }} 
              />
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.75, maxWidth: '260px' }}>
              Menjembatani tradisi kuliner Nusantara dengan kebutuhan industri B2B secara profesional dan terpercaya sejak 1998.
            </p>
            {/* Social Links */}
            <div style={{ marginTop: 'var(--space-3)', display: 'flex', gap: '10px' }}>
              <a
                href="https://wa.me/6281320516633?text=Halo%2C%20saya%20tertarik%20untuk%20mengetahui%20lebih%20lanjut%20mengenai%20produk%20anda."
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                title="WhatsApp"
              >
                <Image src="/whatsapp-3.svg" alt="WhatsApp" width={28} height={28} style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} />
              </a>
              <a
                href="https://shopee.co.id/myanryan._"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link shopee-link"
                title="Shopee"
              >
                <Image src="/shopee-logo.svg" alt="Shopee" width={28} height={28} style={{ opacity: 0.7, transition: 'opacity 0.2s ease' }} />
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
                    {link.label}
                  </Link>
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
                <a href="https://wa.me/6281320516633?text=Halo%2C%20saya%20tertarik%20untuk%20mengetahui%20lebih%20lanjut%20mengenai%20produk%20anda." target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>+62 813-2051-6633</a>
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
            © {year} Ugi Cahaya Mentari. Hak cipta dilindungi undang-undang.
          </p>
          <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)' }}>
            Distributor B2B Pangan Tradisional Cirebon
          </p>
        </div>
      </div>
      <style>{`
        .footer-social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .footer-social-link:hover {
          transform: translateY(-3px);
          opacity: 1 !important;
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
