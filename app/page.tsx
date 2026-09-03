import { industries } from '../lib/industries';
import { organization, siteUrl } from '../lib/seo';
import CookieSettingsButton from '../components/CookieSettingsButton';
import MTTMonogram from '../components/MTTMonogram';

const whatsapp = 'https://wa.me/8617207110964?text=Hi%20Hugo%2C%20I%20have%20a%20custom%20packaging%20project.';
const faqs = [
  ['What is the typical MOQ?', 'Most fully custom projects start from 500–1,000 pieces per design. The practical MOQ depends on the structure, materials, finishes and production method.'],
  ['Can you develop a custom structure?', 'Yes. Share the product dimensions, weight, presentation target, quantity and delivery country so the structure can be evaluated before formal pricing.'],
  ['Can I approve a sample before production?', 'Yes. Structural and printed sampling is recommended before mass production. Sampling cost and timing depend on the construction and finishes.'],
  ['Can MTT Packaging arrange international shipping?', 'Yes. Export packing and shipping terms can be planned for the destination. Freight is confirmed from the final carton count, CBM, weight and agreed trade terms.'],
  ['What is the usual lead time?', 'A typical custom order takes about 20–35 days after sample and artwork approval. Complex handmade structures and peak-season schedules may require longer.'],
];
const structuredData = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'MTT Packaging', url: siteUrl, inLanguage: 'en' },
  organization,
  { '@type': 'Person', '@id': `${siteUrl}/#hugo-he`, name: 'Hugo He', jobTitle: 'Custom Packaging Consultant', worksFor: { '@id': `${siteUrl}/#organization` }, email: 'info@mttpackaging.com', telephone: '+86 17207110964' },
  { '@type': 'Service', name: 'Custom Luxury Packaging Manufacturing', provider: { '@id': `${siteUrl}/#organization` }, areaServed: 'Worldwide', description: 'Custom rigid boxes, perfume packaging, cosmetic packaging, jewelry boxes and premium gift boxes for growing brands.', serviceType: ['Custom rigid boxes', 'Magnetic closure boxes', 'Drawer boxes', 'Perfume packaging', 'Cosmetic packaging', 'Jewelry packaging', 'Gift packaging', 'Custom inserts', 'Folding cartons', 'Paper bags'] },
  { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
] };

const processSteps = [
  ['01', 'Product & Structure', 'Dimensions, weight, presentation target and distribution channel define the starting brief.'],
  ['02', 'Sampling', 'Physical structural and printed samples confirm the design before any production commitment.'],
  ['03', 'Materials & Finishes', 'Board, wrap paper, foil, embossing, spot UV and insert surfaces are selected and tested.'],
  ['04', 'Production', 'Die-cutting, printing, hand assembly and finishing under controlled factory conditions.'],
  ['05', 'Quality Control', 'Dimensional checks, colour verification, fit testing and packaging inspection.'],
  ['06', 'Export & Delivery', 'Carton count, CBM, export packing and shipping terms coordinated to destination.'],
];

