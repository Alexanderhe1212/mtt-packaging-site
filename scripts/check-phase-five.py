"""Check crawlable, family-correct product help and all three enquiry links."""
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit,parse_qs
class Links(HTMLParser):
    def __init__(self,text):
        super().__init__();self.links=[];self.ctas=[];self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='a':
            self.links.append(a.get('href',''))
            if a.get('class')=='button' and 'request-a-quote?product=' in a.get('href',''):self.ctas.append(a['href'])
products=json.loads(Path('lib/products.json').read_text())+json.loads(Path('lib/products-expanded.json').read_text())
guides={'rigid':'custom-rigid-boxes','carton':'folding-cartons','corrugated':'corrugated-boxes','bag':'custom-paper-bags'}
root=Path('dist/client')
for p in products:
    for prefix in ('','/zh'):
        path=f"{prefix}/products/{p['slug']}";text=(root/(path.strip('/')+'.html')).read_text();page=Links(text)
        assert '/packaging/'+guides[p['family']] in page.links,path
        assert '/how-we-work' in page.links,path
        if p['family']!='bag':assert '/packaging/custom-inserts' in page.links,path
        assert len(page.ctas)==3 and len(set(page.ctas))==1,(path,page.ctas)
        query=parse_qs(urlsplit(page.ctas[0]).query)
        assert query['product_family']==[p['family']],path
        assert query['product']==[p['code']+' '+p['nameZh' if prefix else 'name']],path
        assert urlsplit(page.ctas[0]).path==prefix+'/request-a-quote',path
print(f'{len(products)*2} EN/ZH products: correct family guides, sample-process links and three consistent crawlable enquiry links pass.')
