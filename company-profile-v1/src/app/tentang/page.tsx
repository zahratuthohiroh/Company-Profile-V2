import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Sejarah, visi, dan misi Ugi Cahaya Mentari sebagai distributor B2B komoditas pangan tradisional Cirebon sejak 1998.',
};


const values = [
  { image: '/illus-integritas.png', accentColor: '#2D6A4F', title: 'Integritas',      desc: 'Kami menjunjung tinggi kejujuran di setiap transaksi dan menjaga transparansi penuh di seluruh rantai distribusi kami.' },
  { image: '/illus-kualitas.png',   accentColor: '#C89A2E', title: 'Kualitas',        desc: 'Setiap komoditas yang sampai ke tangan Anda telah melewati proses seleksi yang sangat ketat sesuai standar kami.' },
  { image: '/illus-kemitraan.png',  accentColor: '#1A5C5C', title: 'Kemitraan',       desc: 'Kami tidak sekadar berbisnis, tetapi membangun hubungan jangka panjang yang saling menguntungkan dengan semua pihak.' },
  { image: '/illus-keberlanjutan.png', accentColor: '#5A7A2E', title: 'Keberlanjutan', desc: 'Kami berupaya mendukung kesejahteraan petani lokal serta mendorong praktik pertanian yang ramah lingkungan demi masa depan.' },
];

const stats = [
  { value: '1998', label: 'Tahun Berdiri' },
  { value: '200+', label: 'Mitra Bisnis Aktif' },
  { value: '12', label: 'Kab/Kota Terjangkau' },
  { value: '45', label: 'Tenaga Kerja' },
];

