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
    <a href="/products">Explore the complete rigid box collection →</a>
  </section>;
}
