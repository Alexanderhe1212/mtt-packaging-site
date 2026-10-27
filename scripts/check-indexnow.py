"""Offline protocol selection checks: no notification is sent."""
import importlib.util
spec=importlib.util.spec_from_file_location('indexnow','scripts/indexnow-submit.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
a=m.Content('<title>A</title><main><h1>Box</h1><a href="/quote">Quote</a></main><script src="old.js">old</script>')
b=m.Content('<title>A</title><main><h1>Box</h1><a href="/quote">Quote</a></main><script src="new.js">new</script>')
assert a.digest()==b.digest(),'build chunks alone must not cause repeat notifications'
assert a.digest()!=m.Content('<h1>Updated box</h1>').digest()
assert m.changes({'a':'1','b':'2'},{'a':'1','b':'1','removed':'1'})==['b']
assert m.changes({'a':'1'},{'a':'1'})==[]
xml=b'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://mttpackaging.com/a</loc></url></urlset>'
files={'sitemap.xml':xml,'a/index.html':b'<link rel="canonical" href="https://mttpackaging.com/a"><h1>Box</h1>'}
assert len(m.inventory(files.__getitem__))==1
files['a/index.html']+=b'<meta name="robots" content="noindex">'
assert not m.inventory(files.__getitem__)
files['a/index.html']=b'<link rel="canonical" href="https://other.example/a"><h1>Box</h1>'
assert not m.inventory(files.__getitem__)
print('IndexNow change detection, noindex/canonical exclusion and unchanged-build checks pass; no network used.')

# Deployment manifests are bounded public hashes, never private analytics.
import json, tempfile
from pathlib import Path
with tempfile.TemporaryDirectory() as directory:
    path=Path(directory)/'manifest.json'
    manifest={'version':1,'origin':m.ORIGIN,'revision':'a'*40,'pages':{m.ORIGIN+'/a':'b'*64}}
    path.write_text(json.dumps(manifest));assert m.read_manifest(path)==manifest['pages']
    for key,value in [('origin','https://other.example'),('revision','short'),('pages',{}),('pages',{'https://other.example/a':'b'*64})]:
        invalid={**manifest,key:value};path.write_text(json.dumps(invalid))
        try:m.read_manifest(path)
        except ValueError:pass
        else:raise AssertionError('Invalid manifest accepted')
urls=[f'{m.ORIGIN}/{n}' for n in range(323)]
chunks=m.batches(urls)
assert [len(chunk) for chunk in chunks]==[100,100,100,23]
assert sum(chunks,[])==urls and m.batches([])==[]
assert m.Content('<meta name="robots" content="noindex"><meta name="robots" content="index">').noindex
print('Manifest validation, bounded lossless batches and combined robots checks pass.')

# Exercise CLI gates and HTTP batches against an in-memory responder only.
from unittest.mock import patch
import contextlib, io, sys
with tempfile.TemporaryDirectory() as directory:
    root=Path(directory);revision='a'*40;key='test-indexnow-key-12345'
    (root/(key+'.txt')).write_text(key)
    current={url:'b'*64 for url in urls}
    baseline=root/'previous.json';baseline.write_text(json.dumps({'version':1,'origin':m.ORIGIN,'revision':'c'*40,'pages':{m.ORIGIN+'/unchanged':'d'*64}}))
    output=root/'receipt.json';manifest=root/'manifest.json';calls=[]
    class Response:
        status=200
        def __init__(self,body=''):self.body=body
        def __enter__(self):return self
        def __exit__(self,*args):pass
        def read(self):return self.body.encode()
    def respond(request,timeout):
        if isinstance(request,m.Request):calls.append(json.loads(request.data));return Response()
        return Response(revision if '/deployment-revision.txt?' in request else key)
    def run(extra):
        with patch.object(sys,'argv',['indexnow','--root',str(root),'--revision',revision,'--output',str(output),'--submit',*extra]),patch.object(m,'inventory',return_value=current),patch.object(m,'urlopen',side_effect=respond),contextlib.redirect_stdout(io.StringIO()):m.main()
        return json.loads(output.read_text())
    report=run(['--require-baseline','--write-manifest',str(manifest)])
    assert report['status']=='baseline_initialized' and not calls
    assert m.read_manifest(manifest)==current
    report=run(['--require-baseline','--previous-manifest',str(manifest)])
    assert report['status']=='unchanged' and not calls
    report=run(['--require-baseline','--previous-manifest',str(baseline)])
    assert report['status']=='received' and [len(call['urlList']) for call in calls]==[100,100,100,23]
    assert sum((call['urlList'] for call in calls),[])==sorted(urls)
    calls.clear()
    def wrong_revision(request,timeout):return Response('wrong-revision')
    with patch.object(m,'time') as clock, patch.object(m,'urlopen',side_effect=wrong_revision),patch.object(sys,'argv',['indexnow','--root',str(root),'--revision',revision,'--output',str(output),'--previous-manifest',str(baseline),'--submit']),patch.object(m,'inventory',return_value=current):
        try:m.main()
        except RuntimeError as error:assert 'deployment not verified' in str(error)
        else:raise AssertionError('Unverified release notified')
    assert not calls

print('CLI baseline initialization, unchanged deployment and HTTP batch receipts pass with mocked network.')
