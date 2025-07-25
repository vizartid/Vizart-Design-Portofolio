import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import WinningEdgeSection from "@/components/winning-edge-section";
import HeroSectionsShowcase from "@/components/hero-sections-showcase";
import TestimonialsSection from "@/components/testimonials-section";
import FAQSection from "@/components/faq-section";
import Footer from "@/components/footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-bone-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WinningEdgeSection />
      <HeroSectionsShowcase />
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
