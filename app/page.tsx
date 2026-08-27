const solutions = [
  { n: '01', title: 'Luxury Rigid Boxes', copy: 'Magnetic, lift-off lid, drawer and sculptural presentation boxes for premium products.', tone: 'sage' },
  { n: '02', title: 'Premium Folding Cartons', copy: 'High-detail paperboard cartons with controlled color, tactile papers and specialty finishes.', tone: 'sand' },
  { n: '03', title: 'Bespoke Paper Bags', copy: 'Brand-matched luxury bags with cotton, ribbon or paper handles and reinforced construction.', tone: 'clay' },
  { n: '04', title: 'Custom Inserts', copy: 'Precision paper, molded pulp, EVA and fabric-covered inserts that complete the unboxing experience.', tone: 'gold' },
];

const faqs = [
  ['What information is needed for a quote?', 'Please share the finished internal size (L × W × H), box structure, quantity, artwork or print colors, finishes, insert material and delivery country. Photos are useful references, but dimensions are still required.'],
  ['What is the typical minimum order quantity?', 'Most fully custom projects start from 500–1,000 pieces per design. The practical MOQ depends on structure, materials, finishes and production method.'],
  ['Can I approve a sample before production?', 'Yes. We recommend structural and printed sampling before mass production. Sampling cost and lead time depend on the chosen construction and finishes.'],
  ['How long does production take?', 'A typical custom order takes about 20–35 days after sample and artwork approval. Complex handmade structures or peak-season schedules may require longer.'],
];

