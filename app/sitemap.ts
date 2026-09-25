import type { MetadataRoute } from 'next';
import { puduProducts, puduIndustries, puduAliases } from '@/lib/pudu';
import { robotExperiences } from '@/lib/robot-experience';
import { botmateCases } from '@/lib/botmate-cases';
import stories from '@/lib/pudu-stories.json';
import { robots } from '@/lib/robots';
import { posts } from '@/lib/posts';
import { site } from '@/lib/site';
import { routePairs, localPath } from '@/lib/locale';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...Object.keys(routePairs).filter(p => p !== '/privacidad'),
    ...puduProducts.map(p => '/robots/' + p.slug), ...puduIndustries.map(p => '/sectores/' + p.slug),
    ...botmateCases.map(p => '/casos-de-exito/' + p.slug), ...stories.cases.map(p => '/casos-de-exito/' + p.slug),
    ...stories.posts.map(p => '/blog/' + p.slug), ...robots.filter(r => !puduAliases[r.slug]).map(r => '/robots/' + r.slug),
    ...posts.map(p => '/blog/' + p.slug)];
  return [...new Set(paths)].flatMap(path => {
    const product = puduProducts.find(p => path === '/robots/' + p.slug);
    const industry = puduIndustries.find(p => path === '/sectores/' + p.slug);
    const ownCase = botmateCases.find(c => path === '/casos-de-exito/' + c.slug);
    const reference = stories.cases.find(c => path === '/casos-de-exito/' + c.slug);
    const experience = product && robotExperiences[product.slug];
    const images = [...new Set([
      product?.image, product?.banner, industry?.image, ownCase?.image, reference?.image,
      ...(experience?.chapters.map(c => c.kind === 'video' ? c.poster : c.src) ?? []),
      experience?.dimensions?.src,
      ...(path === '/robots-de-limpieza' ? puduProducts.filter(p => ['pudu-cc1','pudu-cc1-pro','pudu-mt1'].includes(p.slug)).map(p => p.image) : []),
    ].filter((src): src is string => Boolean(src)))].map(src => new URL(src, site.url).href);
    const languages = { 'es-MX': site.url + path, en: site.url + localPath(path, 'en'), 'x-default': site.url + path };
    // Content edit dates, not crawler requests or build times.
    const lastModified = product || path === '/' || path === '/robots-de-limpieza' ? '2026-09-24'
      : path === '/casos-de-exito' || ownCase ? '2026-09-17' : '2026-09-13';
    return (['es', 'en'] as const).map(locale => ({
      url: site.url + localPath(path, locale), lastModified, images, alternates: { languages },
    }));
  });
}
