import { articles } from '../lib/articles';
import { industries } from '../lib/industries';
import { solutions } from '../lib/solutions';

const faqs = [
  ['What information is needed for a quote?', 'Please share the finished internal size (L × W × H), box structure, quantity, artwork or print colors, finishes, insert material and delivery country. Photos are useful references, but dimensions are still required.'],
  ['What is the typical minimum order quantity?', 'Most fully custom projects start from 500–1,000 pieces per design. The practical MOQ depends on structure, materials, finishes and production method.'],
  ['Can I approve a sample before production?', 'Yes. We recommend structural and printed sampling before mass production. Sampling cost and lead time depend on the chosen construction and finishes.'],
  ['How long does production take?', 'A typical custom order takes about 20–35 days after sample and artwork approval. Complex handmade structures or peak-season schedules may require longer.'],
  ['Do you support international packaging projects?', 'Yes. MTT Packaging supports brands and business buyers worldwide. Share your delivery country so export packing, shipping terms and project timing can be considered from the beginning.'],
  ['Can you provide certified or lower-impact packaging materials?', 'Yes. Depending on the project and production route, we can source paper-based materials with relevant chain-of-custody documentation, recycled-content options, paper-based inserts and structures designed for easier material separation. Certification scope and supporting documents must be confirmed for the specific order before any environmental claim is printed or published.'],
];

const structuredData = {
  '@context': 'https://schema.org', '@graph': [
    { '@type': 'WebSite', '@id': 'https://mttpackaging.com/#website', name: 'MTT Packaging', url: 'https://mttpackaging.com', inLanguage: 'en' },
    { '@type': 'Organization', '@id': 'https://mttpackaging.com/#organization', name: 'MTT Packaging', description: 'High-end custom packaging for premium brands and corporate projects', url: 'https://mttpackaging.com', email: 'alexanderhe1212@gmail.com', contactPoint: { '@type': 'ContactPoint', contactType: 'sales', telephone: '+86 17207110964', email: 'alexanderhe1212@gmail.com', availableLanguage: ['English', 'Chinese'], areaServed: 'Worldwide' } },
    { '@type': 'Person', name: 'Hugo He', jobTitle: 'Premium Custom Packaging Consultant', worksFor: { '@type': 'Organization', name: 'MTT Packaging' }, email: 'alexanderhe1212@gmail.com', telephone: '+86 17207110964', url: 'https://mttpackaging.com' },
    { '@type': 'Service', '@id': 'https://mttpackaging.com/#service', name: 'High-End Custom Packaging', provider: { '@id': 'https://mttpackaging.com/#organization' }, areaServed: 'Worldwide', serviceType: ['Luxury rigid boxes', 'Corporate gift packaging', 'Premium folding cartons', 'Bespoke paper bags', 'Custom inserts'], offers: { '@type': 'OfferCatalog', name: 'Custom Packaging Solutions', itemListElement: solutions.map((item) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: item.title, description: item.copy } })) } },
    { '@type': 'FAQPage', mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
  ],
};

