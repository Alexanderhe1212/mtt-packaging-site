"""Check rendered links, not client-side filters, can reach every sitemap page."""
from collections import deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit
import xml.etree.ElementTree as ET

root = Path('dist/client')
origin = 'https://mttpackaging.com'
urls = [n.text for n in ET.parse(root / 'sitemap.xml').getroot().iter(
    '{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a' and attrs.get('href'):
            self.hrefs.append(attrs['href'])

def key(url):
    return urlsplit(url).path.rstrip('/') or '/'

graph = {}
for url in urls:
    html = (root / urlsplit(url).path.strip('/') / 'index.html').read_text()
    # Development module URLs must never be shipped in production documents.
    assert '/@id/' not in html and '$$cache=' not in html, url
    page = Links()
    page.feed(html)
    links = [urljoin(url, href) for href in page.hrefs]
    graph[key(url)] = {key(href) for href in links if urlsplit(href).netloc == 'mttpackaging.com'}
    if '/products/' in key(url):
        counterpart = key(url)[3:] if key(url).startswith('/zh/') else '/zh' + key(url)
        assert counterpart in graph[key(url)], ('missing language link', url)

seen, pending = set(), deque(['/'])
while pending:
    current = pending.popleft()
    if current in seen:
        continue
    seen.add(current)
    pending.extend(graph.get(current, set()) - seen)
missing = sorted(set(graph) - seen)
assert not missing, ('Pages unreachable from homepage links', missing)
print(f'All {len(urls)} sitemap pages reachable through rendered links; bilingual product links verified.')
