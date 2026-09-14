"""Validate published content relationships and language-picker removal in static output."""
import json
from pathlib import Path
from html.parser import HTMLParser
from html import unescape
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET
class Page(HTMLParser):
    def __init__(self,html):
        super().__init__();self.links=[];self.canonical=[];self.text=[];self.scripts=[];self.ld=False;self.current='';self.picker=False;self.feed(html)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='a':self.links.append(a.get('href',''))
        if tag=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
        if 'language-picker' in a.get('class','').split():self.picker=True
        if tag=='script' and a.get('type')=='application/ld+json':self.ld=True;self.current=''
    def handle_endtag(self,tag):
        if tag=='script' and self.ld:self.scripts.append(json.loads(self.current));self.ld=False
    def handle_data(self,text):
        if self.ld:self.current+=text
        else:self.text.append(text)
root=Path('dist/client')
guides=json.loads(Path('lib/product-buyer-guides.json').read_text())
products=json.loads(Path('lib/products.json').read_text())+json.loads(Path('lib/products-expanded.json').read_text())
updates=json.loads(Path('lib/buyer-article-updates.json').read_text())
ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
sm={e.find('s:loc',ns).text:(e.find('s:lastmod',ns).text if e.find('s:lastmod',ns) is not None else None) for e in ET.parse(root/'sitemap.xml').getroot()}
checked=[]
def read(path):
    file=root/(path.strip('/')+'.html');html=file.read_text();p=Page(html)
    assert p.canonical==['https://mttpackaging.com'+path],(path,p.canonical)
    assert not p.picker,path
    for href in p.links:
        if href.startswith('/') and not href.startswith('//'):
            target=urlsplit(href).path.strip('/')
            assert (root/target).exists() or (root/(target+'.html')).exists(),(path,href)
    checked.append(path);return p,html
for p in products:
    if p['code'] not in guides:continue
    for prefix,lang in [('/products/',0),('/zh/products/',1)]:
        path=prefix+p['slug'];page,html=read(path);text=' '.join(page.text);g=guides[p['code']]
        assert all(g[k][lang] in text for k in ['answer','selection','review']),path
        assert '/insights/'+g['guide'] in page.links,path
        assert any(p['code'] in unquote(h) and 'request-a-quote?product=' in h for h in page.links),path
        assert sm['https://mttpackaging.com'+path]>='2026-09-13',path
        if lang==0:assert p['seoTitle'] in unescape(html) and p['seoDescription'] in unescape(html),path
for slug,update in updates.items():
    path='/insights/'+slug;page,html=read(path);text=' '.join(page.text)
    assert update['title'] in text and update['intro'] in text,path
    for question,answer in update['faq']:assert question in text and answer in text,(path,question)
    graphs=[node for schema in page.scripts for node in schema.get('@graph',[])]
    faq=next(n for n in graphs if n.get('@type')=='FAQPage')
    assert len(faq['mainEntity'])==len(update['faq']),path
    assert sm['https://mttpackaging.com'+path]>='2026-09-13',path
    for question in faq['mainEntity']:assert question['name'] in text and question['acceptedAnswer']['text'] in text,path
for path in ['/about','/products','/tools/gift-box-solution-builder']:read(path)
assert not Page((root/'index.html').read_text()).picker
print(f'{len(checked)} pages passed content, canonical, internal-link, inquiry and language-picker checks; updated URLs retain accurate lastmod.')
