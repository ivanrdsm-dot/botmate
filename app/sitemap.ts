import type {MetadataRoute} from 'next';
import {puduProducts,puduIndustries,puduAliases} from '@/lib/pudu';
import {botmateCases} from '@/lib/botmate-cases';
import stories from '@/lib/pudu-stories.json';
import {robots} from '@/lib/robots';
import {posts} from '@/lib/posts';
import {site} from '@/lib/site';
import {routePairs,localPath} from '@/lib/locale';
export default function sitemap():MetadataRoute.Sitemap {
 const paths=[...Object.keys(routePairs).filter(p=>p!=='/privacidad'),...puduProducts.map(p=>'/robots/'+p.slug),...puduIndustries.map(p=>'/sectores/'+p.slug),...botmateCases.map(p=>'/casos-de-exito/'+p.slug),...stories.cases.map(p=>'/casos-de-exito/'+p.slug),...stories.posts.map(p=>'/blog/'+p.slug),...robots.filter(r=>!puduAliases[r.slug]).map(r=>'/robots/'+r.slug),...posts.map(p=>'/blog/'+p.slug)];
 const result:MetadataRoute.Sitemap=[];
 for(const path of new Set(paths)){const languages={'es-MX':site.url+path,'en':site.url+localPath(path,'en')};for(const locale of ['es','en'] as const)result.push({url:site.url+localPath(path,locale),lastModified:new Date(puduProducts.some(p=>path==='/robots/'+p.slug)?'2026-09-24':path==='/'||path==='/casos-de-exito'||botmateCases.some(c=>path==='/casos-de-exito/'+c.slug)?'2026-09-17':'2026-09-13'),images:botmateCases.filter(c=>path==='/casos-de-exito/'+c.slug).map(c=>site.url+c.image),changeFrequency:'monthly',priority:path==='/'?1:0.7,alternates:{languages}});}
 return result;
}
