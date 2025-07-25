import { motion } from "framer-motion";
import { Check } from "lucide-react";
import ProjectCarousel from "./project-carousel";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 wave-bg">
      <div className="max-w-7xl mx-auto">
        {/* Hero Text */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-instrument text-4xl sm:text-5xl lg:desktop-text-6xl xl:desktop-text-7xl leading-tight mb-6">
            We Deliver <span className="text-electric-blue">Standout Websites</span><br />
            with Effortless Collaboration
          </h1>
          <p className="text-lg sm:text-xl lg:desktop-text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            70+ Amazing Websites Created So Far
          </p>
          
          <button className="bg-charcoal text-white px-8 py-3 lg:desktop-p-12 rounded-full font-medium text-lg lg:desktop-text-xl hover:bg-gray-800 transition-colors duration-200 mb-4">
            Book a Call
          </button>
          
          <div className="flex items-center justify-center space-x-2 text-sm lg:desktop-text-base text-gray-600">
            <Check className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
            <span>Accepting new projects</span>
          </div>
        </motion.div>

        {/* Project Showcase Carousel */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProjectCarousel />
        </motion.div>

        {/* Tools Used Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-6">We use industry standard tools like</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <div className="w-8 h-8 bg-purple-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="font-medium">Figma</span>
            </div>
            <div className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">&lt;/&gt;</span>
              </div>
              <span className="font-medium">Framer</span>
            </div>
            <div className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">W</span>
              </div>
              <span className="font-medium">Webflow</span>
            </div>
            <div className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
              <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-medium">NextJS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
