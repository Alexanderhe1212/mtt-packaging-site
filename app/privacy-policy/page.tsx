import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '../../components/SiteNav';
import { breadcrumb, organization } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy | MTT Packaging',
  description: 'How MTT Packaging collects, uses and protects personal information obtained through mttpackaging.com.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: true, follow: true },
  openGraph: { title: 'Privacy Policy | MTT Packaging', description: 'How MTT Packaging collects, uses and protects personal information.', url: '/privacy-policy' },
  twitter: { card: 'summary', title: 'Privacy Policy | MTT Packaging', description: 'How MTT Packaging collects, uses and protects personal information.' },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    organization,
    breadcrumb([['Home', '/'], ['Privacy Policy', '/privacy-policy']]),
  ],
};

export default function PrivacyPolicy() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />
      <nav style={{ padding: '12px 7vw', fontSize: '12px', color: '#6b746d', borderBottom: '1px solid rgba(23,32,25,.17)', background: '#fff' }}>
        <a href="/" style={{ color: '#6b746d' }}>Home</a>
        <span style={{ margin: '0 8px' }}>/</span>
        <span>Privacy Policy</span>
      </nav>
      <header className="page-hero" style={{ minHeight: 'auto', padding: '64px 7vw' }}>
        <div>
          <h1>Privacy Policy</h1>
          <p>Effective date: 16 October 2026</p>
        </div>
      </header>
      <div style={{ padding: '0 7vw 100px', maxWidth: '860px' }}>

        <h2>1. Introduction</h2>
        <p>This Privacy Policy explains how MTT Packaging collects, uses and protects personal information obtained through mttpackaging.com. We are committed to handling personal information responsibly and in accordance with applicable data protection requirements.</p>

        <h2>2. Information We Collect</h2>
        <p>We receive information you choose to provide in an enquiry and technical information needed to operate the website and contact services. If you accept analytics, Google Analytics and Microsoft Clarity also process website usage information as described below. We do not require visitors to create user accounts.</p>

        <h2>3. Information You Provide</h2>
        <p>When submitting an enquiry through our website forms, chatbot or contact channels, visitors may voluntarily provide information such as:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Company name</li>
          <li>Country or market</li>
          <li>Packaging type or project requirements</li>
          <li>Quantity requirements</li>
          <li>Estimated budget or project stage</li>
          <li>Any other information entered into the form or chatbot</li>
        </ul>
        <p>Providing this information is entirely voluntary. If you choose not to provide it, you can still browse the website, but we may be unable to respond to your enquiry effectively.</p>

        <h2>4. Website Enquiries and Chatbot</h2>
        <p>Our contact panel and guided packaging chatbot are part of this website. The panel displays a recorded introduction and links to our quote form, chatbot and WhatsApp. The chatbot asks about your packaging project and contact details so that you can prepare an enquiry.</p>
        <p>When you submit a website form or chatbot enquiry, Formspree processes the submission to deliver it to us. A chatbot submission includes the answers you provide, the page URL and title, and the submission time. See <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Formspree&apos;s Privacy Policy</a> for its handling of submissions.</p>
        <p>You can optionally continue on WhatsApp, a separate messaging service. A WhatsApp follow-up link from the chatbot includes your enquiry details as a prefilled message. Opening that link takes you to WhatsApp under its own privacy terms.</p>

        <h2>5. Usage and Analytics Data</h2>
        <p>We use Google Analytics (GA4) and Microsoft Clarity to understand how visitors use our website and improve its content, navigation and usability. Both services are optional. For visitors in all locations, we load their scripts and begin sending analytics data only after you select <strong>Accept Analytics</strong> or save analytics as enabled in Cookie Settings. If you have not opted in or reject analytics, these integrations remain blocked; we do not run them in a limited, cookieless mode.</p>
        <ul>
          <li><strong>Google Analytics:</strong> Measures visits and interactions, such as pages viewed, time spent, referral sources, approximate geographic region, and browser or device information.</li>
          <li><strong>Microsoft Clarity:</strong> Provides heatmaps and session playback to help us understand clicks, scrolling, pointer movement and navigation. Playback reconstructs activity on our web pages using page layout and interaction data. Clarity also processes browser/device details and uses pseudonymous cookie and session identifiers.</li>
        </ul>
        <p>We configure contact forms, chat and packaging-brief content to be masked in Clarity. Focusing a form field or opening our chatbot stops Clarity recording for the rest of that page visit. Clarity does not run on quote-request, confirmation or packaging-tool pages. Masking hides the marked content from playback; it does not prevent an enquiry you submit from reaching the contact service described above. We do not assign our own customer or user identifiers to Clarity.</p>
        <p>Accepting analytics does not grant advertising consent. Our Google Analytics and Clarity integrations keep advertising consent set to denied. Microsoft and Google process analytics data under their respective terms and privacy statements; this site setting does not describe every use of data by those providers.</p>
        <p>Read <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google&apos;s Privacy Policy</a>, the <a href="https://privacy.microsoft.com/en-us/privacystatement" target="_blank" rel="noopener noreferrer">Microsoft Privacy Statement</a>, and Microsoft&apos;s explanations of <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data" target="_blank" rel="noopener noreferrer">Clarity data collection</a> and <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking" target="_blank" rel="noopener noreferrer">content masking</a>.</p>
        <p>You can withdraw analytics consent through <strong>Cookie Settings</strong> in the website footer by switching Analytics off and saving your preferences. This stops further collection by these integrations; requests containing activity captured before withdrawal may finish sending. If you enable analytics again during the same page visit, Clarity recording can start again only on a subsequent eligible page visit. Withdrawal does not automatically erase information already processed; contact us using the details below for a data request.</p>

        <h2>6. Cookies and Similar Technologies</h2>
        <p>Our website uses cookies and similar technologies for the following purposes:</p>
        <ul>
          <li><strong>Necessary technologies:</strong> Support site functions, contact services and storage of your privacy choice. The analytics control does not disable these functions.</li>
          <li><strong>Analytics technologies:</strong> Google Analytics and Microsoft Clarity are activated only with your opt-in consent.</li>
        </ul>
        <p>For more information about the cookies we use and how to manage your preferences, please see our <a href="/cookie-policy">Cookie Policy</a>.</p>

        <h2>7. How We Use Personal Information</h2>
        <p>We use personal information for the following purposes:</p>
        <ul>
          <li>Responding to enquiries and providing packaging quotations</li>
          <li>Communicating about custom packaging projects</li>
          <li>Understanding website usage to improve our content and services</li>
          <li>Maintaining records of business communications</li>
        </ul>
        <p>We do not sell personal information to third parties.</p>

        <h2>8. Legal Bases Where Applicable</h2>
        <p>Where the EU General Data Protection Regulation (GDPR) or equivalent legislation applies, we process personal information on the following legal bases:</p>
        <ul>
          <li><strong>Consent:</strong> Where you have provided consent for specific processing, including optional Google Analytics and Microsoft Clarity analytics.</li>
          <li><strong>Legitimate interest:</strong> Where processing is necessary for responding to business enquiries and maintaining commercial communications.</li>
          <li><strong>Contract performance:</strong> Where processing relates to packaging quotations or orders you have requested.</li>
        </ul>

        <h2>9. Service Providers</h2>
        <p>We use third-party service providers to support our website operations, including:</p>
        <ul>
          <li><strong>Enquiry processing:</strong> Formspree processes submissions from our website forms and guided chatbot. WhatsApp is an optional external contact channel.</li>
          <li><strong>Analytics:</strong> Google Analytics (GA4) and Microsoft Clarity process website usage data after you opt in.</li>
          <li><strong>Hosting:</strong> Our website is hosted through a third-party hosting platform.</li>
        </ul>
        <p>The providers&apos; terms and privacy notices explain their processing and privacy practices. Our analytics choice applies to Google Analytics and Clarity; contact services process the information needed to deliver the contact features separately.</p>

        <h2>10. International Data Transfers</h2>
        <p>As MTT Packaging operates from China, information submitted through our website may be transferred to and processed in China.</p>
        <p>Google, Microsoft and our contact-service providers may also process information in countries other than your own. Their privacy notices describe their processing locations and international-transfer arrangements. Contact us if you need information about the processing of your enquiry.</p>

        <h2>11. Data Retention</h2>
        <p>We retain enquiry and communication records for as long as necessary to respond to your enquiry, maintain business records and fulfil the purposes described in this Privacy Policy. Analytics retention depends on the type of data, service configuration and provider policies. Microsoft describes the different periods for Clarity data in its <a href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/data-retention" target="_blank" rel="noopener noreferrer">data-retention documentation</a>. Withdrawing consent controls future analytics collection and does not itself delete existing provider records.</p>

        <h2>12. Data Security</h2>
        <p>We take reasonable measures to protect personal information against unauthorised access, alteration, disclosure or destruction. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.</p>

        <h2>13. Your Privacy Rights</h2>
        <p>Depending on your location, you may have rights regarding your personal information, including the right to access, correct, delete or restrict processing of your data. To exercise these rights, please contact us at the email address below.</p>

        <h2>14. European / EEA Privacy Rights</h2>
        <p>If you are located in the European Economic Area (EEA), you have additional rights under the GDPR, including:</p>
        <ul>
          <li>The right to access your personal information</li>
          <li>The right to rectification of inaccurate information</li>
          <li>The right to erasure (right to be forgotten)</li>
          <li>The right to restrict processing</li>
          <li>The right to data portability</li>
          <li>The right to object to processing</li>
          <li>The right to withdraw consent at any time (without affecting the lawfulness of processing before withdrawal)</li>
        </ul>
        <p>You also have the right to lodge a complaint with a supervisory authority in your country of residence.</p>

        <h2>15. Children&apos;s Privacy</h2>
        <p>Our website is directed at business professionals and is not intended for children under the age of 16. We do not knowingly collect personal information from children.</p>

        <h2>16. Third-Party Links</h2>
        <p>Our website may contain links to third-party websites or services, including WhatsApp. Clicking the WhatsApp contact option sends you to a third-party service operated under WhatsApp and Meta&apos;s own privacy terms. We do not control and are not responsible for the privacy practices of third-party services.</p>

        <h2>17. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. The effective date at the top of this page indicates when the policy was last updated. We encourage visitors to review this page periodically.</p>

        <h2>18. Contact Us</h2>
        <p>If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us at:</p>
        <p><strong>Email:</strong> <a href="mailto:info@mttpackaging.com">info@mttpackaging.com</a></p>
        <p><strong>WhatsApp:</strong> <a href="https://wa.me/8617207110964" target="_blank" rel="noopener noreferrer">+86 17207110964</a></p>
      </div>
      <SiteFooter />
    </main>
  );
}
