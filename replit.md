# replit.md

## Overview

This is a modern, full-stack web application built with React, TypeScript, and Express.js that creates a professional agency portfolio website inspired by Lander.studio. The application features a clean, minimalist design with sophisticated animations and a mobile-first approach. It showcases projects, testimonials, and services with a focus on conversion optimization and user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

**July 26, 2025**: Process Section Redesign and Navbar Cleanup
- ✓ Removed "Tools Editor" navigation link from navbar and mobile menu
- ✓ Removed Section Order Editor component from homepage
- ✓ Removed tools-editor route from application routing
- ✓ Cleaned up navigation to only include Home and Works pages
- ✓ Enhanced navbar with smooth responsive behavior - non-transparent at top, shrinks on scroll
- ✓ Added 500ms smooth transitions for navbar height, logo size, and button sizing
- ✓ Logo and text scale down appropriately when scrolling (maintains "Vizart" visibility)
- ✓ All navbar elements (navigation buttons, CTA button) adapt to scrolled state
- ✓ Reverted section order configuration back to static layout in home.tsx
- ✓ Section order now fixed: Hero → Services → Process → Winning Edge → Hero Showcase → Testimonials → FAQ
- ✓ Redesigned Process section with single column layout (max-w-3xl)
- ✓ Changed to horizontal card layout with icon on left, content on right
- ✓ Applied glow effects only to icons, not cards or numbers
- ✓ Used clean white cards with subtle shadows and gray borders
- ✓ Icons larger (w-12 h-12) with color-specific drop-shadow glow effects
- ✓ Step numbers repositioned to small, subtle badges in top-right corner
- ✓ Cards now compact and aligned properly without excessive spacing
- ✓ Centered layout for Services section - icons and text aligned to center
- ✓ Icons moved to center with proper flex justify-center wrapper
- ✓ Replaced Circle icons with simple div dots that have glow effect
- ✓ Removed icon stroke/fill styling and used pure background color with drop-shadow glow
- ✓ Removed profile image from CTA button in navbar and mobile menu
- ✓ Made navbar transparent at top, with card wrapper and margin when scrolled
- ✓ Added smooth transitions for navbar container transform with rounded corners
- ✓ Navbar now has white card background with shadow when scrolled, transparent when at top
- ✓ Enhanced navbar transitions with scroll direction detection and smoother animations
- ✓ Added scale transformations and improved duration/easing for professional feel
- ✓ Navbar elements properly scale down/up with scroll state changes
- ✓ Increased navbar size when scrolled - container scales to 105-110%, elements get larger padding/text
- ✓ Logo, navigation buttons, and CTA button all enlarge appropriately when navbar is in scrolled state

**Previous - July 26, 2025**: Logo Fix and Process Section Layout Update
- ✓ Fixed missing "Vizart" logo text in navbar and footer
- ✓ Updated ContentData interface to properly include branding properties
- ✓ Corrected TypeScript type safety for branding logo properties
- ✓ Modified Process section to display one card per row using Flexbox column layout
- ✓ Removed icon background containers for cleaner appearance
- ✓ Implemented different colored cards for each process step (blue, purple, green, orange, red, indigo)
- ✓ Added matching glow effects for each card color theme
- ✓ Icons now display directly with color-matched glow effects without background boxes
- ✓ Step numbers maintain color coordination with their respective cards
- ✓ Enhanced visual hierarchy with distinct color themes for better user experience

**Previous - July 26, 2025**: Logo Customization System and Tools Editor Enhancement
- ✓ Created comprehensive logo customization system for navbar and footer
- ✓ Added new "branding" section to content structure with logoUrl, logoText, footerLogoUrl, footerLogoText
- ✓ Enhanced Tools Visual Editor to include logo management interface ("Edit Logos" button)
- ✓ Implemented image upload functionality for both navbar and footer logos
- ✓ Added URL input option for logo images as alternative to file upload
- ✓ Updated navbar to display custom logo images when available, fallback to text + icon
- ✓ Updated footer to display custom logo images when available, fallback to text + icon
- ✓ Tools editor now supports custom logo uploads for Figma, Framer, Webflow tools
- ✓ Changed entire website background color to #f4f4f4 as requested
- ✓ Removed glow effects from tools section icons (clean logos only)
- ✓ All logo changes persist automatically via localStorage integration

**Previous - July 26, 2025**: Added Glowing Lucide Icons and Process Section with Consistent 2-Card Layout
- ✓ Implemented CSS glow effects for all Lucide icons throughout application
- ✓ Added CSS variables for easy glow color customization (primary: blue, secondary: purple)
- ✓ Created new Process section with 6-step workflow cards using Flexbox (2 cards per row)
- ✓ Process section features editable content with localStorage persistence
- ✓ Applied glow effects to navbar icons, service icons, winning edge icons, star ratings
- ✓ Added step number indicators with enhanced glow effects in Process section
- ✓ Updated all card sections (Process, Winning Edge, Testimonials) to use consistent 2-card per row layout
- ✓ All sections now use Flexbox with responsive design (1 card on mobile, 2 cards on larger screens)
- ✓ Removed background boxes from Winning Edge section icons for cleaner appearance
- ✓ Implemented color-matched glow effects - each icon glows with its own color
- ✓ All icons now have smooth transition effects and enhanced hover states

**Previous - July 26, 2025**: Fixed Visual Editor Persistence and Enhanced Auto-Save
- ✓ Fixed visual editor not saving when navigating between pages
- ✓ Implemented automatic saving using custom useLocalStorage hook
- ✓ Added beforeunload and pagehide event listeners for reliable data persistence
- ✓ Enhanced Works Visual Editor with real-time auto-save functionality
- ✓ Enhanced Section Order Editor with automatic persistence
- ✓ All visual editor changes now save immediately without manual save button
- ✓ Data persists reliably across page navigation and browser refresh

**Previous - July 26, 2025**: Implemented Dynamic Section Management and Works Visual Editor
- ✓ Created drag-and-drop section order editor for homepage
- ✓ Dynamic section rendering system using React components mapping
- ✓ Section order persisted in localStorage with real-time updates
- ✓ Built comprehensive Works page visual editor
- ✓ Works editor supports adding/editing/deleting projects with all metadata
- ✓ Works page content fully customizable (titles, descriptions, CTA)
- ✓ Removed text size editor functionality as requested
- ✓ Added react-beautiful-dnd for drag-and-drop interface

**July 25, 2025**: Successfully migrated project from Replit Agent to Replit environment
- ✓ All dependencies installed and working correctly  
- ✓ Development workflow running on port 5000
- ✓ Implemented true seamless infinite scroll for Hero Sections Showcase (40s duration)
- ✓ Implemented true seamless infinite scroll for Project Carousel (50s duration)
- ✓ Using 5x card duplication with -20% transform for smooth looping without blink
- ✓ All showcase content fully editable via content.json (images, text, overlays)
- ✓ Project carousel content fully editable via content.json
- ✓ Slowed down animation speeds for better user experience
- ✓ Implemented responsive desktop UI scaling with fixed values (easy to customize)
- ✓ Applied proportional scaling to all major components (navbar, hero, cards, text)
- ✓ Enhanced desktop typography, spacing, and visual hierarchy
- ✓ Created simple desktop scaling system - edit values directly in CSS
- ✓ Added DESKTOP_SCALING_GUIDE.md for easy customization instructions

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