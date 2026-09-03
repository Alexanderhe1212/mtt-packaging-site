import type { Metadata } from 'next';
import { SiteFooter, SiteNav } from '../../../components/SiteNav';
import { breadcrumb, organization, siteUrl } from '../../../lib/seo';
import BoxSizeCalculator from '../../../components/BoxSizeCalculator';

export const metadata: Metadata = {
  title: 'Free Box Size Calculator | MTT Packaging',
  description: 'Estimate recommended internal and external box dimensions from product size, clearance and board thickness with MTT Packaging\'s free box size calculator.',
  alternates: { canonical: '/tools/box-size-calculator' },
  openGraph: {
    title: 'Free Box Size Calculator | MTT Packaging',
    description: 'Estimate recommended internal and external box dimensions from product size, clearance and board thickness.',
    url: '/tools/box-size-calculator',
    images: ['/og.jpg'],
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': `${siteUrl}/tools/box-size-calculator#app`,
      name: 'MTT Box Size Calculator',
      url: `${siteUrl}/tools/box-size-calculator`,
      description: 'Estimate recommended internal and external box dimensions from product size, clearance and board thickness.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/tools/box-size-calculator#webpage`,
      name: 'Free Box Size Calculator',
      url: `${siteUrl}/tools/box-size-calculator`,
      description: 'Estimate recommended internal and external box dimensions from product size, clearance and board thickness.',
      isPartOf: { '@id': `${siteUrl}/#website` },
    },
    organization,
    breadcrumb([
      ['Home', '/'],
      ['Tools', '/tools'],
      ['Box Size Calculator', '/tools/box-size-calculator'],
    ]),
  ],
};

export default function BoxSizeCalculatorPage() {
  return (
    <main className="calc-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SiteNav />
      <header className="page-hero">
        <p className="section-kicker">Free Packaging Tool</p>
        <h1>Free Box Size Calculator</h1>
        <p>Estimate recommended internal and external box dimensions from your product size, clearance and board thickness.</p>
      </header>

      {/* Calculator */}
      <section className="calc-section">
        <BoxSizeCalculator />
      </section>

      {/* Educational Content */}
      <section className="calc-content-section">
        <div className="calc-content-grid">
          <article>
            <h2>How the Box Size Calculator Works</h2>
            <p>Enter your product dimensions (length, width and height), add the clearance you want around each side, and specify the board thickness. The calculator uses these inputs to estimate the recommended internal box size and the resulting external dimensions.</p>
            <p>The formulas are straightforward: for each axis, the internal dimension equals the product dimension plus twice the clearance (one clearance value applied to each side). The external dimension then adds twice the board thickness to account for both walls of the box.</p>
          </article>

          <article>
            <h2>Internal vs External Box Dimensions</h2>
            <p><strong>Internal dimensions</strong> describe the usable space inside the box — the area available for your product, inserts and any protective materials. When specifying packaging requirements to a manufacturer, internal dimensions are typically the primary reference.</p>
            <p><strong>External dimensions</strong> include the material thickness of the box walls. These matter for shipping calculations, carton packing and pallet planning, since carriers and freight forwarders work with the outer envelope of the package.</p>
          </article>

          <article>
            <h2>How Much Clearance Should I Add?</h2>
            <p>Clearance depends on the product, insert, protection level and packaging structure. A snug rigid box with a custom insert may need very little clearance, while a product without an insert may need more space to prevent movement.</p>
            <p>Fragile or irregular products may require additional space or a custom insert. As a general starting point, 2–5 mm per side is common for products with some form of insert protection, but the right clearance is always specific to the product and packaging design.</p>
          </article>

          <article>
            <h2>Example Calculation</h2>
            <p><strong>Product:</strong> 120 × 60 × 40 mm</p>
            <p><strong>Clearance:</strong> 3 mm per side</p>
            <p><strong>Board thickness:</strong> 2 mm</p>
            <p><strong>Recommended Internal Box Size:</strong> 126 × 66 × 46 mm</p>
            <p><strong>Estimated External Box Size:</strong> 130 × 70 × 50 mm</p>
          </article>

          <article>
            <h2>Limitations</h2>
            <p>This calculator provides estimated dimensions for preliminary packaging planning. It is not a production dieline generator or a final engineering specification. Actual box dimensions may vary based on box structure type, material properties, manufacturing tolerances, insert design and finishing methods.</p>
            <p>For production-ready packaging, work with a packaging manufacturer to develop precise structural specifications, physical samples and production-grade dielines.</p>
          </article>
        </div>
      </section>

      {/* FAQ */}
      <section className="calc-faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="calc-faq-list">
          <details>
            <summary>Are box dimensions usually measured inside or outside?</summary>
            <p>In the packaging industry, box dimensions are typically stated as internal dimensions unless specified otherwise. Internal dimensions determine how well the product fits inside the box. External dimensions are used for shipping, carton packing and freight calculations.</p>
          </details>
          <details>
            <summary>Does board thickness affect the external box size?</summary>
            <p>Yes. The external dimension of each side is the internal dimension plus twice the board thickness — one thickness for each wall of the box. Thicker board material produces a larger external box for the same internal space.</p>
          </details>
          <details>
            <summary>How much clearance should I leave around a product?</summary>
            <p>Clearance depends on the product, insert type, fragility and packaging structure. Products with custom-fitted inserts may need only 1–3 mm per side, while products without inserts may need 3–8 mm to prevent movement. Fragile items may benefit from additional space for cushioning materials.</p>
          </details>
          <details>
            <summary>Can I use this calculator for rigid boxes?</summary>
            <p>This calculator gives a useful starting estimate for rigid boxes, folding cartons and corrugated boxes. However, rigid boxes have construction-specific factors such as wall overlap, shoulder-neck tolerances and hinge hardware that may affect final dimensions. Use this tool for planning, then confirm with your packaging manufacturer.</p>
          </details>
          <details>
            <summary>Can MTT develop final production dimensions?</summary>
            <p>Yes. MTT Packaging develops custom box structures with precise internal and external dimensions, custom inserts, material specifications and physical samples. Share your product details through our <a href="/request-a-quote">quote request</a> and Hugo will respond with a focused recommendation.</p>
          </details>
        </div>
      </section>

      {/* Related Links */}
      <section className="calc-related-section">
        <h2>Related Packaging Solutions</h2>
        <div className="calc-related-grid">
          <a href="/packaging/custom-rigid-boxes" className="calc-related-card">
            <h3>Custom Rigid Boxes</h3>
            <p>Premium rigid boxes with custom dimensions, inserts and finishing for luxury products.</p>
            <span>Explore →</span>
          </a>
          <a href="/packaging/custom-inserts" className="calc-related-card">
            <h3>Custom Inserts</h3>
            <p>Precision-cut inserts that protect your product and create a refined presentation.</p>
            <span>Explore →</span>
          </a>
          <a href="/packaging" className="calc-related-card">
            <h3>All Packaging Solutions</h3>
            <p>Rigid boxes, folding cartons, paper bags and custom inserts for premium brands.</p>
            <span>Explore →</span>
          </a>
        </div>
      </section>

      <aside className="page-cta">
        <p className="section-kicker light">Need Packaging?</p>
        <h2>Have a Packaging Project?</h2>
        <p>Share your product dimensions, quantity and packaging requirements. Our team can develop the structure, materials, inserts and finishing.</p>
        <a className="button inverse" href="/request-a-quote">Get a Custom Packaging Quote →</a>
      </aside>
      <SiteFooter />
    </main>
  );
}
