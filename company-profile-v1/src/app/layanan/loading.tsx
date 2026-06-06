export default function Loading() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-cream)' }}>
      <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid var(--color-stone-light)', borderTop: '4px solid var(--color-espresso)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      <p style={{ marginTop: '1rem', color: 'var(--color-stone)' }}>Memuat katalog komoditas...</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
