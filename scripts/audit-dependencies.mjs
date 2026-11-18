import {spawnSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';

const withdrawnId='GHSA-fc5q-39xc-vjpf';
const withdrawnUrl=`https://github.com/advisories/${withdrawnId}`;

// A reported dependency inherits its severity from `via` entries. Every path
// must terminate at the one advisory GitHub has confirmed withdrawn.
export function inspectAudit(audit,advisory){
 const packages=audit?.vulnerabilities,counts=audit?.metadata?.vulnerabilities;
 if(!packages||typeof packages!=='object'||!counts||!Number.isInteger(counts.high)||!Number.isInteger(counts.critical))return {ok:false,reason:'Invalid audit report'};
 const risky=Object.entries(packages).filter(([,v])=>v?.severity==='high'||v?.severity==='critical');
 if(risky.some(([,v])=>v.severity==='critical')||counts.critical>0)return {ok:false,reason:'Critical dependency advisory remains'};
 if(risky.length!==counts.high)return {ok:false,reason:'Audit severity counts do not match entries'};
 if(!risky.length)return {ok:true,reason:'No high or critical dependency advisories'};
 if(advisory?.ghsa_id!==withdrawnId||typeof advisory.withdrawn_at!=='string'||!Number.isFinite(Date.parse(advisory.withdrawn_at)))return {ok:false,reason:'Could not independently verify withdrawn advisory'};
 const visited=(name,stack)=>{
  if(stack.has(name))return false;
  const entry=packages[name];if(!entry||!Array.isArray(entry.via)||!entry.via.length)return false;
  const next=new Set(stack);next.add(name);
  let foundHigh=false;
  for(const v of entry.via){
   const severity=typeof v==='string'?packages[v]?.severity:v?.severity;
   if(!['info','low','moderate','high','critical'].includes(severity))return false;
   if(['info','low','moderate'].includes(severity))continue;
   foundHigh=true;
   if(severity==='critical'||!(typeof v==='string'?visited(v,next):v.url===withdrawnUrl))return false;
  }
  return foundHigh;
 };
 if(!risky.every(([name])=>visited(name,new Set())))return {ok:false,reason:'An unverified or additional high advisory remains'};
 return {ok:true,reason:`All ${risky.length} high entries derive solely from ${withdrawnId}, withdrawn ${advisory.withdrawn_at}; ${counts.moderate??'unknown'} moderate entries remain.`};
}

async function main(){
 const result=spawnSync('npm',['audit','--json'],{encoding:'utf8',maxBuffer:20*1024*1024,timeout:120000});
 if(result.error||![0,1].includes(result.status)){console.error('npm audit failed:',result.error?.message||result.stderr);process.exitCode=1;return;}
 let report;try{report=JSON.parse(result.stdout)}catch{console.error('npm audit returned invalid JSON');process.exitCode=1;return;}
 let advisory=null;
 if((report.metadata?.vulnerabilities?.high??0)>0){try{const response=await fetch(`https://api.github.com/advisories/${withdrawnId}`,{headers:{'Accept':'application/vnd.github+json','User-Agent':'MTT-Dependency-Audit'},signal:AbortSignal.timeout(15000)});if(!response.ok)throw new Error(`HTTP ${response.status}`);advisory=await response.json()}catch(e){console.error('Advisory verification failed:',e.message);process.exitCode=1;return;}}
 const verdict=inspectAudit(report,advisory);console.log(verdict.reason);if(!verdict.ok)process.exitCode=1;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href)await main();
