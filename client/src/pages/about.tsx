import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from '@/components/ui/scroll-stack';
import {
  SiReact, SiTypescript, SiPython, SiDocker,
  SiKubernetes, SiTensorflow, SiGithub, SiLinkedin,
} from 'react-icons/si';
import { Mail, MapPin, ExternalLink, Code, Palette, Brain, Server } from 'lucide-react';

// ============================================================================
// Lazy Loaded Components
// ============================================================================

const Lanyard = lazy(() => import('@/components/Lanyard'));

// ============================================================================
// Data Constants
// ============================================================================

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
    body: 'Designing intuitive, conversion-driven interfaces and cohesive brand identities from wireframes to polished design systems and interactive prototypes.',
    tags: ['Figma', 'Design System', 'Prototyping', 'Brand Identity'],
  },
  {
    icon: Brain,
    color: '#EC4899',
    bg: '#FDF2F8',
    label: '03',
    title: 'AI / ML Engineer',
    body: 'Engineering intelligent systems LLM integrations, RAG pipelines, predictive ML models, and production-ready AI features that solve real problems.',
    tags: ['Python', 'TensorFlow', 'LangChain', 'OpenAI', 'FastAPI'],
  },
  {
    icon: Server,
    color: '#10B981',
    bg: '#ECFDF5',
    label: '04',
    title: 'DevOps & Network',
    body: 'Keeping infrastructure fast, reliable, and secure CI/CD automation, containerisation with Docker and Kubernetes, and enterprise-grade network monitoring.',
    tags: ['Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Networking'],
  },
];

// ============================================================================
// Loading Spinner Component
// ============================================================================

function LoadingSpinner(): JSX.Element {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}

// ============================================================================
// Hero Section Component
// ============================================================================

function HeroSection(): JSX.Element {
  return (
    <section className="pt-20 sm:pt-24 lg:pt-28 pb-0 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-blue-500 mb-3 border border-blue-200 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-blue-50">
            About Me
          </span>
          <h1 className="font-instrument text-3xl sm:text-5xl lg:text-7xl font-light leading-tight mt-4">
            Crafting Digital Experiences
            <br className="hidden sm:block" />
            <span className="text-electric-blue"> That Actually Work</span>
          </h1>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Lanyard Section */}
          <motion.div
            className="relative h-[350px] sm:h-[450px] lg:h-[600px] order-1 lg:order-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Lanyard position={[0, 0, 26]} gravity={[0, -40, 0]} fov={20} />
            </Suspense>
          </motion.div>

          {/* Profile Info Section */}
          <motion.div
            className="flex flex-col justify-center space-y-4 sm:space-y-6 lg:space-y-8 py-4 sm:py-8 order-2 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* Name & Title */}
            <div>
              <h2 className="font-instrument text-2xl sm:text-4xl font-light mb-1 sm:mb-2">
                {"Hi, I'm"}
              </h2>
              <h2 className="font-instrument text-3xl sm:text-5xl font-medium text-electric-blue mb-2 sm:mb-4">
                Rizky Pratama
              </h2>
              <p className="text-gray-600 text-sm sm:text-lg leading-relaxed">
                Saya adalah seorang <strong className="text-gray-900">Fullstack Developer</strong> dan{' '}
                <strong className="text-gray-900">AI/ML Engineer</strong> yang passionate dalam membangun
                solusi digital end-to-end dari antarmuka yang indah hingga infrastruktur yang tangguh.
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Dengan keahlian di bidang pengembangan web modern, machine learning, DevOps, dan network
              engineering, saya membantu klien mewujudkan ide mereka menjadi produk digital yang nyata,
              scalable, dan berdampak tinggi.
            </p>

            {/* Skills Chips */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 rounded-full border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <span className="text-sm sm:text-base">{skill.icon}</span>
                  <span className="hidden xs:inline sm:inline">{skill.name}</span>
                </span>
              ))}
            </div>

            {/* Meta Info */}
            <div className="flex flex-col xs:flex-row sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" /> 
                Jakarta, Indonesia
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" /> 
                rizky@example.com
              </span>
            </div>

            {/* Social & CTA Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-gray-900 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors"
              >
                <SiGithub className="w-3 h-3 sm:w-4 sm:h-4" /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <SiLinkedin className="w-3 h-3 sm:w-4 sm:h-4" /> LinkedIn
              </a>
              <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-black text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors">
                <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" /> Download CV
              </button>
            </div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-12 mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="text-center p-4 sm:p-6 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-100"
            >
              <div className="text-xl sm:text-3xl font-instrument font-medium text-gray-900 mb-0.5 sm:mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// Expertise Section Component
// ============================================================================

function ExpertiseSection(): JSX.Element {
  return (
    <section className="bg-gray-50 border-y border-gray-100">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Section Header */}
        <div className="text-center pt-8 sm:pt-12 lg:pt-16 pb-2 sm:pb-4 px-4">
          <span className="inline-block text-xs sm:text-sm font-semibold tracking-widest uppercase text-blue-500 mb-2 sm:mb-3 border border-blue-200 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-blue-50">
            What I Do
          </span>
          <h2 className="font-instrument text-2xl sm:text-4xl lg:text-5xl font-light text-gray-900 mt-2 sm:mt-4 mb-1 sm:mb-2">
            My Expertise
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm">Scroll down to explore</p>
        </div>

        {/* ScrollStack Container */}
        <div className="h-[400px] sm:h-[480px] lg:h-[520px] overflow-hidden">
          <ScrollStack
            itemDistance={60}
            itemScale={0.04}
            itemStackDistance={20}
            stackPosition="25%"
            scaleEndPosition="12%"
            baseScale={0.84}
          >
            {roleCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <ScrollStackItem key={i}>
                  <div
                    className="w-full h-full rounded-2xl sm:rounded-3xl lg:rounded-[32px] flex flex-col justify-between p-4 sm:p-6 lg:p-10"
                    style={{ 
                      background: card.bg, 
                      border: `1.5px solid ${card.color}20` 
                    }}
                  >
                    {/* Card Header */}
                    <div className="flex items-start justify-between mb-2 sm:mb-4">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ 
                          background: `${card.color}15`, 
                          border: `1px solid ${card.color}30` 
                        }}
                      >
                        <Icon 
                          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" 
                          style={{ color: card.color }} 
                        />
                      </div>
                      <span className="font-mono text-[10px] sm:text-xs text-gray-300 tracking-widest pt-1">
                        {card.label}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div>
                      <h3
                        className="font-instrument text-xl sm:text-2xl lg:text-4xl font-light mb-2 sm:mb-3"
                        style={{ color: card.color }}
                      >
                        {card.title}
                      </h3>
                      <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-5 line-clamp-3 sm:line-clamp-none">
                        {card.body}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {card.tags.slice(0, 4).map(tag => (
                          <span
                            key={tag}
                            className="text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                            style={{
                              background: `${card.color}10`,
                              border: `1px solid ${card.color}25`,
                              color: card.color,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        {card.tags.length > 4 && (
                          <span 
                            className="text-[10px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full"
                            style={{
                              background: `${card.color}10`,
                              border: `1px solid ${card.color}25`,
                              color: card.color,
                            }}
                          >
                            +{card.tags.length - 4}
                          </span>
                        )}
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
  );
}

// ============================================================================
// Main About Page Component
// ============================================================================

export default function About(): JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ExpertiseSection />
    </div>
  );
}