export default function Home() {
  return <main className="hp">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

    {/* Navigation */}
    <nav className="nav hp-nav" aria-label="Primary navigation">
      <a className="brand" href="#top"><MTTMonogram size={36} /><b>MTT Packaging</b></a>
      <div className="navlinks"><a href="/packaging">Products</a><a href="/industries/perfume-fragrance-packaging">Industries</a><a href="/how-we-work">Process</a><a href="/insights">Packaging Guide</a><a href="/request-a-quote">Contact</a></div>
      <a className="button small" href="/request-a-quote">Request a Quote</a>
    </nav>

    {/* WhatsApp Widget */}
    <div className="wa-widget" id="wa-widget">
      <div className="wa-panel" id="wa-panel">
        <div className="wa-panel-header"><b>Quick Question?</b><span>Choose a topic to start chatting</span></div>
        <a className="wa-option" href="https://wa.me/8617207110964?text=Hi%20Hugo!%20I%27d%20like%20to%20request%20a%20quote%20for%20custom%20packaging.%20Can%20you%20help%3F" target="_blank" rel="noreferrer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>Request a Quote</a>
        <a className="wa-option" href="https://wa.me/8617207110964?text=Hi%20Hugo!%20I%20have%20a%20question%20about%20your%20custom%20packaging%20options.%20Can%20you%20help%3F" target="_blank" rel="noreferrer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Ask About Packaging</a>
        <a className="wa-option" href="https://wa.me/8617207110964?text=Hi%20Hugo!%20What%20is%20your%20minimum%20order%20quantity%20for%20custom%20packaging%3F" target="_blank" rel="noreferrer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>Our MOQ</a>
      </div>
      <button className="wa-button" id="wa-button" aria-label="Chat on WhatsApp" onClick={"document.getElementById('wa-panel').classList.toggle('wa-panel-open');this.classList.toggle('wa-button-open');" as unknown as React.MouseEventHandler<HTMLButtonElement>}>
        <svg className="wa-icon-chat" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <svg className="wa-icon-close" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    {/* SECTION 1 — CINEMATIC HERO */}
    <section className="hp-hero" id="top">
      <div className="hp-hero-bg">
        <img src="/hero/packaging-systems.webp" alt="Custom luxury packaging collection" width="1600" height="900" fetchPriority="high" />
      </div>
      <div className="hp-hero-overlay" />
      <div className="hp-hero-content">
        <p className="hp-hero-eyebrow">MTT Packaging · China</p>
        <h1 className="hp-hero-h1">Custom Luxury<br/>Packaging<br/>Manufacturer <em>in China</em></h1>
        <p className="hp-hero-sub">Rigid boxes, perfume packaging, cosmetic packaging and premium gift boxes — developed from a real product brief, not a template.</p>
        <div className="hp-hero-actions">
          <a className="button" href="/packaging">Explore Packaging</a>
          <a className="hp-hero-outline" href="#quote">Start a Project</a>
        </div>
      </div>
    </section>

    {/* SECTION 2 — BRAND STATEMENT */}
    <section className="hp-statement hp-reveal">
      <blockquote className="hp-statement-quote">
        Packaging should feel as exceptional<br/>as the product inside.
      </blockquote>
      <p className="hp-statement-sub">Custom engineering, premium materials and production-quality sampling — before any commitment to manufacture.</p>
    </section>

    {/* SECTION 3 — FEATURED PACKAGING */}
    <section className="hp-industries">
      <header className="hp-section-header hp-reveal">
        <p className="hp-kicker">Featured Industries</p>
        <h2 className="hp-section-h2">Packaging built around<br/>what you need to protect.</h2>
      </header>
      <div className="hp-industry-rows">
        {industries.map((item, i) => (
          <a href={`/industries/${item.slug}`} className="hp-industry-row hp-reveal" key={item.slug}>
            <div className="hp-industry-img">
              <img src={item.image} alt={item.imageAlt} width="800" height="800" loading={i < 2 ? 'eager' : 'lazy'} />
            </div>
            <div className="hp-industry-text">
              <span className="hp-industry-num">0{i + 1}</span>
              <h3>{item.eyebrow === 'Gift sets & PR kits' ? 'Gift Sets & PR Kits' : item.eyebrow}</h3>
              <p>{item.summary}</p>
              <span className="hp-industry-link">Explore solution →</span>
            </div>
          </a>
        ))}
      </div>
    </section>

    {/* SECTION 4 — CRAFTSMANSHIP */}
    <section className="hp-craft hp-reveal">
      <div className="hp-craft-img">
        <img src="/craft-editorial.webp" alt="Red wishloom rigid box with eucalyptus skincare products" width="1179" height="1179" loading="lazy" />
        <img src="/craft-detail.webp" alt="Magnetic closure detail on premium rigid box" width="1179" height="1179" loading="lazy" className="hp-craft-detail" />
      </div>
      <div className="hp-craft-content">
        <p className="hp-kicker">Craftsmanship</p>
        <h2 className="hp-section-h2">The detail is<br/>the difference.</h2>
        <p className="hp-craft-sub">Foil stamping · Embossing · Specialty paper · Custom inserts — every surface and join is specified before production begins.</p>
        <a className="hp-craft-link" href="/how-we-work">How we work →</a>
      </div>
    </section>

    {/* SECTION 5 — FROM CONCEPT TO PRODUCTION */}
    <section className="hp-process" id="process">
      <header className="hp-section-header hp-reveal">
        <p className="hp-kicker">Process</p>
      </header>
      <div className="hp-process-grid">
        <div className="hp-process-left">
          <h2 className="hp-process-h2 hp-reveal">From Concept<br/>to Production</h2>
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
        <p className="hp-kicker">Selected Work</p>
        <h2 className="hp-section-h2">Production evidence,<br/>not stock renders.</h2>
      </header>
      <div className="hp-selected-grid">
        {[['Magnetic presentation box', '/structure/structure-1.webp'], ['Drawer presentation box', '/structure/structure-3.webp'], ['Custom fitted interior', '/structure/structure-6.webp']].map(([title, img], i) => (
          <figure className="hp-selected-fig hp-reveal" key={title as string} style={{ transitionDelay: `${i * 100}ms` }}>
            <img src={img as string} alt={`${title} custom packaging`} width="900" height="600" loading="lazy" />
            <figcaption><span>0{i + 1}</span><b>{title}</b></figcaption>
          </figure>
        ))}
      </div>
      <div className="hp-selected-cta hp-reveal">
        <a className="button" href="/packaging">View All Structures →</a>
      </div>
    </section>

    {/* SECTION 7 — TRUST */}
    <section className="hp-trust hp-reveal">
      <div className="hp-trust-inner">
        <p className="hp-kicker">Commercial Information</p>
        <div className="hp-trust-items">
          {[
            ['500 pcs', 'Minimum Order Quantity'],
            ['Physical sample', 'Before production commitment'],
            ['Custom engineering', 'Structure, insert, material'],
            ['Worldwide shipping', 'Export packing and logistics'],
          ].map(([title, sub]) => (
            <div className="hp-trust-item" key={title}><b>{title}</b><span>{sub}</span></div>
          ))}
        </div>
      </div>
    </section>

    {/* SECTION 8 — START A PROJECT */}
    <section className="hp-quote" id="quote">
      <div className="hp-quote-grid">
        <div className="hp-quote-info hp-reveal">
          <p className="hp-kicker">Start a Project</p>
          <h2 className="hp-section-h2">Have a<br/>Packaging<br/>Project?</h2>
          <p className="hp-quote-sub">Share your product details and Hugo will respond within 24 hours with a focused recommendation.</p>
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
            <span>✓ MOQ from 500 pcs</span>
          </div>
        </div>
        <div className="hp-quote-form hp-reveal">
          <form action="https://formspree.io/f/xyeyzwpw" method="POST">
            <input type="hidden" name="_subject" value="Homepage Detailed Quote Request" />
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
                <select name="structure" className="form-input"><option value="">Select type</option><option value="Rigid Box">Rigid Box</option><option value="Folding Carton">Folding Carton</option><option value="Paper Bag">Paper Bag</option><option value="Custom Insert">Custom Insert</option><option value="Not sure">Not sure</option></select>
              </label>
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Quantity</span>
                <select name="quantity" className="form-input"><option value="">Select quantity</option><option value="500-1,000">500–1,000</option><option value="1,000-5,000">1,000–5,000</option><option value="5,000-10,000">5,000–10,000</option><option value="10,000+">10,000+</option></select>
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
          </form>
        </div>
      </div>
    </section>

    {/* Payment */}
    <section className="payment-section"><p className="section-kicker">Payment Options</p><div className="payment-cards"><div className="payment-card"><svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#F2EFE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg><b>Bank Transfer</b><p>Available for confirmed production orders.</p></div><div className="payment-card"><svg width="42" height="42" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.5 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v2" stroke="#F2EFE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><text x="6" y="18" fontFamily="Georgia, serif" fontSize="13" fontWeight="700" fill="#B89A61" letterSpacing="0.04em">PP</text></svg><b>PayPal</b><p>Available for eligible payments.</p></div></div><p className="payment-note">Available payment methods may depend on order value, project stage and transaction arrangements confirmed with MTT Packaging.</p></section>

    {/* Footer */}
    <footer className="site-footer v2-footer"><div><a className="brand" href="#top"><MTTMonogram size={36} /><b>MTT Packaging</b></a><p>High-end custom packaging, handled directly from brief to production.</p></div><div><b>Business email</b><a href="mailto:info@mttpackaging.com">info@mttpackaging.com</a></div><div><b>WhatsApp</b><a href={whatsapp} target="_blank" rel="noreferrer">+86 17207110964</a><span>Typical MOQ: 500–1,000 pcs</span></div><div><b>Navigate</b><a href="/industries/perfume-fragrance-packaging">Industries</a><a href="#projects">Portfolio</a><a href="#process">Process</a><a href="#quote">Contact</a></div></footer>
    <div className="footer-legal"><nav aria-label="Legal links"><a href="/privacy-policy">Privacy Policy</a><a href="/cookie-policy">Cookie Policy</a><CookieSettingsButton /></nav><p>© {new Date().getFullYear()} MTT Packaging. All rights reserved.</p></div>
    <script dangerouslySetInnerHTML={{ __html: `if(!window.matchMedia('(prefers-reduced-motion:reduce)').matches){const o=new IntersectionObserver((e)=>{e.forEach((s)=>{if(s.isIntersecting){s.target.classList.add('hp-visible');o.unobserve(s.target)}})},{threshold:0.12});document.querySelectorAll('.hp-reveal').forEach((el)=>o.observe(el))}else{document.querySelectorAll('.hp-reveal').forEach((el)=>el.classList.add('hp-visible'))}` }} />
  </main>;
}
