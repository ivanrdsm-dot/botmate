import { ResourcesPage } from '@/components/PuduPages';
import { localizedMetadata } from '@/lib/pudu-seo';
export const metadata = localizedMetadata('Catálogos, fichas y documentación Pudu Robotics','Biblioteca oficial de Pudu: catálogos, fichas de robots, documentos técnicos y plataformas de integración.','/recursos');
export default function Page() { return <ResourcesPage locale="es"/>; }
