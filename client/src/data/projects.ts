// Project images mapping function
const getProjectImage = (projectId: number): string => {
  const projectImages: { [key: number]: string } = {
    1: "/backgound-wave.jpg", // E-commerce Dashboard
    2: "/backgound-wave.jpg", // Banking Mobile App
    3: "/backgound-wave.jpg", // TeamFlow
    4: "/backgound-wave.jpg", // DataViz
    5: "/backgound-wave.jpg", // ShopCraft
    6: "/backgound-wave.jpg", // FinTech Pro
    7: "/backgound-wave.jpg", // Tech Startup Identity
    8: "/backgound-wave.jpg", // Coffee Shop Rebrand
    9: "/backgound-wave.jpg", // Fitness Brand Design
    10: "/public/Vortexa.png", // Vortexa
    11: "/backgound-wave.jpg", // Vizart
    12: "/backgound-wave.jpg", // Vizziz
    13: "/backgound-wave.jpg", // Vixoo
    14: "/backgound-wave.jpg", // Social Media App
    15: "/backgound-wave.jpg", // Budget Management App
    16: "/backgound-wave.jpg", // Recipe Discovery App
    17: "/backgound-wave.jpg", // Project Management Software
    18: "/backgound-wave.jpg", // Video Editing Suite
    19: "/backgound-wave.jpg", // Design Tool Interface
    20: "/backgound-wave.jpg", // CRM Desktop App
    21: "/backgound-wave.jpg", // Code Editor Interface
    22: "/backgound-wave.jpg", // Restaurant Landing Page
    23: "/backgound-wave.jpg", // Portfolio Website
    24: "/backgound-wave.jpg", // Real Estate Platform
    25: "/backgound-wave.jpg", // News & Blog Website
    26: "/backgound-wave.jpg", // Fitness Studio Website
  };

  return projectImages[projectId] || "/backgound-wave.jpg";
};

