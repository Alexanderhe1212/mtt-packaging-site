import type { Metadata } from 'next';
import Script from 'next/script';
import LeadQualificationChatbot from '../components/LeadQualificationChatbot';
import CookieConsent from '../components/CookieConsent';
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
  icons: { icon: [{ url: '/favicon-192.png', type: 'image/png', sizes: '192x192' }, { url: '/favicon-48.png', type: 'image/png', sizes: '48x48' }, { url: '/favicon.svg', type: 'image/svg+xml' }], shortcut: '/favicon-192.png' },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: { title: 'Custom Luxury Packaging Manufacturer | MTT Packaging', description: 'Custom rigid boxes, perfume packaging, cosmetic packaging and premium gift boxes for growing brands worldwide. MOQ from 500 pcs.', url: '/', siteName: 'MTT Packaging', type: 'website', images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'MTT Packaging custom luxury packaging manufacturer' }] },
  twitter: { card: 'summary_large_image', title: 'Custom Luxury Packaging Manufacturer | MTT Packaging', description: 'Custom rigid boxes, perfume packaging, cosmetic packaging and premium gift boxes for growing brands.', images: ['/og.jpg'] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied'});window.mttGrantAnalytics=function(){gtag('consent','update',{analytics_storage:'granted'});};` }} />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <LeadQualificationChatbot />
        <CookieConsent />
      </body>
    </html>
  );
}
