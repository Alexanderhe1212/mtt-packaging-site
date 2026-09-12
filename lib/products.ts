import records from './products.json';
import expanded from './products-expanded.json';
export const products=[...records,...expanded];
export type PackagingProduct=typeof records[number];
export const productBySlug=(slug:string)=>products.find(p=>p.slug===slug);
export const categories=[...new Map(products.map(p=>[p.category,{id:p.category,en:p.categoryName,zh:p.categoryZh}])).values()];
export const structures=[...new Map(products.map(p=>[p.structure,{id:p.structure,en:p.structureName,zh:p.structureZh}])).values()];

export const wrappingPapers=[...new Map(products.map(p=>[p.wrap,{id:p.wrap,en:p.wrap,zh:p.wrapZh}])).values()];

// Keep recommendations in the same application, prioritising different openings.
export function relatedProducts(product: PackagingProduct) {
  return products.filter(p=>p.category===product.category && p.code!==product.code)
    .sort((a,b)=>Number(b.structure!==product.structure)-Number(a.structure!==product.structure)
      || Number(b.wrap===product.wrap)-Number(a.wrap===product.wrap)).slice(0,3);
}
