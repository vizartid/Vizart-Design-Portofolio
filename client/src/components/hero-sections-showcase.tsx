import { useState } from "react";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/use-content";

export default function HeroSectionsShowcase() {
  const { data: content, isLoading } = useContent();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Loading state
  if (isLoading || !content) {
    return (
      <section className="py-16 overflow-hidden">
        <div className="mb-12 text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-4 max-w-2xl mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded max-w-3xl mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  const { heroSectionsShowcase } = content;

  // Safety check for images array
  if (
    !heroSectionsShowcase?.images ||
    heroSectionsShowcase.images.length === 0
  ) {
    return null;
  }

  return (
    <section className="py-16 overflow-hidden">
      <motion.div
        className="mb-12 text-center px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="font-instrument text-3xl sm:text-4xl md:text-5xl lg:text-[70px] mb-4 leading-tight font-light whitespace-pre-line">
          {heroSectionsShowcase.title}
        </h2>
        <div className="text-charcoal/70 text-lg lg:desktop-text-xl max-w-3xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8">
            {heroSectionsShowcase.subtitle.split('\n').map((point, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-5 h-5 bg-electric-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-normal">{point.replace('• ', '')}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      {/* Showcase animation with boundaries - tidak sampai ujung desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="relative overflow-hidden rounded-2xl">
          <div 
            className={`flex space-x-6 ${isCarouselPaused ? 'hero-sections-carousel-paused' : 'hero-sections-carousel-safe'}`}
          >
            {/* Quintuple images untuk true seamless infinite scroll */}
            {[
              ...heroSectionsShowcase.images,
              ...heroSectionsShowcase.images,
              ...heroSectionsShowcase.images,
              ...heroSectionsShowcase.images,
              ...heroSectionsShowcase.images,
            ].map((image, index) => (
              <div
                key={`${image.alt}-${index}`}
                className="flex-none group cursor-pointer"
                onMouseEnter={() => {
                  setHoveredIndex(index);
                  setIsCarouselPaused(true);
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setIsCarouselPaused(false);
                }}
                onClick={() => window.open("#case-study", "_blank")}
              >
                <div className="relative w-[350px] h-[250px] lg:desktop-w-400 lg:desktop-h-280 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-3xl group-hover:scale-105">
                  <img
                    src={hoveredIndex === index && image.hoverUrl ? image.hoverUrl : image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />

                  {/* Detailed hover overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 ${
                      hoveredIndex === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div
                        className={`transition-all duration-500 ${
                          hoveredIndex === index
                            ? "translate-y-0 opacity-100"
                            : "translate-y-4 opacity-0"
                        }`}
                      >
                        <div className="mb-3">
                          <span className="px-3 py-1 bg-electric-blue text-white text-xs rounded-md font-medium">
                            {image.overlay}
                          </span>
                        </div>
                        <h3 className="text-white font-poppins font-semibold text-lg lg:desktop-text-xl mb-2">
                          Hero Section Design
                        </h3>
                        <p className="text-white/90 text-sm lg:desktop-text-base leading-relaxed mb-3">
                          Conversion-optimized design with clear value
                          proposition and compelling call-to-action.
                        </p>
                        <div className="flex items-center space-x-4 text-white/80 text-xs lg:desktop-text-base">
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
          </div>

          {/* Gradient borders untuk visual boundaries - dihapus agar full width */}
        </div>
      </div>
    </section>
  );
}