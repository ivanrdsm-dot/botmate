import type {Metadata} from 'next';
import {localPath,type Locale} from './locale';
export function localizedMetadata(title:string,description:string,path:string,locale:Locale='es'):Metadata {
 return {title,description,alternates:{canonical:localPath(path,locale),languages:{'es-MX':path,'en':localPath(path,'en'),'x-default':path}},openGraph:{title,description,locale:locale==='es'?'es_MX':'en_US',alternateLocale:locale==='es'?'en_US':'es_MX',url:localPath(path,locale)}};
}
