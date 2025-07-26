import { motion } from "framer-motion";
import { Palette, Code, Circle } from "lucide-react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { EditableText } from "./editable-text";

import b48f5cac_0dd9_4e94_b48a_682921628c0b from "@assets/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg";

interface ServiceData {
  title: string;
  services: Array<{
    id: string;
    icon: string;
    title: string;
    description: string;
  }>;
  bottomText: string;
  features: Array<{
    text: string;
  }>;
}

const DEFAULT_SERVICES_DATA: ServiceData = {
  title: "Our Services",
  services: [
    {
      id: "branding",
      icon: "Palette",
      title: "Logo & Branding",
      description:
        "A strong, scalable brand identity including logo, colors, typography, and visual tone, delivered in 2-3 weeks.",
    },
    {
      id: "websites",
      icon: "Code",
      title: "Websites",
      description:
        "A complete website from strategy to design and development, crafted to drive results and delivered in 3 to 4 weeks.",
    },
  ],
  bottomText:
    "We also offer other design services like pitch decks, social media creatives, and more.",
  features: [
    { text: "Smooth Communication" },
    { text: "Flexible revisions" },
    { text: "Fast turnaround" },
  ],
};

export default function ServicesSection() {
  const [servicesData, setServicesData] = useLocalStorage<ServiceData>(
    "servicesData",
    DEFAULT_SERVICES_DATA,
  );

  const handleUpdateField = (field: keyof ServiceData, value: any) => {
    setServicesData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateService = (id: string, field: string, value: any) => {
    setServicesData((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        service.id === id ? { ...service, [field]: value } : service,
      ),
    }));
  };

  const handleUpdateFeature = (index: number, text: string) => {
    setServicesData((prev) => ({
      ...prev,
      features: prev.features.map((feature, i) =>
        i === index ? { ...feature, text } : feature,
      ),
    }));
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="font-instrument text-3xl sm:text-4xl md:text-5xl lg:text-[70px] mb-4 leading-tight font-light">
            <EditableText
              value={servicesData.title}
              onChange={(value) => handleUpdateField("title", value)}
              tag="span"
            />
          </h2>
        </motion.div>

        <div className="flex flex-wrap gap-6 max-w-4xl mx-auto mb-12">
          {servicesData.services.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-[calc(50%-12px)] text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                {service.icon === "Palette" ? (
                  <Palette className="w-8 h-8 text-electric-blue lucide-glow" />
                ) : (
                  <Code className="w-8 h-8 text-electric-blue lucide-glow" />
                )}
              </div>
              <h3 className="font-instrument mb-3 font-semibold text-[28px]">
                <EditableText
                  value={service.title}
                  onChange={(value) =>
                    handleUpdateService(service.id, "title", value)
                  }
                  tag="span"
                />
              </h3>
              <p className="text-gray-600 leading-relaxed">
                <EditableText
                  value={service.description}
                  onChange={(value) =>
                    handleUpdateService(service.id, "description", value)
                  }
                  tag="span"
                  multiline={true}
                />
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 custom-about-text mb-8">
            <EditableText
              value={servicesData.bottomText}
              onChange={(value) => handleUpdateField("bottomText", value)}
              tag="span"
              multiline={true}
            />
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            {servicesData.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-electric-blue rounded-full drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
                <span className="custom-accepting">
                  <EditableText
                    value={feature.text}
                    onChange={(value) => handleUpdateFeature(index, value)}
                    tag="span"
                  />
                </span>
              </div>
            ))}
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-electric-blue rounded-full drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
              <span className="custom-accepting">Post-Project Support</span>
            </div>
          </div>

          <button className="text-white px-8 py-3 rounded-xl font-medium custom-button hover:bg-gray-900 transition-colors duration-200 mb-4 flex items-center justify-center space-x-3 mx-auto bg-[#000000]">
            <img
              src={b48f5cac_0dd9_4e94_b48a_682921628c0b}
              alt="Profile"
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover"
            />
            <span>Book a Call</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
