export type Testimonial = {
  text: string;
  author: string;
  role: string;
  company: string;
  rating: number;
};

// Populate only after source, attribution and client consent have been verified.
export const testimonials: Testimonial[] = [];
export const clients: string[] = [];
