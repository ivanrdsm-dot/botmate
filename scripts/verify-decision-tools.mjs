import assert from 'node:assert/strict';
import {estimateWorkload} from '../lib/operation-estimate.mjs';
assert.deepEqual(estimateWorkload(60,3,22,50),{totalHours:66,reviewHours:33});
assert.deepEqual(estimateWorkload(0,3,22,50),{totalHours:0,reviewHours:0});
assert.deepEqual(estimateWorkload(80,1.5,20,100),{totalHours:40,reviewHours:40});
assert.deepEqual(estimateWorkload(60,3,22,0),{totalHours:66,reviewHours:0});
for(const args of [[NaN,3,22,50],[60,Infinity,22,50],[-1,3,22,50],[60,3,32,50],[60,3,22,101],[60,3,22,-1]])assert.equal(estimateWorkload(...args),null);
const base=process.argv[2]||'http://127.0.0.1:3006';
for(const path of ['/encuentra-tu-robot','/en/find-your-robot','/soporte','/en/support','/preguntas-frecuentes','/en/faq','/casos-de-exito/botmate-meximold-2026','/en/case-studies/botmate-meximold-2026']){
 const r=await fetch(base+path);const html=await r.text();assert.equal(r.status,200,path);
 const schemas=[...html.matchAll(/<script([^>]*type="application\/ld\+json"[^>]*)>(.*?)<\/script>/g)];
 assert(schemas.some(m=>m[2].includes('BreadcrumbList')),path+' breadcrumb');
 for(const m of schemas){assert(m[1].includes('nonce='),path+' schema nonce');assert.doesNotThrow(()=>JSON.parse(m[2]));}
 if(path.endsWith('/faq')||path==='/preguntas-frecuentes')assert.equal((html.match(/<details>/g)||[]).length,12,'Complete FAQ content in server HTML');
 if(path.includes('meximold')){assert(/Programado|Scheduled/.test(html));assert(/2026/.test(html));assert(!/aggregateRating|reviewRating/.test(html));}
}
const robots=await (await fetch(base+'/robots.txt')).text();assert(!robots.includes('Disallow: /_next/'),'Rendering resources crawlable');
console.log(JSON.stringify({passed:true,workloadBoundaryCases:10,newRouteChecks:8,faqItemsPerLocale:12}));
