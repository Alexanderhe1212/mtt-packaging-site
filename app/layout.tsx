import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

const GA_MEASUREMENT_ID = 'G-Z132GJZZ57';

export const metadata: Metadata = {
  metadataBase: new URL('https://mttpackaging.com'),
  title: 'Custom Luxury Packaging Manufacturer | MTT Packaging',
  description: 'MTT Packaging is a custom luxury packaging manufacturer in China. We make custom rigid boxes, perfume packaging, cosmetic packaging, jewelry boxes and premium gift boxes. MOQ from 500 pcs.',
  authors: [{ name: 'Hugo He', url: 'mailto:info@mttpackaging.com' }],
  creator: 'MTT Packaging',
  publisher: 'MTT Packaging',
  category: 'Custom Packaging',
  icons: { icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }], shortcut: '/favicon.svg' },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: { title: 'Custom Luxury Packaging Manufacturer | MTT Packaging', description: 'Custom rigid boxes, perfume packaging, cosmetic packaging and premium gift boxes for growing brands worldwide. MOQ from 500 pcs.', url: '/', siteName: 'MTT Packaging', type: 'website', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'MTT Packaging custom luxury packaging manufacturer' }] },
  twitter: { card: 'summary_large_image', title: 'Custom Luxury Packaging Manufacturer | MTT Packaging', description: 'Custom rigid boxes, perfume packaging, cosmetic packaging and premium gift boxes for growing brands.', images: ['/og.png'] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
