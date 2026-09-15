import {businessSummary} from '../lib/seo';
import type { Metadata } from 'next';
import {analyticsBootstrap} from '../lib/analytics-bootstrap.mjs';
import ContactAnalytics from '../components/ContactAnalytics';
import CookieConsent from '../components/CookieConsent';
import './globals.css';
import './editorial.css';
import LeadQualificationChatbot from '../components/LeadQualificationChatbot';


export const metadata: Metadata = {
  metadataBase: new URL('https://mttpackaging.com'),
  title: 'Custom Luxury Packaging Manufacturing Partner | MTT Packaging',
  description: businessSummary,
  authors: [{ name: 'Hugo He', url: 'mailto:info@mttpackaging.com' }],
  creator: 'MTT Packaging',
  publisher: 'MTT Packaging',
  category: 'Custom Packaging',
  icons: { icon: [{ url: '/favicon-192.png?v=gold-triangle', type: 'image/png', sizes: '192x192' }, { url: '/favicon-48.png?v=gold-triangle', type: 'image/png', sizes: '48x48' }, { url: '/favicon.svg?v=gold-triangle', type: 'image/svg+xml' }], shortcut: '/favicon-192.png?v=gold-triangle' },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: { siteName: 'MTT Packaging', type: 'website', images: [{ url: '/og.jpg?v=gold-triangle', width: 1200, height: 630, alt: 'MTT Packaging custom packaging' }] },
  // Let each page's resolved metadata populate social titles and descriptions.
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{__html:analyticsBootstrap}} />
      </head>
      <body className="mtt-editorial">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <LeadQualificationChatbot hasIntroVideo={true} />
        <CookieConsent />
        <ContactAnalytics />
      </body>
    </html>
  );
}
