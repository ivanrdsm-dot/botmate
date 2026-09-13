import catalog from './pudu-catalog.json';
import type { Locale } from './locale';
export const puduProducts = catalog.products;
export const puduIndustries = catalog.industries;
export const puduAccessories = catalog.accessories;
export const puduDownloads = catalog.downloads;
export const puduLogos = catalog.logos;
export const puduFamilies = catalog.families;
export const puduAliases: Record<string, string> = catalog.aliases;
export type PuduProduct = typeof puduProducts[number];
export type PuduIndustry = typeof puduIndustries[number];
export const familyNames: Record<string, Record<Locale,string>> = {
  cleaning:{es:'Limpieza comercial',en:'Commercial cleaning'},
  delivery:{es:'Entrega y hospitalidad',en:'Delivery & hospitality'},
  industrial:{es:'Logística industrial',en:'Industrial logistics'},
  ai:{es:'Robótica e IA física',en:'Robotics & physical AI'},
  outdoor:{es:'Cuidado de exteriores',en:'Grounds & turf care'},
};
export const puduSource = 'https://www.pudurobotics.com/en';
