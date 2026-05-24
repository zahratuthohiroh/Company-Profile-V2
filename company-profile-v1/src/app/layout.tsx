import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Lora } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'CV Cahaya Nusantara — Distributor Pangan B2B Cirebon',
    template: '%s | CV Cahaya Nusantara',
  },
  description:
    'CV Cahaya Nusantara adalah distributor B2B komoditas pangan tradisional terpercaya asal Cirebon. Menyediakan petis, bawang merah, kacang tanah, dan ebi berkualitas untuk industri kuliner dan retail.',
  keywords: ['distributor pangan', 'cirebon', 'petis', 'bawang merah', 'kacang tanah', 'ebi', 'B2B', 'komoditas'],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: 'CV Cahaya Nusantara',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${lora.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
