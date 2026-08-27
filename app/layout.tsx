import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: 'Atelier Packaging | High-end Custom Packaging',
  description: 'High-end custom rigid boxes, premium folding cartons, bespoke paper bags and inserts for luxury brands.',
  keywords: ['high-end custom packaging', 'luxury rigid boxes', 'custom gift boxes', 'premium packaging manufacturer'],
  openGraph: { title: 'Packaging that makes the product feel worth more.', description: 'High-end custom packaging for premium brands.', images: ['/og.png'], type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Packaging that makes the product feel worth more.', description: 'High-end custom packaging for premium brands.', images: ['/og.png'] },
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
