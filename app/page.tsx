import type { Metadata } from 'next';
import VisualCaseLink from "../components/VisualCaseLink";
import QuoteForm from '../components/QuoteForm';
import HomeImageMotion from '../components/HomeImageMotion';
import { industries } from '../lib/industries';
import { organization, siteUrl } from '../lib/seo';
import { SiteNav, SiteFooter } from '../components/SiteNav';

export const metadata: Metadata = {
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

const homeIndustryImages: Record<string, { src: string; alt: string }> = {
  'perfume-fragrance-packaging': { src: '/design/home-v4/perfume.webp', alt: 'Black hinged perfume discovery box with champagne fitted insert, a perfume bottle and three sample vials' },
  'cosmetics-skincare-packaging': { src: '/design/home-v4/skincare.webp', alt: 'Turquoise lift-off lid skincare box with a separate lid, pink fitted insert, dropper bottle, cream jar and tube' },
  'jewelry-watch-packaging': { src: '/design/home-v4/jewelry.webp', alt: 'Emerald watch and jewelry presentation box with a padded watch cushion and a separate bracelet compartment' },
  'gift-set-pr-kit-packaging': { src: '/design/home-v4/gifts.webp', alt: 'Magenta double-door gift box with a sealed candle, tea tin, fitted interior, matching card and ribbon' },
};

export default function Home() {
  return <main className="hp home-v4" id="main-content">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

    <HomeImageMotion />
    <SiteNav />
    <section className="ed-hero" id="top">
      <div className="ed-hero-copy">
        <p className="ed-eyebrow">Custom packaging supplier · Shenzhen, China</p>
        <h1>Custom luxury boxes, made around your product.</h1>
        <p className="ed-lead">Rigid gift boxes, folding cartons, mailers, paper bags and fitted inserts for perfume, cosmetics, jewelry and gift brands. Developed, sampled and produced in China, shipped worldwide.</p>
        <div className="ed-actions"><a className="button" href="/request-a-quote">Get a Quote <span aria-hidden="true">→</span></a><a className="ed-text-link" href="/products">Browse 240 box designs</a></div>
        <ul className="hp-hero-points"><li>MOQ 1,000 pieces per design</li><li>Physical sample before production</li><li>Reply within 24 hours</li></ul>
      </div>
      <div className="home-hero-scene"><div className="home-hero-plane"><img data-home-image="hero" className="ed-hero-image" src="/design/home-v4/hero-v5.webp" srcSet="/design/home-v4/hero-v5-480.webp 480w, /design/home-v4/hero-v5-800.webp 800w, /design/home-v4/hero-v5.webp 1448w" sizes="(max-width: 850px) calc(100vw - 48px), 53vw" alt="Cobalt blue rigid gift box with a separate lift-off lid, fitted perfume bottles, an apricot paper bag and matching gift card" width="1448" height="1086" fetchPriority="high" /></div></div>
    </section>
    <section className="hp-facts" aria-label="Key commercial facts"><dl>{keyFacts.map(([value,label])=><div key={value}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
    <nav className="hp-paths" aria-labelledby="buyer-paths-title"><h2 id="buyer-paths-title">Find what you need</h2><div>{buyerPaths.map(([title,desc,href])=><a href={href} key={href}><b>{title} <span aria-hidden="true">→</span></b><span>{desc}</span></a>)}</div></nav>
    <section className="ed-collection">
      <header className="ed-section-heading"><h2>Custom packaging we develop.</h2><p>Four packaging families, each sized around your product and matched with inserts, finishes and bags.</p></header>
      <div className="ed-product-grid">
        {[
          ['Rigid Boxes','/design/rigid-editorial.webp','custom-rigid-boxes','Wrapped rigid board, fitted interiors and controlled presentation for premium products.','Forest green rigid perfume box with a separate lift-off lid, gold foil mark and cream fitted insert holding the bottle'],
          ['Folding Cartons','/design/carton-editorial.webp','folding-cartons','Lightweight paperboard structures with vivid print, coatings and efficient pack-out.','Three folding cartons with tuck-end flaps: a green carton, an open botanical-printed ivory carton and a long ivory carton'],
          ['Corrugated Boxes','/products/mtt-e0101-0.webp','corrugated-boxes','Custom kraft mailers with fitted paper inserts, printed branding and matching gift cards.','Open kraft corrugated gift mailer with a fitted insert holding a ceramic mug, tea jar, wrapped cookie and small carton, beside a matching card'],
          ['Paper Bags','/capability-paper-bags.webp','custom-paper-bags','Coordinated retail bags with reinforced tops, custom handles, tissue and gift accessories.','Two terracotta paper shopping bags with cream rope handles, folded tops and a blind-embossed mark'],
        ].map(([title,img,slug,desc,alt])=><a className="ed-product" href={'/packaging/'+slug} key={slug}><span className="home-image-frame"><img data-home-image="collection" src={img} alt={alt} srcSet={slug==='corrugated-boxes'?`${img} 500w`:slug==='custom-paper-bags'?`${img.replace('.webp', '-480.webp')} 480w, ${img} 900w`:`${img.replace('.webp', '-480.webp')} 480w, ${img.replace('.webp', '-800.webp')} 800w, ${img} 1440w`} sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 1000px) 45vw, 23vw" width={slug==='corrugated-boxes'?500:1200} height={slug==='corrugated-boxes'?500:900} style={{objectFit:'cover'}} loading="lazy"/></span><h3>{title}</h3><p>{desc}</p><span className="ed-text-link">Explore {title} <span aria-hidden="true">→</span></span></a>)}
      </div>
    </section>
    {/* SECTION 3 — FEATURED PACKAGING */}
    <section className="hp-industries">
      <header className="hp-section-header hp-reveal">
        <p className="hp-kicker">Featured Industries</p>
        <h2 className="hp-section-h2">Packaging for your<br/>industry.</h2>
      </header>
      <div className="hp-industry-rows">
        {industries.map((item, i) => {
          const homeImage = homeIndustryImages[item.slug] ?? { src: item.image, alt: item.imageAlt };
          return (
          <a href={`/industries/${item.slug}`} className="hp-industry-row hp-reveal" key={item.slug}>
            <div className="hp-industry-img">
              <img data-home-image="industry" src={homeImage.src} alt={homeImage.alt} srcSet={`${homeImage.src.replace('.webp', '-480.webp')} 480w, ${homeImage.src} 1200w`} sizes="(max-width: 600px) calc(100vw - 48px), (max-width: 1100px) 45vw, 23vw" width="1200" height="900" loading="lazy" />
            </div>
            <div className="hp-industry-text">
              <span className="hp-industry-num">0{i + 1}</span>
              <h3>{item.eyebrow === 'Gift sets & PR kits' ? 'Gift Sets & PR Kits' : item.eyebrow}</h3>
              <p>{item.summary}</p>
              <span className="hp-industry-link">Explore solution →</span>
            </div>
          </a>
        )})}
      </div>
    </section>

    <section className="hp-why" aria-labelledby="why-mtt-title">
      <div className="hp-why-media"><img src="/design/development-worktable.webp" srcSet="/design/development-worktable-800.webp 800w, /design/development-worktable.webp 1440w" sizes="(max-width: 900px) calc(100vw - 48px), 44vw" width="1440" height="1080" loading="lazy" alt="Packaging development table with a green rigid box, an open ivory sample box, a tuck-end carton, board and paper swatches and structure sketches" /></div>
      <div className="hp-why-copy">
        <p className="hp-kicker">Why MTT Packaging</p>
        <h2 id="why-mtt-title">One accountable contact, from brief to delivery.</h2>
        <p>MTT Packaging is based in Shenzhen, China. One direct contact coordinates specification, sampling, production and delivery details, so structure, print, insert and packing decisions stay in one place.</p>
        <ul>
          <li><b>Structure and insert engineering</b><span>Magnetic, lift-off, drawer, shoulder-neck and carton structures in custom dimensions, with paper, molded pulp, EVA or fabric-covered inserts.</span></li>
          <li><b>Materials and finishes</b><span>Board, wrapping paper, foil, embossing, spot UV and lamination specified per component and confirmed on a physical sample.</span></li>
          <li><b>Quality checks at each stage</b><span>Material, printing, finishing, assembly and packing checks; print colours compared against Pantone references and approved proofs.</span></li>
          <li><b>Export packing and delivery</b><span>Carton count, CBM, labelling and shipping terms confirmed for your destination.</span></li>
        </ul>
        <div className="hp-why-contact"><div><b>Hugo He</b><span>Custom packaging consultant · replies within 24 hours</span></div><a className="button" href="/request-a-quote">Send your brief →</a><a className="ed-text-link" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp Hugo</a></div>
      </div>
    </section>

    {/* SECTION 4 — CRAFTSMANSHIP */}
    <section className="hp-craft hp-craft-gallery hp-reveal" aria-labelledby="craft-heading">
      <header className="hp-craft-heading">
        <div><p className="hp-kicker">Craftsmanship</p><h2 className="hp-section-h2" id="craft-heading">The detail is the difference.</h2></div>
        <div><p className="hp-craft-sub">Compare surface finishes and paper textures. Confirm your chosen combination on a physical sample before production.</p><a className="hp-craft-link" href="/how-we-work">How we work →</a></div>
      </header>
      <div className="hp-finish-grid">
        {[
          ['foil','Foil stamping','Metallic lines on textured wrapping paper','Copper foil fan lines across a fuchsia rigid box corner'],
          ['emboss','Blind embossing','Raised detail without printed colour','Raised waves on ivory paper wrapping a rigid box'],
          ['deboss','Debossing','Recessed lettering pressed into the surface','Recessed letter M on a deep blue paper-wrapped box'],
          ['uv','Spot UV','Gloss detail against a matte background','Glossy leaf pattern on a plum purple box surface'],
          ['lamination','Matte & gloss lamination','Compare two surface reflections','Matching printed boxes showing matte and gloss surface finishes'],
          ['paper','Specialty paper','Explore tactile wrapping textures','Fanned paper swatches showing varied textured wrapping papers'],
        ].map(([id,title,description,alt])=><figure key={id}>
          <div className="home-image-frame"><img data-home-image="finish" src={`/design/craft-gallery/${id}.webp`} srcSet={`/design/craft-gallery/${id}-480.webp 480w, /design/craft-gallery/${id}.webp 800w`} sizes="(max-width:600px) calc((100vw - 62px)/2), (max-width:1000px) calc((100vw - 72px)/2), 30vw" width="800" height="600" loading="lazy" alt={alt}/></div>
          <figcaption><h3>{title}</h3><p>{description}</p></figcaption>
        </figure>)}
      </div>
    </section>

    {/* SECTION 5 — FROM CONCEPT TO PRODUCTION */}
    <section className="hp-process" id="process">
      <header className="hp-section-header hp-reveal">
        <p className="hp-kicker">Process</p>
      </header>
      <div className="hp-process-grid">
        <div className="hp-process-left">
          <h2 className="hp-process-h2 hp-reveal">From brief<br/>to delivery</h2><p className="hp-process-note">Most projects move from first brief to approved sample before any production commitment. <a href="/how-we-work">See how we work →</a></p>
        </div>
        <div className="hp-process-right">
          {processSteps.map(([num, title, desc], i) => (
            <div className="hp-process-step hp-reveal" key={num} style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="hp-process-num">{num}</span>
              <div>
                <b>{title}</b>
                <p>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* SECTION 6 — SELECTED PACKAGING */}
    <section className="hp-selected" id="projects">
      <header className="hp-section-header hp-reveal">
        <p className="hp-kicker">Packaging Details</p>
        <h2 className="hp-section-h2">A closer look at<br/>packaging possibilities.</h2>
      </header>
      <div className="hp-selected-grid">
        {[['Magnetic presentation box', '/design/home-v4/magnetic.webp', 'Yellow hinged rigid perfume box with a full-width magnetic closure flap and navy fitted insert'], ['Drawer presentation box', '/design/home-v4/drawer.webp', 'Teal rigid sleeve with a terracotta drawer pulled straight out to reveal three tea tins and dividers'], ['Custom fitted interior', '/design/home-v4/insert.webp', 'Peach rigid skincare box with a fibrous fitted insert holding a serum bottle, cream jar and tube']].map(([title, img, alt], i) => (
          <figure className="hp-selected-fig hp-reveal" key={title as string} style={{ transitionDelay: `${i * 100}ms` }}>
            <div className="home-image-frame"><img data-home-image="detail" src={img as string} alt={alt} srcSet={`${img.replace('.webp', '-480.webp')} 480w, ${img} 1200w`} sizes="(max-width: 650px) calc(100vw - 48px), 32vw" width="1200" height="900" loading="lazy" /></div>
            <figcaption><span>0{i + 1}</span><b>{title}</b></figcaption><VisualCaseLink image={img}/>
          </figure>
        ))}
      </div>
      <div className="hp-selected-cta hp-reveal">
        <a className="button" href="/packaging">View All Structures →</a>
      </div>
    </section>

    <section className="hp-guides" aria-labelledby="buyer-guides-title">
      <header><p className="hp-kicker">Buyer guides</p><h2 id="buyer-guides-title">Plan your order with fewer sampling rounds.</h2><p>Practical guides on briefs, costs, structures, materials and sample approval.</p></header>
      <ol>{buyerGuides.map(([title,href])=><li key={href}><a href={href}>{title} <span aria-hidden="true">→</span></a></li>)}</ol>
      <a className="ed-text-link" href="/insights">All 50+ packaging guides →</a>
    </section>

    <section className="home-buyer-faq" aria-labelledby="buyer-questions">
      <header><p className="hp-kicker">Buyer FAQ</p><h2 id="buyer-questions">Custom packaging questions, answered.</h2><p>MOQ, sampling, lead time, shipping, quality and payment before you request a quote.</p></header>
      <div>{faqs.map(([question,answer])=><details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      <a className="ed-text-link" href="/request-a-quote">Discuss your packaging brief →</a>
    </section>

    {/* SECTION 8 — START A PROJECT */}
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

    <SiteFooter />
  </main>;
}
