import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '../../components/SiteNav';
import { breadcrumb, organization, siteUrl } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Cookie Policy | MTT Packaging',
  description: 'How MTT Packaging uses cookies and similar technologies on mttpackaging.com, and how visitors can manage their preferences.',
  alternates: { canonical: '/cookie-policy' },
  robots: { index: true, follow: true },
  openGraph: { title: 'Cookie Policy | MTT Packaging', description: 'How MTT Packaging uses cookies and similar technologies on mttpackaging.com.', url: '/cookie-policy' },
  twitter: { card: 'summary', title: 'Cookie Policy | MTT Packaging', description: 'How MTT Packaging uses cookies and similar technologies on mttpackaging.com.' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    organization,
    breadcrumb([['Home', '/'], ['Cookie Policy', '/cookie-policy']]),
  ],
};

export default function CookiePolicy() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />
      <nav style={{ padding: '12px 7vw', fontSize: '12px', color: '#6b746d', borderBottom: '1px solid rgba(23,32,25,.17)', background: '#fff' }}>
        <a href="/" style={{ color: '#6b746d' }}>Home</a>
        <span style={{ margin: '0 8px' }}>/</span>
        <span>Cookie Policy</span>
      </nav>
      <header className="page-hero" style={{ minHeight: 'auto', padding: '64px 7vw' }}>
        <div>
          <h1>Cookie Policy</h1>
          <p>Effective date: 1 September 2026</p>
        </div>
      </header>
      <div style={{ padding: '0 7vw 100px', maxWidth: '860px' }}>

        <h2>1. What Are Cookies?</h2>
        <p>Cookies are small text files placed on your device when you visit a website. Similar technologies include local storage, session storage and pixels. These technologies help websites function, remember preferences and understand how visitors interact with the site.</p>

        <h2>2. How We Use These Technologies</h2>
        <p>MTT Packaging uses cookies and similar technologies on mttpackaging.com for the following purposes:</p>

        <h3>Strictly Necessary Technologies</h3>
        <p>These technologies are essential for the website to function. They enable core features such as page navigation, form submission and security. These cannot be disabled without affecting the basic operation of the website.</p>
        <p>Examples include:</p>
        <ul>
          <li>Session management</li>
          <li>Cookie consent preference storage</li>
          <li>Security and fraud prevention</li>
        </ul>

        <h3>Analytics Technologies</h3>
        <p>Analytics technologies help us understand how visitors use our website, including which pages are visited, how long visitors spend on the site, how they arrived and what devices and browsers they use. This information helps us improve the website experience.</p>
        <p>Our website may use Google Analytics (GA4) for this purpose. Google Analytics uses cookies to collect information about website usage. Where required by applicable law, these cookies are only activated after you provide consent through our cookie consent mechanism.</p>

        <h3>Preference Storage</h3>
        <p>We use local storage to remember your cookie consent preference so that you are not asked to make the same choice on every visit.</p>

        <h2>3. Third-Party Technologies</h2>
        <p>Some cookies and technologies on our website are provided by third parties:</p>
        <ul>
          <li><strong>Google Analytics:</strong> Provided by Google. Collects website usage data. Subject to <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy ↗</a>.</li>
          <li><strong>Formspree:</strong> Our enquiry forms may be processed through Formspree. Subject to <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Formspree&apos;s Privacy Policy ↗</a>.</li>
        </ul>

        <h2>4. Managing Your Cookie Preferences</h2>
        <p>You can manage your analytics cookie preferences at any time:</p>
        <ul>
          <li><strong>Cookie consent banner:</strong> When you first visit our website, a consent banner allows you to accept or reject non-essential cookies.</li>
          <li><strong>Cookie Settings link:</strong> You can change your preferences at any time by clicking the &ldquo;Cookie Settings&rdquo; link in the website footer.</li>
          <li><strong>Browser settings:</strong> You can also control cookies through your browser settings. Most browsers allow you to block or delete cookies. Please note that blocking strictly necessary cookies may affect website functionality.</li>
        </ul>

        <h2>5. Analytics Consent Behaviour</h2>
        <p>When you visit our website for the first time:</p>
        <ul>
          <li>If you <strong>accept analytics</strong>, Google Analytics will be activated to collect website usage data.</li>
          <li>If you <strong>reject non-essential</strong> technologies, analytics cookies will not be set. Google Analytics will operate in a limited mode that does not store cookies on your device.</li>
        </ul>
        <p>Your preference is stored locally on your device and remains in effect until you change it.</p>

        <h2>6. Changes to This Cookie Policy</h2>
        <p>We may update this Cookie Policy from time to time. The effective date at the top of this page indicates when the policy was last updated.</p>

        <h2>7. Contact Us</h2>
        <p>If you have questions about our use of cookies, please contact us at:</p>
        <p><strong>Email:</strong> <a href="mailto:info@mttpackaging.com">info@mttpackaging.com</a></p>
      </div>
      <SiteFooter />
    </main>
  );
}
