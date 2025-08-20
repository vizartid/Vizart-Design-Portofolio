import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ContentSection } from "@/lib/types";
import { content as fallbackContent } from "@/data";

const API_BASE = "/api";

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

export function useContent() {
  return useQuery({
    queryKey: ["content"],
    queryFn: async () => {
      try {
        const response = await fetch(`${API_BASE}/content`);
        if (!response.ok) {
          // Use fallback content if API fails (for static deployment)
          return fallbackContent;
        }
        return response.json();
      } catch (error) {
        // Use fallback content if network fails
        return fallbackContent;
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
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
      queryClient.invalidateQueries({ queryKey: ["content"] });
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
      queryClient.invalidateQueries({ queryKey: ["content"] });
    },
  });
}