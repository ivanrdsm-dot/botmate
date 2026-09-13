import {PuduIntro,PuduCaseCards,PuduCTA} from '@/components/PuduSections';
import {BotmateClients,BotmateCaseCards,BotmateArchive} from '@/components/BotmateCases';
import FieldGallery from '@/components/FieldGallery';
import {localizedMetadata} from '@/lib/pudu-seo';
export const metadata=localizedMetadata('Proyectos Botmate en México y casos de robótica Pudu','Conoce proyectos de Botmate con Walmart, Purina, Mabe y Meximold: alcance documentado, archivo de marca y casos internacionales de Pudu.','/casos-de-exito');
export default function Page(){return <><PuduIntro eyebrow="Casos y aplicaciones" title="Tecnología que conecta marcas y personas." description="Proyectos de Botmate en México, archivo de marca y referencias internacionales de Pudu Robotics. Cada ficha identifica su alcance y estado."/><BotmateClients/><BotmateCaseCards/><BotmateArchive/><PuduCaseCards/><FieldGallery/><PuduCTA/></>}
