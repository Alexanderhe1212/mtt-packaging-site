import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '../../components/SiteNav';
import { breadcrumb, organization } from '../../lib/seo';

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
    <main id="main-content">
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
          <p>Effective date: 16 October 2026</p>
        </div>
      </header>
      <div style={{ padding: '0 7vw 100px', maxWidth: '860px' }}>

        <h2>1. What Are Cookies?</h2>
        <p>Cookies are small text files placed on your device when you visit a website. Similar technologies include local storage, session storage and pixels. These technologies help websites function, remember preferences and understand how visitors interact with the site.</p>

        <h2>2. How We Use These Technologies</h2>
        <p>MTT Packaging uses cookies and similar technologies on mttpackaging.com for the following purposes:</p>

        <h3>Necessary Technologies</h3>
        <p>Site and contact-service technologies support functions such as preparing and submitting an enquiry and remembering your privacy choice. The contact panel and guided chatbot are part of this website. The analytics control does not disable these functions. Browser controls may restrict storage, but doing so can affect the features you choose to use.</p>

        <h3>Analytics Technologies</h3>
        <p>With your opt-in consent, we use Google Analytics (GA4) for visit and interaction measurement and Microsoft Clarity for heatmaps and session playback. These tools help us improve content, navigation and usability using information such as pages visited, referral sources, browser/device details, clicks, scrolling and pointer movement.</p>
        <p>For all visitors, both integrations are blocked until analytics is enabled. If you reject analytics before opting in, their scripts stay unloaded; we do not start a cookieless analytics mode. Accepting analytics does not grant advertising consent: our Google Analytics and Clarity integrations keep advertising consent set to denied.</p>
        <p>Clarity&apos;s playback uses page layout and interaction data. We configure contact forms, chat and packaging-brief content for masking. Focusing a form field or opening our chatbot stops Clarity recording for the rest of that page visit. Clarity is excluded from quote-request, confirmation and packaging-tool pages. We do not supply our own customer or user IDs to Clarity. See our <a href="/privacy-policy">Privacy Policy</a> for the collection scope and the separate handling of enquiries.</p>

        <h3>Preference Storage</h3>
        <p>We use browser local storage to remember your analytics choice on that browser and device. You can change it in Cookie Settings or clear it through your browser. A different browser or device, cleared storage, or an update requiring a new choice can cause the consent banner to appear again.</p>

        <h3>Analytics Cookie Examples</h3>
        <ul>
          <li><strong>Google Analytics:</strong> Cookies such as <code>_ga</code> distinguish browsers, while <code>_ga_&lt;container-id&gt;</code> maintains session state. See Google&apos;s <a href="https://support.google.com/analytics/answer/11397207" target="_blank" rel="noopener noreferrer">GA4 cookie documentation</a>.</li>
          <li><strong>Microsoft Clarity:</strong> <code>_clck</code> maintains a site-specific pseudonymous identifier and preferences; <code>_clsk</code> connects page views into a session. Microsoft also documents provider cookies whose use depends on consent and browser settings. See the <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies" target="_blank" rel="noopener noreferrer">Clarity cookie list</a>.</li>
        </ul>
        <p>Cookie availability and expiry depend on provider configuration and browser controls. Cookie expiry is separate from how long a provider retains data already received. We do not apply one fixed retention period to all analytics data.</p>

        <h2>3. Third-Party Technologies</h2>
        <p>Some cookies and technologies on our website are provided by third parties:</p>
        <ul>
          <li><strong>Google Analytics:</strong> Processes analytics after you opt in. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>.</li>
          <li><strong>Microsoft Clarity:</strong> Processes usage and playback data after you opt in. See the <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft Privacy Statement</a> and <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data" target="_blank" rel="noopener noreferrer">Clarity data documentation</a>.</li>
          <li><strong>Formspree:</strong> Processes submissions from our enquiry forms and guided chatbot to deliver them to us. See <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Formspree&apos;s Privacy Policy</a>.</li>
          <li><strong>WhatsApp:</strong> An optional external contact channel. Choosing a WhatsApp link opens that service, where its own technologies and privacy terms apply. See our <a href="/privacy-policy">Privacy Policy</a> for the chatbot&apos;s prefilled follow-up message.</li>
        </ul>

        <h2>4. Managing Your Cookie Preferences</h2>
        <p>You can manage your analytics cookie preferences at any time:</p>
        <ul>
          <li><strong>Cookie consent banner:</strong> Choose Accept Analytics to enable Google Analytics and Clarity, or Reject Non-Essential to keep them blocked. Manage Preferences lets you review the analytics choice.</li>
          <li><strong>Cookie Settings:</strong> Open Cookie Settings in the website footer, switch Analytics off and select Save Preferences to withdraw consent, or enable it to opt in.</li>
          <li><strong>Browser settings:</strong> You can also control cookies through your browser settings. Most browsers allow you to block or delete cookies. Please note that blocking strictly necessary cookies may affect website functionality.</li>
        </ul>

        <h2>5. Analytics Consent Behaviour</h2>
        <p>Your analytics choice controls both Google Analytics and Microsoft Clarity:</p>
        <ul>
          <li><strong>Before you opt in:</strong> Neither integration loads or sends analytics data. Rejecting analytics keeps them blocked. Browsing does not count as consent.</li>
          <li><strong>After acceptance:</strong> Both services can collect the analytics information described above and use the permitted analytics storage. Advertising consent remains denied.</li>
          <li><strong>After withdrawal:</strong> Further analytics collection by these integrations stops; requests containing activity captured before withdrawal may finish sending. If you turn analytics back on during the same page visit, Clarity recording can start again only on a subsequent eligible page visit. Withdrawal does not automatically erase data already processed by the providers. You can also delete stored cookies through your browser and contact us about a data request.</li>
        </ul>
        <p>Your choice is specific to this browser and device. The analytics control does not prevent processing needed to submit a form or chatbot enquiry, or to use an external contact link. For Microsoft&apos;s explanation of consent signals, see its <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2" target="_blank" rel="noopener noreferrer">Clarity consent documentation</a>; our site additionally blocks the tool itself when you have not opted in.</p>

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
