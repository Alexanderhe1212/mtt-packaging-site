import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '../../components/SiteNav';
import { breadcrumb, organization, siteUrl } from '../../lib/seo';

export const metadata: Metadata = {
  title: 'Free Packaging Tools | MTT Packaging',
  description: 'Practical calculators and design tools for brands, packaging designers and purchasing teams. Free box size calculator, sheet layout tools and more.',
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Free Packaging Tools | MTT Packaging',
    description: 'Practical calculators and design tools for brands, packaging designers and purchasing teams.',
    url: '/tools',
    images: ['/og.jpg'],
  },
};

const tools = [
  { title: 'Box Size Calculator', status: 'Available' as const, href: '/tools/box-size-calculator', desc: 'Estimate recommended internal and external box dimensions from product size, clearance and board thickness.' },
  { title: 'Sheet Layout Calculator', status: 'Coming Soon' as const },
  { title: 'CBM Calculator', status: 'Coming Soon' as const },
  { title: 'Dieline Generator', status: 'Coming Soon' as const },
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/tools#webpage`,
      name: 'Free Packaging Tools',
      url: `${siteUrl}/tools`,
      description: 'Practical calculators and design tools for packaging professionals.',
      isPartOf: { '@id': `${siteUrl}/#website` },
    },
    organization,
    breadcrumb([
      ['Home', '/'],
      ['Tools', '/tools'],
    ]),
  ],
};

export default function ToolsPage() {
  return (
    <main className="tools-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />
      <header className="page-hero">
        <p className="section-kicker">Free Packaging Tools</p>
        <h1>Free Packaging Tools</h1>
        <p>Practical calculators and design tools for brands, packaging designers and purchasing teams.</p>
      </header>

      <section className="tools-grid-section">
        <div className="tools-grid">
          {tools.map((tool) => (
            <div key={tool.title} className={`tool-card${tool.status === 'Coming Soon' ? ' tool-card-disabled' : ''}`}>
              <span className={`tool-status${tool.status === 'Available' ? ' tool-status-live' : ''}`}>{tool.status}</span>
              <h3>{tool.title}</h3>
              <p>{tool.desc ?? 'Coming soon.'}</p>
              {tool.href ? <a className="button small" href={tool.href}>Use Calculator →</a> : null}
            </div>
          ))}
        </div>
      </section>

      <aside className="page-cta">
        <p className="section-kicker light">Need Packaging?</p>
        <h2>Have a Packaging Project?</h2>
        <p>Share your product details and our team will respond within 24 hours with a focused recommendation.</p>
        <a className="button inverse" href="/request-a-quote">Request a Quote →</a>
      </aside>
      <SiteFooter />
    </main>
  );
}
