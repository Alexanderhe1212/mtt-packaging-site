"""Read-only public crawlability baseline. Does not claim Google index status."""
import json,urllib.request,datetime
from html.parser import HTMLParser
from pathlib import Path
class Page(HTMLParser):
 def __init__(self):super().__init__();self.canonical=[];self.robots=[]
 def handle_starttag(self,t,a):
  a=dict(a)
  if t=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if t=='meta' and a.get('name','').lower() in ('robots','googlebot'):self.robots.append(a.get('content',''))
paths=['/','/about','/products','/how-we-work','/request-a-quote','/zh','/packaging/corrugated-boxes','/products/custom-skincare-duo-auto-bottom','/products/custom-reed-diffuser-twisted-bag','/tools/gift-box-solution-builder']
results=[]
for path in paths:
 url='https://mttpackaging.com'+path
 try:
  with urllib.request.urlopen(url,timeout=30) as r:
   html=r.read().decode();p=Page();p.feed(html)
   results.append(dict(url=url,status=r.status,canonical=p.canonical,robots=p.robots,xRobotsTag=r.headers.get('X-Robots-Tag'),hasText='MTT' in html))
 except Exception as e:results.append(dict(url=url,error=str(e)))
with urllib.request.urlopen('https://mttpackaging.com/robots.txt',timeout=30) as r:robots=r.read().decode()
audit=dict(checkedAt=datetime.datetime.now(datetime.timezone.utc).isoformat(),method='Ordinary public HTTP requests; not a verified search crawler',robotsTxt=robots,pages=results,indexStatus='Not measured: requires Search Console data',aiCitationStatus='Not measured',notes='HTTP 200 and permissive robots do not establish indexing or AI citation.')
Path('docs/geo/public-baseline.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n')
assert all(r.get('status')==200 and r['hasText'] and not any('noindex' in x.lower() for x in r['robots']) and 'noindex' not in (r['xRobotsTag'] or '').lower() for r in results),results
print(f'{len(results)} public pages reachable; baseline saved. Index status not inferred.')
