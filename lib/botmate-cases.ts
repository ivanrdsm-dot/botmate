import type { Localized } from './locale';
export const botmateBrands = ['L’Oréal', 'Alpura', 'Walmart', 'Sam’s', 'MPI', 'Mabe', 'Purina'];
export type BotmateCase = {
  slug: string; brand: string; status: Localized; title: Localized;
  description: Localized; context: Localized; scope: Localized[];
  evidence: Localized; next: Localized; image?: string; imageAlt?: Localized;
};
// Public summaries only. Original commercial files remain private; proposals are not delivery reports.
export const botmateCases: BotmateCase[] = [
  {
    slug: 'botmate-walmart-papalote', brand: 'Walmart',
    status: {es:'Alcance documentado',en:'Documented scope'},
    title: {es:'Un punto de contacto móvil para la marca.',en:'A mobile touchpoint for the brand.'},
    description: {es:'Robot con pantalla y personalización de marca para una activación vinculada al Museo Papalote.',en:'A screen robot with brand customization for an activation associated with the Papalote Museum.'},
    context: {es:'El archivo comercial de Botmate identifica a Walmart y el Museo Papalote en una propuesta de renta. El proyecto ilustra cómo una pantalla móvil puede formar parte de una experiencia de marca.',en:'Botmate’s commercial archive identifies Walmart and the Papalote Museum in a rental proposal. The project illustrates how a mobile screen can become part of a brand experience.'},
    scope: [{es:'Un robot con pantalla, según el presupuesto.',en:'One screen robot, as specified in the estimate.'},{es:'Renta y personalización gráfica contempladas en el alcance.',en:'Rental and graphic customization included in the proposed scope.'},{es:'Contenido y operación a coordinar con el equipo de la activación.',en:'Content and operation to coordinate with the activation team.'}],
    evidence: {es:'Relación con la marca confirmada por Botmate; presupuesto comercial y pieza gráfica conservados en el archivo. El presupuesto describe el alcance, no acredita resultados de la activación.',en:'Brand relationship confirmed by Botmate; a commercial estimate and brand artwork are held in the archive. The estimate describes scope, rather than verified activation results.'},
    next: {es:'Para una activación similar, revisamos el contenido de pantalla, el recorrido, el flujo de visitantes y la supervisión.',en:'For a similar activation, we review screen content, routes, visitor flow and supervision.'},
    image:'/media/clientes/walmart-archivo.webp', imageAlt:{es:'Pieza gráfica original de Botmate con la marca Walmart',en:'Original Botmate brand artwork featuring Walmart'},
  },
  {
    slug:'botmate-purina', brand:'Purina',status:{es:'Alcance documentado',en:'Documented scope'},
    title:{es:'Comunicación y movimiento en una misma propuesta.',en:'Communication and movement in one proposal.'},
    description:{es:'El proyecto documenta una combinación de robot con pantalla y robot de carga, con personalización para la marca.',en:'The project documents a combination of a screen robot and a cargo robot, with brand customization.'},
    context:{es:'El presupuesto de Purina conservado por Botmate contempla dos funciones complementarias: comunicar mediante una pantalla y apoyar el traslado de materiales. El archivo está identificado con octubre de 2024.',en:'The Purina estimate held by Botmate covers two complementary functions: communicating through a screen and assisting with material transport. The archive is identified with October 2024.'},
    scope:[{es:'Un robot con pantalla y un robot de carga.',en:'One screen robot and one cargo robot.'},{es:'Renta y branding contemplados en el presupuesto.',en:'Rental and branding included in the estimate.'},{es:'La ficha comercial no especifica el modelo exacto de cada equipo.',en:'The commercial document does not specify the exact model of each unit.'}],
    evidence:{es:'Relación con la marca confirmada por Botmate, respaldada por presupuesto y pieza gráfica del archivo. No se publican cifras de audiencia, ventas o ahorro porque estos documentos no las acreditan.',en:'Brand relationship confirmed by Botmate, supported by an estimate and archived brand artwork. Audience, sales and savings figures are not published because these documents do not establish them.'},
    next:{es:'El diseño de una experiencia similar comienza por separar la tarea de comunicación de la carga y los recorridos.',en:'Designing a similar experience starts by separating the communication task from payload and routing requirements.'},
    image:'/media/clientes/purina-archivo.webp',imageAlt:{es:'Pieza gráfica original de Botmate con la marca Purina',en:'Original Botmate brand artwork featuring Purina'},
  },
  {
    slug:'botmate-mabe',brand:'Mabe',status:{es:'Propuesta documentada',en:'Documented proposal'},
    title:{es:'La demostración de producto se vuelve móvil.',en:'Taking product demonstrations on the move.'},
    description:{es:'Propuesta para la división de purificadores de Mabe: dos robots promotores con pantalla 4K para un fin de semana.',en:'Proposal for Mabe’s water purifier division: two promotional robots with 4K screens for a weekend.'},
    context:{es:'La cotización de julio de 2026 plantea acercar el contenido de producto al visitante mediante robots con pantalla y gráficos de Mabe. Se presenta como propuesta comercial; el archivo consultado no acredita su ejecución.',en:'The July 2026 quotation proposes bringing product content to visitors through screen robots and Mabe graphics. This is a commercial proposal; the reviewed archive does not establish execution.'},
    scope:[{es:'Dos robots promotores con pantalla 4K.',en:'Two promotional robots with 4K screens.'},{es:'Renta de viernes a domingo, según la propuesta.',en:'Friday-to-Sunday rental, according to the proposal.'},{es:'Branding, contenido y recorrido adaptados a la sede.',en:'Branding, content and routes adapted to the venue.'}],
    evidence:{es:'Cotización comercial de Botmate para Mabe, división de purificadores. Fechas de ejecución, modelo definitivo y resultados no constan en la documentación revisada.',en:'Botmate commercial quotation for Mabe’s water purifier division. Execution dates, final robot model and outcomes are not established in the reviewed documentation.'},
    next:{es:'Una demostración útil necesita contenido claro, un recorrido adecuado y un equipo que conecte la interacción con la atención comercial.',en:'A useful demonstration needs clear content, an appropriate route and a team that connects the interaction with sales assistance.'},
  },
  {
    slug:'botmate-meximold-2026',brand:'Meximold 2026',status:{es:'Programado · octubre 2026',en:'Scheduled · October 2026'},
    title:{es:'Robótica en el encuentro de la industria del molde.',en:'Robotics at the mold manufacturing industry gathering.'},
    description:{es:'Proyecto con Gardner Business Media para Meximold 2026, previsto para el 14 y 15 de octubre en Querétaro.',en:'A project with Gardner Business Media for Meximold 2026, scheduled for October 14–15 in Querétaro.'},
    context:{es:'El acuerdo conservado por Botmate contempla dos PuduBot 2 configurados con pantalla publicitaria 4K para Meximold 2026 en el Centro de Congresos de Querétaro. Al 13 de septiembre de 2026, el evento todavía no ha ocurrido.',en:'The agreement held by Botmate covers two PuduBot 2 units configured with 4K advertising screens for Meximold 2026 at the Querétaro Convention Center. As of September 13, 2026, the event has not yet taken place.'},
    scope:[{es:'Dos PuduBot 2 en configuración publicitaria con pantalla 4K.',en:'Two PuduBot 2 units in an advertising configuration with 4K screens.'},{es:'Transporte, configuración y supervisión técnica contemplados.',en:'Transport, configuration and technical supervision included in the scope.'},{es:'Operación prevista el 14 y 15 de octubre de 2026.',en:'Operation scheduled for October 14–15, 2026.'}],
    evidence:{es:'Acuerdo comercial Botmate–Gardner para Meximold 2026. Este proyecto se presenta como programado; no se atribuyen instalaciones industriales, resultados ni testimonios al evento.',en:'Botmate–Gardner commercial agreement for Meximold 2026. This project is presented as scheduled; no industrial installations, results or testimonials are attributed to the event.'},
    next:{es:'Una exposición industrial permite conversar sobre aplicaciones reales. Cada futura implementación en planta requiere su propio diagnóstico y validación.',en:'An industrial exhibition creates opportunities to discuss practical applications. Every future plant implementation requires its own assessment and validation.'},
  },
];
