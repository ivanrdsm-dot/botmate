/** Read-only production smoke test. Run: node scripts/verify-site.mjs http://127.0.0.1:3006 */
import assert from 'node:assert/strict';
const base = process.argv[2] || 'http://127.0.0.1:3006';
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
assert(routes.length > 20, 'Sitemap must contain the catalog and editorial routes');
routes.push('/privacidad');
const titles = new Set(), descriptions = new Set(), assets = new Set(), links = new Set();
const report = [];
for (const path of routes) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, `${path}: HTTP 200`);
  const html = await response.text();
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/s)?.[1];
  assert(title && !titles.has(title), `${path}: unique title`); titles.add(title);
  assert(description && !descriptions.has(description), `${path}: unique description`); descriptions.add(description);
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, `${path}: exactly one h1`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(new URL(canonical).pathname, path, `${path}: canonical`);
  assert(!/aggregateRating|schema.org\/InStock|SearchAction|89%|9,800|24\/7|127 reseñas/.test(html), `${path}: no unsupported claims/schema`);
  assert(!/googletagmanager.com|connect.facebook.net/.test(html), `${path}: no unapproved trackers`);
  for (const m of html.matchAll(/<img\s[^>]*>/g)) {
    assert(/\salt="[^"]*"/.test(m[0]), `${path}: image alt`);
    const src = m[0].match(/\ssrc="([^"]+)"/)?.[1];
    if (src?.startsWith('/')) assets.add(src.replaceAll('&amp;', '&'));
  }
  for (const m of html.matchAll(/<a\s[^>]*href="([^"#]+)"/g)) {
    const href = m[1].replaceAll('&amp;', '&');
    if(href.startsWith('/'))links.add(href.split('#')[0]);
  }
  report.push({path, status: response.status, title, canonical});
}
for(const path of links){const r=await fetch(base+path);assert.equal(r.status,200,`Internal link ${path}`);}
for(const path of assets){const r=await fetch(base+path);assert.equal(r.status,200,`Image ${path}`);assert(r.headers.get('content-type')?.startsWith('image/'),`Image content type ${path}`);}
for(const path of ['/no-existe','/robots/no-existe','/casos-de-exito/grupo-restaurantero-cdmx','/blog/guia-fiscal-plan-mexico-robots']){const r=await fetch(base+path);assert.equal(r.status,404,`Unknown/withdrawn route ${path}`);}
for(const [from,to] of [['/robots/bellabot-pro','/robots/botmate-serve'],['/robots/sh1','/robots/botmate-clean-mini']]){const r=await fetch(base+from,{redirect:'manual'});assert([301,308].includes(r.status),`Permanent redirect ${from}`);assert.equal(r.headers.get('location'),to);}
for(const path of ['/opengraph-image','/media/botmate-wordmark.png','/videos/robot-service.mp4']){const r=await fetch(base+path);assert.equal(r.status,200,`Media ${path}`);}
const privacy=await(await fetch(base+'/privacidad')).text();assert(/noindex/.test(privacy),'Draft privacy noindex');
console.log(JSON.stringify({passed:true,routes:report.length,internalLinks:links.size,images:assets.size,checkedAt:new Date().toISOString(),report},null,2));
