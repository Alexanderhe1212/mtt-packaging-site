"""Regression checks for the reviewed article set. Editorial scores are not computed here."""
import json,re
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
root=Path('dist/client')
updates=json.loads(Path('lib/buyer-article-updates.json').read_text())
reviews=json.loads(Path('docs/research/content-quality-review-2026-09-15.json').read_text())
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.text=[];self.links=[];self.h1=0;self.hidden=0;self.meta={};self.feed(text)
 def handle_starttag(self,t,attrs):
  a=dict(attrs)
  if t in ['script','style']:self.hidden+=1
  if t=='h1':self.h1+=1
  if t=='a':self.links.append(a.get('href',''))
  if t=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
 def handle_endtag(self,t):
  if t in ['script','style']:self.hidden-=1
 def handle_data(self,d):
  if not self.hidden:self.text.append(d)
assert len(updates)==32
assert len({a['title'] for a in updates.values()})==32
assert len({a['summary'] for a in updates.values()})==32
assert {r['slug'] for r in reviews}==set(updates)
for r in reviews:
 assert r['total']==sum(r['score'].values()) and r['total']>=85,r['slug']
for slug,a in updates.items():
 assert 40<=len(a['intro'].split())<=100,slug
 html=(root/'insights'/slug/'index.html').read_text();p=Page(html)
 visible=' '.join(''.join(p.text).split())
 assert p.h1==1 and a['title'] in visible,slug
 assert a['intro'] in visible and a['cta'] in visible,slug
 assert p.meta['description']==a['summary'],slug
 assert 'Quick answer' in visible and 'Updated 2026-09-15' in visible,slug
 body=html.split('<div class="article-body">',1)[1].split('class="article-related"',1)[0]
 assert not any('/request-a-quote' in x for x in Page(body).links),(slug,'duplicate commercial CTA')
 assert '<aside aria-label="Packaging brief"' in html,slug
 for href in p.links:
  if href.startswith('/') and not href.startswith('//'):
   path=unquote(urlsplit(href).path).strip('/')
   assert (root/path).is_file() or (root/path/'index.html').is_file(),(slug,href)
 assert not re.search(r'In today.s competitive market|In conclusion|anonymized project discussion|20–35%|\$2–4',visible,re.I),slug
 for raw in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',html,re.S):
  data=json.loads(raw)
  for node in data.get('@graph',[data]):
   if node.get('@type')=='Article':
    assert node['headline']==a['title'] and node['dateModified']=='2026-09-15',slug
   if node.get('@type')=='FAQPage':assert node['mainEntity'],slug
case=Page((root/'case-studies/index.html').read_text())
assert 'Anonymized project discussion' not in ' '.join(case.text)
for slug in ['packaging-inserts-for-handmade-glass-products','fold-flat-triangular-gift-box-shipping-volume']:
 assert updates[slug]['title'] in ' '.join(case.text),slug
print('32 articles: Quick Answers, unique metadata, editorial records, internal links, schema and case directory passed')
