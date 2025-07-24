import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import content from "@/data/content.json";

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const { faq } = content;

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const isOpen = (id: number) => openItems.includes(id);

  return (
    <section className="py-24 bg-bone-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-instrument-serif font-bold text-charcoal mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {faq.title}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-charcoal/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {faq.subtitle}
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faq.items.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-electric-blue focus:ring-opacity-50"
              >
                <h3 className="font-poppins font-semibold text-lg text-charcoal group-hover:text-electric-blue transition-colors duration-300 pr-4">
                  {item.question}
                </h3>
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 ${
                    isOpen(item.id)
                      ? "bg-electric-blue text-white rotate-180"
                      : "group-hover:bg-gray-200"
                  }`}
                >
                  {isOpen(item.id) ? (
                    <Minus className="w-4 h-4" />
                  ) : (
                    <Plus className="w-4 h-4" />
                  )}
                </div>
              </button>

              <AnimatePresence mode="wait">
                {isOpen(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-charcoal/70 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
