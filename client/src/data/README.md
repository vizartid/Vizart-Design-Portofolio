# Content Management System

The content is now organized into separate TypeScript files for easier management and editing. Each section has its own file:

## Content Structure

### Core Sections
- `branding.ts` - Logo, brand text, and branding elements
- `hero.ts` - Main hero section content, tools, and CTA
- `services.ts` - Services section with features and offerings
- `winning-edge.ts` - Features that highlight competitive advantages
- `hero-sections-showcase.ts` - Portfolio showcase images and descriptions

### Content Sections
- `testimonials-content.ts` - Testimonials section headers and content
- `faq.ts` - Frequently asked questions and answers
- `final-cta.ts` - Call-to-action sections for different pages
- `footer.ts` - Footer content, links, and copyright information

### Works/Portfolio
- `works.ts` - Works page headers and categories
- `works-projects.ts` - Individual project data for the portfolio

### Main Export
- `index.ts` - Combines all sections into a single content object

## How to Edit Content

### 1. Direct File Editing
Edit any individual file to update that section's content. For example:
- Edit `hero.ts` to change hero section text
- Edit `services.ts` to update service offerings
- Edit `faq.ts` to add/remove FAQ items

### 2. File Structure
Each file exports a constant with the section data:
```typescript
export const sectionName = {
  // your content here
};
```

### 3. API Integration
The system automatically:
- Loads content from TypeScript files
- Falls back to the old JSON system if needed
- Updates individual files when content changes
- Maintains backward compatibility

## Benefits

✅ **Easy to Edit**: Each section is in its own file  
✅ **Better Organization**: Clear separation of content areas  
✅ **Type Safety**: TypeScript provides better error checking  
✅ **Version Control**: Easy to track changes per section  
✅ **Backup**: Old content.json is saved as content-backup.json

## Quick Reference

| Section | File | Purpose |
|---------|------|---------|
| Branding | `branding.ts` | Logo and brand elements |
| Hero | `hero.ts` | Main landing section |
| Services | `services.ts` | Service offerings |
| Features | `winning-edge.ts` | Competitive advantages |
| Showcase | `hero-sections-showcase.ts` | Portfolio display |
| Testimonials | `testimonials-content.ts` | Client reviews header |
| FAQ | `faq.ts` | Questions and answers |
| CTA | `final-cta.ts` | Call-to-action content |
| Works | `works.ts` | Portfolio page header |
| Projects | `works-projects.ts` | Individual projects |
| Footer | `footer.ts` | Footer content |