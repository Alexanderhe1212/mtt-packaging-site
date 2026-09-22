import {articles} from './articles';
import {businessSummary,siteUrl} from './seo';

// Build from the same article records used by the visible site; no separate AI claims.
export function discoveryText(){
 const pages=[
  ['Products','/products','Browse designs by industry and packaging family.'],
  ['Rigid boxes','/packaging/custom-rigid-boxes','Lift-off lids, magnetic closures, drawers and presentation structures.'],
  ['Folding cartons','/packaging/folding-cartons','Printed folding paperboard packaging.'],
  ['Corrugated boxes','/packaging/corrugated-boxes','Mailers, dividers and shipping-pack review.'],
  ['Paper bags','/packaging/custom-paper-bags','Custom handles, printing and coordinated retail bags.'],
  ['Custom inserts','/packaging/custom-inserts','Compare paperboard, molded pulp, foam and other insert options.'],
  ['Packaging design tool','/tools/gift-box-solution-builder','Choose a structure and prepare a design brief; engineering review is required.'],
  ['Box size calculator','/tools/box-size-calculator','Plan size and handling clearance before a physical sample.'],
  ['Request a quote','/request-a-quote','Send dimensions, quantity, destination and artwork or reference links.'],
  ['How we work','/how-we-work','Specification review, sampling, production and delivery.'],
  ['Quality control','/quality-control','Fit, opening, surface and packing checks.'],
  ['About MTT','/about','Business background and contact details.'],
  ['Sustainability','/sustainability','Project-specific material and environmental claim review.'],
 ];
 return `# MTT Packaging\n\n> ${businessSummary}\n\n## Contact\nHugo He · info@mttpackaging.com · WhatsApp +86 17207110964\nWebsite: ${siteUrl}\n\n## Buyer paths\n${pages.map(([name,path,description])=>`- [${name}](${siteUrl}${path}): ${description}`).join('\n')}\n\n## Packaging guides\n${articles.map(a=>`- [${a.title}](${siteUrl}/insights/${a.slug})`).join('\n')}\n\n## Before requesting production pricing\nShare product length × width × height, weight, quantity, delivery country, opening preference, artwork and accessories. Distinguish product dimensions, finished internal box size and external shipping dimensions. Confirm the actual product fit and finishes with a physical sample. Sample/tooling charges and freight are confirmed separately.\n\n## Scope and evidence\nMost fully custom projects start from 1,000 pieces per design; practical quantities depend on the structure and process. Images can show custom design visualizations and are not evidence of a delivered client order. Certification, food-contact suitability and environmental claims require project-specific review and supporting documentation. The linked website pages provide the full context.\n`;
}
