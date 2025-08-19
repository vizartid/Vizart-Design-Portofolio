import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

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
  return useQuery<ContentData>({
    queryKey: ["/api/content"],
    queryFn: async () => {
      const response = await fetch("/api/content");
      if (!response.ok) {
        throw new Error("Failed to fetch content");
      }
      return response.json();
    },
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

export { useContent, useUpdateContentSection };