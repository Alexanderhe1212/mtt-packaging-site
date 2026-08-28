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
  { '@type': 'Person', '@id': 'https://mttpackaging.com/#hugo-he', name: 'Hugo He', jobTitle: 'Custom Packaging Consultant', worksFor: { '@id': 'https://mttpackaging.com/#organization' }, email: 'alexanderhe1212@gmail.com', telephone: '+86 17207110964' },
  { '@type': 'Service', name: 'High-End Custom Packaging', provider: { '@id': 'https://mttpackaging.com/#organization' }, areaServed: 'Worldwide', serviceType: ['Luxury rigid boxes', 'Perfume packaging', 'Cosmetics packaging', 'Jewelry packaging', 'Premium gift packaging', 'Custom inserts'] },
  { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
] };

export default function Home() {
  return <main className="home-v2">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <nav className="nav" aria-label="Primary navigation">
      <a className="brand" href="#top"><img src="/logo.svg" alt="MTT Packaging" width="72" height="52"/><b>MTT Packaging</b><small>by Hugo He</small></a>
      <div className="navlinks"><a href="#industries">Industries</a><a href="#projects">Projects</a><a href="#process">Process</a><a href="#faq">FAQ</a></div>
      <a className="button small" href="#quote">Request a Quote</a>
    </nav>

    <section className="v2-hero" id="top"><div><p className="eyebrow">MTT Packaging · High-End Custom Made</p><h1>Premium Packaging,<br/><em>Engineered Around Your Product.</em></h1><p>Custom structures, materials, finishes and inserts developed as one practical system—from the first brief to delivery.</p><div className="actions"><a className="button" href="#quote">Request a Quote →</a><a className="text-link" href="#projects">View Production Portfolio ↓</a></div></div><div className="v2-hero-image"><img src="/capability-rigid-box.webp" alt="Open high-end custom rigid perfume box with fitted insert" width="1000" height="1000"/><span>Rigid structure · Precision insert · Premium finish</span></div></section>

    <section className="v2-section v2-industries" id="industries"><header><p className="section-kicker">02 / Industries</p><h2>Packaging starts with<br/>what you need to protect.</h2></header><div className="v2-industry-grid">{industries.map((item) => <a href={`/industries/${item.slug}`} key={item.slug}><img src={item.image} alt={item.imageAlt} width="700" height="700"/><p>{item.eyebrow}</p><h3>{item.eyebrow === 'Gift sets & PR kits' ? 'Premium Gifts' : item.eyebrow}</h3><span>Explore solutions →</span></a>)}</div></section>

    <section className="v2-section v2-projects" id="projects"><header><div><p className="section-kicker light">03 / Production portfolio</p><h2>Real production should<br/>show the detail.</h2></div><p>This gallery is prepared for six verified MTT project photographs. Current images are marked as structure references and are not presented as client work.</p></header><div className="v2-project-grid">{projectReferences.map(([title, image], index) => <figure key={title}><img src={image} alt={`${title} structure reference`} width="800" height="600"/><figcaption><span>0{index + 1}</span><b>{title}</b><small>Structure reference · Replace with verified project photo</small></figcaption></figure>)}</div><a className="button inverse" href="/packaging">View All Structures →</a></section>

    <section className="v2-section v2-why"><header><p className="section-kicker">04 / Why MTT</p><h2>Clear decisions before<br/>production begins.</h2></header><div>{[
      ['01','Engineering Before Production','Structure, dimensions, insert, material and finishes are clarified before sampling and mass production.'],
      ['02','One Point of Contact','Hugo coordinates the commercial brief and project details from the first review through delivery.'],
      ['03','Flexible Custom Production','The production route is selected around the structure, quantity, finish requirements and target budget.'],
      ['04','Packaging Built for Delivery','Product protection, export packing, carton count, CBM and destination are considered with presentation.'],
    ].map(([n,title,copy]) => <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="v2-section v2-hugo" id="hugo"><div className="v2-photo-placeholder" role="img" aria-label="Hugo He portrait photo pending"><b>HH</b><span>Add Hugo's real portrait</span></div><div><p className="section-kicker">05 / Meet Hugo</p><h2>Your direct contact<br/>for custom packaging.</h2><p>I help business buyers turn product requirements into a practical packaging brief—coordinating structure, materials, inserts, finishing, sampling and production details with one accountable point of contact.</p><div className="actions"><a className="button" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp Hugo ↗</a><a className="text-link" href="mailto:alexanderhe1212@gmail.com">Email Hugo →</a></div></div></section>

    <section className="v2-section v2-process" id="process"><header><p className="section-kicker light">06 / How we work</p><h2>From product<br/>to delivered packaging.</h2></header><ol>{['Product details','Structure recommendation','Formal quotation','Physical sample','Production & inspection','Export packing & delivery'].map((step,index) => <li key={step}><span>0{index + 1}</span><b>{step}</b></li>)}</ol></section>

    <section className="v2-section v2-craft"><header><div><p className="section-kicker">07 / Manufacturing & craftsmanship</p><h2>Production evidence,<br/>not generic claims.</h2></div><p>Use verified photographs from the actual production route so buyers can see assembly, finishing and inspection clearly.</p></header><div>{['Factory floor','Hand assembly & finishing','Quality control & packing'].map((label,index) => <figure key={label}><div className="v2-factory-placeholder"><span>0{index + 1}</span><b>Upload real production photo</b></div><figcaption>{label}</figcaption></figure>)}</div></section>

    <section className="v2-section v2-materials"><header><p className="section-kicker">08 / Materials & finishes</p><h2>Touch, structure<br/>and protection.</h2></header><div>{[
      ['Paper & board','Greyboard, paperboard, specialty paper and responsible alternatives.','/sustainability/documented-sourcing.webp'],
      ['Printing & finishing','Foil, embossing, debossing, spot UV, texture and controlled color.','/capability-folding-cartons.webp'],
      ['Custom inserts','Paperboard, molded pulp, EVA and fabric-covered protection.','/sustainability/paper-based-options.webp'],
    ].map(([title,copy,image]) => <article key={title}><img src={image} alt={`${title} packaging reference`} width="700" height="520"/><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="v2-section v2-faq" id="faq"><header><p className="section-kicker">09 / Buyer questions</p><h2>Before you request<br/>a custom quote.</h2></header><div>{faqs.map(([q,a],index) => <details key={q} open={index === 0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></section>

    <section className="v2-section v2-quote" id="quote"><div><p className="section-kicker light">10 / Start a project</p><h2>Have a Packaging Project?</h2><p>Tell us about your product. For a focused first review, include dimensions in L × W × H, quantity, desired structure, finishes, insert, delivery country and target budget.</p></div><div className="v2-quote-actions"><a className="button inverse" href="mailto:alexanderhe1212@gmail.com?subject=Custom%20Packaging%20Project%20Brief">Request a Quote →</a><a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp Hugo ↗</a></div></section>

    <footer className="site-footer v2-footer"><div><a className="brand" href="#top"><img src="/logo.svg" alt="MTT Packaging" width="72" height="52"/><b>MTT Packaging</b></a><p>High-end custom packaging, handled directly from brief to production.</p></div><div><b>Business email</b><a href="mailto:alexanderhe1212@gmail.com">alexanderhe1212@gmail.com</a></div><div><b>WhatsApp</b><a href={whatsapp} target="_blank" rel="noreferrer">+86 17207110964</a><span>Typical MOQ: 500–1,000 pcs</span></div><div><b>Navigate</b><a href="#industries">Industries</a><a href="#projects">Portfolio</a><a href="#process">Process</a><a href="#faq">FAQ</a></div></footer>
  </main>;
}
