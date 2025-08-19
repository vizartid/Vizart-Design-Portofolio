
// Import statements for actual images (keeping existing ones)
import supremaMain from "/attached_assets/Screenshot 2025-07-24 140158_1753344628323.png";
import supremaHover from "/attached_assets/Screenshot 2025-07-24 140507_1753341884909.png";
import teamflowMain from "/attached_assets/Screenshot 2025-07-24 141313_1753341884907.png";
import teamflowHover from "/attached_assets/Screenshot 2025-07-24 141327_1753341884906.png";
import datavizMain from "/attached_assets/Screenshot 2025-07-24 141334_1753341884906.png";
import datavizHover from "/attached_assets/image_1753343418686.png";
import shopcraftMain from "/attached_assets/image_1753469350760.png";
import shopcraftHover from "/attached_assets/image_1753552235741.png";
import fintechMain from "/attached_assets/image_1753553037568.png";
import fintechHover from "/attached_assets/image_1753553510411.png";
import profilePhoto from "/attached_assets/profile-foto.jpg";

// Project images mapping function
const getProjectImage = (projectId: number): string => {
  const projectImages: { [key: number]: string } = {
    1: null, // Will be set later
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
    16: null,
    17: null,
    18: null,
    19: null,
    20: null,
    21: null,
  };
  
  // Return null for now, you can add images later
  return projectImages[projectId] || null;
};

// Hover images mapping function
const getProjectHoverImage = (projectId: number): string => {
  const projectHoverImages: { [key: number]: string } = {
    1: null, // Will be set later
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null,
    12: null,
    13: null,
    14: null,
    15: null,
    16: null,
    17: null,
    18: null,
    19: null,
    20: null,
    21: null,
  };
  
  // Return null for now, you can add hover images later
  return projectHoverImages[projectId] || null;
};

