
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface ContentData {
  branding: {
    logoUrl?: string;
    logoText?: string;
    footerLogoUrl?: string;
    footerLogoText?: string;
  };
  hero: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    stats: string;
    ctaText: string;
    acceptingText: string;
    toolsText: string;
    tools: Array<{ name: string; color: string }>;
  };
  services: any;
  winningEdge: any;
  heroSectionsShowcase: any;
  testimonials: any;
  faq: any;
  finalCta: any;
  works: any;
  projects: any[];
  footer: any;
}

// Default fallback data
const defaultContent: ContentData = {
  branding: {
    logoText: "Vizart"
  },
  hero: {
    title: "Creative Digital",
    titleHighlight: "Solutions",
    subtitle: "We create amazing digital experiences",
    stats: "100+ Projects Completed",
    ctaText: "Get Started",
    acceptingText: "Now Accepting New Clients",
    toolsText: "Tools We Use",
    tools: [
      { name: "React", color: "#61DAFB" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "Figma", color: "#F24E1E" }
    ]
  },
  services: {},
  winningEdge: {},
  heroSectionsShowcase: {},
  testimonials: {},
  faq: {},
  finalCta: {},
  works: {},
  projects: [],
  footer: {}
};

export function useContent() {
  return useQuery<ContentData>({
    queryKey: ["/api/content"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/content");
        if (!response.ok) {
          return defaultContent;
        }
        return response.json();
      } catch (error) {
        console.warn("Failed to fetch content, using defaults:", error);
        return defaultContent;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    initialData: defaultContent
  });
}

export function useUpdateContent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: ContentData) => {
      const response = await fetch("/api/content", {
        method: "POST",
        body: JSON.stringify(content),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update content");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
    },
  });
}

export function useUpdateContentSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ section, data }: { section: string; data: any }) => {
      const response = await fetch(`/api/content/${section}`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to update ${section} section`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
    },
  });
}
