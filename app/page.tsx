import { PuduHome } from '@/components/PuduSections';
import { localizedMetadata } from '@/lib/pudu-seo';
export const metadata = localizedMetadata('Robots en México: venta, renta y soluciones | Botmate','Botmate: soluciones de robótica para empresas en México. Venta, renta e implementación de robots de limpieza, servicio y logística. Cotiza tu proyecto.','/');
export default function Page() { return <PuduHome locale="es"/>; }
