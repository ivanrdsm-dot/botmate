'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import type { Locale } from '@/lib/locale';
export default function PuduVideo({src,poster,name,locale='es'}:{src:string;poster:string;name:string;locale?:Locale}) {
 const [open,setOpen]=useState(false);const es=locale==='es';
 return <figure className="pudu-video"><div className="pudu-video-frame">{open?<video src={src} poster={poster} controls autoPlay muted playsInline preload="metadata" aria-label={`${name} · ${es?'video oficial de Pudu':'official Pudu video'}`}/>:<button type="button" className="pudu-video-cover" onClick={()=>setOpen(true)} aria-label={`${es?'Reproducir video de':'Play video of'} ${name}`}><Image src={poster} alt={`${name} · ${es?'video oficial':'official video'}`} fill sizes="(min-width: 1000px) 75vw, 95vw"/><span><Play fill="currentColor" size={24}/>{es?'Ver en acción':'Watch in action'}</span></button>}</div><figcaption>{es?'Extracto del video oficial de Pudu Robotics · Sin audio · Imágenes del fabricante':'Excerpt from Pudu Robotics’ official video · No audio · Manufacturer footage'}</figcaption></figure>
}
