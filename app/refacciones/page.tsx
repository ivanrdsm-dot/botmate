import { PartsPage } from '@/components/PuduPages';
import { localizedMetadata } from '@/lib/pudu-seo';
export const metadata = localizedMetadata('Refacciones y accesorios Pudu en México','Consulta accesorios Pudu por modelo, estaciones, bandejas y módulos de integración. Botmate revisa compatibilidad, disponibilidad y soporte.','/refacciones');
export default function Page() { return <PartsPage locale="es"/>; }
