import { motion } from "framer-motion";
import {
  Search,
  TrendingUp,
  Gauge,
  Clock,
  Star,
  Globe,
  Target,
  Cloud,
  Rocket,
  Bolt,
  ChartBar,
  Sparkles,
} from "lucide-react";
import { useContent } from "@/hooks/use-content";

// Icon mapping for the features
const iconMap = {
  Search: Search,
  TrendingUp: TrendingUp,
  Gauge: Gauge,
  Clock: Clock,
  Star: Star,
  Sparkles: Sparkles,
};

// Color mapping for the features
const colorMap = {
  "blue-500": "text-blue-500",
  "orange-500": "text-orange-500",
  "green-500": "text-green-500",
  "purple-500": "text-purple-500",
  "pink-500": "text-pink-500",
  "yellow-500": "text-yellow-500",
};

interface Feature {
  title: string;
  description: string;
  icon: string;
  color: string;
}

export default function WinningEdgeSection() {
  const { data: content, isLoading } = useContent();

  if (isLoading || !content?.winningEdge) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-20 bg-gray-200 animate-pulse rounded-lg mb-4"></div>
            <div className="h-6 bg-gray-200 animate-pulse rounded-lg max-w-2xl mx-auto"></div>
          </div>
          <div className="flex flex-wrap gap-6 max-w-4xl mx-auto">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 animate-pulse rounded-2xl h-48 w-full sm:w-[calc(50%-12px)]"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const { title, subtitle, features } = content.winningEdge;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-instrument custom-about-title mb-4 font-medium text-[70px]">
            {title}
          </h2>
          <p className="text-gray-600 custom-about-text max-w-2xl mx-auto text-[18px]">
            {subtitle}
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-6 max-w-4xl mx-auto">
          {features.map((feature: Feature, index: number) => {
            const IconComponent = (iconMap as any)[feature.icon] || Search;
            const colorClass =
              (colorMap as any)[feature.color] || "text-blue-500";

            return (
              <motion.div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-[calc(50%-12px)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <IconComponent
                      className={`${colorClass} w-8 h-8 lucide-glow`}
                    />
                  </div>
                  <h3 className="font-instrument custom-project-title mb-3 text-[28px] font-medium">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 custom-project-desc leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
