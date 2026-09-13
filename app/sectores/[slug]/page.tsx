import {notFound} from 'next/navigation';
import {puduIndustries} from '@/lib/pudu';
import {IndustryDetail} from '@/components/PuduPages';
import {localizedMetadata} from '@/lib/pudu-seo';
export function generateStaticParams(){return puduIndustries.map(r=>({slug:r.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const r=puduIndustries.find(r=>r.slug===slug);return r?localizedMetadata(r.title.es,r.description.es,'/sectores/'+r.slug):{};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const r=puduIndustries.find(r=>r.slug===slug);if(!r)notFound();return <IndustryDetail industry={r}/>;}
