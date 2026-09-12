// Only navigate when a translated counterpart exists; never discard the current page.
export function languageRoute(path, language) {
  const normalized = path.replace(/\/$/, '') || '/';
  if(normalized==='/products'||normalized.startsWith('/products/')) return language==='zh'?'/zh'+normalized:path;
  if(normalized==='/zh/products'||normalized.startsWith('/zh/products/')) return language==='en'?normalized.slice(3):path;
  const pairs = {'/':'/zh','/request-a-quote':'/zh/request-a-quote','/thank-you':'/zh/thank-you'};
  if(language === 'zh') return pairs[normalized] || path;
  return Object.entries(pairs).find(([,zh]) => zh === normalized)?.[0] || path;
}
