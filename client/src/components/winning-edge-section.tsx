import { motion } from "framer-motion";
import { Search, TrendingUp, Gauge, Clock, Star, Sparkles } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Our SEO-centric design approach enhances your online visibility, driving organic traffic by ensuring your site ranks high on Google searches.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: TrendingUp,
    title: "High Converting Design",
    description: "Our engaging design techniques drive remarkable increases in conversion rates by optimizing user experience and encouraging action.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Gauge,
    title: "Peak Performance on Any Screen",
    description: "Our fluid website experience guarantees flawless performance across all screens, from desktops and laptops to tablets and mobile.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Clock,
    title: "Fast Turnaround Time",
    description: "Launch your landing pages swiftly within 7 to 14 days, ensuring fast access to online opportunities without sacrificing quality.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Star,
    title: "Quality Without Overcharge",
    description: "Always receive exceptional quality without any additional costs, ensuring outstanding value and trust in every service we provide.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Sparkles,
    title: "Effortless Experience",
    description: "Our streamlined process and world-class systems minimize your involvement, saving you time while maximizing efficiency.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
];

export default function WinningEdgeSection() {
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
          <h2 className="font-instrument custom-about-title mb-4 text-[60px] font-medium">Our Winning Edge</h2>
          <p className="text-gray-600 custom-about-text max-w-2xl mx-auto text-[18px]">
            Discover our unique strengths and distinctive value we offer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`${feature.color} w-6 h-6`} />
                </div>
                <h3 className="font-poppins font-semibold custom-project-title mb-3">{feature.title}</h3>
                <p className="text-gray-600 custom-project-desc leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
