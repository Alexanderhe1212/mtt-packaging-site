import assert from 'node:assert/strict';
import {languageRoute} from '../lib/language-routes.mjs';
for (const path of ['/tools/gift-box-solution-builder','/case-studies','/packaging/custom-inserts/']) {
 assert.equal(languageRoute(path,'zh'),path);
 assert.equal(languageRoute(path,'en'),path);
}
assert.equal(languageRoute('/','zh'),'/zh');
assert.equal(languageRoute('/zh/','en'),'/');
assert.equal(languageRoute('/request-a-quote/','zh'),'/zh/request-a-quote');
assert.equal(languageRoute('/zh/request-a-quote/','en'),'/request-a-quote');
console.log('Language switching preserves feature pages and translated counterparts.');
