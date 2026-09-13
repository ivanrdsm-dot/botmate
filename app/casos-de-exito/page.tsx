import {PuduIntro,PuduCaseCards,PuduCTA} from '@/components/PuduSections';
import FieldGallery from '@/components/FieldGallery';
import {localizedMetadata} from '@/lib/pudu-seo';
export const metadata=localizedMetadata('Casos internacionales de Pudu y galería Botmate','Conoce casos Pudu en restaurantes, hoteles, retail, manufactura y museos, y explora el archivo de activaciones de Botmate.','/casos-de-exito');
export default function Page(){return <><PuduIntro eyebrow="Casos y aplicaciones" title="Robots. Personas. Operaciones reales." description="Explora casos publicados por Pudu Robotics alrededor del mundo y el archivo de campo de Botmate en su sección independiente."/><PuduCaseCards/><FieldGallery/><PuduCTA/></>}
