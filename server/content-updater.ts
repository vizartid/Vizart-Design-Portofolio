import fs from "fs/promises";
import path from "path";

// Map section names to their corresponding file names
const sectionFileMap: Record<string, string> = {
  branding: "branding.ts",
  hero: "hero.ts", 
  services: "services.ts",
  winningEdge: "winning-edge.ts",
  heroSectionsShowcase: "hero-sections-showcase.ts",
  testimonials: "testimonials-content.ts",
  faq: "faq.ts",
  finalCta: "final-cta.ts",
  works: "works.ts",
  projects: "works-projects.ts",
  footer: "footer.ts",
  process: "process.ts"
};

export async function updateSectionFile(sectionName: string, data: any): Promise<void> {
  const fileName = sectionFileMap[sectionName];
  if (!fileName) {
    throw new Error(`Unknown section: ${sectionName}`);
  }

  const filePath = path.join(process.cwd(), "client", "src", "data", fileName);
  
  // Generate the variable name (e.g., "winningEdge" -> "winningEdge", "final-cta" -> "finalCta")
  let variableName = sectionName;
  if (sectionName === "testimonials") variableName = "testimonialsContent";
  if (sectionName === "projects") variableName = "worksProjects";
  if (sectionName === "footer") variableName = "footerContent";

  // Convert data to TypeScript export format
  const tsContent = `export const ${variableName} = ${JSON.stringify(data, null, 2)};`;

  await fs.writeFile(filePath, tsContent, "utf-8");
}

export async function getAllSections(): Promise<Record<string, any>> {
  const dataDir = path.join(process.cwd(), "client", "src", "data");
  const sections: Record<string, any> = {};
  
  for (const [sectionName, fileName] of Object.entries(sectionFileMap)) {
    try {
      const filePath = path.join(dataDir, fileName);
      const fileContent = await fs.readFile(filePath, "utf-8");
      
      // Extract the exported object using eval in a safe context
      const match = fileContent.match(/export const \w+ = ({[\s\S]*});/);
      if (match) {
        try {
          // Use Function constructor to safely evaluate the object
          const func = new Function('return ' + match[1]);
          sections[sectionName] = func();
        } catch (evalError) {
          console.warn(`Failed to evaluate section ${sectionName}:`, evalError);
          // Try alternative parsing for simple objects
          try {
            let objectStr = match[1];
            // Basic cleanup for common TypeScript patterns
            objectStr = objectStr.replace(/(\w+):/g, '"$1":');
            objectStr = objectStr.replace(/'/g, '"');
            objectStr = objectStr.replace(/,(\s*[}\]])/g, '$1');
            sections[sectionName] = JSON.parse(objectStr);
          } catch (jsonError) {
            console.error(`Failed to parse section ${sectionName} with both methods:`, jsonError);
          }
        }
      }
    } catch (error) {
      console.warn(`Failed to load section ${sectionName}:`, error);
    }
  }
  
  return sections;
}