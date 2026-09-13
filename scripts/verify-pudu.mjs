/** Verify public bilingual pages, metadata, local assets, redirects and attribution. */
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base=process.argv[2]||'http://127.0.0.1:3008';
const get=async(path,options={})=>fetch(base+path,{signal:AbortSignal.timeout(40000),...options});
const sitemap=await(await get('/sitemap.xml')).text();
const routes=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);
assert(routes.length>=140);assert.equal(new Set(routes).size,routes.length);
const assets=new Set(),links=new Set(),report=[];
let cursor=0;
async function pageWorker(){while(cursor<routes.length){const path=routes[cursor++];const response=await get(path);const html=await response.text();assert.equal(response.status,200,path);assert.equal((html.match(/<h1[ >]/g)||[]).length,1,path+' h1');
assert(/<meta name="description" content="[^"]+"/.test(html),path+' description');assert(!/googletagmanager.com|connect.facebook.net/.test(html),path+' no unapproved trackers');
const title=html.match(/<title>(.*?)<\/title>/s)?.[1];assert(title,path+' title');const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];assert.equal(new URL(canonical).href,new URL('https://www.botmate.mx'+path).href,path+' canonical');
const expected=path==='/en'||path.startsWith('/en/')?'en':'es-MX';assert(html.includes('lang="'+expected+'"'),path+' language');assert(html.includes('hrefLang="en"')||html.includes('hreflang="en"'),path+' alternate');
assert(!/aggregateRating|"availability":"https:\/\/schema.org\/InStock"|127 reseñas/.test(html),path+' no invented rating/stock');
assert(!/<iframe[^>]*src="https:\/\/calendar.google.com/.test(html),path+' calendar opt-in');
for(const m of html.matchAll(/<img\s[^>]*>/g)){assert(/\salt="[^"]*"/.test(m[0]),path+' image alt');const src=m[0].match(/\ssrc="([^"]+)"/)?.[1];if(src?.startsWith('/'))assets.add(src.replaceAll('&amp;','&'));}
for(const m of html.matchAll(/<a\s[^>]*href="([^"#]+)"/g)){const href=m[1].replaceAll('&amp;','&');assert(!/^https?:\/\/[^/]*(pudurobotics\.com|pudutech\.com)/i.test(href),path+' no manufacturer exit: '+href);if(href.startsWith('/'))links.add(href.split('#')[0]);}
report.push({path,status:response.status,title});}}
await Promise.all(Array.from({length:6},pageWorker));
const titles=report.map(x=>x.title);assert.equal(new Set(titles).size,titles.length,'Unique page titles');
const pending=[...links].filter(p=>!routes.includes(p));cursor=0;await Promise.all(Array.from({length:6},async()=>{while(cursor<pending.length){const p=pending[cursor++];const pdf=p.endsWith('.pdf');const r=await get(p,pdf?{headers:{Range:'bytes=0-1023'}}:{});const body=await r.arrayBuffer();assert.equal(r.status,pdf?206:200,'Link '+p);if(pdf){assert(r.headers.get('content-type')?.includes('application/pdf'));assert(Buffer.from(body).subarray(0,5).toString()==='%PDF-','PDF header '+p);}}}));
const assetList=[...assets];cursor=0;await Promise.all(Array.from({length:5},async()=>{while(cursor<assetList.length){const p=assetList[cursor++];const r=await get(p);await r.arrayBuffer();assert.equal(r.status,200,'Image '+p);assert(r.headers.get('content-type')?.startsWith('image/'));}}));
const catalog=JSON.parse(await fs.readFile('lib/pudu-catalog.json','utf8'));
assert.equal(catalog.products.length,27);for(const slug of ['pudu-gt3','pudu-gt5','pudu-gt7','pudu-mp2000','pudu-t150','pudu-t300','pudu-t600','pudu-t600-underride'])assert(routes.includes('/robots/'+slug)&&routes.includes('/en/robots/'+slug),slug+' bilingual coverage');assert.equal(catalog.industries.length,11);assert.equal(catalog.accessories.length,28);assert.equal(catalog.logos.length,30);assert.equal(catalog.downloads.length,27);
const videos=[...new Set(catalog.products.map(r=>r.video).filter(Boolean))];for(const p of videos){const r=await get(p,{headers:{Range:'bytes=0-1023'}});await r.arrayBuffer();assert.equal(r.status,206,'Video range '+p);}
for(const p of ['/robots/unknown','/en/robots/unknown','/sectores/unknown','/en/industries/unknown','/en/unknown','/casos-de-exito/grupo-restaurantero-cdmx']){const r=await get(p);await r.text();assert.equal(r.status,404,'Unknown '+p);}
for(const [from,to] of [['/robots/botmate-serve','/robots/bellabot-pro'],['/robots/botmate-clean','/robots/pudu-cc1'],['/robots/sh1','/robots/pudu-sh1']]){const r=await get(from,{redirect:'manual'});await r.text();assert([301,308].includes(r.status),from);assert(r.headers.get('location')?.endsWith(to),from+' destination');}
for(const p of ['/privacidad','/en/privacy']){const r=await get(p);const html=await r.text();assert.equal(r.status,200);assert(html.includes('noindex'));}
const home=await(await get('/')).text();assert(home.includes('Referencias publicadas por Pudu Robotics'));assert(home.includes('No corresponden a la operación de Botmate'));assert(home.includes('Higgsfield'));
assert(home.includes('Ivan Cadavieco'));const blog=await(await get('/blog')).text();const englishBlog=await(await get('/en/blog')).text();const stories=JSON.parse(await fs.readFile('lib/pudu-stories.json','utf8'));for(const p of stories.posts){assert(blog.includes('/blog/'+p.slug));assert(englishBlog.includes('/en/blog/'+p.slug));}for(const p of catalog.downloads){assert(p.localPath.startsWith('/documentos/pudu/'));await fs.access('public'+p.localPath);}
console.log(JSON.stringify({passed:true,routes:routes.length,images:assets.size,internalLinks:links.size,videos:videos.length,checkedAt:new Date().toISOString(),report:report.sort((a,b)=>a.path.localeCompare(b.path))},null,2));
