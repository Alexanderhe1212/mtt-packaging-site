export type Industry = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  products: string[];
  structures: Array<[string, string]>;
  priorities: Array<[string, string]>;
  brief: string[];
  faq: Array<[string, string]>;
};

export const industries: Industry[] = [
  {
    slug: 'perfume-fragrance-packaging', eyebrow: 'Perfume & fragrance',
    image: '/industry/perfume.webp', imageAlt: 'Forest green custom rigid perfume box with fitted insert',
    title: 'Custom perfume boxes that protect the bottle and stage the reveal.',
    summary: 'Premium rigid boxes, discovery-set packaging and fitted inserts developed around bottle geometry, brand presentation and distribution needs.',
    products: ['Eau de parfum bottles', 'Travel sprays', 'Discovery sets', 'Fragrance gift sets'],
    structures: [['Shoulder-neck rigid box', 'A controlled lift-off reveal with a visible neck that can introduce a second brand color.'], ['Book-style magnetic box', 'A presentation-led opening suited to gift sets, launches and multi-piece arrangements.'], ['Lift-off lid box', 'A refined, versatile structure for single bottles and coordinated collections.'], ['Drawer box', 'A sleeve-and-tray format that creates a deliberate reveal and works well with ribbon pulls.']],
    priorities: [['Bottle security', 'The insert should control movement without marking the bottle, cap or decoration.'], ['Opening feel', 'Lid friction, magnet strength and drawer tolerance influence perceived quality.'], ['Finish durability', 'Soft-touch, foil and dark colors need scuff risk considered before production.']],
    brief: ['Bottle dimensions and weight', 'Cap width and fragile details', 'Single bottle or set layout', 'Retail, gifting or PR use', 'Quantity and delivery country'],
    faq: [['Which insert works best for glass perfume bottles?', 'The right choice depends on bottle weight, tolerance, presentation and sustainability target. Paperboard platforms and molded pulp can improve recyclability; EVA or fabric-covered inserts may provide a tighter premium presentation.'], ['Can you package a perfume discovery set?', 'Yes. Share the vial dimensions, count and preferred sequence so the tray spacing, finger access and lid clearance can be evaluated.']],
  },
  {
    slug: 'cosmetics-skincare-packaging', eyebrow: 'Cosmetics & skincare',
    image: '/industry/cosmetics.webp', imageAlt: 'Ivory custom skincare gift box with precision insert',
    title: 'Premium cosmetics packaging built for delicate finishes and mixed formats.',
    summary: 'Custom rigid boxes, folding cartons and launch kits for jars, droppers, palettes and skincare sets—with presentation and product retention designed together.',
    products: ['Serums and droppers', 'Cream jars', 'Makeup palettes', 'Skincare and PR kits'],
    structures: [['Magnetic rigid box', 'A strong option for launch kits, influencer mailers and multi-SKU presentations.'], ['Premium folding carton', 'Efficient for individual retail units while supporting foil, embossing and tactile finishes.'], ['Drawer box', 'Creates a controlled reveal for sets, palettes and accessories.'], ['Multi-level presentation kit', 'Separates products, samples and printed information into an intentional sequence.']],
    priorities: [['Mixed product heights', 'Insert levels and lid clearance should be planned from actual containers, not nominal fill volume.'], ['Surface protection', 'Glass, metallic caps and printed components need separation to reduce rubbing in transit.'], ['Range consistency', 'A shared outer format with adapted inserts can help unify several SKUs.']],
    brief: ['Container dimensions and weights', 'Number of SKUs per pack', 'Retail carton or gift-set purpose', 'Artwork and finish references', 'Quantity by SKU'],
    faq: [['Can one box hold several skincare SKUs?', 'Yes. A common outer box can use a purpose-built insert for the chosen assortment, provided each product dimension, weight and orientation is confirmed.'], ['Should I choose a rigid box or folding carton?', 'Rigid boxes suit high-impact gifting and launches. Folding cartons are usually more space-efficient for individual retail products. Budget, volume and distribution determine the better choice.']],
  },
  {
    slug: 'jewelry-watch-packaging', eyebrow: 'Jewelry & watches',
    image: '/industry/jewelry.webp', imageAlt: 'Charcoal custom jewelry drawer box with fitted presentation insert',
    title: 'Jewelry and watch boxes with precise presentation at a small scale.',
    summary: 'Compact rigid boxes, drawer cases and soft-touch inserts designed to hold fine products securely while keeping every visible edge considered.',
    products: ['Rings and earrings', 'Necklaces and bracelets', 'Watches', 'Luxury accessories'],
    structures: [['Hinged rigid box', 'A classic presentation format for rings, earrings and small valuables.'], ['Drawer box', 'A clean sliding reveal for jewelry collections and accessories.'], ['Lift-off lid box', 'A versatile two-piece structure for necklaces, bracelets and coordinated ranges.'], ['Presentation case with sleeve', 'Adds protection and a second reveal layer for premium or collectible pieces.']],
    priorities: [['Fine tolerances', 'Small gaps, exposed board edges and insert fit are especially visible at jewelry-box scale.'], ['Product contact', 'Velvet, microfiber, paper or foam surfaces should suit the product finish and retention method.'], ['Range architecture', 'Consistent proportions and colors can connect ring, necklace and watch packaging.']],
    brief: ['Product type and dimensions', 'Display angle and retention method', 'Insert surface preference', 'Outer sleeve or bag requirement', 'Quantity per box size'],
    faq: [['Can the insert be fabric covered?', 'Yes. Fabric-covered foam or paper-based platforms can be developed depending on the desired feel, product contact and sustainability requirements.'], ['Can several jewelry box sizes share one visual system?', 'Yes. A coordinated family can use consistent wrap papers, logo position and proportions while adapting the insert and internal dimensions.']],
  },
  {
    slug: 'gift-set-pr-kit-packaging', eyebrow: 'Gift sets & PR kits',
    image: '/industry/gifting.webp', imageAlt: 'Black custom corporate gifting presentation kit',
    title: 'Presentation packaging that guides a multi-product unboxing story.',
    summary: 'Custom gift boxes and launch kits developed around product sequence, shipping protection, assembly and the moment the recipient opens the pack.',
    products: ['Corporate gift sets', 'Influencer PR kits', 'Product launches', 'Seasonal collections'],
    structures: [['Book-style magnetic box', 'Provides a broad presentation area and a clear opening sequence for launch kits.'], ['Drawer presentation box', 'Useful when products should appear gradually or in separate layers.'], ['Two-piece rigid box', 'A clean, flexible format for corporate gifting and seasonal sets.'], ['Fold-flat rigid box', 'Can reduce storage and freight volume when the structure and assembly method suit the project.']],
    priorities: [['Unboxing sequence', 'Product position, printed messages and accessory layers should be mapped before the insert is engineered.'], ['Transit performance', 'Presentation packaging may still need an outer shipper and drop-test plan.'], ['Assembly reality', 'Kitting order, ribbon placement and pack-out time affect the practical design.']],
    brief: ['All item dimensions and weights', 'Desired opening sequence', 'Shipping method and destination', 'Assembly or fulfillment plan', 'Launch date and quantity'],
    faq: [['Can a PR kit be shipped directly without an outer carton?', 'Usually a presentation box benefits from a separate protective shipper. The appropriate transit pack depends on weight, route and handling conditions.'], ['Can you design a fold-flat luxury gift box?', 'Yes, when the product, presentation and assembly requirements support it. The final freight benefit must be checked against packed carton dimensions and shipping method.']],
  },
];

export const getIndustry = (slug: string) => industries.find((item) => item.slug === slug);
