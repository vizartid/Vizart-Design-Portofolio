
const content = {
  branding: {
    logoUrl: "/logo-vizart.png",
    logoText: "Vizart"
  },
  hero: {
    title: "Delivering Standout",
    titleHighlight: "Digital Creations", 
    subtitle: "Through Seamless Partnership",
    stats: "Trusted by 50+ clients worldwide with 200+ successful projects delivered",
    ctaText: "Let's Work Together",
    acceptingText: "Accepting new projects for 2025",
    toolsText: "Tools and technologies I use to bring your vision to life",
    tools: []
  },
  winningEdge: {
    title: "My Digital Edge",
    subtitle: "Discover how my diverse expertise can bring your digital solutions.",
    features: [
      {
        title: "Full-Spectrum Digital",
        description: "I provide comprehensive digital services, from UI/UX & brand design to web development and network optimization. All work is delivered with a strong focus on achieving the best results for you.",
        icon: "Globe",
        color: "blue-500"
      },
      {
        title: "User-Centric Design", 
        description: "I create designs that are not only visually appealing but also user-friendly and brand-strengthening. This ensures your digital presence is memorable and resonates with your audience.",
        icon: "Target",
        color: "orange-500"
      },
      {
        title: "Robust Development & Infrastructure",
        description: "I build responsive, secure, and high-performance websites. Combined with network engineering expertise, I ensure your digital foundation is solid and scalable for future growth.",
        icon: "Cloud",
        color: "green-500"
      },
      {
        title: "Fast & Collaborative Workflow",
        description: "Using agile methods, I involve you every step of the way. Open communication ensures projects are completed on time with top-notch quality.",
        icon: "Rocket", 
        color: "purple-500"
      }
    ]
  },
  heroSectionsShowcase: {
    title: "Hero Sections\nShowcase",
    subtitle: "• Conversion-focused design\n• Mobile-first approach\n• A/B tested layouts",
    description: "Every section we design is meticulously crafted to capture your brand essence while maximizing conversion rates.",
    images: [
      {
        url: "/backgound-wave.jpg",
        hoverUrl: "/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg",
        alt: "E-commerce hero section design with conversion focus",
        overlay: "E-commerce Focus"
      },
      {
        url: "/backgound-wave.jpg", 
        hoverUrl: "/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg",
        alt: "SaaS landing page hero with product showcase",
        overlay: "SaaS Landing"
      },
      {
        url: "/backgound-wave.jpg",
        hoverUrl: "/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg", 
        alt: "Creative portfolio hero section",
        overlay: "Portfolio Design"
      },
      {
        url: "/backgound-wave.jpg",
        hoverUrl: "/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg",
        alt: "Professional agency hero section", 
        overlay: "Agency Landing"
      }
    ]
  },
  process: {
    title: "Our Workflow",
    subtitle: "A streamlined process that ensures quality results every time",
    steps: [
      {
        id: "discovery",
        icon: "Lightbulb", 
        title: "Discovery & Planning",
        description: "We start by understanding your business goals and target audience to create a comprehensive project roadmap."
      },
      {
        id: "design",
        icon: "Palette",
        title: "Design & Prototyping", 
        description: "Creating wireframes and high-fidelity designs that align with your brand and user expectations."
      },
      {
        id: "development",
        icon: "Code",
        title: "Development & Testing",
        description: "Building your solution with clean, scalable code and thorough testing across all devices."
      },
      {
        id: "launch",
        icon: "Rocket",
        title: "Launch & Support",
        description: "Deploying your project and providing ongoing support to ensure continued success."
      }
    ]
  },
  services: {
    title: "What I Do Best",
    services: [],
    bottomText: "Ready to bring your vision to life?",
    features: []
  },
  testimonials: {
    title: "Client Success Stories",
    subtitle: "What my clients say about working with me"
  },
  faq: {
    title: "Frequently Asked Questions",
    questions: []
  },
  finalCta: {
    title: "Ready to Get Started?",
    description: "Let's discuss your project and bring your vision to life."
  },
  works: {
    title: "My Work",
    subtitle: "Selected projects showcasing my expertise"
  },
  projects: [],
  footer: {
    logoUrl: "/logo-vizart.png",
    logoText: "Vizart"
  }
};

exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api', '') || '/';

    if (path === '/content' || path === '/') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(content),
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    };
  }
};
