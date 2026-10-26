// Exercise the real QuoteForm submission handler without sending any enquiry.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const source=fs.readFileSync('components/QuoteForm.tsx','utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX}}).outputText;
async function scenario({ok=true,result={ok:true},networkError=false,attached=true,valid=true,path="/request-a-quote",leadSource=""}={}){
 const removed=[],redirects=[],events=[],requests=[];const exports={};
 const react={useEffect:()=>{},useRef:v=>({current:v}),useState:v=>[v,()=>{}]};
 const jsx=(type,props)=>({type,props});
 const context={exports,require:name=>name==='react'?react:name==='react/jsx-runtime'?{jsx,jsxs:jsx}:name.includes('interface')?{resources:{en:{translation:{sendError:'failed'}}}}:name.includes('analytics')?{trackEvent:(...a)=>events.push(a)}:{CALC_HANDOFF_KEY:'mtt_calc_handoff'},
 sessionStorage:{removeItem:k=>removed.push(k)},location:{pathname:path,assign:v=>redirects.push(v)},FormData:class extends Map {constructor(){super(leadSource?[['lead_source',leadSource]]:[]) }},
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
for(const [path,leadSource,expected] of [['/','','homepage_quote'],['/request-a-quote','','quote_page'],['/request-a-quote','packaging_calculator','packaging_calculator'],['/zh/request-a-quote','chinese_quote_page','chinese_quote_page']]){
 const r=await scenario({path,leadSource,attached:false});const payload=r.requests[0][1].body;
 assert.equal(payload.get('lead_source'),expected,'accepted enquiries need an explicit source without replacing an existing one');
 assert.equal(payload.get('submission_page'),path,'submission page must be path-only');
 assert.equal(r.events[0][0],'generate_lead');
}
console.log('Quote acceptance, rejection, offline retry, validation, duplicate submission and draft preservation pass. No network used.');

// The chatbot must use the same confirmed-acceptance boundary as the other forms.
const chatbotSource=fs.readFileSync('components/LeadQualificationChatbot.tsx','utf8');
const chatbotHandler=chatbotSource.match(/const submitEnquiry = useCallback\((async \(\) => \{[\s\S]*?)\n  \}, \[answers\]\);/);
assert(chatbotHandler,'chatbot submission handler must remain covered');
for(const [ok,result,expected] of [[true,{ok:true},'success'],[true,{ok:false},'error'],[true,null,'error'],[false,{ok:true},'error'],[true,'invalid_json','error']]){
 const steps=[],events=[];
 await vm.runInNewContext(ts.transpileModule(`(${chatbotHandler[1]}\n})()`,{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText,{answers:{},setStep:s=>steps.push(s),trackEvent:e=>events.push(e),FORMSPREE_ENDPOINT:'/local-only',fetch:async()=>({ok,json:async()=>{if(result==='invalid_json')throw new SyntaxError('Invalid JSON');return result}})});
 assert.equal(steps.at(-1),expected,'HTTP success without accepted JSON must not confirm a chatbot enquiry');
 assert.equal(events.length,expected==='success'?1:0);
}
console.log('Chatbot accepted-response and rejected/malformed-response event boundaries pass.');
