/** Crawl the sitemap and validate the SEO contract from production HTML. */
import assert from 'node:assert/strict';
const base = (process.argv[2] || 'http://127.0.0.1:3006').replace(/\/$/,'');
const origin = 'https://www.botmate.mx';
const request = path => fetch(base+path,{signal:AbortSignal.timeout(30000)});
const xml = await (await request('/sitemap.xml')).text();
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m=>m[1]);
const paths = entries.map(entry=>new URL(entry.match(/<loc>([^<]+)<\/loc>/)[1]).pathname);
assert.equal(new Set(paths).size, paths.length, 'Unique sitemap URLs');
assert(paths.includes('/robots-de-limpieza') && paths.includes('/en/cleaning-robots'));
const images = [...new Set([...xml.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map(m=>m[1]))];
assert(images.length>50,'Sitemap exposes product, industry and case images');
const report=[], failures=[];let cursor=0;
const readTag=(html,re)=>html.match(re)?.[1];
await Promise.all(Array.from({length:5},async()=>{
  while(cursor<paths.length){const path=paths[cursor++];try{
    const response=await request(path); const html=await response.text();
    assert.equal(response.status,200,path+' HTTP');
    assert.equal((html.match(/<h1(?:\s|>)/g)||[]).length,1,path+' one h1');
    const title=readTag(html,/<title>([\s\S]*?)<\/title>/);
    const description=readTag(html,/<meta name="description" content="([^"]+)"/);
    const canonical=readTag(html,/<link rel="canonical" href="([^"]+)"/);
    assert(title && description,path+' metadata');
    assert((title.match(/botmate/gi)||[]).length<=1,path+' repeated brand');
    assert.equal(new URL(canonical).href,new URL(origin+path).href,path+' canonical');
    assert(!/<meta name="robots" content="[^"]*noindex/.test(html),path+' indexable');
    const alternates=[...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/gi)];
    assert(alternates.some(m=>m[1]==='es-MX')&&alternates.some(m=>m[1]==='en'),path+' language alternates');
    for(const a of alternates) assert(paths.includes(new URL(a[2]).pathname),path+' alternate resolves in sitemap');
    assert(html.includes((path==='/en'||path.startsWith('/en/'))?'lang="en"':'lang="es-MX"'),path+' language');
    const structured=[...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
    assert(structured.length,path+' structured data');
    if(/^\/(en\/)?robots\/pudu-/.test(path))assert(structured.some(d=>d['@type']==='BreadcrumbList'),path+' product breadcrumbs');
    assert(!html.includes('aggregateRating'),path+' no invented ratings');
    report.push({path,title,descriptionLength:description.length,status:response.status});
  }catch(e){failures.push(String(e));}}
}));
assert.equal(new Set(report.map(p=>p.title)).size,report.length,'Unique titles');
for(const path of ['/contacto?robot=PUDU%20CC1&interes=Cotizacion','/en/contact?robot=PUDU%20CC1','/robots?familia=cleaning']){
 const response=await request(path);const html=await response.text();
 assert.equal(response.status,200,path);assert.equal(readTag(html,/<link rel="canonical" href="([^"]+)"/),origin+path.split('?')[0],path+' parameter canonical');
}
const robots=await(await request('/robots.txt')).text();
assert(robots.includes('User-Agent: *')&&robots.includes('Disallow: /api/')&&robots.includes('Disallow: /private/'));
assert(!/User-Agent: (Googlebot|Bingbot|GPTBot)/i.test(robots),'No crawler override bypasses shared rules');
let imageCursor=0;
await Promise.all(Array.from({length:6},async()=>{while(imageCursor<images.length){const url=images[imageCursor++];try{const r=await fetch(base+new URL(url).pathname,{method:'HEAD',signal:AbortSignal.timeout(30000)});assert.equal(r.status,200,url);assert(r.headers.get('content-type')?.startsWith('image/'),url);}catch(e){failures.push(String(e));}}}));
console.log(JSON.stringify({passed:failures.length===0,pages:report.length,sitemapImages:images.length,failures,report:report.sort((a,b)=>a.path.localeCompare(b.path))},null,2));
if(failures.length)process.exitCode=1;
