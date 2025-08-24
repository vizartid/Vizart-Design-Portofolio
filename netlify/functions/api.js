
const express = require('express');
const serverless = require('serverless-http');
const path = require('path');

const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Complete content data
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
    images: [
      {
        url: "/image_1755575578878.png",
        hoverUrl: "/image_1755575628697.png",
        alt: "Hero Section 1",
        overlay: "E-Commerce"
      },
      {
        url: "/Screenshot 2025-08-19 105331_1755575639122.png",
        hoverUrl: "/image_1755570735915.png",
        alt: "Hero Section 2",
        overlay: "SaaS Platform"
      },
      {
        url: "/image_1755570924945.png",
        hoverUrl: "/image_1755571308106.png",
        alt: "Hero Section 3",
        overlay: "Analytics"
      },
      {
        url: "/image_1755572514238.png",
        hoverUrl: "/image_1755574672785.png",
        alt: "Hero Section 4",
        overlay: "Portfolio"
      }
    ]
  },
  services: {
    title: "Our Services",
    subtitle: "Comprehensive digital solutions tailored to your business needs",
    servicesList: [
      {
        title: "UI/UX Design",
        description: "User-centered design that converts visitors into customers",
        features: ["User Research", "Wireframing", "Prototyping", "User Testing"]
      },
      {
        title: "Web Development",
        description: "Modern, responsive websites built with cutting-edge technology",
        features: ["React/Next.js", "TypeScript", "Responsive Design", "Performance Optimization"]
      },
      {
        title: "Brand Identity",
        description: "Complete brand identity systems that make you stand out",
        features: ["Logo Design", "Color Palette", "Typography", "Brand Guidelines"]
      }
    ]
  },
  process: {
    title: "Our Workflow",
    subtitle: "A streamlined process that ensures quality results every time",
    steps: [
      {
        title: "Discovery & Planning",
        description: "We start by understanding your business goals and target audience to create a comprehensive project roadmap.",
        duration: "1-2 weeks"
      },
      {
        title: "Design & Prototyping",
        description: "Creating wireframes and high-fidelity designs that align with your brand and user expectations.",
        duration: "2-3 weeks"
      },
      {
        title: "Development & Testing",
        description: "Building your solution with clean, scalable code and thorough testing across all devices.",
        duration: "3-4 weeks"
      },
      {
        title: "Launch & Support",
        description: "Deploying your project and providing ongoing support to ensure continued success.",
        duration: "1 week + ongoing"
      }
    ]
  },
  testimonialsData: {
    title: "What Our Clients Say",
    subtitle: "Don't just take our word for it - hear from some of our satisfied clients",
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "CEO, TechStart",
        content: "Working with this team was incredible. They delivered exactly what we needed, on time and within budget.",
        rating: 5,
        avatar: "/Profile-foto.png"
      },
      {
        name: "Michael Chen",
        role: "Founder, GrowthCo",
        content: "The attention to detail and quality of work exceeded our expectations. Highly recommended!",
        rating: 5,
        avatar: "/Profile-foto.png"
      }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about working with us",
    questions: [
      {
        question: "How long does a typical project take?",
        answer: "Project timelines vary depending on scope and complexity. Most websites take 4-8 weeks from start to finish, while smaller projects may take 2-4 weeks."
      },
      {
        question: "Do you provide ongoing support?",
        answer: "Yes, we offer ongoing support and maintenance packages to keep your website updated, secure, and performing optimally."
      },
      {
        question: "What's your design process?",
        answer: "We start with discovery and research, create wireframes and prototypes, design high-fidelity mockups, and then develop the final solution with your feedback at every stage."
      }
    ]
  }
};

// API Routes
app.get('/api/content', (req, res) => {
  res.json(content);
});

app.get('/api/content/:section', (req, res) => {
  const section = req.params.section;
  if (content[section]) {
    res.json(content[section]);
  } else {
    res.status(404).json({ error: 'Section not found' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Catch all for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

module.exports.handler = serverless(app);
