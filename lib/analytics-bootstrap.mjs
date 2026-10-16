// Basic consent: no analytics download until the current disclosure is accepted.
// Clarity stop is deliberately irreversible within a document: ConsentV2 denial
// alone restarts its SDK in cookieless mode. A new page can honor a later opt-in.
export const analyticsBootstrap = `
(function(){
 if(window.mttGrantAnalytics)return;
 var gaLoaded=false,gaConfigured=false,clarityRequested=false,clarityStopped=false,granted=false;
 var consentKey='mtt_cookie_consent_v2';
 window.dataLayer=window.dataLayer||[];
 window.gtag=function(){window.dataLayer.push(arguments);};
 window.gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
 window['ga-disable-G-Z132GJZZ57']=true;
 function clearClarityStorage(){
  ['_clck','_clsk'].forEach(function(name){
   document.cookie=name+'=; Max-Age=0; path=/; SameSite=Lax';
   var parts=location.hostname.split('.');
   while(parts.length>1){document.cookie=name+'=; Max-Age=0; path=/; domain=.'+parts.join('.')+'; SameSite=Lax';parts.shift();}
  });
  try{sessionStorage.removeItem('_cltk');}catch(e){}
 }
 function privateUrl(value){
  try{var u=new URL(value,location.href);return !!(u.search||u.hash)||/^\\/(?:zh\\/)?(?:request-a-quote|thank-you|tools)(?:\\/|$)/.test(u.pathname);}catch(e){return true;}
 }
 function eligible(){
  return /^(www\\.)?mttpackaging\\.com$/.test(location.hostname)&&!privateUrl(location.href)&&(!document.referrer||!privateUrl(document.referrer))&&!navigator.globalPrivacyControl;
 }
 window.mttStopClarity=function(){
  clarityStopped=true;
  if(typeof window.clarity==='function'){
   // Also clear after a late SDK start and its queued pre-withdrawal flush.
   window.clarity('metadata',function(){clearClarityStorage();setTimeout(clearClarityStorage,0);},false);
   window.clarity('stop');
   window.clarity('consentv2',{analytics_Storage:'denied',ad_Storage:'denied'});
  }
  clearClarityStorage();
 };
 function grantClarity(){
  if(clarityRequested||clarityStopped||!eligible())return;
  clarityRequested=true;
  window.clarity=window.clarity||function(){(window.clarity.q=window.clarity.q||[]).push(arguments);};
  window.clarity('consentv2',{analytics_Storage:'granted',ad_Storage:'denied'});
  var script=document.createElement('script');
  script.id='mtt-clarity';script.async=true;script.src='https://www.clarity.ms/tag/yk2b0kh4n6';
  script.onerror=function(){script.remove();if(!clarityStopped)clarityRequested=false;};
  document.head.appendChild(script);
 }
 window.mttGrantAnalytics=function(){
  if(navigator.globalPrivacyControl)return;
  granted=true;
  window['ga-disable-G-Z132GJZZ57']=false;
  window.gtag('consent','update',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  if(!gaLoaded){
   gaLoaded=true;
   var script=document.createElement('script');script.id='mtt-ga';script.async=true;
   script.src='https://www.googletagmanager.com/gtag/js?id=G-Z132GJZZ57';
   script.onerror=function(){gaLoaded=false;script.remove();};
   document.head.appendChild(script);
   if(!gaConfigured){
    gaConfigured=true;window.gtag('js',new Date());
    window.gtag('config','G-Z132GJZZ57',{page_location:location.origin+location.pathname,page_referrer:document.referrer.split('?')[0].split('#')[0],allow_google_signals:false,allow_ad_personalization_signals:false});
   }
  }
  grantClarity();
 };
 window.mttRevokeAnalytics=function(){
  granted=false;window['ga-disable-G-Z132GJZZ57']=true;
  window.gtag('consent','update',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
  if(clarityRequested)window.mttStopClarity();else clearClarityStorage();
 };
 // Capture before the recorder's handlers and before editable content changes.
 document.addEventListener('focusin',function(e){if(e.target.closest&&e.target.closest('input,textarea,select,[contenteditable="true"]'))window.mttStopClarity();},true);
 document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a');if(a&&(privateUrl(a.href)||/^(mailto:|tel:|https:\\/\\/(?:wa\\.me|api\\.whatsapp\\.com))/.test(a.href)))window.mttStopClarity();},true);
 window.addEventListener('popstate',function(){if(privateUrl(location.href))window.mttStopClarity();});
 window.addEventListener('hashchange',function(){if(privateUrl(location.href))window.mttStopClarity();});
 ['pushState','replaceState'].forEach(function(method){
  var original=history[method];
  history[method]=function(state,title,url){if(url!=null&&privateUrl(String(url)))window.mttStopClarity();return original.apply(this,arguments);};
 });
 window.addEventListener('storage',function(e){if((e.key===consentKey||e.key===null)&&e.newValue!=='granted')window.mttRevokeAnalytics();});
 window.mttAnalyticsState=function(){return {granted:granted,clarityRequested:clarityRequested,clarityStopped:clarityStopped,clarityEligible:eligible()};};
})();`;
