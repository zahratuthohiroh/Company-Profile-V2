import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import ShopeeButton from '@/components/ShopeeButton';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

type SalesHistory = { year: number; volume_sold: number };
type Layanan = {
  id: number;
  nama_layanan: string;
  deskripsi: string;
  gambar: string | null;
  shopee_link: string | null;
  histories: SalesHistory[];
};

async function getLayananById(id: string): Promise<Layanan | null> {
  try {
    const res = await fetch(`${API_BASE}/api/layanan/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const layanan = await getLayananById(id);
  if (!layanan) return { title: 'Produk tidak ditemukan' };
  return {
    title: layanan.nama_layanan,
    description: layanan.deskripsi,
  };
}

export default async function DetailLayananPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const layanan = await getLayananById(id);
  if (!layanan) notFound();

  const imageUrl = layanan.gambar
    ? layanan.gambar.startsWith('http')
      ? layanan.gambar
      : `${API_BASE}/storage/${layanan.gambar}`
    : '/hero-bg.png';

  const hasShopeeLink = !!layanan.shopee_link;

  return (
    <>
      <AnalyticsTracker type="product_view" layanan_id={layanan.id} />
      {/* Hero Banner */}
      <section
        style={{
          minHeight: '420px',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(14,40,24,0.95) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)',
          }}
        />
        <div className="container-site" style={{ position: 'relative', zIndex: 1, paddingBottom: 'var(--space-10)', paddingTop: '120px' }}>
          <Link href="/layanan" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            ← Kembali ke Katalog
          </Link>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.25rem)',
              color: 'white',
              marginBottom: '12px',
              fontFamily: 'var(--font-serif)',
              lineHeight: 1.15,
            }}
          >
            {layanan.nama_layanan}
          </h1>
        </div>
      </section>

      {/* Konten Utama */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-site">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: 'var(--space-8)',
              alignItems: 'start',
            }}
          >
            {/* Kiri: Deskripsi */}
            <div>
              <span className="section-label" style={{ marginBottom: 'var(--space-3)', display: 'block' }}>
                Deskripsi Komoditas
              </span>
              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--color-stone)',
                  lineHeight: 1.85,
                  whiteSpace: 'pre-line',
                }}
              >
                {layanan.deskripsi}
              </p>
            </div>

            {/* Kanan: Kartu CTA */}
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: 'var(--space-6)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
                border: '1px solid rgba(45,106,79,0.1)',
                position: 'sticky',
                top: '100px',
              }}
            >
              <p
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--color-forest)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '8px',
                }}
              >
                Tersedia di Shopee
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-stone)', lineHeight: 1.65, marginBottom: 'var(--space-4)' }}>
                {hasShopeeLink
                  ? 'Klik tombol di bawah untuk langsung menuju halaman resmi produk kami di Shopee.'
                  : 'Produk ini belum tersedia di Shopee. Hubungi kami secara langsung untuk pemesanan B2B.'}
              </p>

              {/* Tombol Shopee — Dinamis */}
              <ShopeeButton 
                href={layanan.shopee_link!} 
                hasShopeeLink={hasShopeeLink} 
                layananId={layanan.id} 
              />

              <Link
                href="/kontak"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  border: '1px solid var(--color-forest)',
                  color: 'var(--color-forest)',
                  backgroundColor: 'transparent',
                  transition: 'background-color 0.2s',
                }}
              >
                Minta Penawaran B2B
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
