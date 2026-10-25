import {build} from 'vite';
import {readFile,writeFile,mkdir,cp,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..'), dir=resolve(root,'.studio-build');
await build({configFile:resolve(root,'tools/packaging-studio/vite.config.ts')});
const entry=await readFile(resolve(dir,'index.html'),'utf8');
let notices='';for(const pkg of ['three','react','react-dom','i18next'])notices+=`\n${pkg}\n`+await readFile(resolve(root,`node_modules/${pkg}/LICENSE`),'utf8');
const target=resolve(root,'public/tools/gift-box-solution-builder');await mkdir(target,{recursive:true});
// Keep Vite's hashed module URLs so optional 3D/editor chunks load only when used.
await rm(resolve(target,'assets'),{recursive:true,force:true});
await cp(resolve(dir,'assets'),resolve(target,'assets'),{recursive:true});
const description='Calculate your internal packaging dimensions, choose a structure, preview your artwork and send a complete custom packaging brief to Hugo at MTT.';
const html=entry.replace('<title>MTT Packaging Studio</title>','<title>Design Your Box | MTT Packaging Studio</title>').replace('</head>',`<meta name="mtt-tool-release" content="2026-10-09-packaging-studio-v1"><meta name="description" content="${description}"><link rel="canonical" href="https://mttpackaging.com/tools/gift-box-solution-builder"></head>`).replace('<div id="root"></div>',`<div id="root"><h1>MTT Packaging Studio — Design Your Box</h1><p>${description}</p><noscript>Enable JavaScript for the interactive designer, or <a href="/request-a-quote">send MTT your dimensions for a custom quote</a>.</noscript></div>`);
await writeFile(resolve(target,'app.html'),html+`\n<!-- ${notices.replaceAll('--','—')} -->`);
await writeFile(resolve(target,'LICENSES.txt'),notices);console.log('Packaged public MTT Studio with on-demand design chunks. Internal pricing module guard passed.');
