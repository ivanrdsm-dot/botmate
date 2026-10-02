import { AboutPage } from '@/components/PuduPages';
import { localizedMetadata } from '@/lib/pudu-seo';
export const metadata = localizedMetadata('Botmate · Soluciones de robótica para empresas en México','Conoce Botmate: una marca mexicana de soluciones de robótica con visión multimarca. Asesoría, implementación y acompañamiento para tu empresa.','/nosotros');
export default function Page() { return <AboutPage locale="es"/>; }
