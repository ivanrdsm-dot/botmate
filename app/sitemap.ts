import type {MetadataRoute} from 'next';
import {puduProducts,puduIndustries,puduAliases} from '@/lib/pudu';
import stories from '@/lib/pudu-stories.json';
import {robots} from '@/lib/robots';
import {posts} from '@/lib/posts';
import {site} from '@/lib/site';
import {routePairs,localPath} from '@/lib/locale';
export default function sitemap():MetadataRoute.Sitemap {
 const paths=[...Object.keys(routePairs).filter(p=>p!=='/privacidad'),...puduProducts.map(p=>'/robots/'+p.slug),...puduIndustries.map(p=>'/sectores/'+p.slug),...stories.cases.map(p=>'/casos-de-exito/'+p.slug),...stories.posts.map(p=>'/blog/'+p.slug),...robots.filter(r=>!puduAliases[r.slug]).map(r=>'/robots/'+r.slug),...posts.map(p=>'/blog/'+p.slug)];
 const result:MetadataRoute.Sitemap=[];
 for(const path of paths){const languages={'es-MX':site.url+path,'en':site.url+localPath(path,'en')};for(const locale of ['es','en'] as const)result.push({url:site.url+localPath(path,locale),lastModified:new Date('2026-09-13'),changeFrequency:'monthly',priority:path==='/'?1:0.7,alternates:{languages}});}
 return result;
}
