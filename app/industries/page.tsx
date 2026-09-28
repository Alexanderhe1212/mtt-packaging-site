import { industries } from '../../lib/industries';
import { SiteFooter, SiteNav } from '../../components/SiteNav';

export const metadata = {
  title: 'Industries | Custom Packaging Solutions | MTT Packaging',
  description: 'Custom packaging solutions for perfume, cosmetics, jewelry and premium gift industries.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <main id="main-content" className="industries-index">
      <SiteNav />
      <header className="page-hero" style={{ background: '#fff', gridTemplateColumns: '1fr', minHeight: 0, paddingBottom: '40px' }}>
        <div>
          <p style={{ textTransform: 'uppercase', letterSpacing: '.18em', fontSize: '10px', fontWeight: 700 }}>Industries</p>
          <h1 style={{ font: '600 clamp(46px,4.8vw,70px)/1 Arial,Helvetica,sans-serif', letterSpacing: '-.055em', margin: '22px 0' }}>Industries We Serve</h1>
          <p style={{ fontSize: '17px', lineHeight: 1.65, color: '#5f6961', maxWidth: '660px' }}>Custom packaging engineered for the specific needs of each industry.</p>
        </div>
      </header>
      <section style={{ padding: '60px 7vw 100px', background: '#fff' }}>
        <div className="industry-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {industries.map((item) => (
            <a href={`/industries/${item.slug}`} key={item.slug}>
              <img src={item.image} alt={item.imageAlt} width="800" height="640" loading="lazy" />
              <p>{item.eyebrow}</p>
              <h3>{item.title.split('.')[0]}</h3>
              <small>Explore solution →</small>
            </a>
          ))}
        </div>
      </section>
      <section className="home-buying-guide" aria-labelledby="industry-comparison">
        <header><p className="hp-kicker">Choose by product requirements</p><h2 id="industry-comparison">The product determines the first packaging decision.</h2><p>Start with what the pack must hold and how it will be handled. Two brands in the same industry may need different structures: a retail carton, a presentation box and a parcel-shipping pack have different jobs. Use the comparison below to prepare a brief, then explore the relevant industry page.</p></header>
        <div className="home-buying-table" role="region" aria-label="Industry packaging requirements" tabIndex={0}>
          <table><caption>What to resolve before choosing a box style</caption><thead><tr><th scope="col">Product family</th><th scope="col">First packaging decision</th><th scope="col">Bring to the sample review</th></tr></thead><tbody>
            <tr><th scope="row"><a href="/industries/perfume-fragrance-packaging">Perfume and fragrance</a></th><td>Support the filled bottle and allow removal without relying only on the cap as a grip.</td><td>Capped bottle dimensions, weight, decoration and every vial or accessory in the set.</td></tr>
            <tr><th scope="row"><a href="/industries/cosmetics-skincare-packaging">Cosmetics and skincare</a></th><td>Arrange jars, tubes and droppers so each item has suitable support and remains accessible.</td><td>All product formats, surface finishes and the intended packing order.</td></tr>
            <tr><th scope="row"><a href="/industries/jewelry-watch-packaging">Jewelry and watches</a></th><td>Choose the retention point and contact surface before fixing the small box footprint.</td><td>Bracelet or strap dimensions, clasp position and surfaces that must avoid rubbing.</td></tr>
            <tr><th scope="row"><a href="/industries/gift-set-pr-kit-packaging">Gift sets and PR kits</a></th><td>Plan the opening sequence alongside secure support for differently sized products.</td><td>The complete contents, cards, accessories, assembly sequence and shipping route.</td></tr>
          </tbody></table>
        </div>
        <div className="home-brief-checklist"><h3>Match presentation to the delivery route.</h3><ul>
          <li>For retail, review shelf orientation, barcode placement and how staff will assemble the pack.</li>
          <li>For gifting, check the reveal and whether the recipient can remove and replace each item.</li>
          <li>For parcel delivery, evaluate the presentation pack together with its outer carton and internal protection.</li>
        </ul></div>
        <p>A decorative rigid box should not be assumed to provide sufficient shipping protection on its own. Compare <a href="/packaging/custom-inserts">fitted insert options</a> and <a href="/packaging/corrugated-boxes">corrugated transit packaging</a> when planning the complete pack.</p>
        <p>Send product photos, dimensions, filled weights, quantity per design and destination. Include the full set if several items share one box; that information helps identify which structure to sample first.</p>
        <a className="ed-text-link" href="/request-a-quote">Send your industry packaging brief →</a>
      </section>
      <SiteFooter />
    </main>
  );
}
