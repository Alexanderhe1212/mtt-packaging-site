import assert from 'node:assert/strict';
import vm from 'node:vm';
import {analyticsBootstrap} from '../lib/analytics-bootstrap.mjs';
function setup(){const scripts=[],window={};const document={head:{appendChild:s=>scripts.push(s)},createElement:()=>({remove(){}})};vm.runInNewContext(analyticsBootstrap,{window,document});return {window,scripts};}
const {window:w,scripts}=setup();
assert.equal(scripts.length,0,'No statistics script before consent');
assert.equal(w['ga-disable-G-Z132GJZZ57'],true);
w.mttRevokeAnalytics();assert.equal(scripts.length,0);
w.mttGrantAnalytics();assert.equal(scripts.length,1);assert.equal(w['ga-disable-G-Z132GJZZ57'],false);
assert.equal(scripts[0].src,'https://www.googletagmanager.com/gtag/js?id=G-Z132GJZZ57');
w.mttGrantAnalytics();assert.equal(scripts.length,1,'Repeat grant must not load twice');
w.mttRevokeAnalytics();assert.equal(w['ga-disable-G-Z132GJZZ57'],true);
w.mttGrantAnalytics();assert.equal(scripts.length,1);
assert.equal(w.dataLayer.filter(x=>x[0]==='config').length,1,'One initial pageview configuration');
assert.equal(w.dataLayer.at(-1)[2].analytics_storage,'granted');
const retry=setup();retry.window.mttGrantAnalytics();retry.scripts[0].onerror();retry.window.mttGrantAnalytics();assert.equal(retry.scripts.length,2,'A failed script can be retried');
assert.equal(retry.window.dataLayer.filter(x=>x[0]==='config').length,1,'Retry preserves one initial configuration');
console.log('Consent denied/granted/revoked/regranted, duplicate loading and failed-download retry pass. No network used.');