export default function TentangPage() {
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
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
          <Image
            src="/about-bg.png"
            alt="Tentang Ugi Cahaya Mentari"
            fill
            quality={85}
            priority
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>
        {/* Dark overlay */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(14,40,24,0.92) 0%, rgba(18,55,32,0.84) 100%)',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 70% 50%, rgba(27,107,58,0.22) 0%, transparent 60%)',
        }} />
        <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label-light animate-fade-in-up">Profil Perusahaan</span>
          <h1 className="animate-fade-in-up-delay-1" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', marginBottom: 'var(--space-3)', maxWidth: '640px' }}>
            Tentang Ugi Cahaya Mentari
          </h1>
          <p className="animate-fade-in-up-delay-2" style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.0625rem', maxWidth: '560px', lineHeight: 1.8 }}>
            Kami hadir sebagai distributor komoditas pangan tradisional yang bisa Anda percaya. Mulai dari kebutuhan industri berskala besar hingga dapur rumah tangga di seluruh Nusantara, kami siap menjadi jembatan penghubung antara hasil bumi produsen lokal dengan pasar yang lebih luas.
          </p>

          {/* Hero Stats Strip */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: 'var(--space-1)',
            marginTop: 'var(--space-10)',
            paddingTop: 'var(--space-5)',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            maxWidth: '600px',
          }}>
            {stats.map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.75rem',
                  fontWeight: 700,
                  color: 'var(--color-gold-light)',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== SEJARAH INTRO — Photo + Text ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream)', overflow: 'hidden' }}>
        <div className="container-site">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-10)',
            alignItems: 'center',
          }}>
            {/* Photo Side */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: '10px',
                overflow: 'hidden',
                height: '380px',
                boxShadow: '0 20px 60px rgba(18,50,30,0.18)',
              }}>
                <Image
                  src="/about-history.png"
                  alt="Sejarah Ugi Cahaya Mentari"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
              {/* Floating badge */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                right: '-12px',
                backgroundColor: 'var(--color-forest)',
                borderRadius: '8px',
                padding: 'var(--space-3) var(--space-4)',
                color: 'white',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-gold-light)', lineHeight: 1 }}>25+</div>
                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>Tahun Berpengalaman</div>
              </div>
            </div>

            {/* Text Side */}
            <div style={{ paddingTop: 'var(--space-4)' }}>
              <span className="section-label">Siapa Kami</span>
              <div className="divider-terracotta" />
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', marginBottom: 'var(--space-3)' }}>
                Mitra Distribusi Pangan yang Bisa Anda Andalkan
              </h2>
              <p style={{ color: 'var(--color-stone)', lineHeight: 1.85, marginBottom: 'var(--space-3)', fontSize: '0.9375rem' }}>
                Ugi Cahaya Mentari adalah perusahaan distribusi komoditas pangan tradisional yang lahir dan berkembang di jantung kota Cirebon, Jawa Barat. Spesialisasi kami berfokus pada penyediaan bahan pangan lokal pilihan, seperti petis udang, bawang merah, kacang tanah, dan ebi.
              </p>
              <p style={{ color: 'var(--color-stone)', lineHeight: 1.85, fontSize: '0.9375rem', marginBottom: 'var(--space-5)' }}>
                Berkat jalinan relasi yang erat dengan para petani dan produsen lokal, kami mampu menjamin ketersediaan komoditas dengan kualitas yang selalu terjaga serta kepastian pasokan yang aman sepanjang tahun, baik untuk industri kuliner, bisnis retail, maupun konsumsi rumah tangga harian.
              </p>
              {/* Highlights list */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  'Sudah tersertifikasi Halal MUI dan memenuhi standar kelayakan BPOM',
                  'Melayani beragam kebutuhan dari skala B2B (grosir) hingga B2C (retail)',
                  'Jangkauan distribusi luas ke seluruh wilayah Jawa Barat dan sekitarnya',
                  'Didukung armada pengiriman khusus dengan standar penanganan produk yang ketat',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--color-espresso-mid)' }}>
                    <span style={{ color: 'var(--color-forest)', fontWeight: 700, flexShrink: 0 }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ======== VISI & MISI ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-espresso)', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle pattern */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(27,107,58,0.18) 0%, transparent 60%), radial-gradient(circle at 80% 30%, rgba(200,154,46,0.08) 0%, transparent 50%)',
        }} />
        <div className="container-site" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span className="section-label-light">Arah Perusahaan</span>
            <div className="divider-gold" style={{ margin: '0 auto var(--space-3)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'white' }}>Visi & Misi Kami</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-5)' }}>
            {/* Visi */}
            <div style={{
              border: '1px solid rgba(200,154,46,0.35)',
              borderRadius: '10px',
              padding: 'var(--space-6)',
              backgroundColor: 'rgba(200,154,46,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div aria-hidden="true" style={{
                position: 'absolute', top: '-30px', right: '-30px',
                width: '100px', height: '100px',
                borderRadius: '50%',
                backgroundColor: 'rgba(200,154,46,0.07)',
              }} />
              <span style={{
                display: 'inline-block',
                fontSize: '0.7rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', fontWeight: 700,
                color: 'var(--color-gold)',
                marginBottom: 'var(--space-2)',
                backgroundColor: 'rgba(200,154,46,0.12)',
                padding: '4px 10px', borderRadius: '2px',
              }}>Visi</span>
              <div className="divider-gold" />
              <h2 style={{ fontSize: '1.1875rem', color: 'white', lineHeight: 1.65, marginBottom: 'var(--space-3)' }}>
                Kami bercita-cita menjadi distributor komoditas pangan tradisional utama yang selalu dipercaya, baik oleh mitra bisnis maupun konsumen akhir di seluruh Indonesia. Semuanya berlandaskan pada komitmen tulus kami terhadap kualitas produk dan keberlanjutan lingkungan.
              </h2>
            </div>

            {/* Misi */}
            <div style={{
              border: '1px solid rgba(45,106,79,0.35)',
              borderRadius: '10px',
              padding: 'var(--space-6)',
              backgroundColor: 'rgba(45,106,79,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div aria-hidden="true" style={{
                position: 'absolute', top: '-30px', right: '-30px',
                width: '100px', height: '100px',
                borderRadius: '50%',
                backgroundColor: 'rgba(45,106,79,0.07)',
              }} />
              <span style={{
                display: 'inline-block',
                fontSize: '0.7rem', letterSpacing: '0.15em',
                textTransform: 'uppercase', fontWeight: 700,
                color: 'var(--color-terracotta-light)',
                marginBottom: 'var(--space-2)',
                backgroundColor: 'rgba(192,98,42,0.12)',
                padding: '4px 10px', borderRadius: '2px',
              }}>Misi</span>
              <div className="divider-terracotta" />
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'Secara konsisten menghadirkan komoditas pangan dengan kualitas terbaik, baik untuk kebutuhan mitra B2B maupun para pelanggan retail kami.',
                  'Turut memberdayakan kesejahteraan para petani dan produsen lokal di Cirebon melalui jalinan kemitraan yang adil dan saling membawa berkah.',
                  'Menciptakan sebuah ekosistem distribusi pangan yang tak hanya efisien dan transparan, tetapi juga memberikan dampak positif yang nyata bagi masyarakat sekitar.',
                ].map((m, i) => (
                  <li key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <span style={{
                      color: 'white', fontWeight: 800, fontSize: '0.75rem', flexShrink: 0,
                      marginTop: '2px', backgroundColor: 'rgba(45,106,79,0.5)',
                      width: '22px', height: '22px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>0{i + 1}</span>
                    <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.7 }}>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ======== NILAI-NILAI ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream)' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <span className="section-label">Nilai Perusahaan</span>
            <div className="divider-terracotta" style={{ margin: '0 auto var(--space-3)' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}>Prinsip Kerja Kami</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-3)' }}>
            {values.map((v, i) => (
              <div key={i} className="card" style={{ padding: 0, overflow: 'hidden', textAlign: 'center' }}>
                {/* Illustration */}
                <div style={{
                  height: '150px',
                  backgroundImage: `url(${v.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, ${v.accentColor}18 100%)`,
                  }} />
                </div>
                {/* Content */}
                <div style={{ padding: 'var(--space-4)' }}>
                  <div style={{
                    width: '32px', height: '3px',
                    backgroundColor: v.accentColor,
                    borderRadius: '2px',
                    margin: '0 auto 12px',
                  }} />
                  <h3 style={{ fontSize: '1.0625rem', marginBottom: '8px', color: 'var(--color-espresso)' }}>{v.title}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-stone)', lineHeight: 1.7 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======== CTA — Bergabung ======== */}
      <section className="section-pad" style={{ backgroundColor: 'var(--color-cream-dark)' }}>
        <div className="container-site">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-8)',
            alignItems: 'center',
          }}>
            {/* Text */}
            <div>
              <span className="section-label">Bergabung Bersama Kami</span>
              <div className="divider-terracotta" />
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.125rem)', marginBottom: 'var(--space-3)' }}>
                Tertarik Menjalin Kemitraan dengan Kami?
              </h2>
              <p style={{ color: 'var(--color-stone)', lineHeight: 1.85, marginBottom: 'var(--space-5)', fontSize: '0.9375rem' }}>
                Tim kami selalu terbuka dan dengan senang hati siap berdiskusi lebih lanjut mengenai kebutuhan komoditas Anda. Kami hadir untuk mengeksplorasi berbagai skema kemitraan yang pas, serta memberikan penawaran harga grosir terbaik demi mendukung pertumbuhan bisnis Anda bersama Ugi Cahaya Mentari.
              </p>
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                <Link href="/kontak" className="btn-primary">
                  Hubungi Kami Sekarang
                </Link>
                <Link href="/layanan" className="btn-forest">
                  Lihat Komoditas
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div style={{
              position: 'relative',
              borderRadius: '10px',
              overflow: 'hidden',
              height: '260px',
              boxShadow: '0 12px 40px rgba(18,50,30,0.14)',
            }}>
              <Image
                src="/about-team.png"
                alt="Tim Ugi Cahaya Mentari"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
