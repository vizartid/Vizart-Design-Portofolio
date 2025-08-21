import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";
import { useLocalStorage } from "@/hooks/use-local-storage";

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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Header with profile */}
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatarUrl}
                  alt={`${testimonial.name} headshot`}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed">
                {testimonial.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}