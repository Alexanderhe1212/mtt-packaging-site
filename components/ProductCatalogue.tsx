'use client';
import {useSyncExternalStore} from 'react';
import {products,categories,structures,wrappingPapers} from '../lib/products';
import {jarTinProductCodes} from '../lib/container-packaging';
import {ProductView} from './ProductGallery';
const displayOrder=['MTT-R0101','MTT-R0202','MTT-R0401','MTT-R0507','MTT-R0107','MTT-R0303','MTT-R0209','MTT-R0402','MTT-R0304','MTT-R0501','MTT-R0602','MTT-R0604'];
// A stable mix keeps bookmarks predictable while avoiding blocks of near-identical designs.
const mixed=products.filter(p=>!displayOrder.includes(p.code)).sort((a,b)=>{
 const rank=(code:string)=>Math.imul([...code].reduce((n,c)=>(n*31+c.charCodeAt(0))%997,0),2654435761)>>>0;
 return rank(a.code)-rank(b.code)||a.code.localeCompare(b.code);
});
const catalogueProducts=[...mixed];
displayOrder.forEach((code,i)=>{const p=products.find(p=>p.code===code);if(p)catalogueProducts.splice(i*7,0,p)});
function subscribeSearch(listener:()=>void){
 window.addEventListener('popstate',listener);window.addEventListener('mtt:catalogue-filter',listener);
 return()=>{window.removeEventListener('popstate',listener);window.removeEventListener('mtt:catalogue-filter',listener)}
}
const readSearch=()=>window.location.search;
const serverSearch=()=>'';
export default function ProductCatalogue({zh=false,compact=false}:{zh?:boolean;compact?:boolean}){
 // The server and hydration render use the same empty URL snapshot.
 const search=useSyncExternalStore(subscribeSearch,readSearch,serverSearch);
 const params=new URLSearchParams(search);
 const family=['rigid','carton','corrugated','bag'].includes(params.get('family')||'')?params.get('family')! : '';
 const structure=structures.some(item=>item.id===params.get('structure'))?params.get('structure')! : '';
 const category=categories.some(item=>item.id===params.get('category'))?params.get('category')! : '';
 const wrap=wrappingPapers.some(item=>item.id===params.get('wrap'))?params.get('wrap')! : '';
 const query=params.get('q')||'';
 const jarTin=params.get('contents')==='jar-tin';
 const scopedProducts=jarTin?products.filter(p=>jarTinProductCodes.has(p.code)):products;
 const scopedCategories=categories.filter(c=>scopedProducts.some(p=>p.category===c.id));
 // Keep the current selection on reload and browser Back without adding a history entry per keystroke.
 function updateFilters(changes:Record<string,string>){
  const url=new URL(window.location.href);
  for(const [key,value] of Object.entries(changes)){if(value)url.searchParams.set(key,value);else url.searchParams.delete(key)}
  window.history.replaceState(window.history.state,'',url);
  window.dispatchEvent(new Event('mtt:catalogue-filter'));
 }
 const clearFilters=()=>updateFilters({family:'',structure:'',category:'',wrap:'',q:'',contents:''});
 const found=catalogueProducts.filter(p=>(!jarTin||jarTinProductCodes.has(p.code))&&(!family||p.family===family)&&(!category||p.category===category)&&(!structure||p.structure===structure)&&(!wrap||p.wrap===wrap)&&[p.name,p.nameZh,p.code,p.categoryName,p.categoryZh,p.structureName,p.structureZh,p.material,p.materialZh,p.wrap,p.wrapZh,p.finish,p.finishZh,p.contents,p.contentsZh,p.insert,p.insertZh,...p.searchTerms].join(' ').toLowerCase().includes(query.toLowerCase().trim()));
 return <div className={compact?"pf-compact-catalogue":undefined}>
 <div className="catalogue-search product-filters"><label>{zh?'搜索产品、材料或工艺':'Search products, materials or finishes'}<input type="search" value={query} onChange={e=>updateFilters({q:e.target.value})} placeholder={zh?'例如：抽屉、烫金、香水':'Try drawer, foil, perfume'}/></label></div>
 <details className="catalogue-refine"><summary>{zh?'用途、结构与材料筛选':'Filter by application, structure & material'}</summary>

 <div className="product-filters"><label>{zh?'产品用途':'Application'}<select value={category} onChange={e=>updateFilters({category:e.target.value})}><option value="">{zh?'全部用途':'All applications'}</option>{scopedCategories.map(c=><option key={c.id} value={c.id}>{zh?c.zh:c.en}</option>)}</select></label><label>{zh?'开合结构':'Opening structure'}<select value={structure} onChange={e=>updateFilters({structure:e.target.value})}><option value="">{zh?'全部结构':'All structures'}</option>{structures.filter(s=>products.some(p=>(!family||p.family===family)&&p.structure===s.id)).map(s=><option key={s.id} value={s.id}>{zh?s.zh:s.en}</option>)}</select></label><label>{zh?'纸张 / 表面材料':'Paper / surface material'}<select value={wrap} onChange={e=>updateFilters({wrap:e.target.value})}><option value="">{zh?'全部纸张':'All papers'}</option>{wrappingPapers.filter(w=>products.some(p=>(!family||p.family===family)&&p.wrap===w.id)).map(w=><option key={w.id} value={w.id}>{zh?w.zh:w.en}</option>)}</select></label></div>
 </details>
 <div className="product-categories product-family-tabs" role="group" aria-label={zh?'包装大类':'Packaging families'}>{[['','All packaging','全部包装'],['rigid','Rigid gift boxes','精品硬盒'],['carton','Folding cartons','卡纸盒'],['corrugated','Corrugated boxes','瓦楞盒'],['bag','Paper bags','手提袋']].map(([id,en,cn])=><button key={id} aria-pressed={family===id} onClick={()=>{updateFilters({family:id,structure:'',wrap:''})}}>{zh?cn:en}</button>)}</div>
 <p>{zh?'礼赠展示可比较硬盒，单品零售可比较卡纸盒，发货可比较瓦楞结构，购物携带可比较手提袋。运输保护还需核对完整装箱方案。':'Compare rigid boxes for gift presentation, folding cartons for individual retail packs, corrugated structures for shipping, and paper bags for carrying purchases. Review the complete packed configuration for transit protection.'}</p>
 <section className="catalogue-applications" aria-label={zh?'按产品找包装':'Find packaging for your product'}>
 <h2>{zh?'您需要包装什么产品？':'What are you packaging?'}</h2>
 <p>{zh?'先选产品用途，再比较盒型、内衬和工艺。尺寸、重量和运输方式需结合样品确认。':'Choose your product, then compare box structures, inserts and finishes. Confirm fit with your product dimensions, weight and shipping requirements.'}</p>
 <div className="product-categories product-application-tabs" role="group" aria-label={zh?'选择产品用途':'Choose an application'}>{scopedCategories.map(c=><button type="button" key={c.id} aria-pressed={category===c.id} onClick={()=>{updateFilters({category:category===c.id?'':c.id,family:'',structure:'',wrap:''})}}><b>{zh?c.zh:c.en}</b><span>{scopedProducts.filter(p=>p.category===c.id).length} {zh?'款':scopedProducts.filter(p=>p.category===c.id).length===1?'design':'designs'}</span></button>)}</div>
 </section>
 <section className="container-packaging-options" aria-label={zh?'罐体与外包装':'Containers and outer packaging'}>
 <h2>{zh?'需要罐体，还是装罐的外盒？':'Need the container or the outer box?'}</h2>
 <div className="product-categories">
 <button type="button" data-testid="jar-tin-filter" aria-pressed={jarTin} onClick={()=>updateFilters({contents:jarTin?'':'jar-tin',family:'',category:'',structure:'',wrap:'',q:''})}>{zh?'罐装产品纸质外盒':'Paper outer boxes for jars & tins'}</button>
 <a className="button" href="/packaging/custom-metal-tins">{zh?'金属罐体定制 →':'Custom metal containers →'}</a>
 </div>
 <p>{zh?'纸质外盒用于包装已有罐体；金属罐体另行确认材质、尺寸、盖型和内表面要求。':'Paper outer boxes package your existing jars or tins. Specify the metal container separately: material, dimensions, closure and internal surface requirements.'}</p>
 {jarTin&&<p>{zh?'已筛选罐装产品外盒：可继续选择用途及盒型，比较礼赠、零售或运输方案。':'Showing jar and tin outer boxes. Refine by application and box family to compare gift, retail or shipping options.'}</p>}
 </section>
 <div className="product-results"><p role="status">{found.length} {zh?'款包装':found.length===1?'packaging design':'packaging designs'}</p>{(family||query||category||structure||wrap||jarTin)&&<button type="button" onClick={clearFilters}>{zh?'清除筛选':'Clear filters'}</button>}</div>
 <div className="product-grid">{found.map(p=><a className="product-card" key={p.code} href={`${zh?'/zh':''}/products/${p.slug}`}><ProductView card compact={compact} src={p.image} alt={zh?p.nameZh:p.name}/>{compact&&<span className="pf-card-alternate" aria-hidden="true"><img src={p.image.replace(".webp","-3.webp")} alt={`${p.name} — interior detail`} loading="lazy" width="500" height="500"/></span>}<div><small>{zh?p.familyZh:p.familyName} · {p.code} · {zh?p.structureZh:p.structureName}</small><h2>{zh?p.nameZh:p.name}</h2>{!compact&&<p>{zh?p.wrapZh:p.wrap} · {zh?p.finishZh:p.finish}</p>}<b>{zh?'查看视角及规格 →':'Explore views & specifications →'}</b></div></a>)}</div>
 {!found.length&&<section className="catalogue-empty" aria-label={zh?'未找到匹配方案':'No matching designs'}><h2>{zh?'还没找到合适的包装？':'Not seeing the packaging you need?'}</h2><p>{zh?'尝试减少筛选条件，或提供产品照片、尺寸、数量及使用场景，让我们一起确认合适的结构。':'Try fewer filters, or share your product photos, dimensions, quantity and intended use so we can review a suitable structure.'}</p><a className="button" href={`${zh?'/zh':''}/request-a-quote${family?'?product_family='+family:''}`}>{zh?'提交包装需求 →':'Discuss your packaging requirements →'}</a></section>}
 </div>;
}
