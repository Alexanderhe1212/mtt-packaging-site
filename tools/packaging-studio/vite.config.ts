import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'node:path';
export default defineConfig({
 root:resolve(import.meta.dirname,'entry'),base:'./',publicDir:false,
 plugins:[react(),{name:'public-data-boundary',generateBundle(_,bundle){for(const item of Object.values(bundle)){if(item.type!=='chunk')continue;for(const path of Object.keys(item.modules))if(/\/(quote|costing|v21|export|catalog|effect-reference)\.mjs$/.test(path))throw Error(`Internal module in public build: ${path}`);for(const key of ['tonPrice','markupRate','calculateQuote','calculateDetailedQuote','pricingSettings'])if(item.code.includes(key))throw Error(`Internal pricing token: ${key}`)}}}],
 server:{host:'127.0.0.1',port:4199,strictPort:true},
 build:{outDir:resolve(import.meta.dirname,'../../.studio-build'),emptyOutDir:true,sourcemap:false,assetsInlineLimit:1000000}
});
