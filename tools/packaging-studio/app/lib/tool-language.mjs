import {createInstance} from 'i18next';
import source from './locales/tool.tsv?raw';
export const LANGUAGES={en:'English',zh:'简体中文',de:'Deutsch',fr:'Français',es:'Español',it:'Italiano',ja:'日本語',ko:'한국어'};
const codes=Object.keys(LANGUAGES),resources=Object.fromEntries(codes.map(c=>[c,{translation:{}}]));
for(const row of source.trim().split('\n')){const cells=row.split('\t');codes.forEach((code,i)=>{resources[code].translation[cells[0]]=cells[i]||cells[0]})}
export const toolI18n=createInstance();
let preferred='en';try{const value=localStorage.getItem('mtt-language-choice');if(Object.hasOwn(LANGUAGES,value))preferred=value}catch{}
toolI18n.init({lng:preferred,fallbackLng:'en',resources,initAsync:false,keySeparator:false,nsSeparator:false,interpolation:{escapeValue:false}});
export function tr(text){return typeof text==='string'?toolI18n.t(text,{defaultValue:text}):text}
const listeners=new Set();
export function languageSnapshot(){return toolI18n.language||'en'}
export function subscribeLanguage(listener){listeners.add(listener);return()=>listeners.delete(listener)}
export function changeToolLanguage(code){if(!Object.hasOwn(LANGUAGES,code))return;toolI18n.changeLanguage(code);try{localStorage.setItem('mtt-language-choice',code)}catch{}document.documentElement.lang=code==='zh'?'zh-Hans':code;listeners.forEach(l=>l())}
if(typeof window!=='undefined')window.addEventListener('storage',e=>{if(e.key==='mtt-language-choice')changeToolLanguage(e.newValue)});
