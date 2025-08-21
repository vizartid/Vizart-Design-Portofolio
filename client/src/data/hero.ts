
interface Tool {
  name: string;
  color: string;
  logoUrl: string;
}

interface HeroData {
  title: string;
  titleHighlight: string;
  subtitle: string;
  stats: string;
  ctaText: string;
  acceptingText: string;
  toolsText: string;
  tools: Tool[];
}

export const hero: HeroData = {
  title: "Delivering Standout",
  titleHighlight: "Digital Creations",
  subtitle: "Through Seamless Partnership",
  stats: "20+ Amazing Websites Created So Far\n\n",
  ctaText: "Get in Touch",
  acceptingText: "Ready for New Projects.",
  toolsText: "We use industry standard tools like",
  tools: [
    {
      name: "Figma",
      color: "purple-500",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "Adobe Illustrator", 
      color: "yellow-500",
      logoUrl: "https://skillicons.dev/icons?i=ai",
    },
    {
      name: "React",
      color: "blue-400",
      logoUrl: "https://cdn.simpleicons.org/react/61DAFB",
    },
    {
      name: "Node.js",
      color: "green-500", 
      logoUrl: "https://cdn.simpleicons.org/nodedotjs/339933",
    },
    {
      name: "TypeScript",
      color: "blue-600",
      logoUrl: "https://cdn.simpleicons.org/typescript/3178C6",
    },
    {
      name: "PostgreSQL",
      color: "blue-700",
      logoUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
  ],
};
