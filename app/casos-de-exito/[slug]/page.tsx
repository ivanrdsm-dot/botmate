import {botmateCases} from '@/lib/botmate-cases';
import {BotmateCaseDetail} from '@/components/BotmateCases';
import {notFound} from 'next/navigation';
import stories from '@/lib/pudu-stories.json';
import {CaseDetail} from '@/components/PuduPages';
import {localizedMetadata} from '@/lib/pudu-seo';
export function generateStaticParams(){return [...stories.cases,...botmateCases].map(r=>({slug:r.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const own=botmateCases.find(r=>r.slug===slug);if(own)return localizedMetadata(own.brand+" · Proyecto Botmate en México",own.description.es,"/casos-de-exito/"+slug,'es',{url:own.image,alt:own.imageAlt.es});const r=stories.cases.find(r=>r.slug===slug);return r?localizedMetadata(r.brand+" · Caso internacional Pudu",r.description.es,'/casos-de-exito/'+r.slug):{};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const own=botmateCases.find(r=>r.slug===slug);if(own)return <BotmateCaseDetail entry={own}/>;const r=stories.cases.find(r=>r.slug===slug);if(!r)notFound();return <CaseDetail entry={r}/>;}
