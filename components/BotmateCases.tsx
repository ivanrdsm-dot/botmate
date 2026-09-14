import AutoCarousel from './AutoCarousel';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { botmateBrands, botmateCases, type BotmateCase } from '@/lib/botmate-cases';
import { localPath, type Locale } from '@/lib/locale';
import { PuduIntro, PuduCTA } from './PuduSections';
import BreadcrumbSchema from './BreadcrumbSchema';

export function BotmateClients({locale='es'}:{locale?:Locale}) {
  const es=locale==='es';
  return <section className="botmate-clients"><div className="container-x">
    <div className="client-heading"><p className="eyebrow">BOTMATE / {es?'RELACIONES QUE NOS MUEVEN':'RELATIONSHIPS THAT MOVE US'}</p><Link className="text-link" href={localPath('/casos-de-exito',locale)+'#botmate'}>{es?'Conoce nuestros proyectos':'Explore our projects'}<ArrowUpRight size={16}/></Link></div>
    <div className="brand-marquee"><div className="brand-marquee-track"><ul className="botmate-brand-list" aria-label={es?'Marcas con relación confirmada por Botmate':'Brand relationships confirmed by Botmate'}>{botmateBrands.map(b=><li key={b}>{b}</li>)}</ul><ul className="botmate-brand-list brand-marquee-copy" aria-hidden="true">{botmateBrands.map(b=><li key={b}>{b}</li>)}</ul></div></div>
    <p className="fine-print">{es?'Relaciones comerciales confirmadas por el equipo de Botmate. Consulta el alcance y estado de los proyectos documentados.':'Commercial relationships confirmed by the Botmate team. Explore the scope and status of documented projects.'}</p>
  </div></section>;
}
export function BotmateCaseCards({locale='es',compact=false}:{locale?:Locale;compact?:boolean}) {
  const es=locale==='es';const entries=botmateCases;
  return <section id="botmate" className="section-space botmate-projects"><div className="container-x"><div className="section-heading-row"><div><p className="eyebrow">{es?'PROYECTOS PROPIOS / MÉXICO':'OUR PROJECTS / MEXICO'}</p><h2>{es?'Las marcas tienen historias.':'Brands have stories.'}<br/>{es?'Nosotros ayudamos a moverlas.':'We help set them in motion.'}</h2></div><p className="section-side-copy">{es?'Del contenido en pantalla al trabajo en campo. Explora el alcance de nuestros proyectos, propuestas y próximas participaciones.':'From on-screen content to work in the field. Explore the scope of our projects, proposals and upcoming events.'}</p></div>
    <AutoCarousel locale={locale} label={es?'Proyectos Botmate':'Botmate projects'}>{entries.map((c,i)=><Link className="botmate-project-card" href={localPath('/casos-de-exito/'+c.slug,locale)} key={c.slug}>
      <div className="project-brand-panel"><span className="tiny-label">BOTMATE ×</span><strong>{c.brand}</strong><span className="project-index">0{i+1}<ArrowUpRight size={28}/></span></div>
      <div className="project-card-body"><span className="project-status">{c.status[locale]}</span><h3>{c.title[locale]}</h3><p>{c.description[locale]}</p><span className="text-link">{es?'Ver el proyecto':'Explore the project'}<ArrowUpRight size={17}/></span></div>
    </Link>)}</AutoCarousel>
    {compact&&<Link className="text-link project-all" href={localPath('/casos-de-exito',locale)}>{es?'Proyectos Botmate y referencias internacionales':'Botmate projects and international references'}<ArrowUpRight size={18}/></Link>}
  </div></section>;
}
export function BotmateArchive({locale='es'}:{locale?:Locale}) {
  const es=locale==='es';return <section className="container-x section-space"><div className="section-heading-row"><div><p className="eyebrow">{es?'DEL ARCHIVO DE BOTMATE':'FROM THE BOTMATE ARCHIVE'}</p><h2>{es?'Identidades que se encuentran.':'Bringing identities together.'}</h2></div><p className="section-side-copy">{es?'Piezas gráficas originales conservadas por Botmate. Son materiales de marca, no fotografías de una activación.':'Original artwork held in Botmate’s archive. These are brand materials, not activation photographs.'}</p></div><div className="client-archive-grid">{[['loreal','L’Oréal'],['alpura','Alpura'],['walmart','Walmart'],['purina','Purina']].map(([slug,name])=><figure key={slug}><Image src={'/media/clientes/'+slug+'-archivo.webp'} alt={(es?'Pieza gráfica original de Botmate con ':'Original Botmate brand artwork featuring ')+name} width={720} height={1280} sizes="(min-width:800px) 23vw, 45vw"/><figcaption>{name} <span>{es?'Archivo gráfico':'Brand archive'}</span></figcaption></figure>)}</div></section>;
}
export function BotmateCaseDetail({entry:c,locale='es'}:{entry:BotmateCase;locale?:Locale}) {
  const es=locale==='es';return <><PuduIntro locale={locale} eyebrow={es?'Proyecto Botmate / México':'Botmate project / Mexico'} title={c.brand} description={c.title[locale]}/>
    <article className="container-x botmate-case-detail"><div className="case-narrative"><span className="project-status">{c.status[locale]}</span><h2>{es?'El proyecto':'The project'}</h2><p>{c.context[locale]}</p><h2>{es?'El alcance documentado':'Documented scope'}</h2><ul className="case-scope">{c.scope.map((s,i)=><li key={i}><span>0{i+1}</span>{s[locale]}</li>)}</ul><h2>{es?'Del proyecto a tu operación':'From this project to your operation'}</h2><p>{c.next[locale]}</p><div className="pudu-source-box"><strong>{es?'Qué respalda esta ficha':'What supports this project profile'}</strong><p>{c.evidence[locale]}</p><small>{es?'Revisión editorial: equipo Botmate · 13 de septiembre de 2026.':'Editorial review: Botmate team · September 13, 2026.'}</small></div><Link className="text-link" href={localPath('/casos-de-exito',locale)}>{es?'Ver todos los proyectos':'View all projects'}<ArrowUpRight size={18}/></Link></div>
    <aside className="case-aside">{c.image?<figure><Image src={c.image} alt={c.imageAlt![locale]} width={720} height={1280} sizes="(min-width:900px) 30vw, 90vw"/><figcaption>{es?'Pieza gráfica del archivo de Botmate. No es una fotografía del evento.':'Artwork from Botmate’s archive. This is not an event photograph.'}</figcaption></figure>:<div className="case-type-panel"><span className="eyebrow">BOTMATE ×</span><strong>{c.brand}</strong><p>{c.status[locale]}</p></div>}<div className="case-next"><h2>{es?'Diseñemos tu siguiente experiencia.':'Let’s design your next experience.'}</h2><p>{es?'Cuéntanos la sede, la fecha y la interacción que quieres crear.':'Tell us about the venue, date and interaction you want to create.'}</p><Link className="btn-primary" href={localPath('/reservar',locale)}>{es?'Conversar con Botmate':'Talk to Botmate'}<ArrowUpRight size={18}/></Link></div></aside></article>
    <PuduCTA locale={locale}/><BreadcrumbSchema items={[{name:es?'Inicio':'Home',url:localPath('/',locale)},{name:es?'Proyectos y casos':'Projects and cases',url:localPath('/casos-de-exito',locale)},{name:c.brand,url:localPath('/casos-de-exito/'+c.slug,locale)}]}/></>;
}
