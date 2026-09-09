"""Release gate: static routes, image/script references, SEO and production handlers."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import xml.etree.ElementTree as ET
root=Path('dist/client')
class Page(HTMLParser):
 def __init__(self): super().__init__(); self.refs=[]; self.h1=0; self.robots=[]; self.canonical=[]
 def handle_starttag(self,t,a):
  a=dict(a)
  if t=='h1': self.h1+=1
  if t in ('img','script','link','a'):
   v=a.get('src',a.get('href',''))
   if v.startswith('/') and not v.startswith('//'): self.refs.append(v)
  if t=='meta' and a.get('name')=='robots': self.robots.append(a.get('content',''))
  if t=='link' and a.get('rel')=='canonical': self.canonical.append(a.get('href'))
errors=[]; count=0
for loc in ET.parse(root/'sitemap.xml').getroot().iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
 path=urlsplit(loc.text).path; f=root/path.strip('/')/'index.html'
 if not f.exists(): errors.append((path,'missing page')); continue
 s=f.read_text(); p=Page(); p.feed(s); count+=1
 if p.h1!=1: errors.append((path,'H1 count',p.h1))
 if any('noindex' in v for v in p.robots): errors.append((path,'noindex'))
 if p.canonical!=[loc.text]: errors.append((path,'canonical',p.canonical))
 if 'Design preview · Not published' in s: errors.append((path,'preview marker'))
 for v in p.refs:
  dest=root/unquote(urlsplit(v).path).lstrip('/')
  if not (dest.exists() or dest.with_suffix('.html').exists()): errors.append((path,'missing reference',v))
assert 'Disallow: /\n' not in (root/'robots.txt').read_text()
assert 'await fetch(form.action' in Path('components/QuoteForm.tsx').read_text()
assert 'const res = {ok:true}' not in Path('components/LeadQualificationChatbot.tsx').read_text()
assert 'knock-knockapp.com' not in Path('app/layout.tsx').read_text()
assert 'Isolated design preview' not in Path('public/tools/gift-box-solution-builder/app.html').read_text()
print(f'Checked {count} sitemap pages; {len(errors)} errors')
for e in errors: print(e)
assert not errors
