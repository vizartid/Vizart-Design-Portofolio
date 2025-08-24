
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
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Content data
const contentData = {
  branding: {
    logoUrl: "/logo-vizart.png",
    logoText: "Vizart"
  },
  hero: {
    title: "Delivering Standout",
    titleHighlight: "Digital Creations",
    subtitle: "Through Seamless Partnership",
    stats: "95% Client Satisfaction • 150+ Projects Completed • 3+ Years Experience",
    ctaText: "Let's Collaborate",
    acceptingText: "Currently accepting new projects",
    toolsText: "Trusted by 50+ clients & built with modern tools",
    tools: [
      { name: "React", icon: "react", color: "blue-500" },
      { name: "Next.js", icon: "nextjs", color: "black" },
      { name: "TypeScript", icon: "typescript", color: "blue-600" },
      { name: "Tailwind CSS", icon: "tailwind", color: "cyan-500" },
      { name: "Figma", icon: "figma", color: "purple-500" },
      { name: "Framer", icon: "framer", color: "pink-500" }
    ]
  },
  services: {
    title: "Our Services",
    subtitle: "Comprehensive digital solutions tailored to your business needs",
    services: [
      {
        icon: "Palette",
        title: "UI/UX Design",
        description: "Creating intuitive and engaging user experiences",
        features: ["User Research", "Wireframing", "Prototyping", "Visual Design"]
      },
      {
        icon: "Code",
        title: "Web Development",
        description: "Building responsive and performant web applications",
        features: ["Frontend Development", "Backend Integration", "API Development", "Database Design"]
      },
      {
        icon: "Smartphone",
        title: "Mobile Design",
        description: "Designing mobile-first experiences that convert",
        features: ["iOS Design", "Android Design", "Cross-platform", "App Store Optimization"]
      }
    ]
  },
  process: {
    title: "Our Workflow",
    subtitle: "A structured process we use to deliver the best results",
    steps: [
      {
        id: "planning",
        icon: "Lightbulb",
        title: "Ideas & Planning",
        description: "Understanding your needs and planning the right strategy to achieve business goals."
      },
      {
        id: "design",
        icon: "Palette",
        title: "Initial Design",
        description: "Creating attractive visual concepts that align with your brand identity."
      },
      {
        id: "development",
        icon: "Code",
        title: "Development",
        description: "Developing websites or applications with cutting-edge technology and quality code."
      },
      {
        id: "testing",
        icon: "TestTube",
        title: "Testing",
        description: "Conducting comprehensive testing to ensure all features work perfectly."
      },
      {
        id: "launch",
        icon: "Rocket",
        title: "Launch",
        description: "Launching the final product and ensuring all systems run smoothly in the live environment."
      },
      {
        id: "support",
        icon: "Headphones",
        title: "Support",
        description: "Providing ongoing support and maintenance to ensure optimal performance."
      }
    ]
  },
  testimonials: {
    title: "What Our Clients Say",
    subtitle: "Real feedback from our satisfied clients",
    testimonials: [
      {
        id: 1,
        name: "Sarah Johnson",
        role: "CEO, TechStart",
        content: "Vizart delivered an exceptional website that perfectly captured our brand vision.",
        rating: 5,
        imageUrl: "/profile-foto.jpg"
      },
      {
        id: 2,
        name: "Mike Chen",
        role: "Founder, Digital Agency",
        content: "Professional work, timely delivery, and excellent communication throughout the project.",
        rating: 5,
        imageUrl: "/profile-foto.jpg"
      }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about our services",
    faqs: [
      {
        id: 1,
        question: "What is your typical project timeline?",
        answer: "Project timelines vary depending on scope and complexity. Typically, a complete website takes 2-6 weeks from start to finish."
      },
      {
        id: 2,
        question: "Do you provide ongoing support?",
        answer: "Yes, we offer ongoing support and maintenance packages to ensure your website continues to perform optimally."
      }
    ]
  },
  winningEdge: {
    title: "My Digital Edge",
    subtitle: "What sets me apart in the digital landscape",
    features: [
      {
        icon: "Zap",
        title: "Lightning Fast",
        description: "Optimized performance that loads in under 2 seconds"
      },
      {
        icon: "Shield",
        title: "Secure & Reliable",
        description: "Enterprise-grade security with 99.9% uptime guarantee"
      },
      {
        icon: "Smartphone",
        title: "Mobile First",
        description: "Responsive design that works perfectly on all devices"
      }
    ]
  },
  heroSectionsShowcase: {
    title: "Hero Section\nShowcase",
    subtitle: "• High Converting Designs\n• Mobile Optimized\n• A/B Tested Results",
    images: [
      {
        url: "/image_1755570735915.png",
        hoverUrl: "/image_1755570924945.png",
        alt: "Hero Section 1",
        overlay: "E-commerce"
      },
      {
        url: "/image_1755571308106.png",
        hoverUrl: "/image_1755572514238.png",
        alt: "Hero Section 2",
        overlay: "SaaS"
      },
      {
        url: "/image_1755574672785.png",
        hoverUrl: "/image_1755575578878.png",
        alt: "Hero Section 3",
        overlay: "Portfolio"
      }
    ]
  }
};

// API Routes
app.get('/api/content', (req, res) => {
  try {
    res.json(contentData);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ message: "Failed to fetch content" });
  }
});

app.put('/api/content/:section', (req, res) => {
  try {
    const { section } = req.params;
    const data = req.body;
    
    if (contentData[section]) {
      contentData[section] = { ...contentData[section], ...data };
      res.json({ success: true, data: contentData[section] });
    } else {
      res.status(404).json({ message: "Section not found" });
    }
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ message: "Failed to update content" });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports.handler = serverless(app);
