import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

// ============================================================================
// Types & Interfaces
// ============================================================================

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  projectUrl?: string;
}

interface WorksPageData {
  title: string;
  subtitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  projects: Project[];
}

interface Category {
  id: string;
  label: string;
}

// ============================================================================
// Constants
// ============================================================================

const CATEGORIES: Category[] = [
  { id: "uiux", label: "UI/UX" },
  { id: "branding", label: "Logo & Branding" },
  { id: "websites", label: "Website" },
  { id: "mobileapp", label: "Mobile App" },
  { id: "desktop", label: "Desktop Design" },
];

const DEFAULT_WORKS_DATA: WorksPageData = {
  title: "Showcase of My Best Works",
  subtitle: "Explore our carefully curated portfolio of successful projects that demonstrate our expertise and creativity.",
  ctaTitle: "Let's Create Something Amazing Together",
  ctaDescription: "Ready to join our portfolio of successful projects? Let's discuss how we can bring your vision to life.",
  ctaButtonText: "Start Your Project",
  projects: [],
};

// ============================================================================
// Custom Hooks
// ============================================================================

function useWorksData(): WorksPageData {
  const [worksData, setWorksData] = useState<WorksPageData>(DEFAULT_WORKS_DATA);

  useEffect(() => {
    // Load works data from localStorage
    const savedData = localStorage.getItem("worksPageData");
    if (savedData) {
      try {
        setWorksData(JSON.parse(savedData));
      } catch {
        // Keep default data if parsing fails
      }
    }

    // Listen for works data changes
    const handleWorksDataChange = (event: CustomEvent<{ worksData: WorksPageData }>) => {
      setWorksData(event.detail.worksData);

      // Sync with heroSectionsShowcase when works data changes
      if (event.detail.worksData?.projects?.length > 0) {
        updateHeroShowcase(event.detail.worksData.projects);
      }
    };

    window.addEventListener("worksDataChanged", handleWorksDataChange as EventListener);

    return () => {
      window.removeEventListener("worksDataChanged", handleWorksDataChange as EventListener);
    };
  }, []);

  return worksData;
}

// ============================================================================
// Utility Functions
// ============================================================================

function updateHeroShowcase(projectsData: Project[]): void {
  try {
    const contentData = JSON.parse(localStorage.getItem("contentData") || "{}");

    // Map project data to hero showcase images
    const heroImages = projectsData.slice(0, 8).map((project) => ({
      url: project.imageUrl || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300`,
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
      })
    );
  } catch (error) {
    console.error("Error syncing with hero showcase:", error);
  }
}

// ============================================================================
// Hero Section Component
// ============================================================================

function HeroSection(): JSX.Element {
  return (
    <section className="pt-20 sm:pt-28 lg:pt-40 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-6 sm:mb-8 lg:mb-12 px-2 sm:px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-instrument font-medium text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] mb-3 sm:mb-4 leading-tight">
            Showcase of My{" "}
            <br className="hidden sm:block" />
            <span style={{ color: "#182baf" }}>Best Works</span>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// Category Filter Component
// ============================================================================

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps): JSX.Element {
  return (
    <motion.div
      className="flex justify-center mb-6 sm:mb-8 lg:mb-12 px-2 sm:px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div
        className="rounded-lg sm:rounded-xl p-1 inline-flex flex-wrap justify-center gap-1 text-xs sm:text-sm lg:text-base"
        style={{ backgroundColor: "#e6e6e6" }}
      >
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`px-2.5 py-1.5 sm:px-4 sm:py-2 lg:px-6 lg:py-2 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-xs sm:text-sm lg:text-base whitespace-nowrap ${
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
  );
}

// ============================================================================
// Project Card Component
// ============================================================================

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps): JSX.Element {
  const handleOpenProject = () => {
    window.open(project.projectUrl || "#", "_blank");
  };

  return (
    <motion.div
      className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="md:order-1">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content Section */}
        <div className="md:order-2 p-4 sm:p-5 lg:p-6 flex flex-col justify-between">
          <div>
            <h2 className="font-instrument font-semibold mb-2 sm:mb-3 lg:mb-4 text-lg sm:text-xl lg:text-2xl text-gray-900 leading-tight">
              {project.title}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4 sm:mb-5 lg:mb-6 text-sm sm:text-base line-clamp-3 sm:line-clamp-none">
              {project.description}
            </p>
          </div>
          <div className="mt-auto">
            <button
              onClick={handleOpenProject}
              className="w-full bg-gray-100 text-gray-900 py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl font-medium border border-gray-200 text-sm sm:text-base transition-colors hover:bg-gray-200 active:bg-gray-300"
            >
              Open Website
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// Project Grid Component
// ============================================================================

interface ProjectGridProps {
  projects: Project[];
}

function ProjectGrid({ projects }: ProjectGridProps): JSX.Element {
  return (
    <section className="pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </AnimatePresence>

        {/* Empty State */}
        {projects.length === 0 && (
          <motion.div
            className="text-center py-12 sm:py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-500 text-sm sm:text-base">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// Main Works Page Component
// ============================================================================

export default function Works(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState("uiux");
  const worksData = useWorksData();

  // Use custom projects if available, otherwise fallback to default
  const allProjects = worksData.projects.length > 0 ? worksData.projects : projects;

  const filteredProjects = useMemo(() => {
    return allProjects.filter((project) => project.category === activeCategory);
  }, [activeCategory, allProjects]);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ProjectGrid projects={filteredProjects} />
    </div>
  );
}
