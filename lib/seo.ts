export const siteUrl = 'https://mttpackaging.com';

export const organization = {
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'MTT Packaging',
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description: 'High-end custom packaging developed around the product, presentation and production requirements.',
  email: 'info@mttpackaging.com',
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
