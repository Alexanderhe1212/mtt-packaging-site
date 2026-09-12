const consultation = `https://wa.me/8617207110964?text=${encodeURIComponent('Hi Hugo, I came from your perfume packaging page. My fragrance or bottle is still in development. I would like advice on a box, insert and matching bag. Quantity: To confirm. Target launch: To confirm.')}`;
export default function FragrancePlanning() {
 return <section className="buyer-planning fragrance-planning" aria-label="Complete fragrance packaging">
  <p className="section-kicker">One coordinated packaging set</p>
  <h2>Plan the box, bottle insert and bag together.</h2>
  <p>The presentation should feel consistent from the first carry to the bottle reveal. Start with your product stage, then confirm fit and finish with physical samples.</p>
  <div className="buyer-options">
   {[
    ['/design/rigid-editorial.webp','Concept: rigid box with a separate lift-off lid','Presentation box','Compare lift-off, drawer and hinged openings. Choose the structure before final artwork, then confirm lid clearance and opening feel.','/packaging/custom-rigid-boxes'],
    ['/design/perfume-insert-editorial.webp','Concept: perfume bottle seated in a paperboard insert','Bottle insert','Use actual bottle dimensions with the cap fitted and filled weight. Review contact points, removal access and movement on a sample.','/packaging/custom-inserts'],
    ['/design/customization/handles.webp','Illustrative paper shopping bag handle reference','Matching paper bag','Size the bag around the finished outer box, including gusset and handle clearance. Confirm loaded strength and color against the box sample.','/packaging/custom-paper-bags']
   ].map(([src,alt,title,copy,href])=><article key={title}><img src={src} alt={alt} width="640" height="480" loading="lazy"/><h3>{title}</h3><p>{copy}</p><a href={href}>Explore options →</a></article>)}
  </div>
  <p><small>Illustrative concepts and material references, not a documented customer order.</small></p>
  <div className="buyer-next">
   <article><h3>Bottle dimensions ready?</h3><p>Choose a box, add artwork and finishes, then provide product measurements and quantity. The preview is a planning aid; final fit needs engineering review.</p><a className="button" href="/tools/gift-box-solution-builder">Start your box design →</a></article>
   <article><h3>Fragrance still in development?</h3><p>You can start with reference images, intended quantity and launch stage. We can discuss a packaging direction before the bottle is final; avoid committing to tooling or final pricing yet.</p><a className="button" href={consultation} target="_blank" rel="noreferrer">Discuss an early-stage project ↗</a></article>
  </div>
  <h3>Planning around 500 sets?</h3><p>Ask for the box, insert and bag to be itemized. Setup, tooling, printing, finishing and assembly affect the unit cost, especially at smaller quantities. Sample charges and freight should be stated separately; availability and final price depend on the confirmed specification.</p>
  <nav className="buyer-guides" aria-label="Fragrance planning resources"><a href="/insights/perfume-box-and-bag-packaging">How to coordinate a perfume box and bag →</a><a href="/insights/perfume-box-insert-design">Bottle insert planning →</a><a href="/how-we-work">From brief to physical sample →</a></nav>
 </section>
}