const structuredData = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'Organization', name: 'atelier Packaging', description: 'Premium business packaging for brands and corporate projects', url: 'https://atelier-luxury-packaging.alexanderhe1212.chatgpt.site', email: 'alexanderhe1212@gmail.com' },
    { '@type': 'Person', name: 'Leo He', jobTitle: 'Premium Business Packaging Consultant', worksFor: { '@type': 'Organization', name: 'atelier Packaging' }, email: 'alexanderhe1212@gmail.com', telephone: '+86 17207110964' },
    { '@type': 'Service', name: 'Premium Business Packaging', provider: { '@type': 'Person', name: 'Leo He' }, areaServed: 'Worldwide', serviceType: ['Premium rigid boxes', 'Corporate gift packaging', 'Premium folding cartons', 'Bespoke paper bags', 'Custom inserts'] },
    { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ],
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top"><span>AP</span> atelier Packaging</a>
        <div className="navlinks"><a href="#solutions">Solutions</a><a href="#work">Work</a><a href="#process">Process</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div>
        <a className="button small" href="https://wa.me/8617207110964?text=Hi%20Leo%2C%20I%20have%20a%20custom%20packaging%20project." target="_blank" rel="noreferrer">WhatsApp Leo</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Leo He · Premium Business Packaging Consultant</p>
          <h1>Premium packaging built for <em>serious business.</em></h1>
          <p className="lede">I help brands and corporate buyers turn product or gifting briefs into refined custom packaging—with direct communication from specification through sampling and production.</p>
          <div className="actions"><a className="button" href="https://wa.me/8617207110964?text=Hi%20Leo%2C%20I%20have%20a%20custom%20packaging%20project." target="_blank" rel="noreferrer">Message Leo <span>↗</span></a><a className="text-link" href="#solutions">Explore structures →</a></div>
          <dl className="stats"><div><dt>1:1</dt><dd>Direct support</dd></div><div><dt>100%</dt><dd>Custom made</dd></div><div><dt>L × W × H</dt><dd>Quote-ready details</dd></div></dl>
        </div>
        <div className="hero-art" aria-label="Premium rigid box concept"><div className="box-lid"><span>YOUR<br/>BRAND</span></div><div className="box-base"></div><p>01 / RIGID BOX</p></div>
      </section>

      <section className="intro" aria-labelledby="intro-title">
        <p className="section-kicker">Work directly with Leo</p>
        <h2 id="intro-title">One accountable contact.<br/><i>A complete business solution.</i></h2>
        <p>I coordinate structure, materials, insert, print and finishes so your packaging presents the brand professionally, protects the product and remains practical to manufacture and deliver.</p>
      </section>

      <section className="solutions" id="solutions" aria-labelledby="solutions-title">
        <div className="section-head"><div><p className="section-kicker">Our capabilities</p><h2 id="solutions-title">Choose the right structure</h2></div><p>Start with your product dimensions, quantity and target presentation. We will help narrow the structure before sampling and formal pricing.</p></div>
        <div className="solution-grid">{solutions.map((item) => <article className={`solution-card ${item.tone}`} key={item.title}><span>{item.n}</span><div className="mini-box" aria-hidden="true"></div><h3>{item.title}</h3><p>{item.copy}</p><a href="#contact" aria-label={`Discuss ${item.title}`}>Discuss this structure →</a></article>)}</div>
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <div className="work-heading"><div><p className="section-kicker">Business packaging direction</p><h2 id="work-title">Premium structures,<br/><i>built to represent the brand.</i></h2></div><p>Original concept imagery showing the structures, materials and presentation standards I can help develop for product launches, corporate gifting and premium retail. These are capability concepts, not claimed client projects.</p></div>
        <figure><img src="/selected-work-concepts.png" alt="Four original high-end packaging concepts: perfume rigid box, jewelry drawer box, cosmetics cartons and custom insert"/><figcaption><span>Concept showcase · No third-party brands</span><span>Rigid box / drawer box / folding carton / insert</span></figcaption></figure>
      </section>

      <section className="process" id="process" aria-labelledby="process-title">
        <div><p className="section-kicker light">A clearer path to production</p><h2 id="process-title">From product to packaging,<br/><i>without the guesswork.</i></h2></div>
        <ol><li><b>01</b><span><strong>Define the brief</strong>Product size, structure, quantity, insert, finishes, market and target budget.</span></li><li><b>02</b><span><strong>Engineer & sample</strong>Confirm construction, material specification, artwork and physical sample.</span></li><li><b>03</b><span><strong>Produce & inspect</strong>Mass production follows approved specifications with quality checks.</span></li><li><b>04</b><span><strong>Pack & deliver</strong>Export packing and shipping terms are confirmed for your destination.</span></li></ol>
      </section>

      <section className="faq" id="faq" aria-labelledby="faq-title">
        <div><p className="section-kicker">Buyer questions</p><h2 id="faq-title">Before you request<br/>a custom quote</h2><p className="faq-note">Clear inputs lead to a more accurate proposal. Default prices or online estimates should not be treated as factory-confirmed quotations.</p></div>
        <div className="faq-list">{faqs.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div><p className="section-kicker light">Contact Leo He</p><h2 id="contact-title">Tell me what<br/>you need to pack.</h2><p>For the fastest first review, include 3–5 priority SKUs, finished dimensions and estimated order volume.</p><div className="direct-contact"><a href="mailto:alexanderhe1212@gmail.com">alexanderhe1212@gmail.com</a><a href="https://wa.me/8617207110964?text=Hi%20Leo%2C%20I%20have%20a%20custom%20packaging%20project." target="_blank" rel="noreferrer">WhatsApp: +86 17207110964</a></div></div>
        <form action="mailto:alexanderhe1212@gmail.com" method="post" encType="text/plain"><label>Name / Company<input required name="name" autoComplete="organization" /></label><label>Work email<input required type="email" name="email" autoComplete="email" /></label><label>Packaging type<select name="type" defaultValue="Rigid box"><option>Rigid box</option><option>Folding carton</option><option>Paper bag</option><option>Custom insert</option><option>Not sure yet</option></select></label><label>Project details<textarea required name="details" rows={4} placeholder="Product size, box size, quantity, materials, finishes and delivery country" /></label><button className="button" type="submit">Email Leo <span>↗</span></button><small>Your email app will open with the project information addressed to Leo.</small></form>
      </section>

      <footer><a className="brand" href="#top"><span>AP</span> atelier Packaging</a><p>Leo He · Premium Business Packaging Consultant</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
