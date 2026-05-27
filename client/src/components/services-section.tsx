import { motion } from "framer-motion";
import { Code, Palette, Brain, Server } from "lucide-react";

const services = [
  {
    id: "fullstack",
    icon: Code,
    color: "#3B82F6",
    label: "01",
    title: "Fullstack Development",
    description:
      "Saya membangun aplikasi web end-to-end yang scalable — dari UI yang responsif hingga API backend yang robust. Saya menguasai React, Next.js, Node.js, TypeScript, dan PostgreSQL untuk memberikan solusi digital yang siap produksi.",
    tags: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    id: "uiux",
    icon: Palette,
    color: "#8B5CF6",
    label: "02",
    title: "UI/UX Design & Branding",
    description:
      "Saya menciptakan identitas visual yang kuat dan pengalaman pengguna yang intuitif — mulai dari logo, design system, hingga prototype interaktif. Setiap desain saya buat untuk memperkuat brand dan mendorong konversi.",
    tags: ["Figma", "Logo Design", "Design System", "Prototyping"],
  },
  {
    id: "ai",
    icon: Brain,
    color: "#EC4899",
    label: "03",
    title: "AI/ML Engineering",
    description:
      "Saya merancang dan mengimplementasikan solusi kecerdasan buatan — dari pipeline machine learning, integrasi LLM, RAG system, hingga model prediktif yang dapat diintegrasikan langsung ke dalam produk Anda.",
    tags: ["Python", "TensorFlow", "LangChain", "OpenAI API", "FastAPI"],
  },
  {
    id: "devops",
    icon: Server,
    color: "#10B981",
    label: "04",
    title: "DevOps & Network Engineering",
    description:
      "Saya memastikan infrastruktur digital Anda berjalan optimal — mulai dari CI/CD pipeline, containerisasi dengan Docker & Kubernetes, network monitoring, hingga keamanan sistem yang enterprise-grade.",
    tags: ["Docker", "Kubernetes", "CI/CD", "Linux", "Network"],
  },
];

export default function ServicesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-gray-400 mb-3 block">
            What I Offer
          </span>
          <h2 className="font-instrument text-4xl sm:text-5xl lg:text-[64px] font-light leading-tight">
            My Services
          </h2>
        </motion.div>

        <div className="flex flex-col gap-0">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Divider top */}
                <div className="w-full h-px bg-gray-200 group-first:hidden" />

                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 py-10 sm:py-12 items-start">
                  {/* Number + Icon */}
                  <div className="flex-shrink-0 flex flex-col items-start gap-4">
                    <span className="text-xs font-mono text-gray-400 tracking-widest">{service.label}</span>
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${service.color}15`, border: `1px solid ${service.color}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: service.color }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-instrument text-3xl sm:text-4xl font-light mb-4 group-hover:text-gray-900 transition-colors"
                      style={{ lineHeight: 1.2 }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed text-base max-w-2xl mb-6">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-3 py-1.5 rounded-full border transition-colors duration-200"
                          style={{
                            backgroundColor: `${service.color}08`,
                            borderColor: `${service.color}25`,
                            color: service.color,
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 self-center hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-400 group-hover:border-gray-900 group-hover:text-gray-900 transition-all duration-300 group-hover:translate-x-1">
                    →
                  </div>
                </div>

                {/* Divider bottom (last item) */}
                {index === services.length - 1 && <div className="w-full h-px bg-gray-200" />}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500 mb-6 text-base">
            Tertarik bekerja sama? Saya juga terbuka untuk proyek freelance, konsultasi, dan kolaborasi jangka panjang.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
            {["Komunikasi Lancar", "Revisi Fleksibel", "Pengiriman Tepat Waktu", "Dukungan Pasca Proyek"].map(
              (feat) => (
                <div key={feat} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-electric-blue rounded-full drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
                  <span className="custom-accepting text-sm text-gray-600">{feat}</span>
                </div>
              )
            )}
          </div>
          <button className="bg-black text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center space-x-3 mx-auto">
            <img src="/Mavent-white.png" alt="Logo" className="w-5 h-5 object-contain" />
            <span>Book a Call</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
