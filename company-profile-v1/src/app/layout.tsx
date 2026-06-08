import type { Metadata } from 'next';
import { Outfit, Playfair_Display } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
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
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${outfitFont.variable} ${playfairFont.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
