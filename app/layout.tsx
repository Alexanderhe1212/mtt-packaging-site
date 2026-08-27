import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: 'Box by Hugo | GUKA Packaging',
  description: 'Work directly with Hugo He at GUKA Packaging for premium business packaging, corporate gift boxes, rigid boxes, paper bags and custom inserts.',
  authors: [{ name: 'Hugo He', url: 'mailto:alexanderhe1212@gmail.com' }],
  keywords: ['high-end custom packaging', 'luxury rigid boxes', 'custom gift boxes', 'premium packaging manufacturer'],
  openGraph: { title: 'Box by Hugo | GUKA Packaging', description: 'Premium packaging built for serious business, personally handled by Hugo He.', images: ['/og.png'], type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Box by Hugo | GUKA Packaging', description: 'Premium packaging built for serious business, personally handled by Hugo He.', images: ['/og.png'] },
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
