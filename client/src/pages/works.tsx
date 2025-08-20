import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/components/footer";
import { projects } from "@/data/projects";

const profile_foto = "/profile-foto.jpg";

const b48f5cac_0dd9_4e94_b48a_682921628c0b = "/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg";

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
      if (
        event.detail.worksData &&
        event.detail.worksData.projects.length > 0
      ) {
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
      const contentData = JSON.parse(
        localStorage.getItem("contentData") || "{}",
      );

      // Map project data to hero showcase images
      const heroImages = projectsData.slice(0, 8).map((project, index) => ({
        url:
          project.imageUrl ||
          `https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300`,
        alt: project.description || `${project.title} project showcase`,
        overlay: project.category?.toUpperCase() || "Project",
      }));

      // Update hero sections showcase
      const updatedContent = {
        ...contentData,
        heroSectionsShowcase: {
          ...contentData.heroSectionsShowcase,
          images: heroImages,
        },
      };

      localStorage.setItem("contentData", JSON.stringify(updatedContent));

      // Dispatch event to notify hero showcase of changes
      window.dispatchEvent(
        new CustomEvent("contentDataChanged", {
          detail: { contentData: updatedContent },
        }),
      );
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
      {/* Works Hero Section */}
      <section className="pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-instrument font-medium text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] mb-4 leading-tight">
              Showcase of My <br />
              <span style={{ color: "#182baf" }}>Best Works</span>
            </h1>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            className="flex justify-center mb-8 sm:mb-10 lg:mb-12 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div
              className="rounded-xl p-1 inline-flex text-sm sm:text-base lg:text-lg"
              style={{ backgroundColor: "#e6e6e6" }}
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-3 py-2 sm:px-4 sm:py-2 lg:px-6 lg:py-2 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
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
      <section className="pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <div className="space-y-6 sm:space-y-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Image Section - Always on Left */}
                    <div className="md:order-1">
                      <div className="aspect-[4/3] overflow-hidden rounded-lg">
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Content Section - Always on Right */}
                    <div className="md:order-2 p-4 sm:p-6 flex flex-col justify-between">
                      <div>
                        <h2 className="font-instrument font-semibold mb-3 sm:mb-4 text-xl sm:text-2xl lg:text-2xl text-gray-900 leading-tight">
                          {project.title}
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg">
                          {project.description}
                        </p>
                      </div>
                      <div className="mt-auto">
                        <button
                          onClick={() =>
                            window.open(project.projectUrl || "#", "_blank")
                          }
                          className="w-full bg-gray-100 text-gray-900 py-3 sm:py-2 px-4 rounded-xl font-medium border border-gray-200 text-sm sm:text-base transition-colors hover:bg-gray-200"
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
        className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-instrument text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-6 leading-tight px-2">
            {worksData.ctaTitle}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            {worksData.ctaDescription}
          </p>
          <button className="bg-charcoal text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-medium text-base sm:text-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-3 mx-auto">
            <img
              src={b48f5cac_0dd9_4e94_b48a_682921628c0b}
              alt="Profile"
              className="w-6 sm:w-8 h-6 sm:h-8 rounded-full object-cover"
            />
            <span>{worksData.ctaButtonText}</span>
          </button>
        </div>
      </motion.section>
      <Footer />
    </div>
  );
}
