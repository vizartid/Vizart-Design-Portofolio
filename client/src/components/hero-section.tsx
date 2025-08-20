import { motion } from "framer-motion";
import { Check, Figma, Frame, Layers } from "lucide-react";
import ProjectCarousel from "./project-carousel";
import { useContent, useUpdateContentSection } from "@/hooks/use-content";

const b48f5cac_0dd9_4e94_b48a_682921628c0b = "/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg";

const iconMap = {
  Figma,
  Frame,
  Layers,
};

export default function HeroSection() {
  const { data: content, isLoading } = useContent();
  const updateSection = useUpdateContentSection();

  const handleUpdateHero = (field: string, value: any) => {
    if (!content) return;

    const updatedHero = {
      ...content.hero,
      [field]: value,
    };

    updateSection.mutate({
      section: "hero",
      data: updatedHero,
    });
  };

  if (isLoading || !content) {
    return (
      <section className="min-h-screen flex flex-col justify-center pt-40 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded mb-6"></div>
            <div className="h-8 bg-gray-200 rounded mb-8 max-w-2xl mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex flex-col justify-center pt-40 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Text */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-instrument custom-hero-title mb-6 font-light text-[80px]">
            {content.hero.title.replace("Comprehensive Digital Solutions", "Comprehensive Digital\nSolutions")}{" "}
            <span className="text-electric-blue">
              {content.hero.titleHighlight}
            </span>
            <br />
            {content.hero.subtitle}
          </h1>
          <p className="custom-hero-stats text-gray-600 mb-8 max-w-2xl mx-auto text-[18px] font-medium">
            {content.hero.stats}
          </p>

          <button className="bg-black text-white px-8 py-3 rounded-xl font-medium custom-button hover:bg-gray-900 transition-colors duration-200 mb-4 flex items-center justify-center space-x-3 mx-auto">
            <img
              src={b48f5cac_0dd9_4e94_b48a_682921628c0b}
              alt="Profile"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
            />
            <span>
              {content.hero.ctaText}
            </span>
          </button>

          <div className="flex items-center justify-center space-x-2 custom-accepting text-gray-600">
            <Check className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
            <p className="text-green-400 text-sm mb-4">
              {content.hero.acceptingText}
            </p>
          </div>
        </motion.div>

        {/* Project Showcase Carousel - Full Width */}
      </div>
      {/* Project Carousel Full Width - sampai ujung desktop */}
      <motion.div
        className="mb-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ProjectCarousel />
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tools Used Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-6 text-[18px] font-normal">
            {content.hero.toolsText}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {content.hero.tools.map((tool, index) => {
              const IconComponent =
                iconMap[(tool as any).icon as keyof typeof iconMap];
              const hasCustomLogo =
                (tool as any).logoUrl && (tool as any).logoUrl.trim() !== "";

              return (
                <div
                  key={index}
                  className="flex items-center space-x-3 transition-all duration-300 cursor-pointer hover:scale-105"
                >
                  <div className="flex items-center justify-center">
                    {hasCustomLogo ? (
                      <img
                        src={(tool as any).logoUrl}
                        alt={tool.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : IconComponent ? (
                      <IconComponent className={`w-8 h-8 text-${tool.color}`} />
                    ) : (
                      <div
                        className={`w-8 h-8 bg-${tool.color} rounded-md flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {tool.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="font-medium text-gray-700">
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}