import { motion } from "framer-motion";
import { useState } from "react";
import {
  Lightbulb,
  Palette,
  Code,
  TestTube,
  Rocket,
  Headphones,
} from "lucide-react";

import { useContent, useUpdateContentSection } from "@/hooks/use-content";
// Removed unused imports (EditableText, Check, ScrollStack) to fix build errors

interface ProcessStep {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface ProcessData {
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

const DEFAULT_PROCESS_DATA: ProcessData = {
  title: "Our Workflow",
  subtitle: "A structured process we use to deliver the best results",
  steps: [
    {
      id: "planning",
      icon: "Lightbulb",
      title: "Ideas & Planning",
      description: "Understanding your needs and planning the right strategy to achieve business goals."
    },
    {
      id: "design",
      icon: "Palette",
      title: "Initial Design",
      description: "Creating attractive visual concepts that align with your brand identity."
    },
    {
      id: "development",
      icon: "Code",
      title: "Development",
      description: "Developing websites or applications with cutting-edge technology and quality code."
    },
    {
      id: "testing",
      icon: "TestTube",
      title: "Testing",
      description: "Conducting comprehensive testing to ensure all features work perfectly."
    },
    {
      id: "launch",
      icon: "Rocket",
      title: "Launch",
      description: "Launching the final product and ensuring all systems run smoothly in the live environment."
    },
    {
      id: "support",
      icon: "Headphones",
      title: "Support",
      description: "Providing ongoing support and maintenance to ensure optimal performance."
    }
  ]
};

const iconMap = {
  Lightbulb,
  Palette,
  Code,
  TestTube,
  Rocket,
  Headphones,
};

export default function ProcessSection() {
  console.log("ProcessSection component is rendering"); // Debug log
  const { data: content, isLoading } = useContent();
  const updateSection = useUpdateContentSection();

  // Get process data from content, fallback to default
  const processData = content?.process || DEFAULT_PROCESS_DATA;

  const handleUpdateField = (field: keyof ProcessData, value: any) => {
    const updatedProcess = {
      ...processData,
      [field]: value,
    };

    updateSection.mutate({
      section: "process",
      data: updatedProcess,
    });
  };

  const handleUpdateStep = (id: string, field: string, value: any) => {
    const updatedProcess = {
      ...processData,
      steps: processData.steps.map((step: ProcessStep) =>
        step.id === id ? { ...step, [field]: value } : step,
      ),
    };

    updateSection.mutate({
      section: "process",
      data: updatedProcess,
    });
  };

  if (isLoading || !content) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bone-white">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-24 bg-gray-200 rounded mb-6"></div>
            <div className="h-8 bg-gray-200 rounded mb-8 max-w-2xl mx-auto"></div>
            <div className="space-y-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-instrument custom-about-title mb-4 font-medium text-[70px]">
            {processData.title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto text-center">
            {processData.subtitle}
          </p>
        </motion.div>

        {/* Process Steps - Scroll Reactive Animated Cards (non-overlay) */}
        <AnimatedProcessList steps={processData.steps} />
      </div>
    </section>
  );
}

// --- Animated list component extracted for clarity ---
interface AnimatedProcessListProps {
  steps: ProcessStep[];
}

const AnimatedProcessList = ({ steps }: AnimatedProcessListProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const cardColors = [
    { icon: "text-orange-500", glow: "drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]" },
    { icon: "text-purple-500", glow: "drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]" },
    { icon: "text-green-500", glow: "drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]" },
    { icon: "text-blue-500", glow: "drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]" },
    { icon: "text-red-500", glow: "drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]" },
    { icon: "text-indigo-500", glow: "drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto relative">
      {steps.map((step: ProcessStep, index: number) => {
        const IconComponent = iconMap[step.icon as keyof typeof iconMap];
        const theme = cardColors[index % cardColors.length];

        // Compute dynamic stacking effect (previous cards compress subtly)
        const isPast = index < activeIndex;
        const depth = Math.min(activeIndex - index, 4); // limit effect spread
        const scale = isPast ? 1 - depth * 0.015 : 1;
        const translateY = isPast ? -depth * 6 : 0;
        const shadowIntensity = isPast ? 10 + depth * 4 : 16;

        return (
          <motion.div
            key={step.id}
            className="bg-white rounded-2xl p-6 border border-gray-100 w-full relative group"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            onViewportEnter={() => setActiveIndex((prev) => (index > prev ? index : prev))}
            viewport={{ amount: 0.45, once: false }}
            animate={{
              scale,
              y: translateY,
              boxShadow: `0 8px ${shadowIntensity}px -4px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05)`
            }}
            transition={{ type: "spring", stiffness: 140, damping: 22, mass: 0.9 }}
            whileHover={{ y: translateY - 4, scale: scale + 0.01 }}
          >
            <div className="flex items-center space-x-6">
              <div className="flex-shrink-0 relative">
                {IconComponent && (
                  <IconComponent
                    className={`w-12 h-12 ${theme.icon} ${theme.glow} transition-transform duration-300 group-hover:scale-110`}
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-instrument font-medium mb-3 text-charcoal text-[28px] tracking-tight">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-[18px] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
            <div className="absolute top-4 right-4 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs select-none">
              {index + 1}
            </div>
            {/* Decorative gradient line when active */}
            <motion.div
              className="absolute left-0 bottom-0 h-1 rounded-br-2xl rounded-bl-2xl bg-gradient-to-r from-black/70 via-black/40 to-transparent"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: activeIndex >= index ? "100%" : 0, opacity: activeIndex >= index ? 1 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};