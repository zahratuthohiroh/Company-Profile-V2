import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap',
  variable: '--font-inter',
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Memaksa seluruh area admin menggunakan font Inter yang lebih tegas
  return (
    <div className={`${inter.className} bg-slate-50 min-h-screen text-slate-900`}>
      {children}
    </div>
  );
}
