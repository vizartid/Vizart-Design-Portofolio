import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { EditableText } from "./editable-text";

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
  testimonials: testimonials
};

export default function TestimonialsSection() {
  const [testimonialsData, setTestimonialsData] = useLocalStorage<TestimonialData>('testimonialsData', DEFAULT_TESTIMONIALS_DATA);

  const handleUpdateField = (field: keyof TestimonialData, value: any) => {
    setTestimonialsData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdateTestimonial = (id: number, field: string, value: any) => {
    setTestimonialsData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(testimonial =>
        testimonial.id === id ? { ...testimonial, [field]: value } : testimonial
      )
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
          <h2 className="font-instrument sm:text-4xl lg:text-5xl mb-4 text-[70px]">
            <EditableText
              value={testimonialsData.title}
              onChange={(value) => handleUpdateField('title', value)}
              tag="span"
            />
          </h2>
          <p className="text-gray-600 text-lg">
            <EditableText
              value={testimonialsData.subtitle}
              onChange={(value) => handleUpdateField('subtitle', value)}
              tag="span"
            />
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-6 max-w-4xl mx-auto">
          {testimonialsData.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg w-full sm:w-[calc(50%-12px)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current lucide-glow" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 leading-relaxed">
                "<EditableText
                  value={testimonial.content}
                  onChange={(value) => handleUpdateTestimonial(testimonial.id, 'content', value)}
                  tag="span"
                  multiline={true}
                />"
              </p>
              <div className="flex items-center">
                <img 
                  src={testimonial.avatarUrl}
                  alt={`${testimonial.name} headshot`}
                  className="w-12 h-12 rounded-full object-cover mr-3" 
                />
                <div>
                  <p className="font-medium">
                    <EditableText
                      value={testimonial.name}
                      onChange={(value) => handleUpdateTestimonial(testimonial.id, 'name', value)}
                      tag="span"
                    />
                  </p>
                  <p className="text-sm text-gray-500">
                    <EditableText
                      value={testimonial.role}
                      onChange={(value) => handleUpdateTestimonial(testimonial.id, 'role', value)}
                      tag="span"
                    />, <EditableText
                      value={testimonial.company}
                      onChange={(value) => handleUpdateTestimonial(testimonial.id, 'company', value)}
                      tag="span"
                    />
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
