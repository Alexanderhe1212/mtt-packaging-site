import type { Metadata } from 'next';
import QuoteForm from '../components/QuoteForm';
import { organization, siteUrl } from '../lib/seo';
import { SiteFooter } from '../components/SiteNav';
import PortfolioNav from '../components/PortfolioNav';
import DesignDirection from '../components/DesignDirection';

export const metadata: Metadata = {
  openGraph: { siteName: 'MTT Packaging', type: 'website', url: '/', images: [{ url: '/og.jpg?v=gold-triangle', width: 1200, height: 630, alt: 'MTT Packaging custom packaging' }] },
  alternates: { canonical: '/', languages: { en: '/', 'zh-Hans': '/zh', 'x-default': '/' } },
  title: 'Custom Luxury Packaging Boxes Supplier in China | MTT Packaging',
  description: 'Custom rigid boxes, folding cartons, mailers, paper bags and inserts for perfume, cosmetics, jewelry and gift brands. MOQ 1,000 per design, sample first, shipped worldwide.',
};

const packagingChoices = [
  { name: 'Rigid Boxes', path: '/packaging/custom-rigid-boxes', use: 'Gift sets and products needing a shaped presentation box.', check: 'Confirm the insert fit, opening clearance and packed shipping dimensions.' },
  { name: 'Folding Cartons', path: '/packaging/folding-cartons', use: 'Retail products using folding paperboard packaging.', check: 'Review the closure, product weight, crease quality and assembly sequence.' },
  { name: 'Corrugated Boxes', path: '/packaging/corrugated-boxes', use: 'Mailers and transit packaging with dividers or fitted inserts.', check: 'Match the board and internal support to the shipping route; agree on transit checks.' },
  { name: 'Paper Bags', path: '/packaging/custom-paper-bags', use: 'A coordinated carrying bag for a boxed product or gift set.', check: 'Check the finished box fits, then review handles and base support with the intended load.' },
];

const whatsapp = 'https://wa.me/8617207110964?text=Hi%20Hugo%2C%20I%20have%20a%20custom%20packaging%20project.';
const faqs = [
  ['What is the minimum order quantity?', 'The minimum order quantity is 1,000 pieces per design. The final specification and quotation depend on the structure, materials, finishes and production method.'],
  ['Can you develop a custom structure?', 'Yes. Share the product dimensions, weight, presentation target, quantity and delivery country so the structure can be evaluated before formal pricing.'],
  ['Can I approve a sample before production?', 'Yes. Structural and printed sampling is recommended before mass production. Sampling cost and timing depend on the construction and finishes.'],
  ['Can MTT Packaging arrange international shipping?', 'Yes. Export packing and shipping terms can be planned for the destination. Freight is confirmed from the final carton count, CBM, weight and agreed trade terms.'],
  ['What is the usual lead time?', 'A typical custom order takes about 20–35 days after sample and artwork approval. Complex handmade structures and peak-season schedules may require longer.'],
  ['What information do you need for a quote?', 'Send product length × width × height, weight, quantity per design, delivery country and your required date. Add a product photo and artwork or reference links if available, and mark undecided materials or finishes so they can be reviewed.'],
  ['How are print colours and quality checked?', 'Print colours are compared against Pantone references and approved proofs, and finished units are inspected for visual defects, dimensions, function and specification compliance. For projects requiring third-party inspection, MTT Packaging can coordinate with inspection services selected by the buyer.'],
  ['Which payment methods are available?', 'Bank transfer is available for confirmed production orders and PayPal for eligible payments. Available methods may depend on order value, project stage and the arrangements confirmed with MTT Packaging.'],
];
const keyFacts = [
  ['1,000 pcs', 'Minimum order per design'],
  ['Sample first', 'Physical sample before production'],
  ['20–35 days', 'Typical production after approval'],
  ['Worldwide', 'Export packing and shipping'],
  ['24 hours', 'Reply to every brief'],
];
const buyerPaths = [
  ['By packaging type', 'Rigid boxes, folding cartons, mailers, paper bags and inserts.', '/packaging'],
  ['By industry', 'Perfume, cosmetics, jewelry & watches, gift sets and PR kits.', '/industries'],
  ['Browse 240 designs', 'Filter ready-to-customise structures by product and family.', '/products'],
  ['Plan your box size', 'Work out the internal size, then send it with your quote.', '/tools/box-size-calculator'],
];
const buyerGuides = [
  ['Custom Packaging Brief Checklist: What to Send for a Quote', '/insights/how-to-write-a-packaging-brief'],
  ['Custom Packaging Costs: How to Compare a Box Quotation', '/insights/custom-packaging-cost-guide'],
  ['Packaging Sample Approval: What to Check Before Production', '/insights/custom-packaging-sampling-process'],
  ['Custom Box Structures: Lift-Off, Magnetic, Drawer or Carton?', '/insights/custom-box-structure-guide'],
  ['Choosing Board and Wrapping Paper for a Premium Box', '/insights/packaging-material-selection'],
  ['Packaging Design to Production in China: Boxes, Bags & Gift Sets', '/insights/packaging-design-to-production-china'],
];
const structuredData = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'MTT Packaging', url: siteUrl, inLanguage: 'en' },
  organization,
  { '@type': 'WebPage', '@id': `${siteUrl}/#webpage`, url: `${siteUrl}/`, name: 'Custom Luxury Packaging Boxes Supplier in China | MTT Packaging', inLanguage: 'en', isPartOf: { '@id': `${siteUrl}/#website` }, about: { '@id': `${siteUrl}/#organization` }, mainEntity: { '@id': `${siteUrl}/#packaging-families` } },
  { '@type': 'ItemList', '@id': `${siteUrl}/#packaging-families`, name: 'Custom packaging families', itemListElement: packagingChoices.map((item, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'WebPage', name: item.name, url: `${siteUrl}${item.path}` } })) },
  { '@type': 'Person', '@id': `${siteUrl}/#hugo-he`, name: 'Hugo He', jobTitle: 'Custom Packaging Consultant', worksFor: { '@id': `${siteUrl}/#organization` }, email: 'info@mttpackaging.com', telephone: '+86 17207110964' },
  { '@type': 'Service', name: 'Custom Luxury Packaging Manufacturing', provider: { '@id': `${siteUrl}/#organization` }, areaServed: 'Worldwide', description: 'Custom rigid boxes, perfume packaging, cosmetic packaging, jewelry boxes and premium gift boxes for growing brands.', serviceType: ['Custom rigid boxes', 'Magnetic closure boxes', 'Drawer boxes', 'Perfume packaging', 'Cosmetic packaging', 'Jewelry packaging', 'Gift packaging', 'Custom inserts', 'Folding cartons', 'Paper bags'] },
  { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
] };

