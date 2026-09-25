import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { puduProducts } from '@/lib/pudu';
import { BrandLogo, CaseVisual } from './CaseVisual';
import { botmateBrands, botmateCases } from '@/lib/botmate-cases';
import { localPath, type Locale } from '@/lib/locale';

const areas = [
  {family:'cleaning', model:'pudu-cc1', es:'Limpieza', en:'Cleaning', detailEs:'Pisos y espacios comerciales.', detailEn:'Floors and commercial spaces.'},
  {family:'industrial', model:'pudu-t600', es:'Industria y almacenes', en:'Industry & warehouses', detailEs:'Traslado de materiales y cargas.', detailEn:'Material and payload transport.'},
  {family:'delivery', model:'bellabot-pro', es:'Servicio y eventos', en:'Service & events', detailEs:'Entrega, atención y activaciones.', detailEn:'Delivery, hospitality and activations.'},
  {family:'outdoor', model:'pudu-gt7', es:'Jardinería', en:'Landscaping', detailEs:'Mantenimiento de áreas verdes.', detailEn:'Grounds and turf maintenance.'},
  {family:'ai', model:'pudu-d5-series', es:'Robótica e IA', en:'Robotics & AI', detailEs:'Explora nuevas aplicaciones.', detailEn:'Explore emerging applications.'},
];

export function HomeAreas({locale}: {locale: Locale}) {
  const es = locale === 'es';
  return <section id="ecosistema" className="home-areas home-section"><div className="container-x">
    <div className="home-heading"><h2>{es ? '¿Qué necesitas resolver?' : 'What do you need to solve?'}</h2><Link className="text-link" href={localPath('/robots',locale)}>{es ? 'Todos los robots' : 'All robots'}<ArrowUpRight size={17}/></Link></div>
    <div className="home-area-grid">{areas.map(area => {
      const robot = puduProducts.find(r => r.slug === area.model)!;
      return <Link key={area.family} className="home-area-card" href={localPath(area.family==='cleaning'?'/robots-de-limpieza':'/robots?familia='+area.family,locale)}><div className="home-area-image"><Image src={robot.image} alt={robot.name} fill sizes="(min-width: 1000px) 18vw, (min-width: 600px) 30vw, 45vw"/></div><h3>{es ? area.es : area.en}<ArrowUpRight size={16}/></h3><p>{es ? area.detailEs : area.detailEn}</p></Link>;
    })}</div>
  </div></section>;
}

export function HomeCases({locale}: {locale: Locale}) {
  const es = locale === 'es';
  return <section className="home-cases home-section"><div className="container-x">
    <div className="home-heading"><div><h2>{es ? 'Proyectos de Botmate' : 'Botmate projects'}</h2><p>{es ? 'Conoce el alcance y estado de cada proyecto.' : 'Explore the scope and status of each project.'}</p></div><Link className="text-link" href={localPath('/casos-de-exito',locale)}>{es ? 'Ver todos' : 'View all'}<ArrowUpRight size={17}/></Link></div>
    <div className="home-case-grid">{botmateCases.slice(0,3).map(c => <Link key={c.slug} href={localPath('/casos-de-exito/'+c.slug,locale)} className="home-case-card"><CaseVisual entry={c} locale={locale}/><div className="home-case-body"><span className="home-case-brand"><BrandLogo brand={c.brand}/><ArrowUpRight size={20}/></span><span className="project-status">{c.status[locale]}</span><h3>{c.title[locale]}</h3></div></Link>)}</div>
    <div className="home-brands"><p>{es?'Marcas con las que nos relacionamos':'Brands we work with'}</p><ul aria-label={es?'Relaciones confirmadas por Botmate':'Relationships confirmed by Botmate'}>{botmateBrands.map(brand=><li key={brand}><BrandLogo brand={brand}/></li>)}</ul></div>
  </div></section>;
}

export function HomeNext({locale}: {locale: Locale}) {
  const es = locale === 'es';
  const links = es ? [['/renta','Rentar un robot'],['/venta','Comprar un robot'],['/soporte','Soporte y refacciones']] : [['/renta','Rent a robot'],['/venta','Buy a robot'],['/soporte','Support & spare parts']];
  return <section className="home-next home-section"><div className="container-x">
    <div className="home-next-main"><div><h2>{es ? 'Hablemos de tu proyecto.' : 'Let’s talk about your project.'}</h2><p>{es ? 'Revisamos tu espacio y te ayudamos a elegir.' : 'We review your space and help you choose.'}</p></div><Link className="btn-primary" href={localPath('/reservar',locale)}>{es ? 'Reservar llamada' : 'Book a call'}<ArrowUpRight size={18}/></Link></div>
    <nav className="home-next-links" aria-label={es ? 'Compra, renta y soporte' : 'Purchase, rental and support'}>{links.map(([path,label]) => <Link key={path} href={localPath(path,locale)}>{label}<ArrowUpRight size={17}/></Link>)}</nav>
  </div></section>;
}
