// Only navigate when a translated counterpart exists; never discard the current page.
export function languageRoute(path, language) {
  const normalized = path.replace(/\/$/, '') || '/';
  const pairs = {'/':'/zh','/request-a-quote':'/zh/request-a-quote','/thank-you':'/zh/thank-you'};
  if(language === 'zh') return pairs[normalized] || path;
  return Object.entries(pairs).find(([,zh]) => zh === normalized)?.[0] || path;
}
