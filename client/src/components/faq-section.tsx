import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { EditableText } from "./editable-text";
import { useContent, useUpdateContentSection } from "@/hooks/use-content";

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { data: content, isLoading } = useContent();
  const updateSection = useUpdateContentSection();

  const handleUpdateFAQ = (field: string, value: any) => {
    if (!content) return;

    const updatedFAQ = {
      ...content.faq,
      [field]: value,
    };

    updateSection.mutate({
      section: "faq",
      data: updatedFAQ,
    });
  };

  if (isLoading || !content) {
    return (
      <section className="py-24 bg-bone-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded mb-6 max-w-2xl mx-auto"></div>
            <div className="h-6 bg-gray-200 rounded mb-16 max-w-xl mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

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
            className="custom-about-title font-instrument text-3xl sm:text-4xl md:text-5xl lg:text-[70px] mb-4 leading-tight font-light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <EditableText
              value={faq.title}
              onChange={(value) => handleUpdateFAQ("title", value)}
              tag="span"
            />
          </motion.h2>
          <motion.p
            className="custom-about-text text-charcoal/70 max-w-2xl mx-auto text-[18px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <EditableText
              value={faq.subtitle}
              onChange={(value) => handleUpdateFAQ("subtitle", value)}
              tag="span"
            />
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faq.faqs.map((item: any, index: number) => (
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
                  <EditableText
                    value={item.question}
                    onChange={(value) => {
                      const updatedItems = [...faq.faqs];
                      const itemIndex = updatedItems.findIndex(
                        (i) => i.id === item.id,
                      );
                      if (itemIndex !== -1) {
                        updatedItems[itemIndex] = { ...item, question: value };
                        handleUpdateFAQ("faqs", updatedItems);
                      }
                    }}
                    tag="span"
                    className="inline"
                  />
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

              <AnimatePresence>
                {isOpen(item.id) && (
                  <motion.div
                    key={`faq-content-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-100 pt-4">
                        <p className="text-charcoal/70 leading-relaxed">
                          <EditableText
                            value={item.answer}
                            onChange={(value) => {
                              const updatedItems = [...faq.faqs];
                              const itemIndex = updatedItems.findIndex(
                                (i) => i.id === item.id,
                              );
                              if (itemIndex !== -1) {
                                updatedItems[itemIndex] = {
                                  ...item,
                                  answer: value,
                                };
                                handleUpdateFAQ("faqs", updatedItems);
                              }
                            }}
                            tag="span"
                            multiline={true}
                            className="inline"
                          />
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
