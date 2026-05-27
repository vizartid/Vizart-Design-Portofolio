import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import InfiniteMarquee from '@/components/InfiniteMarquee';
import MagicBento from '@/components/MagicBento';
import Footer from '@/components/footer';
import {
  SiReact, SiNextdotjs, SiTypescript, SiPython, SiDocker,
  SiKubernetes, SiTensorflow, SiGithub, SiLinkedin,
} from 'react-icons/si';
import { Mail, MapPin, ExternalLink } from 'lucide-react';

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

      {/* Scroll Stack / Infinite Marquee — Roles */}
      <section className="py-8 bg-gray-50 border-y border-gray-100 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-2 px-4">
            <p className="text-sm font-semibold tracking-widest uppercase text-gray-400">
              What I Do
            </p>
          </div>
          <InfiniteMarquee />
        </motion.div>
      </section>

      {/* Magic Bento — Portfolio Showcase */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-blue-500 mb-3 border border-blue-200 px-4 py-1.5 rounded-full bg-blue-50">
            Portfolio
          </span>
          <h2 className="font-instrument text-4xl sm:text-5xl font-light text-gray-900 mt-4">
            Selected Projects
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            A curated showcase of the work I'm most proud of — spanning AI, fullstack, DevOps, and design.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bento-section-wrapper" style={{ padding: '24px 0' }}>
            <MagicBento
              textAutoHide={false}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={350}
              particleCount={10}
              glowColor="132, 0, 255"
            />
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
