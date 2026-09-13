'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { puduProducts } from '@/lib/pudu';
import { localPath, type Locale } from '@/lib/locale';
const featured = ['pudu-mp2000','pudu-t600','pudu-gt7','pudu-cc1-pro','bellabot-pro','pudu-d5-series'];
export default function PuduHero({locale='es'}:{locale?:Locale}) {
 const [index,setIndex]=useState(0);
 const robot=puduProducts.find(r=>r.slug===featured[index])!;
 const es=locale==='es';
 const words=es?['Mueve.','Escala.','Cultiva.','Cuida.','Conecta.','Explora.']:['Move.','Scale.','Grow.','Care.','Connect.','Explore.'];
 return <section className="pudu-hero" aria-label={es?'Robótica Pudu con Botmate':'Pudu robotics with Botmate'}>
  <div className="container-x pudu-hero-grid">
   <div className="pudu-hero-copy">
    <p className="eyebrow"><span className="live-dot"/>{es?'BOTMATE × PUDU ROBOTICS · MÉXICO':'BOTMATE × PUDU ROBOTICS · MEXICO'}</p>
    <h1>{es?'El siguiente':'The next'}<br/>{es?'movimiento.':'move.'}<br/><span key={index}>{words[index]}</span></h1>
    <p>{es?'Robótica para plantas, almacenes, jardines y espacios de servicio. Tecnología Pudu y talento mexicano para impulsar la modernización de tu empresa.':'Robotics for plants, warehouses, grounds and service spaces. Pudu technology and Mexican talent to drive the modernization of your business.'}</p>
    <div className="hero-actions"><Link className="btn-primary" href={localPath('/robots',locale)}>{es?'Encuentra tu robot':'Find your robot'}<ArrowUpRight size={18}/></Link><Link className="text-link" href={localPath('/reservar',locale)}>{es?'Hablemos de tu proyecto':'Let’s talk about your project'}<ArrowUpRight size={17}/></Link></div>
    <div className="distributor-note"><Image src="/media/pudu/pudu-logo.webp" alt="Pudu Robotics" width={100} height={30}/><span>{es?'Distribuidor oficial en México':'Official distributor in Mexico'}</span></div>
   </div>
   <div className="pudu-stage">
    <div className="stage-coordinate">MX / PUDU / {String(index+1).padStart(2,'0')}</div>
    <div className="stage-orbit stage-orbit-one"/><div className="stage-orbit stage-orbit-two"/><div className="stage-floor"/>
    <Link className="stage-product" href={localPath('/robots/'+robot.slug,locale)} aria-label={robot.name} key={robot.slug}><Image src={robot.image} alt={robot.name+' · Pudu Robotics'} fill sizes="(min-width: 1000px) 52vw, 95vw" priority={index===0}/></Link>
    <div className="stage-caption" aria-live="polite"><span>{es?'INGENIERÍA EN MOVIMIENTO':'ENGINEERING IN MOTION'}</span><h2>{robot.name}</h2><p>{robot.description[locale]}</p></div>
    <div className="stage-controls"><button type="button" aria-label={es?'Modelo anterior':'Previous model'} onClick={()=>setIndex((index+featured.length-1)%featured.length)}><ArrowLeft size={20}/></button><span>0{index+1} / {String(featured.length).padStart(2,'0')}</span><button type="button" aria-label={es?'Siguiente modelo':'Next model'} onClick={()=>setIndex((index+1)%featured.length)}><ArrowRight size={20}/></button></div>
   </div>
  </div>
  <div className="pudu-hero-bottom container-x"><span>{es?'TECNOLOGÍA GLOBAL. TALENTO MEXICANO.':'GLOBAL TECHNOLOGY. MEXICAN TALENT.'}</span><a href="#ecosistema">{es?'Descubre el ecosistema':'Discover the ecosystem'} ↓</a></div>
 </section>
}
