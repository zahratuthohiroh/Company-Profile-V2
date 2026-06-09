import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import Image from 'next/image';
import ShopeeButton from '@/components/ShopeeButton';
import ProductSalesChart from '@/components/ProductSalesChart';

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
      <section style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', paddingTop: '120px', paddingBottom: 'var(--space-12)' }}>
        <div className="container-site">
          <Link href="/layanan" style={{ color: 'var(--color-forest)', fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '24px' }}>
            ← Kembali ke Katalog
          </Link>

          <div
            className="detail-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr',
              gap: 'var(--space-8)',
              alignItems: 'start',
              marginBottom: 'var(--space-10)',
            }}
          >
            {/* Kiri: Gambar Produk */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <Image
                src={imageUrl}
                alt={layanan.nama_layanan}
                fill
                quality={90}
                priority
                unoptimized={true}
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>

            {/* Kanan: Deskripsi & CTA */}
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h1
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: 'var(--color-espresso)',
                  marginBottom: '16px',
                  fontFamily: 'var(--font-serif)',
                  lineHeight: 1.15,
                }}
              >
                {layanan.nama_layanan}
              </h1>

              <span className="section-label" style={{ marginBottom: 'var(--space-3)', display: 'block' }}>
                Deskripsi Komoditas
              </span>
              
              <p
                style={{
                  fontSize: '1.05rem',
                  color: 'var(--color-stone)',
                  lineHeight: 1.85,
                  whiteSpace: 'pre-line',
                  marginBottom: 'var(--space-6)',
                  flex: 1,
                }}
              >
                {layanan.deskripsi}
              </p>

              {/* Box CTA */}
              <div
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: 'var(--space-6)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(45,106,79,0.1)',
                }}
              >
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
                  Ketersediaan Pasar
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-stone)', lineHeight: 1.65, marginBottom: 'var(--space-4)' }}>
                  {hasShopeeLink
                    ? 'Anda dapat membeli produk eceran/sample via Shopee, atau hubungi kami untuk kerja sama pasokan skala B2B (Tonase).'
                    : 'Produk komoditas skala besar ini tidak tersedia di e-commerce. Silakan hubungi kami untuk negosiasi kuota dan pengiriman B2B.'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
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
                      width: '100%',
                      padding: '14px 20px',
                      borderRadius: '10px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                      border: '2px solid var(--color-forest)',
                      color: 'var(--color-forest)',
                      backgroundColor: 'transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    Kontak Kami Untuk Penawaran Harga
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bawah: Grafik Penjualan */}
          {layanan.histories && layanan.histories.length > 0 && (
            <div style={{ marginTop: 'var(--space-8)', paddingTop: 'var(--space-8)', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
              <ProductSalesChart histories={layanan.histories} />
            </div>
          )}
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
