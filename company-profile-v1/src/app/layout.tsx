import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import './globals.css';

const outfitFont = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const playfairFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Ugi Cahaya Mentari — Distributor Pangan B2B Cirebon',
    template: '%s | Ugi Cahaya Mentari',
  },
  description:
    'Ugi Cahaya Mentari adalah distributor B2B komoditas pangan tradisional terpercaya asal Cirebon. Menyediakan petis, bawang merah, kacang tanah, dan ebi berkualitas untuk industri kuliner dan retail.',
  keywords: ['distributor pangan', 'cirebon', 'petis', 'bawang merah', 'kacang tanah', 'ebi', 'B2B', 'komoditas'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'Ugi Cahaya Mentari',
    images: [
      {
        url: '/hero-bg.png',
        width: 1200,
        height: 630,
        alt: 'Ugi Cahaya Mentari',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ugi Cahaya Mentari',
    image: '/hero-bg.png',
    description: 'Distributor B2B komoditas pangan tradisional terpercaya asal Cirebon.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Bojong Kaler No. 51',
      addressLocality: 'Cigadung, Cibeunying Kaler',
      addressRegion: 'Jawa Barat',
      addressCountry: 'ID'
    },
    telephone: '+6281320516633',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '13:00'
      }
    ]
  };

  return (
    <html lang="id" className={`${outfitFont.variable} ${playfairFont.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
