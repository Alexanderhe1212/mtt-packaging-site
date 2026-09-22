import {articles} from './articles';
import {products} from './products';

// Editorial groupings: shared buying decisions, not catalogue position or keyword stuffing.
const topics = [
  {articles:['cosmetic-pump-bottle-gift-box-clearance','molded-pulp-inserts-cosmetic-packaging','custom-packaging-sampling-process','skincare-packaging-series-analysis'], products:['skincare-ritual-book','custom-skincare-duo-auto-bottom','three-compartment-skincare-mailer']},
  {articles:['necklace-packaging-chain-management','jewelry-packaging-repeat-use-analysis','custom-inserts-product-protection','custom-packaging-sampling-process'], products:['pendant-presentation-drawer','engagement-ring-keepsake-lift-off','watch-and-strap-collection-book']},
  {articles:['perfume-discovery-set-packaging','match-gold-foil-perfume-box-paper-bag','perfume-box-and-bag-packaging','perfume-box-inserts','perfume-box-insert-design','fragrance-packaging-brand-pattern-analysis','modular-perfume-packaging-analysis','skincare-packaging-series-analysis','molded-pulp-inserts-cosmetic-packaging'], products:['signature-perfume-lift-off','travel-fragrance-trio-drawer','custom-perfume-bottle-ribbon-bag']},
  {articles:['packaging-inserts-for-handmade-glass-products','custom-inserts-product-protection','electronics-paperboard-insert-analysis','perfume-box-inserts','molded-pulp-inserts-cosmetic-packaging'], products:['custom-candle-packaging-set','signature-perfume-lift-off','three-compartment-skincare-mailer']},
  {articles:['hexagonal-rigid-gift-box-structure-analysis','custom-box-structure-guide','rigid-box-vs-folding-carton','window-carton-presentation-analysis','fold-flat-triangular-gift-box-shipping-volume'], products:['signature-perfume-lift-off','window-bakery-folding-carton','custom-corrugated-packaging-set']},
  {articles:['custom-packaging-cost-guide','reduce-custom-packaging-costs','reduce-shipping-costs-rigid-boxes','fold-flat-triangular-gift-box-shipping-volume'], products:['custom-skincare-duo-auto-bottom','three-compartment-skincare-mailer','custom-coffee-pouches-flat-handle-bag']},
  {articles:['packaging-material-selection','packaging-materials-guide','printing-finishing-guide','ppwr-packaging-requirements','molded-pulp-inserts-cosmetic-packaging'], products:['signature-perfume-lift-off','custom-carton-packaging-set','custom-bag-packaging-set']},
  {articles:['5-things-before-ordering-custom-packaging','how-to-write-a-packaging-brief','custom-packaging-sampling-process','packaging-design-to-production-china','reduce-packaging-sampling-rounds'], products:['custom-wine-packaging-set','custom-skincare-duo-auto-bottom','custom-bag-packaging-set']},
  {articles:['double-door-wine-gift-box-design-review','christmas-drawer-gift-box-packout-review','collectors-packaging-story-material-analysis','tea-gift-box-drawer-analysis','jewelry-packaging-repeat-use-analysis'], products:['twin-wine-double-door-gift-box','four-drawer-christmas-gift-cabinet','coffee-tasting-flight-drawer']},
];
const specificProducts: Record<string,string[]> = {
  'perfume-discovery-set-packaging':['perfume-discovery-library-double-door','travel-fragrance-trio-drawer','signature-perfume-lift-off'],
  'jewelry-packaging-repeat-use-analysis':['engagement-ring-keepsake-lift-off','pendant-presentation-drawer','watch-and-strap-collection-book'],
  'tea-gift-box-drawer-analysis':['tea-tin-pairing-lift-off','coffee-tasting-flight-drawer','chocolate-selection-book'],
  'double-door-wine-gift-box-design-review':['twin-wine-double-door-gift-box','custom-wine-packaging-set','single-wine-cotton-handle-paper-bag'],
  'christmas-drawer-gift-box-packout-review':['four-drawer-christmas-gift-cabinet','custom-christmas-packaging-set','custom-festive-confectionery-pillow'],
  'skincare-packaging-series-analysis':['skincare-ritual-book','custom-skincare-duo-auto-bottom','custom-skincare-duo-cord-bag'],
};
export function articleNavigation(slug:string) {
  const matched=topics.filter(topic=>topic.articles.includes(slug));
  const relatedSlugs=[...new Set(matched.flatMap(topic=>topic.articles))].filter(s=>s!==slug).slice(0,3);
  const productSlugs=specificProducts[slug] || matched[0]?.products || [];
  return {
    related:relatedSlugs.flatMap(s=>articles.filter(a=>a.slug===s)),
    designs:productSlugs.flatMap(s=>products.filter(p=>p.slug===s)),
  };
}
