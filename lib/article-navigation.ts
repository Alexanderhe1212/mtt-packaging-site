import {articles} from './articles';
import {products} from './products';

// Editorial groupings: shared buying decisions, not catalogue position or keyword stuffing.
const topics = [
  {articles:['perfume-refill-set-box-packaging-guide','perfume-box-inserts','measure-packaging-internal-external-dimensions','custom-packaging-sampling-process'],products:['perfume-and-refill-lift-off','signature-perfume-lift-off','travel-fragrance-trio-drawer']},
  {articles:['custom-tea-tins-buying-guide','custom-packaging-sampling-process','stock-vs-custom-packaging-total-cost','tea-gift-box-drawer-analysis'],products:['tea-tin-pairing-lift-off','custom-tea-tin-sleeve-carton','custom-tea-tin-mailer']},
  {articles:['two-tier-fragrance-layering-set-packaging','perfume-discovery-set-packaging','perfume-box-inserts','custom-packaging-sampling-process'],products:['fragrance-layering-set-tiered','signature-perfume-lift-off','travel-fragrance-trio-drawer']},
  {articles:['rigid-box-with-window-design','window-carton-presentation-analysis','two-piece-rigid-box-lid-fit','custom-packaging-sampling-process'],products:['signature-perfume-lift-off','window-bakery-folding-carton','custom-tea-sachets-window-tuck']},
  {articles:['book-style-magnetic-box-design','two-piece-rigid-box-lid-fit','chocolate-gift-box-secondary-packaging','paper-gsm-vs-board-thickness','custom-packaging-sampling-process'],products:['chocolate-selection-book','skincare-ritual-book','facial-oil-and-stone-book']},
  {articles:['round-rigid-tube-box-fit','two-piece-rigid-box-lid-fit','measure-packaging-internal-external-dimensions','custom-packaging-sampling-process'],products:['single-jar-wellness-gift-round','premium-supplement-tin-round','round-biscuit-tin-gift-round']},
  {articles:['void-fill-vs-fitted-inserts','eva-vs-paperboard-inserts','custom-inserts-product-protection','custom-packaging-sampling-process'],products:['three-compartment-skincare-mailer','custom-corrugated-packaging-set','custom-skincare-duo-auto-bottom']},
  {articles:['paperboard-sleeve-tray-fit','paper-gsm-vs-board-thickness','folding-carton-closure-selection','custom-packaging-sampling-process'],products:['custom-coffee-pouches-sleeve-carton','custom-tea-tin-sleeve-carton','custom-jewelry-pouch-sleeve-carton']},
  {articles:['watch-box-cushion-sizing','measure-packaging-internal-external-dimensions','custom-packaging-sampling-process','rigid-gift-box-shipping-outer-carton'],products:['watch-and-strap-collection-book','single-watch-round-case-round','watch-boutique-presentation-double-door']},
  {"articles": ["two-piece-rigid-box-lid-fit", "measure-packaging-internal-external-dimensions", "custom-packaging-sampling-process", "rigid-gift-box-shipping-outer-carton"], "products": ["signature-perfume-lift-off", "engagement-ring-keepsake-lift-off", "perfume-and-refill-lift-off"]},
  {"articles": ["chocolate-gift-box-secondary-packaging", "paper-gsm-vs-board-thickness", "custom-packaging-sampling-process", "rigid-gift-box-shipping-outer-carton"], "products": ["chocolate-selection-book", "chocolate-tasting-library-stacked-drawers", "celebration-chocolate-round-round"]},

  {articles:['qr-code-on-packaging-print-test','packaging-artwork-dieline-preflight','printing-finishing-guide','custom-packaging-sampling-process'],products:['custom-carton-packaging-set','custom-perfume-bottle-tuck','custom-skincare-duo-auto-bottom']},
  {articles:['holiday-packaging-production-planning','christmas-drawer-gift-box-packout-review','custom-packaging-sampling-process','packaging-artwork-dieline-preflight'],products:['four-drawer-christmas-gift-cabinet','christmas-gift-collapsible-magnetic-rigid-box','custom-christmas-packaging-set']},
  {articles:['blind-debossed-logo-packaging-boxes','matte-vs-gloss-packaging-scuffing','packaging-artwork-dieline-preflight','custom-packaging-sampling-process'],products:['engagement-ring-keepsake-lift-off','signature-perfume-lift-off','skincare-ritual-book']},
  {articles:['unbranded-shipping-carton-premium-gift','rigid-gift-box-shipping-outer-carton','corrugated-mailer-shipping-box-specification','packaging-reorder-specification-change-control'],products:['custom-corrugated-packaging-set','three-compartment-skincare-mailer','custom-tea-tin-mailer']},
  {articles:['eva-vs-paperboard-inserts','custom-inserts-product-protection','perfume-box-insert-design','custom-packaging-sampling-process'],products:['custom-diffuser-packaging-set','signature-perfume-lift-off','three-compartment-skincare-mailer']},
  {articles:['cmyk-vs-spot-colour-packaging','printing-finishing-guide','packaging-artwork-dieline-preflight','match-gold-foil-perfume-box-paper-bag'],products:['custom-skincare-duo-cord-bag','custom-perfume-bottle-ribbon-bag','signature-perfume-lift-off']},
  {articles:['collapsible-rigid-box-assembly-checklist','custom-packaging-sampling-process','reduce-shipping-costs-rigid-boxes','measure-packaging-internal-external-dimensions'],products:["perfume-duo-collapsible-magnetic-rigid-box", "travel-fragrance-collapsible-magnetic-rigid-box", "skincare-ritual-collapsible-magnetic-rigid-box"]},
  {articles:['paper-bag-material-selection','paper-bag-size-handles-load-check','paper-gsm-vs-board-thickness','custom-packaging-sampling-process'],products:["custom-perfume-bottle-ribbon-bag", "custom-skincare-duo-cord-bag", "custom-candle-jar-cord-bag"]},
  {articles:['candle-box-glass-jar-protection','packaging-inserts-for-handmade-glass-products','custom-inserts-product-protection','rigid-gift-box-shipping-outer-carton'],products:['custom-candle-packaging-set','celebration-candle-gift-round','custom-diffuser-packaging-set']},
  {articles:['pr-kit-packaging-packout-checklist','shared-box-multiple-cosmetic-skus','custom-inserts-product-protection','custom-packaging-sampling-process'],products:['skincare-ritual-book','three-compartment-skincare-mailer','custom-skincare-duo-auto-bottom']},
  {articles:['matte-vs-gloss-packaging-scuffing','packaging-artwork-dieline-preflight','printing-finishing-guide','match-gold-foil-perfume-box-paper-bag','custom-packaging-sampling-process'],products:['coffee-tasting-flight-drawer','chocolate-selection-book','signature-perfume-lift-off']},
  {articles:['drawer-box-clearance-ribbon-pull','custom-packaging-sampling-process','paper-gsm-vs-board-thickness','tea-gift-box-drawer-analysis'],products:['coffee-tasting-flight-drawer','chocolate-selection-book','travel-fragrance-trio-drawer']},
  {articles:['paper-gsm-vs-board-thickness','packaging-material-selection','measure-packaging-internal-external-dimensions','custom-packaging-sampling-process'],products:['signature-perfume-lift-off','custom-skincare-duo-auto-bottom','custom-corrugated-packaging-set']},
  {articles:['e-flute-vs-b-flute-corrugated-boxes','corrugated-mailer-shipping-box-specification','measure-packaging-internal-external-dimensions','custom-inserts-product-protection'],products:['three-compartment-skincare-mailer','custom-corrugated-packaging-set','custom-skincare-duo-auto-bottom']},
  {articles:['rigid-gift-box-shipping-outer-carton','measure-packaging-internal-external-dimensions','corrugated-mailer-shipping-box-specification','reduce-shipping-costs-rigid-boxes'],products:['signature-perfume-lift-off','custom-corrugated-packaging-set','three-compartment-skincare-mailer']},
  {articles:['measure-packaging-internal-external-dimensions','rigid-box-vs-folding-carton','corrugated-mailer-shipping-box-specification','custom-packaging-sampling-process'],products:['signature-perfume-lift-off','custom-skincare-duo-auto-bottom','custom-corrugated-packaging-set']},
  {"articles": ["fsc-certified-custom-packaging-buyers-guide", "packaging-material-selection", "recycled-vs-recyclable-packaging-boxes", "custom-packaging-sampling-process"], "products": ["signature-perfume-lift-off", "custom-skincare-duo-auto-bottom", "custom-bag-packaging-set"]},
  {"articles": ["gmi-printing-certification-packaging-colour-control", "printing-finishing-guide", "match-gold-foil-perfume-box-paper-bag", "custom-packaging-sampling-process"], "products": ["signature-perfume-lift-off", "custom-skincare-duo-auto-bottom", "custom-bag-packaging-set"]},
  {"articles": ["stock-vs-custom-packaging-total-cost", "verify-custom-packaging-supplier-china", "iso-certification-packaging-supplier-verification", "custom-packaging-inspection-checklist", "packaging-reorder-specification-change-control", "custom-packaging-sampling-process"], "products": ["signature-perfume-lift-off", "custom-skincare-duo-auto-bottom", "custom-bag-packaging-set"]},
  {"articles": ["ce-marking-custom-packaging-artwork-guide", "ppwr-packaging-requirements", "shared-box-multiple-cosmetic-skus", "custom-packaging-sampling-process"], "products": ["signature-perfume-lift-off", "custom-skincare-duo-auto-bottom", "custom-bag-packaging-set"]},
  {"articles": ["sedex-smeta-packaging-supplier-audit-guide", "how-to-write-a-packaging-brief", "custom-packaging-inspection-checklist", "custom-packaging-sampling-process"], "products": ["signature-perfume-lift-off", "custom-skincare-duo-auto-bottom", "custom-bag-packaging-set"]},

  {"articles": ["custom-packaging-inspection-checklist", "custom-packaging-sampling-process", "packaging-reorder-specification-change-control", "printing-finishing-guide"], "products": ["signature-perfume-lift-off", "custom-skincare-duo-auto-bottom", "custom-bag-packaging-set"]},
  {"articles": ["folding-carton-closure-selection", "custom-box-structure-guide", "packaging-materials-guide", "custom-packaging-sampling-process"], "products": ["custom-skincare-duo-auto-bottom", "custom-carton-packaging-set", "window-bakery-folding-carton"]},
  {"articles": ["corrugated-mailer-shipping-box-specification", "custom-inserts-product-protection", "rigid-box-vs-folding-carton", "reduce-shipping-costs-rigid-boxes"], "products": ["three-compartment-skincare-mailer", "custom-corrugated-packaging-set", "custom-skincare-duo-auto-bottom"]},
  {"articles": ["paper-bag-size-handles-load-check", "perfume-box-and-bag-packaging", "match-gold-foil-perfume-box-paper-bag", "packaging-material-selection"], "products": ["custom-bag-packaging-set", "custom-perfume-bottle-ribbon-bag", "custom-coffee-pouches-flat-handle-bag"]},
  {"articles": ["packaging-reorder-specification-change-control", "custom-packaging-sampling-process", "custom-packaging-storage-scheduled-delivery", "shared-box-multiple-cosmetic-skus"], "products": ["signature-perfume-lift-off", "custom-skincare-duo-auto-bottom", "custom-bag-packaging-set"]},

  {articles:['shared-box-multiple-cosmetic-skus','cosmetic-pump-bottle-gift-box-clearance','molded-pulp-inserts-cosmetic-packaging','custom-packaging-sampling-process'],products:['skincare-ritual-book','custom-skincare-duo-auto-bottom','three-compartment-skincare-mailer']},
  {articles:['kraft-paper-recycled-content-strength','recycled-vs-recyclable-packaging-boxes','plastic-lamination-free-packaging-boxes','sustainable-luxury-packaging-boxes-approval','packaging-material-selection'],products:['signature-perfume-lift-off','custom-carton-packaging-set','custom-bag-packaging-set']},
  {articles:['sustainable-luxury-packaging-boxes-approval','packaging-material-selection','molded-pulp-inserts-cosmetic-packaging','custom-packaging-sampling-process'], products:['signature-perfume-lift-off','custom-carton-packaging-set','custom-bag-packaging-set']},
  {articles:['custom-packaging-storage-scheduled-delivery','reduce-shipping-costs-rigid-boxes','how-to-write-a-packaging-brief','custom-packaging-sampling-process'], products:['signature-perfume-lift-off','custom-skincare-duo-auto-bottom','custom-bag-packaging-set']},
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
  'perfume-refill-set-box-packaging-guide':['perfume-and-refill-lift-off','signature-perfume-lift-off','travel-fragrance-trio-drawer'],
  'custom-tea-tins-buying-guide':['tea-tin-pairing-lift-off','custom-tea-tin-sleeve-carton','custom-tea-tin-mailer'],
  "book-style-magnetic-box-design":["chocolate-selection-book","skincare-ritual-book","facial-oil-and-stone-book"],
  // No equivalent electronics or triangular product is currently catalogued; keep the guide enquiry path.
  "electronics-paperboard-insert-analysis":[],
  "fold-flat-triangular-gift-box-shipping-volume":[],
  "hexagonal-rigid-gift-box-structure-analysis":["hexagonal-diffuser-lift-off-gift-box", "seasonal-tea-trio-hexagonal", "festival-sweets-collection-hexagonal"],
  "window-carton-presentation-analysis":["window-bakery-folding-carton", "custom-sealed-macarons-window-tuck", "custom-tea-sachets-window-tuck"],
  "collectors-packaging-story-material-analysis":["collector-watch-drawers-stacked-drawers", "cufflink-collector-stacked-drawers", "watch-collectors-set-tiered"],
  "perfume-box-and-bag-packaging":["signature-perfume-lift-off", "perfume-and-refill-lift-off", "custom-perfume-bottle-ribbon-bag"],
  "perfume-box-insert-design":["signature-perfume-lift-off", "perfume-and-refill-lift-off", "travel-fragrance-trio-drawer"],
  "perfume-box-inserts":["signature-perfume-lift-off", "perfume-and-refill-lift-off", "perfume-discovery-library-double-door"],
  "paper-gsm-vs-board-thickness":["signature-perfume-lift-off", "custom-skincare-duo-auto-bottom", "custom-skincare-duo-cord-bag"],
  "packaging-materials-guide":["signature-perfume-lift-off", "custom-skincare-duo-auto-bottom", "custom-corrugated-packaging-set"],
  "measure-packaging-internal-external-dimensions":["signature-perfume-lift-off", "custom-skincare-duo-auto-bottom", "custom-corrugated-packaging-set"],
  "packaging-reorder-specification-change-control":["signature-perfume-lift-off", "custom-skincare-duo-auto-bottom", "custom-bag-packaging-set"],
  "match-gold-foil-perfume-box-paper-bag":["signature-perfume-lift-off", "perfume-and-refill-lift-off", "custom-perfume-bottle-ribbon-bag"],
  "drawer-box-clearance-ribbon-pull":["coffee-tasting-flight-drawer", "artisan-cookie-assortment-drawer", "travel-fragrance-trio-drawer"],
  "e-flute-vs-b-flute-corrugated-boxes":["three-compartment-skincare-mailer", "custom-corrugated-packaging-set", "custom-tea-tin-mailer"],

  'kraft-paper-recycled-content-strength':['custom-skincare-duo-auto-bottom','custom-reed-diffuser-tuck','custom-tea-sachets-corr-sleeve'],
  'verify-custom-packaging-supplier-china':['tea-tin-pairing-lift-off','custom-tea-tin-sleeve-carton','custom-tea-tin-mailer'],
  'rigid-box-vs-folding-carton':['signature-perfume-lift-off','custom-skincare-duo-auto-bottom','custom-corrugated-packaging-set'],
  'two-tier-fragrance-layering-set-packaging':['fragrance-layering-set-tiered','signature-perfume-lift-off','travel-fragrance-trio-drawer'],
  'perfume-discovery-set-packaging':['perfume-discovery-library-double-door','travel-fragrance-trio-drawer','signature-perfume-lift-off'],
  'jewelry-packaging-repeat-use-analysis':['engagement-ring-keepsake-lift-off','pendant-presentation-drawer','watch-and-strap-collection-book'],
  'tea-gift-box-drawer-analysis':['tea-and-honey-pairing-stacked-drawers','tea-tin-pairing-lift-off','tea-ceremony-collection-double-door'],
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
