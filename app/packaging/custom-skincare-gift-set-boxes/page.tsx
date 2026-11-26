import type { Metadata } from 'next';
import { SiteNav, SiteFooter } from '../../../components/SiteNav';
import { breadcrumb, organization, siteUrl } from '../../../lib/seo';

const pageTitle = 'Custom Skincare & Biotech Gift Kit Boxes | MTT';
const pageDescription = 'Plan custom skincare and biotech gift kit boxes for jars, airless pumps, and serums: compare magnetic and fold-flat designs, inserts, samples and 1,000-piece orders.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: '/packaging/custom-skincare-gift-set-boxes' },
  openGraph: { type: 'website', title: pageTitle, description: pageDescription, url: '/packaging/custom-skincare-gift-set-boxes', images: ['/products/mtt-r0103-0.webp'] },
  twitter: { card: 'summary_large_image', title: pageTitle, description: pageDescription, images: ['/products/mtt-r0103-0.webp'] },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Custom Skincare Gift Set Boxes with Inserts',
      description: pageDescription,
      url: `${siteUrl}/packaging/custom-skincare-gift-set-boxes`,
      image: `${siteUrl}/products/mtt-r0103-0.webp`,
      provider: { '@id': `${siteUrl}/#organization` },
      areaServed: 'Worldwide',
      serviceType: 'Custom Skincare Gift Box Packaging',
    },
    organization,
    breadcrumb([
      ['Home', '/'],
      ['Packaging', '/packaging'],
      ['Custom Skincare Gift Set Boxes', '/packaging/custom-skincare-gift-set-boxes'],
    ]),
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What does MTT need to quote a biotech or clinical skincare gift kit box?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Send filled dimensions and weights for each vial, airless pump, dropper, or jar, along with insert preference, quantity from 1,000 pieces per design, and destination.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you prevent label scuffing on matte or coated skincare bottles inside a gift kit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Match the insert material and cavity clearance to the bottle decoration, avoiding tight abrasive edges against foil or soft-touch labels, and verify on a filled sample.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the minimum order quantity for custom skincare gift set boxes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'MTT Packaging requires a minimum of 1,000 pieces per design and US$2,000 in product value per order, excluding freight, sample charges and other fees.',
          },
        },
      ],
    },
  ],
};

export default function SkincareGiftSetBoxes() {
  return <main id="main-content"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /><SiteNav/>
    <header className="page-hero"><div><p>Custom skincare packaging · 1,000 pieces per design</p><h1>Custom skincare gift set boxes with inserts</h1><p>Bring a cream jar, serum bottle and accessories together in a box developed around your actual products. Compare a magnetic book box and a fold-flat rigid structure, then approve the insert and opening on a representative sample.</p><a className="button" href="/request-a-quote?product=Skincare%20gift%20set%20box">Discuss your skincare set →</a></div><img src="/products/mtt-r0103-0.webp" alt="Design reference: skincare presentation box with jar and bottle positions" width="500" height="500"/></header>
    <section className="catalogue-shell"><h2>Choose the opening and the packing route</h2><div className="buyer-options"><article><h3>Magnetic book-style box</h3><p>A connected lid opens to reveal the set. Check that the jar and bottle can be removed individually and the lid clears the tallest closure.</p><a href="/products/skincare-ritual-book">See the book-style design →</a></article><article><h3>Fold-flat magnetic rigid box</h3><p>Consider a fold-in structure when empty-box storage and delivery volume matter. Confirm corner assembly and whether the insert is packed separately.</p><a href="/products/skincare-ritual-collapsible-magnetic-rigid-box">See the fold-flat design →</a></article><article><h3>Shoulder-neck dropper box</h3><p>Use an exposed contrast neck and finger-lift notches for frosted glass dropper serum bottles and screw-cap refills.</p><a href="/products/dropper-serum-and-refill-shoulder-rigid-box">See the shoulder-neck serum design →</a></article><article><h3>Folding carton for a duo</h3><p>Compare a lighter paperboard route if the packaging brief and presentation are suited to a folding carton.</p><a href="/products/custom-skincare-duo-auto-bottom">See the skincare duo carton →</a></article></div><p>Images are design references, not evidence of a completed customer project or passed transport test. Materials, finishes and fit are confirmed through physical sampling.</p>
    <h2>Specify the jar, bottle and insert together</h2><p>Measure each filled product with its cap, pump or dropper fitted. Include the widest jar lid, bottle shoulder, labels and any surfaces that should not rub. Plan finger access before finalising cavities; a snug opening alone does not establish a safe grip or transport performance.</p><p><a href="/insights/skincare-jar-serum-gift-box-insert-fit">Review the cream jar and serum insert checklist →</a> · <a href="/insights/dropper-serum-shoulder-neck-box-fit">Check dropper serum bulb clearance →</a> · <a href="/insights/cosmetic-gift-box-paperboard-dividers">Compare paperboard divider options →</a></p>
    <h2>Biotech and clinical skincare gift kit considerations</h2><p>Multi-step biotech and clinical skincare gift kits often combine airless pumps, glass ampoules, dropper serums, and refill pouches of uneven weights. Quote using filled component mass rather than empty containers, and check label-contact surfaces on an assembled sample before bulk tooling.</p><p><a href="/insights/skincare-gift-kit-filled-weight-quote">Quote a skincare gift kit with filled-weight data →</a> · <a href="/insights/skincare-insert-label-scuff-sample">Locate label scuffing in a kit sample →</a> · <a href="/insights/paired-airless-pumps-carton-variant-fit">Fit paired airless pumps in one insert →</a> · <a href="/products/twin-airless-pump-carton-paperboard-cradle">See the twin airless pump carton →</a></p>
    <h2>Frequently asked questions</h2>
    <dl>
      <dt>What does MTT need to quote a biotech or clinical skincare gift kit box?</dt>
      <dd>Send filled dimensions and weights for each vial, airless pump, dropper, or jar, along with insert preference, quantity from 1,000 pieces per design, and destination.</dd>
      <dt>How do you prevent label scuffing on matte or coated skincare bottles inside a gift kit?</dt>
      <dd>Match the insert material and cavity clearance to the bottle decoration, avoiding tight abrasive edges against foil or soft-touch labels, and verify on a filled sample.</dd>
      <dt>What is the minimum order quantity for custom skincare gift set boxes?</dt>
      <dd>MTT Packaging requires a minimum of 1,000 pieces per design and US$2,000 in product value per order, excluding freight, sample charges and other fees.</dd>
    </dl>
    <h2>Compare a 1,000-piece packing brief</h2><p>State quantities per design, artwork versions, who assembles the boxes and whether inserts arrive fitted or separately. Ask for sample, tooling, box, insert and freight to be itemised. Compare actual master-carton dimensions and weights before choosing flat or assembled delivery.</p><p><a href="/insights/skincare-gift-box-1000-units-flat-vs-assembled">Compare fold-flat and assembled packing →</a></p>
    <h2>Send the details for sampling</h2><ul><li>Jar and bottle dimensions, filled weight and closure configuration.</li><li>Artwork, preferred opening, insert, accessories and sensitive surfaces.</li><li>Quantity per design, packing location, delivery destination and target date.</li></ul><p>MTT can review the presentation box and sample scope. The final shipping pack and any transport tests depend on the filled set and intended route.</p><a className="button" href="/request-a-quote?product=Skincare%20gift%20set%20box">Request a packaging review →</a></section><SiteFooter/></main>;
}
