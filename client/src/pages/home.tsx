import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import ProcessSection from "@/components/process-section";
import WinningEdgeSection from "@/components/winning-edge-section";
import HeroSectionsShowcase from "@/components/hero-sections-showcase";
import TestimonialsSection from "@/components/testimonials-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";

import { motion } from "framer-motion";

const b48f5cac_0dd9_4e94_b48a_682921628c0b = "/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg";

const backgound_wave = "/backgound-wave.jpg";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HeroSectionsShowcase />
      <WinningEdgeSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}