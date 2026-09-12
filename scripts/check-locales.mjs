import assert from 'node:assert/strict';
import {resources} from '../lib/locales/interface.mjs';
const baseline=Object.keys(resources.en.translation).sort();
for(const [language,{translation}] of Object.entries(resources)){assert.deepEqual(Object.keys(translation).sort(),baseline,`Missing or obsolete keys: ${language}`);for(const [key,value] of Object.entries(translation))assert.ok(typeof value==='string'&&value.trim(),`Empty translation ${language}.${key}`)}
console.log('Locale dictionary keys and values verified (en, zh). Page-copy coverage is reviewed separately.');
