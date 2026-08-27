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
    { '@type': 'Organization', name: 'Atelier Packaging', description: 'Custom luxury packaging manufacturer for premium brands', url: 'https://example.com' },
    { '@type': 'Service', name: 'High-end Custom Packaging', provider: { '@type': 'Organization', name: 'Atelier Packaging' }, areaServed: 'Worldwide', serviceType: ['Luxury rigid boxes', 'Premium folding cartons', 'Bespoke paper bags', 'Custom inserts'] },
    { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ],
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top"><span>AP</span> Atelier Packaging</a>
        <div className="navlinks"><a href="#solutions">Solutions</a><a href="#process">Process</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div>
        <a className="button small" href="#contact">Start a project</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">Custom luxury packaging · Made for brands</p>
          <h1>Packaging that makes the product feel <em>worth more.</em></h1>
          <p className="lede">High-end packaging, made to order for brands that care about presentation, protection and every detail of the unboxing experience.</p>
          <div className="actions"><a className="button" href="#contact">Request a quote <span>↗</span></a><a className="text-link" href="#solutions">Explore structures →</a></div>
          <dl className="stats"><div><dt>15+</dt><dd>Years of craft</dd></div><div><dt>30+</dt><dd>Export markets</dd></div><div><dt>100%</dt><dd>Custom made</dd></div></dl>
        </div>
        <div className="hero-art" aria-label="Premium rigid box concept"><div className="box-lid"><span>YOUR<br/>BRAND</span></div><div className="box-base"></div><p>01 / RIGID BOX</p></div>
      </section>

      <section className="intro" aria-labelledby="intro-title">
        <p className="section-kicker">Built around your product</p>
        <h2 id="intro-title">Not just a beautiful box.<br/><i>A complete packaging solution.</i></h2>
        <p>We align structure, materials, insert, print and finishes so your packaging protects the product, presents the brand and remains realistic to manufacture.</p>
      </section>

      <section className="solutions" id="solutions" aria-labelledby="solutions-title">
        <div className="section-head"><div><p className="section-kicker">Our capabilities</p><h2 id="solutions-title">Choose the right structure</h2></div><p>Start with your product dimensions, quantity and target presentation. We will help narrow the structure before sampling and formal pricing.</p></div>
        <div className="solution-grid">{solutions.map((item) => <article className={`solution-card ${item.tone}`} key={item.title}><span>{item.n}</span><div className="mini-box" aria-hidden="true"></div><h3>{item.title}</h3><p>{item.copy}</p><a href="#contact" aria-label={`Discuss ${item.title}`}>Discuss this structure →</a></article>)}</div>
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
        <div><p className="section-kicker light">Start a project</p><h2 id="contact-title">Tell us what<br/>you need to pack.</h2><p>For the fastest first review, include 3–5 priority SKUs, finished dimensions and estimated order volume.</p></div>
        <form action="mailto:sales@yourdomain.com" method="post" encType="text/plain"><label>Name / Company<input required name="name" autoComplete="organization" /></label><label>Work email<input required type="email" name="email" autoComplete="email" /></label><label>Packaging type<select name="type" defaultValue="Rigid box"><option>Rigid box</option><option>Folding carton</option><option>Paper bag</option><option>Corrugated box</option><option>Not sure yet</option></select></label><label>Project details<textarea required name="details" rows={4} placeholder="Product size, box size, quantity, materials, finishes and delivery country" /></label><button className="button" type="submit">Prepare email <span>↗</span></button><small>This free version opens your email app. Replace the placeholder address before launch.</small></form>
      </section>

      <footer><a className="brand" href="#top"><span>AP</span> Atelier Packaging</a><p>Custom luxury packaging for premium brands.</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
