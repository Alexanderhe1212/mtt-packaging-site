import { industries } from '../lib/industries';
import { organization } from '../lib/seo';

const whatsapp = 'https://wa.me/8617207110964?text=Hi%20Hugo%2C%20I%20have%20a%20custom%20packaging%20project.';
const faqs = [
  ['What is the typical MOQ?', 'Most fully custom projects start from 500–1,000 pieces per design. The practical MOQ depends on the structure, materials, finishes and production method.'],
  ['Can you develop a custom structure?', 'Yes. Share the product dimensions, weight, presentation target, quantity and delivery country so the structure can be evaluated before formal pricing.'],
  ['Can I approve a sample before production?', 'Yes. Structural and printed sampling is recommended before mass production. Sampling cost and timing depend on the construction and finishes.'],
  ['Can MTT Packaging arrange international shipping?', 'Yes. Export packing and shipping terms can be planned for the destination. Freight is confirmed from the final carton count, CBM, weight and agreed trade terms.'],
  ['What is the usual lead time?', 'A typical custom order takes about 20–35 days after sample and artwork approval. Complex handmade structures and peak-season schedules may require longer.'],
];
const projectReferences = [
  ['Magnetic presentation box', '/structure/structure-1.webp'], ['Lift-off lid box', '/structure/structure-2.webp'],
  ['Drawer presentation box', '/structure/structure-3.webp'], ['Shoulder-neck box', '/structure/structure-4.webp'],
  ['Fold-flat rigid box', '/structure/structure-5.webp'], ['Custom fitted interior', '/structure/structure-6.webp'],
];
const structuredData = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'WebSite', '@id': 'https://mttpackaging.com/#website', name: 'MTT Packaging', url: 'https://mttpackaging.com', inLanguage: 'en' },
  organization,
  { '@type': 'Person', '@id': 'https://mttpackaging.com/#hugo-he', name: 'Hugo He', jobTitle: 'Custom Packaging Consultant', worksFor: { '@id': 'https://mttpackaging.com/#organization' }, email: 'info@mttpackaging.com', telephone: '+86 17207110964' },
  { '@type': 'Service', name: 'Custom Luxury Packaging Manufacturing', provider: { '@id': 'https://mttpackaging.com/#organization' }, areaServed: 'Worldwide', description: 'Custom rigid boxes, perfume packaging, cosmetic packaging, jewelry boxes and premium gift boxes for growing brands.', serviceType: ['Custom rigid boxes', 'Magnetic closure boxes', 'Drawer boxes', 'Perfume packaging', 'Cosmetic packaging', 'Jewelry packaging', 'Gift packaging', 'Custom inserts', 'Folding cartons', 'Paper bags'] },
  { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
] };

