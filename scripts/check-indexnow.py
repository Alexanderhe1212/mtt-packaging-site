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
