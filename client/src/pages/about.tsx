import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from '@/components/ui/scroll-stack';
import Footer from '@/components/footer';
import {
  SiReact, SiTypescript, SiPython, SiDocker,
  SiKubernetes, SiTensorflow, SiGithub, SiLinkedin,
} from 'react-icons/si';
import { Mail, MapPin, ExternalLink, Code, Palette, Brain, Server } from 'lucide-react';

const Lanyard = lazy(() => import('@/components/Lanyard'));

const skills = [
  { icon: <SiReact className="text-blue-400" />, name: 'React / Next.js' },
  { icon: <SiTypescript className="text-blue-500" />, name: 'TypeScript' },
  { icon: <SiPython className="text-yellow-400" />, name: 'Python' },
  { icon: <SiDocker className="text-blue-500" />, name: 'Docker' },
  { icon: <SiKubernetes className="text-blue-400" />, name: 'Kubernetes' },
  { icon: <SiTensorflow className="text-orange-400" />, name: 'TensorFlow' },
];

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '20+', label: 'Happy Clients' },
  { value: '8', label: 'Core Specializations' },
];

const roleCards = [
  {
    icon: Code,
    color: '#3B82F6',
    bg: '#EFF6FF',
    label: '01',
    title: 'Fullstack Developer',
    body: 'Building end-to-end web applications with React, Next.js, Node.js, TypeScript, and PostgreSQL. From pixel-perfect UI to production-ready APIs.',
    tags: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL'],
  },
  {
    icon: Palette,
    color: '#8B5CF6',
    bg: '#F5F3FF',
    label: '02',
    title: 'UI/UX Designer',
    body: 'Designing intuitive, conversion-driven interfaces and cohesive brand identities — from wireframes to polished design systems and interactive prototypes.',
    tags: ['Figma', 'Design System', 'Prototyping', 'Brand Identity'],
  },
  {
    icon: Brain,
    color: '#EC4899',
    bg: '#FDF2F8',
    label: '03',
    title: 'AI / ML Engineer',
    body: 'Engineering intelligent systems — LLM integrations, RAG pipelines, predictive ML models, and production-ready AI features that solve real problems.',
    tags: ['Python', 'TensorFlow', 'LangChain', 'OpenAI', 'FastAPI'],
  },
  {
    icon: Server,
    color: '#10B981',
    bg: '#ECFDF5',
    label: '04',
    title: 'DevOps & Network Engineer',
    body: 'Keeping infrastructure fast, reliable, and secure — CI/CD automation, containerisation with Docker & Kubernetes, and enterprise-grade network monitoring.',
    tags: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Networking'],
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero / About Section */}
      <section className="pt-28 pb-0 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-blue-500 mb-3 border border-blue-200 px-4 py-1.5 rounded-full bg-blue-50">
              About Me
            </span>
            <h1 className="font-instrument text-5xl sm:text-6xl lg:text-7xl font-light leading-tight mt-4">
              Crafting Digital Experiences<br />
              <span className="text-electric-blue">That Actually Work</span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-0 lg:gap-16 items-center min-h-[600px]">
            {/* Left – Lanyard */}
            <motion.div
              className="relative h-[500px] lg:h-[640px]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
                  </div>
                }
              >
                <Lanyard position={[0, 0, 26]} gravity={[0, -40, 0]} fov={20} />
              </Suspense>
            </motion.div>

            {/* Right – Profile info */}
            <motion.div
              className="flex flex-col justify-center space-y-8 py-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div>
                <h2 className="font-instrument text-4xl font-light mb-2">Hi, I'm</h2>
                <h2 className="font-instrument text-5xl font-medium text-electric-blue mb-4">
                  Rizky Pratama
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Saya adalah seorang <strong className="text-gray-900">Fullstack Developer</strong> dan{' '}
                  <strong className="text-gray-900">AI/ML Engineer</strong> yang passionate dalam membangun
                  solusi digital end-to-end — dari antarmuka yang indah hingga infrastruktur yang tangguh.
                </p>
              </div>

              <p className="text-gray-500 leading-relaxed">
                Dengan keahlian di bidang pengembangan web modern, machine learning, DevOps, dan network
                engineering, saya membantu klien mewujudkan ide mereka menjadi produk digital yang nyata,
                scalable, dan berdampak tinggi.
              </p>

              {/* Skills chips */}
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <span className="text-base">{skill.icon}</span>
                    {skill.name}
                  </span>
                ))}
              </div>

              {/* Meta info */}
              <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-400" /> Jakarta, Indonesia
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-blue-400" /> rizky@example.com
                </span>
              </div>

              {/* Social + CTA */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  <SiGithub className="w-4 h-4" /> GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <SiLinkedin className="w-4 h-4" /> LinkedIn
                </a>
                <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                  <ExternalLink className="w-4 h-4" /> Download CV
                </button>
              </div>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-3xl font-instrument font-medium text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What I Do — ScrollStack */}
      <section className="bg-gray-50 border-y border-gray-100">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center pt-16 pb-4 px-4">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-blue-500 mb-3 border border-blue-200 px-4 py-1.5 rounded-full bg-blue-50">
              What I Do
            </span>
            <h2 className="font-instrument text-4xl sm:text-5xl font-light text-gray-900 mt-4 mb-2">
              My Expertise
            </h2>
            <p className="text-gray-400 text-sm">Scroll down to explore</p>
          </div>

          {/* ScrollStack container — needs a fixed height to scroll inside */}
          <div style={{ height: '520px' }} className="overflow-hidden">
            <ScrollStack
              itemDistance={80}
              itemScale={0.04}
              itemStackDistance={28}
              stackPosition="25%"
              scaleEndPosition="12%"
              baseScale={0.84}
            >
              {roleCards.map((card, i) => {
                const Icon = card.icon;
                return (
                  <ScrollStackItem key={i}>
                    <div
                      className="w-full h-full rounded-[32px] flex flex-col justify-between p-8 sm:p-10"
                      style={{ background: card.bg, border: `1.5px solid ${card.color}20` }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}
                        >
                          <Icon className="w-7 h-7" style={{ color: card.color }} />
                        </div>
                        <span className="font-mono text-xs text-gray-300 tracking-widest pt-1">{card.label}</span>
                      </div>
                      <div>
                        <h3
                          className="font-instrument text-3xl sm:text-4xl font-light mb-3"
                          style={{ color: card.color }}
                        >
                          {card.title}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed mb-5">{card.body}</p>
                        <div className="flex flex-wrap gap-2">
                          {card.tags.map(tag => (
                            <span
                              key={tag}
                              className="text-xs font-medium px-2.5 py-1 rounded-full"
                              style={{
                                background: `${card.color}10`,
                                border: `1px solid ${card.color}25`,
                                color: card.color,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </ScrollStackItem>
                );
              })}
            </ScrollStack>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
