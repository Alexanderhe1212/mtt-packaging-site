"""Notify IndexNow after deployment. Default is a local, non-submitting preview.
Reference: indexnow.org/documentation and bojieyang/indexnow-action.
Only canonical sitemap pages are eligible; unchanged readable content is skipped.
"""
import argparse, hashlib, json, re, time
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
from urllib.request import Request, urlopen
from zipfile import ZipFile
import xml.etree.ElementTree as ET

ORIGIN = 'https://mttpackaging.com'
class Content(HTMLParser):
    def __init__(self, html):
        super().__init__(); self.parts=[]; self.ignore=0; self.canonical=''; self.noindex=False; self.feed(html)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag in ('script','style'): self.ignore+=1
        if tag=='link' and a.get('rel')=='canonical': self.canonical=a.get('href','')
        if tag=='meta' and a.get('name','').lower() in ('robots','googlebot'): self.noindex |= 'noindex' in a.get('content','').lower()
        if tag=='meta' and a.get('name')=='description': self.parts.append(a.get('content',''))
        if tag=='a': self.parts.append(a.get('href',''))
        if tag=='img': self.parts.extend([a.get('src',''),a.get('alt','')])
        if tag in ('input','select','textarea','option'): self.parts.extend([tag,a.get('name',''),a.get('value',''),a.get('type','')])
    def handle_endtag(self,tag):
        if tag in ('script','style'):self.ignore=max(0,self.ignore-1)
    def handle_data(self,data):
        if not self.ignore and data.strip():self.parts.append(' '.join(data.split()))
    def digest(self):return hashlib.sha256('\n'.join(self.parts).encode()).hexdigest()

def inventory(read):
    result={}
    for el in ET.fromstring(read('sitemap.xml')).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
        url=el.text; parsed=urlsplit(url)
        if parsed.scheme!='https' or parsed.netloc!='mttpackaging.com' or parsed.query or parsed.fragment:raise ValueError('Unexpected sitemap URL')
        route=unquote(parsed.path).strip('/')
        if '..' in route.split('/'):raise ValueError('Invalid route')
        page=Content(read((route+'/' if route else '')+'index.html').decode('utf-8'))
        if not page.noindex and page.canonical==url:result[url]=page.digest()
    return result

def changes(current, previous):
    # Removed pages are not inferred as deletions: sitemap removal can mean noindex.
    return sorted(url for url,digest in current.items() if previous.get(url)!=digest)

def read_manifest(path):
    data=json.loads(Path(path).read_text())
    if data.get('version')!=1 or data.get('origin')!=ORIGIN or not re.fullmatch('[a-f0-9]{40}',data.get('revision','')):
        raise ValueError('Invalid deployed content manifest')
    pages=data.get('pages')
    if not isinstance(pages,dict) or not pages:raise ValueError('Empty deployed content manifest')
    for url,digest in pages.items():
        parsed=urlsplit(url)
        if parsed.scheme!='https' or parsed.netloc!='mttpackaging.com' or parsed.query or parsed.fragment or '..' in unquote(parsed.path).split('/') or not isinstance(digest,str) or not re.fullmatch('[a-f0-9]{64}',digest):
            raise ValueError('Invalid manifest page')
    return pages

def batches(urls, size=100):
    return [urls[start:start+size] for start in range(0,len(urls),size)]

def main():
    p=argparse.ArgumentParser();p.add_argument('--root',default='dist/client');p.add_argument('--previous');p.add_argument('--previous-manifest');p.add_argument('--write-manifest');p.add_argument('--require-baseline',action='store_true');p.add_argument('--submit',action='store_true');p.add_argument('--revision');p.add_argument('--output',default='work/growth/indexnow-result.json');a=p.parse_args()
    root=Path(a.root);current=inventory(lambda path:(root/path).read_bytes());previous={}
    if a.previous:
        with ZipFile(a.previous) as z:previous=inventory(z.read)
    if a.previous and a.previous_manifest:raise ValueError('Choose one baseline')
    if a.previous_manifest:previous=read_manifest(a.previous_manifest)
    if a.write_manifest:
        if not a.revision or not re.fullmatch('[a-f0-9]{40}',a.revision):raise ValueError('Manifest requires full revision')
        Path(a.write_manifest).write_text(json.dumps({'version':1,'origin':ORIGIN,'revision':a.revision,'pages':current},sort_keys=True)+'\n')
    missing=a.require_baseline and not previous
    urls=[] if missing else changes(current,previous)
    report={'eligible':len(current),'changed':len(urls),'urls':urls,'status':'preview','meaning':'Receipt does not establish indexing, ranking or AI citations.'}
    out=Path(a.output);out.parent.mkdir(parents=True,exist_ok=True)
    def save():out.write_text(json.dumps(report,indent=2)+'\n')
    if missing:report.update(status='baseline_initialized',changed=None,meaning='No previous deployed manifest; no bulk notification sent. Next deployment compares with this release.')
    save()
    if not a.submit:print(report['meaning'] if missing else f'Preview: {len(urls)} changed canonical URLs; no request sent.');return
    if not a.revision or not re.fullmatch('[a-f0-9]{40}',a.revision):raise ValueError('A deployed full commit SHA is required')
    def fetch(url):
        with urlopen(url,timeout=25) as r:return r.read().decode().strip()
    # Never notify about a release before its marker is reachable on the real domain.
    for attempt in range(6):
        try:
            if fetch(ORIGIN+'/deployment-revision.txt?release='+a.revision)==a.revision:break
        except Exception:pass
        if attempt==5:raise RuntimeError('Live deployment not verified; no submission sent')
        time.sleep(5)
    report['revision']=a.revision
    if missing:save();print(report['meaning']);return
    if not urls:report['status']='unchanged';save();print('No changed URLs to notify.');return
    keys=[f for f in root.glob('*.txt') if re.fullmatch('[a-zA-Z0-9-]{8,128}',f.stem) and f.read_text().strip()==f.stem]
    if len(keys)!=1:raise ValueError('Expected one existing IndexNow verification file')
    key=keys[0].read_text().strip();location=ORIGIN+'/'+keys[0].name
    if fetch(location)!=key:raise ValueError('Live key validation failed')
    report['batches']=[]
    try:
        for batch in batches(urls):
            payload={'host':'mttpackaging.com','key':key,'keyLocation':location,'urlList':batch}
            req=Request('https://api.indexnow.org/indexnow',data=json.dumps(payload).encode(),headers={'Content-Type':'application/json; charset=utf-8'},method='POST')
            with urlopen(req,timeout=30) as response:status=response.status
            if status not in (200,202):raise RuntimeError('Unexpected IndexNow response')
            report['batches'].append({'count':len(batch),'http_status':status,'urls':batch});save()
        pending=any(batch['http_status']==202 for batch in report['batches'])
        report.update(status='received_key_validation_pending' if pending else 'received',revision=a.revision)
    except Exception as error:
        report.update(status='failed',error_type=type(error).__name__);save();raise RuntimeError('IndexNow notification failed; inspect status and retry after resolving the cause') from None
    save();print(f'IndexNow: {len(urls)} URLs received in {len(report["batches"])} batches; indexing is not confirmed.')
if __name__=='__main__':main()
