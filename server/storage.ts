import { users, type User, type InsertUser, projects, testimonials, type Project, type Testimonial } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProjects(): Promise<Project[]>;
  getTestimonials(): Promise<Testimonial[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private testimonials: Map<number, Testimonial>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.testimonials = new Map();
    this.currentId = 1;
    
    // Initialize with some mock data for projects and testimonials
    this.initializeMockData();
  }

  private initializeMockData() {
    // Add sample projects
    const sampleProjects: Project[] = [
      {
        id: 1,
        title: "Suprema",
        description: "Create a clear roadmap, track progress, and smoothly guide your project from idea to successful launch.",
        longDescription: "Our comprehensive platform helps teams stay organized and efficient throughout the entire development lifecycle.",
        category: "websites",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        hoverImageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        projectUrl: "#",
        featured: true
      }
    ];

    // Add sample testimonials
    const sampleTestimonials: Testimonial[] = [
      {
        id: 1,
        name: "Sarah Johnson",
        company: "TechCorp",
        role: "Marketing Director",
        content: "Exceptional work quality and attention to detail. Highly recommend!",
        avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150",
        rating: 5
      }
    ];

    sampleProjects.forEach(project => this.projects.set(project.id, project));
    sampleTestimonials.forEach(testimonial => this.testimonials.set(testimonial.id, testimonial));
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
}

export const storage = new MemStorage();
