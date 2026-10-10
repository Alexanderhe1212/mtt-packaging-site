export const siteUrl = 'https://mttpackaging.com';

export const businessSummary = 'MTT Packaging is a custom packaging development and manufacturing partner in China, coordinating rigid boxes, folding cartons, corrugated packaging, paper bags and custom inserts for international brands.';

export const organization = {
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'MTT Packaging',
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description: businessSummary,
  image: `${siteUrl}/og.jpg`,
  email: 'info@mttpackaging.com',
  telephone: '+86 17207110964',
  // Entity facts below repeat what the About, Quality Control and FAQ pages already state.
  address: { '@type': 'PostalAddress', addressLocality: 'Shenzhen', addressRegion: 'Guangdong', addressCountry: 'CN' },
  areaServed: 'Worldwide',
  knowsAbout: ['Custom rigid boxes', 'Magnetic closure boxes', 'Drawer boxes', 'Folding cartons', 'Corrugated mailer boxes', 'Custom paper bags', 'Custom packaging inserts', 'Perfume packaging', 'Cosmetic packaging', 'Jewelry and watch packaging', 'Gift set packaging', 'Packaging sampling and quality control'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Custom packaging',
    itemListElement: [
      ['Custom rigid boxes', '/packaging/custom-rigid-boxes'],
      ['Folding cartons', '/packaging/folding-cartons'],
      ['Corrugated boxes', '/packaging/corrugated-boxes'],
      ['Custom paper bags', '/packaging/custom-paper-bags'],
      ['Custom inserts', '/packaging/custom-inserts'],
    ].map(([name, path]) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name, url: `${siteUrl}${path}` } })),
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+86 17207110964',
    email: 'info@mttpackaging.com',
    availableLanguage: ['English', 'Chinese'],
    areaServed: 'Worldwide',
  },
};

export const breadcrumb = (items: Array<[string, string]>) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], index) => ({
    '@type': 'ListItem', position: index + 1, name, item: `${siteUrl}${path}`,
  })),
});
