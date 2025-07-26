import { motion } from "framer-motion";
import {
  Lightbulb,
  Palette,
  Code,
  TestTube,
  Rocket,
  Headphones,
} from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
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
  title: "Alur Kerja Kami",
  subtitle:
    "Proses terstruktur yang kami gunakan untuk menghadirkan hasil terbaik",
  steps: [
    {
      id: "planning",
      icon: "Lightbulb",
      title: "Ide & Perencanaan",
      description:
        "Memahami kebutuhan Anda dan merencanakan strategi yang tepat untuk mencapai tujuan bisnis.",
    },
    {
      id: "design",
      icon: "Palette",
      title: "Desain Awal",
      description:
        "Membuat konsep visual yang menarik dan sesuai dengan identitas brand Anda.",
    },
    {
      id: "development",
      icon: "Code",
      title: "Pengembangan",
      description:
        "Mengembangkan website atau aplikasi dengan teknologi terdepan dan kode yang berkualitas.",
    },
    {
      id: "testing",
      icon: "TestTube",
      title: "Uji Coba",
      description:
        "Melakukan testing menyeluruh untuk memastikan semua fitur berfungsi dengan sempurna.",
    },
    {
      id: "launch",
      icon: "Rocket",
      title: "Peluncuran",
      description:
        "Meluncurkan produk final dan memastikan semua sistem berjalan lancar di lingkungan live.",
    },
    {
      id: "support",
      icon: "Headphones",
      title: "Dukungan",
      description:
        "Memberikan dukungan berkelanjutan dan maintenance untuk memastikan performa optimal.",
    },
  ],
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
  const [processData, setProcessData] = useLocalStorage<ProcessData>(
    "processData",
    DEFAULT_PROCESS_DATA,
  );

  const handleUpdateField = (field: keyof ProcessData, value: any) => {
    setProcessData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateStep = (id: string, field: string, value: any) => {
    setProcessData((prev) => ({
      ...prev,
      steps: prev.steps.map((step) =>
        step.id === id ? { ...step, [field]: value } : step,
      ),
    }));
  };

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
                    <h3 className="font-instrument font-semibold mb-3 text-charcoal text-[24px]">
                      <EditableText
                        value={step.title}
                        onChange={(value) =>
                          handleUpdateStep(step.id, "title", value)
                        }
                        tag="span"
                      />
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
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
