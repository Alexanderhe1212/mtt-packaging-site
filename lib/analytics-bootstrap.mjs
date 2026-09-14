// Basic consent mode: download Google Analytics only after explicit consent.
// Kept as a head bootstrap so existing CookieConsent calls are ready before hydration.
export const analyticsBootstrap = `
window.dataLayer=window.dataLayer||[];
window.gtag=function(){window.dataLayer.push(arguments);};
window.gtag('consent','default',{analytics_storage:'denied'});
window['ga-disable-G-Z132GJZZ57']=true;
(function(){
 var loaded=false,configured=false;
 window.mttGrantAnalytics=function(){
  window['ga-disable-G-Z132GJZZ57']=false;
  window.gtag('consent','update',{analytics_storage:'granted'});
  if(loaded)return;
  loaded=true;
  var script=document.createElement('script');
  script.async=true;
  script.src='https://www.googletagmanager.com/gtag/js?id=G-Z132GJZZ57';
  script.onerror=function(){loaded=false;script.remove();};
  document.head.appendChild(script);
  if(!configured){
   configured=true;
   window.gtag('js',new Date());
   window.gtag('config','G-Z132GJZZ57');
  }
 };
 window.mttRevokeAnalytics=function(){
  window['ga-disable-G-Z132GJZZ57']=true;
  window.gtag('consent','update',{analytics_storage:'denied'});
 };
})();`;
