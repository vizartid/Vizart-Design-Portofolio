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
} from "lucide-react";
import { useContent } from "@/hooks/use-content";
import { winningEdge } from "@/data/winning-edge";

// Icon mapping for the features
const iconMap = {
  Search: Search,
  TrendingUp: TrendingUp,
  Gauge: Gauge,
  Clock: Clock,
  Star: Star,
  Globe: Globe,
  Target: Target,
  Cloud: Cloud,
  Rocket: Rocket,
  Bolt: Bolt,
  ChartBar: ChartBar,
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

  // Use fallback data if content is not available
  const winningEdgeData = content?.winningEdge || winningEdge;
  const { title, subtitle, features } = winningEdgeData;

  if (!features || !Array.isArray(features)) {
    return null;
  }

  if (isLoading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-16 bg-gray-200 rounded mb-8 mx-auto max-w-md"></div>
            <div className="h-6 bg-gray-200 rounded mb-12 mx-auto max-w-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }


  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-instrument text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight font-light text-gray-900">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature: Feature, index: number) => {
            const IconComponent = (iconMap as any)[feature.icon] || Search;
            const colorClass =
              (colorMap as any)[feature.color] || "text-blue-500";

            return (
              <motion.div
                key={feature.title + index} // Using index to ensure uniqueness if titles are duplicated
                className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <IconComponent
                    className={`${colorClass} w-10 h-10 lucide-glow`}
                  />
                </div>
                <h3 className="font-semibold text-xl mb-4 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}