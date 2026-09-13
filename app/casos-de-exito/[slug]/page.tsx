import {notFound} from 'next/navigation';
import stories from '@/lib/pudu-stories.json';
import {CaseDetail} from '@/components/PuduPages';
import {localizedMetadata} from '@/lib/pudu-seo';
export function generateStaticParams(){return stories.cases.map(r=>({slug:r.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const r=stories.cases.find(r=>r.slug===slug);return r?localizedMetadata(r.brand+" · Caso internacional Pudu",r.description.es,'/casos-de-exito/'+r.slug):{};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const r=stories.cases.find(r=>r.slug===slug);if(!r)notFound();return <CaseDetail entry={r}/>;}
