import type {Metadata} from 'next';
import {localPath,type Locale} from './locale';
export function localizedMetadata(title:string,description:string,path:string,locale:Locale='es',image?:{url:string;alt:string}):Metadata {
 return {title,description,alternates:{canonical:localPath(path,locale),languages:{'es-MX':path,'en':localPath(path,'en'),'x-default':path}},twitter:{card:'summary_large_image',images:[image?.url??'/opengraph-image']},openGraph:{title,description,images:[image??{url:'/opengraph-image',alt:title}],locale:locale==='es'?'es_MX':'en_US',alternateLocale:locale==='es'?'en_US':'es_MX',url:localPath(path,locale)}};
}