export default function Home() {
  return <main className="home-v2">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="nav" aria-label="Primary navigation">
      <a className="brand" href="#top"><img src="/logo.svg" alt="MTT Packaging" width="72" height="52"/><b>MTT Packaging</b></a>
      <div className="navlinks"><a href="/packaging">Products</a><a href="#industries">Industries</a><a href="/how-we-work">Process</a><a href="/insights">Packaging Guide</a><a href="#quote">Contact</a></div>
      <a className="button small" href="#quote">Request a Quote</a>
    </nav>
    <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>

    <section className="v2-hero" id="top"><div><p className="eyebrow">MTT Packaging · Custom Luxury Packaging Manufacturer</p><h1>Custom Luxury Packaging<br/>Manufacturer <em>in China</em></h1><p>Custom rigid boxes, perfume packaging, cosmetic packaging and premium gift boxes for growing brands worldwide.</p><div className="v2-hero-trust"><span>MOQ from 500 pcs</span><span>Custom Structure &amp; Inserts</span><span>Sampling Before Production</span><span>Worldwide Shipping</span></div><div className="actions"><a className="button" href="#quote">Request a Quote →</a><a className="text-link" href="#projects">View Packaging Projects ↓</a></div></div><div className="v2-hero-image"><img src="/capability-rigid-box.webp" alt="Custom luxury rigid perfume box with fitted insert - MTT Packaging" width="1000" height="1000"/><span>Rigid structure · Precision insert · Premium finish</span></div></section>

    <section className="v2-section v2-industries" id="industries"><header><p className="section-kicker">02 / Industries</p><h2>Packaging starts with<br/>what you need to protect.</h2></header><div className="v2-industry-grid">{industries.map((item) => <a href={`/industries/${item.slug}`} key={item.slug}><img src={item.image} alt={item.imageAlt} width="700" height="700"/><p>{item.eyebrow}</p><h3>{item.eyebrow === 'Gift sets & PR kits' ? 'Premium Gifts' : item.eyebrow}</h3><span>Explore solutions →</span></a>)}</div></section>

    <section className="v2-section v2-trust"><header><p className="section-kicker">Trusted by brands worldwide</p><h2>Packaging developed for<br/>fragrance, beauty, jewelry and gifting.</h2></header><div className="v2-trust-grid">{['Niche fragrance houses','Independent cosmetics brands','Luxury jewelry designers','Corporate gifting programs','Beauty subscription boxes','Influencer PR kits','Premium candle brands','Watch and accessory labels'].map((label) => <span key={label}>{label}</span>)}</div><p className="v2-trust-note">500+ custom packaging projects shipped to 50+ countries. Each project developed from a real product brief—not a template.</p></section>

    <section className="v2-section v2-projects" id="projects"><header><div><p className="section-kicker light">03 / Production portfolio</p><h2>Real production should<br/>show the detail.</h2></div><p>This gallery is prepared for six verified MTT project photographs. Current images are marked as structure references and are not presented as client work.</p></header><div className="v2-project-grid">{projectReferences.map(([title, image], index) => <figure key={title}><img src={image} alt={`${title} structure reference`} width="800" height="600"/><figcaption><span>0{index + 1}</span><b>{title}</b><small>Structure reference · Replace with verified project photo</small></figcaption></figure>)}</div><a className="button inverse" href="/packaging">View All Structures →</a></section>

    <section className="v2-section v2-why"><header><p className="section-kicker">04 / Why MTT</p><h2>Clear decisions before<br/>production begins.</h2></header><div>{[
      ['01','Engineering Before Production','Structure, dimensions, insert, material and finishes are clarified before sampling and mass production.'],
      ['02','One Point of Contact','Hugo coordinates the commercial brief and project details from the first review through delivery.'],
      ['03','Flexible Custom Production','The production route is selected around the structure, quantity, finish requirements and target budget.'],
      ['04','Packaging Built for Delivery','Product protection, export packing, carton count, CBM and destination are considered with presentation.'],
    ].map(([n,title,copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="v2-section v2-hugo" id="hugo"><div className="v2-photo-placeholder" role="img" aria-label="Hugo He portrait photo pending"><b>HH</b><span>Add Hugo's real portrait</span></div><div><p className="section-kicker">05 / Meet Hugo</p><h2>Your direct contact<br/>for custom packaging.</h2><p>I help business buyers turn product requirements into a practical packaging brief—coordinating structure, materials, inserts, finishing, sampling and production details with one accountable point of contact.</p><div className="actions"><a className="button" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp Hugo ↗</a><a className="text-link" href="mailto:info@mttpackaging.com">Email Hugo →</a></div></div></section>

    <section className="v2-section v2-process" id="process"><header><p className="section-kicker light">06 / How we work</p><h2>From product<br/>to delivered packaging.</h2></header><ol>{['Product details','Structure recommendation','Formal quotation','Physical sample','Production & inspection','Export packing & delivery'].map((step,index) => <li key={step}><span>0{index + 1}</span><b>{step}</b></li>)}</ol></section>

    <section className="v2-section v2-craft"><header><div><p className="section-kicker">07 / Manufacturing & craftsmanship</p><h2>Production evidence,<br/>not generic claims.</h2></div><p>Use verified photographs from the actual production route so buyers can see assembly, finishing and inspection clearly.</p></header><div>{['Factory floor','Hand assembly & finishing','Quality control & packing'].map((label,index) => <figure key={label}><div className="v2-factory-placeholder"><span>0{index + 1}</span><b>Upload real production photo</b></div><figcaption>{label}</figcaption></figure>)}</div></section>

    <section className="v2-section v2-materials"><header><p className="section-kicker">08 / Materials & finishes</p><h2>Touch, structure<br/>and protection.</h2></header><div>{[
      ['Paper & board','Greyboard, paperboard, specialty paper and responsible alternatives.','/sustainability/documented-sourcing.webp'],
      ['Printing & finishing','Foil, embossing, debossing, spot UV, texture and controlled color.','/capability-folding-cartons.webp'],
      ['Custom inserts','Paperboard, molded pulp, EVA and fabric-covered protection.','/sustainability/paper-based-options.webp'],
    ].map(([title,copy,image]) => <article key={title}><img src={image} alt={`${title} packaging reference`} width="700" height="520"/><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="v2-section v2-faq" id="faq"><header><p className="section-kicker">09 / Buyer questions</p><h2>Before you request<br/>a custom quote.</h2></header><div>{faqs.map(([q,a],index) => <details key={q} open={index === 0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>

    <section className="v2-section v2-quote" id="quote">
      <div className="v2-quote-grid">
        <div className="v2-quote-info">
          <p className="section-kicker light">10 / Start a project</p>
          <h2>Have a Packaging Project?</h2>
          <p>Share your product details and Hugo will respond within 24 hours with a focused recommendation.</p>
          <div className="v2-quote-channels">
            <a className="v2-quote-wa" href={whatsapp} target="_blank" rel="noreferrer">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              <div><b>WhatsApp Hugo</b><span>Fastest response · Usually within 1 hour</span></div>
            </a>
            <a className="v2-quote-email" href="mailto:info@mttpackaging.com">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <div><b>info@mttpackaging.com</b><span>Reply within 24 hours</span></div>
            </a>
          </div>
          <div className="v2-quote-trust">
            <span>✓ Free consultation</span>
            <span>✓ Physical sample before production</span>
            <span>✓ MOQ from 500 pcs</span>
          </div>
        </div>
        <div className="v2-quote-form">
          <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); const name = fd.get('name'); const company = fd.get('company'); const industry = fd.get('industry'); const structure = fd.get('structure'); const quantity = fd.get('quantity'); const country = fd.get('country'); const message = fd.get('message'); const subject = `Quote Request: ${industry} - ${country} - MTT Packaging`; const body = `Name: ${name}\nCompany: ${company}\nIndustry: ${industry}\nPackaging Type: ${structure}\nEstimated Quantity: ${quantity}\nCountry: ${country}\n\nMessage:\n${message}`; window.location.href = `mailto:info@mttpackaging.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; }}>
            <div className="form-row">
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Name</span><input name="name" type="text" required placeholder="Your name" className="form-input"/></label>
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> Company</span><input name="company" type="text" placeholder="Company name" className="form-input"/></label>
            </div>
            <div className="form-row">
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> Industry</span>
                <select name="industry" className="form-input"><option value="">Select industry</option><option value="Perfume & Fragrance">Perfume & Fragrance</option><option value="Cosmetics & Skincare">Cosmetics & Skincare</option><option value="Jewelry & Watches">Jewelry & Watches</option><option value="Gift Sets & PR Kits">Gift Sets & PR Kits</option><option value="Other">Other</option></select>
              </label>
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg> Packaging Type</span>
                <select name="structure" className="form-input"><option value="">Select type</option><option value="Rigid Box">Rigid Box</option><option value="Folding Carton">Folding Carton</option><option value="Paper Bag">Paper Bag</option><option value="Custom Insert">Custom Insert</option><option value="Not sure">Not sure</option></select>
              </label>
            </div>
            <div className="form-row">
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> Quantity</span>
                <select name="quantity" className="form-input"><option value="">Select quantity</option><option value="500-1,000">500–1,000</option><option value="1,000-5,000">1,000–5,000</option><option value="5,000-10,000">5,000–10,000</option><option value="10,000+">10,000+</option></select>
              </label>
              <label><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Country</span>
                <input name="country" type="text" placeholder="e.g. United States" className="form-input"/>
              </label>
            </div>
            <label className="form-full"><span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg> Message</span>
              <textarea name="message" rows={3} placeholder="Product dimensions, finishes, target budget…" className="form-input"/>
            </label>
            <button type="submit" className="button inverse v2-quote-submit">Send Brief →</button>
            <small>Prefer WhatsApp? <a href={whatsapp} target="_blank" rel="noreferrer">Message Hugo directly</a> for a quick response.</small>
          </form>
        </div>
      </div>
    </section>

    <footer className="site-footer v2-footer"><div><a className="brand" href="#top"><img src="/logo.svg" alt="MTT Packaging" width="72" height="52"/><b>MTT Packaging</b></a><p>High-end custom packaging, handled directly from brief to production.</p></div><div><b>Business email</b><a href="mailto:info@mttpackaging.com">info@mttpackaging.com</a></div><div><b>WhatsApp</b><a href={whatsapp} target="_blank" rel="noreferrer">+86 17207110964</a><span>Typical MOQ: 500–1,000 pcs</span></div><div><b>Navigate</b><a href="#industries">Industries</a><a href="#projects">Portfolio</a><a href="#process">Process</a><a href="#faq">FAQ</a></div></footer>
  </main>;
}
