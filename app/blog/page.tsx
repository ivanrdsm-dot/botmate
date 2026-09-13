import { BlogPage } from '@/components/PuduPages';
import { localizedMetadata } from '@/lib/pudu-seo';
export const metadata = localizedMetadata('Blog de robótica · Guías Pudu para empresas en México','Guías Botmate sobre robots autónomos, limpieza, logística e inteligencia artificial física, basadas en recursos oficiales de Pudu.','/blog');
export default function Page() { return <BlogPage locale="es"/>; }
