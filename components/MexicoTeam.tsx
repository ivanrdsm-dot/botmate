import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {localPath,type Locale} from '@/lib/locale';
import {puduProducts} from '@/lib/pudu';

export function MexicoTeam({locale='es',detailed=false}:{locale?:Locale;detailed?:boolean}) {
  const es=locale==='es';
  return <section className="mexico-team section-space" aria-labelledby={detailed?'equipo-detalle':'equipo-mexico'}>
    <div className="container-x mexico-team-grid">
      <div>
        <p className="eyebrow">BOTMATE / {es?'TALENTO MEXICANO. VISIÓN INDUSTRIAL.':'MEXICAN TALENT. INDUSTRIAL VISION.'}</p>
        <h2 id={detailed?'equipo-detalle':'equipo-mexico'}>{es?'Un México moderno se construye en equipo.':'A modern Mexico is built together.'}</h2>
        <p>{es?'Impulsamos la modernización de plantas, fábricas y almacenes con robótica. Conectamos tecnología, personas y procesos para convertir las posibilidades de automatización en proyectos para la industria mexicana.':'We drive the modernization of plants, factories and warehouses through robotics. We bring technology, people and processes together to turn automation possibilities into projects for Mexican industry.'}</p>
        <Link className="text-link" href={localPath('/blog/modernizacion-industrial-mexico-equipo-botmate',locale)}>{es?'Conoce nuestra visión para México':'Our vision for Mexico'}<ArrowUpRight size={18}/></Link>
      </div>
      <div className="mexico-team-credit">
        <span className="tiny-label">{es?'COORDINACIÓN DEL EQUIPO':'TEAM COORDINATION'}</span>
        <h3>Ivan Cadavieco</h3>
        <p>{es?'Al frente de la coordinación de Botmate, conecta al equipo, la tecnología y los objetivos de cada proyecto. La transformación se construye junto con quienes conocen y operan cada planta.':'Coordinating Botmate, Ivan connects the team, technology and each project’s objectives. Transformation is built alongside the people who know and operate each plant.'}</p>
        <div className="mexico-team-principles"><span>{es?'Escuchar a la operación':'Listen to operations'}</span><span>{es?'Diseñar juntos':'Design together'}</span><span>{es?'Preparar al equipo':'Prepare the team'}</span></div>
      </div>
    </div>
    {detailed&&<div className="container-x mexico-team-steps">{(es?[
      ['01 / Diagnóstico compartido','El equipo de la planta aporta el conocimiento de sus recorridos, turnos, cargas y restricciones. Botmate ayuda a convertir ese contexto en un alcance de trabajo.'],
      ['02 / Integración coordinada','La selección del robot se conecta con el espacio, las tareas, los accesorios y las personas responsables. Cada función debe responder a una necesidad concreta.'],
      ['03 / Aprendizaje en equipo','La preparación de operadores y responsables de mantenimiento forma parte de la conversación. Se acuerdan pruebas, responsabilidades y criterios de aceptación para cada proyecto.']
    ]:[
      ['01 / Shared assessment','The plant team contributes its knowledge of routes, shifts, loads and constraints. Botmate helps translate that context into a working scope.'],
      ['02 / Coordinated integration','Robot selection connects the space, tasks, accessories and people responsible. Each function should address a concrete need.'],
      ['03 / Learning together','Operator and maintenance preparation is part of the conversation. Tests, responsibilities and acceptance criteria are agreed for each project.']
    ]).map(([title,text])=><article key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>}
  </section>;
}

export function ExpandedApplications({locale='es'}:{locale?:Locale}) {
  const es=locale==='es';
  const groups=[
    {slug:'industrial-warehouse-logistics',title:es?'Plantas, almacenes y grandes cargas.':'Plants, warehouses and heavy loads.',description:es?'Del abastecimiento entre estaciones al movimiento de tarimas. Explora la familia industrial completa con Botmate.':'From workstation supply to pallet handling. Explore the complete industrial family with Botmate.',models:['pudu-mp2000','pudu-t600','pudu-t600-underride','pudu-t300','pudu-t150']},
    {slug:'jardineria-y-exteriores',title:es?'Jardinería y grandes espacios verdes.':'Landscaping and large green spaces.',description:es?'La robótica también llega al césped. Conoce GT3, GT5 y GT7 y evalúa el equipo para tus exteriores.':'Robotics reaches turf care, too. Discover GT3, GT5 and GT7 and assess the equipment for your outdoor spaces.',models:['pudu-gt3','pudu-gt5','pudu-gt7']}
  ];
  return <section className="section-space botmate-expanded"><div className="container-x"><p className="eyebrow">{es?'MÁS ALLÁ DEL SERVICIO':'BEYOND SERVICE'}</p><h2>{es?'Robótica a la escala de tu operación.':'Robotics at the scale of your operation.'}</h2><div className="botmate-application-grid">{groups.map(g=><article key={g.slug}>
    <div className="botmate-application-image"><Image src={puduProducts.find(p=>p.slug===g.models[0])!.image} alt={puduProducts.find(p=>p.slug===g.models[0])!.name} fill sizes="(min-width:900px) 40vw,90vw"/></div>
    <h3>{g.title}</h3><p>{g.description}</p><div className="application-tags">{g.models.map(slug=>{const p=puduProducts.find(p=>p.slug===slug)!;return <Link className="chip" key={slug} href={localPath('/robots/'+slug,locale)}>{p.name}<ArrowUpRight size={14}/></Link>})}</div>
    <Link className="text-link" href={localPath('/sectores/'+g.slug,locale)}>{es?'Explorar aplicación':'Explore application'}<ArrowUpRight size={18}/></Link>
  </article>)}</div></div></section>;
}
