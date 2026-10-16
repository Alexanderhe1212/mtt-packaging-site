// Offline behavior tests. The SDK double models Clarity 0.8.72 queue/stop
// semantics; it does not establish real vendor network or dashboard behavior.
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {analyticsBootstrap} from '../lib/analytics-bootstrap.mjs';
const GA='https://www.googletagmanager.com/gtag/js?id=G-Z132GJZZ57';
const CLARITY='https://www.clarity.ms/tag/yk2b0kh4n6', KEY='mtt_cookie_consent_v2';
let cases=0;
const plain=v=>JSON.parse(JSON.stringify(v));
function setup({url='https://mttpackaging.com/insights/example',referrer='',gpc=false,storageThrows=false}={}){
 const scripts=[],listeners={window:new Map(),document:new Map()},timers=[],cookies=new Map(),cookieWrites=[],historyCalls=[];
 const location=new URL(url),navigator={globalPrivacyControl:gpc};
 const session=new Map([['mtt_calc_handoff','KEEP CALCULATOR'],['mtt_studio_handoff_v1','KEEP DESIGN'],['_cltk','OLD']]);
 const add=(target,type,fn,options)=>{const list=listeners[target].get(type)||[];list.push({fn,options});listeners[target].set(type,list);};
 const window={location,navigator,addEventListener:(type,fn,options)=>add('window',type,fn,options)};
 const history={};
 for(const method of ['pushState','replaceState'])history[method]=function(_s,_t,u){historyCalls.push({method,stoppedBeforeMutation:window.mttAnalyticsState().clarityStopped});if(u)location.href=new URL(u,location.href).href;};
 const document={referrer,head:{appendChild:s=>scripts.push(s)},createElement:()=>({removed:false,remove(){this.removed=true;}}),addEventListener:(type,fn,options)=>add('document',type,fn,options)};
 Object.defineProperty(document,'cookie',{get:()=>[...cookies.values()].map(({name,value})=>`${name}=${value}`).join('; '),set:text=>{
  cookieWrites.push(text);const [pair,...attrs]=text.split(';').map(p=>p.trim()),split=pair.indexOf('=');
  const name=pair.slice(0,split),value=pair.slice(split+1),domain=attrs.find(a=>/^domain=/i.test(a))?.slice(7)||location.hostname;
  const key=`${domain.replace(/^\./,'')}|${name}`;
  if(attrs.some(a=>/^max-age=0$/i.test(a)))cookies.delete(key);else cookies.set(key,{name,value});
 }});
 const sessionStorage={removeItem:key=>{if(storageThrows)throw Error('blocked');session.delete(key);}};
 const setTimeout=(fn,delay=0)=>{timers.push({fn,delay});return timers.length;};
 Object.assign(window,{document,sessionStorage,setTimeout,history});
 const context=vm.createContext({window,document,location,navigator,sessionStorage,history,URL,setTimeout,console});
 const run=()=>vm.runInContext(analyticsBootstrap,context);
 const emit=(target,type,event={})=>{for(const {fn} of [...(listeners[target].get(type)||[])])fn(event);};
 const flush=()=>{let n=100;while(timers.length){assert(--n>0,'Timers must terminate');timers.shift().fn();}};
 run();return {window,document,location,navigator,history,historyCalls,scripts,listeners,timers,cookies,cookieWrites,session,run,emit,flush};
}
function test(name,fn){fn();cases++;console.log(`PASS ${name}`);}
function queue(h){return Array.from(h.window.clarity?.q||[],args=>Array.from(args));}
function seed(h){h.document.cookie='_clck=OLD; path=/; domain=.mttpackaging.com';h.document.cookie='_clsk=OLD; path=/';h.document.cookie='mtt_essential=KEEP; path=/';}
function cleared(h){assert(!/(?:^|; )_cl(?:ck|sk)=/.test(h.document.cookie));assert.equal(h.session.has('_cltk'),false);assert.equal(h.session.get('mtt_calc_handoff'),'KEEP CALCULATOR');assert.equal(h.session.get('mtt_studio_handoff_v1'),'KEEP DESIGN');assert(h.document.cookie.includes('mtt_essential=KEEP'));assert(h.cookieWrites.every(t=>/^_(?:clck|clsk)=|^mtt_essential=/.test(t)));}
function adsDenied(h){for(const a of h.window.dataLayer.filter(a=>a[0]==='consent'))for(const key of ['ad_storage','ad_user_data','ad_personalization'])assert.equal(a[2][key],'denied',key);for(const a of queue(h).filter(a=>a[0]==='consentv2'))assert.equal(a[1].ad_Storage,'denied');}
// stop swaps the global to a queue; process dispatches remaining commands via
// that current global. Denied after stop therefore waits until a future start.
function vendor(h){
 const calls=[],restarts=[],state={active:false,analytics:'denied',ads:'denied',captured:[]};
 function queueSetup(){h.window.clarity=function(...a){(h.window.clarity.q=h.window.clarity.q||[]).push(a);if(a[0]==='start'){h.window.clarity.q.unshift(h.window.clarity.q.pop());process();}};}
 function live(method,...args){calls.push([method,...args]);
  if(method==='start'){state.active=true;h.document.cookie='_clck=SDK_START; path=/; domain=.mttpackaging.com';h.document.cookie='_clsk=SDK_START; path=/';h.session.set('_cltk','SDK_START');}
  else if(method==='metadata'){if(state.active)args[0]();}
  else if(method==='consentv2'&&state.active){const next=args[0];state.analytics=next.analytics_Storage;state.ads=next.ad_Storage;if(next.analytics_Storage==='denied'){live('stop');restarts.push(250);h.timers.push({delay:250,fn:()=>live('start')});}}
  else if(method==='stop'&&state.active){h.document.cookie='_clsk=FINAL_PRE_STOP_FLUSH; path=/';state.active=false;queueSetup();}
 }
 function process(){const pending=h.window.clarity?.q||[];h.window.clarity=live;h.window.clarity.v='0.8.72';while(pending.length)h.window.clarity(...Array.from(pending.shift()));}
 // Actual project tag places its start before the preexisting consent queue.
 (h.window.clarity.q=h.window.clarity.q||[]).unshift(['start',{projectId:'yk2b0kh4n6'}]);process();
 return {calls,restarts,state,capture:v=>{if(state.active)state.captured.push(v);}};
}
test('no download before consent; rejection clears only Clarity storage',()=>{const h=setup();seed(h);assert.equal(h.scripts.length,0);assert.equal(h.window['ga-disable-G-Z132GJZZ57'],true);h.window.mttRevokeAnalytics();assert.equal(h.scripts.length,0);cleared(h);adsDenied(h);});
test('grant loads GA and Clarity once; repeated bootstrap is idempotent',()=>{
 const h=setup();h.window.mttGrantAnalytics();h.window.mttGrantAnalytics();assert.deepEqual(h.scripts.map(s=>s.src),[GA,CLARITY]);assert.equal(h.window['ga-disable-G-Z132GJZZ57'],false);
 assert.equal(h.window.dataLayer.filter(a=>a[0]==='config').length,1);assert.deepEqual(plain(queue(h)[0]),['consentv2',{analytics_Storage:'granted',ad_Storage:'denied'}]);
 const grant=h.window.mttGrantAnalytics,layer=h.window.dataLayer.length,count=()=>[...h.listeners.window.values(),...h.listeners.document.values()].reduce((s,l)=>s+l.length,0),before=count();h.run();assert.equal(h.window.mttGrantAnalytics,grant);assert.equal(h.window.dataLayer.length,layer);assert.equal(count(),before);assert.equal(h.scripts.length,2);adsDenied(h);
});
test('GA gets path-only location/referrer; Clarity avoids parameterized page',()=>{const h=setup({url:'https://mttpackaging.com/products?email=PRIVATE#name',referrer:'https://example.org/ref?token=PRIVATE#secret'});h.window.mttGrantAnalytics();assert.deepEqual(h.scripts.map(s=>s.src),[GA]);const c=h.window.dataLayer.find(a=>a[0]==='config')[2];assert.equal(c.page_location,'https://mttpackaging.com/products');assert.equal(c.page_referrer,'https://example.org/ref');assert.equal(c.allow_google_signals,false);assert.equal(c.allow_ad_personalization_signals,false);});
test('failed scripts retry independently without duplicate GA configuration',()=>{const h=setup();h.window.mttGrantAnalytics();h.scripts[1].onerror();assert(h.scripts[1].removed);h.window.mttGrantAnalytics();assert.deepEqual(h.scripts.map(s=>s.src),[GA,CLARITY,CLARITY]);h.scripts[0].onerror();h.window.mttGrantAnalytics();assert.deepEqual(h.scripts.map(s=>s.src),[GA,CLARITY,CLARITY,GA]);assert.equal(h.window.dataLayer.filter(a=>a[0]==='config').length,1);adsDenied(h);});
test('running SDK stop precedes denied; same-document regrant stays stopped',()=>{
 const h=setup();seed(h);h.window.mttGrantAnalytics();const sdk=vendor(h);sdk.capture('PUBLIC BEFORE STOP');h.window.mttRevokeAnalytics();sdk.capture('PRIVATE AFTER STOP');h.flush();assert.equal(sdk.state.active,false);assert.equal(sdk.restarts.length,0);assert.equal(sdk.calls.at(-1)[0],'stop');assert.equal(queue(h).at(-1)[0],'consentv2');assert.equal(queue(h).at(-1)[1].analytics_Storage,'denied');cleared(h);assert.deepEqual(sdk.state.captured,['PUBLIC BEFORE STOP']);h.window.mttGrantAnalytics();h.flush();assert.equal(h.scripts.length,2);assert.equal(sdk.state.active,false);assert.equal(h.window.mttAnalyticsState().clarityStopped,true);adsDenied(h);
});
test('pending SDK revoke survives late start and final buffered flush',()=>{
 const h=setup();seed(h);h.window.mttGrantAnalytics();h.window.mttRevokeAnalytics();assert.deepEqual(queue(h).map(a=>a[0]),['consentv2','metadata','stop','consentv2']);const sdk=vendor(h);assert.equal(sdk.state.active,false);assert.equal(sdk.restarts.length,0);assert(h.timers.length>0,'Deferred cleanup must follow the late-start flush');h.flush();cleared(h);sdk.capture('PRIVATE LATE INPUT');assert.deepEqual(sdk.state.captured,[]);h.scripts[1].onerror();h.window.mttGrantAnalytics();assert.equal(h.scripts.length,2,'Revoked failed download must not retry');
});
test('sensitive focus capture latches even before consent',()=>{const h=setup();assert.equal(h.listeners.document.get('focusin')[0].options,true);h.emit('document','focusin',{target:{closest:s=>s.includes('input')?{}:null}});h.window.mttGrantAnalytics();assert.deepEqual(h.scripts.map(s=>s.src),[GA]);assert.equal(h.window.mttAnalyticsState().clarityStopped,true);const safe=setup();safe.emit('document','focusin',{target:{closest:()=>null}});safe.window.mttGrantAnalytics();assert.equal(safe.scripts.length,2);});
test('private routes/query/hash/referrer, nonproduction hosts and GPC are excluded',()=>{
 const blocked=[{url:'https://mttpackaging.com/request-a-quote'},{url:'https://mttpackaging.com/zh/request-a-quote/'},{url:'https://mttpackaging.com/thank-you'},{url:'https://mttpackaging.com/tools/box-size-calculator'},{url:'https://mttpackaging.com/tools/gift-box-solution-builder/app.html'},{url:'https://mttpackaging.com/products?product=PRIVATE'},{url:'https://mttpackaging.com/about#PRIVATE'},{referrer:'https://mttpackaging.com/request-a-quote'},{referrer:'https://example.org/?email=PRIVATE'},{referrer:'https://example.org/#PRIVATE'},{url:'http://localhost:5173/'},{url:'https://mttpackaging.com.example.org/'}];
 for(const options of blocked){const h=setup(options);h.window.mttGrantAnalytics();assert(!h.scripts.some(s=>s.src===CLARITY),JSON.stringify(options));}
 const gpc=setup({gpc:true});gpc.window.mttGrantAnalytics();assert.equal(gpc.scripts.length,0);assert.equal(gpc.window.mttAnalyticsState().granted,false);const safe=setup({url:'https://www.mttpackaging.com/products/public-box',referrer:'https://example.org/public'});safe.window.mttGrantAnalytics();assert.equal(safe.scripts.length,2);
});
test('sensitive click capture stops before navigation; public links continue',()=>{
 for(const href of ['https://mttpackaging.com/tools','https://mttpackaging.com/about?email=PRIVATE','mailto:private@example.org','tel:+123456','https://wa.me/123?text=PRIVATE','https://api.whatsapp.com/send?text=PRIVATE']){const h=setup();h.window.mttGrantAnalytics();const sdk=vendor(h);assert.equal(h.listeners.document.get('click')[0].options,true);h.emit('document','click',{target:{closest:s=>s==='a'?{href}:null}});h.flush();assert.equal(sdk.state.active,false,href);}
 const safe=setup();safe.window.mttGrantAnalytics();const sdk=vendor(safe);safe.emit('document','click',{target:{closest:()=>({href:'https://mttpackaging.com/insights/public'})}});assert.equal(sdk.state.active,true);
});
test('popstate/hashchange and programmatic private routing stop capture',()=>{
 for(const [event,url] of [['popstate','https://mttpackaging.com/request-a-quote'],['hashchange','https://mttpackaging.com/about#PRIVATE']]){const h=setup();h.window.mttGrantAnalytics();const sdk=vendor(h);h.location.href=url;h.emit('window',event);h.flush();assert.equal(sdk.state.active,false,event);}
 for(const method of ['pushState','replaceState']){const h=setup();h.window.mttGrantAnalytics();const sdk=vendor(h);h.history[method]({},'','/about?email=PRIVATE');h.flush();assert.equal(sdk.state.active,false,method);assert.equal(h.historyCalls[0].stoppedBeforeMutation,true,'Stop must precede history mutation');assert.equal(h.location.search,'?email=PRIVATE');}
 const safe=setup();safe.window.mttGrantAnalytics();const sdk=vendor(safe);safe.history.pushState({},'','/insights/public');assert.equal(sdk.state.active,true);assert.equal(safe.historyCalls[0].stoppedBeforeMutation,false);
});
test('cross-tab deny/delete revoke; unrelated writes and grants do not start capture',()=>{
 for(const newValue of ['denied',null,'invalid']){const h=setup();h.window.mttGrantAnalytics();const sdk=vendor(h);h.emit('window','storage',{key:KEY,newValue});h.flush();assert.equal(sdk.state.active,false);assert.equal(h.window['ga-disable-G-Z132GJZZ57'],true);}
 const h=setup();h.emit('window','storage',{key:KEY,newValue:'granted'});assert.equal(h.scripts.length,0);h.window.mttGrantAnalytics();const sdk=vendor(h);h.emit('window','storage',{key:'mtt_studio_project',newValue:null});assert.equal(sdk.state.active,true);
});
test('cross-tab localStorage.clear revokes analytics',()=>{const h=setup();h.window.mttGrantAnalytics();const sdk=vendor(h);h.emit('window','storage',{key:null,newValue:null});h.flush();assert.equal(sdk.state.active,false);assert.equal(h.window['ga-disable-G-Z132GJZZ57'],true);});
test('blocked session storage cannot prevent stop or destroy a saved form plan',()=>{const h=setup({storageThrows:true});h.window.mttGrantAnalytics();const sdk=vendor(h);assert.doesNotThrow(()=>h.window.mttRevokeAnalytics());h.flush();assert.equal(sdk.state.active,false);assert.equal(h.session.get('mtt_calc_handoff'),'KEEP CALCULATOR');});
console.log(`${cases} consent behavior scenarios passed. Offline VM only; no vendor or form network requests.`);
