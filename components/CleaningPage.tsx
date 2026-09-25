import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { puduProducts } from '@/lib/pudu';
import { localPath, type Locale } from '@/lib/locale';
import { breadcrumbLd, itemListLd, serviceLd } from '@/lib/seo';
import JsonLd from './JsonLd';
import PuduVideo from './PuduVideo';

const choices = [
  {slug:'pudu-cc1',es:'Cuatro tareas en un equipo.',en:'Four tasks in one machine.',esText:'Barrido, aspirado, trapeado y fregado para rutinas de limpieza de pisos. Evalúa el modo y los accesorios que requiere tu superficie.',enText:'Sweeping, vacuuming, mopping and scrubbing for routine floor cleaning. Assess the mode and accessories your floor requires.'},
  {slug:'pudu-cc1-pro',es:'Limpieza con detección de manchas.',en:'Cleaning with stain detection.',esText:'Agrega detección de manchas y ajuste de intensidad mediante IA. Una opción para evaluar cuando necesitas limpieza localizada y supervisión del resultado.',enText:'Adds AI stain detection and cleaning intensity control. An option to assess when you need spot cleaning and performance monitoring.'},
  {slug:'pudu-mt1',es:'Barrido para residuos sólidos.',en:'Sweeping for solid debris.',esText:'Barredora autónoma con reconocimiento de residuos mediante IA. Evalúa este modelo si tu prioridad es recoger polvo y residuos, en lugar de fregar con agua.',enText:'An autonomous sweeper with AI debris recognition. Assess this model when your priority is collecting dust and debris rather than wet scrubbing.'},
];
export default function CleaningPage({locale='es'}:{locale?:Locale}) {
  const es = locale === 'es';
  const path = localPath('/robots-de-limpieza',locale);
  const cc1 = puduProducts.find(p=>p.slug==='pudu-cc1')!;
  const faqs = es ? [
    ['¿Cuánto cuesta un robot de limpieza?','La cotización depende del modelo, la versión, los accesorios y el alcance de implementación. Comparte superficie, ciudad y turnos para recibir una propuesta de compra o renta.'],
    ['¿El CC1 sirve para una planta o almacén?','Puede evaluarse para rutinas de limpieza de pisos. Revisamos el tipo de suciedad, los pasillos, pendientes y el tránsito. Para polvo y residuos sólidos también conviene comparar una barredora como MT1.'],
    ['¿Qué necesita una demostración?','Comparte fotos del piso, metros cuadrados aproximados, anchos de paso, horarios y ubicación. Con esos datos confirmamos la viabilidad, disponibilidad y condiciones de la demostración.'],
    ['¿La estación de agua y los consumibles están incluidos?','Se especifican en la propuesta. Las estaciones y accesorios pueden venderse por separado; confirma compatibilidad, suministro de agua, drenaje, carga y consumibles antes de elegir.'],
  ] : [
    ['How much does a cleaning robot cost?','Quotes depend on the model, version, accessories and implementation scope. Share your floor area, city and shifts to request a purchase or rental proposal.'],
    ['Can CC1 work in a factory or warehouse?','It can be assessed for routine floor cleaning. We review debris, aisles, slopes and traffic. For dust and solid debris, compare a sweeper such as MT1 as well.'],
    ['What do you need for a demonstration?','Share floor photos, approximate area, passage widths, operating hours and location. We then confirm feasibility, availability and demonstration conditions.'],
    ['Are the water station and consumables included?','They are specified in the proposal. Stations and accessories may be sold separately; confirm compatibility, water supply, drainage, charging and consumables before choosing.'],
  ];
  return <>
    <section className="cleaning-hero container-x">
      <div><p className="eyebrow">BOTMATE × PUDU ROBOTICS</p><h1>{es?'Robots de limpieza en México.':'Cleaning robots in Mexico.'}</h1><p className="cleaning-lead">{es?'Una mejor rutina empieza por el piso.':'A better routine starts with the floor.'}</p><p>{es?'Compara soluciones para empresas, plantas y almacenes. Te ayudamos a elegir según tu superficie, suciedad y turnos.':'Compare solutions for businesses, factories and warehouses. We help you choose based on your floors, debris and shifts.'}</p><div className="hero-actions"><Link className="btn-primary" href={localPath('/contacto?interes=Cotizacion&robot=PUDU%20CC1',locale)}>{es?'Cotizar mi proyecto':'Request a quote'}<ArrowUpRight size={18}/></Link><a className="text-link" href="#comparar">{es?'Comparar modelos':'Compare models'}<ArrowUpRight size={18}/></a></div><p className="fine-print">{es?'Venta · Renta · Implementación · Refacciones':'Purchase · Rental · Implementation · Spare parts'}</p></div>
      <div className="cleaning-hero-image"><Image src={cc1.image} alt={es?'PUDU CC1, robot de limpieza comercial':'PUDU CC1 commercial cleaning robot'} fill priority sizes="(min-width:900px) 45vw, 90vw"/></div>
    </section>
    <section id="comparar" className="container-x cleaning-section"><div className="section-heading-row"><h2>{es?'La tarea define el robot.':'The task defines the robot.'}</h2><p className="section-side-copy">{es?'Tres puntos de partida. Abre cada ficha para ver funciones, videos y especificaciones.':'Three starting points. Open each product page for functions, videos and specifications.'}</p></div><div className="cleaning-choices">{choices.map(choice=>{const robot=puduProducts.find(p=>p.slug===choice.slug)!;return <article key={choice.slug}><Link href={localPath('/robots/'+robot.slug,locale)} className="cleaning-choice-image"><Image src={robot.image} alt={robot.name} fill sizes="(min-width:900px) 30vw, 90vw"/></Link><h3>{robot.name}</h3><strong>{es?choice.es:choice.en}</strong><p>{es?choice.esText:choice.enText}</p><Link className="text-link" href={localPath('/robots/'+robot.slug,locale)}>{es?'Ver funciones y ficha':'View functions and specifications'}<ArrowUpRight size={17}/></Link></article>})}</div><Link href={localPath('/robots?familia=cleaning',locale)} className="text-link">{es?'Explorar todos los equipos de limpieza':'Explore all cleaning equipment'}<ArrowUpRight size={17}/></Link></section>
    <section className="container-x cleaning-section cleaning-demo"><div><p className="eyebrow">PUDU CC1 / {es?'EN ACCIÓN':'IN ACTION'}</p><h2>{es?'Ve cómo trabaja.':'See how it works.'}</h2><p>{es?'Demostración oficial del fabricante. La visita a tu espacio permite evaluar recorridos, obstáculos y resultados en tus condiciones reales.':'Official manufacturer demonstration. A site visit helps assess routes, obstacles and results under your actual conditions.'}</p><Link className="text-link" href={localPath('/reservar',locale)}>{es?'Agendar una evaluación':'Book an assessment'}<ArrowUpRight size={17}/></Link></div>{cc1.video && <PuduVideo src={cc1.video} poster={cc1.poster || cc1.image} name={cc1.name} locale={locale}/>}</section>
    <section className="container-x cleaning-section"><div className="section-heading-row"><h2>{es?'Antes de elegir.':'Before you choose.'}</h2><Link className="text-link" href={localPath('/refacciones',locale)}>{es?'Refacciones y accesorios':'Spare parts and accessories'}<ArrowUpRight size={17}/></Link></div>{faqs.map(([question,answer])=><details className="robot-details" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</section>
    <section className="container-x cleaning-section cleaning-contact"><div><h2>{es?'Hablemos de tu espacio.':'Let’s talk about your space.'}</h2><p>{es?'Atendemos consultas de empresas en México. Comparte tu ubicación para confirmar logística, disponibilidad y alcance del servicio.':'We welcome business enquiries across Mexico. Share your location to confirm logistics, availability and service scope.'}</p></div><Link className="btn-primary" href={localPath('/reservar',locale)}>{es?'Reservar llamada':'Book a call'}<ArrowUpRight size={18}/></Link></section>
    <JsonLd data={breadcrumbLd([{name:'Botmate',url:localPath('/',locale)},{name:es?'Robots de limpieza':'Cleaning robots',url:path}])}/>
    <JsonLd data={itemListLd(choices.map(c=>({name:puduProducts.find(p=>p.slug===c.slug)!.name,url:localPath('/robots/'+c.slug,locale)})))}/>
    <JsonLd data={serviceLd(es?'Venta y renta de robots de limpieza':'Cleaning robot sales and rental',es?'Evaluación de robots de limpieza para empresas en México.':'Cleaning robot assessment for businesses in Mexico.',path)}/>
  </>;
}
