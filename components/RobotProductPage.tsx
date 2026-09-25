import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check, Wrench } from 'lucide-react';
import { familyNames, puduAccessories, puduIndustries, type PuduProduct } from '@/lib/pudu';
import { localPath, type Locale } from '@/lib/locale';
import { robotExperiences } from '@/lib/robot-experience';
import consumables from '@/lib/robot-consumables.json';
import stories from '@/lib/pudu-stories.json';
import { site } from '@/lib/site';
import JsonLd from './JsonLd';
import PuduVideo from './PuduVideo';
import Robot3DShowcase from './Robot3DShowcase';
import { FactoryExplorer, RobotChapters, RobotModelImage } from './RobotExperience';

function normalized(name: string) { return name.toLowerCase().replace(/pudu|[^a-z0-9]/g, ''); }

export default function RobotProductPage({ robot: r, locale = 'es' }: { robot: PuduProduct; locale?: Locale }) {
  const es = locale === 'es';
  const experience = robotExperiences[r.slug];
  const industries = puduIndustries.filter(i => i.models.includes(r.slug));
  const cases = stories.cases.filter(c => c.models.includes(r.slug)).slice(0, 2);
  const parts = [
    ...puduAccessories.filter(p => p.models.some(m => normalized(m) === normalized(r.name))).map(p => ({ name: p.name, image: p.image })),
    ...consumables.filter(p => p.models.includes(r.slug)).map(p => ({ name: p.name, image: p.src })),
  ];
  const contact = localPath('/contacto?robot=' + encodeURIComponent(r.name) + '&interes=Cotizacion', locale);
  const support = localPath('/contacto?robot=' + encodeURIComponent(r.name) + '&interes=Soporte', locale);
  const metrics = r.slug === 'pudu-t300' ? [r.specs[0], r.specs[3], r.specs[4]] : r.specs.filter(s => s.value[locale].length <= 28 && /\d/.test(s.value[locale]) && !/dimensions|reference|weight|cleaning mode/i.test(s.label.en)).slice(0, 3);
  return <div className="robot-experience">
    <section className="robot-product-hero" id="modelo"><div className="container-x">
      <Link className="pudu-breadcrumb" href={localPath('/robots', locale)}>{es ? 'Todos los robots' : 'All robots'} <span>/</span> {r.name}</Link>
      <div className="robot-product-grid"><div className="robot-product-copy"><p className="eyebrow">BOTMATE × PUDU / {familyNames[r.category][locale]}</p><h1>{r.name}</h1><p className="robot-product-lead">{r.description[locale]}</p>
        <div className="robot-product-actions"><Link href={contact} className="btn-primary">{es ? 'Cotizar este robot' : 'Enquire about this robot'}<ArrowUpRight size={18}/></Link><a href="#funcionamiento" className="text-link">{es ? 'Explorar funciones' : 'Explore functions'}<ArrowDown size={17}/></a></div>
        <div className="robot-hero-facts">{metrics.map(s => <div key={s.label.en}><strong>{s.value[locale]}</strong><span>{s.label[locale]}</span></div>)}</div>
        <p className="robot-fine-print">{es ? 'Datos del fabricante. Configuración y disponibilidad en México por confirmar.' : 'Manufacturer data. Configuration and availability in Mexico require confirmation.'}</p>
      </div>{r.slug === 'pudu-d5-series' ? <Robot3DShowcase src={r.image} name={r.name} locale={locale}/> : <RobotModelImage src={r.image} name={r.name} locale={locale}/>}</div>
    </div></section>
    <nav className="robot-product-nav" aria-label={es ? 'Explorar este robot' : 'Explore this robot'}><div className="container-x"><span>{r.name}</span><div>{[['funcionamiento', es ? 'Funciones' : 'Functions'], ['aplicaciones', es ? 'Aplicaciones' : 'Applications'], ['ficha', es ? 'Ficha técnica' : 'Specifications'], ['refacciones', es ? 'Refacciones' : 'Parts']].map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}</div><Link href={localPath('/reservar', locale)}>{es ? 'Agendar' : 'Book'}<ArrowUpRight size={15}/></Link></div></nav>
    {experience?.chapters.length > 0 && <RobotChapters chapters={experience.chapters} locale={locale} name={r.name}/>}
    {experience?.process && <FactoryExplorer media={experience.process} locale={locale}/>}
    <section id="aplicaciones" className="robot-applications container-x"><div className="robot-section-heading"><div><p className="eyebrow">02 / {es ? 'DE LA TECNOLOGÍA A TU OPERACIÓN' : 'FROM TECHNOLOGY TO YOUR OPERATION'}</p><h2>{es ? 'Imagina dónde puede ayudar.' : 'See where it can help.'}</h2></div><p>{es ? 'Revisamos la tarea, el espacio y tu equipo para definir una aplicación viable.' : 'We assess the task, space and your team to define a viable application.'}</p></div>
      <div className="robot-application-grid">{industries.slice(0, 3).map(i => <Link key={i.slug} href={localPath('/sectores/' + i.slug, locale)} className="robot-application-card"><div><Image src={i.image} alt={i.title[locale]} fill sizes="(min-width: 900px) 30vw, 93vw"/></div><h3>{i.title[locale]}<ArrowUpRight size={20}/></h3></Link>)}</div>
      {industries.length > 3 && <details className="robot-details"><summary>{es ? 'Ver todas sus industrias' : 'View all its industries'} ({industries.length})</summary><div className="application-tags">{industries.slice(3).map(i => <Link key={i.slug} href={localPath('/sectores/' + i.slug, locale)} className="chip">{i.title[locale]}<ArrowUpRight size={14}/></Link>)}</div></details>}
      {industries.length === 0 && <div className="robot-scope"><h3>{es ? 'Definamos una aplicación para tu proyecto.' : 'Define an application for your project.'}</h3><p>{r.description[locale]} {es ? 'Botmate revisa la tarea y las condiciones de uso antes de proponer una implementación.' : 'Botmate reviews the task and operating conditions before proposing an implementation.'}</p><Link href={contact} className="text-link">{es ? 'Evaluar mi proyecto' : 'Assess my project'}<ArrowUpRight size={17}/></Link></div>}
      {r.category === 'ai' && <p className="robot-fine-print">{es ? 'Las demostraciones de IA física pueden mostrar funciones en desarrollo. El alcance comercial se confirma en la propuesta.' : 'Physical AI demonstrations may show capabilities in development. Commercial scope is confirmed in the proposal.'}</p>}
      {r.slug === 'pudu-sh1' && <p className="robot-fine-print">{es ? 'SH1 requiere operador: es una fregadora conducida por una persona.' : 'SH1 requires an operator: it is an operator-guided scrubber-dryer.'}</p>}
      {cases.length > 0 && <details className="robot-details"><summary>{es ? 'Ejemplos internacionales de Pudu' : 'International Pudu examples'}</summary><div className="robot-case-links">{cases.map(c => <Link key={c.slug} href={localPath('/casos-de-exito/' + c.slug, locale)}><Image src={c.image} alt={c.brand} width={180} height={100}/><span><strong>{c.brand}</strong>{c.title[locale]}</span><ArrowUpRight size={20}/></Link>)}</div><p className="robot-fine-print">{es ? 'Casos del fabricante. Pueden mostrar generaciones anteriores; no se presentan como instalaciones de Botmate.' : 'Manufacturer cases may show previous generations; they are not presented as Botmate installations.'}</p></details>}
    </section>
    <section id="ficha" className="robot-spec-section"><div className="container-x"><div className="robot-section-heading"><div><p className="eyebrow">03 / {es ? 'INGENIERÍA EN DETALLE' : 'ENGINEERING IN DETAIL'}</p><h2>{es ? 'Los detalles importan.' : 'The details matter.'}</h2></div><p>{es ? 'Medidas, capacidades y condiciones para tomar una buena decisión.' : 'Dimensions, capabilities and conditions for an informed decision.'}</p></div>
      <div className="robot-engineering"><div className="robot-engineering-image"><Image src={experience?.dimensions?.src || r.image} alt={r.name + (experience?.dimensions ? (es ? ' · Dimensiones oficiales' : ' · Official dimensions') : '')} fill sizes="(min-width: 900px) 45vw, 92vw"/></div><div><dl className="spec-list">{r.specs.map((s, i) => <div key={i}><dt>{s.label[locale]}</dt><dd>{s.value[locale]}</dd></div>)}</dl>{!r.specs.length && <p>{es ? 'Consulta la versión y su ficha técnica con Botmate.' : 'Ask Botmate about the version and specifications.'}</p>}<p className="robot-fine-print">{es ? 'El rendimiento depende de la carga, superficie, entorno y configuración. Las funciones de una familia pueden variar entre versiones.' : 'Performance depends on payload, surface, environment and configuration. Capabilities may differ between versions within a family.'}</p></div></div>
      <details className="robot-details"><summary>{es ? 'Todas las características' : 'All features'}</summary><ul className="robot-feature-list">{r.features[locale].map(f => <li key={f}><Check size={17}/>{f}</li>)}</ul></details>
      {'video' in r && r.video && <details className="robot-details"><summary>{es ? 'Ver presentación del fabricante' : 'Watch manufacturer presentation'}</summary><PuduVideo src={r.video} poster={r.poster || r.image} name={r.name} locale={locale}/></details>}
    </div></section>
    <section id="refacciones" className="robot-parts-section container-x"><div className="robot-section-heading"><div><p className="eyebrow">04 / {es ? 'CONTINUIDAD Y CUIDADO' : 'CONTINUITY & CARE'}</p><h2>{es ? 'Tu robot, acompañado.' : 'Support for your robot.'}</h2></div><p>{es ? 'Accesorios, consumibles y atención para cada etapa de uso.' : 'Accessories, consumables and support throughout its working life.'}</p></div>
      {parts.length > 0 && <div className="robot-parts-track" role="region" aria-label={es ? 'Accesorios compatibles' : 'Compatible accessories'} tabIndex={0}>{parts.map((p, i) => <article key={i}><div><Image src={p.image} alt={p.name[locale]} fill sizes="280px"/></div><h3>{p.name[locale]}</h3><Link className="text-link" href={localPath('/contacto?interes=Soporte&robot=' + encodeURIComponent(r.name + ' · ' + p.name[locale]), locale)}>{es ? 'Consultar pieza' : 'Enquire about part'}<ArrowUpRight size={16}/></Link></article>)}</div>}
      <div className="robot-support-panel"><Wrench size={28}/><div><h3>{es ? 'La pieza correcta empieza por tu modelo.' : 'The right part starts with your model.'}</h3><p>{es ? 'Envíanos el número de serie y una fotografía de la pieza. Confirmamos compatibilidad, existencias y precio antes de cotizar.' : 'Send the serial number and a photo of the part. We confirm compatibility, stock and pricing before quoting.'}</p></div><Link href={support} className="btn-primary">{es ? 'Solicitar refacción' : 'Request a part'}<ArrowUpRight size={18}/></Link></div>
      <Link className="text-link" href={localPath('/refacciones', locale)}>{es ? 'Explorar accesorios del catálogo' : 'Explore catalog accessories'}<ArrowUpRight size={17}/></Link>
    </section>
    <section className="robot-closing"><div className="container-x"><p className="eyebrow">{es ? 'EL SIGUIENTE PASO ES TUYO' : 'YOUR NEXT STEP'}</p><h2>{es ? 'Veamos cómo encaja' : 'Let’s see how'}<br/>{es ? 'en tu operación.' : 'it fits your operation.'}</h2><Link href={localPath('/reservar', locale)} className="btn-primary">{es ? 'Agendar con Botmate' : 'Book with Botmate'}<ArrowUpRight size={19}/></Link><span>{es ? '30 minutos · Google Meet' : '30 minutes · Google Meet'}</span></div></section>
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Product', name: r.name, model: r.name, description: r.description[locale], image: site.url + r.image, brand: { '@type': 'Brand', name: 'Pudu Robotics' }, url: site.url + localPath('/robots/' + r.slug, locale) }}/>
  </div>;
}
