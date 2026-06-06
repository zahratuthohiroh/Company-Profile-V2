'use client';

type ShopeeButtonProps = {
  href?: string;
  hasShopeeLink: boolean;
  layananId: number;
};

export default function ShopeeButton({ href, hasShopeeLink, layananId }: ShopeeButtonProps) {
  const handleClick = () => {
    if (hasShopeeLink) {
      // Rekam event shopee_click
      fetch('http://127.0.0.1:8000/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'shopee_click', layanan_id: layananId })
      }).catch(e => console.error('Tracking failed', e));
    }
  };

  return (
    <a
      onClick={handleClick}
      href={hasShopeeLink ? href : undefined}
      target={hasShopeeLink ? '_blank' : undefined}
      rel={hasShopeeLink ? 'noopener noreferrer' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        width: '100%',
        padding: '14px 20px',
        borderRadius: '10px',
        fontWeight: 700,
        fontSize: '1rem',
        textDecoration: 'none',
        cursor: hasShopeeLink ? 'pointer' : 'not-allowed',
        backgroundColor: hasShopeeLink ? '#ee4d2d' : '#e5e7eb',
        color: hasShopeeLink ? 'white' : '#9ca3af',
        transition: 'opacity 0.2s',
        marginBottom: 'var(--space-3)',
      }}
    >
      <img src="/shopee-logo.svg" alt="Shopee" style={{ width: '20px', height: '20px', filter: hasShopeeLink ? 'brightness(0) invert(1)' : 'grayscale(100%) opacity(50%)' }} />
      {hasShopeeLink ? 'Beli di Shopee' : 'Belum Tersedia'}
    </a>
  );
}
