"""Audit rendered HTML links with NetworkX; sitemap discovery is reported separately."""
import argparse,json
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit,unquote
import xml.etree.ElementTree as ET
import networkx as nx
class Links(HTMLParser):
    def __init__(self,text):super().__init__();self.links=[];self.feed(text)
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if tag=='a' and 'nofollow' not in attrs.get('rel','').split():self.links.append(attrs.get('href',''))
def normalize(url):return unquote(urlsplit(url).path).rstrip('/') or '/'
def audit(root):
    urls=[e.text for e in ET.parse(root/'sitemap.xml').iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    graph=nx.DiGraph();graph.add_nodes_from(map(normalize,urls))
    for url in urls:
        route=normalize(url);file=root/route.lstrip('/')/'index.html'
        for href in Links(file.read_text()).links:
            target=urljoin(url,href)
            if urlsplit(target).netloc=='mttpackaging.com' and normalize(target) in graph:graph.add_edge(route,normalize(target))
    depth=nx.single_source_shortest_path_length(graph,'/')
    english=[p for p in graph if p!='/zh' and not p.startswith('/zh/')]
    unreachable=sorted(p for p in english if p not in depth)
    result={'html_pages':len(graph),'english_pages':len(english),'english_unreachable':unreachable,'english_over_three_clicks':sorted(p for p in english if depth.get(p,0)>3),'english_max_depth':max(depth.get(p,0) for p in english),'page_depth':{p:depth.get(p) for p in sorted(graph)},'method':'Only rendered HTML <a href> links, no JavaScript actions or sitemap edges. Unreachable does not mean unindexed. Chinese routes reported but excluded from English-navigation gate.'}
    return result
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--root',default='dist/client');p.add_argument('--output',default='work/growth/discovery-audit.json');p.add_argument('--strict',action='store_true');a=p.parse_args();r=audit(Path(a.root));out=Path(a.output);out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(r,indent=2)+'\n');print(json.dumps({k:v for k,v in r.items() if k not in ['page_depth','method']},indent=2))
    if a.strict and (r['english_unreachable'] or r['english_over_three_clicks']):raise SystemExit(1)
