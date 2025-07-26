import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { WorksVisualEditor } from "@/components/works-visual-editor";
import { projects } from "@/data/projects";

const categories = [
  { id: "all", label: "All Works" },
  { id: "website", label: "Websites" },
  { id: "branding", label: "Branding" },
  { id: "app", label: "Mobile App" },
  { id: "ecommerce", label: "E-commerce" },
];

interface WorksPageData {
  title: string;
  subtitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  projects: any[];
}

const DEFAULT_WORKS_DATA: WorksPageData = {
  title: "Showcase of Our Best Works",
  subtitle: "Explore our carefully curated portfolio of successful projects that demonstrate our expertise and creativity.",
  ctaTitle: "Let's Create Something Amazing Together",
  ctaDescription: "Ready to join our portfolio of successful projects? Let's discuss how we can bring your vision to life.",
  ctaButtonText: "Start Your Project",
  projects: []
};

export default function Works() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [worksData, setWorksData] = useState<WorksPageData>(DEFAULT_WORKS_DATA);

  useEffect(() => {
    // Load works data dari localStorage
    const savedData = localStorage.getItem('worksPageData');
    if (savedData) {
      setWorksData(JSON.parse(savedData));
    }

    // Listen untuk perubahan works data
    const handleWorksDataChange = (event: CustomEvent) => {
      setWorksData(event.detail.worksData);
    };

    window.addEventListener('worksDataChanged', handleWorksDataChange as EventListener);
    
    return () => {
      window.removeEventListener('worksDataChanged', handleWorksDataChange as EventListener);
    };
  }, []);

  // Use custom projects if available, otherwise fallback to default
  const allProjects = worksData.projects.length > 0 ? worksData.projects : projects;
  
  const filteredProjects =
    activeCategory === "all"
      ? allProjects
      : allProjects.filter((project) => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-bone-white">
      <WorksVisualEditor />
      <Navbar />
      {/* Works Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-instrument sm:text-5xl lg:desktop-text-6xl mb-6 font-light text-[80px]">
              {worksData.title.split(' ').map((word, index) => (
                <span key={index}>
                  {word === 'Best' ? <span className="text-electric-blue">{word}</span> : word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-lg lg:desktop-text-xl text-gray-600 max-w-2xl mx-auto">
              {worksData.subtitle}
            </p>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            className="flex justify-center mb-12 ml-[10px] mr-[10px] text-left pl-[0px] pr-[0px] pt-[0px] pb-[0px] text-[18px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-light-gray rounded-md p-1 inline-flex">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? "bg-white shadow-sm text-charcoal"
                      : "text-gray-600 hover:text-charcoal"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* Project Grid */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? "" : "lg:grid-flow-col-dense"
                  }`}
                >
                  <div
                    className={index % 2 === 0 ? "lg:order-1" : "lg:order-2"}
                  >
                    <motion.img
                      src={project.imageUrl}
                      alt={`${project.title} website design`}
                      className="w-full rounded-xl shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div
                    className={index % 2 === 0 ? "lg:order-2" : "lg:order-1"}
                  >
                    <h3 className="font-poppins font-semibold text-2xl mb-4">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {project.description}
                    </p>
                    {project.longDescription && (
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {project.longDescription}
                      </p>
                    )}
                    <button 
                      onClick={() => window.open(project.projectUrl || '#', '_blank')}
                      className="bg-charcoal text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors duration-200"
                    >
                      {project.category === "branding"
                        ? "View Brand Guide"
                        : "Open Website"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
      {/* Works Final CTA */}
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-instrument text-3xl sm:text-4xl lg:text-5xl mb-6">
            {worksData.ctaTitle}
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            {worksData.ctaDescription}
          </p>
          <button className="bg-charcoal text-white px-8 py-4 rounded-md font-medium text-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-3 mx-auto">
            <img
              src="/profile-foto.png"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span>{worksData.ctaButtonText}</span>
          </button>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
}
