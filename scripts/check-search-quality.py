"""Check page-specific social metadata and generated discovery links after a build."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET
import re,json
root=Path('dist/client').resolve()
class Page(HTMLParser):
 def __init__(self): super().__init__();self.meta={};self.visible=[];self.script=False
 def handle_starttag(self,t,a):
  a=dict(a)
  if t in ('script','style'):self.script=True
  if t=='meta': self.meta[a.get('property',a.get('name',''))]=a.get('content','')
 def handle_endtag(self,t):
  if t in ('script','style'):self.script=False
 def handle_data(self,data):
  if not self.script:self.visible.append(data)
urls=[x.text for x in ET.parse(root/'sitemap.xml').getroot().iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
errors=[];files=[];products=0
for url in urls:
 f=root/urlsplit(url).path.strip('/')/'index.html';files.append(str(f));p=Page();p.feed(f.read_text());m=p.meta
 if m.get('twitter:title')!=m.get('og:title'): errors.append((url,'social titles disagree'))
 if m.get('twitter:description')!=m.get('og:description'): errors.append((url,'social descriptions disagree'))
 visible=' '.join(' '.join(p.visible).split())
 for raw in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',f.read_text(),re.S):
  data=json.loads(raw)
  for node in data.get('@graph',[data]):
   if node.get('@type')=='FAQPage':
    for q in node['mainEntity']:
     if ' '.join(q['name'].split()) not in visible or ' '.join(q['acceptedAnswer']['text'].split()) not in visible:errors.append((url,'FAQ missing visible answer'))
 if '/products/' in url:
  products+=1
  if m.get('og:url')!=url: errors.append((url,'product social URL'))
  if m.get('twitter:image')!=m.get('og:image') or '/products/' not in m.get('og:image',''):errors.append((url,'product social image'))
text=(root/'llms.txt').read_text()
links=re.findall(r'\]\((https://mttpackaging\.com[^)]+)\)',text)
for link in links:
 if link not in urls:errors.append((link,'discovery link missing from sitemap'))
for path in ['/products','/request-a-quote','/tools/gift-box-solution-builder','/packaging/corrugated-boxes']:
 if 'https://mttpackaging.com'+path not in links:errors.append((path,'missing buyer path'))
assert (root/'llms.txt').read_bytes()==Path('public/llms.txt').read_bytes()
Path('work/growth').mkdir(parents=True,exist_ok=True)
Path('work/growth/quality-inputs.txt').write_text('\n'.join(files))
print(f'{len(urls)} social metadata pages; {products} product share previews; {len(links)} discovery links; {len(errors)} errors')
for error in errors:print(error)
assert not errors

# Buyer comparison must remain available before JavaScript, in both languages.
for path in ['products','zh/products']:
 html=(root/path/'index.html').read_text()
 assert 'packaging-comparison' in html
 for family in ['custom-rigid-boxes','folding-cartons','corrugated-boxes','custom-paper-bags']:
  assert f'href="/packaging/{family}"' in html,(path,family)
carton=(root/'packaging/folding-cartons/index.html').read_text()
assert 'MOQ from 500' not in carton,'Carton minimum contradicts its visible buying guidance'
assert 'minimum order quantity is 1,000 pieces per design' in carton.lower()
print('Four-family comparison in EN/ZH static HTML; carton MOQ consistency passed')

# Product discovery maps must cover the catalogue and point to existing URLs.
import csv
catalogue = json.loads(Path('lib/products.json').read_text()) + json.loads(Path('lib/products-expanded.json').read_text())
keyword_rows = list(csv.DictReader(Path('docs/v15-keyword-map.csv').open()))
keyword_json = json.loads(Path('docs/catalog/product-keywords.json').read_text())
assert len(keyword_rows) == len(keyword_json) == len(catalogue)
assert len({p['searchTerms'][0].lower() for p in catalogue}) == len(catalogue)
by_code = {p['code']: p for p in catalogue}
assert {r['code'] for r in keyword_rows} == {r['code'] for r in keyword_json} == set(by_code)
for row in keyword_rows:
 product = by_code[row['code']]
 assert row['product_url'] == 'https://mttpackaging.com/products/' + product['slug']
 assert row['product_url'] in urls
 assert row['specific_search_intent'] == product['searchTerms'][0]
 assert all(row.get(k) for k in ['product_application','application_category','use_scenario','structure','insert','finish'])
for row in keyword_json:
 assert row['url'] == 'https://mttpackaging.com/products/' + by_code[row['code']]['slug']
 assert row['keywords'] == by_code[row['code']]['searchTerms']
print('Complete product keyword maps, distinct candidate primary terms and scenario fields passed')
