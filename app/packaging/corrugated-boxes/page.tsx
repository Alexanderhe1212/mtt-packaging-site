import FamilyProductDirectory from '../../../components/FamilyProductDirectory';
import BuyerPlanning from "../../../components/BuyerPlanning";
import {SiteNav,SiteFooter} from '../../../components/SiteNav';
import { breadcrumb, organization, siteUrl } from '../../../lib/seo';

const pageTitle = 'Custom Corrugated Boxes & Mailers | MTT Packaging';
const pageDescription = 'Custom kraft corrugated mailers with printing, paper inserts and thank-you cards. Review flute, dimensions and transit protection with MTT.';

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/packaging/corrugated-boxes' },
  openGraph: {
    siteName: 'MTT Packaging',
    type: 'website',
    title: pageTitle,
    description: pageDescription,
    url: '/packaging/corrugated-boxes',
    images: [{ url: '/og.jpg?v=gold-triangle', width: 1200, height: 630, alt: 'MTT Packaging custom packaging' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
    images: ['/og.jpg?v=gold-triangle'],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Custom Corrugated Boxes and Mailers',
      description: pageDescription,
      url: `${siteUrl}/packaging/corrugated-boxes`,
      image: `${siteUrl}/products/mtt-e0101-0.webp`,
      provider: { '@id': `${siteUrl}/#organization` },
      areaServed: 'Worldwide',
      serviceType: 'Custom Corrugated Box and Mailer Manufacturing',
    },
    organization,
    breadcrumb([
      ['Home', '/'],
      ['Packaging', '/packaging'],
      ['Corrugated Boxes', '/packaging/corrugated-boxes'],
    ]),
  ],
};

export default function Page(){return <main id="main-content"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><SiteNav/><header className="page-hero"><div><p>Corrugated packaging</p><h1>Custom Corrugated Boxes for Shipping and E-commerce</h1><p>Choose corrugated mailers with integrated locking wings, printed branding and optional paper inserts, tissue and thank-you cards. Confirm the flute, board grade and complete pack through sampling and transit review.</p><a className="button" href="/products?family=corrugated">Explore corrugated designs →</a></div><img src="/products/mtt-e0101-0.webp" alt="Kraft corrugated mailer with tissue and optional thank-you card" width="500" height="500"/></header><section className="catalogue-shell"><h2>What to confirm before quoting</h2><p>Send finished internal length × width × height, contents and packed weight, quantity, destination and shipping method. A presentation image does not establish stacking or drop-test performance.</p><p>Choosing the board? Compare <a href="/insights/e-flute-vs-b-flute-corrugated-boxes">E flute and B flute for fragile products</a>, then use the <a href="/insights/corrugated-mailer-shipping-box-specification">mailer and shipping-carton specification checklist</a> and <a href="/insights/compare-custom-packaging-supplier-quotes">supplier quote normalization guide</a> to prepare a comparable brief.</p><h2>Make the complete set yours</h2><p>Artwork, paper inserts, cards and tissue can be specified together. Individual accessory quantities and costs are confirmed separately.</p><a href="/request-a-quote?product=Corrugated%20packaging">Discuss your shipping pack →</a></section><FamilyProductDirectory family="corrugated"/><BuyerPlanning kind="corrugated"/><SiteFooter/></main>}
