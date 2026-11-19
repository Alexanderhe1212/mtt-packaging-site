import {products} from '../lib/products';
import {ProductView} from './ProductGallery';

export default function IndustryProducts({industry}:{industry:string}) {
  const category=industry==='jewelry-watch-packaging'?'jewelry-watches':industry==='gift-set-pr-kit-packaging'?'corporate-gifts':'fragrance-beauty';
  const candidates=products.filter(p=>p.category===category && (industry==='perfume-fragrance-packaging'?/perfume|fragrance|scent/i.test(p.name):industry==='cosmetics-skincare-packaging'?!/perfume|fragrance|scent/i.test(p.name):true));
  const selected=candidates.filter((p,i)=>candidates.findIndex(q=>q.structure===p.structure)===i).slice(0,3);
  return <section className="industry-catalogue">
    <p className="section-kicker">Explore the details</p>
    <h2>Compare packaging designs for your project.</h2>
    <p>Open a design to see five views, its materials and sample review priorities. Each design can be adapted after reviewing your product.</p>
    <div className="product-grid">{selected.map(p=><a className="product-card" key={p.code} href={'/products/'+p.slug}><ProductView src={p.image} alt={p.name}/><div><small>{p.structureName}</small><h3>{p.name}</h3><p>{p.wrap} · {p.finish}</p><b>View design & specifications →</b></div></a>)}</div>
    {industry==='perfume-fragrance-packaging' && <p>Planning several sample vials? <a href="/packaging/custom-perfume-discovery-set-boxes">Compare perfume discovery set boxes</a>, their openings, insert fit and packing routes.</p>}
    {industry==='cosmetics-skincare-packaging' && <p>Planning a jar-and-serum set? <a href="/products/skincare-ritual-collapsible-magnetic-rigid-box">Compare a fold-flat skincare gift box</a>, including mixed-height insert support, packing-site assembly and the complete shipping volume.</p>}
    {industry==='cosmetics-skincare-packaging' && <p>For a biotech skincare gift kit with a cream jar and two bottles, review the <a href="/products/skincare-ritual-book">hinged skincare box with three fitted positions</a>. Send the capped container sizes and logo artwork together so the insert layout and the mark on the textured lid can be reviewed on one sample.</p>}
    {industry==='perfume-fragrance-packaging' && <p>Including a scented card in a cosmetic launch kit? Use the <a href="/insights/scented-cards-cosmetic-gift-box-supplier-brief">scented insert supplier brief</a> to agree who supplies the finished card, where it sits and how the buyer will check scent transfer before approving the pack.</p>}
    {industry==='jewelry-watch-packaging' && <p>Presenting a matched pair? <a href="/products/anniversary-ring-pair-lift-off">Review a two-slot ring gift box</a> for independent removal, stone clearance and lining contact before setting the insert size.</p>}
    {industry==='gift-set-pr-kit-packaging' && <p>For a single boutique accessory, <a href="/products/boutique-accessory-gift-shoulder">compare a padded shoulder-neck gift box</a>. Review the raised rim, finger access and lid fit together before selecting the visible shoulder detail.</p>}
    <a href={`/products?category=${category}`}>Browse all {category==='jewelry-watches'?'jewelry & watch':category==='corporate-gifts'?'corporate gift':'fragrance & beauty'} packaging designs →</a>
  </section>;
}
