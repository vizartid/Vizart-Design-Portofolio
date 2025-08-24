
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
    toolsText: "Trusted by 50+ clients & built with modern tools"
  },
  winningEdge: {
    title: "My Digital Edge",
    subtitle: "What sets me apart in the digital landscape",
    features: [
      {
        title: "Lightning Fast",
        description: "Optimized performance that loads in under 3 seconds",
        icon: "Bolt",
        color: "blue-500"
      },
      {
        title: "Secure & Reliable",
        description: "Enterprise-grade security with 99.9% uptime guarantee",
        icon: "TrendingUp",
        color: "orange-500"
      },
      {
        title: "Mobile First",
        description: "Responsive design that works perfectly on all devices",
        icon: "Gauge",
        color: "green-500"
      }
    ]
  },
  heroSectionsShowcase: {
    title: "Hero Section\nShowcase",
    subtitle: "• High Converting Designs\n• Mobile Optimized\n• A/B Tested Results",
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
      },
      {
        url: "/backgound-wave.jpg",
        hoverUrl: "/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg",
        alt: "Tech startup hero with innovation focus",
        overlay: "Tech Startup"
      }
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
      }
    ]
  },
  process: {
    title: "Our Workflow",
    subtitle: "A streamlined process that ensures quality and efficiency",
    steps: [
      {
        number: "01",
        title: "Discovery",
        description: "Understanding your goals and requirements",
        icon: "Search"
      },
      {
        number: "02",
        title: "Design",
        description: "Creating wireframes and visual designs",
        icon: "PenTool"
      },
      {
        number: "03",
        title: "Development",
        description: "Building your solution with clean code",
        icon: "Code"
      },
      {
        number: "04",
        title: "Launch",
        description: "Deploying and testing your project",
        icon: "Rocket"
      }
    ]
  },
  testimonials: {
    title: "What Our Clients Say",
    subtitle: "Real feedback from satisfied customers",
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "Marketing Director",
        company: "TechCorp",
        content: "Outstanding work quality and professional service. Highly recommended!",
        rating: 5,
        avatar: "/b48f5cac-0dd9-4e94-b48a-682921628c0b.jpg"
      }
    ]
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Everything you need to know about our services",
    faqs: [
      {
        question: "How long does a typical project take?",
        answer: "Most projects are completed within 2-4 weeks, depending on complexity and scope."
      },
      {
        question: "Do you offer revisions?",
        answer: "Yes, we include up to 3 rounds of revisions in all our packages."
      },
      {
        question: "What technologies do you use?",
        answer: "We use modern technologies like React, Next.js, TypeScript, and Tailwind CSS."
      }
    ]
  }
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const path = event.path.replace('/.netlify/functions/api', '');
    
    if (event.httpMethod === 'GET' && path === '/content') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(contentData)
      };
    }

    if (event.httpMethod === 'PUT' && path.startsWith('/content/')) {
      const section = path.replace('/content/', '');
      const updates = JSON.parse(event.body);
      
      // Update the content data
      if (contentData[section]) {
        contentData[section] = { ...contentData[section], ...updates };
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(contentData[section])
      };
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
