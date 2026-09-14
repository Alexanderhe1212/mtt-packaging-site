const guides = {
 carton: {
  title: 'Choose the carton closure for your filling process.',
  choices: [['Tuck-end carton', 'A paperboard carton with closing tabs can suit retail products. Check tab access, repeated opening and clearance around the product; a tuck tab is not the same construction as a rigid magnetic lid.'], ['Glued or crash-lock bottom', 'Compare assembly steps and the base support required by the packed product. An automatic-bottom name does not establish a safe load rating; review the actual board, glue areas and filled sample.'], ['Window or shaped carton', 'A window can expose the product, while a sleeve or pillow format changes shelf presentation. Review weakened panel areas, film attachment and handling before choosing the shape.']],
  checks: 'Review fold cracking, tab engagement, glue seams, print registration and packing access. For food packaging, identify whether contact is direct or through an inner pack and confirm requirements for the destination and intended use.',
  links: [['/insights/rigid-box-vs-folding-carton', 'Compare rigid boxes and cartons'], ['/insights/printing-finishing-guide', 'Compare print and surface finishes']]
 },
 corrugated: {
  title: 'Match the shipping structure to the complete packed product.',
  choices: [['Roll-end mailer', 'An integrated lid and locking wings create a self-locking mailer. Review the folds, closing sequence and product access. This is corrugated shipping packaging, not a hinged rigid gift box.'], ['Four-flap shipping carton', 'Top and bottom flaps require an agreed sealing method. Confirm internal dimensions, packed weight and whether the carton ships a single product or several retail packs.'], ['Insert and outer pack', 'Dividers, cradles or pads can separate and restrain products. Check movement, contact points and fragile surfaces together with the outer carton; a material name alone does not demonstrate transit protection.']],
  checks: 'Specify board construction, flute direction, seams, sealing and the filled pack. Agree transport and stacking tests appropriate to the route and handling. Compare freight using actual packed carton dimensions and weight, not a blanket savings percentage.',
  links: [['/packaging/custom-inserts', 'Plan dividers and product support'], ['/insights/how-to-write-a-packaging-brief', 'Prepare a complete packaging brief']]
 },
 bag: {
  title: 'Size the bag around the finished gift set.',
  choices: [['Paper handles', 'Choose twisted or flat paper handles with the intended appearance and carrying task in mind. Check attachment, reinforcement and comfort using the actual filled bag.'], ['Ribbon or rope handles', 'Specify handle length, attachment and top reinforcement. Match ribbon color through a physical sample; an attractive handle is not proof of carrying strength.'], ['Box, tissue and card together', 'Measure the closed box, including any sleeve or bow. Allow practical insertion and removal space in the bag, then confirm tissue quantity, card position and packing sequence.']],
  checks: 'Confirm finished width, gusset depth and height, usable opening, base construction and the complete carried weight. Check handle attachment, base seams, rubbing and repeated lifting on the sample; approve each accessory separately.',
  links: [['/packaging/custom-rigid-boxes', 'Coordinate a rigid gift box'], ['/insights/packaging-design-to-production-china', 'Plan a complete box, bag and accessory set']]
 },
 perfume: {
  title: 'Plan the bottle, insert and box together.',
  choices: [['Single bottle', 'Share the bottle with its cap fitted, its weight and the widest points. Nominal capacity such as 50 ml does not define the required cavity.'], ['Discovery set', 'Confirm vial count, spacing and removal access. Compare a paperboard tray with a shaped insert through a physical sample.'], ['Gift or launch set', 'Include every item and its packing orientation. Review lid clearance and contact points before approving artwork.']],
  checks: 'Check bottle movement, cap clearance, removal force and scuffing on the actual decorated bottle. Agree shipping tests for the intended distribution route.',
  links: [['/insights/perfume-box-insert-design', 'Perfume insert planning'], ['/packaging/custom-inserts', 'Compare insert materials']]
 },
 rigid: {
  title: 'Choose a structure around the way you pack and ship.',
  choices: [['Lift-off lid', 'Compare lid depth and opening clearance with the product and insert. Confirm the opening feel on a sample.'], ['Magnetic or drawer box', 'Allow space for hinges, closure or sleeve travel. Review assembly time and the customer’s unboxing sequence.'], ['Fold-flat direction', 'Compare packed-carton volume and assembly labor with an assembled box. Freight savings depend on the final carton plan and shipping route.']],
  checks: 'Confirm finished internal dimensions, board and wrap, corner finish, lid fit, insert fit and artwork placement. Approve physical color and finish samples before production.',
  links: [['/insights/rigid-box-vs-folding-carton', 'Rigid box or folding carton?'], ['/insights/reduce-shipping-costs-rigid-boxes', 'Plan freight and carton volume']]
 },
 inserts: {
  title: 'Select retention and product contact before material.',
  choices: [['Paperboard or corrugated', 'Consider folded supports and dividers. Check movement, load-bearing areas and access on the assembled sample.'], ['Molded pulp', 'Review tooling, surface contact and product tolerances. Confirm the fibre composition and local recovery route rather than assuming recyclability.'], ['Foam or fabric-covered insert', 'Compare cavity fit, compression and contact with the product finish. Mixed materials may require separation after use.']],
  checks: 'Test representative products, including dimensional variation. Check insertion, removal, rubbing and movement; confirm the outer box and transport packaging together.',
  links: [['/insights/perfume-box-insert-design', 'Plan glass-bottle retention'], ['/insights/custom-inserts-product-protection', 'Insert protection guide']]
 }
};
export default function BuyerPlanning({kind}:{kind:keyof typeof guides}) {
 const g=guides[kind];
 return <section className="buyer-planning" aria-label="Packaging buying guide">
  <p className="section-kicker">Before you order</p><h2>{g.title}</h2>
  <div className="buyer-options">{g.choices.map(([title,copy])=><article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
  <div className="buyer-next"><div><h3>What to send for a quote</h3><p>Product dimensions in mm, weight, quantity by size or design, destination, intended use and artwork or reference images. Tell us your preferred material and finish—or ask for a recommendation.</p><p>Price depends on the confirmed specification, tooling and quantity. Sample/tooling charges and freight should be identified separately in the formal quotation.</p></div><div><h3>What to approve in a sample</h3><p>{g.checks}</p><p>Concept visuals illustrate a direction; they are not proof of a completed production order. Final fit, appearance and protection require engineering review and physical sampling.</p></div></div>
  <div className="buyer-actions"><a className="button" href="/request-a-quote">Request a Packaging Review →</a><a href="/tools/gift-box-solution-builder">Try the free box planning tool →</a></div>
  <nav className="buyer-guides" aria-label="Related packaging guides">{g.links.map(([href,label])=><a key={href} href={href}>{label} →</a>)}<a href="/quality-control">Quality control →</a><a href="/how-we-work">Sampling & production process →</a></nav>
 </section>
}
