import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/footer";
import { WorksVisualEditor } from "@/components/works-visual-editor";
import { projects } from "@/data/projects";

import profile_foto from "@assets/profile-foto.jpg";

const categories = [
  { id: "all", label: "All Works" },
  { id: "uiux", label: "UI/UX" },
  { id: "branding", label: "Branding" },
  { id: "mobileapp", label: "Mobile App" },
  { id: "desktop", label: "Desktop Design" },
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
  title: "Showcase of My Best Works",
  subtitle:
    "Explore our carefully curated portfolio of successful projects that demonstrate our expertise and creativity.",
  ctaTitle: "Let's Create Something Amazing Together",
  ctaDescription:
    "Ready to join our portfolio of successful projects? Let's discuss how we can bring your vision to life.",
  ctaButtonText: "Start Your Project",
  projects: [],
};

export default function Works() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [worksData, setWorksData] = useState<WorksPageData>(DEFAULT_WORKS_DATA);

  useEffect(() => {
    // Load works data dari localStorage
    const savedData = localStorage.getItem("worksPageData");
    if (savedData) {
      setWorksData(JSON.parse(savedData));
    }

    // Listen untuk perubahan works data
    const handleWorksDataChange = (event: CustomEvent) => {
      setWorksData(event.detail.worksData);
      
      // Sync with heroSectionsShowcase when works data changes
      if (event.detail.worksData && event.detail.worksData.projects.length > 0) {
        updateHeroShowcase(event.detail.worksData.projects);
      }
    };

    window.addEventListener(
      "worksDataChanged",
      handleWorksDataChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        "worksDataChanged",
        handleWorksDataChange as EventListener,
      );
    };
  }, []);

  // Function to sync works data with hero showcase
  const updateHeroShowcase = (projectsData: any[]) => {
    try {
      const contentData = JSON.parse(localStorage.getItem("contentData") || "{}");
      
      // Map project data to hero showcase images
      const heroImages = projectsData.slice(0, 8).map((project, index) => ({
        url: project.imageUrl || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300`,
        alt: project.description || `${project.title} project showcase`,
        overlay: project.category?.toUpperCase() || "Project"
      }));
      
      // Update hero sections showcase
      const updatedContent = {
        ...contentData,
        heroSectionsShowcase: {
          ...contentData.heroSectionsShowcase,
          images: heroImages
        }
      };
      
      localStorage.setItem("contentData", JSON.stringify(updatedContent));
      
      // Dispatch event to notify hero showcase of changes
      window.dispatchEvent(new CustomEvent("contentDataChanged", {
        detail: { contentData: updatedContent }
      }));
    } catch (error) {
      console.error("Error syncing with hero showcase:", error);
    }
  };

  // Use custom projects if available, otherwise fallback to default
  const allProjects =
    worksData.projects.length > 0 ? worksData.projects : projects;

  const filteredProjects =
    activeCategory === "all"
      ? allProjects
      : allProjects.filter((project) => project.category === activeCategory);

  return (
    <div>
      <WorksVisualEditor />
      {/* Works Hero Section */}
      <section className="pt-40 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-instrument custom-about-title mb-4 font-medium text-[80px]">
              Showcase of My <br />
              <span style={{ color: "#182baf" }}>Best Works</span>
            </h1>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            className="flex justify-center mb-12 ml-[10px] mr-[10px] text-left pl-[0px] pr-[0px] pt-[0px] pb-[0px] text-[18px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="rounded-xl p-1 inline-flex"
              style={{ backgroundColor: "#e6e6e6" }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
                    activeCategory === category.id
                      ? "bg-white shadow-sm text-charcoal"
                      : "text-gray-600 hover:text-charcoal hover:bg-white/50"
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
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <div className="space-y-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Image Section - Always on Left */}
                    <div className="md:order-1">
                      <div className="aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10" />
                        <div className="absolute inset-0 flex items-center justify-center p-4">
                          {/* Multiple mock screenshots like in reference */}
                          <div className="grid grid-cols-2 gap-2 w-full max-w-xs">
                            <div className="bg-gray-800 rounded-lg p-2 h-20">
                              <div className="bg-gray-700 rounded h-1.5 w-3/4 mb-1.5"></div>
                              <div className="bg-gray-600 rounded h-1 w-full mb-1"></div>
                              <div className="bg-gray-600 rounded h-1 w-2/3"></div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-lg p-2 h-20 shadow-sm">
                              <div className="bg-gray-200 rounded h-1.5 w-3/4 mb-1.5"></div>
                              <div className="bg-gray-100 rounded h-1 w-full mb-1"></div>
                              <div className="bg-gray-100 rounded h-1 w-2/3"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section - Always on Right */}
                    <div className="md:order-2 p-4 flex flex-col justify-between">
                      <div>
                        <h3 className="font-instrument font-semibold mb-2 text-lg text-gray-900">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-3 text-sm">
                          {project.description}
                        </p>
                      </div>
                      <div className="mt-auto">
                        <button
                          onClick={() =>
                            window.open(project.projectUrl || "#", "_blank")
                          }
                          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded-xl font-medium transition-all duration-200 border border-gray-200 text-sm"
                        >
                          Open Website
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
              src={profile_foto}
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
