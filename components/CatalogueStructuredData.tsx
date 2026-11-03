import { products } from '../lib/products';
import { siteUrl } from '../lib/seo';

export default function CatalogueStructuredData({ zh = false }: { zh?: boolean }) {
  const url = `${siteUrl}${zh ? '/zh' : ''}/products`;
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: zh ? '定制包装产品目录' : 'Custom Packaging Products',
    url,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: zh ? product.nameZh : product.name,
      url: `${url}/${product.slug}`,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
