import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.argv[2]||'http://localhost:3013';
const catalog=JSON.parse(await fs.readFile('lib/pudu-catalog.json','utf8'));
const experiences=JSON.parse(await fs.readFile('lib/robot-experiences.json','utf8'));
const media=JSON.parse(await fs.readFile('docs/pudu/experience-media-report.json','utf8'));
const routes=catalog.products.flatMap(p=>['/robots/'+p.slug,'/en/robots/'+p.slug]);
let cursor=0; const results=[];
await Promise.all(Array.from({length:4},async()=>{while(cursor<routes.length){
 const route=routes[cursor++];const response=await fetch(base+route);const html=await response.text();
 assert.equal(response.status,200,route);
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,route+' h1');
 for(const id of ['funcionamiento','aplicaciones','ficha','refacciones'])assert(html.includes(`id="${id}"`),route+' '+id);
 const canonical=html.match(/rel="canonical" href="([^"]+)"/)?.[1];assert.equal(canonical,'https://www.botmate.mx'+route);
 const english=route.startsWith('/en/');assert(html.includes(english?'Request a part':'Solicitar refacción'),route+' support');
 assert(html.includes('interes=Soporte'),route+' support intent');
 assert(!/<a[^>]*href="https:\/\/[^/]*(?:pudurobotics|pudutech)\.com/.test(html),route+' must stay on Botmate');
 assert(!html.includes('src="undefined"')&&!html.includes('src=""'),route+' media');
 results.push({route,status:response.status});
}}));
for(const p of catalog.products){
 const e=experiences[p.slug];assert(e?.chapters.length,p.slug+' chapters');
 for(const chapter of e.chapters){for(const locale of ['es','en']){assert(chapter.title[locale]);assert(chapter.description[locale]);}await fs.access('public'+chapter.src);await fs.access('public'+chapter.poster);}
}
for(const m of media){assert.equal(m.status,'ready',m.source);assert(m.bytes>0);if(m.kind==='video'){
 const r=await fetch(base+m.src,{headers:{Range:'bytes=0-1023'}});assert.equal(r.status,206,m.src+' range streaming');await r.arrayBuffer();assert(r.headers.get('content-type')?.startsWith('video/'),m.src);
}}
for(const route of ['/','/en','/robots','/refacciones','/reservar','/contacto?robot=PUDU%20CC1&interes=Soporte']){const r=await fetch(base+route);assert.equal(r.status,200,route);await r.text();}
console.log(JSON.stringify({passed:true,models:catalog.products.length,localizedProductPages:results.length,chapters:Object.values(experiences).reduce((n,e)=>n+e.chapters.length,0),assets:media.length,videoSequences:media.filter(m=>m.kind==='video').length,checkedAt:new Date().toISOString()},null,2));
