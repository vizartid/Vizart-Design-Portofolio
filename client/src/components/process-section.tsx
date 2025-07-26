import { motion } from "framer-motion";
import { Lightbulb, Palette, Code, TestTube, Rocket, Headphones } from "lucide-react";
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
  subtitle: "Proses terstruktur yang kami gunakan untuk menghadirkan hasil terbaik",
  steps: [
    {
      id: "planning",
      icon: "Lightbulb",
      title: "Ide & Perencanaan",
      description: "Memahami kebutuhan Anda dan merencanakan strategi yang tepat untuk mencapai tujuan bisnis."
    },
    {
      id: "design",
      icon: "Palette", 
      title: "Desain Awal",
      description: "Membuat konsep visual yang menarik dan sesuai dengan identitas brand Anda."
    },
    {
      id: "development",
      icon: "Code",
      title: "Pengembangan",
      description: "Mengembangkan website atau aplikasi dengan teknologi terdepan dan kode yang berkualitas."
    },
    {
      id: "testing",
      icon: "TestTube",
      title: "Uji Coba",
      description: "Melakukan testing menyeluruh untuk memastikan semua fitur berfungsi dengan sempurna."
    },
    {
      id: "launch",
      icon: "Rocket",
      title: "Peluncuran",
      description: "Meluncurkan produk final dan memastikan semua sistem berjalan lancar di lingkungan live."
    },
    {
      id: "support",
      icon: "Headphones",
      title: "Dukungan",
      description: "Memberikan dukungan berkelanjutan dan maintenance untuk memastikan performa optimal."
    }
  ]
};

const iconMap = {
  Lightbulb,
  Palette,
  Code,
  TestTube,
  Rocket,
  Headphones
};

export default function ProcessSection() {
  console.log('ProcessSection component is rendering'); // Debug log
  const [processData, setProcessData] = useLocalStorage<ProcessData>('processData', DEFAULT_PROCESS_DATA);

  const handleUpdateField = (field: keyof ProcessData, value: any) => {
    setProcessData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateStep = (id: string, field: string, value: any) => {
    setProcessData(prev => ({
      ...prev,
      steps: prev.steps.map(step =>
        step.id === id ? { ...step, [field]: value } : step
      )
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
          <h2 className="font-instrument sm:text-4xl lg:desktop-text-5xl mb-4 text-[70px]">
            <EditableText
              value={processData.title}
              onChange={(value) => handleUpdateField('title', value)}
              tag="span"
            />
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            <EditableText
              value={processData.subtitle}
              onChange={(value) => handleUpdateField('subtitle', value)}
              tag="span"
              multiline={true}
            />
          </p>
        </motion.div>

        {/* Process Steps - Flexbox Layout (2 cards per row) */}
        <div className="flex flex-wrap gap-6 max-w-4xl mx-auto">
          {processData.steps.map((step, index) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap];
            
            return (
              <motion.div
                key={step.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 w-full sm:w-[calc(50%-12px)] relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon with Glow Effect */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-electric-blue/10 rounded-xl flex items-center justify-center icon-glow">
                      {IconComponent && (
                        <IconComponent className="w-6 h-6 text-electric-blue lucide-glow" />
                      )}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-poppins font-semibold text-xl mb-3 text-charcoal">
                      <EditableText
                        value={step.title}
                        onChange={(value) => handleUpdateStep(step.id, 'title', value)}
                        tag="span"
                      />
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      <EditableText
                        value={step.description}
                        onChange={(value) => handleUpdateStep(step.id, 'description', value)}
                        tag="span"
                        multiline={true}
                      />
                    </p>
                  </div>
                </div>

                {/* Step Number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 bg-electric-blue rounded-full flex items-center justify-center text-white font-bold text-sm step-number-glow relative">
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