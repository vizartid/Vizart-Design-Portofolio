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

        {/* Process Steps - One Card Per Row Layout */}
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          {processData.steps.map((step, index) => {
            const IconComponent = iconMap[step.icon as keyof typeof iconMap];
            
            // Define different colors for each card
            const cardColors = [
              { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', number: 'bg-blue-600', glow: 'blue-glow' },
              { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', number: 'bg-purple-600', glow: 'purple-glow' },
              { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', number: 'bg-green-600', glow: 'green-glow' },
              { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600', number: 'bg-orange-600', glow: 'orange-glow' },
              { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600', number: 'bg-red-600', glow: 'red-glow' },
              { bg: 'bg-indigo-50', border: 'border-indigo-200', icon: 'text-indigo-600', number: 'bg-indigo-600', glow: 'indigo-glow' }
            ];
            
            const colorTheme = cardColors[index % cardColors.length];
            
            return (
              <motion.div
                key={step.id}
                className={`${colorTheme.bg} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border ${colorTheme.border} w-full relative`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon without Background - Direct Glow Effect */}
                  <div className="flex-shrink-0">
                    {IconComponent && (
                      <IconComponent className={`w-8 h-8 ${colorTheme.icon} ${colorTheme.glow} transition-all duration-300`} />
                    )}
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

                {/* Step Number with Matching Color */}
                <div className={`absolute -top-3 -left-3 w-8 h-8 ${colorTheme.number} rounded-full flex items-center justify-center text-white font-bold text-sm ${colorTheme.glow} relative`}>
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