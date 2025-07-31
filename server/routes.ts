import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs/promises";
import path from "path";
import { updateSectionFile, getAllSections } from "./content-updater";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for projects and testimonials
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Content management routes
  app.get("/api/content", async (req, res) => {
    try {
      // Use backup JSON for now - TypeScript files are available for manual editing
      const contentPath = path.join(process.cwd(), "client", "src", "data", "content-backup.json");
      const contentData = await fs.readFile(contentPath, "utf-8");
      const content = JSON.parse(contentData);
      res.json(content);
    } catch (error) {
      console.error("Failed to fetch content:", error);
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });

  app.post("/api/content", async (req, res) => {
    try {
      const updatedContent = req.body;
      
      // Validate that we have content to save
      if (!updatedContent || typeof updatedContent !== 'object') {
        return res.status(400).json({ message: "Invalid content data" });
      }

      // Update all sections individually
      const updatePromises = Object.entries(updatedContent).map(async ([sectionName, sectionData]) => {
        try {
          await updateSectionFile(sectionName, sectionData);
        } catch (error) {
          console.error(`Failed to update section ${sectionName}:`, error);
          throw error;
        }
      });

      await Promise.all(updatePromises);
      
      res.json({ success: true, message: "All content sections updated successfully" });
    } catch (error) {
      console.error("Failed to update content:", error);
      res.status(500).json({ message: "Failed to update content" });
    }
  });

  // Partial content update endpoint for specific sections
  app.patch("/api/content/:section", async (req, res) => {
    try {
      const { section } = req.params;
      const sectionData = req.body;
      
      // Update the specific section file
      await updateSectionFile(section, sectionData);
      
      res.json({ success: true, message: `${section} section updated successfully` });
    } catch (error) {
      console.error(`Failed to update ${req.params.section} section:`, error);
      res.status(500).json({ message: `Failed to update ${req.params.section} section` });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
