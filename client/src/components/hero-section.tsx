import { motion } from "framer-motion";
import { Check, Figma, Frame, Layers } from "lucide-react";
import ProjectCarousel from "./project-carousel";
import { useContent, useUpdateContentSection } from "@/hooks/use-content";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { hero } from "@/data/hero";

const b48f5cac_0dd9_4e94_b48a_682921628c0b = "/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg";
const bgWave = "/backgound-wave.jpg";

interface Tool {
  name: string;
  color: string;
  logoUrl: string;
}

interface HeroData {
  title: string;
  titleHighlight: string;
  subtitle: string;
  stats: string;
  ctaText: string;
  acceptingText: string;
  toolsText: string;
  tools: Tool[];
}

const DEFAULT_HERO_DATA: HeroData = {
  title: "Delivering Standout",
  titleHighlight: "Digital Creations",
  subtitle: "Through Seamless Partnership",
  stats: "20+ Amazing Websites Created So Far\n\n",
  ctaText: "Get in Touch",
  acceptingText: "Ready for New Projects.",
  toolsText: "We use industry standard tools like",
  tools: [
    {
      name: "Figma",
      color: "purple-500",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "Adobe Illustrator",
      color: "yellow-500",
      logoUrl: "https://skillicons.dev/icons?i=ai",
    },
    {
      name: "React",
      color: "blue-400",
      logoUrl: "https://cdn.simpleicons.org/react/61DAFB",
    },
    {
      name: "Node.js",
      color: "green-500",
      logoUrl: "https://cdn.simpleicons.org/nodedotjs/339933",
    },
    {
      name: "TypeScript",
      color: "blue-600",
      logoUrl: "https://cdn.simpleicons.org/typescript/3178C6",
    },
    {
      name: "PostgreSQL",
      color: "blue-700",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
  ],
};

const iconMap = {
  Figma,
  Frame,
  Layers,
};

export default function HeroSection() {
  const { data: content, isLoading } = useContent();
  const updateSection = useUpdateContentSection();

  const [heroData, setHeroData] = useLocalStorage<HeroData>(
    "heroData",
    hero || DEFAULT_HERO_DATA,
  );

  // Safety check to ensure heroData exists
  const safeHeroData = heroData || DEFAULT_HERO_DATA;

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

  if (isLoading) {
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
            {safeHeroData.title.replace("Comprehensive Digital Solutions", "Comprehensive Digital\nSolutions")}{" "}
            <span className="text-electric-blue">
              {safeHeroData.titleHighlight}
            </span>
            <br />
            {safeHeroData.subtitle}
          </h1>
          <p className="custom-hero-stats text-gray-600 mb-8 max-w-2xl mx-auto text-[18px] font-medium">
            {safeHeroData.stats}
          </p>

          <button className="bg-black text-white px-8 py-3 rounded-xl font-medium custom-button hover:bg-gray-900 transition-colors duration-200 mb-4 flex items-center justify-center space-x-3 mx-auto">
            <img
              src={b48f5cac_0dd9_4e94_b48a_682921628c0b}
              alt="Profile"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
            />
            <span>
              {safeHeroData.ctaText}
            </span>
          </button>

          <div className="flex items-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-electric-blue rounded-full drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
            <span className="custom-accepting">{safeHeroData.acceptingText}</span>
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
          <p className="custom-tools-text mb-4">
            {safeHeroData.toolsText}
          </p>
          <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
            {safeHeroData.tools.map((tool, index) => {
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