import { motion } from "framer-motion";
import { Check, Figma, Frame, Layers } from "lucide-react";
import ProjectCarousel from "./project-carousel";
import { useContent, useUpdateContentSection } from "@/hooks/use-content";

const b48f5cac_0dd9_4e94_b48a_682921628c0b = "/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg";

import LogoLoop from './LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFigma, SiFramer, SiSketch, SiExpress, SiJavascript, SiAdobexd, SiPython, SiDocker, SiWebflow } from 'react-icons/si';

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
              src="/Mavent-white.png"
              alt="Mavent Logo"
              className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
            />
            <span>
              {content.hero.ctaText}
            </span>
          </button>

          <div className="flex items-center justify-center space-x-2 custom-accepting text-gray-600 mb-4">
            <div className="w-2 h-2 lg:w-3 lg:h-3 bg-electric-blue rounded-full blue-glow"></div>
            <p className="text-black text-sm">
              {content.hero.acceptingText}
            </p>
          </div>
        </motion.div>

        {/* Project Showcase Carousel - Full Width */}
      </div>
      {/* Project Carousel Full Width - sampai ujung desktop */}
      <motion.div
        className="mb-16 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ProjectCarousel />
      </motion.div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tools Used Section with LogoLoop */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-gray-600 mb-6 text-[18px] font-normal">
            {content.hero.toolsText}
          </p>
          <div className="mt-8">
            <LogoLoop
              logos={[
                { node: <SiReact className="text-blue-500" />, title: "React", href: "https://react.dev" },
                { node: <SiNextdotjs className="text-black" />, title: "Next.js", href: "https://nextjs.org" },
                { node: <SiTypescript className="text-blue-600" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
                { node: <SiTailwindcss className="text-cyan-500" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
                { node: <SiFigma className="text-purple-500" />, title: "Figma", href: "https://figma.com" },
                { node: <SiFramer className="text-pink-500" />, title: "Framer", href: "https://framer.com" },
                { node: <SiSketch className="text-orange-500" />, title: "Sketch", href: "https://sketch.com" },
                { node: <SiExpress className="text-gray-700" />, title: "Express.js", href: "https://expressjs.com" },
                { node: <SiJavascript className="text-yellow-500" />, title: "JavaScript", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
                { node: <SiAdobexd className="text-purple-600" />, title: "Adobe XD", href: "https://adobe.com/products/xd" },
                { node: <SiPython className="text-blue-400" />, title: "Python", href: "https://python.org" },
                { node: <SiDocker className="text-blue-600" />, title: "Docker", href: "https://docker.com" },
                { node: <SiWebflow className="text-blue-500" />, title: "Webflow", href: "https://webflow.com" },
                ...content.hero.tools.map((tool, index) => {
                  const IconComponent =
                    iconMap[(tool as any).icon as keyof typeof iconMap];
                  const hasCustomLogo =
                    (tool as any).logoUrl && (tool as any).logoUrl.trim() !== "";

                  if (hasCustomLogo) {
                    return {
                      src: (tool as any).logoUrl,
                      alt: tool.name,
                      title: tool.name,
                    };
                  } else if (IconComponent) {
                    return {
                      node: <IconComponent className={`text-${tool.color}`} />,
                      title: tool.name,
                    };
                  } else {
                    return {
                      node: (
                        <div
                          className={`w-8 h-8 bg-${tool.color} rounded-md flex items-center justify-center text-white font-bold text-sm`}
                        >
                          {tool.name.charAt(0)}
                        </div>
                      ),
                      title: tool.name,
                    };
                  }
                })
              ]}
              speed={60}
              direction="left"
              logoHeight={48}
              gap={40}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Technology partners and tools"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}