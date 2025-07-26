import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import ProcessSection from "@/components/process-section";
import WinningEdgeSection from "@/components/winning-edge-section";
import HeroSectionsShowcase from "@/components/hero-sections-showcase";
import TestimonialsSection from "@/components/testimonials-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";

import { motion } from "framer-motion";

import b48f5cac_0dd9_4e94_b48a_682921628c0b from "@assets/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg";

import backgound_wave from "@assets/backgound-wave.jpg";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <WinningEdgeSection />
      <HeroSectionsShowcase />
      <ServicesSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      {/* Final CTA Section */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-instrument text-3xl sm:text-4xl md:text-5xl lg:text-[70px] mb-4 leading-tight font-light">
            Ready to Launch Your Dream Project?
          </h2>
          <p className="text-charcoal/70 text-lg lg:desktop-text-xl mb-8 max-w-2xl mx-auto">
            Let's work together to create something amazing that drives real
            results for your business.
          </p>
          <button className="bg-black text-white px-8 py-4 lg:desktop-p-16 rounded-xl font-medium text-lg lg:desktop-text-xl hover:bg-gray-900 transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-3 mx-auto">
            <img
              src={backgound_wave}
              alt="Profile"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
            />
            <span>Book a Call Today</span>
          </button>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
}
