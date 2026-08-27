import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: 'Leo He | Premium Business Packaging Consultant',
  description: 'Work directly with Leo He at atelier Packaging for premium business packaging, corporate gift boxes, rigid boxes, paper bags and custom inserts.',
  authors: [{ name: 'Leo He', url: 'mailto:alexanderhe1212@gmail.com' }],
  keywords: ['high-end custom packaging', 'luxury rigid boxes', 'custom gift boxes', 'premium packaging manufacturer'],
  openGraph: { title: 'Leo He | Premium Packaging Built for Serious Business', description: 'Direct, one-to-one packaging support for brands and corporate projects.', images: ['/og.png'], type: 'website' },
  twitter: { card: 'summary_large_image', title: 'Leo He | Premium Packaging Built for Serious Business', description: 'Direct, one-to-one packaging support for brands and corporate projects.', images: ['/og.png'] },
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
