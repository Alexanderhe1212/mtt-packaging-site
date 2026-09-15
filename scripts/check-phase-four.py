from datetime import date
"""Check enquiry-catalogue schema and three expanded buying guides in built HTML."""
import json
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.schemas=[]; self.links=[]; self.ld=False; self.data=''; self.feed(text)
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag=='script' and attrs.get('type')=='application/ld+json': self.ld=True; self.data=''
        if tag=='a': self.links.append(attrs.get('href',''))
    def handle_data(self,data):
        if self.ld:self.data+=data
    def handle_endtag(self,tag):
        if tag=='script' and self.ld:self.schemas.append(json.loads(self.data));self.ld=False

root=Path('dist/client')
products=json.loads(Path('lib/products.json').read_text())+json.loads(Path('lib/products-expanded.json').read_text())
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
dates={n.find('s:loc',ns).text:n.findtext('s:lastmod',None,ns) for n in ET.parse(root/'sitemap.xml').getroot()}
for p in products:
    for prefix in ('products/','zh/products/'):
        path=prefix+p['slug'];page=Page((root/(path+'.html')).read_text())
        nodes=[n for s in page.schemas for n in s.get('@graph',[s])]
        assert not any(n.get('@type')=='Product' for n in nodes),path
        web=next(n for n in nodes if n.get('@type')=='WebPage' and n.get('identifier')==p['code'])
        assert web['url']=='https://mttpackaging.com/'+path,path
        assert len(web['image'])==5,path
        assert web['inLanguage']==('zh-Hans' if prefix.startswith('zh') else 'en'),path
        trail=next(n for n in nodes if n.get('@type')=='BreadcrumbList')
        assert trail['itemListElement'][-1]['item']==web['url'],path
        assert date(2026,9,14)<=date.fromisoformat(dates[web['url']])<=date.today(),path
for slug,phrase in [('folding-cartons','Choose the carton closure'),('corrugated-boxes','Match the shipping structure'),('custom-paper-bags','Size the bag around')]:
    html=(root/('packaging/'+slug+'.html')).read_text();page=Page(html)
    assert phrase in html and 'What to approve in a sample' in html,slug
    assert '/tools/gift-box-solution-builder' in page.links and '/request-a-quote' in page.links,slug
    for href in page.links:
        if href.startswith('/') and not href.startswith('//'):
            path=urlsplit(href).path.strip('/')
            assert (root/path).exists() or (root/(path+'.html')).exists(),(slug,href)
    assert date(2026,9,14)<=date.fromisoformat(dates['https://mttpackaging.com/packaging/'+slug])<=date.today(),slug
print(f'{len(products)*2} product pages: webpage schema, breadcrumbs, images and dates pass; 3 buying guides and links pass.')
