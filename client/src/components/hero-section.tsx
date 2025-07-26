import { motion } from "framer-motion";
import { Check } from "lucide-react";
import ProjectCarousel from "./project-carousel";
import { EditableText } from "./editable-text";
import { useContent, useUpdateContentSection } from "@/hooks/use-content";

import b48f5cac_0dd9_4e94_b48a_682921628c0b from "@assets/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg";

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
      <section className="min-h-screen flex flex-col justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 wave-bg">
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
    <section className="min-h-screen flex flex-col justify-center pt-32 pb-16 px-4 sm:px-6 lg:px-8 wave-bg">
      <div className="max-w-7xl mx-auto">
        {/* Hero Text */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-instrument custom-hero-title mb-6 font-light text-[80px]">
            <EditableText
              value={content.hero.title}
              onChange={(value) => handleUpdateHero("title", value)}
              className="inline"
            />{" "}
            <span className="text-electric-blue">
              <EditableText
                value={content.hero.titleHighlight}
                onChange={(value) => handleUpdateHero("titleHighlight", value)}
                className="inline"
              />
            </span>
            <br />
            <EditableText
              value={content.hero.subtitle}
              onChange={(value) => handleUpdateHero("subtitle", value)}
              className="inline"
            />
          </h1>
          <p className="custom-hero-stats text-gray-600 mb-8 max-w-2xl mx-auto">
            <EditableText
              value={content.hero.stats}
              onChange={(value) => handleUpdateHero("stats", value)}
            />
          </p>

          <button className="bg-charcoal text-white px-8 py-3 rounded-md font-medium custom-button hover:bg-gray-800 transition-colors duration-200 mb-4 flex items-center justify-center space-x-3 mx-auto">
            <img
              src={b48f5cac_0dd9_4e94_b48a_682921628c0b}
              alt="Profile"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
            />
            <span>
              <EditableText
                value={content.hero.ctaText}
                onChange={(value) => handleUpdateHero("ctaText", value)}
                className="inline"
              />
            </span>
          </button>

          <div className="flex items-center justify-center space-x-2 custom-accepting text-gray-600">
            <Check className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
            <span>
              <EditableText
                value={content.hero.acceptingText}
                onChange={(value) => handleUpdateHero("acceptingText", value)}
                className="inline"
              />
            </span>
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
          <p className="text-gray-600 mb-6">
            <EditableText
              value={content.hero.toolsText}
              onChange={(value) => handleUpdateHero("toolsText", value)}
            />
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {content.hero.tools.map((tool, index) => (
              <div key={index} className="flex items-center space-x-2 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                <div className={`w-8 h-8 bg-${tool.color} rounded-md flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">
                    {tool.name.charAt(0)}
                  </span>
                </div>
                <span className="font-medium">
                  <EditableText
                    value={tool.name}
                    onChange={(value) => {
                      const updatedTools = [...content.hero.tools];
                      updatedTools[index] = { ...tool, name: value };
                      handleUpdateHero("tools", updatedTools);
                    }}
                    className="inline"
                  />
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
