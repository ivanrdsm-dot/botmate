export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  city: string;
  title: string;
  summary: string;
  hero: string;
  robots: string[];
  challenge: string;
  solution: string;
  results: { label: string; value: string; sub?: string }[];
  quote: { text: string; author: string; role: string };
  timeline: string;
  scope: string;
};

// No case has supporting evidence and publication consent in this repository.
// Previous unverified content remains recoverable through git history.
export const cases: CaseStudy[] = [];
