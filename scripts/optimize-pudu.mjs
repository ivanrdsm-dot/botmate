import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';
const root=process.cwd();
const jobs=JSON.parse(await fs.readFile('docs/pudu/web-media-jobs.json','utf8'));
await fs.mkdir('public/media/pudu',{recursive:true});
const report=[];
let next=0;
async function worker(){while(next<jobs.length){const job=jobs[next++];const dest=path.join(root,'public',job.path);try{let bytes; const ext=new URL(job.url).pathname.split('.').pop();const archived=path.join(root,'.pudu-source/originals',crypto.createHash('sha256').update(job.url).digest('hex').slice(0,16)+'.'+ext);try{bytes=await fs.readFile(archived)}catch{const res=await fetch(job.url,{signal:AbortSignal.timeout(60000)});if(!res.ok)throw Error(res.status);bytes=Buffer.from(await res.arrayBuffer())}
const meta=await sharp(bytes).metadata();await sharp(bytes).rotate().resize({width:1800,height:1400,fit:'inside',withoutEnlargement:true}).webp({quality:88,alphaQuality:100}).toFile(dest);report.push({...job,width:meta.width,height:meta.height,bytes:(await fs.stat(dest)).size,status:'ready'});}catch(e){report.push({...job,status:'failed',error:String(e)})}}}
await Promise.all(Array.from({length:6},worker));await fs.writeFile('docs/pudu/web-media-report.json',JSON.stringify(report,null,2));console.log({total:report.length,failed:report.filter(x=>x.status==='failed')});
