# Lander Studio Website

## Overview

This is a modern, full-stack web application for a design agency called Lander Studio. The application is built with a React frontend, Express backend, and uses PostgreSQL with Drizzle ORM for data persistence. The site features a minimalist design with smooth animations, focusing on showcasing design services and portfolio work.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- Built with React 18 and TypeScript
- Uses Vite as the build tool and development server
- Wouter for client-side routing
- Framer Motion for animations and page transitions
- TanStack Query for server state management
- Tailwind CSS with shadcn/ui components for styling
- Mobile-first responsive design approach

### Backend Architecture
- Express.js server with TypeScript
- RESTful API design with JSON responses
- Middleware for request logging and error handling
- File-based content management through JSON files
- Serves both API routes and static assets

### Database Layer
- PostgreSQL database with Drizzle ORM
- Neon Database serverless connection
- Schema includes users, projects, and testimonials tables
- Migration support through Drizzle Kit

## Key Components

### Core Sections
- **Hero Section**: Main landing area with animated carousel and tools showcase
- **Services Section**: Displays available services (branding, websites)
- **Process Section**: Step-by-step workflow visualization
- **Winning Edge Section**: Feature highlights with icons
- **Portfolio Showcase**: Hero sections gallery with smooth scrolling
- **Testimonials**: Client feedback with ratings
- **FAQ Section**: Collapsible question/answer pairs

### Navigation
- Fixed navbar with smooth hide/show on scroll
- Segmented control design for Home/Works navigation
- Mobile hamburger menu for responsive design
- Smooth page transitions between routes

### Content Management
- JSON-based content system for easy editing
- Visual editors for sections (Works, Tools, Section Order)
- Local storage for draft changes
- API endpoints for content CRUD operations

## Data Flow

1. **Content Loading**: Application fetches content from `/api/content` endpoint
2. **Section Rendering**: Components use React Query to manage content state
3. **Visual Editing**: Editors update local storage and sync via API
4. **Database Operations**: Projects and testimonials stored in PostgreSQL
5. **Static Assets**: Images and files served from attached_assets directory

## External Dependencies

### UI Framework
- Radix UI components for accessibility
- Tailwind CSS for styling with custom design tokens
- Lucide React for icons
- React Icons for social media icons

### Animation & Interaction
- Framer Motion for page transitions and micro-interactions
- React Beautiful DND for drag-and-drop functionality
- React Hook Form with Zod validation

### Development Tools
- ESBuild for production bundling
- Replit-specific plugins for development environment
- PostCSS with Autoprefixer for CSS processing

## Deployment Strategy

### Development
- Vite dev server with HMR
- Express server in development mode
- File watching and auto-reload capabilities

### Production Build
- Vite builds optimized client bundle to `dist/public`
- ESBuild bundles server code to `dist/index.js`
- Static file serving through Express
- Environment-based configuration

### Database Management
- Drizzle migrations in `migrations` directory
- Database push command for schema updates
- Environment variable configuration for database URL

The application follows a modern JAMstack approach with server-side API support, emphasizing performance, SEO optimization, and smooth user experience across all devices.