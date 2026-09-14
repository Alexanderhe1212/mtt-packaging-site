"""Check the rendered article-to-product path, including every section anchor."""
from pathlib import Path
from html.parser import HTMLParser
import xml.etree.ElementTree as ET
from urllib.parse import urlsplit
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.ids=[];self.links=[];self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if 'id' in a:self.ids.append(a['id'])
        if tag=='a':self.links.append(a.get('href',''))
root=Path('dist/client');count=0
for loc in ET.parse(root/'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
    route=urlsplit(loc.text).path
    if not route.startswith('/insights/'):continue
    text=(root/(route.strip('/')+'/index.html')).read_text();page=Page(text);count+=1
    assert len(page.ids)==len(set(page.ids)),(route,'duplicate ids')
    assert 'main-content' in page.ids,(route,'missing skip target')
    anchors=[x for x in page.links if x.startswith('#guide-section-')]
    assert anchors and all(x[1:] in page.ids for x in anchors),(route,'broken contents')
    assert len(anchors)==len([x for x in page.ids if x.startswith('guide-section-')]),(route,'missing section')
    handoff=text.split('id="guide-designs"',1)[1].split('class="article-related"',1)[0]
    designs=set(x for x in Page(handoff).links if x.startswith('/products/'))
    assert len(designs)==3,(route,'expected three curated designs',designs)
    for design in designs:assert (root/(design.strip('/')+'/index.html')).exists(),(route,design)
    assert '/request-a-quote' in Page(handoff).links,(route,'missing enquiry')
    related=text.split('class="article-related"',1)[1].split('</aside>',1)[0]
    guides=[x for x in Page(related).links if x.startswith('/insights/')]
    assert len(guides)==3 and route not in guides and len(set(guides))==3,(route,guides)
    for guide in guides:assert (root/(guide.strip('/')+'/index.html')).exists(),(route,guide)
assert count>=30,count
print(f'{count} guides: contents, curated designs, related guides and enquiry paths passed')