const processSteps = [
  ['01', 'Product & Structure', 'Dimensions, weight, presentation target and distribution channel define the starting brief.'],
  ['02', 'Sampling', 'Physical structural and printed samples confirm the design before any production commitment.'],
  ['03', 'Materials & Finishes', 'Board, wrap paper, foil, embossing, spot UV and insert surfaces are selected and tested.'],
  ['04', 'Production', 'Die-cutting, printing, hand assembly and finishing coordinated through suitable manufacturing capabilities.'],
  ['05', 'Quality Control', 'Dimensional checks, colour verification, fit testing and packaging inspection.'],
  ['06', 'Export & Delivery', 'Carton count, CBM, export packing and shipping terms coordinated to destination.'],
];

const selected = [
  {name:'Lift-off rigid boxes',type:'01 / Rigid presentation',image:'/design/portfolio-preview/colour-rigid.webp',alt:'Indigo lift-off rigid box with ivory tissue',href:'/packaging/custom-rigid-boxes',className:'work-large'},
  {name:'Drawer boxes',type:'02 / Drawer boxes',image:'/design/portfolio-preview/colour-drawer.webp',alt:'Saffron drawer box with ivory paper insert',href:'/products?family=rigid&structure=drawer',className:'work-small'},
  {name:'Paper bags',type:'03 / Paper bags',image:'/design/portfolio-preview/colour-bag.webp',alt:'Indigo paper bag with ivory ribbon handles',href:'/packaging/custom-paper-bags',className:'work-small'},
  {name:'Folds flat. Presents beautifully.',type:'04 / Fold-flat structures',image:'/design/fold-flat-editorial.webp',alt:'Forest green magnetic rigid box shown formed and partially folded',href:'/products?family=rigid&structure=fold-flat',className:'work-large'},
];
export default function Home(){return <main className="portfolio-home portfolio-scope" id="main-content">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/>
  <PortfolioNav/>
  <section className="pf-hero">
    <div className="pf-hero-top"><p className="pf-eyebrow">Packaging for brands & design studios</p><span className="pf-small-note">Ideas into objects. / MTT Packaging</span></div>
    <h1>Good design.<br/><span>Made <em>tangible.</em></span></h1>
    <div className="pf-hero-bottom"><div className="pf-intro"><p>Custom boxes, bags and inserts for brands and design studios.</p><div className="ed-actions"><a className="pf-button" href="/request-a-quote">Discuss your project <span aria-hidden="true">↗</span></a><a className="pf-text-link" href="/products">Explore packaging <span aria-hidden="true">→</span></a></div></div><figure className="pf-hero-visual"><img data-portfolio-hero="true" src="/design/portfolio-preview/colour-hero.webp" srcSet="/design/portfolio-preview/colour-hero-640.webp 640w, /design/portfolio-preview/colour-hero.webp 1600w" sizes="100vw" width="1440" height="960" fetchPriority="high" alt="Indigo and saffron rigid boxes with translucent ivory paper"/><figcaption>Packaging concept / Colour, form & the opening moment</figcaption></figure></div>
  </section>
  <section className="pf-work" aria-labelledby="selected-title"><header className="pf-section-head"><div><p className="pf-eyebrow">Selected packaging</p><h2 id="selected-title">Packaging, considered.</h2></div><a className="pf-text-link" href="/products">Explore all packaging ↗</a></header><div className="pf-work-grid">{selected.slice(0,3).map(x=><a key={x.type} className={'pf-work-item '+x.className} href={x.href}><div className="pf-work-image"><img src={x.image} alt={x.alt} loading="lazy" width="1200" height="900"/></div><div className="pf-work-caption"><div><p>{x.type}</p><h3>{x.name}</h3></div><span aria-hidden="true">↗</span></div></a>)}</div><p className="pf-concept-note">Design concepts from our packaging collection. Materials and fit are developed through sampling.</p></section>
  <section className="pf-details" aria-labelledby="detail-title"><header className="pf-section-head"><div><p className="pf-eyebrow">The close-up</p><h2 id="detail-title">Every detail,<br/><em>considered.</em></h2></div><p>A paper you can feel. A finish that catches the light. An insert that makes the opening feel right.</p></header><div className="pf-detail-grid">
    <a href="/insights/printing-finishing-guide"><img src="/design/portfolio-preview/colour-detail.webp" alt="Indigo and saffron textured paper with blind deboss detail" width="500" height="500" loading="lazy"/><h3>Surface & finish <span>↗</span></h3><p>Texture, print, foil and deboss.</p></a>
    <a href="/packaging/custom-inserts"><img src="/design/perfume-insert-editorial.webp" alt="Fitted perfume insert showing bottle support and removal access" width="1200" height="900" loading="lazy"/><h3>Fit & protection <span>↗</span></h3><p>The inside deserves equal attention.</p></a>
    <a href="/insights/custom-box-structure-guide"><img src="/products/mtt-r1201-5.webp" alt="Fold-flat rigid box structure with insert removed" width="500" height="500" loading="lazy"/><h3>Structure & opening <span>↗</span></h3><p>From a flat sheet to a finished form.</p></a>
  </div></section>
  <section className="pf-studio"><figure><img src="/design/portfolio-preview/colour-worktable.webp" width="800" height="600" loading="lazy" alt="Packaging development concept with board samples, drawings and box structures"/><figcaption>Material & structure study · Concept visualization</figcaption></figure><div><p className="pf-eyebrow">For creative teams</p><h2>Your vision.<br/>Our production<br/><em>know-how.</em></h2><p>Bring the idea, artwork or first sketch. We can help you work through structure, materials, sampling and production—so the finished packaging carries the intention of the design.</p><a className="pf-text-link" href="/how-we-work">See how we work ↗</a><a className="pf-text-link" href="/tools/gift-box-solution-builder">Explore the packaging studio ↗</a></div></section>
  <section className="pf-process"><header className="pf-section-head"><div><p className="pf-eyebrow">A practical path forward</p><h2>From first thought<br/><em>to finished pack.</em></h2></div><p>Clear specifications. Physical samples. An agreed route to production.</p></header><div>{processSteps.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></section>
  <section className="pf-buyer"><div className="pf-facts"><h2>Before we begin.</h2><dl>{keyFacts.map(([v,l])=><div key={l}><dt>{l}</dt><dd>{v}</dd></div>)}</dl></div><div className="pf-buyer-content"><h2>Find the right starting point.</h2><div className="pf-family-links">{packagingChoices.map(x=><details key={x.path}><summary>{x.name}</summary><p>{x.use} {x.check}</p><a href={x.path}>Explore {x.name.toLowerCase()} →</a></details>)}</div><nav aria-label="Buyer tools">{buyerPaths.map(([title,desc,href])=><a href={href} key={href} title={desc}>{title} ↗</a>)}</nav><details className="pf-guide-list"><summary>Planning guides</summary><ul>{buyerGuides.map(([title,href])=><li key={href}><a href={href}>{title}</a></li>)}</ul></details></div></section>
  <section className="pf-faq"><header><p className="pf-eyebrow">Useful to know</p><h2>A few good<br/><em>questions.</em></h2></header><div>{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    <section className="hp-quote" id="quote">
      <div className="hp-quote-grid">
        <div className="hp-quote-info hp-reveal">
          <p className="hp-kicker">Start a Project</p>
          <h2 className="hp-section-h2">Request a<br/>packaging quote</h2>
          <p className="hp-quote-sub">Share your product details and Hugo will respond within 24 hours with a focused recommendation.</p>
          <div className="hp-quote-checklist"><b>For an accurate quote, include:</b><ul><li>Product dimensions, weight and every item in the set</li><li>Quantity per design (MOQ 1,000 pieces)</li><li>Preferred opening, materials, finishes and artwork references</li><li>Delivery country and target timing</li></ul></div>
          <div className="hp-quote-channels">
            <a className="v2-quote-wa" href={whatsapp} target="_blank" rel="noreferrer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <div><b>WhatsApp Hugo</b><span>Fastest response · Usually within 1 hour</span></div>
            </a>
            <a className="v2-quote-email" href="mailto:info@mttpackaging.com">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <div><b>info@mttpackaging.com</b><span>Reply within 24 hours</span></div>
            </a>
          </div>
          <div className="hp-quote-trust">
            <span>✓ Free consultation</span>
            <span>✓ Physical sample before production</span>
            <span>✓ Minimum order: 1,000 pieces per design</span>
          </div>
        </div>
        <div className="hp-quote-form hp-reveal">
          <QuoteForm action="https://formspree.io/f/xyeyzwpw" method="POST">
            <input type="hidden" name="_subject" value="Homepage Detailed Quote Request" />
            <input type="hidden" name="_next" value="https://mttpackaging.com/thank-you" />
            <input type="text" name="_gotcha" style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} />
            <div className="form-row">
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Name</span><input name="name" type="text" required placeholder="Your name" className="form-input"/></label>
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> Email</span><input name="email" type="email" required placeholder="you@company.com" className="form-input"/></label>
            </div>
            <div className="form-row">
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> Company</span><input name="company" type="text" placeholder="Company name" className="form-input"/></label>
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> Industry</span>
                <select name="industry" className="form-input"><option value="">Select industry</option><option value="Perfume & Fragrance">Perfume & Fragrance</option><option value="Cosmetics & Skincare">Cosmetics & Skincare</option><option value="Jewelry & Watches">Jewelry & Watches</option><option value="Gift Sets & PR Kits">Gift Sets & PR Kits</option><option value="Other">Other</option></select>
              </label>
            </div>
            <div className="form-row">
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> Packaging Type</span>
                <select name="structure" className="form-input"><option value="">Select type</option><option value="Rigid Box">Rigid Box</option><option value="Folding Carton">Folding Carton</option><option value="Corrugated Box">Corrugated Box</option><option value="Paper Bag">Paper Bag</option><option value="Custom Insert">Custom Insert</option><option value="Not sure">Not sure</option></select>
              </label>
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Quantity</span>
                <select name="quantity" className="form-input"><option value="">Select quantity</option><option value="1,000-2,999">1,000–2,999</option><option value="3,000-4,999">3,000–4,999</option><option value="5,000-9,999">5,000–9,999</option><option value="10,000+">10,000+</option></select>
              </label>
            </div>
            <div className="form-row">
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Country</span>
                <input name="country" type="text" placeholder="e.g. United States" className="form-input"/>
              </label>
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Message</span>
                <textarea name="message" rows={2} placeholder="Product dimensions, finishes…" className="form-input"/>
              </label>
            </div>
            <button type="submit" className="button inverse hp-quote-submit">Send Brief →</button>
            <small>Prefer WhatsApp? <a href={whatsapp} target="_blank" rel="noreferrer">Message Hugo directly</a> for a quick response.</small>
          </QuoteForm>
        </div>
      </div>
    </section>

<SiteFooter/><DesignDirection/></main>;}
