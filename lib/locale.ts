export type Locale = 'es' | 'en';
export type Localized = { es: string; en: string };
export const routePairs: Record<string, string> = {
  '/': '/en', '/robots':'/en/robots', '/sectores':'/en/industries',
  '/casos-de-exito':'/en/case-studies', '/refacciones':'/en/spare-parts',
  '/blog':'/en/blog', '/nosotros':'/en/about', '/reservar':'/en/book',
  '/contacto':'/en/contact', '/servicios':'/en/services', '/renta':'/en/rental',
  '/venta':'/en/purchase', '/privacidad':'/en/privacy', '/recursos':'/en/resources',
};
export function localPath(path: string, locale: Locale): string {
  if (locale === 'es') return path;
  const [base, query] = path.split('?');
  const key = Object.keys(routePairs).filter(k => k !== '/').find(k => base === k || base.startsWith(k + '/'));
  const translated = base === '/' ? '/en' : key ? routePairs[key] + base.slice(key.length) : '/en';
  return translated + (query ? '?' + query : '');
}
export function spanishPath(path: string): string {
  if (path === '/en' || path === '/en/') return '/';
  const key = Object.keys(routePairs).filter(k => k !== '/').find(k => path === routePairs[k] || path.startsWith(routePairs[k] + '/'));
  return key ? key + path.slice(routePairs[key].length) : path;
}
export const isEnglish = (path: string) => path === '/en' || path.startsWith('/en/');
