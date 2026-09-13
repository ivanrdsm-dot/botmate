import { PuduIndustries, PuduIntro,PuduCTA } from '@/components/PuduSections';
import { localizedMetadata } from '@/lib/pudu-seo';
export const metadata = localizedMetadata('Soluciones robóticas para 10 industrias en México','Robots para restaurantes, hoteles, retail, industria, salud, transporte, educación y espacios públicos. Explora aplicaciones Pudu con Botmate.','/sectores');
export default function Page() { return <><PuduIntro eyebrow="Soluciones por industria" title="Tu industria. Nuevas posibilidades." description="Explora aplicaciones en diez industrias, con imágenes oficiales de Pudu y modelos para evaluar con Botmate."/><PuduIndustries locale="es"/><PuduCTA/></>; }