export const projects = [
  // UI/UX Projects
  {
    id: 1,
    title: "E-commerce Dashboard",
    description:
      "Comprehensive admin dashboard for managing online stores with real-time analytics and intuitive user interface design.",
    category: "uiux",
    imageUrl: getProjectImage(1),
    projectUrl: "https://example.com/ecommerce-dashboard",
    featured: true,
  },
  {
    id: 2,
    title: "Banking Mobile App",
    description:
      "Modern banking application interface focused on user experience and accessibility for all age groups.",
    category: "uiux",
    imageUrl: getProjectImage(2),
    projectUrl: "https://example.com/banking-app",
    featured: true,
  },
  {
    id: 3,
    title: "TeamFlow",
    description:
      "Revolutionary collaboration platform that connects teams across different time zones.",
    category: "uiux",
    imageUrl: getProjectImage(3),
    projectUrl: "https://example.com/food-delivery",
    featured: true,
  },
  {
    id: 4,
    title: "DataViz",
    description:
      "Advanced analytics platform that transforms complex data into actionable insights.",
    category: "uiux",
    imageUrl: getProjectImage(4),
    projectUrl: "https://example.com/analytics-tool",
    featured: true,
  },
  {
    id: 5,
    title: "ShopCraft",
    description:
      "Complete e-commerce solution designed to maximize conversions.",
    category: "uiux",
    imageUrl: getProjectImage(5),
    projectUrl: "https://example.com/healthcare-portal",
    featured: true,
  },
  {
    id: 6,
    title: "FinTech Pro",
    description:
      "Modern financial dashboard with real-time analytics and secure transactions.",
    category: "uiux",
    imageUrl: getProjectImage(6),
    projectUrl: "https://example.com/fintech-pro",
    featured: true,
  },

  // Branding Projects
  {
    id: 7,
    title: "Tech Startup Identity",
    description:
      "Complete brand identity design for innovative tech startup including logo, typography, and brand guidelines.",
    category: "branding",
    imageUrl: getProjectImage(7),
    projectUrl: "https://example.com/tech-startup",
    featured: false,
  },
  {
    id: 8,
    title: "Coffee Shop Rebrand",
    description:
      "Brand transformation for local coffee shop chain with focus on modern and approachable aesthetic.",
    category: "branding",
    imageUrl: getProjectImage(8),
    projectUrl: "https://example.com/coffee-shop",
    featured: false,
  },
  {
    id: 9,
    title: "Fitness Brand Design",
    description:
      "Dynamic brand identity for fitness company emphasizing energy, movement, and motivation.",
    category: "branding",
    imageUrl: getProjectImage(9),
    projectUrl: "https://example.com/fitness-brand",
    featured: false,
  },
  {
    id: 10,
    title: "Luxury Hotel Brand",
    description:
      "Sophisticated brand identity for luxury hotel chain focusing on elegance and premium experience.",
    category: "branding",
    imageUrl: getProjectImage(10),
    projectUrl: "https://example.com/luxury-hotel",
    featured: false,
  },
  {
    id: 11,
    title: "Educational Platform Brand",
    description:
      "Friendly and approachable brand design for online learning platform targeting young professionals.",
    category: "branding",
    imageUrl: getProjectImage(11),
    projectUrl: "https://example.com/education-platform",
    featured: false,
  },

  // Mobile App Projects
  {
    id: 12,
    title: "Travel Companion App",
    description:
      "Mobile application for travelers with offline maps, itinerary planning, and local recommendations.",
    category: "mobileapp",
    imageUrl: getProjectImage(12),
    projectUrl: "https://example.com/travel-app",
    featured: false,
  },
  {
    id: 13,
    title: "Fitness Tracking App",
    description:
      "Comprehensive fitness application with workout tracking, nutrition planning, and progress monitoring.",
    category: "mobileapp",
    imageUrl: getProjectImage(13),
    projectUrl: "https://example.com/fitness-app",
    featured: false,
  },
  {
    id: 14,
    title: "Social Media App",
    description:
      "Community-focused social platform with emphasis on meaningful connections and content sharing.",
    category: "mobileapp",
    imageUrl: getProjectImage(14),
    projectUrl: "https://example.com/social-app",
    featured: false,
  },
  {
    id: 15,
    title: "Budget Management App",
    description:
      "Personal finance app helping users track expenses, set budgets, and achieve financial goals.",
    category: "mobileapp",
    imageUrl: getProjectImage(15),
    projectUrl: "https://example.com/budget-app",
    featured: false,
  },
  {
    id: 16,
    title: "Recipe Discovery App",
    description:
      "Culinary app for discovering new recipes, meal planning, and cooking guidance with video tutorials.",
    category: "mobileapp",
    imageUrl: getProjectImage(16),
    projectUrl: "https://example.com/recipe-app",
    featured: false,
  },

  // Desktop Design Projects
  {
    id: 17,
    title: "Project Management Software",
    description:
      "Desktop application for team collaboration and project tracking with advanced workflow management.",
    category: "desktop",
    imageUrl: getProjectImage(17),
    projectUrl: "https://example.com/project-management",
    featured: false,
  },
  {
    id: 18,
    title: "Video Editing Suite",
    description:
      "Professional video editing software with intuitive interface and powerful editing capabilities.",
    category: "desktop",
    imageUrl: getProjectImage(18),
    projectUrl: "https://example.com/video-editor",
    featured: false,
  },
  {
    id: 19,
    title: "Design Tool Interface",
    description:
      "Desktop design application with focus on user workflow and creative process optimization.",
    category: "desktop",
    imageUrl: getProjectImage(19),
    projectUrl: "https://example.com/design-tool",
    featured: false,
  },
  {
    id: 20,
    title: "CRM Desktop App",
    description:
      "Customer relationship management software with comprehensive client tracking and communication tools.",
    category: "desktop",
    imageUrl: getProjectImage(20),
    projectUrl: "https://example.com/crm-app",
    featured: false,
  },
  {
    id: 21,
    title: "Code Editor Interface",
    description:
      "Modern code editor with syntax highlighting, plugin support, and developer-focused features.",
    category: "desktop",
    imageUrl: getProjectImage(21),
    projectUrl: "https://example.com/code-editor",
    featured: false,
  },
  // Website Projects
  {
    id: 7,
    title: "Vortexa",
    description:
      "Professional corporate website with modern design, content management system, and SEO optimization.",
    category: "websites",
    imageUrl: getProjectImage(10),
    projectUrl: "https://example.com/corporate-site",
    featured: true,
  },
  {
    id: 8,
    title: "E-learning Platform",
    description:
      "Comprehensive online learning platform with video streaming, progress tracking, and interactive quizzes.",
    category: "websites",
    imageUrl: getProjectImage(11),
    projectUrl: "https://example.com/elearning",
    featured: false,
  },
  {
    id: 22,
    title: "Restaurant Landing Page",
    description:
      "Modern restaurant website with online menu, reservation system, and responsive design for all devices.",
    category: "websites",
    imageUrl: getProjectImage(12),
    projectUrl: "https://example.com/restaurant",
    featured: true,
  },
  {
    id: 23,
    title: "Portfolio Website",
    description:
      "Creative portfolio website for artists and designers with gallery showcase and contact integration.",
    category: "websites",
    imageUrl: getProjectImage(23),
    projectUrl: "https://example.com/portfolio",
    featured: false,
  },
  {
    id: 24,
    title: "Real Estate Platform",
    description:
      "Comprehensive real estate website with property listings, search filters, and virtual tour integration.",
    category: "websites",
    imageUrl: getProjectImage(24),
    projectUrl: "https://example.com/realestate",
    featured: true,
  },
  {
    id: 25,
    title: "News & Blog Website",
    description:
      "Dynamic news website with article management, category filtering, and social media integration.",
    category: "websites",
    imageUrl: getProjectImage(25),
    projectUrl: "https://example.com/news-blog",
    featured: false,
  },
  {
    id: 26,
    title: "Fitness Studio Website",
    description:
      "Modern fitness studio website with class schedules, trainer profiles, and online booking system.",
    category: "websites",
    imageUrl: getProjectImage(26),
    projectUrl: "https://example.com/fitness",
    featured: true,
  },
];
