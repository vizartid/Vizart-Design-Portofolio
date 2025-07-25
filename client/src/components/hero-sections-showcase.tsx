import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import content from "@/data/content.json";

export default function HeroSectionsShowcase() {
  const { heroSectionsShowcase } = content;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use scroll-based animation with boundaries
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Transform scroll progress to horizontal movement with controlled boundaries
  const x = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], ["10%", "-20%", "-40%", "-20%"]);

  // Safety check for images array
  if (!heroSectionsShowcase?.images || heroSectionsShowcase.images.length === 0) {
    return null;
  }

  return (
    <section ref={containerRef} className="py-16 overflow-hidden relative">
      <motion.div 
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="font-instrument-serif text-3xl sm:text-4xl lg:text-5xl mb-4 text-charcoal">{heroSectionsShowcase.title}</h2>
        <p className="text-charcoal/70 text-lg max-w-3xl mx-auto">{heroSectionsShowcase.subtitle}</p>
      </motion.div>
      
      {/* Container with max width for boundaries */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl">
          <motion.div 
            className="flex space-x-6 py-8"
            style={{ x }}
          >
            {/* Use original images without duplication for bounded scroll */}
            {heroSectionsShowcase.images.map((image, index) => (
              <div
                key={`${image.alt}-${index}`}
                className="flex-none group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => window.open('#case-study', '_blank')}
              >
                <div className="relative w-[350px] h-[250px] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-3xl group-hover:scale-105">
                  <img 
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  
                  {/* Detailed hover overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className={`transition-all duration-500 ${
                        hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}>
                        <div className="mb-3">
                          <span className="px-3 py-1 bg-electric-blue text-white text-xs rounded-full font-medium">
                            {image.overlay}
                          </span>
                        </div>
                        <h3 className="text-white font-poppins font-semibold text-lg mb-2">
                          Hero Section Design
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed mb-3">
                          Conversion-optimized design with clear value proposition and compelling call-to-action.
                        </p>
                        <div className="flex items-center space-x-4 text-white/80 text-xs">
                          <span>• Mobile First</span>
                          <span>• A/B Tested</span>
                          <span>• High Converting</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtle shadow enhancement */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-80 h-8 bg-black/20 rounded-full blur-lg"></div>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Subtle gradient borders for visual boundaries */}
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white/20 to-transparent pointer-events-none z-10"></div>
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white/20 to-transparent pointer-events-none z-10"></div>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-8 flex justify-center">
          <motion.div 
            className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden"
          >
            <motion.div 
              className="h-full bg-electric-blue rounded-full"
              style={{ 
                scaleX: useTransform(scrollYProgress, [0, 1], [0, 1]),
                originX: 0
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}