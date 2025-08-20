# Content Management System

This project now uses individual TypeScript files for easier content management. Each section of the website has its own `.ts` file for better organization and editing.

## File Structure

- `branding.ts` - Logo, favicon, and brand elements
- `hero.ts` - Main hero section with tools carousel
- `services.ts` - Service offerings and features  
- `winning-edge.ts` - Competitive advantages and features
- `hero-sections-showcase.ts` - Portfolio showcase gallery
- `testimonials-content.ts` - Testimonials headers and text
- `faq.ts` - FAQ questions and answers
- `final-cta.ts` - Call-to-action sections
- `works.ts` - Works page header content
- `works-projects.ts` - Individual project data
- `footer.ts` - Footer content and links

## Image Management

### Using Images from public folder

All images are stored in the `client/public` folder and can be referenced in the TypeScript files using:

```typescript
// Correct way to reference images
imageUrl: "/filename.png"
logoUrl: "/Profile-foto.png"
```

### Available Images

Current images in public folder:
- `Profile-foto.png` - Used for logo/branding
- `Screenshot 2025-07-24 140158_1753344628323.png` - Project screenshot
- `Screenshot 2025-07-24 140507_1753341884909.png` - Project screenshot
- Multiple other project screenshots and design images
- Various `image_*.png` files for galleries and showcases

### Projects Image Connections

All projects in `works-projects.ts` now use real images from attached_assets:
- Each project has `imageUrl` and `hoverImageUrl` properties
- Images are properly connected to actual files
- No more placeholder or external URLs

## How to Edit Content

1. **Navigate to the file** you want to edit in `client/src/data/`
2. **Edit the TypeScript object** - the structure is simple and self-explanatory
3. **Save the file** - changes will be automatically detected and updated
4. **Images**: Reference any file in attached_assets using `/attached_assets/filename.ext`

## Example

```typescript
// In works-projects.ts
export const worksProjects = [
  {
    id: 1,
    title: "My Project",
    description: "Project description here",
    imageUrl: "/attached_assets/my-project-image.png",
    hoverImageUrl: "/attached_assets/my-project-hover.png",
    // ... other properties
  }
];
```

## System Architecture

- **Backend**: Automatically parses TypeScript files and serves content via API
- **Frontend**: Uses React Query to fetch content from `/api/content`
- **Hot Reload**: Changes to .ts files trigger automatic updates
- **Backward Compatible**: System maintains compatibility while using TypeScript files

The content management system is now much more organized and easier to maintain!