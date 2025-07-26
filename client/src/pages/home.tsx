import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import ProcessSection from "@/components/process-section";
import WinningEdgeSection from "@/components/winning-edge-section";
import HeroSectionsShowcase from "@/components/hero-sections-showcase";
import TestimonialsSection from "@/components/testimonials-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import { SectionOrderEditor } from "@/components/section-order-editor";
import { motion } from "framer-motion";

const SECTION_COMPONENTS = {
  HeroSection,
  ServicesSection,
  ProcessSection,
  WinningEdgeSection,
  HeroSectionsShowcase,
  TestimonialsSection,
  FAQSection
};

const DEFAULT_SECTIONS = [
  { id: "hero", name: "Hero Section", component: "HeroSection" },
  { id: "services", name: "Services", component: "ServicesSection" },
  { id: "process", name: "Process", component: "ProcessSection" },
  { id: "winning-edge", name: "Winning Edge", component: "WinningEdgeSection" },
  { id: "hero-showcase", name: "Hero Showcase", component: "HeroSectionsShowcase" },
  { id: "testimonials", name: "Testimonials", component: "TestimonialsSection" },
  { id: "faq", name: "FAQ", component: "FAQSection" }
];

export default function Home() {
  const [sectionOrder, setSectionOrder] = useState(DEFAULT_SECTIONS);

  useEffect(() => {
    // Load section order dari localStorage
    const savedOrder = localStorage.getItem('sectionOrder');
    if (savedOrder) {
      setSectionOrder(JSON.parse(savedOrder));
    }

    // Listen untuk perubahan section order
    const handleSectionOrderChange = (event: CustomEvent) => {
      setSectionOrder(event.detail.sections);
    };

    window.addEventListener('sectionOrderChanged', handleSectionOrderChange as EventListener);
    
    return () => {
      window.removeEventListener('sectionOrderChanged', handleSectionOrderChange as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-bone-white">
      <SectionOrderEditor />
      <Navbar />
      
      {/* Render sections sesuai urutan */}
      {sectionOrder.map((section) => {
        const SectionComponent = SECTION_COMPONENTS[section.component as keyof typeof SECTION_COMPONENTS];
        return SectionComponent ? <SectionComponent key={section.id} /> : null;
      })}
      
      {/* Final CTA Section */}
      <motion.section 
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-instrument-serif text-3xl sm:text-4xl lg:desktop-text-5xl mb-6 text-charcoal">
            Ready to Launch Your Dream Project?
          </h2>
          <p className="text-charcoal/70 text-lg lg:desktop-text-xl mb-8 max-w-2xl mx-auto">
            Let's work together to create something amazing that drives real results for your business.
          </p>
          <button className="bg-electric-blue text-white px-8 py-4 lg:desktop-p-16 rounded-md font-medium text-lg lg:desktop-text-xl hover:bg-electric-blue/90 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-3 mx-auto">
            <img src="/profile-foto.png" alt="Profile" className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover" />
            <span>Book a Call Today</span>
          </button>
        </div>
      </motion.section>
      
      <Footer />
    </div>
  );
}
