# replit.md

## Overview

This is a modern, full-stack web application built with React, TypeScript, and Express.js that creates a professional agency portfolio website inspired by Lander.studio. The application features a clean, minimalist design with sophisticated animations and a mobile-first approach. It showcases projects, testimonials, and services with a focus on conversion optimization and user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

- **Frontend**: React SPA with TypeScript, built with Vite
- **Backend**: Express.js REST API with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured for Neon Database)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion for smooth interactions
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack React Query for server state

## Key Components

### Frontend Architecture
- **Component Library**: shadcn/ui components for consistent design system
- **Animation System**: Framer Motion for page transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Typography**: Google Fonts integration (Instrument Serif, Poppins)
- **Icons**: Lucide React and React Icons
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **API Structure**: RESTful endpoints under `/api` prefix
- **Database Layer**: Drizzle ORM with PostgreSQL dialect
- **Storage Interface**: Abstracted storage layer supporting in-memory and database implementations
- **Session Management**: PostgreSQL session store (connect-pg-simple)
- **Development Tools**: Hot reloading with Vite integration

### Design System
- **Color Palette**: Bone white background, electric blue accents, charcoal text
- **Component Variants**: Class Variance Authority for consistent component styling
- **Custom Utilities**: Tailwind CSS extensions for design system variables
- **Dark Mode**: Built-in support with CSS variables

## Data Flow

1. **Client Requests**: Browser loads React SPA served by Express static middleware
2. **API Communication**: Frontend communicates with backend via `/api` routes
3. **Data Fetching**: TanStack React Query manages server state and caching
4. **Database Operations**: Drizzle ORM handles PostgreSQL interactions
5. **Real-time Updates**: Query invalidation ensures fresh data display

### Database Schema
- **users**: User authentication and profiles
- **projects**: Portfolio projects with categories and featured status
- **testimonials**: Client testimonials with ratings and avatars

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18 with TypeScript support
- **UI Components**: Radix UI primitives via shadcn/ui
- **Animation**: Framer Motion for smooth transitions
- **State Management**: TanStack React Query
- **Routing**: Wouter for lightweight client-side routing
- **Form Management**: React Hook Form with Hookform Resolvers

### Backend Dependencies
- **Runtime**: Node.js with ESM modules
- **Framework**: Express.js with TypeScript
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Build Tools**: esbuild for production builds
- **Development**: tsx for TypeScript execution

### Development Tools
- **Build System**: Vite with React plugin
- **Code Quality**: TypeScript strict mode
- **Styling**: PostCSS with Tailwind CSS and Autoprefixer
- **Package Manager**: npm with package-lock.json

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Migration**: Drizzle Kit handles schema migrations
4. **Static Assets**: Express serves built frontend from `dist/public`

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **Build Commands**: Separate commands for development and production

### Production Setup
- **Server Entry**: `dist/index.js` runs Express server
- **Static Serving**: Production build serves pre-built React app
- **Database**: Requires PostgreSQL database (Neon recommended)
- **Session Storage**: PostgreSQL-based session management

### Development Workflow
- **Hot Reloading**: Vite dev server with HMR
- **API Proxy**: Development server proxies API requests
- **Database**: Local or cloud PostgreSQL instance
- **Type Safety**: Full TypeScript coverage across client and server