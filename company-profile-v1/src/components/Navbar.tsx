'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const navLinks = [
  { href: '/',         label: 'Beranda' },
  { href: '/tentang',  label: 'Tentang Kami' },
  { href: '/layanan',  label: 'Layanan' },
  { href: '/kontak',   label: 'Kontak' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        backgroundColor: scrolled
          ? 'rgba(44, 26, 14, 0.97)'
          : 'transparent',
        boxShadow: scrolled
          ? '0 2px 20px rgba(0,0,0,0.25)'
          : 'none',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
      }}
    >
      <div className="container-site" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'white',
            lineHeight: 1,
          }}>
            Ugi Cahaya Perkasa
          </span>
          <span style={{
            fontSize: '0.65rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-light)',
            fontWeight: 600,
          }}>
            Distributor Pangan Cirebon
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }} className="desktop-nav">
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--color-gold-light)' : 'rgba(255,255,255,0.85)',
                  position: 'relative',
                  paddingBottom: '4px',
                  transition: 'color 0.2s ease',
                }}
                className="nav-link"
              >
                {link.label}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    backgroundColor: 'var(--color-gold-light)',
                    borderRadius: '1px',
                  }} />
                )}
              </Link>
            );
          })}

          <Link href="/kontak" className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.875rem' }}>
            Hubungi Kami
          </Link>
        </nav>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          className="hamburger-btn"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          <span style={{ display: 'block', width: '24px', height: '2px', background: 'white', borderRadius: '1px', transition: 'transform 0.25s ease', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: 'white', borderRadius: '1px', transition: 'opacity 0.25s ease', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '24px', height: '2px', background: 'white', borderRadius: '1px', transition: 'transform 0.25s ease', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        style={{
          backgroundColor: 'var(--color-espresso)',
          overflow: 'hidden',
          maxHeight: menuOpen ? '320px' : '0',
          transition: 'max-height 0.35s ease',
        }}
        className="mobile-menu"
      >
        <nav style={{ display: 'flex', flexDirection: 'column', padding: 'var(--space-3) var(--space-3) var(--space-4)' }}>
          {navLinks.map(link => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: 'none',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--color-gold-light)' : 'rgba(255,255,255,0.85)',
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/kontak" className="btn-primary" style={{ marginTop: 'var(--space-3)', textAlign: 'center', justifyContent: 'center' }}>
            Hubungi Kami
          </Link>
        </nav>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        .nav-link:hover { color: white !important; }
      `}</style>
    </header>
  );
}
