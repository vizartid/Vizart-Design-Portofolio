import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "../data/testimonials";
import { useLocalStorage } from "@/hooks/use-local-storage";

// Assuming App.tsx imports this component and the toaster component path was corrected there.
// If the error persists, the import path in App.tsx for "@/components/ui/toaster" needs to be verified.

interface TestimonialData {
  title: string;
  subtitle: string;
  testimonials: Array<{
    id: number;
    name: string;
    company: string;
    role: string;
    content: string;
    avatarUrl: string;
    rating: number;
  }>;
}

const DEFAULT_TESTIMONIALS_DATA: TestimonialData = {
  title: "What Our Clients Say",
  subtitle: "Real feedback from real people we've worked with",
  testimonials: testimonials,
};

export default function TestimonialsSection() {
  const [testimonialsData, setTestimonialsData] =
    useLocalStorage<TestimonialData>(
      "testimonialsData",
      DEFAULT_TESTIMONIALS_DATA,
    );

  const handleUpdateField = (field: keyof TestimonialData, value: any) => {
    setTestimonialsData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateTestimonial = (id: number, field: string, value: any) => {
    setTestimonialsData((prev) => ({
      ...prev,
      testimonials: prev.testimonials.map((testimonial) =>
        testimonial.id === id
          ? { ...testimonial, [field]: value }
          : testimonial,
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
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-instrument text-3xl sm:text-4xl md:text-5xl lg:text-[70px] mb-4 leading-tight font-light">
            {testimonialsData.title}
          </h2>
          <p className="text-gray-600 text-lg">
            {testimonialsData.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {testimonialsData.testimonials.map((testimonial, index) => (
            <motion.div
              key={`testimonial-${testimonial.id}-${index}`}
              className="bg-white rounded-2xl p-6 shadow-lg w-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={`${testimonial.id}-star-${i}`}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatarUrl}
                  alt={`${testimonial.name} headshot`}
                  className="w-12 h-12 rounded-full object-cover mr-3"
                />
                <div>
                  <p className="font-medium">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {testimonial.role}
                    ,{" "}
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}