import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '../../components/SiteNav';
import { breadcrumb, organization, siteUrl } from '../../lib/seo';

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
    <main>
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
          <p>Effective date: 1 September 2026</p>
        </div>
      </header>
      <div style={{ padding: '0 7vw 100px', maxWidth: '860px' }}>

        <h2>1. Introduction</h2>
        <p>This Privacy Policy explains how MTT Packaging collects, uses and protects personal information obtained through mttpackaging.com. We are committed to handling personal information responsibly and in accordance with applicable data protection requirements.</p>

        <h2>2. Information We Collect</h2>
        <p>We collect limited personal information, primarily when visitors voluntarily contact us or submit an enquiry through our website. We do not require visitors to create user accounts.</p>

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
        <p>Our website includes a lead-qualification chatbot that helps visitors describe their packaging requirements. The chatbot collects project information and contact details submitted voluntarily by the visitor. It operates using a rule-based conversation flow and uses the same submission infrastructure as our website enquiry forms.</p>
        <p>Visitors may optionally choose to continue the conversation on WhatsApp, which is a third-party messaging service.</p>

        <h2>5. Usage and Analytics Data</h2>
        <p>Our website may use Google Analytics (GA4) to understand how visitors use the site. This may include information such as pages visited, time spent on pages, approximate geographic region, device type, browser type and referring website. Google Analytics uses cookies and similar technologies to collect this information.</p>
        <p>Where required by applicable law, analytics cookies and tracking technologies are only activated after the visitor provides consent through our cookie consent mechanism. If consent is not provided, Google Analytics operates in a limited mode that does not store analytics cookies.</p>

        <h2>6. Cookies and Similar Technologies</h2>
        <p>Our website uses cookies and similar technologies for the following purposes:</p>
        <ul>
          <li><strong>Strictly necessary technologies:</strong> Required for the website to function correctly. These cannot be disabled.</li>
          <li><strong>Analytics technologies:</strong> Used to understand visitor behaviour and improve the website. These are only activated with visitor consent where required.</li>
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
          <li><strong>Consent:</strong> Where you have provided consent for specific processing, such as analytics cookies.</li>
          <li><strong>Legitimate interest:</strong> Where processing is necessary for responding to business enquiries and maintaining commercial communications.</li>
          <li><strong>Contract performance:</strong> Where processing relates to packaging quotations or orders you have requested.</li>
        </ul>

        <h2>9. Service Providers</h2>
        <p>We use third-party service providers to support our website operations, including:</p>
        <ul>
          <li><strong>Form processing:</strong> Enquiry forms on our website are processed using a third-party form-processing service to receive and manage submissions.</li>
          <li><strong>Analytics:</strong> Google Analytics (GA4) is used to understand website usage, subject to visitor consent where required.</li>
          <li><strong>Hosting:</strong> Our website is hosted through a third-party hosting platform.</li>
        </ul>
        <p>These service providers process information on our behalf and are contractually required to protect personal information.</p>

        <h2>10. International Data Transfers</h2>
        <p>As MTT Packaging operates from China, information submitted through our website may be transferred to and processed in China. Where applicable, we ensure that appropriate safeguards are in place for international transfers of personal information.</p>
        <p>Information processed by our third-party service providers (such as Google Analytics and form-processing services) may also be transferred to and stored in countries other than your own, in accordance with those providers own privacy policies.</p>

        <h2>11. Data Retention</h2>
        <p>We retain enquiry and communication records for as long as necessary to respond to your enquiry, maintain business records and fulfil the purposes described in this Privacy Policy. Analytics data is retained in accordance with Google Analytics default retention settings.</p>

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
