import { motion } from "framer-motion";
import { Palette, Code, Circle } from "lucide-react";

export default function ServicesSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-instrument text-3xl sm:text-4xl lg:desktop-text-5xl mb-4">
            Specialized in Crafting Brand<br />
            Defining Hero Sections
          </h2>
          

          </div>

          {/* Hero Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div 
              className="group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Automated candidate screening interface"
                className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg"
              />
            </motion.div>
            
            <motion.div 
              className="group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Design interface focused on business growth"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </motion.div>
            
            <motion.div 
              className="group cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Team hiring and collaboration interface"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="font-instrument text-3xl sm:text-4xl lg:desktop-text-5xl mb-4">Our Services</h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-white rounded-2xl p-8 lg:desktop-p-12 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <Palette className="w-8 h-8 lg:w-10 lg:h-10 text-electric-blue mb-4" />
              <h3 className="font-poppins font-semibold text-xl lg:desktop-text-2xl mb-3">Logo & Branding</h3>
              <p className="text-gray-600 lg:desktop-text-lg leading-relaxed">
                A strong, scalable brand identity including logo, colors, typography, and visual tone, delivered in 2-3 weeks.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 lg:desktop-p-12 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <Code className="w-8 h-8 lg:w-10 lg:h-10 text-electric-blue mb-4" />
              <h3 className="font-poppins font-semibold custom-project-title mb-3">Websites</h3>
              <p className="text-gray-600 custom-project-desc leading-relaxed">
                A complete website from strategy to design and development, crafted to drive results and delivered in 3 to 4 weeks.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 custom-about-text mb-8">We also offer other design services like pitch decks, social media creatives, and more.</p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            <div className="flex items-center space-x-2">
              <Circle className="w-2 h-2 text-electric-blue fill-current" />
              <span className="custom-accepting">Smooth Communication</span>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="w-2 h-2 text-electric-blue fill-current" />
              <span className="custom-accepting">Flexible revisions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Circle className="w-2 h-2 text-electric-blue fill-current" />
              <span className="custom-accepting">Post-Project Support</span>
            </div>
          </div>
          
          <button className="bg-charcoal text-white px-8 py-3 rounded-md font-medium custom-button hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-3">
            <img src="/profile-foto.png" alt="Profile" className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover" />
            <span>Book a Call</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