export default function Home() {
  return (
    <main className="home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#top"><span>MTT</span> MTT Packaging <small>by Hugo He</small></a>
        <div className="navlinks"><a href="/packaging">Packaging</a><a href="/how-we-work">How We Work</a><a href="/sustainability">Sustainability</a><a href="/insights">Insights</a><a href="#contact">Contact</a></div>
        <a className="button small" href="https://wa.me/8617207110964?text=Hi%20Hugo%2C%20I%20have%20a%20custom%20packaging%20project." target="_blank" rel="noreferrer">WhatsApp Hugo</a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">MTT Packaging · High-End Custom Made</p>
          <h1>Premium packaging, <em>designed around your product.</em></h1>
          <p className="lede">Structure, materials, inserts and finishes developed as one considered system—with Hugo as your direct contact from brief to production.</p>
          <div className="actions"><a className="button" href="https://wa.me/8617207110964?text=Hi%20Hugo%2C%20I%20have%20a%20custom%20packaging%20project." target="_blank" rel="noreferrer">Message Hugo <span>↗</span></a><a className="text-link" href="/packaging">Explore packaging →</a></div>
          <dl className="stats"><div><dt>1:1</dt><dd>Direct support</dd></div><div><dt>100%</dt><dd>Custom made</dd></div><div><dt>L × W × H</dt><dd>Quote-ready details</dd></div></dl>
        </div>
        <div className="hero-gallery" aria-label="MTT Packaging capability gallery">
          <img className="hero-img hero-img-a" src="/capability-rigid-box.webp" alt="Open premium rigid perfume box" width="900" height="900"/>
          <img className="hero-img hero-img-b" src="/capability-folding-cartons.webp" alt="Premium folding cartons" width="900" height="900"/>
          <img className="hero-img hero-img-c" src="/capability-paper-bags.webp" alt="Luxury paper shopping bags" width="900" height="900"/>
          <img className="hero-img hero-img-d" src="/capability-custom-inserts.webp" alt="Custom paperboard packaging insert" width="900" height="900"/>
        </div>
      </section>

      <section className="industry-index" id="industries" aria-labelledby="industry-title">
        <div className="section-head"><div><p className="section-kicker">Packaging by market</p><h2 id="industry-title">Start with what<br/>you need to pack.</h2></div><p>Each product category creates different demands for protection, presentation, insert design and distribution. Explore a focused starting point for your project.</p></div>
        <div className="industry-grid">{industries.map((item, index) => <a href={`/industries/${item.slug}`} key={item.slug}><span>0{index + 1}</span><p>{item.eyebrow}</p><h3>{item.title}</h3><small>Explore packaging options →</small></a>)}</div>
      </section>

      <section className="intro" aria-labelledby="intro-title">
        <p className="section-kicker">Work directly with Hugo</p>
        <h2 id="intro-title">One accountable contact.<br/><i>A complete business solution.</i></h2>
        <p>I coordinate structure, materials, insert, print and finishes so your packaging presents the brand professionally, protects the product and remains practical to manufacture and deliver.</p>
      </section>

      <section className="proof" aria-labelledby="proof-title">
        <div><p className="section-kicker">Made for premium presentation</p><h2 id="proof-title">Structure, finish and protection<br/><i>considered together.</i></h2></div>
        <div className="proof-grid"><article><b>Materials</b><p>Rigid greyboard, specialty paper, paperboard, corrugated board and responsible alternatives selected for the structure.</p></article><article><b>Finishes</b><p>Foil stamping, embossing, debossing, spot UV, textured papers and controlled color matching for a refined brand result.</p></article><article><b>Protection</b><p>Paper, molded pulp, EVA and fabric-covered inserts engineered around the product, presentation and transport needs.</p></article></div>
      </section>

      <section className="solutions" id="solutions" aria-labelledby="solutions-title">
        <div className="section-head"><div><p className="section-kicker">Our capabilities</p><h2 id="solutions-title">Choose the right structure</h2></div><p>Start with your product dimensions, quantity and target presentation. We will help narrow the structure before sampling and formal pricing.</p></div>
        <div className="solution-grid">{solutions.map((item) => <article className={`solution-card ${item.tone}`} key={item.title}><span>{item.n}</span><img className="capability-image" src={item.image} alt={item.alt} width="900" height="900" loading="lazy"/><h3>{item.title}</h3><p>{item.copy}</p><a href="#contact" aria-label={`Discuss ${item.title}`}>Discuss this structure →</a></article>)}</div>
      </section>

      <section className="decision" aria-labelledby="decision-title">
        <div><p className="section-kicker light">Rigid box systems</p><h2 id="decision-title">Six structures.<br/><i>Different jobs.</i></h2><p>Structure should follow product weight, opening sequence, budget, storage and distribution—not trend alone.</p></div>
        <div className="decision-grid">
          <article><b>01</b><h3>Magnetic book style</h3><p>For launch kits, premium sets and a broad presentation surface.</p></article>
          <article><b>02</b><h3>Lid & base</h3><p>For a clean lift-off reveal across fragrance, jewelry and gifting.</p></article>
          <article><b>03</b><h3>Drawer box</h3><p>For a deliberate sliding reveal, optionally with a ribbon pull.</p></article>
          <article><b>04</b><h3>Shoulder-neck</h3><p>For precise lid fit and a layered premium color detail.</p></article>
          <article><b>05</b><h3>Fold-flat rigid</h3><p>For projects where assembly and logistics justify a collapsible format.</p></article>
          <article><b>06</b><h3>Custom interior</h3><p>For product retention, protection and an intentional reveal sequence.</p></article>
        </div>
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <div className="work-heading"><div><p className="section-kicker">Business packaging direction</p><h2 id="work-title">Premium structures,<br/><i>built to represent the brand.</i></h2></div><p>Original concept imagery showing the structures, materials and presentation standards I can help develop for product launches, corporate gifting and premium retail. These are capability concepts, not claimed client projects.</p></div>
        <figure><img src="/selected-work-concepts.png" alt="Four original high-end packaging concepts: perfume rigid box, jewelry drawer box, cosmetics cartons and custom insert"/><figcaption><span>Concept showcase · No third-party brands</span><span>Rigid box / drawer box / folding carton / insert</span></figcaption></figure>
      </section>

      <section className="process" id="process" aria-labelledby="process-title">
        <div><p className="section-kicker light">A clearer path to production</p><h2 id="process-title">From product to packaging,<br/><i>without the guesswork.</i></h2></div>
        <ol><li><b>01</b><span><strong>Define the brief</strong>Product size, structure, quantity, insert, finishes, market and target budget.</span></li><li><b>02</b><span><strong>Engineer & sample</strong>Confirm construction, material specification, artwork and physical sample.</span></li><li><b>03</b><span><strong>Produce & inspect</strong>Mass production follows approved specifications with quality checks.</span></li><li><b>04</b><span><strong>Pack & deliver</strong>Export packing and shipping terms are confirmed for your destination.</span></li></ol>
      </section>

      <section className="sustainability" id="sustainability" aria-labelledby="sustainability-title">
        <div className="sustainability-head"><p className="section-kicker">Responsible packaging</p><h2 id="sustainability-title">Make the environmental claim<br/><i>as considered as the box.</i></h2><p>We help buyers reduce unnecessary material, compare paper-based alternatives and request project-specific documentation. Environmental performance depends on the final structure, materials, finishes, insert and supply route.</p></div>
        <div className="sustainability-grid">
          <article><span>01</span><h3>Documented sourcing</h3><p>Certified paper and board can be specified when available for the selected material and production route. Certificate scope and transaction documents are checked per order.</p></article>
          <article><span>02</span><h3>Material reduction</h3><p>Right-sizing, board optimization and fewer unnecessary components can reduce material before adding more complex sustainability claims.</p></article>
          <article><span>03</span><h3>Paper-based options</h3><p>Paperboard platforms and molded pulp can replace some plastic or foam inserts where product protection and presentation allow.</p></article>
          <article><span>04</span><h3>Clearer end of life</h3><p>We can review magnets, laminations, mixed materials and separability so disposal guidance reflects the actual finished packaging.</p></article>
        </div>
        <div className="cert-note"><b>Certification statement</b><p>MTT Packaging can support projects requiring verified certified materials. We do not claim every structure, supplier or order is automatically certified; the applicable certificate and scope are confirmed before production and before a certification mark is used.</p><a href="#contact">Ask for documentation →</a></div>
      </section>

      <section className="insights" id="insights" aria-labelledby="insights-title">
        <div className="section-head"><div><p className="section-kicker">Packaging knowledge</p><h2 id="insights-title">Four angles of a better box</h2></div><p>Practical guidance for buyers comparing custom structures, materials, finishes and inserts before sampling or quotation.</p></div>
        <div className="insight-grid">{articles.map((article) => <article key={article.slug}><span>{article.number} / {article.angle}</span><h3>{article.title}</h3><p>{article.summary}</p><a href={`/insights/${article.slug}`}>Read the guide →</a></article>)}</div>
      </section>

      <section className="faq" id="faq" aria-labelledby="faq-title">
        <div><p className="section-kicker">Buyer questions</p><h2 id="faq-title">Before you request<br/>a custom quote</h2><p className="faq-note">Clear inputs lead to a more accurate proposal. Default prices or online estimates should not be treated as factory-confirmed quotations.</p></div>
        <div className="faq-list">{faqs.map(([q, a], i) => <details key={q} open={i === 0}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div><p className="section-kicker light">Contact Hugo He</p><h2 id="contact-title">Tell me what<br/>you need to pack.</h2><p>For the fastest first review, include 3–5 priority SKUs, finished dimensions and estimated order volume.</p><div className="direct-contact"><a href="mailto:alexanderhe1212@gmail.com">alexanderhe1212@gmail.com</a><a href="https://wa.me/8617207110964?text=Hi%20Hugo%2C%20I%20have%20a%20custom%20packaging%20project." target="_blank" rel="noreferrer">WhatsApp: +86 17207110964</a></div></div>
        <form action="mailto:alexanderhe1212@gmail.com" method="post" encType="text/plain">
          <label>Full name *<input required name="name" autoComplete="name" /></label><label>Company / brand *<input required name="company" autoComplete="organization" /></label>
          <label>Business email *<input required type="email" name="email" autoComplete="email" /></label><label>WhatsApp / phone *<input required name="phone" autoComplete="tel" /></label>
          <label>Brand website<input type="url" name="website" placeholder="https://yourbrand.com" /></label><label>Industry *<select required name="industry" defaultValue=""><option value="" disabled>Select industry</option><option>Beauty & cosmetics</option><option>Jewelry & watches</option><option>Food & beverage</option><option>Fashion & accessories</option><option>Corporate gifting</option><option>Consumer electronics</option><option>Other</option></select></label>
          <label>Packaging type *<select required name="type" defaultValue="Rigid box"><option>Rigid box</option><option>Folding carton</option><option>Corrugated box</option><option>Paper bag</option><option>Custom insert</option><option>Not sure yet</option></select></label><label>Estimated quantity *<select required name="quantity" defaultValue=""><option value="" disabled>Select quantity</option><option>500–999 pieces</option><option>1,000–2,999 pieces</option><option>3,000–9,999 pieces</option><option>10,000+ pieces</option></select></label>
          <label>Estimated budget<select name="budget" defaultValue=""><option value="">Select budget</option><option>Under US$5,000</option><option>US$5,000–10,000</option><option>US$10,000–30,000</option><option>US$30,000+</option><option>Need guidance</option></select></label><label>Project timeline *<select required name="timeline" defaultValue=""><option value="" disabled>Select timeline</option><option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>Flexible / planning</option></select></label>
          <label>Delivery country *<input required name="destination" /></label><label>Reference links<input name="references" placeholder="Drive, Dropbox, website or product link" /></label>
          <label className="wide">Project details *<textarea required name="details" rows={5} placeholder="Product and finished internal dimensions (L × W × H), materials, finishes, insert, quantity and anything else that matters." /></label>
          <button className="button" type="submit">Send project details <span>↗</span></button><small>Your email app will open with the project information addressed to Hugo. Artwork can be attached in the email or shared by WhatsApp.</small>
        </form>
      </section>

      <footer className="site-footer"><div><a className="brand" href="#top"><span>MTT</span> MTT Packaging <small>by Hugo He</small></a><p>High-end custom packaging, handled directly from brief to production.</p></div><div><b>Explore</b><a href="#industries">Industries</a><a href="#solutions">Structures</a><a href="#sustainability">Sustainability</a><a href="#insights">Insights</a></div><div><b>Contact</b><a href="mailto:alexanderhe1212@gmail.com">Email Hugo</a><a href="https://wa.me/8617207110964" target="_blank" rel="noreferrer">WhatsApp</a><a href="#contact">Send a brief</a></div><div><b>Website</b><a href="/sitemap.xml">Sitemap</a><a href="#faq">FAQ</a><a href="#top">Back to top ↑</a></div></footer>
    </main>
  );
}
