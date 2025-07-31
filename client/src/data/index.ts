// Import all content sections
import { branding } from './branding';
import { hero } from './hero';
import { services } from './services';
import { winningEdge } from './winning-edge';
import { heroSectionsShowcase } from './hero-sections-showcase';
import { testimonialsContent } from './testimonials-content';
import { faq } from './faq';
import { finalCta } from './final-cta';
import { works } from './works';
import { worksProjects } from './works-projects';
import { footerContent } from './footer';

// Export combined content object
export const content = {
  branding,
  hero,
  services,
  winningEdge,
  heroSectionsShowcase,
  testimonials: testimonialsContent,
  faq,
  finalCta,
  works,
  projects: worksProjects,
  footer: footerContent
};

// Export individual sections for easier editing
export {
  branding,
  hero,
  services,
  winningEdge,
  heroSectionsShowcase,
  testimonialsContent,
  faq,
  finalCta,
  works,
  worksProjects,
  footerContent
};