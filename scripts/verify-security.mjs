import assert from 'node:assert/strict';
const base=process.argv[2]||'http://127.0.0.1:3006';
const nonces=[];
for(const path of ['/', '/', '/reservar','/robots/botmate-clean']){
 const r=await fetch(base+path,{headers:{'x-nonce':'untrusted-client-value'}});assert.equal(r.status,200);
 const policy=r.headers.get('content-security-policy');assert(policy);
 const nonce=policy.match(/'nonce-([^']+)'/)[1];nonces.push(nonce);
 assert(!policy.includes('untrusted-client-value'));
 assert(policy.includes("'strict-dynamic'"));assert(!policy.includes("'unsafe-eval'"));
 assert(policy.includes("object-src 'none'"));assert(policy.includes("frame-ancestors 'none'"));assert(policy.includes('frame-src https://calendar.google.com'));
 assert.match(r.headers.get('cache-control'),/no-store/);
 assert.equal(r.headers.get('x-content-type-options'),'nosniff');assert.equal(r.headers.get('x-frame-options'),'DENY');assert(!r.headers.has('x-powered-by'));
 const html=await r.text();const scripts=[...html.matchAll(/<script\b([^>]*)>/g)];
 assert(scripts.length>0);for(const s of scripts)assert(s[1].includes(`nonce="${nonce}"`),`${path}: script without response nonce`);
 if(path==='/reservar'){assert(html.includes('calendar.app.google/DMgTiWSSM7ERKEmA6'));assert(!html.includes('<iframe'),'Google embed must wait for visitor action');}
}
assert.equal(new Set(nonces).size,4,'Response nonces must be unique');
for(const path of ['/media/higgsfield/publicidad-exacta.mp4','/media/higgsfield/equipo.mp4','/media/higgsfield/servicio.mp4','/media/higgsfield/studio.mp4']){
 const r=await fetch(base+path,{headers:{Range:'bytes=0-99'}});assert.equal(r.status,206);assert.match(r.headers.get('content-type'),/video\/mp4/);assert.equal((await r.arrayBuffer()).byteLength,100);
}
console.log(JSON.stringify({passed:true,nonceChecks:4,videoRangeChecks:4,calendarOptIn:true,checkedAt:new Date().toISOString()},null,2));
