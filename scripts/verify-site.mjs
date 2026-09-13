/** Public-site smoke test; the bilingual suite supersedes the original catalog checks. */
process.argv[2] ||= 'http://127.0.0.1:3006';
await import('./verify-pudu.mjs');
