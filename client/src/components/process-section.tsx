
import { motion } from "framer-motion";
import {
  Lightbulb,
  Palette,
  Code,
  TestTube,
  Rocket,
  Headphones,
} from "lucide-react";
import { useContent, useUpdateContentSection } from "@/hooks/use-content";
import { EditableText } from "./editable-text";

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
      steps: processData.steps.map((step) =>
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-bone-white">
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
            <EditableText
              value={processData.title}
              onChange={(value) => handleUpdateField("title", value)}
              tag="span"
            />
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            <EditableText
              value={processData.subtitle}
              onChange={(value) => handleUpdateField("subtitle", value)}
              tag="span"
              multiline={true}
            />
          </p>
        </motion.div>

        {/* Process Steps - Single Column Compact Cards */}
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {processData.steps.map((step, index) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap];

            // Define different colors for each card with clean styling
            const cardColors = [
              {
                bg: "bg-white",
                icon: "text-orange-500",
                glow: "drop-shadow-[0_0_8px_rgba(251,146,60,0.4)]",
              },
              {
                bg: "bg-white",
                icon: "text-purple-500",
                glow: "drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]",
              },
              {
                bg: "bg-white",
                icon: "text-green-500",
                glow: "drop-shadow-[0_0_8px_rgba(34,197,94,0.4)]",
              },
              {
                bg: "bg-white",
                icon: "text-blue-500",
                glow: "drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]",
              },
              {
                bg: "bg-white",
                icon: "text-red-500",
                glow: "drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]",
              },
              {
                bg: "bg-white",
                icon: "text-indigo-500",
                glow: "drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]",
              },
            ];

            const colorTheme = cardColors[index % cardColors.length];

            return (
              <motion.div
                key={step.id}
                className={`${colorTheme.bg} rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 w-full relative`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center space-x-6 text-center">
                  {/* Icon with Glow Effect Only */}
                  <div className="flex-shrink-0">
                    {IconComponent && (
                      <IconComponent
                        className={`w-12 h-12 ${colorTheme.icon} ${colorTheme.glow} transition-all duration-300`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-instrument font-medium mb-3 text-charcoal text-[28px]">
                      <EditableText
                        value={step.title}
                        onChange={(value) =>
                          handleUpdateStep(step.id, "title", value)
                        }
                        tag="span"
                      />
                    </h3>
                    <p className="text-gray-600 text-[18px]">
                      <EditableText
                        value={step.description}
                        onChange={(value) =>
                          handleUpdateStep(step.id, "description", value)
                        }
                        tag="span"
                        multiline={true}
                      />
                    </p>
                  </div>
                </div>
                {/* Step Number - Small and Subtle */}
                <div className="absolute top-4 right-4 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-xs">
                  {index + 1}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
