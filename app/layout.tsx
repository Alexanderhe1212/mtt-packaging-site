import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mttpackaging.com'),
  title: 'MTT Packaging | High-End Custom Packaging by Hugo He',
  description: 'Work directly with Hugo He at MTT Packaging for high-end custom rigid boxes, gift packaging, folding cartons, paper bags and precision inserts.',
  authors: [{ name: 'Hugo He', url: 'mailto:alexanderhe1212@gmail.com' }],
  keywords: ['high-end custom packaging', 'luxury rigid boxes', 'custom gift boxes', 'premium packaging supplier', 'MTT Packaging'],
  alternates: { canonical: '/' },
  openGraph: { title: 'MTT Packaging | High-End Custom Packaging', description: 'Premium custom packaging for serious business, personally handled by Hugo He.', url: '/', siteName: 'MTT Packaging', type: 'website' },
  twitter: { card: 'summary', title: 'MTT Packaging | High-End Custom Packaging', description: 'Premium custom packaging for serious business, personally handled by Hugo He.' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
