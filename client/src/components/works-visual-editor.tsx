import { useState } from "react";
import { Edit3, Save, Plus, Trash2, Image, Type, Link } from "lucide-react";
import ErrorBoundary from "./error-boundary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WorksProject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  category: string;
  featured: boolean;
}

interface WorksPageData {
  title: string;
  subtitle: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonText: string;
  projects: WorksProject[];
}

const DEFAULT_WORKS_DATA: WorksPageData = {
  title: "Our Featured Works",
  subtitle: "Explore our portfolio of successful projects and creative solutions",
  ctaTitle: "Let's Create Something Amazing Together",
  ctaDescription: "Ready to join our portfolio of successful projects? Let's discuss how we can bring your vision to life.",
  ctaButtonText: "Start Your Project",
  projects: []
};

export function WorksVisualEditor() {
  const [isOpen, setIsOpen] = useState(false);
  const [worksData, setWorksData] = useState<WorksPageData>(() => {
    const saved = localStorage.getItem('worksPageData');
    return saved ? JSON.parse(saved) : DEFAULT_WORKS_DATA;
  });

  const [editingProject, setEditingProject] = useState<WorksProject | null>(null);

  const handleUpdateField = (field: keyof WorksPageData, value: any) => {
    setWorksData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddProject = () => {
    const newProject: WorksProject = {
      id: Date.now().toString(),
      title: "New Project",
      description: "Project description",
      imageUrl: "/api/placeholder/400/300",
      projectUrl: "#",
      category: "website",
      featured: false
    };
    
    setWorksData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
    setEditingProject(newProject);
  };

  const handleUpdateProject = (projectId: string, updates: Partial<WorksProject>) => {
    setWorksData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === projectId ? { ...project, ...updates } : project
      )
    }));
  };

  const handleDeleteProject = (projectId: string) => {
    setWorksData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== projectId)
    }));
    setEditingProject(null);
  };

  const saveWorksData = () => {
    localStorage.setItem('worksPageData', JSON.stringify(worksData));
    
    // Emit event untuk notify komponen works
    window.dispatchEvent(new CustomEvent('worksDataChanged', { 
      detail: { worksData } 
    }));
    
    alert('Data works berhasil disimpan!');
  };

  const resetToDefault = () => {
    setWorksData(DEFAULT_WORKS_DATA);
    localStorage.removeItem('worksPageData');
    setEditingProject(null);
  };

  return (
    <ErrorBoundary>
      <div className="fixed top-4 right-4 z-50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="bg-white shadow-lg">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Works
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <Card className="w-96 mt-2 bg-white shadow-xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-lg">Works Visual Editor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Page Content */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">Page Content</h3>
                
                <div>
                  <Label htmlFor="pageTitle">Page Title</Label>
                  <Input
                    id="pageTitle"
                    value={worksData.title}
                    onChange={(e) => handleUpdateField('title', e.target.value)}
                    placeholder="Our Featured Works"
                  />
                </div>
                
                <div>
                  <Label htmlFor="pageSubtitle">Page Subtitle</Label>
                  <Textarea
                    id="pageSubtitle"
                    value={worksData.subtitle}
                    onChange={(e) => handleUpdateField('subtitle', e.target.value)}
                    placeholder="Explore our portfolio..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="ctaTitle">CTA Title</Label>
                  <Input
                    id="ctaTitle"
                    value={worksData.ctaTitle}
                    onChange={(e) => handleUpdateField('ctaTitle', e.target.value)}
                    placeholder="Let's Create Something Amazing..."
                  />
                </div>
                
                <div>
                  <Label htmlFor="ctaDescription">CTA Description</Label>
                  <Textarea
                    id="ctaDescription"
                    value={worksData.ctaDescription}
                    onChange={(e) => handleUpdateField('ctaDescription', e.target.value)}
                    placeholder="Ready to join our portfolio..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="ctaButtonText">CTA Button Text</Label>
                  <Input
                    id="ctaButtonText"
                    value={worksData.ctaButtonText}
                    onChange={(e) => handleUpdateField('ctaButtonText', e.target.value)}
                    placeholder="Start Your Project"
                  />
                </div>
              </div>

              {/* Projects Management */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">Projects ({worksData.projects.length})</h3>
                  <Button onClick={handleAddProject} size="sm" variant="outline">
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {worksData.projects.map((project) => (
                    <div
                      key={project.id}
                      className={`p-2 border rounded cursor-pointer text-xs ${
                        editingProject?.id === project.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                      onClick={() => setEditingProject(project)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium truncate">{project.title}</span>
                        <div className="flex items-center space-x-1">
                          {project.featured && <span className="text-yellow-500">★</span>}
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(project.id);
                            }}
                            size="sm"
                            variant="ghost"
                            className="h-5 w-5 p-0 text-red-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-gray-500 truncate">{project.category}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Editor */}
              {editingProject && (
                <div className="space-y-4 border-t pt-4">
                  <h3 className="font-semibold text-sm">Edit Project</h3>
                  
                  <div>
                    <Label htmlFor="projectTitle">Project Title</Label>
                    <Input
                      id="projectTitle"
                      value={editingProject.title}
                      onChange={(e) => handleUpdateProject(editingProject.id, { title: e.target.value })}
                      placeholder="Project name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="projectDesc">Description</Label>
                    <Textarea
                      id="projectDesc"
                      value={editingProject.description}
                      onChange={(e) => handleUpdateProject(editingProject.id, { description: e.target.value })}
                      placeholder="Project description"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="projectImage">Image URL</Label>
                    <Input
                      id="projectImage"
                      value={editingProject.imageUrl}
                      onChange={(e) => handleUpdateProject(editingProject.id, { imageUrl: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="projectUrl">Project URL</Label>
                    <Input
                      id="projectUrl"
                      value={editingProject.projectUrl}
                      onChange={(e) => handleUpdateProject(editingProject.id, { projectUrl: e.target.value })}
                      placeholder="https://project-website.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="projectCategory">Category</Label>
                    <Select
                      value={editingProject.category}
                      onValueChange={(value) => handleUpdateProject(editingProject.id, { category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="branding">Branding</SelectItem>
                        <SelectItem value="app">Mobile App</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="projectFeatured"
                      checked={editingProject.featured}
                      onChange={(e) => handleUpdateProject(editingProject.id, { featured: e.target.checked })}
                      className="rounded"
                    />
                    <Label htmlFor="projectFeatured" className="text-sm">Featured Project</Label>
                  </div>
                </div>
              )}
              
              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={saveWorksData} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button onClick={resetToDefault} variant="outline" className="flex-1">
                  Reset
                </Button>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>Visual editor untuk mengedit halaman works</p>
                <p>Klik project untuk edit detail</p>
              </div>
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
    </ErrorBoundary>
  );
}