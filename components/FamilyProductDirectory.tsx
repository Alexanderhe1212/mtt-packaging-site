import {products} from '../lib/products';
export default function FamilyProductDirectory({family}:{family:'carton'|'corrugated'|'bag'}){
 const found=products.filter(p=>p.family===family);
 const groups=[...new Set(found.map(p=>p.structure))];
 return <section className="family-directory" aria-label="Designs by opening structure">
  <p className="section-kicker">Explore {found.length} designs</p>
  <h2>Find a {family==='bag'?'paper bag':family==='carton'?'folding carton':'corrugated packaging'} design for your product</h2>
  <p>Browse by construction, then open a design for five views, materials, finishes and sample review points. Sizes and accessories can be adapted after reviewing your product.</p>
  {groups.map((structure,i)=>{const group=found.filter(p=>p.structure===structure);return <details key={structure} open={i===0}><summary>{group[0].structureName} · {group.length} designs</summary><ul className="family-directory-links">{group.map(p=><li key={p.code}><a href={'/products/'+p.slug}><img src={p.image.replace('/products/','/products/thumbs/').replace('.webp','-0.webp')} alt="" width="80" height="80" loading="lazy"/><span><strong>{p.name}</strong><small>{p.wrap} · {p.finish}</small></span></a></li>)}</ul></details>})}
 </section>;
}
