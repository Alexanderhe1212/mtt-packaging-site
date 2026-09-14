// Exercise the real QuoteForm submission handler without sending any enquiry.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const source=fs.readFileSync('components/QuoteForm.tsx','utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
async function scenario({ok=true,result={ok:true},networkError=false,attached=true,valid=true}={}){
 const removed=[],redirects=[],events=[],requests=[];const exports={};
 const react={useEffect:()=>{},useRef:v=>({current:v}),useState:v=>[v,()=>{}]};
 const jsx=(type,props)=>({type,props});
 const context={exports,require:name=>name==='react'?react:name==='react/jsx-runtime'?{jsx,jsxs:jsx}:name.includes('interface')?{resources:{en:{translation:{sendError:'failed'}}}}:name.includes('analytics')?{trackEvent:(...a)=>events.push(a)}:{CALC_HANDOFF_KEY:'mtt_calc_handoff'},
 sessionStorage:{removeItem:k=>removed.push(k)},location:{pathname:'/request-a-quote',assign:v=>redirects.push(v)},FormData:class {},
 fetch:async(...args)=>{requests.push(args);if(networkError)throw new Error('offline');return {ok,json:async()=>result}}};
 vm.runInNewContext(compiled,context);
 const form=exports.default({action:'/test-only'});
 const event={preventDefault(){},currentTarget:{reportValidity:()=>valid,action:'/test-only',querySelector:()=>attached?{}:null}};
 await form.props.onSubmit(event);
 return {removed,redirects,events,requests,submit:()=>form.props.onSubmit(event)};
}
for(const failure of [{ok:false},{result:{ok:false}},{result:null},{networkError:true}]){
 const r=await scenario(failure);assert.equal(r.removed.length,0);assert.equal(r.redirects.length,0);assert.equal(r.events.length,1);assert.equal(r.events[0][0],'quote_error');
 await r.submit();assert.equal(r.requests.length,2,'failed request must allow retry');
}
const accepted=await scenario();assert.deepEqual(accepted.removed,['mtt_calc_handoff']);assert.deepEqual(accepted.redirects,['/thank-you']);
await accepted.submit();assert.equal(accepted.requests.length,1,'accepted/pending request must not double submit');
const ordinary=await scenario({attached:false});assert.equal(ordinary.removed.length,0,'unrelated enquiry must preserve calculator draft');
const invalid=await scenario({valid:false});assert.equal(invalid.requests.length,0);assert.equal(invalid.removed.length,0);
assert(!fs.readFileSync('components/CalcPreFill.tsx','utf8').includes('removeItem'),'prefill must not erase retry data');
console.log('Quote acceptance, rejection, offline retry, validation, duplicate submission and draft preservation pass. No network used.');
