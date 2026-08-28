import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mttpackaging.com'),
  title: 'MTT Packaging | High-End Custom Packaging by Hugo He',
  description: 'Work directly with Hugo He at MTT Packaging for high-end custom rigid boxes, gift packaging, folding cartons, paper bags and precision inserts.',
  authors: [{ name: 'Hugo He', url: 'mailto:alexanderhe1212@gmail.com' }],
  creator: 'MTT Packaging',
  publisher: 'MTT Packaging',
  category: 'Custom Packaging',
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }], shortcut: '/favicon.svg' },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: { title: 'MTT Packaging | High-End Custom Packaging', description: 'Premium custom packaging for serious business, personally handled by Hugo He.', url: '/', siteName: 'MTT Packaging', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'MTT Packaging high-end custom packaging' }] },
  twitter: { card: 'summary_large_image', title: 'MTT Packaging | High-End Custom Packaging', description: 'Premium custom packaging for serious business, personally handled by Hugo He.', images: ['/og.png'] },
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