export const projects = [
  // UI/UX Projects
  {
    id: 1,
    title: "E-commerce Dashboard",
    description:
      "Comprehensive admin dashboard for managing online stores with real-time analytics and intuitive user interface design.",
    category: "uiux",
    imageUrl: getProjectImage(1) || supremaMain,
    hoverImageUrl: getProjectHoverImage(1) || supremaHover,
    projectUrl: "https://example.com/ecommerce-dashboard",
    featured: true,
  },
  {
    id: 2,
    title: "Banking Mobile App",
    description:
      "Modern banking application interface focused on user experience and accessibility for all age groups.",
    category: "uiux",
    imageUrl: getProjectImage(2) || profilePhoto,
    hoverImageUrl: getProjectHoverImage(2) || supremaHover,
    projectUrl: "https://example.com/banking-app",
    featured: true,
  },
  {
    id: 3,
    title: "TeamFlow",
    description: "Revolutionary collaboration platform that connects teams across different time zones.",
    category: "uiux",
    imageUrl: getProjectImage(3) || teamflowMain,
    hoverImageUrl: getProjectHoverImage(3) || teamflowHover,
    projectUrl: "https://example.com/food-delivery",
    featured: true,
  },
  {
    id: 4,
    title: "DataViz",
    description: "Advanced analytics platform that transforms complex data into actionable insights.",
    category: "uiux",
    imageUrl: getProjectImage(4) || datavizMain,
    hoverImageUrl: getProjectHoverImage(4) || datavizHover,
    projectUrl: "https://example.com/analytics-tool",
    featured: true,
  },
  {
    id: 5,
    title: "ShopCraft",
    description: "Complete e-commerce solution designed to maximize conversions.",
    category: "uiux",
    imageUrl: getProjectImage(5) || shopcraftMain,
    hoverImageUrl: getProjectHoverImage(5) || shopcraftHover,
    projectUrl: "https://example.com/healthcare-portal",
    featured: true,
  },
  {
    id: 6,
    title: "FinTech Pro",
    description: "Modern financial dashboard with real-time analytics and secure transactions.",
    category: "uiux",
    imageUrl: getProjectImage(6) || fintechMain,
    hoverImageUrl: getProjectHoverImage(6) || fintechHover,
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
    imageUrl: getProjectImage(7) || profilePhoto,
    hoverImageUrl: getProjectHoverImage(7) || supremaHover,
    projectUrl: "https://example.com/tech-startup",
    featured: false,
  },
  {
    id: 8,
    title: "Coffee Shop Rebrand",
    description:
      "Brand transformation for local coffee shop chain with focus on modern and approachable aesthetic.",
    category: "branding",
    imageUrl: getProjectImage(8) || teamflowMain,
    hoverImageUrl: getProjectHoverImage(8) || teamflowHover,
    projectUrl: "https://example.com/coffee-shop",
    featured: false,
  },
  {
    id: 9,
    title: "Fitness Brand Design",
    description:
      "Dynamic brand identity for fitness company emphasizing energy, movement, and motivation.",
    category: "branding",
    imageUrl: getProjectImage(9) || datavizMain,
    hoverImageUrl: getProjectHoverImage(9) || datavizHover,
    projectUrl: "https://example.com/fitness-brand",
    featured: false,
  },
  {
    id: 10,
    title: "Luxury Hotel Brand",
    description:
      "Sophisticated brand identity for luxury hotel chain focusing on elegance and premium experience.",
    category: "branding",
    imageUrl: getProjectImage(10) || shopcraftMain,
    hoverImageUrl: getProjectHoverImage(10) || shopcraftHover,
    projectUrl: "https://example.com/luxury-hotel",
    featured: false,
  },
  {
    id: 11,
    title: "Educational Platform Brand",
    description:
      "Friendly and approachable brand design for online learning platform targeting young professionals.",
    category: "branding",
    imageUrl: getProjectImage(11) || fintechMain,
    hoverImageUrl: getProjectHoverImage(11) || fintechHover,
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
    imageUrl: getProjectImage(12) || supremaMain,
    hoverImageUrl: getProjectHoverImage(12) || supremaHover,
    projectUrl: "https://example.com/travel-app",
    featured: false,
  },
  {
    id: 13,
    title: "Fitness Tracking App",
    description:
      "Comprehensive fitness application with workout tracking, nutrition planning, and progress monitoring.",
    category: "mobileapp",
    imageUrl: getProjectImage(13) || teamflowMain,
    hoverImageUrl: getProjectHoverImage(13) || teamflowHover,
    projectUrl: "https://example.com/fitness-app",
    featured: false,
  },
  {
    id: 14,
    title: "Social Media App",
    description:
      "Community-focused social platform with emphasis on meaningful connections and content sharing.",
    category: "mobileapp",
    imageUrl: getProjectImage(14) || datavizMain,
    hoverImageUrl: getProjectHoverImage(14) || datavizHover,
    projectUrl: "https://example.com/social-app",
    featured: false,
  },
  {
    id: 15,
    title: "Budget Management App",
    description:
      "Personal finance app helping users track expenses, set budgets, and achieve financial goals.",
    category: "mobileapp",
    imageUrl: getProjectImage(15) || shopcraftMain,
    hoverImageUrl: getProjectHoverImage(15) || shopcraftHover,
    projectUrl: "https://example.com/budget-app",
    featured: false,
  },
  {
    id: 16,
    title: "Recipe Discovery App",
    description:
      "Culinary app for discovering new recipes, meal planning, and cooking guidance with video tutorials.",
    category: "mobileapp",
    imageUrl: getProjectImage(16) || fintechMain,
    hoverImageUrl: getProjectHoverImage(16) || fintechHover,
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
    imageUrl: getProjectImage(17) || profilePhoto,
    hoverImageUrl: getProjectHoverImage(17) || supremaHover,
    projectUrl: "https://example.com/project-management",
    featured: false,
  },
  {
    id: 18,
    title: "Video Editing Suite",
    description:
      "Professional video editing software with intuitive interface and powerful editing capabilities.",
    category: "desktop",
    imageUrl: getProjectImage(18) || teamflowMain,
    hoverImageUrl: getProjectHoverImage(18) || teamflowHover,
    projectUrl: "https://example.com/video-editor",
    featured: false,
  },
  {
    id: 19,
    title: "Design Tool Interface",
    description:
      "Desktop design application with focus on user workflow and creative process optimization.",
    category: "desktop",
    imageUrl: getProjectImage(19) || datavizMain,
    hoverImageUrl: getProjectHoverImage(19) || datavizHover,
    projectUrl: "https://example.com/design-tool",
    featured: false,
  },
  {
    id: 20,
    title: "CRM Desktop App",
    description:
      "Customer relationship management software with comprehensive client tracking and communication tools.",
    category: "desktop",
    imageUrl: getProjectImage(20) || shopcraftMain,
    hoverImageUrl: getProjectHoverImage(20) || shopcraftHover,
    projectUrl: "https://example.com/crm-app",
    featured: false,
  },
  {
    id: 21,
    title: "Code Editor Interface",
    description:
      "Modern code editor with syntax highlighting, plugin support, and developer-focused features.",
    category: "desktop",
    imageUrl: getProjectImage(21) || fintechMain,
    hoverImageUrl: getProjectHoverImage(21) || fintechHover,
    projectUrl: "https://example.com/code-editor",
    featured: false,
  },
];
