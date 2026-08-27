import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: 'Leo He | High-end Custom Packaging Consultant',
  description: 'Work directly with Leo He at atelier Packaging for luxury rigid boxes, premium folding cartons, bespoke paper bags and custom inserts.',
  authors: [{ name: 'Leo He', url: 'mailto:alexanderhe1212@gmail.com' }],
  keywords: ['high-end custom packaging', 'luxury rigid boxes', 'custom gift boxes', 'premium packaging manufacturer'],
  openGraph: { title: 'Leo He | Your High-end Custom Packaging Partner', description: 'Direct, one-to-one packaging support for premium brands.', images: ['/og.png'], type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Leo He | Your High-end Custom Packaging Partner', description: 'Direct, one-to-one packaging support for premium brands.', images: ['/og.png'] },
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
